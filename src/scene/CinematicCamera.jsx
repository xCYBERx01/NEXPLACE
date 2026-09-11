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
  const pos = useMemo(() => new THREE.Vector3(), [])
  const lookPos = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (fpsActive) return

    const t = THREE.MathUtils.clamp(scrollT.current, 0, 1)
    CAMERA_PATH.getPoint(t, pos)

    // Frame-rate independent damping (was lerp 0.1: fast machines snapped,
    // slow machines lagged). Clamp delta so tab-switch jumps don't slingshot.
    const d = Math.min(delta, 0.05)
    const lambda = 6
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pos.x, lambda, d)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pos.y, lambda, d)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, pos.z, lambda, d)

    // Blend the look-at target across the segment instead of snapping at
    // chapter boundaries (was floor(t * N): visible look-snaps at
    // t=0.2/0.4/0.6/0.8). Smoothstep keeps the gaze continuous.
    const seg = t * (LOOK_AT_TARGETS.length - 1)
    const i = Math.min(Math.floor(seg), LOOK_AT_TARGETS.length - 2)
    const f = seg - i
    const s = f * f * (3 - 2 * f)
    lookPos.lerpVectors(LOOK_AT_TARGETS[i], LOOK_AT_TARGETS[i + 1], s)

    targetLook.x = THREE.MathUtils.damp(targetLook.x, lookPos.x, lambda, d)
    targetLook.y = THREE.MathUtils.damp(targetLook.y, lookPos.y, lambda, d)
    targetLook.z = THREE.MathUtils.damp(targetLook.z, lookPos.z, lambda, d)
    camera.lookAt(targetLook)
  })

  return null
}
