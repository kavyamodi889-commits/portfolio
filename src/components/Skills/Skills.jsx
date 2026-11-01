import { useState } from 'react'
import { skills, projects } from '../../data/portfolioData'
import AnimatedCounter from '../Common/AnimatedCounter'
import './Skills.css'

/* Proficiency levels per skill — curated to feel honest */
const PROFICIENCY = {
  'React': 92, 'JavaScript': 90, 'PHP': 78, 'Python': 82, 'TypeScript': 70,
  'Node.js': 75, 'HTML5': 96, 'CSS3': 94, 'MySQL': 86, 'FastAPI': 72,
  'Tailwind CSS': 88, 'Bootstrap': 84, 'MongoDB': 65, 'SQLite': 78,
  'Git': 85, 'GitHub': 85, 'Vite': 80, 'Figma': 68, 'REST APIs': 88,
  'Windows Forms': 72, 'VB.NET': 65, 'Vercel': 80, 'Netlify': 78,
}

const CATEGORY_ICONS = {
  'Languages & Frameworks': '⚡',
  'Styling & UI':           '🎨',
  'Databases & Storage':    '🗄️',
  'Tools & DevOps':         '🛠️',
  'Professional Skills':    '🧠',
}

const CATEGORY_ACCENTS = {
  'Languages & Frameworks': '#ff5722',
  'Styling & UI':           '#a855f7',
  'Databases & Storage':    '#06b6d4',
  'Tools & DevOps':         '#10b981',
  'Professional Skills':    '#f59e0b',
}

const TOP_SKILLS = ['React', 'JavaScript', 'PHP', 'Python', 'MySQL', 'Node.js', 'HTML5', 'CSS3']

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const relatedProjects = selectedSkill
    ? projects.filter((p) => p.tech.some((t) => t.toLowerCase() === selectedSkill.toLowerCase()))
    : []

  const handleSkillClick = (skill) => {
    setSelectedSkill((prev) => (prev === skill ? null : skill))
  }

  const totalSkills = skills.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      {/* Ambient orbs */}
      <div className="skills__orb skills__orb--left" aria-hidden="true" />
      <div className="skills__orb skills__orb--right" aria-hidden="true" />

      <div className="container">
        {/* ── SECTION HEADER ── */}
        <header className="section-header">
          <span className="section-label">Technical Profile</span>
          <h2 className="section-title" id="skills-heading">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            A curated set of technologies I use to build real-world applications. Click any skill to inspect related projects.
          </p>
        </header>

        {/* ── TOP SKILLS HERO ROW ── */}
        <div className="skills__hero-row">
          {/* Left: Telemetry stat panel */}
          <div className="skills__stat-panel">
            <div className="skills__stat-panel-glow" aria-hidden="true" />
            <span className="skills__stat-panel-label">TECH ARSENAL</span>
            <div className="skills__stat-panel-num">
              <AnimatedCounter end={totalSkills} suffix="+" duration={2000} />
            </div>
            <p className="skills__stat-panel-sub">
              Technologies, frameworks and tools across full-stack development, data, and operations.
            </p>

            {/* Category breakdown pills */}
            <div className="skills__cat-pills">
              {skills.map((g) => (
                <div
                  key={g.category}
                  className="skills__cat-pill"
                  style={{ '--cat-accent': CATEGORY_ACCENTS[g.category] || '#ff5722' }}
                >
                  <span className="skills__cat-pill-icon">{CATEGORY_ICONS[g.category] || '💡'}</span>
                  <span className="skills__cat-pill-name">{g.category}</span>
                  <span className="skills__cat-pill-count">{g.items.length}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Top 8 featured skills with proficiency rings */}
          <div className="skills__top-featured">
            <span className="skills__featured-label">CORE COMPETENCIES</span>
            <div className="skills__top-grid">
              {TOP_SKILLS.map((skill) => {
                const pct = PROFICIENCY[skill] || 80
                const isActive = selectedSkill === skill
                return (
                  <button
                    key={skill}
                    type="button"
                    className={`skills__top-item ${isActive ? 'skills__top-item--active' : ''}`}
                    onClick={() => handleSkillClick(skill)}
                    aria-pressed={isActive}
                  >
                    <div className="skills__ring-wrap">
                      <svg className="skills__ring-svg" viewBox="0 0 36 36" aria-hidden="true">
                        <circle className="skills__ring-track" cx="18" cy="18" r="15" />
                        <circle
                          className="skills__ring-fill"
                          cx="18" cy="18" r="15"
                          style={{
                            strokeDasharray: `${(pct / 100) * 94.25} 94.25`,
                            stroke: isActive ? '#ffffff' : CATEGORY_ACCENTS[
                              skills.find(g => g.items.includes(skill))?.category
                            ] || '#ff5722',
                          }}
                        />
                      </svg>
                      <span className="skills__ring-pct">{pct}</span>
                    </div>
                    <span className="skills__top-name">{skill}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── SELECTED SKILL BANNER ── */}
        {selectedSkill && (
          <div className="skills__selected-banner animate-fade-in" role="region" aria-live="polite">
            <div className="skills__selected-header">
              <div>
                <span className="skills__selected-label">Inspecting:</span>
                <span className="skills__selected-name"> {selectedSkill}</span>
                {PROFICIENCY[selectedSkill] && (
                  <span className="skills__selected-pct font-mono">
                    — {PROFICIENCY[selectedSkill]}% proficiency
                  </span>
                )}
              </div>
              <button
                type="button"
                className="skills__selected-clear"
                onClick={() => setSelectedSkill(null)}
                aria-label="Clear selected skill"
              >
                Clear ×
              </button>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="skills__selected-projects">
                <span className="skills__selected-sub">Used in:</span>
                <div className="skills__selected-list">
                  {relatedProjects.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      className="skills__project-link"
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.getElementById(p.id)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                    >
                      {p.title} →
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="skills__selected-note">
                Used in academic coursework and continuous learning.
              </p>
            )}
          </div>
        )}

        {/* ── SKILLS CATEGORIES GRID with mini progress bars ── */}
        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`skill-category animate-fade-in delay-${Math.min(i + 1, 6)}`}
              role="group"
              aria-labelledby={`skill-cat-${i}`}
              style={{
                animationDelay: `${i * 80}ms`,
                '--cat-accent': CATEGORY_ACCENTS[group.category] || '#ff5722',
              }}
            >
              {/* Category header */}
              <div className="skill-category__header">
                <span className="skill-category__icon" aria-hidden="true">
                  {CATEGORY_ICONS[group.category] || '💡'}
                </span>
                <h3 className="skill-category__title" id={`skill-cat-${i}`}>
                  {group.category}
                </h3>
                <span className="skill-category__count">{group.items.length}</span>
              </div>

              {/* Skill pills */}
              <div className="skill-category__items" role="list">
                {group.items.map((item) => {
                  const isActive = selectedSkill === item
                  const pct = PROFICIENCY[item]
                  return (
                    <button
                      key={item}
                      type="button"
                      className={`skill-badge-pill ${isActive ? 'skill-badge-pill--active' : ''}`}
                      onClick={() => handleSkillClick(item)}
                      aria-pressed={isActive}
                      role="listitem"
                    >
                      {item}
                      {pct && (
                        <span className="skill-pill-bar" aria-hidden="true">
                          <span
                            className="skill-pill-bar__fill"
                            style={{ width: `${pct}%`, background: isActive ? '#ffffff' : CATEGORY_ACCENTS[group.category] || '#ff5722' }}
                          />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── SUMMARY STATS ── */}
        <div className="skills__summary">
          <div className="skills__summary-card">
            <span className="skills__summary-val"><AnimatedCounter end={30} suffix="+" duration={2000} /></span>
            <span className="skills__summary-lbl">Technologies</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val"><AnimatedCounter end={7} suffix="+" duration={1800} /></span>
            <span className="skills__summary-lbl">Live Projects</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val"><AnimatedCounter end={3} duration={1500} /></span>
            <span className="skills__summary-lbl">Years Learning</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val"><AnimatedCounter end={9.55} decimals={2} duration={2200} /></span>
            <span className="skills__summary-lbl">CGPA Score</span>
          </div>
        </div>
      </div>
    </section>
  )
}
