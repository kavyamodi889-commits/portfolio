import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { projects } from '../../data/portfolioData'
import './Projects.css'

/* ── Rich Metadata & Live Interactive UI Simulation Data (Tripzia, Bhutan & Spatial 3D Inspired) ── */
const PROJECT_META = {
  'glovix-anand': {
    metric: 'Sub-Second CDN',
    metricSub: 'GLOBAL EDUCATION PORTAL',
    themeColor: '#ff5722',
    accentGrad: 'linear-gradient(135deg, #ff5722 0%, #ea580c 100%)',
    displayUrl: 'glovix.netlify.app',
    destinations: ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇪🇺 Europe'],
    statHighlight: '500+ Students Guided',
    specIcons: ['🌐 Global CDN', '⚡ Sub-80ms TTI', '📱 Responsive', '🎓 University DB', '🔒 SSL Secured'],
    bulletSpecs: [
      'Interactive Country & University Program Discovery Engine',
      'High-Conversion Visa Counselling & IELTS Coaching Lead Intake',
      'Automated Continuous Deployment Pipeline on Netlify Edge',
      'Ultra-Lightweight Component Tree with Zero Layout Shift',
    ],
    previewUI: {
      type: 'education',
      badge: 'TOP DESTINATIONS',
      sub: 'IELTS & VISA INTAKE ENGINE',
      accent: '#ff5722',
      metricVal: '500+',
      metricLbl: 'STUDENTS GUIDED',
      secVal: '99.4%',
      secLbl: 'VISA SUCCESS',
    },
  },
  'anugrah-accounting': {
    metric: '100% Uptime',
    metricSub: 'CHARTERED ADVISORY PORTAL',
    themeColor: '#06b6d4',
    accentGrad: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
    displayUrl: 'anugrah.gt.tc',
    destinations: ['📊 Tax Advisory', '💼 Corporate Audit', '📑 GST Filing', '🛡️ Compliance'],
    statHighlight: 'Sub-85ms Validation',
    specIcons: ['📊 FinTech', '🐘 PHP Core', '🗄️ MySQL ACID', '🛡️ Form Sanitize', '📑 Inquiry System'],
    bulletSpecs: [
      'Official Client Web Platform Engineered for Chartered Accounting Firm',
      'Dynamic PHP Consultation Scheduling & Inquiry Routing Engine',
      'Server-Side Validation with Zero-Data-Loss Transactional Protection',
      'Production Live Deployment in Bharuch with Sub-100ms Page Responses',
    ],
    previewUI: {
      type: 'accounting',
      badge: 'ADVISORY PLATFORM',
      sub: 'DYNAMIC CONSULTATION SYSTEM',
      accent: '#06b6d4',
      metricVal: 'Sub-85ms',
      metricLbl: 'PAGE VALIDATION',
      secVal: '100% ACID',
      secLbl: 'FORM INTEGRITY',
    },
  },
  'rangila-resto': {
    metric: 'Instant Booking',
    metricSub: 'DINING & HOSPITALITY UX',
    themeColor: '#f59e0b',
    accentGrad: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    displayUrl: 'rangila-resto.vercel.app',
    destinations: ['🍽️ Gourmet Menu', '🍷 Pairings', '🌿 Vegan Options', '📅 Table Booking'],
    statHighlight: 'Sub-60ms Routing',
    specIcons: ['🍽️ Interactive Menu', '📅 Table Booking', '⚡ React 19', '🚀 Vercel Edge', '🎨 Framer UI'],
    bulletSpecs: [
      'Interactive Cuisine Menu with Dynamic Dietary & Allergen Filtering',
      'Real-Time Table Reservation Intake Flow with Confirmation Feedback',
      'Atmospheric Gallery with Optimized High-Resolution Asset Loading',
      'Continuous Integration & Edge Delivery on Vercel Global Network',
    ],
    previewUI: {
      type: 'dining',
      badge: 'HOSPITALITY UX',
      sub: 'RESERVATION & MENU SYSTEM',
      accent: '#f59e0b',
      metricVal: '60 FPS',
      metricLbl: 'FLUID ROUTING',
      secVal: '100%',
      secLbl: 'RESERVATION FEEDBACK',
    },
  },
  'pixel-plus-media': {
    metric: '60 FPS Motion',
    metricSub: 'CREATIVE AGENCY SHOWCASE',
    themeColor: '#a855f7',
    accentGrad: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    displayUrl: 'pixelplusmedia.vercel.app',
    destinations: ['🎬 Brand Identity', '✨ Motion Graphics', '📐 Visual Strategy', '📱 Digital Media'],
    statHighlight: '100% Fluid Transitions',
    specIcons: ['🎬 Motion UI', '✨ Micro-Animations', '⚡ Framer Motion', '📐 Modern Layouts', '📱 Responsive'],
    bulletSpecs: [
      'Motion-Rich Agency Portfolio Featuring Smooth Scroll Interactivity',
      'Client Case Studies with Creative Deliverable Metrics & Timelines',
      'High-Performance Image Lazy Loading & Optimized Code-Split Bundles',
      'Fluid Micro-Transitions Built for High-Impact Visual Storytelling',
    ],
    previewUI: {
      type: 'media',
      badge: 'CREATIVE SHOWCASE',
      sub: 'MOTION DESIGN SYSTEM',
      accent: '#a855f7',
      metricVal: '60 FPS',
      metricLbl: 'SMOOTH RENDERING',
      secVal: 'Zero',
      secLbl: 'LAYOUT SHIFT',
    },
  },
  'bank-locker': {
    metric: 'ACID Secured',
    metricSub: 'ENTERPRISE VAULT SYSTEM',
    themeColor: '#10b981',
    accentGrad: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    displayUrl: 'enterprise-vault.internal',
    destinations: ['🔐 RBAC Security', '🏦 Locker Matrix', '📜 Immutable Logs', '👥 Staff Access'],
    statHighlight: 'Zero-Collision Lockers',
    specIcons: ['🔐 RBAC Security', '🏦 Locker Matrix', '🗄️ SQL ACID', '📜 Audit Trail', '💻 VB.NET Engine'],
    bulletSpecs: [
      'Role-Based Access Control (RBAC) Enforcing Strict Staff Tier Permissions',
      'Deterministic Safety Deposit Locker Occupancy & Key Allocation Matrix',
      'Normalized Relational Schema with Immutable Access History Audit Logs',
      '100% ACID Transactional Integrity on Every Custody & Release Operation',
    ],
    previewUI: {
      type: 'security',
      badge: 'ENTERPRISE VAULT',
      sub: 'ROLE-BASED ACCESS CONTROL',
      accent: '#10b981',
      metricVal: '100% ACID',
      metricLbl: 'ZERO TRANSACTION LOSS',
      secVal: '0.00%',
      secLbl: 'COLLISION RATE',
    },
  },
  'laundry-management': {
    metric: 'Automated Billing',
    metricSub: 'BUSINESS OPERATIONS ENGINE',
    themeColor: '#38bdf8',
    accentGrad: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
    displayUrl: 'laundry-ops.internal',
    destinations: ['🧺 Intake', '⚙️ In-Process', '✨ Ready for Pickup', '🧾 Invoiced'],
    statHighlight: 'Instant Invoice Print',
    specIcons: ['🧺 Order Intake', '🧾 Thermal Print', '💰 Tax Engine', '🗄️ Local DB', '📊 Sales Reports'],
    bulletSpecs: [
      'End-to-End Garment Intake, Washing/Ironing, and Handover Lifecycle Tracking',
      'Automated Pricing Engine with Custom Discounts, Surcharges & Tax Totals',
      'Thermal Printer-Ready Receipt & Invoice Generation with Barcodes',
      'Reliable Local SQL Record Store with Fast Multi-Filter Customer Lookups',
    ],
    previewUI: {
      type: 'operations',
      badge: 'OPERATIONS SUITE',
      sub: 'AUTOMATED INVOICING & INTAKE',
      accent: '#38bdf8',
      metricVal: 'Instant',
      metricLbl: 'THERMAL BILLING',
      secVal: '100%',
      secLbl: 'AUDIT ACCURACY',
    },
  },
  'streamverse-platform': {
    metric: 'Adaptive Bitrate',
    metricSub: 'FULL-STACK CLOUD PLATFORM',
    themeColor: '#ec4899',
    accentGrad: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    displayUrl: 'github.com/kavyamodi889-commits/youtube',
    destinations: ['🎥 4K Playback', '🐍 Python FastAPI', '🍃 MongoDB Atlas', '⚛️ React 19'],
    statHighlight: 'Sub-40ms Microservices',
    specIcons: ['🎥 Video Stream', '🐍 Python FastAPI', '🍃 MongoDB', '⚛️ React 19', '⚡ REST APIs'],
    bulletSpecs: [
      'Adaptive Bitrate Streaming with Automatic Dynamic Resolution Scaling',
      'Creator Studio with Video Metadata, Thumbnails & Channel Management',
      'Python FastAPI Recommendation Microservice for Personalized Feeds',
      'Full User Interaction Suite: Channel Subscriptions, Likes & Nested Comments',
    ],
    previewUI: {
      type: 'streaming',
      badge: 'VIDEO ARCHITECTURE',
      sub: 'FASTAPI + REACT 19 STREAM',
      accent: '#ec4899',
      metricVal: 'Sub-40ms',
      metricLbl: 'API LATENCY',
      secVal: '4K Ready',
      secLbl: 'DYNAMIC BITRATE',
    },
  },
  'bizbot-ai': {
    metric: 'Sub-30ms Intent',
    metricSub: 'AI & WHATSAPP AUTOMATION',
    themeColor: '#25d366',
    accentGrad: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
    displayUrl: 'bizbot.ai',
    destinations: ['💬 WhatsApp Cloud API', '🎙️ Web Speech STT', '📅 Slot Booking', '📊 CRM Telemetry'],
    statHighlight: '99.98% Gateway Uptime',
    specIcons: ['💬 WhatsApp API', '🤖 NLP Engine', '🎙️ Voice Input', '📅 Dynamic Booking', '📊 Webhook JSON'],
    bulletSpecs: [
      'Omnichannel Conversational Engine with Intent Detection & Contextual Slot-Filling',
      'Real-Time WhatsApp Cloud API Dispatch with Pre-Formatted Consultation Handoff',
      'Hands-Free Voice Dictation Powered by Browser Web Speech Recognition',
      'Automated Support Ticket Dispatch with Attachment Previews and CSV CRM Export',
    ],
    previewUI: {
      type: 'automation',
      badge: 'WHATSAPP GATEWAY',
      sub: 'CONVERSATIONAL SALES & CRM',
      accent: '#25d366',
      metricVal: 'Sub-30ms',
      metricLbl: 'INTENT CLASSIFY',
      secVal: '99.98%',
      secLbl: 'DISPATCH UPTIME',
    },
  },
}

/* ── SVG Icons ── */
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

function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN PROJECTS COMPONENT
   Synthesizing User References into an Original 3D Spatial Deck:
   • 3D Coverflow perspective stage (Ref 2 inspired)
   • Translucent floating holographic glass HUD cards (Ref 4 inspired)
   • Editorial Dark Architecture specs & highlights (Ref 3 inspired)
   • Arched window preview canvases & destination badges (Ref 1 inspired)
   ════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('specs') // 'specs' | 'architecture'
  const touchStartX = useRef(null)
  const deckRef = useRef(null)

  // Dynamic categories with project counts
  const categories = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return ['All', ...Object.keys(counts).filter((c) => c !== 'All')].map((c) => ({ name: c, count: counts[c] }))
  }, [])

  // Filtered project list
  const filtered = useMemo(() =>
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  // Clamped safe active index
  const safeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1))
  const activeProject = filtered[safeIndex] || filtered[0] || projects[0]
  const meta = PROJECT_META[activeProject.id] || PROJECT_META['glovix-anand']

  // Handle category switch
  const handleFilterChange = (categoryName) => {
    setActiveFilter(categoryName)
    setCurrentIndex(0)
  }

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
  }, [filtered.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
  }, [filtered.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
    touchStartX.current = null
  }

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      {/* Dynamic Ambient Background Glows */}
      <div
        className="projects__ambient-glow projects__ambient-glow--primary"
        style={{ background: `radial-gradient(circle, ${meta.themeColor}26 0%, transparent 68%)` }}
        aria-hidden="true"
      />
      <div className="projects__ambient-glow projects__ambient-glow--secondary" aria-hidden="true" />
      <div className="projects__bg-grid" aria-hidden="true" />

      <div className="container">

        {/* ── SECTION HEADER ── */}
        <header className="section-header">
          <div className="projects__header-badge">
            <span className="badge-spark">✦</span>
            <span>PRODUCTION SYSTEMS &amp; ARCHITECTURES</span>
            <span className="badge-spark">✦</span>
          </div>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
          <p className="section-subtitle">
            Explore live production web applications, enterprise ACID databases, and full-stack software engineered for sub-second responses, bulletproof security, and measurable client results.
          </p>
        </header>

        {/* ── CATEGORY FILTER PILL RAIL (Ref 2 Inspired) ── */}
        <div className="projects__filters-wrap">
          <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
            {categories.map(({ name, count }) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={activeFilter === name}
                className={`pf-tab ${activeFilter === name ? 'pf-tab--active' : ''}`}
                onClick={() => handleFilterChange(name)}
              >
                <span className="pf-tab__label">{name}</span>
                <span className="pf-tab__pill font-mono">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            VISUAL GALLERY DECK ("My Visual Diary" Inspired)
            Features prominent active card, flanking perspective cards,
            and sleek circular nav controls.
            ══════════════════════════════════════════════════════════ */}
        <div
          className="gallery-deck"
          ref={deckRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-stage">
            {filtered.map((proj, pIdx) => {
              const pMeta = PROJECT_META[proj.id] || PROJECT_META['glovix-anand']
              const offset = pIdx - safeIndex
              const isCenter = offset === 0
              const isLeft = offset === -1 || (safeIndex === 0 && offset === filtered.length - 1)
              const isRight = offset === 1 || (safeIndex === filtered.length - 1 && offset === -(filtered.length - 1))

              // Compute gallery position class
              let cardClass = 'gallery-card--hidden'
              if (isCenter) cardClass = 'gallery-card--center'
              else if (isLeft) cardClass = 'gallery-card--left'
              else if (isRight) cardClass = 'gallery-card--right'

              return (
                <article
                  key={proj.id}
                  className={`gallery-card ${cardClass}`}
                  onClick={() => {
                    if (isLeft || isRight) setCurrentIndex(pIdx)
                  }}
                  style={{
                    '--card-theme': pMeta.themeColor,
                    '--card-grad': pMeta.accentGrad,
                  }}
                  aria-hidden={!isCenter}
                >
                  {/* Top Window System Chrome */}
                  <div className="gallery-card__chrome">
                    <div className="gallery-chrome__dots" aria-hidden="true">
                      <span className="gallery-chrome__dot gallery-chrome__dot--red" />
                      <span className="gallery-chrome__dot gallery-chrome__dot--yellow" />
                      <span className="gallery-chrome__dot gallery-chrome__dot--green" />
                    </div>
                    <div className="gallery-chrome__url">
                      <span className="gallery-chrome__lock">🔒</span>
                      <span>{pMeta.displayUrl}</span>
                    </div>
                    <span className={`gallery-chrome__badge ${proj.status === 'Active' ? 'gallery-chrome__badge--live' : 'gallery-chrome__badge--prod'}`}>
                      {proj.status === 'Active' ? '● LIVE' : 'PROD'}
                    </span>
                  </div>

                  {/* Card Body & Dynamic UI Simulation */}
                  <div className="gallery-card__body">
                    <div className="gallery-card__glow-orb" aria-hidden="true" />

                    {/* Header */}
                    <div className="gallery-card__header">
                      <div>
                        <span className="gallery-card__cat" style={{ color: pMeta.themeColor }}>
                          {proj.category}
                        </span>
                        <h3 className="gallery-card__title">{proj.title}</h3>
                      </div>
                      <span className="gallery-card__year">{proj.year}</span>
                    </div>

                    {/* Capability Tags Rail */}
                    <div className="gallery-card__tags">
                      {pMeta.destinations.map((tag, tIdx) => (
                        <span key={tIdx} className="gallery-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dynamic Simulated App Screen Canvas */}
                    <div className="gallery-card__stats">
                      <div className="gallery-stats__top">
                        <span className="gallery-stats__badge" style={{ background: `${pMeta.themeColor}20`, color: pMeta.themeColor }}>
                          {pMeta.previewUI.badge}
                        </span>
                        <span className="gallery-stats__sub">{pMeta.previewUI.sub}</span>
                      </div>

                      <p className="gallery-stats__desc">{proj.shortDescription}</p>

                      <div className="gallery-stats__metrics">
                        <div className="gallery-metric">
                          <span className="gallery-metric__val" style={{ color: pMeta.themeColor }}>
                            {pMeta.previewUI.metricVal}
                          </span>
                          <span className="gallery-metric__lbl">{pMeta.previewUI.metricLbl}</span>
                        </div>
                        <div className="gallery-metric">
                          <span className="gallery-metric__val">
                            {pMeta.previewUI.secVal}
                          </span>
                          <span className="gallery-metric__lbl">{pMeta.previewUI.secLbl}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer System Watermark */}
                    <div className="gallery-card__footer">
                      <span className="gallery-footer__tag">
                        ENGINEERED BY KAVYA MODI · PATTERN LLC
                      </span>
                      <span className="gallery-footer__spark">✦</span>
                    </div>
                  </div>

                  {/* Floating Hologram Chip */}
                  <div className="gallery-card__chip">
                    <div className="gallery-chip__dot" style={{ background: pMeta.themeColor, boxShadow: `0 0 8px ${pMeta.themeColor}` }} />
                    <div className="gallery-chip__text">
                      <span className="gallery-chip__metric">{pMeta.metric}</span>
                      <span className="gallery-chip__sub">{pMeta.metricSub}</span>
                    </div>
                  </div>

                  {/* Flanking card hint overlay */}
                  {!isCenter && (
                    <div className="gallery-card__hint">
                      <span>Click to Focus</span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          {/* ── SLEEK CAROUSEL CONTROLS (Ref 2 Inspired) ── */}
          <div className="gallery-deck__nav">
            <button
              type="button"
              className="gallery-nav-btn gallery-nav-btn--prev"
              onClick={handlePrev}
              aria-label="Previous project"
              title="Previous project (←)"
            >
              <IconChevronLeft />
            </button>

            {/* Step Counter & Progress Indicator */}
            <div className="gallery-deck__progress">
              <span className="gallery-progress__curr">
                {String(safeIndex + 1).padStart(2, '0')}
              </span>
              <div className="gallery-progress__bar">
                <div
                  className="gallery-progress__fill"
                  style={{
                    width: `${((safeIndex + 1) / filtered.length) * 100}%`,
                    background: meta.themeColor,
                    boxShadow: `0 0 10px ${meta.themeColor}`,
                  }}
                />
              </div>
              <span className="gallery-progress__total">
                {String(filtered.length).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              className="gallery-nav-btn gallery-nav-btn--next"
              onClick={handleNext}
              aria-label="Next project"
              title="Next project (→)"
            >
              <IconChevronRight />
            </button>
          </div>

          {/* Interactive Pagination Step Dots */}
          <div className="gallery-deck__dots" role="tablist" aria-label="Project slide dots">
            {filtered.map((p, dIdx) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={dIdx === safeIndex}
                className={`gallery-dot ${dIdx === safeIndex ? 'gallery-dot--active' : ''}`}
                onClick={() => setCurrentIndex(dIdx)}
                title={p.title}
                style={dIdx === safeIndex ? { background: meta.themeColor, boxShadow: `0 0 8px ${meta.themeColor}` } : undefined}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SYNCHRONIZED TELEMETRY & ARCHITECTURE CONSOLE (Ref 3 Inspired)
            Directly synced with the active project in the 3D deck.
            ══════════════════════════════════════════════════════════ */}
        <div className="telemetry-console" key={activeProject.id}>
          {/* Header Bar */}
          <div className="telemetry__header">
            <div className="telemetry__index-wrap">
              <span className="telemetry__index font-mono">
                CASE STUDY {String(safeIndex + 1).padStart(2, '0')} // {String(filtered.length).padStart(2, '0')}
              </span>
              <span
                className="telemetry__cat-badge font-mono"
                style={{ color: meta.themeColor, borderColor: `${meta.themeColor}44`, background: `${meta.themeColor}14` }}
              >
                {activeProject.category}
              </span>
            </div>

            <span className="telemetry__verified-tag font-mono">
              VERIFIED ARCHITECTURE ✦
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="telemetry__title">{activeProject.title}</h3>
          <p className="telemetry__desc">{activeProject.description}</p>

          {/* Interactive Specs / Architecture Tabs */}
          <div className="telemetry__tabs" role="tablist">
            <button
              type="button"
              className={`telemetry__tab-btn ${activeTab === 'specs' ? 'telemetry__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              <span>◈ Verified Capabilities</span>
            </button>
            <button
              type="button"
              className={`telemetry__tab-btn ${activeTab === 'architecture' ? 'telemetry__tab-btn--active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <span>◆ System Highlights</span>
            </button>
          </div>

          {/* Tab Content 1: Capabilities */}
          {activeTab === 'specs' && (
            <div className="telemetry__specs-box animate-fade-in">
              <div className="telemetry__specs-metric-bar">
                <span className="telemetry__metric-val font-mono">{meta.metric}</span>
                <span className="telemetry__metric-sub font-mono">{meta.metricSub}</span>
              </div>

              <ul className="telemetry__specs-list">
                {meta.bulletSpecs.map((spec, sIdx) => (
                  <li key={sIdx} className="telemetry__spec-item">
                    <span className="telemetry__spec-icon" style={{ color: meta.themeColor }}>
                      <IconCheck />
                    </span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab Content 2: Architecture Highlights */}
          {activeTab === 'architecture' && (
            <div className="telemetry__specs-box animate-fade-in">
              <div className="telemetry__specs-metric-bar">
                <span className="telemetry__metric-val font-mono">Clean Architecture</span>
                <span className="telemetry__metric-sub font-mono">SEPARATION OF CONCERNS</span>
              </div>

              <ul className="telemetry__specs-list">
                {activeProject.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="telemetry__spec-item">
                    <span className="telemetry__spec-icon" style={{ color: meta.themeColor }}>
                      <IconCheck />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spec Icons Line (Ref 3 Horizontal Badges Reference) */}
          <div className="telemetry__icons-line">
            {meta.specIcons.map((ic, iIdx) => (
              <span key={iIdx} className="telemetry__icon-chip font-mono">{ic}</span>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="telemetry__tech-row" role="list" aria-label="Technologies used">
            {activeProject.tech.map((t) => (
              <span key={t} className="telemetry__tech-pill font-mono" role="listitem">{t}</span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="telemetry__actions">
            {activeProject.live && (
              <a
                href={activeProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="telemetry__btn telemetry__btn--primary"
                style={{ '--btn-theme': meta.themeColor }}
                aria-label={`Open live demo for ${activeProject.title}`}
              >
                <span>Launch Live System</span>
                <span className="btn-icon-wrap" aria-hidden="true">
                  <IconArrow />
                </span>
              </a>
            )}

            {activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="telemetry__btn telemetry__btn--gh"
                aria-label={`View GitHub repository for ${activeProject.title}`}
              >
                <span className="gh-icon-ring" aria-hidden="true">
                  <IconGithub />
                </span>
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            QUICK-SWITCH THUMBNAIL RAIL
            ══════════════════════════════════════════════════════════ */}
        <div className="project-rail" role="region" aria-label="Quick project switcher">
          <div className="project-rail__header">
            <span className="project-rail__label font-mono">SELECT SYSTEM CASE STUDY:</span>
            <span className="project-rail__count font-mono">{filtered.length} AVAILABLE</span>
          </div>

          <div className="project-rail__grid">
            {filtered.map((proj, pIdx) => {
              const isSelected = pIdx === safeIndex
              const pMeta = PROJECT_META[proj.id] || PROJECT_META['glovix-anand']

              return (
                <button
                  key={proj.id}
                  type="button"
                  className={`project-rail__card ${isSelected ? 'project-rail__card--active' : ''}`}
                  onClick={() => setCurrentIndex(pIdx)}
                  aria-pressed={isSelected}
                  style={{ '--card-accent': pMeta.themeColor }}
                >
                  <div className="rail-card__top">
                    <span className="rail-card__num font-mono">{String(pIdx + 1).padStart(2, '0')}</span>
                    <span className={`rail-card__status ${proj.status === 'Active' ? 'rail-card__status--live' : ''}`}>
                      {proj.status === 'Active' ? '● LIVE' : 'PROD'}
                    </span>
                  </div>

                  <h4 className="rail-card__title">{proj.title}</h4>
                  <p className="rail-card__category font-mono">{proj.category}</p>

                  <div className="rail-card__bottom">
                    <span className="rail-card__metric font-mono">{pMeta.metric}</span>
                    <span className="rail-card__arrow">→</span>
                  </div>

                  {isSelected && <div className="rail-card__active-beam" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Count Bar */}
        <div className="projects__count-bar">
          <span className="projects__count-text">
            Showing <strong>{filtered.length}</strong> of <strong>{projects.length}</strong> production-verified systems
          </span>
          <div className="projects__count-line" style={{ width: `${(filtered.length / projects.length) * 100}%` }} />
        </div>

      </div>
    </section>
  )
}
