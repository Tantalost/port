import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useTypewriter(
  source,
  { charDelay = 26, lineDelay = 320, startDelay = 400, autoStart = true } = {}
) {
  const lines = ref(source.map(() => ({ text: '', done: false })))
  const activeLine = ref(-1)
  const finished = ref(false)
  const started = ref(false)

  let timers = []

  function later(fn, ms) {
    const id = setTimeout(fn, ms)
    timers.push(id)
    return id
  }

  function typeLine(index) {
    if (index >= source.length) {
      finished.value = true
      activeLine.value = -1
      return
    }

    activeLine.value = index
    const full = source[index]
    let i = 0

    const step = () => {
      i++
      lines.value[index].text = full.slice(0, i)

      if (i < full.length) {
        const punctuation = /[.,;:!?]/.test(full[i - 1]) ? 180 : 0
        later(step, charDelay + Math.random() * charDelay + punctuation)
      } else {
        lines.value[index].done = true
        later(() => typeLine(index + 1), lineDelay)
      }
    }

    later(step, charDelay)
  }

  function skipToEnd() {
    timers.forEach(clearTimeout)
    timers = []
    lines.value = source.map((text) => ({ text, done: true }))
    activeLine.value = -1
    finished.value = true
  }

  function begin() {
    if (started.value) return
    started.value = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      skipToEnd()
      return
    }
    later(() => typeLine(0), startDelay)
  }

  onMounted(() => { if (autoStart) begin() })
  onBeforeUnmount(() => timers.forEach(clearTimeout))

  return { lines, activeLine, finished, started, begin, skipToEnd }
}
