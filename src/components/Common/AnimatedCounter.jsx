import { useState, useEffect, useRef } from 'react'

/**
 * AnimatedCounter — Counts up from 0 to `end` when scrolled into view.
 * Supports suffix (e.g. "+", "%") and decimal places.
 */
export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()
    const numEnd = parseFloat(end)

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * numEnd)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count)

  return (
    <span ref={ref} className="animated-counter">
      {prefix}{display}{suffix}
    </span>
  )
}
