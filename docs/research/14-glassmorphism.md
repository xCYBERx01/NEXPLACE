# 14 — Glassmorphism — Whole Digest

**History:** Coined Michal Malewicz Hype4 2020-11; popularized by Apple macOS Big Sur + Microsoft Windows 11 Fluent Acrylic → superseded by Apple Liquid Glass 2025-26 (refraction/motion). Needs busy backdrop or invisible.

**Core Recipe (Verified 2025-26):**
- `background: rgba(255,255,255,0.12)` fill 0.12-0.25 range (0.05 heavy blur low alpha maximal frost → 0.3-0.5 light blur subtle); alpha too high at 0.6 = solid card blur invisible waste GPU.
- `backdrop-filter: blur(12px) saturate(160-180%)` star; 8-16px production sweet spot (Apple nav 20px, Framer 10px, range 4-22, Resend 25); saturate vivid prevents gray muddy. Chrome 10-16, mobile cap 10-12.
- `border: 1px solid rgba(255,255,255,0.25)` edge refraction + a11y border surviving forced-colors mode where transparency stripped.
- `border-radius:16px`, `box-shadow:0 8px 32px rgba(0,0,0,0.18-0.25)` lift large soft separates.

**Verified Production CSS Annotated (superdesign.dev):**
```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgba(255, 255, 255, 0.85); } /* nearly opaque fallback readable */
}
```

**Common Mistake:** `filter:blur()` vs `backdrop-filter:blur()` — former blurs element itself+fuzzy blob text unreadable; desire is behind element only. Must use backdrop.

**Josh Comeau Next-Level Optimization (Dec 2024):**
Problem: backdrop-filter only considers pixels directly behind element → near colorful element not included → no soft glow; scroll color flickers when longboard scrolled out of viewport.
Solution: extend backdrop to 200% height as child, mask trim via mask-image (since overflow/clip not work Chrome), pointer-events:none, plus top gradient to block flicker, bottom edge separate node smaller blur 8px + brightness.
Code patterns (see detailed snippet in fetched article): parent relative, child absolute inset0 height200% backdrop-filter, mask-image linear gradient black 0-50% transparent 50-100%, pointer-events none; backdrop-edge bottom translateY(100%) etc. 96.3% support mask-image; backdrop-filter 97% per caniuse.

**Performance & Pitfalls:**
- GPU-composited per frame sampling behind pixels Gaussian kernel → multiplies cost per blurred element. Mid-range Android Snapdragon 665: single 12px 60→40fps, two 25fps; Apple Silicon 110fps fine.
- Cost scales with blurred area + kernel radius. Advice: limit 2-3 simultaneous blur in viewport max, cap 16px, never animate blur radius (animate opacity/transform), avoid stacking layers same z, `will-change` sparingly, `contain: paint/layout` limits reflow.
- Behavior: turning element into containing block traps position:fixed descendants → classic modal break.

**Contrast / Accessibility — Biggest Problem:**
- WWAG 4.5:1 normal 3:1 large required *worst-case* not average — glass effective bg unpredictable shifts dark→light as scroll, white text fails over light region. NNG Megan Brown: pose accessibility challenges if overused.
- Solutions: increase alpha, text-shadow safety net 0 1px 3px rgba(0,0,0,.3), constrain bg to gradients/abstract not photos, dark text light glass appropriately, worst-case contrast badge checks, prefers-contrast/more + prefers-reduced-transparency solid fallback, Windows forced-colors border survives.
- Full-height glass sidebar janks on older Android never animate blur radius.

**When to Use / Not Use:**
- Works hero/feature cards, overlays, navbars over imagery where hierarchy without hiding.
- Fails data-dense tables, long-form reading (blur halos), small form inputs — Apple keeps glass on chrome never reading surface; NNG iOS26 Liquid Glass review "Liquid Glass Is Cracked" found regressions dense content. Dashboard: glass sidebar/headers not data grid.

**Browser Support Baseline:** Widely available → Chrome/Edge 76+ 2019, Firefox 103+ 2022, Safari 9+ -webkit prefix unprefixed since Safari 18 Sept 2024 96% global. Keep prefix; ship @supports fallback anyway.

**Verification:** Cross-checked 7 articles (PixCode 2025, Comeau 2024, socialanimal, css-studio, frontend-hero, superdesign 2026 generator) — recipe identical, pitfalls repeated.

**NEX Application:** Use only on navigation chrome (top menu, dock) not reading surfaces; 12px blur, fallback 85% opaque; verify text on glass ≥4.5:1 worst-case; limit count; batch via single container if possible.
