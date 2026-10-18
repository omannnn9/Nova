# Nova — website

Landing page for **Nova**, the technology company of OD Holdings (Mauritius). Built with React, TypeScript and Vite,
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

### Configuration (`.env.local`)

| Variable               | Purpose                                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_WHATSAPP_NUMBER` | Verified business WhatsApp number, international format (e.g. `230XXXXXXXX`). Without it, the CTAs fall back to the contact section and the final CTA is disabled. The build warns.       |
| `SITE_URL`             | Production origin (e.g. `https://example.com`). When set, the build adds a canonical link, absolute social-image URLs, `sitemap.xml` and a `Sitemap:` line in `robots.txt`. |

Both are read at build time, so rebuild after changing them.

## Structure

```
src/
  config/site.ts          Site copy, nav links, WhatsApp messages (single source for contact config)
  lib/whatsapp.ts         Click-to-chat URL builder (wa.me + encodeURIComponent)
  lib/device.ts           Lite-mode heuristic (Save-Data, very low CPU/memory) for skipping WebGL
  styles/tokens.css       Brand tokens: colours, type, spacing, light, motion — from the brand pack
  styles/global.css       Fonts, reset, layout and typography utilities, grain
  hooks/                  useMediaQuery, useInViewOnce
  components/
    brand/                NovaMark (the Assembly geometry), NovaLogo (lockup)
    ui/                   Buttons, ContactLink, SectionHeader, Deferred (progressive mounting)
    Navigation/ Hero/ Services/ Approach/ WhyNova/ ContactCTA/ Footer/
    reactbits/            React Bits components (see below)
```

## React Bits

Components from [React Bits](https://reactbits.dev) (TS + CSS variants, MIT + Commons Clause) live in
`src/components/reactbits/`. They were taken from the official registry and are used as documented, configured with
Nova colours:

| Component       | Where                                                                 |
| --------------- | --------------------------------------------------------------------- |
| Particles       | Hero atmosphere — sparkle points drifting up out of the horizon glow  |
| SplitText       | Hero headline (masked word rise), contact headline (blur-in)          |
| DecryptedText   | Mono labels: section eyebrows, the mark's _Built · Ignition · Next_   |
| ScrollReveal    | Why Nova statement, scrubbed word-by-word with a Nova Purple pass     |
| SpotlightCard   | Service panels                                                        |
| Magnet          | Primary calls to action                                               |
| AnimatedContent | Section and content entrances                                         |
| LightRays       | Contact section — light from above                                    |

Local adaptation: `DecryptedText` rendered a `motion.span` without using any motion feature; it now renders a plain
`span`, which removes the `motion` dependency (~40 KB gzipped) with identical behaviour.

## Brand rules applied

- Palette limited to the pack: Deep Black `#0B0B0F`, Nova Purple `#7C3AED`, Electric `#A855F7`, Soft Glow `#C084FC`,
  White `#F8FAFC`, Surface 1/2, White 8 % borders, White 64 % secondary text.
- Archivo (width 112, −3 % tracking) for display, Hanken Grotesk for text, JetBrains Mono for labels — self-hosted.
- The only gradient (Soft Glow → Electric → Nova Purple, vertical) is used only on the lit diagonal and display numerals.
- One light source per screen: horizon glow in the hero, light from above in the contact section.
- Glow is purple only, never on body text or small UI. Light sections switch the mark to Nova Purple on black stems.

## Accessibility and motion

Semantic landmarks and heading order, skip link, keyboard-operable mobile menu (focus trap, Escape, focus return),
visible focus rings, AA text contrast. With `prefers-reduced-motion: reduce`, every animated element renders in its
final state and WebGL scenes stop animating.
