import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      if (scrollTotal > 0) {
        setScrollProgress((currentScroll / scrollTotal) * 100)
      }
      setVisible(currentScroll > 320)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  // Circle progress calculation
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      type="button"
    >
      <svg className="scroll-progress-ring" width="46" height="46" viewBox="0 0 46 46">
        <circle
          className="scroll-progress-bg"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="23"
          cy="23"
        />
        <circle
          className="scroll-progress-bar"
          stroke="url(#progressGradient)"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="23"
          cy="23"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="scroll-arrow-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  )
}
