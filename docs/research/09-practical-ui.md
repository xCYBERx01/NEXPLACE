# 09 — Adham Dannaway: Practical UI (2023) — Whole Digest

**Thesis:** Interface design is logic, not magic. Every detail needs rational justification (usability + a11y + psychology) to reduce risk. 8 chapters, 373 pages, 100+ guidelines, before/after. Book: 1 Fundamentals, 2 Less is More, 3 Colour, 4 Layout/Spacing, 5 Typography, 6 Copywriting, 7 Forms, 8 Buttons.

**Verification:** practical-ui.com, Dannaway 16 tips, UXmatters cross-ref.

## Chapter Logic System

### 1 Fundamentals: Risk Reduction
- Every interface detail logical: "Could this confuse low vision/screen reader/non-native?" Use common design patterns — don't reinvent nav/accordion/tabs/checkboxes. Familiar = low cognitive load (Hick's/Fitts plain). Create a system: predefined styles, tokens, modular components. Consistency within product + with established products.

### 2 Less is More: Simplify
- Space to group related elements via Gestalt: proximity, similarity, alignment, enclosure — containers strongest but add clutter; prefer space first.
- Similar-looking elements must function similarly: icon container styled like button will be perceived interactive → de-style if not.
- Be consistent: icons same stroke 2pt, rounded corners, filled/outline — inconsistent weight misread as selected.
- Remove unnecessary styles: lines, backgrounds, white space around images that don't convey info/grouping.

### 3 Colour: Purposefully & Accessibly
- Start black & white, add brand color only to interactive (links, buttons = brand; headings/star ratings = neutral grey) → teaches affordance.
- Never rely on color alone: pair with icon/text/underline. Test grayscale. Red-green blind won't see red alone.
- Contrast: UI elements (icons, form fields, button shapes) ≥3:1. Small text ≤18px ≥4.5:1, Large ≥3:1. Use WebAIM/Contrast plugin.
- Give low-contrast icons solid background: arrow on photo gets white circle + grey icon to guarantee 3:1.

### 4 Typography: Legibility System
- Single sans-serif: Sans most legible neutral. One typeface simplicity.
- Taller x-height + open letterspacing: Inter > League Spartan small.
- Limit uppercase: uniform rectangle forces letter-by-letter reading. Sentence case. If uppercase, small+short+tracking +50 to +200.
- Regular + bold only: Thin/light = noise + a11y failure. Reserve thin large display only. Body regular, headings bold/semi.
- Avoid pure black #000 on white 21:1 strain → dark grey #111827 / gray-900.
- Left-aligned body: English F-pattern. Center/justify long hard for cognitive.
- Line-height ≥1.5 body range 1.5-2.0; line length 40-80 chars.
- Break up with descriptive headings + bullets: large blocks → scannable; headings sense out of context for screen readers.

### 5-6 Copywriting (Implied)
- Conversational, concise, helpful.

### 7 Forms & 8 Buttons
- Primary action most prominent (Squint Test): primary = high contrast bg + bold. Squint/blur instantly reveals. Hierarchy: Primary (filled) > Secondary (outline/ghost) > Tertiary (text). One primary per view.
- Descriptive button labels, hierarchy clear.

## Litmus Test
Could first-time user + screen reader + low-vision user understand affordance without explanation? If not, add label, increase contrast, use standard pattern.

## Research Check
- Guidelines count consistent 100+; logic-driven vs Refactoring tactics layer (what vs why). Complementary, not duplicate.

## NEX-OS Applied
- **Start B&W:** TopBar chrome B&W first, then add teal only to interactive (open app, active dot). Non-interactive headers stay neutral grey.
- **Proximity grouping:** Window card elements proximity grouped, no card border needed unless meaning.
- **Icon consistency:** All lucide-react same stroke weight 1.5pt, rounded caps, either all outline or all filled per set.
- **Contrast audit:** Measure TopBar systray + Dock icons at 3:1; body text 4.5:1 dark grey not pure black; glass header check WCAG via fallback solid if blur fails.
- **Squint test NEX window:** Primary "Open Project" button must pop first vs secondary "GitHub" text link.

**NEX Rule:** No decoration without function; ask low-vision + non-native + screen reader comprehension before shipping.
