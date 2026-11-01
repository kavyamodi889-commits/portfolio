import { useState, useMemo, useCallback } from 'react'
import { projects } from '../../data/portfolioData'
import './Projects.css'

/* ── Rich Metadata & Live Interactive UI Simulation Data (Tripzia & Bhutan Inspired) ── */
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
    },
  },
};

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

/* ════════════════════════════════════════════════════════════════
   MAIN PROJECTS COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTab, setActiveTab] = useState('specs') // 'specs' | 'architecture'

  const categories = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return ['All', ...Object.keys(counts).filter((c) => c !== 'All')].map((c) => ({ name: c, count: counts[c] }))
  }, [])

  const filtered = useMemo(() =>
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  // Ensure active project exists in filtered list
  const activeProject = useMemo(() => {
    return filtered.find((p) => p.id === activeId) || filtered[0] || projects[0]
  }, [filtered, activeId])

  const meta = PROJECT_META[activeProject.id] || PROJECT_META['glovix-anand']
  const activeIndex = projects.findIndex((p) => p.id === activeProject.id)

  const handleSelectProject = useCallback((id) => {
    setActiveId(id)
  }, [])

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      {/* Ambient background glows */}
      <div className="projects__bg-orb projects__bg-orb--1" aria-hidden="true" />
      <div className="projects__bg-orb projects__bg-orb--2" aria-hidden="true" />
      <div className="projects__bg-grid" aria-hidden="true" />

      <div className="container">

        {/* ── SECTION HEADER (EDITORIAL LUXURY AESTHETIC) ── */}
        <header className="section-header">
          <span className="section-label">Engineered Systems &amp; Software</span>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
          <p className="section-subtitle">
            Explore live production web applications, enterprise ACID databases, and full-stack software built for speed, security, and measurable client results.
          </p>
        </header>

        {/* ── CATEGORY FILTER PILLS ── */}
        <div className="projects__filters-wrap">
          <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
            {categories.map(({ name, count }) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={activeFilter === name}
                className={`pf-tab ${activeFilter === name ? 'pf-tab--active' : ''}`}
                onClick={() => {
                  setActiveFilter(name)
                  const match = name === 'All' ? projects[0] : projects.find((p) => p.category === name)
                  if (match) setActiveId(match.id)
                }}
              >
                <span className="pf-tab__label">{name}</span>
                <span className="pf-tab__pill font-mono">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            FEATURED PROJECT COCKPIT STAGE
            Asymmetric Split Layout with Tripzia-Style Arch Portal Window
            and Bhutan-Style Frosted Glass Telemetry Console
            ══════════════════════════════════════════════════════════ */}
        <div className="cockpit-stage" key={activeProject.id}>

          {/* ── LEFT: TRIPZIA-INSPIRED ARCH PORTAL WINDOW ── */}
          <div className="cockpit__arch-column">
            <div className="arch-portal">
              {/* Outer Glowing Perimeter Border */}
              <div className="arch-portal__border-glow" style={{ background: meta.accentGrad }} aria-hidden="true" />

              {/* Arched Window Top Crown */}
              <div className="arch-portal__window">
                {/* Browser Mockup Chrome */}
                <div className="arch-portal__chrome">
                  <div className="arch-portal__dots" aria-hidden="true">
                    <span className="arch-portal__dot arch-portal__dot--red" />
                    <span className="arch-portal__dot arch-portal__dot--yellow" />
                    <span className="arch-portal__dot arch-portal__dot--green" />
                  </div>
                  <div className="arch-portal__url font-mono">
                    <span className="arch-portal__lock">🔒</span>
                    <span>{meta.displayUrl}</span>
                  </div>
                  <span className={`arch-portal__status-pill ${activeProject.status === 'Active' ? 'arch-portal__status-pill--live' : ''}`}>
                    {activeProject.status === 'Active' ? '● LIVE' : '✓ PRODUCTION'}
                  </span>
                </div>

                {/* Simulated UI Screen Canvas */}
                <div className="arch-portal__canvas">
                  <div className="arch-canvas__glow" style={{ background: meta.accentGrad }} aria-hidden="true" />

                  {/* UI Canvas Header */}
                  <div className="arch-canvas__header">
                    <div>
                      <span className="arch-canvas__category font-mono" style={{ color: meta.themeColor }}>
                        {activeProject.category}
                      </span>
                      <h3 className="arch-canvas__title">{activeProject.title}</h3>
                    </div>
                    <span className="arch-canvas__year font-mono">{activeProject.year}</span>
                  </div>

                  {/* Simulated Interface Pill Rail (Inspired by Tripzia & Visual Diary) */}
                  <div className="arch-canvas__pills-rail">
                    {meta.destinations.map((dest, dIdx) => (
                      <span key={dIdx} className="arch-canvas__dest-pill">
                        {dest}
                      </span>
                    ))}
                  </div>

                  {/* Dynamic Simulation Card */}
                  <div className="arch-canvas__sim-card">
                    <div className="arch-canvas__sim-header">
                      <span className="arch-canvas__sim-badge font-mono" style={{ background: `${meta.themeColor}22`, color: meta.themeColor }}>
                        {meta.previewUI.badge}
                      </span>
                      <span className="arch-canvas__sim-sub font-mono">{meta.previewUI.sub}</span>
                    </div>

                    <p className="arch-canvas__sim-text">
                      {activeProject.shortDescription}
                    </p>

                    <div className="arch-canvas__sim-metrics font-mono">
                      <div className="arch-sim-metric">
                        <span className="arch-sim-metric__val" style={{ color: meta.themeColor }}>
                          {meta.statHighlight}
                        </span>
                        <span className="arch-sim-metric__lbl">VERIFIED PERFORMANCE</span>
                      </div>
                      <div className="arch-sim-metric">
                        <span className="arch-sim-metric__val">100% ACID</span>
                        <span className="arch-sim-metric__lbl">TRANSACTION INTEGRITY</span>
                      </div>
                    </div>
                  </div>

                  {/* Arched Bottom Decorative Frame Line */}
                  <div className="arch-canvas__bottom-bar">
                    <span className="arch-canvas__system-tag font-mono">
                      ENGINEERED BY KAVYA MODI · PATTERN LLC
                    </span>
                    <span className="arch-canvas__spark">✦</span>
                  </div>
                </div>
              </div>

              {/* Floating Hologram Chip Badge (Inspired by Spatial Reference 4) */}
              <div className="arch-portal__floating-chip">
                <div className="arch-chip__pulse" style={{ background: meta.themeColor }} />
                <div className="arch-chip__content">
                  <span className="arch-chip__metric font-mono">{meta.metric}</span>
                  <span className="arch-chip__sub font-mono">{meta.metricSub}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: BHUTAN-INSPIRED FROSTED GLASS TELEMETRY CONSOLE ── */}
          <div className="cockpit__telemetry-column">
            <div className="telemetry-panel">
              {/* Index & Category Header */}
              <div className="telemetry__header">
                <span className="telemetry__index font-mono">
                  PROJECT {String(activeIndex + 1).padStart(2, '0')} // 07
                </span>
                <span className="telemetry__cat-badge font-mono" style={{ color: meta.themeColor, borderColor: `${meta.themeColor}44`, background: `${meta.themeColor}14` }}>
                  {activeProject.category}
                </span>
              </div>

              {/* Monumental Title */}
              <h3 className="telemetry__title">{activeProject.title}</h3>

              {/* Comprehensive Description */}
              <p className="telemetry__desc">{activeProject.description}</p>

              {/* Interactive Tab Switcher for Specs */}
              <div className="telemetry__tabs" role="tablist">
                <button
                  type="button"
                  className={`telemetry__tab-btn ${activeTab === 'specs' ? 'telemetry__tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  <span>◆ Verified Capabilities</span>
                </button>
                <button
                  type="button"
                  className={`telemetry__tab-btn ${activeTab === 'architecture' ? 'telemetry__tab-btn--active' : ''}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  <span>◈ Architectural Highlights</span>
                </button>
              </div>

              {/* Bhutan-Style Frosted Glass Specs Box */}
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

              {/* Spec Icons Line (Bhutan Horizontal Badges Reference) */}
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

              {/* Action Buttons — Premium Magnetic CTAs */}
              <div className="telemetry__actions">
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telemetry__btn telemetry__btn--primary"
                    aria-label={`Open live demo for ${activeProject.title}`}
                  >
                    <span>Launch Live</span>
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
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            INTERACTIVE PROJECT SELECTOR RAIL
            Click any project to seamlessly switch the Cockpit Stage
            ══════════════════════════════════════════════════════════ */}
        <div className="project-rail" role="region" aria-label="Quick project switcher">
          <div className="project-rail__header">
            <span className="project-rail__label font-mono">SELECT SYSTEM CASE STUDY:</span>
            <span className="project-rail__count font-mono">{filtered.length} AVAILABLE</span>
          </div>

          <div className="project-rail__grid">
            {filtered.map((proj, pIdx) => {
              const isSelected = proj.id === activeProject.id
              const pMeta = PROJECT_META[proj.id] || PROJECT_META['glovix-anand']

              return (
                <button
                  key={proj.id}
                  type="button"
                  className={`project-rail__card ${isSelected ? 'project-rail__card--active' : ''}`}
                  onClick={() => handleSelectProject(proj.id)}
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
