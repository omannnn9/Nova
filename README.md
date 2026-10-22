# Nova — website

Landing page for **Nova**, a technology business based in Mauritius. Built with React, TypeScript and Vite,
following the _Nova 2.0 Brand Identity System_.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:5173
npm run build                # type-check + production build into dist/
npm run preview              # serve the production build
npm run lint                 # oxlint
```

### Configuration

| Variable               | Where                  | Purpose                                                                                                                                                                                                   |
| ---------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_WHATSAPP_NUMBER` | `.env` (committed)     | Nova's WhatsApp number, international digits only. Currently `23059084943` (+230 5908 4943). Every contact call to action opens a prefilled chat with it.                                                 |
| `SITE_URL`             | `.env.local` or CI env | Production origin (e.g. `https://example.com`). When set, the build adds a canonical link, absolute social-image URLs, Organization structured data, `sitemap.xml` and a `Sitemap:` line in `robots.txt`. |

Both are read at build time, so rebuild after changing them. `.env.local` overrides `.env`.

## Structure

```
src/
  config/site.ts          Site copy, nav links, WhatsApp messages (single source for contact config)
  config/projects.ts      Projects shown in the Work section (see "Adding a project" below)
  assets/projects/        Project logos, as WebP
  lib/whatsapp.ts         Click-to-chat URL builder (wa.me + encodeURIComponent)
  lib/device.ts           Lite-mode heuristic (Save-Data, very low CPU/memory) for skipping WebGL
  styles/tokens.css       Brand tokens: colours, type, spacing, light, motion — from the brand pack
  styles/global.css       Fonts, reset, layout and typography utilities, grain
  hooks/                  useMediaQuery, useInViewOnce
  components/
    brand/                NovaMark (the Assembly geometry), NovaLogo (lockup)
    ui/                   Buttons, ContactLink, SectionHeader, Deferred (progressive mounting)
    Navigation/ Hero/ Work/ Services/ WhyNova/ Approach/ ContactCTA/ Footer/
    reactbits/            React Bits components (see below)
```

## Adding a project

The Work section lists every entry in `src/config/projects.ts` as one row: logo, name, a one-line summary, status
(`live`, `in-development`, `private`), type and year, linking to the project when it has a public URL. Add the logo to
`src/assets/projects/` (square, at least 144 px, WebP) and an entry to the list. Publish only what can be backed up by
the project's code, Git history or the client's permission.

## Design system and UI/UX Pro Max

`design-system/nova/MASTER.md` is the working design system: how the brand pack is applied, the motion tiers, and a
record of which [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) recommendations were adopted
or rejected (its generated palette and fonts were rejected in favour of the pack). The skill is installed at project
level in `.claude/skills/` (`npx ui-ux-pro-max-cli@2.15.0 init --ai claude`); query it with
`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux`.

## React Bits

Components from [React Bits](https://reactbits.dev) (TS + CSS variants, MIT + Commons Clause) live in
`src/components/reactbits/`, taken from the official registry and configured with Nova colours:

| Component       | Where                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Particles       | Hero — faint sparkles drifting up from the light at the mark's base     |
| SplitText       | Hero headline (masked word rise), contact headline (blur-in)            |
| DecryptedText   | The mark's _Built · Ignition · Next_ annotations under the hero horizon |
| SpotlightCard   | The Websites feature panel (the page's one lit panel)                   |
| Magnet          | Primary calls to action                                                 |
| AnimatedContent | One entrance per content block                                          |
| ScrollReveal    | Why Nova statement, scrubbed word by word with a Nova Purple pass       |
| LightRays       | Contact section — light from above                                      |

Local adaptations, each commented in the file:

- `DecryptedText` rendered a `motion.span` without using any motion feature; it renders a plain `span`, which removes
  the `motion` dependency (~40 KB gzipped).
- `SplitText` hid its text until every web font loaded, with no upper bound; it now waits at most 900 ms, so the hero
  headline shows promptly on slow connections (the Archivo file is also preloaded).

## Brand rules applied

- Palette limited to the pack: Deep Black `#0B0B0F`, Nova Purple `#7C3AED`, Electric `#A855F7`, Soft Glow `#C084FC`,
  White `#F8FAFC`, Surface 1/2, White 8 % borders, White 64 % secondary text.
- Archivo (width 112, −3 % tracking) for display, Hanken Grotesk for text, JetBrains Mono for labels — self-hosted.
- The only gradient (Soft Glow → Electric → Nova Purple, vertical) is used only on the lit diagonal and display numerals.
- One light source per screen: light rising from the hero's horizon at the mark's base; light from above in the
  contact section.
- Glow is purple only, never on body text or small UI. Light sections switch the mark to Nova Purple on black stems.

## Accessibility and motion

Semantic landmarks and heading order, skip link, keyboard-operable mobile menu (focus trap, Escape, focus return),
visible focus rings, AA text contrast. With `prefers-reduced-motion: reduce`, every animated element renders in its
final state and WebGL scenes stop animating.
