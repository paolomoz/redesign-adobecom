<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:55:00-07:00
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
    - stardust/current/brand-review.html
    - samples/SAMPLES.md
    - samples/trait-matrix.json
    - samples/live/snapshots/sr-homepage.{html,png}
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variantMode: multi
  variants: ["A", "B", "C"]
-->

# Direction — adobe.com redesign (Active)

## Phrase (verbatim)

> "redesign adobe.com's marketing surface guided by samples/SAMPLES.md — three variants: A faithful + improvements, B amplifies scroll cinema, C amplifies elastic tile mosaic — Mode A with the two brand-faithful inversions documented in stardust/current/DESIGN.json (pure black/white, glassmorphism on nav)"

## Restatement in dimensional vocabulary

The phrase pre-resolves every axis. Translated to stardust's intent dimensions:

| Axis | Movement / Value | Source |
|---|---|---|
| **register** | brand (locked from current PRODUCT.md) | inherited |
| **mode** | A (brand-faithful) | phrase: *"Mode A"* + signal-strong default |
| **N variants** | 3 (A/B/C role-differentiated) | phrase: *"three variants"* |
| **ia-fidelity** | reimagined (variants may demote/promote/re-shape priorities under § 8 audit) | not auto-pinned; default for refresh; trait-matrix hint confirms |
| **density** | balanced (multi-audience hard floor: desktop ≤ 64px) | default for brand-register; trait-matrix hint confirms |
| **expressive** | A: restrained · B: committed (motion) · C: committed (photography) | role contract |
| **distinctiveness** | A: familiar (identical to current minus improvements) · B/C: distinctive (each amplifies one captured trait) | role contract |
| **tone** | professional-warm (unchanged from current) | inherited |
| **color-energy** | unchanged (palette pinned under Mode A) | locked |
| **type-energy** | clamp() fluid scale replaces ad-hoc (improvements #4) | improvements list |

## Brand-signal classification

`signal-strong` — captured palette has 8 distinct colors after near-duplicate clustering, AND `_brand-extraction.json#type.headingFamily.name === "Adobe Clean"` AND `bodyFamily.name === "Adobe Clean"`. The strong-signal classification fires Mode A unconditionally per § Mode-detection precedence step 1.

## Mode detection result

**Mode A — Brand-faithful.** Active by default + explicit in phrase.

- Palette: inherited from `_brand-extraction.json + samples`. `picked_by: user-constraint`.
- Type: `font_deck.name = "brand-inherited"`. `picked_by: user-constraint`. Adobe Clean / Adobe Clean Display pinned.
- Decade: `2025-now` (samples are 2026 work; live captured surface is current). `picked_by: anchor-reference: samples`.
- Craft: `web-product`. `picked_by: user-constraint` (register=brand + Mode A locks craft to captured medium).
- Register (seed): `Product/Commerce (multi-audience routing)`. `picked_by: anchor-reference: captured PRODUCT.md`.
- Ground family: `stark-white`. `picked_by: user-constraint` (captured ground is literal #ffffff). **Mode C override: brand-faithful.**

No seed roll for type or palette dimensions — Mode A discipline. Non-locked dimensions (decade, craft, register, ground-family) resolve from anchors, not from MD5-driven divergence picks.

## Anchors

Two concrete anchor sources beyond stardust's named-reference vocabulary:

1. **`samples/SAMPLES.md`** — the distilled vocabulary from two static HTML samples (`bizpro-hub-prototype/bizpro-hub.html`, `plan-page/Acrobat Plans — PDF & Productivity.html`) + one live fragment (`sr-homepage`). Implies: Lenis 1.x stack (no GSAP), s2a-* token system, 16/20px radius vocabulary, clamp() fluid type scale, rounded-top section transition primitive (32px), nested-radius card system, Adobe Clean / Adobe Clean Display, Adobe blue (#3b63fb) as the only saturated CTA color, brand-mnemonic red (#eb1000) reserved.

2. **`stardust/current/_brand-extraction.json`** — live-captured surface confirms the samples' tokens almost byte-for-byte. Primary `#3b63fb` matches 91× across the 7 captured pages. Adobe Clean family detected with 6 weights.

## Brand-faithful inversions (Mode A)

Three stardust hard rules that yield to the captured brand surface. Each entry is logged in every variant's `DESIGN-{A,B,C}.json#extensions.divergence.brand_faithful_inversions[]`:

1. **No pure black/white surfaces → literal `#000` and `#ffffff` are legal and load-bearing.** Reason: captured on every of 7 extracted pages. Footer black, body white. Removing the inversion would visibly change the brand.

2. **No glassmorphism / backdrop-filter blur → `backdrop-filter: blur(64-128px)` over `rgba(255,255,255,0.64)` on nav is legal.** Reason: captured on every page; the nav pill carries this treatment. Brand-faithful and load-bearing.

3. **OKLCH-only color tokens → hex format retained.** Reason: captured surface uses hex (#3b63fb, #eb1000, #2c2c2c, etc.). Migrate may convert to OKLCH per-page if needed but DESIGN tokens stay hex.

## Anti-toolbox audit

Run regardless of mode per `divergence-toolkit.md § 1 Enforcement + Self-audit`. All guards passed:

| Guard | Fired? | Rationale |
|---|---|---|
| generic-2026-SaaS-silhouette | no | Adobe.com home leads with product demo imagery, not abstract gradient + dual CTA. Captured pattern already declines. |
| pre-2024-SaaS-template (engineers + dual CTA) | no | No engineers-at-laptop stock + left-CTA pattern observed in captured pages. |
| editorial-register-vocabulary-on-non-editorial-brands | no | PRODUCT.md anti-references explicit. Samples confirm: no "atelier" / "studio" / "journal" vocabulary. |
| size-as-personality (120pt+) | no | Display caps at 80px via title-1 `clamp(40px, 6.25vw, 80px)`. |
| padding-as-personality (airy on multi-audience) | no | Multi-audience hard floor caps sectionPadding.desktop at 64px (per § 4). Density tier balanced. |
| stock-photography | no | Mode A image-reuse contract. Captured imagery is product output (Generative Fill brick wall, named creators), not templated stock. |
| motion-as-personality (overuse on B) | checked | Variant B caps choreographed sequences at 3 per page (per DESIGN-B.md § Rules); below-fold uses baseline entrance only. Motion is a captured trait from samples, not invented — passes the captured-trait amplification rule. |
| C-cliff (B+more, extreme-axis) on C | no | Variant C amplifies a distinct captured trait (photography-led) vs B (motion-led). Defensible standalone proposition. Not a slider position. |
| variant-homogeneity | no | A/B/C differ on ≥2 axes per pair (hero strategy + primary card pattern + motion energy + dark/light rhythm + type emphasis). Differentiation contract passes. |

## Movements

```
expressive       (A)  restrained → restrained (unchanged)
expressive       (B)  restrained → committed (motion-led)
expressive       (C)  restrained → committed (photography-led)
distinctiveness  (A)  familiar → familiar (unchanged; improvements applied)
distinctiveness  (B)  familiar → distinctive (one captured trait amplified)
distinctiveness  (C)  familiar → distinctive (different captured trait amplified)
tone             (—)  professional-warm → professional-warm (unchanged across all)
density          (—)  packed-to-balanced → balanced (default; multi-audience floor)
ia-fidelity      (—)  → reimagined (default; trait-matrix confirms)
color-energy     (—)  unchanged (palette pinned under Mode A)
type-energy      (—)  ad-hoc → clamp()-fluid (improvements #4)
motion-energy    (A)  none → baseline (Lenis entrance + scroll-driven section reveals)
motion-energy    (B)  none → cinema (scroll-grow hero + reverse-hero carousels + garage-door + wordmark wipe)
motion-energy    (C)  none → elastic-hover (tile hover-reveals; no scroll-grow)
audience         (—)  4 tracks preserved (locked by IA-priority audit)
```

## IA-priority preservation audit (Mode A)

Five captured signals fire trigger conditions. Each entry below is stamped in `DESIGN-{A,B,C}.json#extensions.iaPriorities[]` and downstream prototype + migrate must honor. Mutability is `movable` per the resolved `reimagined` ia-fidelity tier — variants may demote/promote/re-shape, but cannot remove.

| Signal | Evidence | Preserve as | Scope | Mutability |
|---|---|---|---|---|
| commercial-conversion | "Free trial" / "Buy now" / "View plans and pricing" present within first viewport on every page | first-viewport | site-wide | movable |
| audience-routing | Top nav with 4 tracks (Creativity & Design / PDF & E-signatures / Marketing & Commerce / Help & Support) | nav | site-wide | movable |
| product-mnemonic-discoverability | Product-tile grid (Photoshop, Illustrator, Premiere, Express, Acrobat, Firefly) on home + express + product hubs | home-body | home + hub pages | movable |
| trust-signals | Brand mnemonic + "It starts with Adobe." + Save 50% promotional copy | above-mid-page | home | movable |
| persistent-help | Help & Support nav track + agentic search pattern from samples | footer-adjacent | site-wide | movable |

## Variant role contract (Phase 2.6 — ia-fidelity: reimagined → A + B + C)

### Variant A — "Faithful + improvements"

Role: *"this is what your site should be tomorrow."* Same IA, same composition strategy, all 5 improvements applied. Risk-averse stakeholder green-light.

- Apply every item from `stardust/prototypes/home-improvements.md` (CTA vocabulary consolidation, Lenis entrance baseline, dismissible geo-banner, clamp() fluid type scale, brand-faithful inversions logged).
- Token contract: inherits from `stardust/current/DESIGN.json` with the improvements deltas.
- Motion: baseline (Lenis page-load entrances + scroll-driven section reveals).
- DESIGN files: `DESIGN-A.md` + `DESIGN-A.json` at project root.

### Variant B — "Scroll cinema amplified"

Role: *"what if we leaned into motion-as-choreography?"*

- Captured trait amplified: **scroll-driven choreography** from `samples/static/bizpro-hub-prototype/bizpro-hub.html`. Specifically: hero-scroll-grow (300vh + sticky child + video scaling), tutorial-carousel-reverse-hero entrance, studio-banner garage-door reveal via CSS scroll-driven animations, footer wordmark clip-path wipe, stories mouse-proximity pan.
- Brand-personality move: amplifies *aspirational but specific* by making every primary section a directed sequence. Adobe owns the production bench for this; the captured live surface doesn't yet deploy it.
- Token contract: inherits A's tokens unchanged. The visual identity is in the motion, not the surface.
- Motion: Lenis stack mandatory (not optional). Up to 3 choreographed sequences per page. Reduced-motion strict.
- DESIGN files: `DESIGN-B.md` + `DESIGN-B.json` inheriting from `DESIGN-A.json`.

### Variant C — "Elastic tile mosaic amplified"

Role: *"what if we leaned into photography-led-tile-mosaics?"*

- Captured trait amplified: **photography-led tile vocabulary** from `samples/live/snapshots/sr-homepage.html` (the live `/upp-shared/fragments/tests/2026/q2/ace1201/sr-homepage` fragment). Specifically: asymmetric mosaic grid hero (1.5fr feature 16:9 + 1fr 2×2 mnemonic 1:1), hover-revealed background imagery with gradient-scrim overlay, three-aspect-ratio vocabulary (16:9 / 4:3 / 1:1), intensified dark-band rhythm (≥2 dark sections per major page) with 32px rounded-top transitions.
- Brand-personality move: amplifies *tile-led, photo-led* by making the marketing surface read as a creative-product gallery. Type recedes in the mosaic context (title-3/4 max); imagery leads.
- Token contract: inherits A's tokens + three new tile-aspect radii (20/16/12px) + tileGridGap (12px). The amplification is layout + interaction (hover), not new color/type.
- Motion: A's baseline only. **No** scroll-grow hero (that's B's trait). Motion energy lives in hover, not scroll.
- DESIGN files: `DESIGN-C.md` + `DESIGN-C.json` inheriting from `DESIGN-A.json`.

## Variant differentiation contract

Every pair of variants differs by ≥ 2 substantive changes:

| Axis | A | B | C |
|---|---|---|---|
| Hero strategy | bounded single-product | scroll-grow 300vh + sticky | asymmetric mosaic (feature 16:9 + 2×2 mnemonics) |
| Primary card | merch-card (nested-radius pricing) | story-card (carousel hero) | explore-card-mosaic (hover-reveal) |
| Motion energy | baseline (entrance + section reveal) | cinema (scroll choreography) | elastic-hover (tile hover-reveal) |
| Dark/light rhythm | white-led, 1-2 dark sections | white-led, 2-3 dark sections | dark-led pattern, ≥2 dark bands intensified |
| Type emphasis | clamp() display central | clamp() display central | clamp() display recedes (title-3/4 max in mosaic) |

A↔B: differ on hero strategy + motion energy + dark/light rhythm (3 changes — passes).
A↔C: differ on hero strategy + primary card + dark/light rhythm + type emphasis (4 changes — passes).
B↔C: differ on hero strategy + primary card + motion energy + type emphasis (4 changes — passes).

## Outputs written

```
PRODUCT.md                                     ← target strategy (shared across variants)
DESIGN-A.md / DESIGN-A.json                    ← faithful + improvements
DESIGN-B.md / DESIGN-B.json                    ← scroll cinema amplified
DESIGN-C.md / DESIGN-C.json                    ← elastic tile mosaic amplified
stardust/prototypes/home-improvements.md       ← Phase 2.5 list (5 weaknesses)
stardust/direction.md                          ← this file
stardust/state.json                            ← updated (direction block + per-page status extracted→directed + variants registry)
```

## User confirmation log

- **Plan presented:** 2026-05-22T14:25:00-07:00 (Phase 1 reasoning + plan)
- **User confirmation:** "go" — 2026-05-22T14:30:00-07:00
- **Execution complete:** 2026-05-22T14:55:00-07:00

## Defaults that fired (assumption log)

- **ia-fidelity: reimagined (default)** — phrase didn't auto-pin; trait-matrix hint corroborated. User did not override.
- **density: balanced (default)** — phrase didn't move density; multi-audience hard floor applies (≤64px desktop). User did not override.
- **Tone: professional-warm (inherited)** — phrase didn't propose a tone move. Inherited from current/PRODUCT.md.

## Next

```
$stardust prototype home --variant A    # render home page proposal under variant A
$stardust prototype home --variant B    # ditto under variant B
$stardust prototype home --variant C    # ditto under variant C
```

Recommended order: render variant A on home first (it's the floor); review; render B and C against the same page so the comparison is direct. After home is validated across all three variants, pick the strongest and proceed to product-page prototypes.
