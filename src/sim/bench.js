// A benchmark you can trust.
//
// Every performance measurement in this project that was taken casually turned
// out to be wrong, twice by enough to invert the conclusion ("the field is 9%
// *faster* when enabled"). The causes are all the same shape: the thing being
// measured moves while you measure it.
//
//   1. The simulation evolves. Two runs a few seconds apart are different
//      workloads — denser clusters mean more neighbours mean more work. So A/B
//      must be *interleaved* on one state, never "measure A, then measure B".
//   2. requestAnimationFrame is throttled when the window is not visible, so
//      wall-clock FPS is meaningless. Drive `engine.frame()` directly.
//   3. GPU clocks drift between page loads. Absolute ms are not comparable
//      across sessions; only within one run.
//   4. The starting layout is random for most patterns. Ring is index-only and
//      Lock matrix pins the forces, so that pair is reproducible.
//
// Keep a single call short. A run is `rounds * variants * (warmup + frames)`
// frames plus `settle`, driven as fast as the GPU will take them, and a big one
// can outlast a console/devtools evaluation timeout. If that happens the run is
// killed mid-flight, the `finally` never executes, and the caller is left on the
// benchmark's Ring + locked-matrix startup — restore it by hand. Prefer several
// small calls over one large one.
//
// Usage from the console:
//   const { bench } = await import('/src/sim/bench.js')
//   await bench(__engine, params, startup, {
//     variants: { off: p => { p.fieldMode = 0 }, on: p => { p.fieldMode = 2 } },
//   })

/** Ring layout has no randomness and Lock matrix pins the forces. */
export function deterministicStart(startup, { seed = 20250101 } = {}) {
  return { ...startup, startingMethod: 2, lockMatrix: true, seed, speciesSpread: 0 }
}

/**
 * Interleaved A/B/A/B... over named variants.
 *
 * @param engine   the live Engine
 * @param params   the reactive params object (mutated by variant callbacks)
 * @param startup  the startup config
 * @param opts.variants  { name: (params) => void } — each sets up its condition
 * @param opts.restart   called to rebuild the world (App's restart)
 * @param opts.frames    timed frames per sample
 * @param opts.warmup    untimed frames before each sample
 * @param opts.rounds    how many times to cycle through every variant
 */
export async function bench(engine, params, startup, opts = {}) {
  const {
    variants,
    restart,
    frames = 300,
    warmup = 60,
    rounds = 5,
    settle = 600,
    discardRounds = 1,
  } = opts
  if (!variants) throw new Error('bench() needs opts.variants')

  const names = Object.keys(variants)
  const samples = Object.fromEntries(names.map((n) => [n, []]))
  // Both get restored in the `finally` below — benchmarking must not leave the
  // caller on a Ring layout with a locked matrix.
  const beforeParams = { ...params }
  const beforeStartup = { ...startup }

  // One shared starting state. Everything after this is the same world.
  if (restart) {
    Object.assign(startup, deterministicStart(startup))
    restart()
  }
  for (let i = 0; i < settle; i++) engine.frame(params)
  await engine.device.queue.onSubmittedWorkDone()

  try {
  for (let r = 0; r < rounds; r++) {
    for (const name of names) {
      variants[name](params)
      for (let i = 0; i < warmup; i++) engine.frame(params)
      await engine.device.queue.onSubmittedWorkDone()

      const t0 = performance.now()
      for (let i = 0; i < frames; i++) engine.frame(params)
      await engine.device.queue.onSubmittedWorkDone()
      samples[name].push((performance.now() - t0) / frames)
    }
  }

  } finally {
    Object.assign(params, beforeParams)
    Object.assign(startup, beforeStartup)
    engine.forceRunSimHalf = null
    if (restart) restart()
  }

  // Median of the middle values: robust to a slow first round and to the odd
  // scheduling hiccup, without needing many rounds.
  const median = (a) => {
    const s = [...a].sort((x, y) => x - y)
    const mid = s.length >> 1
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
  }

  const result = {}
  for (const name of names) {
    result[name] = {
      ms: +median(samples[name]).toFixed(3),
      runs: samples[name].map((v) => +v.toFixed(2)),
    }
  }

  // The headline number is the median of the *per-round ratios*, not the ratio
  // of medians. Even interleaved, absolute times drift a lot across a run as
  // the simulation settles — 3x within one variant is normal. Pairing each
  // round against its own neighbour cancels that drift; comparing pooled
  // medians does not, and can invert the answer outright.
  // Drop the opening round(s). `settle` is never quite enough — a pure-boids
  // state kept clustering for thousands of frames, and its first two rounds
  // measured a workload an order of magnitude lighter than the rest, reporting
  // the specialisation as 54% *slower* when it was 30% faster.
  const keep = (a) => a.slice(Math.min(discardRounds, a.length - 1))

  const base = names[0]
  for (const name of names.slice(1)) {
    const ratios = keep(samples[name]).map((v, i) => v / keep(samples[base])[i])
    const m = median(ratios)
    result[name].vsFirst = `${((m - 1) * 100).toFixed(1)}%`
    result[name].perRound = ratios.map((r) => `${((r - 1) * 100).toFixed(0)}%`)
  }
  result.note =
    `paired per-round ratios vs "${base}", first ${discardRounds} round(s) dropped; ` +
    `absolute ms drift as the sim settles`
  return result
}
