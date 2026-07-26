<script setup>
import { watch } from 'vue'
import { useTypewriter } from '../composables/useTypewriter.js'

const props = defineProps({
  start: { type: Boolean, default: true },
})

const script = [
  'Security engineer. I break things on purpose, then close the gap.',
  'Offensive testing, detection engineering, and incident response.',
  'Most of my work is finding the assumption nobody wrote down.',
]

const { lines, activeLine, finished, begin, skipToEnd } = useTypewriter(script, {
  charDelay: 20,
  lineDelay: 280,
  startDelay: 320,
  autoStart: false,
})

if (props.start) begin()
watch(() => props.start, (v) => { if (v) begin() })
</script>

<template>
  <div class="terminal" @click="skipToEnd">
    <p class="sr-only">{{ script.join(' ') }}</p>

    <p v-for="(line, i) in lines" :key="i" class="line" aria-hidden="true">
      <span class="prompt">$</span>
      <span class="text">{{ line.text }}</span>
      <span v-if="i === activeLine" class="caret"></span>
    </p>

    <p v-if="!finished" class="skip" aria-hidden="true">click to skip</p>
  </div>
</template>

<style scoped>
.terminal {
  font-size: var(--step-0);
  line-height: 1.95;
  cursor: default;
}

.line {
  display: flex;
  align-items: baseline;
  gap: 0.75em;
  min-height: 1.95em;
}

.prompt { color: var(--faint); flex: none; }
.text { color: var(--fg); }

/* A block caret, because that's what a terminal has. */
.caret {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  background: var(--fg);
  translate: 0 0.15em;
  animation: blink 1.05s steps(1, end) infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

.skip {
  margin-top: 1.3rem;
  font-size: var(--step--1);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--faint);
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap; border: 0;
}
</style>
