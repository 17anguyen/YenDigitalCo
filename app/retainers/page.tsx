import Link from 'next/link'

export default function RetainersPage() {
  return (
    <>
      <div className="inner-hero grad page-in">
        <div className="hero-glow" />
        <div className="inner-hero-content">
          <span className="inner-label">Retainer Packages</span>
          <h1 className="inner-h1">Steady support,<br /><em>built to last</em></h1>
        </div>
      </div>
      <hr className="divline" />

      <div className="section">
        {/* MARKETING RETAINERS */}
        <div className="ret-section-head">
          <div>
            <span className="ret-type-label">Marketing</span>
            <h2 className="s-title" style={{ marginBottom: '0.5rem' }}>Marketing retainers</h2>
            <p className="s-body">Social content, strategy, and analytics — consistently executed so your brand stays visible and your audience keeps growing.</p>
          </div>
        </div>
        <div className="ret-grid">
          <div className="ret-card peach-hover">
            <div className="ret-tier">Essential</div>
            <div className="ret-name">Presence</div>
            <div className="ret-price"><sup>$</sup>650<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>8 posts per month</li>
              <li>2 platforms (Instagram + 1)</li>
              <li>Caption copywriting &amp; hashtag strategy</li>
              <li>Monthly performance report</li>
              <li>Content calendar delivered weekly</li>
              <li className="muted">Paid ad management</li>
              <li className="muted">Reel / video content</li>
              <li className="muted">Weekly strategy calls</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
          <div className="ret-card featured">
            <div className="ret-tier">Growth</div>
            <div className="ret-name">Momentum</div>
            <div className="ret-price"><sup>$</sup>1,200<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>16 posts per month</li>
              <li>3 platforms (Instagram, TikTok, + 1)</li>
              <li>Caption copywriting &amp; hashtag strategy</li>
              <li>Weekly analytics + engagement review</li>
              <li>Story / Reel content (4/mo)</li>
              <li>Content calendar delivered weekly</li>
              <li>Monthly strategy call (30 min)</li>
              <li className="muted">Paid ad management</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
          <div className="ret-card peach-hover">
            <div className="ret-tier">Full Scale</div>
            <div className="ret-name">Authority</div>
            <div className="ret-price"><sup>$</sup>2,200<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>Daily content across all platforms</li>
              <li>Instagram, TikTok, Facebook, LinkedIn</li>
              <li>Caption copywriting &amp; hashtag strategy</li>
              <li>Weekly analytics + competitor tracking</li>
              <li>Reel / video content (8/mo)</li>
              <li>Paid social ad management (budget separate)</li>
              <li>Weekly strategy calls</li>
              <li>Priority turnaround — 24 hr response</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
        </div>

        <hr className="divline" style={{ marginBottom: '5rem' }} />

        {/* WEBSITE RETAINERS */}
        <div className="ret-section-head">
          <div>
            <span className="ret-type-label sand">Website</span>
            <h2 className="s-title" style={{ marginBottom: '0.5rem' }}>Website retainers</h2>
            <p className="s-body">Your site, always running. Updates handled, performance monitored, and your digital presence kept sharp — without you chasing it.</p>
          </div>
        </div>
        <div className="ret-grid">
          <div className="ret-card">
            <div className="ret-tier amber">Basic</div>
            <div className="ret-name">Maintain</div>
            <div className="ret-price"><sup>$</sup>350<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>Monthly plugin &amp; CMS updates</li>
              <li>Security monitoring &amp; backups</li>
              <li>Hosting uptime monitoring</li>
              <li>Up to 1 hr of minor edits/mo</li>
              <li>Monthly status report</li>
              <li className="muted">SEO monitoring</li>
              <li className="muted">Performance optimization</li>
              <li className="muted">Priority support</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
          <div className="ret-card featured">
            <div className="ret-tier amber">Standard</div>
            <div className="ret-name">Perform</div>
            <div className="ret-price"><sup>$</sup>700<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>Bi-weekly plugin &amp; CMS updates</li>
              <li>Security monitoring &amp; backups</li>
              <li>Hosting uptime monitoring</li>
              <li>Up to 3 hrs of edits/mo</li>
              <li>SEO monitoring &amp; keyword tracking</li>
              <li>Core Web Vitals + speed report</li>
              <li>Monthly strategy call (30 min)</li>
              <li className="muted">Unlimited edits</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
          <div className="ret-card">
            <div className="ret-tier amber">Premium</div>
            <div className="ret-name">Command</div>
            <div className="ret-price"><sup>$</sup>1,400<span>/mo</span></div>
            <hr className="ret-divider" />
            <ul className="ret-features">
              <li>Unlimited updates &amp; content edits</li>
              <li>Security monitoring &amp; backups</li>
              <li>Full SEO management &amp; reporting</li>
              <li>Core Web Vitals + monthly optimization</li>
              <li>Google Analytics / GSC management</li>
              <li>Priority support — 24 hr response</li>
              <li>Monthly strategy call (60 min)</li>
              <li>New page builds (1/mo included)</li>
            </ul>
            <div className="ret-cta"><Link href="/contact" className="btn-ret" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Get Started</Link></div>
          </div>
        </div>

        <p className="ret-note">
          All retainers are billed monthly with a 3-month minimum commitment. Prices shown are starting rates — custom packages available for larger brands or multi-location businesses. A one-time onboarding fee may apply.{' '}
          <span style={{ color: 'rgba(168,195,160,0.5)' }}>Bundle a marketing + website retainer for 15% off both.</span>
        </p>
      </div>
    </>
  )
}
