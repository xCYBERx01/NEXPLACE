import { useEffect, useRef } from "react"

// Custom dot + trailing ring cursor (fine pointers only).
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let hovering = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target
      hovering = !!(t && t.closest && t.closest("a,button,[data-hover]"))
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      dot.style.transform = `translate(${x}px, ${y}px)`
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${hovering ? 1.8 : 1})`
      ring.style.borderColor = hovering ? "#2f9e92" : "rgba(255,255,255,0.5)"
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
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
