import { useRef, useCallback } from 'react'

/**
 * MagneticButton — A wrapper that creates a magnetic pull effect
 * where the button subtly follows the cursor within its proximity.
 */
export default function MagneticButton({ children, className = '', strength = 0.3, as: Tag = 'button', style = {}, ...rest }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }, [strength])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)'
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
