// Procedural project artwork — deterministic gradient + pattern per project.
// No image assets required; each project gets a distinct identity card.

const GROUP_COLORS = {
  Robotics: ["#E95420", "#7a2d0e"],
  Embedded: ["#2f9e92", "#0d3b37"],
  Software: ["#2f7ad0", "#0e2a52"],
  AI: ["#7b5bd6", "#2c1d5e"],
  Automation: ["#d4a017", "#5c430a"],
}

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h
}

export function artFor(project) {
  const [c1, c2] = GROUP_COLORS[project.group] || ["#5c6d81", "#1a2230"]
  const h = hashStr(project.id)
  const angle = h % 360
  const variant = h % 3
  return { c1, c2, angle, variant }
}

export default function ProjectArt({ project, index = 0, compact = false }) {
  const { c1, c2, angle, variant } = artFor(project)
  const num = String(index + 1).padStart(2, "0")
  const initials = project.name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const pattern =
    variant === 0
      ? `repeating-linear-gradient(${angle}deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 14px)`
      : variant === 1
        ? `radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1.5px)`
        : `repeating-linear-gradient(${(angle + 90) % 180}deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 18px)`

  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "inherit",
        background: `linear-gradient(${angle}deg, ${c1} 0%, #10151c 78%)`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: pattern, backgroundSize: variant === 1 ? "18px 18px" : "auto" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 90% at 80% 100%, ${c2} 0%, transparent 60%)`,
        }}
      />
      {!compact && (
        <span
          style={{
            position: "absolute",
            right: 10,
            bottom: 0,
            fontFamily: '"Inter", sans-serif',
            fontWeight: 900,
            fontSize: "clamp(64px, 10vw, 120px)",
            lineHeight: 0.9,
            color: "rgba(255,255,255,0.16)",
            letterSpacing: "-0.04em",
          }}
        >
          {num}
        </span>
      )}
      <span
        style={{
          position: "absolute",
          left: 12,
          bottom: compact ? 8 : 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: compact ? 10 : 12,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {initials} · {project.group.toUpperCase()}
      </span>
      <span
        style={{
          position: "absolute",
          top: 10,
          left: 12,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {num}
      </span>
    </div>
  )
}
