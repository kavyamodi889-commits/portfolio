import { useState, useEffect } from 'react'
import './IntroSequence.css'

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('charging') // 'charging' -> 'ignite' -> 'fly' -> 'done'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if user already saw intro in this session (optional, but keep it snappy)
    const hasSeen = sessionStorage.getItem('km_intro_seen')
    if (hasSeen) {
      setPhase('done')
      onComplete?.()
      return
    }

    // Step 1: Smooth progress charge from 0 to 100 in 1.4s
    const startTime = performance.now()
    const duration = 1400

    const updateProgress = (now) => {
      const elapsed = now - startTime
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress)
      } else {
        // Step 2: Ignite & Flash
        setPhase('ignite')
        setTimeout(() => {
          // Step 3: Fly into position
          setPhase('fly')
          setTimeout(() => {
            setPhase('done')
            sessionStorage.setItem('km_intro_seen', 'true')
            onComplete?.()
          }, 600)
        }, 400)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div className={`intro-sequence intro-sequence--${phase}`} aria-hidden="true">
      {/* Background radial amber darkness */}
      <div className="intro-sequence__ambient" />

      {/* Central Monogram Insignia */}
      <div className="intro-sequence__center">
        <div className="intro-sequence__logo-core">
          {/* Shockwave Rings on Ignite */}
          {phase === 'ignite' && <div className="intro-sequence__shockwave" />}
          {phase === 'ignite' && <div className="intro-sequence__shockwave intro-sequence__shockwave--2" />}

          <div className="intro-sequence__emblem">
            <span className="intro-sequence__letters">KM</span>
            <div className="intro-sequence__emblem-glow" />
          </div>

          <div className="intro-sequence__circuit-ring" />
        </div>

        {/* Status & Progress Bar */}
        <div className="intro-sequence__telemetry">
          <div className="intro-sequence__status">
            <span className="intro-sequence__dot" />
            <span className="intro-sequence__text">
              {phase === 'charging' && `INITIALIZING NEURAL WEB ENGINE... [${progress}%]`}
              {phase === 'ignite' && 'SYSTEMS 100% ONLINE · LAUNCHING'}
              {phase === 'fly' && 'KAVYA MODI · PORTFOLIO READY'}
            </span>
          </div>

          <div className="intro-sequence__bar-track">
            <div className="intro-sequence__bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Quick skip button */}
      <button
        type="button"
        className="intro-sequence__skip"
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
