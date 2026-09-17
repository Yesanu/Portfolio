import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion'
import { projects } from '../data/projects'
import { SVGithub, SVGExternalLink, SVGArrow as SVGArrowDown, SVGCross } from './icons'

const INITIAL_COUNT = 3

function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const controls = useAnimation()
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  const overlayRef = useRef(null)
  useEffect(() => {
    const el = overlayRef.current
    if (!el || !selectedProject) return
    const firstFocusable = el.querySelector('button, a[href]')
    if (firstFocusable) firstFocusable.focus()
    const handler = (e) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(el.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [selectedProject])

  const visibleProjects = projects.slice(0, visibleCount)

  function handleCardClick(project) {
    setSelectedProject(project)
  }

  function handleClose() {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="projects-section relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="projects-header mb-16"
        >
          <h2 className="projects-title font-display text-5xl md:text-6xl font-bold text-text">
            Projects
          </h2>
        </motion.div>

        <div className="projects-grid grid md:grid-cols-2 gap-4">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 48, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="project-card group rounded-xl overflow-hidden bg-surface border border-border hover:border-text/15 transition-all duration-400 cursor-pointer"
              onClick={() => handleCardClick(project)}
            >
              <div className="project-card-image aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img w-full h-full object-contain transition-transform duration-600 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="project-card-overlay absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              </div>
              <div className="project-card-body p-5">
                <div className="project-card-meta flex items-center justify-between mb-3">
                  <span className="project-card-year text-text-muted text-xs tracking-wider uppercase">
                    {project.year}
                  </span>
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="project-card-btn inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text border border-border hover:border-text/30 px-3 py-1.5 rounded-full transition-all duration-300"
                      >
                        <SVGExternalLink className="w-3 h-3" />
                        Visit Site
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="project-card-btn inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text border border-border hover:border-text/30 px-3 py-1.5 rounded-full transition-all duration-300"
                      >
                        <SVGithub className="w-3 h-3" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="project-card-title font-display text-lg font-semibold text-text mb-2 group-hover:text-text transition-colors">
                  {project.title}
                </h3>
                <p className="project-card-desc text-text-muted text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="project-card-tags flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="project-tag text-xs text-text-muted bg-surface-2 px-2 py-0.5 rounded-full border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleCount > 0 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={() =>
              setVisibleCount((c) =>
                c >= projects.length ? INITIAL_COUNT : Math.min(c + INITIAL_COUNT, projects.length)
              )
            }
            className="projects-show-more inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-text-muted hover:text-text hover:border-text/30 transition-all duration-300 text-sm font-medium"
          >
            {visibleCount >= projects.length ? 'Show Less' : 'Show More'}
            <SVGArrowDown className={`w-4 h-4 transition-transform duration-300 ${visibleCount >= projects.length ? 'rotate-180' : ''}`} />
          </button>
        </motion.div>

        {/* Project detail overlay — 2 kolom di desktop, 1 kolom di mobile */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="projects-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-overlay-title"
              ref={overlayRef}
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="projects-overlay-card w-full max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* 2 kolom di desktop, 1 kolom di mobile */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                  {/* Panel kiri: gambar */}
                  <div className="projects-overlay-image md:w-1/2 h-[280px] md:h-auto md:min-h-0 overflow-hidden bg-surface-2">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Panel kanan: detail */}
                  <div className="projects-overlay-body md:w-1/2 p-6 flex flex-col overflow-y-auto">
                    {/* Header: tahun + tombol close */}
                    <div className="projects-overlay-meta flex items-center justify-between mb-4">
                      <span className="projects-overlay-year text-text-muted text-xs tracking-wider uppercase">{selectedProject.year}</span>
                      <button
                        onClick={handleClose}
                        className="projects-overlay-close bg-text text-bg rounded-full p-3 hover:bg-text/90 transition-colors active:scale-95 md:bg-transparent md:text-text-muted md:hover:text-text md:hover:bg-white/5 md:p-2"
                        aria-label="Close"
                      >
                        <SVGCross className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Judul */}
                    <h3 id="project-overlay-title" className="projects-overlay-title font-display text-2xl md:text-3xl font-bold text-text mb-2">
                      {selectedProject.title}
                    </h3>

                    {/* Role */}
                    <p className="projects-overlay-role text-accent text-sm font-medium tracking-wide uppercase mb-4">
                      {selectedProject.role}
                    </p>

                    {/* Deskripsi */}
                    <p className="projects-overlay-desc text-text-muted text-sm leading-relaxed mb-6 flex-1">
                      {selectedProject.fullDescription}
                    </p>

                    {/* Tech stack tags */}
                    <div className="projects-overlay-tags flex flex-wrap gap-2 mb-6">
                      {selectedProject.techStack.map((tag) => (
                        <span key={tag} className="projects-overlay-tag text-xs text-text-muted bg-surface-2 px-3 py-1 rounded-full border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Aksi — hanya jika ada link/repo */}
                    {(selectedProject.link || selectedProject.repo) && (
                      <div className="projects-overlay-actions flex gap-3">
                        {selectedProject.link && (
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects-overlay-btn inline-flex items-center gap-2 px-5 py-3 bg-text text-bg font-semibold text-sm rounded-full hover:bg-white/90 transition-colors"
                          >
                            <SVGExternalLink className="w-4 h-4" />
                            Visit Site
                          </a>
                        )}
                        {selectedProject.repo && (
                          <a
                            href={selectedProject.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects-overlay-btn-secondary inline-flex items-center gap-2 px-5 py-3 border border-border text-text font-semibold text-sm rounded-full hover:border-text/30 transition-colors"
                          >
                            <SVGithub className="w-4 h-4" />
                            View on GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsSection
