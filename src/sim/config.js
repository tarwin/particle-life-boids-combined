// Whole-configuration capture, apply, randomise, and named presets.
//
// A config is everything that makes a state reproducible: the live params, the
// startup config, and the per-species data (matrix, philicity, core sizes).
// Without the matrix a preset only reproduces the *knobs*, not the world — and
// the matrix is most of what makes any given state interesting.

import { defaultParams, defaultStartup } from './params.js'

export const CONFIG_VERSION = 1
const PRESETS_KEY = 'plb.presets'

// Matrix values carry far more precision than anyone needs to read; trimming
// keeps a 10-species config to a screenful instead of a wall of digits.
const round = (v, dp = 4) => Number(v.toFixed(dp))
const arr = (a, dp = 3) => (a ? Array.from(a, (v) => round(v, dp)) : null)

/**
 * Snapshot the current state as a plain, JSON-safe object. `name` is carried
 * so a copied config identifies itself — the preset store keys by name, but a
 * config pasted somewhere else would otherwise arrive anonymous.
 */
export function captureConfig({ params, startup, matrix, philicity, sizeSeeds, name }) {
  const cfg = {
    version: CONFIG_VERSION,
    name: name || undefined,
    params: {},
    startup: { ...startup },
  }
  for (const [k, v] of Object.entries(params)) {
    cfg.params[k] = typeof v === 'number' ? round(v) : v
  }
  if (matrix) cfg.matrix = arr(matrix)
  if (philicity) cfg.philicity = arr(philicity)
  if (sizeSeeds) cfg.sizeSeeds = arr(sizeSeeds)
  return cfg
}

/**
 * Merge a parsed config into the live objects. Only keys that already exist are
 * copied, so an old or hand-edited config cannot inject junk — and a config
 * saved before a feature existed simply leaves that feature at its default.
 *
 * Returns what the caller needs to act on: whether a restart is required, and
 * the per-species arrays to upload once it has happened.
 */
export function applyConfig(cfg, { params, startup }) {
  if (!cfg || typeof cfg !== 'object') throw new Error('Config must be an object.')

  const merge = (target, source, defaults) => {
    let changed = false
    if (!source || typeof source !== 'object') return changed
    for (const key of Object.keys(defaults)) {
      if (!(key in source)) continue
      const want = source[key]
      const isNum = typeof defaults[key] === 'number'
      if (isNum && (typeof want !== 'number' || !Number.isFinite(want))) continue
      if (!isNum && typeof want !== typeof defaults[key]) continue
      if (target[key] !== want) changed = true
      target[key] = want
    }
    return changed
  }

  merge(params, cfg.params, defaultParams())
  // Startup only takes effect on restart, so track whether it actually moved.
  const startupChanged = merge(startup, cfg.startup, defaultStartup())

  const n = startup.speciesCount
  const sized = (a, len) => (Array.isArray(a) && a.length === len ? Float32Array.from(a) : null)

  return {
    needsRestart: startupChanged,
    matrix: sized(cfg.matrix, n * n),
    philicity: sized(cfg.philicity, n),
    sizeSeeds: sized(cfg.sizeSeeds, n),
  }
}

// --------------------------------------------------------------- randomise ---

// All four close over a caller-supplied source, so Random is reproducible from
// the seed rather than being the one thing that is not.
let R = Math.random
const rnd = (a, b) => a + R() * (b - a)
const pick = (xs) => xs[Math.floor(R() * xs.length)]
const chance = (p) => R() < p
const snap = (v, step) => Math.round(v / step) * step

/**
 * Sane ranges, deliberately narrower than the slider bounds. Uniform sampling
 * over the full range of every slider mostly produces dead or exploded states;
 * these are the bands where the simulation stays alive and interesting.
 *
 * Agent count and world size are left alone on purpose — they govern density,
 * which governs frame cost, and a Random button should not tank the frame rate.
 */
const PARAM_RANGES = {
  sim: {
    mixT: [0, 1, 0.05],
    dt: [0.15, 0.35, 0.01],
    movementScaling: [0.6, 2.0, 0.1],
    damping: [0.92, 1.0, 0.01],
    minSpeed: [0, 2, 0.1],
    maxSpeed: [200, 800, 1],
    movementRandomness: [0, 0.06, 0.01],
    centerAttraction: [0, 0.03, 0.01],
    collisionModifier: [0, 3, 0.5],
  },
  boids: {
    boidVisionRadius: [150, 450, 5],
    alignmentForce: [0, 2, 0.1],
    cohesionForce: [0, 2, 0.1],
    separationForce: [0, 3, 0.1],
  },
  plife: {
    speciesInteractionRadius: [120, 400, 5],
    forceSofteningMul: [1, 6, 0.1],
    maxForce: [500, 1500, 1],
  },
}

/** Sections Random can be locked out of, in panel order. */
export const RANDOM_SECTIONS = [
  ['startup', 'Startup'],
  ['matrix', 'Interaction Matrix'],
  ['sim', 'Simulation'],
  ['boids', 'Boids'],
  ['plife', 'Particle Life'],
  ['core', 'Excluded Volume'],
  ['medium', 'Medium'],
  ['blobs', 'Blobs'],
  ['view', 'View'],
]

/**
 * A fresh random configuration. `locked` is a { section: true } map of sections
 * to leave alone, so you can pin the parts you like and reroll the rest.
 *
 * Returns partial patches plus what the caller has to do about them: startup
 * changes need a restart, and the matrix is regenerated separately.
 */
export function randomConfig(locked = {}, rand = Math.random) {
  R = rand
  const params = {}
  const on = (section) => !locked[section]

  for (const [section, ranges] of Object.entries(PARAM_RANGES)) {
    if (!on(section)) continue
    for (const [key, [lo, hi, step]] of Object.entries(ranges)) {
      params[key] = snap(rnd(lo, hi), step)
    }
  }

  if (on('core')) {
    // Usually on, and usually gentle. Strong cores are a legitimate look but
    // they dominate everything else, so they stay rare.
    params.coreEnabled = chance(0.75)
    params.coreStrength = chance(0.8) ? snap(rnd(0.1, 1.2), 0.1) : snap(rnd(1.5, 5), 0.1)
    params.coreRadiusFrac = snap(rnd(0.02, 0.25), 0.01)
    params.coreSizeSpread = chance(0.5) ? 0 : snap(rnd(0.1, 1), 0.05)
    params.coreFalloff = Math.floor(rnd(0, 4))
  }

  if (on('medium')) {
    params.mediumEnabled = chance(0.4)
    params.mediumForce = snap(rnd(3, 20), 0.5)
    params.mediumDiffuse = snap(rnd(0.2, 0.8), 0.05)
    params.mediumDisplace = snap(rnd(0.1, 0.5), 0.05)
    params.mediumCapacityMul = snap(rnd(1, 4), 0.25)
  }

  if (on('blobs')) {
    params.blobsEnabled = chance(0.3)
    params.blobMinDensity = snap(rnd(1, 4), 0.1)
    params.blobSmoothing = Math.floor(rnd(0, 5))
    params.mutateEnabled = params.blobsEnabled && chance(0.5)
    params.mutateRate = snap(rnd(0.02, 0.2), 0.01)
  }

  if (on('view')) {
    // Free rein — none of it can break the simulation.
    params.renderMode = chance(0.75) ? 0 : pick([1, 2])
    params.particleShape = Math.floor(rnd(0, 8))
    params.speciesPalette = Math.floor(rnd(0, 14))
    params.background = chance(0.85) ? Math.floor(rnd(0, 11)) : Math.floor(rnd(11, 14))
    params.glowStrength = chance(0.5) ? 0 : snap(rnd(0.1, 0.8), 0.02)
    params.glowSize = snap(rnd(2, 8), 0.5)
    params.velocityStretch = chance(0.6) ? 0 : snap(rnd(1, 30), 0.25)
    params.drawScale = snap(rnd(0.6, 3), 0.1)
    params.drawJitter = chance(0.5) ? 0 : snap(rnd(0.1, 0.8), 0.05)
    params.trailStrength = chance(0.7) ? 0 : snap(rnd(0.5, 0.95), 0.01)
    // The fluid look is striking but takes over the image, so it stays occasional.
    params.fieldMode = chance(0.8) ? 0 : pick([1, 2])
    params.fieldSmoothing = Math.floor(rnd(1, 5))
    params.fieldThresholdMul = snap(rnd(1, 5), 0.1)
    params.fieldStrength = snap(rnd(0.6, 1), 0.05)
    params.showAgents = params.fieldMode === 2 ? chance(0.5) : true
    params.driftEnabled = chance(0.1)   // a rare garnish, not a regular
    params.driftBrightness = snap(rnd(0.2, 0.7), 0.05)

    // Blob colouring is meaningless without labels to colour by — but only
    // force them on if blobs are ours to change.
    if (params.renderMode === 1) {
      if (on('blobs')) params.blobsEnabled = true
      else params.renderMode = 0
    }
  }

  const startup = on('startup')
    ? {
        startingMethod: Math.floor(rnd(0, 8)),
        speciesCount: pick([3, 4, 5, 6, 7, 8, 9, 10, 12, 16]),
        interactionRange: pick([1, 2, 3]),
        speciesSpread: chance(0.7) ? 0 : pick([0.15, 0.3, 0.5, 1]),
      }
    : {}

  return {
    params,
    startup,
    needsRestart: on('startup'),
    rerollMatrix: on('matrix'),
  }
}

// ----------------------------------------------------------------- presets ---

const ADJECTIVES = [
  'amber', 'brisk', 'coral', 'dusky', 'eager', 'faint', 'glassy', 'hazy',
  'ionic', 'jagged', 'keen', 'lucid', 'molten', 'noble', 'opal', 'placid',
  'quiet', 'restless', 'silken', 'tidal', 'umbral', 'vivid', 'woven', 'zephyr',
]
const NOUNS = [
  'bloom', 'cascade', 'drift', 'ember', 'filament', 'gyre', 'halo', 'isthmus',
  'lattice', 'mantle', 'nimbus', 'orbit', 'plume', 'quanta', 'ripple',
  'stratum', 'tendril', 'vortex', 'wisp',
]

/** A suggested name, avoiding ones already taken. */
export function suggestName(existing = []) {
  const taken = new Set(existing)
  for (let i = 0; i < 50; i++) {
    const name = `${pick(ADJECTIVES)}-${pick(NOUNS)}`
    if (!taken.has(name)) return name
  }
  return `preset-${Date.now().toString(36)}`
}

export function loadPresets() {
  try {
    const raw = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}')
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
  } catch {
    // A corrupt store should not take the app down with it.
    return {}
  }
}

export function savePreset(name, config) {
  const all = loadPresets()
  all[name] = { ...config, name }
  localStorage.setItem(PRESETS_KEY, JSON.stringify(all))
  return all
}

export function deletePreset(name) {
  const all = loadPresets()
  delete all[name]
  localStorage.setItem(PRESETS_KEY, JSON.stringify(all))
  return all
}
