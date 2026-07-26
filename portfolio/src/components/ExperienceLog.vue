<script setup>
defineProps({
  entries: { type: Array, required: true },
})
</script>

<template>
  <ol class="log">
    <li
      v-for="(e, i) in entries"
      :key="e.org + e.from"
      class="entry"
      v-reveal="{ delay: i * 70 }"
    >
      <div class="gutter" aria-hidden="true">
        <span class="dot" :class="{ current: e.to === 'present' }"></span>
        <span class="wire"></span>
      </div>

      <div class="body">
        <header class="head">
          <span class="span">{{ e.from }} → {{ e.to }}</span>
          <span class="sev" :class="e.to === 'present' ? 'live' : 'closed'">
            {{ e.to === 'present' ? 'RUNNING' : 'EXITED 0' }}
          </span>
        </header>

        <h3 class="role">{{ e.role }}</h3>
        <p class="org">{{ e.org }}<span class="loc"> · {{ e.location }}</span></p>

        <ul class="bullets">
          <li v-for="b in e.bullets" :key="b" class="bullet">{{ b }}</li>
        </ul>

        <ul class="tools" aria-label="Tooling">
          <li v-for="t in e.tools" :key="t" class="tool">{{ t }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.log { list-style: none; margin: 0; padding: 0; }

.entry {
  display: grid;
  grid-template-columns: 1.6rem 1fr;
  gap: 0 1rem;
  padding-bottom: clamp(2.5rem, 6vh, 4rem);
}
.entry:last-child { padding-bottom: 0; }

/* The connecting wire down the left is the only ornament in the
   section, and it's doing real work - it's what makes it a timeline. */
.gutter {
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;
  padding-top: 0.55em;
}

.dot {
  width: 7px; height: 7px;
  border: 1px solid var(--dim);
  border-radius: 50%;
}
.dot.current { background: var(--fg); border-color: var(--fg); }

.wire {
  width: 1px;
  height: 100%;
  margin-top: 0.5rem;
  background: linear-gradient(var(--rule-strong), transparent);
}
.entry:last-child .wire { display: none; }

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1.2rem;
  font-size: var(--step--1);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--faint);
}

.sev.live {
  background: var(--inv-bg);
  color: var(--inv-fg);
  padding: 0.1em 0.5em;
  font-weight: 600;
}
.sev.closed { color: var(--faint); }

.role {
  margin-top: 0.5rem;
  font-size: var(--step-1);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.org { color: var(--dim); }
.loc { color: var(--faint); }

.bullets {
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
  max-width: 60ch;
}

.bullet {
  position: relative;
  padding-left: 1.6ch;
  color: var(--dim);
  line-height: 1.6;
}
/* A log prefix rather than a bullet glyph. */
.bullet::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--faint);
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tool {
  font-size: var(--step--1);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dim);
  border: 1px solid var(--rule);
  padding: 0.15em 0.6em;
}

@media (max-width: 620px) {
  .entry { grid-template-columns: 1rem 1fr; gap: 0 0.7rem; }
}
</style>
