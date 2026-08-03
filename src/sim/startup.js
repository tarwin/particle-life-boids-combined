// Port of startup_manager.gd — initial particle layouts and interaction matrices.

import { BASE_SIZE } from './params.js'
import { streamRng, STREAM } from './rng.js'

const TAU = Math.PI * 2

// Every generator takes its own random source so the whole startup is
// reproducible from a seed. Defaulting to Math.random keeps these usable
// standalone, but the app always passes a seeded stream.
const makeRange = (rand) => (a, b) => a + rand() * (b - a)

// --------------------------------------------------------------- matrices ---

export function generateMatrixRandom(count, forceRange, rand = Math.random) {
  const randRange = makeRange(rand)
  const m = new Float32Array(count * count)
  for (let i = 0; i < m.length; i++) m[i] = randRange(-forceRange, forceRange)
  return m
}

export function generateMatrixSymmetric(count, forceRange, rand = Math.random) {
  const randRange = makeRange(rand)
  const m = new Float32Array(count * count)
  for (let i = 0; i < count; i++) {
    for (let j = i; j < count; j++) {
      const v = randRange(-forceRange, forceRange)
      m[i * count + j] = v
      m[j * count + i] = v
    }
  }
  return m
}

/**
 * Per-species affinity for the medium, in [-1, +1]. Positive is philic (climbs
 * the concentration gradient), negative is phobic (flees it, which makes those
 * species coalesce into droplets to minimise their contact area).
 */
export function generatePhilicity(count, rand = Math.random) {
  const randRange = makeRange(rand)
  const p = new Float32Array(count)
  for (let i = 0; i < count; i++) p[i] = randRange(-1, 1)
  return p
}

/**
 * Per-species random unit values, turned into excluded-volume sizes by the
 * Size Spread slider. Stored as seeds rather than sizes so the slider can move
 * without rerolling which species happen to be the big ones.
 */
export function generateSizeSeeds(count, rand = Math.random) {
  const s = new Float32Array(count)
  for (let i = 0; i < count; i++) s[i] = rand()
  return s
}

// -------------------------------------------------------------- positions ---

function posRandom(cfg, _i, _s, randRange) {
  const radius = (BASE_SIZE * cfg.startRadiusMul) * 0.5
  return [randRange(-radius, radius), randRange(-radius, radius)]
}

function posRing(cfg, i) {
  const radius = BASE_SIZE * cfg.startRadiusMul * 0.25
  const angle = (TAU / cfg.agentCount) * i
  return [Math.cos(angle) * radius, Math.sin(angle) * radius]
}

function posColumns(cfg, i, s, randRange) {
  const bandWidth = (BASE_SIZE / cfg.speciesCount) * cfg.startRadiusMul
  const halfWidth = (bandWidth * cfg.speciesCount) * 0.5
  const x = randRange(s * bandWidth, (s + 1) * bandWidth) - halfWidth
  const y = randRange(0, BASE_SIZE) - BASE_SIZE * 0.5
  return [x, y]
}

function makeSpiral(cfg, rand) {
  const maxRadius = BASE_SIZE * cfg.startRadiusMul * 0.5
  const arms = 4
  const turns = 3.0
  const spread = 0.015
  const baseAngle = rand() * TAU

  return (_cfg, i, _s, randRange) => {
    const armAngle = (TAU / arms) * (i % arms)
    const t = i / cfg.agentCount
    let radius = t * maxRadius
    let angle = turns * (radius / maxRadius) * TAU + armAngle + baseAngle
    angle += randRange(-spread, spread)
    radius += randRange(-spread * maxRadius, spread * maxRadius)
    return [Math.cos(angle) * radius, Math.sin(angle) * radius]
  }
}

// Each method: [positionFn, useSymmetricMatrix]
function resolveMethod(method, cfg, rand) {
  switch (method) {
    case 0: return [posRandom, false]
    case 1: return [posRandom, true]
    case 2: return [posRing, false]
    case 3: return [posRing, true]
    case 4: return [makeSpiral(cfg, rand), false]
    case 5: return [makeSpiral(cfg, rand), true]
    case 6: return [posColumns, false]
    case 7: return [posColumns, true]
    default: return [posRandom, false]
  }
}

/**
 * Build the initial particle state.
 * @param cfg { startingMethod, agentCount, speciesCount, worldSizeMult,
 *              interactionRange, startRadiusMul, lockMatrix }
 * @param existingMatrix reused when cfg.lockMatrix is set
 * @param existing { matrix, philicity, sizeSeeds } reused when cfg.lockMatrix is set
 */
export function buildParticles(cfg, existing = {}) {
  const seed = cfg.seed >>> 0
  const posRand = streamRng(seed, STREAM.positions)
  const randRange = makeRange(posRand)
  const [posFn, symmetric] = resolveMethod(cfg.startingMethod, cfg, posRand)

  // Interleaved [posX, posY, velX, velY] to match the Particle struct.
  const particles = new Float32Array(cfg.agentCount * 4)
  // Species is continuous — an agent may sit between two basis species.
  const species = new Float32Array(cfg.agentCount)

  // How far an agent may drift from its basis species, in basis-species units.
  // 0 puts everyone exactly on an integer, which is the original behaviour.
  const spread = cfg.speciesSpread ?? 0
  const maxSpecies = cfg.speciesCount - 1

  for (let i = 0; i < cfg.agentCount; i++) {
    const s = i % cfg.speciesCount
    const [x, y] = posFn(cfg, i, s, randRange)
    particles[i * 4 + 0] = x
    particles[i * 4 + 1] = y
    particles[i * 4 + 2] = 0
    particles[i * 4 + 3] = 0
    species[i] = spread
      ? Math.min(maxSpecies, Math.max(0, s + randRange(-spread, spread)))
      : s
  }

  const n = cfg.speciesCount
  const keepMatrix =
    cfg.lockMatrix && existing.matrix && existing.matrix.length === n * n

  // Separate streams, so changing the species count does not also reshuffle
  // the starting layout.
  const matrixRand = streamRng(seed, STREAM.matrix)
  const matrix = keepMatrix
    ? existing.matrix
    : symmetric
      ? generateMatrixSymmetric(n, cfg.interactionRange, matrixRand)
      : generateMatrixRandom(n, cfg.interactionRange, matrixRand)

  // Lock matrix holds the whole per-species character, not just the forces.
  const keep = (arr) => keepMatrix && arr && arr.length === n
  const philicity = keep(existing.philicity)
    ? existing.philicity
    : generatePhilicity(n, streamRng(seed, STREAM.philicity))
  const sizeSeeds = keep(existing.sizeSeeds)
    ? existing.sizeSeeds
    : generateSizeSeeds(n, streamRng(seed, STREAM.sizeSeeds))

  return { particles, species, matrix, philicity, sizeSeeds }
}
