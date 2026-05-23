---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:50:00-07:00
  readArtifacts:
    - DESIGN-A.json   # inherits palette/type/spacing/radius/components
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/trait-matrix.json
    - samples/live/snapshots/sr-homepage.html  # the live fragment that anchors variant C
    - samples/live/snapshots/sr-homepage.png
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: C
  variantRole: "One captured trait amplified — elastic tile mosaic"
  variantThesis: "adobe.com as creative-product gallery — photography-led asymmetric tiles, hover-revealed backgrounds, dark-section rhythm intensified. Amplifies the trait the sr-homepage live fragment already underplays."
  inherits: DESIGN-A.json
  mode: A
  amplifiedTrait: "photography-led tile mosaics + elastic hover behavior (from samples/live/snapshots/sr-homepage.html)"

colors: "inherit-from-A"
typography: "inherit-from-A"

# Tile mosaic introduces three new radius values for the asymmetric grid system.
rounded:
  primary: "16px"        # inherited
  secondary: "8px"       # inherited
  large: "32px"          # inherited
  pill: "999px"          # inherited
  tile-feature: "20px"   # +new: large hero tiles in the asymmetric grid
  tile-portrait: "16px"  # +new: portrait-oriented (4:5) photo tiles
  tile-square: "12px"    # +new: 1:1 product mnemonic tiles in the grid

# Spacing reuses A but tightens grid gap.
spacing: "inherit-from-A + tileGridGap: 12px"

components: [explore-card-mosaic, photo-tile-portrait, photo-tile-square, mosaic-row, dark-band-section, "+all-from-A"]
---

# DESIGN — adobe.com (target, variant C — elastic tile mosaic amplified)

> Different captured trait amplified — the **photography-led tile vocabulary** observed in the live sr-homepage fragment (`samples/live/snapshots/sr-homepage.html`). Variant C makes adobe.com read as a *creative-product gallery*: full-bleed photographic tiles in asymmetric 4:3 / 16:9 / 1:1 grids, hover-revealed background imagery with saturated overlays, intensified dark-section rhythm. Type recedes; imagery leads.

## North star

The live `sr-homepage` fragment already runs tile-mosaic + photo-led: the captured screenshot shows a colored product-tile row, a photo-led "Explore what's new" 3-up, a dark testimonial band, and a dark product grid before the footer wordmark. The captured live home (`/`) does not push this as hard — it leads with a single-product hero. Variant C inherits A's tokens unchanged and amplifies the **mosaic + photo-led + hover-reveal + dark-band rhythm** into the canonical home + hub composition.

## Overview

| Area | Spec |
|---|---|
| **Tokens** | Inherited from `DESIGN-A.json`. Three new radius values for the asymmetric tile grid (`tile-feature: 20px`, `tile-portrait: 16px`, `tile-square: 12px`). One new `tileGridGap: 12px` (slightly tighter than the standard `gridGap: 8px` — visually denser tile reading). |
| **Hero strategy** | **Mosaic hero** — asymmetric tile grid replaces the single-product hero. 2-column row at desktop: a 16:9 feature tile on the left (current campaign — e.g. Photoshop / Generative Fill) + a 2×2 of 1:1 mnemonic tiles on the right (Photoshop / Illustrator / Premiere / Lightroom). On mobile, collapses to a vertical mosaic. |
| **Card primary** | **`explore-card-mosaic`** — 4:3 default with hover-reveal background imagery + gradient scrim. Inherits samples' `.explore-card` pattern; variant C uses it as the primary card. Variant A uses `.merch-card` as primary (pricing). Variant B uses `.story-card` (carousel hero). |
| **Photography** | Mandatory full-bleed photographic surfaces on home, hub, and feature pages. Photo-tile uses 4:3, 16:9, or 1:1 aspect ratios per grid slot. No abstract gradients in tile backgrounds. |
| **Section rhythm** | **Dark-band intensified** — at least 3 dark sections per major page (vs 1-2 in variant A). White → dark → white → dark → black footer. Rounded-top transition (32px radius) between every adjacent surface change. |
| **Motion** | Inherits A's baseline (entrance animations, scroll-driven section reveals). **No** scroll-grow hero (that's variant B). The motion energy is in card **hover** behavior (elastic image scale + gradient scrim fade-in), not scroll. |

## Key characteristics (delta from A)

1. **Asymmetric mosaic grid replaces the single-product hero.** Home hero becomes a 2-column composition: feature tile (16:9 photo, headline + eyebrow + CTA overlay) + 2×2 product-mnemonic tiles (1:1, hover-reveal background imagery, product name + icon on default state).
2. **Hover-reveal as the primary micro-interaction.** Every mosaic tile and explore-card has the captured hover behavior: background image opacity `0 → 1` + `scale(1.04)` + gradient scrim opacity `0 → 1`, all over `400ms ease`. This is the *elastic* in "elastic tile mosaic."
3. **Photo-led, type-receded.** Display headlines at title-4 (24px) or title-3 (clamp(28, 3.125vw, 48px)) — never title-1 in the mosaic context. Imagery carries the visual weight; type provides context and CTA.
4. **Dark-band rhythm.** Home is structured as: nav → mosaic hero (white) → dark "Explore what's new" (photo gallery) → white tile row (campaign promos) → dark testimonial / cross-promo → white product grid → dark footer. The 32px rounded-top section transitions are the visual signal of context change.
5. **Tile aspect-ratio vocabulary is fixed.** Three legal aspect ratios: 16:9 (feature tiles), 4:3 (default mosaic + explore cards), 1:1 (product mnemonics + portrait-square hybrid). No 4:5 or 5:4 or arbitrary ratios.
6. **CTA inside the tile, not below.** Mosaic feature tiles carry an overlay button (`button-solid-white` or `button-ghost-white` per surface tone) at bottom-anchor. Explore-card tiles surface a text-link CTA on hover, not a button.

## Rules (delta from A)

- Asymmetric mosaic is the canonical home + hub hero layout. Single-product hero is reserved for dedicated product landing pages (`/products/photoshop`, etc.).
- Every mosaic tile and explore-card must have a captured photographic asset behind it (Mode A image-reuse contract). No abstract gradient fills as tile backgrounds.
- Three aspect-ratio buckets only: 16:9, 4:3, 1:1.
- Hover-reveal background imagery is mandatory on all mosaic tiles. The default (un-hovered) state shows the product mnemonic icon + name + body copy on a near-monochrome surface; the hovered state reveals the photo + gradient scrim + brightened text.
- Dark-band rhythm minimum: 2 dark surfaces above the footer on home and hub pages.
- Rounded-top transitions (32px) between every adjacent surface change.
- Title-1 (clamp 40-80) is **not** used in the mosaic hero context. The mosaic hero uses title-3 or title-4 maximum so type doesn't fight imagery.

## Dos (delta from A)

- Asymmetric mosaic hero with 16:9 feature + 2×2 mnemonics.
- Hover-reveal background imagery on every tile.
- Photo-led explore cards with text-link CTA on hover.
- Dark band sections alternating with white.
- Tile-overlay CTA buttons (solid-white or ghost-white per ground).

## Don'ts (delta from A)

- Single-product hero on `/` (reserved for `/products/<x>` landings).
- Title-1 in the mosaic context (use title-3 or title-4 max).
- Abstract gradient tile backgrounds (Mode A image-reuse — every tile bg is a captured photo).
- Aspect ratios outside the 16:9 / 4:3 / 1:1 vocabulary.
- Static (non-hover) tiles — every mosaic tile must have hover-reveal behavior.
- Scroll-grow hero (that's variant B's amplification).
