import { useState, useEffect, useRef, useCallback } from "react"
import React from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { Environment, Lightformer, ContactShadows } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { animate } from "animejs"
import { projects } from "./os/data"
import Preloader from "./components/Preloader"
import Cursor from "./components/Cursor"
import WorkIndex from "./components/WorkIndex"
import ProjectDetail from "./components/ProjectDetail"
import InteractionPrompt from "./components/InteractionPrompt"
import { Nav, Hero, About, Contact } from "./components/Sections"
import BuildingShell from "./scene/BuildingShell"
import Grounds from "./scene/Grounds"
import WorkshopVisual from "./scene/WorkshopVisual"
import CinematicCamera, { STATIONS } from "./scene/CinematicCamera"
import useSmoothScroll from "./hooks/useSmoothScroll"

const FpsWorld = React.lazy(() => import("./scene/FpsWorld"))
const Joystick = React.lazy(() => import("./Joystick"))

export default function App() {
  const [loading, setLoading] = useState(true)
  const [fps, setFps] = useState(false)
  const [flash, setFlash] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const [interactionState, setInteractionState] = useState(null)
  const [currentStation, setCurrentStation] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const scrollT = useRef(0)
  const enterTimer = useRef(0)
  const lenis = useSmoothScroll(!fps && !loading, scrollT)
  const handleLoadingDone = useCallback(() => setLoading(false), [])

  useEffect(() => () => window.clearTimeout(enterTimer.current), [])

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (loading || fps) return
    // Derive the current "station" from Lenis's scroll progress (driven above).
    // Runs on a tick so the interaction prompt updates as the user scrolls.
    let rafId = 0
    const tick = () => {
      const p = scrollT.current
      const station = STATIONS.find(s => p >= s.tRange[0] && p <= s.tRange[1])
      setCurrentStation(prev => (prev && station && prev.id === station.id) ? prev : station)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [loading, fps, interactionState])

  useEffect(() => { setIsMobile(window.matchMedia("(max-width: 768px)").matches) }, [])
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && interactionState) {
        handleResume()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [interactionState])
  useEffect(() => {
    if (fps) {
      document.documentElement.style.overflow = "hidden"
      window.scrollTo(0, 0)
    } else {
      document.documentElement.style.overflow = ""
    }
    return () => { document.documentElement.style.overflow = "" }
  }, [fps])

  const enter = () => {
    window.clearTimeout(enterTimer.current)
    if (reducedMotion) {
      setFps(true)
      return
    }
    setFlash(1)
    // White-flash "door" transition, tweened with anime.js (v4 uses onComplete).
    const viewport = document.querySelector(".app-viewport")
    if (!viewport) {
      setFps(true)
      setFlash(0)
      return
    }
    animate(viewport, {
      opacity: [1, 0],
      duration: 320,
      easing: "outCubic",
      onComplete: () => {
        setFps(true)
        setFlash(0)
        viewport.style.opacity = "1"
      }
    })
  }

  const handleFocus = () => {
    setInteractionState(currentStation?.id)
    if (lenis.current) lenis.current.stop()
  }

  const handleResume = () => {
    setInteractionState(null)
    if (lenis.current) lenis.current.start()
  }

  const openProject = (p) => setActiveIdx(projects.findIndex((x) => x.id === p.id))
  const step = (d) => setActiveIdx((i) => (i == null ? 0 : (i + d + projects.length) % projects.length))

  return (
    <div style={{ minHeight: "100dvh", fontFamily: "Manrope, system-ui, sans-serif" }}>
      {loading && <Preloader onDone={handleLoadingDone} reducedMotion={reducedMotion} />}
      <Cursor />

      <main>
        <p style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: "0" }}>
          Ahmed Irfan Akrami · Robotics & AI Engineer Portfolio
        </p>

        <div className={`app-viewport${fps ? " is-fps" : ""}`}>
          {flash > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "#fff", opacity: flash, pointerEvents: "none", transition: "opacity 0.3s ease" }} />}
          <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 4.4, 14.5], fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
            <color attach="background" args={["#080909"]} />
            <ambientLight intensity={0.55} />
            <hemisphereLight args={["#dfe8f0", "#38424e", 0.5]} />
            <directionalLight position={[12, 16, 10]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} />
            <directionalLight position={[-6, 8, -4]} intensity={0.7} color="#aec6dd" />
            {/* Local studio env rig (Lightformer): zero network fetch. The old
                preset="city" pulled a remote HDR on first paint, blocking LCP. */}
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 0, 0]}>
                <Lightformer form="circle" intensity={4} position={[0, 5, -9]} scale={2} />
                <Lightformer intensity={1.2} position={[-5, 1, -1]} scale={[20, 0.5]} />
                <Lightformer intensity={1.2} position={[5, 1, -1]} scale={[20, 0.5]} />
                <Lightformer color="#7ccfc7" intensity={1} position={[0, 2, 5]} scale={[6, 1]} />
              </group>
            </Environment>
            <Grounds />
            <BuildingShell />
            {!fps ? (
              <WorkshopVisual workstationActive={currentStation?.id === "workstation" || interactionState === "workstation"} />
            ) : (
              <React.Suspense fallback={null}>
                <FpsWorld fps={fps} />
              </React.Suspense>
            )}
            <ContactShadows position={[0, -0.02, 0]} opacity={0.35} scale={30} blur={2.2} far={4} />
            <CinematicCamera scrollT={scrollT} fpsActive={fps} />
            {!isMobile && (
              <EffectComposer multisampling={0}>
                <Bloom intensity={0.5} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
                <Vignette eskil={false} offset={0.18} darkness={0.72} />
              </EffectComposer>
            )}
          </Canvas>

          {!interactionState && currentStation && (
            <InteractionPrompt station={currentStation} onFocus={handleFocus} />
          )}

          {interactionState && (
            <button
              onClick={handleResume}
              style={{
                position: 'fixed', bottom: '10vh', right: '5vw', zIndex: 100,
                background: '#e8e8e8', color: '#0b0b0b', border: 'none',
                padding: '12px 24px', fontWeight: 700, cursor: 'pointer',
                fontFamily: '"DM Mono", monospace', textTransform: 'uppercase'
              }}
            >
              Resume Scroll (ESC)
            </button>
          )}
        </div>

        {!fps && !loading && (
          <div className="site-content">
            <Nav onEnter={enter} />
            <Hero onEnter={enter} onOpen={openProject} />
            <div className="content-solid">
              <WorkIndex projects={projects} onOpen={openProject} />
              <About />
              <Contact />
            </div>
          </div>
        )}

        {activeIdx != null && !fps && (
          <ProjectDetail
            project={projects[activeIdx]}
            index={activeIdx}
            total={projects.length}
            onClose={() => setActiveIdx(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}

        {fps && isMobile && <React.Suspense fallback={null}><Joystick /></React.Suspense>}

        {fps && (
          <>
            <div className="lab-hud">
              <span>WASD MOVE · CLICK TO LOOK · E RESUME · ESC EXIT</span>
            </div>
            <button onClick={() => setFps(false)} aria-label="Go outside" className="btn btn-ghost lab-exit">← Outside</button>
          </>
        )}
      </main>
    </div>
  )
}
