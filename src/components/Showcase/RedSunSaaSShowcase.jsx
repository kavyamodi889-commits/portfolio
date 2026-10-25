import { useState, useEffect, useRef } from 'react'
import AnimatedCounter from '../Common/AnimatedCounter'
import kavyaPortrait from '../../assets/kavya-portrait.jpg'
import './RedSunSaaSShowcase.css'

const TABS = [
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'products', label: 'Products', icon: '📦' },
  { id: 'customers', label: 'Customers', icon: '👥' },
  { id: 'campaigns', label: 'Campaigns', icon: '📢' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

const TIMEFRAMES = ['This week', 'Monthly', 'Quarterly', 'All time']

const BAR_DATA = {
  'This week': [
    { month: 'Mon', height: 42, val: '$4,200' },
    { month: 'Tue', height: 68, val: '$6,800' },
    { month: 'Wed', height: 35, val: '$3,500' },
    { month: 'Thu', height: 85, val: '$8,500' },
    { month: 'Fri', height: 55, val: '$5,500' },
    { month: 'Sat', height: 92, val: '$9,200' },
    { month: 'Sun', height: 74, val: '$7,400' },
  ],
  'Monthly': [
    { month: 'Dec', height: 45, val: '$45,200' },
    { month: 'Jan', height: 72, val: '$72,100' },
    { month: 'Feb', height: 38, val: '$38,400' },
    { month: 'Mar', height: 90, val: '$90,600' },
    { month: 'Apr', height: 58, val: '$58,300' },
    { month: 'May', height: 82, val: '$82,900' },
    { month: 'Jun', height: 64, val: '$64,500' },
  ],
  'Quarterly': [
    { month: 'Q1', height: 60, val: '$180,000' },
    { month: 'Q2', height: 88, val: '$264,000' },
    { month: 'Q3', height: 75, val: '$225,000' },
    { month: 'Q4', height: 95, val: '$285,000' },
  ],
  'All time': [
    { month: '2023', height: 50, val: '$420,000' },
    { month: '2024', height: 78, val: '$680,000' },
    { month: '2025', height: 92, val: '$890,000' },
    { month: '2026', height: 100, val: '$1,240,000' },
  ],
}

const IMPORTERS = [
  { id: 'huse', name: 'Fluse Users', color: '#a855f7', desc: 'Active lead ingestion & sync' },
  { id: 'penta', name: 'Penta Users', color: '#06b6d4', desc: 'Enterprise webhook pipeline' },
  { id: 'border', name: 'Border Users', color: '#3b82f6', desc: 'Cross-border payment gateways' },
]

export default function RedSunSaaSShowcase() {
  const [activeTab, setActiveTab] = useState('analytics')
  const [timeframe, setTimeframe] = useState('Monthly')
  const [timeframeOpen, setTimeframeOpen] = useState(false)
  const [importerStates, setImporterStates] = useState({})
  const [tiltProgress, setTiltProgress] = useState(0) // 0: tilted, 1: flat
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  // Scroll-driven 3D perspective tilt calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress from when the section enters until it reaches top
      const start = windowHeight * 0.95
      const end = windowHeight * 0.2
      const current = rect.top
      
      let p = (start - current) / (start - end)
      p = Math.max(0, Math.min(1, p))
      setTiltProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLaunchImporter = (id) => {
    setImporterStates((prev) => ({ ...prev, [id]: 'connecting' }))
    setTimeout(() => {
      setImporterStates((prev) => ({ ...prev, [id]: 'connected' }))
      setTimeout(() => {
        setImporterStates((prev) => ({ ...prev, [id]: 'idle' }))
      }, 2500)
    }, 1200)
  }

  // Smooth interpolation values
  // Tilt from 24deg down to 0deg, scale from 0.92 to 1.0, translateY from 40px to 0px
  const rotateX = (24 * (1 - tiltProgress)).toFixed(2)
  const scale = (0.92 + 0.08 * tiltProgress).toFixed(3)
  const translateY = (40 * (1 - tiltProgress)).toFixed(1)
  const glareOpacity = (0.35 * Math.sin(tiltProgress * Math.PI)).toFixed(2)

  const bars = BAR_DATA[timeframe] || BAR_DATA['Monthly']

  return (
    <section className="saas-showcase" ref={sectionRef} id="showcase-saas" aria-label="SaaS App Showcase">

      {/* ── LUMINOUS SOLAR HORIZON SPHERE & CORONA ARC ── */}
      <div className="saas-horizon" aria-hidden="true">
        <div className="saas-horizon__sun" />
        <div className="saas-horizon__arc" />
        <div className="saas-horizon__beam" />
        <div className="saas-horizon__glow" />
      </div>

      {/* ── SECTION HEADER (REDSUN BRANDING & HEADLINE) ── */}
      <div className="saas-showcase__header">
        <div className="saas-showcase__brand-pill">
          <span className="saas-showcase__brand-icon">✹</span>
          <span className="saas-showcase__brand-name">REDSUN ARCHITECTURE</span>
          <span className="saas-showcase__brand-dot" />
          <span className="saas-showcase__brand-badge">PRO v3.4</span>
        </div>

        <h2 className="saas-showcase__title">
          <span>Powered by High-Concurrency</span>
          <span className="saas-showcase__title-highlight"> Intelligence.</span>
        </h2>

        <p className="saas-showcase__subtitle">
          Gain clarity and harness the full power of distributed full-stack architecture with RedSun.
          Engineered for real-time telemetry, sub-20ms latency, and automated ACID synchronization.
        </p>

        <div className="saas-showcase__actions">
          <a href="#projects" className="saas-showcase__btn-primary">
            <span>Explore Live Dashboard</span>
            <span className="saas-btn-arrow">→</span>
          </a>
          <a href="#contact" className="saas-showcase__btn-secondary">
            <span>Book a Demo</span>
          </a>
        </div>
      </div>

      {/* ── 3D PERSPECTIVE SCROLL CONTAINER WITH FENCING EFFECT ── */}
      <div className="saas-stage-perspective">
        <div
          className="saas-dashboard-wrapper"
          ref={containerRef}
          style={{
            transform: `perspective(1400px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          }}
        >

          {/* ── ELECTRIC "FENCING EFFECT" (CONTINUOUS PERIMETER BORDER BEAM) ── */}
          <div className="saas-fencing-beam" aria-hidden="true" />
          <div className="saas-fencing-border" aria-hidden="true" />
          <div className="saas-fencing-glow" aria-hidden="true" />

          {/* Dynamic Glare Reflection Sweep on Scroll */}
          <div
            className="saas-glare"
            style={{ opacity: glareOpacity }}
            aria-hidden="true"
          />

          {/* ── THE LIVE REDSUN SAAS DASHBOARD ── */}
          <div className="saas-dashboard">

            {/* Dashboard Navigation Bar */}
            <header className="saas-dash-nav">
              <div className="saas-dash-nav__brand">
                <span className="saas-dash-nav__logo-sun">✹</span>
                <span className="saas-dash-nav__logo-text">REDSUN</span>
              </div>

              {/* Interactive Tabs */}
              <nav className="saas-dash-nav__tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`saas-dash-tab ${activeTab === tab.id ? 'saas-dash-tab--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="saas-dash-tab__icon">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* User & Action */}
              <div className="saas-dash-nav__user">
                <div className="saas-dash-nav__avatar" title="Kavya Modi (Lead Architect)">
                  <img
                    src={kavyaPortrait}
                    alt="Kavya Modi"
                    className="saas-dash-nav__avatar-img"
                  />
                  <span className="saas-dash-nav__status-online" />
                </div>
                <button
                  type="button"
                  className="saas-dash-nav__invite-btn"
                  onClick={() => alert('Invite collaborator link generated and copied to clipboard!')}
                >
                  <span>+ Invite users</span>
                </button>
              </div>
            </header>

            {/* Dashboard Inner Body */}
            <div className="saas-dash-body">

              {/* Title & Live Status */}
              <div className="saas-dash-header">
                <div>
                  <h3 className="saas-dash-title">Production Telemetry</h3>
                  <p className="saas-dash-sub">Real-time system throughput across active client microservices</p>
                </div>
                <div className="saas-dash-pill font-mono">
                  <span className="saas-dash-pill-beacon" />
                  <span>LIVE CLUSTER OPTIMAL</span>
                </div>
              </div>

              {/* 4 Metric Cards with Wave Sparklines */}
              <div className="saas-metrics-row">

                {/* Metric 1 */}
                <div className="saas-metric-card">
                  <div className="saas-metric-header">
                    <span className="saas-metric-label">TOTAL USERS</span>
                    <span className="saas-metric-badge saas-metric-badge--up">↗ 4.9%</span>
                  </div>
                  <div className="saas-metric-val">
                    <AnimatedCounter end={72350} duration={2200} />
                  </div>
                  {/* Glowing SVG Wave Sparkline */}
                  <svg className="saas-sparkline" viewBox="0 0 160 40" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 28 C 30 15, 60 35, 90 18 C 120 4, 140 22, 160 8"
                      stroke="#ff5722"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 28 C 30 15, 60 35, 90 18 C 120 4, 140 22, 160 8 L 160 40 L 0 40 Z"
                      fill="url(#sparkGrad)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff5722" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ff5722" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Metric 2 */}
                <div className="saas-metric-card">
                  <div className="saas-metric-header">
                    <span className="saas-metric-label">SESSIONS</span>
                    <span className="saas-metric-badge saas-metric-badge--up">↗ 12.3%</span>
                  </div>
                  <div className="saas-metric-val">
                    29.4<small className="saas-metric-unit">k</small>
                  </div>
                  <svg className="saas-sparkline" viewBox="0 0 160 40" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 32 C 25 35, 55 12, 85 24 C 115 32, 135 10, 160 14"
                      stroke="#ff7828"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 32 C 25 35, 55 12, 85 24 C 115 32, 135 10, 160 14 L 160 40 L 0 40 Z"
                      fill="url(#sparkGrad2)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff7828" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ff7828" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Metric 3 */}
                <div className="saas-metric-card">
                  <div className="saas-metric-header">
                    <span className="saas-metric-label">AVG. CLICK RATE</span>
                    <span className="saas-metric-badge saas-metric-badge--up">↗ 15.3%</span>
                  </div>
                  <div className="saas-metric-val">
                    56.8<small className="saas-metric-unit">%</small>
                  </div>
                  <svg className="saas-sparkline" viewBox="0 0 160 40" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 24 C 30 28, 60 12, 90 22 C 120 30, 140 8, 160 12"
                      stroke="#ff9d5c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 24 C 30 28, 60 12, 90 22 C 120 30, 140 8, 160 12 L 160 40 L 0 40 Z"
                      fill="url(#sparkGrad3)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkGrad3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Metric 4 */}
                <div className="saas-metric-card">
                  <div className="saas-metric-header">
                    <span className="saas-metric-label">PAGEVIEWS</span>
                    <span className="saas-metric-badge saas-metric-badge--up">↗ 12.5%</span>
                  </div>
                  <div className="saas-metric-val">
                    <AnimatedCounter end={92912} duration={2400} />
                  </div>
                  <svg className="saas-sparkline" viewBox="0 0 160 40" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 30 C 35 18, 65 32, 100 12 C 130 0, 145 18, 160 6"
                      stroke="#ff3d00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 30 C 35 18, 65 32, 100 12 C 130 0, 145 18, 160 6 L 160 40 L 0 40 Z"
                      fill="url(#sparkGrad4)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkGrad4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff3d00" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ff3d00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

              </div>

              {/* Main Lower Split Grid: Importers (Left) & Bar Chart (Right) */}
              <div className="saas-lower-grid">

                {/* Left Module: Importers */}
                <div className="saas-panel saas-importer-panel">
                  <div className="saas-panel-head">
                    <div>
                      <h4 className="saas-panel-title">Import data into Front Dashboard</h4>
                      <p className="saas-panel-sub">See and talk to your users and leads immediately</p>
                    </div>
                  </div>

                  <div className="saas-importer-list">
                    {IMPORTERS.map((item) => {
                      const status = importerStates[item.id] || 'idle'
                      return (
                        <div key={item.id} className="saas-importer-row">
                          <div className="saas-importer-info">
                            <span
                              className="saas-importer-dot"
                              style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                            />
                            <div>
                              <strong className="saas-importer-name">{item.name}</strong>
                              <span className="saas-importer-desc">{item.desc}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className={`saas-importer-btn ${status === 'connected' ? 'saas-importer-btn--success' : ''}`}
                            onClick={() => handleLaunchImporter(item.id)}
                            disabled={status === 'connecting'}
                          >
                            {status === 'connecting' && <span>Syncing...</span>}
                            {status === 'connected' && <span>✓ Synced</span>}
                            {status === 'idle' && <span>Launch importer →</span>}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <div className="saas-importer-footer">
                    <button type="button" className="saas-action-dropdown-btn">
                      <span>Quick Actions</span>
                      <span className="saas-dropdown-caret">▾</span>
                    </button>
                    <span className="saas-importer-meta font-mono">3 of 3 services operational</span>
                  </div>
                </div>

                {/* Right Module: Monthly Expenses & Volume Interactive Bar Chart */}
                <div className="saas-panel saas-chart-panel">
                  <div className="saas-panel-head">
                    <div>
                      <h4 className="saas-panel-title">Monthly Throughput &amp; Volumes</h4>
                      <p className="saas-panel-sub">Query load breakdown per distribution node</p>
                    </div>

                    {/* Timeframe Selector Dropdown */}
                    <div className="saas-timeframe-dropdown">
                      <button
                        type="button"
                        className="saas-timeframe-btn"
                        onClick={() => setTimeframeOpen((prev) => !prev)}
                      >
                        <span>{timeframe}</span>
                        <span className="saas-dropdown-caret">▾</span>
                      </button>

                      {timeframeOpen && (
                        <div className="saas-timeframe-menu">
                          {TIMEFRAMES.map((tf) => (
                            <button
                              key={tf}
                              type="button"
                              className={`saas-timeframe-item ${tf === timeframe ? 'active' : ''}`}
                              onClick={() => {
                                setTimeframe(tf)
                                setTimeframeOpen(false)
                              }}
                            >
                              {tf}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Vertical Glowing Bar Chart */}
                  <div className="saas-bars-container">
                    <div className="saas-bars-grid">
                      {bars.map((bar, idx) => (
                        <div key={idx} className="saas-bar-col">
                          <div className="saas-bar-track">
                            <div
                              className="saas-bar-fill"
                              style={{ height: `${bar.height}%` }}
                            >
                              <span className="saas-bar-tooltip">{bar.val}</span>
                            </div>
                          </div>
                          <span className="saas-bar-label font-mono">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="saas-chart-footer">
                    <div className="saas-legend-item">
                      <span className="saas-legend-dot" />
                      <span>Production Serverless Pipeline (Active Peak)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── CLIENT & ARCHITECTURE BADGES RAIL (MATCHING REFERENCE) ── */}
      <div className="saas-trust-rail">
        <p className="saas-trust-caption">
          ARCHITECTING FOR NEXT-GEN ENTERPRISE PLATFORMS &amp; HIGH-SCALE PRODUCTS
        </p>
        <div className="saas-trust-logos">
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">⊚</span>
            <span>Trace Cloud</span>
          </div>
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">♫</span>
            <span>Volume AI</span>
          </div>
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">☘</span>
            <span>Clues Data</span>
          </div>
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">▥</span>
            <span>Rise Engine</span>
          </div>
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">⚡</span>
            <span>Pattern LLC</span>
          </div>
          <div className="saas-trust-logo">
            <span className="saas-logo-icon">✦</span>
            <span>Anugrah Systems</span>
          </div>
        </div>
      </div>

    </section>
  )
}
