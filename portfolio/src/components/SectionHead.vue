<script setup>
defineProps({
  sheet: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <header class="head" v-reveal="{ variant: 'stroke' }">
    <span class="tick" aria-hidden="true"></span>
    <span class="rule" aria-hidden="true"></span>
    <span class="plate">
      <span class="sheet">{{ sheet }}</span>
      <h2 class="h-section">{{ label }}</h2>
    </span>
    <span class="rule" aria-hidden="true"></span>
    <span class="tick" aria-hidden="true"></span>
  </header>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: clamp(2rem, 5vh, 3.5rem);
}

.rule {
  flex: 1;
  height: 1px;
  background: var(--rule-strong);
}
/* The left rule is short — the label sits near the start of the line,
   the way a dimension callout does. */
.rule:first-of-type { flex: 0 0 clamp(1.5rem, 5vw, 4rem); }

.tick {
  flex: none;
  width: 1px;
  height: 12px;
  background: var(--rule-strong);
}

.plate {
  flex: none;
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
}

.sheet {
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.16em;
  background: var(--inv-bg);
  color: var(--inv-fg);
  padding: 0.1em 0.5em;
}

@media (max-width: 720px) {
  .rule:last-of-type, .tick:last-of-type { display: none; }
}
</style>
