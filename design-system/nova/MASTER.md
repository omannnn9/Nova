# Nova — Design System (Master)

Source of truth, in order of authority:

1. **Nova 2.0 Brand Identity System** (the design pack) — colour, type, mark, light rules.
2. This file — how the pack is applied to the website.
3. UI/UX Pro Max guidance — UX rules, motion discipline, accessibility, anti-patterns.

Tokens live in `src/styles/tokens.css`. Components never use raw hex values.

## What was taken from UI/UX Pro Max, and what was rejected

Queries run (`.claude/skills/ui-ux-pro-max/scripts/search.py`):
`"web design studio agency premium dark" --design-system --variance 7 --motion 6 --density 3`,
`"B2B web development service" --design-system`, plus domain searches for landing, ux, style, gsap and the react stack.

| Recommendation                                                                           | Decision                                                                                                                                                    |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Black + gold palette, Cormorant / Montserrat                                             | **Rejected** — conflicts with the pack (black, purple, white; Archivo / Hanken Grotesk / JetBrains Mono).                                                   |
| Liquid Glass style                                                                       | **Rejected** — glass only where it is functional (the scrolled nav bar).                                                                                    |
| Scroll-triggered storytelling, building intensity, final climax CTA                      | **Adopted** — mirrors the pack's story: a nova builds energy until it becomes impossible to miss. Every chapter stays readable without scroll effects.      |
| Trust pattern: logos, certifications, case studies                                       | **Not applicable** — Nova must not invent proof. Credibility comes from specific copy, a clear process and the quality of the page itself.                  |
| Anti-pattern "AI purple/pink gradients"                                                  | **Adopted as a constraint** — purple is the brand, so it is rationed: one gradient (the pack's), used only on the lit diagonal and active process numerals. |
| "Animate 1–2 key elements per view"                                                      | **Adopted** — see Motion.                                                                                                                                   |
| Hero: one primary CTA, keep a cue to the next content                                    | **Adopted** — the hero is shorter than the viewport so the next section's top edge is visible.                                                              |
| SplitText for headline-length text only; readable final state under reduced motion       | **Adopted** — and the headline never waits more than ~1s for web fonts.                                                                                     |
| `blur-purpose`, `primary-action`, `focus-not-obscured`, target size, line length 65–75ch | **Adopted.**                                                                                                                                                |

## Colour

| Token              | Value                 | Use                                                          |
| ------------------ | --------------------- | ------------------------------------------------------------ |
| `--nova-black`     | `#0B0B0F`             | Ground for ~70% of the page                                  |
| `--nova-purple`    | `#7C3AED`             | Primary action fill; the mark's diagonal on light grounds    |
| `--nova-electric`  | `#A855F7`             | The lit diagonal on dark; focus; active states               |
| `--nova-glow`      | `#C084FC`             | Accent words in headings on dark; top of glows               |
| `--nova-white`     | `#F8FAFC`             | Text on dark; the light-ground section                       |
| `--surface-1/2`    | `#13131A` / `#1C1C26` | The single featured panel; menus                             |
| `--border`         | White 8%              | Hairlines (the primary way sections and items are separated) |
| `--text-secondary` | White 64%             | Body copy on dark (7.5:1)                                    |

Ratio across the page: black ≈ 70%, white ≈ 20%, purple ≈ 10%. One accent word per heading at most.

## Typography

- Display: Archivo, weight 600, width 112, −3% tracking, line-height 0.92–1.05. Headings are always set in sentence case.
- Text: Hanken Grotesk 400/600, 16px minimum, line-height 1.6, measure ≤ 34rem (~65ch).
- Labels: JetBrains Mono 500, 12px, +0.08em, uppercase. Used sparingly: for real labels, not decoration.
- Scale: `--text-sm … --text-hero` (fluid `clamp()`); the hero is the only `--text-hero` use.

## Layout

- Container 82rem + fluid gutter (16–40px). 4px spacing base; section rhythm `--section-y`.
- Separation by **hairlines and whitespace first**, panels second. Only one boxed panel on the page (the Websites feature).
- No arbitrary numbering. Numerals appear only where order is meaningful (the four process stages).
- Radii: `--radius-pill` for buttons; `--radius-lg` for the single feature panel and the light sheet; nothing else is rounded.

## Light (from the pack)

- One light source per screen: the hero's horizon glow (from below), the contact section's rays (from above).
- Glow is always purple; never on body text, icons or small UI. Focus/action glow only on the primary button.
- Edge light (1px Soft Glow top edge) marks the one featured panel.

## Components

- **Primary button**: Nova Purple pill, 52–68px tall, white label, arrow nudge on hover, action glow on hover/focus plus a 2px focus outline. One per view.
- **WhatsApp actions**: every link that opens WhatsApp leads with the WhatsApp glyph in `currentColor` (white on purple, black on the white nav pill), never WhatsApp green. The glyph is static: the arrow nudges, the glyph does not. The contact section also spells out the number with a Copy button.
- **Secondary**: text link with an underline that draws in. No outlined ghost pills next to every primary.
- **Work (project case)**: a status line (Live / In development / Private, a plain dot that never pulses), the project
  name, a summary and a white-pill "Visit" link (purple stays reserved for contacting Nova). Then real screenshots, flat
  with a hairline border and square corners, no browser chrome or device frames: the desktop and phone captures of one
  view side by side, at one shared height; phones show the phone capture only. Tabs switch views with a short crossfade
  (instant under reduced motion), and a caption says what the view shows. Brief, contribution and stack sit below
  under a hairline, with credits for work that is not Nova's.
- **Navigation**: transparent over the hero; dark blurred bar once scrolled; switches to the light lockup over the light section; active section dot. Mobile: full-screen sheet, focus-trapped, Escape closes.

## Motion

| Tier                                          | Where                                                                                              | Rule                                          |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Signature                                     | Hero: the mark rises out of the horizon and its diagonal ignites; headline word rise               | Once, on load                                 |
| Chapter                                       | One reveal per section header block; the process rail fills with scroll; Why Nova statement scrubs | One key element per view                      |
| Feedback                                      | Buttons, links, nav, magnet on primary CTAs                                                        | 180–320ms, `--ease-out`                       |
| Ambient (WebGL on desktop-class devices only) | Hero particles drifting up; rays in the contact section                                            | Pauses offscreen; static under reduced motion |

Enter with deceleration (`--ease-out`); exits are ~60% of enter duration. Under `prefers-reduced-motion`, every element renders in its final state.

## Accessibility

AA contrast for all text; visible 2px focus outline; skip link; one `h1`; sequential headings; decorative SVG
`aria-hidden`; split-text headings carry the full text as their accessible name; targets ≥ 44px for primary controls
and ≥ 24px elsewhere; sticky nav offset with `scroll-padding-top`.

## Performance rules (from the launch audit)

Measured, not assumed — see the audit notes in the commit history.

- No continuous animation on CSS/SVG filters: the hero glow is static (its "breathing" loop cost ~870 ms of main-thread
  work per 3 s while idle).
- No fixed, full-screen blend-mode layers: the grain texture lives inside the hero only (the fixed overlay halved
  mobile scroll frame rate, 60 → 30 fps).
- WebGL (particles, light rays) only on desktop-class devices; phones keep the CSS light and the SVG mark.
- The hero's LCP text is never hidden by an entrance animation (it may move, not fade in).
- Everything below the hero is a lazy chunk mounted progressively (`Deferred`).
