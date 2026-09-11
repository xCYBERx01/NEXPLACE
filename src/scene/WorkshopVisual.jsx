import { useEffect, useState } from "react"
import { Html } from "@react-three/drei"
import {
  WorkstationVisual,
  PaperworkDeskVisual,
  MakerBenchFrame,
  BenchToolsStatic,
  DroneTableVisual,
  ProjectShelfVisual,
  CrocTankVisual,
  RobotVisual,
} from "./furniture"

// Scroll-mode workshop: identical layout to the FPS lab (see Interior.jsx)
// but visual-only — no Rapier imports, so landing never downloads the ~2.5MB
// physics bundle. Mounted by App.jsx when fps === false.

// Room is x ~ [-5.2, 5.2], z ~ [-5.2, 5.2], door at +z center (x=0).
// Layout: back wall = desks, left = maker bench, right = shelf,
// center = drone hero + croc, robot greets near the door.
export default function WorkshopVisual({ workstationActive = false }) {
  const [showResume, setShowResume] = useState(false)
  // Lazy-mount the live OS texture on first arrival at the workstation
  // station (t 0.2–0.3) and keep it mounted — avoids paying the 1024px
  // DOM-to-texture cost on landing while preventing re-upload jank when
  // scrolling back. Latches: never unmounts once seen.
  const [osSeen, setOsSeen] = useState(false)
  useEffect(() => {
    if (workstationActive) setOsSeen(true)
  }, [workstationActive])

  return (
    <group>
      {/* Interior floor (visual detail) */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[10.5, 0.02, 10.5]} />
        <meshStandardMaterial color="#8a919c" roughness={0.9} />
      </mesh>
      {/* Ceiling light bars + warm accent */}
      {[-4, 0, 4].map((x) => (
        <group key={x}>
          <mesh position={[x, 4.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 0.3]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          <pointLight position={[x, 3.6, 0]} intensity={30} distance={15} decay={2} color="#ffffff" />
        </group>
      ))}
      <pointLight position={[0, 2.2, 3]} intensity={12} distance={9} decay={2} color="#7ccfc7" />

      <group position={[-3.4, 0, -4]}>
        <WorkstationVisual position={[0, 0, 0]} osEnabled={osSeen} />
      </group>
      <PaperworkDeskVisual position={[4, 0.9, -4]} onOpen={() => setShowResume(true)} />
      <MakerBenchFrame position={[-4.2, 0.9, 1.2]} rotY={Math.PI / 2}>
        <BenchToolsStatic />
      </MakerBenchFrame>
      <ProjectShelfVisual position={[4, 0, 1]} rotY={-Math.PI / 2} />
      <DroneTableVisual position={[0, 0.9, -0.6]} />
      <CrocTankVisual position={[0.4, 0, 1.2]} />
      <RobotVisual position={[0, 0.55, 2.6]} />

      {showResume && (
        <Html fullscreen>
          <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(6,10,14,0.72)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 20 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', color: '#0A0F14', maxWidth: 640, width: '100%', borderRadius: 12, padding: 24, maxHeight: '86vh', overflow: 'auto' }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: '"Source Serif 4", serif' }}>Ahmed Irfan Akrami — Resume</h2>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: '"DM Mono", monospace', fontSize: 12, background: '#f7f8f9', padding: 12, borderRadius: 8 }}>{`Ahmed Irfan Akrami
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
