# NexPlace - "Make It Feel Alive" Rebuild

## Vision
NexPlace is a scroll-driven 3D tech office portfolio. The camera moves along a cinematic, fixed path as the user scrolls, transitioning from an exterior approach through the entrance and arriving at several interactive workstations (desks). Each desk represents a "chapter" where the scroll locks, and the user interacts with a localized UI (e.g., an OS-style interface on a monitor, a physical pegboard).

## Design Tokens

### Color
- **Base**: `#0B0B0B` (Near-black, cinematic)
- **Accent**: `#2f9e92` (Teal - used ONLY for CTAs and live-state indicators)
- **Neutrals**: 
  - `#1A1A1A` (Dark grey for structural elements)
  - `#333333` (Medium grey for secondary details)
  - `#E8E8E8` (Off-white for high-contrast text)

### Typography
- **Display**: Confident, high-personality face for headlines (e.g., "Inter" Bold or a specialized display font).
- **Body/Data**: Workmanlike mono/humanist sans (e.g., "JetBrains Mono" or "Inter").
- **Scale**: 
  - H1: 4rem / 1.1 line-height / tight tracking
  - H2: 2rem
  - Body: 1rem / 1.5 line-height
  - Mono/Label: 0.75rem / uppercase / tracked-out

### Layout
- **Grid**: 12-column strict grid for 2D overlays.
- **Alignment**: Content left-aligned against the grid, breaking out only for full-bleed WebGL moments.

### Motion Principle
"Alive" means every element has inertia and reactivity. Components don't just fade; they respond to velocity, track the cursor with slight lag (springs), and have physical weight (Rapier).

## Technical Roadmap

### 1. Camera Choreography
- **Path**: `THREE.CatmullRomCurve3` defining the dolly move.
- **Drive**: GSAP `ScrollTrigger` mapping scroll progress to curve `t`.
- **Locking**: Implement " chapter-stops" where scroll progress pauses or hands off to local interaction.

### 2. Interaction Layers
- **Cursor**: WebGL-based custom cursor responding to velocity and hover targets.
- **OS Monitor**: Render-to-texture 2D UI for the PC desk.
- **Pegboard**: Rapier-backed draggable tools.

### 3. Performance & Accessibility
- **LCP**: < 1.5s (Desktop) / < 2s (Mobile).
- **Reduced Motion**: Static frames, no auto-animations, simplified transitions.
