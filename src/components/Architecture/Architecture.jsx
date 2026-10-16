import { useState } from 'react'
import { architectures } from '../../data/portfolioData'
import './Architecture.css'

export default function Architecture() {
  const [selectedArchId, setSelectedArchId] = useState(architectures[0].id)
  const currentArch = architectures.find((a) => a.id === selectedArchId) ?? architectures[0]
  const [selectedNodeId, setSelectedNodeId] = useState(currentArch.nodes[0]?.id)

  const activeNode = currentArch.nodes.find((n) => n.id === selectedNodeId) ?? currentArch.nodes[0]

  const handleArchChange = (id) => {
    setSelectedArchId(id)
    const newArch = architectures.find((a) => a.id === id)
    if (newArch && newArch.nodes.length > 0) {
      setSelectedNodeId(newArch.nodes[0].id)
    }
  }

  return (
    <section className="section architecture-section" id="architecture" aria-labelledby="arch-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-label">Engineering Deep-Dive</span>
          <h2 className="section-title" id="arch-heading">System Architecture Explorer</h2>
          <p className="section-subtitle">
            Inspect the underlying structural design, separation of concerns, and data flows of my verified software systems.
          </p>
        </header>

        {/* Project Selector Tabs */}
        <div className="arch__tabs" role="tablist" aria-label="Select system architecture">
          {architectures.map((arch) => (
            <button
              key={arch.id}
              role="tab"
              aria-selected={selectedArchId === arch.id}
              aria-controls={`arch-panel-${arch.id}`}
              id={`arch-tab-${arch.id}`}
              className={`arch__tab-btn ${selectedArchId === arch.id ? 'active' : ''}`}
              onClick={() => handleArchChange(arch.id)}
              type="button"
            >
              <span className="arch__tab-title">{arch.title}</span>
              <span className="arch__tab-tech">{arch.tech.slice(0, 3).join(', ')}</span>
            </button>
          ))}
        </div>

        {/* Active Architecture Container */}
        <div className="arch__canvas" id={`arch-panel-${currentArch.id}`} role="tabpanel" aria-labelledby={`arch-tab-${currentArch.id}`}>
          {/* Header */}
          <div className="arch__canvas-header">
            <div>
              <div className="arch__canvas-subtitle">{currentArch.subtitle}</div>
              <h3 className="arch__canvas-title">{currentArch.title}</h3>
            </div>
            <div className="arch__tech-badges">
              {currentArch.tech.map((t) => (
                <span key={t} className="badge badge--violet">{t}</span>
              ))}
            </div>
          </div>

          <p className="arch__canvas-desc">{currentArch.description}</p>

          {/* Interactive Flow Grid */}
          <div className="arch__flow-grid">
            {/* Visual Node Chain */}
            <div className="arch__nodes-chain" role="group" aria-label="System nodes flow">
              <div className="arch__chain-hint">Click a node to inspect its architectural specifications:</div>

              <div className="arch__nodes-list">
                {currentArch.nodes.map((node, index) => {
                  const isSelected = selectedNodeId === node.id
                  const hasNext = index < currentArch.nodes.length - 1
                  const conn = currentArch.connections?.[index]

                  return (
                    <div key={node.id} className="arch__node-wrapper">
                      <button
                        type="button"
                        className={`arch__node-card ${isSelected ? 'arch__node-card--active' : ''}`}
                        onClick={() => setSelectedNodeId(node.id)}
                        aria-pressed={isSelected}
                      >
                        <div className="arch__node-cat">{node.category}</div>
                        <div className="arch__node-name">{node.name}</div>
                        <div className="arch__node-metric-preview">{node.metrics}</div>
                      </button>

                      {hasNext && (
                        <div className="arch__connector" aria-hidden="true">
                          <div className="arch__connector-line" />
                          <div className="arch__connector-arrow">&rarr;</div>
                          {conn?.label && (
                            <span className="arch__connector-label">{conn.label}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Inspector Panel for Selected Node */}
            {activeNode && (
              <div className="arch__inspector" aria-live="polite">
                <div className="arch__inspector-header">
                  <span className="arch__inspector-badge">{activeNode.category}</span>
                  <h4 className="arch__inspector-title">{activeNode.name}</h4>
                </div>

                <div className="arch__inspector-body">
                  <div className="arch__inspector-section">
                    <span className="arch__inspector-label">Architectural Role</span>
                    <p className="arch__inspector-text">{activeNode.description}</p>
                  </div>

                  <div className="arch__inspector-section">
                    <span className="arch__inspector-label">Key Engineering Guarantees</span>
                    <div className="arch__inspector-metric">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{activeNode.metrics}</span>
                    </div>
                  </div>

                  <div className="arch__inspector-section">
                    <span className="arch__inspector-label">System Context</span>
                    <p className="arch__inspector-sub">
                      Part of <strong>{currentArch.title}</strong> pipeline. Communicates via strictly defined protocols to prevent data corruption and maintain state integrity.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
