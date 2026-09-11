import { useEffect, useRef } from "react"
import ProjectArt from "./ProjectArt"

// Full-screen case-file overlay, Active Theory project-page style.
// Accessible dialog: initial focus on close, Tab trap inside the panel,
// focus returned to the invoker, background marked inert, and the scrollable
// panel flagged data-lenis-prevent so Lenis can't scroll-chain behind it.
export default function ProjectDetail({ project, index, total, onClose, onPrev, onNext }) {
  const panelRef = useRef(null)
  const prevFocus = useRef(null)

  useEffect(() => {
    prevFocus.current = document.activeElement
    const panel = panelRef.current
    panel?.querySelector(".detail-close")?.focus()

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return }
      if (e.key === "ArrowLeft") { onPrev(); return }
      if (e.key === "ArrowRight") { onNext(); return }
      if (e.key !== "Tab" || !panel) return
      const items = panel.querySelectorAll('a[href], button:not([disabled])')
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    const bg = document.querySelectorAll(".site-content, .app-viewport")
    bg.forEach((el) => el.setAttribute("inert", ""))
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      bg.forEach((el) => el.removeAttribute("inert"))
      if (prevFocus.current && typeof prevFocus.current.focus === "function") {
        prevFocus.current.focus()
      }
    }
  }, [onClose, onPrev, onNext])

  if (!project) return null

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="detail-backdrop" onClick={onClose} />
      <div className="detail-panel" ref={panelRef} data-lenis-prevent>
        <div className="detail-art">
          <ProjectArt project={project} index={index} />
          <button className="detail-close" onClick={onClose} aria-label="Close project">
            ✕
          </button>
        </div>
        <div className="detail-body">
          <div className="detail-meta">
            <span className="mono-label">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.group.toUpperCase()}
            </span>
          </div>
          <h2 className="detail-title">{project.name}</h2>
          <p className="detail-summary">{project.summary}</p>
          <p className="detail-desc">{project.description}</p>
          <div className="detail-stack">
            <span className="mono-label">STACK</span>
            <p>{project.details}</p>
          </div>
          <div className="detail-actions">
            {project.github && project.github !== "#" && (
              <a className="btn btn-primary" href={project.github} target="_blank" rel="noreferrer">
                View Code ↗
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a className="btn btn-ghost" href={project.live} target="_blank" rel="noreferrer">
                Live Demo ↗
              </a>
            )}
            <span className="detail-nav">
              <button className="btn btn-ghost" onClick={onPrev} aria-label="Previous project">← Prev</button>
              <button className="btn btn-ghost" onClick={onNext} aria-label="Next project">Next →</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
