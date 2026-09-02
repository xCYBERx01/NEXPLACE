# 03 — Jesse James Garrett: The Elements of User Experience (2002, 2nd ed. 2010) — Whole Digest

**Thesis:** UX = 5 planes abstract→concrete, each dependent on lower. Teams fail when they debate surface before strategy. Framework forces sequence, vocabulary, not process prescription.

**Verification:** jjg.net PDF Ch2, UXDesignInstitute, MAD UX, seha.cc, uxglossary.

## The Five Planes (Dependency: lower constrains upper)

1. **Strategy (Why) — Most Abstract**
   - User Needs (external goals from people who use site) + Product Objectives/Business Goals (what org wants). Must be explicit, measurable. Dual track. Example bookstore: users want buy books; org wants sell. NEX Strategy example: User need = recruiter understands who Ahmed is + what he builds + how to hire in <60s. Product objective = 8% contact conversion. Without explicit strategy, every plane wobbles. Pitfalls: assumptions unstated.

2. **Scope (What) — Is this included?**
   - Translation of strategy into requirements. Branching: Software side = Functional Specifications (feature set, what it does, priority), Information side = Content Requirements (what information needed, collection). Must be prioritized, feasible, unambiguous. Documentation forms: Functional spec doc, Content requirements list. Question: "What are we going to make?" Not how. Prevents scope creep + design by fiat/mimicry/default.

3. **Structure (How It Fits Together) — Abstract Architecture**
   - How features/functions interrelate, how users move, where can go. Branches:
     - *Interaction Design* (software) — how system behaves/responses to user, defines error states, conceptual models, how users complete tasks, flow diagrams.
     - *Information Architecture* (information) — how content elements arranged, classified, connected (taxonomies, org schemes hierarchical/matrix/sequential, labeling).
   - Garrett warning: "Good navigation design can’t correct bad information design." Defines nodes + paths; skeleton later defines placement.

4. **Skeleton (Where Things Are) — Concrete Arrangement**
   - Skeleton = concrete expression of abstract structure. Optimizes placement for effect/efficiency. Three components:
     - *Interface Design* (software) — arranging interface elements to enable interaction with functionality; selection of components (buttons, fields), layout.
     - *Navigation Design* (information medium) — screen elements that allow movement through IA: global nav, local, supplementary, contextual, courtesy, search; must help users orient (where am I, where can I go, how to return).
     - *Information Design* (both) — presenting information to facilitate understanding; data display: grouping, hierarchy, legibility.
   - Deliverable: Wireframes (reference for visual + implementation) capturing all skeleton decisions. Conventions help but metaphors mislead — don't overextend desktop metaphor (e.g., fake trash deletes forever).

5. **Surface (What It Looks Like) — Sensory Design**
   - Visual (color, typography, imagery, composition following eye contrast/proximity/alignment), auditory, etc. Handles "follow the eye" — contrast and uniformity guide. Supports skeleton's wayfinding via visual cues (shadow = draggable). Not decoration; must communicate affordance, reinforce structure, meet strategy. Most visible, last decided correctly; surface-first teams undo work.

**Middle Split:** Left = Web as software platform (functional), Right = Web as information medium (hypertext) — same 5 planes, different disciplines per plane. Both sides converge at top.

**Pitfalls Garrett Names:** Design by Default, by Mimicry, by Fiat — vs user-centered.

## Research Check
- Diagram (2000 free download) matches book; 5 planes terminology consistent across 7 sources. Chapter 2 PDF text matches notes. No contradictions.

## NEX-OS Applied — Plane-by-Plane Spec
- **Strategy doc (Day 0, 1 page):** Two sentences + one metric above. If feature (Spotify widget) doesn't serve both sides → out of scope.
- **Scope In/Out/Later (Day 0):** Functional: 4 windows, dock, menu, boot, search Cmd+K. Explicitly Out: email client simulation, filesystem write, themes beyond accent toggle. Information: Each project = Problem, Role, Outcome, Link + 1 hero <15s muted.
- **Structure pass (Day 1, paper):** IA nodes: Desktop (hub) → Windows (nodes). Flow: Dock click → scale-from-icon open → focus z++ → minimize to dock. Error: 6 windows → auto-tile/stack balancing loop (Meadows). Diagram interaction + IA before Figma.
- **Skeleton spec (Day 2, grayscale wireframe):** Dock 64px centered bottom, menu 28px top, window chrome 36px header, 12px radius, nav trunk-testable at skeleton level. Info design vocab: "Projects" not "Excursions".
- **Surface (Day 3, last):** Active window 12px blur shadow + highlight border, inactive dim 60%, glass 4.5:1 contrast, motion spring 250ms respects prefers-reduced-motion.

**NEX Rule:** Work bottom-up; never fix surface if skeleton/structure wrong. Fixes flow down, not up.
