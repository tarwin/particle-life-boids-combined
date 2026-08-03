// WebGPU engine: buffers, pipelines and the per-frame pass schedule.

import computeWgsl from './compute.wgsl?raw'
import renderWgsl from './render.wgsl?raw'
import {
  BASE_SIZE,
  MAX_COLLISIONS_CAP,
  CELL_SIZE,
  forceSoftening,
  collisionRadius,
  coreRadius,
  sizeFromSeed,
  BACKGROUNDS,
} from './params.js'
import { buildParticles } from './startup.js'

const WORKGROUP = 256
/**
 * Derived from the shader rather than hand-maintained. Growing `struct Params`
 * in the WGSL and forgetting to grow this constant produces a uniform buffer
 * that is too small, which invalidates *every* dispatch in the frame — silently,
 * unless you happen to wrap it in an error scope. Counting the fields here means
 * the two can never drift.
 */
function countParamFields(src) {
  const m = src.match(/struct Params \{([\s\S]*?)\n\};/)
  if (!m) throw new Error('could not find struct Params in compute.wgsl')
  const fields = m[1].match(/^\s*\w+\s*:\s*f32\s*,/gm)
  if (!fields) throw new Error('no f32 fields found in struct Params')
  // Uniform structs round up to 16 bytes, i.e. a multiple of 4 floats.
  return Math.ceil(fields.length / 4) * 4
}

const PARAM_FLOATS = countParamFields(computeWgsl)
const PARTICLE_BYTES = 16 // vec2 pos + vec2 vel

// grid = [ counts | offsets | cursor | mediumA | mediumB | blob | blobDensA
//        | blobDensB | fine density x2 ], the last two at DSUB^2 resolution.
const GRID_REGIONS = 8
// The render density grid is this many times finer per axis than the hash grid.
// Reusing hash-cell counts gives a field only `cellsPerRow` across, which is far
// too coarse to read as a surface. Keep in sync with DSUB in the shaders.
const DENSITY_SUB = 4
// Per-blob aggregates: count, sumX, sumY. Keyed by blob id, which is a cell
// index, so one numCells-sized region each is exactly right.
const BLOB_STAT_REGIONS = 3
// Trails accumulate over many frames, so the buffer they live in needs more
// than 8 bits per channel — at high persistence the per-frame fade step rounds
// to zero in 8-bit and trails never finish fading, leaving stuck ghosts.
const ACCUM_FORMAT = 'rgba16float'
// indices = [ sortedIndices | agentCell | agentBlob | neighbourCount ].
const INDEX_REGIONS = 4

// Live shader source. Swapped out by the HMR hook at the bottom of the file so
// editing a .wgsl rebuilds pipelines in place, keeping the simulation running.
let computeSrc = computeWgsl
let renderSrc = renderWgsl

const liveEngines = new Set()

export class Engine {
  constructor(device, context, format, canvas) {
    this.device = device
    this.context = context
    this.format = format
    this.canvas = canvas

    // All of these are recomputed per restart from the startup config.
    this.cellSize = CELL_SIZE
    this.worldSize = 0
    this.cellsPerRow = 0
    this.numCells = 0
    this.maxCollisions = MAX_COLLISIONS_CAP

    this.agentCount = 0
    this.speciesCount = 0
    this.matrix = null
    this.philicity = null
    this.sizeSeeds = null
    this.coreSizes = null
    this.lastSizeSpread = -1
    this.currentBuf = 0
    this.frameIndex = 0
    this.mediumFlip = 0
    this.forceRunSimHalf = null   // benchmark hook; see bench.js

    this.paramData = new Float32Array(PARAM_FLOATS)
    this.paramBuffer = device.createBuffer({
      label: 'params',
      size: PARAM_FLOATS * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    this.buffers = {}
    this.bindGroups = []

    this.#createLayouts()
    liveEngines.add(this)
  }

  static async create(canvas) {
    if (!navigator.gpu) {
      throw new Error(
        'WebGPU is not available in this browser. Try Chrome/Edge 113+, or Safari 26+.'
      )
    }
    const adapter = await navigator.gpu.requestAdapter({
      powerPreference: 'high-performance',
    })
    if (!adapter) throw new Error('No suitable GPU adapter found.')

    // Deliberately NOT raising maxStorageBufferBindingSize/maxBufferSize.
    // Requesting the adapter maximum (4 GiB here) made the neighbour loop
    // ~5000x slower — the driver evidently drops to a slow path for buffers
    // that large. Every supported agent count fits in the 128 MiB default
    // once maxCollisions is scaled down, so the default is what we want.
    const device = await adapter.requestDevice()
    const context = canvas.getContext('webgpu')
    const format = navigator.gpu.getPreferredCanvasFormat()
    context.configure({ device, format, alphaMode: 'opaque' })

    const engine = new Engine(device, context, format, canvas)
    engine.buildPipelines()
    return engine
  }

  // ------------------------------------------------------------- layouts ---

  #createLayouts() {
    const d = this.device
    const storage = (type) => ({ buffer: { type } })

    this.computeBGL = d.createBindGroupLayout({
      label: 'compute',
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, ...storage('read-only-storage') },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, ...storage('storage') },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, ...storage('storage') },
        { binding: 4, visibility: GPUShaderStage.COMPUTE, ...storage('read-only-storage') },
        { binding: 5, visibility: GPUShaderStage.COMPUTE, ...storage('storage') },
        { binding: 6, visibility: GPUShaderStage.COMPUTE, ...storage('storage') },
        { binding: 7, visibility: GPUShaderStage.COMPUTE, ...storage('storage') },
      ],
    })

    this.blitBGL = d.createBindGroupLayout({
      label: 'blit',
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'unfilterable-float' } },
      ],
    })

    this.renderBGL = d.createBindGroupLayout({
      label: 'render',
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
          buffer: { type: 'uniform' },
        },
        // grid, read-only — only the medium overlay touches it.
        {
          binding: 1,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: { type: 'read-only-storage' },
        },
      ],
    })
  }

  // ------------------------------------------------------------ pipelines ---

  buildPipelines() {
    const d = this.device

    const computeModule = d.createShaderModule({ label: 'compute.wgsl', code: computeSrc })
    const renderModule = d.createShaderModule({ label: 'render.wgsl', code: renderSrc })
    this.pendingCompilation = Promise.all([
      reportShaderErrors(computeModule, 'compute.wgsl'),
      reportShaderErrors(renderModule, 'render.wgsl'),
    ])

    const computeLayout = d.createPipelineLayout({ bindGroupLayouts: [this.computeBGL] })
    const makeCompute = (entryPoint, constants) =>
      d.createComputePipeline({
        label: constants ? `${entryPoint}:${JSON.stringify(constants)}` : entryPoint,
        layout: computeLayout,
        compute: { module: computeModule, entryPoint, constants },
      })

    this.pipelines = {
      countCells: makeCompute('countCells'),
      prefixSum: makeCompute('prefixSum'),
      scatter: makeCompute('scatter'),
      diffuseMedium: makeCompute('diffuseMedium'),
      densitySplat: makeCompute('densitySplat'),
      densityNormalize: makeCompute('densityNormalize'),
      densityBlur10: makeCompute('densityBlur', { DENS_1_TO_0: 1 }),
      densityBlur01: makeCompute('densityBlur', { DENS_1_TO_0: 0 }),
      resolveCollide: makeCompute('resolveCollide'),
      blobDensityInit: makeCompute('blobDensityInit'),
      blobBlurAB: makeCompute('blobBlur', { BLUR_A_TO_B: 1 }),
      blobBlurBA: makeCompute('blobBlur', { BLUR_A_TO_B: 0 }),
      blobSeed: makeCompute('blobSeed'),
      blobPropagate: makeCompute('blobPropagate'),
      resolveBlobs: makeCompute('resolveBlobs'),
      mutateSpecies: makeCompute('mutateSpecies'),
      blobStatsReset: makeCompute('blobStatsReset'),
      blobStatsAccum: makeCompute('blobStatsAccum'),
      splitBlobs: makeCompute('splitBlobs'),
    }

    // Two specialisations of the neighbour loop from the same source. The
    // discrete one compiles the bilinear species interpolation out entirely,
    // so leaving continuous species switched off costs literally nothing —
    // opt-in in cost, not just in behaviour.
    // Specialised by two independent axes: whether species are continuous, and
    // which halves of the blend are actually needed. At mixT 0 or 1 one half of
    // the neighbour loop is computed and then discarded by `mix()`, so the
    // extremes get a pipeline with it compiled out.
    this.runSimPipelines = {}
    for (const cont of [0, 1]) {
      for (const [key, boids, plife] of [
        ['both', 1, 1],
        ['boids', 1, 0],
        ['plife', 0, 1],
      ]) {
        this.runSimPipelines[`${cont}:${key}`] = makeCompute('runSim', {
          CONTINUOUS_SPECIES: cont,
          WANT_BOIDS: boids,
          WANT_PLIFE: plife,
        })
      }
    }

    const blend = {
      color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
    }
    const renderLayout = d.createPipelineLayout({ bindGroupLayouts: [this.renderBGL] })

    // Glow is additive: halos should sum where they overlap, which is what
    // makes dense regions bloom. Over-blending them would just muddy.
    const additive = {
      color: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
      alpha: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
    }

    // ...except on a light background, where adding to near-white does nothing.
    // There the halo has to darken instead: dst - src, leaving alpha alone.
    const subtractive = {
      color: { srcFactor: 'one', dstFactor: 'one', operation: 'reverse-subtract' },
      alpha: { srcFactor: 'zero', dstFactor: 'one', operation: 'add' },
    }

    const particleVertexBuffers = [
      {
        arrayStride: PARTICLE_BYTES,
        stepMode: 'instance',
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x2' }, // pos
          { shaderLocation: 1, offset: 8, format: 'float32x2' }, // vel
        ],
      },
      {
        arrayStride: 4,
        stepMode: 'instance',
        attributes: [{ shaderLocation: 2, offset: 0, format: 'float32' }], // species
      },
      {
        arrayStride: 4,
        stepMode: 'instance',
        attributes: [{ shaderLocation: 3, offset: 0, format: 'uint32' }], // blob
      },
      {
        arrayStride: 4,
        stepMode: 'instance',
        attributes: [{ shaderLocation: 4, offset: 0, format: 'uint32' }], // neighbours
      },
    ]

    // Same geometry, three specialisations: the solid agent, and its halo in
    // each of the two blend modes.
    const makeParticlePipeline = (label, glow, glowBlend, format = this.format) =>
      d.createRenderPipeline({
        label,
        layout: renderLayout,
        vertex: {
          module: renderModule,
          entryPoint: 'vsParticle',
          constants: { GLOW_PASS: glow ? 1 : 0 },
          buffers: particleVertexBuffers,
        },
        fragment: {
          module: renderModule,
          entryPoint: 'fsParticle',
          constants: { GLOW_PASS: glow ? 1 : 0 },
          targets: [{ format, blend: glow ? glowBlend : blend }],
        },
        primitive: { topology: 'triangle-strip' },
      })

    this.particlePipeline = makeParticlePipeline('particles', false)
    this.glowPipeline = makeParticlePipeline('particles:glow', true, additive)
    this.glowPipelineDark = makeParticlePipeline('particles:glow-dark', true, subtractive)

    const fullscreen = (label, entryPoint, format = this.format) =>
      d.createRenderPipeline({
        label,
        layout: renderLayout,
        vertex: { module: renderModule, entryPoint: 'vsFullscreen' },
        fragment: {
          module: renderModule,
          entryPoint,
          targets: [{ format, blend }],
        },
        primitive: { topology: 'triangle-list' },
      })

    this.gridPipeline = fullscreen('grid', 'fsGrid')
    this.mediumPipeline = fullscreen('medium', 'fsMedium')
    this.fieldPipeline = fullscreen('field', 'fsField')

    // Trails: the fade draws into the accumulation texture (hence its format),
    // the blit copies that texture onto the canvas (hence the canvas format
    // and its own bind group layout).
    this.fadePipeline = d.createRenderPipeline({
      label: 'trail-fade',
      layout: renderLayout,
      vertex: { module: renderModule, entryPoint: 'vsFullscreen' },
      fragment: {
        module: renderModule,
        entryPoint: 'fsFade',
        targets: [{ format: ACCUM_FORMAT, blend }],
      },
      primitive: { topology: 'triangle-list' },
    })

    this.blitPipeline = d.createRenderPipeline({
      label: 'trail-blit',
      layout: d.createPipelineLayout({ bindGroupLayouts: [this.renderBGL, this.blitBGL] }),
      vertex: { module: renderModule, entryPoint: 'vsFullscreen' },
      fragment: {
        module: renderModule,
        entryPoint: 'fsBlit',
        targets: [{ format: this.format }],
      },
      primitive: { topology: 'triangle-list' },
    })

    // Every pipeline that can draw into the accumulation texture needs a
    // matching-format twin, since a pipeline is bound to its target format.
    this.accumPipelines = {
      particles: makeParticlePipeline('particles:accum', false, null, ACCUM_FORMAT),
      glow: makeParticlePipeline('glow:accum', true, additive, ACCUM_FORMAT),
      glowDark: makeParticlePipeline('glow-dark:accum', true, subtractive, ACCUM_FORMAT),
      grid: fullscreen('grid:accum', 'fsGrid', ACCUM_FORMAT),
      medium: fullscreen('medium:accum', 'fsMedium', ACCUM_FORMAT),
      field: fullscreen('field:accum', 'fsField', ACCUM_FORMAT),
      drift: d.createRenderPipeline({
        label: 'drift:accum',
        layout: renderLayout,
        vertex: { module: renderModule, entryPoint: 'vsDrift' },
        fragment: {
          module: renderModule,
          entryPoint: 'fsDrift',
          targets: [{ format: ACCUM_FORMAT, blend }],
        },
        primitive: { topology: 'triangle-strip' },
      }),
    }

    // Decorative only, and entirely procedural — no vertex buffers at all.
    this.driftPipeline = d.createRenderPipeline({
      label: 'drift',
      layout: renderLayout,
      vertex: { module: renderModule, entryPoint: 'vsDrift' },
      fragment: {
        module: renderModule,
        entryPoint: 'fsDrift',
        targets: [{ format: this.format, blend }],
      },
      primitive: { topology: 'triangle-strip' },
    })
  }

  // -------------------------------------------------------------- buffers ---

  /**
   * How many collision partners we can afford to record per agent. The partner
   * list is agentCount * maxCollisions u32s and has to fit in a single storage
   * binding, so at very high agent counts we record fewer partners each.
   */
  #collisionCapacityFor(agentCount) {
    const limit = Math.min(
      this.device.limits.maxStorageBufferBindingSize,
      this.device.limits.maxBufferSize
    )
    const slots = Math.floor(limit / 4 / agentCount) - 1 // -1 for the counts region
    // Round down to a power of two so we keep clear headroom under the limit.
    const pow2 = slots > 0 ? 2 ** Math.floor(Math.log2(slots)) : 0
    return Math.max(4, Math.min(MAX_COLLISIONS_CAP, pow2))
  }

  /** Largest agent count this device can allocate buffers for. */
  maxSupportedAgents() {
    const limit = Math.min(
      this.device.limits.maxStorageBufferBindingSize,
      this.device.limits.maxBufferSize
    )
    // Binding with the fewest slots per agent wins: collisions at 4 partners.
    const byCollisions = Math.floor(limit / 4 / 5)
    const byDispatch =
      this.device.limits.maxComputeWorkgroupsPerDimension * WORKGROUP
    return Math.min(byCollisions, byDispatch)
  }

  /** (Re)build all per-simulation buffers. cfg comes from the startup panel. */
  restart(cfg) {
    const d = this.device

    const maxAgents = this.maxSupportedAgents()
    if (cfg.agentCount > maxAgents) {
      throw new Error(
        `${cfg.agentCount.toLocaleString()} agents exceeds this device's limit ` +
          `of ${maxAgents.toLocaleString()}.`
      )
    }

    const { particles, species, matrix, philicity, sizeSeeds } = buildParticles(cfg, {
      matrix: this.matrix,
      philicity: this.philicity,
      sizeSeeds: this.sizeSeeds,
    })

    this.destroyBuffers()

    this.agentCount = cfg.agentCount
    this.speciesCount = cfg.speciesCount
    this.matrix = matrix
    this.philicity = philicity
    this.currentBuf = 0
    this.mediumFlip = 0
    // Which runSim specialisation to dispatch. Only the spread startup option
    // can produce non-integer species today; once mutation lands it will have
    // to set this too, since it makes species continuous at runtime.
    this.continuousSpecies = (cfg.speciesSpread ?? 0) > 0

    this.worldSize = BASE_SIZE * cfg.worldSizeMult
    this.cellsPerRow = Math.ceil(this.worldSize / this.cellSize)
    this.numCells = this.cellsPerRow * this.cellsPerRow
    this.maxCollisions = this.#collisionCapacityFor(this.agentCount)

    const make = (label, size, usage, data) => {
      const buf = d.createBuffer({ label, size: Math.max(size, 4), usage })
      if (data) d.queue.writeBuffer(buf, 0, data)
      return buf
    }

    const S = GPUBufferUsage.STORAGE
    const V = GPUBufferUsage.VERTEX
    const CD = GPUBufferUsage.COPY_DST
    const CS = GPUBufferUsage.COPY_SRC // for debug readback

    this.buffers = {
      particleA: make('particleA', particles.byteLength, S | V | CD | CS, particles),
      particleB: make('particleB', particles.byteLength, S | V | CD | CS, particles),
      // COPY_SRC so species can be read back — it stops being a constant once
      // mutation lands, so being able to inspect it matters.
      species: make('species', species.byteLength, S | V | CD | CS, species),
      // [ speciesCount^2 matrix | philicities | core sizes ]
      matrix: make('matrix', (this.speciesCount + 2) * this.speciesCount * 4, S | CD),
      // [ counts | offsets | cursor | mediumA | mediumB | blob ]
      grid: make(
        'grid',
        (this.numCells * (GRID_REGIONS + BLOB_STAT_REGIONS) +
          2 * this.numCells * DENSITY_SUB ** 2) * 4,
        S | CD | CS
      ),
      // [ sortedIndices | agentCell | agentBlob ]. VERTEX so the render pass can
      // bind the blob region directly as an instance attribute at an offset,
      // instead of needing a storage buffer in the vertex stage.
      indices: make('indices', this.agentCount * INDEX_REGIONS * 4, S | V | CD | CS),
      // [ counts | partners ]
      collisions: make(
        'collisions',
        this.agentCount * (1 + this.maxCollisions) * 4,
        S | CD
      ),
    }

    const b = this.buffers
    this.uploadMatrix(matrix, philicity, sizeSeeds)

    // The medium starts uniformly saturated; agents carve their droplets out of
    // it. Both ping-pong regions are seeded so the first frame reads real data
    // whichever way the flip lands.
    const mediumInit = new Float32Array(this.numCells).fill(1)
    d.queue.writeBuffer(b.grid, this.numCells * 3 * 4, mediumInit)
    d.queue.writeBuffer(b.grid, this.numCells * 4 * 4, mediumInit)

    this.renderBindGroup = d.createBindGroup({
      layout: this.renderBGL,
      entries: [
        { binding: 0, resource: { buffer: this.paramBuffer } },
        { binding: 1, resource: { buffer: b.grid } },
      ],
    })

    const group = (inBuf, outBuf) =>
      d.createBindGroup({
        layout: this.computeBGL,
        entries: [
          { binding: 0, resource: { buffer: this.paramBuffer } },
          { binding: 1, resource: { buffer: inBuf } },
          { binding: 2, resource: { buffer: outBuf } },
          { binding: 3, resource: { buffer: b.species } },
          { binding: 4, resource: { buffer: b.matrix } },
          { binding: 5, resource: { buffer: b.grid } },
          { binding: 6, resource: { buffer: b.indices } },
          { binding: 7, resource: { buffer: b.collisions } },
        ],
      })

    // Index i => particle buffer i is the input, the other is the output.
    this.bindGroups = [group(b.particleA, b.particleB), group(b.particleB, b.particleA)]
    this.particleBuffers = [b.particleA, b.particleB]
  }

  /**
   * Re-upload the per-species data in place, without resetting positions. It
   * all lives in one buffer: matrix, then philicities, then core sizes.
   */
  uploadMatrix(matrix, philicity = this.philicity, sizeSeeds = this.sizeSeeds) {
    this.matrix = matrix
    this.philicity = philicity
    this.sizeSeeds = sizeSeeds
    this.coreSizes = new Float32Array(sizeSeeds.length)
    this.lastSizeSpread = -1 // force #syncCoreSizes to rebuild against the new seeds

    const q = this.device.queue
    q.writeBuffer(this.buffers.matrix, 0, matrix)
    q.writeBuffer(this.buffers.matrix, matrix.byteLength, philicity)
  }

  /**
   * Turn the per-species seeds into sizes for the current spread and push them
   * to the GPU. Only touches the buffer when the slider actually moved — it is
   * a handful of floats, so recomputing is cheaper than tracking it in Vue.
   */
  #syncCoreSizes(spread) {
    if (spread === this.lastSizeSpread) return
    this.lastSizeSpread = spread

    const sizes = this.coreSizes
    for (let i = 0; i < sizes.length; i++) sizes[i] = sizeFromSeed(this.sizeSeeds[i], spread)
    this.device.queue.writeBuffer(
      this.buffers.matrix,
      (this.speciesCount + 1) * this.speciesCount * 4,
      sizes
    )
  }

  destroyBuffers() {
    for (const buf of Object.values(this.buffers)) buf.destroy?.()
    this.buffers = {}
    this.bindGroups = []
  }

  // ---------------------------------------------------------------- frame ---

  #writeParams(p, viewportW, viewportH) {
    const a = this.paramData
    a[0] = p.dt
    a[1] = p.mixT
    a[2] = this.agentCount
    a[3] = this.speciesCount
    a[4] = p.boidVisionRadius
    a[5] = p.speciesInteractionRadius
    a[6] = p.alignmentForce
    a[7] = p.cohesionForce
    a[8] = p.separationForce
    a[9] = p.movementRandomness
    a[10] = p.movementScaling
    a[11] = forceSoftening(p)
    a[12] = p.centerAttraction
    a[13] = p.damping
    a[14] = p.minSpeed
    a[15] = p.maxSpeed
    a[16] = p.maxForce
    a[17] = collisionRadius(p)
    a[18] = this.maxCollisions
    a[19] = this.cellSize
    a[20] = this.cellsPerRow
    a[21] = this.numCells
    a[22] = p.drawRadius
    a[23] = this.worldSize
    a[24] = p.cameraX
    a[25] = p.cameraY
    a[26] = p.zoom
    a[27] = viewportW
    a[28] = viewportH
    a[29] = this.frameIndex
    a[30] = p.mediumEnabled ? p.mediumForce : 0
    a[31] = p.mediumDiffuse
    a[32] = p.mediumDisplace
    a[33] = Math.max(1, p.mediumCapacityMul * this.avgPerCell)
    a[34] = this.mediumFlip
    a[35] = p.showMedium && p.mediumEnabled ? 1 : 0
    const core = p.coreEnabled && p.coreStrength > 0
    a[36] = core ? coreRadius(p) : 0
    a[37] = p.coreStrength
    a[38] = p.coreFalloff
    // Blob colouring only means anything once labels exist.
    a[39] = p.renderMode === 1 && !p.blobsEnabled ? 0 : p.renderMode
    // Like the medium's threshold, expressed relative to average occupancy so
    // one setting behaves the same at any agent count or world size.
    a[40] = Math.max(1, Math.round(p.blobMinDensity * this.avgPerCell))
    a[41] = p.mutateRate
    a[42] = p.mutateBias
    a[43] = p.mutateInterval
    a[44] = Math.max(1, Math.round(p.driftCols))
    a[45] = p.driftSize
    a[46] = p.driftSpeed
    a[47] = p.driftBrightness
    a[48] = p.particleShape
    a[49] = p.speciesPalette
    a[50] = p.glowStrength
    a[51] = p.glowSize
    a[52] = p.velocityStretch
    a[53] = p.drawScale
    a[54] = p.drawJitter
    // Trails lerp the accumulated image toward the background, so the shader
    // needs the background colour the CPU would otherwise only use to clear.
    a[55] = 1 - Math.min(0.995, Math.max(0, p.trailStrength))
    const bg = BACKGROUNDS[p.background] ?? BACKGROUNDS[0]
    a[56] = bg.rgb.r
    a[57] = bg.rgb.g
    a[58] = bg.rgb.b
    a[59] = p.fieldMode
    // Like every other threshold here, expressed as a multiple of the average
    // cell occupancy so one setting behaves the same at any density.
    a[60] = Math.max(
      0.0001,
      (p.fieldThresholdMul * this.avgPerCell) / DENSITY_SUB ** 2
    )
    a[61] = p.fieldStrength
    a[62] = p.splitInterval
    a[63] = p.splitChance
    // Like the other thresholds, relative to average occupancy so one setting
    // means the same thing at any agent count.
    a[64] = Math.max(2, Math.round(p.splitMinBlobMul * this.avgPerCell))
    a[65] = p.splitImpulse
    a[66] = p.splitMutation
    // The neighbour loop scans a 3x3 block, so this is roughly what a typical
    // agent sees — the right normaliser for the coordination-number colouring.
    a[67] = Math.max(1, this.avgPerCell * 9)
    a[68] = p.outline
    a[69] = p.brownian ? 1 : 0
    this.device.queue.writeBuffer(this.paramBuffer, 0, a)
  }

  frame(p) {
    if (!this.agentCount) return

    const canvas = this.canvas
    this.#syncCoreSizes(p.coreSizeSpread)
    this.#writeParams(p, canvas.width, canvas.height)

    const d = this.device
    const encoder = d.createCommandEncoder()
    const running = p.dt > 0
    const medium = !!p.mediumEnabled

    if (running) {
      // Zero the per-cell counts and per-agent collision counts.
      encoder.clearBuffer(this.buffers.grid, 0, this.numCells * 4)
      encoder.clearBuffer(this.buffers.collisions, 0, this.agentCount * 4)
      if (p.fieldMode > 0) {
        const dBytes = this.numCells * DENSITY_SUB ** 2 * 4
        encoder.clearBuffer(this.buffers.grid, this.numCells * GRID_REGIONS * 4, dBytes)
      }

      const agentGroups = Math.ceil(this.agentCount / WORKGROUP)
      const pass = encoder.beginComputePass()
      pass.setBindGroup(0, this.bindGroups[this.currentBuf])

      pass.setPipeline(this.pipelines.countCells)
      pass.dispatchWorkgroups(agentGroups)

      pass.setPipeline(this.pipelines.prefixSum)
      pass.dispatchWorkgroups(1)

      pass.setPipeline(this.pipelines.scatter)
      pass.dispatchWorkgroups(agentGroups)

      // Must come after countCells (it reads the occupancy counts) and before
      // runSim (which samples the region it writes).
      if (medium) {
        pass.setPipeline(this.pipelines.diffuseMedium)
        pass.dispatchWorkgroups(Math.ceil(this.numCells / WORKGROUP))
      }

      // Exactly 0 or 1 means the other half is provably discarded; anything in
      // between needs both. `forceRunSimHalf` exists so bench.js can pin the
      // general pipeline at an extreme mixT and measure the specialisation
      // against an identical workload.
      const half =
        this.forceRunSimHalf ??
        (p.mixT >= 1 ? 'plife' : p.mixT <= 0 ? 'boids' : 'both')
      pass.setPipeline(
        this.runSimPipelines[`${this.continuousSpecies ? 1 : 0}:${half}`]
      )
      pass.dispatchWorkgroups(agentGroups)

      pass.setPipeline(this.pipelines.resolveCollide)
      pass.dispatchWorkgroups(agentGroups)

      // Blob labelling. The flood only needs redoing occasionally — blobs move
      // far slower than agents — but the per-agent lookup is refreshed every
      // frame because agents change cells constantly.
      if (p.blobsEnabled) {
        const cellGroups = Math.ceil(this.numCells / WORKGROUP)
        if (this.frameIndex % Math.max(1, p.blobInterval) === 0) {
          // Smooth the occupancy field, then threshold it. Blurring first is
          // what makes blobs come out rounded instead of cell-shaped.
          pass.setPipeline(this.pipelines.blobDensityInit)
          pass.dispatchWorkgroups(cellGroups)

          // Always an even number of passes so the result lands back in A.
          for (let i = 0; i < p.blobSmoothing; i++) {
            pass.setPipeline(this.pipelines.blobBlurAB)
            pass.dispatchWorkgroups(cellGroups)
            pass.setPipeline(this.pipelines.blobBlurBA)
            pass.dispatchWorkgroups(cellGroups)
          }

          pass.setPipeline(this.pipelines.blobSeed)
          pass.dispatchWorkgroups(cellGroups)

          // A label travels one cell per round, so full convergence needs as
          // many rounds as the widest blob is wide. Capped: past this, blobs
          // are world-spanning filaments that are not usefully "blobs" anyway.
          pass.setPipeline(this.pipelines.blobPropagate)
          const rounds = Math.min(this.cellsPerRow, p.blobRounds)
          for (let i = 0; i < rounds; i++) pass.dispatchWorkgroups(cellGroups)
        }

        pass.setPipeline(this.pipelines.resolveBlobs)
        pass.dispatchWorkgroups(agentGroups)

        // Mutation needs blob ids, so it can only run once they exist.
        if (p.mutateEnabled && this.frameIndex % Math.max(1, p.mutateInterval) === 0) {
          pass.setPipeline(this.pipelines.mutateSpecies)
          pass.dispatchWorkgroups(agentGroups)
          this.continuousSpecies = true // species are no longer integers
        }

        // Splitting needs per-blob size and centroid, so the stats pass runs
        // immediately before it on the same frame's labels.
        if (p.splitEnabled && this.frameIndex % Math.max(1, p.splitInterval) === 0) {
          pass.setPipeline(this.pipelines.blobStatsReset)
          pass.dispatchWorkgroups(cellGroups)
          pass.setPipeline(this.pipelines.blobStatsAccum)
          pass.dispatchWorkgroups(agentGroups)
          pass.setPipeline(this.pipelines.splitBlobs)
          pass.dispatchWorkgroups(agentGroups)
          if (p.splitMutation > 0) this.continuousSpecies = true
        }
      }

      // Smooth the occupancy counts for the density/metaball render. Placed
      // last so densA ends the frame with this smoothing — the blob code also
      // writes that region, but only on its reflood frames and for its own
      // threshold.
      if (p.fieldMode > 0) {
        const dCells = this.numCells * DENSITY_SUB ** 2
        const dGroups = Math.ceil(dCells / WORKGROUP)
        pass.setPipeline(this.pipelines.densitySplat)
        pass.dispatchWorkgroups(agentGroups)
        pass.setPipeline(this.pipelines.densityNormalize)
        pass.dispatchWorkgroups(dGroups)
        // Pairs, so the smoothed result always ends up in region 1 — which is
        // the one the fragment shader samples.
        for (let i = 0; i < p.fieldSmoothing; i++) {
          pass.setPipeline(this.pipelines.densityBlur10)
          pass.dispatchWorkgroups(dGroups)
          pass.setPipeline(this.pipelines.densityBlur01)
          pass.dispatchWorkgroups(dGroups)
        }
      }

      pass.end()

      // The output buffer now holds the newest state.
      this.currentBuf = 1 - this.currentBuf
    }

    const background = BACKGROUNDS[p.background] ?? BACKGROUNDS[0]
    const view = this.context.getCurrentTexture().createView()

    // With trails on, the scene is drawn into a texture that persists between
    // frames and is only partially faded; without them it goes straight to the
    // canvas as before, so switching trails off costs nothing.
    const trails = p.trailStrength > 0
    if (trails) this.#ensureAccum()
    else this.#releaseAccum()

    const target = trails ? this.accumView : view
    const clearAccum = trails && this.accumNeedsClear
    const P = trails ? this.accumPipelines : this

    const rp = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: target,
          clearValue: background.rgb,
          // Keeping the previous frame is the whole trick; the fade pass below
          // is what stops it accumulating forever.
          loadOp: trails && !clearAccum ? 'load' : 'clear',
          storeOp: 'store',
        },
      ],
    })
    rp.setBindGroup(0, this.renderBindGroup)

    if (trails && !clearAccum) {
      rp.setPipeline(this.fadePipeline)
      rp.draw(3)
    }
    this.accumNeedsClear = false

    // Behind everything: haze first, then the field overlays, then agents.
    if (p.driftEnabled) {
      const cols = Math.max(1, Math.round(p.driftCols))
      rp.setPipeline(trails ? P.drift : this.driftPipeline)
      rp.draw(4, cols * cols)
    }

    if (p.showMedium && medium) {
      rp.setPipeline(trails ? P.medium : this.mediumPipeline)
      rp.draw(3)
    }

    if (p.fieldMode > 0) {
      rp.setPipeline(trails ? P.field : this.fieldPipeline)
      rp.draw(3)
    }

    if (p.showGrid) {
      rp.setPipeline(trails ? P.grid : this.gridPipeline)
      rp.draw(3)
    }

    if (!p.showAgents) {
      rp.end()
      if (trails) this.#blit(encoder, view, background)
      d.queue.submit([encoder.finish()])
      this.frameIndex++
      if (running && medium) this.mediumFlip = 1 - this.mediumFlip
      return
    }

    rp.setVertexBuffer(0, this.particleBuffers[this.currentBuf])
    rp.setVertexBuffer(1, this.buffers.species)
    rp.setVertexBuffer(2, this.buffers.indices, this.agentCount * 2 * 4)
    rp.setVertexBuffer(3, this.buffers.indices, this.agentCount * 3 * 4)

    // Halo first so the solid cores sit on top of it.
    if (p.glowStrength > 0) {
      const dark = background.light
      rp.setPipeline(
        trails
          ? (dark ? P.glowDark : P.glow)
          : (dark ? this.glowPipelineDark : this.glowPipeline)
      )
      rp.draw(4, this.agentCount)
    }

    rp.setPipeline(trails ? P.particles : this.particlePipeline)
    rp.draw(4, this.agentCount)
    rp.end()

    if (trails) this.#blit(encoder, view, background)

    d.queue.submit([encoder.finish()])
    this.frameIndex++
    // Swap the medium regions only if diffuseMedium actually ran, so pausing
    // does not leave runSim reading a region nothing has written this frame.
    if (running && medium) this.mediumFlip = 1 - this.mediumFlip
  }

  /**
   * The trail accumulation texture. Recreated on resize; released when trails
   * are switched off so an unused full-screen texture is not left allocated.
   */
  #ensureAccum() {
    const { width, height } = this.canvas
    if (this.accum && this.accumW === width && this.accumH === height) return
    this.accum?.destroy?.()
    this.accum = this.device.createTexture({
      label: 'trail-accum',
      size: { width, height },
      format: ACCUM_FORMAT,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    })
    this.accumW = width
    this.accumH = height
    this.accumView = this.accum.createView()
    this.blitBindGroup = this.device.createBindGroup({
      layout: this.blitBGL,
      entries: [{ binding: 0, resource: this.accumView }],
    })
    // A fresh texture has undefined contents, so the first frame must clear it
    // rather than blend onto garbage.
    this.accumNeedsClear = true
  }

  /** Copy the trail accumulation texture onto the canvas. */
  #blit(encoder, view, background) {
    const blit = encoder.beginRenderPass({
      colorAttachments: [
        { view, clearValue: background.rgb, loadOp: 'clear', storeOp: 'store' },
      ],
    })
    blit.setPipeline(this.blitPipeline)
    blit.setBindGroup(0, this.renderBindGroup)
    blit.setBindGroup(1, this.blitBindGroup)
    blit.draw(3)
    blit.end()
  }

  #releaseAccum() {
    if (!this.accum) return
    this.accum.destroy?.()
    this.accum = null
    this.accumView = null
    this.blitBindGroup = null
  }

  /**
   * Zoom level that fits the whole world into the visible part of the canvas.
   * `rightInset` is how many device pixels the control panel covers on the
   * right — fitting to the full canvas would tuck a slice of the world
   * permanently underneath it.
   */
  fitZoom(rightInset = 0) {
    if (!this.worldSize) return 0.1
    const usableW = Math.max(1, this.canvas.width - rightInset)
    const shortest = Math.min(usableW, this.canvas.height)
    return (shortest * 0.92) / this.worldSize
  }

  /**
   * Mean agents per hash cell if they were spread evenly. The neighbour loop
   * visits a 3x3 block, so cost per agent tracks roughly 9x this.
   */
  get avgPerCell() {
    return this.numCells ? this.agentCount / this.numCells : 0
  }

  /** Debug helper: pull the (continuous) species values back to the CPU. */
  async readSpecies(count = 8) {
    return this.#readBack(this.buffers.species, Math.min(count, this.agentCount) * 4)
  }

  /** Debug helper: per-agent blob ids. BLOB_NONE (0xFFFFFFFF) means background. */
  async readAgentBlobs(count = this.agentCount) {
    const n = Math.min(count, this.agentCount)
    const out = await this.#readBack(this.buffers.indices, n * 4, this.agentCount * 2 * 4)
    return new Uint32Array(out.buffer)
  }

  /** Debug helper: per-cell agent counts, and the blob label of each cell. */
  async readCellBlobs() {
    const n = this.numCells
    const counts = await this.#readBack(this.buffers.grid, n * 4, 0)
    const labels = await this.#readBack(this.buffers.grid, n * 4, 5 * n * 4)
    return { counts: new Uint32Array(counts.buffer), labels: new Uint32Array(labels.buffer) }
  }

  async #readBack(source, size, sourceOffset = 0) {
    const staging = this.device.createBuffer({
      size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    })
    const enc = this.device.createCommandEncoder()
    enc.copyBufferToBuffer(source, sourceOffset, staging, 0, size)
    this.device.queue.submit([enc.finish()])
    await staging.mapAsync(GPUMapMode.READ)
    const out = new Float32Array(staging.getMappedRange().slice(0))
    staging.unmap()
    staging.destroy()
    return out
  }

  /** Debug helper: pull the current particle state back to the CPU. */
  async readParticles(count = 8) {
    const n = Math.min(count, this.agentCount)
    const size = n * PARTICLE_BYTES
    const staging = this.device.createBuffer({
      size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    })
    const enc = this.device.createCommandEncoder()
    enc.copyBufferToBuffer(this.particleBuffers[this.currentBuf], 0, staging, 0, size)
    this.device.queue.submit([enc.finish()])
    await staging.mapAsync(GPUMapMode.READ)
    const out = new Float32Array(staging.getMappedRange().slice(0))
    staging.unmap()
    staging.destroy()
    return out
  }

  destroy() {
    liveEngines.delete(this)
    this.#releaseAccum()
    this.destroyBuffers()
    this.paramBuffer.destroy?.()
    this.device.destroy?.()
  }
}

async function reportShaderErrors(module, label) {
  const info = await module.getCompilationInfo()
  for (const msg of info.messages) {
    const where = `${label}:${msg.lineNum}:${msg.linePos}`
    if (msg.type === 'error') console.error(`[WGSL] ${where} ${msg.message}`)
    else if (msg.type === 'warning') console.warn(`[WGSL] ${where} ${msg.message}`)
  }
}

function rebuildAllPipelines() {
  for (const e of liveEngines) {
    try {
      e.buildPipelines()
    } catch (err) {
      console.error('[WGSL] pipeline rebuild failed:', err)
    }
  }
}

// Hot-reload the shaders without restarting the simulation.
if (import.meta.hot) {
  import.meta.hot.accept(
    ['./compute.wgsl?raw', './render.wgsl?raw'],
    ([nextCompute, nextRender]) => {
      if (nextCompute) computeSrc = nextCompute.default
      if (nextRender) renderSrc = nextRender.default
      console.info('[WGSL] reloaded shaders')
      rebuildAllPipelines()
    }
  )
}
