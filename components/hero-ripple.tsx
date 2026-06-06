'use client'
import { useEffect, useRef } from 'react'

// Resolution of the displacement map (lower = faster, still looks good)
const W = 180
const H = 100

// How many pixels the wave can displace at peak (SVG feDisplacementMap scale)
const DISPLACEMENT_SCALE = 48

// Wave damping (closer to 1 = waves travel farther before dying)
const DAMPING = 0.7

export default function HeroRipple() {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const hero = document.querySelector('.home-hero') as HTMLElement | null
    const feImg = document.getElementById('yen-ripple-map') as SVGFEImageElement | null
    if (!hero || !feImg) return

    // Wave buffers
    let cur = new Float32Array(W * H)
    let prv = new Float32Array(W * H)

    // Offscreen canvas for the displacement map
    const offscreen = document.createElement('canvas')
    offscreen.width = W
    offscreen.height = H
    const ctx = offscreen.getContext('2d')!
    const imgData = ctx.createImageData(W, H)

    // Initialise with neutral displacement (128 = zero displacement)
    imgData.data.fill(255)
    for (let i = 0; i < W * H; i++) {
      imgData.data[i * 4] = 128
      imgData.data[i * 4 + 1] = 128
    }
    ctx.putImageData(imgData, 0, 0)
    feImg.setAttribute('href', offscreen.toDataURL())

    // Apply filter to hero
    hero.style.filter = 'url(#yen-ripple-filter)'
    hero.style.willChange = 'filter'

    // Splash at cursor position
    const splash = (cx: number, cy: number) => {
      const mx = Math.round(cx * (W - 1))
      const my = Math.round(cy * (H - 1))
      const r = 2
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = mx + dx
          const ny = my + dy
          if (nx >= 1 && nx < W - 1 && ny >= 1 && ny < H - 1) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist <= r) {
              cur[ny * W + nx] += 520 * (1 - dist / r)
            }
          }
        }
      }
    }

    let lastX = -1, lastY = -1
    let overInteractive = false

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      overInteractive = !!el.closest('a, button, [role="button"]')
    }

    const onMove = (e: MouseEvent) => {
      if (overInteractive) return
      const rect = hero.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width
      const cy = (e.clientY - rect.top) / rect.height
      if (cx < 0 || cx > 1 || cy < 0 || cy > 1) return
      const mx = Math.round(cx * (W - 1))
      const my = Math.round(cy * (H - 1))
      if (Math.abs(mx - lastX) + Math.abs(my - lastY) > 1) {
        splash(cx, cy)
        lastX = mx; lastY = my
      }
    }

    hero.addEventListener('mouseover', onOver)
    hero.addEventListener('mousemove', onMove)

    let frameCount = 0
    let hasActivity = false

    function tick() {
      rafRef.current = requestAnimationFrame(tick)
      frameCount++

      // Propagate waves
      let maxAmp = 0
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x
          const next = (cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) / 2 - prv[i]
          prv[i] = next * DAMPING
          if (Math.abs(prv[i]) > maxAmp) maxAmp = Math.abs(prv[i])
        }
      }

      // Swap buffers
      const tmp = cur; cur = prv; prv = tmp

      hasActivity = maxAmp > 0.5

      // Skip rendering if wave is essentially flat (save GPU)
      if (!hasActivity && frameCount % 30 !== 0) return

      // Write displacement map: R = x-slope offset, G = y-slope offset
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x
          const slopeX = cur[i + 1] - cur[i - 1]
          const slopeY = cur[i + W] - cur[i - W]
          const px = i * 4
          imgData.data[px] = Math.max(0, Math.min(255, 128 + slopeX * 2.2)) | 0
          imgData.data[px + 1] = Math.max(0, Math.min(255, 128 + slopeY * 2.2)) | 0
          imgData.data[px + 2] = 0
          imgData.data[px + 3] = 255
        }
      }

      ctx.putImageData(imgData, 0, 0)
      feImg?.setAttribute('href', offscreen.toDataURL())
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      hero.removeEventListener('mouseover', onOver)
      hero.removeEventListener('mousemove', onMove)
      hero.style.filter = ''
      hero.style.willChange = ''
    }
  }, [])

  return (
    <svg
      style={{ display: 'none', position: 'absolute' }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="yen-ripple-filter"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            id="yen-ripple-map"
            result="rippleMap"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="rippleMap"
            scale={DISPLACEMENT_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
