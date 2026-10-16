import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ResumeStudio from './pages/ResumeStudio'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumeStudio />} />
        <Route path="/resume-studio" element={<ResumeStudio />} />
      </Routes>
    </BrowserRouter>
  )
}
