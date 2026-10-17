import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  profile, skills, projects, education, experience,
  certifications, achievements, languages, contactLinks, resumeSections
} from '../data/portfolioData'
import ResumeATS from '../components/Resume/ResumeATS'
import ResumeModern from '../components/Resume/ResumeModern'
import ResumeMinimal from '../components/Resume/ResumeMinimal'
import './ResumeStudio.css'

const TEMPLATES = [
  {
    id: 'ats',
    label: 'ATS Professional',
    description: 'Clean single-column format. Optimized for applicant tracking systems and recruiter tools.',
    component: ResumeATS,
  },
  {
    id: 'modern',
    label: 'Modern Developer',
    description: 'Elegant two-column layout with violet accents and refined typography.',
    component: ResumeModern,
  },
  {
    id: 'minimal',
    label: 'Minimal Editorial',
    description: 'Ultra-clean editorial style. Maximum whitespace, refined hierarchy.',
    component: ResumeMinimal,
  },
]

// ─── Section toggle controls ────────────────────────────────────
const TOGGLEABLE_SECTIONS = [
  { key: 'summary',        label: 'Professional Summary' },
  { key: 'skills',         label: 'Skills' },
  { key: 'projects',       label: 'Projects' },
  { key: 'education',      label: 'Education' },
  { key: 'experience',     label: 'Experience' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'achievements',   label: 'Achievements' },
  { key: 'languages',      label: 'Languages' },
]

// Check if a section has any data
function hasSectionData(key) {
  switch (key) {
    case 'summary':        return !!profile.summary
    case 'skills':         return skills.some((g) => g.items.length > 0)
    case 'projects':       return projects.length > 0
    case 'education':      return education.length > 0
    case 'experience':     return experience.length > 0
    case 'certifications': return certifications.length > 0
    case 'achievements':   return achievements.length > 0
    case 'languages':      return languages.length > 0
    default:               return false
  }
}

export default function ResumeStudio() {
  const [activeTemplate, setActiveTemplate] = useState('modern')
  const [sectionVisibility, setSectionVisibility] = useState({ ...resumeSections })
  const [printing, setPrinting] = useState(false)
  const previewRef = useRef(null)

  const ActiveComponent = TEMPLATES.find((t) => t.id === activeTemplate)?.component ?? ResumeModern

  const toggleSection = (key) => {
    setSectionVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrint = () => {
    setPrinting(true)
    // Short delay so state renders before print
    setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 200)
  }

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
    sectionVisibility,
  }

  return (
    <div className="resume-studio-page">
      {/* ─── Sidebar / Controls ─────────────────────────── */}
      <aside className="resume-studio__sidebar" aria-label="Resume Studio controls">
        <div className="studio-sidebar__inner">
          {/* Back link */}
          <Link to="/" className="studio-back-link" aria-label="Back to portfolio">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Portfolio
          </Link>

          <div className="studio-sidebar__section">
            <h2 className="studio-sidebar__heading">Résumé Studio</h2>
            <p className="studio-sidebar__sub">
              Live preview. Changes update instantly.
            </p>
          </div>

          {/* Template selector */}
          <div className="studio-sidebar__section">
            <h3 className="studio-panel-label">Template</h3>
            <div className="studio-templates" role="radiogroup" aria-label="Select resume template">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  className={`studio-template-btn ${activeTemplate === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTemplate(t.id)}
                  role="radio"
                  aria-checked={activeTemplate === t.id}
                  type="button"
                  id={`template-btn-${t.id}`}
                >
                  <div className="studio-template-btn__name">{t.label}</div>
                  <div className="studio-template-btn__desc">{t.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section toggles */}
          <div className="studio-sidebar__section">
            <h3 className="studio-panel-label">Sections</h3>
            <p className="studio-panel-note">
              Toggle sections on/off. This only affects the preview — your data is preserved.
            </p>
            <div className="studio-toggles">
              {TOGGLEABLE_SECTIONS.map((sec) => {
                const hasData = hasSectionData(sec.key)
                return (
                  <label
                    key={sec.key}
                    className={`studio-toggle ${!hasData ? 'studio-toggle--no-data' : ''}`}
                    title={!hasData ? `No ${sec.label} data yet — add to portfolioData.js` : ''}
                  >
                    <input
                      type="checkbox"
                      checked={!!sectionVisibility[sec.key] && hasData}
                      onChange={() => hasData && toggleSection(sec.key)}
                      disabled={!hasData}
                      id={`toggle-${sec.key}`}
                      aria-label={`Toggle ${sec.label} section`}
                    />
                    <span className="studio-toggle__track" aria-hidden="true">
                      <span className="studio-toggle__thumb" />
                    </span>
                    <span className="studio-toggle__label">
                      {sec.label}
                      {!hasData && <span className="studio-toggle__empty"> (no data)</span>}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="studio-sidebar__section studio-actions">
            <a
              href="/Kavya-Modi-Resume.pdf"
              download={profile.resumeFilename ?? "Kavya-Modi-Resume.pdf"}
              className="btn btn-primary"
              id="resume-download-btn"
              aria-label={`Download résumé as PDF — filename: ${profile.resumeFilename}`}
              style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download PDF</span>
            </a>

            <button
              className="btn btn-secondary"
              onClick={handlePrint}
              disabled={printing}
              type="button"
              id="resume-print-btn"
              aria-label="Print résumé or Save as PDF"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              <span>{printing ? 'Opening Print…' : 'Print / Save Custom PDF'}</span>
            </button>
          </div>

          {/* Update instructions */}
          <div className="studio-sidebar__section studio-info">
            <h3 className="studio-panel-label">How to update</h3>
            <ol className="studio-info__steps">
              <li>Edit <code>src/data/portfolioData.js</code></li>
              <li>Save the file</li>
              <li>Preview updates automatically</li>
              <li>Rebuild &amp; redeploy for production</li>
            </ol>
          </div>
        </div>
      </aside>

      {/* ─── Resume Preview ──────────────────────────────── */}
      <main className="resume-studio__preview" aria-label="Resume preview" ref={previewRef}>
        <div id="resume-print-area">
          <ActiveComponent data={resumeData} />
        </div>
      </main>
    </div>
  )
}
