---
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-05-22T13:50:00-07:00
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/*.json
  stardustVersion: 0.7.1

colors:
  background: "#ffffff"
  surface: "#f8f8f8"
  text-primary: "#2c2c2c"
  text-secondary: "rgba(0,0,0,0.64)"
  primary: "#3b63fb"
  primary-hover: "#274dea"
  brand-mnemonic-red: "#eb1000"   # reserved for the Adobe lockup; not a CTA color

typography:
  headingFamily: "Adobe Clean, Adobe Clean Display, system-ui, sans-serif"
  bodyFamily: "Adobe Clean, system-ui, sans-serif"
  weights: [300, 400, 600, 700, 800, 900]
  scaleAudit: ad-hoc                # ratios 1.286, 1.0, 1.273, 1.1 — no canonical modular scale
  scaleSizes: ["36px", "28px", "22px", "20px", "16px", "14px"]

rounded:
  primary: "20px"
  secondary: "16px"
  buttons: "16px"
  pill: "999px"

spacing:
  base: 8
  sectionPadding: "64px"
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]

components: [button-primary, button-outline, card, link, badge]
---

# DESIGN — adobe.com (current state)

> Descriptive snapshot of the captured marketing surface. Not a target; the target lives at the project root once `/stardust:direct` runs.

## North star

adobe.com's marketing surface is a **multi-audience routing layer**. The visual system optimises for tile-led IA over editorial flow: a tight type ramp on Adobe Clean / Adobe Clean Display, a saturated Adobe blue as the only colored CTA, mostly grayscale surfaces with full-bleed product photography providing the only chroma. Cards (12–20px radius) are the dominant container; pill buttons (999px radius, 14px label, 16px radius on inputs/badges) are the dominant CTA shape. Type stays mixed-case at display weight 700–900.

## Overview

| Token area | Captured |
|---|---|
| **Palette** | 5 core (white background, near-black text, Adobe blue primary, gray surface, gray border) + 3–4 photographic accent surfaces from hero imagery. Adobe red reserved to brand mnemonic / AI add-on contexts; never a CTA. |
| **Typography** | Adobe Clean (body) + Adobe Clean Display (headings). 6 weights deployed (300/400/600/700/800/900). Display ratio is ad-hoc — no canonical scale, fluid `clamp()` sizing in design samples. Mixed-case headings, period-terminated marquee voice. |
| **Spacing** | 8px base scale (4/8/12/16/24/32/48/64/96). Section padding mode ~64px → packed-to-balanced register. Container max ~1440px; design samples extend to 1920px at large breakpoints. |
| **Radius** | 20px primary (Adobe.com inner) / 16px secondary (samples + cards) / 8px small / 999px pill (buttons). |
| **Components** | Pill buttons (40h primary, 32h sm), nested-radius cards, tab bars, multi-column footers, full-bleed product imagery. |

## Key characteristics

1. **Routing IA, not editorial flow.** Every page leads with audience-track or product-tier disambiguation. Even the home is a tile mosaic, not a hero-then-pitch sequence.
2. **Saturated single-CTA color.** Adobe blue `#3b63fb` is the only saturated color in the CTA system. Outline (`btn--outline`, 1.5px black border) is the only secondary CTA. Adobe red is reserved.
3. **Mixed-case display at 900 weight.** Hero headlines render at 36–80px (depending on viewport, via `clamp()` in samples) at weight 900, mixed case, period-terminated.
4. **Tile-led, photo-led.** Product mnemonics + saturated hero photography (a brick wall, a skater, a Photoshop composition) provide the visual identity; surfaces around them stay near-monochrome.
5. **Compact rhythm.** Section padding ~64–96px in the dense direction. The page is information-rich and IA-priority dense, not editorial.
6. **Pill / nested-radius card system.** 16–20px outer card radius, 4px inset border creating gap, 8px inner-control radius, 999px CTA radius. Visual hierarchy comes from radius + surface tone, not shadow.

## Rules

- **Adobe blue `#3b63fb` is the only saturated CTA color.** Hover deepens to `#274dea`. No other saturated colors in the system except photographic imagery.
- **Adobe red `#eb1000` is reserved.** Brand mnemonic, AI-add-on gradient stop, lockup contexts. Never a CTA, never a section background.
- **Headings render mixed-case at weight 900.** Adobe Clean Display, never uppercase.
- **Body lines cap ≤ 80ch.** ~13 words/line maximum on `.body-*` classes.
- **Pure black `#000` and pure white `#ffffff` are legal surfaces.** Brand-faithful inversion vs the standard "no pure black/white" rule.
- **Backdrop-blur glassmorphism is legal on nav.** Brand-faithful inversion vs the standard "no glassmorphism" rule — the nav pill uses `backdrop-filter: blur(64–128px)` over `rgba(255,255,255,0.64)`.
- **One primary CTA per viewport.** Primary + outline is the canonical 2-CTA pair on light; solid-white + ghost-white on dark.

## Dos

- "Transform how you share information." — short, period-terminated display sentence.
- "View plans and pricing" / "Free trial" / "Buy now" / "Get started" — verb-led 2–4 word CTAs.
- Product-name eyebrow before benefit headline: "Adobe Photoshop / New partner AI models in Generative Fill."
- Adobe Clean at display weight 900 for marquee headlines.
- Pill button shape, primary on blue, outline on black border.

## Don'ts

- Uppercase display headings.
- More than one primary CTA per viewport.
- Adobe red for CTAs (reserved to brand mnemonic).
- Editorial-register vocabulary ("atelier", "the studio", "the journal", "mise-en-place").
- Centered hero with dual CTA + gradient mesh background — the generic 2026-SaaS silhouette adobe.com explicitly avoids.
- Long body lines (>80ch).
- Decorative gradients outside the AI-add-on lockup context.
