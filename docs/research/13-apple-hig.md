# 13 — Apple Human Interface Guidelines — Whole Digest

**Thesis:** Principles not rulebook — Clarity, Deference, Depth (1984→2026) + Purpose, Agency, Familiarity, Simplicity (2026 companion). Harmony hardware/software/content, consistent navigation/search/layout, test across settings.

**Verification:** developer.apple.com HIG, Adopting Liquid Glass doc, WWDC25 videos 219/323/356, Apple newsroom 2025-06-09.

## Core Principles

| Principle | Meaning | Test |
|---|---|---|
| Clarity | Legibility every size, precise icons, hierarchy order/spacing/contrast, can answer what to look at/do/how <2s |
| Deference | UI never competes with content; translucency, system fonts, restrained color let work be hero. If screenshot without content is boring → good. |
| Depth | Layers/shadows/realistic motion create hierarchy: background < content < nav floating. Z-order felt without labels. |
| Purpose/Agency/Familiarity/Simplicity | Does this deserve to exist? User feels in control? Uses conventions? Concise hierarchy? |

## App Icon Anatomy (Unified 2025/26, Icon Composer, Xcode)
- Canvas: iOS/iPadOS/macOS 1024×1024 square; watchOS 1088×1088 (allow same grid circular overflow); system masks to squircle rounder than pre-2025 concentric with hardware bezel; tvOS 800×480 rect parallax.
- Vectors First: SVG/PDF foreground layers; PNG only mesh gradients/blur texture; text outlines. Never rasterize what can be vector.
- No Mask Export: Provide full square layers; system handles masking, blur, highlights, shadow, refraction. Including own squircle = jagged breaks highlights.
- Layering 1-4 groups max (Composer enforces). Bottom background, others stack Z. Each = glass pane. Flat frontal > realistic 3D competes.
- Center content, use updated 2025 grid simpler evenly spaced breathing room + circular frame. Test against grids via Apple Design Resources Figma/Sketch.
- Design flat opaque filled overlapping shapes; system adds blur/shadow/specular/lensing/refraction. Add background/gradient inside Composer not Figma.
- No Text, rounder corners bolder weights, softer light→dark gradients; use System Light/Dark gradients for contrast.
- 6 Appearances: Default, Dark, Clear Light/Dark (translucent Liquid Glass), Tinted Light/Dark (monochrome white element + grays mapping). Design once annotate.

## Adaptation Guidance (Adopting Liquid Glass Doc)
- Build in Xcode latest to see auto changes. System frameworks standard components (bars, sheets, popovers, controls) auto adopt material + adapt to element overlap/focus.
- App icons layers dynamic respond lighting; 2026 update deeper Liquid Glass layers incorporated.
- Controls refreshed: Liquid Glass, alive on interaction (toggle knob transforms), capsule rounder forms concentric with window/hardware, extra-large option, tribute spacing. Menus refreshed icons common actions; iPad now menu bar.
- Lightweight harmony: Controls distinct functional layer above apps, morph as need more options/move. Groupings help find controls. Toolbar items automatically grouped. Remove custom backgrounds, use layout/grouping for hierarchy. Organize bar items logically by function/frequency. Use tint selectively primary actions.
- Background extension effect: Mirrors adjacent content gives impression stretching under sidebar/ inspector, blur maintain legibility — perfect hero images filling full width without clipping. Apply per view flexibility.
- Layout: Define layout + navigation structure puts most important content focus; reimagine icon bold layers; be judicious color remains legible light/dark tint; consistent organization layout; correct windows/modals/menus/toolbars; test across platforms.
- Edge-to-edge: Configure icon with Composer, create edge-to-edge via background extension, enhance with scroll extension, adaptable to window sizes, search conventions, custom effects.

## Shared Traits
- Family of system colors adjusted subtle Light/Dark/Increased Contrast harmony with Liquid Glass hue differentiation optimistic.
- Typography refined bolder left-aligned improves readability alerts/onboarding.
- Shapes: Curvature/size/proportion align unified rhythm between what hold and see.
- Content focus: UI should support interaction where needed, unobtrusive when not. Sidebar inset Liquid Glass allows content flow behind.
- Continuity across devices: design anatomy once → scales iPhone narrow vertical, iPad scalable middle, Mac wide expansive; shared content/symbols labels prevent confusion; structure components to scale platform variation as expression not exception.

## For NEX Web Simulation
- Replicate: navigation layer floating above content never glass-on-glass; content cards solid elevated opaque with shadow; chrome as floating translucency group.
- Icon grid replicate 1024 with squircle guides, 1-4 layers SVG.

**NEX Rule:** Deference: icon/content heroes; chrome never steals focus. Test with variety display + a11y settings (Reduce Transparency frostier, Increased Contrast black/white border).
