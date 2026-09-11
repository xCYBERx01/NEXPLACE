import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { SHELL_X, SHELL_Z, WALL_H, DOOR_H, DOOR_W } from "./layout"

export function GlassShaderMaterial() {
  const meshRef = useRef(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  return (
    <shaderMaterial
      ref={meshRef}
      transparent
      opacity={0.8}
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#0f1a2a") },
      }}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;

        void main() {
          vec2 uv = vUv;
          float noise = sin(uv.x * 10.0 + uTime) * 0.005;
          vec3 color = uColor + vec3(noise, noise, noise * 0.5);
          gl_FragColor = vec4(color, 0.8);
        }
      `}
    />
  )
}

export default function BuildingShell() {
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
      {/* Floor slab inside the building (walkable — collider lives in CollisionShell) */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[SHELL_X * 2 - 0.3, 0.1, SHELL_Z * 2 - 0.3]} />
        {m.concrete}
      </mesh>

      {/* Back wall (solid) */}
      <mesh position={[0, WALL_H / 2, -SHELL_Z]}>
        <boxGeometry args={[SHELL_X * 2 + 0.3, WALL_H, 0.3]} />
        {m.wall}
      </mesh>
      {/* Side walls (solid) */}
      {[-SHELL_X, SHELL_X].map((x) => (
        <mesh key={x} position={[x, WALL_H / 2, 0]}>
          <boxGeometry args={[0.3, WALL_H, SHELL_Z * 2]} />
          {m.wall}
        </mesh>
      ))}

      {/* Front wall: left segment */}
      <mesh position={[-((SHELL_X + DOOR_W / 2) / 2), WALL_H / 2, SHELL_Z]}>
        <boxGeometry args={[SHELL_X - DOOR_W / 2, WALL_H, 0.3]} />
        {m.wall}
      </mesh>
      {/* Front wall: right segment */}
      <mesh position={[(SHELL_X + DOOR_W / 2) / 2, WALL_H / 2, SHELL_Z]}>
        <boxGeometry args={[SHELL_X - DOOR_W / 2, WALL_H, 0.3]} />
        {m.wall}
      </mesh>
      {/* Lintel above the door */}
      <mesh position={[0, (WALL_H + DOOR_H) / 2, SHELL_Z]}>
        <boxGeometry args={[DOOR_W + 0.6, WALL_H - DOOR_H, 0.3]} />
        {m.wallDark}
      </mesh>

      {/* Glass curtain wall: two panels flanking the open doorway */}
      {[-panelX, panelX].map((x) => (
        <mesh key={x} position={[x, WALL_H / 2 + 0.2, SHELL_Z + 0.06]}>
          <planeGeometry args={[panelW, WALL_H]} />
          <GlassShaderMaterial />
        </mesh>
      ))}
      {mullionX.map((x) => (
        <mesh key={x} position={[x, WALL_H / 2 + 0.2, SHELL_Z + 0.12]}>
          <boxGeometry args={[0.06, WALL_H, 0.06]} />
          {m.mullion}
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, WALL_H + 0.15, 0]}>
        <boxGeometry args={[SHELL_X * 2 + 0.3, 0.3, SHELL_Z * 2 + 0.3]} />
        {m.roof}
      </mesh>

      {/* Sign above the door */}
      <mesh position={[0, 3.55, SHELL_Z + 0.1]}>
        <boxGeometry args={[4.5, 0.7, 0.1]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.5} />
      </mesh>
      <Html position={[0, 3.55, SHELL_Z + 0.24]} center distanceFactor={18} transform sprite>
        <div style={{ fontFamily: '"Space Grotesk", sans-serif', color: "#1a202c", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "10px" }}>
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
