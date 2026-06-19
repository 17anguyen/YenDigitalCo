import type { Metadata } from 'next'
import ContactForm from '../../components/contact-form'
import BannerVideo from '../../components/banner-video'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Yên Digital Company. Based in Seattle, WA — we work with nightlife venues, event promoters, and brands on video, photography, and web projects.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Contact | Yên Digital Company', description: 'Get in touch — based in Seattle, WA. Video production, photography, and web management.' },
}

export default function ContactPage() {
  return (
    <>
      <div className="inner-hero page-in" style={{ position: 'relative' }}>
        <BannerVideo />
        <div className="hero-glow" />
        <div className="inner-hero-content">
          <span className="inner-label">Contact</span>
          <h1 className="inner-h1">Let&apos;s build<br /><em>something</em></h1>
        </div>
      </div>
      <hr className="divline" />
      <div className="section">
        <span className="s-label">Get in Touch</span>
        <h2 className="s-title">Steady support<br />starts here</h2>
        <div className="ct-wrap">
          <div className="ct-info">
            <div className="ct-row">
              <span className="ct-lbl">Instagram</span>
              <div className="ct-val">@livydoesmedia</div>
            </div>
            <div className="ct-row">
              <span className="ct-lbl">Services</span>
              <div className="ct-val" style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(238,242,244,0.6)' }}>
                Video Production<br />Photography<br />Web Management<br />Brand Consulting
              </div>
            </div>
            <div className="ct-row">
              <span className="ct-lbl">Based in</span>
              <div className="ct-val">Seattle, WA</div>
            </div>
            <div className="ct-row">
              <span className="ct-lbl">Response time</span>
              <div className="ct-val" style={{ fontSize: '1rem', color: 'rgba(238,242,244,0.6)' }}>Within 48 hours</div>
            </div>
          </div>
          <div>
            {/* Client-side contact form handles submission and button text */}
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
