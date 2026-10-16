import { useState } from 'react'
import { skills, projects } from '../../data/portfolioData'
import './Skills.css'

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
            A curated set of technologies I use to build real-world applications. Click any skill to inspect related projects and system usage.
          </p>
        </header>

        {/* Selected skill info banner */}
        {selectedSkill && (
          <div className="skills__selected-banner animate-fade-in" role="region" aria-live="polite">
            <div className="skills__selected-header">
              <div>
                <span className="skills__selected-label">Selected Technology:</span>
                <span className="skills__selected-name">{selectedSkill}</span>
              </div>
              <button
                type="button"
                className="skills__selected-clear"
                onClick={() => setSelectedSkill(null)}
                aria-label="Clear selected skill"
              >
                Clear selection &times;
              </button>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="skills__selected-projects">
                <span className="skills__selected-sub">Featured in projects:</span>
                <div className="skills__selected-list">
                  {relatedProjects.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      className="skills__project-link"
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.getElementById(`project-title-${p.id}`)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                    >
                      {p.title} &rarr;
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="skills__selected-note">
                Used in academic coursework, foundational computer science exercises, and continuous learning modules.
              </p>
            )}
          </div>
        )}

        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`skills__group animate-fade-in delay-${i + 1}`}
              role="group"
              aria-labelledby={`skill-cat-${i}`}
            >
              <h3 className="skills__category" id={`skill-cat-${i}`}>
                {group.category}
              </h3>
              <div className="skills__items" role="list">
                {group.items.map((item) => {
                  const isSelected = selectedSkill === item
                  return (
                    <button
                      key={item}
                      type="button"
                      className={`skills__item ${isSelected ? 'skills__item--active' : ''}`}
                      onClick={() => handleSkillClick(item)}
                      aria-pressed={isSelected}
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
      </div>
    </section>
  )
}
