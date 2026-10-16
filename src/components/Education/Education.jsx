import { education, experience, certifications, achievements } from '../../data/portfolioData'
import './Education.css'

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
  const hasExperience = experience.length > 0
  const hasCertifications = certifications.length > 0

  return (
    <section className="section education-section" id="education" aria-labelledby="education-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Academic &amp; Professional Trajectory</span>
          <h2 className="section-title" id="education-heading">Education &amp; Experience</h2>
          <p className="section-subtitle">
            Consistent top-tier academic performance paired with verified hands-on industry experience delivering production client solutions.
          </p>
        </header>

        <div className="education__layout">
          {/* Education Timeline */}
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

          {/* Experience Timeline */}
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

        {/* Certifications & Credentials Grid */}
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
