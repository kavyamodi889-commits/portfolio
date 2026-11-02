import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ResumeStudio from './pages/ResumeStudio'
import ScrollToTop from './components/Common/ScrollToTop'
import IntroSequence from './components/Common/IntroSequence'
import './index.css'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight
      if (scrollTotal > 0) {
        setProgress((window.scrollY / scrollTotal) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="scroll-progress-line"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}

function CursorFollower() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    const ambientGlow = document.getElementById('ambient-cursor-glow')
    if (!dot || !ring) return

    let mouseX = -300, mouseY = -300
    let ringX = -300, ringY = -300
    let glowX = -300, glowY = -300
    let animId

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const handleMouseEnter = (e) => {
      const el = e.target.closest('a, button, [role="button"], .card, .skill-badge-pill, .odyssey-filter-pill, .project-card, .cert-card, .core-pillar-card')
      if (el) {
        ring.classList.add('cursor-ring--hover')
        dot.classList.add('cursor-dot--hover')
      }
    }

    const handleMouseLeave = (e) => {
      const el = e.target.closest('a, button, [role="button"], .card, .skill-badge-pill, .odyssey-filter-pill, .project-card, .cert-card, .core-pillar-card')
      if (el) {
        ring.classList.remove('cursor-ring--hover')
        dot.classList.remove('cursor-dot--hover')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseEnter, { passive: true })
    document.addEventListener('mouseout', handleMouseLeave, { passive: true })

    const loop = () => {
      // Ring lags behind cursor
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      // Ambient glow lags more slowly
      glowX += (mouseX - glowX) * 0.07
      glowY += (mouseY - glowY) * 0.07
      if (ambientGlow) {
        ambientGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`
      }

      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" className="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" className="cursor-ring" aria-hidden="true" />
      <div id="ambient-cursor-glow" className="ambient-cursor-glow" aria-hidden="true" />
    </>
  )
}

function ScrollRevealListener() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Elements revealed with default fade-up
    const fadeUpSelectors = [
      '.section-header',
      '.skill-category',
      '.timeline__card',
      '.edu-card',
      '.arch__canvas',
      '.terminal-window',
      '.recruiter__preview-container',
      '.contact__form-card',
      '.saas-panel',
      '.saas-trust-rail',
      '.saas-showcase__header',
      '.reveal-target',
      '.crimson-quote-card',
      '.work-process-card',
      '.edu-process-row',
    ]

    // Elements revealed from left
    const fadeLeftSelectors = [
      '.contact__info',
      '.hero__col-left',
      '.recruiter__card',
    ]

    // Elements revealed from right
    const fadeRightSelectors = [
      '.contact__form-container',
      '.hero__col-right',
    ]

    // Elements revealed with scale
    const scaleSelectors = [
      '.cert-card',
      '.core-pillar-card',
      '.hero__metric-card',
      '.saas-metric-card',
    ]

    const checkVisible = () => {
      const windowH = window.innerHeight || 800
      const threshold = windowH * 0.92

      document.querySelectorAll('.reveal-on-scroll, .reveal-on-scroll--left, .reveal-on-scroll--right, .reveal-on-scroll--scale').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= threshold) {
          el.classList.add('is-revealed')
        }
      })
    }

    const initElements = () => {
      fadeUpSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll')
            el.style.transitionDelay = `${i * 40}ms`
          }
        })
      })
      fadeLeftSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.classList.contains('reveal-on-scroll--left')) {
            el.classList.add('reveal-on-scroll--left')
            el.style.transitionDelay = `${i * 50}ms`
          }
        })
      })
      fadeRightSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.classList.contains('reveal-on-scroll--right')) {
            el.classList.add('reveal-on-scroll--right')
            el.style.transitionDelay = `${i * 50}ms`
          }
        })
      })
      scaleSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.classList.contains('reveal-on-scroll--scale')) {
            el.classList.add('reveal-on-scroll--scale')
            el.style.transitionDelay = `${i * 60}ms`
          }
        })
      })
      checkVisible()
    }

    initElements()
    const t1 = setTimeout(checkVisible, 80)
    const t2 = setTimeout(checkVisible, 300)
    const t3 = setTimeout(checkVisible, 800)

    window.addEventListener('scroll', checkVisible, { passive: true })
    window.addEventListener('resize', checkVisible, { passive: true })

    const mutationObserver = new MutationObserver(() => { initElements() })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('scroll', checkVisible)
      window.removeEventListener('resize', checkVisible)
      mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}

function PageScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <PageScrollReset />
      <ScrollProgress />
      <CursorFollower />
      <ScrollRevealListener />
      <IntroSequence />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeStudio />} />
        <Route path="/resume-studio" element={<ResumeStudio />} />
        {/* Redirect all other unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  )
}
