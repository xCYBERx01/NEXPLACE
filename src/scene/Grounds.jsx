import { useMemo } from "react"
import { SHELL_Z } from "./layout"

export default function Grounds() {
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
