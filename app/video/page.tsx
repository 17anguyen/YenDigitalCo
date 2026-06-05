'use client'
import { useState, useRef } from 'react'
import { videoUrl } from '@/lib/videos'

type VideoItem = { src?: string; t: string; c: string[]; grad?: string }

const VIDS: VideoItem[] = [
  { src: videoUrl('/senpai-squad-recap-2026.mp4'), t: 'Senpai Squad Recap', c: ['Nightlife'] },
  { src: videoUrl('/lil-texas-recap.mp4'), t: 'Lil Texas Recap', c: ['Nightlife'] },
  { src: videoUrl('/juelz-b2b-san-holo.mp4'), t: 'Juelz b2b San Holo', c: ['Nightlife'] },
  { src: videoUrl('/final-bout.mp4'), t: 'Bout', c: ['Automotive', 'Events'] },
  { src: videoUrl('/dj-isaac-2025.mp4'), t: 'DJ Isaac 2025', c: ['Nightlife'] },
]

const FILTERS = ['All', 'Nightlife', 'Events', 'Automotive']

function VideoCard({ item, onOpen }: { item: VideoItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => { })
  }
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="gi"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
    >
      {item.src ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.75s ease' }}
          className="gi-bg"
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: item.grad }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 35% 35%,rgba(168,195,160,0.07) 0%,transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,rgba(14,27,42,0.5),transparent)' }} />
        </div>
      )}
      <div className="gi-over">
        <div className="play-ring"><div className="play-tri" /></div>
        <div className="gi-title">{item.c.join(' · ')} · {item.t}</div>
      </div>
    </div>
  )
}

function VideoLightbox({ item, onClose }: { item: VideoItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    videoRef.current?.play().catch(() => { })
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!item.src) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(6,11,16,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%' }}>
        <video
          ref={videoRef}
          src={item.src}
          controls
          playsInline
          style={{ width: '100%', maxHeight: '85vh', display: 'block', outline: 'none' }}
        />
        <div style={{ marginTop: '0.75rem', fontFamily: 'var(--hf)', fontSize: '1rem', color: 'rgba(238,242,244,0.5)', fontWeight: 300 }}>
          {item.t}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '1.5rem', right: '2rem',
          background: 'none', border: '0.5px solid rgba(168,195,160,0.25)',
          color: 'rgba(238,242,244,0.6)', fontFamily: 'var(--bf)',
          fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '0.5rem 1rem', cursor: 'pointer', zIndex: 10000,
        }}
      >
        Close
      </button>
    </div>
  )
}


export default function VideoPage() {
  const [active, setActive] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<VideoItem | null>(null)

  const visible = active === 'All' ? VIDS : VIDS.filter(v => v.c.includes(active))

  return (
    <>
      <div className="inner-hero page-in" style={{ position: 'relative' }}>
        <BannerVideo />
        <div className="hero-glow" />
        <div className="inner-hero-content">
          <span className="inner-label">Video Gallery</span>
          <h1 className="inner-h1">Moving<br /><em>Pictures</em></h1>
        </div>
      </div>
      <hr className="divline" />
      <div className="section">
        <span className="s-label">Reel</span>
        <h2 className="s-title">Cinematic work</h2>
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn${active === f ? ' on' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>
        <div className="gal-grid">
          {visible.map((v, i) => (
            <VideoCard key={i} item={v} onOpen={() => setLightboxItem(v)} />
          ))}
        </div>
      </div>

      {lightboxItem && (
        <VideoLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  )
}
