<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  config: { type: Object, required: true },
})
const emit = defineEmits(['close', 'apply'])

const text = ref('')
const error = ref('')
const copied = ref(false)

// Re-serialise whenever the dialog is opened on a fresh snapshot, so it always
// shows the state as it is *now* rather than whatever was last typed.
watch(
  () => props.config,
  (cfg) => {
    text.value = JSON.stringify(cfg, null, 2)
    error.value = ''
    copied.value = false
  },
  { immediate: true }
)

async function copy() {
  try {
    await navigator.clipboard.writeText(text.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    error.value = 'Clipboard blocked by the browser — select the text and copy manually.'
  }
}

function apply() {
  let parsed
  try {
    parsed = JSON.parse(text.value)
  } catch (err) {
    error.value = `Not valid JSON: ${err.message}`
    return
  }
  try {
    emit('apply', parsed)
    emit('close')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="backdrop" @click.self="emit('close')">
    <div class="dialog">
      <header>
        <h1>Configuration</h1>
        <button class="icon" title="Close" @click="emit('close')">✕</button>
      </header>
      <p class="sub">
        Everything needed to reproduce this state: the live parameters, the
        startup config, and the per-species matrix, philicity and core sizes.
        Edit it, or paste one in and apply.
      </p>

      <textarea v-model="text" spellcheck="false" @input="error = ''" />

      <p v-if="error" class="error">{{ error }}</p>

      <footer>
        <span class="hint">
          Unknown keys are ignored; anything missing keeps its current value.
        </span>
        <div class="buttons">
          <button @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
          <button class="primary" @click="apply">Apply</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--scrim);
  backdrop-filter: blur(4px);
}

.dialog {
  display: flex;
  flex-direction: column;
  width: min(720px, 100%);
  max-height: 100%;
  padding: 22px 24px 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.01em;
}

.icon {
  padding: 2px 8px;
  background: transparent;
  border: none;
  color: var(--muted);
}

.icon:hover {
  color: var(--text);
}

.sub {
  margin: 6px 0 14px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

textarea {
  flex: 1;
  min-height: 320px;
  padding: 12px;
  background: var(--code-bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  line-height: 1.5;
  resize: vertical;
  tab-size: 2;
}

textarea:focus {
  outline: 1px solid var(--accent);
  border-color: var(--accent);
}

.error {
  margin: 10px 0 0;
  padding: 6px 9px;
  border-radius: 5px;
  background: var(--bad-bg);
  color: var(--bad-fg);
  font-size: 11.5px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
}

.hint {
  color: var(--faint);
  font-size: 11px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
</style>
