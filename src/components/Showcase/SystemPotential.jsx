import { useState, useEffect } from 'react'
import './SystemPotential.css'

const ROTATING_WORDS = ['Concurrency', 'Scalability', 'Performance', 'Reliability', 'Intelligence']

export default function SystemPotential() {
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="sys-potential" id="potential" aria-label="System Capabilities">
      {/* Ambient background glows */}
      <div className="sys-potential__glow" aria-hidden="true" />

      <div className="container sys-potential__container">
        {/* Section Header with Rotating Word Pill (as in reference video 12s) */}
        <div className="sys-potential__header">
          <div className="sys-potential__badge border-glow-pulse">
            <span className="sys-potential__badge-dot" />
            <span>Core Engineering Philosophy</span>
          </div>

          <h2 className="sys-potential__title">
            Architecting Systems for Full{' '}
            <span className="sys-potential__cycler">
              <span className="sys-potential__word" key={wordIdx}>
                {ROTATING_WORDS[wordIdx]}
              </span>
            </span>
          </h2>

          <p className="sys-potential__subtitle">
            Operating Executive at <strong>Pattern LLC</strong> (2026 – Present) and Semcom BCA graduate with <strong>9.55 CGPA (Rank 1)</strong>. Designing enterprise-grade databases, zero-friction React user experiences, and fault-tolerant backends.
          </p>
        </div>

        {/* ── BENTO GRID (Frame 18s Inspiration) ── */}
        <div className="sys-potential__bento">
          {/* Card 1: Concurrency & Database Engine */}
          <div className="bento-card bento-card--large">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Engine Specification</span>
              </div>
              <span className="bento-card__status">LIVE SYSTEM</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">High-Concurrency Database Architecture</h3>
              <p className="bento-card__desc">
                Engineered ACID transactions, row-level locks, and relational schemas handling multi-user operations in enterprise PHP/MySQL environments with sub-100ms response cycles.
              </p>

              {/* Animated Hardware PCB Traces Visual inside Card */}
              <div className="bento-pcb-visual" aria-hidden="true">
                <div className="bento-pcb-track bento-pcb-track--1" />
                <div className="bento-pcb-track bento-pcb-track--2" />
                <div className="bento-pcb-pulse bento-pcb-pulse--1" />
                <div className="bento-pcb-pulse bento-pcb-pulse--2" />
                <div className="bento-chip-badge">
                  <span className="bento-chip-icon">🗄</span>
                  <span>MySQL ACID CORE</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="bento-metrics-row">
                <div className="bento-metric">
                  <span className="bento-metric__val">100%</span>
                  <span className="bento-metric__lbl">Data Integrity</span>
                </div>
                <div className="bento-metric">
                  <span className="bento-metric__val">&lt; 85ms</span>
                  <span className="bento-metric__lbl">Avg Query Latency</span>
                </div>
                <div className="bento-metric">
                  <span className="bento-metric__val">256-Bit</span>
                  <span className="bento-metric__lbl">Cryptographic Hash</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Pattern LLC & Production Operations */}
          <div className="bento-card">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Executive Operations</span>
              </div>
              <span className="bento-card__status bento-card__status--amber">2026 – PRESENT</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">Pattern LLC (Operations)</h3>
              <p className="bento-card__desc">
                Operating Executive managing platform execution, client workflow reliability, and digital infrastructure coordination across global environments.
              </p>

              <div className="bento-corp-badge">
                <div className="bento-corp-icon">⚡</div>
                <div className="bento-corp-details">
                  <span className="bento-corp-role">Operating Executive</span>
                  <span className="bento-corp-name">Pattern LLC · Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Excellence */}
          <div className="bento-card">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Academic Record</span>
              </div>
              <span className="bento-card__status">GOLD MEDALIST</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">9.55 CGPA Distinction</h3>
              <p className="bento-card__desc">
                Bachelor of Computer Applications (BCA) from Semcom, Sardar Patel / CVM University. Achieved Rank 1 in Department with comprehensive honors.
              </p>

              <div className="bento-corp-badge">
                <div className="bento-corp-icon">★</div>
                <div className="bento-corp-details">
                  <span className="bento-corp-role">Department Rank 1</span>
                  <span className="bento-corp-name">Semcom · CVM University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
