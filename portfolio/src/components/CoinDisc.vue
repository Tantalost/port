<script setup>
import { computed } from 'vue'

const props = defineProps({
  coin: { type: Object, required: true },
})

const reeds = computed(() =>
  Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2
    return {
      x1: 50 + Math.cos(a) * 41,
      y1: 50 + Math.sin(a) * 41,
      x2: 50 + Math.cos(a) * 46,
      y2: 50 + Math.sin(a) * 46,
    }
  })
)
</script>

<template>
  <li class="coin" :class="{ solved: coin.solved }">
    <svg viewBox="0 0 100 100" class="disc" role="img" :aria-label="coin.name">
      <circle cx="50" cy="50" r="46.5" class="rim" />
      <line
        v-for="(r, i) in reeds"
        :key="i"
        :x1="r.x1" :y1="r.y1" :x2="r.x2" :y2="r.y2"
        class="reed"
      />
      <circle cx="50" cy="50" r="34" class="ring" />
      <text x="50" y="50" class="stamp">{{ coin.code }}</text>
      <path v-if="coin.solved" d="M50 4 L53.4 11 L46.6 11 Z" class="notch" />
    </svg>

    <div class="meta">
      <p class="name">{{ coin.name }}</p>
      <p class="sub">
        {{ coin.year }} · {{ coin.solved ? 'solved' : 'unsolved' }}
      </p>
    </div>
  </li>
</template>

<style scoped>
.coin {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  text-align: center;
}

.disc {
  width: 100%;
  max-width: 5.5rem;
  height: auto;
  overflow: visible;
  transition: transform 320ms var(--ease-out);
}
.coin:hover .disc { transform: scale(1.06); }

.rim, .ring, .reed {
  fill: none;
  stroke: var(--faint);
  stroke-width: 1;
  transition: stroke 300ms var(--ease-out);
}

.reed { stroke-width: 0.9; }

.ring { stroke-dasharray: 3 4; }

.stamp {
  fill: var(--faint);
  font-family: var(--mono);
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-anchor: middle;
  dominant-baseline: central;
  transition: fill 300ms var(--ease-out);
}

.notch { fill: var(--fg); }

/* Solved: full phosphor, solid ring. */
.coin.solved .rim,
.coin.solved .reed { stroke: var(--fg); }
.coin.solved .ring { stroke: var(--dim); stroke-dasharray: none; }
.coin.solved .stamp { fill: var(--fg); }

.coin:hover .rim { stroke: var(--fg); }
.coin:hover .stamp { fill: var(--fg); }

.meta { line-height: 1.35; }

.name {
  font-size: var(--step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
}
.coin.solved .name { color: var(--fg); }

.sub {
  font-size: var(--step--1);
  color: var(--faint);
  letter-spacing: 0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .disc, .rim, .stamp { transition: none; }
  .coin:hover .disc { transform: none; }
}
</style>
