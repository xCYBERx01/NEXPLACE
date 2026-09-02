import { useState, useEffect, useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Html, KeyboardControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import Ecctrl from "ecctrl"

const ACCENT = "#2f9e92"
const WOOD = "#8b7355"
const METAL = "#4a4a4a"
const PLASTIC_DARK = "#2a2f37"
const PLASTIC_LIGHT = "#d4d4d4"

function Desk({ position, w = 2.2, d = 0.9, h = 0.06, color = WOOD, children }) {
  const halfW = w / 2
  const halfD = d / 2
  const legY = -h / 2 - 0.25
  const supportY = -h / 2 - 0.1
  const legPositions = [
    [-halfW + 0.1, -halfD + 0.1],
    [halfW - 0.1, -halfD + 0.1],
    [-halfW + 0.1, halfD - 0.1],
    [halfW - 0.1, halfD - 0.1]
  ]
  const supportPositions = [
    [-halfW + 0.2, 0, -halfD + 0.2],
    [halfW - 0.2, 0, -halfD + 0.2],
    [-halfW + 0.2, 0, halfD - 0.2],
    [halfW - 0.2, 0, halfD - 0.2]
  ]
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={color} roughness={0.3} />
        </mesh>
        {legPositions.map((legPos, i) => {
          const pos = [legPos[0], legY, legPos[1]]
          return (
            <mesh key={i} position={pos}>
              <boxGeometry args={[0.1, 0.5, 0.1]} />
              <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
          )
        })}
        {supportPositions.map((supportPos, i) => {
          const pos = [supportPos[0], supportY, supportPos[2]]
          return (
            <mesh key={i} position={pos}>
              <boxGeometry args={[0.05, 0.2, 0.05]} />
              <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
          )
        })}
        {children}
      </group>
    </RigidBody>
  )
}

function DeskLabel({ text, y = 0.9 }) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={8} transform sprite>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#dfe6ee',
        background: 'rgba(20,26,31,0.9)', padding: '4px 9px', borderRadius: 6,
        border: '1px solid #2a333e', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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

function GamingStation() {
  const monitorPositions = [-0.6, 0, 0.6]
  return (
    <Desk position={[-4, 0.9, -3.5]} w={2.6} d={1} color={WOOD}>
      {monitorPositions.map((x, i) => (
        <group key={i} position={[x, 0.62, 0]}>
          <mesh><boxGeometry args={[0.72, 0.44, 0.02]} /><meshStandardMaterial color="#0a0f14" emissive="#1a1a2e" emissiveIntensity={0.6} /></mesh>
          <mesh><boxGeometry args={[0.76, 0.48, 0.06]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} /></mesh>
          <mesh position={[0, -0.16, 0]}><cylinderGeometry args={[0.04, 0.16, 0.04, 8]} /><meshStandardMaterial color={METAL} roughness={0.3} /></mesh>
          <mesh position={[0, -0.32, 0]}><cylinderGeometry args={[0.12, 0.04, 0.12, 8]} /><meshStandardMaterial color={METAL} roughness={0.3} /></mesh>
        </group>
      ))}
      <group position={[1.1, 0.35, 0]}>
        <mesh castShadow><boxGeometry args={[0.28, 0.6, 0.55]} /><meshStandardMaterial color="#0a0f14" roughness={0.2} metalness={0.1} /></mesh>
        <mesh position={[0, -0.29, 0.27]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} /></mesh>
        <mesh position={[0.1, 0, -0.26]}><sphereGeometry args={[0.02, 8, 8]} /><meshStandardMaterial color="#7ccfc7" emissive="#7ccfc7" emissiveIntensity={1.2} /></mesh>
      </group>
      <group position={[0, 0.18, -0.2]}>
        <mesh><boxGeometry args={[0.4, 0.02, 0.12]} /><meshStandardMaterial color={PLASTIC_DARK} roughness={0.5} /></mesh>
        {[-0.16, -0.08, 0, 0.08, 0.16].map((x, i) => (
          <mesh key={i} position={[x, -0.005, -0.04]}><boxGeometry args={[0.02, 0.005, 0.02]} /><meshStandardMaterial color={PLASTIC_LIGHT} roughness={0.3} /></mesh>
        ))}
        <mesh position={[0.15, -0.01, 0]}><boxGeometry args={[0.08, 0.02, 0.04]} /><meshStandardMaterial color={PLASTIC_DARK} roughness={0.5} /></mesh>
      </group>
      <DeskLabel text="GAMING WORKSTATION · 3 MONITORS" />
    </Desk>
  )
}

function PaperworkDesk({ onOpen }) {
  return (
    <Desk position={[4, 0.9, -3.5]} w={2} d={0.8} color="#4a4038">
      {[0, 0.03, 0.06].map((y, i) => (
        <group key={i} position={[-0.2, 0.02 + y, 0.08]}>
          <mesh><boxGeometry args={[0.5, 0.015, 0.35]} /><meshStandardMaterial color="#f4f4f0" roughness={0.4} /></mesh>
        </group>
      ))}
      {[0, 0.02, 0.04].map((y, i) => (
        <mesh key={i} position={[0.3, 0.08 + y, 0.1]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.008, 0.04, 0.008, 8]} />
          <meshStandardMaterial color={i === 0 ? "#e74c3c" : "#3498db"} />
        </mesh>
      ))}
      <DeskLabel text="PAPERWORK · RESUME · PRESS E" />
      <Html position={[0, 0.5, 0]} center distanceFactor={8} transform sprite>
        <button onClick={onOpen} style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, fontWeight: 600, color: '#fff', background: ACCENT, padding: '8px 14px', borderRadius: 8, border: 0, cursor: 'pointer' }}>Open Resume</button>
      </Html>
    </Desk>
  )
}

function MakerBench() {
  const pegX = [-1, -0.5, 0, 0.5, 1]
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={[-4, 0.9, 3.5]}>
        <mesh castShadow receiveShadow><boxGeometry args={[3, 0.07, 1.1]} /><meshStandardMaterial color="#5a4a36" roughness={0.7} /></mesh>
        <mesh position={[0, 1.7, -1.3]}><boxGeometry args={[3, 1.4, 0.05]} /><meshStandardMaterial color="#6b5e4f" /></mesh>
        {pegX.map((x, i) => (
          <mesh key={i} position={[x, 1.7 + (i % 2) * 0.25, -1.28]}><cylinderGeometry args={[0.05, 0.05, 0.05, 12]} /><meshStandardMaterial color="#2a333e" /></mesh>
        ))}
        {[-0.8, 0, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.15, 0]} rotation={[0, i * 0.5, 0]}><boxGeometry args={[0.5, 0.06, 0.1]} /><meshStandardMaterial color={i === 0 ? "#c0392b" : "#2f9e92"} /></mesh>
        ))}
        <DeskLabel text="MAKER BENCH · PEGBOARD" />
      </group>
    </RigidBody>
  )
}

function DroneTable() {
  const armConfigs = [[0.35, 0, 0.02], [-0.35, 0, 0.02], [0, 0.02, 0.35], [0, 0.02, -0.35]]
  return (
    <Desk position={[0, 0.9, 4]} w={1.6} d={0.8} color="#2e3a48">
      <group position={[0, 0.35, 0]} rotation={[0.5, 0.3, 0]}>
        <mesh><boxGeometry args={[0.3, 0.06, 0.3]} /><meshStandardMaterial color="#37474f" roughness={0.4} metalness={0.2} /></mesh>
        {armConfigs.map((p, i) => (
          <group key={i}>
            <mesh position={p}><cylinderGeometry args={[0.02, 0.3, 0.02, 8]} /><meshStandardMaterial color="#455a64" roughness={0.3} /></mesh>
            <mesh position={[p[0], p[1] + 0.18, p[2]]} rotation={[0, 0.4, 0]}><cylinderGeometry args={[0.04, 0.08, 0.04, 8]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} /></mesh>
            <mesh position={[p[0], p[1] + 0.24, p[2]]} rotation={[0, 0.4, 0]}><cylinderGeometry args={[0.01, 0.1, 0.01, 8]} /><meshStandardMaterial color="#cfd8dc" roughness={0.3} /></mesh>
          </group>
        ))}
      </group>
      <DeskLabel text="DRONE · ROTATABLE" />
    </Desk>
  )
}

function ProjectShelf() {
  const yPos = [0.8, 0, -0.8]
  const xPos = [-0.8, 0, 0.8]
  const colors = ["#E95420", "#2f9e92", "#5c6d81", "#d4a017", "#7b5bd6", "#2f7ad0", "#c0392b", "#16a085", "#34495e"]
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={[4, 0, 3]}>
        <mesh castShadow receiveShadow><boxGeometry args={[2.6, 2.6, 0.6]} /><meshStandardMaterial color="#2a333e" roughness={0.4} /></mesh>
        {yPos.map((y, i) => (
          <group key={i} position={[0, y, 0.36]}>
            {xPos.map((x, j) => (
              <mesh key={j} castShadow position={[x, 0.22, 0]}><boxGeometry args={[0.34, 0.3, 0.3]} /><meshStandardMaterial color={colors[(i * 3 + j) % 9]} roughness={0.5} /></mesh>
            ))}
          </group>
        ))}
        <DeskLabel text="PROJECTS — NRL · SHUTTER · RAINWATER · CROC" y={1.4} />
      </group>
    </RigidBody>
  )
}

function CrocTank() {
  return (
    <group position={[0, 0.06, 0]}>
      <mesh castShadow position={[0, 0.16, 0]}><boxGeometry args={[0.7, 0.2, 0.46]} /><meshStandardMaterial color="#2f3a2f" roughness={0.4} metalness={0.1} /></mesh>
      {[-0.16, 0.16].map((z) => (
        <group key={z} position={[0, 0.06, z]}>
          {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.09, 0.024, 10, 18]} /><meshStandardMaterial color="#0f1419" roughness={0.4} /></mesh>
          ))}
        </group>
      ))}
      <mesh position={[0.35, 0.2, 0.02]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[0.22, 0.16]} /><meshStandardMaterial color="#0a0f14" emissive="#7ccfc7" emissiveIntensity={1.2} /></mesh>
      <DeskLabel text="CROC OS · CHAIN WHEELS · OLED · N20" y={0.55} />
    </group>
  )
}

function Robot() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={[0, 0.6, -1]}>
        <mesh castShadow><boxGeometry args={[0.5, 1.05, 0.4]} /><meshStandardMaterial color="#2f9e92" roughness={0.4} metalness={0.2} /></mesh>
        <mesh position={[0, 0.55, 0]}><sphereGeometry args={[0.12, 12, 12]} /><meshStandardMaterial color="#0a0f14" emissive="#7ccfc7" emissiveIntensity={0.8} /></mesh>
        {[-0.04, 0.04].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0.08]}><sphereGeometry args={[0.02, 8, 8]} /><meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={1.2} /></mesh>
        ))}
      </group>
    </RigidBody>
  )
}

export default function Interior({ fps }) {
  const [showResume, setShowResume] = useState(false)
  const { camera } = useThree()

  useEffect(() => {
    if (!fps) return
    function onKey(e) {
      if (e.code === "KeyE") {
        const dx = camera.position.x - 4
        const dz = camera.position.z - -3.5
        if (Math.hypot(dx, dz) < 1.9) {
          setShowResume(v => {
            const next = !v
            if (next && document.pointerLockElement) document.exitPointerLock()
            return next
          })
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [fps, camera])

  return (
    <group>
      {/* Interior floor (visual detail over the shell slab) */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[10.6, 0.04, 10.6]} />
        <meshStandardMaterial color="#8a919c" roughness={0.9} />
      </mesh>
      {/* Ceiling lights */}
      {[-4, 0, 4].map((x) => (
        <group key={x}>
          <mesh position={[x, 4.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.4, 0.35]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} />
          </mesh>
          <pointLight position={[x, 3.7, 0]} intensity={26} distance={14} decay={2} color="#ffffff" />
        </group>
      ))}
      <pointLight position={[0, 2.2, 4]} intensity={10} distance={9} decay={2} color="#7ccfc7" />

      <GamingStation />
      <PaperworkDesk onOpen={() => setShowResume(true)} />
      <MakerBench />
      <DroneTable />
      <ProjectShelf />
      <group position={[1.5, 0, 0.5]}><CrocTank /></group>
      <Robot />

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