# 02 — Steve Krug: Don't Make Me Think, Revisited (3rd ed. 2014) — Whole Digest

**Thesis:** Usability = cognitive economy. Users are satisficing scanners who muddle through; design for self-evidence, not learnability. "Get rid of half the words, then get rid of half of what's left."

**Verification:** Publisher O'Reilly + multiple reviews + synthesis from Garrett/ Norman cross-ref.

## Full Chapter Map (13 Chapters, primaries)
1. Don't make me think! (First Law — ultimate tie-breaker)
2. How we really use the Web (scan, satisfice, muddle)
3. Billboard Design 101 (hierarchy, conventions, clickable obvious, noise)
4. Animal, vegetable or mineral? (why users like mindless choices)
5. Omit needless words
6. Street signs and breadcrumbs (navigation)
7. The Big Bang Theory of Web Design (home page)
8. The Farmer and the Cowman should be friends (usability & stakeholders)
9. Usability testing on 10 cents a day
10-13. Revisited addenda: mobile, accessibility, etc. Style is comic-book concise, not academic.

## Core Mental Models
- **Three Facts About Real Users:**
  1. We don't read pages. We scan them.
  2. We don't make optimal choices. We satisfice (Herbert Simon) — first reasonable thing clicked.
  3. We don't figure out how things work. We muddle through — figure out just enough.

- **Billboard Design (Five Tools):**
  1. Clear visual hierarchy (size/bold/contrast/whitespace precedence)
  2. Conventions (reuse; "conventions only become conventions if they work")
  3. Break into defined zones / areas clearly distinct
  4. Make clickable unmistakable (affordance shape + hover + consistent)
  5. Omit noise — eliminate happy talk, instructions, decorative

- **Trunk Test (Self-Evident Navigation):** Cover screen, show for 2 sec → can user answer: Site ID, Page name, Sections, Local nav, "You are here" indicator, Search? If not, navigation fails.

- **Mindless Choice Principle:** "It doesn't matter how many times I have to click, as long as each click is a mindless, unambiguous choice." Count clicks is vanity; thought per click is metric.

## Laws / Quotes Verified
- First Law: "Don't make me think! It's the overriding principle... tie breaker."
- Second Law: mindless choice > minimum clicks.
- "We don't read, we scan..." trio.
- "If you can't make something self-evident, at least make it self-explanatory."
- "Get rid of half the words..."
- "As a rule, conventions only become conventions if they work."
- "Usability is common courtesy."

## Research Check
- Synopsis consistent across O'Reilly, Blinkist, UXmatters. Tone verified as punchy practical, 2000 → Revisited 2014 update adds mobile/responsive but laws unchanged. No contradictions with Norman — Krug is tactical complement (Norman vocabulary → Krug ruthlessness).

## NEX-OS Applied
- **NEX Audit per Krug:** For dock icon, window title, button — ask "Does this make me think?" If generic icons (e.g., abstract logo for Projects) → add label-on-hover instant tooltip. Window title "Work — Finder" > "Window 3".
- **Scanning, not Reading:** Portfolio windows = cards, bullets, thumbnails, not essays. Reduce welcome paragraph 80 words → 12 words: "Product Designer. 5 apps shipped. Currently at ..."
- **Trunk Test for NEX Window:** Open "About" window — in 2 sec can user say where am I (About), where can I go (dock + menu), where have I been (breadcrumb/back)? Add persistent Site ID (NEX mark) + Page name in titlebar.
- **Mindless clicks:** Dock 6 items shallow > nested hamburger depth. Spotlight Cmd+K secondary. Don't force 3-click dogma; make each choice unambiguous.
- **Omit noise:** Remove "Welcome to my interactive portfolio experience..." empty state. No happy talk.
- **Conventions steal:** Esc close window, Cmd/Ctrl-K search, X top-left/right, dock magnification — innovation budget on *content inside windows*, not chrome.
- **Testing:** 3-user hallway test: "Open my resume without instruction." Watch muddle, fix first stumble, retest. No argument without test.

**NEX Rule:** After visual design, do Krug word-cut pass: delete half, delete half again. Then run Trunk Test on grayscale wireframe.
