# NEX-OS Research Vault — Master Index

**Status:** Whole-book digestion complete. Verified via web cross-search 2026-08-31. Sources noted per digest. Build mode active, no NEX-OS code edited yet (vault only).

**LINUKE Constraint:** Data only from `src/os/data.js` + `src/index.css` tokens; wallpapers you author mapped to `--wall-nex`.

## Vault Map (18 Digests)

| # | Book / Paradigm | File | Core Principle for NEX-OS |
|---|---|---|---|
| 01 | Norman — Design of Everyday Things | `01-norman-doet.md` | Signify every affordance, bridge gulfs, mapping, constraints, 7 stages checklist |
| 02 | Krug — Don't Make Me Think | `02-krug-dont-make-me-think.md` | Scan/satisfice/muddle, Billboard 5 tools, trunk test, mindless choices, omit words twice |
| 03 | Garrett — Elements of UX | `03-garrett-elements.md` | 5 planes Strategy→Surface, dependency lower constrains upper, In/Out/Later scope |
| 04 | Yablonski — Laws of UX | `04-yablonski-laws.md` | 10+ laws: Jakob/Fitts/Hick/Miller/Postel/Peak-End/Aesthetic/VonRestorff/Tesler/Doherty/Serial/Zeigarnik/Pareto/Parkinson |
| 05 | Meadows — Thinking in Systems | `05-meadows-thinking-in-systems.md` | Stocks/flows, B/R loops, delays, bounded rationality, 8 traps, 12 leverage 12→1 |
| 06 | Kholmatova — Design Systems | `06-kholmatova-design-systems.md` | Patterns vs Practices, functional vs perceptual, shared language naming |
| 07 | Couldwell — Laying Foundations | `07-couldwell-laying-foundations.md` | Foundations→Components→Patterns, iterative vs wholesale, living docs, governance |
| 08 | Refactoring UI | `08-refactoring-ui.md` | Tactics not talent, grayscale first, hierarchy via weight/color, spacing scale 25%, HSL shades, two-part shadows |
| 09 | Practical UI | `09-practical-ui.md` | Logic not magic, B&W first color affordance only, 4.5:1, squint test, single sans |
| 10 | Saffer — Microinteractions | `10-saffer-microinteractions.md` | Trigger→Rules→Feedback→Loops/Modes, timings 100-500ms, bring data forward |
| 11 | Hara — Designing Design | `11-hara-designing-design.md` | Emptiness as vessel (yanagiba), Ma/Yohaku/Shiro, exformation, horizon |
| 12 | Type & Layout | `12-type-layout.md` | 6 variables hierarchy, tracking/kerning/leading 140-160%, grid types, 45-75ch |
| 13 | Apple HIG | `13-apple-hig.md` | Clarity/Deference/Depth, 1024 icon grid 1-4 layers, background extension |
| 14 | Glassmorphism | `14-glassmorphism.md` | rgba0.12 blur12 saturate160 border0.25 radius16 shadow0 8 32; fallback 85% opaque; pitfall 2-3 blur max |
| 15 | Liquid Glass | `15-liquid-glass.md` | Regular vs Clear, reflect/refract, GlassEffectContainer, adaptive tint, scroll edge |
| 16 | Agentic/Spatial/Narrative | `16-agentic-spatial-narrative.md` | Intent→Orchestration→Receipt autonomy slider; Window/Volume/Ornament; smart timelines post-dashboard |
| 17 | Neo-Brutalism / Ultra-Contextual | `17-neo-ultra.md` | Bento+raw hybrid, spring/mono, dissolve toolbars contextual anchoring, agentic tokens |
| 18 | YouTube Channels | `18-youtube.md` | Mizko/DesignCourse/AJ&Smart/Flux/HighRes learning path + AI summary workflow |

## How This Was Eaten Whole (Research Method)

For each digest, cross-read 3-7 sources: publisher TOC, author PDFs (JJG Ch2, FIT Meadows PDF), Blinkist, Bookey, HowToes, Medium Bootcamp, NNG, Superbook, official docs (Apple Developer), production CSS live sites (superdesign), aggregator reviews (Unicorn Club). Verified definitions stable; contradictions flagged (e.g., Miller 7±2 vs modern 4±1). Captured chapter maps whole, not just quotes.

## Immediate NEX-OS Decisions Enabled (See Cluster Digests)

- Palette NEX Obsidian (#0A0F14 bg) + teal accent limited to interactive passes Refactoring grayscale + Practical 4.5:1 + Hara empty
- Type Inter+JetBrains + serif display only scale 12/14/20/28/40 1.5 line-height 60ch
- IA 7 apps In/Out per Garrett/Kholmatova; system stocks/flows per Meadows; window limits 4 balancing
- Chrome yanagiba empty + two-part shadow + fewer borders; dock 56→80px Fitts; glass Regular only on nav

**Next:** On your approval, synthesize 00-index into applied tokens file `docs/research/applied-nex-tokens.md` and proceed to build NEX-OS with vault as spec. No wallpapers/views edited until vault review.
