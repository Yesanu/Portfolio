import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SVGithub, SVLink } from './icons'
import { socials } from '../data/socials'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
      const sections = ['hero', 'about', 'projects', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  function scrollToSection(e, href) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus()
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  function handleLogoClick(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`header-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(8, 8, 16, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="nav-logo inline-flex items-center gap-2 hover:opacity-85 transition-opacity duration-300"
            aria-label="Home"
          >
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              {/* Y — sharp angular with extended arms */}
              <path d="M3 3 L11 12 L19 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 12 L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              {/* S — flowing curve, aligned */}
              <path d="M21 5 C21 3 27 3 27 5.5 C27 8 21 9 21 12 C21 14.5 27 15.5 27 18 C27 20.5 21 20.5 21 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`nav-link text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? 'text-text' : 'text-text-muted hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hamburger SVG — transforms to X via CSS translate+rotate */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-hamburger md:hidden relative w-8 h-8 flex items-center justify-center z-50"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="overflow-visible">
              {/* Top bar → rotates 45deg and translates down to form \ */}
              <line
                x1="3" y1="5" x2="17" y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-all duration-300 ease-[0.16,1,0.3,1] origin-center ${
                  menuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              {/* Middle bar → fades + scales out */}
              <line
                x1="3" y1="10" x2="17" y2="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-all duration-200 ease-[0.16,1,0.3,1] ${
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
                style={{ transformOrigin: 'center' }}
              />
              {/* Bottom bar → rotates -45deg and translates up to form / */}
              <line
                x1="3" y1="15" x2="17" y2="15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-all duration-300 ease-[0.16,1,0.3,1] origin-center ${
                  menuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Dim backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Slide-in sidebar from the right */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-[280px] md:hidden flex flex-col"
            style={{
              background: 'rgba(14, 14, 20, 0.95)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
            }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
              <span className="text-text-muted text-[10px] tracking-[0.25em] uppercase">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text transition-colors rounded-full hover:bg-white/5"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links at top */}
            <div className="px-8 py-6 border-b border-border">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ x: 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 12, opacity: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`block py-3 text-base font-display tracking-wider border-b border-border/50 last:border-b-0 transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-text'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Social footer */}
            <div className="px-8 py-6 border-t border-border mt-auto">
              <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase mb-4">Connect</p>
              <div className="flex gap-4">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text transition-colors"
                  aria-label="GitHub"
                >
                  <SVGithub className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text transition-colors"
                  aria-label="LinkedIn"
                >
                  <SVLink className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
