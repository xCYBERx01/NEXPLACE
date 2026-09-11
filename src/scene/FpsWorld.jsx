import { Physics } from "@react-three/rapier"
import CollisionShell from "./CollisionShell"
import Interior from "../Interior"

// FPS lab world. Lazy-loaded by App.jsx only when the user enters the lab,
// so the Rapier WASM bundle (~2.5MB) is never downloaded on landing.
// BuildingShell (visual-only) stays mounted by App; this adds the invisible
// collision shell plus the physics-backed interior.
export default function FpsWorld({ fps }) {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <CollisionShell />
      <Interior fps={fps} />
    </Physics>
  )
}
