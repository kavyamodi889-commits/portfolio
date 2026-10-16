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
      {/* ── AMBIENT SOLAR AURA & VOLUMETRIC GLOW ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__solar-orb hero__solar-orb--main" />
        <div className="hero__solar-orb hero__solar-orb--secondary" />
        <div className="hero__grid-overlay" />
        <Canvas3D className="hero__canvas3d" />
      </div>

      <div className="container hero__container">
        {/* ── TOP: Announcement Badge ── */}
        <div className="hero__announcement">
          <a href="#contact" className="hero__announcement-badge border-glow-pulse">
            <span className="hero__pulse-dot" />
            <span>Open to Opportunities · Vadodara &amp; Remote</span>
            <span className="hero__announcement-arrow">↗</span>
          </a>
        </div>

        {/* ── CENTER: RedSun Headline & Value Proposition ── */}
        <div className="hero__heading-block">
          <h1 className="hero__title">
            Turning Complex Ideas
            <span className="hero__title-gradient">Into Intelligent Web Products.</span>
          </h1>
          <p className="hero__subtitle">
            Full-Stack Web Developer &amp; Software Engineer. Operating Executive at <strong>Pattern LLC</strong> (2026 – Present). BCA graduate from Semcom, CVM University with <strong>9.55 CGPA (Rank 1)</strong>. Architecting high-concurrency systems, dynamic PHP/Python backends, and responsive React experiences.
          </p>

          {/* Action CTAs */}
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
        </div>

        {/* ── INTEGRATED HIGH-TECH TELEMETRY HUD BAR ── */}
        <div className="hero__hud-bar" aria-label="System Quick Metrics">
          <div className="hero__hud-item">
            <span className="hero__hud-val"><AnimatedCounter end={9.55} decimals={2} duration={2000} /></span>
            <span className="hero__hud-lbl">CGPA DISTINCTION (RANK 1)</span>
          </div>
          <div className="hero__hud-sep" />
          <div className="hero__hud-item">
            <span className="hero__hud-val">Pattern LLC</span>
            <span className="hero__hud-lbl">OPERATING EXECUTIVE (2026)</span>
          </div>
          <div className="hero__hud-sep" />
          <div className="hero__hud-item">
            <span className="hero__hud-val"><AnimatedCounter end={7} suffix="+" duration={1800} /></span>
            <span className="hero__hud-lbl">SHIPPED SYSTEMS</span>
          </div>
          <div className="hero__hud-sep" />
          <div className="hero__hud-item">
            <span className="hero__hud-val">Full-Stack</span>
            <span className="hero__hud-lbl">REACT · PYTHON · PHP · DB</span>
          </div>
        </div>

        {/* ── THE 3D SILICON PROCESSOR & NEURAL CIRCUIT STAGE (Direct Hero Stage, as in reference video) ── */}
        <div className="hero__stage-container">
          <Neural3DStage />
        </div>
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
