<script setup>
defineProps({
  progress: { type: Number, default: 0 },
  sheets: { type: Array, default: () => [] },
})
</script>

<template>
  <aside class="rail" aria-hidden="true">
    <span class="spine"></span>

    <span class="head-mark">SHEET</span>

    <ol class="sheets">
      <li v-for="s in sheets" :key="s" class="sheet">{{ s }}</li>
    </ol>

    <span class="pos" :style="{ top: `calc(${progress * 100}% )` }">
      <span class="pos-tick"></span>
      <span class="pos-num">{{ Math.round(progress * 100) }}</span>
    </span>
  </aside>
</template>

<style scoped>
.rail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--rail);
  z-index: 20;
  pointer-events: none;
  border-right: 1px solid var(--rule);
  background: linear-gradient(90deg, rgba(5, 5, 5, 0.92), rgba(5, 5, 5, 0.45));
  backdrop-filter: blur(2px);
}

.spine {
  position: absolute;
  top: 0; bottom: 0;
  right: -1px;
  width: 1px;
  background: var(--rule);
}

.head-mark {
  position: absolute;
  top: 1.4rem;
  left: 50%;
  translate: -50% 0;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  color: var(--faint);
  writing-mode: vertical-rl;
}

.sheets {
  position: absolute;
  top: 22%;
  left: 50%;
  translate: -50% 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0; padding: 0;
  list-style: none;
}

.sheet {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--faint);
  opacity: 0.55;
}

.pos {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  /* No transition — it's driven every frame by the scroll loop, and a
     transition on top of that just adds lag. */
}

.pos-tick {
  width: 60%;
  height: 1px;
  background: var(--fg);
}

.pos-num {
  position: absolute;
  top: 0.35rem;
  font-size: 0.55rem;
  color: var(--fg);
  letter-spacing: 0.08em;
}

@media (max-width: 720px) {
  .sheets, .head-mark { display: none; }
}
</style>
