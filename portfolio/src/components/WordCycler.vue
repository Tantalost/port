<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useScramble } from '../composables/useScramble.js'

const props = defineProps({
  words: { type: Array, required: true },
  hold: { type: Number, default: 1700 },
})

const { output, scrambleTo } = useScramble({ speed: 1 })
const index = ref(0)
const paused = ref(false)

let timer = null
let cancelled = false

async function cycle() {
  if (cancelled) return
  await scrambleTo(props.words[index.value])
  if (cancelled) return

  timer = setTimeout(() => {
    index.value = (index.value + 1) % props.words.length
    cycle()
  }, props.hold)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    output.value = props.words[0]
    return
  }
  cycle()
})

onBeforeUnmount(() => {
  cancelled = true
  clearTimeout(timer)
})
</script>

<template>
  <span class="cycler">
    <span class="ghost" aria-hidden="true">{{
      words.reduce((a, b) => (b.length > a.length ? b : a))
    }}</span>
    <span class="live" aria-hidden="true">{{ output }}</span>
    <span class="sr-only">{{ words.join(', ') }}</span>
  </span>
</template>

<style scoped>
.cycler {
  position: relative;
  display: inline-block;
  color: var(--fg);
  font-weight: 600;
}

.ghost { visibility: hidden; }

.live {
  position: absolute;
  inset: 0;
  white-space: nowrap;
  /* Inverse block: the cycling word is the one thing on the page
     wearing the cursor. */
  background: var(--inv-bg);
  color: var(--inv-fg);
  padding-inline: 0.35ch;
  margin-inline-start: -0.35ch;
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap; border: 0;
}
</style>
