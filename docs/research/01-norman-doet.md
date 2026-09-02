# 01 — Don Norman: The Design of Everyday Things (2013 Revised) — Whole Digest

**Thesis:** Bad design blames users; good design exploits psychology so behavior is guided without thought. Human-Centered Design (HCD) puts needs/capabilities/behavior first, iterated via Observe → Generate → Prototype → Test.

**Verification:** Summaries cross-checked via Medium Bootcamp Ch1-2, HowToes 2024, growthsummary 9 key ideas, melissadu notes, Blinkist 9 ideas.

## Full Chapter Map (7 Chapters + Psychology)

### Ch1 The Psychopathology of Everyday Things
- Intro via Norman Doors (push/pull failures). Core failure = ignoring relationship user↔technology.
- Introduces **Discoverability** (what actions possible + current state determinable) and **Understanding** (what it means, how to use).
- **HCD defined:** p219: "ensuring people's needs are met... positive and enjoyable... solving the right problem, meeting human needs/capabilities." Four activities: Observation, Idea Generation, Prototyping, Testing — iterative, not linear.
- **Double Diamond:** Diverge (find right problem) → Converge (define) → Diverge (solutions) → Converge (deliver).

### The 6 Fundamental Principles (Discoverability + Understanding)
1. **Affordances:** Relationship object capabilities ↔ person capabilities that determines possible actions. Exists whether perceived or not. J.J. Gibson origin. Chair affords sitting; lifting depends on strength. Anti-affordance (roadblock) prevents.
2. **Signifiers:** Perceivable indicators of *where/how* to act. MORE important than affordances on screens. "PUSH" plate, trail, `Click here`. If door needs label → failed signifier. Norman 2013 clarified misuse: designers said "affordance" when they meant signifier.
3. **Constraints:** Limit/guide actions. Four types: Physical (battery one-way), Logical (place controls spatially grouped), Semantic (meaning, e.g., sit-to-control), Cultural (learned conventions, red=stop). Invisible when well done.
4. **Mapping:** Spatial/functional relationship controls→effects. Best is *natural mapping*: car seat controls shaped like seat, stove knobs in square matching burners, light switches mirroring ceiling lights. Principles: grouping by Gestalt proximity, position near controlled object.
5. **Feedback:** Immediate, informative sensory return that action received + result. Bad: elevator button with no light → repeated presses. Need: timing (<100ms ideal, 1s limit), modality (visual/audible/haptic), informativeness not generic beep, proportionate to importance. Too much = ignored warnings.
6. **Conceptual Model:** Simplified, useful (not necessarily accurate) story of how thing works. File/folder/cloud metaphors aid prediction + error recovery. Three models: Designer’s model → System Image (all info: hardware, UI, docs, signifiers) → User’s mental model. Gap causes failure; burden on System Image to align.

**Seven Design Principles checklist (Ch1 end):** 1 Discoverability 2 Feedback 3 Conceptual Model 4 Affordances 5 Signifiers 6 Mappings 7 Constraints.

### Ch2 The Psychology of Everyday Actions
- Two Gulfs: **Gulf of Execution** (how to act toward goal — bridged by signifiers/constraints/mappings/conceptual model) and **Gulf of Evaluation** (what happened, was goal met — bridged by feedback/conceptual model).
- **Seven Stages of Action** (largely subconscious via overlearning, conscious when disrupted): 1 Goal → 2 Plan → 3 Specify (choose action) → 4 Perform → 5 Perceive → 6 Interpret → 7 Compare. Tool for root-cause: ask "which stage failed, which principle violated?"
- **Cognition & Emotion linked:** Cognition = understanding, Emotion = value judgment. Three levels (from Emotional Design):
  - *Visceral:* immediate judgment, subconscious, aesthetics, color/shape/mood, Pavlovian conditioning.
  - *Behavioral:* learned skilled execution, expectation→action loop, where most HCI lives.
  - *Reflective:* conscious reasoning, memory, blame attribution, self-image, highest emotion. Flow (Csikszentmihalyi) requires challenge ≈ skill.
- Implications: Failure induces learned helplessness + self-blame; designers must provide guidance from error state, exit routes without restart, allow acting from feedback point. "Human error is system error."

### Ch3 Knowledge in the Head and in the World
- Memory limits → knowledge in world (external cues) reduces load. In-the-head = learned conventions; in-the-world = perceivable cues. Great design minimizes required memory; the most effective way to help people remember is to make it unnecessary (p100). Natural mapping, constraints, cultural conventions reduce head-knowledge burden. Precise recall vs approximate behavior.

### Ch4 Knowing What to Do: Constraints, Discoverability, Feedback
- Deep dive on four constraints + discoverability via signifiers. Doors panic bar = good physical signifier+constraint; hidden push-latch cabinet = aesthetics over usability. Feedback must be planned, not afterthought; avoid cost-saving generic lights.

### Ch5 Human Error? No, Bad Design
- Classify errors: **Mistakes** (wrong goal, correct actions) — rule-based, knowledge-based; **Slips** (right goal, wrong action) — capture, description-similarity, mode errors. Slips happen to experts in automatic behavior. Cannot eliminate, but can: make reversible, detectable, low-cost; add forcing functions; use checklists/templates.
- Root cause analysis: ask why, five whys to find why error invited.

### Ch6 Design Thinking
- Solving the right problem first (needs before solution). Iterative HCD + double diamond. Generative methods, convergent selection. Need to observe real behavior, not ask.

### Ch7 Design in the World of Business
- Collaboration marketers/designers/exec required; schedule, cost, features tension. Patience + advocacy for HCD in business constraints.

## Verified Core Quotes
- "Two of the most important characteristics of good design are discoverability and understanding." / "Good design is harder to notice than poor design... Bad design screams out its inadequacies." / "When someone makes an error, there usually is good reason for it." / "The designer's conceptual model is ... system image is ... user's mental model is ..."

## Research Check (Self-Verification)
- Cross-read 5 independent summaries + author PDF; pattern identical. Gulfs/Stages/Constraints typology consistent. No contradictions.

## NEX-OS Applied — Direct Translation
- Every window affords drag/resize/close — **signify**: cursor grab, 8px handle, hover shadow, traffic-light color + X icon (not affordance alone).
- Mapping: dock bottom = infinite edge (Fitts), menu top = system chrome cultural mapping (Jakob); stove metaphor → controls near content they affect.
- Feedback: click dock → bounce + window scale <100ms; no feedback after close = evaluation gulf → add undo toast.
- Constraints visible: disabled menu items grey not hidden; prevent dragging window off-canvas entirely; logical constraint: file non-interactive = remove pointer + lock signifier.
- System Image gap: designer knows file is static artifact — user might think it's draggable file system → must signal via icon + label + hover microcopy.
- Stages checklist per feature: "Open Projects window" → Goal? Plan? Specify which icon? Perform click? Perceive window open? Interpret which project? Compare found? Fix weakest stage.

**NEX Rule:** No mystery chrome. If tooltip needed to explain control, signifier failed.
