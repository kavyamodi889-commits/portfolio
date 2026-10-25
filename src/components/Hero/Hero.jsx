import { useState, useEffect } from 'react'
import Canvas3D from '../Common/Canvas3D'
import AnimatedCounter from '../Common/AnimatedCounter'
import MagneticButton from '../Common/MagneticButton'
import Neural3DStage from './Neural3DStage'
import './Hero.css'

const TECH_MARQUEE = [
  'React 19', 'Python', 'PHP', 'MySQL', 'JavaScript', 'Node.js',
  'TypeScript', 'Tailwind CSS', 'Vite', 'FastAPI', 'MongoDB',
  'Git & GitHub', 'REST APIs', 'Vercel', 'Netlify', 'Windows Forms'
]

const STATUS_ITEMS = [
  {
    category: 'ROLE',
    title: 'Operating Executive',
    detail: 'Pattern LLC (2026–Present)',
    dot: '#ff7828',
    icon: '⚡',
  },
  {
    category: 'MERIT',
    title: 'Semcom BCA Rank 1',
    detail: '9.55 CGPA Distinction · Gold Medalist',
    dot: '#fbbf24',
    icon: '★',
  },
  {
    category: 'AVAILABILITY',
    title: 'Open to High-Impact Roles',
    detail: 'Full-Stack & Systems · Remote / Hybrid',
    dot: '#10b981',
    icon: '🟢',
  },
  {
    category: 'CORE ENGINE',
    title: 'Full-Stack Architecture',
    detail: 'React 19 · Node · Python · MySQL ACID',
    dot: '#38bdf8',
    icon: '⚛️',
  },
]

export default function Hero() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [istTime, setIstTime] = useState('')

  // Live IST Clock (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
      setIstTime(formatted)
    }
    updateTime()
    const clockTimer = setInterval(updateTime, 1000)
    return () => clearInterval(clockTimer)
  }, [])

  // Auto-cycle through credentials
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_ITEMS.length)
    }, 3400)
    return () => clearInterval(timer)
  }, [isPaused])

  const currentStatus = STATUS_ITEMS[statusIdx]

  const handleScrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" aria-label="Introduction">

      {/* ── FULL-SECTION AMBIENT BACKGROUND ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__solar-orb hero__solar-orb--main" />
        <div className="hero__solar-orb hero__solar-orb--secondary" />
        <div className="hero__grid-overlay" />
        <Canvas3D className="hero__canvas3d" />
      </div>

      {/* ── 3D SILICON STAGE — ABSOLUTE RIGHT-HALF BACKGROUND ── */}
      <div className="hero__stage-bg" aria-hidden="true">
        <Neural3DStage />
      </div>

      {/* ── MAIN CONTENT LAYOUT ── */}
      <div className="hero__inner">

        {/* LEFT CONTENT COLUMN */}
        <div className="hero__content">

          {/* ── INNOVATIVE CURRENT STATUS TELEMETRY CAPSULE ── */}
          <div
            className="hero__announcement"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <a
              href="#potential"
              className="hero__announcement-badge hero__status-capsule"
              aria-label="Current status details and telemetry"
            >
              {/* Neon Laser Perimeter Sweep */}
              <span className="hero__laser-border" aria-hidden="true" />
              
              {/* Fixed Permanent CURRENT STATUS Badge with Radar Beacon */}
              <div className="hero__status-fixed">
                <span className="hero__beacon" aria-hidden="true">
                  <span className="hero__beacon-ripple" style={{ borderColor: currentStatus.dot }} />
                  <span
                    className="hero__beacon-core"
                    style={{ background: currentStatus.dot, boxShadow: `0 0 10px ${currentStatus.dot}` }}
                  />
                </span>
                <span className="hero__status-label">CURRENT STATUS</span>
              </div>

              <span className="hero__status-sep" aria-hidden="true">/</span>

              {/* Dynamic Category Pill */}
              <span className="hero__category-pill" style={{ color: currentStatus.dot }}>
                {currentStatus.category}
              </span>

              {/* 3D Holographic Status Flip Text */}
              <div className="hero__status-slider" key={statusIdx}>
                <span className="hero__status-icon" aria-hidden="true">{currentStatus.icon}</span>
                <span className="hero__status-main">{currentStatus.title}</span>
                <span className="hero__status-detail">({currentStatus.detail})</span>
              </div>

              {/* Interactive Segmented LED Pips (Clickable) */}
              <div className="hero__status-pips" aria-label="Status selectors">
                {STATUS_ITEMS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`hero__status-pip ${idx === statusIdx ? 'hero__status-pip--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setStatusIdx(idx)
                    }}
                    title={item.category}
                    style={idx === statusIdx ? { background: item.dot, boxShadow: `0 0 8px ${item.dot}` } : undefined}
                  />
                ))}
              </div>

              {/* Live IST Telemetry Clock Pill */}
              {istTime && (
                <div className="hero__status-clock font-mono" title="Live Indian Standard Time">
                  <span className="hero__clock-dot" />
                  <span>{istTime} IST</span>
                </div>
              )}
              
              {/* Action Prompt */}
              <span className="hero__status-cta">
                <span className="hero__status-cta-text">LIVE HUD</span>
                <span className="hero__announcement-arrow">↗</span>
              </span>
            </a>
          </div>

          {/* Hero Headline */}
          <h1 className="hero__title">
            <span className="hero__title-line">Turning Complex</span>
            <span className="hero__title-line">Ideas Into</span>
            <span className="hero__title-gradient">Intelligent Web</span>
            <span className="hero__title-gradient">Products.</span>
          </h1>

          <p className="hero__subtitle">
            Full-Stack Web Developer &amp; Software Engineer. Operating Executive at <strong>Pattern LLC</strong> (2026 – Present). BCA graduate from Semcom with <strong>9.55 CGPA (Rank 1)</strong>. Architecting high-concurrency systems, dynamic backends, and stunning React experiences.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <MagneticButton
              as="a"
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn btn-primary hero__btn-primary"
              strength={0.25}
            >
              <span>Explore Featured Works</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <polyline points="19 12 12 19 5 12"/>
              </svg>
            </MagneticButton>

            <a
              href="/Kavya-Modi-Resume.pdf"
              download="Kavya-Modi-Resume.pdf"
              className="hero__cv-btn"
              id="hero-download-cv-btn"
              aria-label="Download Kavya Modi CV as PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download CV</span>
              <span className="hero__cv-badge">PDF</span>
            </a>

            <MagneticButton
              as="a"
              href="/resume"
              className="btn btn-outline hero__btn-secondary"
              strength={0.2}
            >
              <span>Resume Studio</span>
              <span className="hero__btn-badge">v2.0</span>
            </MagneticButton>
          </div>

          {/* Stats Row */}
          <div className="hero__stats-row">
            <div className="hero__stat">
              <span className="hero__stat-val"><AnimatedCounter end={9.55} decimals={2} duration={2000} /></span>
              <span className="hero__stat-lbl">CGPA · RANK 1</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-val">Pattern LLC</span>
              <span className="hero__stat-lbl">OPS EXECUTIVE 2026</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-val"><AnimatedCounter end={7} suffix="+" duration={1800} /></span>
              <span className="hero__stat-lbl">SHIPPED SYSTEMS</span>
            </div>
          </div>
        </div>

        {/* RIGHT SPACER — 3D stage fills this area via absolute positioning */}
        <div className="hero__stage-spacer" aria-hidden="true" />
      </div>

      {/* ── REDSUN INFINITE TECH MARQUEE TICKER ── */}
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
            <span key={idx} className="hero__marquee-item">
              <span className="hero__marquee-dot">✦</span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
