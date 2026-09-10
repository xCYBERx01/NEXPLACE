import { useEffect, useRef } from "react"
import Lenis from "lenis"

export default function useSmoothScroll(active, scrollRef) {
  const lenisRef = useRef(null)
  useEffect(() => {
    if (!active) return
    const lenis = new Lenis({ smoothWheel: true, respectReducedMotion: true })
    lenisRef.current = lenis
    // Lenis exposes normalized scroll progress (0..1) over the whole document —
    // this replaces GSAP ScrollTrigger's scrub progress.
    lenis.on("scroll", (e) => {
      if (!scrollRef) return
      const progress = typeof e?.progress === "number" ? e.progress : 0
      scrollRef.current = Math.max(0, Math.min(1, progress))
    })
    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [active, scrollRef])
  return lenisRef
}
