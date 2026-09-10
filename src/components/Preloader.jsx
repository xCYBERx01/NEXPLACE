import { useEffect, useState } from "react"

const STAGES = [
  { text: "INITIALIZING CORE...", duration: 600 },
  { text: "LOADING ENVIRONMENT...", duration: 800 },
  { text: "CALIBRATING SENSORS...", duration: 600 },
  { text: "ENTERING NEXPLACE...", duration: 700 },
]

export default function Preloader({ onDone, reducedMotion = false }) {
  const [stageIdx, setStageIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      onDone()
      return undefined
    }
    let raf = 0
    let doneTimer = 0
    const startStage = (idx) => {
      if (idx >= STAGES.length) {
        setLeaving(true)
        doneTimer = window.setTimeout(onDone, 600)
        return
      }

      const stage = STAGES[idx]
      const t0 = performance.now()

      const tick = (t) => {
        const p = Math.min(1, (t - t0) / stage.duration)
        setProgress(Math.round(p * 100))

        if (p < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setStageIdx(idx + 1)
          startStage(idx + 1)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    startStage(0)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(doneTimer)
    }
  }, [onDone, reducedMotion])

  return (
    <div className={`preloader${leaving ? " is-leaving" : ""}`} aria-hidden={leaving}>
      <div className="preloader-inner">
        <div className="preloader-word">NEXPLACE</div>
        <div className="preloader-sub" style={{ minHeight: '1.2em', transition: 'opacity 0.3s' }}>
          {stageIdx < STAGES.length ? STAGES[stageIdx].text : "SYSTEM READY"}
        </div>
        <div className="preloader-count">{progress}</div>
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
