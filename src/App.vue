<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
} from 'vue'
import SimCanvas from './components/SimCanvas.vue'
import ControlPanel from './components/ControlPanel.vue'
import AboutDialog from './components/AboutDialog.vue'
import ConfigDialog from './components/ConfigDialog.vue'
import { captureConfig, applyConfig, randomConfig } from './sim/config.js'
import { streamRng, STREAM, newSeed } from './sim/rng.js'
import {
  defaultParams,
  defaultStartup,
  sizeFromSeed,
  MAX_ZOOM,
  MIN_ZOOM,
} from './sim/params.js'
import {
  generateMatrixRandom,
  generateMatrixSymmetric,
  generatePhilicity,
  generateSizeSeeds,
} from './sim/startup.js'

const ABOUT_KEY = 'plb.hideAbout'

const params = reactive(defaultParams())
const startup = reactive(defaultStartup())

const engine = shallowRef(null)
const error = ref('')
const notice = ref('')
const fps = ref(0)
const paused = ref(false)
const showPanel = ref(true)
const matrix = shallowRef(null)
const philicity = shallowRef(null)
const sizeSeeds = shallowRef(null)

// Derived on the CPU so the Size Spread slider updates the strip immediately;
// the engine does the same arithmetic when it uploads them.
const coreSizes = computed(() =>
  sizeSeeds.value
    ? Array.from(sizeSeeds.value, (s) => sizeFromSeed(s, params.coreSizeSpread))
    : null
)
const liveSpeciesCount = ref(startup.speciesCount)
const liveAgentCount = ref(0)
const avgPerCell = ref(0)

const showAbout = ref(localStorage.getItem(ABOUT_KEY) !== '1')

// The stats readout collapses to a chip — it sits over the simulation, so it
// needs to be possible to get it out of the way for a clean look.
const HUD_KEY = 'plb.hudOpen'
const hudOpen = ref(localStorage.getItem(HUD_KEY) !== '0')

function toggleHud() {
  hudOpen.value = !hudOpen.value
  localStorage.setItem(HUD_KEY, hudOpen.value ? '1' : '0')
}

function onDontShowAgain(value) {
  if (value) localStorage.setItem(ABOUT_KEY, '1')
  else localStorage.removeItem(ABOUT_KEY)
}

let pausedDt = params.dt
let lastWorldMult = 0

async function onReady(e) {
  engine.value = e
  // Wait for the panel to exist before the initial restart, since that fits the
  // camera around however much of the canvas the panel covers.
  await nextTick()
  restart()
}

function restart() {
  const e = engine.value
  if (!e) return
  try {
    e.restart({ ...startup })
  } catch (err) {
    notice.value = err.message
    return
  }
  notice.value =
    e.maxCollisions < 64
      ? `Collision partners per agent reduced to ${e.maxCollisions} to fit GPU memory.`
      : ''

  matrix.value = e.matrix
  philicity.value = e.philicity
  sizeSeeds.value = e.sizeSeeds
  liveSpeciesCount.value = startup.speciesCount
  liveAgentCount.value = e.agentCount
  avgPerCell.value = e.avgPerCell

  // A different world size makes the old zoom meaningless — refit.
  if (lastWorldMult !== startup.worldSizeMult) {
    lastWorldMult = startup.worldSizeMult
    resetCamera()
  }
}

// ------------------------------------------------------------- configs ---

const showConfig = ref(false)
const configSnapshot = shallowRef({})

// The name of whatever preset is current, so configs identify themselves and a
// pasted one can push its name back into the panel's save box.
const configName = ref('')

function snapshot(name = configName.value) {
  return captureConfig({
    params,
    startup,
    matrix: matrix.value,
    philicity: philicity.value,
    sizeSeeds: sizeSeeds.value,
    name,
  })
}

function openConfig(name = '') {
  configName.value = name
  configSnapshot.value = snapshot(name)
  showConfig.value = true
}

/** Preset save: the panel asks for a snapshot and stores it itself. */
function onCaptureConfig(done, name = '') {
  configName.value = name || configName.value
  done(snapshot(name))
}

function onApplyConfig(cfg) {
  const e = engine.value
  if (!e) return
  let result
  try {
    result = applyConfig(cfg, { params, startup })
  } catch (err) {
    notice.value = err.message
    return
  }

  if (typeof cfg.name === 'string' && cfg.name.trim()) configName.value = cfg.name.trim()

  // Startup values only bite on restart; skip it otherwise so applying a
  // look-only config does not throw away the state you are looking at.
  if (result.needsRestart) restart()

  // Restart regenerates the matrix, so the saved one has to go on afterwards.
  if (result.matrix) {
    e.uploadMatrix(
      result.matrix,
      result.philicity ?? e.philicity,
      result.sizeSeeds ?? e.sizeSeeds
    )
    matrix.value = e.matrix
    philicity.value = e.philicity
    sizeSeeds.value = e.sizeSeeds
  }
}

function randomizeAll(locks = {}) {
  const e = engine.value
  if (!e) return
  const seed = advanceSeed(locks)
  const { params: rp, startup: rs, needsRestart, rerollMatrix } = randomConfig(
    locks,
    streamRng(seed, STREAM.randomConfig)
  )
  Object.assign(params, rp)
  Object.assign(startup, rs)

  // A locked matrix has to survive the restart, and restart() regenerates it
  // unless startup.lockMatrix is set — so hold a copy and put it back after.
  const keep = !rerollMatrix && needsRestart
    ? { matrix: matrix.value, philicity: philicity.value, sizeSeeds: sizeSeeds.value }
    : null

  if (needsRestart) restart()

  if (rerollMatrix) {
    randomizeMatrix({ seed: true })   // seed already advanced above
  } else if (keep && keep.matrix?.length === e.speciesCount * e.speciesCount) {
    e.uploadMatrix(keep.matrix, keep.philicity, keep.sizeSeeds)
    matrix.value = e.matrix
    philicity.value = e.philicity
    sizeSeeds.value = e.sizeSeeds
  }
}

/**
 * Zero every interaction. Leaves philicity and core sizes alone — they are
 * separate character, and clearing them too would take the medium and excluded
 * volume down with the forces.
 *
 * Pairs with editing: a blank matrix is the sane starting point for building
 * one by hand. Note that Restart regenerates from the seed unless "Keep through
 * restart" is ticked, so a cleared matrix needs that to survive one.
 */
function clearMatrix() {
  const e = engine.value
  if (!e) return
  const m = new Float32Array(e.speciesCount * e.speciesCount)
  e.uploadMatrix(m, philicity.value)
  matrix.value = m
}

/** A single cell edit from the matrix grid or the philicity strip. */
function onMatrixEdit({ kind, i, j, value }) {
  const e = engine.value
  if (!e) return
  if (kind === 'philicity') {
    // Copy rather than mutate: matrix/philicity are shallowRefs holding typed
    // arrays, so an in-place write would not re-render the grid.
    const ph = Float32Array.from(philicity.value)
    ph[i] = value
    e.uploadMatrix(matrix.value, ph)
    philicity.value = ph
  } else {
    const m = Float32Array.from(matrix.value)
    m[i * e.speciesCount + j] = value
    e.uploadMatrix(m, philicity.value)
    matrix.value = m
  }
}

/** Roll a new seed unless the seed is pinned, so repeats are reproducible. */
function advanceSeed(locks = {}) {
  if (!locks.seed) startup.seed = newSeed()
  return startup.seed
}

function randomizeMatrix(locks = {}) {
  const e = engine.value
  if (!e) return
  const seed = advanceSeed(locks)
  const symmetric = startup.startingMethod % 2 === 1
  const n = e.speciesCount
  const m = symmetric
    ? generateMatrixSymmetric(n, startup.interactionRange, streamRng(seed, STREAM.matrix))
    : generateMatrixRandom(n, startup.interactionRange, streamRng(seed, STREAM.matrix))
  const ph = generatePhilicity(n, streamRng(seed, STREAM.philicity))
  const seeds = generateSizeSeeds(n, streamRng(seed, STREAM.sizeSeeds))
  e.uploadMatrix(m, ph, seeds)
  matrix.value = m
  philicity.value = ph
  sizeSeeds.value = seeds
}

function rerollSeed() {
  startup.seed = newSeed()
  restart()
}

/**
 * The Restart *button*, as opposed to the internal `restart()` that config
 * apply and Random use. Pressing it means "give me a fresh run", so it rolls a
 * new seed first — otherwise rebuilding from an unchanged seed reproduces the
 * identical world and the button appears to do nothing.
 *
 * Locking the seed opts out, which is the whole point of locking it. Keeping
 * the matrix is separate and handled in `buildParticles`, so "new layout, same
 * matrix" is a reachable combination.
 */
function onRestartClick(locks = {}) {
  if (!locks.seed) startup.seed = newSeed()
  restart()
}

function togglePause() {
  if (paused.value) {
    params.dt = pausedDt || 0.25
    paused.value = false
  } else {
    pausedDt = params.dt
    params.dt = 0
    paused.value = true
  }
}

// Camera controls live on the canvas but write straight into params.
//
// (sx, sy) is the cursor in device pixels from the canvas centre. The render
// maps screen = (world - camera) * zoom + centre, so holding the point under the
// cursor still means camera += (sx, sy) * (1/before - 1/after).
function onZoom(factor, sx = 0, sy = 0) {
  const before = params.zoom
  const after = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, before * factor))
  if (after === before) return
  const k = 1 / before - 1 / after
  params.zoom = after
  params.cameraX += sx * k
  params.cameraY += sy * k
}

function onPan(dx, dy) {
  params.cameraX -= dx / params.zoom
  params.cameraY -= dy / params.zoom
}

/**
 * How much of the canvas the control panel covers, in device pixels. Measured
 * rather than assumed: the panel width follows its own zoom control, and it is
 * v-show'd, so a hidden panel measures 0 and the world simply centres.
 */
function panelInset() {
  const el = document.querySelector('.panel')
  if (!el) return 0
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  return el.getBoundingClientRect().width * dpr
}

function resetCamera() {
  const e = engine.value
  if (!e) {
    params.cameraX = 0
    params.cameraY = 0
    params.zoom = 0.1
    return
  }

  // Centre the world in the part of the canvas you can actually see. The render
  // maps screen = (world - camera) * zoom + viewport/2, so pushing the camera
  // right by half the inset (in world units) slides the world's centre to the
  // middle of the uncovered region.
  const inset = panelInset()
  const zoom = e.fitZoom(inset)
  params.zoom = zoom
  params.cameraX = inset / (2 * zoom)
  params.cameraY = 0
}

function onKey(ev) {
  if (showAbout.value || showConfig.value) return
  if (ev.target.tagName === 'INPUT' || ev.target.tagName === 'SELECT') return
  if (ev.code === 'Space') {
    ev.preventDefault()
    togglePause()
  } else if (ev.code === 'KeyR') {
    restart()
  } else if (ev.code === 'KeyG') {
    params.showGrid = !params.showGrid
  } else if (ev.code === 'KeyM') {
    params.mediumEnabled = !params.mediumEnabled
  } else if (ev.code === 'KeyV') {
    params.coreEnabled = !params.coreEnabled
  } else if (ev.code === 'KeyB') {
    params.blobsEnabled = !params.blobsEnabled
    if (params.blobsEnabled) params.renderMode = 1
  } else if (ev.code === 'KeyX') {
    params.renderMode = (params.renderMode + 1) % 3
  } else if (ev.code === 'KeyH') {
    showPanel.value = !showPanel.value
  } else if (ev.code === 'KeyC') {
    resetCamera()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="app">
    <SimCanvas
      :params="params"
      @ready="onReady"
      @error="error = $event"
      @fps="fps = $event"
      @zoom="onZoom"
      @pan="onPan"
    />

    <button
      v-if="hudOpen"
      class="hud"
      title="Hide stats"
      @click="toggleHud"
    >
      <span class="fps">{{ fps }} fps</span>
      <span class="dim">{{ liveAgentCount.toLocaleString() }} agents</span>
      <span class="dim">{{ liveSpeciesCount }} species</span>
      <span class="dim">zoom {{ params.zoom.toFixed(3) }}</span>
      <span class="dim">
        cam ({{ params.cameraX.toFixed(0) }}, {{ params.cameraY.toFixed(0) }})
      </span>
    </button>
    <button
      v-else
      class="hud collapsed"
      :title="`Show stats — ${fps} fps, ${liveAgentCount.toLocaleString()} agents`"
      @click="toggleHud"
    >
      ▸
    </button>

    <button v-if="!showPanel" class="reveal" @click="showPanel = true">Controls</button>

    <ControlPanel
      v-show="showPanel"
      :params="params"
      :startup="startup"
      :matrix="matrix"
      :philicity="philicity"
      :core-sizes="coreSizes"
      :species-count="liveSpeciesCount"
      :avg-per-cell="avgPerCell"
      :notice="notice"
      :paused="paused"
      @restart="onRestartClick"
      @toggle-pause="togglePause"
      @randomize-matrix="randomizeMatrix"
      @reroll-seed="rerollSeed"
      @randomize-all="randomizeAll"
      @edit-matrix="onMatrixEdit"
      @clear-matrix="clearMatrix"
      @reset-camera="resetCamera"
      @show-about="showAbout = true"
      :applied-name="configName"
      @show-config="openConfig"
      @apply-config="onApplyConfig"
      @capture-config="onCaptureConfig"
      @hide="showPanel = false"
    />

    <ConfigDialog
      v-if="showConfig"
      :config="configSnapshot"
      @close="showConfig = false"
      @apply="onApplyConfig"
    />

    <AboutDialog
      v-if="showAbout"
      @close="showAbout = false"
      @update:dont-show-again="onDontShowAgain"
    />

    <div v-if="error" class="error">
      <h2>WebGPU unavailable</h2>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  height: 100%;
  width: 100%;
}

.hud {
  position: absolute;
  top: 12px;
  left: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 12px;
  background: var(--hud-bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  backdrop-filter: blur(6px);
  font-variant-numeric: tabular-nums;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.hud:hover {
  border-color: var(--btn-hover-line);
}

.hud.collapsed {
  gap: 0;
  padding: 4px 7px;
  color: var(--muted);
  line-height: 1;
}

.fps {
  color: var(--accent);
  font-weight: 600;
}

.dim {
  color: var(--muted);
}

.reveal {
  position: absolute;
  top: 12px;
  right: 14px;
}

.error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--panel-bg);
  text-align: center;
  padding: 24px;
}

.error h2 {
  margin: 0;
  color: #ff7a7a;
}

.error p {
  max-width: 48ch;
  color: var(--muted);
  line-height: 1.5;
}
</style>
