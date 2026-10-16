import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ResumeStudio from './pages/ResumeStudio'
import ScrollToTop from './components/Common/ScrollToTop'
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

function PageScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <PageScrollReset />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeStudio />} />
        <Route path="/resume-studio" element={<ResumeStudio />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  )
}
