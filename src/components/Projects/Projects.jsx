import { useState, useMemo } from 'react'
import { projects } from '../../data/portfolioData'
import './Projects.css'

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function StatusBadge({ status }) {
  const isLive = status === 'Active'
  return (
    <span className={`project-status ${isLive ? 'status--active' : 'status--done'}`}>
      {isLive && <span className="project-status__dot" aria-hidden="true" />}
      {status}
    </span>
  )
}

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  // Dynamically extract unique categories and maintain counts
  const categoriesWithCounts = useMemo(() => {
    const counts = { All: projects.length }
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    const cats = ['All', ...Object.keys(counts).filter((c) => c !== 'All')]
    return cats.map((cat) => ({ name: cat, count: counts[cat] }))
  }, [])

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return projects
    return projects.filter((p) => p.category === selectedFilter)
  }, [selectedFilter])

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Engineered Solutions</span>
          <h2 className="section-title" id="projects-heading">Featured Projects</h2>
          <p className="section-subtitle">
            Production-grade systems, desktop business platforms, and full-stack software built with performance, security, and clean architecture.
          </p>
        </header>

        {/* Dynamic Category Filters with Counts & Animation */}
        <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
          {categoriesWithCounts.map(({ name, count }) => {
            const isActive = selectedFilter === name
            return (
              <button
                key={name}
                role="tab"
                aria-selected={isActive}
                className={`projects__filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFilter(name)}
                type="button"
              >
                <span className="projects__filter-label">{name}</span>
                <span className="projects__filter-count">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Projects Grid with Smooth Card Transitions */}
        <div className="projects__grid" key={selectedFilter}>
          {filteredProjects.map((project, i) => {
            const isExpanded = expandedId === project.id

            return (
              <article
                key={project.id}
                className={`project-card ${isExpanded ? 'project-card--expanded' : ''}`}
                style={{ animationDelay: `${i * 70}ms` }}
                aria-labelledby={`project-title-${project.id}`}
                id={project.id}
              >
                {/* Visual Header / Meta */}
                <div className="project-card__header">
                  <div className="project-card__meta">
                    <span className="project-card__category">{project.category}</span>
                    <StatusBadge status={project.status} />
                  </div>
                  {project.year && (
                    <span className="project-card__year">{project.year}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="project-card__title" id={`project-title-${project.id}`}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="project-card__desc">{project.shortDescription}</p>

                {/* Action CTA Pills: Live Demo & GitHub */}
                <div className="project-card__actions" role="group" aria-label={`Actions for ${project.title}`}>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-project-action btn-project-live"
                      aria-label={`Open live demo of ${project.title}`}
                    >
                      <span>Live Demo</span>
                      <ExternalLinkIcon />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-project-action btn-project-code"
                      aria-label={`View source code of ${project.title} on GitHub`}
                    >
                      <GitHubIcon />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>

                {/* Highlights List */}
                {project.highlights?.length > 0 && (
                  <ul className="project-card__highlights" aria-label="Key features">
                    {project.highlights.slice(0, 3).map((h) => (
                      <li key={h}>
                        <span className="project-highlight__bullet" aria-hidden="true">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Expandable Engineering Deep Dive Drawer */}
                <div className={`project-card__drawer ${isExpanded ? 'open' : ''}`}>
                  <div className="project-drawer__content">
                    <div className="project-card__drawer-section">
                      <span className="project-drawer__label">System Architecture & Overview</span>
                      <p className="project-drawer__text">{project.description}</p>
                    </div>

                    {project.highlights?.length > 3 && (
                      <div className="project-card__drawer-section">
                        <span className="project-drawer__label">Additional Capabilities</span>
                        <ul className="project-card__highlights-extra">
                          {project.highlights.slice(3).map((h) => (
                            <li key={h}>
                              <span className="project-highlight__bullet" aria-hidden="true">✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="project-card__drawer-section">
                      <span className="project-drawer__label">Engineering Standards</span>
                      <p className="project-drawer__text">
                        Modular separation of concerns, secure input handling, normalized relational data models, and production deployment standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Toggle Detail & Tech stack */}
                <div className="project-card__footer">
                  <button
                    type="button"
                    className="project-card__toggle-btn"
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Close Engineering Specs' : 'View Engineering Specs'}</span>
                    <span className="project-toggle__icon" aria-hidden="true">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>
                </div>

                {/* Tech stack badges */}
                <div className="project-card__tech" role="list" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <span key={t} className="badge project-badge" role="listitem">{t}</span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
