import { useState, useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useThree, useFrame } from "@react-three/fiber"
import { Html, KeyboardControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Ecctrl from "ecctrl"
import {
  WorkstationVisual,
  PaperworkDeskVisual,
  MakerBenchFrame,
  DroneTableVisual,
  ProjectShelfVisual,
  CrocTankVisual,
  RobotVisual,
} from "./scene/furniture"

// FPS lab. Mounted only inside <Physics> by FpsWorld (lazy-loaded on lab
// entry), so the Rapier bundle never ships to scroll-mode visitors.
// Layout mirrors WorkshopVisual.jsx 1:1 — same positions, same visuals —
// plus fixed colliders (matching the old auto-cuboids), the Ecctrl player,
// draggable bench tools, and the KeyE resume shortcut.

function EnablePointerLock() {
  const { gl } = useThree()
  useEffect(() => {
    const dom = gl.domElement
    const onClick = () => { if (!document.pointerLockElement) dom.requestPointerLock() }
    dom.addEventListener("click", onClick)
    return () => dom.removeEventListener("click", onClick)
  }, [gl])
  return null
}

function DragController({ toolsRef, enabled }) {
  const { camera, pointer, raycaster } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const force = useMemo(() => new THREE.Vector3(), [])
  const pressed = useRef(false)

  useEffect(() => {
    const down = () => { pressed.current = true }
    const up = () => { pressed.current = false }
    window.addEventListener("pointerdown", down)
    window.addEventListener("pointerup", up)
    return () => {
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
    }
  }, [])

  useFrame(() => {
    // Tools are draggable only inside the lab (FPS) while the pointer is
    // held down. Previously this ran every frame in scroll mode too, so
    // merely looking at the maker bench flung tools around.
    if (!enabled || !pressed.current) return
    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(toolsRef.current, true)

    if (intersects.length > 0) {
      const tool = intersects[0].object
            const body = tool.userData.rigidBody
      if (body) {
        raycaster.ray.at(1, targetPos) // rough approximation
        force.subVectors(targetPos, tool.position).multiplyScalar(10)
        body.applyImpulse(force, true)
      }
    }
  })

  return null
}

function Tool({ position, color, toolsRef }) {
  const bodyRef = useRef()
  const meshRef = useRef()

  useEffect(() => {
      const mesh = meshRef.current
      if (!mesh || !bodyRef.current) return undefined
      mesh.userData.rigidBody = bodyRef.current
      toolsRef.current.push(mesh)
      return () => {
        toolsRef.current = toolsRef.current.filter((item) => item !== mesh)
      }
    }, [toolsRef])

  return (
    <RigidBody ref={bodyRef} colliders="cuboid" position={position} linearDamping={0.5} angularDamping={0.5}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </RigidBody>
  )
}

export default function Interior({ fps }) {
  const [showResume, setShowResume] = useState(false)
  const { camera } = useThree()
    const toolsRef = useRef([])

  // Room is x ~ [-5.2, 5.2], z ~ [-5.2, 5.2], door at +z center (x=0).
  // Layout: back wall = desks, left = maker bench, right = shelf,
  // center = drone hero + croc, robot greets near the door.
  useEffect(() => {
    if (!fps) return
    function onKey(e) {
      if (e.code === "KeyE") {
        const dx = camera.position.x - 4
        const dz = camera.position.z - -4
        if (Math.hypot(dx, dz) < 1.9) setShowResume(v => {
          const next = !v
          if (next && document.pointerLockElement) document.exitPointerLock()
          return next
        })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [fps, camera])

  return (
    <group>
      {/* Interior floor (visual detail) */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[10.5, 0.02, 10.5]} />
        <meshStandardMaterial color="#8a919c" roughness={0.9} />
      </mesh>
      {/* Ceiling light bars + warm accent */}
      {[-4, 0, 4].map((x) => (
        <group key={x}>
          <mesh position={[x, 4.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 0.3]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          <pointLight position={[x, 3.6, 0]} intensity={30} distance={15} decay={2} color="#ffffff" />
        </group>
      ))}
      <pointLight position={[0, 2.2, 3]} intensity={12} distance={9} decay={2} color="#7ccfc7" />
      <DragController toolsRef={toolsRef} enabled={fps} />

      <group position={[-3.4, 0, -4]}>
        <WorkstationVisual position={[0, 0, 0]} />
      </group>
      <RigidBody type="fixed" colliders="cuboid">
        <PaperworkDeskVisual position={[4, 0.9, -4]} onOpen={() => setShowResume(true)} />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <MakerBenchFrame position={[-4.2, 0.9, 1.2]} rotY={Math.PI / 2}>
          {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
            <Tool
              key={i}
              position={[x, 0.24, 0.2]}
              color={i % 2 ? "#c0392b" : "#2f9e92"}
              toolsRef={toolsRef}
            />
          ))}
        </MakerBenchFrame>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <ProjectShelfVisual position={[4, 0, 1]} rotY={-Math.PI / 2} />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <DroneTableVisual position={[0, 0.9, -0.6]} />
      </RigidBody>
      <CrocTankVisual position={[0.4, 0, 1.2]} />
      <RigidBody type="fixed" colliders="cuboid">
        <RobotVisual position={[0, 0.55, 2.6]} />
      </RigidBody>

      {fps && (
        <>
          <KeyboardControls map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "jump", keys: ["Space"] },
            { name: "run", keys: ["ShiftLeft", "ShiftRight"] }
          ]}>
            <Ecctrl
              position={[0, 1.3, 2.5]}
              camCollision={false}
              camInitDis={-0.01}
              camMinDis={-0.01}
              camFollowMult={1000}
              camLerpMult={1000}
              turnVelMultiplier={1}
              turnSpeed={100}
              mode="CameraBasedMovement"
              maxVelLimit={4}
              autoBalance
            />
          </KeyboardControls>
          <EnablePointerLock />
        </>
      )}

      {showResume && (
        <Html fullscreen>
          <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(6,10,14,0.72)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', color: '#0A0F14', maxWidth: 640, width: '100%', borderRadius: 12, padding: 24, maxHeight: '86vh', overflow: 'auto' }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: '"Source Serif 4", serif' }}>Ahmed Irfan Akrami — Resume</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: '"DM Mono", monospace', fontSize: 12, background: '#f7f8f9', padding: 12, borderRadius: 8 }}>{`Ahmed Irfan Akrami
Robotics & AI Engineer — NRL 007 VoltEdge
Croc OS v0.5.3 (ESP32/SH1106) · Meadow · Kharcha
EdgeBot · Field Shutter · Drone · Moon Rover
IoT Telemetry · Field Analyzer · ProjectDirec`}</pre>
              <button onClick={() => setShowResume(false)} style={{ marginTop: 12, padding: '8px 14px', background: '#0A0F14', color: '#fff', border: 0, borderRadius: 8, cursor: 'pointer' }}>Close (Esc)</button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
