import { useEffect, useState } from "react"

// Active Theory-style preloader: 0-100 counter + bar, fades out.
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const DUR = 1400
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR)
      // ease-out so it feels fast then settles on 100
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setLeaving(true)
        setTimeout(onDone, 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className={`preloader${leaving ? " is-leaving" : ""}`} aria-hidden={leaving}>
      <div className="preloader-inner">
        <div className="preloader-word">NEXPLACE</div>
        <div className="preloader-sub">ROBOTICS & AI · CREATOR HQ</div>
        <div className="preloader-count">{n}</div>
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ width: `${n}%` }} />
        </div>
      </div>
    </div>
  )
}
