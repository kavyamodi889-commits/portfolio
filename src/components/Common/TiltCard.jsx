import { useRef, useState, useCallback } from 'react'

/**
 * TiltCard — A wrapper that applies a subtle 3D perspective tilt
 * on hover, tracking mouse position for a premium parallax feel.
 */
export default function TiltCard({ children, className = '', maxTilt = 8, glareEnabled = true, style = {}, ...rest }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * maxTilt
    const rotateY = (x - 0.5) * maxTilt

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)

    if (glareEnabled) {
      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,120,40,0.35) 0%, transparent 60%)`,
      })
    }
  }, [maxTilt, glareEnabled])

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setGlareStyle({ opacity: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      {glareEnabled && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            transition: 'opacity 0.4s ease',
            ...glareStyle,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
