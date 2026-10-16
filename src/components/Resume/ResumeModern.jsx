import { formatYears, cleanUrl, shouldShow, featuredProjects } from './resumeUtils'
import './ResumeModern.css'

/**
 * Modern Developer Template
 * - Restrained violet accent sidebar header
 * - Clean two-zone layout
 * - Elegant typography
 * - Fully selectable text
 */
export default function ResumeModern({ data }) {
  const {
    profile, skills, projects, education, experience,
    certifications, achievements, languages, contactLinks,
  } = data

  const github = contactLinks.find((l) => l.icon === 'github')
  const featured = featuredProjects(projects)

  return (
    <div className="mod-resume" role="document" aria-label="Modern Developer Résumé">
      {/* ─── HEADER BAND ────────────────────────────────── */}
      <header className="mod-resume__header">
        <div className="mod-resume__header-inner">
          <div>
            <h1 className="mod-resume__name">{profile.name}</h1>
            {profile.headline && (
              <p className="mod-resume__headline">{profile.headline}</p>
            )}
          </div>
          <div className="mod-resume__contact" role="list" aria-label="Contact information">
            {profile.location && (
              <span role="listitem" className="mod-contact__item">
                <span className="mod-contact__icon" aria-hidden="true">◎</span>
                {profile.location}
              </span>
            )}
            {github && (
              <span role="listitem" className="mod-contact__item">
                <span className="mod-contact__icon" aria-hidden="true">⌥</span>
                <a href={github.url} target="_blank" rel="noopener noreferrer">
                  {cleanUrl(github.url)}
                </a>
              </span>
            )}
            {profile.linkedin && (
              <span role="listitem" className="mod-contact__item">
                <span className="mod-contact__icon" aria-hidden="true">ℓ</span>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  {cleanUrl(profile.linkedin)}
                </a>
              </span>
            )}
            {profile.website && (
              <span role="listitem" className="mod-contact__item">
                <span className="mod-contact__icon" aria-hidden="true">🌐</span>
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {cleanUrl(profile.website)}
                </a>
              </span>
            )}
            {profile.email && (
              <span role="listitem" className="mod-contact__item">
                <span className="mod-contact__icon" aria-hidden="true">@</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ─── BODY ──────────────────────────────────────── */}
      <div className="mod-resume__body">

        {/* Summary */}
        {shouldShow(data, 'summary') && profile.summary && (
          <section className="mod-section mod-section--full" aria-labelledby="mod-summary">
            <h2 className="mod-section__title" id="mod-summary">Summary</h2>
            <p className="mod-section__text">{profile.summary}</p>
          </section>
        )}

        {/* Two-column area */}
        <div className="mod-resume__two-col">
          {/* Left column — main content */}
          <div className="mod-resume__main">

            {/* Education */}
            {shouldShow(data, 'education') && education.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-education">
                <h2 className="mod-section__title" id="mod-education">Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mod-entry">
                    <div className="mod-entry__top">
                      <div>
                        <div className="mod-entry__title">{edu.degree}</div>
                        <div className="mod-entry__org">{edu.institution}</div>
                        {edu.location && <div className="mod-entry__meta">{edu.location}</div>}
                      </div>
                      <div className="mod-entry__right">
                        <span className="mod-entry__date">
                          {formatYears(edu.startYear, edu.endYear, edu.status) || edu.status}
                        </span>
                        {edu.status === 'Currently Pursuing' && (
                          <span className="mod-badge mod-badge--active">Current</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Experience */}
            {shouldShow(data, 'experience') && experience.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-experience">
                <h2 className="mod-section__title" id="mod-experience">Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mod-entry">
                    <div className="mod-entry__top">
                      <div>
                        <div className="mod-entry__title">{exp.role}</div>
                        <div className="mod-entry__org">{exp.company}</div>
                        <div className="mod-entry__meta">{exp.location} · {exp.type}</div>
                      </div>
                      <span className="mod-entry__date">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    {exp.description && <p className="mod-entry__desc">{exp.description}</p>}
                    {exp.highlights?.length > 0 && (
                      <ul className="mod-entry__bullets">
                        {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {shouldShow(data, 'projects') && featured.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-projects">
                <h2 className="mod-section__title" id="mod-projects">Projects</h2>
                {featured.map((proj) => (
                  <div key={proj.id} className="mod-entry">
                    <div className="mod-entry__top">
                      <div>
                        <div className="mod-entry__title">
                          {proj.title}
                          {proj.live && (
                            <a href={proj.live} target="_blank" rel="noopener noreferrer" className="mod-entry__ext">↗</a>
                          )}
                        </div>
                        <div className="mod-entry__meta mod-entry__tech">
                          {proj.tech.join(' · ')}
                        </div>
                      </div>
                      <div className="mod-entry__right">
                        {proj.year && <span className="mod-entry__date">{proj.year}</span>}
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="mod-badge mod-badge--link">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.shortDescription && (
                      <p className="mod-entry__desc">{proj.shortDescription}</p>
                    )}
                    {proj.highlights?.length > 0 && (
                      <ul className="mod-entry__bullets">
                        {proj.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right column — skills, languages, etc. */}
          <aside className="mod-resume__aside">
            {/* Skills */}
            {shouldShow(data, 'skills') && skills.some((g) => g.items.length > 0) && (
              <section className="mod-section" aria-labelledby="mod-skills">
                <h2 className="mod-section__title" id="mod-skills">Skills</h2>
                {skills.filter((g) => g.items.length > 0).map((group) => (
                  <div key={group.category} className="mod-skills__group">
                    <div className="mod-skills__cat">{group.category}</div>
                    <div className="mod-skills__items">
                      {group.items.map((item) => (
                        <span key={item} className="mod-skill-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {shouldShow(data, 'certifications') && certifications.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-certs">
                <h2 className="mod-section__title" id="mod-certs">Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mod-aside-entry">
                    <div className="mod-aside-entry__name">{cert.name}</div>
                    <div className="mod-aside-entry__meta">{cert.issuer}{cert.date && ` · ${cert.date}`}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {shouldShow(data, 'achievements') && achievements.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-ach">
                <h2 className="mod-section__title" id="mod-ach">Achievements</h2>
                {achievements.map((ach) => (
                  <div key={ach.id} className="mod-aside-entry">
                    <div className="mod-aside-entry__name">{ach.title}{ach.year && ` · ${ach.year}`}</div>
                    {ach.description && <div className="mod-aside-entry__meta">{ach.description}</div>}
                  </div>
                ))}
              </section>
            )}

            {/* Languages */}
            {shouldShow(data, 'languages') && languages.length > 0 && (
              <section className="mod-section" aria-labelledby="mod-languages">
                <h2 className="mod-section__title" id="mod-languages">Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.name} className="mod-aside-entry">
                    <div className="mod-aside-entry__name">{lang.name}</div>
                    <div className="mod-aside-entry__meta">{lang.proficiency}</div>
                  </div>
                ))}
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
