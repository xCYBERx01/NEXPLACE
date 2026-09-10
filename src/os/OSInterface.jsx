import React, { useState } from 'react'

export default function OSInterface({ projects }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{
      width: '1024px', height: '512px', background: '#0b0b0b',
      color: '#e8e8e8', fontFamily: '"JetBrains Mono", monospace',
      display: 'grid', gridTemplateColumns: '250px 1fr', overflow: 'hidden',
      border: '10px solid #1a1a1a'
    }}>
      {/* Sidebar */}
      <div style={{ background: '#111', borderRight: '1px solid #222', padding: '20px' }}>
        <div style={{ fontSize: 12, color: '#2f9e92', marginBottom: 20, fontWeight: 700 }}>NEX_OS v1.0</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              style={{
                padding: '8px', fontSize: 13, cursor: 'pointer',
                background: selected?.id === p.id ? '#222' : 'transparent',
                color: selected?.id === p.id ? '#2f9e92' : '#888',
                borderLeft: selected?.id === p.id ? '2px solid #2f9e92' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
                {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {selected ? (
          <div>
            <h1 style={{ fontSize: 24, margin: 0, color: '#fff' }}>{selected.name}</h1>
            <p style={{ color: '#888', lineHeight: 1.6, fontSize: 14 }}>{selected.description}</p>
            <div style={{ marginTop: 20, padding: '20px', background: '#151515', border: '1px solid #222', borderRadius: '2px' }}>
              <div style={{ fontSize: 12, color: '#2f9e92', marginBottom: 10 }}>PROJECT_LOG</div>
              <div style={{ fontSize: 13, color: '#aaa', whiteSpace: 'pre-wrap' }}>
                {`Deploying ${selected.name} to edge nodes...
Status: ONLINE
Uptime: 124h 12m
Latency: 12ms
`}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: '#444', fontSize: 14 }}>
            SELECT A PROJECT FROM THE SIDEBAR
          </div>
        )}
      </div>
    </div>
  )
}
