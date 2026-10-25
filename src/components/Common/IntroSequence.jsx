import { useState, useEffect, useRef, useCallback } from 'react'
import './IntroSequence.css'

export default function IntroSequence({ onComplete }) {
  // Phase sequence: 'mark-in' -> 'expand-text' -> 'morph-nav' -> 'done'
  const [phase, setPhase] = useState('mark-in')
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0, scale: 0.52 })
  const [chargeProgress, setChargeProgress] = useState(0)
  const lockupRef = useRef(null)
  const timersRef = useRef([])
  const animFrameRef = useRef(null)

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
  }

  // Rapid high-precision charge counter (0 -> 100% over 1.6s)
  const startChargeCounter = useCallback(() => {
    const startTime = performance.now()
    const duration = 2200

    const updateCounter = (now) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeVal = 1 - Math.pow(1 - rawProgress, 3)
      setChargeProgress(Math.floor(easeVal * 100))

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(updateCounter)
      }
    }
    animFrameRef.current = requestAnimationFrame(updateCounter)
  }, [])

  const startTimers = useCallback(() => {
    clearAllTimers()

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.body.classList.add('intro-active')

    startChargeCounter()

    // Phase 1 → 2: Text unrolls beside mark (at 900ms)
    const t1 = setTimeout(() => {
      setPhase('expand-text')
    }, 900)

    // Phase 2 → 3: Morph & glide to Navbar logo position + Curtain Shutter split (at 2600ms)
    const t2 = setTimeout(() => {
      const navLogoMark = document.querySelector('.navbar__logo-mark') || document.querySelector('.navbar__logo')
      if (navLogoMark) {
        const rect = navLogoMark.getBoundingClientRect()
        const destX = (rect.left + rect.width / 2) - window.innerWidth / 2
        const destY = (rect.top + rect.height / 2) - window.innerHeight / 2
        setTargetPos({ x: destX, y: destY, scale: 0.62 })
      } else {
        setTargetPos({
          x: -(window.innerWidth * 0.35),
          y: -(window.innerHeight * 0.44),
          scale: 0.62
        })
      }
      setPhase('morph-nav')
    }, 2600)

    // Phase 3 → Done: Unmount overlay and release page scroll (at 3600ms)
    const t3 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('intro-active')
      onComplete?.()
    }, 3600)

    timersRef.current = [t1, t2, t3]
  }, [onComplete, startChargeCounter])

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
      setChargeProgress(0)
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
      {/* ── Cinematic Dual-Curtain Shutter Split ── */}
      <div className="intro-curtain intro-curtain--top" aria-hidden="true" />
      <div className="intro-curtain intro-curtain--bottom" aria-hidden="true" />

      {/* Animated Circuit-Grid Background */}
      <div className="intro-screen__bg-grid" aria-hidden="true" />

      {/* Perimeter edge lighting + ambient bloom + scanlines */}
      <div className="intro-screen__edge-glow" aria-hidden="true" />
      <div className="intro-screen__ambient" aria-hidden="true" />
      <div className="intro-screen__scanlines" aria-hidden="true" />

      {/* HUD Corner Marks */}
      <div className="intro-screen__corner-marks" aria-hidden="true" />

      {/* ── Brand Lockup: Center Emblem ➔ Typography Cascade ➔ Navbar Docking ── */}
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
        {/* Emblem (KM Prism Sphere with Triple Shockwave Rings) */}
        <div className="intro-screen__mark-wrapper">
          <div className="intro-screen__shockwave intro-screen__shockwave--1" />
          <div className="intro-screen__shockwave intro-screen__shockwave--2" />
          <div className="intro-screen__mark-halo" />
          
          <div className="intro-screen__mark">
            <span className="intro-screen__mark-letters">KM</span>
            <div className="intro-screen__mark-orbit" />
          </div>
        </div>

        {/* Horizontal Typography Unfold with Letter Stagger & Optical Sheen */}
        {phase !== 'mark-in' && (
          <div className="intro-screen__text-wrapper">
            {/* Anamorphic Lens Flare Beam Sweep */}
            <div className="intro-screen__light-beam" aria-hidden="true" />

            <div className="intro-screen__title-row">
              <span className="intro-screen__title-text">
                {'KAVYA MODI'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="intro-screen__title-char"
                    style={{ animationDelay: `${0.035 * i}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="intro-screen__title-badge">PRO</span>
            </div>

            <div className="intro-screen__sub-row">
              <span className="intro-screen__status-dot" />
              <span className="intro-screen__sub-text">FULL-STACK WEB ARCHITECT</span>
              <span className="intro-screen__init-tag">
                {chargeProgress === 100 ? 'ONLINE 100%' : `INIT ${chargeProgress}%`}
              </span>
            </div>

            {/* Micro Laser Progress Track */}
            <div className="intro-screen__progress-bar">
              <div
                className="intro-screen__progress-fill"
                style={{ width: `${chargeProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Particle Constellation */}
      <div className="intro-screen__particles" aria-hidden="true">
        <span className="intro-particle intro-particle--1" />
        <span className="intro-particle intro-particle--2" />
        <span className="intro-particle intro-particle--3" />
        <span className="intro-particle intro-particle--4" />
        <span className="intro-particle intro-particle--5" />
        <span className="intro-particle intro-particle--6" />
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

