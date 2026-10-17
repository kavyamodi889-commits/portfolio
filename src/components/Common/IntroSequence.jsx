import { useState, useEffect, useRef, useCallback } from 'react'
import './IntroSequence.css'

export default function IntroSequence({ onComplete }) {
  // Phase sequence: 'mark-in' -> 'expand-text' -> 'morph-nav' -> 'done'
  const [phase, setPhase] = useState('mark-in')
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0, scale: 0.52 })
  const lockupRef = useRef(null)
  const timersRef = useRef([])

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  const startTimers = useCallback(() => {
    clearAllTimers()

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.body.classList.add('intro-active')

    // Phase 1 -> 2: Text unrolls beside mark (at 900ms)
    const t1 = setTimeout(() => {
      setPhase('expand-text')
    }, 900)

    // Phase 2 -> 3: Morph & glide to Navbar logo position (at 2100ms)
    const t2 = setTimeout(() => {
      const navLogo = document.querySelector('.navbar__logo')
      if (navLogo) {
        const rect = navLogo.getBoundingClientRect()
        const destX = (rect.left + rect.width / 2) - window.innerWidth / 2
        const destY = (rect.top + rect.height / 2) - window.innerHeight / 2
        setTargetPos({ x: destX, y: destY, scale: 0.52 })
      } else {
        setTargetPos({
          x: -(window.innerWidth * 0.35),
          y: -(window.innerHeight * 0.44),
          scale: 0.52
        })
      }
      setPhase('morph-nav')
    }, 2100)

    // Phase 3 -> Done: Unmount overlay and release page scroll (at 2950ms)
    const t3 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('intro-active')
      onComplete?.()
    }, 2950)

    timersRef.current = [t1, t2, t3]
  }, [onComplete])

  const skipIntro = useCallback(() => {
    clearAllTimers()
    setPhase('done')
    document.body.classList.remove('intro-active')
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    startTimers()

    // Listen for replay requests (e.g. from clicking navbar logo)
    const handleReplay = () => {
      setPhase('mark-in')
      startTimers()
    }
    window.addEventListener('km:replay-intro', handleReplay)

    // Allow Escape key to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipIntro()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearAllTimers()
      document.body.classList.remove('intro-active')
      window.removeEventListener('km:replay-intro', handleReplay)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [startTimers, skipIntro])

  if (phase === 'done') return null

  return (
    <aside
      className={`intro-screen intro-screen--${phase}`}
      aria-label="Loading animation"
      role="status"
    >
      {/* Reference video signature perimeter edge lighting */}
      <div className="intro-screen__edge-glow" />
      <div className="intro-screen__ambient" />
      <div className="intro-screen__scanlines" />

      {/* Brand Lockup: Center Emblem ➔ Text Unfold ➔ Navbar Morph */}
      <div
        ref={lockupRef}
        className={`intro-screen__lockup intro-screen__lockup--${phase}`}
        style={
          phase === 'morph-nav'
            ? {
                transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0) scale(${targetPos.scale})`,
              }
            : undefined
        }
      >
        {/* Emblem (KM Solar Sphere) */}
        <div className="intro-screen__mark-wrapper">
          <div className="intro-screen__mark-halo" />
          <div className="intro-screen__mark">
            <span className="intro-screen__mark-letters">KM</span>
            <div className="intro-screen__mark-orbit" />
          </div>
        </div>

        {/* Horizontal Typography Unfold (Mounted only in phase !== 'mark-in') */}
        {phase !== 'mark-in' && (
          <div className="intro-screen__text-wrapper">
            <div className="intro-screen__title-row">
              <span className="intro-screen__title-text">KAVYA MODI</span>
              <span className="intro-screen__title-badge">PRO</span>
            </div>
            <div className="intro-screen__sub-row">
              <span className="intro-screen__status-dot" />
              <span className="intro-screen__sub-text">FULL-STACK WEB ARCHITECT</span>
            </div>
          </div>
        )}
      </div>

      {/* Clean Skip Action */}
      <button
        type="button"
        className="intro-screen__skip"
        onClick={skipIntro}
        title="Skip intro animation (Esc)"
      >
        Skip ✕
      </button>
    </aside>
  )
}
