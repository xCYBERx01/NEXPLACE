import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function CursorMesh() {
  const { pointer } = useThree()
  const meshRef = useRef()

  const physics = useRef({
    pos: new THREE.Vector2(0, 0),
    vel: new THREE.Vector2(0, 0),
    spring: 0.15,
    friction: 0.8
  })

  useFrame(() => {
    const p = physics.current

    // Target position is the pointer
    const targetX = pointer.x
    const targetY = pointer.y

    // Spring physics: Accel = (Target - Pos) * Spring
    const ax = (targetX - p.pos.x) * p.spring
    const ay = (targetY - p.pos.y) * p.spring

    p.vel.x += ax
    p.vel.y += ay
    p.vel.multiplyScalar(p.friction)

    p.pos.x += p.vel.x
    p.pos.y += p.vel.y

    if (meshRef.current) {
      meshRef.current.position.set(p.pos.x, p.pos.y, 0)

      // Velocity-based stretch
      const speed = p.vel.length()
      const stretch = 1 + speed * 2

      // Rotate mesh to align with velocity
      const angle = Math.atan2(p.vel.y, p.vel.x)
      meshRef.current.rotation.z = angle
      meshRef.current.scale.set(stretch, 1, 1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[0.04, 0.01]} />
      <meshBasicMaterial color="#2f9e92" transparent opacity={0.8} />
    </mesh>
  )
}

export default function Cursor() {
  return (
    <div className="cursor-layer" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <Canvas
      className="cursor-canvas"
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
      >
        <CursorMesh />
      </Canvas>
    </div>
  )
}
