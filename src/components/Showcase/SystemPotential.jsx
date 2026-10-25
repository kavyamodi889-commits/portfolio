import { useState, useEffect, useRef } from 'react'
import './SystemPotential.css'

const ROTATING_WORDS = ['Concurrency', 'Scalability', 'Performance', 'Reliability', 'Intelligence']

/* ── Live typing terminal for Card 2 ── */
const TERMINAL_LINES = [
  { prefix: '$', text: ' python cluster_node_01.py --mode=production', color: '#94a3b8' },
  { prefix: '→', text: ' Pattern.connect(cluster="us-east-1")', color: '#60a5fa' },
  { prefix: '✓', text: ' status = "ACTIVE_OPTIMAL"  [p99: 64ms]', color: '#34d399' },
  { prefix: '→', text: ' metrics.throughput = 450+ req/s', color: '#ff9d5c' },
  { prefix: '✓', text: ' errors = 0  uptime = 99.97%', color: '#34d399' },
]

/* ── Skill bars for unique card 4 ── */
const SKILL_BARS = [
  { label: 'React / JS', pct: 96, color: '#60a5fa' },
  { label: 'MySQL / ACID', pct: 91, color: '#ff7043' },
  { label: 'Python / FastAPI', pct: 85, color: '#34d399' },
  { label: 'Node.js / REST', pct: 88, color: '#fbbf24' },
]

function TypingTerminal() {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [displayedLines, setDisplayedLines] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    const currentLine = TERMINAL_LINES[lineIdx]
    if (!currentLine) return
    if (charIdx < currentLine.text.length) {
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), 38 + Math.random() * 18)
    } else {
      timerRef.current = setTimeout(() => {
        setDisplayedLines((prev) => [...prev.slice(-4), { ...currentLine, full: true }])
        const nextLine = (lineIdx + 1) % TERMINAL_LINES.length
        setLineIdx(nextLine)
        setCharIdx(0)
        if (nextLine === 0) setDisplayedLines([])
      }, 600)
    }
    return () => clearTimeout(timerRef.current)
  }, [lineIdx, charIdx])

  const currentLine = TERMINAL_LINES[lineIdx]

  return (
    <pre className="hardware-terminal__code">
      {displayedLines.map((l, i) => (
        <div key={i} className="term-line">
          <span className="term-prefix" style={{ color: '#475569' }}>{l.prefix}</span>
          <span style={{ color: l.color }}>{l.text}</span>
        </div>
      ))}
      {currentLine && (
        <div className="term-line term-line--active">
          <span className="term-prefix" style={{ color: '#475569' }}>{currentLine.prefix}</span>
          <span style={{ color: currentLine.color }}>{currentLine.text.slice(0, charIdx)}</span>
          <span className="term-cursor" />
        </div>
      )}
    </pre>
  )
}

/* ── Animated skill bar (in-view fill) ── */
function SkillBar({ label, pct, color, delay = 0 }) {
  const [filled, setFilled] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true) },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="sp-skill" ref={ref}>
      <div className="sp-skill__meta">
        <span className="sp-skill__label">{label}</span>
        <span className="sp-skill__pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="sp-skill__track">
        <div
          className="sp-skill__fill"
          style={{
            width: filled ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  )
}

/* ── Radar sweep HUD for section decoration ── */
function RadarHUD() {
  return (
    <div className="sp-radar" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="sp-radar__svg">
        <circle cx="100" cy="100" r="88" stroke="rgba(255,87,34,0.12)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="62" stroke="rgba(255,87,34,0.09)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="36" stroke="rgba(255,87,34,0.07)" strokeWidth="1" fill="none" />
        <line x1="100" y1="12" x2="100" y2="188" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="12" y1="100" x2="188" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="38" y1="38" x2="162" y2="162" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="162" y1="38" x2="38" y2="162" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        {/* Sweep */}
        <path d="M100,100 L100,12 A88,88 0 0,1 188,100 Z" fill="url(#radarSweep)" className="sp-radar__sweep" />
        <defs>
          <radialGradient id="radarSweep" cx="0%" cy="100%" r="100%">
            <stop offset="0%" stopColor="rgba(255,87,34,0)" />
            <stop offset="100%" stopColor="rgba(255,87,34,0.22)" />
          </radialGradient>
        </defs>
        {/* Blips */}
        <circle cx="142" cy="62" r="3" fill="#ff5722" opacity="0.85" className="sp-radar__blip sp-radar__blip--1" />
        <circle cx="78" cy="138" r="2" fill="#10b981" opacity="0.75" className="sp-radar__blip sp-radar__blip--2" />
        <circle cx="60" cy="75" r="2.5" fill="#fbbf24" opacity="0.7" className="sp-radar__blip sp-radar__blip--3" />
      </svg>
    </div>
  )
}

export default function SystemPotential() {
  const [wordIdx, setWordIdx] = useState(0)
  const [activeTrace, setActiveTrace] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="sys-potential" id="potential" aria-label="Core Engineering Philosophy">
      {/* ── Layered ambient background ── */}
      <div className="sys-potential__glow" aria-hidden="true" />
      <div className="sys-potential__grid-bg" aria-hidden="true" />
      <div className="sys-potential__scanline" aria-hidden="true" />

      <div className="container sys-potential__container">
        {/* ── Section Header ── */}
        <div className="sys-potential__header">
          {/* Decorative radar HUD (top-right) */}
          <RadarHUD />

          <div className="sys-potential__badge border-glow-pulse">
            <span className="sys-potential__badge-dot" />
            <span>Core Engineering Philosophy</span>
            <span className="sp-badge-freq">4.8 GHz</span>
          </div>

          <h2 className="sys-potential__title">
            Architecting Systems for Full{' '}
            <span className="sys-potential__cycler">
              <span className="sys-potential__word" key={wordIdx}>
                {ROTATING_WORDS[wordIdx]}
              </span>
            </span>
          </h2>

          {/* Animated data rail below title */}
          <div className="sp-data-rail" aria-hidden="true">
            <span className="sp-data-rail__track">
              <span className="sp-data-rail__pulse" />
            </span>
            <span className="sp-data-rail__label">SYSTEM · NOMINAL · v8.0</span>
            <span className="sp-data-rail__track sp-data-rail__track--right">
              <span className="sp-data-rail__pulse sp-data-rail__pulse--right" />
            </span>
          </div>

          <p className="sys-potential__subtitle">
            Operating Executive at <strong>Pattern LLC</strong> (2026 – Present) and Semcom BCA graduate with{' '}
            <strong>9.55 CGPA (Rank&nbsp;1)</strong>. Designing enterprise-grade databases,
            zero-friction React user experiences, and fault-tolerant backends.
          </p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="sys-potential__bento">
          {/* ┌── Card 1: DB Architecture PCB ──┐ */}
          <div
            className="bento-card bento-card--large"
            onMouseEnter={() => setActiveTrace(true)}
            onMouseLeave={() => setActiveTrace(false)}
          >
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Silicon &amp; Engine Architecture</span>
              </div>
              <span className="bento-card__status">LIVE SYSTEM</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">High-Concurrency Database Architecture</h3>
              <p className="bento-card__desc">
                Engineered ACID transactions, row-level locks, and relational schemas handling
                multi-user operations in enterprise PHP/MySQL environments with sub-85ms response cycles.
              </p>

              {/* PCB Circuit Board Visual */}
              <div className={`bento-pcb-board ${activeTrace ? 'bento-pcb-board--active' : ''}`} aria-hidden="true">
                <svg className="bento-pcb-svg" viewBox="0 0 680 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="pcb-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <pattern id="pcb-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.9" fill="rgba(255,255,255,0.045)" />
                    </pattern>
                    <radialGradient id="cpu-core-grad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ff7043" />
                      <stop offset="100%" stopColor="#7c1900" />
                    </radialGradient>
                  </defs>

                  {/* Substrate Grid */}
                  <rect width="680" height="200" fill="url(#pcb-dots)" />

                  {/* Base Copper Traces */}
                  <g className="pcb-copper-traces" stroke="rgba(255,110,35,0.20)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 20 40 L 140 40 L 180 75 L 260 75" />
                    <path d="M 20 85 L 110 85 L 145 105 L 260 105" />
                    <path d="M 20 155 L 130 155 L 175 125 L 260 125" />
                    <path d="M 420 75 L 500 75 L 535 45 L 660 45" />
                    <path d="M 420 105 L 530 105 L 565 85 L 660 85" />
                    <path d="M 420 125 L 485 125 L 525 160 L 660 160" />
                    <path d="M 70 40 L 70 85" strokeDasharray="3 4" strokeWidth="1" stroke="rgba(255,255,255,0.10)" />
                    <path d="M 590 85 L 590 160" strokeDasharray="3 4" strokeWidth="1" stroke="rgba(255,255,255,0.10)" />
                    <path d="M 210 25 L 245 60 L 260 60" />
                    <path d="M 420 145 L 440 145 L 475 180 L 580 180" />
                  </g>

                  {/* Gold Vias */}
                  <g fill="#ff8c42" opacity="0.9">
                    <circle cx="20" cy="40" r="3.5" /><circle cx="20" cy="85" r="3.5" />
                    <circle cx="20" cy="155" r="3.5" /><circle cx="140" cy="40" r="2.5" />
                    <circle cx="110" cy="85" r="2.5" /><circle cx="130" cy="155" r="2.5" />
                    <circle cx="660" cy="45" r="3.5" /><circle cx="660" cy="85" r="3.5" />
                    <circle cx="660" cy="160" r="3.5" /><circle cx="500" cy="75" r="2.5" />
                    <circle cx="530" cy="105" r="2.5" /><circle cx="485" cy="125" r="2.5" />
                  </g>

                  {/* Animated Electricity Comets */}
                  <g className="pcb-live-comets">
                    <path className="pcb-comet pcb-comet--1" d="M 20 40 L 140 40 L 180 75 L 260 75"
                      stroke="#ff9d5c" strokeWidth="2.5" strokeLinecap="round" filter="url(#pcb-glow)" />
                    <path className="pcb-comet pcb-comet--2" d="M 20 85 L 110 85 L 145 105 L 260 105"
                      stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#pcb-glow)" />
                    <path className="pcb-comet pcb-comet--3" d="M 420 75 L 500 75 L 535 45 L 660 45"
                      stroke="#ff5722" strokeWidth="2.5" strokeLinecap="round" filter="url(#pcb-glow)" />
                    <path className="pcb-comet pcb-comet--4" d="M 420 125 L 485 125 L 525 160 L 660 160"
                      stroke="#ff9d5c" strokeWidth="2.5" strokeLinecap="round" filter="url(#pcb-glow)" />
                  </g>

                  {/* Central Processor Die */}
                  <g className="pcb-cpu-die" transform="translate(260, 46)">
                    <rect x="0" y="0" width="160" height="108" rx="10"
                      fill="#080c14" stroke="rgba(255,110,35,0.38)" strokeWidth="1.5" />
                    <rect x="10" y="10" width="140" height="88" rx="6"
                      fill="#101624" stroke="rgba(255,255,255,0.07)" />
                    {/* Bevel highlight */}
                    <line x1="12" y1="12" x2="148" y2="12" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    {/* Core */}
                    <circle cx="80" cy="44" r="18" fill="rgba(255,87,34,0.14)" stroke="#ff5722" strokeWidth="1.5" />
                    <circle cx="80" cy="44" r="10" fill="url(#cpu-core-grad)" />
                    <text x="80" y="48" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="monospace">ACID</text>
                    <text x="80" y="76" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800" letterSpacing="0.10em" fontFamily="monospace">MySQL v8.0</text>
                    <text x="80" y="88" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600" letterSpacing="0.08em" fontFamily="monospace">TRANSACTION ENGINE</text>
                  </g>

                  {/* SMD Components */}
                  <g fill="#334155" fontSize="6.5" fontFamily="monospace">
                    <rect x="155" y="30" width="12" height="6" rx="1" stroke="rgba(255,255,255,0.18)" />
                    <text x="157" y="28" fill="#64748b">C12</text>
                    <rect x="125" y="76" width="12" height="6" rx="1" stroke="rgba(255,255,255,0.18)" />
                    <text x="127" y="74" fill="#64748b">R4</text>
                    <rect x="510" y="66" width="12" height="6" rx="1" stroke="rgba(255,255,255,0.18)" />
                    <text x="512" y="64" fill="#64748b">U3</text>
                  </g>
                </svg>

                <div className="pcb-live-badge">
                  <span className="pcb-live-pulse" />
                  <span>BUS FREQ: 4.8 GHz // LOCKED</span>
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

          {/* ┌── Card 2: Pattern LLC ──┐ */}
          <div className="bento-card bento-card--hardware">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Enterprise Execution</span>
              </div>
              <span className="bento-card__status bento-card__status--amber">2026 – PRESENT</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">Pattern LLC (Operations)</h3>
              <p className="bento-card__desc">
                Operating Executive orchestrating distributed client pipelines, digital infrastructure
                reliability, and high-throughput workflows.
              </p>

              <div className="hardware-showcase">
                {/* 3D Silicon Die */}
                <div className="silicon-die-package" title="Pattern LLC Execution Silicon Die">
                  <div className="silicon-die-glow" />
                  <div className="silicon-die-substrate">
                    <div className="silicon-pins silicon-pins--top" />
                    <div className="silicon-pins silicon-pins--bottom" />
                    <div className="silicon-die-core">
                      <div className="silicon-die-emblem">⚡</div>
                      <span className="silicon-die-label">PATTERN</span>
                    </div>
                  </div>
                </div>

                {/* Live Typing Terminal */}
                <div className="hardware-terminal" aria-label="Pattern LLC live telemetry console">
                  <div className="hardware-terminal__bar">
                    <span className="hw-dot hw-dot--red" />
                    <span className="hw-dot hw-dot--yellow" />
                    <span className="hw-dot hw-dot--green" />
                    <span className="hw-terminal__title">cluster_node_01.py</span>
                  </div>
                  <TypingTerminal />
                  <div className="hardware-terminal__footer">
                    <span className="hw-status-dot" />
                    <span className="hw-status-text">NODE: 450+ REQ/S · 0 ERRORS</span>
                  </div>
                </div>
              </div>

              <div className="bento-corp-badge">
                <div className="bento-corp-icon">⚡</div>
                <div className="bento-corp-details">
                  <span className="bento-corp-role">Operating Executive</span>
                  <span className="bento-corp-name">Pattern LLC · Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          {/* ┌── Card 3: Academic Excellence ──┐ */}
          <div className="bento-card bento-card--academic">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Academic Record</span>
              </div>
              <span className="bento-card__status bento-card__status--gold">GOLD MEDALIST</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">9.55 CGPA Academic Record</h3>
              <p className="bento-card__desc">
                Bachelor of Computer Applications (BCA) at Semcom, Sardar Patel / CVM University.
                Graduated 1st Rank in Department with comprehensive honors.
              </p>

              <div className="academic-meter-box">
                <div className="academic-meter__header">
                  <span className="academic-meter__label">CUMULATIVE GRADE POINT AVERAGE</span>
                  <span className="academic-meter__score">9.55 / 10.00</span>
                </div>
                <div className="academic-meter__track">
                  <div className="academic-meter__fill" style={{ width: '95.5%' }} />
                </div>
                <div className="academic-meter__tags">
                  <span className="academic-tag">Rank 1 in Department</span>
                  <span className="academic-tag">Gold Medalist</span>
                  <span className="academic-tag">DBMS Honors</span>
                </div>
              </div>

              <div className="bento-corp-badge">
                <div className="bento-corp-icon bento-corp-icon--gold">★</div>
                <div className="bento-corp-details">
                  <span className="bento-corp-role">Department Rank 1</span>
                  <span className="bento-corp-name">Semcom · CVM University</span>
                </div>
              </div>
            </div>
          </div>

          {/* ┌── Card 4: Tech Stack Skill Bars (NEW) ──┐ */}
          <div className="bento-card bento-card--skills sp-skills-card">
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot sp-dot--blue" />
                <span>Stack Proficiency</span>
              </div>
              <span className="bento-card__status bento-card__status--blue">FULL-STACK</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">Technology Arsenal</h3>

              <div className="sp-skills-list">
                {SKILL_BARS.map((s, i) => (
                  <SkillBar key={s.label} {...s} delay={i * 0.12} />
                ))}
              </div>

              {/* Floating tech orbit orbs */}
              <div className="sp-orb-ring" aria-hidden="true">
                <span className="sp-orb sp-orb--react">⚛</span>
                <span className="sp-orb sp-orb--python">🐍</span>
                <span className="sp-orb sp-orb--db">🗄</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
