import { useRef, useState } from 'react'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  ...props
}) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    })

    if (glare) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      setGlareStyle({
        opacity: 0.15,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
        transition: 'opacity 0.15s ease-out',
      })
    }
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    })
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease-out',
    })
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
      {glare && (
        <div
          className="tilt-glare"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 10,
            ...glareStyle,
          }}
        />
      )}
    </div>
  )
}
