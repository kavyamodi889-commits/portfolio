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

export default function Hero() {
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

          {/* Status badge */}
          <div className="hero__announcement">
            <a href="#contact" className="hero__announcement-badge border-glow-pulse">
              <span className="hero__pulse-dot" />
              <span>Open to Opportunities · Vadodara &amp; Remote</span>
              <span className="hero__announcement-arrow">↗</span>
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
