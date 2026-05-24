<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const fieldEl = ref(null)
const blockEl = ref(null)
const pathDisplay = ref('/')

const charSet = [' ', ' ', ' ', ' ', ' ', '.', '·', ':', '-', '+', '*', '═', '╳']
const glitchChars = ['#', '@', '%', '&', '?', '/', '\\', '░', '▒', '▓']
const cellW = 7.21
const cellH = 14

let raf = 0
let glitchTimer = 0
let mouseX = -1
let mouseY = -1
let cols = 0
let rows = 0
let lastFrame = 0
let blockOriginal = ''

function rand(x, y, seed) {
  const v = Math.sin(x * 12.9898 + y * 78.233 + seed * 0.0011) * 43758.5453
  return v - Math.floor(v)
}

function measure() {
  cols = Math.ceil(window.innerWidth / cellW)
  rows = Math.ceil(window.innerHeight / cellH)
}

function getChar(x, y, t) {
  if (mouseX >= 0) {
    const dx = x - mouseX
    const dy = (y - mouseY) * 1.7
    const d2 = dx * dx + dy * dy
    if (d2 < 64) {
      const i = Math.floor(rand(x, y, t) * (charSet.length - 5)) + 4
      return charSet[Math.min(i, charSet.length - 1)]
    }
  }
  const tStep = Math.floor(t / 100)
  const n = rand(x, y, tStep)
  const idx = Math.floor(Math.pow(n, 2.6) * charSet.length)
  return charSet[Math.min(idx, charSet.length - 1)]
}

function render(time) {
  if (fieldEl.value && time - lastFrame > 80) {
    lastFrame = time
    const lines = new Array(rows)
    for (let y = 0; y < rows; y++) {
      let line = ''
      for (let x = 0; x < cols; x++) line += getChar(x, y, time)
      lines[y] = line
    }
    fieldEl.value.textContent = lines.join('\n')
  }
  raf = requestAnimationFrame(render)
}

function glitch() {
  if (!blockEl.value) return
  const chars = blockOriginal.split('')
  const hits = Math.floor(Math.random() * 8) + 4
  for (let i = 0; i < hits; i++) {
    const idx = Math.floor(Math.random() * chars.length)
    if (chars[idx] !== ' ' && chars[idx] !== '\n') {
      chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)]
    }
  }
  blockEl.value.textContent = chars.join('')
  setTimeout(() => {
    if (blockEl.value) blockEl.value.textContent = blockOriginal
  }, 80 + Math.random() * 80)
}

function goHome() {
  location.href = '/'
}

function onKey(e) {
  if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
    e.preventDefault()
    goHome()
  }
}

function onMouseMove(e) {
  mouseX = e.clientX / cellW
  mouseY = e.clientY / cellH
}

function onMouseLeave() {
  mouseX = -1
  mouseY = -1
}

onMounted(() => {
  pathDisplay.value = decodeURIComponent(location.pathname + location.search) || '/'
  if (blockEl.value) blockOriginal = blockEl.value.textContent

  measure()
  raf = requestAnimationFrame(render)
  glitchTimer = window.setInterval(glitch, 2400)

  window.addEventListener('resize', measure)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.clearInterval(glitchTimer)
  window.removeEventListener('resize', measure)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="not-found-404" @click="goHome">
    <pre ref="fieldEl" class="nf-field" aria-hidden="true"></pre>

    <div class="nf-center">
      <pre ref="blockEl" class="nf-block">██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝</pre>
      <div class="nf-meta">SIGNAL<span class="nf-sep">·</span>LOST<span class="nf-sep">·</span>404</div>
      <div class="nf-path">{{ pathDisplay }}</div>
      <div class="nf-cta">
        press <kbd>enter</kbd><kbd>esc</kbd>
        <span class="nf-or">or</span> click anywhere to return home
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-404 {
  --nf-accent: #e56f00;
  position: fixed;
  inset: 0;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'IBM Plex Sans', 'MiSans', system-ui, -apple-system, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  z-index: 10;
}

:global(.dark) .not-found-404 {
  --nf-accent: #ff8800;
}

.nf-field {
  position: absolute;
  inset: 0;
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 14px;
  color: var(--vp-c-text-3);
  opacity: 0.55;
  white-space: pre;
  pointer-events: none;
  margin: 0;
  z-index: 1;
}

.nf-center {
  position: relative;
  z-index: 2;
  text-align: center;
  background: var(--vp-c-bg);
  padding: 28px 40px;
}

.nf-block {
  display: inline-block;
  text-align: left;
  font-family: 'JetBrains Mono', ui-monospace, Consolas, monospace;
  font-size: clamp(10px, 2.2vw, 22px);
  line-height: 1;
  color: var(--vp-c-text-1);
  white-space: pre;
  margin: 0 0 28px;
  letter-spacing: 0;
  font-variant-ligatures: none;
  font-feature-settings: normal;
}

.nf-meta {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.35em;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.nf-sep {
  color: var(--nf-accent);
  margin: 0 8px;
}

.nf-path {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 11px;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
  word-break: break-all;
}

.nf-path::before {
  content: '> ';
  color: var(--nf-accent);
}

.nf-cta {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.nf-cta kbd {
  display: inline-block;
  padding: 2px 6px;
  border: 1px solid var(--vp-c-text-1);
  border-bottom-width: 2px;
  border-radius: 3px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  color: var(--vp-c-text-1);
  margin: 0 2px;
  vertical-align: 1px;
}

.nf-or {
  margin: 0 8px;
  color: var(--vp-c-border);
}

@media (max-width: 600px) {
  .nf-center { padding: 18px 20px; }
  .nf-meta { letter-spacing: 0.2em; font-size: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .nf-field { display: none; }
}
</style>
