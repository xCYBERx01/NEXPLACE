import { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"

export default function InteractionPrompt({ station, onFocus }) {
  const rootRef = useRef(null)
  useEffect(() => {
    if (!rootRef.current) return
    const children = rootRef.current.querySelectorAll("[data-reveal]")
    // anime.js entrance: fade/slide the "STATION ARRIVED" prompt rows in.
    const anim = animate(children, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 340,
      delay: stagger(70),
      easing: "outCubic",
    })
    return () => anim.revert()
  }, [station?.id])
  return (
    <div ref={rootRef} style={{
      position: 'fixed', bottom: '10vh', left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, textAlign: 'center', pointerEvents: 'auto',
      fontFamily: '"JetBrains Mono", monospace'
    }}>
      <div style={{
        background: 'rgba(11,11,11,0.9)', color: '#e8e8e8',
        padding: '12px 24px', borderRadius: '2px', border: '1px solid var(--accent)',
        backdropFilter: 'blur(10px)'
      }}>
        <div data-reveal style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 4, letterSpacing: '0.1em' }}>STATION ARRIVED</div>
        <div data-reveal style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{station.name}</div>
        <button
          data-reveal
          onClick={onFocus}
          style={{
            background: 'var(--accent)', color: '#0b0b0b', border: 0,
            padding: '6px 16px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', textTransform: 'uppercase'
          }}
        >
          Focus Station
        </button>
      </div>
    </div>
  )
}
