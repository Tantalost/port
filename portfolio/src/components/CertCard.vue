<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDither } from '../composables/useDither.js'

const props = defineProps({
  cert: { type: Object, required: true },
  index: { type: Number, required: true },
})

const card = ref(null)
const active = ref(false)
const revealed = ref(false)

const { url: ditherUrl, process } = useDither({ width: 220, contrast: 1.35 })

let raf = null
let allowTilt = true
let hoverCapable = true

if (typeof window !== 'undefined') {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  hoverCapable = window.matchMedia('(hover: hover)').matches
  allowTilt = !reduced && hoverCapable
}

function onMove(event) {
  if (!allowTilt || !card.value) return
  cancelAnimationFrame(raf)

  raf = requestAnimationFrame(() => {
    const rect = card.value.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    card.value.style.setProperty('--ry', `${(px - 0.5) * 2 * 5}deg`)
    card.value.style.setProperty('--rx', `${(0.5 - py) * 2 * 5}deg`)
    card.value.style.setProperty('--mx', `${px * 100}%`)
    card.value.style.setProperty('--my', `${py * 100}%`)
  })
}

function open() {
  active.value = true
  revealed.value = true
}

function close() {
  active.value = false
  revealed.value = false
  cancelAnimationFrame(raf)
  card.value?.style.setProperty('--rx', '0deg')
  card.value?.style.setProperty('--ry', '0deg')
}

function onClick() {
  if (hoverCapable) return
  revealed.value ? close() : open()
}

onMounted(() => { if (props.cert.image) process(props.cert.image) })
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <article
    ref="card"
    class="cert"
    :class="{ active, revealed, 'has-image': !!cert.image }"
    tabindex="0"
    :aria-expanded="revealed"
    @pointermove="onMove"
    @pointerenter="hoverCapable && open()"
    @pointerleave="hoverCapable && close()"
    @focusin="open"
    @focusout="close"
    @click="onClick"
    @keydown.enter.prevent="revealed ? close() : open()"
  >
    <div class="plate">
      <img
        v-if="ditherUrl"
        class="layer dither"
        :src="ditherUrl"
        alt=""
        aria-hidden="true"
      />

      <img
        v-if="cert.image"
        class="layer clean"
        :src="cert.image"
        :alt="`${cert.name} certificate`"
        loading="lazy"
        decoding="async"
      />

      <span class="scanline" aria-hidden="true"></span>

      <div class="info">
        <header class="top">
          <span class="code">{{ cert.code }}</span>
          <span class="year">{{ cert.year }}</span>
        </header>

        <div class="mid">
          <h3 class="name">{{ cert.name }}</h3>
          <p class="issuer">{{ cert.issuer }}</p>
        </div>

        <footer class="bottom">
          <span class="id">{{ cert.id }}</span>
          <span class="state" :class="cert.state">
            {{ cert.state === 'active' ? '● active' : '○ ' + cert.state }}
          </span>
        </footer>
      </div>

      <p v-if="cert.image" class="affordance" aria-hidden="true">
      </p>

      <span class="sheen" aria-hidden="true"></span>
    </div>
  </article>
</template>

<style scoped>
.cert {
  --rx: 0deg; --ry: 0deg;
  --mx: 50%; --my: 50%;
  perspective: 800px;
  outline: none;
  cursor: default;
}
.cert.has-image { cursor: pointer; }

.plate {
  position: relative;
  aspect-ratio: 4 / 3;
  padding: 1.1rem 1.2rem;
  background: var(--bg-2);
  border: 1px solid var(--rule);
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition:
    transform 360ms var(--ease-out),
    border-color 300ms var(--ease-out),
    background 300ms var(--ease-out);
  overflow: hidden;
}

.cert.active .plate,
.cert:focus-visible .plate {
  border-color: var(--rule-strong);
  background: var(--bg-3);
}

/* ---------- image layers ---------- */
.layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* Chunky on purpose — smoothing a dither defeats the point. */
.dither {
  image-rendering: pixelated;
  /* Coverage on a real cert is low - it's mostly paper - so this sits
     higher than you'd expect. Tune it to taste. */
  opacity: 0.45;
  transition: opacity 420ms var(--ease-out);
}
.cert.revealed .dither { opacity: 0; }

.clean {
  filter: grayscale(1) contrast(1.15) brightness(0.94);
  /* Wipe from the top down. */
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  transition:
    clip-path 620ms var(--ease-out),
    opacity 220ms linear;
}
.cert.revealed .clean {
  clip-path: inset(0 0 0 0);
  opacity: 1;
}

/* The bright edge that travels with the wipe. */
.scanline {
  position: absolute;
  left: 0; right: 0;
  top: 0;
  height: 2px;
  background: var(--fg);
  opacity: 0;
  pointer-events: none;
}
.cert.revealed .scanline {
  animation: scan 620ms var(--ease-out) forwards;
}

/* Travels in percentage of the plate so it stays locked to the wipe at
   any card size. */
@keyframes scan {
  0%   { opacity: 0.9; top: 0; }
  90%  { opacity: 0.9; }
  100% { opacity: 0; top: 100%; }
}

/* ---------- text ---------- */
.info {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.top, .bottom {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: var(--step--1);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.code {
  background: var(--inv-bg);
  color: var(--inv-fg);
  padding: 0.1em 0.5em;
  font-weight: 600;
}

.year, .id { color: var(--faint); }

.mid {
  margin-top: auto;
  transition: opacity 300ms var(--ease-out), transform 420ms var(--ease-out);
}

/* On reveal the middle block gets out of the way so the cert is
   actually legible; the code, id and status stay pinned. */
.cert.revealed .mid {
  opacity: 0;
  transform: translateY(0.6rem);
}

.name {
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.issuer { color: var(--dim); }

.bottom {
  margin-top: 0.7rem;
  padding-top: 0.7rem;
  border-top: 1px dotted var(--faint);
}

/* Legibility over the revealed image. */
.cert.revealed .top,
.cert.revealed .bottom {
  background: rgba(5, 5, 5, 0.82);
  backdrop-filter: blur(2px);
  padding-inline: 0.4rem;
  margin-inline: -0.4rem;
}
.cert.revealed .bottom { border-top-color: transparent; }

.state { color: var(--faint); }
.state.active { color: var(--fg); }

.affordance {
  position: absolute;
  right: 1.2rem;
  bottom: 3.2rem;
  z-index: 2;
  font-size: var(--step--1);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--faint);
  opacity: 1;
  transition: opacity 240ms var(--ease-out);
}
.cert.revealed .affordance { opacity: 0; }

.sheen {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: radial-gradient(
    44% 60% at var(--mx) var(--my),
    rgba(237, 237, 237, 0.1),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 340ms var(--ease-out);
}
.cert.active .sheen { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .clean, .dither, .mid { transition: none; }
  .scanline { display: none; }
}
</style>
