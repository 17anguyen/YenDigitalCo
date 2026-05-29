'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let gx = window.innerWidth / 2, gy = window.innerHeight / 2
    let gtx = gx, gty = gy
    let suppressed = false
    let rafId: number

    const onMove = (e: MouseEvent) => {
      gtx = e.clientX; gty = e.clientY
      el.style.opacity = suppressed ? '0' : '1'
    }
    const onOver = (e: MouseEvent) => {
      suppressed = window.getComputedStyle(e.target as Element).cursor === 'pointer'
      el.style.opacity = suppressed ? '0' : '1'
    }
    const onLeave = () => { el.style.opacity = '0' }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    function tick() {
      gx += (gtx - gx) * 0.14
      gy += (gty - gy) * 0.14
      el.style.left = gx + 'px'
      el.style.top  = gy + 'px'
      rafId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div className="cursor-glow" ref={glowRef} />
}
