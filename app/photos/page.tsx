'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { PHOTOS, EVENTS } from '@/lib/photos'

const FILTERS = ['All', 'Nightlife', 'Events', 'Automotive', 'Promotional']

/* ── Icons ─────────────────────────────────────────────────────────────── */
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="4" rx="0.5" />
    <rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="7" width="6" height="6" rx="0.5" />
    <rect x="9" y="9" width="6" height="4" rx="0.5" />
  </svg>
)
const GalleryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="14" height="9" rx="0.5" />
    <rect x="1" y="12" width="3" height="3" rx="0.5" />
    <rect x="5" y="12" width="3" height="3" rx="0.5" />
    <rect x="9" y="12" width="3" height="3" rx="0.5" />
    <rect x="13" y="12" width="2" height="3" rx="0.5" />
  </svg>
)

/* ── Gallery view (large main + thumbnail carousel) ─────────────────────── */
function GalleryViewer({
  photos,
  initialIndex = 0,
  onOpenLightbox,
}: {
  photos: typeof PHOTOS
  initialIndex?: number
  onOpenLightbox: (i: number) => void
}) {
  const [mainIdx, setMainIdx] = useState(initialIndex)
  const [paused, setPaused] = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const activeThumbRef = useRef<HTMLButtonElement>(null)

  // Reset when photo set changes
  useEffect(() => { setMainIdx(0) }, [photos])

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [mainIdx])

  const goTo = (i: number) => { setMainIdx(i); setPaused(true) }
  const prev = () => { setMainIdx(i => (i - 1 + photos.length) % photos.length); setPaused(true) }
  const next = () => setMainIdx(i => (i + 1) % photos.length)

  // Auto-rotate every 3 seconds, pause on hover or manual nav
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => next(), 3000)
    return () => clearInterval(id)
  }, [paused, mainIdx, photos.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!photos.length) return null
  const current = photos[mainIdx]

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* ── Main photo ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          background: '#060d13',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'zoom-in',
        }}
        onClick={() => onOpenLightbox(mainIdx)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Image
          src={current.src}
          alt={current.caption ?? current.event}
          width={1800}
          height={1200}
          priority
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            userSelect: 'none',
          }}
        />

        {/* Prev / Next */}
        <button onClick={e => { e.stopPropagation(); prev() }} style={navBtn('left')}>←</button>
        <button onClick={e => { e.stopPropagation(); next() }} style={navBtn('right')}>→</button>

        {/* Counter */}
        <div style={{
          position: 'absolute', bottom: '1rem', right: '1.25rem',
          fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(238,242,244,0.35)', fontFamily: 'var(--bf)',
          background: 'rgba(8,14,20,0.55)', padding: '0.3rem 0.6rem',
        }}>
          {mainIdx + 1} / {photos.length}
        </div>

        {/* Zoom hint */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1.25rem',
          fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(168,195,160,0.35)', fontFamily: 'var(--bf)',
        }}>
          Click to expand
        </div>
      </div>

      {/* ── Thumbnail carousel ── */}
      <div
        ref={thumbsRef}
        style={{
          display: 'flex',
          gap: '3px',
          overflowX: 'auto',
          padding: '3px 0',
          scrollbarWidth: 'none',
          marginTop: '3px',
        }}
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            ref={i === mainIdx ? activeThumbRef : null}
            onClick={() => goTo(i)}
            style={{
              flexShrink: 0,
              width: '88px',
              height: '66px',
              padding: 0,
              border: '2px solid',
              borderColor: i === mainIdx ? 'var(--jq)' : 'transparent',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              opacity: i === mainIdx ? 1 : 0.55,
              transition: 'opacity 0.2s, border-color 0.2s',
              background: '#060d13',
            }}
          >
            <Image
              src={p.src}
              alt=""
              fill
              sizes="88px"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function navBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(8,14,20,0.55)',
    border: '0.5px solid rgba(168,195,160,0.2)',
    color: 'rgba(238,242,244,0.65)',
    fontSize: '1.1rem',
    padding: '0.6rem 0.9rem',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'all 0.2s',
    backdropFilter: 'blur(4px)',
  }
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function PhotosPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeEvent, setActiveEvent] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const visible = PHOTOS.filter(p => {
    const matchFilter = activeFilter === 'All' || p.category === activeFilter
    const matchEvent = activeEvent === 'All' || p.event === activeEvent
    return matchFilter && matchEvent
  })

  /* ── Lightbox ─────────────────────────────────────────────────────────── */
  const closeLightbox = () => setLightboxIdx(null)
  const prev = useCallback(() =>
    setLightboxIdx(i => i === null ? null : (i - 1 + visible.length) % visible.length)
    , [visible.length])
  const next = useCallback(() =>
    setLightboxIdx(i => i === null ? null : (i + 1) % visible.length)
    , [visible.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIdx, prev, next])

  return (
    <>
      <div className="inner-hero grad page-in">
        <div className="hero-glow" />
        <div className="inner-hero-content">
          <span className="inner-label">Photo Gallery</span>
          <h1 className="inner-h1">Still<br /><em>Frames</em></h1>
        </div>
      </div>
      <hr className="divline" />
      <div className="section">
        <span className="s-label">Portfolio</span>
        <h2 className="s-title">A still is a decision</h2>

        {/* Category filter */}
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn${activeFilter === f ? ' on' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {/* Event filter — buttons on desktop, dropdown on mobile */}
        <div className="filter-bar event-filter-desktop" style={{ marginTop: '0.75rem', borderBottom: 'none', paddingBottom: 0 }}>
          <button className={`filter-btn${activeEvent === 'All' ? ' on' : ''}`} onClick={() => setActiveEvent('All')}>
            All Events
          </button>
          {EVENTS.map(e => (
            <button key={e.id} className={`filter-btn${activeEvent === e.id ? ' on' : ''}`} onClick={() => setActiveEvent(e.id)}>
              {e.label}
            </button>
          ))}
        </div>
        <div className="event-filter-mobile">
          <select
            value={activeEvent}
            onChange={ev => setActiveEvent(ev.target.value)}
            className="event-select"
          >
            <option value="All">All Events</option>
            {EVENTS.map(e => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>
        </div>

        {/* Count + view toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(238,242,244,0.2)' }}>
            {visible.length} photo{visible.length !== 1 ? 's' : ''}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['grid', 'gallery'] as const).map((mode, idx) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                title={mode === 'grid' ? 'Masonry grid' : 'Gallery viewer'}
                style={{
                  background: 'none', border: '0.5px solid',
                  borderColor: viewMode === mode ? 'var(--jq)' : 'rgba(238,242,244,0.15)',
                  color: viewMode === mode ? 'var(--jq)' : 'rgba(238,242,244,0.3)',
                  padding: '0.4rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  transition: 'all 0.25s',
                }}
              >
                {idx === 0 ? <GridIcon /> : <GalleryIcon />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Masonry grid ── */}
        {viewMode === 'grid' && (
          <div className="photo-grid">
            {visible.map((p, i) => (
              <div key={p.src} className="pi" onClick={() => setLightboxIdx(i)}>
                <Image
                  src={p.src} alt={p.caption ?? p.event}
                  width={900} height={600}
                  sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className="pi-bg"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  loading={i < 12 ? 'eager' : 'lazy'}
                />
                <div className="pi-over">
                  <div className="pi-cap">{p.caption ?? p.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Gallery viewer ── */}
        {viewMode === 'gallery' && (
          <GalleryViewer
            photos={visible}
            onOpenLightbox={(i) => setLightboxIdx(i)}
          />
        )}
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(6,11,16,0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div onClick={e => e.stopPropagation()} className="lightbox-stack" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
            {/* Background card layers */}
            <div className="lightbox-stack-card" style={{ background: 'rgba(168,195,160,0.08)', border: '0.5px solid rgba(168,195,160,0.15)', borderRadius: '4px' }}></div>
            <div className="lightbox-stack-card" style={{ background: 'rgba(168,195,160,0.04)', border: '0.5px solid rgba(168,195,160,0.08)', borderRadius: '4px' }}></div>

            {/* Main image */}
            <div className="lightbox-stack-card" style={{ borderRadius: '4px', overflow: 'hidden' }}>
              <Image
                src={visible[lightboxIdx].src}
                alt={visible[lightboxIdx].caption ?? visible[lightboxIdx].event}
                width={1800} height={1200}
                style={{ maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                priority
              />
            </div>
          </div>

          <button onClick={closeLightbox} style={{ position: 'fixed', top: '1.5rem', right: '2rem', background: 'none', border: '0.5px solid rgba(168,195,160,0.25)', color: 'rgba(238,242,244,0.6)', fontFamily: 'var(--bf)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.5rem 1rem', cursor: 'pointer', zIndex: 10000 }}>
            Close
          </button>
          <div style={{ position: 'fixed', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(238,242,244,0.3)', fontFamily: 'var(--bf)', textTransform: 'uppercase' }}>
            {lightboxIdx + 1} / {visible.length}
          </div>
          <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '0.5px solid rgba(168,195,160,0.2)', color: 'rgba(238,242,244,0.5)', fontSize: '1.2rem', padding: '0.75rem 1rem', cursor: 'pointer', zIndex: 10000 }}>←</button>
          <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '0.5px solid rgba(168,195,160,0.2)', color: 'rgba(238,242,244,0.5)', fontSize: '1.2rem', padding: '0.75rem 1rem', cursor: 'pointer', zIndex: 10000 }}>→</button>
        </div>
      )}
    </>
  )
}
