<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const props = defineProps({
  cols: { type: Number, default: 88 },
  rows: { type: Number, default: 30 },
  start: { type: Boolean, default: true },
})

const RAMP = '  ..::--==+**##%@'
const NOISE = '#%&*+=-<>/\\|_~^'

const lines = ref(Array.from({ length: props.rows }, () => ''))
const scanRow = ref(-1)
const scanning = ref(true)

const sources = [
  { x: -0.42, y: -0.18, freq: 7.4, speed: 0.30, amp: 1.00 },
  { x:  0.55, y:  0.26, freq: 5.1, speed: -0.22, amp: 0.85 },
  { x:  0.02, y:  0.62, freq: 9.3, speed: 0.16, amp: 0.55 },
]

let raf = null
let began = 0
let glitchRow = -1
let glitchUntil = 0

function sample(x, y, t) {
  let v = 0
  for (const s of sources) {
    const dx = x - s.x
    const dy = y - s.y
    const d = Math.sqrt(dx * dx + dy * dy)
    v += (Math.sin(d * s.freq - t * s.speed) * s.amp) / (1 + d * d * 1.4)
  }
  return v
}

function render(t) {
  const { cols, rows } = props
  const next = []

  for (let r = 0; r < rows; r++) {
    if (r === glitchRow && t < glitchUntil) {
      let junk = ''
      for (let c = 0; c < cols; c++) {
        junk += Math.random() < 0.55
          ? NOISE[(Math.random() * NOISE.length) | 0]
          : ' '
      }
      next.push(junk)
      continue
    }

    let line = ''
    for (let c = 0; c < cols; c++) {
      const x = (c / (cols - 1)) * 2 - 1
      const y = ((r / (rows - 1)) * 2 - 1) * 0.55

      const v = sample(x, y, t)
      const norm = Math.min(Math.max((v + 0.9) / 1.8, 0), 0.999)
      line += RAMP[(norm * RAMP.length) | 0]
    }
    next.push(line)
  }

  lines.value = next
}

function loop(now) {
  if (!began) began = now
  const t = (now - began) / 1000
  if (t > glitchUntil + 0.4 && Math.random() < 0.0022) {
    glitchRow = (Math.random() * props.rows) | 0
    glitchUntil = t + 0.12
  }

  render(t)

  if (scanning.value) {
    const row = Math.floor(t * 30)
    scanRow.value = row
    if (row >= props.rows) {
      scanning.value = false
      scanRow.value = -1
    }
  }

  raf = requestAnimationFrame(loop)
}

function begin() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    render(0)
    scanning.value = false
    scanRow.value = -1
    return
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {

  render(0)
  if (props.start) begin()
})

watch(() => props.start, (v) => { if (v && !raf) begin() })

onBeforeUnmount(() => cancelAnimationFrame(raf))

const visibleCount = computed(() =>
  scanning.value ? Math.max(scanRow.value + 1, 0) : props.rows
)
</script>

<template>
  <pre class="field" aria-hidden="true"><span
      v-for="(line, i) in lines"
      :key="i"
      class="field-line"
      :class="{ drawn: i < visibleCount, scan: i === scanRow }"
    >{{ line }}
</span></pre>
</template>

<style scoped>
.field {
  font-family: var(--mono);
  font-size: clamp(4px, 1.05vw, 11px);
  line-height: 1.1;
  letter-spacing: 0.06em;
  color: var(--fg);
  margin: 0;
  white-space: pre;
  user-select: none;
  overflow: hidden;
  /* Dissolve the edges so the field doesn't end on a hard rectangle. */
  mask-image: radial-gradient(78% 76% at 50% 48%, #000 40%, transparent 100%);
}

.field-line {
  display: block;
  opacity: 0;
  transition: opacity 240ms ease-out;
}

/* Dim by default - the field is texture, not content. */
.field-line.drawn { opacity: 0.3; }

/* The scan head. Full brightness, one row only, no transition. */
.field-line.scan { opacity: 1; transition: none; }

@media (prefers-reduced-motion: reduce) {
  .field-line { opacity: 0.3; transition: none; }
}
</style>
