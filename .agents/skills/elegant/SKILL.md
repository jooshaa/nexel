---
name: elegant
description: Graceful, refined aesthetic with delicate typography, minimal palettes, and polished layouts that exude sophistication.
license: MIT
metadata:
  author: typeui.sh
---

# Elegant — Opinionated Design Execution Skill

## Mission
You are building UI in the Elegant aesthetic. This is not a neutral system — it has convictions.
Elegant means: deliberate restraint, typographic precision, architectural whitespace, and surfaces that feel hand-finished. Not minimalism by default. Minimalism with intent.

**Before writing a single line of code, commit to a visual decision:**
What is the one thing this UI will be remembered for? A font pairing? A border treatment? A hover state that feels inevitable?
Execute that one thing with total conviction. Everything else serves it.

## Non-Negotiables

**Never use:**
- Inter, Roboto, Arial, system-ui, or any font that ships as a browser default
- Purple gradients on white backgrounds
- Blue primary buttons with rounded corners unless they carry a specific conceptual reason
- Symmetrical grid layouts with equal gutters — add tension, asymmetry, or a deliberate anchor point
- Flat white (#FFFFFF) as a background — use warm whites, off-whites, or slightly tinted surfaces
- Generic card shadows (`box-shadow: 0 2px 4px rgba(0,0,0,0.1)`) — if you use shadow, make it a design statement

**Always:**
- Pick fonts that carry cultural weight appropriate to the context. Elegant favors: Cormorant Garamond, Editorial New, Canela, Playfair Display for display; DM Sans, Söhne, Suisse Int'l, IBM Plex Sans for body. Never repeat a pairing across generations.
- Use whitespace as structure, not filler. Generous margins signal hierarchy, not laziness.
- Treat interactive states as part of the design, not afterthoughts. Hover, focus-visible, and active states must feel considered.
- Make borders and dividers meaningful. A 1px rule in `#E5E5E5` is decoration. A 1px rule in `#111827` is a statement.

## Design Tokens
--color-surface:     #FAFAF8        /* warm off-white, not sterile /
--color-surface-alt: #F3F2EE        / secondary surface, slightly more warmth /
--color-ink:         #111111        / near-black, not pure black /
--color-ink-muted:   #6B6B6B        / reduced hierarchy /
--color-accent:      #1A1A1A        / default accent = controlled darkness /
--color-line:        #E2E0DA        / warm, not cold gray */
--font-display:      'Cormorant Garamond', Georgia, serif
--font-body:         'DM Sans', sans-serif
--font-mono:         'IBM Plex Mono', monospace
--weight-light:      300
--weight-regular:    400
--weight-medium:     500
--weight-semibold:   600
--type-xs:   11px
--type-sm:   13px
--type-base: 15px
--type-md:   18px
--type-lg:   24px
--type-xl:   32px
--type-2xl:  48px
--type-3xl:  72px
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-6:  24px
--space-8:  32px
--space-12: 48px
--space-16: 64px
--space-24: 96px
--radius-sm: 2px
--radius-md: 4px
--radius-lg: 8px
/* Elegant does not use radius > 8px. Pill buttons are a specific opt-in, not a default. */

## Typography Rules

- Display type should be set in the display font at weights 300–400. Elegant is not bold by default.
- Body copy: 15px / 1.65 line-height. Never tighter than 1.5 for paragraph text.
- Tracking: Display text gets `letter-spacing: -0.02em`. Uppercase labels get `letter-spacing: 0.08em`. Body text: 0.
- Hierarchy is created through size contrast and weight contrast — not color. Use color contrast only as reinforcement.
- Max line length for body: 65ch. Never let prose run full-width on wide containers.

## Color Philosophy

Elegant runs on a near-monochromatic palette broken by a single intentional accent. That accent can be:
- A warm amber (#C7893F) for editorial warmth
- A slate blue (#3D5A80) for institutional composure
- A moss green (#4A5E40) for organic refinement

Pick one. Use it sparingly: one link color, one interactive state, one highlight. Never two accents in the same surface.

## Component Conventions

**Buttons**
- Primary: filled `--color-ink` background, `--color-surface` text. No gradient, no shadow.
- Secondary: transparent background, 1px `--color-ink` border.
- Ghost: no border, `--color-ink-muted` text, ink on hover.
- Height: 36px (sm), 40px (md), 48px (lg). No 56px+ buttons.
- Hover state must feel like a material change, not a tint shift.

**Inputs**
- Border: 1px `--color-line`. On focus: 1px `--color-ink`. No colored focus rings unless accessibility requires it (in which case use the accent).
- Label above, not floating. Floating labels introduce ambiguity in dense forms.
- Error state: underline or left-border in a warm red (#C0392B), not background fill.

**Cards**
- Default: no shadow. Use border (`1px solid var(--color-line)`) or background differentiation.
- If shadow is warranted: `0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)` — layered, never flat.
- Card padding: minimum `--space-6` on all sides.

**Tables**
- Header row: `font-size: var(--type-xs)`, `letter-spacing: 0.08em`, uppercase, `color: var(--color-ink-muted)`.
- Row dividers: 1px `--color-line`. No zebra striping unless density demands it.
- Numeric columns: right-aligned, monospace font.

**Navigation**
- Top nav: height 56px, borderless or with a single bottom hairline.
- Active state: underline or left-rule, not background fill.
- Never use icon-only nav without visible labels on desktop.

**Spacing Rhythm**
- 4px base grid. All spacing values must be multiples of 4.
- Section vertical rhythm: minimum `--space-16` between major sections.
- Never use `margin: auto` as a shortcut for centering inside flex/grid — be explicit.

## Motion

Elegant moves deliberately. Never more than 250ms for UI responses. Reserve 400–600ms for modal/drawer entrances.
- Entrance: `opacity 0→1` + `translateY(8px→0)` at `cubic-bezier(0.16, 1, 0.3, 1)`
- Exit: `opacity 1→0` only, 150ms
- Hover transitions: 120ms ease

No bounce. No spring physics. No particle effects. Motion clarifies; it does not perform.

## Accessibility

- Minimum contrast: 4.5:1 body, 3:1 large text (WCAG 2.2 AA)
- Focus-visible must be visible without relying on color alone: use outline `2px solid var(--color-ink)` offset `2px`
- Interactive targets: minimum 40×40px touch area
- All motion must respect `prefers-reduced-motion`

## Anti-Patterns

| What to avoid | Why | What to do instead |
|---|---|---|
| `font-family: Inter` | Too common, no character | Cormorant + DM Sans or Playfair + IBM Plex |
| `border-radius: 12px` on cards | Feels consumer-app, not refined | `4px` or no radius |
| Purple/blue gradient hero | AI-slop signal | Monochrome with a single accent |
| `font-weight: 700` display text | Clashes with elegant register | 300–400 for display, 600 only for UI labels |
| Centered everything | Lacks editorial tension | Left-aligned with deliberate asymmetry |
| Icon + text in every button | Visual noise | Text-only primary actions, icon-only tertiary where space is tight |

## QA Checklist

- [ ] No font defaults to Inter, system-ui, or Arial
- [ ] Background is not pure `#FFFFFF` or `#000000`
- [ ] Only one accent color is active in the composition
- [ ] Every interactive state (hover, focus, active, disabled) is explicitly defined
- [ ] Spacing values are all multiples of 4
- [ ] No `border-radius` above 8px outside of a deliberate pill opt-in
- [ ] Body text max-width is set (≤65ch)
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Focus-visible is visible without relying on color
- [ ] The design has one "signature moment" — something a designer would remember
