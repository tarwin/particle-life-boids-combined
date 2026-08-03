// Simulation parameters + the slider metadata that drives the control panel.
// Defaults and ranges mirror particle_boids.gd / main.tscn.

// The Godot version's ParticleBoids TextureRect was 800x800 and everything
// (world size, start radius) was derived from that. We keep it as the reference
// "world unit" so tuned values carry over, while the canvas can be any size.
export const BASE_SIZE = 800

// Spatial-hash cell size. Must be >= the largest neighbourhood radius the
// sliders can reach (vision / sense both cap at 500), because the simulation
// only searches the 3x3 block of cells around each agent.
export const CELL_SIZE = 500

// Upper bound on recorded collision partners per agent. The real value is
// derived per-restart in the engine, since the partner buffer has to fit inside
// the device's max storage binding size at high agent counts.
export const MAX_COLLISIONS_CAP = 64

export const MIN_ZOOM = 0.002
export const MAX_ZOOM = 4.0

export const AGENT_COUNT_OPTIONS = [
  5120, 15360, 25600, 51200, 102400, 204800, 409600, 819200, 1638400,
]

export const SPECIES_COUNT_OPTIONS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 32,
]

// world size = BASE_SIZE * worldSizeMult. Bigger world, same agent count means
// lower density, which is what actually governs the cost of the neighbour loop.
export const WORLD_SIZE_OPTIONS = [10, 20, 30, 40, 60, 80, 120, 160]

// Repulsion profile inside the core radius. Index matches `coreFalloffAt()`
// in compute.wgsl — keep the two in sync.
export const CORE_FALLOFFS = [
  ['Linear', 'Even ramp to full strength at contact. The canonical particle-life core.'],
  ['Smooth', 'Quadratic — barely there at the surface, so cluster edges stay soft.'],
  ['Hard', 'Constant inside the radius. A step at the boundary; maximally rigid.'],
  ['Stiff', 'Inverse-distance, capped. Nearly incompressible at contact, ignorable further out.'],
]

// Index matches the `shapeCoverage` branch in render.wgsl.
export const PARTICLE_SHAPES = [
  ['Disc', 'Solid antialiased circle — stays crisp down to sub-pixel sizes.'],
  ['Soft', 'Gaussian falloff. Neighbouring agents merge into continuous mass.'],
  ['Ring', 'Hollow. Shows structure through dense clumps that solid discs hide.'],
  ['Square', 'Crisp and cheap to read at very small sizes.'],
  ['Diamond', 'The square rotated — reads as a distinct mark next to discs.'],
  ['Triangle', 'Directionless but angular; good with Motion Stretch.'],
  ['Plus', 'Thin cross. Sparse-looking even where agents are dense.'],
  // Must stay last: the shader treats any index >= the number of real shapes
  // as "vary per species".
  ['Varied', 'A different shape per species, so species read as different kinds of thing.'],
]

// Index matches the `palette` branch in render.wgsl.
export const SPECIES_PALETTES = [
  ['Heatmap', 'The original blue→cyan→green→yellow→red ramp. High contrast, not perceptually uniform.'],
  ['Viridis', 'Perceptually uniform — equal steps in species look like equal steps in brightness.'],
  ['Ember', 'Black through deep red and orange to white hot.'],
  ['Ice', 'Midnight blue through cyan to white.'],
  ['Cyclic', 'Full hue wheel. The honest choice for continuous species, where 0 and N−1 are neighbours.'],
  ['Mono', 'Greyscale. Lets glow and density carry the image instead of hue.'],
  ['Plasma', 'Indigo through magenta and orange to yellow. Bright throughout.'],
  ['Aurora', 'Deep teal through green to pale pink.'],
  ['Sunset', 'Night violet through coral to gold.'],
  ['Forest', 'Bark and moss through leaf green to sand.'],
  ['Neon', 'Near-black to magenta to cyan to white. Very high contrast.'],
  ['Pastel', 'Low saturation across the wheel — soft, and good on light backgrounds.'],
  ['Copper', 'Near-black through rust and copper to a bright highlight.'],
  ['Spectrum', 'Full rainbow without wrapping, so the ends stay distinguishable.'],
]

// Applied on the CPU as the render pass clear value, so no shader involvement.
export const BACKGROUNDS = [
  ['Void', { r: 0.04, g: 0.045, b: 0.06, a: 1 }],
  ['Black', { r: 0, g: 0, b: 0, a: 1 }],
  ['Midnight', { r: 0.02, g: 0.03, b: 0.08, a: 1 }],
  ['Slate', { r: 0.10, g: 0.11, b: 0.13, a: 1 }],
  ['Warm', { r: 0.07, g: 0.05, b: 0.045, a: 1 }],
  ['Deep Space', { r: 0.015, g: 0.015, b: 0.035, a: 1 }],
  ['Navy', { r: 0.03, g: 0.06, b: 0.12, a: 1 }],
  ['Ink', { r: 0.05, g: 0.07, b: 0.07, a: 1 }],
  ['Plum', { r: 0.08, g: 0.04, b: 0.10, a: 1 }],
  ['Moss', { r: 0.04, g: 0.07, b: 0.05, a: 1 }],
  ['Charcoal', { r: 0.16, g: 0.16, b: 0.17, a: 1 }],
  ['Paper', { r: 0.90, g: 0.89, b: 0.86, a: 1 }],
  ['Cream', { r: 0.96, g: 0.94, b: 0.88, a: 1 }],
  ['Sepia', { r: 0.85, g: 0.79, b: 0.68, a: 1 }],
].map(([name, rgb]) => ({
  name,
  rgb,
  // Additive glow cannot brighten a background that is already near-white, so
  // on light backgrounds the halo has to subtract instead. Rec. 709 luma.
  light: 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b > 0.5,
}))

// Index matches the `fieldMode` branch in render.wgsl.
export const FIELD_MODES = [
  ['Off', 'No field — agents only.'],
  ['Density', 'Shade the smoothed agent density directly. Continuous mass instead of dots.'],
  ['Metaball', 'Threshold the field into a surface, lit by its own gradient. The fluid look.'],
]

// Index matches the `renderMode` branch in render.wgsl.
export const RENDER_MODES = [
  ['Species', 'Hue by species. Continuous, so agents between basis species blend.'],
  ['Blob', 'Hue by connected-component id, hashed so adjacent blobs differ.'],
  ['Velocity', 'Direction as hue, speed as brightness — the optical-flow reading.'],
  ['Neighbours', 'Coordination number — draws the skin of a body rather than its bulk.'],
]

export const START_METHODS = [
  'Random',
  'Random Symmetric',
  'Ring',
  'Ring Symmetric',
  'Spiral',
  'Spiral Symmetric',
  'Bands',
  'Bands Symmetric',
]

export function defaultParams() {
  return {
    // speed / time
    dt: 0.25,

    // sim mix: 0 = pure boids, 1 = pure particle life
    mixT: 0.5,

    // vision kernels
    boidVisionRadius: 350,
    speciesInteractionRadius: 250,

    // boids
    alignmentForce: 1.0,
    cohesionForce: 1.0,
    separationForce: 1.0,

    // force adjustments
    movementRandomness: 0.01,
    // Off keeps the Godot behaviour, where Randomness is a fixed per-agent
    // bias. On makes it genuine per-frame Brownian noise.
    brownian: false,
    movementScaling: 1.0,
    forceSofteningMul: 3.0,
    centerAttraction: 0.0,
    damping: 0.98,
    minSpeed: 0.0,
    maxSpeed: 500.0,
    maxForce: 1000.0,

    // collision
    drawRadius: 2.0,
    collisionModifier: 2.0,

    // excluded volume — short-range repulsion that overrides attraction, so
    // agents keep real spacing. Radius is a fraction of the sense radius, so it
    // tracks the interaction scale instead of needing retuning alongside it.
    //
    // Off by default like every other addition, but the values below are what
    // it starts at once switched on: a very small, very soft core — enough to
    // stop agents occupying the same point, gentle enough that it does not
    // visibly reshape the structures the matrix produces. Tuned by hand; these
    // are a much better starting point than the 1.5 / 0.15 the feature was
    // originally built with.
    coreEnabled: false,
    coreRadiusFrac: 0.02,
    coreStrength: 0.2,
    coreFalloff: 1,       // Smooth
    // 0 = every species the same size; 1 = sizes spread over the full [0, 1],
    // so some species end up with almost no excluded volume at all.
    coreSizeSpread: 0.05,

    // medium (phobic / philic)
    mediumEnabled: false,
    mediumForce: 8.0,
    mediumDiffuse: 0.5,
    mediumDisplace: 0.25,
    // Displacement threshold as a multiple of the *average* agents per cell, so
    // the same value behaves the same at any agent count / world size.
    mediumCapacityMul: 2.0,

    // blobs — connected-component labelling over occupied cells
    blobsEnabled: false,
    blobInterval: 15,   // frames between re-floods
    blobRounds: 24,     // propagation rounds per flood
    // Blur passes over the density field before thresholding. Higher = rounder,
    // smoother blob outlines instead of the shape of the cell grid.
    blobSmoothing: 2,
    // Cells below this multiple of average occupancy are background, not blob.
    // Without a threshold every droplet merges through the gas between them.
    blobMinDensity: 2.0,

    // mutation — per-blob random drift in species space. Needs blobs.
    mutateEnabled: false,
    mutateRate: 0.05,     // species units per step
    // Boundaries reflect, so the walk already stays spread out without a push.
    // Left as a knob for deliberately driving species apart.
    mutateBias: 0,        // outward push, as a fraction of the rate
    mutateInterval: 30,   // frames between mutation steps

    // splitting — mitosis for blobs. Needs blob detection.
    splitEnabled: false,
    splitInterval: 90,      // frames between split events
    splitChance: 0.35,      // per qualifying blob, per event
    splitMinBlobMul: 8,     // min blob size, in multiples of average occupancy
    splitImpulse: 120,      // how hard the halves are pushed apart
    splitMutation: 0.25,    // species drift, opposite per half

    // rendering
    // These two were App-level refs; they live here so a saved configuration
    // captures them like every other visual setting.
    showGrid: false,
    showMedium: true,
    showAgents: true,

    // Density field. The spatial hash already counts agents per cell every
    // frame, so shading that costs one blur and one fullscreen pass.
    fieldMode: 0,           // 0 off, 1 density, 2 metaball
    fieldSmoothing: 2,      // blur pairs; higher = rounder, more merged
    fieldThresholdMul: 2.5, // surface sits here, in multiples of average occupancy
    fieldStrength: 1.0,
    renderMode: 0,        // 0 species, 1 blob, 2 velocity
    particleShape: 0,     // 0 disc, 1 soft, 2 ring, 3 square
    speciesPalette: 0,    // index into SPECIES_PALETTES
    background: 0,        // index into BACKGROUNDS
    glowStrength: 0,
    glowSize: 3.0,
    velocityStretch: 0,
    // Darkened rim per agent. Cheap depth: dense regions otherwise saturate
    // into one flat mass.
    outline: 0,
    // Visual size only. Multiplies drawRadius for rendering and nothing else —
    // drawRadius itself also feeds collisionRadius, so scaling it directly
    // would change the simulation, which a "make it bigger" control should not.
    drawScale: 1.0,
    drawJitter: 0,
    // Persistence of vision. 0 clears every frame as usual; higher values keep
    // more of the previous frame, so agents leave a decaying streak.
    trailStrength: 0,

    // drifting background motes — decorative only, no effect on the simulation.
    // Placed one per cell of a driftCols x driftCols jittered grid, which is
    // what keeps them from clumping into blotches.
    driftEnabled: false,
    driftCols: 40,          // 1,600 motes
    driftSize: 26,
    driftSpeed: 0.004,
    driftBrightness: 0.5,

    // auto-random: reroll on a timer, honouring the same section locks
    autoRandom: false,
    autoRandomSeconds: 20,

    // camera
    cameraX: 0,
    cameraY: 0,
    zoom: 0.1,
  }
}

export function defaultStartup() {
  return {
    startingMethod: 4,          // Spiral
    agentCount: 25600,
    speciesCount: 10,
    worldSizeMult: 20,
    interactionRange: 2.0,      // matrix forces random in [-x, +x]
    startRadiusMul: 16.0,
    lockMatrix: false,
    // How far agents may drift from their basis species, in species units.
    // 0 = every agent sits exactly on an integer, i.e. the original behaviour.
    speciesSpread: 0,
    // Every generated thing — layout, matrix, philicity, sizes — derives from
    // this. Same seed and same settings gives the same world back.
    seed: 1,
  }
}

export const SPECIES_SPREAD_OPTIONS = [0, 0.15, 0.3, 0.5, 1, 2]

// Derived values (kept as getters in the Godot original).
export const forceSoftening = (p) => p.speciesInteractionRadius * p.forceSofteningMul
export const collisionRadius = (p) => p.drawRadius + p.collisionModifier
// Widest a pair can exclude each other, i.e. when both species are size 1.
export const coreRadius = (p) => p.speciesInteractionRadius * p.coreRadiusFrac

// Per-species size from a stable random seed. Spread 0 makes every species the
// same; spread 1 lets them range over the whole [0, 1], so some have no
// excluded volume at all. Kept on the CPU so the slider can stay live.
export const sizeFromSeed = (seed, spread) => 1 - spread * (1 - seed)

// [key, label, min, max, step, group]
export const SLIDERS = [
  ['dt', 'Speed (dt)', 0, 0.5, 0.01, 'sim'],
  ['movementScaling', 'Movement Scaling', 0.1, 4, 0.1, 'sim'],
  ['drawRadius', 'Draw Size', 1, 5, 0.1, 'sim'],
  ['collisionModifier', 'Collide Modifier', 0, 5, 0.5, 'sim'],
  ['damping', 'Damping', 0.7, 1, 0.01, 'sim'],
  ['minSpeed', 'Min Speed', 0, 5, 0.1, 'sim'],
  ['maxSpeed', 'Max Speed', 2, 1000, 1, 'sim'],
  ['movementRandomness', 'Randomness', 0, 0.25, 0.01, 'sim'],
  ['centerAttraction', 'Center Pull', 0, 0.1, 0.01, 'sim'],

  ['boidVisionRadius', 'Vision Radius', 10, 500, 5, 'boids'],
  ['alignmentForce', 'Alignment', 0, 2, 0.1, 'boids'],
  ['cohesionForce', 'Cohesion', 0, 2, 0.1, 'boids'],
  ['separationForce', 'Separation', 0, 3, 0.1, 'boids'],

  ['speciesInteractionRadius', 'Sense Radius', 10, 500, 5, 'plife'],
  ['forceSofteningMul', 'Force Soften Mult', 0, 10, 0.1, 'plife'],
  ['maxForce', 'Max Force', 0, 2000, 1, 'plife'],

  ['coreStrength', 'Core Repulsion', 0, 20, 0.1, 'core'],
  ['coreRadiusFrac', 'Core Radius', 0, 1, 0.01, 'core'],
  ['coreSizeSpread', 'Size Spread', 0, 1, 0.05, 'core'],

  ['mediumForce', 'Medium Force', 0, 40, 0.5, 'medium'],
  ['mediumDiffuse', 'Diffusion', 0, 1, 0.05, 'medium'],
  ['mediumDisplace', 'Displacement', 0, 1, 0.05, 'medium'],
  ['mediumCapacityMul', 'Displace Threshold', 0.25, 8, 0.25, 'medium'],
]
