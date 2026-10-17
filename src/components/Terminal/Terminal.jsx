import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile, skills, projects, education, contactLinks } from '../../data/portfolioData'
import './Terminal.css'

const SUGGESTIONS = [
  'help',
  'whoami',
  'skills',
  'projects',
  'architecture',
  'education',
  'resume',
  'contact',
  'clear',
]

const INITIAL_OUTPUT = [
  {
    type: 'system',
    text: 'Kavya OS Interactive Developer Shell [Version 2.4.0]',
  },
  {
    type: 'system',
    text: 'Type a command or click suggestions below. Try "help" or "projects".',
  },
]

function getTimestamp() {
  return new Date().toLocaleString()
}

export default function Terminal() {
  const [history, setHistory] = useState(INITIAL_OUTPUT)
  const [inputVal, setInputVal] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [theme, setTheme] = useState('violet') // violet | matrix | cyan
  const outputEndRef = useRef(null)
  const inputRef = useRef(null)

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (outputEndRef.current && outputEndRef.current.parentElement) {
      outputEndRef.current.parentElement.scrollTop = outputEndRef.current.parentElement.scrollHeight
    }
  }, [history])

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim()
    if (!raw) return

    setCmdHistory((prev) => [raw, ...prev])
    setHistoryIndex(-1)

    const parts = raw.split(' ')
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').toLowerCase()

    let responseNodes = null

    switch (cmd) {
      case 'help':
        responseNodes = (
          <div className="term-help-grid">
            <div className="term-help-row"><span className="term-cmd">whoami</span> — Display bio &amp; developer identity</div>
            <div className="term-help-row"><span className="term-cmd">skills</span> — Inspect technical capabilities</div>
            <div className="term-help-row"><span className="term-cmd">projects</span> — List all verified software systems</div>
            <div className="term-help-row"><span className="term-cmd">project &lt;id&gt;</span> — Inspect specific project details</div>
            <div className="term-help-row"><span className="term-cmd">architecture</span> — Show system architecture insights</div>
            <div className="term-help-row"><span className="term-cmd">education</span> — View academic qualifications</div>
            <div className="term-help-row"><span className="term-cmd">resume</span> — View résumé summary &amp; open studio</div>
            <div className="term-help-row"><span className="term-cmd">contact</span> — Get verified reachout links</div>
            <div className="term-help-row"><span className="term-cmd">theme</span> — Cycle shell theme (violet / matrix / cyan)</div>
            <div className="term-help-row"><span className="term-cmd">clear</span> — Clear the terminal screen</div>
          </div>
        )
        break

      case 'whoami':
        responseNodes = (
          <div className="term-whoami">
            <p className="term-highlight">{profile.name} — {profile.headline}</p>
            <p className="term-muted">&ldquo;{profile.tagline}&rdquo;</p>
            <p>{profile.summary}</p>
            <p className="term-badge-line">
              <span className="term-pill">BCA (9.55 CGPA)</span>
              <span className="term-pill">Web Dev Intern @ Anugrah</span>
              <span className="term-pill">{profile.location}</span>
            </p>
          </div>
        )
        break

      case 'skills':
        responseNodes = (
          <div className="term-skills-list">
            {skills.map((group) => (
              <div key={group.category} className="term-skill-cat">
                <span className="term-accent">[{group.category}]</span>{' '}
                {group.items.join(' • ')}
              </div>
            ))}
          </div>
        )
        break

      case 'projects':
        responseNodes = (
          <div className="term-projects-list">
            <p className="term-muted">Verified software systems:</p>
            {projects.map((p) => (
              <div key={p.id} className="term-project-entry">
                <span className="term-cmd">{p.id}</span> — <strong>{p.title}</strong>
                <div className="term-muted" style={{ paddingLeft: '1rem' }}>
                  {p.shortDescription} ({p.tech.join(', ')})
                </div>
              </div>
            ))}
            <p className="term-tip">Tip: Type &quot;project bank-locker&quot; or &quot;project laundry-management&quot; for full specs.</p>
          </div>
        )
        break

      case 'project':
        if (!arg) {
          responseNodes = <span className="term-error">Usage: project &lt;id&gt; (e.g. project bank-locker, project laundry-management, project aura-platform)</span>
        } else {
          const match = projects.find((p) => p.id.includes(arg) || p.title.toLowerCase().includes(arg))
          if (match) {
            responseNodes = (
              <div className="term-project-detail">
                <div className="term-highlight">{match.title} [{match.status}]</div>
                <div className="term-accent">Category: {match.category}</div>
                <p>{match.description}</p>
                <div><strong>Technologies:</strong> {match.tech.join(', ')}</div>
                {match.highlights && (
                  <ul className="term-list">
                    {match.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          } else {
            responseNodes = <span className="term-error">Project &quot;{arg}&quot; not found. Type &quot;projects&quot; to see available IDs.</span>
          }
        }
        break

      case 'architecture':
        responseNodes = (
          <div className="term-arch">
            <p className="term-highlight">System Architecture Specifications:</p>
            <div className="term-arch-item">
              <strong>1. Bank Locker Management System:</strong> Three-Tier (HTML5/CSS3 Web UI &rarr; PHP Session &amp; Allocation Controller &rarr; MySQL Relational Schema)
            </div>
            <div className="term-arch-item">
              <strong>2. Laundry Management System:</strong> Desktop Subsystem (VB.NET Windows Forms UI &rarr; Order Processing Engine &rarr; Billing &amp; Thermal Printing &rarr; Local DB)
            </div>
            <div className="term-arch-item">
              <strong>3. AURA Video Platform:</strong> Distributed Full-Stack (React SPA &rarr; Node/Express API &amp; Socket.IO Gateway &rarr; Python FastAPI AI &rarr; MongoDB)
            </div>
            <p className="term-tip">Tip: Check the Architecture section below for interactive node inspection.</p>
          </div>
        )
        break

      case 'education':
        responseNodes = (
          <div className="term-edu">
            {education.map((e) => (
              <div key={e.id} className="term-edu-entry">
                <div className="term-highlight">{e.degree} {e.score ? `— ${e.score}` : ''}</div>
                <div className="term-muted">{e.institution} ({e.startYear} – {e.endYear}) • {e.location}</div>
                {e.relevant && <div className="term-accent">Core Focus: {e.relevant.join(', ')}</div>}
              </div>
            ))}
          </div>
        )
        break

      case 'resume':
        responseNodes = (
          <div className="term-resume">
            <p className="term-highlight">Résumé Generator &amp; Profile Summary:</p>
            <p>{profile.name} | {profile.headline}</p>
            <p>Single source of truth: <code>src/data/portfolioData.js</code></p>
            <div className="term-btn-row">
              <Link to="/resume" className="term-action-link">Open Resume Studio &rarr;</Link>
              <a href="#recruiter" className="term-action-link term-action-link--alt">Recruiter View &darr;</a>
            </div>
          </div>
        )
        break

      case 'contact':
        responseNodes = (
          <div className="term-contact">
            <p>Connect with Kavya Modi:</p>
            {contactLinks.map((l) => (
              <div key={l.label}>
                <span className="term-accent">{l.label}:</span>{' '}
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="term-url">{l.url}</a>
              </div>
            ))}
            {profile.location && <div><span className="term-accent">Location:</span> {profile.location}</div>}
          </div>
        )
        break

      case 'theme': {
        const next = theme === 'violet' ? 'matrix' : theme === 'matrix' ? 'cyan' : 'violet'
        setTheme(next)
        responseNodes = <span>Shell theme set to <strong>{next}</strong>.</span>
        break
      }

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'date': {
        const nowStr = getTimestamp()
        responseNodes = <span>{nowStr}</span>
        break
      }

      default:
        responseNodes = (
          <span className="term-error">
            Command not recognized: &quot;{raw}&quot;. Type <button className="term-inline-btn" onClick={() => executeCommand('help')}>help</button> to see valid commands.
          </span>
        )
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: raw },
      { type: 'response', content: responseNodes },
    ])
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, cmdHistory.length - 1)
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[nextIdx])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = SUGGESTIONS.find((s) => s.startsWith(inputVal.toLowerCase()))
      if (match) setInputVal(match)
    }
  }

  return (
    <section className="section terminal-section" id="terminal" aria-labelledby="terminal-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Interactive Experience</span>
          <h2 className="section-title" id="terminal-heading">Developer Shell</h2>
          <p className="section-subtitle">
            An interactive command-line interface to inspect my projects, skills, system architectures, and résumé data in real time.
          </p>
        </header>

        {/* Suggestions chips */}
        <div className="terminal__suggestions" role="toolbar" aria-label="Terminal command suggestions">
          <span className="terminal__suggestions-label">Suggestions:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="terminal__chip"
              onClick={() => executeCommand(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div
          className={`terminal-window terminal-window--${theme}`}
          onClick={() => inputRef.current?.focus()}
          role="region"
          aria-label="Interactive developer console"
        >
          {/* Header bar */}
          <div className="terminal-window__header">
            <div className="terminal-window__dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <div className="terminal-window__title">kavya@os: ~ (zsh)</div>
            <button
              className="terminal-window__clear-btn"
              onClick={(e) => {
                e.stopPropagation()
                setHistory([])
              }}
              title="Clear terminal"
              type="button"
            >
              clear
            </button>
          </div>

          {/* Body */}
          <div className="terminal-window__body">
            {history.map((item, i) => {
              if (item.type === 'system') {
                return (
                  <div key={i} className="term-line term-line--system">
                    {item.text}
                  </div>
                )
              }
              if (item.type === 'command') {
                return (
                  <div key={i} className="term-line term-line--prompt">
                    <span className="term-prompt-label">kavya@os:~$</span>
                    <span className="term-prompt-cmd">{item.text}</span>
                  </div>
                )
              }
              return (
                <div key={i} className="term-line term-line--response">
                  {item.content}
                </div>
              )
            })}
            <div ref={outputEndRef} />

            {/* Input Line */}
            <div className="term-line term-line--input">
              <span className="term-prompt-label" aria-hidden="true">kavya@os:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command (try 'help', 'projects', 'resume')…"
                aria-label="Terminal input prompt"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
