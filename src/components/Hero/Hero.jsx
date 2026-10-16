import Canvas3D from '../Common/Canvas3D'
import './Hero.css'

const TECH_MARQUEE = [
  'React', 'Python', 'PHP', 'MySQL', 'JavaScript', 'Node.js',
  'TypeScript', 'Tailwind CSS', 'Vite', 'FastAPI', 'MongoDB',
  'Git & GitHub', 'REST APIs', 'Vercel', 'Netlify', 'Windows Forms'
]

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* RedSun Solar Ambient Glowing Orbs */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__solar-orb hero__solar-orb--main" />
        <div className="hero__solar-orb hero__solar-orb--secondary" />
        <div className="hero__grid-overlay" />
        {/* 3D Interactive Particle Sphere */}
        <Canvas3D className="hero__canvas3d" />
      </div>

      <div className="container">
        {/* ── TOP: Announcement Badge ── */}
        <div className="hero__announcement">
          <span className="hero__announcement-badge">
            <span className="hero__pulse-dot" />
            <span>Open to Opportunities · Vadodara &amp; Remote</span>
            <span className="hero__announcement-arrow">↗</span>
          </span>
        </div>

        {/* ── CENTER: Massive RedSun Headline ── */}
        <div className="hero__heading-block">
          <h1 className="hero__title">
            Turning Complex Ideas
            <span className="hero__title-gradient">Into Intelligent Web Products.</span>
          </h1>
          <p className="hero__subtitle">
            Full-Stack Web Developer &amp; Software Engineer. Operating Executive at <strong>Pattern LLC</strong>. BCA graduate from Semcom, CVM University with <strong>9.55 CGPA</strong>. Engineering high-concurrency systems, dynamic PHP/Python backends, and responsive React experiences.
          </p>

          {/* Action Buttons */}
          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn-primary hero__btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Explore Featured Works</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
            <a href="/resume" className="btn btn-outline hero__btn-secondary">
              <span>Resume Studio</span>
              <span className="hero__btn-badge">v2.0</span>
            </a>
          </div>
        </div>

        {/* ── REDSUN DASHBOARD TELEMETRY BENTO SHOWCASE ── */}
        <div className="hero__dashboard-wrapper">
          <div className="hero__dashboard">
            {/* Top Bar with Status */}
            <div className="hero__dash-header">
              <div className="hero__dash-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="hero__dash-status">
                <span className="hero__dash-live-dot" />
                <span>kavyamodi.vercel.app · System Online</span>
              </div>
              <div className="hero__dash-badge">Kavya Modi v2026</div>
            </div>

            {/* Dashboard Bento Content */}
            <div className="hero__dash-grid">
              {/* Metric 1: Academic Excellence */}
              <div className="hero__dash-card hero__dash-card--metric">
                <div className="hero__dash-card-header">
                  <span className="hero__dash-card-label">Academic Distinction</span>
                  <span className="hero__dash-pill">Rank 1</span>
                </div>
                <div className="hero__dash-metric-row">
                  <span className="hero__dash-metric-big">9.55</span>
                  <span className="hero__dash-metric-unit">CGPA</span>
                </div>
                <div className="hero__dash-metric-sub">BCA · Semcom, CVM University (2026)</div>
                {/* Visual SVG Sparkline */}
                <div className="hero__sparkline" aria-hidden="true">
                  <svg viewBox="0 0 100 24" fill="none" className="hero__spark-svg">
                    <path
                      d="M0 20 Q 25 14, 50 10 T 100 4"
                      stroke="#ff7828"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 20 Q 25 14, 50 10 T 100 4 L 100 24 L 0 24 Z"
                      fill="url(#sparkGrad)"
                      opacity="0.25"
                    />
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff7828" />
                        <stop offset="100%" stopColor="#ff7828" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Metric 2: Experience & Operations */}
              <div className="hero__dash-card hero__dash-card--metric">
                <div className="hero__dash-card-header">
                  <span className="hero__dash-card-label">Industry Operations</span>
                  <span className="hero__dash-pill hero__dash-pill--amber">Active</span>
                </div>
                <div className="hero__dash-metric-title">Operating Executive</div>
                <div className="hero__dash-metric-company">Pattern LLC · Vadodara</div>
                <div className="hero__dash-dates">2026 – Present · Full-Time</div>
                <div className="hero__dash-meta-tag">International BPO/ITES Delivery</div>
              </div>

              {/* Metric 3: Production Projects */}
              <div className="hero__dash-card hero__dash-card--metric">
                <div className="hero__dash-card-header">
                  <span className="hero__dash-card-label">Engineering Output</span>
                  <span className="hero__dash-pill hero__dash-pill--cyan">Shipped</span>
                </div>
                <div className="hero__dash-metric-row">
                  <span className="hero__dash-metric-big">7+</span>
                  <span className="hero__dash-metric-unit">Systems</span>
                </div>
                <div className="hero__dash-metric-sub">React, PHP, Python, MySQL Solutions</div>
                <div className="hero__dash-client-count">100% Client Delivery Record</div>
              </div>

              {/* Tech Stack Bar */}
              <div className="hero__dash-card hero__dash-card--full">
                <div className="hero__dash-tech-header">
                  <span className="hero__dash-tech-label">Core Tech Stack</span>
                  <span className="hero__dash-tech-sub">High-concurrency &amp; full-stack architecture</span>
                </div>
                <div className="hero__dash-pills">
                  {['React', 'JavaScript', 'Python', 'PHP', 'MySQL', 'Node.js', 'FastAPI', 'Tailwind', 'Vite', 'MongoDB'].map((t) => (
                    <span key={t} className="hero__tech-pill">
                      <span className="hero__tech-dot" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── REDSUN INFINITE LOGO / TECH MARQUEE TICKER ── */}
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
