# FINDINGS — things to know before changing this code

Written for whoever (or whatever) picks this up next. `README.md` covers what
the project *is*; this file covers what bit me, what is load-bearing, and where
the traps are.

---

## 1. Do not raise the WebGPU buffer size limits. Ever.

**This is the single most important thing in this file.**

`Engine.create()` calls `adapter.requestDevice()` with **no `requiredLimits`**.
That is deliberate and there is a comment saying so in `engine.js:71`.

I once added `requiredLimits: { maxStorageBufferBindingSize: <adapter max>,
maxBufferSize: <adapter max> }` — raising the limit from the 128 MiB default to
4 GiB on this Mac. The result:

| Config | ms/frame |
| --- | --- |
| Default limits (128 MiB) | **24.6** |
| Adapter-max limits (4 GiB) | **26,541.5** |

Same agent count, same world, same shader. **~1000× slower.** The driver
evidently drops off a fast path for buffers *declared* that large — the buffers
being allocated were the same size in both runs.

How I know it was not density: the slow run scanned ~114M pairs; an earlier
4.88 ms run had scanned ~140M. *Less* work, 5000× slower. Density cannot
explain that; the limits request was the only structural change.

Nothing needs the higher limit. `#collisionCapacityFor()` scales
`maxCollisions` down (64 → 32 → 16) so the collision-partner buffer stays
inside the 128 MiB default all the way to 1,638,400 agents. Verified: the
largest configuration allocates 106.3 MiB.

If a future feature genuinely needs a bigger buffer, **split it into multiple
bindings** rather than raising the limit.

---

## 2. The 8-storage-buffer limit is fully consumed

The compute bind group uses **all 8** of WebGPU's default
`maxStorageBuffersPerShaderStage`. There is no room for a ninth. This is why
several buffers pack multiple logical regions:

```
grid        = [ counts | offsets | cursor | mediumA | mediumB | blob
              | densA | densB ]                  each numCells
indices     = [ sortedIndices | agentCell | agentBlob ]   each agentCount
collisions  = [ counts | partners ]               agentCount, agentCount*maxCollisions
interaction = [ speciesCount^2 matrix | philicities | core sizes ]  (n^2 + 2n)
```

Any new per-cell or per-agent data must be packed into one of these, not bound
separately. Adding a region means updating the size in `restart()` **and**
every offset in `compute.wgsl`.

The medium field is the worked example: it needed a per-cell f32 array and got
two regions on `grid` instead of a binding. Two, not one, because the diffusion
blur cannot read and write the same region — they ping-pong on a `mediumFlip`
param. `grid` is `array<atomic<u32>>`, so the f32s are `bitcast` on every load
and store; that is free, but it means the medium regions can only be touched
through `atomicLoad`/`atomicStore`.

Species is an **f32**, not an index — see the README. Everything indexed by
species therefore goes through `speciesBracket()` / `speciesLerp()` rather than
a direct `u32(species[i])` lookup. If you add another per-species scalar,
interpolate it too, or agents between basis species will read the wrong value.
At integer species the fractions are zero and interpolation is exact, so the
discrete default is bit-identical to the old integer code.

`interaction` follows the same pattern for per-species scalars: philicity, then
core size. Both are `speciesCount` floats appended past the matrix, addressed
by `philicityBase()` / `coreSizeBase()` in the shader rather than by open-coded
offsets — there are enough of them now that open-coding invites a mistake.

`indices` also carries `GPUBufferUsage.VERTEX`, so the render pass binds its
blob region **as an instance attribute at a byte offset** — that is how blob
colouring reaches the vertex stage without a storage binding there.

The render pipeline binds **one** storage buffer — `grid`, read-only, in
the fragment stage only, purely so the medium overlay can sample the field.
That is a separate budget from the compute stage's 8. Keep the *vertex* stage
at zero: the particle buffers carry `GPUBufferUsage.VERTEX` and are read as
instance-rate attributes, and storage buffers in the vertex stage would eat
into the same limit on some backends.

`renderBindGroup` therefore depends on a per-restart buffer, so it is built in
`restart()` rather than `#createLayouts()`.

---

## 3. The `Params` struct is declared in three places

Adding or reordering a parameter means editing **all three**, in sync:

1. `engine.js` — `PARAM_FLOATS` (currently 56) and the `#writeParams()` body
2. `compute.wgsl` — `struct Params`
3. `render.wgsl` — `struct Params` (a full duplicate)

There is no shared definition and no validation. A mismatch does not error —
it silently reads garbage, and the symptom is usually "the simulation looks
subtly wrong" rather than a crash. The `_pad*` slots at the end are free space
for exactly this reason; use them before growing the struct.

`PARAM_FLOATS = 56` → 224 bytes, comfortably under the 64 KiB uniform limit,
so growing it is fine — just grow it everywhere, and keep the total a multiple
of 4 floats so the struct stays 16-byte aligned. One `_pad` slot is free.

Growing it in one file and not the others is the single most common mistake
here, and the symptom is unmistakable once you know it: *"Buffer 'params' bound
with size N is too small, the pipeline requires M"*. Under HMR you will see it
transiently while the edits land; if it persists after a reload, a file was
missed.

---

## 4. `CELL_SIZE` is coupled to the slider maximums

`CELL_SIZE = 500` in `params.js`. The neighbour search only scans a 3×3 block
of cells, so **the cell size must be ≥ the largest neighbourhood radius the
sliders can reach**. Both `boidVisionRadius` and `speciesInteractionRadius` cap
at 500 in `SLIDERS`.

If you raise either slider maximum without raising `CELL_SIZE`, agents will
silently stop seeing neighbours that are within their stated radius. No error,
no warning — just wrong physics. Note also that `CELL_SIZE` is currently a
constant baked in at construction (`this.cellSize = CELL_SIZE`), not per-restart.

---

## 5. Cost tracks density, not agent count

The neighbour loop is everything. It scans a 3×3 block, so per-agent cost is
~`9 × avgPerCell`, and `avgPerCell = agentCount / numCells`.

- Doubling agents in the same world → **4×** the work.
- Doubling agents *and* scaling the world → **linear**.

Measured on Apple M-series at matched density (~225 neighbours/agent, start
cloud filling the world):

| Agents | World | ms/frame | fps |
| --- | --- | --- | --- |
| 102,400 | 32,000 | 1.7 | 605 |
| 409,600 | 64,000 | 7.2 | 139 |
| 819,200 | 96,000 | 14.1 | 71 |
| 1,638,400 | 128,000 | 41.3 | 24 |

Same count at 5× density: 409,600 in a 32,000 world → **73.6 ms**, not 7.2.

The panel's `~N neighbours scanned per agent` readout exists precisely so this
is visible while tuning. Green under 900, amber to 2500, red above.

**When benchmarking, match the start cloud to the world.** I burned a round of
measurements because `startRadiusMul` was capped at 18 while the world was 40×,
so agents packed into a blob at ~5× uniform density and every number was
pessimistic. The Start Size option equal to the world multiplier is labelled
`(fills)` for this reason.

---

## 6. Known races and approximations (all deliberate)

- **`resolveCollide` reads and writes `outParticles` in the same pass.** Agent
  `i` reads agent `j`'s position while `j` may be writing it. This is a genuine
  race; it matches the Godot original and the visual result is fine because
  corrections are small and averaged. Do not "fix" it by adding a third buffer
  without measuring — it costs a full buffer and the artefact is invisible.
- **Collision counts can exceed `maxCollisions`.** `runSim` does an unconditional
  `atomicAdd` on the count and only stores the partner if `slot < maxCollisions`.
  So the count is a true overlap count but the partner list is truncated.
  `resolveCollide` clamps with `min(rawCount, maxCollisions)`. At high agent
  counts `maxCollisions` drops to 16, so dense clumps under-resolve — this is
  the intended trade. The core repulsion (below) makes this matter much less,
  since far fewer pairs reach overlapping distance in the first place.
- **`resolveCollide` was never enough to give agents real size.** It is a
  *positional* correction at `drawRadius + collisionModifier` ≈ 4 world units,
  against a sense radius of 250. Mutually attracted species still collapsed to
  a point; the collision pass only stopped them literally coinciding. Excluded
  volume is what actually gives a cluster size, and it has to be a **force** in
  `runSim`, not a post-hoc nudge. The two are complementary — keep both.
- **Measuring excluded volume needs the tail, not the median.** Median
  nearest-neighbour distance barely moves when you toggle it (24.7 → 36.7),
  because most agents are in the sparse background where nothing is touching
  anyway. The 1st percentile moves 1.5 → 22.4, and the share of agents with a
  neighbour inside 20 units moves 36% → 0.3%. Use a low percentile.
- **A/B a shader change from a deterministic start, or the number is noise.**
  Comparing two different *simulation states* measures the states, not the
  change: continuous vs discrete species read 4.02 vs 3.52 ms/frame, which
  looks like a 14% regression but is entirely the denser clumps that the
  continuous run happened to form — the same shader code ran in both. The real
  figure was +6%, measured against a hand-edited single-lookup variant with the
  **Ring** pattern (its layout has no randomness) plus **Lock matrix**, so both
  sides are the identical simulation. Better still, where two pipelines compute
  the same answer, **interleave A/B/A/B on one state within a single page
  session** and force the pipeline choice directly — absolute ms drifts a lot
  between sessions (2.08 vs 2.65 for identical work on different loads), so
  cross-session comparisons are worthless.
- **Optional features should be opt-in in *cost*, not just behaviour.** An
  unconditional bilinear lookup made continuous species cost 6% even when set
  to `Discrete`. WGSL `override` constants plus `constants` in the pipeline
  descriptor compile the feature out instead: one source, two pipelines,
  selected per dispatch. Verified it really folds — the specialised discrete
  pipeline matches a hand-edited single-lookup shader to within 0.1%.
- **`prefixSum` is single-workgroup.** One workgroup of 256 threads loops over
  `numCells` in blocks with a running carry. At world size 128,000 that is
  65,536 cells = 256 serial block iterations with barriers. Not currently
  dominant, but it is the first thing that will bottleneck if world sizes grow.
- **`randomDir()` does not use `P.frame`.** The seed is `id + workgroup_id`, so
  the "Randomness" slider applies a *fixed per-agent direction*, not per-frame
  noise. This is faithful to the Godot original. Mixing in `P.frame` would turn
  it into real Brownian motion — a behaviour change, not a bug fix.

---

## 6b. Seeded randomness

Everything generated goes through `rng.js`, not `Math.random()` — layout,
matrix, philicity, core size seeds, and the Random button's own choices. Two
things to preserve:

- **Each purpose gets its own stream** (`STREAM` in `rng.js`). Sharing one
  sequence means changing the species count shifts every later draw, so the
  starting layout would silently change too.
- **Stream ids are append-only.** Renumbering one changes what every existing
  saved seed produces.

The Ring patterns are seed-independent by construction — their layout comes from
the agent index alone. That is correct, not a bug, and it is a useful canary: if
Ring positions ever start varying with the seed, a stream has been crossed.

## 7. WGSL portability constraints I hit

- **No module-scope `const` array indexed by a runtime value.** I originally had
  `const QUAD = array<vec2f,6>(...)` indexed by `vertex_index`; some backends
  reject this. Replaced with arithmetic corner derivation
  (`vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0`) plus `triangle-strip`
  topology, and `select()` for the fullscreen triangle. Keep to that pattern.
- **`fmodp()` exists because WGSL `%` is not GLSL `mod`.** WGSL's `%` takes the
  sign of the dividend; GLSL's `mod` takes the sign of the divisor. All the
  wrapping math depends on the GLSL behaviour. It is duplicated in both
  `compute.wgsl` and `render.wgsl`.
- **Barriers must be in uniform control flow.** The `prefixSum` loops are driven
  by `base` and `n`, which are uniform across the workgroup. Any restructuring
  must preserve that.
- **`target` is a reserved keyword.** So are a long list of plausible variable
  names that WGSL reserves for future use but does not otherwise mention. The
  error is clear when it happens; just do not expect a name to be legal because
  it is legal in GLSL.

---

## 8. Rendering notes

- **Coverage-based antialiasing, not smoothstep.** The fragment shader computes
  `alpha = clamp((1.0 - d) * pxRadius + 0.5, 0, 1)`. An earlier smoothstep
  feather made sub-pixel particles nearly invisible when zoomed out, because
  the feather width consumed the whole disc. The current form keeps the centre
  opaque no matter how small the particle gets. Do not replace it with
  smoothstep.
- **Blending is premultiplied** (`one` / `one-minus-src-alpha`), so the fragment
  shader returns `vec4f(color * alpha, alpha)`. The grid overlay does the same.
- The vertex shader clamps radius with `max(P.drawRadius * P.zoom, 1.0)` so
  particles never shrink below one pixel.

---

## 9. Double-buffering

`currentBuf` flips **after** the compute pass, so `particleBuffers[currentBuf]`
is always the freshest state at render time. When paused (`dt === 0`) the
compute pass is skipped entirely and no swap happens — the render still reads
the correct buffer. Two bind groups are pre-built (`bindGroups[0]` and `[1]`)
with in/out swapped; there is no per-frame bind group creation.

---

## 10. Testing this thing (the browser gotcha)

**A backgrounded Chrome tab throttles `requestAnimationFrame` to near zero.**
I lost real time to this: FPS read 0 and a `Runtime.evaluate` that awaited a
rAF callback timed out after 45 s. `document.hidden` was `true`. The page was
fine; the test harness was wrong.

For headless-style measurement, drive the engine directly and synchronise on
the queue rather than on rAF:

```js
const engine = window.__engine          // exposed in dev only (SimCanvas.vue)
const p = { ...params }
for (let i = 0; i < 10; i++) engine.frame(p)   // warm up
await engine.device.queue.onSubmittedWorkDone()
const t0 = performance.now()
for (let i = 0; i < 30; i++) engine.frame(p)
await engine.device.queue.onSubmittedWorkDone()
console.log((performance.now() - t0) / 30, 'ms/frame')
```

`window.__engine` is only set when `import.meta.env.DEV`.

Other useful handles: `engine.readParticles(n)` maps the current particle
buffer back to the CPU (async, creates and destroys a staging buffer), and
`engine.avgPerCell` gives the density figure the panel displays.

---

## 11. Hot reload

- `.wgsl` files are imported with `?raw`. `engine.js` has an
  `import.meta.hot.accept(['./compute.wgsl?raw', './render.wgsl?raw'], ...)`
  hook that swaps the module-level `computeSrc` / `renderSrc` and calls
  `buildPipelines()` on every engine in the `liveEngines` registry. **The
  simulation keeps its state** — buffers are untouched, only pipelines rebuild.
  I verified this with a `window.__hmrMarker` survival test.
- WGSL compile errors are surfaced via `getCompilationInfo()` and logged as
  `[WGSL] file:line:col message`. They do **not** throw, so a broken shader
  leaves the old pipeline running and prints to console — check the console if
  an edit appears to have no effect.
- Startup-panel changes (agent count, species count, world size, pattern) only
  take effect on **Restart**, because they resize buffers. Everything else is
  live via the uniform.

---

## 12. Fidelity to the Godot original

`compute.wgsl` is a direct port of `particle_boids.glsl` — same forces, same
ordering, same constants. Three intentional divergences, all documented in
`README.md`:

1. Prefix sum runs on the GPU (Godot read back to CPU and scanned in GDScript).
2. Particles are drawn with a render pipeline (Godot used `imageStore`).
3. Buffers are consolidated 13 → 8.

If simulation behaviour ever looks wrong, diff against
`../Godot-Particle-Life-Boids-Combined-Compute-Shader/particle_boids.glsl` —
it is the source of truth for the math. Note in particular that speed clamping
is applied **before** integration, which is unusual but matches the original.

---

## 13. Provenance

The original is MIT, Copyright (c) 2025 Tokoyuma —
<https://github.com/ThePathfindersCodex/Godot-Particle-Life-Boids-Combined-Compute-Shader>,
YouTube <https://www.youtube.com/@ThePathfindersCodex>. `LICENSE` carries that
copyright forward and `AboutDialog.vue` credits it in the UI.

The About dialog also states plainly that **every line of this port was written
by Claude Opus (Anthropic) via Claude Code**. Keep that disclosure if the
project is shared — it is honest and it is the user's stated intent. The dialog
shows on first load, persists dismissal to `localStorage` under the key
`plb.hideAbout`, and can be reopened from the ⓘ button in the panel header.

---

## Next steps

See `TODO.md`. The phobic/philic medium is built (README has the write-up);
what remains is continuous species + blob splitting, and the optimisation list,
with designs for each.
