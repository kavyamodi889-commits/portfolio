import { useEffect, useRef, useState } from 'react'
import './Neural3DStage.css'

// Satellite nodes placed in perspective around the central silicon processor
// All nodes shifted right (+120px) so they stay within the right-panel background
const NODES = [
  {
    id: 'react',
    label: 'React 19',
    sub: 'Modern Frontend',
    icon: '⚛',
    x: -160,
    y: -100,
    telemetry: 'Virtual DOM · Fiber Engine · 60 FPS'
  },
  {
    id: 'python',
    label: 'Python / FastAPI',
    sub: 'AI & Microservices',
    icon: '🐍',
    x: -220,
    y: 60,
    telemetry: 'AsyncIO · Machine Learning · REST'
  },
  {
    id: 'db',
    label: 'MySQL & ACID',
    sub: 'High Concurrency DB',
    icon: '🗄',
    x: -120,
    y: 175,
    telemetry: 'Indexing · Transactions · Replication'
  },
  {
    id: 'pattern',
    label: 'Pattern LLC',
    sub: 'Operating Executive (2026)',
    icon: '⚡',
    x: 300,
    y: -75,
    telemetry: 'Active Role · Global Systems · Ops'
  },
  {
    id: 'semcom',
    label: 'Semcom BCA',
    sub: '9.55 CGPA · Rank 1',
    icon: '★',
    x: 380,
    y: 55,
    telemetry: 'CVM University · Gold Medal Distinction'
  },
  {
    id: 'backend',
    label: 'PHP & Node.js',
    sub: 'Enterprise Systems',
    icon: '◈',
    x: 250,
    y: 155,
    telemetry: 'Locker Systems · Auth & Security'
  },
]

export default function Neural3DStage() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeNode, setActiveNode] = useState(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // 3D smooth perspective tracking with mouse movement
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      targetX = relY * -12 // Tilt X (pitch)
      targetY = relX * 16  // Tilt Y (yaw)
    }

    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setTilt({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(loop)
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(loop)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Canvas animation: Circuit traces, comet-tail energy pulses, impact shockwaves, and solar embers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    let dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = canvas.width = rect.width * dpr
      height = canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Precalculate multi-waypoint PCB circuit routes for each satellite node
    // Routes match the classic angled geometry seen in the reference video
    const routes = [
      // React (top-left)
      [
        { x: -55, y: -20 },
        { x: -140, y: -20 },
        { x: -190, y: -75 },
        { x: -250, y: -75 },
      ],
      // Python (mid-left)
      [
        { x: -55, y: 15 },
        { x: -180, y: 15 },
        { x: -220, y: 55 },
        { x: -330, y: 55 },
      ],
      // MySQL (bottom-left)
      [
        { x: -30, y: 55 },
        { x: -70, y: 110 },
        { x: -140, y: 155 },
        { x: -200, y: 155 },
      ],
      // Pattern LLC (top-right)
      [
        { x: 55, y: -20 },
        { x: 140, y: -20 },
        { x: 190, y: -75 },
        { x: 250, y: -75 },
      ],
      // Semcom (mid-right)
      [
        { x: 55, y: 15 },
        { x: 180, y: 15 },
        { x: 220, y: 55 },
        { x: 330, y: 55 },
      ],
      // Backend (bottom-right)
      [
        { x: 30, y: 55 },
        { x: 70, y: 110 },
        { x: 140, y: 155 },
        { x: 200, y: 155 },
      ],
    ]

    // Vertical bottom bus traces (as seen in the reference video)
    const busLines = [-20, -10, 0, 10, 20].map((offsetX) => [
      { x: offsetX, y: 55 },
      { x: offsetX, y: 165 },
    ])

    // Comet pulses along main routes
    const pulseCount = 14
    const pulses = Array.from({ length: pulseCount }, (_, i) => ({
      routeIdx: i % routes.length,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.004,
      tailLength: 0.12,
    }))

    // Bus pulses
    const busPulses = Array.from({ length: 6 }, (_, i) => ({
      lineIdx: i % busLines.length,
      progress: Math.random(),
      speed: 0.008 + Math.random() * 0.006,
    }))

    // Node shockwave ripples on impact
    const ripples = []

    // Ambient floating embers
    const emberCount = 30
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * 900,
      y: Math.random() * 450,
      vx: 0.2 + Math.random() * 0.35,
      vy: -0.25 - Math.random() * 0.45,
      size: 0.8 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.5,
    }))

    // Helper: evaluate point on a polyline given progress [0..1]
    const getPolylinePoint = (pts, t) => {
      if (t <= 0) return pts[0]
      if (t >= 1) return pts[pts.length - 1]

      // calculate segment lengths
      let totalLen = 0
      const segLens = []
      for (let i = 0; i < pts.length - 1; i++) {
        const dx = pts[i + 1].x - pts[i].x
        const dy = pts[i + 1].y - pts[i].y
        const len = Math.hypot(dx, dy)
        segLens.push(len)
        totalLen += len
      }

      let targetDist = t * totalLen
      let accumulated = 0
      for (let i = 0; i < segLens.length; i++) {
        if (accumulated + segLens[i] >= targetDist) {
          const segT = (targetDist - accumulated) / segLens[i]
          return {
            x: pts[i].x + (pts[i + 1].x - pts[i].x) * segT,
            y: pts[i].y + (pts[i + 1].y - pts[i].y) * segT,
          }
        }
        accumulated += segLens[i]
      }
      return pts[pts.length - 1]
    }

    const render = () => {
      const displayW = width / dpr
      const displayH = height / dpr
      ctx.clearRect(0, 0, displayW, displayH)

      const cx = displayW / 2
      const cy = displayH / 2 + 5

      // 1. Draw Static Etched PCB Circuit Traces
      routes.forEach((route, idx) => {
        const isHovered = activeNode === NODES[idx]?.id

        ctx.beginPath()
        ctx.moveTo(cx + route[0].x, cy + route[0].y)
        for (let i = 1; i < route.length; i++) {
          ctx.lineTo(cx + route[i].x, cy + route[i].y)
        }

        // Trace base line
        ctx.strokeStyle = isHovered ? 'rgba(255, 120, 40, 0.9)' : 'rgba(255, 90, 20, 0.28)'
        ctx.lineWidth = isHovered ? 2.2 : 1.4
        ctx.stroke()

        // Outer neon aura
        ctx.strokeStyle = isHovered ? 'rgba(255, 87, 34, 0.35)' : 'rgba(255, 87, 34, 0.08)'
        ctx.lineWidth = isHovered ? 8 : 4
        ctx.stroke()

        // End terminal pad
        const last = route[route.length - 1]
        ctx.beginPath()
        ctx.arc(cx + last.x, cy + last.y, isHovered ? 3.5 : 2.5, 0, Math.PI * 2)
        ctx.fillStyle = isHovered ? '#ffffff' : '#ff7828'
        ctx.shadowColor = '#ff5722'
        ctx.shadowBlur = isHovered ? 12 : 5
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Vertical bus lines at bottom of chip
      busLines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(cx + line[0].x, cy + line[0].y)
        ctx.lineTo(cx + line[1].x, cy + line[1].y)
        ctx.strokeStyle = 'rgba(255, 90, 20, 0.22)'
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Terminal pad dot
        ctx.beginPath()
        ctx.arc(cx + line[1].x, cy + line[1].y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = '#d4a373'
        ctx.fill()
      })

      // 2. Draw Moving Comet-Tail Energy Pulses (The Gcore Signature Effect)
      pulses.forEach((p) => {
        p.progress += p.speed
        if (p.progress >= 1) {
          p.progress = 0
          // Trigger shockwave ripple on arrival at node
          const last = routes[p.routeIdx][routes[p.routeIdx].length - 1]
          ripples.push({
            x: cx + last.x,
            y: cy + last.y,
            radius: 2,
            maxRadius: 28,
            alpha: 0.85,
          })
        }

        const pts = routes[p.routeIdx]
        const headPt = getPolylinePoint(pts, p.progress)

        // Draw trailing comet segments
        const segments = 6
        for (let s = 0; s < segments; s++) {
          const tailT = Math.max(0, p.progress - (p.tailLength * (s + 1)) / segments)
          const tailPt = getPolylinePoint(pts, tailT)
          const segAlpha = (1 - s / segments) * 0.75

          ctx.beginPath()
          ctx.arc(cx + tailPt.x, cy + tailPt.y, 2.8 - s * 0.35, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 120, 40, ${segAlpha})`
          ctx.shadowColor = '#ff5722'
          ctx.shadowBlur = 8
          ctx.fill()
        }

        // Brilliant white-hot comet core head
        ctx.beginPath()
        ctx.arc(cx + headPt.x, cy + headPt.y, 3.2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#ffaa44'
        ctx.shadowBlur = 14
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw vertical bus pulses
      busPulses.forEach((bp) => {
        bp.progress += bp.speed
        if (bp.progress >= 1) bp.progress = 0

        const line = busLines[bp.lineIdx]
        const py = cy + line[0].y + (line[1].y - line[0].y) * bp.progress
        const px = cx + line[0].x

        ctx.beginPath()
        ctx.arc(px, py, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = '#ff8c42'
        ctx.shadowColor = '#ff5722'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // 3. Draw and update Impact Shockwaves (ripples at destination chips)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += 0.8
        r.alpha -= 0.035

        if (r.alpha <= 0) {
          ripples.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 140, 50, ${r.alpha})`
        ctx.lineWidth = 1.6
        ctx.stroke()
      }

      // 4. Draw Atmospheric Ambient Solar Embers
      embers.forEach((em) => {
        em.y += em.vy
        em.x += em.vx
        if (em.y < 0) {
          em.y = displayH + 10
          em.x = Math.random() * displayW
        }
        if (em.x > displayW) em.x = 0

        ctx.beginPath()
        ctx.arc(em.x, em.y, em.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 140, 50, ${em.alpha})`
        ctx.shadowColor = '#ff5722'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [activeNode])

  return (
    <div className="neural-stage" ref={containerRef} aria-label="Interactive Silicon Neural Engine">
      {/* ── THE SIGNATURE VOLUMETRIC DIAGONAL SOLAR BEAM (as in Gcore reference) ── */}
      <div className="neural-stage__sunbeam" aria-hidden="true" />
      <div className="neural-stage__sunflare" aria-hidden="true" />
      <div className="neural-stage__vignette-glow" aria-hidden="true" />

      {/* ── 3D PERSPECTIVE MOTHERBOARD STAGE ── */}
      <div
        className="neural-stage__plane"
        style={{
          transform: `perspective(1100px) rotateX(${46 + tilt.x}deg) rotateZ(${tilt.y * 0.45}deg) translateY(-10px)`,
        }}
      >
        {/* Background Substrate Grid Texture */}
        <div className="neural-stage__substrate" />

        {/* Dynamic Canvas with Routed Circuit Traces & Comet Energy Pulses */}
        <canvas ref={canvasRef} className="neural-stage__canvas" />

        {/* ── CENTRAL SILICON PROCESSOR CHIP (The "AI" Engine) ── */}
        <div
          className="neural-core-chip"
          aria-label="Kavya Modi Core Web Silicon Processor"
        >
          {/* Metallic Gold IC Pins on all 4 borders */}
          <div className="core-chip__pins-t" />
          <div className="core-chip__pins-b" />
          <div className="core-chip__pins-l" />
          <div className="core-chip__pins-r" />

          {/* Silicon Die Internal Texture */}
          <div className="core-chip__body">
            <div className="core-chip__pulse-halo" />
            <span className="core-chip__monogram">KM</span>
            <span className="core-chip__label">CORE AI / WEB</span>
            <span className="core-chip__specs">4.2 GHz · 100% ONLINE</span>
          </div>
          <div className="core-chip__backglow" />
        </div>

        {/* ── 6 SATELLITE NODE CHIPS (Frosted Pods from Reference Video) ── */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id
          return (
            <div
              key={node.id}
              className={`neural-pod ${isActive ? 'neural-pod--active' : ''}`}
              style={{
                transform: `translate3d(${node.x}px, ${node.y}px, 25px)`,
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.sub}`}
            >
              <div className="neural-pod__icon-box">
                <span className="neural-pod__icon">{node.icon}</span>
              </div>
              <div className="neural-pod__content">
                <span className="neural-pod__title">{node.label}</span>
                <span className="neural-pod__sub">{node.sub}</span>
              </div>

              {/* Floating Live Telemetry Tooltip on Hover */}
              {isActive && (
                <div className="neural-pod__telemetry">
                  <span className="neural-pod__tel-dot" />
                  <span>{node.telemetry}</span>
                </div>
              )}
              <div className="neural-pod__glow" />
            </div>
          )
        })}
      </div>

      {/* ── BOTTOM HARDWARE TELEMETRY STRIP ── */}
      <div className="neural-stage__telemetry-strip">
        <div className="telemetry-item">
          <span className="telemetry-dot telemetry-dot--active" />
          <span className="telemetry-label">Cluster Status:</span>
          <span className="telemetry-val">Operational</span>
        </div>
        <div className="telemetry-sep">·</div>
        <div className="telemetry-item">
          <span className="telemetry-label">Architecture:</span>
          <span className="telemetry-val">React 19 + Python &amp; PHP</span>
        </div>
        <div className="telemetry-sep">·</div>
        <div className="telemetry-item">
          <span className="telemetry-label">Live Concurrency:</span>
          <span className="telemetry-val">Sub-100ms Latency</span>
        </div>
      </div>
    </div>
  )
}
