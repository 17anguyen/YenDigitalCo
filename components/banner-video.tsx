'use client'
import { useState, useEffect } from 'react'
import { videoUrl } from '@/lib/videos'

const SOURCES = [
  videoUrl('/senpai-squad-recap-2026.mp4'),
  videoUrl('/lil-texas-recap.mp4'),
  videoUrl('/juelz-b2b-san-holo.mp4'),
  videoUrl('/final-bout.mp4'),
  videoUrl('/dj-isaac-2025.mp4'),
]

export default function BannerVideo() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrentIdx(i => (i + 1) % SOURCES.length)
        setFading(false)
      }, 800)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {SOURCES.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === currentIdx ? (fading ? 0 : 1) : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,11,16,0.55)' }} />
    </div>
  )
}
