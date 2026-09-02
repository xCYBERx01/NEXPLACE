# 06 — Alla Kholmatova: Design Systems (Smashing, 2017) — Whole Digest

**Thesis:** Effective design system = Interconnected Patterns + Shared Practices coherently organized to serve product purpose. Pattern library ≠ system; practices (create/capture/share/evolve) are half. Purpose shapes patterns; differentiate via design language execution not novelty.

**Verification:** Smashing ebook TOC, andrewclark summary, bookey Ch summaries, jasonjun notes, Feduxery checklist, human-centred notes, reading-notes GitHub.

## Part 1: Foundations (Patterns & Practices)

### Chapter 1 Design Systems Definition
- Patterns = repeating elements combined to create interface: flows, interactions, buttons, fields, icons, colors, typography, microcopy.
- Practices = processes behind patterns: principles, inventory, documentation, governance.
- Different products adopt patterns per purpose: Thomson Reuters Eikon = dense multitasking data utility; FutureLearn = spacious single-task reading/discussion. Purpose dictates pattern.
- System effective if improves coherence + workflow; measure by how well parts work together to achieve purpose.

### Chapter 2 Design Principles
- Solid principles = foundation. Qualities: actionable, opinionated, memorable (3-5 in constant use), purpose-driven, testable/evolvable. Start with purpose, informs patterns. Example: "Appropriateness over strict consistency" vs "Prioritize first impressions." Generic "be consistent" fails.

### Chapter 3 Functional Patterns (Concrete, HTML-like)
- Tangible modules facilitating user behaviors/actions: button, header, form, menu, card, nav, window chrome. Group by *purpose/behavior* not visual similarity. Start with functional inventory: What does user *do*? Map elements→behaviors. Define structure, variants, content rules, all states. Patterns evolve, behaviors remain. Link to user behaviors makes robust modules. Essential/fundamental first.

### Chapter 4 Perceptual Patterns (Abstract, CSS/JS-like)
- Descriptive styles expressing brand/personality: color, typography, iconography, shapes, animations, tone, shadows, spacing. Perceptual patterns connect parts; always present even if not designed (accidental brand). Must be designed holistically (color+type+spacing together). Ethos/brand examples. Define via mood boards, style tiles, element collages. Signature memorable patterns first. Role of color = shared use, clear guidelines, should feel like it acts.

### Chapter 5 Shared Language
- Critical for groups to create together. Pattern language from Christopher Alexander (The Timeless Way of Building: great places not by one architect but shared knowledge patterns). Must be articulated + shared to create things reliably.
- **Naming is design:** Collaborative, metaphorical, personality-driven names (PromoTile vs ImageWithTextBlock) are memorable, guide usage, reduce duplicates. Characteristics: based on metaphors, personality, communicate purpose, guide where to use, inspiration. Process: open to team Slack channel, test with users, bring their language, kudos for winning name.
- **Practices to keep alive:** Make patterns visible (pattern wall in journey order), refer by name daily, induction story, regular catchups, glossary + up-to-date pattern library, promote across teams/disciplines.
- Language before interfaces (Abby Covert How to Make Sense of Any Mess).

## Part 2: How Systems Evolve (Planning, Inventory, Maintenance)

### Chapter 6 Parameters of Your System
- Qualities: flexible vs strict, cohesive vs fragmented, etc. Manage risks/downsides per culture. Loose system for distributed/creative culture; strict for centralized/mandated. Forcing strictness on wrong culture kills adoption.

### Chapters 7 Parameters: Planning Work, Getting Support
- Getting support requires selling at right stage (not before deadline), allies, pitch per audience (execs = speed/cost/brand risk; eng = debt/efficiency).

### Chapters 8-9 Systemizing Functional & Perceptual Patterns
- Functional exercise: purpose-directed interface inventory → group by purpose → identify key behaviors → sketch structure → define patterns with specificity scale (content structure, variants) → group consistently → audit eliminate duplicates.
- Perceptual exercise: agree on principles → collect/group existing styles → define patterns/building blocks holistically → start with purpose, be specific, establish signature.

### Chapter 10 Pattern Libraries
- Goal, structure (alphabetical/hierarchical/purpose-based), contribution model (centralized vs distributed/ambassador), content vs structure focus, abstraction clarity, documentation (name, purpose, example, variants, guidance). Prioritize content over tool decisions (Google Docs can start). Multidisciplinary resilient.
- Align parts: design approach mirrored in front-end architecture; patterns follow principles; language applied in design, code, library.
- Code+Design+Library approaches to naming/understanding of purpose must be same.

## Research Check
- Structure 10 chapters stable across sources; FutureLearn/Eikon examples repeated; pattern language concept verified Alexander quote. No contradictions.

## NEX-OS Applied — Kholmatova Lens
- **Purpose:** Empowering recruiter to evaluate craft quickly via explorable OS vs generic scroll site. Values: spacious? No — NEX is efficient tool-like (like Eikon) not airy discussion. So choose dense efficiency vs spacious reading intentionally.
- **Functional patterns for NEX:** Window, Dock, Menu, Command palette, Card — grouped by behavior: Navigation (dock/menu/command), Content Display (card/detail), Feedback (toast/badge). Define each by what user does.
- **Perceptual patterns:** One brand persona: "2005 power-user dream meets 2026 craft" — traits precise/luminous/tactile. Define holistically before per-component.
- **Shared Language:** Names: Window not Pane, Dock not Bar, Spotlight not Search. Collaborative naming via Slack; glossary; pattern wall in Figma order journey.
- **Effectiveness test:** Do patterns + practices help achieve purpose (get hired)? If not, gap must close.

**NEX Rule:** Don't systematize by visual similarity (all buttons together). Systematize by user behavior purpose. That prevents duplicate patterns with same behavior different look.
