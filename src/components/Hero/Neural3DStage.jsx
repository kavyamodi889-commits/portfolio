import { useEffect, useRef, useState } from 'react'
import './Neural3DStage.css'

const NODES = [
  { id: 'react', label: 'React.js', icon: '⚛', x: -280, y: -60, tag: 'Frontend Tier' },
  { id: 'python', label: 'Python', icon: '🐍', x: -360, y: 70, tag: 'AI & Services' },
  { id: 'pattern', label: 'Pattern LLC', icon: '⚡', x: -220, y: 150, tag: 'Operations 2026' },
  { id: 'cgpa', label: '9.55 CGPA', icon: '★', x: 220, y: 150, tag: 'Semcom CVM' },
  { id: 'mysql', label: 'MySQL / DB', icon: '🗄', x: 360, y: 70, tag: 'Persistence' },
  { id: 'fullstack', label: 'Node & PHP', icon: '◈', x: 280, y: -60, tag: 'Backend APIs' },
]

export default function Neural3DStage() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeNode, setActiveNode] = useState(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // Mouse interaction for 3D tilt
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
      targetX = relY * -14 // Max tilt X in deg
      targetY = relX * 18  // Max tilt Y in deg
    }

    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
    }

    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setTilt({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(updateTilt)
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(updateTilt)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Canvas for flowing circuit energy pulses & embers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let width = 0
    let height = 0

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      width = canvas.width = rect.width * window.devicePixelRatio
      height = canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Pulses traveling along lines
    const pulseCount = 18
    const pulses = Array.from({ length: pulseCount }, (_, i) => ({
      nodeIdx: i % NODES.length,
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
      size: 2.5 + Math.random() * 2,
    }))

    // Floating embers drifting through the volumetric beam
    const emberCount = 35
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 450,
      vy: -0.3 - Math.random() * 0.5,
      vx: 0.2 + Math.random() * 0.4,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6,
    }))

    const render = () => {
      const displayW = width / window.devicePixelRatio
      const displayH = height / window.devicePixelRatio
      ctx.clearRect(0, 0, displayW, displayH)

      const centerX = displayW / 2
      const centerY = displayH / 2 + 10

      // 1. Draw glowing circuit traces connecting central core to nodes
      NODES.forEach((node) => {
        const destX = centerX + node.x
        const destY = centerY + node.y

        // Angled circuit trace line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        const midX = centerX + node.x * 0.5
        const midY = centerY
        ctx.lineTo(midX, midY)
        ctx.lineTo(destX, destY)

        // Circuit line gradient
        const lineGrad = ctx.createLinearGradient(centerX, centerY, destX, destY)
        lineGrad.addColorStop(0, 'rgba(255, 87, 34, 0.7)')
        lineGrad.addColorStop(0.5, 'rgba(255, 120, 40, 0.4)')
        lineGrad.addColorStop(1, 'rgba(255, 87, 34, 0.8)')

        ctx.strokeStyle = lineGrad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Soft outer neon glow
        ctx.strokeStyle = 'rgba(255, 87, 34, 0.12)'
        ctx.lineWidth = 6
        ctx.stroke()
      })

      // 2. Draw energy pulses along the circuits
      pulses.forEach((p) => {
        p.progress += p.speed
        if (p.progress > 1) p.progress = 0

        const node = NODES[p.nodeIdx]
        const destX = centerX + node.x
        const destY = centerY + node.y

        let px, py
        if (p.progress < 0.5) {
          const t = p.progress / 0.5
          px = centerX + (centerX + node.x * 0.5 - centerX) * t
          py = centerY
        } else {
          const t = (p.progress - 0.5) / 0.5
          const midX = centerX + node.x * 0.5
          px = midX + (destX - midX) * t
          py = centerY + (destY - centerY) * t
        }

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#ff5722'
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // 3. Draw drifting ambient solar embers
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
        ctx.fillStyle = `rgba(255, 120, 40, ${em.alpha})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="neural-stage" ref={containerRef} aria-label="3D Silicon & Neural Architecture Showcase">
      {/* Dramatic Volumetric Solar Light Beam (from upper right like in reference) */}
      <div className="neural-stage__light-beam" aria-hidden="true" />
      <div className="neural-stage__flare" aria-hidden="true" />

      {/* 3D Perspective Plane */}
      <div
        className="neural-stage__plane"
        style={{
          transform: `perspective(1000px) rotateX(${50 + tilt.x}deg) rotateZ(${tilt.y * 0.6}deg) translateY(-20px)`,
        }}
      >
        {/* Canvas for circuit traces & pulses */}
        <canvas ref={canvasRef} className="neural-stage__canvas" />

        {/* Central Silicon Processor Chip */}
        <div className="neural-chip neural-chip--core" aria-label="Core Silicon Engine">
          <div className="neural-chip__pins-top" />
          <div className="neural-chip__pins-bottom" />
          <div className="neural-chip__pins-left" />
          <div className="neural-chip__pins-right" />
          <div className="neural-chip__inner">
            <span className="neural-chip__logo">KM</span>
            <span className="neural-chip__title">CORE AI / WEB</span>
            <span className="neural-chip__clock">3.8 GHz · 100% ONLINE</span>
          </div>
          <div className="neural-chip__glow" />
        </div>

        {/* Floating 3D Node Chips */}
        {NODES.map((node) => (
          <div
            key={node.id}
            className={`neural-node ${activeNode === node.id ? 'neural-node--active' : ''}`}
            style={{
              transform: `translate3d(${node.x}px, ${node.y}px, 20px)`,
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="neural-node__icon">{node.icon}</div>
            <div className="neural-node__text">
              <span className="neural-node__label">{node.label}</span>
              <span className="neural-node__tag">{node.tag}</span>
            </div>
            <div className="neural-node__glow" />
          </div>
        ))}
      </div>
    </div>
  )
}
