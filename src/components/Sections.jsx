import { aboutStats, contact, projects } from "../os/data"

export function Nav({ onEnter }) {
  return (
    <header className="nav-pill nav-shell">
      <a href="#top" className="nav-logo" data-hover>
        NEXPLACE<span className="accent">.</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#work" data-hover>Work</a>
        <a href="#about" data-hover>About</a>
        <a href="#contact" data-hover>Contact</a>
      </nav>
      <button className="nav-access" onClick={onEnter} data-hover>
        <span className="nav-access-dot" aria-hidden /> Enter lab
      </button>
    </header>
  )
}

export function Hero({ onEnter, onOpen }) {
  return (
    <section id="top" className="hero hero-blank" aria-label="Intro">
      <div className="hero-blank-grid" aria-hidden="true" />
      <div className="hero-blank-rail" aria-hidden="true" />

      <div className="hero-inner hero-grid">
        <div className="hero-copy">
          <p className="mono-label hero-kicker">AHMED IRFAN AKRAMI / 2026</p>
          <h1 className="hero-title" aria-label="NEXPLACE">
            <span aria-hidden="true">NEX/</span>
            <br aria-hidden="true" />
            <span aria-hidden="true">PLACE</span>
          </h1>
          <p className="hero-sub">
            A living archive of machines, interfaces, and systems built across the
            edge between physical labor and digital intelligence.
          </p>
          <div className="hero-meta">
            <span>BUILDING AT THE EDGE</span>
            <button className="hero-lab-link" onClick={onEnter} data-hover>Enter the lab ↗</button>
          </div>
        </div>

        <div className="hero-rail" aria-label="Selected work">
          <div className="hero-rail-label">Selected work / 13</div>
          {projects.slice(0, 6).map((project, index) => (
            <button
              key={project.id}
              type="button"
              className="hero-project-link"
              data-hover
              onClick={() => onOpen?.(project)}
              aria-label={`Open ${project.name} case file`}
            >
              <span className="hero-rail-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{project.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-scroll-mark" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
      <div className="hero-fade" aria-hidden />
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-head">
        <span className="mono-label">02 · ABOUT</span>
        <h2 className="section-title">
          Engineer across <span className="accent">hardware</span> & software
        </h2>
      </div>
      <div className="about-grid">
        <p className="about-bio">
          Robotics and AI engineering student building across the boundary between
          hardware and software — embedded systems, competition robotics, full-stack
          web applications and applied AI. Mechanical Lead on Team VoltEdge at the
          National Robotics League 2025, IIT Bombay.
        </p>
        <dl className="about-stats">
          <div><dt>{aboutStats.projects}</dt><dd>Projects shipped</dd></div>
          <div><dt>{aboutStats.hardware}</dt><dd>Hardware builds</dd></div>
          <div><dt>{aboutStats.software}</dt><dd>Software systems</dd></div>
          <div><dt>{aboutStats.ai}</dt><dd>AI integrations</dd></div>
        </dl>
      </div>
      <p className="about-stack mono-label">
        C++ · PYTHON · JAVASCRIPT · TYPESCRIPT · ESP32 · REACT · NEXT.JS · FLUTTER · SUPABASE · FIREBASE · GEMINI API
      </p>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <span className="mono-label">03 · CONTACT</span>
      <h2 className="contact-title">
        Have a robot to build?
        <br />
        Let&apos;s talk.
      </h2>
      <div className="contact-ctas">
        <a className="btn btn-primary btn-lg" href={`mailto:${contact.email}`} data-hover>
          {contact.email}
        </a>
        <div className="contact-row">
          <a className="btn btn-ghost" href={contact.github} target="_blank" rel="noreferrer" data-hover>GitHub ↗</a>
          <a className="btn btn-ghost" href={contact.linkedin} target="_blank" rel="noreferrer" data-hover>LinkedIn ↗</a>
          <a className="btn btn-ghost" href={contact.website} target="_blank" rel="noreferrer" data-hover>WebCV ↗</a>
        </div>
      </div>
      <footer className="site-footer">
        <span>NEXPLACE © {new Date().getFullYear()} Ahmed Irfan Akrami</span>
        <span>Karnataka, India · NRL 007 VoltEdge</span>
      </footer>
    </section>
  )
}
