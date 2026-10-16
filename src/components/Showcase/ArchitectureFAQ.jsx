import { useState } from 'react'
import './ArchitectureFAQ.css'

const FAQS = [
  {
    q: 'What is Kavya Modi’s primary technical stack and engineering focus?',
    a: 'Kavya specializes in high-concurrency Full-Stack engineering, architecting React 19 interactive frontend experiences paired with robust Python (FastAPI/Django) and PHP backend services, orchestrated over ACID-compliant relational databases (MySQL) and modern cloud deployments.'
  },
  {
    q: 'What is Kavya’s active role at Pattern LLC (2026 – Present)?',
    a: 'As an Operating Executive at Pattern LLC, Kavya manages digital platform execution, cross-system workflow coordination, and operational reliability across distributed business environments.'
  },
  {
    q: 'What are the standout features of the Bank Locker Management System?',
    a: 'The Bank Locker Management System was engineered with strict multi-tier security, encrypted customer authentication, role-based access control (RBAC), and automated locker assignment algorithms preventing double-allocation and ensuring absolute audit compliance.'
  },
  {
    q: 'What academic credentials and distinctions did Kavya achieve?',
    a: 'Kavya completed his Bachelor of Computer Applications (BCA) at Semcom, Sardar Patel / CVM University, graduating with an exceptional 9.55 CGPA and securing Department Rank 1 distinction.'
  },
  {
    q: 'How can recruiters or engineering leads download the verified CV?',
    a: 'The official 2-page A4 Curriculum Vitae is pre-compiled and downloadable directly via the "Download CV [PDF]" button on the homepage, or via the interactive Resume Studio at /resume.'
  }
]

export default function ArchitectureFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx)
  }

  return (
    <section className="arch-faq" id="faq" aria-label="Frequently Asked Questions">
      <div className="container arch-faq__container">
        <div className="arch-faq__header">
          <div className="arch-faq__badge border-glow-pulse">
            <span className="arch-faq__badge-dot" />
            <span>Engineering Insights</span>
          </div>
          <h2 className="arch-faq__title">Frequently Asked Questions</h2>
          <p className="arch-faq__subtitle">
            Key details on technical architecture, production experience, and verified credentials.
          </p>
        </div>

        <div className="arch-faq__list">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={`arch-faq__item ${isOpen ? 'arch-faq__item--open' : ''}`}
                onClick={() => toggle(idx)}
              >
                <div className="arch-faq__question">
                  <span className="arch-faq__icon">{isOpen ? '▾' : '▸'}</span>
                  <span className="arch-faq__q-text">{item.q}</span>
                </div>
                {isOpen && (
                  <div className="arch-faq__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
