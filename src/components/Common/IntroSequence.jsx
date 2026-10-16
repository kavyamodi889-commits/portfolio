import { useState, useEffect, useRef } from 'react'
import './IntroSequence.css'

// Generate random particle positions
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 3,
  opacity: Math.random() * 0.6 + 0.2,
}))

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('charging') // 'charging' -> 'ignite' -> 'reveal' -> 'fly' -> 'done'
  const [progress, setProgress] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('km_intro_seen')
    if (hasSeen) {
      setPhase('done')
      onComplete?.()
      return
    }

    const duration = 1800
    startRef.current = performance.now()

    const updateProgress = (now) => {
      const elapsed = now - startRef.current
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress)
      } else {
        // Ignite phase — flash & shockwave
        setPhase('ignite')
        setTimeout(() => {
          // Reveal phase — curtain splits
          setPhase('reveal')
          setTimeout(() => {
            // Fly away
            setPhase('fly')
            setTimeout(() => {
              setPhase('done')
              sessionStorage.setItem('km_intro_seen', 'true')
              onComplete?.()
            }, 700)
          }, 500)
        }, 450)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div className={`intro-seq intro-seq--${phase}`} aria-hidden="true">

      {/* Scan lines overlay */}
      <div className="intro-seq__scanlines" />

      {/* Ambient radial glow */}
      <div className="intro-seq__ambient" />

      {/* Star particles */}
      <div className="intro-seq__particles">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="intro-seq__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Curtain panels — split left and right on reveal */}
      <div className="intro-seq__curtain intro-seq__curtain--left" />
      <div className="intro-seq__curtain intro-seq__curtain--right" />

      {/* Center monogram emblem */}
      <div className="intro-seq__center">
        <div className="intro-seq__logo-core">

          {/* Orbit rings */}
          <div className="intro-seq__ring intro-seq__ring--1" />
          <div className="intro-seq__ring intro-seq__ring--2" />
          <div className="intro-seq__ring intro-seq__ring--3" />

          {/* Shockwaves on ignite */}
          {(phase === 'ignite' || phase === 'reveal') && (
            <>
              <div className="intro-seq__shockwave intro-seq__shockwave--1" />
              <div className="intro-seq__shockwave intro-seq__shockwave--2" />
              <div className="intro-seq__shockwave intro-seq__shockwave--3" />
            </>
          )}

          {/* KM Emblem */}
          <div className="intro-seq__emblem">
            <div className="intro-seq__emblem-glow" />
            <span className="intro-seq__monogram">KM</span>
            <div className="intro-seq__emblem-border" />
          </div>
        </div>

        {/* Status telemetry */}
        <div className="intro-seq__telemetry">
          <div className="intro-seq__status-line">
            <span className="intro-seq__status-dot" />
            <span className="intro-seq__status-text">
              {phase === 'charging' && `NEURAL ENGINE INITIALIZING · ${progress}%`}
              {phase === 'ignite' && 'ALL SYSTEMS ONLINE · LAUNCHING'}
              {(phase === 'reveal' || phase === 'fly') && 'KAVYA MODI · PORTFOLIO READY'}
            </span>
          </div>
          <div className="intro-seq__progress-track">
            <div
              className="intro-seq__progress-fill"
              style={{ width: `${phase === 'ignite' || phase === 'reveal' || phase === 'fly' ? 100 : progress}%` }}
            />
            <div className="intro-seq__progress-glow" style={{ left: `${phase === 'ignite' || phase === 'reveal' || phase === 'fly' ? 100 : progress}%` }} />
          </div>
          <div className="intro-seq__bottom-line">
            <span>FULL-STACK WEB DEVELOPER</span>
            <span className="intro-seq__sep">·</span>
            <span>PATTERN LLC · SEMCOM 9.55 CGPA</span>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        type="button"
        className="intro-seq__skip"
        onClick={() => {
          setPhase('done')
          sessionStorage.setItem('km_intro_seen', 'true')
          onComplete?.()
        }}
      >
        Skip Intro ✕
      </button>
    </div>
  )
}
