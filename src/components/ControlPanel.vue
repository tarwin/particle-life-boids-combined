<script setup>
import { computed, ref, watch } from 'vue'
import InteractionMatrix from './InteractionMatrix.vue'
import {
  AGENT_COUNT_OPTIONS,
  SPECIES_COUNT_OPTIONS,
  SPECIES_SPREAD_OPTIONS,
  WORLD_SIZE_OPTIONS,
  SLIDERS,
  START_METHODS,
  CORE_FALLOFFS,
  RENDER_MODES,
  FIELD_MODES,
  PARTICLE_SHAPES,
  SPECIES_PALETTES,
  BACKGROUNDS,
  collisionRadius,
  coreRadius,
  forceSoftening,
} from '../sim/params.js'
import {
  loadPresets,
  savePreset,
  deletePreset,
  suggestName,
  RANDOM_SECTIONS,
} from '../sim/config.js'

const props = defineProps({
  params: { type: Object, required: true },
  startup: { type: Object, required: true },
  matrix: { type: Object, default: null },
  philicity: { type: Object, default: null },
  coreSizes: { type: Object, default: null },
  speciesCount: { type: Number, required: true },
  avgPerCell: { type: Number, default: 0 },
  notice: { type: String, default: '' },
  paused: { type: Boolean, default: false },
  appliedName: { type: String, default: '' },
})
const emit = defineEmits([
  'restart',
  'toggle-pause',
  'randomize-matrix',
  'randomize-all',
  'edit-matrix',
  'clear-matrix',
  'reroll-seed',
  'reset-camera',
  'show-about',
  'show-config',
  'apply-config',
  'capture-config',
  'hide',
])

const group = (name) => SLIDERS.filter((s) => s[5] === name)

// Panel scale. Everything inside sizes off --ui-scale, so one number widens the
// panel and grows every font with it. Persisted, since it is an accessibility
// preference rather than a per-session choice.
const SCALE_KEY = 'plb.uiScale'
const SCALE_MIN = 0.8
const SCALE_MAX = 1.8
const SCALE_STEP = 0.1

const uiScale = ref(clampScale(parseFloat(localStorage.getItem(SCALE_KEY)) || 1))

function clampScale(v) {
  return Math.min(SCALE_MAX, Math.max(SCALE_MIN, Math.round(v * 10) / 10))
}

function nudgeScale(delta) {
  uiScale.value = clampScale(uiScale.value + delta)
  localStorage.setItem(SCALE_KEY, String(uiScale.value))
}

// --------------------------------------------------------------- theme ---
//
// Light/dark is nothing but a set of CSS variables swapped on the root element,
// so no component needs to know which is active. Set on <html> rather than the
// panel so the dialogs and HUD follow too.

const THEME_KEY = 'plb.theme'
const theme = ref(localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark')

function applyTheme() {
  document.documentElement.dataset.theme = theme.value
}
applyTheme()

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem(THEME_KEY, theme.value)
  applyTheme()
}

// --------------------------------------------------------------- locks ---
//
// Which sections Random must leave alone. Persisted, because a lock is a
// statement about what you are currently happy with — it should survive a
// reload the same way the panel scale does.

const LOCKS_KEY = 'plb.locks'
const locks = ref(readLocks())

function readLocks() {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCKS_KEY) || '{}')
    const out = {}
    for (const [key] of RANDOM_SECTIONS) out[key] = raw[key] === true
    out.seed = raw.seed === true
    return out
  } catch {
    const out = {}
    for (const [key] of RANDOM_SECTIONS) out[key] = false
    out.seed = false
    return out
  }
}

function toggleLock(key) {
  locks.value = { ...locks.value, [key]: !locks.value[key] }
  localStorage.setItem(LOCKS_KEY, JSON.stringify(locks.value))
}

const lockedCount = computed(() => Object.values(locks.value).filter(Boolean).length)

// ------------------------------------------------------------- presets ---

const presets = ref(loadPresets())
const presetNames = computed(() => Object.keys(presets.value).sort())
const selectedPreset = ref('')
const presetName = ref(suggestName(Object.keys(presets.value)))
const presetNotice = ref('')

function notify(msg) {
  presetNotice.value = msg
  setTimeout(() => {
    if (presetNotice.value === msg) presetNotice.value = ''
  }, 2600)
}

function loadSelected() {
  const name = selectedPreset.value
  if (!name) return
  // Selecting a preset also arms Save to overwrite it, which is what you
  // almost always want after tweaking something you just loaded.
  presetName.value = name
  emit('apply-config', presets.value[name])
  notify(`Applied "${name}".`)
}

function store() {
  const name = presetName.value.trim()
  if (!name) return
  const existed = name in presets.value
  // The parent owns the actual state, so it hands back a fresh snapshot.
  emit(
    'capture-config',
    (cfg) => {
      presets.value = savePreset(name, cfg)
      selectedPreset.value = name
      notify(existed ? `Overwrote "${name}".` : `Saved "${name}".`)
    },
    name
  )
}

function removeSelected() {
  const name = selectedPreset.value
  if (!name) return
  presets.value = deletePreset(name)
  selectedPreset.value = ''
  presetName.value = suggestName(Object.keys(presets.value))
  notify(`Deleted "${name}".`)
}

// A pasted config may name itself; take that as the working preset name so
// Save does not silently write it under an unrelated suggestion.
watch(
  () => props.appliedName,
  (name) => {
    if (name && name !== presetName.value) presetName.value = name
  }
)

const plifePercent = computed(() => Math.round(props.params.mixT * 100))
// Start cloud diameter is 800 * startRadiusMul, so a value equal to the world
// size multiplier exactly fills the world.
const startSizes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 24, 32, 40, 60, 80, 120, 160]

// Rough cost signal: the neighbour loop scans a 3x3 block of cells, so this is
// the number of agents a typical agent compares itself against per step.
const neighbourhood = computed(() => Math.round(props.avgPerCell * 9))
const densityLevel = computed(() => {
  const n = neighbourhood.value
  if (n > 2500) return 'heavy'
  if (n > 900) return 'warn'
  return 'ok'
})

// The shader threshold is a multiple of the average cell occupancy, so show
// what the multiplier currently resolves to in actual agents.
const displaceAt = computed(() =>
  Math.max(1, Math.round(props.params.mediumCapacityMul * props.avgPerCell))
)

function fmt(v, step) {
  const decimals = step >= 1 ? 0 : step >= 0.1 ? 1 : 2
  return v.toFixed(decimals)
}
</script>

<template>
  <aside class="panel" :style="{ '--ui-scale': uiScale }">
    <header>
      <strong>Particle Life + Boids</strong>
      <div class="header-actions">
        <button
          class="icon"
          title="Smaller panel and text"
          :disabled="uiScale <= 0.8"
          @click="nudgeScale(-0.1)"
        >
          −
        </button>
        <button
          class="icon"
          title="Larger panel and text"
          :disabled="uiScale >= 1.8"
          @click="nudgeScale(0.1)"
        >
          ＋
        </button>
        <button
          class="icon"
          :title="theme === 'light' ? 'Switch to dark controls' : 'Switch to light controls'"
          @click="toggleTheme"
        >
          {{ theme === 'light' ? '☾' : '☀' }}
        </button>
        <button class="icon" title="About &amp; credits" @click="emit('show-about')">
          ⓘ
        </button>
        <button class="icon" title="Hide panel (H)" @click="emit('hide')">✕</button>
      </div>
    </header>

    <div class="scroll">
      <!-- ------------------------------------------------------ sim mix -->
      <section>
        <div class="mix-label">
          <span>{{ 100 - plifePercent }}% Boids</span>
          <span>{{ plifePercent }}% Particle Life</span>
        </div>
        <input
          v-model.number="params.mixT"
          type="range"
          min="0"
          max="1"
          step="0.05"
        />
      </section>

      <!-- ------------------------------------------------------ actions -->
      <section class="actions">
        <button class="primary" @click="emit('toggle-pause')">
          <span class="ico">{{ paused ? '▶' : '❙❙' }}</span>{{ paused ? 'Resume' : 'Pause' }}
        </button>
        <button title="Start a fresh run (R)" @click="emit('restart', locks)">
          <span class="ico">↻</span>Restart
        </button>
        <button title="Recentre the camera (C)" @click="emit('reset-camera')">
          <span class="ico">⌖</span>Reset Cam
        </button>
        <button
          :title="lockedCount ? `Randomise — ${lockedCount} section(s) locked` : 'Randomise everything'"
          @click="emit('randomize-all', locks)"
        >
          <span class="ico">⚄</span>Random{{ lockedCount ? ` ${lockedCount}🔒` : '' }}
        </button>
        <button title="View or paste the whole configuration" @click="emit('show-config', presetName)">
          <span class="ico">{ }</span>JSON
        </button>
      </section>

      <!-- ------------------------------------------------------ presets -->
      <section>
        <h3>Presets</h3>
        <div class="preset-row">
          <select v-model="selectedPreset" @change="loadSelected">
            <option value="">— saved presets —</option>
            <option v-for="name in presetNames" :key="name" :value="name">{{ name }}</option>
          </select>
          <button
            class="icon-btn"
            title="Delete the selected preset"
            :disabled="!selectedPreset"
            @click="removeSelected"
          >
            ✕
          </button>
        </div>
        <div class="preset-row">
          <input
            v-model="presetName"
            type="text"
            spellcheck="false"
            placeholder="preset name"
            @keyup.enter="store"
          />
          <button :disabled="!presetName.trim()" @click="store">
            {{ presetNames.includes(presetName.trim()) ? 'Overwrite' : 'Save' }}
          </button>
        </div>
        <p v-if="presetNotice" class="notice">{{ presetNotice }}</p>
        <p class="hint">
          Saved to this browser. Selecting one applies it immediately, including
          its interaction matrix. Choosing a preset puts its name in the box, so
          Save becomes Overwrite.
        </p>
      </section>

      <!-- ------------------------------------------------------ startup -->
      <section>
        <h3>
          <span>Startup</span>
          <button class="lock" :class="{ on: locks.startup }"
            :title="locks.startup ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('startup')">{{ locks.startup ? '🔒' : '🔓' }}</button>
        </h3>
        <div class="grid2">
          <label>
            <span>Pattern</span>
            <select v-model.number="startup.startingMethod">
              <option v-for="(m, i) in START_METHODS" :key="i" :value="i">{{ m }}</option>
            </select>
          </label>
          <label>
            <span>Agents</span>
            <select v-model.number="startup.agentCount">
              <option v-for="n in AGENT_COUNT_OPTIONS" :key="n" :value="n">
                {{ n.toLocaleString() }}
              </option>
            </select>
          </label>
          <label>
            <span>Species</span>
            <select v-model.number="startup.speciesCount">
              <option v-for="n in SPECIES_COUNT_OPTIONS" :key="n" :value="n">
                {{ n }}
              </option>
            </select>
          </label>
          <label>
            <span>World Size</span>
            <select v-model.number="startup.worldSizeMult">
              <option v-for="n in WORLD_SIZE_OPTIONS" :key="n" :value="n">
                {{ (n * 800).toLocaleString() }}
              </option>
            </select>
          </label>
          <label>
            <span>Matrix Range</span>
            <select v-model.number="startup.interactionRange">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
            </select>
          </label>
          <label>
            <span>Start Size</span>
            <select v-model.number="startup.startRadiusMul">
              <option v-for="n in startSizes" :key="n" :value="n">
                {{ (n * 800).toLocaleString()
                }}{{ n === startup.worldSizeMult ? ' (fills)' : '' }}
              </option>
            </select>
          </label>
          <label>
            <span>Species Spread</span>
            <select v-model.number="startup.speciesSpread">
              <option v-for="n in SPECIES_SPREAD_OPTIONS" :key="n" :value="n">
                {{ n === 0 ? 'Discrete' : `±${n}` }}
              </option>
            </select>
          </label>
        </div>

        <div class="preset-row seed-row">
          <label class="seed-label">
            <span>Seed</span>
            <input
              :value="startup.seed"
              type="number"
              min="0"
              step="1"
              @change="startup.seed = Math.max(0, Math.floor(+$event.target.value) || 0)"
            />
          </label>
          <button title="New random seed" @click="emit('reroll-seed')">🎲</button>
          <button
            class="lock"
            :class="{ on: locks.seed }"
            :title="locks.seed ? 'Seed locked — Random and New Matrix reuse it' : 'Lock the seed'"
            @click="toggleLock('seed')"
          >{{ locks.seed ? '🔒' : '🔓' }}</button>
        </div>
        <p class="hint">
          Everything generated — layout, matrix, philicity, sizes, and Random's
          own choices — derives from the seed. Same seed and settings gives the
          same world back. <em>Lock</em> it and Random/New Matrix reuse it
          instead of rolling a fresh one, so results repeat exactly.
        </p>

        <p v-if="startup.speciesSpread" class="hint">
          Species is a continuous value, not an index. Agents are scattered up to
          ±{{ startup.speciesSpread }} around their basis species, so their
          colour, matrix row, philicity and size are all interpolated between
          neighbouring rows. The matrix below is the <em>basis</em>; agents live
          between its rows.
        </p>

        <div class="density" :class="densityLevel">
          <span>~{{ neighbourhood.toLocaleString() }} neighbours scanned per agent</span>
        </div>
        <p class="hint">
          Cost scales with <em>density</em>, not agent count. Raise World Size to
          keep big counts fast. Startup changes apply on Restart.
        </p>
        <p v-if="notice" class="notice">{{ notice }}</p>
      </section>

      <!-- ------------------------------------------------------- matrix -->
      <section v-if="matrix">
        <h3>
          <span>Interaction Matrix</span>
          <button class="lock" :class="{ on: locks.matrix }"
            :title="locks.matrix ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('matrix')">{{ locks.matrix ? '🔒' : '🔓' }}</button>
        </h3>
        <div class="matrix-actions">
          <button title="Generate a new interaction matrix" @click="emit('randomize-matrix', locks)">
            <span class="ico">⚄</span>New Matrix
          </button>
          <button title="Set every interaction to zero" @click="emit('clear-matrix')">
            <span class="ico">∅</span>Clear
          </button>
          <label class="check">
            <input v-model="startup.lockMatrix" type="checkbox" />
            <span>Keep through restart</span>
          </label>
        </div>

        <InteractionMatrix
          :matrix="matrix"
          :philicity="philicity"
          :core-sizes="params.coreEnabled ? coreSizes : null"
          :species-count="speciesCount"
          editable
          @edit="emit('edit-matrix', $event)"
        />

        <p class="hint">
          Two different locks, easy to confuse. <em>Keep through restart</em>
          carries this matrix — including any edits — into the next Restart,
          which otherwise starts a fresh run with a new one. The
          <strong>🔒</strong> on this heading stops <em>Random</em> rerolling
          it. Locking the <em>seed</em> outranks both: Restart then rebuilds
          the identical world, layout and all.
        </p>
      </section>

      <!-- ---------------------------------------------------- live knobs -->
      <section>
        <h3>
          <span>Simulation</span>
          <button class="lock" :class="{ on: locks.sim }"
            :title="locks.sim ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('sim')">{{ locks.sim ? '🔒' : '🔓' }}</button>
        </h3>
        <label v-for="[key, label, min, max, step] in group('sim')" :key="key" class="slider">
          <span class="name">{{ label }}</span>
          <span class="val">{{ fmt(params[key], step) }}</span>
          <input v-model.number="params[key]" type="range" :min="min" :max="max" :step="step" />
        </label>
        <div class="derived">
          <span>Collide radius <b>{{ collisionRadius(params).toFixed(2) }}</b></span>
        </div>
      </section>

      <section>
        <h3>
          <span>Boids</span>
          <button class="lock" :class="{ on: locks.boids }"
            :title="locks.boids ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('boids')">{{ locks.boids ? '🔒' : '🔓' }}</button>
        </h3>
        <label v-for="[key, label, min, max, step] in group('boids')" :key="key" class="slider">
          <span class="name">{{ label }}</span>
          <span class="val">{{ fmt(params[key], step) }}</span>
          <input v-model.number="params[key]" type="range" :min="min" :max="max" :step="step" />
        </label>
      </section>

      <section>
        <h3>
          <span>Particle Life</span>
          <button class="lock" :class="{ on: locks.plife }"
            :title="locks.plife ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('plife')">{{ locks.plife ? '🔒' : '🔓' }}</button>
        </h3>
        <label v-for="[key, label, min, max, step] in group('plife')" :key="key" class="slider">
          <span class="name">{{ label }}</span>
          <span class="val">{{ fmt(params[key], step) }}</span>
          <input v-model.number="params[key]" type="range" :min="min" :max="max" :step="step" />
        </label>
        <div class="derived">
          <span>Force softening <b>{{ forceSoftening(params).toFixed(0) }}</b></span>
        </div>
      </section>

      <section>
        <h3>
          <span>Excluded Volume</span>
          <button class="lock" :class="{ on: locks.core }"
            :title="locks.core ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('core')">{{ locks.core ? '🔒' : '🔓' }}</button>
        </h3>
        <label class="check">
          <input
            type="checkbox"
            :checked="params.coreEnabled"
            @change="params.coreEnabled = $event.target.checked"
          />
          <span>Enable excluded volume</span>
        </label>
        <template v-if="params.coreEnabled">
          <label v-for="[key, label, min, max, step] in group('core')" :key="key" class="slider">
            <span class="name">{{ label }}</span>
            <span class="val">{{ fmt(params[key], step) }}</span>
            <input v-model.number="params[key]" type="range" :min="min" :max="max" :step="step" />
          </label>
          <label class="falloff">
            <span>Falloff</span>
            <select v-model.number="params.coreFalloff">
              <option v-for="([name], i) in CORE_FALLOFFS" :key="i" :value="i">{{ name }}</option>
            </select>
          </label>
          <div class="derived">
            <span>Widest pair radius <b>{{ coreRadius(params).toFixed(0) }}</b></span>
          </div>
          <p class="hint">{{ CORE_FALLOFFS[params.coreFalloff][1] }}</p>
        </template>
        <p class="hint">
          A short-range repulsion that ignores the interaction matrix, so
          mutually attracted species keep real spacing instead of collapsing to
          a point. Applies at every mix value. Raise <em>Size Spread</em> to give
          each species a different size — at 1 some end up with no excluded
          volume at all, and get shoved around by the ones that do (see the
          <em>Core size</em> strip under the matrix). A pair's exclusion distance
          is the sum of their two radii.
        </p>
      </section>

      <section>
        <h3>
          <span>Medium</span>
          <button class="lock" :class="{ on: locks.medium }"
            :title="locks.medium ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('medium')">{{ locks.medium ? '🔒' : '🔓' }}</button>
        </h3>
        <label class="check">
          <input
            type="checkbox"
            :checked="params.mediumEnabled"
            @change="params.mediumEnabled = $event.target.checked"
          />
          <span>Enable medium</span>
        </label>
        <template v-if="params.mediumEnabled">
          <label
            v-for="[key, label, min, max, step] in group('medium')"
            :key="key"
            class="slider"
          >
            <span class="name">{{ label }}</span>
            <span class="val">{{ fmt(params[key], step) }}</span>
            <input v-model.number="params[key]" type="range" :min="min" :max="max" :step="step" />
          </label>
          <div class="derived">
            <span>Cell cleared at <b>{{ displaceAt.toLocaleString() }}</b> agents</span>
          </div>
          <label class="check" style="margin-top: 8px">
            <input v-model="params.showMedium" type="checkbox" />
            <span>Show medium</span>
          </label>
        </template>
        <p class="hint">
          A diffusing scalar field that agents displace. Each species has a
          <em>philicity</em> in [-1, +1] (shown under the matrix): philic species
          climb the gradient, phobic ones flee it and coalesce into droplets. A
          philic species that is <em>also</em> attracted to a phobic one parks at
          the interface — that is a surfactant.
        </p>
      </section>

      <section>
        <h3>
          <span>Blobs</span>
          <button class="lock" :class="{ on: locks.blobs }"
            :title="locks.blobs ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('blobs')">{{ locks.blobs ? '🔒' : '🔓' }}</button>
        </h3>
        <label class="check">
          <input
            type="checkbox"
            :checked="params.blobsEnabled"
            @change="params.blobsEnabled = $event.target.checked"
          />
          <span>Detect blobs</span>
        </label>
        <template v-if="params.blobsEnabled">
          <label class="slider">
            <span class="name">Min Density</span>
            <span class="val">{{ params.blobMinDensity.toFixed(1) }}×</span>
            <input v-model.number="params.blobMinDensity" type="range" min="0.5" max="8" step="0.1" />
          </label>
          <label class="slider">
            <span class="name">Smoothing</span>
            <span class="val">{{ params.blobSmoothing }}</span>
            <input v-model.number="params.blobSmoothing" type="range" min="0" max="8" step="1" />
          </label>
          <label class="slider">
            <span class="name">Reflood Every</span>
            <span class="val">{{ params.blobInterval }}f</span>
            <input v-model.number="params.blobInterval" type="range" min="1" max="60" step="1" />
          </label>
          <label class="slider">
            <span class="name">Flood Rounds</span>
            <span class="val">{{ params.blobRounds }}</span>
            <input v-model.number="params.blobRounds" type="range" min="1" max="64" step="1" />
          </label>
        </template>
        <p class="hint">
          Connected-component labelling over grid cells — cheap, but
          cell-resolution, so two blobs sharing a cell merge. <em>Min Density</em>
          is what separates blob from background: below it, the thin gas between
          droplets bridges them and the whole world becomes one blob.
          <em>Smoothing</em> blurs the density field before thresholding it —
          without it blobs come out the shape of the cell grid, blocky and full
          of pinholes. A label travels one cell per round, so
          <em>Flood Rounds</em> caps how wide a blob can be and still come out
          as one piece. Switch <em>Colour By</em> to <em>Blob</em> to see them;
          grey means unlabelled background.
        </p>

        <template v-if="params.blobsEnabled">
          <label class="check" style="margin-top: 10px">
            <input
              type="checkbox"
              :checked="params.mutateEnabled"
              @change="params.mutateEnabled = $event.target.checked"
            />
            <span>Mutate species per blob</span>
          </label>
          <template v-if="params.mutateEnabled">
            <label class="slider">
              <span class="name">Mutation Rate</span>
              <span class="val">{{ params.mutateRate.toFixed(2) }}</span>
              <input v-model.number="params.mutateRate" type="range" min="0" max="0.5" step="0.01" />
            </label>
            <label class="slider">
              <span class="name">Outward Bias</span>
              <span class="val">{{ params.mutateBias.toFixed(2) }}</span>
              <input v-model.number="params.mutateBias" type="range" min="0" max="1" step="0.05" />
            </label>
            <label class="slider">
              <span class="name">Mutate Every</span>
              <span class="val">{{ params.mutateInterval }}f</span>
              <input v-model.number="params.mutateInterval" type="range" min="5" max="120" step="5" />
            </label>
          </template>
          <p class="hint">
            Every agent in a blob gets the <em>same</em> nudge, so a droplet's
            whole lineage drifts together instead of dissolving into noise.
            Watch it in <em>Species</em> colour: droplets slowly change hue and
            diverge from each other. Species 0 and N−1 <em>reflect</em> rather
            than clamp, so the walk stays spread out instead of piling up
            against the ends. <em>Outward Bias</em> additionally drives species
            apart, if you want them to separate faster.
          </p>
        </template>
      </section>

      <section>
        <h3>
          <span>View</span>
          <button class="lock" :class="{ on: locks.view }"
            :title="locks.view ? 'Locked — Random leaves this alone' : 'Lock from Random'"
            @click="toggleLock('view')">{{ locks.view ? '🔒' : '🔓' }}</button>
        </h3>
        <label class="falloff">
          <span>Colour By</span>
          <select v-model.number="params.renderMode">
            <option v-for="([name], i) in RENDER_MODES" :key="i" :value="i">{{ name }}</option>
          </select>
        </label>
        <p class="hint">{{ RENDER_MODES[params.renderMode][1] }}</p>

        <label class="falloff">
          <span>Field</span>
          <select v-model.number="params.fieldMode">
            <option v-for="([name], i) in FIELD_MODES" :key="i" :value="i">{{ name }}</option>
          </select>
        </label>
        <p class="hint">{{ FIELD_MODES[params.fieldMode][1] }}</p>
        <template v-if="params.fieldMode > 0">
          <label class="slider">
            <span class="name">Field Smoothing</span>
            <span class="val">{{ params.fieldSmoothing }}</span>
            <input v-model.number="params.fieldSmoothing" type="range" min="0" max="10" step="1" />
          </label>
          <label class="slider">
            <span class="name">Surface At</span>
            <span class="val">{{ params.fieldThresholdMul.toFixed(1) }}×</span>
            <input v-model.number="params.fieldThresholdMul" type="range" min="0.2" max="10" step="0.1" />
          </label>
          <label class="slider">
            <span class="name">Field Opacity</span>
            <span class="val">{{ params.fieldStrength.toFixed(2) }}</span>
            <input v-model.number="params.fieldStrength" type="range" min="0" max="1" step="0.02" />
          </label>
          <label class="check">
            <input v-model="params.showAgents" type="checkbox" />
            <span>Draw agents on top</span>
          </label>
          <p class="hint">
            Built from the per-cell counts the spatial hash already produces, so
            it costs one blur plus one fullscreen pass. <em>Surface At</em> is a
            multiple of average occupancy — lower it to make the fluid engulf
            more, raise it to leave only the dense cores. Turn agents off to see
            the surface on its own.
          </p>
        </template>

        <label class="falloff">
          <span>Palette</span>
          <select v-model.number="params.speciesPalette">
            <option v-for="([name], i) in SPECIES_PALETTES" :key="i" :value="i">{{ name }}</option>
          </select>
        </label>
        <p class="hint">{{ SPECIES_PALETTES[params.speciesPalette][1] }}</p>

        <label class="falloff">
          <span>Background</span>
          <select v-model.number="params.background">
            <option v-for="(b, i) in BACKGROUNDS" :key="i" :value="i">{{ b.name }}</option>
          </select>
        </label>

        <label class="falloff">
          <span>Shape</span>
          <select v-model.number="params.particleShape">
            <option v-for="([name], i) in PARTICLE_SHAPES" :key="i" :value="i">{{ name }}</option>
          </select>
        </label>
        <p class="hint">{{ PARTICLE_SHAPES[params.particleShape][1] }}</p>

        <label class="slider">
          <span class="name">Size</span>
          <span class="val">{{ params.drawScale.toFixed(2) }}×</span>
          <input v-model.number="params.drawScale" type="range" min="0.1" max="12" step="0.1" />
        </label>
        <label class="slider">
          <span class="name">Size Jitter</span>
          <span class="val">{{ params.drawJitter.toFixed(2) }}</span>
          <input v-model.number="params.drawJitter" type="range" min="0" max="1" step="0.05" />
        </label>
        <div class="derived">
          <span>Drawn radius <b>{{ (params.drawRadius * params.drawScale).toFixed(1) }}</b></span>
        </div>
        <p class="hint">
          Visual only — multiplies <em>Draw Size</em> for rendering. Draw Size
          itself is under <em>Simulation</em> and also sets the collision
          radius, so scaling it there changes the physics; this does not.
          <em>Size Jitter</em> varies each agent's size by up to ±100%, keyed to
          its index so it stays put rather than flickering.
        </p>

        <label class="slider">
          <span class="name">Glow</span>
          <span class="val">{{ params.glowStrength.toFixed(2) }}</span>
          <input v-model.number="params.glowStrength" type="range" min="0" max="1" step="0.02" />
        </label>
        <label v-if="params.glowStrength > 0" class="slider">
          <span class="name">Glow Size</span>
          <span class="val">{{ params.glowSize.toFixed(1) }}×</span>
          <input v-model.number="params.glowSize" type="range" min="1.5" max="12" step="0.5" />
        </label>
        <label class="slider">
          <span class="name">Trails</span>
          <span class="val">{{ params.trailStrength.toFixed(2) }}</span>
          <input v-model.number="params.trailStrength" type="range" min="0" max="0.99" step="0.01" />
        </label>
        <label class="slider">
          <span class="name">Motion Stretch</span>
          <span class="val">{{ params.velocityStretch.toFixed(1) }}</span>
          <input v-model.number="params.velocityStretch" type="range" min="0" max="50" step="0.25" />
        </label>
        <p class="hint">
          Glow is a second additive pass — halos sum where they overlap, so
          dense regions bloom. <em>Motion Stretch</em> scales each agent along
          its velocity, turning fast ones into streaks.
          <em>Trails</em> keeps part of the previous frame instead of clearing,
          so agents smear a decaying path behind them — at 0.99 a trail lasts
          around a hundred frames. It is screen-space, so panning smears too.
        </p>

        <label class="check" style="margin-top: 8px">
          <input
            type="checkbox"
            :checked="params.driftEnabled"
            @change="params.driftEnabled = $event.target.checked"
          />
          <span>Drifting motes</span>
        </label>
        <template v-if="params.driftEnabled">
          <label class="slider">
            <span class="name">Density</span>
            <span class="val">{{ (params.driftCols ** 2).toLocaleString() }}</span>
            <input v-model.number="params.driftCols" type="range" min="8" max="90" step="1" />
          </label>
          <label class="slider">
            <span class="name">Mote Size</span>
            <span class="val">{{ params.driftSize }}</span>
            <input v-model.number="params.driftSize" type="range" min="4" max="80" step="1" />
          </label>
          <label class="slider">
            <span class="name">Drift Speed</span>
            <span class="val">{{ params.driftSpeed.toFixed(3) }}</span>
            <input v-model.number="params.driftSpeed" type="range" min="0" max="0.03" step="0.001" />
          </label>
          <label class="slider">
            <span class="name">Brightness</span>
            <span class="val">{{ params.driftBrightness.toFixed(2) }}</span>
            <input v-model.number="params.driftBrightness" type="range" min="0" max="1" step="0.05" />
          </label>
          <p class="hint">
            Decorative background haze — no effect on the simulation. Motes sit
            one per cell of a jittered grid rather than at random positions:
            random clumps, and clumped motes merge into blotches. The jitter is
            bounded to the middle 60% of a cell, so two motes can never come
            closer than 40% of the spacing.
          </p>
        </template>
        <label class="check">
          <input
            type="checkbox"
            v-model="params.showGrid"
          />
          <span>Show spatial grid</span>
        </label>
        <p class="hint">
          Drag to pan · scroll to zoom at cursor · <kbd>Space</kbd> pause ·
          <kbd>R</kbd> restart · <kbd>G</kbd> grid · <kbd>M</kbd> medium ·
          <kbd>V</kbd> excluded volume · <kbd>C</kbd> reset cam ·
          <kbd>H</kbd> hide panel
        </p>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: calc(320px * var(--ui-scale, 1));
  /* Buttons, selects and inputs all use `font: inherit`, so setting the base
     size here is what carries the scale into the controls themselves. */
  font-size: calc(13px * var(--ui-scale, 1));
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  background: var(--panel-bg);
  border-left: 1px solid var(--line);
  backdrop-filter: blur(10px);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
}

.header-actions {
  display: flex;
  gap: 2px;
}

.icon {
  padding: 2px 8px;
  background: transparent;
  border: none;
  color: var(--muted);
}

.icon:hover:not(:disabled) {
  background: var(--panel-2);
  color: var(--text);
}

.icon:disabled {
  opacity: 0.3;
  cursor: default;
}

.density {
  margin-top: 10px;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: calc(11px * var(--ui-scale, 1));
  font-variant-numeric: tabular-nums;
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.density.warn {
  background: var(--warn-bg);
  color: var(--warn-fg);
}

.density.heavy {
  background: var(--bad-bg);
  color: var(--bad-fg);
}

.notice {
  margin: 8px 0 0;
  padding: 5px 8px;
  border-radius: 5px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: calc(10.5px * var(--ui-scale, 1));
  line-height: 1.5;
}

.scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 14px 20px;
}

section {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

section:last-child {
  border-bottom: none;
}

h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 10px;
  font-size: calc(11px * var(--ui-scale, 1));
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.lock {
  padding: 0 4px;
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: calc(11px * var(--ui-scale, 1));
  line-height: 1;
  opacity: 0.3;
  filter: grayscale(1);
}

.lock:hover {
  background: var(--panel-2);
  opacity: 0.75;
}

.lock.on {
  opacity: 1;
  filter: none;
}

.mix-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.actions button,
.matrix-actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Glyphs sit a touch lower and lighter than the label so they read as marks
   rather than competing with the text. */
.ico {
  opacity: 0.65;
  font-size: 0.95em;
  line-height: 1;
}

.preset-row {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}

.preset-row select,
.preset-row input[type='text'] {
  flex: 1;
  min-width: 0;
}

.preset-row input[type='text'] {
  padding: 5px 8px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 6px;
}

.preset-row input[type='text']:focus {
  outline: none;
  border-color: var(--accent);
}

.preset-row button {
  flex-shrink: 0;
}

.matrix-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.matrix-actions button {
  flex-shrink: 0;
}

.preset-row button:disabled {
  opacity: 0.35;
  cursor: default;
}

.icon-btn {
  padding: 5px 10px;
}

.seed-row {
  align-items: stretch;
}

.seed-label {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.seed-label input {
  flex: 1;
  min-width: 0;
  padding: 5px 8px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  font-variant-numeric: tabular-nums;
}

.seed-row .lock {
  align-self: center;
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.grid2 label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.slider {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  margin-bottom: 6px;
}

.slider .name {
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.slider .val {
  font-size: calc(11px * var(--ui-scale, 1));
  font-variant-numeric: tabular-nums;
  color: var(--text);
}

.slider input {
  grid-column: 1 / -1;
}

.check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.falloff {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 4px;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.falloff select {
  flex: 1;
  max-width: 60%;
}

.derived {
  margin-top: 8px;
  font-size: calc(11px * var(--ui-scale, 1));
  color: var(--muted);
}

.derived b {
  color: var(--text);
  font-weight: 600;
}

.hint {
  margin: 10px 0 0;
  font-size: calc(10.5px * var(--ui-scale, 1));
  line-height: 1.6;
  color: var(--faint);
}

kbd {
  padding: 1px 4px;
  border: 1px solid var(--line);
  border-radius: 3px;
  background: var(--panel-2);
  font-family: ui-monospace, monospace;
  font-size: calc(10px * var(--ui-scale, 1));
}
</style>
