import { formatYears, cleanUrl, shouldShow, featuredProjects } from './resumeUtils'
import './ResumeMinimal.css'

/**
 * Minimal Editorial Template
 * - Ultra-clean, maximum whitespace
 * - Refined editorial hierarchy
 * - Fully single-column
 * - No decorative elements
 */
export default function ResumeMinimal({ data }) {
  const {
    profile, skills, projects, education, experience,
    certifications, achievements, languages, contactLinks,
  } = data

  const github = contactLinks.find((l) => l.icon === 'github')
  const featured = featuredProjects(projects)

  return (
    <div className="min-resume" role="document" aria-label="Minimal Editorial Résumé">
      {/* Header */}
      <header className="min-resume__header">
        <h1 className="min-resume__name">{profile.name}</h1>
        {profile.headline && <p className="min-resume__headline">{profile.headline}</p>}
        <div className="min-resume__contact" role="list">
          {profile.location && <span role="listitem">{profile.location}</span>}
          {profile.email && (
            <span role="listitem"><a href={`mailto:${profile.email}`}>{profile.email}</a></span>
          )}
          {github && (
            <span role="listitem">
              <a href={github.url} target="_blank" rel="noopener noreferrer">{cleanUrl(github.url)}</a>
            </span>
          )}
          {profile.linkedin && (
            <span role="listitem">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{cleanUrl(profile.linkedin)}</a>
            </span>
          )}
          {profile.website && (
            <span role="listitem">
              <a href={profile.website} target="_blank" rel="noopener noreferrer">{cleanUrl(profile.website)}</a>
            </span>
          )}
        </div>
      </header>

      <main className="min-resume__body">
        {/* Summary */}
        {shouldShow(data, 'summary') && profile.summary && (
          <section className="min-section" aria-labelledby="min-summary">
            <h2 className="min-section__title" id="min-summary">About</h2>
            <p className="min-section__text">{profile.summary}</p>
          </section>
        )}

        {/* Skills */}
        {shouldShow(data, 'skills') && skills.some((g) => g.items.length > 0) && (
          <section className="min-section" aria-labelledby="min-skills">
            <h2 className="min-section__title" id="min-skills">Skills</h2>
            <div className="min-skills">
              {skills.filter((g) => g.items.length > 0).map((group) => (
                <div key={group.category} className="min-skills__row">
                  <span className="min-skills__cat">{group.category}</span>
                  <span className="min-skills__items">{group.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {shouldShow(data, 'education') && education.length > 0 && (
          <section className="min-section" aria-labelledby="min-education">
            <h2 className="min-section__title" id="min-education">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="min-entry">
                <div className="min-entry__row">
                  <span className="min-entry__title">{edu.degree}</span>
                  <span className="min-entry__date">
                    {formatYears(edu.startYear, edu.endYear, edu.status) || edu.status}
                  </span>
                </div>
                <div className="min-entry__sub">{edu.institution}{edu.location && `, ${edu.location}`}</div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {shouldShow(data, 'experience') && experience.length > 0 && (
          <section className="min-section" aria-labelledby="min-experience">
            <h2 className="min-section__title" id="min-experience">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="min-entry">
                <div className="min-entry__row">
                  <span className="min-entry__title">{exp.role}</span>
                  <span className="min-entry__date">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="min-entry__sub">{exp.company} · {exp.location}</div>
                {exp.description && <p className="min-entry__desc">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {shouldShow(data, 'projects') && featured.length > 0 && (
          <section className="min-section" aria-labelledby="min-projects">
            <h2 className="min-section__title" id="min-projects">Projects</h2>
            {featured.map((proj) => (
              <div key={proj.id} className="min-entry">
                <div className="min-entry__row">
                  <span className="min-entry__title">{proj.title}</span>
                  {proj.year && <span className="min-entry__date">{proj.year}</span>}
                </div>
                <div className="min-entry__sub">{proj.tech.join(', ')}</div>
                {proj.shortDescription && <p className="min-entry__desc">{proj.shortDescription}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {shouldShow(data, 'certifications') && certifications.length > 0 && (
          <section className="min-section" aria-labelledby="min-certs">
            <h2 className="min-section__title" id="min-certs">Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="min-entry">
                <div className="min-entry__row">
                  <span className="min-entry__title">{cert.name}</span>
                  {cert.date && <span className="min-entry__date">{cert.date}</span>}
                </div>
                <div className="min-entry__sub">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {/* Achievements */}
        {shouldShow(data, 'achievements') && achievements.length > 0 && (
          <section className="min-section" aria-labelledby="min-ach">
            <h2 className="min-section__title" id="min-ach">Achievements</h2>
            {achievements.map((ach) => (
              <div key={ach.id} className="min-entry">
                <div className="min-entry__row">
                  <span className="min-entry__title">{ach.title}</span>
                  {ach.year && <span className="min-entry__date">{ach.year}</span>}
                </div>
                {ach.description && <p className="min-entry__desc">{ach.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {shouldShow(data, 'languages') && languages.length > 0 && (
          <section className="min-section" aria-labelledby="min-languages">
            <h2 className="min-section__title" id="min-languages">Languages</h2>
            <p className="min-section__text">
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(' · ')}
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
