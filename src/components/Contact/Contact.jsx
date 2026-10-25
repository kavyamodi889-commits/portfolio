import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile, contactLinks } from '../../data/portfolioData'
import './Contact.css'

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.895-.798-1.5-1.783-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.302-.501.1-.2.05-.376-.025-.527s-.677-1.631-.928-2.233c-.244-.587-.492-.507-.677-.517l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.91 1.228 3.111c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.577-.351z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.954.563 3.778 1.535 5.322L2 22l4.821-1.503C8.307 21.364 10.096 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.155-.506-4.417-1.373l-.316-.217-2.862.892.889-2.793-.238-.344C4.137 15.044 3.6 13.57 3.6 12 3.6 7.368 7.368 3.6 12 3.6c4.632 0 8.4 3.768 8.4 8.4 0 4.632-3.768 8.4-8.4 8.4z"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function renderContactIcon(icon) {
  switch (icon) {
    case 'linkedin':
      return <LinkedInIcon />
    case 'globe':
    case 'website':
      return <GlobeIcon />
    case 'email':
      return <EmailIcon />
    case 'whatsapp':
      return <WhatsAppIcon />
    case 'github':
    default:
      return <GitHubIcon />
  }
}

const CURRENT_YEAR = new Date().getFullYear()
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Opportunity / Job Offer',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [copiedLink, setCopiedLink] = useState(null)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.'
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).'
    }

    if (!formData.message.trim()) {
      errs.message = 'Please include a message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedLink(label)
      setTimeout(() => setCopiedLink(null), 2500)
    })
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        {/* Section Header */}
        <header className="section-header">
          <div className="contact-badge-pill">
            <span className="contact-badge-dot" />
            <span>AVAILABLE WORLDWIDE &middot; OPEN TO COLLABORATIONS</span>
          </div>
          <h2 className="section-title contact-editorial-title" id="contact-heading">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="section-subtitle">
            Got an ambitious project, open engineering role, or architecture challenge? Let&apos;s talk about how we can build something exceptional together.
          </p>
        </header>

        {/* ── Main Two-Column Command Center Layout ── */}
        <div className="contact__layout">
          
          {/* Left Column: Operational Telemetry & Verified Channels */}
          <div className="contact__info">
            <div className="contact__card telemetry-hud">
              {/* High-Tech Corner Reticles */}
              <span className="telemetry-hud__corner telemetry-hud__corner--tl" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--tr" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--bl" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--br" aria-hidden="true" />

              {/* Status Header with Concentric Radar Pulse */}
              <div className="telemetry-hud__header">
                <div className="telemetry-hud__radar" aria-hidden="true">
                  <span className="telemetry-hud__radar-ring telemetry-hud__radar-ring--1" />
                  <span className="telemetry-hud__radar-ring telemetry-hud__radar-ring--2" />
                  <span className="telemetry-hud__radar-dot" />
                </div>
                <div className="telemetry-hud__title-col">
                  <div className="telemetry-hud__tag">LIVE TELEMETRY &middot; CURRENT STATUS</div>
                  <div className="telemetry-hud__headline">Actively Open to Opportunities</div>
                </div>
              </div>

              {/* Telemetry Metrics Grid 2x2 */}
              <div className="telemetry-hud__grid">
                <div className="telemetry-metric">
                  <span className="telemetry-metric__label">Current Role</span>
                  <span className="telemetry-metric__value">Operating Executive</span>
                  <span className="telemetry-metric__sub">Pattern LLC &middot; US/UK Delivery (2026&ndash;Present)</span>
                </div>

                <div className="telemetry-metric">
                  <span className="telemetry-metric__label">Academic Merit</span>
                  <span className="telemetry-metric__value">Semcom Rank 1 &middot; 9.55 CGPA</span>
                  <span className="telemetry-metric__sub">Gold Medalist &middot; BCA Distinction</span>
                </div>

                <div className="telemetry-metric">
                  <span className="telemetry-metric__label">Local Time (India)</span>
                  <span className="telemetry-metric__value font-mono">{currentTime || '05:30:00 PM'} IST</span>
                  <span className="telemetry-metric__sub">UTC+5:30 &middot; Active Working Hours</span>
                </div>

                <div className="telemetry-metric">
                  <span className="telemetry-metric__label">Response Latency</span>
                  <span className="telemetry-metric__value text-emerald">&lt; 2 Hours</span>
                  <span className="telemetry-metric__sub">Direct Priority Transmission</span>
                </div>
              </div>

              {/* Verified Professional Summary */}
              <p className="contact__card-text">
                Operating Executive at <strong>Pattern LLC</strong> coordinating client operations for Western markets, and <strong>Semcom BCA Rank 1</strong> gold medalist (<strong>9.55 CGPA</strong>). Delivering full-stack architectures across React 19, Python FastAPI, Node.js, and high-concurrency MySQL.
              </p>

              {/* Scope Pills */}
              <div className="telemetry-hud__pills">
                <span className="telemetry-pill">⚡ High-Concurrency Systems</span>
                <span className="telemetry-pill">⚛️ React 19 Architecture</span>
                <span className="telemetry-pill">🗄️ MySQL ACID Optimization</span>
                <span className="telemetry-pill">🌍 Remote &middot; Hybrid &middot; Vadodara</span>
              </div>

              {/* Verified Channels List */}
              <div className="contact__channels-header">
                <span className="contact__channels-title">VERIFIED CONTACT CHANNELS</span>
                <span className="contact__channels-count">{contactLinks.length} Active</span>
              </div>

              <div className="contact__links" role="list">
                {contactLinks.filter((l) => l.public).map((link) => (
                  <div key={link.label} className="contact__link-item">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__link"
                      role="listitem"
                      aria-label={`Connect on ${link.label}`}
                    >
                      <span className="contact__link-icon" aria-hidden="true">
                        {renderContactIcon(link.icon)}
                      </span>
                      <div className="contact__link-content">
                        <div className="contact__link-label">{link.label}</div>
                        <div className="contact__link-url">{link.url.replace('https://', '')}</div>
                      </div>
                    </a>
                    
                    <div className="contact__link-actions">
                      <button
                        type="button"
                        className={`contact__copy-btn ${copiedLink === link.label ? 'contact__copy-btn--copied' : ''}`}
                        onClick={() => handleCopy(link.url, link.label)}
                        title={`Copy ${link.label} link`}
                      >
                        {copiedLink === link.label ? (
                          <>
                            <CheckIcon />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact__external-link"
                        title={`Open ${link.label}`}
                        aria-label={`Open ${link.label} in new tab`}
                      >
                        <span className="contact__external-arrow" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Resume Link */}
              <div className="contact__resume-banner">
                <Link to="/resume" className="contact__resume-btn" id="contact-resume-btn">
                  <span>Open Interactive Resume Studio</span>
                  <span className="contact__resume-badge">v2.0 ✦</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Glass Contact Form */}
          <div className="contact__form-container">
            <div className="contact__card contact__form-card">
              {/* Corner Reticles */}
              <span className="telemetry-hud__corner telemetry-hud__corner--tl" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--tr" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--bl" aria-hidden="true" />
              <span className="telemetry-hud__corner telemetry-hud__corner--br" aria-hidden="true" />

              <div className="contact__form-header">
                <span className="contact__form-badge">
                  <span className="contact__form-badge-dot" />
                  SECURE TRANSMISSION
                </span>
                <h3 className="contact__form-title">Send a Direct Message</h3>
                <p className="contact__form-sub">
                  Have an open role, engineering challenge, or project proposal? Send a message directly to my inbox.
                </p>
              </div>

              {submitted ? (
                <div className="contact__success-card" role="status" aria-live="polite">
                  <div className="contact__success-icon">
                    <CheckIcon />
                  </div>
                  <h3 className="contact__success-title">Transmission Prepared!</h3>
                  <p className="contact__success-text">
                    Thank you, <strong>{formData.name}</strong>. Your message details have been validated and compiled for transmission.
                  </p>
                  <div className="contact__success-summary">
                    <div className="contact__summary-row">
                      <span className="contact__summary-lbl">Inquiry:</span>
                      <span className="contact__summary-val">{formData.inquiryType}</span>
                    </div>
                    <div className="contact__summary-row">
                      <span className="contact__summary-lbl">Sender:</span>
                      <span className="contact__summary-val">{formData.email}</span>
                    </div>
                  </div>
                  <div className="contact__success-actions">
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(
                        `[${formData.inquiryType}] From ${formData.name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
                      )}`}
                      className="btn btn-primary"
                      id="contact-mailto-fallback"
                    >
                      <span>Open in Email Client</span>
                      <span>&rarr;</span>
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          name: '',
                          email: '',
                          inquiryType: 'Opportunity / Job Offer',
                          message: '',
                        })
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">
                      Full Name <span className="contact__required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (errors.name) setErrors({ ...errors, name: null })
                      }}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <span className="contact__error-msg" id="contact-name-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">
                      Email Address <span className="contact__required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: null })
                      }}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <span className="contact__error-msg" id="contact-email-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div className="contact__field">
                    <label htmlFor="contact-type" className="contact__label">
                      Inquiry Reason
                    </label>
                    <select
                      id="contact-type"
                      className="contact__input contact__select"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    >
                      <option value="Opportunity / Job Offer">Recruiter / Job Opportunity</option>
                      <option value="Internship Proposal">Internship Inquiry</option>
                      <option value="Technical Collaboration">Project / Technical Discussion</option>
                      <option value="General Inquiry">General Message</option>
                    </select>
                  </div>

                  {/* Message with Character Counter */}
                  <div className="contact__field">
                    <div className="contact__field-header">
                      <label htmlFor="contact-message" className="contact__label">
                        Message <span className="contact__required">*</span>
                      </label>
                      <span className="contact__char-count">
                        {formData.message.length} chars (min 10)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows="4"
                      className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                      placeholder="Tell me about the role, project, or what you'd like to collaborate on..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (errors.message) setErrors({ ...errors, message: null })
                      }}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <span className="contact__error-msg" id="contact-message-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="contact__submit-btn"
                    id="contact-submit-btn"
                  >
                    <span>Send Message Direct</span>
                    <span className="contact__submit-arrow" aria-hidden="true">&rarr;</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="contact__footer">
        <div className="container contact__footer-inner">
          <div className="contact__footer-brand">
            <span className="contact__footer-name">{profile.name}</span>
            <span className="contact__footer-dot">&bull;</span>
            <span className="contact__footer-role">Web Developer &amp; Software Engineer</span>
          </div>
          <div className="contact__footer-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <Link to="/resume">Resume Studio</Link>
          </div>
          <p className="contact__footer-copy">
            &copy; {CURRENT_YEAR} {profile.name} &bull; Engineered with React 19 &amp; Vite
          </p>
        </div>
      </footer>
    </section>
  )
}

