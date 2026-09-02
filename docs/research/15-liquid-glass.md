# 15 — Liquid Glass (Apple 2025-26) — Whole Digest

**Announcement:** WWDC25 June 9 2025 Cupertino → iOS26, iPadOS26, macOS Tahoe 26, watchOS26, tvOS26 unified broadest design update ever. Evolved via WWDC26 June 2026 tweaks (slider transparency ultra-clear→fully tinted, sidebar full-edge refraction, icons additional layers) after polarizing reaction readability.

**Material Definition:**
- New dynamic material combines optical glass properties with fluidity sense. Emerged collaboration design+engineering, realtime rendering specular highlights reacting to movement/gyro/light. Builds from Aqua → iOS7 blurs → iPhone X fluidity → Dynamic Island flexibility → visionOS dimensionality, but not recreation of physical material; it's *meta-material* dynamically bends/shapes light shifting.

**Layers System (holistic):**
- Highlights, Shadow, Illumination, Tint, Blur, adaptive layers continuously shift tint/shadow/dynamic range based on behind content. Small symbols: light→dark flip for legibility; larger menus/sidebars contextual adapt but not flip. Tint generates tones based brightness mimicking colored glass.

**Behavior:**
- Translucent reflects + refracts surroundings, color informed by surroundings intelligently adapts light/dark. Size adaptive: flex/morph larger → simulates thicker more substantial: deeper richer shadows, more pronounced lensing/refraction, softer light scattering aiding legibility. Scroll edge effects dissolve content into background lifting glass visually above moving content ensuring legibility; adaptive.

**Variants:**
- **Regular:** Most versatile, fully adaptive affects look/feel/motion, responsive factors, works any size over any content, provides legibility regardless. Use 90% chrome: sidebars, toolbars, tab bars.
- **Clear:** Permanently more transparent NOT adaptive, allows media richness shine through, needs dimming layer darkening underlying content else legibility worse. Only use if ALL 3 true: over media-rich, dimming won't hurt content layer, foreground bold/bright enough legible. Else Regular. Never mix variants same hierarchy. Localized dimming for small footprint.

**Accessibility Built-in:** Reduced Transparency → frostier obscures more; Increased Contrast → predominantly black/white + border; Reduced Motion → decreases intensity disables elastic; automatic via standard components. Provide slider user adjusts ultra-clear→fully tinted.

**Controls & Surfaces:**
- Controls out of Liquid Glass distinct functional layer sits above apps, groupings help find. Controls morph: sliders/toggles knob transforms into glass during interaction, buttons morph into menus/popovers via `matchedGeometry`. Shape hardware-concentric rounder corners nested. Extra-large control option for labels/accents.
- Tab bars/sidebars redesigned: iOS26 tab bars shrink on scroll down focus content keeping nav accessible, expand on scroll up fluidly; iPadOS/macOS sidebars refract content behind + reflect wallpaper, grounded edge-to-edge not floating. Refinements 2026: sidebars expand to full edge window with refraction continuing beneath not cutting off; icons retain color. Provide background extension effect mirroring adjacent content impression stretching under sidebar with blur to maintain legibility — perfect hero images filling full width.
- Dialogs/sheets morph out of presenting buttons; sheets increased corner radius half sheets inset allowing content peek, expand to more opaque; action sheets spring from specific action not bottom.
- Lists/tables larger row height padding increased corner radius matching curvature.
- System experiences: Lock Screen time crafted Liquid Glass fluid adapts behind photo subject; Home Screen Dock/widgets multiple layers specular highlights Light/Dark/Clear/Tinted appearances customizable; menu bar in macOS completely transparent makes display feel larger.

**Adoption Guidance (developer.apple.com):**
- Build with Xcode 26 SDK to see auto; leverage system frameworks automatic adoption via SwiftUI/UIKit/AppKit bars sheets popovers controls dynamically adapt to overlap/focus.
- API: `glassEffect(.regular, in: .rect(cornerRadius:16))` , `GlassEffectContainer(spacing:40)` **critical batch for performance + morphing** , `glassEffectID(_,in:)` , `glassEffectTransition(.matchedGeometry)` , `GlassEffectContainer` essential group visual correctness (glass cannot sample other glass), `toolbarSpacer` grouping, `buttonStyle(.glass/.glassProminent)` , `backgroundExtensionEffect()` , scroll edge APIs.
- Test with variety display + accessibility settings; custom elements need manual adaptation test; controls adapt automatically.
- Custom: Apply `glassEffect` modifier capsule default, shape/tint for emphasis, `.interactive()` iOS scaling bouncing shimmering. Combine multiple via container; control tint via `.tint()` respecting physicality selective primary not all.

**Web Approximation (CSS) Tiered:**
- Tier1 Cheap ZStack Opacity 80% 100% browser: `background: color-mix(in srgb,var(--bg)12%,transparent); backdrop-filter: blur(16px) saturate(180%) brightness(1.08); border 1px rgba(255,255,255,.18); shadow 0 8px 32px rgba(0,0,0,.12) inset...` + JS luminance toggle.
- Tier2 True Refraction Chromium-only: SVG feDisplacementMap with SDF squircle map neutral grey #808080 center ramp scale -42 (must be negative magnifying) blur 0-4px max; generated via `tomagranate/liquid-glass` 5KB lib. Safari/Firefox fallback Tier1.

**Performance Rule:** Combine custom Liquid Glass via `GlassEffectContainer` to optimize + fluid morph; don't glass-on-glass; navigation layer only not content cards solid.

**Controversy & Iteration:** 2025 polarized readability difficult; Apple diffuses complex content behind creating depth separation, adds slider. Kick-off WWDC26 "bold leap then iterate".

**Verification:** Apple newsroom + 2 developer docs + 3 WWDC videos transcripts cross-checked; recipe stable.

**NEX Takeaway:** Float navigation chrome above content via Liquid Glass Regular; content shells opaque; batch chrome container; scroll edge dissolve 24px gradient; provide transparency slider respecting prefers-reduced-transparency.
