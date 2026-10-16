import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#hero',      label: 'Home' },
  { href: '#projects',  label: 'Projects' },
  { href: '#skills',    label: 'Skills' },
  { href: '#education', label: 'Experience' },
  { href: '#contact',   label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [activeId,  setActiveId]  = useState('hero')
  const [menuOpen,  setMenuOpen]  = useState(false)
  const drawerRef = useRef(null)

  /* Scroll observer */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ScrollSpy */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
      ref={drawerRef}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <a href="/" className="navbar__logo" aria-label="Kavya Modi — Home">
          <div className="navbar__logo-mark" aria-hidden="true">KM</div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">Kavya Modi</span>
            <span className="navbar__logo-role">Web Developer</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`navbar__link ${activeId === href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNav(e, href)}
                aria-current={activeId === href.slice(1) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="/resume" className="navbar__link navbar__cta">
              Resume Studio ✦
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((p) => !p)}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`navbar__mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`navbar__link ${activeId === href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNav(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-actions">
          <a href="mailto:kavyamodi746@gmail.com" className="navbar__quick-pill">
            ✉ Email Me
          </a>
          <a href="https://wa.me/917041116223" target="_blank" rel="noopener noreferrer" className="navbar__quick-pill">
            💬 WhatsApp
          </a>
          <a href="/resume" className="navbar__quick-pill">
            📄 Resume
          </a>
        </div>
      </div>
    </nav>
  )
}
