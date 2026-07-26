<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const LENGTH = 620

const el = ref(null)
const drawn = ref(false)

let observer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    drawn.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      drawn.value = true
      observer.disconnect()
    },
    { threshold: 0.55 }
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="signoff">
    <p class="closing" v-reveal>
      Everything above is verifiable. Ask me for the evidence.
    </p>

    <svg
      class="sig"
      viewBox="0 0 400 110"
      role="img"
      aria-label="Signature"
      :style="{ '--len': LENGTH }"
    >
      <path
        class="stroke"
        :class="{ drawn }"
        d="M39.1 84.1L33.7 82.6L28.8 80.2L24.5 77.1L20.9 73.4L18.2 69.2L16.3 64.7L15.4 60.0L15.5 55.3L16.4 50.8L18.3 46.5L20.9 42.7L24.2 39.4L28.0 36.7L32.2 34.7L36.7 33.5L41.3 33.0L45.9 33.3L50.3 34.3L54.3 36.0L57.9 38.2L60.9 41.0L63.3 44.2L65.0 47.6L66.0 51.2L66.2 54.9L65.7 58.5L64.5 61.8L62.7 64.9L60.3 67.6L62.0 62.0L64.6 70.0L67.2 76.8L69.8 81.6L72.4 84.0L75.0 83.9L77.6 81.8L80.2 78.4L82.8 74.5L85.4 70.6L88.0 67.0L90.6 63.8L93.2 60.6L95.8 57.1L98.4 53.1L101.0 48.6L103.6 44.1L106.2 40.1L108.8 37.5L111.5 36.9L114.1 38.7L116.7 43.0L119.3 49.2L121.9 56.5L124.5 63.8L127.1 70.1L129.7 74.5L132.3 76.8L134.9 77.0L137.5 75.5L140.1 73.1L142.7 70.4L145.3 67.7L147.9 65.4L150.5 63.1L153.1 60.6L155.7 57.6L158.3 53.7L160.9 49.0L163.5 44.1L166.1 39.6L168.7 36.4L171.3 35.1L173.9 36.3L176.5 39.8L179.1 45.3L181.7 51.7L184.3 58.2L186.9 63.8L189.5 67.7L192.1 69.7L194.7 70.0L197.3 69.0L199.9 67.3L202.5 65.6L205.2 64.1L207.8 62.9L210.4 61.7L213.0 59.9L215.6 57.4L218.2 53.7L220.8 49.1L223.4 44.0L226.0 39.2L228.6 35.7L231.2 34.0L233.8 34.6L236.4 37.5L239.0 42.2L241.6 47.8L244.2 53.4L246.8 58.1L249.4 61.3L252.0 62.9L254.2 45.8L257.4 48.5L260.7 51.1L263.9 53.7L267.2 56.3L270.4 58.7L273.7 61.1L276.9 63.4L280.1 65.5L283.4 67.5L286.6 69.4L289.9 71.1L293.1 72.7L296.4 74.1L299.6 75.3L302.9 76.3L306.1 77.1L309.4 77.8L312.6 78.2L315.9 78.4L319.1 78.5L322.4 78.4L325.6 78.0L328.9 77.5L332.1 76.9L335.4 76.0L338.6 75.0L341.9 73.9L345.1 72.6L348.3 71.2L351.6 69.7L354.8 68.2L358.1 66.5L361.3 64.8L364.6 63.0L367.8 61.2"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <div class="ident">
      <p class="name">Tantalost</p>
      <p class="role">Dogma</p>
      <p class="fpr">
        <span class="faint">fingerprint</span>
        4A9C 21F0 7BD3 8E15 &nbsp; 60CA 3F7B D204 9E88
      </p>
    </div>
  </div>
</template>

<style scoped>
.signoff {
  border-top: 1px solid var(--rule);
  padding-top: clamp(2.5rem, 7vh, 4.5rem);
  margin-top: clamp(4rem, 10vh, 7rem);
}

.closing {
  font-size: var(--step-1);
  color: var(--dim);
  max-width: 46ch;
  margin-bottom: 2rem;
}

.sig {
  width: min(24rem, 78vw);
  height: auto;
  color: var(--fg);
  overflow: visible;
}

.stroke {
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
}

.stroke.drawn {
  transition: stroke-dashoffset 1900ms cubic-bezier(0.4, 0, 0.15, 1);
  stroke-dashoffset: 0;
}

.ident { margin-top: 0.6rem; }

.name {
  font-size: var(--step-1);
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.role {
  color: var(--dim);
  font-size: var(--step-0);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.fpr {
  margin-top: 1.4rem;
  font-size: var(--step--1);
  color: var(--dim);
  letter-spacing: 0.1em;
  word-spacing: 0.2em;
}

.fpr .faint {
  color: var(--faint);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-right: 0.9em;
}

@media (prefers-reduced-motion: reduce) {
  .stroke { stroke-dashoffset: 0; }
}
</style>
