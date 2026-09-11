import { Suspense } from "react"
import * as THREE from "three"
import { Html, RoundedBox, useGLTF } from "@react-three/drei"
import { useMemo } from "react"
import OSInterface from "../os/OSInterface"
import { projects } from "../os/data"

export const ACCENT = "#2f9e92"

// Shared material recipes (PBR)
export const WOOD_TOP = { color: "#a97e50", roughness: 0.35, metalness: 0.05 }
export const WOOD_DARK = { color: "#6d5133", roughness: 0.4, metalness: 0.05 }
export const METAL_BLACK = { color: "#1c1f24", roughness: 0.35, metalness: 0.6 }
export const METAL_GREY = { color: "#4a4f57", roughness: 0.4, metalness: 0.7 }

// Visual-only furniture (no physics). The FPS lab wraps these in fixed
// RigidBodies (see Interior.jsx); the scroll flythrough renders them as-is
// so landing never downloads the Rapier WASM bundle.

export function DeskVisual({ position, w = 2.2, d = 0.9, color = WOOD_TOP, children }) {
  const halfW = w / 2
  const halfD = d / 2
  return (
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
  )
}

export function DeskLabel({ text, y = 0.9 }) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={8} transform sprite>
      <div style={{
        fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#e8eef5',
        background: 'rgba(13,18,24,0.85)', padding: '4px 9px', borderRadius: 6,
        border: '1px solid #2a333e', whiteSpace: 'nowrap', letterSpacing: '0.02em'
      }}>{text}</div>
    </Html>
  )
}

// Loads a GLB and normalizes it: recenters x/z, sits it on the floor (y=0),
// and scales to a target height. This makes any source model (even ones with
// odd internal node scales) drop in predictably.
export function NormalizedModel({ url, position, rotation = [0, 0, 0], targetHeight }) {
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

export function DeskFallback() {
  return (
    <RoundedBox args={[2.2, 0.07, 0.8]} radius={0.03} smoothness={4} castShadow receiveShadow position={[0, 0.9, 0]}>
      <meshStandardMaterial {...WOOD_TOP} />
    </RoundedBox>
  )
}

export function PaperworkDeskVisual({ position, onOpen }) {
  return (
    <DeskVisual position={position} w={1.9} d={0.7} color={WOOD_DARK}>
      {[0, 0.02, 0.04, 0.06].map((y, i) => (
        <RoundedBox key={i} args={[0.5, 0.014, 0.34]} radius={0.005} position={[-0.15, 0.05 + y, 0.08]}>
          <meshStandardMaterial color="#f2efe8" roughness={0.6} />
        </RoundedBox>
      ))}
      <DeskLabel text="PAPERWORK · RESUME · PRESS E" />
      <Html position={[0, 0.5, 0]} center distanceFactor={8} transform sprite>
        <button onClick={onOpen} style={{ fontFamily: '"Manrope", sans-serif', fontSize: 11, fontWeight: 600, color: '#fff', background: ACCENT, padding: '8px 14px', borderRadius: 8, border: 0, cursor: 'pointer' }}>Open Resume</button>
      </Html>
    </DeskVisual>
  )
}

export function MakerBenchFrame({ position, rotY, children }) {
  const pegX = [-1, -0.5, 0, 0.5, 1]
  return (
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
      {children}
      <DeskLabel text="MAKER BENCH · INTERACTIVE TOOLS" />
    </group>
  )
}

export function BenchToolsStatic() {
  return (
    <group>
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.24, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
          <meshStandardMaterial color={i % 2 ? "#c0392b" : "#2f9e92"} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export function DroneTableVisual({ position }) {
  const arms = [[0.35, 0, 0.02], [-0.35, 0, 0.02], [0, 0.02, 0.35], [0, 0.02, -0.35]]
  return (
    <DeskVisual position={position} w={1.6} d={0.8} color={WOOD_TOP}>
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
    </DeskVisual>
  )
}

export function ProjectShelfVisual({ position, rotY }) {
  const yPos = [0.85, 0, -0.85]
  const xPos = [-0.8, 0, 0.8]
  const colors = ["#E95420", "#2f9e92", "#5c6d81", "#d4a017", "#7b5bd6", "#2f7ad0", "#c0392b", "#16a085", "#34495e"]
  return (
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
  )
}

export function CrocTankVisual({ position }) {
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

export function RobotVisual({ position }) {
  return (
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
  )
}

export function WorkstationVisual({ position, osEnabled = true }) {
  return (
    <group position={position}>
      <Suspense fallback={<DeskFallback />}>
        <NormalizedModel url="/assets/desk.glb" />
      </Suspense>
      {osEnabled ? (
      <Html
        position={[0, 1.5, 0]}
        center
        distanceFactor={5}
        transform
        sprite
        style={{
          width: '400px',
          height: '200px',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ transform: 'scale(1)', width: '100%', height: '100%' }}>
          <OSInterface projects={projects} />
        </div>
      </Html>
      ) : (
      /* Static monitor poster: zero DOM cost until the camera first reaches
         the workstation — the live OS texture mounts on arrival (see
         WorkshopVisual) and stays mounted afterwards. */
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[1.6, 0.8]} />
        <meshBasicMaterial color="#05070c" />
      </mesh>
      )}
      <DeskLabel text="WORKSTATION · OS PORTAL" y={1.7} />
    </group>
  )
}
