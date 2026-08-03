# TODO — ideas not yet built

What is left: the **hard half of 1a** (true shared-memory staging — the cheap
half, sorted dispatch, is built and was most of the win), **1c/1d** (number
formats and grid format alternatives, both of whose premises should be
re-measured now that the loop is no longer starved on random reads), and the
odd rendering idea in section 3.

## Everything added is opt-in

The shipped defaults reproduce the original port exactly: medium off, excluded
volume off, blobs and mutation off, drifting motes off, species spread
`Discrete`, colour by species. Anything built from here should keep that
property — a fresh load is the Godot behaviour, and each addition is a switch
the user throws.

A switch being off does not mean its *values* should be arbitrary: excluded
volume starts at a hand-tuned 0.2 / 0.02 / Smooth so that flipping it on lands
somewhere sensible rather than somewhere that has to be dialled back.

Opt-in means **in cost, too**, not just in behaviour. Continuous species was
initially opt-in behaviourally but ran its bilinear lookup unconditionally, so
it cost 6% even when switched off. The fix — a WGSL `override` constant and two
pipelines from one source — is the pattern to reuse.

## Built since this file was written

**Optimisations 1a (cheap half) and 1b** are done — sorted dispatch and
radius-fitted grid cells; measurements and findings are in their sections
below. Headline: **−44%** ms/frame at the 25,600 default, **−67%** at 102,400
agents, both from the dispatch-order change alone, which is one line of WGSL
plus a pipeline constant. Nothing about the frame schedule changed and the
simulation is arithmetic-identical, so unlike every feature above there is no
switch — it is just on. Two process notes:

- The single biggest lesson: **fix locality before believing any
  bandwidth/ALU-based ranking.** The fit (1b) was predicted at ~2×; after the
  dispatch fix it measures neutral at default radii. The format ideas (1c)
  almost certainly deflated the same way.
- The deterministic Ring + locked-matrix start **never settles** — it kept
  densifying past 4,000 frames, with per-frame cost tripling across one bench
  run and per-round ratios swinging −61% to +26%. Spiral + locked matrix +
  fixed seed settles to a usable plateau in ~2,000 frames; benches here used
  that, with `settle` driven in chunks beforehand (a long single call outlives
  the console eval and gets killed, exactly as the bench header warns).

**Phobic / philic — a "medium"** is done; see the *Medium* section of the
README. It landed close to the design sketched here: a scalar field packed into
two ping-ponged regions of the existing `grid` buffer, a `diffuseMedium` pass
that blurs then displaces by the occupancy counts `countCells` already
produces, per-species philicity appended to the `interaction` buffer, and a
bilinear gradient sampled once per agent in `runSim`. Measured cost ~2%.

Both predictions held: phobic species phase-separate into droplets, and
micelles appear where a philic species is also attracted to a phobic one.
Two things worth recording that the sketch did not anticipate:

- The displacement threshold has to be expressed as a **multiple of the average
  cell occupancy**, not an absolute agent count. An absolute value that reads
  well at 25,600 agents does nothing at 1.6M.
- `target` is a **reserved keyword in WGSL**. Costs a compile error, once.

**Excluded volume** (not in the original list, asked for later) is also done —
a short-range repulsion that overrides the matrix so attracted species stop
collapsing to a point, with per-species sizes and four selectable falloff
curves. The README has the numbers. `resolveCollide` was never going to give
agents real size: it is a positional nudge at ~4 world units against a sense
radius of 250.

**Blob detection (was 2a)** is done, at cell resolution as recommended, plus
**per-blob mutation** — see the README. Notes for whoever does the splitting:

- **A density threshold is not optional.** Labelling every *occupied* cell puts
  the whole world in one blob; the thin gas between droplets bridges them all.
  `blobMinCount` (a multiple of average occupancy) is what makes it work.
- **`atomicMin` in place beats a ping-pong.** Min is monotone, so a lost update
  costs an extra round and cannot give a wrong label. Saves a numCells region.
- **Reflect at the species boundaries, do not clamp.** Clamping makes 0 and N-1
  absorbing states and the population piles up against them — measured, the
  lower quartile hit 0 within a few thousand frames. With reflection the share
  at the extremes held flat at 7.9% over 8,000 frames.
- The giant-component worry is mostly real physics, not a labelling bug: with
  the medium on, droplets label cleanly and separately.

**Splitting (was 2b) is now built** too — mitosis, verified: with it off,
species stay at exactly 10 distinct and 0% non-integer; with it on they reach
46 distinct and 78% non-integer, and blob count oscillates as droplets divide
and re-merge. A blob is cut along a random axis through its own centroid, the
halves get opposite impulses, and their species drift in opposite directions,
so dividing is also speciation.

Per-blob aggregates (count, sumX, sumY) live in three numCells-sized `grid`
regions keyed by blob id — which *is* a cell index, so the sizing is exact.
Positions are summed as 8-bit fractions of the world, coarse but plenty for a
centroid and it keeps the sum inside u32 even at 1.6M agents.

Selection is only the size threshold: a blob has to grow big to qualify, and it
only grows big by holding together. Proper blob *age* tracking is still
unbuilt, and is what would turn this from "big blobs divide" into real
persistence-as-fitness — labels are recomputed each reflood and can change, so
it needs blob matching between floods.

**Continuous species** is done. It landed as designed — `species` is
an `f32`, the matrix lookup is a proper bilinear across the four surrounding
entries, and philicity and core size interpolate too (neither existed when this
file was written, and both needed it). A *Species Spread* startup option
scatters agents around their basis species so the continuum is visible without
waiting for mutation to exist.

Two corrections to the sketch above:

- **The cost is not "essentially zero" — it is about +6%.** Measured 2.213 vs
  2.084 ms/frame. The matrix is indeed tiny and cache-resident; what costs is
  doing 4 loads and 3 `mix`es ~225 times per agent. Hoisting the actor's
  bracket out of the neighbour loop is what keeps it to 6% — do not move it
  back inside. Since it is opt-in, `runSim` is compiled twice from one source
  via a `CONTINUOUS_SPECIES` **pipeline-overridable constant**, so the discrete
  pipeline has the interpolation compiled out rather than branched around.
  That machinery is now there for reuse — item 1e below wants exactly it.
- **`InteractionMatrix.vue` needed no change.** It already showed the basis
  matrix; the only addition was a line of copy saying agents live between the
  rows.

---

## 1. Optimisations

**Read `src/sim/bench.js` before touching any of this.** Its header documents
the four ways a measurement here goes wrong; all four have bitten this project.

> "Are there extra optimisations we could do? Other grid formats that would
> speed things up? Optimisations to do with number accuracy (f16 vs 32 vs 4)?"

Ranked by expected win. **Formats are not the top of the list.**

### 1a. Workgroup shared-memory staging — the big one

**The cheap half is BUILT, and it was most of the win.** The original sketch
below assumed staging required restructuring `runSim` around a cell-major
dispatch. It doesn't: keeping one-thread-one-agent but walking the *sorted*
order — `id = indices[gid.x]` behind a `SORTED_DISPATCH` override, one extra
indirection — already puts spatially adjacent agents on adjacent threads, so a
workgroup's ~225 neighbour reads hit the same few cells in cache instead of
DRAM. Same math, same per-agent accumulation order, so the simulation is
unchanged (`randomDir`'s seed was rewritten in agent terms, `id + id/WG`, to
keep it literally identical). Measured, paired per-round:

- **25,600 agents (default world): −44%** ms/frame (−43% to −49% across rounds).
- **102,400 agents, same world: −67%** (38.9 → 13.3 ms/frame — the win grows
  with density, as a cache fix should).

What remains unbuilt is true `var<workgroup>` staging with a cell-major
dispatch. It is far less attractive now: the gap it can close is whatever DRAM
traffic survives the L2-friendly ordering, at the cost of the tile-loop
restructure the sketch describes. Measure the residual before attempting it.

Original sketch: `runSim` re-reads `inParticles[i]` from global memory for
**every** one of ~225 neighbours, and neighbouring agents in the same workgroup
scan mostly the same cells. Stage each cell's particles into `var<workgroup>`
shared memory once, then have the whole workgroup read from there. Agents in a
workgroup would need to be ordered by cell (they now are), and one workgroup
would handle one cell's block plus its halo in tiles.

### 1b. Size the grid cell to the radii actually in use — **BUILT**

Both halves of the "(best) decouple" option landed:

- The engine refits `cellSize` to the largest radius the *current pipeline*
  actually scans (per `frame()`, quantised to a cells-per-row change). The
  refit is the sketched restart-lite: reallocate the grid buffer, reseed the
  medium, rebuild bind groups, keep the particles. Cells divide the world
  **exactly** (`floor` + divide, not `ceil`) — a narrow partial edge cell would
  break the scan bound below.
- `runSim` derives its scan radius as `ceil(maxR / cellSize)` from the same
  radii it tests against, so a slider pushed past the current cell size widens
  the scan instead of missing neighbours. Correctness never depends on the fit.

Findings, which partly invert the sketch's expectation:

- **With sorted dispatch (1a) in place, the fit is neutral at the default
  radii** (−0% to −1%). The ~2× candidate reduction it was predicted to give
  buys nothing once rejected candidates are cache-hits costing one distance
  test each. Before 1a it would have looked like a win; measure order matters.
- **It pays where the fixed cell never could: small radii.** At Vision/Sense
  100 it is **−36%**, because cost now tracks the sliders instead of the
  worst case the sliders can reach.
- **Do not chase finer cells.** `cellSize = maxR/2` measured neutral,
  `maxR/3` measured **+19%** — per-cell bookkeeping (two loads per cell,
  9→25→49 cells) eats the culling. The fit stays at `cellSize = maxR`.

### 1c. Number formats

**Re-measure the premise before building any of this.** The bandwidth argument
below was written when the inner loop's reads were spatially random; after 1a's
sorted dispatch they mostly come out of cache, and the remaining DRAM traffic
is a fraction of what f16 was going to halve.

- **f16 is available** via the `shader-f16` device feature and would halve
  neighbour-read bandwidth — which is exactly what the inner loop is bound by.
- **Positions must stay f32.** f16 has ~10 bits of mantissa; in a ±64,000 world
  that is ~64-unit quantisation. Visibly chunky, and the toroidal-difference
  math would break down.
- **The right split: f32 positions, f16 velocities and f16 interaction matrix.**
  Velocities are bounded by `maxSpeed` (≤1000) and the matrix is in [-3, 3] —
  both fine in f16.
- **Species packing is free.** The `Particle` struct is `vec2f pos + vec2f vel`
  = 16 bytes. Going f32 pos + f16 vel + u16 species = 8 + 4 + 2 = 14, pad to 16
  — same stride, but the species read stops being a separate global fetch from
  a separate buffer. That alone removes one memory stream from the inner loop.
- Do **not** chase f8/f4 — no WGSL support, and the precision is nowhere near
  enough.

### 1d. Grid format alternatives

- **Current: counting sort into a flat cell-major array.** Honestly already the
  right structure; it is what GPU neighbour search converges on.
- **Morton / Z-order cell indexing** would improve cache locality on the 3×3
  scan (neighbouring cells land near each other in memory instead of one row
  apart). Largely superseded by 1a's sorted dispatch, which gets the locality
  at the thread level; also no longer "change `cellOf()` only" — the medium,
  blob and density passes all index cells row-major now and would need the
  encode/decode too.
- **Sorting the particle *data* rather than an index list** (a full gather into
  a cell-sorted particle buffer each frame) turns the inner loop's random reads
  into sequential ones. Costs one extra full-buffer pass. Same caveat as 1c:
  the reads it straightens are mostly cache-hits since 1a, so measure the
  residual first.
- **`prefixSum` is single-workgroup and will become a bottleneck.** At world
  size 128,000 there are 65,536 cells, so that one workgroup loops 256 blocks
  serially with barriers. Not yet dominant, but it is the first thing that will
  bite if world sizes go up further. Fix is the standard three-pass scan
  (per-block scan → scan of block sums → add offsets). Slightly more current
  since 1b: a fitted grid hits the same 65,536-cell cap at *any* world size
  when the radii sliders are small (cells-per-row is clamped to 256).

### 1e. Free-ish wins

- ~~Two specialised pipeline variants selected by mixT~~ **Built.** `WANT_BOIDS`
  and `WANT_PLIFE` override constants compile the unused half of the neighbour
  loop out at the extremes. `runSim` is now six pipelines: continuous-species
  x {both, boids, plife}. Measured:
  - **mixT = 1 (pure particle life): −17.5%**, −11% to −22% across five paired
    rounds at 25,600 agents.
  - **mixT = 0 (pure boids): −24% to −31%** on the settled rounds at 15,360
    agents. Reported as a range rather than a single figure because pure boids
    keeps clustering for thousands of frames, so the early rounds measure a much
    lighter workload — which is what `discardRounds` now exists for.
- The `if (i == id) continue;` branch still runs for every neighbour to skip one
  agent. Cheaper to let it happen and rely on `dist < 0.0001` clamping, or to
  subtract the self-contribution afterwards. Untried.

**Measure with `bench.js`, not by hand.** Every casual measurement in this
project has been wrong, twice by enough to invert the conclusion. The harness
interleaves variants on one settled state and reports **paired per-round
ratios** — absolute times drift 3x within a single run as the simulation
settles, so a pooled median is not trustworthy. `engine.forceRunSimHalf` exists
so the general pipeline can be pinned at an extreme mixT, making the two sides
an identical workload.

---

## 2. Blob detection, splitting, and random evolution

> "Are there passes we can do at certain points which look at 'blobs' and
> duplicate them — find a connected looking blob of stuff and split it somehow?
> Possibly slightly changing some colours? Are we able to have colours that are
> half way between two colours? Or part way between two colours and thus have
> part way the matrix? When splitting could we change these a little to simulate
> some kind of evolution (a random one though because fitness hasn't come into
> it yet)?"

Yes to all of it. The colour question — continuous species — is **built**; see
the "Built" section above. What remains is finding the blobs and splitting
them, both of which now have a continuous species value to mutate.

### 2a. Blob detection (the hard part)

Connected-component labelling on the GPU. The workable approach on top of the
existing hash grid:

1. Seed: every agent's label = its own index.
2. Iterate: each agent scans its 3×3 neighbourhood and takes
   `min(myLabel, neighbourLabel)` for neighbours within a bonding distance.
3. Repeat until no label changes (an atomic "changed" flag read back, or just a
   fixed 8–16 passes, which is enough for compact blobs).

This is **label propagation** and it converges at roughly the diameter of the
blob in agent-hops, so compact droplets converge fast and long filaments do
not. Running it every N frames (say every 120) rather than every frame keeps it
essentially free.

Cheaper alternative worth trying first: do the labelling at **cell** resolution
rather than agent resolution — flood-fill over occupied grid cells. Far fewer
elements (≤65,536 vs ≤1.6M), converges in far fewer passes, and for
droplet-shaped blobs the answer is nearly identical. Only fails when two blobs
share a cell, which at `cellSize = 500` is common — so this may need a smaller
cell size for the labelling pass specifically.

### 2b. Splitting + mutation

Once blob IDs exist:

1. Pick a blob (largest? random? oldest?).
2. Choose a split axis — the blob's principal axis is easy to get from a
   parallel reduction of its second moments, or just pick a random direction.
3. Duplicate: copy the blob's agents to free slots (needs a free-list, or a
   fixed agent budget with a death rule so the count stays constant — **a fixed
   population with replacement is much simpler and I would start there**).
4. Mutate: nudge each daughter's species f32 by ±ε, and/or perturb a few
   entries of a per-blob copy of the interaction matrix.

**Drift without fitness**, exactly as described. Worth noting up front: with no
selection pressure this is a pure random walk in species space, so over time
everything diffuses toward the middle of the heatmap unless something bounds it
(reflecting boundaries at species 0 and N-1, or a weak restoring force). Not a
problem — just don't expect structure to emerge from drift alone. Structure
arrives when a fitness signal does, and the natural one here is *blob
persistence*: blobs that survive long enough to be split are, definitionally,
the ones that hold together.

That last observation means **splitting only stable blobs is itself a selection
mechanism** — which makes this idea considerably more interesting than "random
drift". Worth designing for from the start: track blob age, only split blobs
above an age threshold.

---

## 3. Rendering styles

> "Different rendering styles? Like possibly not just pure points? Different
> colour styles etc? Ideas? SDFs built around point clouds? Who knows?"

Everything today is one antialiased disc per agent, coloured by species, drawn
additively. The simulation has far more structure in it than that shows —
velocity, density, species *gradient*, blob membership — none of which reaches
the screen. Ranked by payoff over effort.

### 3a/3b. Density field and metaballs — **BUILT**

Both are done, as *Field* in the View section: **Density** shades the smoothed
field directly, **Metaball** thresholds it into a surface lit by the field's own
gradient. Agents can be hidden so only the fluid shows. Measured **+7.8%**
(1.837 → 1.981 ms/frame, interleaved A/B on one state).

The one thing the sketch got wrong, and it decides whether this feature works
at all:

- **Do not reuse the hash cell counts.** That was the "cheapest big win" idea,
  and the result is unusable — at the default world the hash grid is 32x32, one
  cell every ~57 screen pixels, and blurring a 32x32 image is mush however you
  tune it. Agents are splatted into a grid **`DENSITY_SUB` (4) times finer per
  axis** instead: one `atomicAdd` per agent per frame, 14 screen pixels per
  cell, and it immediately reads as liquid. The sketch's own alternative
  ("splat agents into a separate density texture") was the right call from the
  start.
- It lives in two more `grid` regions sized `numCells * DSUB^2` each — raw
  counts, then the smoothed float, with region 0 reused as blur scratch after
  normalising. Remember to grow the buffer allocation *and* the clear range;
  getting only one produces silent out-of-bounds writes and an empty field.
- A **true SDF is still not worth it.** The thresholded density already gives a
  lit, rounded surface; jump-flooding a distance field would buy outlines and
  little else.

### 3c. Colour beyond species

**Built:** 14 species palettes, 14 backgrounds, 8 shape options (including
*Varied*, a different shape per species), an additive glow layer, velocity
stretch, and per-agent size + size jitter. Three findings worth keeping:

- **Additive glow is wrong on a light background** — adding to near-white does
  nothing. Backgrounds carry a luma flag and the halo switches to a
  `reverse-subtract` pipeline above 0.5, darkening instead. That is what makes
  the light background usable at all.
- **Cyclic is the correct palette for continuous species.** A linear ramp
  claims 0 and N-1 are maximally distant when the interpolation treats them as
  neighbours.
- **Per-species variation beats per-agent variation** for shape. Hashing the
  agent index speckles randomly; hashing the *species* makes each species read
  as one kind of thing, which is what the eye is looking for.

**Colour By** now offers Species, Blob, Velocity and Neighbours. The last is
the one worth knowing about: `runSim` already computed the coordination number
for the boids averages and threw it away, so writing it out costs a single
store and draws the **skin** of a body rather than its bulk. Measured 1 to
~2000 neighbours with ~1,650 distinct values, so there is real signal in it.
It reaches the vertex stage as an instance attribute at an offset into
`indices` — no storage buffer in the vertex stage.

Still unbuilt from the original list:

- **Local density → brightness**, from the counts region. Cheap; would make
  cluster cores glow. Largely superseded by the density field (3a), which
  shades the same quantity better, so this is now low value.
- **Species as luminance, philicity as hue** — two variables at once. Still
  genuinely unexplored, and the only item here that would show something the
  current modes cannot.

### 3d. Trails and motion

**Drifting motes are built** — decorative background haze, procedural (no
buffers), placed on a jittered grid so they cannot clump into blotches. The
placement lesson generalises to anything scattered: uniform random *looks*
clumpy, and one-per-cell-with-bounded-jitter is the cheap fix. Remaining:

- ~~**Feedback buffer**~~ **Built** as *Trails*. Two things the sketch missed:
  the accumulation texture must be **higher precision than the canvas**
  (`rgba16float`) or the fade step rounds to zero at high persistence and
  trails never clear; and every pipeline that can draw into it needs a
  **format-matched twin**, since a pipeline is bound to its target format.
- ~~**Velocity-stretched sprites**~~ **Built** as *Motion Stretch*. The quad is
  assembled in a velocity-aligned frame while `uv` stays unrotated, so the
  fragment still evaluates its shape in circular space — a disc becomes a
  proper ellipse rather than a sheared square.

Nothing further outstanding in this section.

### 3e. Cheap depth

Everything is uniformly flat and additive, so dense regions saturate to white
and lose all structure.

- ~~a subtle dark outline per disc~~ **Built** as *Outline*: the outer rim of
  each agent is darkened by `smoothstep(0.55, 1.0, |uv|)`, so overlapping
  agents stay individually readable without a depth buffer. Skipped on the glow
  pass, where a hard edge would defeat the point.
- **Size agents by density** — unbuilt. The per-agent neighbour count now
  exists as a vertex attribute, so this is a one-line change in `vsParticle`
  (scale the radius by it) rather than the buffer work it used to need.
- **Tone-map the final image** — unbuilt, and the more principled fix. Additive
  blending clips to white in dense regions and no per-agent trick recovers
  that. The trails path already renders to an `rgba16float` texture, so the
  blit is the natural place to put a tone-map curve; doing it for the non-trail
  path would mean always rendering offscreen.

**Watch out**

- Storage buffers in the *vertex* stage are still off-limits (see FINDINGS #2);
  per-agent render data has to arrive as instance-rate vertex attributes.
- The fragment stage already binds `grid` for the medium overlay, so field
  passes are cheap to add there.
- Any per-agent output from `runSim` (neighbour count, blob ID) needs a region
  in an existing buffer — there is no ninth storage binding in compute.

---

## Smaller loose ends

- ~~`randomDir()` seeds from `id + workgroup_id` and not from `P.frame`~~
  **Fixed, behind a switch** (*Per-frame randomness*, off by default so no
  existing preset changes). Confirmed by the scaling of RMS displacement with
  time, which is the honest way to tell the two apart: `randomDir` feeds
  *acceleration*, so a fixed bias gives displacement proportional to t^2 (4x
  the time -> 16x, measured 15.5) and real noise gives t^1.5 (-> 8x, measured
  8.03). Magnitudes differ 24-fold, because a fixed bias accumulates coherently
  while noise cancels.
- ~~No save/load of interaction matrices or full configurations.~~ **Done** —
  `config.js` captures params + startup + matrix + philicity + core sizes, the
  JSON dialog round-trips it, and named presets live in localStorage. Two
  things worth knowing if you extend it: applying only restarts when a
  *startup* field actually changed (otherwise a look-only config would throw
  away the state you are looking at), and the saved matrix has to be uploaded
  **after** the restart, because restart regenerates it.
- ~~No way to seed the RNG, so "New Matrix" states cannot be reproduced.~~
  **Done** — `rng.js`, one integer seed with a stream per purpose. See the
  README. Stream ids are append-only: renumbering one changes what every saved
  seed produces.
