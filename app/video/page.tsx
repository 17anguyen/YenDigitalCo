'use client'
import { useState, useRef } from 'react'

const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE || 'https://pub-28a37ca9f30345e7a8a22f258f719aa3.r2.dev'
function videoUrl(p: string) {
  if (!VIDEO_BASE) return p
  return VIDEO_BASE.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
}

/* ── Video data — src paths are relative to /public/videos/ ── */
type VideoItem = { src?: string; t: string; c: string[]; grad?: string }

const VIDS: VideoItem[] = [
  { src: videoUrl('/senpai-squad-recap-2026.mp4'), t: 'Senpai Squad Recap', c: ['Nightlife'] },
  { src: videoUrl('/lil-texas-recap.mp4'), t: 'Lil Texas Recap', c: ['Nightlife'] },
  { src: videoUrl('/juelz-b2b-san-holo.mp4'), t: 'Juelz b2b San Holo', c: ['Nightlife'] },
  { src: videoUrl('/final-bout.mp4'), t: 'Bout', c: ['Automotive', 'Events'] },
  { src: videoUrl('/dj-isaac-2025.mp4'), t: 'DJ Isaac 2025', c: ['Nightlife'] },
]

const FILTERS = ['All', 'Nightlife', 'Events', 'Automotive']

function VideoCard({ item }: { item: VideoItem }) {
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
    >
      {item.src ? (
        <video
          ref={videoRef}
          src={item.src}
          autoPlay
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

export default function VideoPage() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? VIDS : VIDS.filter(v => v.c.includes(active))

  return (
    <>
      <div className="inner-hero grad page-in">
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
            <VideoCard key={i} item={v} />
          ))}
        </div>
      </div>
    </>
  )
}
