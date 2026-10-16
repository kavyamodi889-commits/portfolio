import { Link } from 'react-router-dom'
import { profile, contactLinks } from '../../data/portfolioData'
import Canvas3D from '../Common/Canvas3D'
import TiltCard from '../Common/TiltCard'
import './Hero.css'

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <polyline points="19 12 12 19 5 12"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) {
      const navOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const githubLink = contactLinks.find((l) => l.icon === 'github')
  const linkedinLink = contactLinks.find((l) => l.icon === 'linkedin')

  return (
    <section className="hero" id="home" aria-label="Introduction">
      {/* 3D Interactive Particle Constellation Canvas */}
      <Canvas3D />

      {/* Ambient background glow orbs */}
      <div className="hero__orb-container" aria-hidden="true">
        <div className="hero__orb hero__orb--primary" />
        <div className="hero__orb hero__orb--secondary" />
        <div className="hero__orb hero__orb--tertiary" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        {/* Left Column: Introduction & CTAs */}
        <div className="hero__text animate-fade-in">
          {/* Status Badge */}
          <div className="hero__label animate-fade-in delay-1">
            <span className="hero__label-dot" />
            <span className="hero__label-text">Available for Full-Time &amp; Freelance Roles</span>
          </div>

          {/* Headline Name */}
          <h1 className="hero__name animate-fade-in delay-2">
            Hi, I&apos;m{' '}
            <span className="hero__name-highlight">{profile.name}</span>
          </h1>

          {/* Animated Role Tagline */}
          <div className="hero__role-badge animate-fade-in delay-3">
            <span className="hero__role-cyan">Full-Stack Developer</span>
            <span className="hero__role-divider">/</span>
            <span className="hero__role-purple">Software Engineer</span>
          </div>

          {/* Bio Summary */}
          <p className="hero__summary animate-fade-in delay-4">
            BCA graduate from <strong>Semcom (9.55 CGPA)</strong> and intern at <strong>Anugrah Accounting</strong>. I build high-performance web systems, responsive desktop business software, and modern cloud platforms using <strong>React, Python, PHP, MySQL, and VB.NET</strong>.
          </p>

          {/* Quick Stats Grid */}
          <div className="hero__stats-row animate-fade-in delay-4">
            <div className="hero__stat-pill">
              <span className="stat-pill-val">9.55</span>
              <span className="stat-pill-lbl">CGPA (Semcom)</span>
            </div>
            <div className="hero__stat-pill">
              <span className="stat-pill-val">7+</span>
              <span className="stat-pill-lbl">Live Projects</span>
            </div>
            <div className="hero__stat-pill">
              <span className="stat-pill-val">100%</span>
              <span className="stat-pill-lbl">Clean Code</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero__actions animate-fade-in delay-5">
            <button
              className="btn btn-primary btn-lg"
              onClick={scrollToProjects}
              type="button"
              id="hero-explore-btn"
            >
              <span>Explore My Work</span>
              <span className="btn-arrow" aria-hidden="true">&darr;</span>
            </button>
            <Link
              to="/resume"
              className="btn btn-secondary btn-lg"
              id="hero-resume-btn"
              title="Open Resume Studio & Download PDF"
            >
              <DownloadIcon />
              <span>Résumé Studio</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="hero__social animate-fade-in delay-6">
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="View GitHub profile"
                id="hero-github-link"
              >
                <GitHubIcon />
                <span>kavyamodi889-commits</span>
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="View LinkedIn profile"
                id="hero-linkedin-link"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: 3D Interactive Tilt Card with Code Terminal */}
        <div className="hero__visual animate-fade-in-right delay-3">
          <TiltCard maxTilt={14} scale={1.03} className="hero__tilt-card">
            <div className="hero__visual-card">
              {/* Window Header */}
              <div className="hero__visual-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
                <span className="hero__card-filename">developer.config.ts</span>
              </div>

              {/* Code display */}
              <div className="hero__visual-code">
                <div className="hero__code-line">
                  <span className="c-keyword">const</span>{' '}
                  <span className="c-var">engineer</span>{' '}
                  <span className="c-op">=</span>{' '}
                  <span className="c-brace">{'{'}</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">name</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-string">&apos;Kavya Modi&apos;</span><span className="c-comma">,</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">role</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-string">&apos;Full Stack Web &amp; Software&apos;</span><span className="c-comma">,</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">degree</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-string">&apos;BCA · Semcom (9.55 CGPA)&apos;</span><span className="c-comma">,</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">stack</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-brace">[</span>
                  <span className="c-string">&apos;React&apos;</span><span className="c-comma">,</span>{' '}
                  <span className="c-string">&apos;Python&apos;</span><span className="c-comma">,</span>{' '}
                  <span className="c-string">&apos;PHP&apos;</span><span className="c-comma">,</span>{' '}
                  <span className="c-string">&apos;MySQL&apos;</span>
                  <span className="c-brace">]</span><span className="c-comma">,</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">internship</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-string">&apos;Anugrah Accounting&apos;</span><span className="c-comma">,</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="c-prop">status</span>
                  <span className="c-colon">:</span>{' '}
                  <span className="c-string c-highlight">&apos;Open to Opportunities&apos;</span>
                </div>
                <div className="hero__code-line">
                  <span className="c-brace">{'}'}</span>
                </div>
                <div className="hero__code-line hero__code-cursor">
                  <span className="c-cursor">█</span>
                </div>
              </div>

              {/* 3D Floating Tech Badges */}
              <div className="hero__badge hero__badge--1">⚡ React + Vite</div>
              <div className="hero__badge hero__badge--2">🐍 Python &amp; FastAPI</div>
              <div className="hero__badge hero__badge--3">💾 MySQL + PHP</div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Floating Scroll Indicator Button */}
      <button
        className="hero__scroll-hint"
        onClick={scrollToProjects}
        aria-label="Scroll to featured projects"
        type="button"
        id="hero-scroll-btn"
      >
        <span className="scroll-hint-text">EXPLORE</span>
        <ArrowDownIcon />
      </button>
    </section>
  )
}
