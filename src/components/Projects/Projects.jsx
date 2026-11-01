import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { projects } from '../../data/portfolioData'
import './Projects.css'

/* ── Rich Metadata Map for Reference Design (Bhutan Specs & Metrics) ── */
const PROJECT_META = {
  'glovix-anand': {
    metric: 'Sub-Second CDN',
    metricSub: 'GLOBAL EDUCATION PORTAL',
    themeColor: '#ff5722',
    accentGrad: 'linear-gradient(135deg, #ff5722, #ea580c)',
    displayUrl: 'glovix.netlify.app',
    specIcons: ['🌐 Global CDN', '⚡ Sub-80ms', '📱 Responsive', '🎓 University DB', '🔒 SSL Secured'],
    bulletSpecs: [
      'Interactive Country & University Discovery Catalog',
      'High-Conversion Visa & IELTS Student Intake Funnel',
      'Continuous Production Deployment on Netlify',
      'Fluid Component Architecture with Sub-Second TTI',
    ],
  },
  'anugrah-accounting': {
    metric: '100% Uptime',
    metricSub: 'CHARTERED ADVISORY PORTAL',
    themeColor: '#06b6d4',
    accentGrad: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    displayUrl: 'anugrah.gt.tc',
    specIcons: ['📊 FinTech', '🐘 PHP Core', '🗄️ MySQL DB', '🛡️ Form Sanitize', '📑 Inquiry System'],
    bulletSpecs: [
      'Official Client Website for Chartered Accounting Firm',
      'Dynamic PHP Consultation Scheduling & Inquiry Engine',
      'Server-Side Validation with Zero-Data-Loss Protection',
      'Production Deployment with Sub-100ms Page Responses',
    ],
  },
  'rangila-resto': {
    metric: 'Instant Booking',
    metricSub: 'DINING & HOSPITALITY UX',
    themeColor: '#f59e0b',
    accentGrad: 'linear-gradient(135deg, #f59e0b, #d97706)',
    displayUrl: 'rangila-resto.vercel.app',
    specIcons: ['🍽️ Interactive Menu', '📅 Table Booking', '⚡ React 19', '🚀 Vercel Edge', '🎨 Framer UI'],
    bulletSpecs: [
      'Interactive Cuisine Menu with Dynamic Dietary Filtering',
      'Real-Time Table Reservation Intake & Schedule Flow',
      'Atmospheric Gallery with Optimized High-Res Imagery',
      'Continuous Integration & Deployment on Vercel Edge',
    ],
  },
  'pixel-plus-media': {
    metric: '60 FPS Motion',
    metricSub: 'CREATIVE AGENCY SHOWCASE',
    themeColor: '#a855f7',
    accentGrad: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    displayUrl: 'pixelplusmedia.vercel.app',
    specIcons: ['🎬 Motion UI', '✨ Micro-Animations', '⚡ Framer Motion', '📐 Modern Layouts', '📱 100% Responsive'],
    bulletSpecs: [
      'Motion-Rich Agency Portfolio with Smooth Entrances',
      'Client Case Studies with Creative Deliverable Metrics',
      'High-Performance Image Lazy Loading & Optimized Bundles',
      'Fluid Micro-Transitions Built for High-Impact Branding',
    ],
  },
  'bank-locker': {
    metric: 'ACID Secured',
    metricSub: 'ENTERPRISE VAULT SYSTEM',
    themeColor: '#10b981',
    accentGrad: 'linear-gradient(135deg, #10b981, #059669)',
    displayUrl: 'enterprise-vault.internal',
    specIcons: ['🔐 RBAC Security', '🏦 Locker Matrix', '🗄️ SQL ACID', '📜 Audit Trail', '💻 VB.NET Engine'],
    bulletSpecs: [
      'Role-Based Access Control (RBAC) for Branch Staff & Auditors',
      'Deterministic Locker Occupancy Matrix & Key Allocation',
      'Normalized Relational Schema with Immutable Access Logs',
      '100% ACID Transactional Integrity on All Custody Actions',
    ],
  },
  'laundry-management': {
    metric: 'Automated Billing',
    metricSub: 'BUSINESS OPERATIONS ENGINE',
    themeColor: '#38bdf8',
    accentGrad: 'linear-gradient(135deg, #38bdf8, #0284c7)',
    displayUrl: 'laundry-ops.internal',
    specIcons: ['🧺 Order Intake', '🧾 Thermal Print', '💰 Tax Engine', '🗄️ Local DB', '📊 Sales Reports'],
    bulletSpecs: [
      'End-to-End Garment Intake, Processing & Handover Lifecycle',
      'Automated Pricing, Discount & Tax Calculation Engine',
      'Thermal Printer-Ready Receipt & Invoice Generation',
      'Reliable Local SQL Record Store with Fast Lookups',
    ],
  },
  'streamverse-platform': {
    metric: 'Adaptive Bitrate',
    metricSub: 'FULL-STACK CLOUD PLATFORM',
    themeColor: '#ec4899',
    accentGrad: 'linear-gradient(135deg, #ec4899, #be185d)',
    displayUrl: 'github.com/kavyamodi889-commits/youtube',
    specIcons: ['🎥 Video Stream', '🐍 Python FastAPI', '🍃 MongoDB', '⚛️ React 19', '⚡ REST Microservices'],
    bulletSpecs: [
      'Adaptive Video Playback with Chunked Buffering',
      'User Channels, Subscriptions & Nested Comment Threads',
      'Python FastAPI Recommendation Microservice Integration',
      'Creator Studio with Video Metadata & Upload Management',
    ],
  },
}

/* ── Icons ─────────────────────────────────────────── */
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

/* ── Mouse Spotlight Card ─────────────────────────── */
function SpotlightCard({ children, className = '', style = {}, ...rest }) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 })
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
      <div
        className="spotlight-card__glow"
        style={{ left: pos.x, top: pos.y, opacity: pos.opacity }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

/* ── Category Colors ──────────────────────────────── */
const CAT_COLORS = {
  'Web Application': { from: '#ff5722', to: '#ea580c' },
  'Full-Stack Platform': { from: '#ec4899', to: '#be185d' },
  'Enterprise System': { from: '#10b981', to: '#059669' },
  'Business Software': { from: '#06b6d4', to: '#0284c7' },
}
function getCatColor(cat) {
  return CAT_COLORS[cat] || { from: '#ff5722', to: '#ea580c' }
}

/* ═══════════════════════════════════════════════════
   MAIN PROJECTS COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState('coverflow') // 'coverflow' | 'grid'
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState(null)
  const touchStartXRef = useRef(null)

  const categories = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return ['All', ...Object.keys(counts).filter((c) => c !== 'All')].map((c) => ({ name: c, count: counts[c] }))
  }, [])

  const filtered = useMemo(() =>
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  // Ensure active index is within bounds when filter changes
  useEffect(() => {
    setActiveIndex(0)
  }, [activeFilter])

  // Keyboard navigation for coverflow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'coverflow') return
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode, filtered.length])

  const goNext = () => {
    setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
  }

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const diff = touchStartXRef.current - e.changedTouches[0].clientX
    if (diff > 50) goNext()
    if (diff < -50) goPrev()
    touchStartXRef.current = null
  }

  const activeProject = filtered[activeIndex] || filtered[0]
  const activeMeta = activeProject ? (PROJECT_META[activeProject.id] || PROJECT_META['glovix-anand']) : null

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      {/* Ambient background glows */}
      <div className="projects__bg-orb projects__bg-orb--1" aria-hidden="true" />
      <div className="projects__bg-orb projects__bg-orb--2" aria-hidden="true" />
      <div className="projects__bg-grid" aria-hidden="true" />

      <div className="container">
        {/* ── SECTION HEADER ── */}
        <header className="section-header">
          <span className="section-label">Engineered Systems Portfolio</span>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
          <p className="section-subtitle">
            High-performance production systems, client advisory web platforms, and fault-tolerant full-stack software.
          </p>
        </header>

        {/* ── TOP CONTROLS ROW: FILTERS + VIEW MODE TOGGLE (REFERENCE DESIGN) ── */}
        <div className="projects__controls-bar">
          {/* Category Filter Pills */}
          <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
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

          {/* View Mode Toggle: 3D Coverflow vs Architectural Grid */}
          <div className="projects__view-toggle" role="group" aria-label="Project view mode">
            <button
              type="button"
              className={`projects__view-btn ${viewMode === 'coverflow' ? 'projects__view-btn--active' : ''}`}
              onClick={() => setViewMode('coverflow')}
              title="3D Coverflow Showcase View"
            >
              <span className="projects__view-btn-icon">✦</span>
              <span>3D Coverflow</span>
            </button>
            <button
              type="button"
              className={`projects__view-btn ${viewMode === 'grid' ? 'projects__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Architectural Grid View"
            >
              <span className="projects__view-btn-icon">⊞</span>
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MODE 1: 3D COVERFLOW SHOWCASE (INSPIRED BY REFERENCE 1)
            ══════════════════════════════════════════════════════════ */}
        {viewMode === 'coverflow' && (
          <div
            className="p-coverflow"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="3D Project Showcase"
          >
            {/* 3D Perspective Stage */}
            <div className="p-coverflow__stage">
              {filtered.map((proj, idx) => {
                const offset = idx - activeIndex
                const isCenter = offset === 0
                const isLeft = offset === -1
                const isRight = offset === 1
                const isFarLeft = offset < -1
                const isFarRight = offset > 1
                const meta = PROJECT_META[proj.id] || PROJECT_META['glovix-anand']
                const colors = getCatColor(proj.category)

                // Skip rendering cards far outside viewport to keep DOM light
                if (Math.abs(offset) > 2) return null

                return (
                  <div
                    key={proj.id}
                    className={`p-coverflow__card-wrapper ${
                      isCenter ? 'p-coverflow__card-wrapper--center' :
                      isLeft ? 'p-coverflow__card-wrapper--left' :
                      isRight ? 'p-coverflow__card-wrapper--right' :
                      isFarLeft ? 'p-coverflow__card-wrapper--far-left' :
                      'p-coverflow__card-wrapper--far-right'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      '--theme-color': meta.themeColor || colors.from,
                      '--accent-grad': meta.accentGrad || `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Project: ${proj.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveIndex(idx) }}
                  >
                    <div className="p-coverflow__card">
                      {/* Browser Mockup Chrome Header */}
                      <div className="p-mockup__chrome">
                        <div className="p-mockup__dots" aria-hidden="true">
                          <span className="p-mockup__dot p-mockup__dot--red" />
                          <span className="p-mockup__dot p-mockup__dot--yellow" />
                          <span className="p-mockup__dot p-mockup__dot--green" />
                        </div>
                        <div className="p-mockup__address-bar">
                          <span className="p-mockup__lock-icon">🔒</span>
                          <span className="p-mockup__url font-mono">{meta.displayUrl}</span>
                        </div>
                        <span className={`p-mockup__status ${proj.status === 'Active' ? 'p-mockup__status--active' : ''}`}>
                          {proj.status === 'Active' ? '● LIVE' : '✓ PRODUCTION'}
                        </span>
                      </div>

                      {/* Visual Graphic Banner / UI Screen Canvas */}
                      <div className="p-mockup__screen">
                        <div className="p-mockup__ambient-glow" aria-hidden="true" />
                        <div className="p-mockup__screen-content">
                          <span className="p-mockup__screen-tag font-mono">{proj.category}</span>
                          <h3 className="p-mockup__screen-title">{proj.title}</h3>
                          <div className="p-mockup__screen-badge font-mono">
                            <span className="p-mockup__badge-spark">✦</span>
                            <span>{meta.metric}</span>
                            <span className="p-mockup__badge-sub">{meta.metricSub}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Body: Bhutan-Inspired Frosted HUD Specs & Bullets */}
                      <div className="p-card__body">
                        <p className="p-card__desc">{proj.shortDescription}</p>

                        {/* Bullet Specs (Reference 2 Bhutan Style) */}
                        <div className="p-card__specs-box">
                          <span className="p-card__specs-label font-mono">CORE CAPABILITIES &amp; OUTCOMES:</span>
                          <ul className="p-card__specs-list">
                            {meta.bulletSpecs.map((spec, sIdx) => (
                              <li key={sIdx} className="p-card__spec-item">
                                <span className="p-card__spec-bullet" aria-hidden="true">◆</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Capability Badges Line (Reference 2 Icons Line) */}
                        <div className="p-card__icons-line">
                          {meta.specIcons.map((ic, iIdx) => (
                            <span key={iIdx} className="p-card__icon-badge font-mono">{ic}</span>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="p-card__tech-row" role="list" aria-label="Technologies used">
                          {proj.tech.map((t) => (
                            <span key={t} className="p-card__tech-pill font-mono" role="listitem">{t}</span>
                          ))}
                        </div>

                        {/* Action Link Buttons */}
                        <div className="p-card__actions">
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-btn p-btn--primary"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Open live platform for ${proj.title}`}
                            >
                              <span>Explore Live Platform</span>
                              <IconArrow />
                            </a>
                          )}
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-btn p-btn--gh"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`View source code on GitHub for ${proj.title}`}
                            >
                              <IconGithub />
                              <span>Source Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── 3D COVERFLOW BOTTOM CONTROLS (REFERENCE 1 ARROWS + METRICS) ── */}
            <div className="p-coverflow__controls">
              {/* Prev Button */}
              <button
                type="button"
                className="p-nav-btn p-nav-btn--prev"
                onClick={goPrev}
                aria-label="Previous project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Pagination Dots & Position Display */}
              <div className="p-coverflow__dots">
                {filtered.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`p-dot ${dotIdx === activeIndex ? 'p-dot--active' : ''}`}
                    onClick={() => setActiveIndex(dotIdx)}
                    aria-label={`Jump to project ${dotIdx + 1}`}
                  />
                ))}
                <span className="p-coverflow__counter font-mono">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
              </div>

              {/* Next Button */}
              <button
                type="button"
                className="p-nav-btn p-nav-btn--next"
                onClick={goNext}
                aria-label="Next project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODE 2: ARCHITECTURAL HIGH-DENSITY GRID VIEW
            ══════════════════════════════════════════════════════════ */}
        {viewMode === 'grid' && (
          <div className="projects__grid animate-fade-in" key={activeFilter}>
            {filtered.map((project, i) => {
              const isExpanded = expandedId === project.id
              const meta = PROJECT_META[project.id] || PROJECT_META['glovix-anand']
              const colors = getCatColor(project.category)
              const isLive = project.status === 'Active'
              const num = String(i + 1).padStart(2, '0')

              return (
                <SpotlightCard
                  key={project.id}
                  className={`pc ${isExpanded ? 'pc--expanded' : ''}`}
                  style={{
                    '--from': colors.from,
                    '--to': colors.to,
                    '--theme-color': meta.themeColor || colors.from,
                  }}
                  id={project.id}
                  aria-labelledby={`pt-${project.id}`}
                >
                  {/* Top Laser Accent */}
                  <div className="pc__accent" aria-hidden="true" />

                  {/* Card Number & Header Row */}
                  <div className="pc__top">
                    <span className="pc__num font-mono" aria-hidden="true">{num}</span>
                    <div className="pc__badges">
                      <span className="pc__cat-badge" style={{ background: `${colors.from}18`, border: `1px solid ${colors.from}44`, color: colors.from }}>
                        {project.category}
                      </span>
                      {isLive ? (
                        <span className="pc__status pc__status--live">
                          <span className="pc__pulse" aria-hidden="true" />
                          Live
                        </span>
                      ) : (
                        <span className="pc__status pc__status--done">Production</span>
                      )}
                    </div>
                    {project.year && <span className="pc__year font-mono">{project.year}</span>}
                  </div>

                  {/* Title & Metric Pill */}
                  <h3 className="pc__title" id={`pt-${project.id}`}>{project.title}</h3>
                  <div className="pc__metric-badge font-mono">
                    <span className="pc__metric-dot" />
                    <span>{meta.metric}</span>
                    <span className="pc__metric-sub">{meta.metricSub}</span>
                  </div>

                  {/* Description */}
                  <p className="pc__desc">{project.shortDescription}</p>

                  {/* Feature Bullets (Bhutan Style) */}
                  <ul className="pc__highlights">
                    {meta.bulletSpecs.slice(0, 3).map((h, hIdx) => (
                      <li key={hIdx}>
                        <span className="pc__check" aria-hidden="true">◆</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Deep Dive */}
                  {isExpanded && (
                    <div className="pc__deep animate-fade-in" role="region" aria-label="Engineering details">
                      <div className="pc__deep-section">
                        <span className="pc__deep-label">◈ Architecture &amp; Methodology</span>
                        <p className="pc__deep-text">{project.description}</p>
                      </div>
                      <div className="pc__deep-section">
                        <span className="pc__deep-label">◈ Verified Capabilities</span>
                        <ul className="pc__highlights">
                          {meta.bulletSpecs.map((spec, sIdx) => (
                            <li key={sIdx}><span className="pc__check">✦</span>{spec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Card Actions Footer */}
                  <div className="pc__footer">
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
                      <span key={t} className="pc__tag font-mono" role="listitem">{t}</span>
                    ))}
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        )}

        {/* Count bar */}
        <div className="projects__count-bar">
          <span className="projects__count-text">
            Displaying <strong>{filtered.length}</strong> of <strong>{projects.length}</strong> verified software solutions
          </span>
          <div className="projects__count-line" style={{ width: `${(filtered.length / projects.length) * 100}%` }} />
        </div>
      </div>
    </section>
  )
}
