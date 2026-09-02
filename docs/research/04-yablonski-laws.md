# 04 — Jon Yablonski: Laws of UX (2020, 2nd ed. 2024) — Whole Digest

**Thesis:** Principles from psychology are predictive models for design. Yablonski curates ~10 laws on site lawsofux.com + book expands to 12 chapters + ethics.

**Verification:** lawsofux.com, O'Reilly 2nd ed. contents, Blinkist 6 ideas, UXmatters review Ch1-12, FastCompany 10 illustrated, Bookey Ch2 Fitts/Ch3 Hick.

## All Laws — Verified Definitions + NEX Instantiation

| Law (Origin) | Statement | NEX Example |
|---|---|---|
| **Jakob’s Law** (Nielsen 2000) | Users spend most time on other sites; prefer new sites work like known ones. | Dock bottom, Cmd+K spotlight, X close top-right/left consistently; Snapchat 2018 redesign collapse ~$1B loss cited as Jakob violation. |
| **Fitts’s Law** (Paul Fitts 1954) | Time to acquire target = f(distance, size). Index of Difficulty formula. | Dock icons 56px → 80px hover + infinite edge (screen bezel fastest). Make close hit 28px not 12px. Space gaps ≥8dp. LinkedIn confirm spacing, Tesla infotainment safety examples. |
| **Hick’s Law** (Hick & Hyman 1952) | Decision time increases logarithmically with choices+complexity. | Dock ≤7, grouping, TV remote simplification case. NEX: dock 5-6 vs 15 project icons; spotlight beats menu for >7. |
| **Miller’s Law** (George Miller 1956) | Avg 7±2 items in working memory; actually about chunking, not hard limit (4±1 per modern revision). | Chunk dock, menu ≤5, grid chunks of 4 with filters. Phone number formatting, Nike chunking examples. |
| **Postel’s Law** (Jon Postel, robustness) | Be conservative in what you do, liberal in what you accept. | Forms minimal fields, accept "desing" → "design", drag-drop forgiving, tolerant of 8-10mm fingertip. |
| **Peak-End Rule** (Kahneman) | Judge experience by peak intensity + end, not average. 60s+30s warmer water preferred over 60s cold; colonoscopy longer with gentle end preferred. | Design one peak (boot chord / window wobble) + graceful end (shutdown toast + persisted state). MailChimp anticipation. |
| **Aesthetic-Usability Effect** (Kurosu & Kashimura, Tractinsky) | Attractive = perceived as more usable, + cognition & forgiveness. | OS chrome polish buys goodwill for minor bugs. |
| **Von Restorff Effect** (Hedwig von Restorff) | Among similar objects, differing one remembered. | Sole CTA accent color in grayscale chrome; featured project isolated. |
| **Tesler’s Law** (Larry Tesler, conservation of complexity) | Every system has irreducible complexity; tradeoff user vs system burden. | OS windows/z-index complexity absorbed via auto-tile + bring-to-front; don't hide, manage. |
| **Doherty Threshold** | Productivity stays when system responds <400ms; beyond → flow breaks. | Click → 50ms bounce + 120ms scale + shimmer if >400ms load. |
| **Serial Position Effect** (Ebbinghaus) | Remember first+last in series (primacy/recency). | Dock: Work first, Hire last. Inside window: best project first & last. |
| **Zeigarnik Effect** (Bluma Zeigarnik) | Remember uncompleted/interrupted better. | "2/4 sections visited" + dock dot unread + hidden file hook. |
| **Parkinson’s Law (Law of Triviality variant)** | Work expands to fill time. | Unlimited windows → wander. Constrain via guided 90-sec tour / checklist 3/5 viewed. |
| **Pareto Principle 80/20** | 80% effects from 20% causes. | Polish Work+About 80% traffic; defer calculator easter egg. |
| **Plus Gestalt** Common Region/Proximity/Prägnanz | Group by container/spacing/simplicity. | Window internal layout grouping. |

Techniques tied to laws in book: Contextual Inquiry (Fitts), Chunking (Miller), User Interviews (Postel), etc.

## Research Check
- Book contents 12 chapters verified via UXmatters Ch listing matches O'Reilly. FastCompany 10 laws matches Blinkist core. No contradictions; 2nd ed. deeper psych + methods.

## NEX-OS Applied — Integrated Prescriptions
- **Speed & Reach (Fitts+Doherty+Hick):** Dock edge, large targets, <400ms, ≤5 choices per decision. Metric: time-to-first-project <2s.
- **Standardize (Jakob+Postel):** Be boringly familiar for chrome; liberal for sloppy input. Novelty cost spent once on project storytelling, not OS chrome.
- **Memory (Miller+Serial+VonRestorff+Zeigarnik):** Chunk → anchor start/end → isolate CTA → leave open loop. Order: [Finder][Work-peak][About]...[Hire-isolated last] + footer 3/5.
- **Complexity/Pareto/Peak-End:** Absorb Tesler via onboarding + auto-management; engineer peak + strong end; Pareto polish peak+end first.
- **Ethics Ch11:** With power comes responsibility — don't dark-pattern Zeigarnik addict loops.

**NEX Laws Audit Table per OS part** (see earlier synthesis) used as QA gate before surface polish.
