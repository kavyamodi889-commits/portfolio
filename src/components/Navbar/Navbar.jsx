import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile, navSections } from '../../data/portfolioData'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSectionClick = (section) => {
    setMobileOpen(false)
    if (pathname !== '/') {
      navigate(`/#${section.id}`)
      return
    }
    const el = document.getElementById(section.id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isResumePage = pathname === '/resume' || pathname === '/resume-studio'

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Go to homepage">
            <span className="navbar__logo-initials">KM</span>
            <span className="navbar__logo-name">{profile.name}</span>
          </Link>

          {/* Desktop nav */}
          <div className="navbar__links" role="menubar">
            {navSections.map((section) =>
              section.isRoute ? (
                <Link
                  key={section.id}
                  to={section.path}
                  className={`navbar__link navbar__link--cta ${isResumePage ? 'active' : ''}`}
                  role="menuitem"
                >
                  {section.label}
                </Link>
              ) : (
                <button
                  key={section.id}
                  className="navbar__link"
                  onClick={() => handleSectionClick(section)}
                  role="menuitem"
                  type="button"
                >
                  {section.label}
                </button>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <div className="navbar__mobile-links">
          {navSections.map((section) =>
            section.isRoute ? (
              <Link
                key={section.id}
                to={section.path}
                className="navbar__mobile-link navbar__mobile-link--cta"
                onClick={() => setMobileOpen(false)}
              >
                {section.label}
              </Link>
            ) : (
              <button
                key={section.id}
                className="navbar__mobile-link"
                onClick={() => handleSectionClick(section)}
                type="button"
              >
                {section.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: 'var(--nav-height)' }} aria-hidden="true" />
    </>
  )
}
