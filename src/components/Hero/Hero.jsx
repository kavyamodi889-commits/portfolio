import { useState, useEffect, useRef } from 'react'
import AnimatedCounter from '../Common/AnimatedCounter'
import MagneticButton from '../Common/MagneticButton'
import Canvas3D from '../Common/Canvas3D'
import portraitImg from '../../assets/kavya-portrait.jpg'
import './Hero.css'

const TECH_MARQUEE = [
  'React 19', 'Python', 'FastAPI', 'MySQL ACID', 'JavaScript', 'Node.js',
  'TypeScript', 'Tailwind CSS', 'Vite', 'MongoDB', 'REST APIs',
  'Git & GitHub', 'Distributed Systems', 'Vercel', 'Netlify', 'Windows Forms'
]

const STATUS_ITEMS = [
  {
    category: 'ROLE',
    title: 'Operating Executive',
    detail: 'Pattern LLC (2026–Present)',
    dot: '#ff3b30',
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
  const [scrollY, setScrollY] = useState(0)
  const [mouseTilt, setMouseTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  const portraitRef = useRef(null)

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

  // Parallax scroll for the monumental "PORTFOLIO" watermark
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-cycle through status items
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_ITEMS.length)
    }, 3400)
    return () => clearInterval(timer)
  }, [isPaused])

  // Interactive 3D tilt on portrait hover
  const handlePortraitMouseMove = (e) => {
    if (!portraitRef.current) return
    const rect = portraitRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotX = ((y - centerY) / centerY) * -10
    const rotY = ((x - centerX) / centerX) * 10
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    setMouseTilt({ rotX, rotY, glareX, glareY })
  }

  const handlePortraitMouseLeave = () => {
    setMouseTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 })
  }

  const currentStatus = STATUS_ITEMS[statusIdx]

  const handleScrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" aria-label="Introduction">

      {/* ── AMBIENT BACKGROUND CANVAS & CRIMSON GLOWS ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__solar-orb hero__solar-orb--main" />
        <div className="hero__solar-orb hero__solar-orb--secondary" />
        <div className="hero__grid-overlay" />
        <Canvas3D className="hero__canvas3d" />
      </div>

      {/* ── TOP EYEBROW METADATA BAR (MATCHING REFERENCE) ── */}
      <div className="hero__top-bar">
        <div className="hero__top-brand">
          <span className="hero__top-dot" aria-hidden="true" />
          <span className="hero__top-text">WEB DEVELOPER &amp; SOFTWARE ENGINEER</span>
        </div>
        <div className="hero__top-status">
          <span className="hero__top-status-text">AVAILABLE FOR ROLES &amp; FREELANCE</span>
          <span className="hero__top-spark" aria-hidden="true">✦</span>
        </div>
      </div>

      {/* ── MONUMENTAL CRIMSON "PORTFOLIO" WATERMARK (PARALLAX SCROLL) ── */}
      <div
        className="hero__watermark"
        aria-hidden="true"
        style={{
          transform: `translateX(-50%) translateY(${scrollY * 0.22}px)`,
        }}
      >
        <span>PORTFOLIO</span>
      </div>

      {/* ── MAIN 3-COLUMN STAGE (MATCHING EXACT REFERENCE IMAGE) ── */}
      <div className="hero__stage">

        {/* ── LEFT COLUMN: TYPOGRAPHY, BIO & ACTIONS ── */}
        <div className="hero__col-left">

          {/* Script Greeting */}
          <div className="hero__greeting-wrap">
            <span className="hero__greeting">Hello, I'm</span>
          </div>

          {/* Massive Display Name */}
          <h1 className="hero__name">
            <span className="hero__name-line">KAVYA</span>
            <span className="hero__name-line">MODI</span>
          </h1>

          {/* Red Accent Role Title */}
          <div className="hero__role-badge">
            <span>WEB DEVELOPER &amp; SOFTWARE ENGINEER</span>
          </div>

          {/* Editorial Bio */}
          <p className="hero__bio">
            I design and build high-performance, user-focused web experiences that combine
            technical strategy with visual precision. Operating Executive at{' '}
            <strong>Pattern LLC</strong> and Semcom BCA Rank 1 Gold Medalist.
          </p>

          {/* Availability Pill */}
          <div className="hero__worldwide-pill">
            <span className="hero__worldwide-icon" aria-hidden="true">🌐</span>
            <span>AVAILABLE WORLDWIDE · REMOTE &amp; HYBRID</span>
          </div>

          {/* Live Telemetry Capsule (HUD) */}
          <div
            className="hero__announcement"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="hero__status-capsule">
              <span className="hero__laser-border" aria-hidden="true" />
              <div className="hero__status-fixed">
                <span className="hero__beacon" aria-hidden="true">
                  <span className="hero__beacon-ripple" style={{ borderColor: currentStatus.dot }} />
                  <span
                    className="hero__beacon-core"
                    style={{ background: currentStatus.dot, boxShadow: `0 0 10px ${currentStatus.dot}` }}
                  />
                </span>
                <span className="hero__status-label">STATUS</span>
              </div>

              <span className="hero__status-sep" aria-hidden="true">/</span>

              <span className="hero__category-pill" style={{ color: currentStatus.dot }}>
                {currentStatus.category}
              </span>

              <div className="hero__status-slider" key={statusIdx}>
                <span className="hero__status-icon" aria-hidden="true">{currentStatus.icon}</span>
                <span className="hero__status-main">{currentStatus.title}</span>
              </div>

              <div className="hero__status-pips" aria-label="Status selectors">
                {STATUS_ITEMS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`hero__status-pip ${idx === statusIdx ? 'hero__status-pip--active' : ''}`}
                    onClick={() => setStatusIdx(idx)}
                    title={item.category}
                    style={idx === statusIdx ? { background: item.dot, boxShadow: `0 0 8px ${item.dot}` } : undefined}
                  />
                ))}
              </div>

              {istTime && (
                <div className="hero__status-clock font-mono" title="Live Indian Standard Time">
                  <span className="hero__clock-dot" />
                  <span>{istTime} IST</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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

            <MagneticButton
              as="a"
              href="/resume"
              className="btn btn-outline hero__btn-secondary"
              strength={0.2}
            >
              <span>Resume Studio</span>
              <span className="hero__btn-badge">v2.0</span>
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
              <span>CV</span>
            </a>
          </div>
        </div>

        {/* ── CENTER COLUMN: EDITORIAL DEVELOPER PORTRAIT & FLOATING BADGE (MATCHING REFERENCE) ── */}
        <div className="hero__col-center">
          <div
            className="hero__portrait-wrapper"
            ref={portraitRef}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${mouseTilt.rotX}deg) rotateY(${mouseTilt.rotY}deg)`,
            }}
          >
            {/* Ambient Crimson Halo */}
            <div className="hero__portrait-halo" aria-hidden="true" />

            {/* Portrait Frame with Bottom Fade */}
            <div className="hero__portrait-frame">
              <img
                src={portraitImg}
                alt="Kavya Modi — Full Stack Web Developer & Software Engineer"
                className="hero__portrait-img"
                width="600"
                height="800"
                loading="eager"
              />
              <div className="hero__portrait-fade" aria-hidden="true" />
            </div>

            {/* Floating Editorial Spark Card (Matching Reference Badge) */}
            <div className="hero__floating-card">
              <span className="hero__fencing-laser" aria-hidden="true" />
              <span className="hero__floating-spark" aria-hidden="true">✦</span>
              <p className="hero__floating-text">
                Turning ideas into powerful digital experiences.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: VERTICAL METRICS STACK (MATCHING REFERENCE) ── */}
        <div className="hero__col-right">
          <div className="hero__metrics-stack">

            {/* Metric 1 */}
            <div className="hero__metric-card">
              <div className="hero__metric-num">
                <AnimatedCounter end={9.55} decimals={2} duration={2000} />
              </div>
              <div className="hero__metric-meta">
                <span className="hero__metric-title">CGPA · RANK 1</span>
                <span className="hero__metric-desc">GOLD MEDALIST</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="hero__metric-card">
              <div className="hero__metric-num">
                <AnimatedCounter end={7} suffix="+" duration={1800} />
              </div>
              <div className="hero__metric-meta">
                <span className="hero__metric-title">PROJECTS SHIPPED</span>
                <span className="hero__metric-desc">FULL-STACK SYSTEMS</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="hero__metric-card">
              <div className="hero__metric-num">
                <AnimatedCounter end={100} suffix="%" duration={2200} />
              </div>
              <div className="hero__metric-meta">
                <span className="hero__metric-title">DATA INTEGRITY</span>
                <span className="hero__metric-desc">ACID OPTIMIZATION</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="hero__metric-card">
              <div className="hero__metric-num hero__metric-num--text">
                Pattern LLC
              </div>
              <div className="hero__metric-meta">
                <span className="hero__metric-title">OPERATING EXEC</span>
                <span className="hero__metric-desc">US/UK CLIENT DELIVERY</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── BOTTOM TECH MARQUEE TICKER ── */}
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
