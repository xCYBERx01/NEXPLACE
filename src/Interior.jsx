import { useState, useEffect, useMemo, Suspense } from "react"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { Html, KeyboardControls, RoundedBox, useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Ecctrl from "ecctrl"

const ACCENT = "#2f9e92"

// Shared material recipes (PBR)
const WOOD_TOP = { color: "#a97e50", roughness: 0.35, metalness: 0.05 }
const WOOD_DARK = { color: "#6d5133", roughness: 0.4, metalness: 0.05 }
const METAL_BLACK = { color: "#1c1f24", roughness: 0.35, metalness: 0.6 }
const METAL_GREY = { color: "#4a4f57", roughness: 0.4, metalness: 0.7 }

function Desk({ position, w = 2.2, d = 0.9, color = WOOD_TOP, children }) {
  const halfW = w / 2
  const halfD = d / 2
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position}>
        <RoundedBox args={[w, 0.07, d]} radius={0.03} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial {...color} />
        </RoundedBox>
        {[[-halfW + 0.12, -halfD + 0.12], [halfW - 0.12, -halfD + 0.12], [-halfW + 0.12, halfD - 0.12], [halfW - 0.12, halfD - 0.12]].map((leg, i) => (
          <mesh key={i} position={[leg[0], -0.35, leg[1]]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.62, 12]} />
            <meshStandardMaterial {...METAL_BLACK} />
          </mesh>
        ))}
        {children}
      </group>
    </RigidBody>
  )
}

function DeskLabel({ text, y = 0.9 }) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={8} transform sprite>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#e8eef5',
        background: 'rgba(13,18,24,0.85)', padding: '4px 9px', borderRadius: 6,
        border: '1px solid #2a333e', whiteSpace: 'nowrap', letterSpacing: '0.02em'
      }}>{text}</div>
    </Html>
  )
}

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

// Loads a GLB and normalizes it: recenters x/z, sits it on the floor (y=0),
// and scales to a target height. This makes any source model (even ones with
// odd internal node scales) drop in predictably.
function NormalizedModel({ url, position, rotation = [0, 0, 0], targetHeight }) {
  const { scene } = useGLTF(url)
  const normalized = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const s = targetHeight ? targetHeight / size.y : 1
    clone.scale.setScalar(s)
    clone.position.set(-center.x * s, -box.min.y * s, -center.z * s)
    return clone
  }, [scene, targetHeight])
  return <group position={position} rotation={rotation}><primitive object={normalized} /></group>
}

function DeskFallback() {
  return (
    <RoundedBox args={[2.2, 0.07, 0.8]} radius={0.03} smoothness={4} castShadow receiveShadow position={[0, 0.9, 0]}>
      <meshStandardMaterial {...WOOD_TOP} />
    </RoundedBox>
  )
}

function PaperworkDesk({ position, onOpen }) {
  return (
    <Desk position={position} w={1.9} d={0.7} color={WOOD_DARK}>
      {[0, 0.02, 0.04, 0.06].map((y, i) => (
        <RoundedBox key={i} args={[0.5, 0.014, 0.34]} radius={0.005} position={[-0.15, 0.05 + y, 0.08]}>
          <meshStandardMaterial color="#f2efe8" roughness={0.6} />
        </RoundedBox>
      ))}
      <DeskLabel text="PAPERWORK · RESUME · PRESS E" />
      <Html position={[0, 0.5, 0]} center distanceFactor={8} transform sprite>
        <button onClick={onOpen} style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, fontWeight: 600, color: '#fff', background: ACCENT, padding: '8px 14px', borderRadius: 8, border: 0, cursor: 'pointer' }}>Open Resume</button>
      </Html>
    </Desk>
  )
}

function MakerBench({ position, rotY }) {
  const pegX = [-1, -0.5, 0, 0.5, 1]
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={[0, rotY, 0]}>
        <RoundedBox args={[3, 0.08, 1.1]} radius={0.03} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial {...WOOD_DARK} />
        </RoundedBox>
        {[[-1.3, 0], [1.3, 0]].map((feet, i) => (
          <mesh key={i} position={[feet[0], -0.42, 0]} castShadow>
            <boxGeometry args={[0.1, 0.8, 0.8]} />
            <meshStandardMaterial {...METAL_BLACK} />
          </mesh>
        ))}
        <mesh position={[0, 1.35, -0.12]}>
          <boxGeometry args={[3, 1.1, 0.04]} />
          <meshStandardMaterial color="#8a7a64" roughness={0.8} />
        </mesh>
        {pegX.map((x, i) => (
          <mesh key={i} position={[x, 1.45 + (i % 2) * 0.22, -0.14]}>
            <cylinderGeometry args={[0.04, 0.04, 0.04, 12]} />
            <meshStandardMaterial {...METAL_BLACK} />
          </mesh>
        ))}
        {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0.24, 0.2]} rotation={[0, i * 0.4, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
            <meshStandardMaterial color={i % 2 ? "#c0392b" : "#2f9e92"} roughness={0.4} />
          </mesh>
        ))}
        <DeskLabel text="MAKER BENCH · PEGBOARD" />
      </group>
    </RigidBody>
  )
}

function DroneTable({ position }) {
  const arms = [[0.35, 0, 0.02], [-0.35, 0, 0.02], [0, 0.02, 0.35], [0, 0.02, -0.35]]
  return (
    <Desk position={position} w={1.6} d={0.8} color={WOOD_TOP}>
      <group position={[0, 0.4, 0]} rotation={[0.4, 0.35, 0]}>
        <RoundedBox args={[0.34, 0.05, 0.34]} radius={0.02} smoothness={3} castShadow>
          <meshStandardMaterial color="#455a64" roughness={0.3} metalness={0.4} />
        </RoundedBox>
        {arms.map((p, i) => (
          <group key={i}>
            <mesh position={p}>
              <cylinderGeometry args={[0.02, 0.34, 0.02, 8]} />
              <meshStandardMaterial {...METAL_GREY} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.2, p[2]]} rotation={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.05, 0.08, 0.05, 8]} />
              <meshStandardMaterial {...METAL_BLACK} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.28, p[2]]} rotation={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.01, 0.14, 0.01, 8]} />
              <meshStandardMaterial color="#cfd8dc" roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>
      <DeskLabel text="DRONE · ROTATABLE" />
    </Desk>
  )
}

function ProjectShelf({ position, rotY }) {
  const yPos = [0.85, 0, -0.85]
  const xPos = [-0.8, 0, 0.8]
  const colors = ["#E95420", "#2f9e92", "#5c6d81", "#d4a017", "#7b5bd6", "#2f7ad0", "#c0392b", "#16a085", "#34495e"]
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position} rotation={[0, rotY, 0]}>
        <RoundedBox args={[2.6, 2.6, 0.5]} radius={0.03} smoothness={3} castShadow receiveShadow>
          <meshStandardMaterial color="#26303a" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        {yPos.map((y, i) => (
          <group key={i} position={[0, y, 0.28]}>
            {xPos.map((x, j) => (
              <RoundedBox key={j} args={[0.34, 0.34, 0.34]} radius={0.02} smoothness={2} castShadow position={[x, 0, 0]}>
                <meshStandardMaterial color={colors[(i * 3 + j) % 9]} roughness={0.35} metalness={0.15} />
              </RoundedBox>
            ))}
          </group>
        ))}
        <DeskLabel text="PROJECTS — NRL · SHUTTER · RAINWATER · CROC" y={1.45} />
      </group>
    </RigidBody>
  )
}

function CrocTank({ position }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.72, 0.2, 0.46]} radius={0.03} smoothness={3} castShadow position={[0, 0.16, 0]}>
        <meshStandardMaterial color="#2f3a2f" roughness={0.35} metalness={0.25} />
      </RoundedBox>
      {[-0.17, 0.17].map((z) => (
        <group key={z} position={[0, 0.07, z]}>
          {[-0.22, -0.11, 0, 0.11, 0.22].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.08, 0.02, 10, 18]} />
              <meshStandardMaterial color="#0f1419" roughness={0.4} metalness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0.36, 0.2, 0.01]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.2, 0.14]} />
        <meshStandardMaterial color="#05070c" emissive="#7ccfc7" emissiveIntensity={1.4} />
      </mesh>
      <DeskLabel text="CROC OS · CHAIN WHEELS · OLED · N20" y={0.55} />
    </group>
  )
}

function Robot({ position }) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position}>
        <RoundedBox args={[0.45, 0.9, 0.38]} radius={0.04} smoothness={3} castShadow>
          <meshStandardMaterial color="#2f9e92" roughness={0.3} metalness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial color="#0a0f14" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0.02, 0.52, 0.07]}>
          <planeGeometry args={[0.14, 0.05]} />
          <meshStandardMaterial color="#05070c" emissive="#7ccfc7" emissiveIntensity={2} />
        </mesh>
      </group>
    </RigidBody>
  )
}

export default function Interior({ fps }) {
  const [showResume, setShowResume] = useState(false)
  const { camera } = useThree()

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

      <group position={[-3.4, 0, -4]}>
        <Suspense fallback={<DeskFallback />}>
          <NormalizedModel url="/assets/desk.glb" />
        </Suspense>
        <DeskLabel text="WORKSTATION · DESK + CHAIR + SCREEN" y={1.7} />
      </group>
      <PaperworkDesk position={[4, 0.9, -4]} onOpen={() => setShowResume(true)} />
      <MakerBench position={[-4.2, 0.9, 1.2]} rotY={Math.PI / 2} />
      <ProjectShelf position={[4, 0, 1]} rotY={-Math.PI / 2} />
      <DroneTable position={[0, 0.9, -0.6]} />
      <CrocTank position={[0.4, 0, 1.2]} />
      <Robot position={[0, 0.55, 2.6]} />

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
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, background: '#f7f8f9', padding: 12, borderRadius: 8 }}>{`Ahmed Irfan Akrami
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