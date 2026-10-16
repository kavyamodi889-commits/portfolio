import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile, navSections, contactLinks } from '../../data/portfolioData'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Track scroll position & active section (ScrollSpy)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (pathname === '/') {
        const sections = ['home', 'projects', 'skills', 'terminal', 'architecture', 'education', 'recruiter', 'contact']
        const scrollPosition = window.scrollY + 200

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleSectionClick = (section) => {
    setMobileOpen(false)
    if (pathname !== '/') {
      navigate(`/#${section.id}`)
      return
    }
    const el = document.getElementById(section.id)
    if (el) {
      const navOffset = 70
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const isResumePage = pathname === '/resume' || pathname === '/resume-studio'

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__container">
          {/* Logo with 3D glow */}
          <Link to="/" className="navbar__logo" aria-label="Kavya Modi Portfolio Home">
            <div className="navbar__logo-gem">
              <span className="navbar__logo-initials">KM</span>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">{profile.name}</span>
              <span className="navbar__logo-status">
                <span className="status-indicator-dot" />
                Available for work
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar__links" role="navigation" aria-label="Main menu">
            {navSections.map((section) =>
              section.isRoute ? (
                <Link
                  key={section.id}
                  to={section.path}
                  className={`navbar__link navbar__link--cta ${isResumePage ? 'active' : ''}`}
                >
                  <span className="cta-sparkle" aria-hidden="true">✦</span>
                  {section.label}
                </Link>
              ) : (
                <button
                  key={section.id}
                  className={`navbar__link ${activeSection === section.id && !isResumePage ? 'navbar__link--active' : ''}`}
                  onClick={() => handleSectionClick(section)}
                  type="button"
                >
                  {section.label}
                  {activeSection === section.id && !isResumePage && (
                    <span className="nav-active-pill" aria-hidden="true" />
                  )}
                </button>
              )
            )}
          </nav>

          {/* Mobile hamburger button */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Modern Slide-down Frosted Glass Mobile Drawer */}
      <div
        className={`navbar__mobile-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`navbar__mobile-drawer ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div className="navbar__mobile-header">
          <div className="navbar__logo">
            <div className="navbar__logo-gem">
              <span className="navbar__logo-initials">KM</span>
            </div>
            <span className="navbar__logo-name">{profile.name}</span>
          </div>
          <button
            className="navbar__mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="navbar__mobile-links">
          {navSections.map((section) =>
            section.isRoute ? (
              <Link
                key={section.id}
                to={section.path}
                className="navbar__mobile-link navbar__mobile-link--cta"
                onClick={() => setMobileOpen(false)}
              >
                <span>{section.label}</span>
                <span className="mobile-link-arrow">&rarr;</span>
              </Link>
            ) : (
              <button
                key={section.id}
                className={`navbar__mobile-link ${activeSection === section.id && !isResumePage ? 'active' : ''}`}
                onClick={() => handleSectionClick(section)}
                type="button"
              >
                <span>{section.label}</span>
                {activeSection === section.id && !isResumePage && (
                  <span className="mobile-active-dot" />
                )}
              </button>
            )
          )}
        </div>

        {/* Quick Contact & Action Buttons in Mobile Drawer */}
        <div className="navbar__mobile-actions">
          <span className="mobile-actions-label">Quick Connect</span>
          <div className="mobile-actions-grid">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="mobile-action-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Call</span>
              </a>
            )}
            {profile.whatsapp && (
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="mobile-action-pill mobile-action-pill--wa">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="mobile-action-pill">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Email</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent layout shift under fixed navbar */}
      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  )
}
