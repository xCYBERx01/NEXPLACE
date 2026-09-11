import { CuboidCollider } from "@react-three/rapier"
import { SHELL_X, SHELL_Z, WALL_H, DOOR_H, DOOR_W } from "./layout"

// Invisible collision shell for the FPS lab. Mirrors the BuildingShell
// colliders 1:1 (same half-extents and positions) now that BuildingShell is
// visual-only. Mounted inside <Physics> by FpsWorld — never on landing.
export default function CollisionShell() {
  return (
    <group>
      {/* Floor slab */}
      <CuboidCollider args={[SHELL_X - 0.15, 0.1, SHELL_Z - 0.15]} position={[0, -0.1, 0]} />
      {/* Back wall */}
      <CuboidCollider args={[(SHELL_X * 2 + 0.3) / 2, WALL_H / 2, 0.15]} position={[0, WALL_H / 2, -SHELL_Z]} />
      {/* Side walls */}
      <CuboidCollider args={[0.15, WALL_H / 2, SHELL_Z]} position={[-SHELL_X, WALL_H / 2, 0]} />
      <CuboidCollider args={[0.15, WALL_H / 2, SHELL_Z]} position={[SHELL_X, WALL_H / 2, 0]} />
      {/* Front wall segments */}
      <CuboidCollider args={[(SHELL_X - DOOR_W / 2) / 2, WALL_H / 2, 0.15]} position={[-((SHELL_X + DOOR_W / 2) / 2), WALL_H / 2, SHELL_Z]} />
      <CuboidCollider args={[(SHELL_X - DOOR_W / 2) / 2, WALL_H / 2, 0.15]} position={[(SHELL_X + DOOR_W / 2) / 2, WALL_H / 2, SHELL_Z]} />
      {/* Lintel above the door */}
      <CuboidCollider args={[(DOOR_W + 0.6) / 2, (WALL_H - DOOR_H) / 2, 0.15]} position={[0, (WALL_H + DOOR_H) / 2, SHELL_Z]} />
      {/* Roof */}
      <CuboidCollider args={[(SHELL_X * 2 + 0.3) / 2, 0.15, (SHELL_Z * 2 + 0.3) / 2]} position={[0, WALL_H + 0.15, 0]} />
    </group>
  )
}
