import { useState, useEffect, useMemo, useRef } from "react"
import React from "react"
import * as THREE from "three"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, Html } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

const Workshop = React.lazy(() => import("./Workshop"))
const Joystick = React.lazy(() => import("./Joystick"))

const ACCENT = "#2f9e92"

function CreatorHQ({ entering }) {
  const materials = useMemo(() => ({
    ground: <meshStandardMaterial color="#e8eae8" roughness={0.95} />,
    parking: <meshStandardMaterial color="#3a3d3a" roughness={0.92} />,
    line: <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />,
    car: <meshStandardMaterial color="#5a6a7a" metalness={0.4} roughness={0.4} />,
    core: <meshStandardMaterial color="#f0f2f5" roughness={0.82} />,
    wing: <meshStandardMaterial color="#4a5568" roughness={0.7} />,
    parapet: <meshStandardMaterial color="#d1d5db" />,
    glass: <meshStandardMaterial color="#0f1a2a" metalness={0.8} roughness={0.1} transparent opacity={0.85} />,
    mullion: <meshStandardMaterial color="#1a1a1a" />,
    entrance: <meshStandardMaterial color="#111418" />,
    door: <meshStandardMaterial color="#0a0f14" metalness={0.5} roughness={0.2} transparent opacity={0.9} />,
    sign: <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.5} />,
    signText: <meshStandardMaterial color="#1a202c" />,
    camBody: <meshStandardMaterial color="#e6e8eb" />,
    camLens: <meshStandardMaterial color="#111" />,
    camLed: <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={1.4} />,
    hvac: <meshStandardMaterial color="#d0d4d8" />,
    solar: <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />,
    trunk: <meshStandardMaterial color="#3f2e1c" />,
    leaves: <meshStandardMaterial color="#2d4a22" roughness={0.9} />,
    gravel: <meshStandardMaterial color="#2d3748" roughness={0.9} />,
    robotArm: <meshStandardMaterial color="#a0aec0" metalness={0.5} roughness={0.4} />,
    path: <meshStandardMaterial color="#f8fafc" roughness={0.9} />
  }), [])

  const shrubPositions = [[-9, 5], [-7, 3], [-5, 7], [4, -3], [6, -2]]
  const mullionXPositions = [-4.5, -2.5, -0.5]
  const parkingLineOffsets = [0, 1, 2, 3, 4]

  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        {materials.ground}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 10]} receiveShadow>
        <planeGeometry args={[4, 14]} />
        {materials.path}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[16, 0.01, 4]} receiveShadow>
        <planeGeometry args={[16, 14]} />
        {materials.parking}
      </mesh>
      {parkingLineOffsets.map((i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[16, 0.02, -1 + i * 3]}>
          <planeGeometry args={[12, 0.06]} />
          {materials.line}
        </mesh>
      ))}
      <group position={[17, 0.35, 2]}>
        <mesh castShadow>
          <boxGeometry args={[4.2, 0.6, 1.8]} />
          {materials.car}
        </mesh>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2.4, 0.4, 1.4]} />
          {materials.car}
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0.01, 4]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        {materials.gravel}
      </mesh>
      <group position={[-6, 0.4, 6]}>
        <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.3, 0.4, 0.2]} />{materials.robotArm}</mesh>
        <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[0.2, 1, 0.2]} />{materials.robotArm}</mesh>
        <mesh position={[0, 1.1, 0]} castShadow><sphereGeometry args={[0.15]} />{materials.robotArm}</mesh>
        <mesh position={[0.4, 1.3, 0]} rotation={[0, 0, -0.5]} castShadow><boxGeometry args={[0.15, 0.8, 0.15]} />{materials.robotArm}</mesh>
      </group>
      <group position={[0, 0, 0]}>
        <mesh position={[-2.5, 2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[6, 4.2, 11]} />
          {materials.core}
        </mesh>
        <mesh position={[3, 2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 4.2, 11]} />
          {materials.wing}
        </mesh>
        <mesh position={[0, 4.3, 0]}>
          <boxGeometry args={[11.2, 0.2, 11.2]} />
          {materials.parapet}
        </mesh>
        <mesh position={[-2.5, 2.1, 5.51]}>
          <planeGeometry args={[5, 3.8]} />
          {materials.glass}
        </mesh>
        {mullionXPositions.map((x) => (
          <mesh key={x} position={[x, 2.1, 5.52]}>
            <boxGeometry args={[0.08, 3.8, 0.08]} />
            {materials.mullion}
          </mesh>
        ))}
        <group position={[1.5, 0, 5.6]}>
          <mesh position={[0, 2.1, 0.2]} castShadow>
            <boxGeometry args={[4, 0.4, 0.8]} />
            {materials.entrance}
          </mesh>
          <mesh position={[-1.8, 1.1, 0.2]} castShadow>
            <boxGeometry args={[0.4, 2.4, 0.8]} />
            {materials.entrance}
          </mesh>
          <mesh position={[1.8, 1.1, 0.2]} castShadow>
            <boxGeometry args={[0.4, 2.4, 0.8]} />
            {materials.entrance}
          </mesh>
          <mesh position={[-0.8, 1.1, 0.1]}>
            <boxGeometry args={[1.6, 2.2, 0.05]} />
            {materials.door}
          </mesh>
          <mesh position={[0.8, 1.1, 0.1]}>
            <boxGeometry args={[1.6, 2.2, 0.05]} />
            {materials.door}
          </mesh>
          <pointLight position={[0, 1.1, 0.5]} intensity={entering ? 8 : 1.5} color="#ffffff" distance={6} />
          <group position={[2.2, 2.3, -0.1]} rotation={[0, -0.5, 0]}>
            <mesh><cylinderGeometry args={[0.07, 0.08, 0.15, 12]} />{materials.camBody}</mesh>
            <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.04, 0.2, 12]} />{materials.camLens}</mesh>
            <mesh position={[0.24, 0, 0]}><sphereGeometry args={[0.035, 12, 12]} />{materials.camLed}</mesh>
          </group>
        </group>
        <mesh position={[-0.5, 3.6, 5.55]}>
          <boxGeometry args={[4.5, 0.8, 0.1]} />
          {materials.sign}
        </mesh>
        <Html position={[-0.5, 3.6, 5.65]} center distanceFactor={20} transform sprite>
          <div style={{ fontFamily: "Inter, sans-serif", color: "#1a202c", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>CREATOR HQ</span>
            <span style={{ width: "2px", height: "24px", background: "#cbd5e1" }}></span>
            <span style={{ fontWeight: 500, fontSize: 10, letterSpacing: "0.05em", color: "#475569", textAlign: "left", lineHeight: 1.2 }}>ROBOTICS &<br/>ENGINEERING</span>
          </div>
        </Html>
        <mesh position={[2.5, 4.5, 1.5]} castShadow><boxGeometry args={[1.4, 0.4, 1]} />{materials.hvac}</mesh>
        <mesh position={[-2, 4.35, -2]} rotation={[0.35, 0, 0]}><boxGeometry args={[2.4, 0.05, 1.2]} />{materials.solar}</mesh>
      </group>
      {shrubPositions.map((p, i) => (
        <mesh key={i} position={[p[0], 0.4, p[1]]} castShadow>
          <boxGeometry args={[1.2 + Math.random() * 0.8, 0.8 + Math.random() * 0.6, 1.2 + Math.random() * 0.8]} />
          {materials.leaves}
        </mesh>
      ))}
      <mesh position={[-10, 3, 2]} castShadow>
        <sphereGeometry args={[1.5, 7, 7]} />
        {materials.leaves}
      </mesh>
      <mesh position={[-10, 1.5, 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 3]} />
        {materials.trunk}
      </mesh>
    </group>
  )
}

// Scrubs the exterior camera from a wide hero shot toward the entrance along
// the page's scroll progress (0 -> 1), driven by GSAP ScrollTrigger + Lenis.
function ExteriorCameraRig() {
  const { camera } = useThree()
  const progress = useRef({ v: 0 })
  const tmpPos = useMemo(() => new THREE.Vector3(), [])
  const tmpLook = useMemo(() => new THREE.Vector3(), [])

  const keyframes = useMemo(() => ({
    pos: [
      new THREE.Vector3(0, 5.2, 14),   // wide hero
      new THREE.Vector3(2.5, 3.4, 9),  // lower, closer
      new THREE.Vector3(1.8, 1.7, 6.1) // at the entrance
    ],
    look: [
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(1.5, 1.6, 0),
      new THREE.Vector3(1.5, 1.2, 0)
    ]
  }), [])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    })
    tl.to(progress.current, { v: 1, ease: "none" }, 0)
    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  useFrame(() => {
    const p = progress.current.v
    samplingLerp(keyframes.pos, p, tmpPos)
    samplingLerp(keyframes.look, p, tmpLook)
    camera.position.copy(tmpPos)
    camera.lookAt(tmpLook)
    camera.updateProjectionMatrix()
  })

  return null
}

function samplingLerp(arr, p, out) {
  const spans = arr.length - 1
  const f = Math.max(0, Math.min(1, p)) * spans
  const i = Math.min(Math.floor(f), spans - 1)
  const t = f - i
  out.lerpVectors(arr[i], arr[i + 1], t)
  return out
}

// Lenis smooth scroll + ScrollTrigger sync. Only active while we're on the
// exterior (scrollable) phase; disabled inside the workshop.
function useSmoothScroll(active) {
  useEffect(() => {
    if (!active) return
    const lenis = new Lenis({ smoothWheel: true })
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [active])
}

export default function App() {
  const [phase, setPhase] = useState("exterior")
  const [entering, setEntering] = useState(false)
  const [flash, setFlash] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useSmoothScroll(phase === "exterior")

  useEffect(() => { setIsMobile(window.matchMedia("(max-width: 768px)").matches) }, [])
  useEffect(() => {
    if (phase === "interior") {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
    return () => { document.documentElement.style.overflow = "" }
  }, [phase])

  function doEnter() {
    setEntering(true)
    setFlash(1)
    setTimeout(() => { setPhase("interior"); setFlash(0); setEntering(false) }, 650)
  }

  return (
    <div style={{ minHeight: "100dvh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {flash > 0 && <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "#fff", opacity: flash, pointerEvents: "none", transition: "opacity 0.5s ease" }} />}

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 30, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "rgba(10,15,20,0.75)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#8a9aae" }}>
        <span>NEXPLACE · CREATOR HQ</span>
        <span style={{ color: phase === "exterior" ? "#7ccfc7" : "#E95420" }}>
          {phase === "exterior" ? "SCROLL TO APPROACH · ENTER THE CREATOR HQ" : "INSIDE — WASD MOVE · CLICK LOOK · E RESUME"}
        </span>
      </header>

      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" }}>
          Ahmed Irfan Akrami · Robotics & AI Engineer Portfolio
        </h1>

        {/* Fixed full-viewport canvas layer */}
        <div className="app-viewport">
          {phase === "exterior" ? (
            <Canvas shadows camera={{ position: [0, 5.2, 14], fov: 55 }} gl={{ antialias: true }}>
              <color attach="background" args={["#e8ecf1"]} />
              <ambientLight intensity={1.0} />
              <directionalLight position={[12, 16, 10]} intensity={1.4} castShadow shadowMapSize={[2048, 2048]} />
              <directionalLight position={[-6, 8, -4]} intensity={0.4} />
              <Environment preset="city" />
              <CreatorHQ entering={entering} />
              <ContactShadows position={[0, -0.01, 0]} opacity={0.3} scale={30} blur={2.5} />
              <ExteriorCameraRig />
            </Canvas>
          ) : (
            <React.Suspense fallback={<div style={{ color: "#fff", height: "100%", display: "grid", placeItems: "center" }}>Loading Workshop...</div>}>
              <Canvas shadows camera={{ position: [0, 2, 10], fov: 62 }} gl={{ antialias: true }}>
                <color attach="background" args={["#0A0F14"]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[6, 10, 4]} intensity={1.0} castShadow shadowMapSize={[2048, 2048]} />
                <Workshop />
              </Canvas>
            </React.Suspense>
          )}
        </div>

        {phase === "exterior" && (
          <div id="scroll-track" style={{ position: "relative", zIndex: -1, height: "400vh", pointerEvents: "none" }} />
        )}

        {phase === "exterior" && (
          <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#0A0F14", color: "#fff", padding: "14px 22px", borderRadius: 12, display: "flex", gap: 16, alignItems: "center", boxShadow: "0 12px 32px rgba(0,0,0,0.3)", zIndex: 20 }}>
            <span style={{ fontSize: 14 }}>Explore the new Robotics &amp; Engineering hub</span>
            <button onClick={doEnter} aria-label="Enter building" style={{ padding: "11px 24px", background: ACCENT, color: "#fff", border: 0, borderRadius: 999, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Enter →</button>
          </div>
        )}

        {phase === "interior" && isMobile && (
          <React.Suspense fallback={null}>
            <Joystick />
          </React.Suspense>
        )}

        {phase === "interior" && (
          <button onClick={() => setPhase("exterior")} aria-label="Go outside" style={{ position: "fixed", bottom: 20, left: 20, zIndex: 20, padding: "10px 16px", background: "rgba(255,255,255,0.1)", border: "1px solid #2a333e", color: "#e6eef4", borderRadius: 999, fontSize: 12, cursor: "pointer" }}>← Outside</button>
        )}
      </main>
    </div>
  )
}