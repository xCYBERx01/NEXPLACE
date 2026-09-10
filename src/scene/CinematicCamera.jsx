import { useMemo } from "react"
import * as THREE from "three"
import { useThree, useFrame } from "@react-three/fiber"

export const STATIONS = [
  { id: 'workstation', name: 'PC Workstation', tRange: [0.2, 0.3], pos: [-3.4, 1.7, -4] },
  { id: 'maker', name: 'Maker Bench', tRange: [0.4, 0.5], pos: [-4.2, 1.6, 1.2] },
  { id: 'shelf', name: 'Project Shelf', tRange: [0.6, 0.7], pos: [4, 1.6, 1] },
  { id: 'drone', name: 'Drone Table', tRange: [0.8, 0.9], pos: [0, 1.6, -0.6] },
]

export const CAMERA_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 4.4, 14.5),   // Start
  new THREE.Vector3(0, 1.6, 5.5),    // Entrance
  new THREE.Vector3(-3.4, 1.7, -4),  // PC Desk
  new THREE.Vector3(-4.2, 1.6, 1.2), // Maker Bench
  new THREE.Vector3(4, 1.6, 1),      // Project Shelf
  new THREE.Vector3(0, 1.6, -0.6),   // Drone Table
])

export const LOOK_AT_TARGETS = [
  new THREE.Vector3(0, 1.9, 0),      // Start -> Entrance
  new THREE.Vector3(-3.4, 1.5, -4), // Entrance -> PC Desk
  new THREE.Vector3(-4.2, 1.5, 1.2), // PC Desk -> Maker Bench
  new THREE.Vector3(4, 1.5, 1),     // Maker Bench -> Project Shelf
  new THREE.Vector3(0, 1.5, -0.6),   // Project Shelf -> Drone Table
]

export default function CinematicCamera({ scrollT, fpsActive }) {
  const { camera } = useThree()
  const targetLook = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (fpsActive) return

    // Current position on curve
    const t = scrollT.current
    const pos = CAMERA_PATH.getPoint(t)

    // Determine current lookAt target based on t
    const targetIdx = Math.min(Math.floor(t * LOOK_AT_TARGETS.length), LOOK_AT_TARGETS.length - 1)
    const look = LOOK_AT_TARGETS[targetIdx]

    camera.position.lerp(pos, 0.1)

    // Smoothly interpolate lookAt
    targetLook.lerp(look, 0.1)
    camera.lookAt(targetLook)
  })

  return null
}
