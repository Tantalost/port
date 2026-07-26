<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['done'])

const CHECKS = [
  'probing tty0',
  'verifying signature chain',
  'mounting /dev/portfolio',
  'arming watchdog timer',
]

const HEARTBEAT = '▁▂▃▄▅▆▇█▇▆▅▄▃▂▁'

const visible = ref(true)
const phase = ref('boot')
const printed = ref([])
const pulse = ref('')
const countdown = ref(2.0)
const closing = ref(false)

let timers = []
let raf = null
let released = false

const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t }

function clearAll() {
  timers.forEach(clearTimeout)
  timers = []
  cancelAnimationFrame(raf)
}

function release() {
  if (released) return
  released = true
  document.body.classList.remove('booting')
  window.removeEventListener('keydown', onKey)
}

function finish() {
  if (closing.value) return
  clearAll()
  closing.value = true
  release()

  setTimeout(() => {
    visible.value = false
    emit('done')
  }, 440)
}

function skip() { if (visible.value) finish() }
function onKey() { skip() }

function runHeartbeat() {
  const start = performance.now()
  let kicked = false

  const step = (now) => {
    const t = (now - start) / 1000

    const offset = Math.floor(t * 22) % HEARTBEAT.length
    pulse.value = HEARTBEAT.slice(offset) + HEARTBEAT.slice(0, offset)

    const remaining = Math.max(2.0 - t * 3.4, 0)
    countdown.value = remaining

    if (remaining < 0.45 && !kicked) {
      kicked = true
      phase.value = 'granted'
      later(finish, 620)
      return
    }
    raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

function runChecks(i = 0) {
  if (i >= CHECKS.length) {
    phase.value = 'arm'
    later(runHeartbeat, 120)
    return
  }
  printed.value.push({ label: CHECKS[i], ok: false })
  later(() => {
    printed.value[i].ok = true
    later(() => runChecks(i + 1), 40 + Math.random() * 55)
  }, 55 + Math.random() * 70)
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let seen = false
  try { seen = sessionStorage.getItem('wd') === '1' } catch { /* private mode */ }

  if (reduced || seen) {
    visible.value = false
    emit('done')
    return
  }

  try { sessionStorage.setItem('wd', '1') } catch { /* ignore */ }

  document.body.classList.add('booting')
  window.addEventListener('keydown', onKey)
  later(() => runChecks(0), 350)
  later(finish, 4000)
})

onBeforeUnmount(() => { clearAll(); release() })
</script>

<template>
  <div
    v-if="visible"
    class="wd"
    :class="{ closing }"
    role="status"
    aria-label="Loading"
    @click="skip"
  >
    <div class="crt">
      <div class="col">
        <p class="banner">watchdog firmware 2.1.4<span class="cur">_</span></p>

        <ul class="checks">
          <li v-for="(c, i) in printed" :key="i" class="check">
            <span class="lbl">{{ c.label }}</span>
            <span class="dots" aria-hidden="true"></span>
            <span class="stat" :class="{ ok: c.ok }">
              {{ c.ok ? '[ ok ]' : '[ .. ]' }}
            </span>
          </li>
        </ul>

        <div v-if="phase === 'arm' || phase === 'granted'" class="arm">
          <p class="pulse">{{ pulse }}</p>
          <p class="timer">
            <template v-if="phase === 'arm'">
              watchdog armed &nbsp;·&nbsp; reset in {{ countdown.toFixed(2) }}s
            </template>
            <template v-else>
              <span class="kick">kick ← 0x7f</span> &nbsp;·&nbsp; timer bypassed
            </template>
          </p>
        </div>

        <p v-if="phase === 'granted'" class="granted">ACCESS GRANTED</p>
      </div>

      <p class="hint">press any key to skip</p>
    </div>
  </div>
</template>

<style scoped>
.wd {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--bg);
  display: grid;
  place-items: center;
  cursor: pointer;
  font-family: var(--boot);
}

/* CRT power-off: the picture collapses to a bright line, flares, dies. */
.crt {
  width: min(52ch, 92vw);
  transform-origin: center;
  animation: crt-on 360ms var(--ease-out) both;
}
.wd.closing .crt {
  animation: crt-off 420ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
}

@keyframes crt-on {
  0%   { transform: scaleY(0.004); filter: brightness(6); opacity: 0; }
  55%  { transform: scaleY(0.004); filter: brightness(6); opacity: 1; }
  100% { transform: scaleY(1); filter: brightness(1); opacity: 1; }
}
@keyframes crt-off {
  0%   { transform: scaleY(1) scaleX(1); filter: brightness(1); }
  55%  { transform: scaleY(0.004) scaleX(1); filter: brightness(7); }
  100% { transform: scaleY(0.004) scaleX(0); filter: brightness(7); opacity: 0; }
}

.col { font-size: clamp(1.05rem, 3.2vw, 1.45rem); line-height: 1.45; }

.banner {
  color: var(--fg);
  border-bottom: 1px solid var(--rule-strong);
  padding-bottom: 0.4rem;
  margin-bottom: 0.7rem;
}

.cur { animation: blink 0.9s steps(1, end) infinite; }
@keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }

.checks { list-style: none; padding: 0; margin: 0; }

.check {
  display: flex;
  align-items: baseline;
  gap: 0.5ch;
  color: var(--dim);
  animation: line-in 90ms steps(2, end) both;
}
@keyframes line-in { from { opacity: 0; } to { opacity: 1; } }

/* Leader dots fill the gap so status stays flush right, like real
   console output. */
.dots {
  flex: 1;
  border-bottom: 1px dotted var(--faint);
  translate: 0 -0.3em;
}

.stat { color: var(--faint); }
.stat.ok { color: var(--fg); }

.arm { margin-top: 0.8rem; }
.pulse { color: var(--fg); letter-spacing: 0.05em; white-space: nowrap; overflow: hidden; }
.timer { color: var(--dim); margin-top: 0.1rem; }

.kick {
  background: var(--inv-bg);
  color: var(--inv-fg);
  padding: 0 0.4ch;
}

.granted {
  margin-top: 0.9rem;
  letter-spacing: 0.3em;
  color: var(--fg);
  animation: granted-in 320ms steps(3, end) both;
}
@keyframes granted-in {
  from { opacity: 0; letter-spacing: 0.9em; }
  to   { opacity: 1; letter-spacing: 0.3em; }
}

.hint {
  margin-top: 1.4rem;
  text-align: center;
  color: var(--faint);
  font-size: 0.8em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
</style>
