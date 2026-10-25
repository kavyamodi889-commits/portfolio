import { useState, useEffect, useRef, useCallback } from 'react'
import kavyaPortrait from '../../assets/kavya-portrait.jpg'
import './IntroSequence.css'

const BOOT_LOGS = [
  'INITIALIZING // KAVYA MODI ARCHITECTURE v2.6',
  'ACADEMIC MERIT // SEMCOM RANK 1 (9.55 CGPA) GOLD MEDALIST',
  'ENTERPRISE // PATTERN LLC OPERATING PIPELINE ACTIVE',
  'CORE SYSTEMS // REACT 19 + FASTAPI + ACID TRANSACTIONS',
  'TELEMETRY // ALL NODES OPTIMAL & SYNCHRONIZED'
]

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('charging') // 'charging' -> 'unveiling' -> 'done'
  const [chargeProgress, setChargeProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const timersRef = useRef([])
  const animFrameRef = useRef(null)

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
  }

  // Smooth high-precision charge counter (0 -> 100% over 2.2s)
  const startCounter = useCallback(() => {
    const startTime = performance.now()
    const duration = 2200

    const update = (now) => {
      const elapsed = now - startTime
      const raw = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - raw, 3)
      const pct = Math.floor(ease * 100)
      setChargeProgress(pct)

      const logIdx = Math.min(Math.floor((pct / 100) * BOOT_LOGS.length), BOOT_LOGS.length - 1)
      setLogIndex(logIdx)

      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(update)
      } else {
        // Trigger cinematic shutter split
        setPhase('unveiling')
        const tEnd = setTimeout(() => {
          setPhase('done')
          document.body.classList.remove('intro-active')
          onComplete?.()
        }, 850)
        timersRef.current.push(tEnd)
      }
    }
    animFrameRef.current = requestAnimationFrame(update)
  }, [onComplete])

  const skipIntro = useCallback(() => {
    clearAllTimers()
    setPhase('done')
    document.body.classList.remove('intro-active')
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    document.body.classList.add('intro-active')
    startCounter()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') skipIntro()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearAllTimers()
      document.body.classList.remove('intro-active')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [startCounter, skipIntro])

  if (phase === 'done') return null

  return (
    <aside
      className={`intro-screen intro-screen--${phase}`}
      aria-label="Loading portfolio experience"
      role="status"
    >
      {/* ── Cinematic Dual Shutter Curtains ── */}
      <div className="intro-curtain intro-curtain--top" aria-hidden="true" />
      <div className="intro-curtain intro-curtain--bottom" aria-hidden="true" />

      {/* ── Monumental Crimson "PORTFOLIO" Watermark in Background ── */}
      <div className="intro-screen__watermark" aria-hidden="true">
        <span>PORTFOLIO</span>
      </div>

      {/* ── Ambient Crimson Bloom & Ray Grid ── */}
      <div className="intro-screen__ambient" aria-hidden="true">
        <div className="intro-screen__ambient-glow" />
        <div className="intro-screen__grid" />
      </div>

      {/* ── Central Glassmorphic Lockup ── */}
      <div className="intro-screen__lockup">

        {/* Double Laser Fencing Ring with Kavya's Portrait */}
        <div className="intro-screen__avatar-container">
          <div className="intro-screen__laser-ring intro-screen__laser-ring--outer" />
          <div className="intro-screen__laser-ring intro-screen__laser-ring--inner" />
          <div className="intro-screen__avatar-aura" />
          
          <div className="intro-screen__avatar-frame">
            <img
              src={kavyaPortrait}
              alt="Kavya Modi"
              className="intro-screen__avatar-img"
              width="100"
              height="100"
            />
            <span className="intro-screen__avatar-status" />
          </div>
        </div>

        {/* Identity & Merit Badges */}
        <div className="intro-screen__brand-box">
          <span className="intro-screen__greeting-script">Hello, I'm</span>
          <h2 className="intro-screen__name">KAVYA MODI</h2>
          <div className="intro-screen__tags">
            <span className="intro-screen__tag intro-screen__tag--role">WEB DEVELOPER &amp; ARCHITECT</span>
            <span className="intro-screen__tag intro-screen__tag--merit">★ SEMCOM RANK 1</span>
          </div>
        </div>

        {/* Digital Precision Percentage Counter */}
        <div className="intro-screen__counter">
          <span className="intro-screen__counter-num font-mono">
            {String(chargeProgress).padStart(2, '0')}
          </span>
          <span className="intro-screen__counter-pct font-mono">%</span>
        </div>

        {/* Laser Progress Track */}
        <div className="intro-screen__track">
          <div
            className="intro-screen__track-fill"
            style={{ width: `${chargeProgress}%` }}
          />
        </div>

        {/* Telemetry Console Readout */}
        <div className="intro-screen__telemetry font-mono">
          <span className="intro-screen__telemetry-prompt">&gt;</span>
          <span className="intro-screen__telemetry-text">{BOOT_LOGS[logIndex]}</span>
          <span className="intro-screen__telemetry-cursor" />
        </div>

      </div>

      {/* Skip Action Button */}
      <button
        type="button"
        className="intro-screen__skip-btn"
        onClick={skipIntro}
        title="Skip intro animation (Esc)"
      >
        <span>Skip</span>
        <span className="intro-screen__skip-kbd">Esc</span>
      </button>

    </aside>
  )
}
