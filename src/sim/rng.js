// Seeded randomness, so a configuration is actually reproducible.
//
// Every generative step — starting layout, interaction matrix, philicity, core
// size seeds, and the Random button's own choices — draws from a stream derived
// from one integer seed. Save the seed with the config and you get the same
// world back, which `Math.random()` could never give you.

/**
 * mulberry32: small, fast, and good enough for scattering particles. Not
 * cryptographic and not trying to be.
 */
export function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Independent stream per purpose. Without this, changing the species count
 * would shift every later draw and the starting layout would change too —
 * each stream needs to advance on its own.
 */
export function streamSeed(seed, stream) {
  let h = (seed >>> 0) ^ Math.imul(stream >>> 0, 0x9e3779b9)
  h ^= h >>> 16
  h = Math.imul(h, 0x7feb352d)
  h ^= h >>> 15
  h = Math.imul(h, 0x846ca68b)
  h ^= h >>> 16
  return h >>> 0
}

/** Stream ids. Append only — changing one changes every existing seed's world. */
export const STREAM = {
  positions: 1,
  matrix: 2,
  philicity: 3,
  sizeSeeds: 4,
  randomConfig: 5,
}

export const streamRng = (seed, stream) => mulberry32(streamSeed(seed, stream))

/** A fresh seed for when the user asks for something genuinely new. */
export function newSeed() {
  return (Math.random() * 4294967296) >>> 0
}
