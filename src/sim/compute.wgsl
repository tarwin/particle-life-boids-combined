// Particle Life + Boids — combined compute simulation.
// Port of particle_boids.glsl (Godot compute shader) to WGSL.
//
// Buffers are consolidated compared to the Godot original so we stay under the
// default WebGPU limit of 8 storage buffers per shader stage:
//   grid        = [ counts | offsets | cursor | mediumA | mediumB | blob ]  numCells
//   indices     = [ sortedIndices | agentCell | agentBlob ]   each agentCount
//   collisions  = [ counts | partners ]           agentCount, agentCount*maxCollisions
//   interaction = [ speciesCount^2 matrix | philicities | core sizes ]  (n^2 + 2n)
//
// The two medium regions ping-pong: diffuseMedium reads one and writes the
// other, so the blur has no read/write hazard. They hold f32 bitcast into the
// u32 atomics the counting regions need.

struct Params {
    dt: f32,
    mixT: f32,
    agentsCount: f32,
    speciesCount: f32,

    boidVisionRadius: f32,
    speciesInteractionRadius: f32,

    alignmentForce: f32,
    cohesionForce: f32,
    separationForce: f32,

    movementRandomness: f32,
    movementScaling: f32,
    forceSoftening: f32,
    centerAttraction: f32,
    drag: f32,
    minSpeed: f32,
    maxSpeed: f32,
    maxForce: f32,

    collisionRadius: f32,
    maxCollisions: f32,

    cellSize: f32,
    cellsPerRow: f32,
    numCells: f32,

    drawRadius: f32,
    worldSize: f32,
    cameraX: f32,
    cameraY: f32,
    zoom: f32,
    viewportW: f32,
    viewportH: f32,
    frame: f32,

    mediumForce: f32,
    mediumDiffuse: f32,
    mediumDisplace: f32,
    mediumCapacity: f32,
    mediumFlip: f32,
    showMedium: f32,

    coreRadius: f32,
    coreStrength: f32,
    coreFalloff: f32,

    renderMode: f32,
    blobMinCount: f32,

    mutateRate: f32,
    mutateBias: f32,
    mutateInterval: f32,

    driftCols: f32,
    driftSize: f32,
    driftSpeed: f32,
    driftBrightness: f32,

    particleShape: f32,
    speciesPalette: f32,
    glowStrength: f32,
    glowSize: f32,
    velocityStretch: f32,
    drawScale: f32,
    drawJitter: f32,

    trailFade: f32,
    bgR: f32,
    bgG: f32,
    bgB: f32,

    fieldMode: f32,
    fieldThreshold: f32,
    fieldStrength: f32,

    splitInterval: f32,
    splitChance: f32,
    splitMinCount: f32,
    splitImpulse: f32,
    splitMutation: f32,

    neighbourRef: f32,
    outline: f32,
    brownian: f32,

    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

struct Particle {
    pos: vec2f,
    vel: vec2f,
};

@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read>       inParticles: array<Particle>;
@group(0) @binding(2) var<storage, read_write> outParticles: array<Particle>;
// read_write, not read: mutation edits species in place. Nothing else writes
// it, and `mutateSpecies` runs in its own dispatch, so there is no hazard with
// the neighbour loop reading it.
@group(0) @binding(3) var<storage, read_write> species: array<f32>;
@group(0) @binding(4) var<storage, read>       interaction: array<f32>;
@group(0) @binding(5) var<storage, read_write> grid: array<atomic<u32>>;
@group(0) @binding(6) var<storage, read_write> indices: array<u32>;
@group(0) @binding(7) var<storage, read_write> collisions: array<atomic<u32>>;

const WG = 256u;

// Pipeline-overridable constant, set from `constants` in the pipeline
// descriptor. The compiler folds the branch away, so the discrete pipeline
// contains no interpolation at all and pays nothing for the feature being
// available. See `#createRunSimPipelines()` in engine.js.
override CONTINUOUS_SPECIES: bool = true;

// Which way the blob density blur reads/writes. Two pipelines are built from
// this one entry point and dispatched alternately, which ping-pongs without
// needing a per-dispatch uniform (WebGPU has no push constants).
override BLUR_A_TO_B: bool = true;

// Which way the *density* blur reads/writes, same trick as above.
override DENS_1_TO_0: bool = true;

// TODO 1e. At the extremes of the boids<->particle-life blend, half the inner
// loop's work is computed and then thrown away by `mix()`. These let the two
// halves be compiled out entirely for a pure-boids or pure-particle-life
// dispatch, rather than branched around per neighbour.
override WANT_BOIDS: bool = true;
override WANT_PLIFE: bool = true;

// ---------------------------------------------------------------- helpers ---

// GLSL-style mod: result always has the sign of y (unlike WGSL's %).
fn fmodp(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

fn limitVec(v: vec2f, maxVal: f32) -> vec2f {
    let mag = length(v);
    if (mag > maxVal) {
        return normalize(v) * maxVal;
    }
    return v;
}

fn safeNormalize(v: vec2f) -> vec2f {
    let len = length(v);
    if (len > 0.0001) {
        return v / len;
    }
    return vec2f(0.0);
}

// The Godot original seeds from the agent id alone, which makes the Randomness
// slider a *fixed per-agent bias* rather than noise — every agent gets its own
// constant nudge for the whole run. Mixing the frame in turns it into real
// Brownian motion. Off by default because it changes the feel of every existing
// preset, which is exactly why it was only flagged and not fixed for so long.
fn randomDir(id: u32, scale: f32) -> vec2f {
    var seed = id * 1664525u + 1013904223u;
    if (P.brownian > 0.5) {
        seed = seed ^ (u32(P.frame) * 2654435761u);
        seed = seed * 1664525u + 1013904223u;
    }
    let ang = f32(seed % 6283u) * 0.001;
    return vec2f(cos(ang), sin(ang)) * scale;
}

// Integer hash. WGSL has no forward declarations, so shared helpers live
// above their first use.
fn hashU32(xIn: u32) -> u32 {
    var x = xIn;
    x ^= x >> 16u;
    x *= 0x7feb352du;
    x ^= x >> 15u;
    x *= 0x846ca68bu;
    x ^= x >> 16u;
    return x;
}

// Uniform in [-1, 1].
fn hashSigned(x: u32) -> f32 {
    return f32(hashU32(x) % 2048u) / 1024.0 - 1.0;
}

// Shortest delta across a wrapping (toroidal) world.
fn toroidalDiff(a: vec2f, b: vec2f, worldSize: vec2f) -> vec2f {
    var d = b - a;
    d -= worldSize * round(d / worldSize);
    return d;
}

fn applyBorder(pos: vec2f) -> vec2f {
    var p = pos;
    let world = P.worldSize;
    let half = world * 0.5;
    if (p.x < -half) { p.x += world; }
    if (p.x >  half) { p.x -= world; }
    if (p.y < -half) { p.y += world; }
    if (p.y >  half) { p.y -= world; }
    return p;
}

// ------------------------------------------------------- continuous species ---
//
// Species is an f32, not an index. An agent at 2.4 sits four tenths of the way
// from basis species 2 to basis species 3 — its colour, its row of the
// interaction matrix, its philicity and its size are all interpolated. The
// discrete matrix in the UI is the *basis*; agents live between its rows.

// Bracketing basis species for a continuous value: (lo, hi, frac).
fn speciesBracket(s: f32) -> vec3f {
    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    let c = clamp(s, 0.0, maxIdx);
    let lo = floor(c);
    return vec3f(lo, min(lo + 1.0, maxIdx), c - lo);
}

// Linear interpolation of a per-species scalar stored at `base`.
fn speciesLerp(base: u32, s: f32) -> f32 {
    let b = speciesBracket(s);
    return mix(interaction[base + u32(b.x)], interaction[base + u32(b.y)], b.z);
}

// Where the per-species data lives inside the `interaction` buffer.
fn philicityBase() -> u32 { let n = u32(P.speciesCount); return n * n; }
fn coreSizeBase() -> u32 { let n = u32(P.speciesCount); return n * n + n; }

// ---------------------------------------------------------- excluded volume ---

// Repulsion profile as a function of x = dist / pairRadius, in [0, 1).
// All four return 0 at x = 1 except `hard`, which is deliberately a step.
fn coreFalloffAt(x: f32) -> f32 {
    let mode = i32(P.coreFalloff);
    if (mode == 1) {
        let k = 1.0 - x;        // smooth: quadratic, gentle at the surface
        return k * k;
    }
    if (mode == 2) {
        return 1.0;             // hard: constant inside the radius, a step at it
    }
    if (mode == 3) {
        // stiff: blows up at contact, capped so it cannot explode the integrator
        return min((1.0 - x) / max(x, 0.02), 25.0);
    }
    return 1.0 - x;             // linear (default)
}

// Softened + capped inverse-distance force.
fn applyForce(f: f32, dist: f32, softening: f32, maxForce: f32) -> f32 {
    let softenedDist = sqrt(dist * dist + softening * softening);
    return clamp(f / softenedDist, -maxForce, maxForce);
}

fn cellOf(p: vec2f) -> u32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let cpr = i32(P.cellsPerRow);
    let rx = fmodp(p.x + half, world);
    let ry = fmodp(p.y + half, world);
    var cx = i32(floor(rx / P.cellSize)) % cpr;
    var cy = i32(floor(ry / P.cellSize)) % cpr;
    if (cx < 0) { cx += cpr; }
    if (cy < 0) { cy += cpr; }
    return u32(cy * cpr + cx);
}

// ----------------------------------------------------------- medium field ---

// The two medium regions swap roles each simulated frame.
fn mediumSrcBase() -> u32 { return (3u + u32(P.mediumFlip)) * u32(P.numCells); }
fn mediumDstBase() -> u32 { return (4u - u32(P.mediumFlip)) * u32(P.numCells); }

fn mediumLoad(base: u32, cell: vec2i) -> f32 {
    let cpr = i32(P.cellsPerRow);
    var cx = cell.x % cpr;
    var cy = cell.y % cpr;
    if (cx < 0) { cx += cpr; }
    if (cy < 0) { cy += cpr; }
    return bitcast<f32>(atomicLoad(&grid[base + u32(cy * cpr + cx)]));
}

// Bilinear across the 4 nearest cell centres. Without this the field is visibly
// blocky at cellSize = 500, and the gradient is a step function.
fn sampleMedium(p: vec2f) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / P.cellSize - vec2f(0.5);   // continuous cell coordinates
    let base = floor(g);
    let f = g - base;
    let b = vec2i(base);
    let dst = mediumDstBase();

    let m00 = mediumLoad(dst, b);
    let m10 = mediumLoad(dst, b + vec2i(1, 0));
    let m01 = mediumLoad(dst, b + vec2i(0, 1));
    let m11 = mediumLoad(dst, b + vec2i(1, 1));
    return mix(mix(m00, m10, f.x), mix(m01, m11, f.x), f.y);
}

// Central difference over one cell, so the result is in field units per cell
// rather than per world unit — otherwise it scales with cellSize and the
// Medium Force slider would need a different range for every world size.
fn mediumGradient(p: vec2f) -> vec2f {
    let h = P.cellSize * 0.5;
    return vec2f(
        sampleMedium(p + vec2f(h, 0.0)) - sampleMedium(p - vec2f(h, 0.0)),
        sampleMedium(p + vec2f(0.0, h)) - sampleMedium(p - vec2f(0.0, h)),
    );
}

// Blur the field, then let agent occupancy push it out of crowded cells.
// Runs after countCells, so the counts region is current.
@compute @workgroup_size(WG)
fn diffuseMedium(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    let n = u32(P.numCells);
    if (idx >= n) { return; }

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;
    let src = mediumSrcBase();

    // 3x3 tent blur (1-2-1 separable), wrapping at the world edges.
    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * mediumLoad(src, vec2i(cx + dx, cy + dy));
        }
    }
    let blurred = sum / 16.0;

    let here = mediumLoad(src, vec2i(cx, cy));
    var m = mix(here, blurred, clamp(P.mediumDiffuse, 0.0, 1.0));

    // Displacement: a cell packed with agents has no room left for medium.
    let occ = f32(atomicLoad(&grid[idx])) / max(P.mediumCapacity, 1.0);
    let room = clamp(1.0 - occ, 0.0, 1.0);
    m = mix(m, room, clamp(P.mediumDisplace, 0.0, 1.0));

    atomicStore(&grid[mediumDstBase() + idx], bitcast<u32>(clamp(m, 0.0, 1.0)));
}

// ---------------------------------------------------------- density field ---
//
// A finer grid than the spatial hash, purely for rendering. Reusing the hash
// cell counts gives a field only `cellsPerRow` across — 32 at the default world
// size, or one cell every ~57 screen pixels — and no amount of blurring makes a
// 32x32 image look like a fluid. Splatting agents into a DSUB-times finer grid
// costs one atomicAdd per agent and fixes the resolution at its source.

const DSUB: u32 = 4u;

fn densCellsPerRow() -> u32 { return u32(P.cellsPerRow) * DSUB; }
fn densCount() -> u32 { let n = densCellsPerRow(); return n * n; }
// Region 0 is the raw count, region 1 the smoothed float. After the counts are
// converted, region 0 is reused as blur scratch.
fn dens0Base() -> u32 { return 8u * u32(P.numCells); }
fn dens1Base() -> u32 { return dens0Base() + densCount(); }

@compute @workgroup_size(WG)
fn densitySplat(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    if (id >= u32(P.agentsCount)) { return; }

    let world = P.worldSize;
    let half = world * 0.5;
    let n = i32(densCellsPerRow());
    let size = P.cellSize / f32(DSUB);
    let p = inParticles[id].pos;

    var cx = i32(floor(fmodp(p.x + half, world) / size)) % n;
    var cy = i32(floor(fmodp(p.y + half, world) / size)) % n;
    if (cx < 0) { cx += n; }
    if (cy < 0) { cy += n; }
    atomicAdd(&grid[dens0Base() + u32(cy * n + cx)], 1u);
}

/** Counts -> float, so every later pass works in one representation. */
@compute @workgroup_size(WG)
fn densityNormalize(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= densCount()) { return; }
    let c = f32(atomicLoad(&grid[dens0Base() + idx]));
    atomicStore(&grid[dens1Base() + idx], bitcast<u32>(c));
}

@compute @workgroup_size(WG)
fn densityBlur(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    let total = densCount();
    if (idx >= total) { return; }

    let src = select(dens0Base(), dens1Base(), DENS_1_TO_0);
    let dst = select(dens1Base(), dens0Base(), DENS_1_TO_0);

    let n = i32(densCellsPerRow());
    let cx = i32(idx) % n;
    let cy = i32(idx) / n;

    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % n;
            var ny = (cy + dy) % n;
            if (nx < 0) { nx += n; }
            if (ny < 0) { ny += n; }
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * bitcast<f32>(atomicLoad(&grid[src + u32(ny * n + nx)]));
        }
    }
    atomicStore(&grid[dst + idx], bitcast<u32>(sum / 16.0));
}

// ---------------------------------------------------------- blob labelling ---
//
// Connected-component labelling over *occupied cells*, not over agents. The
// TODO's agent-resolution version would cost a full ~225-neighbour scan per
// iteration; at cell resolution an iteration is 8 loads over <=65,536 cells,
// which is thousands of times cheaper and gives the same answer for the
// droplet-shaped blobs this simulation actually makes.
//
// Propagation is `atomicMin` in place rather than a ping-pong. Min is monotone,
// so a lost update only delays convergence by an iteration — it cannot produce
// a wrong label — which saves a whole numCells region.

const BLOB_NONE: u32 = 0xFFFFFFFFu;

fn blobBase() -> u32 { return 5u * u32(P.numCells); }
fn densABase() -> u32 { return 6u * u32(P.numCells); }
fn densBBase() -> u32 { return 7u * u32(P.numCells); }

// A cell only conducts if it is genuinely dense. Labelling every *occupied*
// cell merges the whole world into one component, because the thin gas of
// stragglers between droplets is enough to bridge them. This threshold is what
// separates "blob" from "background".
//
// The test is against the *smoothed* density, not the raw count. Thresholding
// raw counts gives blobs the shape of the cell grid — blocky, with ragged
// edges and pinhole gaps. Blurring first and thresholding after rounds corners
// off and closes the pinholes, which is the standard way to get smooth
// isosurfaces out of a coarse field.
fn blobDensity(cell: u32) -> f32 {
    return bitcast<f32>(atomicLoad(&grid[densABase() + cell]));
}

fn blobSolid(cell: u32) -> bool {
    return blobDensity(cell) >= P.blobMinCount;
}

// Seed the density field from this frame's occupancy counts.
@compute @workgroup_size(WG)
fn blobDensityInit(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[densABase() + idx], bitcast<u32>(f32(atomicLoad(&grid[idx]))));
}

// One 3x3 tent blur of the density field. Dispatched an even number of times,
// alternating direction, so the result always lands back in region A.
@compute @workgroup_size(WG)
fn blobBlur(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }

    let src = select(densBBase(), densABase(), BLUR_A_TO_B);
    let dst = select(densABase(), densBBase(), BLUR_A_TO_B);

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;

    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % cpr;
            var ny = (cy + dy) % cpr;
            if (nx < 0) { nx += cpr; }
            if (ny < 0) { ny += cpr; }
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * bitcast<f32>(atomicLoad(&grid[src + u32(ny * cpr + nx)]));
        }
    }
    atomicStore(&grid[dst + idx], bitcast<u32>(sum / 16.0));
}

// Every occupied cell starts as its own blob; empty cells are unlabelled.
@compute @workgroup_size(WG)
fn blobSeed(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[blobBase() + idx], select(BLOB_NONE, idx, blobSolid(idx)));
}

// One round of "take the smallest label in my 3x3 neighbourhood". Repeated,
// the minimum floods each connected region; it converges in as many rounds as
// the region is wide in cells.
@compute @workgroup_size(WG)
fn blobPropagate(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    if (!blobSolid(idx)) { return; }

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;
    let base = blobBase();

    var best = atomicLoad(&grid[base + idx]);
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % cpr;
            var ny = (cy + dy) % cpr;
            if (nx < 0) { nx += cpr; }
            if (ny < 0) { ny += cpr; }
            let nIdx = u32(ny * cpr + nx);
            if (blobSolid(nIdx)) {
                best = min(best, atomicLoad(&grid[base + nIdx]));
            }
        }
    }
    atomicMin(&grid[base + idx], best);
}

// Cache each agent's blob so the render pass can read it as a vertex attribute
// (the vertex stage deliberately binds no storage buffers — see FINDINGS #2).
// Runs every frame, unlike the labelling itself, because agents change cells.
@compute @workgroup_size(WG)
fn resolveBlobs(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }
    indices[2u * n + id] = atomicLoad(&grid[blobBase() + indices[n + id]]);
}

// -------------------------------------------------------- blob splitting ---
//
// Mitosis. A blob is cut along a random axis through its own centroid and the
// two halves are pushed apart with opposite impulses, while their species drift
// in opposite directions — so a division is also a speciation event.
//
// Selection, such as it is, comes from the size threshold: only blobs that grew
// big enough to qualify ever divide, and a blob only gets big by holding
// together. That is the "persistence as fitness" idea in its cheapest form.
//
// Per-blob aggregates live in three numCells-sized regions, keyed by blob id
// (which *is* a cell index, so the sizing works out exactly).

fn blobCountBase() -> u32 { let d = 2u * u32(P.numCells) * DSUB * DSUB; return 8u * u32(P.numCells) + d; }
fn blobSumXBase() -> u32 { return blobCountBase() + u32(P.numCells); }
fn blobSumYBase() -> u32 { return blobCountBase() + 2u * u32(P.numCells); }

// Positions are summed as 8-bit fractions of the world. Coarse, but a centroid
// only needs cell-scale accuracy, and it keeps the sum inside u32 even at
// 1.6M agents (1.6e6 * 255 = 4.1e8).
const POS_QUANT: f32 = 255.0;

@compute @workgroup_size(WG)
fn blobStatsReset(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[blobCountBase() + idx], 0u);
    atomicStore(&grid[blobSumXBase() + idx], 0u);
    atomicStore(&grid[blobSumYBase() + idx], 0u);
}

@compute @workgroup_size(WG)
fn blobStatsAccum(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }
    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }

    let world = P.worldSize;
    let half = world * 0.5;
    let p = outParticles[id].pos;
    let qx = u32(clamp(fmodp(p.x + half, world) / world, 0.0, 1.0) * POS_QUANT);
    let qy = u32(clamp(fmodp(p.y + half, world) / world, 0.0, 1.0) * POS_QUANT);

    atomicAdd(&grid[blobCountBase() + blob], 1u);
    atomicAdd(&grid[blobSumXBase() + blob], qx);
    atomicAdd(&grid[blobSumYBase() + blob], qy);
}

@compute @workgroup_size(WG)
fn splitBlobs(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }

    let count = atomicLoad(&grid[blobCountBase() + blob]);
    if (count < u32(P.splitMinCount)) { return; }

    // One decision per blob per epoch, taken identically by every agent in it.
    let epoch = u32(P.frame) / max(u32(P.splitInterval), 1u);
    let roll = hashU32(blob * 2246822519u + epoch);
    if (f32(roll % 10000u) / 10000.0 > P.splitChance) { return; }

    // Centroid, back out of the quantised sums.
    let world = P.worldSize;
    let half = world * 0.5;
    let inv = 1.0 / (f32(count) * POS_QUANT);
    let cx = f32(atomicLoad(&grid[blobSumXBase() + blob])) * inv * world - half;
    let cy = f32(atomicLoad(&grid[blobSumYBase() + blob])) * inv * world - half;

    // A random cut plane through it, stable for this blob and epoch.
    let ang = f32(hashU32(blob * 668265263u + epoch) % 62832u) * 0.0001;
    let axis = vec2f(cos(ang), sin(ang));

    // Which half am I? Toroidal, so the blob can straddle the world edge.
    let d = toroidalDiff(vec2f(cx, cy), outParticles[id].pos, vec2f(world));
    let side = select(-1.0, 1.0, dot(d, axis) >= 0.0);

    // Shove the halves apart, and let them speciate in opposite directions.
    outParticles[id].vel += axis * (side * P.splitImpulse);

    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    if (maxIdx > 0.0 && P.splitMutation > 0.0) {
        let period = 2.0 * maxIdx;
        var v = fmodp(species[id] + side * P.splitMutation, period);
        if (v > maxIdx) { v = period - v; }
        species[id] = v;
    }
}

// ------------------------------------------------------------- mutation ---
//
// Random drift in species space, per blob. Every agent in a blob is given the
// *same* nudge, so a droplet's whole lineage moves together rather than
// dissolving into noise — that is what makes it read as one thing evolving
// instead of 25,000 independent random walks.
//
// With no fitness this is a pure random walk, so it would diffuse toward the
// middle of the species range and stay there. `mutateBias` pushes back
// outwards, which keeps the population spread out and interesting to look at.
// Real selection arrives when blob *persistence* gates splitting — see TODO.

@compute @workgroup_size(WG)
fn mutateSpecies(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }   // background agents do not mutate

    // One epoch per mutation step, so a blob's nudge is constant across the
    // dispatch but changes between them.
    let epoch = u32(P.frame) / max(u32(P.mutateInterval), 1u);
    var delta = hashSigned(blob * 2654435761u + epoch) * P.mutateRate;

    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    let s = species[id];
    if (maxIdx <= 0.0) { return; }

    // Optional outward push, away from the centre of the range.
    delta += sign(s - maxIdx * 0.5) * P.mutateBias * P.mutateRate;

    // Reflect at the ends rather than clamp. Clamping makes 0 and N-1 absorbing
    // states, so a random walk piles up against them and the population ends up
    // stuck at the extremes; reflection leaves the walk unbiased and bounded,
    // whose stationary distribution is uniform across the range.
    let period = 2.0 * maxIdx;
    var v = fmodp(s + delta, period);
    if (v > maxIdx) { v = period - v; }
    species[id] = v;
}

// -------------------------------------------------------- spatial hashing ---

@compute @workgroup_size(WG)
fn countCells(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let cell = cellOf(inParticles[id].pos);
    indices[n + id] = cell;                 // agentCell region
    atomicAdd(&grid[cell], 1u);
}

var<workgroup> scanTemp: array<u32, WG>;

// Single-workgroup exclusive prefix sum over the per-cell counts. Writes the
// result to both the offsets region and the cursor region (scatter consumes the
// cursor destructively). numCells is small (~1-4k) so one workgroup is plenty.
@compute @workgroup_size(WG)
fn prefixSum(@builtin(local_invocation_id) lid: vec3u) {
    let tid = lid.x;
    let n = u32(P.numCells);
    var carry = 0u;
    var base = 0u;

    loop {
        if (base >= n) { break; }

        let i = base + tid;
        var v = 0u;
        if (i < n) { v = atomicLoad(&grid[i]); }
        scanTemp[tid] = v;
        workgroupBarrier();

        // Hillis-Steele inclusive scan.
        var offset = 1u;
        loop {
            if (offset >= WG) { break; }
            var t = 0u;
            if (tid >= offset) { t = scanTemp[tid - offset]; }
            workgroupBarrier();
            if (tid >= offset) { scanTemp[tid] = scanTemp[tid] + t; }
            workgroupBarrier();
            offset = offset * 2u;
        }

        let exclusive = scanTemp[tid] - v + carry;
        let blockTotal = scanTemp[WG - 1u];
        if (i < n) {
            atomicStore(&grid[n + i], exclusive);        // offsets
            atomicStore(&grid[2u * n + i], exclusive);   // cursor
        }
        workgroupBarrier();

        carry += blockTotal;
        base += WG;
    }
}

@compute @workgroup_size(WG)
fn scatter(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let cell = indices[n + id];
    let slot = atomicAdd(&grid[2u * u32(P.numCells) + cell], 1u);
    indices[slot] = id;
}

// ------------------------------------------------------------ simulation ---

@compute @workgroup_size(WG)
fn runSim(@builtin(global_invocation_id) gid: vec3u,
          @builtin(workgroup_id) wid: vec3u) {
    let id = gid.x;
    let agentCount = u32(P.agentsCount);
    if (id >= agentCount) { return; }

    var pos = inParticles[id].pos;
    var vel = inParticles[id].vel;
    let mySpecies = species[id];
    let mySize = speciesLerp(coreSizeBase(), mySpecies);

    // The actor's own bracket is fixed for the whole neighbour loop, so resolve
    // it once here. Only the *target's* bracket varies per neighbour, which
    // turns the bilinear matrix lookup into 4 loads and 3 mixes inside the loop.
    let myBracket = speciesBracket(mySpecies);

    let worldSize = P.worldSize;
    var align = vec2f(0.0);
    var coh = vec2f(0.0);
    var sep = vec2f(0.0);
    var interact = vec2f(0.0);
    var core = vec2f(0.0);
    var neighborCount = 0;

    let cpr = i32(P.cellsPerRow);
    let half = worldSize * 0.5;
    let posWrapped = vec2f(fmodp(pos.x + half, worldSize), fmodp(pos.y + half, worldSize));
    let cx = i32(floor(posWrapped.x / P.cellSize)) % cpr;
    let cy = i32(floor(posWrapped.y / P.cellSize)) % cpr;

    let numCells = u32(P.numCells);
    let maxCollisions = u32(P.maxCollisions);
    let speciesCount = u32(P.speciesCount);
    let rowLo = u32(myBracket.x) * speciesCount;
    let rowHi = u32(myBracket.y) * speciesCount;
    let coreBase = coreSizeBase();

    // 3x3 neighbourhood of cells, wrapping at the world edges.
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            var ncx = (cx + dx) % cpr;
            var ncy = (cy + dy) % cpr;
            if (ncx < 0) { ncx += cpr; }
            if (ncy < 0) { ncy += cpr; }
            let cellIndex = u32(ncy * cpr + ncx);

            let start = atomicLoad(&grid[numCells + cellIndex]);
            let count = atomicLoad(&grid[cellIndex]);
            let end = start + count;

            for (var k = start; k < end; k++) {
                let i = indices[k];
                if (i == id) { continue; }

                let otherPos = inParticles[i].pos;
                let diff = toroidalDiff(pos, otherPos, vec2f(worldSize));
                var dist = length(diff);
                if (dist < 0.0001) { dist = 0.0001; }

                if (WANT_BOIDS && dist < P.boidVisionRadius) {
                    neighborCount++;
                    align += inParticles[i].vel;
                    coh += pos + diff;
                    sep -= diff / (dist * dist);
                }

                if (WANT_PLIFE && dist < P.speciesInteractionRadius) {
                    var f = 0.0;
                    if (CONTINUOUS_SPECIES) {
                        // Bilinear across the four surrounding matrix entries:
                        // both the actor's row and the target's column get
                        // interpolated. A single lerp between rows would be wrong.
                        let ob = speciesBracket(species[i]);
                        let c0 = u32(ob.x);
                        let c1 = u32(ob.y);
                        f = mix(
                            mix(interaction[rowLo + c0], interaction[rowLo + c1], ob.z),
                            mix(interaction[rowHi + c0], interaction[rowHi + c1], ob.z),
                            myBracket.z,
                        );
                    } else {
                        // Species are integers, so rowLo is already the right
                        // row and no interpolation can change the answer.
                        f = interaction[rowLo + u32(species[i])];
                    }
                    let dir = diff / dist;
                    interact += dir * applyForce(f, dist, P.forceSoftening, P.maxForce);
                }

                // Excluded volume. A short-range repulsion that ignores the
                // interaction matrix entirely, so mutually attracted species
                // keep real spacing instead of collapsing to a point.
                //
                // P.coreRadius is the *widest* a pair can be, since both sizes
                // are <= 1. Testing against it first means the extra species
                // read only happens for the few neighbours that are actually
                // close, rather than all ~225 of them.
                if (dist < P.coreRadius) {
                    var otherSize = 0.0;
                    if (CONTINUOUS_SPECIES) {
                        otherSize = speciesLerp(coreBase, species[i]);
                    } else {
                        otherSize = interaction[coreBase + u32(species[i])];
                    }
                    // Pair radius is the sum of the two agents' radii, so a
                    // species with size 0 neither excludes nor is excluded.
                    let pairRadius = P.coreRadius * 0.5 * (mySize + otherSize);
                    if (dist < pairRadius) {
                        let mag = P.coreStrength * mySize * coreFalloffAt(dist / pairRadius);
                        core -= (diff / dist) * mag;
                    }
                }

                if (dist < P.collisionRadius) {
                    let slot = atomicAdd(&collisions[id], 1u);
                    if (slot < maxCollisions) {
                        atomicStore(&collisions[agentCount + id * maxCollisions + slot], i);
                    }
                }
            }
        }
    }

    // Finalize boids averages.
    var boidForce = vec2f(0.0);
    if (neighborCount > 0) {
        let n = f32(neighborCount);
        align = safeNormalize(align / n) * P.alignmentForce;
        coh = safeNormalize((coh / n) - pos) * P.cohesionForce;
        sep = safeNormalize(sep) * P.separationForce;
        boidForce = align + coh + sep;
    }

    // Blend boids <-> particle life.
    var accel = mix(boidForce, interact, P.mixT);

    // Excluded volume is a property of the agent, not of either force model,
    // so it is added outside the blend and applies at every mixT.
    accel += core;

    // Medium: philic species climb the concentration gradient, phobic ones flee
    // it. Four bilinear taps per agent — not per neighbour — so this costs
    // nothing next to the loop above.
    if (P.mediumForce > 0.0001) {
        let philicity = speciesLerp(philicityBase(), mySpecies);
        accel += mediumGradient(pos) * (philicity * P.mediumForce);
    }

    if (P.centerAttraction > 0.0001) {
        accel += safeNormalize(-pos) * P.centerAttraction;
    }

    accel += randomDir(id + wid.x, P.movementRandomness);
    accel = limitVec(accel, P.maxForce);
    accel *= P.movementScaling;

    // Clamp speed (matches the original: applied before integration).
    let speed = length(vel);
    if (speed < P.minSpeed && speed > 0.0001) {
        vel = normalize(vel) * P.minSpeed;
    }
    if (speed > P.maxSpeed) {
        vel = normalize(vel) * P.maxSpeed;
    }

    vel += accel * P.dt;
    vel *= P.drag;

    pos += vel * P.dt;
    pos = applyBorder(pos);

    outParticles[id].pos = pos;
    outParticles[id].vel = vel;

    // The neighbour count is already computed for the boids averages; writing
    // it out costs one store and is what lets the renderer draw a droplet's
    // *surface* — interior agents have many neighbours, skin agents few.
    indices[3u * agentCount + id] = u32(max(neighborCount, 0));
}

@compute @workgroup_size(WG)
fn resolveCollide(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let agentCount = u32(P.agentsCount);
    if (id >= agentCount) { return; }

    var pos = outParticles[id].pos;

    var correction = vec2f(0.0);
    var contribCount = 0u;

    let maxCollisions = u32(P.maxCollisions);
    let rawCount = atomicLoad(&collisions[id]);
    var c = min(rawCount, maxCollisions);
    if (c > agentCount) { c = agentCount; }

    let worldSize = P.worldSize;
    let colRadius = P.collisionRadius;
    let perNeighborMax = colRadius * 2.0;
    let maxMove = colRadius * 1.0;
    let applyFrac = 1.0;

    for (var s = 0u; s < c; s++) {
        let j = atomicLoad(&collisions[agentCount + id * maxCollisions + s]);
        if (j >= agentCount || j == id) { continue; }

        let otherPos = outParticles[j].pos;
        let diff = -toroidalDiff(pos, otherPos, vec2f(worldSize));
        let dist = length(diff);

        if (dist < 1e-6) {
            // Perfectly coincident: push apart along a pseudo-random axis.
            let angle = f32((id + 37u) % 1024u) * 0.0062831853;
            let n = vec2f(cos(angle), sin(angle));
            correction += n * min(colRadius, perNeighborMax);
            contribCount++;
            continue;
        }

        if (dist < colRadius) {
            let n = diff / dist;
            let overlap = colRadius - dist;
            correction += n * min(overlap, perNeighborMax);
            contribCount++;
        }
    }

    if (contribCount > 0u) {
        correction /= f32(contribCount);
        correction = clamp(correction, vec2f(-maxMove), vec2f(maxMove));
        pos += correction * applyFrac;
    }

    outParticles[id].pos = pos;
}
