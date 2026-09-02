import { useState, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { Html, KeyboardControls } from "@react-three/drei"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import Ecctrl from "ecctrl"

const WALL = "#c9ced6"
const FLOOR = "#8a919c"
const ACCENT = "#2f9e92"
const WOOD = "#8b7355"
const METAL = "#4a4a4a"
const PLASTIC_DARK = "#2a2f37"
const PLASTIC_LIGHT = "#d4d4d4"
const SCREEN_EMISSION = "#1a1a2e"
const LED_GREEN = "#7ccfc7"
const LED_RED = "#ff3b30"

function WorkshopRoom() {
  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[11, 0.1, 11]} position={[0, -0.1, 0]} />
        <mesh position={[0, -0.12, 0]} receiveShadow>
          <boxGeometry args={[22, 0.24, 22]} />
          <meshStandardMaterial color={FLOOR} roughness={0.9} />
        </mesh>
      </RigidBody>
      {[
        { pos: [0, 2.5, -11], args: [22, 5, 0.3] },
        { pos: [0, 2.5, 11], args: [22, 5, 0.3] },
        { pos: [-11, 2.5, 0], args: [0.3, 5, 22] },
        { pos: [11, 2.5, 0], args: [0.3, 5, 22] }
      ].map((w, i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh position={w.pos}>
            <boxGeometry args={w.args} />
            <meshStandardMaterial color={WALL} roughness={0.85} />
          </mesh>
        </RigidBody>
      ))}
      {/* Ceiling so the room is a real enclosed space (not a black void) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[22, 0.3, 22]} />
          <meshStandardMaterial color="#d8dde3" roughness={0.9} />
        </mesh>
      </RigidBody>
      {/* Ceiling light fixtures (emissive planes) + real point lights */}
      {[-4, 0, 4].map((x) => (
        <mesh key={x} position={[x, 4.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 0.4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} />
        </mesh>
      ))}
      {[-4, 0, 4].map((x) => (
        <pointLight key={x} position={[x, 4.2, 0]} intensity={30} distance={18} decay={2} color="#ffffff" />
      ))}
      <pointLight position={[0, 2.5, 6]} intensity={12} distance={10} decay={2} color="#7ccfc7" />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  )
}

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
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: '#dfe6ee',
        background: 'rgba(20,26,31,0.9)',
        padding: '4px 9px',
        borderRadius: 6,
        border: '1px solid #2a333e',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>{text}</div>
    </Html>
  )
}

// Click the canvas to lock the pointer; ecctrl's follow-cam listens to document
// mousemove and rotates only when document.pointerLockElement is set (or on drag),
// so this enables real FPS mouse-look without a separate PointerLockControls.
function EnablePointerLock() {
  const { gl } = useThree()
  useEffect(() => {
    const dom = gl.domElement
    const onClick = () => {
      if (!document.pointerLockElement) dom.requestPointerLock()
    }
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
          <mesh>
            <boxGeometry args={[0.72, 0.44, 0.02]} />
            <meshStandardMaterial color="#0a0f14" emissive={SCREEN_EMISSION} emissiveIntensity={0.6} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.76, 0.48, 0.06]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.04, 0.16, 0.04, 8]} />
            <meshStandardMaterial color={METAL} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.12, 0.04, 0.12, 8]} />
            <meshStandardMaterial color={METAL} roughness={0.3} />
          </mesh>
        </group>
      ))}
      <group position={[1.1, 0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.6, 0.55]} />
          <meshStandardMaterial color="#0a0f14" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <boxGeometry args={[0.24, 0.02, 0.51]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.26]}>
          <boxGeometry args={[0.24, 0.12, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
        <mesh position={[0.1, 0, -0.26]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={LED_GREEN} emissive={LED_GREEN} emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0, -0.29, 0.27]}>
          <boxGeometry args={[0.2, 0.02, 0.02]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} />
        </mesh>
      </group>
      <group position={[0, 0.18, -0.2]}>
        <mesh>
          <boxGeometry args={[0.4, 0.02, 0.12]} />
          <meshStandardMaterial color={PLASTIC_DARK} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[0.38, 0.01, 0.1]} />
          <meshStandardMaterial color={PLASTIC_LIGHT} roughness={0.4} />
        </mesh>
        {[-0.16, -0.08, 0, 0.08, 0.16].map((x, i) => (
          <mesh key={i} position={[x, -0.005, -0.04]}>
            <boxGeometry args={[0.02, 0.005, 0.02]} />
            <meshStandardMaterial color={PLASTIC_LIGHT} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0, -0.005, 0.03]}>
          <boxGeometry args={[0.12, 0.005, 0.02]} />
          <meshStandardMaterial color={PLASTIC_LIGHT} roughness={0.3} />
        </mesh>
        <mesh position={[0.15, -0.01, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.04]} />
          <meshStandardMaterial color={PLASTIC_DARK} roughness={0.5} />
        </mesh>
        <mesh position={[0.15, -0.005, 0]}>
          <boxGeometry args={[0.07, 0.01, 0.03]} />
          <meshStandardMaterial color={PLASTIC_LIGHT} roughness={0.4} />
        </mesh>
      </group>
      <DeskLabel text="GAMING WORKSTATION · 3 MONITORS" />
    </Desk>
  )
}

function PaperworkDesk({ onOpen }) {
  return (
    <Desk position={[4, 0.9, -3.5]} w={2} d={0.8} color="#4a4038">
      {[0, 0.03, 0.06, 0.09].map((y, i) => (
        <group key={i} position={[-0.2, 0.02 + y, 0.08]}>
          <mesh>
            <boxGeometry args={[0.5, 0.015, 0.35]} />
            <meshStandardMaterial color="#f4f4f0" roughness={0.4} />
          </mesh>
          {i === 0 && (
            <group position={[0.15, 0.01, 0.15]}>
              <mesh rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[0.02, 0.005, 8, 6]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
              <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.015, 0.003, 6, 4]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
            </group>
          )}
        </group>
      ))}
      <mesh position={[0.3, 0.08, 0.1]}>
        <cylinderGeometry args={[0.02, 0.08, 0.02, 8]} />
        <meshStandardMaterial color="#5a4a36" roughness={0.4} />
      </mesh>
      {[0, 0.02, 0.04].map((y, i) => (
        <mesh key={i} position={[0.3, 0.08 + y, 0.1]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.008, 0.04, 0.008, 8]} />
          <meshStandardMaterial color={i === 0 ? "#e74c3c" : "#3498db"} />
        </mesh>
      ))}
      <DeskLabel text="PAPERWORK · RESUME · PRESS E" />
      <Html position={[0, 0.5, 0]} center distanceFactor={8} transform sprite>
        <button onClick={onOpen} style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 11,
          fontWeight: 600,
          color: '#fff',
          background: ACCENT,
          padding: '8px 14px',
          borderRadius: 8,
          border: 0,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease'
        }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)' }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}>
          Open Resume
        </button>
      </Html>
    </Desk>
  )
}

function MakerBench() {
  const pegXPositions = [-1.2, -0.6, 0, 0.6, 1.2]
  const pegYOffsets = [0.6, 0, -0.6]
  return (
    <group position={[-4, 0.9, 3.5]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.07, 1.1]} />
          <meshStandardMaterial color="#5a4a36" roughness={0.7} />
        </mesh>
      </RigidBody>
      <mesh position={[0, 1.7, -1.3]}>
        <boxGeometry args={[3, 1.4, 0.05]} />
        <meshStandardMaterial color="#6b5e4f" />
      </mesh>
      {pegXPositions.map((x, xi) => (
        <group key={xi}>
          {pegYOffsets.map((y, yi) => (
            <mesh key={yi} position={[x, 1.7 + (yi % 2) * 0.15, -1.28]}>
              <cylinderGeometry args={[0.03, 0.03, 0.03, 8]} />
              <meshStandardMaterial color="#2a333e" />
            </mesh>
          ))}
        </group>
      ))}
      <group position={[-0.8, 0.15, 0]}>
        <group>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.03, 0.2, 0.03]} />
            <meshStandardMaterial color={METAL} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.12, 0.06, 0.08]} />
            <meshStandardMaterial color="#8b4513" roughness={0.5} />
          </mesh>
        </group>
        <mesh position={[0.2, 0, -0.1]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.02, 0.15, 0.02]} />
          <meshStandardMaterial color={METAL} roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 0.08, -0.1]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.06, 0.03, 0.06]} />
          <meshStandardMaterial color="#e67e22" roughness={0.4} />
        </mesh>
        <mesh position={[-0.2, 0, -0.15]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.02, 0.12, 0.02]} />
          <meshStandardMaterial color={METAL} roughness={0.3} />
        </mesh>
        <mesh position={[-0.2, 0.06, -0.15]} rotation={[0, 0, -Math.PI / 6]}>
          <torusGeometry args={[0.06, 0.02, 8, 6]} />
          <meshStandardMaterial color={METAL} roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[0.8, 0.1, -0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.3]} />
        <meshStandardMaterial color="#8b4513" roughness={0.5} />
      </mesh>
      {[0, 0.05, 0.1].map((z, i) => (
        <mesh key={i} position={[0.8, 0.1 + z, -0.2]} rotation={[Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]}>
          <boxGeometry args={[0.03, 0.03, 0.03]} />
          <meshStandardMaterial color={i === 0 ? "#e67e22" : i === 1 ? "#3498db" : "#9b59b6"} roughness={0.4} />
        </mesh>
      ))}
      <DeskLabel text="MAKER BENCH · PEGBOARD" />
    </group>
  )
}

function DroneTable() {
  const armConfigs = [
    [0.35, 0, 0.02],
    [-0.35, 0, 0.02],
    [0, 0.02, 0.35],
    [0, 0.02, -0.35]
  ]
  return (
    <Desk position={[0, 0.9, 4]} w={1.6} d={0.8} color="#2e3a48">
      <group position={[0, 0.35, 0]} rotation={[0.5, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color="#37474f" roughness={0.4} metalness={0.2} />
        </mesh>
        {armConfigs.map((p, i) => (
          <group key={i}>
            <mesh position={p}>
              <cylinderGeometry args={[0.02, 0.3, 0.02, 8]} />
              <meshStandardMaterial color="#455a64" roughness={0.3} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.15, p[2]]} rotation={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.06, 0.03, 0.06]} />
              <meshStandardMaterial color="#2a2f37" roughness={0.4} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.18, p[2]]} rotation={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.04, 0.08, 0.04, 8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.22, p[2]]} rotation={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.01, 0.1, 0.01, 8]} />
              <meshStandardMaterial color="#cfd8dc" roughness={0.3} />
            </mesh>
            <mesh position={[p[0], p[1] + 0.22, p[2]]} rotation={[0, 0.4, Math.PI / 2]}>
              <cylinderGeometry args={[0.01, 0.1, 0.01, 8]} />
              <meshStandardMaterial color="#cfd8dc" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>
      <DeskLabel text="DRONE · ROTATABLE" />
    </Desk>
  )
}

function ProjectShelf() {
  const shelfYPositions = [0.8, 0, -0.8]
  const shelfXPositions = [-0.8, 0, 0.8]
  const colors = ["#E95420", "#2f9e92", "#5c6d81", "#d4a017", "#7b5bd6", "#2f7ad0", "#c0392b", "#16a085", "#34495e"]
  return (
    <group position={[4, 0, 3]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 2.6, 0.6]} />
          <meshStandardMaterial color="#2a333e" roughness={0.4} />
        </mesh>
      </RigidBody>
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.33]}>
          <boxGeometry args={[0.02, 2.5, 0.55]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
        </mesh>
      ))}
      {shelfYPositions.map((y, i) => (
        <group key={i} position={[0, y, 0.36]}>
          {shelfXPositions.map((x, j) => (
            <mesh key={j} castShadow position={[x, 0.22, 0]}>
              <boxGeometry args={[0.34, 0.3, 0.3]} />
              <meshStandardMaterial color={colors[(i * 3 + j) % colors.length]} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      <DeskLabel text="PROJECTS — NRL · SHUTTER · RAINWATER · CROC" y={1.4} />
    </group>
  )
}

function CrocTank() {
  return (
    <group position={[0, 0.06, 0]}>
      <mesh castShadow position={[0, 0.16, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.46]} />
        <meshStandardMaterial color="#2f3a2f" roughness={0.4} metalness={0.1} />
      </mesh>
      {[-0.25, 0.25].map((z) => (
        <group key={z} position={[0, 0.06, z]}>
          {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.09, 0.024, 10, 18]} />
              <meshStandardMaterial color="#0f1419" roughness={0.4} />
            </mesh>
          ))}
          {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
            <mesh key={i + 5} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.03, 0.01, 8, 6]} />
              <meshStandardMaterial color="#0a0f14" roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.24, 0.18]} />
        <meshStandardMaterial color="#0a0f14" emissive="#7ccfc7" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.35, 0.2, 0.01]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.26, 0.2]} />
        <meshStandardMaterial color="#000000" roughness={0.2} />
      </mesh>
      <mesh position={[0.35, 0.2, 0.011]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.22, 0.16]} />
        <meshStandardMaterial color="#000000" emissive="#00ff00" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.12, 0.15]}>
        <cylinderGeometry args={[0.05, 0.08, 0.05, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.12, -0.15]}>
        <cylinderGeometry args={[0.05, 0.08, 0.05, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.16, 0.15]}>
        <cylinderGeometry args={[0.03, 0.02, 0.03, 8]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.16, -0.15]}>
        <cylinderGeometry args={[0.03, 0.02, 0.03, 8]} />
        <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.1, 0.26, 0]}>
        <cylinderGeometry args={[0.02, 0.15, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 0.41, 0]}>
        <coneGeometry args={[0.03, 0.06, 8, 1]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.6} />
      </mesh>
      <DeskLabel text="CROC OS · CHAIN WHEELS · OLED · N20" y={0.55} />
    </group>
  )
}

export default function Workshop() {
  const [showResume, setShowResume] = useState(false)
  const { camera } = useThree()
  useEffect(() => {
    function onKey(e) {
      if (e.code === "KeyE") {
        // Paperwork desk sits at [4, 0.9, -3.5] — open resume when close enough.
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
  }, [camera])
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <WorkshopRoom />
      <GamingStation />
      <PaperworkDesk onOpen={() => setShowResume(true)} />
      <MakerBench />
      <DroneTable />
      <ProjectShelf />
      <group position={[1.5, 0, 0.5]}><CrocTank /></group>
      <RigidBody type="fixed" colliders="cuboid">
        <group position={[0, 0.6, -1]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 1.05, 0.4]} />
            <meshStandardMaterial color="#2f9e92" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#0a0f14" emissive="#7ccfc7" emissiveIntensity={0.8} />
          </mesh>
          {[-0.04, 0.04].map((x, i) => (
            <mesh key={i} position={[x, 0.6, 0.08]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={1.2} />
            </mesh>
          ))}
          <mesh position={[0, 0.67, 0]}>
            <cylinderGeometry args={[0.01, 0.1, 0.01, 8]} />
            <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.6} />
          </mesh>
          {[-0.3, 0.3].map((x, i) => (
            <group key={i} position={[x, 0.3, 0]}>
              <mesh>
                <cylinderGeometry args={[0.04, 0.3, 0.04, 8]} />
                <meshStandardMaterial color="#2f9e92" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0, -0.15]}>
                <boxGeometry args={[0.08, 0.06, 0.08]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      </RigidBody>
      <KeyboardControls map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["ShiftLeft", "ShiftRight"] }
      ]}>
        <Ecctrl
          position={[0, 1.3, 6]}
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
        >
          <mesh castShadow>
            <capsuleGeometry args={[0.26, 0.75, 8, 16]} />
            <meshStandardMaterial color={ACCENT} roughness={0.3} metalness={0.2} />
          </mesh>
        </Ecctrl>
      </KeyboardControls>
      <EnablePointerLock />
      {showResume && (
        <Html fullscreen>
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'rgba(6,10,14,0.72)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            placeItems: 'center',
            padding: 20
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: '#fff',
              color: '#0A0F14',
              maxWidth: 640,
              width: '100%',
              borderRadius: 12,
              padding: 24,
              maxHeight: '86vh',
              overflow: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: '"Source Serif 4", serif', fontWeight: 600, letterSpacing: '-0.5px' }}>Ahmed Irfan Akrami — Resume</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, background: '#f7f8f9', padding: 12, borderRadius: 8, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>{`Ahmed Irfan Akrami
Robotics & AI Engineer — NRL 007 VoltEdge
Croc OS v0.5.3 (ESP32/SH1106) · Meadow · Kharcha
EdgeBot · Field Shutter · Drone · Moon Rover
IoT Telemetry · Field Analyzer · ProjectDirec`}</pre>
              <button onClick={() => setShowResume(false)} style={{ marginTop: 12, padding: '8px 14px', background: '#0A0F14', color: '#fff', border: 0, borderRadius: 8, cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s ease' }} onMouseEnter={(e) => { e.target.style.background = '#1a1f2e' }} onMouseLeave={(e) => { e.target.style.background = '#0A0F14' }}>
                Close (Esc)
              </button>
            </div>
          </div>
        </Html>
      )}
    </Physics>
  )
}