import { useState, useEffect, useRef, useCallback } from 'react'
import { education, experience, certifications, achievements } from '../../data/portfolioData'
import './Education.css'

/* ── MILESTONES DATA FOR 3D COVERFLOW ODYSSEY (INSPIRED BY REFERENCE IMAGES) ── */
const MILESTONES = [
  {
    id: 'pattern-llc',
    filterTag: 'Pattern LLC',
    role: 'Operating Executive',
    institution: 'Pattern LLC',
    period: '2026 – Present',
    location: 'Vadodara · Delaware (US) · London (UK)',
    type: 'Enterprise Leadership',
    badge: 'ACTIVE ROLE',
    metric: 'US/UK Delivery',
    metricSub: 'GLOBAL SLA COMPLIANCE',
    icon: '⚡',
    theme: 'crimson',
    accentColor: '#ff5722',
    description:
      'Operating Executive at Pattern LLC offshore delivery centre in Vadodara. Leading daily operations, cross-functional coordination, process automation, and high-standard SLA delivery for enterprise clients across the United States and United Kingdom.',
    highlights: [
      'Managing daily operational workflows across offshore delivery centre',
      'Direct cross-border coordination with US & UK clients to guarantee strict SLAs',
      'Supervising multidisciplinary teams in data processing, digital media, and ITES',
      'Implementing workflow automations to reduce turnaround time and optimize throughput',
    ],
    tech: ['BPO Operations', 'Team Leadership', 'Workflow Automation', 'Client Coordination', 'SLA Management'],
  },
  {
    id: 'bca-semcom',
    filterTag: 'Semcom BCA',
    role: 'Bachelor of Computer Applications (BCA)',
    institution: 'Semcom, CVM University',
    period: '2023 – 2026',
    location: 'Vallabh Vidyanagar, Gujarat, India',
    type: 'Academic Distinction',
    badge: 'RANK 1 GOLD MEDALIST',
    metric: '9.55 CGPA',
    metricSub: 'DEPARTMENT TOPPER',
    icon: '🏆',
    theme: 'amber',
    accentColor: '#f59e0b',
    description:
      'Graduated with Gold Medalist distinction as Department Rank 1 with a 9.55 CGPA in Semester 6. Comprehensive study in database management systems, full-stack application development, data structures, and software engineering.',
    highlights: [
      'Rank 1 in Department with Gold Medal honors and comprehensive academic distinction',
      'Specialized in Database Management Systems (MySQL), Python, and PHP web systems',
      'Finalist & recognized participant at CyberShadez Techathon hackathon (2024)',
      'Consistent top-percentile academic scores across all 6 semesters',
    ],
    tech: ['Python Programming', 'PHP & Web', 'MySQL DBMS', 'Data Structures', 'VB.NET', 'Software Eng'],
  },
  {
    id: 'anugrah-accounting',
    filterTag: 'Anugrah Web',
    role: 'Web Developer Intern',
    institution: 'Anugrah Accounting',
    period: '2024 – 2025',
    location: 'Bharuch, Gujarat, India',
    type: 'Client Engineering',
    badge: 'PRODUCTION SHIPPED',
    metric: 'Sub-85ms',
    metricSub: 'TRANSACTION CYCLE',
    icon: '💻',
    theme: 'cyan',
    accentColor: '#06b6d4',
    description:
      'Designed and engineered the official corporate website end-to-end for a chartered accounting firm. Built dynamic consultation inquiry handling with server validation and sub-second page performance.',
    highlights: [
      'Built full-stack responsive web platform for chartered accounting advisory services',
      'Client consultation inquiry system with server-side validation & data security',
      'Coordinated directly with firm stakeholders for requirement gathering and release',
      'Official verified internship certificate awarded upon successful delivery',
    ],
    tech: ['PHP', 'HTML5/CSS3', 'JavaScript', 'MySQL', 'Responsive UX', 'Client Relations'],
  },
  {
    id: 'credentials-certifications',
    filterTag: 'Certifications',
    role: 'Verified Professional Credentials',
    institution: 'Python Institute · DevTown · Cybersecurity',
    period: '2024 – 2025',
    location: 'Global Online Accreditation',
    type: 'Technical Rigor',
    badge: '5 ACCREDITATIONS',
    metric: '5 Certified',
    metricSub: 'INDUSTRY RIGOR',
    icon: '🔐',
    theme: 'violet',
    accentColor: '#a855f7',
    description:
      'Rigorous external certifications validating programming mastery, secure system principles, and generative artificial intelligence architectures from accredited bodies.',
    highlights: [
      'Python Institute: Basic Data Structures, Selection & Iteration Certified',
      'Foundations of Cybersecurity: Defensive architectures and access governance',
      'DevTown Generative AI Chatbot Development certification',
      'Official Web Developer Internship Certificate from Anugrah Accounting',
    ],
    tech: ['Python Certified', 'Cybersecurity', 'GenAI Chatbots', 'Data Structures', 'REST APIs'],
  },
  {
    id: 'hsc-gnfc',
    filterTag: 'STEM Foundation',
    role: 'Higher Secondary Certificate (HSC)',
    institution: 'GNFC Narmada Vidyalaya',
    period: '2021 – 2023',
    location: 'Bharuch, Gujarat (Gujarat Board)',
    type: 'Foundational Studies',
    badge: 'GRADUATED',
    metric: '73.46%',
    metricSub: 'GUJARAT BOARD',
    icon: '📐',
    theme: 'emerald',
    accentColor: '#10b981',
    description:
      'Strong scientific foundation in mathematics, logic, and quantitative problem-solving that directly established the analytical discipline for computer science and software architecture.',
    highlights: [
      'Strong scientific grounding in mathematics and quantitative reasoning',
      'Fundamentals of computer applications and algorithmic logic',
      'Disciplined analytical methodology that carried forward into BCA rank 1',
    ],
    tech: ['Mathematics', 'Logical Reasoning', 'Computer Basics', 'Quantitative Analysis'],
  },
]

/* ── CORE PILLARS (INSPIRED BY REFERENCE IMAGES 1 & 3: WHAT'S INCLUDED) ── */
const CORE_PILLARS = [
  {
    icon: '⚡',
    num: '01',
    title: 'Enterprise ITES Operations',
    tag: 'PATTERN LLC',
    desc: 'Managing offshore delivery, SLA adherence, and cross-functional teams for US & UK international client accounts.',
    badge: 'ACTIVE EXECUTIVE',
    accent: '#ff5722',
  },
  {
    icon: '🏆',
    num: '02',
    title: '9.55 CGPA Academic Rigor',
    tag: 'RANK 1 GOLD MEDALIST',
    desc: 'BCA department topper at Semcom CVM University with deep mastery across database architecture, Python, and software engineering.',
    badge: 'GOLD MEDALIST',
    accent: '#f59e0b',
  },
  {
    icon: '🚀',
    num: '03',
    title: 'Full-Stack Production Delivery',
    tag: 'SHIPPED SYSTEMS',
    desc: 'Engineered responsive client websites and scalable web software with sub-second latency and zero-data-loss ACID integrity.',
    badge: 'VERIFIED SHIPPED',
    accent: '#06b6d4',
  },
  {
    icon: '🛡️',
    num: '04',
    title: 'Accredited Technical Rigor',
    tag: 'CERTIFIED FOUNDATIONS',
    desc: 'Industry-certified in Python Data Structures, Cybersecurity, and GenAI chatbot development from recognized global bodies.',
    badge: '5 CREDENTIALS',
    accent: '#a855f7',
  },
]

/* ── TIMELINE ITEM HELPER ── */
function TimelineItem({ children, last }) {
  return (
    <div className={`timeline__item ${last ? 'timeline__item--last' : ''}`}>
      <div className="timeline__marker" aria-hidden="true">
        <div className="timeline__dot" />
        {!last && <div className="timeline__line" />}
      </div>
      <div className="timeline__content">{children}</div>
    </div>
  )
}

export default function Education() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [viewMode, setViewMode] = useState('odyssey') // 'odyssey' | 'timeline'
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)

  const hasExperience = experience.length > 0
  const hasCertifications = certifications.length > 0

  const totalMilestones = MILESTONES.length

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : totalMilestones - 1))
  }, [totalMilestones])

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev < totalMilestones - 1 ? prev + 1 : 0))
  }, [totalMilestones])

  /* Keyboard arrow navigation */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if user is viewing or focusing around the education section
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  /* Touch swipe handlers */
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section className="section education-section" id="education" aria-labelledby="education-heading">
      {/* Ambient background glow orbs */}
      <div className="edu__ambient-orb edu__ambient-orb--left" aria-hidden="true" />
      <div className="edu__ambient-orb edu__ambient-orb--right" aria-hidden="true" />

      <div className="container">

        {/* ── SECTION HEADER & VIEW SWITCHER ── */}
        <div className="edu-header-wrapper">
          <header className="section-header">
            <span className="section-label">Academic &amp; Professional Trajectory</span>
            <h2 className="section-title" id="education-heading">Education &amp; Experience</h2>
            <p className="section-subtitle">
              Consistent top-tier academic performance paired with verified hands-on industry experience delivering production client solutions.
            </p>
          </header>

          {/* Interactive Mode Switcher */}
          <div className="edu-view-switcher" role="tablist" aria-label="Trajectory display mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'odyssey'}
              className={`edu-view-tab ${viewMode === 'odyssey' ? 'edu-view-tab--active' : ''}`}
              onClick={() => setViewMode('odyssey')}
              id="tab-odyssey"
            >
              <span className="edu-view-tab__icon">🎴</span>
              <span>3D Odyssey Deck</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'timeline'}
              className={`edu-view-tab ${viewMode === 'timeline' ? 'edu-view-tab--active' : ''}`}
              onClick={() => setViewMode('timeline')}
              id="tab-timeline"
            >
              <span className="edu-view-tab__icon">🗺️</span>
              <span>Itinerary Timeline</span>
            </button>
          </div>
        </div>

        {/* ── 4 CORE PILLARS / VERIFIED COMPETENCIES (MATCHING REFERENCE IMAGE 1 & 3) ── */}
        <div className="core-pillars-grid" role="region" aria-label="Core Engineering & Academic Pillars">
          {CORE_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="core-pillar-card"
              style={{ '--pillar-accent': pillar.accent }}
            >
              <div className="pillar-top-row">
                <span className="pillar-num font-mono">{pillar.num}</span>
                <span className="pillar-badge font-mono">{pillar.badge}</span>
              </div>
              <div className="pillar-icon-box" aria-hidden="true">
                <span className="pillar-icon">{pillar.icon}</span>
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <span className="pillar-tag font-mono">{pillar.tag}</span>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CONDITIONAL VIEW: 3D COVERFLOW ODYSSEY DECK (INSPIRED BY REFERENCE IMAGES 2 & 5) ── */}
        {viewMode === 'odyssey' ? (
          <div className="odyssey-stage-container" ref={containerRef}>

            {/* Filter Navigation Pills (Matching Reference Image 2: Italy, Dubai...) */}
            <div className="odyssey-filter-nav" role="tablist" aria-label="Select career milestone">
              {MILESTONES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIdx === idx}
                  className={`odyssey-filter-pill ${activeIdx === idx ? 'odyssey-filter-pill--active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <span className="odyssey-filter-pill__icon" aria-hidden="true">{item.icon}</span>
                  <span className="odyssey-filter-pill__text">{item.filterTag}</span>
                  {activeIdx === idx && <span className="odyssey-filter-pill__indicator" />}
                </button>
              ))}
            </div>

            {/* 3D Perspective Coverflow Viewport */}
            <div
              className="odyssey-viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {MILESTONES.map((m, idx) => {
                const offset = idx - activeIdx
                const isCenter = offset === 0
                const isLeft = offset === -1
                const isRight = offset === 1
                const isFarLeft = offset === -2
                const isFarRight = offset === 2
                const isVisible = Math.abs(offset) <= 2

                if (!isVisible) return null

                let cardClass = 'odyssey-card'
                if (isCenter) cardClass += ' odyssey-card--center'
                else if (isLeft) cardClass += ' odyssey-card--left'
                else if (isRight) cardClass += ' odyssey-card--right'
                else if (isFarLeft) cardClass += ' odyssey-card--far-left'
                else if (isFarRight) cardClass += ' odyssey-card--far-right'

                return (
                  <div
                    key={m.id}
                    className={cardClass}
                    style={{
                      '--milestone-accent': m.accentColor,
                    }}
                    onClick={() => setActiveIdx(idx)}
                    role="group"
                    aria-label={`Milestone: ${m.role}`}
                    aria-hidden={!isCenter}
                  >
                    {/* Glowing Perimeter & Aura */}
                    <div className="odyssey-card__aura" aria-hidden="true" />
                    <span className="odyssey-card__laser-border" aria-hidden="true" />

                    {/* Card Top Meta Bar */}
                    <div className="odyssey-card__top">
                      <div className="odyssey-card__tags">
                        <span className="odyssey-card__type-tag font-mono">{m.type}</span>
                        <span className="odyssey-card__badge-tag font-mono">{m.badge}</span>
                      </div>
                      <div className="odyssey-card__meta-right">
                        <span className="odyssey-card__period font-mono">{m.period}</span>
                        <span className="odyssey-card__num font-mono">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </div>

                    {/* Milestone Titles */}
                    <div className="odyssey-card__header-content">
                      <div className="odyssey-card__icon-badge" aria-hidden="true">{m.icon}</div>
                      <div>
                        <h3 className="odyssey-card__role">{m.role}</h3>
                        <p className="odyssey-card__inst">
                          <strong>{m.institution}</strong> · {m.location}
                        </p>
                      </div>
                    </div>

                    {/* Monumental Metric Callout (Matching Reference Image 3 Box) */}
                    <div className="odyssey-card__metric-box">
                      <div className="odyssey-card__metric-val">{m.metric}</div>
                      <div className="odyssey-card__metric-sub font-mono">{m.metricSub}</div>
                      <div className="odyssey-card__metric-spark" aria-hidden="true">✦</div>
                    </div>

                    {/* Narrative Description */}
                    <p className="odyssey-card__desc">{m.description}</p>

                    {/* Verified Highlights / Deliverables */}
                    <div className="odyssey-card__deliverables">
                      <span className="odyssey-card__deliv-title font-mono">CORE DELIVERABLES &amp; IMPACT:</span>
                      <ul className="odyssey-card__highlights-list">
                        {m.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="odyssey-card__highlight-item">
                            <span className="odyssey-card__check" aria-hidden="true">✦</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="odyssey-card__tech-row">
                      {m.tech.map((t) => (
                        <span key={t} className="odyssey-card__tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 3D Stage Navigation Controls & Pagination */}
            <div className="odyssey-controls-row">
              <button
                type="button"
                className="odyssey-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous career milestone"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="odyssey-pagination">
                <span className="odyssey-counter font-mono">
                  {String(activeIdx + 1).padStart(2, '0')} <span className="odyssey-counter-sep">/</span> {String(totalMilestones).padStart(2, '0')}
                </span>
                <div className="odyssey-dots">
                  {MILESTONES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      className={`odyssey-dot ${dotIdx === activeIdx ? 'odyssey-dot--active' : ''}`}
                      onClick={() => setActiveIdx(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="odyssey-arrow-btn"
                onClick={handleNext}
                aria-label="Next career milestone"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Hint Ticker */}
            <div className="odyssey-hint font-mono" aria-hidden="true">
              <span>USE ARROW KEYS OR SWIPE TO EXPLORE CAREER TRAJECTORY</span>
            </div>

          </div>
        ) : (
          /* ── ALTERNATIVE VIEW: ITINERARY CHRONOLOGICAL TIMELINE (INSPIRED BY REFERENCE IMAGE 1) ── */
          <div className="education__layout animate-fade-in">
            {/* Academic Background */}
            <div>
              <div className="edu-col-header">
                <span className="edu-col-badge">Academic Background</span>
                <h3 className="edu-col-title">Degrees &amp; Qualifications</h3>
              </div>

              <div className="timeline" role="list">
                {education.map((edu, i) => (
                  <TimelineItem key={edu.id} last={i === education.length - 1}>
                    <div className="edu-card" role="listitem" aria-labelledby={`edu-${edu.id}`}>
                      <div className="edu-card__header">
                        <div>
                          <h4 className="edu-card__degree" id={`edu-${edu.id}`}>{edu.degree}</h4>
                          <p className="edu-card__institution">
                            {edu.institution}
                            {edu.location && ` · ${edu.location}`}
                          </p>
                        </div>
                        <div className="edu-card__badges">
                          {edu.score && (
                            <span className="edu-score-badge">{edu.score}</span>
                          )}
                          <span className={`edu-status ${edu.status === 'Currently Pursuing' ? 'edu-status--current' : 'edu-status--done'}`}>
                            {edu.status}
                          </span>
                        </div>
                      </div>

                      {(edu.startYear || edu.endYear) && (
                        <p className="edu-card__years">
                          {edu.startYear ?? '—'} – {edu.endYear ?? (edu.status === 'Currently Pursuing' ? 'Present' : '—')}
                        </p>
                      )}

                      {edu.relevant?.length > 0 && (
                        <div className="edu-card__relevant">
                          <span className="edu-card__relevant-label">Core Focus:</span>
                          <div className="edu-card__relevant-list">
                            {edu.relevant.map((r) => (
                              <span key={r} className="badge">{r}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </div>

            {/* Industry Practice */}
            {hasExperience && (
              <div>
                <div className="edu-col-header">
                  <span className="edu-col-badge edu-col-badge--exp">Industry Practice</span>
                  <h3 className="edu-col-title">Work &amp; Internships</h3>
                </div>

                <div className="timeline" role="list">
                  {experience.map((exp, i) => (
                    <TimelineItem key={exp.id} last={i === experience.length - 1}>
                      <div className="edu-card" role="listitem">
                        <div className="edu-card__header">
                          <div>
                            <h4 className="edu-card__degree">{exp.role}</h4>
                            <p className="edu-card__institution">{exp.company} · {exp.location}</p>
                          </div>
                          <span className="edu-status edu-status--exp">{exp.type}</span>
                        </div>
                        <p className="edu-card__years">{exp.startDate} – {exp.endDate}</p>
                        {exp.description && (
                          <p className="edu-card__desc">
                            {exp.description}
                          </p>
                        )}
                        {exp.highlights?.length > 0 && (
                          <ul className="edu-card__highlights">
                            {exp.highlights.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        )}
                        {exp.tech?.length > 0 && (
                          <div className="edu-card__relevant-list" style={{ marginTop: 'var(--space-3)' }}>
                            {exp.tech.map((t) => (
                              <span key={t} className="badge badge--violet">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </TimelineItem>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── WORK PROCESS & CRIMSON SIGNATURE QUOTE (REFERENCE DESIGN) ── */}
        <div className="edu-process-row">

          {/* Work Process Stepper with Interactive Highlight */}
          <div className="work-process-card">
            <div className="work-process-header">
              <span className="edu-col-badge">Proven Methodology</span>
              <h3 className="work-process-title">Engineering Work Process</h3>
            </div>

            <div className="work-process-list">
              {[
                { num: '01', title: 'DISCOVER', desc: 'Understanding core requirements, client goals, and domain constraints.', icon: '🔍' },
                { num: '02', title: 'IDEATE', desc: 'Architecture planning, schema design, and modular component contracts.', icon: '💡' },
                { num: '03', title: 'DESIGN', desc: 'Crafting responsive user flows with sub-20ms latency and high visual fidelity.', icon: '📐' },
                { num: '04', title: 'DEVELOP', desc: 'Writing clean React 19 + FastAPI code with 100% ACID transactional integrity.', icon: '</>' },
                { num: '05', title: 'DELIVER', desc: 'End-to-end testing, performance profiling, and production release.', icon: '🚀' },
              ].map((step, sIdx) => (
                <div
                  key={step.num}
                  className={`work-process-step ${activeStep === sIdx ? 'work-process-step--active' : ''}`}
                  onMouseEnter={() => setActiveStep(sIdx)}
                  onClick={() => setActiveStep(sIdx)}
                >
                  <span className="work-process-num font-mono">{step.num}</span>
                  <div className="work-process-icon" aria-hidden="true">{step.icon}</div>
                  <div className="work-process-body">
                    <h4 className="work-process-step-title">{step.title}</h4>
                    <p className="work-process-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crimson Signature Quote Card (Matching Reference) */}
          <div className="crimson-quote-card">
            <div className="crimson-quote-glow" aria-hidden="true" />
            <span className="crimson-quote-mark" aria-hidden="true">“</span>

            <p className="crimson-quote-text">
              Good architecture is not just how it looks, but how it works, scales, and performs under production load.
            </p>

            <div className="crimson-quote-author">
              <span className="crimson-quote-sig">Kavya Modi</span>
              <span className="crimson-quote-role font-mono">OPERATING EXECUTIVE // PATTERN LLC</span>
            </div>

            <a href="#contact" className="crimson-quote-cta">
              <span>LET'S CREATE SOMETHING GREAT TOGETHER.</span>
              <span className="crimson-quote-spark">✦</span>
            </a>
          </div>

        </div>

        {/* ── VERIFIED CERTIFICATIONS & ACHIEVEMENTS GRID ── */}
        {hasCertifications && (
          <div className="cert-section animate-fade-in">
            <div className="cert-section__header">
              <div>
                <span className="section-label">Verified Qualifications</span>
                <h3 className="cert-section__title">Certificates &amp; Achievements</h3>
              </div>
              <p className="cert-section__sub">
                Official credentials verifying Python programming, cybersecurity foundations, AI chatbot development, and practical internship execution.
              </p>
            </div>

            <div className="cert__grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="cert-card">
                  <div className="cert-card__icon" aria-hidden="true">
                    {cert.category === 'Programming' ? '🐍'
                      : cert.category === 'Security' ? '🔐'
                      : cert.category === 'Artificial Intelligence' ? '🤖'
                      : '🏆'}
                  </div>
                  <div className="cert-card__content">
                    <span className="cert-card__category">{cert.category}</span>
                    <h4 className="cert-card__title">{cert.title}</h4>
                    <p className="cert-card__issuer">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}

              {achievements.map((ach) => (
                <div key={ach.id} className="cert-card cert-card--achieve">
                  <div className="cert-card__icon" aria-hidden="true">⭐</div>
                  <div className="cert-card__content">
                    <span className="cert-card__category">Honors &amp; Distinction</span>
                    <h4 className="cert-card__title">{ach.title}</h4>
                    <p className="cert-card__issuer">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
