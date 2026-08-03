<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Engine } from '../sim/engine.js'

const props = defineProps({
  params: { type: Object, required: true },
})
const emit = defineEmits(['ready', 'error', 'fps', 'zoom', 'pan'])

const canvas = ref(null)
let engine = null
let raf = 0
let observer = null

// FPS over a rolling one-second window.
let frames = 0
let lastFpsAt = performance.now()

function resize() {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.floor(el.clientWidth * dpr))
  const h = Math.max(1, Math.floor(el.clientHeight * dpr))
  if (el.width !== w || el.height !== h) {
    el.width = w
    el.height = h
  }
}

function loop() {
  raf = requestAnimationFrame(loop)
  resize()
  engine.frame(props.params)

  frames++
  const now = performance.now()
  if (now - lastFpsAt >= 500) {
    emit('fps', Math.round((frames * 1000) / (now - lastFpsAt)))
    frames = 0
    lastFpsAt = now
  }
}

// ------------------------------------------------------------ interaction ---

let dragging = false
let lastX = 0
let lastY = 0

function onWheel(ev) {
  ev.preventDefault()
  // Report the cursor in the same space the shaders use: device pixels measured
  // from the canvas centre, y down. That lets App anchor the zoom to it.
  const el = canvas.value
  const rect = el.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const x = (ev.clientX - rect.left) * dpr - el.width * 0.5
  const y = (ev.clientY - rect.top) * dpr - el.height * 0.5
  emit('zoom', ev.deltaY < 0 ? 1.08 : 1 / 1.08, x, y)
}

function onPointerDown(ev) {
  dragging = true
  lastX = ev.clientX
  lastY = ev.clientY
  canvas.value.setPointerCapture(ev.pointerId)
}

function onPointerMove(ev) {
  if (!dragging) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  emit('pan', (ev.clientX - lastX) * dpr, (ev.clientY - lastY) * dpr)
  lastX = ev.clientX
  lastY = ev.clientY
}

function onPointerUp(ev) {
  dragging = false
  canvas.value?.releasePointerCapture?.(ev.pointerId)
}

let unmounted = false

onMounted(async () => {
  resize()
  try {
    engine = await Engine.create(canvas.value)
  } catch (err) {
    emit('error', err.message ?? String(err))
    return
  }
  // Device creation is async, so an HMR remount can tear the component down
  // while we are waiting. Without this the engine leaks a GPU device and
  // ResizeObserver is handed a null canvas.
  if (unmounted) {
    engine.destroy()
    engine = null
    return
  }
  if (import.meta.env.DEV) window.__engine = engine
  engine.device.addEventListener?.('uncapturederror', (e) => {
    console.error('[WebGPU]', e.error?.message ?? e.error)
  })
  emit('ready', engine)
  raf = requestAnimationFrame(loop)

  observer = new ResizeObserver(resize)
  observer.observe(canvas.value)
})

onBeforeUnmount(() => {
  unmounted = true
  cancelAnimationFrame(raf)
  observer?.disconnect()
  engine?.destroy()
})
</script>

<template>
  <canvas
    ref="canvas"
    class="sim"
    @wheel="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @contextmenu.prevent
  />
</template>

<style scoped>
.sim {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: grab;
}

.sim:active {
  cursor: grabbing;
}
</style>
