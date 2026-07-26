import { ref, onBeforeUnmount } from 'vue'

const GLYPHS = '#%&*+=-<>/\\|[]{}()_~^'

export function useScramble({ speed = 1 } = {}) {
  const output = ref('')
  const settled = ref(true)

  let frame = 0
  let raf = null
  let queue = []
  let resolveRun = null

  function scrambleTo(next) {
    const prev = output.value
    const length = Math.max(prev.length, next.length)

    queue = []
    for (let i = 0; i < length; i++) {
      const from = prev[i] || ''
      const to = next[i] || ''
      const start = Math.floor(Math.random() * 18 * speed)
      const end = start + Math.floor(Math.random() * 18 * speed) + 8
      queue.push({ from, to, start, end, char: '' })
    }

    cancelAnimationFrame(raf)
    frame = 0
    settled.value = false
    const done = new Promise((res) => (resolveRun = res))
    update()
    return done
  }

  function update() {
    let out = ''
    let complete = 0

    for (const item of queue) {
      if (frame >= item.end) {
        complete++
        out += item.to
      } else if (frame >= item.start) {
        if (!item.char || Math.random() < 0.3) {
          item.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
        out += item.char
      } else {
        out += item.from
      }
    }

    output.value = out

    if (complete === queue.length) {
      settled.value = true
      resolveRun?.()
      return
    }

    frame++
    raf = requestAnimationFrame(update)
  }

  onBeforeUnmount(() => cancelAnimationFrame(raf))

  return { output, settled, scrambleTo }
}
