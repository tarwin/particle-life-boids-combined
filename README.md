# Particle Life + Boids — WebGPU

A browser port of [Godot-Particle-Life-Boids-Combined-Compute-Shader](../Godot-Particle-Life-Boids-Combined-Compute-Shader):
tens of thousands of agents on the GPU, blending boids flocking with particle-life
species interactions, on a wrapping (toroidal) world with spatial hashing and
collision resolution.

Wrapped in Vue 3 + Vite, so both the UI and the WGSL shaders hot-reload while the
simulation keeps running.

## Run

```sh
npm install
npm run dev      # http://localhost:5173
```

Requires a WebGPU-capable browser: Chrome/Edge 113+, Safari 26+, or Firefox 141+
(Windows). On Linux Chrome you may need `--enable-unsafe-webgpu`.

## Controls

| Input | Action |
| --- | --- |
| Drag | Pan camera |
| Scroll | Zoom, anchored to the point under the cursor |
| `Space` | Randomise |
| `P` | Pause / resume |
| `R` | Restart |
| `G` | Toggle spatial grid |
| `M` | Toggle the medium |
| `V` | Toggle excluded volume |
| `F` | Fullscreen |
| `B` | Toggle blob detection |
| `X` | Cycle colour mode |
| `C` | Reset camera |
| `H` | Hide / show panel |

The **Boids ↔ Particle Life** slider at the top of the panel is the `mixT`
blend: 0 is pure flocking, 1 is pure particle life. Everything under *Startup*
takes effect on **Restart**; every other slider is live.

Agent counts go to 1,638,400 and species to 32. **World Size** is the lever that
makes big counts usable — see [Performance](#performance). **Start Size** marked
*(fills)* matches the current world exactly.

## Additions beyond the port

Several things exist here that the Godot original does not have. **All of them
are off by default** — a fresh load reproduces the original behaviour exactly,
and each is a switch you throw:

| | Control | Default |
| --- | --- | --- |
| [Excluded volume](#excluded-volume) | *Enable excluded volume* / `V` | off |
| [The medium](#the-medium-phobic--philic) | *Enable medium* / `M` | off |
| [Continuous species](#continuous-species) | *Species Spread* (Startup) | `Discrete` |
| [Blobs + mutation](#blobs-and-mutation) | *Detect blobs* / `B` | off |
| [Colour, shape, glow](#look) | *View* section / `X` | original look |
| [Drifting motes](#drifting-motes) | *Drifting motes* (View) | off |

On top of those, and always available:

| | |
| --- | --- |
| [Editing the matrix](#editing-the-interaction-matrix) | Drag / scroll / click the cells directly |
| [The seed](#the-seed) | One integer that reproduces the whole world |
| [Presets, JSON, Random](#presets-json-and-random) | Save, share and reroll configurations, with per-section locks |
| [Panel theme and scale](#panel-theme-and-scale) | `☀`/`☾` and `−`/`＋` in the header |

## Editing the interaction matrix

The matrix is the most interesting thing in the simulation, so it is directly
editable rather than display-only:

- **Drag a cell up or down** to scrub its value. ~120px of travel covers the
  full positive range, which is fine control without dragging across the screen.
- **Scroll** over a cell to nudge by 0.1, or shift-scroll for 0.01.
- **Click without moving** to zero the entry — by far the most common single
  edit, and awkward to hit by dragging.

The **philicity** strip edits the same way. **Core size** is read-only: it is
derived from the size seeds and the *Size Spread* slider, so there is no single
value to write back to.

Edits go straight to the GPU. The typed arrays are held in `shallowRef`s, so
each edit writes a *copy* rather than mutating in place — mutating would update
the simulation but leave the grid showing stale numbers.

## The seed

Every generated thing — the starting layout, the interaction matrix, philicity,
core size seeds, and **Random's own choices** — derives from one integer seed in
the Startup section. The same seed and the same settings gives the same world
back, which `Math.random()` could never do. It travels with presets and JSON.

Each purpose draws from its own stream (`rng.js`). Without that, changing the
species count would shift every later draw and silently change the starting
layout too.

**Restart, New Matrix and Random all roll a fresh seed**, because rebuilding
from an unchanged seed reproduces the identical world — the button would appear
to do nothing. **Lock the seed** and they reuse it instead, so repeated presses
reproduce exactly rather than explore. That gives three useful combinations on
Restart:

| Seed | Keep matrix | Result |
| --- | --- | --- |
| unlocked | off | New layout and new matrix — a fresh run |
| unlocked | on | New layout, same matrix (edits included) |
| locked | either | The identical world, layout and all |

Applying a preset or JSON config does **not** roll a new seed; only the buttons
do. Otherwise loading a saved state would immediately randomise away from it.

Note the Ring patterns are seed-independent by construction — their layout comes
from the agent index alone — so only their matrix changes with the seed.

## Presets, JSON and Random

**Random** rerolls everything and restarts. Ranges are deliberately *narrower*
than the sliders allow — uniform sampling over every slider's full range mostly
produces states that are dead or exploded, so each parameter has a hand-picked
band where the simulation stays alive. **Agent count and world size are left
alone**: they govern density, which governs frame cost, and a Random button
should not tank the frame rate.

**Section locks.** Every section heading has a padlock; locked sections are left
untouched by Random, and the button shows the count (`Random (3🔒)`). The seed
has its own lock. Locks persist.

One wrinkle worth preserving: if the matrix is locked but startup is not, the
restart that startup needs would regenerate the matrix — so it is captured
before the restart and re-uploaded after.

**JSON** opens the whole configuration — live params, startup config, and the
per-species matrix, philicity and core sizes. Without the matrix a config only
reproduces the *knobs*, not the world, and the matrix is most of what makes any
given state interesting. Edit it in place, or paste one in and Apply. Unknown
keys are ignored and missing ones keep their current value, so a config saved
before a feature existed still loads.

**Presets** are named and stored in `localStorage`. Selecting one applies it
immediately and puts its name in the box, so Save becomes Overwrite — the usual
thing you want after tweaking something you just loaded. New names are
suggested (`amber-vortex`, `tidal-nimbus`) rather than prompted for.

Two details in `applyConfig` worth preserving if you extend it:

- It only restarts when a **startup** field actually changed. Restarting
  regardless would throw away the state you are looking at every time you
  applied a look-only config.
- The saved matrix is uploaded **after** the restart, because restart
  regenerates the matrix.

## Excluded volume

Agents get a **core radius** inside which they repel each other regardless of
what the interaction matrix says. Without it, two mutually attracted species
collapse onto a single point — the only thing resisting was `resolveCollide`,
a positional nudge at draw scale (~4 world units), far too small to give a
cluster real size. Measured over the population, nearest-neighbour distance:

| | 1st pct | 5th pct | median | share with a neighbour <20 units |
| --- | --- | --- | --- | --- |
| Off | 1.5 | 4.0 | 24.7 | 36.2% |
| On | 22.4 | 25.5 | 36.7 | 0.3% |

With it off, the 5th percentile sits exactly on the collision radius — agents
piled on top of each other. With it on, clusters become bodies: a defined
surface, and an interior where every agent holds its own space. It sits outside
the boids↔particle-life blend, because having a size is a property of the
agent, not of either force model.

**Per-species sizes.** *Size Spread* gives each species its own size in [0, 1]:
0 makes them all the same, 1 spreads them over the whole range so some end up
with essentially no excluded volume at all. A pair's exclusion distance is the
**sum of their two radii**, and the force scales with the actor's own size, so
a size-0 species neither excludes nor is excluded — it gets shoved around by
the species that do. The sizes show as a *Core size* strip under the matrix,
and are rerolled with **New Matrix**. The slider is live: it maps stable
per-species random seeds through `sizeFromSeed`, so moving it resizes species
without rerolling which ones happen to be large.

At spread 1, species that land near size 0 pack to a median clearance of
3.3–3.9 (the collision-radius floor) while everything above size 0.37 sits at
6.5–36 — a clean order-of-magnitude split in the same run.

**Falloff** picks the repulsion profile inside the radius:

| | Shape | Character |
| --- | --- | --- |
| Linear | `1 − x` | The canonical particle-life core |
| Smooth | `(1 − x)²` | Fades at the surface, so cluster edges stay soft |
| Hard | `1` | A step at the boundary; widest spacing of the four |
| Stiff | `(1 − x)/x`, capped at 25 | Nearly incompressible at contact |

All four are bounded and stable (no non-finite positions after 700 steps). At
equilibrium they land within ~15% of each other on spacing — Hard widest at
41.5, Smooth tightest at 36.3 — because agents settle near `x = 1` where the
curves converge. The difference shows under compression, not at rest.

*Core Radius* is a fraction of the Sense Radius, so it tracks the interaction
scale rather than needing retuning whenever that slider moves; the panel shows
the resulting absolute distance.

Switched on, it **starts deliberately gentle** — repulsion 0.2, radius 0.02,
Smooth falloff — enough to stop agents occupying the same point without
reshaping what the matrix produces. Turning it up changes the character a lot:
around 1.5 is the knee where clusters stop collapsing to a point but still hold
together as bodies, and past ~5 the repulsion wins outright and everything
dissolves into an even gas. The numbers in the table above were measured at
that stronger setting, not at the default.

## Continuous species

Species is an **f32**, not an index. Nothing ever required it to be an integer,
and making it continuous is what gives mutation something meaningful to move —
a nudge of ±0.03 means something, where on an integer index it rounds away.

An agent at species 2.4 sits four tenths of the way from basis species 2 to
basis species 3, and *everything* about it interpolates:

- **Colour** — `heatmap()` already took a continuous `t`, so this came for free.
- **Interaction row** — a proper **bilinear** across the four surrounding matrix
  entries. Both the actor's row and the target's column need interpolating; a
  single lerp between rows would be wrong.
- **Philicity** and **core size** — linear between the two bracketing species.

*Species Spread* under Startup scatters agents around their basis species by up
to ±N. At `Discrete` (the default) every agent sits exactly on an integer, the
interpolation fractions are all zero, and the result is bit-identical to the
integer version. The matrix shown in the panel is the **basis**; agents live
between its rows.

### Cost, and why `Discrete` is free

Interpolating costs **6.2%** — 2.213 vs 2.084 ms/frame. The matrix is tiny and
cache-resident; what costs is doing 4 loads and 3 `mix`es ~225 times per agent.
Resolving the actor's own bracket once before the neighbour loop, rather than
per neighbour, is what keeps it to 6%.

You only pay that when you use it. `runSim` is compiled **twice** from one
source via a `CONTINUOUS_SPECIES` [pipeline-overridable constant][override], so
the discrete pipeline has the interpolation compiled out entirely rather than
branched around. `Discrete` is opt-out in cost, not just in behaviour.

[override]: https://www.w3.org/TR/webgpu/#dom-gpuprogrammablestage-constants

Both numbers come from an interleaved A/B/A/B on an *identical* simulation
state — Ring start (its layout has no randomness) with Lock matrix, and every
species an integer so both pipelines compute the same answer. Only the pipeline
differed. Runs were 2.06–2.09 against 2.18–2.24, so the gap is well clear of
the noise.

## Blobs and mutation

Connected-component labelling, so the droplets the simulation forms become
addressable objects — and then something to do with that: **per-blob mutation**.

### Detection

Labelling runs over **grid cells, not agents**. The agent-resolution version
would cost a full ~225-neighbour scan per propagation round; at cell resolution
a round is 8 loads over at most 65,536 cells, thousands of times cheaper, and
for droplet-shaped blobs the answer is the same. Each occupied cell starts as
its own label and repeatedly takes the smallest label in its 3×3
neighbourhood — the minimum floods each connected region.

Propagation is `atomicMin` **in place** rather than a ping-pong. Min is
monotone, so a lost update only costs an extra round; it cannot give a wrong
label. That saves a whole `numCells` region.

**Min Density is the setting that matters.** Labelling every *occupied* cell
puts the entire world in one blob — the thin gas of stragglers between droplets
is enough to bridge them all. Requiring a cell to hold at least N× the average
occupancy before it conducts is what separates blob from background. Like the
medium's threshold it is a multiple of the average, so it behaves the same at
any agent count or world size.

**Smoothing.** Thresholding raw cell counts gives blobs the shape of the grid —
blocky, ragged, full of pinholes. *Smoothing* blurs the occupancy into a
density field first and thresholds *that*, which rounds corners off and closes
the pinholes; it is the same trick that gets smooth isosurfaces out of a coarse
field. Measured as perimeter ÷ the perimeter of an equal-area disc (1.0 being a
perfect circle), blobs go from **1.64–1.72 to 1.32** with smoothing on, and
flatten out after about 2 passes.

The tradeoff is real: blurring also bridges blobs that pass close to each
other, so more smoothing means rounder shapes but more merging. If two droplets
you expect to be separate share a colour, either lower *Smoothing* or raise
*Min Density*.

The blur ping-pongs between two density regions, dispatched an even number of
times so the result lands back in the region the threshold reads. Direction is
a `BLUR_A_TO_B` override constant with two pipelines built from one entry
point — WebGPU has no push constants, so this is how you vary a dispatch.

Two limits worth knowing:

- It is **cell resolution**, so two droplets sharing a cell merge. At
  `cellSize = 500` that happens.
- A label travels one cell per round, so *Flood Rounds* bounds how wide a blob
  can be and still come out in one piece.

Re-flooding runs every *Reflood Every* frames, since blobs move far slower than
agents; the per-agent lookup refreshes every frame because agents change cells
constantly. That lookup is cached into a region of `indices`, which the render
pass binds **as a vertex attribute at an offset** — the vertex stage still
binds zero storage buffers.

### Mutation

Every agent in a blob gets the **same** nudge to its species, seeded from the
blob id and a step counter. A droplet's whole lineage drifts together rather
than dissolving into noise, which is what makes it read as one thing evolving.
This is why continuous species had to come first: on an integer index a nudge
of ±0.05 rounds away to nothing.

Species 0 and N−1 **reflect** rather than clamp. Clamping makes the ends
absorbing states, and the population piles up against them — measured, the
lower quartile collapsed to 0 within a few thousand frames. Reflection leaves
the walk unbiased and bounded, and its stationary distribution is uniform. With
it, the fraction sitting at the extremes held flat at 7.9% over 8,000 frames
while distinct species values grew from 10 to ~4,300.

### Splitting

Blobs above a size threshold divide: cut along a random axis through the blob's
own centroid, the two halves shoved apart with opposite impulses, and their
species drifting in **opposite** directions — so a division is also a
speciation event.

Measured, with everything else held constant: splitting off, species stay at
exactly 10 distinct and 0% non-integer; splitting on, they reach 46 distinct
and 78% non-integer while the blob count oscillates as droplets divide and
re-merge.

Per-blob count and centroid come from three `grid` regions keyed by blob id
(which is a cell index, so the sizing is exact). Positions are summed as 8-bit
fractions of the world — coarse, but a centroid needs only cell-scale accuracy
and it keeps the sum inside a u32 even at 1.6M agents.

The only selection pressure is the size threshold: a blob must grow big to
qualify, and it only grows big by holding together. That is persistence-as-
fitness in its crudest form. Tracking real blob *age* would be better and is
still unbuilt — labels are recomputed on each reflood and can change, so it
needs blobs to be matched between floods.

## Look

Everything in this section is presentation only — none of it touches the
simulation. All of it lives under *View*.

**Colour By** switches what the agent colour *means*: **Species** (default),
**Blob** (hashed hue per connected component — ids are cell indices, so they
must be hashed or neighbouring blobs shade identically), **Velocity**
(direction as hue, speed as brightness — the standard optical-flow reading), or
**Neighbours**.

*Neighbours* is the coordination number, which `runSim` already computes for
the boids averages and used to throw away. Writing it out costs one store and
draws the **skin** of a body rather than its bulk: interior agents are crowded,
surface agents are not. Counts range from 1 to ~2000 in a typical state.

**Outline** darkens each agent's rim. Dense regions otherwise saturate into one
flat mass; a per-agent edge keeps individuals readable without a depth buffer.

**Palette** is the ramp that meaning is drawn with:

| | |
| --- | --- |
| Heatmap | The original blue→cyan→green→yellow→red. High contrast, not perceptually uniform |
| Viridis | Perceptually uniform — equal steps in species look like equal steps in brightness |
| Ember | Black → deep red → orange → white hot |
| Ice | Midnight → blue → cyan → white |
| Cyclic | Full hue wheel |
| Mono | Greyscale; lets glow and density carry the image instead of hue |

**Cyclic is the honest one for continuous species.** A linear ramp implies
species 0 and N−1 are maximally far apart, when in the interpolation they are
neighbours. On a hue wheel they actually are.

**Shape** — Disc (default), Soft (gaussian falloff, so neighbours merge into
continuous mass), Ring (shows structure through dense clumps that solid discs
hide), Square.

**Glow** is a second instanced draw of the same geometry, wider and softer,
specialised from the same shader by a `GLOW_PASS` override so neither pipeline
pays for the other's branches. It blends **additively**, so halos sum where
they overlap and dense regions bloom.

That breaks on a light background — adding to near-white does nothing — so on
backgrounds whose Rec. 709 luma exceeds 0.5 the halo switches to a
`reverse-subtract` pipeline and *darkens* instead. On *Paper* clusters get a
blue-grey shadow and read with real depth rather than washing out.

**Motion Stretch** scales each agent along its velocity, turning fast ones into
streaks. The quad is built in a velocity-aligned frame while `uv` stays
unrotated, so the fragment shader still evaluates its shape in circular space —
a disc becomes a proper ellipse rather than a sheared square.

Background is applied as the render pass clear value — except when trails are
on, where the shader needs it too (below).

**Trails** keep part of the previous frame instead of clearing it, so agents
smear a decaying path behind them. At 0.99 a trail lasts roughly a hundred
frames. It is a screen-space effect, so panning smears too.

You cannot blend against the canvas across frames, so with trails on the scene
renders into a persistent texture that is faded a little toward the background
each frame, then blitted to the canvas. The fade is a fullscreen quad of the
background colour at `alpha = 1 - strength`, blended premultiplied — which is
exactly a lerp toward the background, and why the background colour has to
reach the shader rather than staying a CPU-side clear value.

Two details that are load-bearing:

- The accumulation texture is **`rgba16float`, not the 8-bit canvas format**.
  At high persistence the per-frame fade step rounds to zero in 8 bits and
  trails never finish fading, leaving permanent ghosts.
- A pipeline is bound to its target format, so every pipeline that can draw
  into the accumulation texture needs a matching-format twin. That is what
  `accumPipelines` is.

With trails off the old path runs untouched, straight to the canvas, and the
texture is released rather than left allocated.

## Panel: theme and scale

The header carries `☀`/`☾` for **light/dark controls** and `−`/`＋` to **scale
the panel**. Both persist.

The theme is nothing but a set of CSS custom properties swapped on the root
element, so no component knows which one is active — which is why the colours
that used to be hard-coded (HUD surface, status backgrounds, the JSON textarea,
the dialog scrim) are all variables now. The canvas deliberately does not
follow; that is the *Background* setting's job.

Scale drives one `--ui-scale` variable that the panel width and every font size
multiply through. Because the buttons, selects and inputs use `font: inherit`,
setting the base size on the panel is what carries the scale into the controls
themselves rather than just the labels. Range 0.8×–1.8×.

The camera also accounts for the panel: `fitZoom` takes a right inset and
`resetCamera` offsets the camera by half of it, so the world centres in the part
of the canvas you can actually see. The inset is *measured* from the DOM rather
than assumed, since the panel width follows the scale control and a hidden panel
measures zero.

## The density field

*Field* under View turns the agents into a continuous body. **Density** shades
the smoothed field directly; **Metaball** thresholds it into a surface and
lights it using the field's own gradient as a normal, which is what makes
droplets look round rather than like flat silhouettes. Agents can be switched
off so only the fluid shows.

The resolution is the whole game here. The obvious implementation reuses the
per-cell counts the spatial hash already produces — free data — but that field
is only `cellsPerRow` across: 32 at the default world size, one cell every ~57
screen pixels. Blurring a 32×32 image is mush at any setting. So agents are
splatted into a grid **four times finer per axis**, at the cost of one
`atomicAdd` per agent per frame. That is 14 screen pixels per cell, and it is
the difference between a vague glow and something that reads as liquid.

*Surface At* is a multiple of average occupancy, so one setting behaves the same
at any density; lower it to make the fluid engulf more, raise it to leave only
the dense cores. Measured cost **+7.8%** (1.837 → 1.981 ms/frame), from an
interleaved A/B on a single simulation state.

## Drifting motes

Decorative background haze, with **no effect on the simulation** — a slow
scatter of soft points behind everything else.

It is entirely procedural: every mote's position comes from its instance index
and the frame counter, so it costs one extra instanced draw and not a single
buffer or byte of state.

The one design decision that matters is placement. Uniform-random positions
*clump* — that is what random looks like — and clumped motes merge into
blotches instead of reading as an even haze. So motes sit one per cell of a
jittered grid, with the jitter bounded to the middle 60% of a cell. That
guarantees two motes can never come closer than 40% of the grid spacing, which
is the cheap way to get blue-noise-like spacing without generating one.

Each mote also wanders on its own slow sinusoid, bounded to a fifth of a cell,
so the field breathes without any mote leaving its cell and spoiling the
spacing.

## The medium (phobic / philic)

Off by default; the *Medium* section of the panel turns it on.

A scalar concentration field lives on the hash grid, one value per cell. Each
frame it diffuses (a 3×3 tent blur) and is **displaced by agent occupancy** —
a cell crowded with agents relaxes toward empty, so agents carve cavities out of
it. Every species gets a **philicity** in [-1, +1], shown as a strip under the
interaction matrix: philic species climb the concentration gradient, phobic ones
flee it.

Phobic species therefore coalesce into droplets to minimise their contact area
with the medium — real phase separation, not a scripted effect. And the
**micelle** falls out of composing this with the interaction matrix: a species
that is philic *and* attracted to a phobic species parks at the interface
between the two, which is a surfactant, from two mechanisms designed
independently.

Sampling is bilinear across the 4 nearest cell centres, otherwise the field is
visibly blocky at `cellSize = 500` and its gradient is a step function.
*Displace Threshold* is a multiple of the average cell occupancy rather than an
absolute agent count, so one setting behaves the same at any density.

Cost is ~2%: one extra dispatch over cells (not agents), and four bilinear taps
per agent — per *agent*, not per neighbour, so it does not multiply against the
~225-neighbour inner loop.

## Layout

```
src/
  sim/
    compute.wgsl   spatial hashing, prefix sum, simulation, blobs, mutation
    render.wgsl    instanced particle quads, glow, motes, field overlays
    engine.js      WebGPU device, buffers, pipelines, per-frame pass schedule
    params.js      defaults, slider ranges, option lists, derived values
    startup.js     initial layouts + interaction matrices (all seed-driven)
    config.js      capture / apply / randomise a whole config; named presets
    rng.js         seeded PRNG and the per-purpose streams
  components/
    SimCanvas.vue      canvas, resize, rAF loop, pointer input
    ControlPanel.vue   all controls, presets, section locks, panel scale, theme
    ConfigDialog.vue   the JSON view
    InteractionMatrix.vue   matrix grid + philicity/core-size strips, editable
  App.vue          state owner: params, startup config, camera, keyboard
```

### Frame schedule

Each frame, in one command encoder:

1. `clearBuffer` — zero per-cell counts and per-agent collision counts
2. `countCells` — bin every agent into a grid cell (atomics)
3. `prefixSum` — exclusive scan over cell counts → cell offsets + scatter cursor
4. `scatter` — build the cell-sorted agent index list
5. `diffuseMedium` — blur the medium field, then displace it by cell occupancy
   (only when the medium is enabled)
6. `runSim` — 3×3 cell neighbourhood: flocking + species forces + core
   repulsion + medium gradient + collision recording
7. `resolveCollide` — push overlapping pairs apart
8. `blobDensityInit` + `blobBlur` ×2N — smooth the occupancy field, then
   `blobSeed` + `blobPropagate` ×N label connected components over cells
   (periodic); `resolveBlobs` caches each agent's label (every frame)
9. `mutateSpecies` — per-blob drift in species space (periodic)
10. render pass — drifting motes, medium overlay, grid overlay, then one
    instanced quad per agent

Steps 5, 8 and 9 are skipped entirely when their feature is switched off.

WebGPU inserts memory barriers between dispatches in a compute pass, so no
explicit synchronisation is needed between stages.

## Differences from the Godot original

The simulation math in `compute.wgsl` is a direct port — same forces, same
ordering, same constants. Three things had to change for WebGPU:

- **The prefix sum runs on the GPU.** Godot read the cell-count buffer back to
  the CPU every frame and scanned it in GDScript. Buffer readback is async in
  WebGPU, so that would cost a frame of latency (or a stall). `prefixSum` does a
  single-workgroup blocked Hillis-Steele scan with a running carry instead.
- **Particles are drawn with a render pipeline**, not by `imageStore`-ing
  circles from the compute shader. One instanced quad per agent with a coverage-
  based antialiased disc in the fragment shader — faster, and it stays crisp at
  sub-pixel sizes when zoomed out.
- **Buffers are consolidated** to stay under WebGPU's default limit of 8 storage
  buffers per stage. The Godot version bound 13 separate buffers; here `grid`,
  `indices`, `collisions` and `interaction` each pack several regions into one
  buffer, and position/velocity are interleaved into a single `Particle` struct
  so the double-buffer swap moves one binding instead of two.

  The compute stage is at 8/8, so the medium field had to go *inside* `grid` as
  two extra regions rather than get its own binding. They ping-pong, so the
  diffusion blur reads one and writes the other with no hazard; they hold f32
  bitcast into the `atomic<u32>` the counting regions need. Philicities sit at
  the end of `interaction`, past the matrix.

The particle buffers carry `VERTEX` usage alongside `STORAGE`, so the render
pass reads them directly as instance-rate vertex attributes — no copy, and no
storage buffers bound in the vertex stage.

## Performance

Cost is dominated by the neighbour loop, and that loop scans a 3×3 block of hash
cells. So the thing that matters is **density** — agents per cell — not agent
count. Doubling the agent count in the same world quadruples the work; doubling
it while also scaling the world keeps it linear.

The panel shows `~N neighbours scanned per agent` for exactly this reason. Keep
it under ~1000 and things stay fast.

Apple M-series, measured at matched density (~225 neighbours/agent, start cloud
filling the world):

| Agents | World | ms/frame | fps |
| --- | --- | --- | --- |
| 102,400 | 32,000 | 1.7 | 605 |
| 409,600 | 64,000 | 7.2 | 139 |
| 819,200 | 96,000 | 14.1 | 71 |
| 1,638,400 | 128,000 | 41.3 | 24 |

Same agent count at higher density costs proportionally more — 409,600 packed
into a 32,000 world (5× density) runs at 73.6 ms instead of 7.2 ms.

### Do not raise the buffer size limits

`Engine.create` deliberately calls `requestDevice()` with **no** `requiredLimits`.
Requesting the adapter's maximum for `maxStorageBufferBindingSize` /
`maxBufferSize` (4 GiB on this machine, vs the 128 MiB default) made the
neighbour loop **~1000× slower** — 26,541 ms per frame versus 24.6 ms for the
identical workload. The driver evidently falls off a fast path for buffers
declared that large.

Nothing needs the higher limit anyway: `maxCollisions` is scaled down at high
agent counts (64 → 32 → 16) so the collision-partner buffer stays inside the
128 MiB default all the way to 1.6M agents.

## Hot reload

Editing `compute.wgsl` or `render.wgsl` rebuilds the pipelines in place via
Vite HMR; the simulation keeps its current state. WGSL compile errors are
reported to the console with file/line/column. Editing any `.vue` or `.js` file
under `src/` does the usual Vue HMR.
