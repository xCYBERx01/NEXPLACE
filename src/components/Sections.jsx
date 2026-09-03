import { aboutStats, contact } from "../os/data"

export function Nav({ onEnter }) {
  return (
    <header className="nav-pill" role="banner">
      <a href="#top" className="nav-logo" data-hover>
        NEXPLACE<span className="accent">.</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#work" data-hover>Work</a>
        <a href="#about" data-hover>About</a>
        <a href="#contact" data-hover>Contact</a>
      </nav>
      <button className="btn btn-primary btn-sm" onClick={onEnter} data-hover>
        Enter the Lab →
      </button>
    </header>
  )
}

export function Hero({ onEnter }) {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="mono-label hero-kicker">AHMED IRFAN AKRAMI · ROBOTICS & AI ENGINEER</p>
        <h1 className="hero-title">
          NEX
          <br />
          PLACE
        </h1>
        <p className="hero-sub">
          Creator HQ — an interactive 3D portfolio. Thirteen shipped systems in
          robotics, embedded, automation and AI. Scroll the work index, open a
          case file, or step inside the lab and walk it in first person.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={scrollToWork} data-hover>
            View Work ↓
          </button>
          <button className="btn btn-ghost" onClick={onEnter} data-hover>
            Enter the Lab →
          </button>
        </div>
        <div className="hero-meta">
          <span>NRL 007 VOLTEDGE</span>
          <span>CROC OS · ESP32</span>
          <span>13 SHIPPED SYSTEMS</span>
        </div>
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
