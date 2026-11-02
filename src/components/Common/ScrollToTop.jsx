import { useState, useEffect } from 'react'
import './ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      if (scrollTotal > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / scrollTotal) * 100))
        setScrollProgress(progress)
      }
      setVisible(currentScroll > 260)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 700)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  // Circle progress calculation: 56x56 box, center 28, radius 22
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <div
      className={`stt-wrapper ${visible ? 'stt-wrapper--visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`stt-button ${isClicked ? 'stt-button--clicked' : ''}`}
        onClick={scrollToTop}
        aria-label={`Scroll back to top — ${Math.round(scrollProgress)}% scrolled`}
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        type="button"
      >
        {/* Dynamic ambient radial halo */}
        <div className="stt-glow" aria-hidden="true" />

        {/* Circular Progress SVG with Multi-Stop Gradient Ring */}
        <svg
          className="stt-svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sttGradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#818cf8" />
              <stop offset="75%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <filter id="sttRingGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background track circle */}
          <circle
            className="stt-track"
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="3"
            fill="none"
          />

          {/* Progress indicator circle */}
          <circle
            className="stt-indicator"
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="3"
            stroke="url(#sttGradientRing)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            filter="url(#sttRingGlow)"
          />
        </svg>

        {/* Center Glass Core */}
        <div className="stt-core">
          <svg
            className="stt-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>

        {/* Floating Percentage Badge */}
        <span className={`stt-badge ${isHovered ? 'stt-badge--visible' : ''}`} aria-hidden="true">
          {Math.round(scrollProgress)}%
        </span>
      </button>
    </div>
  )
}
