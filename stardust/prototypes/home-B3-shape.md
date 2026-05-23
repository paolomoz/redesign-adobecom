<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-05-23T19:30:00-07:00
  readArtifacts:
    - DESIGN-B3.json
    - DESIGN-B.json   # parent
    - DESIGN-A.json   # transitive base
    - stardust/prototypes/home-B-shape.md   # immediate-parent compositional reference
    - stardust/prototypes/b-directions-B1-B5.html   # B3 first sketched
    - stardust/current/pages/home.json
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: B3
  slug: home
  fidelity: refined
  surprise: medium-high
  dominantDimension: maximal-scroll-cinema
  parent: home-B-shape.md
  inheritanceChain: "home-B3 → home-B → home-A"

  capturedSourceLineage: "Inherits home-B-shape.md's lineage map verbatim. B3 adds 2 sections of motion: featured-products gets parallax-translate; in-the-news gets 3-stage scroll-scrub. Both are samples-adjacent motion patterns (samples don't deploy them explicitly but they're within B's vocabulary of rAF-driven scroll-coupling)."

  antiTemplatePass:
    inheritedFromB: true
    b3Additions:
      - pattern: "below-fold-static (B baseline)"
        defaultReflex: "let below-fold be calm to make above-fold motion land"
        alternatives:
          - "saturate below-fold with motion (B3 — maximal cinema thesis)"
          - "keep below-fold calm (B baseline — wrong for B3)"
          - "selective hover-reveal on below-fold tiles (variant C territory — wrong for B3)"
        picked: "saturate below-fold with parallax + 3-stage scroll-scrub"
        rationale: "B3's load-bearing claim is 'Adobe's full motion bench on every primary surface.' If below-fold sits calm, the variant collapses back into B. The motion saturation IS the variant."

  surpriseTier_typeScaleYields:
    - rule: "DESIGN-A.json type-scale clamp ratio ≈1.43"
      variantDominantDimension: "maximal-scroll-cinema"
      capturedTraitAmplified: "scroll-driven choreography (inherited from B)"
      yieldedTo: "DESIGN-B3.json perfect-fifth 1.5 ratio (loudest canonical scale)"
      rationale: "B3's loud register requires bigger marquee read; perfect-fifth is the canonical scale for that register"

  substrateTransitions:
    default: "#ffffff (body)"
    exceptions:
      - substrate: "#0a0a14 (dark hero substrate — B inheritance)"
        purpose: "hero-scroll-grow"
        citation: "DESIGN-B.json motion choreography"
      - substrate: "#1f0a08 (warm-dark — B3 warm-leaning override)"
        purpose: "studio-banner garage-door"
        citation: "DESIGN-B3.json color-temperature: warm-leaning"
      - substrate: "#000000 (system-component footer)"
        purpose: "site-footer"
        citation: "captured _brand-extraction.json"
    count: 3
    capCheck: "≤2 by default. B3 leans into the carve-out — surprise: medium-high + B's substrate strategy already inherits 2 transitions. B3 keeps that count + warm-tints them. Per Discipline 4 carve-out #2 (substrate-keyed document-shapes), the document-shape is 'maximal motion cinema' which is substrate-keyed (dark sections carry the heavy motion sequences). Acceptable."

  voiceClassification:
    inheritedFromB: true
    b3Overrides:
      hero:
        h1-treatment: "perfect-fifth scale — clamp(48, 8vw, 108px) — louder read than B"
      news-meta-stage-tags:
        b3-addition: "the 3-stage scroll-scrub adds visible timing tags per item: '@rawP 0.20' / '@rawP 0.50' / '@rawP 0.80' — visible only in the dev / first-time-view; hidden after entrance completes. This is brief-time documentation, not production chrome."
        classification: "direction-authorized chrome (per friction carve-out #3); removable for production migrate"

  unsourcedContent:
    inheritedFromB: true
    b3-specific: []

  compositionDelta_vs_A:
    - "hero-strategy: A 5/7 split light → B3 300vh scroll-grow + perfect-fifth title-1 (loud)"
    - "below-fold motion: A baseline section-entrance only → B3 has 2 additional choreographies (featured-parallax + news-scrub)"
    - "type-scale: A clamp ≈1.43 → B3 perfect-fifth 1.5"
    - "density: A balanced 64px → B3 packed 48px"
    - "color-temperature: A neutral → B3 warm-leaning"

  compositionDelta_vs_B:
    - "type-scale: B A-inherited clamp → B3 perfect-fifth 1.5 (louder)"
    - "density: B balanced 64px → B3 packed 48px"
    - "motion count: B 3 rAF choreographies → B3 5 rAF (cap override)"
    - "below-fold treatment: B baseline entrance only → B3 featured-parallax + news-3-stage-scrub"
    - "body H3 weight: B 400 → B3 700"
    - "color-temperature: B neutral → B3 warm-leaning placeholders"
    - "spacing rhythm: B standard → B3 compact (gridGap 16→8)"
    - "title-1 max: B 80px → B3 108px"

  compositionDelta_vs_C:
    - "primary micro-interaction: B3 scroll choreography → C tile hover-reveal"
    - "hero: B3 scroll-grow on dark substrate → C asymmetric mosaic"
    - "below-fold structure: B3 parallax + scroll-scrub → C 4-band gallery-rhythm with dark-band cadence"
    - "type emphasis: B3 perfect-fifth title-1 → C title-3 max in mosaic context"
    - "motion energy: B3 high (5 choreographies) → C minimal scroll (hover-led)"

  compositionDelta_vs_F:
    - "AI affordance system: B3 none → F 5 AI components (eyebrow-underline / sparkle text / card border / button surface / mnemonic ribbon)"
    - "primary surface chromatics: B3 warm-leaning placeholders → F dark substrates with AI gradient affordance"
    - "motion stack: B3 5 rAF choreographies → F baseline only (motion-restrained)"
    - "below-fold strategy: B3 parallax + scroll-scrub → F AI-tools-showcase (dark gradient surface)"
-->

# Page-shape brief — home / variant B3 (Loud / Maximal cinema)

> Brief for `home-B3-proposed.html`. Surprise budget: **medium-high**. Dominant dimension: **maximal-scroll-cinema**. Surface fork of B (inherits B's compositional spine + adds 2 below-fold choreographies + tunes 6 surface axes loud).

## Variant role

**B3 — Surface fork of B — Maximal cinema (loud register).**

Same captured trait as B (scroll-driven choreography from samples' `bizpro-hub.html`). Different delivery — every dial that can be turned up without breaking the brand IS turned up. The variant tests the question: how loud can adobe.com's scroll choreography get before motion fatigue beats expressive payoff?

## Composition (inherits B's section list)

```
[1] site-header                  ← system-component (header)
[2] hero-scroll-grow             ← B inheritance + perfect-fifth title-1 (loud)
[3] stories-strip                ← B inheritance + packed density
[4] tutorial-carousel            ← B inheritance + compact card sizing
[5] featured-products            ← B inheritance + B3-NEW parallax-translate
[6] studio-banner-garage-door    ← B inheritance + warm-tinted substrate
[7] in-the-news                  ← B inheritance + B3-NEW 3-stage scroll-scrub
[8] site-footer                  ← system-component + mandatory wordmark wipe
```

> Same section count, same purpose order as B. Differences are tuning (surface axes) + 2 new motion choreographies on previously-static below-fold sections.

## What B3 changes from B

### 1. Type scale at perfect-fifth (1.5)
- title-1: `clamp(48px, 8vw, 108px)` / line-height 0.90 / letter-spacing -3.5px / weight 900
- title-2: `clamp(36px, 5.33vw, 72px)` / line-height 0.95
- title-3: `clamp(28px, 3.55vw, 48px)` / line-height 1.05
- title-4: 32px (bumped from A's 24px to maintain perfect-fifth proportion)

### 2. Type weight on body H3s bumped to 700
News item H3s and card H3s pick up to weight 700 (vs A/B's 400). Heavier register matches the loud surface.

### 3. Density packed
- sectionPadding-desktop: 48px (vs B's 64px)
- sectionPadding-tablet: 36px (vs B's 48px)
- sectionPadding-mobile: 24px (vs B's 32px)
- gridGap-md: 8px (vs B's 16px)
- card padding: 20px (vs B's 24px)

### 4. Motion energy — 5 rAF choreographies (cap override to ≤5)
- inherited from B: hero-scroll-grow, stories-mouse-pan, tutorial-reverse-hero
- B3-NEW: featured-products-parallax
- B3-NEW: news-scroll-scrub-3-stage
- still declarative-CSS: studio-banner garage-door (view-block animation-timeline)
- still rAF: footer wordmark wipe

### 5. Color temperature warm-leaning
Placeholder gradients on hero / featured-products / studio-banner pick up amber/orange dominant tones (vs B's neutral grays + cool blues + warm subtle).

### 6. Spacing rhythm compact
Grid gaps tightened, card padding tightened, card-internal spacing tightened. The page feels denser without being cramped (multi-audience hard floor still respected — sectionPadding stays ≥40px).

## New choreographies (B3-specific)

### featured-products-parallax

The featured-products section's two media blocks translate at 60% scroll velocity while the section container scrolls at 100%. Creates depth — the media sits in a deeper plane than its container.

```js
// rAF on featured-products section
const rate = 0.6;
const rect = featuredEl.getBoundingClientRect();
const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
mediaEls.forEach(m => {
  m.style.transform = `translateY(${(progress - 0.5) * rect.height * (1 - rate)}px)`;
});
```

Bidirectional. Reduced-motion: parallax disabled, media at default position. Will-change: transform.

### news-scroll-scrub-3-stage

The in-the-news section's 3 photo grid items reveal at staged scroll progress — item 1 at rawP=0.2, item 2 at 0.5, item 3 at 0.8. Wider stagger than the universal `anim-enter` (which uses 0.10/item); B3's stagger gives each item more weight.

```js
const stages = [0.2, 0.5, 0.8];
const progress = clamp((sY - newsTop + vh) / (vh + newsH), 0, 1);
items.forEach((el, i) => {
  const p = clamp((progress - stages[i]) / 0.15, 0, 1);
  el.style.opacity = String(p);
  el.style.transform = `translateY(${(1 - p) * 24}px)`;
});
```

Bidirectional. Reduced-motion: items at default visible state. Will-change: opacity, transform.

## Risk acknowledgement

Per DESIGN-B3.md § Risk notes, B3 carries three live risks:
1. **Motion fatigue** — 5 concurrent rAF + CSS view-block. Verify on low-end devices.
2. **Layout shift propagation** — 5 motion-coupled timings; lazy-load shifts can disrupt all 5. Mitigations: explicit aspect-ratio + eager LCP image + `font-display: swap` with `size-adjust`.
3. **Below-fold attention saturation** — works when density-as-creativity is the message; risks reading as overstimulation if not.

These are documented in the proposed file's `_provenance.b3Risks[]` for migrate-time review.

## Structural data attributes

Inherits B's set + B3-specific motion markers:

- `<header data-component="site-header" data-system-component="header" data-nav-collapse="hamburger">`
- `<section data-section="hero-scroll-grow" data-section-purpose="marquee" data-variant="B3" data-type-scale="perfect-fifth">`
- `<section data-section="stories-strip" data-section-purpose="conversion" data-pan="mouse-proximity">`
- `<section data-section="tutorial-carousel" data-section-purpose="navigation" data-carousel="reverse-hero">`
- `<section data-section="featured-products" data-section-purpose="feature-list" data-motion="parallax-translate" data-parallax-rate="0.6">`
- `<section data-section="studio-banner-garage-door" data-section-purpose="brand-statement" data-animation-timeline="view-block">`
- `<section data-section="in-the-news" data-section-purpose="rich-text" data-motion="scroll-scrub-3-stage" data-stages="0.2,0.5,0.8">`
- `<footer data-component="site-footer" data-system-component="footer" data-wordmark-wipe="mandatory">`

## Heading hierarchy

- H1 (one): "Transform how you share information." (hero — captured-verbatim, displayed at perfect-fifth clamp 48-108)
- H2: 8 (promo H2s + product hubs + featured + studio-banner + news head)
- H3: per-section cards + news items (weight 700 on body H3s per B3 override)

## Fidelity

`refined` — same baseline as A/B. Plus B3-specific:
- `will-change: transform` on parallax-host
- `will-change: opacity, transform` on scroll-scrub items
- `font-size-adjust: ex-height 0.5` on body (helps reduce layout shift on font swap when family delays)

## Open questions
None — B3's spec is complete. Render directly.
