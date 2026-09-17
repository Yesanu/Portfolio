import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { socials } from '../data/socials'
import { SVGithub, SVLink } from './icons'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mljeqwyd'

function ContactsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // reset sent state when section scrolls back into view
  }, [inView])

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      form.reset()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact-section relative py-32">
      <div className="contact-section-accent absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 56, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="contact-label text-text-muted text-xs font-medium tracking-[0.35em] uppercase block text-center mb-6">
            Contact
          </span>

          <h2 className="contact-title font-display text-5xl md:text-6xl font-bold text-text text-center mb-4">
            Let&apos;s Work
            <br />
            <span className="italic font-light">Together</span>
          </h2>

          <p className="contact-bio text-text-muted text-base leading-relaxed max-w-sm mx-auto text-center mb-12">
            Have a project idea or want to collaborate? Feel free to reach out.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                  className="contact-input w-full px-5 py-3.5 bg-surface border border-border rounded-full text-text placeholder-text-muted/50 text-sm focus:outline-none focus:border-text/30 transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  placeholder="Your email"
                  className="contact-input w-full px-5 py-3.5 bg-surface border border-border rounded-full text-text placeholder-text-muted/50 text-sm focus:outline-none focus:border-text/30 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                placeholder="Tell me about your project…"
                className="contact-input w-full px-5 py-3.5 bg-surface border border-border rounded-2xl text-text placeholder-text-muted/50 text-sm focus:outline-none focus:border-text/30 transition-colors duration-300 resize-none"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={sending}
                className="contact-btn inline-flex items-center gap-2 px-7 py-3.5 bg-text text-bg font-semibold text-sm tracking-wide rounded-full hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {sending ? 'Sending…' : sent ? 'Sent ✓' : 'Send Message'}
              </button>
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </div>
          </form>

          {sent && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-text-muted text-sm text-center mb-8"
            >
              Thanks! I&apos;ll get back to you soon.
            </motion.p>
          )}

          <div className="contact-links flex justify-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link inline-flex items-center gap-2.5 px-5 py-3 border border-border rounded-full text-text hover:border-text/30 hover:bg-white/5 transition-all duration-300 text-sm font-medium"
            >
              <SVGithub className="w-4 h-4 text-text-muted" />
              GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link inline-flex items-center gap-2.5 px-5 py-3 border border-border rounded-full text-text hover:border-text/30 hover:bg-white/5 transition-all duration-300 text-sm font-medium"
            >
              <SVLink className="w-4 h-4 text-text-muted" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactsSection
