import { ref } from 'vue'

const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

export function useDither({ width = 200, contrast = 1.25, gamma = 0.9 } = {}) {
  const url = ref(null)
  const ready = ref(false)
  const failed = ref(false)

  function process(src) {
    if (!src) return

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const scale = width / img.naturalWidth
        const w = Math.max(Math.round(width), 1)
        const h = Math.max(Math.round(img.naturalHeight * scale), 1)

        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h

        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0, w, h)

        const data = ctx.getImageData(0, 0, w, h)
        const px = data.data

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4

            let lum = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255
            lum = Math.pow(lum, gamma)
            lum = Math.min(Math.max((lum - 0.5) * contrast + 0.5, 0), 1)

            const threshold = (BAYER4[y & 3][x & 3] + 0.5) / 16
            const isInk = lum <= threshold

            px[i] = px[i + 1] = px[i + 2] = 237
            px[i + 3] = isInk ? 255 : 0
          }
        }

        ctx.putImageData(data, 0, 0)
        url.value = canvas.toDataURL('image/png')
        ready.value = true
      } catch {
        failed.value = true
      }
    }

    img.onerror = () => { failed.value = true }
    img.src = src
  }

  return { url, ready, failed, process }
}
