import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ContactsSection from './components/ContactsSection'
import Footer from './components/Footer'
import WelcomeAnimation from './components/WelcomeAnimation'

function App() {
  const lenisRef = useRef(null)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenisRef.current = lenis

    return () => lenis.destroy()
  }, [])

  return (
    <>
      {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}
      <Header />
      <main>
        <HeroSection delay={3000} />
        <AboutSection />
        <ProjectsSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  )
}

export default App
