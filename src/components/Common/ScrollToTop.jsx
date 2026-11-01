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
      setVisible(currentScroll > 280)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  // Circle progress calculation: 48x48 box, center 24, radius 20
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <div
      className={`stt-container ${visible ? 'stt-container--visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`stt-btn ${isClicked ? 'stt-btn--clicked' : ''}`}
        onClick={scrollToTop}
        aria-label={`Scroll back to top (${Math.round(scrollProgress)}% scrolled)`}
        title="Back to Top"
        type="button"
      >
        {/* Ambient Gradient Glow Aura */}
        <div className="stt-ambient-glow" aria-hidden="true" />

        {/* Circular Progress SVG with Multi-Stop Gradient Ring */}
        <svg
          className="stt-progress-ring"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sttRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="sttGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track Circle */}
          <circle
            className="stt-track"
            cx="26"
            cy="26"
            r={radius}
            strokeWidth="3.2"
            fill="none"
          />

          {/* Dynamic Animated Progress Stroke */}
          <circle
            className="stt-indicator"
            cx="26"
            cy="26"
            r={radius}
            strokeWidth="3.2"
            stroke="url(#sttRingGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            filter="url(#sttGlowFilter)"
          />
        </svg>

        {/* Center Glass Core with Upward Arrow */}
        <div className="stt-core">
          <svg
            className="stt-arrow"
            width="17"
            height="17"
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

        {/* Hover percentage indicator tooltip */}
        <div className={`stt-tooltip ${isHovered ? 'stt-tooltip--active' : ''}`} aria-hidden="true">
          <span>{Math.round(scrollProgress)}%</span>
        </div>
      </button>
    </div>
  )
}
