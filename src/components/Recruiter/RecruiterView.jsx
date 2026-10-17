import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  profile, skills, projects, education, experience,
  certifications, achievements, languages, contactLinks, resumeSections
} from '../../data/portfolioData'
import ResumeATS from '../Resume/ResumeATS'
import ResumeModern from '../Resume/ResumeModern'
import ResumeMinimal from '../Resume/ResumeMinimal'
import './RecruiterView.css'

const TEMPLATES = [
  { id: 'ats', label: 'ATS Professional', component: ResumeATS },
  { id: 'modern', label: 'Modern Developer', component: ResumeModern },
  { id: 'minimal', label: 'Minimal Editorial', component: ResumeMinimal },
]

export default function RecruiterView() {
  const [activeTemplate, setActiveTemplate] = useState('modern')

  const ActiveComponent = TEMPLATES.find((t) => t.id === activeTemplate)?.component ?? ResumeModern

  const resumeData = {
    profile,
    skills,
    projects,
    education,
    experience,
    certifications,
    achievements,
    languages,
    contactLinks,
    sectionVisibility: resumeSections,
  }

  return (
    <section className="section recruiter-section" id="recruiter" aria-labelledby="recruiter-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Hiring &amp; Recruiter Hub</span>
          <h2 className="section-title" id="recruiter-heading">Recruiter View &amp; Resume Studio</h2>
          <p className="section-subtitle">
            Verified qualifications, technical highlights, and an automated multi-template résumé generated directly from portfolio data.
          </p>
        </header>

        <div className="recruiter__grid">
          {/* Quick Dossier for Recruiters */}
          <div className="recruiter__dossier">
            <div className="recruiter__card">
              <div className="recruiter__badge-row">
                <span className="recruiter__status-dot" aria-hidden="true" />
                <span className="recruiter__status-text">Available for Developer Opportunities</span>
              </div>

              <h3 className="recruiter__candidate-name">{profile.name}</h3>
              <p className="recruiter__candidate-headline">{profile.headline}</p>

              <div className="recruiter__facts">
                <div className="recruiter__fact">
                  <span className="recruiter__fact-label">Academic Status</span>
                  <span className="recruiter__fact-value">BCA Graduate (9.55 CGPA) · Semcom, CVM University</span>
                </div>
                <div className="recruiter__fact">
                  <span className="recruiter__fact-label">Industry Role</span>
                  <span className="recruiter__fact-value">Web Developer Intern @ Anugrah Accounting</span>
                </div>
                <div className="recruiter__fact">
                  <span className="recruiter__fact-label">Primary Stack</span>
                  <span className="recruiter__fact-value">PHP, Python, JavaScript, React, MySQL, VB.NET</span>
                </div>
                <div className="recruiter__fact">
                  <span className="recruiter__fact-label">Location</span>
                  <span className="recruiter__fact-value">{profile.location} (Open to Global / Remote)</span>
                </div>
                <div className="recruiter__fact">
                  <span className="recruiter__fact-label">Contact / WhatsApp</span>
                  <span className="recruiter__fact-value">{profile.email} · {profile.phone}</span>
                </div>
              </div>

              <div className="recruiter__actions">
                <a
                  href="/Kavya-Modi-Resume.pdf"
                  download={profile.resumeFilename ?? "Kavya-Modi-Resume.pdf"}
                  className="btn btn-primary btn-lg"
                  id="recruiter-download-btn"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Download PDF CV</span>
                </a>
                <Link to="/resume" className="btn btn-secondary btn-lg" id="recruiter-studio-link">
                  Open Resume Studio &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Live Resume Showcase */}
          <div className="recruiter__preview-container">
            <div className="recruiter__preview-bar">
              <div className="recruiter__template-tabs" role="tablist" aria-label="Resume templates preview">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={activeTemplate === t.id}
                    className={`recruiter__template-tab ${activeTemplate === t.id ? 'active' : ''}`}
                    onClick={() => setActiveTemplate(t.id)}
                    type="button"
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <Link to="/resume" className="recruiter__studio-cta" title="Customize sections in Resume Studio">
                Customize in Studio &nearr;
              </Link>
            </div>

            {/* Scaled Preview Frame */}
            <div className="recruiter__preview-viewport">
              <div className="recruiter__preview-scale" id="recruiter-resume-embed">
                <ActiveComponent data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
