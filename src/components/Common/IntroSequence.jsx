import { useState, useEffect, useRef, useCallback } from 'react'
import './IntroSequence.css'

const BOOT_LOGS = [
  'KERNEL // ARCHITECT PROTOCOL v2.6',
  'CORE ENGINE // REACT 19 + FASTAPI + ACID TRANSACTIONS',
  'CREDENTIALS // SEMCOM RANK 1 (9.55 CGPA) · GOLD MEDALIST',
  'ENTERPRISE // PATTERN LLC EXEC PIPELINE ACTIVE',
  'TELEMETRY // ALL QUANTUM NODES NOMINAL'
]

export default function IntroSequence({ onComplete }) {
  // Phase sequence: 'mark-in' -> 'expand-text' -> 'morph-nav' -> 'done'
  const [phase, setPhase] = useState('mark-in')
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0, scale: 0.52 })
  const [chargeProgress, setChargeProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const lockupRef = useRef(null)
  const timersRef = useRef([])
  const animFrameRef = useRef(null)

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
  }

  // Rapid high-precision charge counter (0 -> 100% over 2.0s)
  const startChargeCounter = useCallback(() => {
    const startTime = performance.now()
    const duration = 2100

    const updateCounter = (now) => {
      const elapsed = now - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeVal = 1 - Math.pow(1 - rawProgress, 3)
      const currentPct = Math.floor(easeVal * 100)
      setChargeProgress(currentPct)

      // Cycle boot logs based on progress
      const logIdx = Math.min(Math.floor((currentPct / 100) * BOOT_LOGS.length), BOOT_LOGS.length - 1)
      setLogIndex(logIdx)

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

    // Phase 1 -> 2: Text unrolls & telemetry boots (at 750ms)
    const t1 = setTimeout(() => {
      setPhase('expand-text')
    }, 750)

    // Phase 2 -> 3: Morph & glide to Navbar logo position + Curtain Shutter split (at 2500ms)
    const t2 = setTimeout(() => {
      const isMobile = window.innerWidth <= 860
      const navLogoMark = document.querySelector('.navbar__logo-mark') || document.querySelector('.navbar__logo')
      
      if (navLogoMark && !isMobile) {
        const rect = navLogoMark.getBoundingClientRect()
        const destX = (rect.left + rect.width / 2) - window.innerWidth / 2
        const destY = (rect.top + rect.height / 2) - window.innerHeight / 2
        setTargetPos({ x: destX, y: destY, scale: 0.62 })
      } else {
        // Smooth fade-up / exit on mobile
        setTargetPos({
          x: 0,
          y: -40,
          scale: 0.8
        })
      }
      setPhase('morph-nav')
    }, 2500)

    // Phase 3 -> Done: Unmount overlay and release page scroll (at 3300ms)
    const t3 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('intro-active')
      onComplete?.()
    }, 3300)

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

      {/* HUD Corner Tech Reticles */}
      <div className="intro-screen__corner-reticle intro-screen__corner-reticle--tl" aria-hidden="true" />
      <div className="intro-screen__corner-reticle intro-screen__corner-reticle--tr" aria-hidden="true" />
      <div className="intro-screen__corner-reticle intro-screen__corner-reticle--bl" aria-hidden="true" />
      <div className="intro-screen__corner-reticle intro-screen__corner-reticle--br" aria-hidden="true" />

      {/* ── Brand Lockup: Center Emblem -> Typography Cascade -> Navbar Docking ── */}
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
          <div className="intro-screen__shockwave intro-screen__shockwave--3" />
          <div className="intro-screen__mark-halo" />
          
          <div className="intro-screen__mark">
            <span className="intro-screen__mark-letters">KM</span>
            <div className="intro-screen__mark-orbit" />
          </div>
        </div>

        {/* Horizontal & Centered Typography Unfold */}
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
              <span className="intro-screen__title-badge">ARCHITECT</span>
            </div>

            <div className="intro-screen__sub-row">
              <span className="intro-screen__status-dot" />
              <span className="intro-screen__sub-text">FULL-STACK WEB & SYSTEMS</span>
              <span className="intro-screen__init-tag">
                {chargeProgress === 100 ? 'ONLINE 100%' : `BOOT ${chargeProgress}%`}
              </span>
            </div>

            {/* Diagnostic Boot Telemetry Readout */}
            <div className="intro-screen__boot-telemetry font-mono" aria-live="polite">
              <span className="intro-screen__boot-prompt">&gt;</span>
              <span className="intro-screen__boot-msg">{BOOT_LOGS[logIndex]}</span>
              <span className="intro-screen__boot-cursor" />
            </div>

            {/* Audio / Spectrum Frequency Equalizer Visualizer */}
            <div className="intro-screen__equalizer" aria-hidden="true">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.85, 0.5, 0.95, 0.75, 0.45, 0.8].map((mult, idx) => (
                <span
                  key={idx}
                  className="intro-screen__eq-bar"
                  style={{
                    animationDuration: `${0.45 + (idx % 4) * 0.15}s`,
                    animationDelay: `${idx * 0.05}s`
                  }}
                />
              ))}
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


