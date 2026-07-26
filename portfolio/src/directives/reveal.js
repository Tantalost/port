let observer = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.15,
    }
  )
  return observer
}

export const reveal = {
  mounted(el, binding) {
    const { delay = 0, variant = 'default' } = binding.value || {}

    el.classList.add('reveal')
    el.dataset.reveal = variant
    if (delay) el.style.transitionDelay = `${delay}ms`

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed')
      return
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
