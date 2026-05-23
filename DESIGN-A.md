---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:40:00-07:00
  readArtifacts:
    - stardust/current/DESIGN.json
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/trait-matrix.json
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: A
  variantRole: "Faithful + improvements"
  variantThesis: "What your site should be tomorrow — same IA, same composition, every improvement applied."
  inherits: stardust/current/DESIGN.json
  appliedImprovements: [1, 2, 3, 4, 5]
  mode: A
  inversionsActive: ["pure-surfaces", "backdrop-blur-nav"]

colors:
  background: "#ffffff"
  surface: "#f8f8f8"
  surface-dark: "#000000"
  text-primary: "#2c2c2c"
  text-secondary: "rgba(0,0,0,0.64)"
  text-knockout: "#ffffff"
  text-knockout-soft: "rgba(255,255,255,0.64)"
  primary: "#3b63fb"
  primary-hover: "#274dea"
  border-subtle: "rgba(0,0,0,0.08)"
  brand-mnemonic-red: "#eb1000"   # RESERVED — Adobe lockup, AI add-on gradient stop. Never a CTA color.

typography:
  headingFamily: "\"Adobe Clean Display\", \"Adobe Clean\", system-ui, sans-serif"
  bodyFamily: "\"Adobe Clean\", system-ui, sans-serif"
  weights: [400, 700, 900]   # display weight 900, label weight 700, body weight 400
  # Fluid clamp() scale (improvement #4 — replaces ad-hoc captured scale)
  title-1: { size: "clamp(40px, 6.25vw, 80px)", lineHeight: "0.95", letterSpacing: "clamp(-1.5px, -0.25vw, -3.2px)", weight: 900 }
  title-2: { size: "clamp(32px, 4.375vw, 56px)", lineHeight: "1.0",  letterSpacing: "clamp(-0.8px, -0.13vw, -1.68px)", weight: 900 }
  title-3: { size: "clamp(28px, 3.125vw, 48px)", lineHeight: "1.05", letterSpacing: "clamp(-0.8px, -0.11vw, -1.2px)", weight: 900 }
  title-4: { size: "24px", lineHeight: "1.0",  letterSpacing: "-0.48px", weight: 900 }
  body-lg: { size: "20px", lineHeight: "1.2",  weight: 400, maxWidth: "80ch" }
  body-md: { size: "16px", lineHeight: "1.25", weight: 400, maxWidth: "80ch", letterSpacing: "0.16px" }
  body-sm: { size: "14px", lineHeight: "1.29", weight: 400, maxWidth: "80ch" }
  eyebrow: { size: "16px", lineHeight: "1.25", weight: 700, letterSpacing: "-0.2px" }
  label:   { size: "14px", lineHeight: "1.29", weight: 700 }

rounded:
  primary: "16px"        # cards, buttons, hero video — matches samples (current site sits at 20px; variant A normalizes to samples' 16px which is the more frequent token)
  secondary: "8px"       # form fields, badges, small chips
  large: "32px"          # rounded-top section transitions (samples' .stories, .plans-section pattern)
  pill: "999px"          # search bars, eyebrow chips
  inner-card: "12px"     # white inner card inside the nested-radius pricing pattern

spacing:
  base: 8
  sectionPadding: { desktop: "64px", tablet: "48px", mobile: "32px" }   # balanced tier; multi-audience hard floor caps at 64px (per § 4)
  scale: [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96]
  containerMaxWidth: "1440px"
  gridGap: "8px"

components: [button-primary, button-outline, button-dark, button-solid-white, button-ghost-white, card, card-dark, card-nested, input, badge, link]
---

# DESIGN — adobe.com (target, variant A — faithful + improvements)

> Same IA. Same tile-led composition strategy. Same component vocabulary as the captured surface. The five items from `stardust/prototypes/home-improvements.md` are applied — no extras, no embellishment. A risk-averse stakeholder reads this as *"yes, that's us, with the obvious fixes."*

## North star

adobe.com refined for tomorrow: a multi-audience routing layer with tightened CTA vocabulary, a fluid `clamp()`-based type scale (replacing the captured ad-hoc one), the Lenis-driven entrance motion baseline already in the design system but not yet deployed live, and two brand-faithful inversions (pure surfaces + backdrop-blur nav) documented explicitly so prototype and migrate carry them forward.

## Overview

| Area | Spec |
|---|---|
| **Palette** | 5 core (white background, black surface, near-black text, Adobe blue primary, gray surface) + brand-mnemonic red reserved to lockup contexts only. Inherited from captured surface. |
| **Typography** | Adobe Clean Display (headings, weight 900) + Adobe Clean (body, weights 400/700). Fluid `clamp()` scale: title-1 clamp(40, 6.25vw, 80), title-2 clamp(32, 4.375vw, 56), title-3 clamp(28, 3.125vw, 48), title-4 24. Mixed-case, period-terminated marquee voice. |
| **Spacing** | 8px base. Section padding 64/48/32 (desktop/tablet/mobile, balanced tier with multi-audience hard floor). 80ch body max-width. |
| **Radius** | 16px primary (cards, buttons, hero), 8px small (inputs, chips), 32px large (rounded-top section transitions), 999px pill. |
| **Components** | Pill-radius buttons (40h primary, 32h `--sm`), nested-radius cards (4px inset border creating gap), light + dark card surfaces, search bar, tab bar, multi-column footer with full-bleed Adobe wordmark. |
| **Motion** | Lenis 1.x mandatory (`lerp: 0.1`). Page-load entrances (nav enterDown + hero text enterUp staggered 0/80/160ms). Scroll-driven section entrance (opacity 0→1 + translateY 40→0, bidirectional, easeOut3, per-group stagger 0.10–0.15). No GSAP, no IntersectionObserver, no ScrollTrigger. |
| **Inversions** | (1) literal `#000` and `#ffffff` surfaces are legal (Adobe.com brand-faithful). (2) `backdrop-filter: blur(64–128px)` over `rgba(255,255,255,0.64)` on nav is legal. |

## Key characteristics

1. **Routing IA preserved** — top nav surfaces 4 audience tracks before any product. Home grid leads with audience-route tiles, not a single-product pitch.
2. **One CTA verb per track** — "Free trial" + "Buy now" for conversion; "View plans and pricing" for discovery. Audience-routing labels (*"Creativity & Design"*, etc.) are nav links, never styled as buttons.
3. **Mixed-case display at 900** — Adobe Clean Display, weight 900, period-terminated. Fluid `clamp()` sizing.
4. **Nested-radius card system** — 16px outer + 4px inset border + 12px inner white surface (per samples' merch-card pattern). Pricing cards use this. Story / product cards use single 16px radius.
5. **Photography-led accent, monochrome surrounds** — surfaces stay grayscale; the only chroma comes from product photography + Adobe blue CTAs. (Variant A inherits captured imagery semantic-position-preserved per Mode A's image-reuse contract.)
6. **Entrance-motion baseline** — Lenis-driven page-load + scroll-driven section entrances on every page. (Variant B amplifies into full scroll cinema; variant A keeps it baseline only.)

## Rules

- Adobe blue `#3b63fb` is the only saturated CTA color. Hover deepens to `#274dea` on white; the hover color is also the *only* legal blue on the `#f8f8f8` surface (AA contrast guard).
- Adobe red `#eb1000` is reserved — brand mnemonic, AI add-on gradient stop, lockup contexts. Never a CTA, never a section background.
- Headings render mixed-case, weight 900. Adobe Clean Display.
- One canonical conversion verb pair per audience track: "Free trial" + "Buy now". One discovery verb: "View plans and pricing". One outline verb: "Sign In".
- Body lines cap at 80ch (~13 words / line).
- Pure surfaces (`#000`, `#ffffff`) legal per inversion.
- Backdrop-blur on nav legal per inversion (transparent over dark hero, glass + shadow on scroll).
- Lenis stack required on every page. Page-load + scroll-driven entrance motion required.
- `prefers-reduced-motion: reduce` collapses scroll-driven animations to immediate display; Lenis lerp disabled.
- One primary CTA per viewport.

## Dos

- "Transform how you share information." — short, period-terminated display sentence.
- "Adobe Photoshop / New partner AI models in Generative Fill." — product mnemonic eyebrow then benefit headline.
- "View plans and pricing" / "Free trial" / "Buy now" — verb-led 2–4 word CTAs.
- Pill buttons (40h primary, 32h `--sm`).
- Adobe Clean Display at weight 900 for marquee headlines.
- Lenis-driven entrance + scroll-driven section reveal.

## Don'ts

- Uppercase display headings.
- Adobe red for any CTA.
- Multiple primary CTAs in one viewport.
- Audience-routing labels styled as buttons.
- Editorial-register vocabulary ("atelier", "the studio", "mise-en-place", "the journal").
- Generic 2026-SaaS hero silhouette (centered + dual CTA + gradient mesh).
- Pre-2024 SaaS hero silhouette (left hero + stock engineers photo + dual CTA).
- Modal geolocation interrupt above the fold — use a dismissible banner instead.
- GSAP, ScrollTrigger, IntersectionObserver — Lenis + rAF + native CSS scroll-driven animations only.
- Decorative gradients outside the AI-add-on lockup context.
