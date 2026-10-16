import Hero from '../components/Hero/Hero'
import Projects from '../components/Projects/Projects'
import Skills from '../components/Skills/Skills'
import Terminal from '../components/Terminal/Terminal'
import Architecture from '../components/Architecture/Architecture'
import Education from '../components/Education/Education'
import RecruiterView from '../components/Recruiter/RecruiterView'
import Contact from '../components/Contact/Contact'

export default function Home() {
  return (
    <main id="main-content">
      {/* 1. Introduction */}
      <Hero />

      {/* 2. Featured Projects */}
      <Projects />

      {/* 3. Technical Skills */}
      <Skills />

      {/* 4. Interactive Developer Terminal */}
      <Terminal />

      {/* 5. Project Architecture Explorer */}
      <Architecture />

      {/* 6. Education and Experience */}
      <Education />

      {/* 7. Recruiter View & Resume Studio Showcase */}
      <RecruiterView />

      {/* 8. Contact & Footer */}
      <Contact />
    </main>
  )
}
