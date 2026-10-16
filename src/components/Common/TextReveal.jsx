import { useRef, useState, useEffect } from 'react'

/**
 * TextReveal — Reveals text character by character when scrolled into view.
 * Creates a premium typographic animation effect.
 */
export default function TextReveal({ text, as: Tag = 'span', className = '', staggerMs = 25, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(-60deg)',
            transition: `opacity 0.5s ease ${i * staggerMs}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms`,
            willChange: 'opacity, transform',
            transformOrigin: 'bottom',
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}
