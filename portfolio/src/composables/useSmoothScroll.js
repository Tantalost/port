import { onMounted, onBeforeUnmount, ref } from 'vue'
export function useSmoothScroll(wrapperRef, contentRef, { ease = 0.09 } = {}) {
  const enabled = ref(false)
  const progress = ref(0)

  let current = 0
  let target = 0
  let raf = null
  let ro = null
  let spacer = null

  const shouldDisable = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(hover: none)').matches

  function measure() {
    if (!contentRef.value || !spacer) return
    spacer.style.height = `${contentRef.value.getBoundingClientRect().height}px`
  }

  function tick() {
    target = window.scrollY
    current += (target - current) * ease
    if (Math.abs(target - current) < 0.5) current = target

    contentRef.value.style.transform = `translate3d(0, ${-current}px, 0)`

    const max = document.body.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(current / max, 1) : 0

    raf = requestAnimationFrame(tick)
  }

  function trackProgressOnly() {
    const max = document.body.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  }

  onMounted(() => {
    if (shouldDisable()) {
      wrapperRef.value?.classList.add('native')
      window.addEventListener('scroll', trackProgressOnly, { passive: true })
      trackProgressOnly()
      return
    }

    enabled.value = true

    spacer = document.createElement('div')
    spacer.setAttribute('aria-hidden', 'true')
    spacer.style.pointerEvents = 'none'
    document.body.appendChild(spacer)

    measure()
    ro = new ResizeObserver(measure)
    ro.observe(contentRef.value)
    window.addEventListener('resize', measure)
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {})

    current = target = window.scrollY
    raf = requestAnimationFrame(tick)
  })

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    ro?.disconnect()
    spacer?.remove()
    window.removeEventListener('resize', measure)
    window.removeEventListener('scroll', trackProgressOnly)
  })

  return { enabled, progress, measure }
}
