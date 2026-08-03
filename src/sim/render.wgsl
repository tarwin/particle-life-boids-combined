// Rendering for the particle-life/boids sim.
//
// The Godot original rasterised circles by hand with imageStore() inside the
// compute shader. Here we use a real render pipeline instead: one instanced
// quad per agent, with the particle buffer bound directly as an instance-rate
// vertex buffer. Much faster, and we get antialiased edges for free.

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

    _pad0: f32,
};

@group(0) @binding(0) var<uniform> P: Params;

// Same buffer the compute stage bins agents into, bound read-only here purely so
// the medium overlay can sample its 4th/5th regions. See compute.wgsl for the
// region layout.
@group(0) @binding(1) var<storage, read> grid: array<u32>;

// Two independent uniforms in [0,1) from one integer. WGSL has no forward
// declarations, so shared helpers live above their first use.
fn hash2(xIn: u32) -> vec2f {
    var h = xIn;
    h ^= h >> 16u; h *= 0x7feb352du;
    h ^= h >> 15u; h *= 0x846ca68bu;
    h ^= h >> 16u;
    let a = f32(h & 0xFFFFu) / 65535.0;
    let b = f32((h >> 16u) & 0xFFFFu) / 65535.0;
    return vec2f(a, b);
}

// Blue -> cyan -> green -> yellow -> red.
fn heatmap(tIn: f32) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0);
    if (t < 0.25) {
        return mix(vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 1.0), t / 0.25);
    } else if (t < 0.5) {
        return mix(vec3f(0.0, 1.0, 1.0), vec3f(0.0, 1.0, 0.0), (t - 0.25) / 0.25);
    } else if (t < 0.75) {
        return mix(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 1.0, 0.0), (t - 0.5) / 0.25);
    }
    return mix(vec3f(1.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), (t - 0.75) / 0.25);
}

// Polynomial fit to matplotlib's viridis. Perceptually uniform, unlike the
// heatmap above — equal steps in t look like equal steps in brightness, so
// species read as ordered rather than as an arbitrary rainbow.
fn viridis(tIn: f32) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0);
    let c0 = vec3f(0.2777, 0.0054, 0.3341);
    let c1 = vec3f(0.1051, 1.4046, 1.3846);
    let c2 = vec3f(-0.3308, 0.2148, 0.0951);
    let c3 = vec3f(-4.6342, -5.7991, -19.3324);
    let c4 = vec3f(6.2283, 14.1799, 56.6906);
    let c5 = vec3f(4.7764, -13.7451, -65.3530);
    let c6 = vec3f(-5.4355, 4.6459, 26.3124);
    return clamp(c0 + t * (c1 + t * (c2 + t * (c3 + t * (c4 + t * (c5 + t * c6))))),
                 vec3f(0.0), vec3f(1.0));
}

// Hand-built ramps. Explicit stops rather than fitted polynomials, so what you
// see is what is written here.
fn rampStops(tIn: f32, a: vec3f, b: vec3f, c: vec3f, d: vec3f) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0) * 3.0;
    if (t < 1.0) { return mix(a, b, t); }
    if (t < 2.0) { return mix(b, c, t - 1.0); }
    return mix(c, d, t - 2.0);
}

// Full hue wheel. The right choice for *continuous* species, where 0 and N-1
// are neighbours in the interpolation and a linear ramp wrongly implies they
// are maximally far apart.
fn cyclic(tIn: f32) -> vec3f {
    let hue = fract(tIn) * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    if (hue < 1.0) { return vec3f(1.0, x, 0.0); }
    if (hue < 2.0) { return vec3f(x, 1.0, 0.0); }
    if (hue < 3.0) { return vec3f(0.0, 1.0, x); }
    if (hue < 4.0) { return vec3f(0.0, x, 1.0); }
    if (hue < 5.0) { return vec3f(x, 0.0, 1.0); }
    return vec3f(1.0, 0.0, x);
}

fn palette(t: f32) -> vec3f {
    let p = i32(P.speciesPalette);
    if (p == 1) { return viridis(t); }
    if (p == 2) {   // ember: black -> deep red -> orange -> white hot
        return rampStops(t, vec3f(0.10, 0.02, 0.05), vec3f(0.65, 0.08, 0.05),
                            vec3f(1.0, 0.55, 0.05), vec3f(1.0, 0.98, 0.85));
    }
    if (p == 3) {   // ice: midnight -> blue -> cyan -> white
        return rampStops(t, vec3f(0.03, 0.05, 0.22), vec3f(0.05, 0.35, 0.75),
                            vec3f(0.35, 0.85, 0.95), vec3f(0.95, 1.0, 1.0));
    }
    if (p == 4) { return cyclic(t); }
    if (p == 5) {   // mono
        let v = 0.15 + 0.85 * clamp(t, 0.0, 1.0);
        return vec3f(v);
    }
    if (p == 6) {   // plasma: indigo -> magenta -> orange -> yellow
        return rampStops(t, vec3f(0.05, 0.03, 0.53), vec3f(0.61, 0.09, 0.62),
                            vec3f(0.95, 0.42, 0.28), vec3f(0.94, 0.98, 0.13));
    }
    if (p == 7) {   // aurora: deep teal -> green -> pale pink
        return rampStops(t, vec3f(0.02, 0.10, 0.18), vec3f(0.05, 0.55, 0.45),
                            vec3f(0.45, 0.92, 0.55), vec3f(0.95, 0.75, 0.90));
    }
    if (p == 8) {   // sunset: night -> violet -> coral -> gold
        return rampStops(t, vec3f(0.09, 0.05, 0.22), vec3f(0.55, 0.14, 0.45),
                            vec3f(0.98, 0.42, 0.35), vec3f(1.0, 0.85, 0.42));
    }
    if (p == 9) {   // forest: bark -> moss -> leaf -> sand
        return rampStops(t, vec3f(0.08, 0.10, 0.06), vec3f(0.16, 0.36, 0.16),
                            vec3f(0.48, 0.70, 0.25), vec3f(0.90, 0.86, 0.60));
    }
    if (p == 10) {  // neon: black -> magenta -> cyan -> white
        return rampStops(t, vec3f(0.04, 0.0, 0.08), vec3f(0.95, 0.05, 0.75),
                            vec3f(0.10, 0.95, 0.95), vec3f(1.0, 1.0, 1.0));
    }
    if (p == 11) {  // pastel: low saturation across the wheel
        return rampStops(t, vec3f(0.70, 0.80, 0.92), vec3f(0.78, 0.92, 0.80),
                            vec3f(0.97, 0.90, 0.72), vec3f(0.95, 0.76, 0.80));
    }
    if (p == 12) {  // copper: near-black -> rust -> copper -> highlight
        return rampStops(t, vec3f(0.05, 0.02, 0.01), vec3f(0.42, 0.16, 0.06),
                            vec3f(0.82, 0.47, 0.22), vec3f(1.0, 0.85, 0.65));
    }
    if (p == 13) {  // spectrum: full rainbow, but not wrapping like cyclic
        return cyclic(clamp(t, 0.0, 1.0) * 0.85);
    }
    return heatmap(t);
}

// Species is continuous, so this already does the right thing for an agent
// sitting between two basis species — every ramp takes a continuous t.
fn speciesColor(s: f32) -> vec3f {
    let t = s / max(P.speciesCount - 1.0, 1.0);
    return palette(t);
}

// Blob ids are cell indices, so neighbouring blobs get neighbouring numbers and
// would shade almost identically. Hash first, then spread over a full-saturation
// hue wheel — adjacent blobs need to look obviously different, which a linear
// ramp cannot do.
fn blobColor(idIn: u32) -> vec3f {
    if (idIn == 0xFFFFFFFFu) {
        return vec3f(0.18);          // unlabelled: dim grey
    }
    var h = idIn;
    h ^= h >> 16u;
    h *= 0x7feb352du;
    h ^= h >> 15u;
    h *= 0x846ca68bu;
    h ^= h >> 16u;

    let hue = f32(h % 1024u) / 1024.0 * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    // Vary value slightly with the hash too, so same-hue neighbours still read
    // as distinct.
    let v = 0.75 + f32((h >> 10u) % 256u) / 256.0 * 0.25;
    var rgb = vec3f(0.0);
    if (hue < 1.0)      { rgb = vec3f(1.0, x, 0.0); }
    else if (hue < 2.0) { rgb = vec3f(x, 1.0, 0.0); }
    else if (hue < 3.0) { rgb = vec3f(0.0, 1.0, x); }
    else if (hue < 4.0) { rgb = vec3f(0.0, x, 1.0); }
    else if (hue < 5.0) { rgb = vec3f(x, 0.0, 1.0); }
    else                { rgb = vec3f(1.0, 0.0, x); }
    return rgb * v;
}

// Direction as hue, speed as brightness — the standard optical-flow reading.
fn velocityColor(vel: vec2f) -> vec3f {
    let speed = length(vel);
    let t = clamp(speed / max(P.maxSpeed, 1.0), 0.0, 1.0);
    let ang = (atan2(vel.y, vel.x) + 3.14159265) / 6.28318531;
    let hue = ang * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    var rgb = vec3f(0.0);
    if (hue < 1.0)      { rgb = vec3f(1.0, x, 0.0); }
    else if (hue < 2.0) { rgb = vec3f(x, 1.0, 0.0); }
    else if (hue < 3.0) { rgb = vec3f(0.0, 1.0, x); }
    else if (hue < 4.0) { rgb = vec3f(0.0, x, 1.0); }
    else if (hue < 5.0) { rgb = vec3f(x, 0.0, 1.0); }
    else                { rgb = vec3f(1.0, 0.0, x); }
    // Keep slow agents visible rather than black, but clearly dimmer.
    return rgb * (0.25 + 0.75 * sqrt(t));
}

// Screen pixels (y down, origin top-left) -> clip space.
fn screenToClip(screen: vec2f) -> vec4f {
    let ndc = vec2f(
        screen.x / P.viewportW * 2.0 - 1.0,
        1.0 - screen.y / P.viewportH * 2.0,
    );
    return vec4f(ndc, 0.0, 1.0);
}

// ------------------------------------------------------------- particles ---

// The glow layer is the same geometry drawn wider, softer and additively.
// Compiled as a separate pipeline from these same two entry points so the
// branches fold away rather than costing a test per fragment.
override GLOW_PASS: bool = false;

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,        // -1..1 across the quad
    @location(1) color: vec3f,
    @location(2) pxRadius: f32,
    @location(3) fade: f32,
    @location(4) @interpolate(flat) shape: u32,
};

@vertex
fn vsParticle(
    @builtin(vertex_index) vi: u32,
    @builtin(instance_index) inst: u32,
    @location(0) pos: vec2f,
    @location(1) vel: vec2f,
    @location(2) sp: f32,
    @location(3) blob: u32,
) -> VSOut {
    // 4-vertex triangle-strip quad: (-1,-1) (1,-1) (-1,1) (1,1)
    let corner = vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0;

    // World -> screen, matching the compute shader's camera convention.
    var screen = (pos - vec2f(P.cameraX, P.cameraY)) * P.zoom;
    screen += vec2f(P.viewportW, P.viewportH) * 0.5;

    // Per-agent size variation, from the instance index so it is stable frame
    // to frame (a jitter that reshuffled every frame would just look like
    // flicker). Both the core and the glow pass derive it identically, so
    // halos stay matched to their agents.
    var sizeMul = P.drawScale;
    if (P.drawJitter > 0.0001) {
        let h = hash2(inst * 0x9e3779b9u).x;          // [0, 1)
        sizeMul = sizeMul * max(1.0 + (h - 0.5) * 2.0 * P.drawJitter, 0.05);
    }

    // Scale in world units first, then clamp in pixels — otherwise the 1px
    // floor would swallow the variation whenever agents are sub-pixel.
    var radius = max(P.drawRadius * sizeMul * P.zoom, 1.0);
    if (GLOW_PASS) {
        radius = radius * max(P.glowSize, 1.0);
    }
    let padded = radius + 1.0;   // 1px of slack for the AA falloff

    // Velocity stretch: build the quad in a frame aligned to the velocity and
    // scale along it, so a disc becomes a streak. uv stays the unrotated
    // corner, so the fragment still evaluates its shape in a circular space.
    var offset = corner * padded;
    if (P.velocityStretch > 0.0001) {
        let speed = length(vel);
        if (speed > 0.0001) {
            let dir = vel / speed;
            let perp = vec2f(-dir.y, dir.x);
            let t = clamp(speed / max(P.maxSpeed, 1.0), 0.0, 1.0);
            let s = 1.0 + P.velocityStretch * t;
            offset = (dir * (corner.x * s) + perp * corner.y) * padded;
        }
    }

    var out: VSOut;
    out.position = screenToClip(screen + offset);
    out.uv = corner * (padded / radius);
    let mode = i32(P.renderMode);
    if (mode == 1) {
        out.color = blobColor(blob);
    } else if (mode == 2) {
        out.color = velocityColor(vel);
    } else {
        out.color = speciesColor(sp);
    }
    out.pxRadius = radius;
    out.fade = select(1.0, P.glowStrength, GLOW_PASS);

    // "Varied" means pick a shape per *species*, so a species reads as one kind
    // of thing rather than every agent being independently speckled.
    var shape = u32(max(P.particleShape, 0.0));
    if (shape >= SHAPE_COUNT) {
        let basis = u32(max(sp, 0.0));
        shape = min(u32(hash2(basis * 2654435761u + 7u).x * f32(SHAPE_COUNT)),
                    SHAPE_COUNT - 1u);
    }
    out.shape = shape;
    return out;
}

// How many concrete shapes exist. Anything at or above this index means
// "vary per species", resolved in the vertex shader.
const SHAPE_COUNT: u32 = 7u;

// Coverage in [0,1] for a shape, given the -1..1 quad coordinate. `px` is the
// radius in pixels, used to keep the antialiasing a constant width on screen
// rather than a constant width in uv.
//
// Every branch reduces to a normalised distance `m` that is 1 at the edge, so
// they all share the same coverage-style antialiasing.
fn shapeCoverage(uv: vec2f, px: f32, shapeIn: u32) -> f32 {
    let shape = i32(shapeIn);

    if (shape == 1) {
        // Soft: gaussian-ish falloff. Reads as a haze blob rather than a dot,
        // and neighbouring agents merge into continuous mass.
        let d = length(uv);
        if (d >= 1.0) { return 0.0; }
        let k = 1.0 - d * d;
        return k * k;
    }
    if (shape == 2) {
        // Ring: shows structure through dense clumps that solid discs hide.
        let d = length(uv);
        let w = max(1.2 / px, 0.18);          // constant-ish on screen
        return clamp((1.0 - abs(d - (1.0 - w)) / w) , 0.0, 1.0);
    }
    if (shape == 3) {
        // Square: crisp, and cheap to read at very small sizes.
        let m = max(abs(uv.x), abs(uv.y));
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 4) {
        // Diamond: the L1 ball, so it reads as a square rotated 45 degrees.
        let m = abs(uv.x) + abs(uv.y);
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 5) {
        // Triangle: max of three half-plane distances, normals 90 degrees
        // apart around the circle, divided by the inradius so m = 1 at an edge.
        let m = max(-uv.y, max(0.866 * uv.x + 0.5 * uv.y,
                               -0.866 * uv.x + 0.5 * uv.y)) / 0.5;
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 6) {
        // Plus: inside if it is within the bar in *either* axis, hence the min.
        let w = 0.38;
        let m = max(min(abs(uv.x), abs(uv.y)) / w, max(abs(uv.x), abs(uv.y)));
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }

    // Disc (default). Coverage-style AA: distance from the edge in pixels.
    // Keeps sub-pixel particles fully opaque at their centre instead of fading
    // them out, which matters a lot when zoomed out.
    let d = length(uv);
    return clamp((1.0 - d) * px + 0.5, 0.0, 1.0);
}

@fragment
fn fsParticle(in: VSOut) -> @location(0) vec4f {
    var alpha: f32;
    if (GLOW_PASS) {
        // Always soft, whatever the core shape is — a halo with a hard edge
        // would just look like a bigger particle.
        let d = length(in.uv);
        if (d >= 1.0) { discard; }
        let k = 1.0 - d * d;
        alpha = k * k * k * in.fade;
    } else {
        alpha = shapeCoverage(in.uv, in.pxRadius, in.shape);
    }
    if (alpha <= 0.004) {
        discard;
    }
    return vec4f(in.color * alpha, alpha);
}

// ------------------------------------------------------- drifting motes ---
//
// Purely decorative background haze. No buffers and no simulation state: every
// mote's position is derived from its instance index and the frame counter, so
// this costs one extra instanced draw and nothing else.
//
// Placement is a **jittered grid**, not uniform random. Uniform random clumps —
// that is what random looks like — and clumped motes visually merge into
// blotches. One mote per grid cell with the jitter bounded to less than half a
// cell guarantees a minimum separation, which is the cheap way to get
// blue-noise-ish spacing.

struct DriftOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) alpha: f32,
};

@vertex
fn vsDrift(
    @builtin(vertex_index) vi: u32,
    @builtin(instance_index) inst: u32,
) -> DriftOut {
    let corner = vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0;

    let cols = max(u32(P.driftCols), 1u);
    let cell = vec2f(f32(inst % cols), f32(inst / cols));
    let cellSize = P.worldSize / f32(cols);

    let r0 = hash2(inst * 2654435761u);
    let r1 = hash2(inst * 40503u + 17u);

    // Jitter stays inside the middle 60% of the cell, so two motes in adjacent
    // cells can never come closer than 40% of a cell spacing.
    let jitter = (r0 - 0.5) * 0.6 * cellSize;

    // Slow independent drift per mote, wrapped into the cell so spacing holds.
    let t = P.frame * P.driftSpeed;
    let phase = r1 * 6.28318531;
    let wander = vec2f(sin(t * (0.3 + r1.x * 0.7) + phase.x),
                       cos(t * (0.3 + r1.y * 0.7) + phase.y)) * 0.2 * cellSize;

    var world = (cell + 0.5) * cellSize - P.worldSize * 0.5 + jitter + wander;

    var screen = (world - vec2f(P.cameraX, P.cameraY)) * P.zoom;
    screen += vec2f(P.viewportW, P.viewportH) * 0.5;

    // Size varies per mote for depth; never smaller than a pixel or it flickers.
    let radius = max(P.driftSize * (0.5 + r1.x) * P.zoom, 1.0);

    var out: DriftOut;
    out.position = screenToClip(screen + corner * radius);
    out.uv = corner;
    out.alpha = P.driftBrightness * (0.35 + 0.65 * r0.y);
    return out;
}

@fragment
fn fsDrift(in: DriftOut) -> @location(0) vec4f {
    // Soft gaussian-ish falloff rather than a hard disc — these should read as
    // haze, not as agents.
    let d = length(in.uv);
    if (d > 1.0) { discard; }
    let fade = 1.0 - d * d;
    let a = in.alpha * fade * fade;
    return vec4f(vec3f(0.45, 0.60, 0.85) * a, a);   // premultiplied
}

// -------------------------------------------------------------- trails ---
//
// Persistence of vision. Instead of clearing the frame, the scene is drawn into
// a texture that is faded a little toward the background each frame, so agents
// leave a decaying streak behind them.
//
// The fade is a fullscreen quad of the background colour at alpha = trailFade,
// blended premultiplied — which is exactly a lerp of the accumulated image
// toward the background. That is why the background colour has to reach the
// shader here rather than staying a CPU-side clear value.

@fragment
fn fsFade() -> @location(0) vec4f {
    let a = clamp(P.trailFade, 0.0, 1.0);
    return vec4f(P.bgR * a, P.bgG * a, P.bgB * a, a);   // premultiplied
}

// The accumulation texture, sampled only by the blit that copies it to the
// canvas. It gets its own bind group, because a texture cannot be read and
// written in the same pass.
@group(1) @binding(0) var accumTex: texture_2d<f32>;

@fragment
fn fsBlit(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    // One texel per pixel — no filtering wanted, and textureLoad needs no
    // sampler at all.
    return textureLoad(accumTex, vec2i(frag.xy), 0);
}

// ---------------------------------------------------------- grid overlay ---

@vertex
fn vsFullscreen(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
    // Oversized triangle covering the whole viewport:
    // (-1,-1), (3,-1), (-1,3)
    let x = select(-1.0, 3.0, vi == 1u);
    let y = select(-1.0, 3.0, vi == 2u);
    return vec4f(x, y, 0.0, 1.0);
}

fn fmodp(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

fn screenToWorld(frag: vec2f) -> vec2f {
    let centered = frag - vec2f(P.viewportW, P.viewportH) * 0.5;
    return centered / P.zoom + vec2f(P.cameraX, P.cameraY);
}

@fragment
fn fsGrid(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);

    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let cs = P.cellSize;
    let fx = fmodp(world.x + halfWorld, cs);
    let fy = fmodp(world.y + halfWorld, cs);
    let thickness = max(1.0 / P.zoom, 1.0);

    let vertical = fx < thickness || fx > cs - thickness;
    let horizontal = fy < thickness || fy > cs - thickness;
    if (!vertical && !horizontal) {
        discard;
    }
    let a = 0.35;
    return vec4f(vec3f(0.55) * a, a);   // premultiplied
}

// -------------------------------------------------------- medium overlay ---

// Mirrors sampleMedium() in compute.wgsl, reading the same ping-ponged region.
// Bilinear across the 4 nearest cell centres of any per-cell region. Without
// it a cell-resolution field reads as visible squares at cellSize = 500.
fn sampleCells(p: vec2f, base: u32) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let cpr = i32(P.cellsPerRow);

    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / P.cellSize - vec2f(0.5);
    let c0 = vec2i(floor(g));
    let f = g - floor(g);

    var m: array<f32, 4>;
    for (var k = 0; k < 4; k++) {
        var cx = (c0.x + (k & 1)) % cpr;
        var cy = (c0.y + (k >> 1)) % cpr;
        if (cx < 0) { cx += cpr; }
        if (cy < 0) { cy += cpr; }
        m[k] = bitcast<f32>(grid[base + u32(cy * cpr + cx)]);
    }
    return mix(mix(m[0], m[1], f.x), mix(m[2], m[3], f.x), f.y);
}

fn sampleMedium(p: vec2f) -> f32 {
    return sampleCells(p, (4u - u32(P.mediumFlip)) * u32(P.numCells));
}

// The smoothed agent-density field. It lives on its own grid, DSUB times finer
// than the spatial hash, so it needs its own cell size and row stride rather
// than sampleCells().
const DSUB: u32 = 4u;

fn sampleDensity(p: vec2f) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let n = i32(u32(P.cellsPerRow) * DSUB);
    let size = P.cellSize / f32(DSUB);
    let base = 8u * u32(P.numCells) + u32(n) * u32(n);   // the smoothed region

    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / size - vec2f(0.5);
    let c0 = vec2i(floor(g));
    let f = g - floor(g);

    var m: array<f32, 4>;
    for (var k = 0; k < 4; k++) {
        var cx = (c0.x + (k & 1)) % n;
        var cy = (c0.y + (k >> 1)) % n;
        if (cx < 0) { cx += n; }
        if (cy < 0) { cy += n; }
        m[k] = bitcast<f32>(grid[base + u32(cy * n + cx)]);
    }
    return mix(mix(m[0], m[1], f.x), mix(m[2], m[3], f.x), f.y);
}

// ------------------------------------------------------------ density field ---
//
// Agent occupancy is already counted every frame for the spatial hash; blurring
// it and shading the result turns a cloud of dots into a continuous body. This
// is the cheapest way to get a fluid look, because the data already exists.
//
// Mode 1 shades the field directly. Mode 2 thresholds it — classic metaballs —
// and lights the surface using the field's own gradient as a normal, which is
// what gives droplets their roundness instead of a flat silhouette.

@fragment
fn fsField(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);
    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let scale = max(P.fieldThreshold, 0.0001);
    let d = sampleDensity(world) / scale;      // 1.0 == the surface

    if (i32(P.fieldMode) == 1) {
        // Straight shading. sqrt lifts the thin outskirts into view, which are
        // where the interesting filament structure lives.
        let t = clamp(d, 0.0, 1.0);
        let a = clamp(sqrt(t) * P.fieldStrength, 0.0, 1.0);
        if (a <= 0.004) { discard; }
        return vec4f(palette(clamp(d * 0.85, 0.0, 1.0)) * a, a);
    }

    // Metaballs. Width of the transition is set in field units, so the edge
    // stays equally soft whatever the threshold is.
    let edge = 0.22;
    let a = smoothstep(1.0 - edge, 1.0 + edge, d) * P.fieldStrength;
    if (a <= 0.004) { discard; }

    // Central difference on the *world* field, one cell apart, for a normal.
    let h = (P.cellSize / f32(DSUB)) * 0.75;
    let gx = sampleDensity(world + vec2f(h, 0.0)) - sampleDensity(world - vec2f(h, 0.0));
    let gy = sampleDensity(world + vec2f(0.0, h)) - sampleDensity(world - vec2f(0.0, h));
    let n = normalize(vec3f(-gx / scale, -gy / scale, 0.9));
    let lit = clamp(dot(n, normalize(vec3f(-0.45, -0.6, 0.65))), 0.0, 1.0);

    let base = palette(clamp(d * 0.5, 0.0, 1.0));
    let col = base * (0.35 + 0.85 * lit) + vec3f(pow(lit, 12.0) * 0.4);
    return vec4f(col * a, a);
}

@fragment
fn fsMedium(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);

    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let m = clamp(sampleMedium(world), 0.0, 1.0);
    let a = m * 0.45;
    // Cool teal, so it reads as "solvent" against the warm end of the species
    // heatmap and never gets mistaken for an agent.
    return vec4f(vec3f(0.10, 0.42, 0.55) * a, a);   // premultiplied
}
