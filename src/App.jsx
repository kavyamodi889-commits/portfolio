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
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = document.getElementById('ambient-cursor-glow')
    if (!cursor) return

    let mouseX = -300
    let mouseY = -300
    let currentX = -300
    let currentY = -300
    let animId

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const loop = () => {
      currentX += (mouseX - currentX) * 0.12
      currentY += (mouseY - currentY) * 0.12
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      id="ambient-cursor-glow"
      className="ambient-cursor-glow"
      aria-hidden="true"
    />
  )
}

function ScrollRevealListener() {
  const { pathname } = useLocation()

  useEffect(() => {
    const selectors = [
      '.section-header',
      '.skill-category',
      '.timeline__card',
      '.edu-card',
      '.cert-card',
      '.arch__canvas',
      '.terminal-window',
      '.recruiter__card',
      '.recruiter__preview-container',
      '.contact__card',
      '.contact__form-card',
      '.hero__card',
      '.saas-metric-card',
      '.saas-panel',
      '.saas-trust-rail',
      '.saas-showcase__header',
      '.reveal-target',
    ]

    const checkVisible = () => {
      const windowH = window.innerHeight || 800
      const elements = document.querySelectorAll(selectors.join(', '))
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= windowH + 180) {
          el.classList.add('is-revealed')
        }
      })
    }

    const initElements = () => {
      const elements = document.querySelectorAll(selectors.join(', '))
      elements.forEach((el) => {
        if (!el.classList.contains('reveal-on-scroll')) {
          el.classList.add('reveal-on-scroll')
        }
      })
      checkVisible()
    }

    initElements()
    const t1 = setTimeout(checkVisible, 80)
    const t2 = setTimeout(checkVisible, 300)
    const t3 = setTimeout(checkVisible, 800)

    window.addEventListener('scroll', checkVisible, { passive: true })
    window.addEventListener('resize', checkVisible, { passive: true })

    const mutationObserver = new MutationObserver(() => {
      initElements()
    })
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
