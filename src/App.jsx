import { useState, useEffect, useMemo, useRef } from "react"
import React from "react"
import * as THREE from "three"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, Html, SoftShadows } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import Lenis from "lenis"
import { projects } from "./os/data"
import Preloader from "./components/Preloader"
import Cursor from "./components/Cursor"
import WorkIndex from "./components/WorkIndex"
import ProjectDetail from "./components/ProjectDetail"
import { Nav, Hero, About, Contact } from "./components/Sections"

const Interior = React.lazy(() => import("./Interior"))
const Joystick = React.lazy(() => import("./Joystick"))

// ---- Hollow Creator HQ shell -------------------------------------------------

const SHELL_X = 5.5   // half-width of the building
const SHELL_Z = 5.5   // half-depth of the building
const WALL_H = 4.2    // wall height
const DOOR_H = 2.5    // doorway opening height
const DOOR_W = 2.0    // doorway opening width

function BuildingShell() {
  const m = useMemo(() => ({
    wall: <meshStandardMaterial color="#eef1f4" roughness={0.82} />,
    wallDark: <meshStandardMaterial color="#3a4350" roughness={0.7} />,
    glass: <meshStandardMaterial color="#0f1a2a" metalness={0.75} roughness={0.1} transparent opacity={0.8} />,
    mullion: <meshStandardMaterial color="#1a1a1a" />,
    roof: <meshStandardMaterial color="#c3c9d0" roughness={0.85} />,
    trim: <meshStandardMaterial color="#2b323c" />,
    concrete: <meshStandardMaterial color="#9aa3ad" roughness={0.9} />
  }), [])

  // Front wall is split into segments so there is a real doorway gap at x=0.
  const mullionX = [-3.5, -1.5, 1.5, 3.5]
  // Glass curtain leaves the doorway open: two panels flanking the door gap.
  const panelW = SHELL_X - DOOR_W / 2 - 0.15
  const panelX = DOOR_W / 2 + 0.15 + panelW / 2

  return (
    <group>
      {/* Floor slab inside the building (walkable) */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[SHELL_X - 0.15, 0.1, SHELL_Z - 0.15]} position={[0, -0.1, 0]} />
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <boxGeometry args={[SHELL_X * 2 - 0.3, 0.1, SHELL_Z * 2 - 0.3]} />
          {m.concrete}
        </mesh>
      </RigidBody>

      {/* Back wall (solid) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, WALL_H / 2, -SHELL_Z]}>
          <boxGeometry args={[SHELL_X * 2 + 0.3, WALL_H, 0.3]} />
          {m.wall}
        </mesh>
      </RigidBody>
      {/* Side walls (solid) */}
      {[-SHELL_X, SHELL_X].map((x) => (
        <RigidBody key={x} type="fixed" colliders="cuboid">
          <mesh position={[x, WALL_H / 2, 0]}>
            <boxGeometry args={[0.3, WALL_H, SHELL_Z * 2]} />
            {m.wall}
          </mesh>
        </RigidBody>
      ))}

      {/* Front wall: left segment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-((SHELL_X + DOOR_W / 2) / 2), WALL_H / 2, SHELL_Z]}>
          <boxGeometry args={[SHELL_X - DOOR_W / 2, WALL_H, 0.3]} />
          {m.wall}
        </mesh>
      </RigidBody>
      {/* Front wall: right segment */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[(SHELL_X + DOOR_W / 2) / 2, WALL_H / 2, SHELL_Z]}>
          <boxGeometry args={[SHELL_X - DOOR_W / 2, WALL_H, 0.3]} />
          {m.wall}
        </mesh>
      </RigidBody>
      {/* Lintel above the door */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, (WALL_H + DOOR_H) / 2, SHELL_Z]}>
          <boxGeometry args={[DOOR_W + 0.6, WALL_H - DOOR_H, 0.3]} />
          {m.wallDark}
        </mesh>
      </RigidBody>

      {/* Glass curtain wall: two panels flanking the open doorway */}
      {[-panelX, panelX].map((x) => (
        <mesh key={x} position={[x, WALL_H / 2 + 0.2, SHELL_Z + 0.06]}>
          <planeGeometry args={[panelW, WALL_H]} />
          {m.glass}
        </mesh>
      ))}
      {mullionX.map((x) => (
        <mesh key={x} position={[x, WALL_H / 2 + 0.2, SHELL_Z + 0.12]}>
          <boxGeometry args={[0.06, WALL_H, 0.06]} />
          {m.mullion}
        </mesh>
      ))}

      {/* Roof */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, WALL_H + 0.15, 0]}>
          <boxGeometry args={[SHELL_X * 2 + 0.3, 0.3, SHELL_Z * 2 + 0.3]} />
          {m.roof}
        </mesh>
      </RigidBody>

      {/* Sign above the door */}
      <mesh position={[0, 3.55, SHELL_Z + 0.1]}>
        <boxGeometry args={[4.5, 0.7, 0.1]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.5} />
      </mesh>
      <Html position={[0, 3.55, SHELL_Z + 0.24]} center distanceFactor={18} transform sprite>
        <div style={{ fontFamily: "Inter, sans-serif", color: "#1a202c", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.08em" }}>CREATOR HQ</span>
          <span style={{ width: "2px", height: "20px", background: "#cbd5e1" }}></span>
          <span style={{ fontWeight: 500, fontSize: 9, letterSpacing: "0.05em", color: "#475569", lineHeight: 1.2 }}>ROBOTICS &<br/>ENGINEERING</span>
        </div>
      </Html>

      {/* Security camera above the door */}
      <group position={[1, 3.0, SHELL_Z + 0.1]} rotation={[0, -0.4, 0]}>
        <mesh><cylinderGeometry args={[0.06, 0.07, 0.14, 12]} /><meshStandardMaterial color="#e6e8eb" /></mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.035, 0.18, 12]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[0.22, 0, 0]}><sphereGeometry args={[0.03, 12, 12]} /><meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={1.4} /></mesh>
      </group>

      {/* Roof details */}
      <mesh position={[2, WALL_H + 0.4, 1]} castShadow><boxGeometry args={[1.3, 0.35, 0.9]} /><meshStandardMaterial color="#d0d4d8" /></mesh>
    </group>
  )
}

function Grounds() {
  const m = useMemo(() => ({
    ground: <meshStandardMaterial color="#e8eae8" roughness={0.95} />,
    parking: <meshStandardMaterial color="#3a3d3a" roughness={0.92} />,
    line: <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />,
    car: <meshStandardMaterial color="#5a6a7a" metalness={0.4} roughness={0.4} />,
    path: <meshStandardMaterial color="#f8fafc" roughness={0.9} />,
    gravel: <meshStandardMaterial color="#2d3748" roughness={0.9} />,
    trunk: <meshStandardMaterial color="#3f2e1c" />,
    leaves: <meshStandardMaterial color="#2d4a22" roughness={0.9} />
  }), [])
  const shrubs = useMemo(() => {
    const spots = [[-9, 5], [-7, 3], [4, -3], [6, -2]]
    // Deterministic pseudo-random sizes (stable across renders).
    return spots.map(([x, z], i) => ({
      x,
      z,
      w: 1.1 + ((i * 37) % 10) / 10 * 0.7,
      h: 0.75 + ((i * 53) % 10) / 10 * 0.5,
      d: 1.1 + ((i * 71) % 10) / 10 * 0.7,
    }))
  }, [])
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        {m.ground}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 4]} receiveShadow>
        <planeGeometry args={[4, SHELL_Z + 6]} />
        {m.path}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.015, 3]} receiveShadow>
        <planeGeometry args={[13, 11]} />
        {m.parking}
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.01, -1 + i * 3]}>
          <planeGeometry args={[11, 0.06]} />
          {m.line}
        </mesh>
      ))}
      <group position={[16, 0.3, 2]}>
        <mesh castShadow><boxGeometry args={[4.2, 0.55, 1.8]} />{m.car}</mesh>
        <mesh position={[0, 0.38, 0]} castShadow><boxGeometry args={[2.4, 0.38, 1.4]} />{m.car}</mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9, -0.015, 4]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        {m.gravel}
      </mesh>
      {shrubs.map((s, i) => (
        <mesh key={i} position={[s.x, 0.4, s.z]} castShadow>
          <boxGeometry args={[s.w, s.h, s.d]} />
          {m.leaves}
        </mesh>
      ))}
      <mesh position={[-10, 2.8, 2]} castShadow><sphereGeometry args={[1.4, 7, 7]} />{m.leaves}</mesh>
      <mesh position={[-10, 1.4, 2]} castShadow><cylinderGeometry args={[0.1, 0.15, 2.8]} />{m.trunk}</mesh>
    </group>
  )
}

// ---- Gentle hero camera: idle drift + pointer parallax (no forced dolly) ----
function HeroCameraRig({ fpsActive }) {
  const { camera, pointer } = useThree()
  const t = useRef(0)
  const base = useMemo(() => new THREE.Vector3(0, 4.4, 14.5), [])
  const look = useMemo(() => new THREE.Vector3(0, 1.9, 0), [])
  const cur = useMemo(() => new THREE.Vector3().copy(base), [base])

  useFrame((_, dt) => {
    if (fpsActive) return
    t.current += Math.min(dt, 0.05)
    const tt = t.current
    cur.set(
      base.x + pointer.x * 1.1 + Math.sin(tt * 0.18) * 0.25,
      base.y + pointer.y * 0.5 + Math.sin(tt * 0.24) * 0.12,
      base.z
    )
    camera.position.lerp(cur, 0.045)
    camera.lookAt(look)
  })

  return null
}

function useSmoothScroll(active) {
  useEffect(() => {
    if (!active) return
    const lenis = new Lenis({ smoothWheel: true })
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
  }, [active])
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [fps, setFps] = useState(false)
  const [flash, setFlash] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)

  useSmoothScroll(!fps && !loading)

  useEffect(() => { setIsMobile(window.matchMedia("(max-width: 768px)").matches) }, [])
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
    setFlash(1)
    setTimeout(() => { setFps(true); setFlash(0) }, 320)
  }

  const openProject = (p) => setActiveIdx(projects.findIndex((x) => x.id === p.id))
  const step = (d) => setActiveIdx((i) => (i == null ? 0 : (i + d + projects.length) % projects.length))

  return (
    <div style={{ minHeight: "100dvh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Cursor />

      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: "0" }}>
          Ahmed Irfan Akrami · Robotics & AI Engineer Portfolio
        </h1>

        <div className="app-viewport">
          {flash > 0 && <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "#fff", opacity: flash, pointerEvents: "none", transition: "opacity 0.3s ease" }} />}
          <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 4.4, 14.5], fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
            <color attach="background" args={["#0b0f14"]} />
            <SoftShadows size={20} samples={16} focus={0} />
            <ambientLight intensity={0.55} />
            <hemisphereLight args={["#dfe8f0", "#38424e", 0.5]} />
            <directionalLight position={[12, 16, 10]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0002} />
            <directionalLight position={[-6, 8, -4]} intensity={0.7} color="#aec6dd" />
            <Environment preset="city" />
            <Grounds />
            <Physics gravity={[0, -9.81, 0]}>
              <BuildingShell />
              <React.Suspense fallback={null}>
                <Interior fps={fps} />
              </React.Suspense>
            </Physics>
            <ContactShadows position={[0, -0.02, 0]} opacity={0.35} scale={30} blur={2.2} far={4} />
            <HeroCameraRig fpsActive={fps} />
            {!isMobile && (
              <EffectComposer multisampling={4}>
                <Bloom intensity={0.5} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
                <Vignette eskil={false} offset={0.18} darkness={0.72} />
              </EffectComposer>
            )}
          </Canvas>
        </div>

        {!fps && !loading && (
          <div className="site-content">
            <Nav onEnter={enter} />
            <Hero onEnter={enter} />
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
