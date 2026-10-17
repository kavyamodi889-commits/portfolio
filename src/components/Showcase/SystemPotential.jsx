import { useState, useEffect } from 'react'
import './SystemPotential.css'

const ROTATING_WORDS = ['Concurrency', 'Scalability', 'Performance', 'Reliability', 'Intelligence']

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
    <section className="sys-potential" id="potential" aria-label="System Capabilities">
      {/* Ambient background glows */}
      <div className="sys-potential__glow" aria-hidden="true" />

      <div className="container sys-potential__container">
        {/* Section Header with Rotating Word Pill (Reference Video 12s-18s) */}
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
            Operating Executive at <strong>Pattern LLC</strong> (2026 – Present) and Semcom BCA graduate with{' '}
            <strong>9.55 CGPA (Rank 1)</strong>. Designing enterprise-grade databases, zero-friction React user experiences, and fault-tolerant backends.
          </p>
        </div>

        {/* ── BENTO GRID (Inspired by Reference Video Frame 18s) ── */}
        <div className="sys-potential__bento">
          {/* Card 1: High-Concurrency Database Architecture with Interactive Silicon PCB */}
          <div 
            className="bento-card bento-card--large"
            onMouseEnter={() => setActiveTrace(true)}
            onMouseLeave={() => setActiveTrace(false)}
          >
            <div className="bento-card__header">
              <div className="bento-card__tag">
                <span className="bento-card__dot" />
                <span>Silicon & Engine Architecture</span>
              </div>
              <span className="bento-card__status">LIVE SYSTEM</span>
            </div>

            <div className="bento-card__body">
              <h3 className="bento-card__title">High-Concurrency Database Architecture</h3>
              <p className="bento-card__desc">
                Engineered ACID transactions, row-level locks, and relational schemas handling multi-user operations in enterprise PHP/MySQL environments with sub-85ms response cycles.
              </p>

              {/* ── Realistic Silicon PCB Motherboard Traces Graphic ── */}
              <div className={`bento-pcb-board ${activeTrace ? 'bento-pcb-board--active' : ''}`} aria-hidden="true">
                <svg className="bento-pcb-svg" viewBox="0 0 680 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Glowing Filter for Comets */}
                    <filter id="pcb-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    
                    {/* Linear Gradients for Traces */}
                    <linearGradient id="trace-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff5722" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#ff9d5c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ff5722" stopOpacity="0.25" />
                    </linearGradient>

                    <linearGradient id="comet-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#ff7043" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    {/* Subtle dot matrix pattern */}
                    <pattern id="pcb-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="rgba(255, 255, 255, 0.04)" />
                    </pattern>
                  </defs>

                  {/* Substrate Grid */}
                  <rect width="680" height="200" fill="url(#pcb-dots)" />

                  {/* Base Copper Traces */}
                  <g className="pcb-copper-traces" stroke="rgba(255, 120, 40, 0.22)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {/* Bus Line 1: Top Left to Center CPU */}
                    <path d="M 20 40 L 140 40 L 180 75 L 260 75" />
                    {/* Bus Line 2: Mid Left to Center CPU */}
                    <path d="M 20 85 L 110 85 L 145 105 L 260 105" />
                    {/* Bus Line 3: Bottom Left to Center CPU */}
                    <path d="M 20 155 L 130 155 L 175 125 L 260 125" />
                    
                    {/* Bus Line 4: Center CPU to Top Right */}
                    <path d="M 420 75 L 500 75 L 535 45 L 660 45" />
                    {/* Bus Line 5: Center CPU to Mid Right */}
                    <path d="M 420 105 L 530 105 L 565 85 L 660 85" />
                    {/* Bus Line 6: Center CPU to Bottom Right */}
                    <path d="M 420 125 L 485 125 L 525 160 L 660 160" />

                    {/* Secondary Cross-Traces & Ground Planes */}
                    <path d="M 70 40 L 70 85" strokeDasharray="3 3" strokeWidth="1" stroke="rgba(255, 255, 255, 0.12)" />
                    <path d="M 590 85 L 590 160" strokeDasharray="3 3" strokeWidth="1" stroke="rgba(255, 255, 255, 0.12)" />
                    <path d="M 210 25 L 245 60 L 260 60" />
                    <path d="M 420 145 L 440 145 L 475 180 L 580 180" />
                  </g>

                  {/* Gold Vias (Solder pads) */}
                  <g className="pcb-vias" fill="#ff8c42">
                    <circle cx="20" cy="40" r="3.5" />
                    <circle cx="20" cy="85" r="3.5" />
                    <circle cx="20" cy="155" r="3.5" />
                    <circle cx="140" cy="40" r="2.5" />
                    <circle cx="110" cy="85" r="2.5" />
                    <circle cx="130" cy="155" r="2.5" />
                    <circle cx="660" cy="45" r="3.5" />
                    <circle cx="660" cy="85" r="3.5" />
                    <circle cx="660" cy="160" r="3.5" />
                    <circle cx="500" cy="75" r="2.5" />
                    <circle cx="530" cy="105" r="2.5" />
                    <circle cx="485" cy="125" r="2.5" />
                  </g>

                  {/* Animated Electricity Comets running along the traces */}
                  <g className="pcb-live-comets">
                    {/* Comet 1: Left to CPU */}
                    <path
                      className="pcb-comet pcb-comet--1"
                      d="M 20 40 L 140 40 L 180 75 L 260 75"
                      stroke="#ff9d5c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#pcb-glow)"
                    />
                    {/* Comet 2: Mid Left to CPU */}
                    <path
                      className="pcb-comet pcb-comet--2"
                      d="M 20 85 L 110 85 L 145 105 L 260 105"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#pcb-glow)"
                    />
                    {/* Comet 3: CPU to Right */}
                    <path
                      className="pcb-comet pcb-comet--3"
                      d="M 420 75 L 500 75 L 535 45 L 660 45"
                      stroke="#ff5722"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#pcb-glow)"
                    />
                    {/* Comet 4: CPU to Bottom Right */}
                    <path
                      className="pcb-comet pcb-comet--4"
                      d="M 420 125 L 485 125 L 525 160 L 660 160"
                      stroke="#ff9d5c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#pcb-glow)"
                    />
                  </g>

                  {/* Central Silicon Processor Die SVG Element */}
                  <g className="pcb-cpu-die" transform="translate(260, 48)">
                    {/* Outer Gold Pins */}
                    <rect x="0" y="0" width="160" height="104" rx="10" fill="#0d111a" stroke="rgba(255, 120, 40, 0.4)" strokeWidth="1.5" />
                    <rect x="10" y="10" width="140" height="84" rx="6" fill="#141926" stroke="rgba(255, 255, 255, 0.08)" />
                    
                    {/* Chip Bevel Highlights */}
                    <line x1="12" y1="12" x2="148" y2="12" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                    
                    {/* Center Core Badge */}
                    <circle cx="80" cy="42" r="16" fill="rgba(255, 87, 34, 0.15)" stroke="#ff5722" strokeWidth="1.5" />
                    <text x="80" y="47" textAnchor="middle" fill="#ff9d5c" fontSize="13" fontWeight="900" fontFamily="monospace">ACID</text>
                    
                    <text x="80" y="72" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="0.12em" fontFamily="monospace">MYSQL CORE v8.0</text>
                    <text x="80" y="84" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontWeight="600" letterSpacing="0.08em" fontFamily="monospace">TRANSACTION ENGINE</text>
                  </g>

                  {/* SMD Capacitors & Labels */}
                  <g fill="#64748b" fontSize="7" fontFamily="monospace">
                    <rect x="155" y="32" width="12" height="6" rx="1" fill="#334155" stroke="rgba(255,255,255,0.2)" />
                    <text x="157" y="30">C12</text>
                    <rect x="125" y="78" width="12" height="6" rx="1" fill="#334155" stroke="rgba(255,255,255,0.2)" />
                    <text x="127" y="76">R4</text>
                    <rect x="510" y="68" width="12" height="6" rx="1" fill="#334155" stroke="rgba(255,255,255,0.2)" />
                    <text x="512" y="66">U3</text>
                    <rect x="540" y="98" width="12" height="6" rx="1" fill="#334155" stroke="rgba(255,255,255,0.2)" />
                    <text x="542" y="96">C28</text>
                  </g>
                </svg>

                {/* Live Activity Indicator Pill */}
                <div className="pcb-live-badge">
                  <span className="pcb-live-pulse" />
                  <span>BUS FREQ: 4.8 GHz // LOCKED</span>
                </div>
              </div>

              {/* Hardware Metrics Bar */}
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

          {/* Card 2: Enterprise Execution Engine (Pattern LLC) - Styled like NVIDIA Chip Card in frame_18s.png */}
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
                Operating Executive orchestrating distributed client pipelines, digital infrastructure reliability, and high-throughput workflows.
              </p>

              {/* Reference Frame 18s: Silicon Hardware Chip & Live Telemetry Terminal */}
              <div className="hardware-showcase">
                {/* 3D Glass Silicon Die Package */}
                <div className="silicon-die-package" title="Pattern LLC Execution Silicon Die">
                  <div className="silicon-die-glow" />
                  <div className="silicon-die-substrate">
                    {/* Micro Pin Array */}
                    <div className="silicon-pins silicon-pins--top" />
                    <div className="silicon-pins silicon-pins--bottom" />
                    <div className="silicon-die-core">
                      <div className="silicon-die-emblem">⚡</div>
                      <span className="silicon-die-label">PATTERN</span>
                    </div>
                  </div>
                </div>

                {/* Adjacent Live Telemetry Terminal */}
                <div className="hardware-terminal" aria-label="Pattern LLC live telemetry console">
                  <div className="hardware-terminal__bar">
                    <span className="hw-dot hw-dot--red" />
                    <span className="hw-dot hw-dot--yellow" />
                    <span className="hw-dot hw-dot--green" />
                    <span className="hw-terminal__title">cluster_node_01.py</span>
                  </div>
                  <pre className="hardware-terminal__code">
                    <code>
                      <span className="code-kw">async def</span> <span className="code-fn">execute_pipeline</span>():{'\n'}
                      {'  '}cluster = <span className="code-kw">await</span> Pattern.connect(){'\n'}
                      {'  '}status = <span className="code-str">"ACTIVE_OPTIMAL"</span>{'\n'}
                      {'  '}<span className="code-kw">return</span> cluster.metrics(p99=<span className="code-num">64</span>)
                    </code>
                  </pre>
                  <div className="hardware-terminal__footer">
                    <span className="hw-status-dot" />
                    <span className="hw-status-text">NODE STATUS: 450+ REQ/S · 0 ERRORS</span>
                  </div>
                </div>
              </div>

              {/* Pattern LLC Verification Badge */}
              <div className="bento-corp-badge">
                <div className="bento-corp-icon">⚡</div>
                <div className="bento-corp-details">
                  <span className="bento-corp-role">Operating Executive</span>
                  <span className="bento-corp-name">Pattern LLC · Enterprise</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Academic Excellence & Department Rank 1 Distinction */}
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
                Bachelor of Computer Applications (BCA) at Semcom, Sardar Patel / CVM University. Graduated 1st Rank in Department with comprehensive honors.
              </p>

              {/* Academic Telemetry Meter */}
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
        </div>
      </div>
    </section>
  )
}

