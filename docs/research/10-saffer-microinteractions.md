# 10 — Dan Saffer: Microinteractions — Designing with Details (O'Reilly 2013) — Whole Digest

**Thesis:** Details turn tolerated product into treasured. Microinteractions = single-use contained moments inside/around features. Focus bottom-up on tiny. Philip Eames quote: "Always know something about user/context/platform. Use knowledge to make good guesses, create shortcuts."

**Verification:** O'Reilly overview, Bookey Ch summaries, UIGuides timing, producthub timing, cieden structure, Blinkist, Sonia review, weekly-geekly.

## Structure (4 Parts) — The Model
Microinteraction = Trigger → Rules → Feedback → Loops & Modes (meta rules). Three incorporation methods: refine each, simplify complex feature to core microinteraction, treat product as collection of interrelated microinteractions.

## Ch1 Designing Microinteractions
- Defined via Philharmonic iPhone alarm mute failure anecdote (Spirit rover Ch5 similarly mode loop error). Microinteractions differ from features in size/scope: simple, brief, single task (volume adjust, sync). Neglect → unpolished even if features good. History intertwined with UI cutting/paste evolution.

## Ch2 Triggers
- Two types: Manual (user: tap, swipe, key press) + System (auto: error, location, incoming email, time).
- Principles:
  1. Recognizable in context: looks like button → must act like button; no false affordances.
  2. Discoverability = Frequency: High-use (play/close) visible & affordant; low-use hidden/gestural.
  3. Bring the Data Forward: Show inside state on trigger itself (badge count on mail, progress ring on download, color preview on picker) before engagement; don't make user open to check.
  4. Initiate same action every time for mental model.
  5. Reflect data contained inside (count, preview).
  6. Include state indicator; don't overload.

## Ch3 Rules
- Hidden parameters defining behavior. Steps: define clearest simplest goal (end state not process), limit options + smart defaults (every choice = edge case, elimination removes complexity, use contextual defaults like alarm = last +8h), prevent errors via Poka-Yoke (constraints, autocorrect, format inline, confirm destructive) — don't start from zero (autocomplete), define states for every noun/verb (default, focused, hover, active, disabled, loading, error, success, empty) — flowchart, use microcopy not instructions ("Try again" not "Error 403"), do more with fewer elements.

## Ch4 Feedback
- How system communicates rules outcome. Types: Visual (animation, color) always + Audio (subtle click/pop) for background confirmation when eyes away + Haptic (vibration) for mute/toggle tangible.
- Principles:
  1. Not overburden: driven by need — what does user need to know? When/how often? Don't overload.
  2. Not arbitrary: must associate with trigger; press power → characteristic click not random sound; ideally flows trigger→rules→feedback.
  3. Use existing elements to send message (resize cursor changes direction, not new icon); convey most with least.
  4. Show don't tell + animate delta (spinner → checkmark, like pops don't jump-cut).
  5. Proportional: small action small feedback; deleting file ≠ liking post. Humorous/empathetic only during pain (error/empty).
  6. Inform without interrupting: typing indicator, inline validation green check as you type, progress bar.
  7. Timings: 100-150ms hover immediate, 200-300ms most UI (toggle, focus, tooltip sweet spot), 300-500ms larger transitions, >500ms rare only if communicating importance. Shorten: take expected 2× shorter then 2× shorter again. Avoid "error" "caution" words, personal pronouns ("The password incorrect" > "You entered wrong"), fewer words, focus on next action.
  8. Combine visual+audio more efficient than visual alone proven; contextual duration/intensity/repetition; reduce volume night.

## Ch5 Loops and Modes (Meta)
- **Modes:** Branch in rules altering functionality. Fewer = better; confusion source. Use sparingly for infrequent actions. Isolate on separate screens, make mode highly visible with noticeable transition (iOS weather city select).
  - Types: Settings mode (adjust parameters without primary action), Spring-loaded/Quasi-mode (physical hold, e.g., hold Shift/caps, hold mouse to pan, release reverts — safest), One-off (single command auto-exit, iOS double-click cut-paste). Invisible mode transitions → errors.
- **Loops:** Cycles repeating over time governing duration/lifecycle. Styles: Count-controlled (repeat 3×), Condition-controlled (until 100%), Collection-controlled (over array), Infinite (poll every 30s). Open non-responsive vs Closed adaptive (feedback responsive). Long loops evolve via memory/progressive disclosure/reduction — adapt based on familiarity, preference. Example loops: "Get data every 30s", end banking session for security, TED offers download when buffering long.

## Ch6 Putting It All Together + Appendix A Testing
- Integrates model to design three sample microinteractions for mobile/web/appliance. Testing via Kaizen/iterative.

## Spirit Rover Case
- 2004 Spirit emergency mode reboot loop due to software shortage → reboot tried to fix shortage looping. Illustrates mode + infinite loop danger.

## Research Check
- 4-part structure stable across 8 sources; timings 100-500ms consistent; Philharmonic + Spirit anecdotes repeated.

## NEX-OS Applied — Microinteraction Inventory
- **Close Window:** Trigger manual explicit high discoverability → Rule single click close with undo toast (prevent error) → Feedback visual red fill + haptic light tap + window shrink-scale 120ms ease-out → Loop long remember position/size next open.
- **Minimize:** Feedback genie curve sucks into dock (visualizes where it went).
- **Dock Hover:** Trigger hover (manual+system) → Rule magnify spring 100ms fast follow → Feedback scale + label fade + haptic tick scrub → Loop remembers pinned vs recent via open loop.
- **Badging:** Closed loop poll 30s, badge pulse count-controlled 2× on new.
- **Desktop drop:** Trigger drag from outside → Rule show valid zones snap guides → Feedback reflow animation, invalid shake + haptic thud + microcopy "Can't place here" → Loop remembers icon positions per space.
- **Context Menu:** Spring-loaded mode hold right-click preview pops, release exits.
- **Prevention:** Define all states upfront in Figma variants; use microcopy human; use existing cursor change for direction limit.

**NEX Rule:** Storyboard 1-second interaction: Trigger surface → Rule check → Feedback pulse → What remembers in 1 week. If any ambiguous, redesign.
