"use client"

import { useState } from 'react'

export default function ContactForm() {
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (submitting || submitted) return
        setSubmitting(true)
        setError(null)

        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            const res = await fetch('https://formspree.io/f/mlgkrqoe', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            })

            if (res.ok) {
                setSubmitted(true)
            } else {
                const data = await res.json().catch(() => null)
                setError((data && data.error) || 'Submission failed — please try again.')
            }
        } catch (err) {
            setError('Network error — please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className="ct-form" onSubmit={handleSubmit}>
            <div className="form-row2">
                <div className="fg">
                    <label className="flbl">First name</label>
                    <input className="fin" type="text" name="first_name" disabled={submitted} />
                </div>
                <div className="fg">
                    <label className="flbl">Last name</label>
                    <input className="fin" type="text" name="last_name" disabled={submitted} />
                </div>
            </div>
            <div className="fg">
                <label className="flbl">Email</label>
                <input className="fin" type="email" name="email" required disabled={submitted} />
            </div>
            <div className="fg">
                <label className="flbl">Company / Brand (optional)</label>
                <input className="fin" type="text" name="company" disabled={submitted} />
            </div>
            <div className="fg">
                <label className="flbl">Company Website (optional)</label>
                <input className="fin" type="text" name="website" disabled={submitted} />
            </div>
            <div className="fg">
                <label className="flbl">Service interested in</label>
                <select className="fin" name="service" style={{ cursor: 'pointer' }} disabled={submitted}>
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
                <textarea className="fin fta" name="message" disabled={submitted} />
            </div>
            <input type="hidden" name="_subject" value="New inquiry from yen-digital site" />
            <button type="submit" className="btn-p" style={{ alignSelf: 'flex-start' }} disabled={submitting || submitted}>
                {submitted ? 'Submitted! We will get back to you shortly.' : submitting ? 'Sending…' : 'Send Message'}
            </button>
            <p className="ct-note">We&apos;ll respond within 48 hours. All inquiries handled with discretion.</p>
            {error && <p style={{ color: 'salmon', marginTop: '0.5rem' }}>{error}</p>}
        </form>
    )
}
