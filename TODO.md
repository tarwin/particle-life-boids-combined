# TODO — ideas not yet built

What is left: the **optimisation list** (nothing from it is built), **blob
splitting** (detection and mutation are done — splitting is not), and a
**rendering styles** section that is all idea and no code.

Optimisations are the cheapest way to make splitting affordable at high agent
counts, but nothing here is a hard dependency.

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

**Splitting is still not built** — that is what remains of this section, and it
is where the interesting part lives (see 2b).

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

> "Are there extra optimisations we could do? Other grid formats that would
> speed things up? Optimisations to do with number accuracy (f16 vs 32 vs 4)?"

Ranked by expected win. **Formats are not the top of the list.**

### 1a. Workgroup shared-memory staging — the big one

`runSim` re-reads `inParticles[i]` from global memory for **every** one of
~225 neighbours, and neighbouring agents in the same workgroup scan mostly the
same cells. Stage each cell's particles into `var<workgroup>` shared memory
once, then have the whole workgroup read from there.

The catch: agents in a workgroup are ordered by *index*, not by *cell*, so they
do not share a neighbourhood. To make staging pay off, the dispatch needs to be
**cell-major** — i.e. iterate the sorted `indices` list so one workgroup handles
one cell (or a small block of cells) and its 3×3 halo. That is a restructure of
`runSim`, not a tweak. Biggest available win; also the most work.

### 1b. Size the grid cell to the radii actually in use

`CELL_SIZE = 500` because the Vision/Sense sliders *can* reach 500. In practice
they sit at 350 / 250. If `cellSize` were derived per-restart from
`max(boidVisionRadius, speciesInteractionRadius)`, the scanned area would shrink
by roughly (350/500)² ≈ **2×**.

Complication: those two are *live* sliders, but `cellSize` is baked into the
grid buffer size at restart. Options:
- Recompute the grid on slider release (a restart-lite that keeps particles).
- Or clamp the sliders to the current cell size and surface that in the UI.
- Or (best) decouple: keep a fixed cell size but scan a **variable radius** of
  cells (1×1 when radii are small relative to cell size, 3×3 otherwise).

### 1c. Number formats

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
  apart). Cheap to try: change `cellOf()` and the neighbour index math only.
  Modest win, very low risk.
- **Sorting the particle *data* rather than an index list** (a full gather into
  a cell-sorted particle buffer each frame) turns the inner loop's random reads
  into sequential ones. Costs one extra full-buffer pass; likely worth it above
  ~400k agents. Pairs naturally with 1a.
- **`prefixSum` is single-workgroup and will become a bottleneck.** At world
  size 128,000 there are 65,536 cells, so that one workgroup loops 256 blocks
  serially with barriers. Not yet dominant, but it is the first thing that will
  bite if world sizes go up further. Fix is the standard three-pass scan
  (per-block scan → scan of block sums → add offsets).

### 1e. Free-ish wins

- The `if (i == id) continue;` branch runs for every neighbour to skip one
  agent. Cheaper to let it happen and rely on `dist < 0.0001` clamping, or to
  subtract self-contribution afterwards.
- `sep -= diff / (dist*dist)` and the boids accumulators run even when
  `mixT == 1.0` (pure particle life), where the result is discarded by `mix()`.
  Same in reverse at `mixT == 0`. Two specialised pipeline variants selected by
  mixT would skip half the inner-loop math at the extremes.

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

Still unbuilt from the original list below:

Species-as-hue burns the entire colour channel on one variable. Alternatives,
all one-line changes in `vsParticle`:

- **Velocity** → hue or brightness. Immediately legible; flocking and vortices
  become obvious. Direction as hue, magnitude as value, is the classic optical
  flow look.
- **Local density** → brightness, from the counts region. Makes cluster cores
  glow without any extra work.
- **Neighbour count / coordination number** → this is what actually
  distinguishes surface agents from interior ones. Would draw the *skin* of
  a droplet. `runSim` already computes `neighborCount` and throws it away —
  writing it out would take one buffer region.
- **Blob ID** → once 2a exists, colour by blob rather than species and the
  splitting story becomes visible at a glance.
- **Species as luminance, philicity as hue** — two variables at once.

Worth adding a **palette** choice too: the current blue→cyan→green→yellow→red
heatmap is high-contrast but garish and not perceptually uniform. Viridis or
Magma would read better and are the same shape of function. For continuous
species especially, a **cyclic** palette (HSV wheel) would be better than a
linear ramp, since species 0 and N-1 are not actually far apart in any
meaningful sense.

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
and lose all structure. Options: size agents by density, add a subtle dark
outline per disc so overlapping ones stay distinct, or tone-map the final image
instead of letting additive blending clip.

**Watch out**

- Storage buffers in the *vertex* stage are still off-limits (see FINDINGS #2);
  per-agent render data has to arrive as instance-rate vertex attributes.
- The fragment stage already binds `grid` for the medium overlay, so field
  passes are cheap to add there.
- Any per-agent output from `runSim` (neighbour count, blob ID) needs a region
  in an existing buffer — there is no ninth storage binding in compute.

---

## Smaller loose ends

- `randomDir()` seeds from `id + workgroup_id` and **not** from `P.frame`, so
  the "Randomness" slider adds a *fixed per-agent bias* rather than per-frame
  noise. This matches the Godot original, but it is almost certainly not what
  the slider is meant to do. Mixing `P.frame` into the seed would make it real
  Brownian noise. Flagging rather than fixing, since it changes the feel of
  every existing preset.
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
