import { formatYears, cleanUrl, shouldShow, featuredProjects } from './resumeUtils'
import './ResumeModern.css'

/**
 * Modern Developer Template (Pinterest / RedSun Editorial 2-Page A4 Aesthetic)
 * - Complete, uncompromised information fidelity
 * - Exact A4 pagination: Page 1 (Experience, Education, Skills) | Page 2 (Projects, Certifications, Achievements, Languages)
 * - Elegant luxury solar gradient header band
 * - Crisp, high-contrast, fully selectable typography
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
      {/* ══════════════════════════════════════════════════════
          PAGE 1: PROFILE, EXPERIENCE, EDUCATION, SKILLS
          ══════════════════════════════════════════════════════ */}
      <div className="mod-resume__page mod-resume__page--1">
        {/* Header Band */}
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
                  <span className="mod-contact__icon" aria-hidden="true">📍</span>
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span role="listitem" className="mod-contact__item">
                  <span className="mod-contact__icon" aria-hidden="true">📞</span>
                  {profile.phone}
                </span>
              )}
              {profile.email && (
                <span role="listitem" className="mod-contact__item">
                  <span className="mod-contact__icon" aria-hidden="true">✉</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
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
                  <span className="mod-contact__icon" aria-hidden="true">in</span>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    {cleanUrl(profile.linkedin)}
                  </a>
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Page 1 Body */}
        <div className="mod-resume__body">
          {/* Summary */}
          {shouldShow(data, 'summary') && profile.summary && (
            <section className="mod-section mod-section--full" aria-labelledby="mod-summary">
              <h2 className="mod-section__title" id="mod-summary">Professional Summary</h2>
              <p className="mod-section__text">{profile.summary}</p>
            </section>
          )}

          {/* Page 1 Two-Column Grid */}
          <div className="mod-resume__two-col">
            {/* Left: Experience */}
            <div className="mod-resume__col-left">
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
            </div>

            {/* Right: Education & Technical Skills */}
            <div className="mod-resume__col-right">
              {/* Education */}
              {shouldShow(data, 'education') && education.length > 0 && (
                <section className="mod-section" aria-labelledby="mod-education">
                  <h2 className="mod-section__title" id="mod-education">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mod-entry mod-entry--compact">
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
                          {edu.score && (
                            <span className="mod-badge mod-badge--active">{edu.score}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Skills */}
              {shouldShow(data, 'skills') && skills.some((g) => g.items.length > 0) && (
                <section className="mod-section" aria-labelledby="mod-skills">
                  <h2 className="mod-section__title" id="mod-skills">Technical Skills</h2>
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
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PAGE 2: FEATURED PROJECTS, CERTS, ACHIEVEMENTS, LANGS
          ══════════════════════════════════════════════════════ */}
      <div className="mod-resume__page mod-resume__page--2">
        {/* Page 2 Mini Header Bar */}
        <div className="mod-page-header">
          <div className="mod-page-header__left">
            <span className="mod-page-header__name">{profile.name}</span>
            <span className="mod-page-header__role">· {profile.headline}</span>
          </div>
          <div className="mod-page-header__right">
            <span>{profile.email}</span>
            <span>·</span>
            <span>{cleanUrl(profile.website || 'kavyamodi.vercel.app')}</span>
            <span className="mod-page-header__badge">Page 2 of 2</span>
          </div>
        </div>

        {/* Page 2 Body */}
        <div className="mod-resume__body mod-resume__body--p2">
          <div className="mod-resume__two-col">
            {/* Left: Featured Projects */}
            <div className="mod-resume__col-left">
              {shouldShow(data, 'projects') && featured.length > 0 && (
                <section className="mod-section" aria-labelledby="mod-projects">
                  <h2 className="mod-section__title" id="mod-projects">Featured Projects</h2>
                  {featured.map((proj) => (
                    <div key={proj.id} className="mod-entry">
                      <div className="mod-entry__top">
                        <div>
                          <div className="mod-entry__title">
                            {proj.title}
                            {proj.live && (
                              <a href={proj.live} target="_blank" rel="noopener noreferrer" className="mod-entry__ext">↗ Live</a>
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
                          {proj.highlights.map((h) => <li key={h}>{h}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </div>

            {/* Right: Certifications, Achievements, Languages */}
            <div className="mod-resume__col-right">
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
                  <h2 className="mod-section__title" id="mod-ach">Achievements &amp; Honors</h2>
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
                  <div className="mod-languages-grid">
                    {languages.map((lang) => (
                      <div key={lang.name} className="mod-aside-entry mod-aside-entry--lang">
                        <div className="mod-aside-entry__name">{lang.name}</div>
                        <div className="mod-aside-entry__meta">{lang.proficiency}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <footer className="mod-page-footer">
          <span>Kavya Modi · Official Portfolio: kavyamodi.vercel.app · Verified Developer Dossier</span>
        </footer>
      </div>
    </div>
  )
}
