import { formatYears, cleanUrl, shouldShow, featuredProjects } from './resumeUtils'
import './ResumeATS.css'

/**
 * ATS Professional Template
 * - Single column, conventional headings
 * - All text selectable
 * - No icons, graphics, or decorative elements that break parsing
 * - Clean section hierarchy
 */
export default function ResumeATS({ data }) {
  const {
    profile, skills, projects, education, experience,
    certifications, achievements, languages, contactLinks,
  } = data

  const github = contactLinks.find((l) => l.icon === 'github')
  const featured = featuredProjects(projects)

  return (
    <div className="ats-resume" role="document" aria-label="ATS Professional Résumé">
      {/* ─── HEADER ─────────────────────────────────────── */}
      <header className="ats-resume__header">
        <h1 className="ats-resume__name">{profile.name}</h1>
        {profile.headline && (
          <p className="ats-resume__headline">{profile.headline}</p>
        )}
        <div className="ats-resume__contact" role="list" aria-label="Contact information">
          {profile.location && (
            <span role="listitem">{profile.location}</span>
          )}
          {profile.email && (
            <span role="listitem">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          )}
          {profile.phone && (
            <span role="listitem">{profile.phone}</span>
          )}
          {github && (
            <span role="listitem">
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                {cleanUrl(github.url)}
              </a>
            </span>
          )}
          {profile.linkedin && (
            <span role="listitem">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {cleanUrl(profile.linkedin)}
              </a>
            </span>
          )}
          {profile.website && (
            <span role="listitem">
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                {cleanUrl(profile.website)}
              </a>
            </span>
          )}
        </div>
      </header>

      <div className="ats-resume__body">
        {/* ─── SUMMARY ──────────────────────────────────── */}
        {shouldShow(data, 'summary') && profile.summary && (
          <section className="ats-section" aria-labelledby="ats-summary">
            <h2 className="ats-section__title" id="ats-summary">Professional Summary</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            <p className="ats-section__text">{profile.summary}</p>
          </section>
        )}

        {/* ─── SKILLS ───────────────────────────────────── */}
        {shouldShow(data, 'skills') && skills.some((g) => g.items.length > 0) && (
          <section className="ats-section" aria-labelledby="ats-skills">
            <h2 className="ats-section__title" id="ats-skills">Technical Skills</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            <dl className="ats-skills">
              {skills.filter((g) => g.items.length > 0).map((group) => (
                <div key={group.category} className="ats-skills__row">
                  <dt className="ats-skills__cat">{group.category}:</dt>
                  <dd className="ats-skills__items">{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ─── EDUCATION ────────────────────────────────── */}
        {shouldShow(data, 'education') && education.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-education">
            <h2 className="ats-section__title" id="ats-education">Education</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            {education.map((edu) => (
              <div key={edu.id} className="ats-entry">
                <div className="ats-entry__row">
                  <strong className="ats-entry__title">{edu.degree}</strong>
                  <span className="ats-entry__date">
                    {formatYears(edu.startYear, edu.endYear, edu.status) || edu.status}
                  </span>
                </div>
                <div className="ats-entry__sub">
                  {edu.institution}
                  {edu.location && <span> · {edu.location}</span>}
                  {edu.status === 'Currently Pursuing' && <span className="ats-entry__badge"> (In Progress)</span>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ─── EXPERIENCE ───────────────────────────────── */}
        {shouldShow(data, 'experience') && experience.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-experience">
            <h2 className="ats-section__title" id="ats-experience">Experience</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            {experience.map((exp) => (
              <div key={exp.id} className="ats-entry">
                <div className="ats-entry__row">
                  <strong className="ats-entry__title">{exp.role}</strong>
                  <span className="ats-entry__date">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="ats-entry__sub">{exp.company} · {exp.location} · {exp.type}</div>
                {exp.description && <p className="ats-entry__desc">{exp.description}</p>}
                {exp.highlights?.length > 0 && (
                  <ul className="ats-entry__bullets">
                    {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ─── PROJECTS ─────────────────────────────────── */}
        {shouldShow(data, 'projects') && featured.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-projects">
            <h2 className="ats-section__title" id="ats-projects">Projects</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            {featured.map((proj) => (
              <div key={proj.id} className="ats-entry">
                <div className="ats-entry__row">
                  <strong className="ats-entry__title">
                    {proj.title}
                    {proj.github && (
                      <> · <a href={proj.github} target="_blank" rel="noopener noreferrer" className="ats-entry__link">{cleanUrl(proj.github)}</a></>
                    )}
                    {proj.live && (
                      <> · <a href={proj.live} target="_blank" rel="noopener noreferrer" className="ats-entry__link">{cleanUrl(proj.live)}</a></>
                    )}
                  </strong>
                  {proj.year && <span className="ats-entry__date">{proj.year}</span>}
                </div>
                <div className="ats-entry__sub">
                  {proj.tech.join(' · ')}
                </div>
                {proj.shortDescription && (
                  <p className="ats-entry__desc">{proj.shortDescription}</p>
                )}
                {proj.highlights?.length > 0 && (
                  <ul className="ats-entry__bullets">
                    {proj.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ─── CERTIFICATIONS ───────────────────────────── */}
        {shouldShow(data, 'certifications') && certifications.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-certs">
            <h2 className="ats-section__title" id="ats-certs">Certifications</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            {certifications.map((cert) => (
              <div key={cert.id} className="ats-entry">
                <div className="ats-entry__row">
                  <strong className="ats-entry__title">{cert.name}</strong>
                  {cert.date && <span className="ats-entry__date">{cert.date}</span>}
                </div>
                <div className="ats-entry__sub">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {/* ─── ACHIEVEMENTS ─────────────────────────────── */}
        {shouldShow(data, 'achievements') && achievements.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-achievements">
            <h2 className="ats-section__title" id="ats-achievements">Achievements</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            {achievements.map((ach) => (
              <div key={ach.id} className="ats-entry">
                <div className="ats-entry__row">
                  <strong className="ats-entry__title">{ach.title}</strong>
                  {ach.year && <span className="ats-entry__date">{ach.year}</span>}
                </div>
                {ach.description && <p className="ats-entry__desc">{ach.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* ─── LANGUAGES ────────────────────────────────── */}
        {shouldShow(data, 'languages') && languages.length > 0 && (
          <section className="ats-section" aria-labelledby="ats-languages">
            <h2 className="ats-section__title" id="ats-languages">Languages</h2>
            <div className="ats-section__rule" aria-hidden="true" />
            <p className="ats-section__text">
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
