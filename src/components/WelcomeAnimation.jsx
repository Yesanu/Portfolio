import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const OVERLAY = {
  initial: { y: 0, opacity: 1 },
  exit:    { y: '-100%', opacity: 0 },
}

const CURTAIN = {
  initial: { y: '100%' },
  animate: { y: '-100%' },
}

const TEXT = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden:  { opacity: 0, y: -20 },
}

function WelcomeAnimation({ onComplete }) {
  const [textState, setTextState] = useState('initial')
  const [exitState, setExitState] = useState('initial')

  useEffect(() => {
    const t1 = setTimeout(() => setTextState('visible'), 80)
    const t2 = setTimeout(() => setTextState('hidden'), 2000)
    const t3 = setTimeout(() => setExitState('exit'), 2100)
    const t4 = setTimeout(onComplete, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [onComplete])

  const isExiting = exitState === 'exit'

  return (
    <motion.div
      variants={OVERLAY}
      initial="initial"
      animate={exitState}
      transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        willChange: 'transform, opacity',
      }}
    >
      <motion.div
        variants={TEXT}
        initial="initial"
        animate={textState}
        transition={{ duration: textState === 'visible' ? 0.6 : 0.35 }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 8vw, 4.5rem)',
          fontWeight: 700,
          color: '#0e0e14',
        }}
      >
        Hello!
      </motion.div>
      <motion.div
        variants={CURTAIN}
        initial="initial"
        animate={isExiting ? 'animate' : 'initial'}
        transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1], delay: 0.05 }}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '200%', background: '#ffffff' }}
      />
    </motion.div>
  )
}

export default WelcomeAnimation
