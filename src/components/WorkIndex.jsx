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
  const [selectedId, setSelectedId] = useState(projects[0]?.id)
  const listRef = useReveal(filter)

  const items = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.group === filter)),
    [projects, filter]
  )

  const selected = projects.find((project) => project.id === selectedId) || projects[0]
  const selectedIndex = projects.findIndex((project) => project.id === selected?.id)

  return (
    <section id="work" className="work-section">
      <div className="section-head">
        <span className="mono-label">01 · SELECTED WORK</span>
        <h2 className="section-title">
          Work<span className="accent">({String(projects.length).padStart(2, "0")})</span>
        </h2>
        <p className="section-sub">An evolving field lab for machines, interfaces and ideas.</p>
      </div>

      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={`chip${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="field-stage">
        <div className="field-stage-art">
          <ProjectArt project={selected} index={selectedIndex} />
          <div className="field-stage-grid" aria-hidden="true" />
          <div className="field-stage-status" role="status"><span /> LIVE SPECIMEN / {String(selectedIndex + 1).padStart(2, "0")}</div>
        </div>
        <div className="field-stage-copy">
          <span className="mono-label">CURRENT EXPERIMENT</span>
          <h3>{selected.name}</h3>
          <p>{selected.summary}</p>
          <button className="btn btn-primary btn-sm" onClick={() => onOpen(selected)}>Open case file ↗</button>
        </div>
      </div>

      <div ref={listRef} className="work-list field-catalog">
        <div className="field-catalog-head"><span>Catalog</span><span>{String(items.length).padStart(2, "0")} specimens</span></div>
        {items.map((p, i) => (
          <article
            key={p.id}
            className={`work-row${p.id === selected.id ? " is-selected" : ""}`}
            data-hover
            onMouseEnter={() => setSelectedId(p.id)}
            onClick={() => setSelectedId(p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                // Space would otherwise scroll the page behind the catalog.
                e.preventDefault()
                onOpen(p)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${p.name} — press Enter to open case file`}
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
    </section>
  )
}
