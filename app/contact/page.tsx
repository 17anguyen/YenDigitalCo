export default function ContactPage() {
  return (
    <>
      <div className="inner-hero grad page-in">
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
            {/* TODO: wire up form action (Formspree, Netlify Forms, etc.) */}
            <form className="ct-form">
              <div className="form-row2">
                <div className="fg">
                  <label className="flbl">First name</label>
                  <input className="fin" type="text" />
                </div>
                <div className="fg">
                  <label className="flbl">Last name</label>
                  <input className="fin" type="text" />
                </div>
              </div>
              <div className="fg">
                <label className="flbl">Email</label>
                <input className="fin" type="email" />
              </div>
              <div className="fg">
                <label className="flbl">Company / Brand (optional)</label>
                <input className="fin" type="text" />
              </div>
              <div className="fg">
                <label className="flbl">Service interested in</label>
                <select className="fin" style={{ cursor: 'pointer' }}>
                  <option value="">Select a service</option>
                  <option>Video Production</option>
                  <option>Photography</option>
                  <option>Web Management</option>
                  <option>Full Package</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="fg">
                <label className="flbl">Tell us about your project</label>
                <textarea className="fin fta" />
              </div>
              <button type="submit" className="btn-p" style={{ alignSelf: 'flex-start' }}>Send Message</button>
              <p className="ct-note">We&apos;ll respond within 48 hours. All inquiries handled with discretion.</p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
