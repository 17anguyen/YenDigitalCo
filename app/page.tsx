import Link from 'next/link'
import Image from 'next/image'

const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE || 'https://pub-28a37ca9f30345e7a8a22f258f719aa3.r2.dev'
function videoUrl(p: string) {
  if (!VIDEO_BASE) return p
  return VIDEO_BASE.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
}

function WorkCard({ src, videoSrc, label, cat, href, aspectRatio }: {
  src?: string
  videoSrc?: string
  label: string
  cat: string
  href: string
  aspectRatio: string
}) {
  return (
    <Link href={href} className="wc" style={{ aspectRatio }}>
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="wc-bg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <Image
          src={src!}
          alt={label}
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
          className="wc-bg"
          style={{ objectFit: 'cover' }}
        />
      )}
      <div className="wc-over">
        <div className="oc">{cat}</div>
        <div className="ot">{label}</div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero grad page-in">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="eyebrow">Multimedia Production &amp; Web Management</span>
          <h1 className="hero-h1">
            Yên<em />
            <span className="deco">Digital Company</span>
          </h1>
          <span className="hero-tag">Serenity · Fortitude · Perseverance · Grace</span>
          <div className="hero-btns">
            <Link href="/video" className="btn-p">View Work</Link>
            <Link href="/contact" className="btn-o">Get in Touch</Link>
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-txt">Scroll</span>
        </div>
      </section>

      <hr className="divline" />

      {/* SELECTED WORK */}
      <div className="section">
        <span className="s-label">Selected Work</span>
        <h2 className="s-title">Crafted with calm<br /><em style={{ fontStyle: 'italic', color: 'rgba(238,242,244,0.5)' }}>execution</em></h2>
        <div className="work-grid">
          <WorkCard videoSrc={videoUrl('/videos/senpai-squad-recap-2026.mp4')} label="Senpai Squad 2026" cat="Nightlife · Video" href="/video" aspectRatio="16/9" />
          <WorkCard src="/images/kawaii-rave-texas-2026/_A7R2807.jpg" label="Kawaii Rave Texas 2026" cat="Nightlife · Photo" href="/photos" aspectRatio="4/3" />
          <WorkCard src="/images/hoang-hiyu-2025/DSCF3379-2.jpg" label="Hoang @ Hiyu 2025" cat="Events · Photo" href="/photos" aspectRatio="16/9" />
          <WorkCard videoSrc={videoUrl('/videos/juelz-b2b-san-holo.mp4')} label="Juelz b2b San Holo" cat="Nightlife · Video" href="/video" aspectRatio="4/3" />
          <WorkCard videoSrc={videoUrl('/videos/lil-texas-recap.mp4')} label="Lil Texas 2026" cat="Nightlife · Video" href="/video" aspectRatio="16/9" />
          <WorkCard src="/images/dj-isaac-2025/DSC00655.jpg" label="DJ Isaac 2025" cat="Nightlife · Photo" href="/photos" aspectRatio="4/3" />
        </div>
      </div>

      <hr className="divline" />

      {/* ABOUT */}
      <div className="section" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="about-grid">
          <div className="about-visual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '260px',
              height: '260px',
              borderRadius: '50px',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <Image
                src="/images/about-portrait.jpg"
                alt="Portrait"
                fill
                sizes="260px"
                style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
              />
            </div>
          </div>
          <div className="about-text">
            <span className="s-label">About</span>
            <h2 className="s-title">Calm craft.<br />Built to last.</h2>
            <p className="s-body">Yên Digital Company is a multimedia production and web management studio rooted in steady support and intentional storytelling. We specialize in nightlife, automotive, and event content — capturing the energy of a moment with cinematic precision.</p>
            <p className="s-body">Every frame is considered. Every deliverable is crafted. Whether it&apos;s a full video production, a photo campaign, or a complete web presence, we bring the same quiet confidence to the work.</p>
            <a className="ig-link" href="https://www.instagram.com/livydoesmedia" target="_blank" rel="noopener noreferrer">↗ @livydoesmedia</a>
          </div>
        </div>
      </div>

      <hr className="divline" />

      {/* SERVICES */}
      <div className="section">
        <span className="s-label">Services</span>
        <h2 className="s-title">What we do</h2>
        <div className="svc-grid">
          <div className="svc">
            <div className="svc-n">01</div>
            <div className="svc-name">Video Production</div>
            <p className="svc-desc">Cinematic coverage of nightlife, automotive, and live events. From concept to final cut — slow pans, intentional transitions, and a visual style built around atmosphere and mood.</p>
          </div>
          <div className="svc">
            <div className="svc-n">02</div>
            <div className="svc-name">Photography</div>
            <p className="svc-desc">High-craft stills for events, car shoots, and brand campaigns. Natural light where possible, soft contrast always — images that feel considered, not corrected.</p>
          </div>
          <div className="svc">
            <div className="svc-n">03</div>
            <div className="svc-name">Web Management</div>
            <p className="svc-desc">Digital presence built and maintained with the same care we bring to the lens. Clean, fast, and designed to last — from initial build to ongoing updates and strategy.</p>
          </div>
        </div>
      </div>

      <hr className="divline" />

      {/* CASE STUDIES */}
      <div className="section">
        <span className="s-label">Client Work</span>
        <h2 className="s-title">Companies we&apos;ve<br />worked with</h2>
        <p className="s-body">A selection of brands, venues, and businesses we&apos;ve supported — from one-off shoots to ongoing retainers.</p>
        <div className="cs-grid">
          <div className="cs-card">
            <div className="cs-logo-box">ET</div>
            <div>
              <div className="cs-company">Express Tube</div>
              <div className="cs-name">Marketing &amp; Social Strategy</div>
            </div>
            <p className="cs-what">Full-scale marketing retainer — content calendar, social management, and monthly analytics across Instagram and beyond. Scaled from part-time to a full marketing operation.</p>
            <div className="cs-tags">
              <span className="cs-tag">Marketing</span>
              <span className="cs-tag">Social Media</span>
              <span className="cs-tag">Strategy</span>
            </div>
          </div>
          {[
            { tags: ['Video', 'Tag Two'] },
            { tags: ['Photography', 'Tag Two'] },
            { tags: ['Web', 'Tag Two'] },
            { tags: ['Nightlife', 'Tag Two'] },
            { tags: ['Automotive', 'Tag Two'] },
          ].map((item, i) => (
            <div key={i} className="cs-card">
              <div className="cs-logo-box">—</div>
              <div>
                <div className="cs-company">Your Client</div>
                <div className="cs-name">Your Project Title Here</div>
              </div>
              <p className="cs-what">Describe what you did for this client in one or two sentences. Keep it specific — what did you shoot, build, or manage, and what did it achieve?</p>
              <div className="cs-tags">
                {item.tags.map(t => <span key={t} className="cs-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divline" />

      {/* RETAINER TEASER */}
      <div className="section">
        <span className="s-label">Retainer Packages</span>
        <h2 className="s-title">Steady support,<br />month after month</h2>
        <p className="s-body" style={{ marginBottom: '2.5rem' }}>Whether you need your marketing scaled or your website kept sharp, our retainers keep things moving — without you having to think about it.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px' }}>
          <Link href="/retainers" className="svc" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <div className="svc-n" style={{ color: 'rgba(168,195,160,0.18)' }}>↗</div>
            <div className="svc-name">Marketing Retainers</div>
            <p className="svc-desc">Social content, strategy, analytics, and scheduling — handled end to end. Three tiers built to match where your brand is right now.</p>
          </Link>
          <Link href="/retainers" className="svc" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <div className="svc-n" style={{ color: 'rgba(216,191,166,0.18)' }}>↗</div>
            <div className="svc-name">Website Retainers</div>
            <p className="svc-desc">Maintenance, updates, SEO monitoring, and performance reporting. Your site, always running — so you never have to chase it.</p>
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/retainers" className="btn-o">View All Packages</Link>
        </div>
      </div>
    </>
  )
}
