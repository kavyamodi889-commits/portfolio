import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { projects } from '../../data/portfolioData'
import TiltCard from '../Common/TiltCard'
import './Projects.css'

/* ── Icons ─────────────────────────────────────────── */
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  )
}
function IconGithub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
function IconChevron({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .3s ease' }} aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

/* ── Spotlight Card — tracks mouse & renders glow ── */
function SpotlightCard({ children, className = '', style = {}, ...rest }) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPos((p) => ({ ...p, opacity: 0 }))
  }, [])

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Spotlight glow */}
      <div
        className="spotlight-card__glow"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: pos.opacity,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

/* ── Scroll-reveal wrapper ─────────────────────────── */
function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Category colour map ───────────────────────────── */
const CAT_COLORS = {
  'Web Application': { from: '#06b6d4', to: '#0891b2' },
  'Full-Stack': { from: '#8b5cf6', to: '#7c3aed' },
  'Desktop Application': { from: '#f59e0b', to: '#d97706' },
  'Business System': { from: '#10b981', to: '#059669' },
}
function getCatColor(cat) {
  return CAT_COLORS[cat] || { from: '#8b5cf6', to: '#06b6d4' }
}

/* ── Main Component ────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const categories = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return ['All', ...Object.keys(counts).filter((c) => c !== 'All')].map((c) => ({ name: c, count: counts[c] }))
  }, [])

  const filtered = useMemo(() =>
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      {/* Ambient background orbs */}
      <div className="projects__bg-orb projects__bg-orb--1" aria-hidden="true" />
      <div className="projects__bg-orb projects__bg-orb--2" aria-hidden="true" />

      <div className="container">
        <header className="section-header">
          <span className="section-label">Engineered Solutions</span>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
          <p className="section-subtitle">
            Production-grade systems and full-stack software built with performance, security, and clean architecture.
          </p>
        </header>

        {/* ── Filter Tabs ───────────────────── */}
        <div className="projects__filters" role="tablist" aria-label="Filter by category">
          {categories.map(({ name, count }) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={activeFilter === name}
              className={`pf-tab ${activeFilter === name ? 'pf-tab--active' : ''}`}
              onClick={() => { setActiveFilter(name); setExpandedId(null) }}
            >
              <span className="pf-tab__label">{name}</span>
              <span className="pf-tab__pill">{count}</span>
            </button>
          ))}
        </div>

        {/* ── Projects Grid ─────────────────── */}
        <div className="projects__grid" key={activeFilter}>
          {filtered.map((project, i) => {
            const isExpanded = expandedId === project.id
            const colors = getCatColor(project.category)
            const isLive = project.status === 'Active'
            const num = String(i + 1).padStart(2, '0')

            return (
              <RevealOnScroll key={project.id} delay={i * 80}>
                <SpotlightCard
                  className={`pc ${isExpanded ? 'pc--expanded' : ''}`}
                  style={{ '--from': colors.from, '--to': colors.to }}
                  id={project.id}
                  aria-labelledby={`pt-${project.id}`}
                >
                  {/* Gradient top accent bar */}
                  <div className="pc__accent" aria-hidden="true" />

                  {/* Card Number + Meta Row */}
                  <div className="pc__top">
                    <span className="pc__num" aria-hidden="true">{num}</span>
                    <div className="pc__badges">
                      <span className="pc__cat-badge" style={{ background: `${colors.from}18`, border: `1px solid ${colors.from}44`, color: colors.from }}>
                        {project.category}
                      </span>
                      {isLive
                        ? <span className="pc__status pc__status--live"><span className="pc__pulse" aria-hidden="true"/>Live</span>
                        : <span className="pc__status pc__status--done">Done</span>
                      }
                    </div>
                    {project.year && <span className="pc__year">{project.year}</span>}
                  </div>

                  {/* Title */}
                  <h3 className="pc__title" id={`pt-${project.id}`}>{project.title}</h3>

                  {/* Short description */}
                  <p className="pc__desc">{project.shortDescription}</p>

                  {/* Key Highlights */}
                  {project.highlights?.length > 0 && (
                    <ul className="pc__highlights">
                      {project.highlights.slice(0, 3).map((h) => (
                        <li key={h}><span className="pc__check" aria-hidden="true">✦</span>{h}</li>
                      ))}
                    </ul>
                  )}

                  {/* Expandable deep dive */}
                  {isExpanded && (
                    <div className="pc__deep" role="region" aria-label="Engineering details">
                      <div className="pc__deep-section">
                        <span className="pc__deep-label">◈ Architecture Overview</span>
                        <p className="pc__deep-text">{project.description}</p>
                      </div>
                      {project.highlights?.length > 3 && (
                        <div className="pc__deep-section">
                          <span className="pc__deep-label">◈ More Capabilities</span>
                          <ul className="pc__highlights">
                            {project.highlights.slice(3).map((h) => (
                              <li key={h}><span className="pc__check" aria-hidden="true">✦</span>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pc__footer">
                    {/* Action links */}
                    <div className="pc__links">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="pc__link pc__link--live" aria-label={`Live demo of ${project.title}`}>
                          <span>Live</span>
                          <IconArrow />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="pc__link pc__link--gh" aria-label={`Source code of ${project.title}`}>
                          <IconGithub />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    {/* Expand toggle */}
                    <button
                      type="button"
                      className="pc__expand-btn"
                      onClick={() => setExpandedId((p) => (p === project.id ? null : project.id))}
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Less' : 'Details'}</span>
                      <IconChevron open={isExpanded} />
                    </button>
                  </div>

                  {/* Tech stack */}
                  <div className="pc__tech" role="list" aria-label="Tech stack">
                    {project.tech.map((t) => (
                      <span key={t} className="pc__tag" role="listitem">{t}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            )
          })}
        </div>

        {/* Count bar */}
        <div className="projects__count-bar">
          <span className="projects__count-text">
            Showing <strong>{filtered.length}</strong> of <strong>{projects.length}</strong> projects
          </span>
          <div className="projects__count-line" style={{ width: `${(filtered.length / projects.length) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}
