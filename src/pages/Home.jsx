import Hero from '../components/Hero/Hero'
import SystemPotential from '../components/Showcase/SystemPotential'
import Projects from '../components/Projects/Projects'
import Skills from '../components/Skills/Skills'
import Terminal from '../components/Terminal/Terminal'
import Architecture from '../components/Architecture/Architecture'
import Education from '../components/Education/Education'
import RecruiterView from '../components/Recruiter/RecruiterView'
import ArchitectureFAQ from '../components/Showcase/ArchitectureFAQ'
import Contact from '../components/Contact/Contact'

export default function Home() {
  return (
    <main id="main-content">
      {/* 1. Introduction & 3D Silicon Neural Engine */}
      <Hero />

      {/* 2. System Potential & Rotating Word Bento Grid (Reference 12s-18s) */}
      <SystemPotential />

      {/* 3. Featured Projects */}
      <Projects />

      {/* 4. Technical Skills */}
      <Skills />

      {/* 5. Interactive Developer Terminal */}
      <Terminal />

      {/* 6. Project Architecture Explorer */}
      <Architecture />

      {/* 7. Education and Experience */}
      <Education />

      {/* 8. Recruiter View & Resume Studio Showcase */}
      <RecruiterView />

      {/* 9. High-Tech Engineering FAQ Accordion (Reference 35s) */}
      <ArchitectureFAQ />

      {/* 10. Contact & Footer */}
      <Contact />
    </main>
  )
}
