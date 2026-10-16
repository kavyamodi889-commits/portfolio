import { useEffect, useRef } from 'react'

/**
 * High-performance 3D interactive particle sphere and constellation canvas.
 * - Hardware accelerated rendering via 2D canvas context with 3D math
 * - Interactive mouse/touch tracking with 3D rotation matrix
 * - Auto-rotation with damping on idle
 * - Connective energy threads between nearest 3D nodes
 * - Fully responsive and lightweight for mobile devices
 */
export default function Canvas3D({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let width = 0
    let height = 0

    // 3D Particles setup
    const PARTICLE_COUNT = window.innerWidth < 768 ? 70 : 130
    const RADIUS = window.innerWidth < 768 ? 160 : 240
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution for uniform 3D sphere distribution
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi

      const x = RADIUS * Math.cos(theta) * Math.sin(phi)
      const y = RADIUS * Math.sin(theta) * Math.sin(phi)
      const z = RADIUS * Math.cos(phi)

      particles.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        baseSize: Math.random() * 2 + 1.2,
        color: i % 3 === 0 ? '#06b6d4' : i % 2 === 0 ? '#8b5cf6' : '#ec4899',
      })
    }

    let rotX = 0
    let rotY = 0
    let targetRotX = 0.002
    let targetRotY = 0.003
    let mouseX = 0
    let mouseY = 0
    let isInteracting = false

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2)
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2)
      targetRotY = mouseX * 0.02
      targetRotX = -mouseY * 0.02
      isInteracting = true
    }

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.touches[0].clientX - rect.left - width / 2) / (width / 2)
      mouseY = (e.touches[0].clientY - rect.top - height / 2) / (height / 2)
      targetRotY = mouseX * 0.03
      targetRotX = -mouseY * 0.03
      isInteracting = true
    }

    const handleMouseLeave = () => {
      isInteracting = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    handleResize()

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Damped rotation
      if (!isInteracting) {
        targetRotX = 0.0015
        targetRotY = 0.0025
      }

      rotX += (targetRotX - rotX) * 0.05
      rotY += (targetRotY - rotY) * 0.05

      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)

      const fov = 380
      const centerX = width / 2
      const centerY = height / 2
      const maxDistance = window.innerWidth < 768 ? 55 : 75

      // Transform and project each particle
      const projected = []

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Rotation around Y
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.z * cosY + p.x * sinY

        // Rotation around X
        const y2 = p.y * cosX - z1 * sinX
        const z2 = z1 * cosX + p.y * sinX

        p.x = x1
        p.y = y2
        p.z = z2

        // Perspective projection
        const depth = fov / (fov + z2)
        const projX = centerX + x1 * depth
        const projY = centerY + y2 * depth
        const size = Math.max(0.6, p.baseSize * depth)
        const alpha = Math.max(0.15, Math.min(1, (z2 + RADIUS) / (2 * RADIUS) + 0.15))

        projected.push({
          projX,
          projY,
          size,
          alpha,
          color: p.color,
          z: z2,
        })
      }

      // Draw connection lines between nearby points
      ctx.lineWidth = 0.8
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i]
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j]
          const dx = p1.projX - p2.projX
          const dy = p1.projY - p2.projY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22 * Math.min(p1.alpha, p2.alpha)
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`
            ctx.beginPath()
            ctx.moveTo(p1.projX, p1.projY)
            ctx.lineTo(p2.projX, p2.projY)
            ctx.stroke()
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i]
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha

        ctx.beginPath()
        ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Subtle glow for closer particles
        if (p.z > 40) {
          ctx.beginPath()
          ctx.arc(p.projX, p.projY, p.size * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = p.color === '#06b6d4' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(139, 92, 246, 0.25)'
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`canvas-3d ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
