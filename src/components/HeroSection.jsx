import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import profile1 from '../assets/profile1.png'
import { SVGArrow } from './icons'

function useTypewriter(words, typeSpeed = 80, pauseDuration = 3000, deleteSpeed = 40) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    function type() {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
          timeoutRef.current = setTimeout(type, typeSpeed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
          timeoutRef.current = setTimeout(type, deleteSpeed)
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }

    timeoutRef.current = setTimeout(type, typeSpeed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, currentWordIndex, isDeleting, words, typeSpeed, pauseDuration, deleteSpeed])

  return displayText
}

function HeroSection({ delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const controls = useAnimation()
  const [profileVisible, setProfileVisible] = useState(false)
  const roleText = useTypewriter(
    ['Front-End Developer.', 'UI/UX Designer.', 'Back-End Developer.'],
    80, 3000, 40
  )

  useEffect(() => {
    if (inView && delay > 0) {
      const t = setTimeout(() => controls.start('visible'), delay)
      const t2 = setTimeout(() => setProfileVisible(true), delay + 500)
      return () => { clearTimeout(t); clearTimeout(t2) }
    } else if (inView) {
      controls.start('visible')
      setProfileVisible(true)
    }
  }, [inView, controls, delay])

  function scrollToContact(e) {
    e.preventDefault()
    const target = document.querySelector('#contact')
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus()
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <div
        className="hero-glow absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 60, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
          className="hero-visual relative h-[280px] md:h-[320px] lg:h-[520px] w-full order-first lg:order-last mb-6 md:mb-8 lg:mb-0"
        >
          <div className="hero-profile-shadow" aria-hidden="true"></div>
          <motion.img
            src={profile1}
            alt="Portrait of Yehezkiel Satya Nugroho"
            className="hero-profile-img"
            loading="eager"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={profileVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
          }}
          className="hero-text"
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }} className="hero-greeting text-text-muted text-[10px] md:text-xs font-medium tracking-[0.3em] md:tracking-[0.35em] uppercase mb-4 md:mb-6">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }} className="hero-name font-display text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-text leading-[0.95] mb-2 md:mb-3">
            YEHEZKIEL
          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 } } }} className="hero-name-sub font-display text-lg md:text-xl lg:text-3xl xl:text-4xl font-light text-text-muted tracking-[0.12em] md:tracking-[0.15em] uppercase mb-5 md:mb-8">
            Satya Nugroho
          </motion.p>

          <motion.p variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 } } }} className="hero-bio text-text-muted text-sm md:text-base lg:text-lg leading-relaxed max-w-md mb-8 md:mb-12">
            Crafting the front, powering the back, designing the experience as a <span className="text-text font-medium">{roleText}</span><span className="inline-block w-0.5 h-5 bg-text-muted ml-0.5 align-middle animate-pulse" />
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 } } }} className="hero-cta-group flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="hero-cta-btn hero-cta-btn-primary inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-4 bg-text text-bg font-semibold text-sm tracking-wide rounded-full hover:bg-white/90 transition-all duration-300"
            >
              Contact Me
              <SVGArrow className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

      </div>

    </section>
  )
}

export default HeroSection
