# 12 — Type & Layout Fundamentals — Whole Digest

**Sources:** Design School Type (Richard Poulin) + Design School Layout (grid systems) + Smashing Typographic Hierarchies (Rob Carter variables) + Figma typography guide + Visual Design Journey grids.

## Type Classifications (Poulin)
- Historical development 15th century→present as framework. No two systems agree, still effective reference. Simplified anatomical: based on letterforms. Categories: serif, sans, script insufficient alone; need detailed classification via historical periods + visual characteristics + designer bios + applications.

## Selecting Typefaces
- Limit 2-3 categories; need more detailed system. Decision via anatomy, x-height, purpose, styles available. True black unnatural → start very dark grey. Trust popularity but verify legibility.

## Terminology & Glyphs
- Kerning pair VA, AW, To etc. default optically wrong even if technically correct; most tools auto kerning tables but large headlines manual. Tracking uniform overall density.

## Typographic Principles (6 Variables — Carter Project)

Isolate variables to study hierarchy:

1. **Proximity/Space:** Space between letters/words/titles/paragraphs/margins/placement. All type 8-12pt one size, no color to test. Diagonal columns possible, uppercase creates hierarchy, repeating element supports concept. Space continues to combine with all others.

2. **Weight:** Bold vs regular + space changes. Signals without size change. Balance page heavy side vs busy.

3. **Size:** 3 categories: Body copy 8-12pt never over 12 (depending x-height), Subheaders between body and title, Titles >14pt display very large impact. Title words tight cousins — spacing between words affects grouping.

4. **Size + Weight Combined:** Combine noting balance.

5. **Color:** Enhance hierarchy, keep eye inside, navigate. Limit 2-3 colors to focus.

6. **Visual Punctuation:** Lines/shapes/symbols geometric to enhance. Example crane points to title, white text repetition unity, bold beginnings signal steps without numbers.

## Hierarchy System (Linearity/Figma + pimpmytype contrast+space)

- Hierarchy tells reader what to read 1st/2nd/3rd. Without, everything equal → nothing read correctly.
- Created via: Size, Weight, Colour/contrast, Spacing, Style (uppercase/italic/tracked).
- Most systems define 3-4 levels consistent: H1 32-72pt Bold, H2 20-32pt Semibold, H3 16-20pt Medium, Body 14-17pt Regular, Caption 11-13pt.
- Elegant hierarchy often via spacing more than size: more space above H2 than below signals section opener without larger size. Reduce size steps, use spacing/weight/color.
- Spacing amplify: Elements together reduce space; not together increase. Subheading more space before (25px) than after (10px) groups with subsequent paragraph correctly.
- Five steps: 1 Goals/structure first 2 Simplify hierarchies repeat styles 3 Strive clear distinctions 4 Contrast 5 Space to group.

## Spacing: Tracking, Kerning, Leading

- **Tracking:** Uniform overall. Body 0 to -10, Headlines -20 to -50 tighter intentional, Uppercase labels +50 to +200 always increase (uniform rectangle needs). 
- **Kerning:** Manual pair correction optical.
- **Leading:** Body 140-160% (16pt →22-26pt), Headlines 110-130% tighter large intentional. Too tight cramped hard to track, too loose disconnected. Depends on column width: wider needs more leading. Rule 45-75 chars per line comfortable → adjust column width + size together then leading.

## Contrast & Color + Alignment + Measurement
- Set base primary typeface/size/style first; contrast depends. Button low contrast huge a11y + hierarchy failure; don't rely on font size alone weight/color work subtler.
- Common mistake too many typefaces (≥3 visual noise) → max 2; use weight/size/color for variation. Avoid pure black #000 → gray-900. Size hierarchy tempting but limit steps.
- Alignment: Align to organize. Grids underlying structure. Consistently space elements, employ margins/padding, justify choice: left justified most English longform; center heading/short quote; full justified with spacing adjustments. Rag manipulated via width/tracking.
- Left side vertical margin alignment (logo, image, header, body) makes considered intentional.

## Grid Systems

### Anatomy
- Margins frame content; symmetrical stable, asymmetrical active; narrow reduce tension, wide draw inward; careful thumb position. Modules = units; many modules visual confusion. Can be vertical/horizontal typical.

### Types
- **Manuscript:** Single column, max 60 chars — books/essays. Inward wide margins stability.
- **Symmetrical:** Multi-column, equal inner/outer margins — stability/scanning 40-50 chars multi-column. Matters.
- **Modular:** Multi-column + multiple flowlines; module size related to average paragraph/image. Combine/activate modules to create spatial areas; newspapers, programs, data viz, websites.
- **Baseline:** Horizontal rhythm, not relevant here.
- **Hierarchical:** Most fluid, content-based unique page — good for web where content dictates.
- **Predetermined vs Improvisational:** Predetermined divides fixed columns (1,2,3...); improvisational lay one element huge then extend its lines to organize around — visual alignments emphasized. Alternative: diagonal columns.

### Implementation
- Determine number columns/rows per content. Consider vertical rhythm baseline grid. Align text elements to columns/rows. For responsive, must flex: media queries adjust. NYT uses grid align headlines/subheads/body consistently.

### Responsive & Balance
- Responsive design crucial; flexible grid must accommodate screen sizes. Balance via alignment avoids awkward spacing.

## Tactics for NEX-OS
- Use 12-col modular hierarchical hybrid: outer margins moderate, gutter 16px inner. Manuscript-like body limited 60ch centered (cols 4-9), titles spanning more.
- Type system fixed 5 levels: Display (if any), H1, H2, Body, Caption. Define size/weight/color/spacing per level before designing content.
- Tracking: uppercase dock labels +80, headlines -20; Leading body 1.5x.
- Grid break intentionally for impact but only after discipline; otherwise accidental.

**NEX Rule:** Proximity+Weight first; size last resort. Define scale in Figma before any content, repeat same 3-4 styles everywhere.
