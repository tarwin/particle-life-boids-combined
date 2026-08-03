<script setup>
import { ref } from 'vue'

defineProps({
  dontShowAgain: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'update:dontShowAgain'])

const dismiss = ref(false)

function close() {
  emit('update:dontShowAgain', dismiss.value)
  emit('close')
}
</script>

<template>
  <div class="backdrop" @click.self="close">
    <div class="dialog" role="dialog" aria-modal="true" aria-label="About">
      <h1>Particle Life <span class="plus">+</span> Boids</h1>
      <p class="sub">
        Tens of thousands of agents on the GPU, blending boids flocking with
        particle-life species forces on a wrapping world. Runs entirely in WebGPU.
      </p>

      <section>
        <h2>Original project</h2>
        <p>
          This is a browser port of
          <strong>Godot-Particle-Life-Boids-Combined-Compute-Shader</strong> by
          <strong>Tokoyuma</strong> (ThePathfindersCodex). The simulation — the
          forces, the spatial hashing, the collision pass, the tuned constants —
          is theirs; this port re-expresses it in WGSL.
        </p>
        <p class="links">
          <a
            href="https://github.com/ThePathfindersCodex/Godot-Particle-Life-Boids-Combined-Compute-Shader"
            target="_blank"
            rel="noopener noreferrer"
          >Source on GitHub ↗</a>
          <a
            href="https://www.youtube.com/@ThePathfindersCodex"
            target="_blank"
            rel="noopener noreferrer"
          >ThePathfindersCodex on YouTube ↗</a>
        </p>
        <p class="fine">MIT License · Copyright © 2025 Tokoyuma</p>
      </section>

      <section>
        <h2>About this port</h2>
        <p>
          Every line of this WebGPU + Vue version was written by
          <strong>Claude Opus</strong> (Anthropic), working through Claude Code.
          No human wrote the WGSL, the engine, or this dialog. Treat it
          accordingly — read the code before trusting it.
        </p>
        <p class="fine">
          The port swaps Godot's per-frame CPU readback for a GPU prefix sum, and
          its <code>imageStore</code> circle rasteriser for an instanced render
          pipeline. See the README for the full list of differences.
        </p>
      </section>

      <p class="fine credit">
        Made by
        <a href="https://tarwin.art/" target="_blank" rel="noopener noreferrer"
          >Tarwin ↗</a
        >
      </p>

      <footer>
        <label class="check">
          <input v-model="dismiss" type="checkbox" />
          <span>Don't show this again</span>
        </label>
        <button class="primary" @click="close">Start</button>
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
  width: min(560px, 100%);
  max-height: 100%;
  overflow-y: auto;
  padding: 26px 28px 20px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  line-height: 1.6;
}

h1 {
  margin: 0;
  font-size: 22px;
  letter-spacing: -0.01em;
}

.plus {
  color: var(--accent);
}

.sub {
  margin: 6px 0 0;
  color: var(--muted);
}

section {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

h2 {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

p {
  margin: 0 0 10px;
}

p:last-child {
  margin-bottom: 0;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.fine {
  font-size: 11.5px;
  color: var(--muted);
}

.credit {
  margin: 18px 0 0;
  text-align: center;
}

code {
  padding: 1px 4px;
  background: var(--panel-2);
  border-radius: 3px;
  font-family: ui-monospace, monospace;
  font-size: 11.5px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.check {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--muted);
  cursor: pointer;
}

footer button {
  padding: 7px 22px;
}
</style>
