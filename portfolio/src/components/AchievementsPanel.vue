<script setup>
import { computed } from 'vue'
import CoinDisc from './CoinDisc.vue'

const props = defineProps({
  results: { type: Array, required: true },
  coins: { type: Array, required: true },
})

const solvedCount = computed(() => props.coins.filter((c) => c.solved).length)
const isPodium = (rank) => /^[123](st|nd|rd)$/.test(rank)
</script>

<template>
  <div class="ach">
    <section class="block">
      <header class="block-head">
        <h3 class="label">Competitions</h3>
        <span class="count">{{ results.length }} entered</span>
      </header>

      <ol class="results">
        <li
          v-for="(r, i) in results"
          :key="r.event + r.year"
          class="result"
          v-reveal="{ delay: i * 60 }"
        >
          <span class="rank" :class="{ podium: isPodium(r.rank) }">
            {{ r.rank }}
          </span>

          <div class="detail">
            <p class="event">{{ r.event }}</p>
            <p class="sub">
              {{ r.year }}
              <span v-if="r.team"> · {{ r.team }}</span>
              <span v-if="r.field" class="faint"> · {{ r.field }}</span>
            </p>
          </div>
        </li>
      </ol>
    </section>

    <section class="block">
      <header class="block-head">
        <h3 class="label">Challenge coins</h3>
        <span class="count">{{ solvedCount }} / {{ coins.length }} solved</span>
      </header>

      <ul class="rack">
        <CoinDisc
          v-for="(c, i) in coins"
          :key="c.code"
          :coin="c"
          v-reveal="{ delay: i * 55 }"
        />
      </ul>
    </section>
  </div>
</template>

<style scoped>
.ach {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 6vh, 4rem);
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1.4rem;
  border-bottom: 1px solid var(--rule);
}

.label {
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg);
}

.count {
  font-size: var(--step--1);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--faint);
  white-space: nowrap;
}

/* ---------- results ---------- */
.results { list-style: none; margin: 0; padding: 0; }

.result {
  display: grid;
  grid-template-columns: 3.6rem 1fr;
  gap: 0 0.9rem;
  padding: 0.55rem 0;
  border-bottom: 1px dotted rgba(237, 237, 237, 0.09);
}
.result:last-child { border-bottom: none; }

.rank {
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  text-align: center;
  padding: 0.15em 0;
  border: 1px solid var(--rule);
}

.rank.podium {
  background: var(--inv-bg);
  color: var(--inv-fg);
  border-color: var(--inv-bg);
}

.event {
  font-weight: 500;
  line-height: 1.3;
}

.sub {
  font-size: var(--step--1);
  color: var(--dim);
  letter-spacing: 0.06em;
}

.faint { color: var(--faint); }

/* ---------- coins ---------- */
.rack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
  gap: 1.5rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
