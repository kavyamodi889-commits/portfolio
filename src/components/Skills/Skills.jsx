import { useState } from 'react'
import { skills, projects } from '../../data/portfolioData'
import './Skills.css'

const CATEGORY_ICONS = {
  'Languages & Frameworks': '⚡',
  'Styling & UI': '🎨',
  'Databases & Storage': '🗄️',
  'Tools & DevOps': '🛠️',
  'Professional Skills': '🧠',
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const relatedProjects = selectedSkill
    ? projects.filter((p) => p.tech.some((t) => t.toLowerCase() === selectedSkill.toLowerCase()))
    : []

  const handleSkillClick = (skill) => {
    setSelectedSkill((prev) => (prev === skill ? null : skill))
  }

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Technical Profile</span>
          <h2 className="section-title" id="skills-heading">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            A curated set of technologies I use to build real-world applications. Click any skill to inspect related projects.
          </p>
        </header>

        {/* Selected skill info banner */}
        {selectedSkill && (
          <div className="skills__selected-banner animate-fade-in" role="region" aria-live="polite">
            <div className="skills__selected-header">
              <div>
                <span className="skills__selected-label">Selected:</span>
                <span className="skills__selected-name"> {selectedSkill}</span>
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
                <span className="skills__selected-sub">Featured in:</span>
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
              <p className="skills__selected-note" style={{ fontSize: 'var(--text-xs)', color: '#64748b', marginTop: '0.5rem' }}>
                Used in academic coursework and continuous learning.
              </p>
            )}
          </div>
        )}

        {/* Skills Grid */}
        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`skill-category animate-fade-in delay-${Math.min(i + 1, 6)}`}
              role="group"
              aria-labelledby={`skill-cat-${i}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="skill-category__header">
                <span className="skill-category__icon" aria-hidden="true">
                  {CATEGORY_ICONS[group.category] || '💡'}
                </span>
                <h3 className="skill-category__title" id={`skill-cat-${i}`}>
                  {group.category}
                </h3>
                <span className="skill-category__count">{group.items.length}</span>
              </div>

              <div className="skill-category__items" role="list">
                {group.items.map((item) => {
                  const isActive = selectedSkill === item
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
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="skills__summary">
          <div className="skills__summary-card">
            <span className="skills__summary-val">30+</span>
            <span className="skills__summary-lbl">Technologies</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val">7+</span>
            <span className="skills__summary-lbl">Live Projects</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val">3</span>
            <span className="skills__summary-lbl">Years Learning</span>
          </div>
          <div className="skills__summary-card">
            <span className="skills__summary-val">9.55</span>
            <span className="skills__summary-lbl">CGPA Score</span>
          </div>
        </div>
      </div>
    </section>
  )
}
