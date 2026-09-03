import { useEffect, useMemo, useRef, useState } from "react"
import ProjectArt from "./ProjectArt"

const FILTERS = ["All", "Robotics", "Embedded", "Software", "AI", "Automation"]

function useReveal(dep) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rows = el.querySelectorAll(".work-row")
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [dep])
  return ref
}

export default function WorkIndex({ projects, onOpen }) {
  const [filter, setFilter] = useState("All")
  const [preview, setPreview] = useState(null)
  const prevRef = useRef(null)
  const listRef = useReveal(filter)

  const items = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.group === filter)),
    [projects, filter]
  )

  // Floating preview follows the cursor over the list (desktop only).
  useEffect(() => {
    const el = prevRef.current
    if (!el) return
    let raf = 0
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x + 24}px, ${y - 110}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="work" className="work-section">
      <div className="section-head">
        <span className="mono-label">01 · SELECTED WORK</span>
        <h2 className="section-title">
          Work<span className="accent">({String(projects.length).padStart(2, "0")})</span>
        </h2>
        <p className="section-sub">
          Shipped systems across robotics, embedded, software, AI and automation.
          Hover to preview — click to open the case file.
        </p>
      </div>

      <div className="filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`chip${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div ref={listRef} className="work-list">
        {items.map((p, i) => (
          <article
            key={p.id}
            className="work-row"
            data-hover
            onMouseEnter={() => setPreview({ project: p, index: i })}
            onMouseLeave={() => setPreview(null)}
            onClick={() => onOpen(p)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onOpen(p)
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open ${p.name}`}
          >
            <span className="work-index">{String(i + 1).padStart(2, "0")}</span>
            <div className="work-main">
              <h3 className="work-name">{p.name}</h3>
              <p className="work-summary">{p.summary}</p>
            </div>
            <span className="work-group">{p.group}</span>
            <span className="work-arrow" aria-hidden>↗</span>
          </article>
        ))}
      </div>

      <div
        ref={prevRef}
        className={`work-preview${preview ? " is-visible" : ""}`}
        aria-hidden
      >
        {preview && (
          <div className="work-preview-card">
            <ProjectArt project={preview.project} index={preview.index} compact />
          </div>
        )}
      </div>
    </section>
  )
}
