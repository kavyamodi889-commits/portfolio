/**
 * SectionDivider — Creates smooth wave/gradient transitions between sections.
 * Adds a premium feel to section separators.
 */
export default function SectionDivider({ variant = 'wave', flip = false }) {
  if (variant === 'gradient') {
    return (
      <div
        className="section-divider section-divider--gradient"
        style={{
          height: '120px',
          background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%)',
          position: 'relative',
          zIndex: 1,
          ...(flip ? { transform: 'rotate(180deg)' } : {}),
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="section-divider section-divider--wave"
      style={{
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        lineHeight: 0,
        ...(flip ? { transform: 'rotate(180deg)' } : {}),
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '60px', display: 'block' }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,87,34,0.08)" />
            <stop offset="50%" stopColor="rgba(255,120,40,0.15)" />
            <stop offset="100%" stopColor="rgba(255,87,34,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C360,80 720,0 1080,50 C1260,70 1380,30 1440,40 L1440,100 L0,100 Z"
          fill="url(#waveGrad)"
        />
        <path
          d="M0,55 C280,30 560,75 840,45 C1120,15 1300,60 1440,50 L1440,100 L0,100 Z"
          fill="rgba(255,87,34,0.04)"
        />
      </svg>
    </div>
  )
}
