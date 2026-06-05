'use client'
import { useEffect, useRef } from 'react'

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const intro = introRef.current as HTMLDivElement
    const canvas = canvasRef.current as HTMLCanvasElement
    const overlay = overlayRef.current
    const hint = hintRef.current
    if (!intro || !canvas) return

    const ctx = canvas.getContext('2d')!

    const SCALE = 0.33
    const BASE_DAMP = 0.983
    const BASE_DISP = 0.13

    let W: number, H: number, SZ: number
    let map1: Float32Array, map2: Float32Array
    let srcPx: Uint8ClampedArray, imgData: ImageData
    let rafId: number
    let progress = 0, done = false

    function buildSource() {
      const off = document.createElement('canvas')
      off.width = W; off.height = H
      const oc = off.getContext('2d')!
      const g = oc.createLinearGradient(0, 0, W, H)
      g.addColorStop(0, '#030d16')
      g.addColorStop(0.15, '#092810')
      g.addColorStop(0.38, '#183322')
      g.addColorStop(0.55, '#0E1B2A')
      g.addColorStop(0.72, '#0a1f14')
      g.addColorStop(0.88, '#0a2416')
      g.addColorStop(1, '#07160a')
      oc.fillStyle = g; oc.fillRect(0, 0, W, H)
      const r1 = oc.createRadialGradient(W * .27, H * .68, 0, W * .27, H * .68, W * .42)
      r1.addColorStop(0, 'rgba(168,195,160,0.28)'); r1.addColorStop(1, 'transparent')
      oc.fillStyle = r1; oc.fillRect(0, 0, W, H)
      const r2 = oc.createRadialGradient(W * .73, H * .25, 0, W * .73, H * .25, W * .34)
      r2.addColorStop(0, 'rgba(216,191,166,0.2)'); r2.addColorStop(1, 'transparent')
      oc.fillStyle = r2; oc.fillRect(0, 0, W, H)
      srcPx = oc.getImageData(0, 0, W, H).data
    }

    function init() {
      W = Math.floor(window.innerWidth * SCALE)
      H = Math.floor(window.innerHeight * SCALE)
      canvas.width = W; canvas.height = H
      SZ = W * H
      map1 = new Float32Array(SZ)
      map2 = new Float32Array(SZ)
      imgData = ctx.createImageData(W, H)
      buildSource()
    }

    function disturb(x: number, y: number, r: number, str: number) {
      const cx = x | 0, cy = y | 0, ri = r | 0
      for (let dy = -ri; dy <= ri; dy++) {
        for (let dx = -ri; dx <= ri; dx++) {
          if (dx * dx + dy * dy <= ri * ri) {
            const px = cx + dx, py = cy + dy
            if (px >= 0 && px < W && py >= 0 && py < H)
              map1[py * W + px] += str
          }
        }
      }
    }

    function step() {
      const damp = BASE_DAMP + (1 - BASE_DAMP) * Math.pow(progress, 0.55)
      for (let i = W; i < SZ - W; i++) {
        map2[i] = ((map1[i - 1] + map1[i + 1] + map1[i - W] + map1[i + W]) * 0.5) - map2[i]
        map2[i] *= damp
      }
      const t = map1; map1 = map2; map2 = t
    }

    function renderFrame() {
      const dst = imgData.data
      const str = BASE_DISP * (1 - Math.min(1, progress * 1.25))
      for (let i = 0; i < SZ; i++) {
        const x = i % W, y = (i / W) | 0
        const l = x > 0 ? map1[i - 1] : 0
        const r = x < W - 1 ? map1[i + 1] : 0
        const u = y > 0 ? map1[i - W] : 0
        const d = y < H - 1 ? map1[i + W] : 0
        const ox = ((l - r) * str + .5) | 0
        const oy = ((u - d) * str + .5) | 0
        const sx = Math.max(0, Math.min(W - 1, x + ox))
        const sy = Math.max(0, Math.min(H - 1, y + oy))
        const si = (sy * W + sx) << 2, di = i << 2
        dst[di] = srcPx[si]; dst[di + 1] = srcPx[si + 1]; dst[di + 2] = srcPx[si + 2]; dst[di + 3] = 255
      }
      ctx.putImageData(imgData, 0, 0)
      const blurPx = 22 * (1 - Math.min(1, progress * 1.15))
      canvas.style.filter = blurPx > 0.4 ? `blur(${blurPx.toFixed(1)}px)` : ''
      if (overlay) {
        const tb = blurPx * 0.38
        overlay.style.filter = tb > 0.2 ? `blur(${tb.toFixed(1)}px)` : ''
        overlay.style.opacity = progress > 0.8 ? String(Math.max(0, 1 - (progress - 0.8) / 0.2)) : '1'
      }
      if (hint) hint.style.opacity = Math.max(0, 1 - progress * 4).toFixed(2)
    }

    function loop() {
      if (done) return
      step(); renderFrame()
      rafId = requestAnimationFrame(loop)
    }

    function advance(delta: number) {
      if (done) return
      progress = Math.min(1, progress + delta)
      if (progress >= 1) {
        done = true
        cancelAnimationFrame(rafId)
        intro.style.transition = 'opacity 0.75s ease'
        intro.style.opacity = '0'
        setTimeout(() => { intro.style.display = 'none'; document.body.style.overflow = '' }, 780)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (done) return
      e.preventDefault()
      advance(Math.min(0.09, Math.abs(e.deltaY) / 520))
    }
    let lastTY = 0
    const onTouchStart = (e: TouchEvent) => { lastTY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (done) return
      e.preventDefault()
      const dy = Math.abs(lastTY - e.touches[0].clientY)
      lastTY = e.touches[0].clientY
      advance(dy / 320)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    let _lmx = 0, _lmy = 0
    const onMouseMove = (e: MouseEvent) => {
      if (done || progress > 0.78) return
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width * W
      const y = (e.clientY - rect.top) / rect.height * H
      const vx = x - _lmx, vy = y - _lmy
      const speed = Math.sqrt(vx * vx + vy * vy)
      const str = 200 + speed * 10 + Math.random() * 150
      const r = Math.min(22, (9 + speed * 0.5 + Math.random() * 7) | 0)
      disturb(x, y, r, str)
      if (speed > 1.5) disturb(x - vx * 0.5, y - vy * 0.5, (4 + Math.random() * 5) | 0, str * 0.55)
      _lmx = x; _lmy = y
    }
    const onClick = (e: MouseEvent) => {
      if (done || progress > 0.65) return
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width * W
      const y = (e.clientY - rect.top) / rect.height * H
      disturb(x, y, 28, 700)
      setTimeout(() => { if (!done) disturb(x, y, 14, 380) }, 90)
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('click', onClick)

    // skip button ref stored for handler
    const skipBtn = intro.querySelector('#intro-skip-btn')
    const onSkip = () => {
      ; (function fastFwd() {
        if (progress >= 1) { advance(1); return }
        progress = Math.min(1, progress + 0.06)
        step(); renderFrame()
        requestAnimationFrame(fastFwd)
      })()
    }
    skipBtn?.addEventListener('click', onSkip)

    function start() {
      document.body.style.overflow = 'hidden'
      init()
      const drops: [number, number, number, number][] = [
        [0.5, 0.45, 22, 480], [0.2, 0.7, 16, 380], [0.78, 0.3, 18, 420],
        [0.35, 0.2, 12, 300], [0.65, 0.8, 14, 340], [0.1, 0.5, 10, 260],
        [0.88, 0.6, 12, 310], [0.42, 0.88, 10, 280], [0.7, 0.15, 14, 360],
      ]
      drops.forEach(([rx, ry, r, s], i) => {
        setTimeout(() => { if (!done) disturb(W * rx, H * ry, r, s) }, i * 160)
      })
      const rainInterval = setInterval(() => {
        if (!done && progress < 0.62)
          disturb(Math.random() * W, Math.random() * H, (4 + Math.random() * 12) | 0, 140 + Math.random() * 220)
      }, 750)
      loop()
      return rainInterval
    }

    let rainInterval: ReturnType<typeof setInterval>
    if (document.fonts) {
      document.fonts.ready.then(() => { rainInterval = start() })
    } else {
      setTimeout(() => { rainInterval = start() }, 80)
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(rainInterval)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('click', onClick)
      skipBtn?.removeEventListener('click', onSkip)
    }
  }, [])

  return (
    <div id="intro" ref={introRef}>
      <canvas id="wcanvas" ref={canvasRef} />
      <div id="intro-overlay" ref={overlayRef}>
        <span style={{ display: 'block', fontFamily: "'Inter',sans-serif", fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(168,195,160,0.6)', marginBottom: '2rem' }}>
          Multimedia Production &amp; Web Management
        </span>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(5rem,13vw,12rem)', fontWeight: 300, lineHeight: 0.88, color: '#EEF2F4' }}>
          Yên
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.2rem,2.5vw,2rem)', fontWeight: 300, color: 'rgba(238,242,244,0.35)', letterSpacing: '0.18em', marginTop: '0.5rem' }}>
          Digital Company
        </div>
      </div>
      <div id="intro-scroll-hint" ref={hintRef}>
        <div style={{ width: '0.5px', height: '50px', background: 'linear-gradient(to bottom,rgba(168,195,160,0.55),transparent)', marginBottom: '0.5rem' }} />
        <span style={{ fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,195,160,0.36)', fontFamily: "'Inter',sans-serif" }}>
          Scroll to reveal
        </span>
      </div>
      <button id="intro-skip-btn">Skip ↓</button>
    </div>
  )
}
