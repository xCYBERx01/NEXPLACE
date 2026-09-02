# 08 — Adam Wathan & Steve Schoger: Refactoring UI (2018) — Whole Digest

**Thesis:** Design with tactics, not talent. Most "ugly" = lacking constrained systems + hierarchy, not creativity. 200+ pages, 9 sections 50+ visual chapters, before/after.

**Verification:** refactoringui.com TOC, HowToes complete summary, Mohetios notes, dev>notes, superbook, iamaatoh essay, maibuith notes, Medium 7 tips.

## Full Section Map
1. Starting from Scratch (feature not layout, detail later, limit choices, personality)
2. Hierarchy (visual hierarchy is everything)
3. Layout & Spacing
4. Typography
5. Color
6. Images & Icons (not detailed here but: good photos, consistent contrast, intended size, beware user-uploaded)
7. Depth (light source, shadows, overlap)
8. Structure/Finishing (supercharge defaults, accent borders, backgrounds, empty states, fewer borders, think outside box)
9. Leveling Up

## Core System Principles (Repeatable Tactics)

### Limit Choices — Systematize Everything
- Define upfront: colors 8-10 shades each, font sizes from hand-picked scale, spacing scale, shadows 5 options, radii, opacity, border widths. Build once, pick quickly. "Decision fatigue is real." Infinity choices → wasted debate 14 vs 15px padding.

### Grayscale First
- Design in grayscale to force hierarchy via spacing/contrast/size not color crutch. Add color last as refinement.

### Hierarchy is Everything
- Not all elements equal. Strategies:
  - De-emphasize to emphasize (make secondary smaller/lighter/lower contrast, not primary huge).
  - Size isn't everything — use weight + color. Secondary = 400 weight + gray-600 not thin. Balance weight/contrast: low-contrast heavier weight.
  - Don't use grey text on colored backgrounds — washed vibrates. Use lighter/same-hue version hand-picked via HSL Lightness/Saturation tweak, or opacity 0.7 white that bleeds.
  - Labels last resort: 10-12px uppercase tracking-wider gray-500 never competing with data.
  - Separate visual hierarchy from document hierarchy; Semantics secondary (destructive not auto big red; importance matters).

### Layout & Spacing System
- **Start with too much whitespace, then remove** — you'll never remove enough.
- **Constrained scale:** e.g., 4,8,12,16,24,32,48,64,96,128,192,256 — no two values closer than 25% relative diff. Linear scale fails (12→16 =33% visible, 500→520=4% invisible). Hand-pick.
- **Type scale similar:** hand-picked 12,14,16,18,20,24,30,36,48,64 — avoid em for sizes; fixed scale. Don't use fractional.
- **Ambiguous spacing:** Group spacing must be obviously larger than within-group. Don't fill whole screen — constrain text 45-75ch (20-35em) and forms 300-500px. Give extra space, never hurt.
- **Grids are overrated:** Don't force everything fluid; only shrink component if needs to. Relative sizing doesn't scale (large elements shrink faster). Think in columns, shrink canvas easier; responsive mobile first.

### Typography
- **Type scale:** Small jumps low end, larger high end. Hand-crafted. Avoid <400 weight for UI (too hard small); if de-emphasize, lighter color/smaller size instead. Two weights enough: normal 400-500 + heavy 600-700.
- **Good fonts:** Ignore <5 weights (often poorly crafted); popular = good via sort; steals allowed; develop intuition.
- **Legibility:** Headlines tight letterspacing + short x-height (Futura); body wider + taller lowercase (Proxima). Keep line length 45-75 chars (20-35em via em width) ; baseline not center for vertical; line-height proportional — small text larger (12@1.5,16@1.5-1.75,36+@1.25); Align with readability (avoid centered long text, right-align numbers, justify with hyphenation).
- **Links:** Not every link needs color; use heavier weight/darker, color on hover for ancillary.
- **Tracking:** Mostly leave alone; tighten headlines -0.02em, open small caps 0.05em.

### Color (HSL)
- **Ditch HEX for HSL:** Hue position wheel, Saturation vivid 0 grey→100 intense, Lightness 0 black→100 white → intuitive adjustment.
- **You need more colors than you think:** Greys 8-10 (text/bg/panels/controls), Primary 5-10 shades (mid = button), Accent each 5-10 (green/yellow/red/blue). Example: need 10 colors ×5-10 shades for complex UI.
- **Define shades up front:** Pick base shade that works as button bg. Darkest reserved for text alerts, lightest as tint bg — alert component great place to pick edges. Fill gaps with HSL adjustments.
- **Don't let lightness kill saturation:** Increase saturation as lightness moves away from 50% else washed pastels. Rotate hue ≤20-30° lighter for depth.
- **Greys aren't grey:** Cool blue grey (#f1f5f9) or warm (#f7f5f3) adds personality without color.
- **Accessible not ugly:** Flip contrast — dark colored text on light tinted bg (text-blue-900 on bg-blue-50) else light grey on color vibrates. Never rely on color alone (blindness) — reinforce with icon/text/underline. Contrast small text 4.5:1, large 3:1.
- **Psychology:** Blue safe/familiar, gold expensive/sophisticated, pink fun/not serious — choose per personality limited.

### Depth (Light Source)
- **Emulate light from above:** Top edge facing up → slightly lighter than face via top border/inset shadow (hand-pick lighter, not semi-transparent white that desaturates). Shadow below only: small dark offset tight blur. Sharp vs soft differentiates elevation.
- **Shadows convey elevation:** Small soft = raised button; large diffused = modal dialog. Closer = more focus. System of ~5 shadows: define smallest/largest then linear middle.
- **Two-part shadow:** Small sharp (direct) + large soft (ambient) for realism.
- **Color depth:** Lighter than bg appears raised; darker feels inset/well. Short vertically offset shadows no blur for inset.
- **Overlap to create layers:** Overlap cards/avatars creates depth without extra shadow; image-on-image give invisible border.

### Images & Backgrounds
- **Good photos** essential; text needs consistent contrast; everything has intended size; beware user-uploaded content (crop to intended size handling).
- **Decorate backgrounds:** Change bg color (gradient two hues ≤30° apart, repeating patterns), add shape/illustration/world map, don't overlook empty states (first-class component illustrate action).

### Finishing
- **Supercharge defaults, Add color with accent borders (4px brand top border cheap effective without painting whole UI), Use fewer borders (replace with shadow/bg color/spacing — border = visual noise; using many feels busy), Think outside box.**

## Research Check
- Tactics list consistent across 7 sources; spacing/type scales numbers identical. No contradictions.

## NEX-OS Applied
- **Grayscale test before color:** Window chrome hierarchy must read blurred/squinted.
- **Spacing system:** Use LINUKE scale 4,8,12,16,24,32,48,64,96 but enforce 25% rule; window padding 24, group gap 32 > item gap 12.
- **Type:** Two weights 400+600, grey de-emphasis via color not thin weight; hero 36/48 bold, body 14/16 regular.
- **Color:** Build 10 greys upfront via HSL; primary teal 10 shades; accent borders for cards not full fill; don't grey text on teal header — use light teal text.
- **Depth:** Two-part shadow for windows: 0 4px 6px rgba + 0 10px 20px rgba + top highlight inset.

**NEX Rule:** Define systems before building; pick from scale, don't invent per pixel.
