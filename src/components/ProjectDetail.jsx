import { useEffect } from "react"
import ProjectArt from "./ProjectArt"

// Full-screen case-file overlay, Active Theory project-page style.
export default function ProjectDetail({ project, index, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  if (!project) return null

  return (
    <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="detail-backdrop" onClick={onClose} />
      <div className="detail-panel">
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
