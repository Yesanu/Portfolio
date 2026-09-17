import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data/about'
import { IconEducation, IconBook, IconBuilding, IconBriefcase } from './AboutIcons'

function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const eduIcons = [
    { Icon: IconBook, label: 'Education' },
    { Icon: IconEducation, label: 'Further Study' },
  ]

  const expIcons = [
    { Icon: IconBriefcase, label: 'Project' },
  ]

  return (
    <section id="about" className="about-section relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="about-timeline grid md:grid-cols-2 gap-16"
        >
          <div className="about-timeline-left">
            <h3 className="about-timeline-label text-text-muted text-xs font-medium tracking-[0.25em] uppercase mb-10 flex items-center gap-3">
              <span className="about-timeline-icon flex items-center justify-center w-7 h-7 rounded-lg bg-surface-2 border border-border text-text-muted">
                <IconBook className="w-3.5 h-3.5" />
              </span>
              Education
            </h3>
            <div className="about-timeline-track space-y-8">
              {about.education.map((edu, i) => {
                const Icon = eduIcons[i]?.Icon ?? IconBook
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -40, scale: 0.96 }}
                    animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="about-timeline-item relative pl-8 border-l border-border hover:border-text/20 transition-colors duration-500"
                  >
                    <span className="about-timeline-marker absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-surface border border-text/30" />
                    <div className="about-timeline-icon-badge flex items-center gap-2 mb-2">
                      <span className="about-timeline-icon-sm text-text-muted/50">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="about-timeline-period text-text-muted text-xs font-medium tracking-wider uppercase">
                        {edu.period}
                      </span>
                    </div>
                    <h4 className="about-timeline-title font-display text-xl font-semibold text-text mb-1">
                      {edu.title}
                    </h4>
                    <p className="about-timeline-institution text-text-muted text-sm mb-2">
                      {edu.institution}
                    </p>
                    <p className="about-timeline-desc text-text-muted text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="about-timeline-right">
            <h3 className="about-timeline-label text-text-muted text-xs font-medium tracking-[0.25em] uppercase mb-10 flex items-center gap-3">
              <span className="about-timeline-icon flex items-center justify-center w-7 h-7 rounded-lg bg-surface-2 border border-border text-text-muted">
                <IconBriefcase className="w-3.5 h-3.5" />
              </span>
              Experience
            </h3>
            <div className="about-timeline-track space-y-8">
              {about.experience.map((exp, i) => {
                const Icon = expIcons[i]?.Icon ?? IconBuilding
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40, scale: 0.96 }}
                    animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="about-timeline-item about-timeline-item-right relative pl-8 border-l border-border hover:border-text/20 transition-colors duration-500"
                  >
                    <span className="about-timeline-marker absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-surface border border-text/30" />
                    <div className="about-timeline-icon-badge flex items-center gap-2 mb-2">
                      <span className="about-timeline-icon-sm text-text-muted/50">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="about-timeline-period text-text-muted text-xs font-medium tracking-wider uppercase">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="about-timeline-title font-display text-xl font-semibold text-text mb-1">
                      {exp.title}
                    </h4>
                    <p className="about-timeline-institution text-text-muted text-sm mb-2">
                      {exp.institution}
                    </p>
                    <p className="about-timeline-desc text-text-muted text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
