<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  matrix: { type: Object, default: null },
  philicity: { type: Object, default: null },
  coreSizes: { type: Object, default: null },
  speciesCount: { type: Number, required: true },
  editable: { type: Boolean, default: false },
})
const emit = defineEmits(['edit'])

// Matrix entries are generated in [-interactionRange, +range] where range tops
// out at 3; philicity is defined on [-1, 1].
const MATRIX_LIMIT = 3
const PHILICITY_LIMIT = 1
const limitFor = (kind) => (kind === 'philicity' ? PHILICITY_LIMIT : MATRIX_LIMIT)
const clamp = (v, lim) => Math.min(lim, Math.max(-lim, v))

// What is being dragged right now, so the readout can show it.
const active = ref(null)
let drag = null

function beginDrag(ev, kind, i, j, value) {
  if (!props.editable) return
  ev.preventDefault()
  drag = { kind, i, j, startY: ev.clientY, start: value, moved: false }
  active.value = { kind, i, j, value }
  ev.currentTarget.setPointerCapture(ev.pointerId)
}

function moveDrag(ev) {
  if (!drag) return
  const dy = drag.startY - ev.clientY
  if (Math.abs(dy) > 2) drag.moved = true
  const lim = limitFor(drag.kind)
  // ~120px of travel covers the full positive range, which is fine control
  // without needing to drag halfway down the screen.
  push(drag.kind, drag.i, drag.j, clamp(drag.start + (dy * lim) / 120, lim))
}

function endDrag(ev) {
  if (!drag) return
  // A click that never moved is a request to zero the entry — the single most
  // common edit, and awkward to hit by dragging.
  if (!drag.moved) push(drag.kind, drag.i, drag.j, 0)
  ev.currentTarget?.releasePointerCapture?.(ev.pointerId)
  drag = null
  active.value = null
}

function nudge(ev, kind, i, j, value) {
  if (!props.editable || !kind) return
  // Only swallow the wheel when it is actually going to edit something —
  // otherwise scrolling the panel over a read-only strip would stick.
  ev.preventDefault()
  const lim = limitFor(kind)
  const step = ev.shiftKey ? 0.01 : 0.1
  push(kind, i, j, clamp(value - Math.sign(ev.deltaY) * step, lim))
}

function push(kind, i, j, value) {
  const rounded = Math.round(value * 100) / 100
  if (active.value) active.value = { kind, i, j, value: rounded }
  emit('edit', { kind, i, j, value: rounded })
}

// Same blue->cyan->green->yellow->red ramp the shader uses for species colours.
function heatmap(t) {
  const c = Math.min(1, Math.max(0, t))
  const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k)
  let rgb
  if (c < 0.25) rgb = mix([0, 0, 1], [0, 1, 1], c / 0.25)
  else if (c < 0.5) rgb = mix([0, 1, 1], [0, 1, 0], (c - 0.25) / 0.25)
  else if (c < 0.75) rgb = mix([0, 1, 0], [1, 1, 0], (c - 0.5) / 0.25)
  else rgb = mix([1, 1, 0], [1, 0, 0], (c - 0.75) / 0.25)
  return rgb.map((v) => Math.round(v * 255))
}

const speciesColor = (i) => {
  const [r, g, b] = heatmap(i / Math.max(props.speciesCount - 1, 1))
  return `rgb(${r} ${g} ${b})`
}

// Past ~11 columns the numbers stop fitting in the panel, so the grid becomes
// a pure colour field: green = attraction, red = repulsion, brighter = stronger.
const showNumbers = computed(() => props.speciesCount <= 11)

const rows = computed(() => {
  const n = props.speciesCount
  if (!props.matrix || props.matrix.length < n * n) return []
  const maxAbs = Math.max(...Array.from(props.matrix, Math.abs), 0.0001)
  const out = []
  for (let i = 0; i < n; i++) {
    const cells = []
    for (let j = 0; j < n; j++) {
      const v = props.matrix[i * n + j]
      const k = Math.abs(v) / maxAbs
      // Attraction reads green, repulsion reads red.
      const hue = v >= 0 ? '130 60%' : '355 70%'
      cells.push({
        v,
        bg: `hsl(${hue} ${18 + k * 32}%)`,
        text: v.toFixed(1),
      })
    }
    out.push(cells)
  }
  return out
})

// A one-row-per-species strip under the matrix. `tint` maps a value to an hsl
// hue+saturation pair; intensity always tracks magnitude.
function strip(values, tint, describe) {
  const n = props.speciesCount
  if (!values || values.length < n) return null
  const cells = []
  for (let i = 0; i < n; i++) {
    const v = values[i]
    const k = Math.min(1, Math.abs(v))
    cells.push({
      v,
      bg: `hsl(${tint(v)} ${16 + k * 34}%)`,
      text: v.toFixed(1),
      title: `species ${i + 1}: ${v.toFixed(2)} — ${describe(v)}`,
    })
  }
  return cells
}

const strips = computed(() =>
  [
    // Philicity in [-1, +1]: teal = climbs into the medium, amber = flees it.
    {
      label: 'Philicity',
      kind: 'philicity',
      cells: strip(
        props.philicity,
        (v) => (v >= 0 ? '190 55%' : '32 65%'),
        (v) => (v >= 0 ? 'philic' : 'phobic')
      ),
    },
    // Core size in [0, 1]: violet, fading to nothing for species with no
    // excluded volume at all. Read-only — it is derived from the size seeds
    // and the Size Spread slider, so there is nothing single to write back to.
    {
      label: 'Core size',
      kind: null,
      cells: strip(
        props.coreSizes,
        () => '272 50%',
        (v) => (v < 0.05 ? 'no excluded volume' : 'excluded volume')
      ),
    },
  ].filter((s) => s.cells)
)
</script>

<template>
  <div class="matrix" :class="{ compact: !showNumbers }" :style="{ '--n': speciesCount }">
    <template v-for="(row, i) in rows" :key="i">
      <div class="tag" :style="{ background: speciesColor(i) }" />
      <div
        v-for="(cell, j) in row"
        :key="j"
        class="cell"
        :class="{ editable }"
        :style="{ background: cell.bg }"
        :title="`${i + 1} → ${j + 1}: ${cell.text}`"
        @pointerdown="beginDrag($event, 'matrix', i, j, cell.v)"
        @pointermove="moveDrag"
        @pointerup="endDrag"
        @pointercancel="endDrag"
        @wheel="nudge($event, 'matrix', i, j, cell.v)"
      >
        <template v-if="showNumbers">{{ cell.text }}</template>
      </div>
    </template>
  </div>

  <template v-for="s in strips" :key="s.label">
    <div class="strip-label">{{ s.label }}</div>
    <div class="matrix" :class="{ compact: !showNumbers }" :style="{ '--n': speciesCount }">
      <div class="tag" />
      <div
        v-for="(cell, j) in s.cells"
        :key="j"
        class="cell"
        :class="{ editable: editable && s.kind }"
        :style="{ background: cell.bg }"
        :title="cell.title"
        @pointerdown="s.kind && beginDrag($event, s.kind, j, 0, cell.v)"
        @pointermove="s.kind && moveDrag($event)"
        @pointerup="s.kind && endDrag($event)"
        @pointercancel="s.kind && endDrag($event)"
        @wheel="nudge($event, s.kind, j, 0, cell.v)"
      >
        <template v-if="showNumbers">{{ cell.text }}</template>
      </div>
    </div>
  </template>

  <div v-if="editable" class="edit-hint">
    <span v-if="active" class="live">
      {{ active.kind === 'philicity' ? `species ${active.i + 1}` : `${active.i + 1} → ${active.j + 1}` }}
      <b>{{ active.value.toFixed(2) }}</b>
    </span>
    <span v-else>Drag a cell up/down to change it · scroll to nudge · click to zero</span>
  </div>
</template>

<style scoped>
.matrix {
  display: grid;
  grid-template-columns: 10px repeat(var(--n), minmax(0, 1fr));
  gap: 2px;
  font-size: calc(9px * var(--ui-scale, 1));
  font-variant-numeric: tabular-nums;
}

.tag {
  border-radius: 2px;
}

.strip-label {
  margin: 8px 0 3px;
  font-size: calc(10px * var(--ui-scale, 1));
  color: var(--muted);
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  border-radius: 2px;
  color: #e8ecf4;
}

.cell.editable {
  cursor: ns-resize;
  /* Stop the browser turning a vertical drag into a panel scroll. */
  touch-action: none;
  user-select: none;
}

.cell.editable:hover {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.55);
}

.edit-hint {
  margin-top: 7px;
  font-size: calc(10px * var(--ui-scale, 1));
  line-height: 1.5;
  color: var(--faint);
}

.edit-hint .live {
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.edit-hint b {
  color: var(--accent);
}

.matrix.compact {
  gap: 1px;
}

.matrix.compact .cell {
  aspect-ratio: 1;
  padding: 0;
  border-radius: 1px;
}
</style>
