<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-05-22T15:35:00-07:00
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN-A.md
    - DESIGN-A.json
    - PRODUCT.md
    - stardust/direction.md
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: A
  slug: home
  fidelity: refined
  surprise: low
  dominantDimension: baseline-fidelity-with-improvements

  capturedSourceLineage:
    - section: site-header
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=header])"
    - section: hero
      lineage: "captured pages/home.json#landmarks[main]/children[0] — Photoshop / Generative Fill hero with product-mnemonic eyebrow added (improvement #3)"
    - section: promo-strip
      lineage: "captured pages/home.json — two promo H2s ('Save 50% on Creative Cloud Pro.' + 'Save 30% and go unlimited.')"
    - section: product-hub-tiles
      lineage: "captured pages/home.json — Creative Cloud / Acrobat / Explore tile row"
    - section: featured-products
      lineage: "captured pages/home.json — 'New partner AI models in Generative Fill.' + 'It starts with Adobe.' featured cards"
    - section: in-the-news
      lineage: "captured pages/home.json#landmarks[main] — 'In the news' sidebar with 3 H3 items"
    - section: site-footer
      lineage: "site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=footer])"

  antiTemplatePass:
    - pattern: "hero (single-product photo + overlay copy + CTA)"
      defaultReflex: "centered-stack hero with two-button CTA pair (default-to-escape)"
      alternatives:
        - "left-anchored editorial composition (samples-aligned)"
        - "asymmetric mosaic (variant C territory — wrong variant)"
        - "keep captured silhouette + add product-mnemonic eyebrow + dismiss geo-modal (faithful + improvements)"
      picked: "keep captured silhouette + add product-mnemonic eyebrow + dismissible geo-banner"
      rationale: "Variant A is faithful + improvements; the silhouette is captured and brand-recognizable. Improvement #3 names the specific edit (mnemonic eyebrow + geo demoted to dismissible banner). The default-to-escape reflex is exactly what variant A must NOT introduce — it'd convert Adobe's product-led hero into a generic SaaS pattern."

    - pattern: "promo strip (two side-by-side promo cards)"
      defaultReflex: "5-up image-card grid as category nav (default-to-escape)"
      alternatives:
        - "2-up with photo on left, copy + CTA on right (faithful — kept)"
        - "single full-width promotional banner"
        - "3-up with one feature + two secondary"
      picked: "2-up side-by-side with consolidated CTA verbs"
      rationale: "Captured silhouette preserved; improvement #1 (CTA vocabulary consolidation) consolidates the two captured 'Learn more' / 'Buy now' verbs into 'View plans and pricing' + 'Buy now'."

    - pattern: "product mnemonic grid (9 explore-card tiles, 3x3, hover-reveal bg)"
      defaultReflex: "5-up image-card grid as category nav (default-to-escape) | nav-icon glyphs in typographic register"
      alternatives:
        - "keep 3x3 grid with hover-reveal (faithful — already a non-template captured trait)"
        - "asymmetric tile mosaic (variant C — wrong variant)"
        - "vertical narrative list"
      picked: "keep 3x3 grid with hover-reveal bg + Mode A image-reuse"
      rationale: "The 9-tile grid IS captured-pattern + already non-template. The hover-reveal behavior is the elastic micro-interaction captured in samples. Mode A image-reuse contract preserves the captured product imagery at the same semantic position."

    - pattern: "in-the-news sidebar (3 H3 items with thumbnails)"
      defaultReflex: "carousel / slider (over-engineering)"
      alternatives:
        - "vertical list with thumbnails (faithful — kept)"
        - "tab-switched 3-up grid"
        - "marquee scroll"
      picked: "vertical list with thumbnails"
      rationale: "Captured silhouette preserved. List is appropriate for low-volume news index; carousel would be over-engineering for 3 items."

  substrateTransitions:
    default: "#ffffff (body — captured)"
    exceptions:
      - substrate: "#000000 (literal black — captured on footer)"
        purpose: "footer chrome (system-component-honoured)"
        citation: "_brand-extraction.json#systemComponents[kind=footer] + samples' bizpro-hub footer pattern"
    count: 1
    capCheck: "1 ≤ 2 — passes Discipline 4. Hero photo bg ('brick wall / generative fill demo') is content, not a section substrate; the section's background-color stays #ffffff with the photo as a foreground image."

  voiceClassification:
    - section: geo-banner
      classification: "direction-authorized chrome (per friction #3 — placeholder-ribbon label)"
      copy: "Adobe detected your region is Italy. Visit adobe.com/it for a localized experience."
      source: "direction-authorized rewrite of captured modal copy (improvement #3) — exact wording finalised at craft time; localised at migrate"

    - section: site-header
      classification: "captured-verbatim"
      copy:
        nav: ["Creativity & Design", "PDF & E-signatures", "Marketing & Commerce", "Help & Support"]
        ctas: ["View plans and pricing", "Sign In"]
      source: "captured pages/home.json#headings + ctas"

    - section: hero
      classification: "captured-verbatim + direction-authorized eyebrow"
      copy:
        eyebrow: "Adobe Photoshop"
        h1: "Transform how you share information."
        body: "[captured hero body — sourced from home.json#landmarks[main]/children[0]/body[0]]"
        cta_primary: "Free trial"
        cta_outline: "View plans and pricing"
      source: "h1 captured-verbatim; eyebrow direction-authorized rewrite per improvement #3 — adds product-mnemonic framing; CTA verbs consolidated per improvement #1"

    - section: promo-strip
      classification: "captured-verbatim"
      copy:
        promo1_h2: "Save 50% on Creative Cloud Pro."
        promo1_cta: "View plans and pricing"
        promo2_h2: "Save 30% and go unlimited."
        promo2_cta: "Buy now"
      source: "pages/home.json#headings (H2 #2 and #3)"

    - section: product-hub-tiles
      classification: "captured-verbatim"
      copy:
        tile1: { eyebrow: "Creative Cloud", cta: "View plans and pricing" }
        tile2: { eyebrow: "Acrobat", cta: "View plans and pricing" }
        tile3: { eyebrow: "Explore", cta: "View all products" }
      source: "captured H2s + paired CTAs"

    - section: featured-products
      classification: "captured-verbatim"
      copy:
        feature1_h2: "New partner AI models in Generative Fill."
        feature1_eyebrow: "Adobe Photoshop"
        feature1_cta: "Learn more"
        feature2_h2: "It starts with Adobe."
        feature2_eyebrow: "Adobe for Business"
        feature2_cta: "Learn more"
      source: "pages/home.json#headings + per-section pattern"

    - section: in-the-news
      classification: "captured-verbatim"
      copy:
        h2: "In the news"
        items:
          - "Prepare your taxes with Adobe Acrobat this season."
          - "Get more done with new AI features in Acrobat."
          - "Adobe apps are top choice for Sundance filmmakers."
      source: "pages/home.json#headings (H3 items under 'In the news')"

    - section: site-footer
      classification: "captured-verbatim"
      copy:
        columnTitles: ["For individuals & small business", "For medium & large business", "For Organizations", "Support", "Contact", "Adobe"]
        featuredProducts: ["Acrobat Reader", "Firefly", "Adobe Express", "Photoshop"]
        legal: ["Change region", "Copyright", "Do not sell or share my personal information", "AdChoices"]
      source: "_brand-extraction.json#systemComponents[kind=footer] + samples' bizpro-hub footer"

  unsourcedContent:
    - { section: "geo-banner", item: "exact banner copy", reason: "direction-authorized rewrite; finalise at craft time" }
    - { section: "hero", item: "hero subcopy (body[0])", reason: "current home.json body[] may be empty due to lazy-load timing; placeholder PLACEHOLDER if unavailable" }

  compositionDelta_vs_B:
    - "section-presence: scroll-grow hero (300vh + sticky) is present in B, absent in A (A's hero is static-bounded)"
    - "section-strategy: footer wordmark — A baseline clip-path wipe on home only; B mandatory wipe on every page with footer"
    - "motion-energy: A baseline entrance only; B amplified to scroll cinema on every primary section"

  compositionDelta_vs_C:
    - "hero-layout: A is single-product hero; C is asymmetric mosaic (1.5fr feature 16:9 + 1fr 2x2 mnemonics)"
    - "primary-card: A uses captured promo cards + 9-tile product grid; C amplifies to explore-card-mosaic with hover-revealed background imagery on every tile"
    - "dark-band rhythm: A has 1 dark substrate (footer); C has ≥2 dark substrates (intensified rhythm)"
    - "type emphasis: A uses title-1 in hero; C caps at title-3/title-4 in mosaic context"
-->

# Page-shape brief — home / variant A (faithful + improvements)

> Brief for `home-A-proposed.html`. Surprise budget: **low**. Same IA, same composition strategy as captured surface; every improvement from `stardust/prototypes/home-improvements.md` applied. Risk-averse stakeholder green-light.

## Variant role

**A — Faithful + improvements.** Per `direct/SKILL.md § Phase 2.6 Variant role contract`: same IA, same section sequence, same composition strategy. Apply every improvement from the list — no extras, no embellishment, no creative reach. The brand team should react *"yes, that's us, with the obvious fixes."*

## Dominant dimension

`baseline-fidelity-with-improvements` — distinct from B's `scroll-cinema-choreography` and C's `elastic-tile-mosaic` per Discipline 10. Variant A has the lowest surprise budget; B and C amplify captured traits while A holds the baseline.

## Sections (composition order)

```
[1] site-header         ← system-component (header)
[2] hero                ← captured (Photoshop / Generative Fill) + mnemonic eyebrow
[3] promo-strip         ← captured (Save 50% + Save 30% twin promo cards)
[4] product-hub-tiles   ← captured (Creative Cloud + Acrobat + Explore tile row)
[5] featured-products   ← captured (Generative Fill + It starts with Adobe featured cards)
[6] in-the-news         ← captured (3-item news sidebar/grid)
[7] site-footer         ← system-component (footer)
```

> **Iteration 2026-05-23:** geo-banner section removed per user refinement. Geo handling reframed as infrastructure-layer concern (edge / Akamai redirect) rather than a UI surface. Improvement #3's mnemonic-eyebrow half retained on the hero; modal-demotion half retired (the captured intercepting modal stays out of the redesign entirely).

## Layout strategy per section

### 1. Site-header

Per `DESIGN-A.json#extensions.systemComponentRoles[role=site-header]`. Fixed top, 8px outer padding, 64px inner pill. Backdrop-blur (per inversion) over `rgba(255,255,255,0.64)`. Adobe lockup inline SVG (16h) on left, slash divider, 4-track nav (Creativity & Design / PDF & E-signatures / Marketing & Commerce / Help & Support) hidden below 900px. Right: all-apps icon + "View plans and pricing" primary CTA + "Sign In" outline CTA. Scrolled state adds `0 2px 12px rgba(0,0,0,0.08)` shadow. Page-load `enterDown` 600ms entrance.

### 2. Hero

Captured Photoshop / Generative Fill hero — full-width section, white background, photo (brick wall + skateboard, generative-fill demo) **bounded** in a 16:9 frame on the right, copy column on the left.

- **Layout:** 2-column at desktop (5/7 split, copy on left). Stacks vertically at <900px.
- **Eyebrow** (improvement #3): "Adobe Photoshop" — `eyebrow` token, weight 700, text-soft color.
- **H1:** "Transform how you share information." — `title-1` (clamp 40-80 / weight 900 / lh 0.95 / tracking clamp).
- **Body:** captured hero subcopy. Sourced from `home.json#landmarks[main]/children[0]/body[0]`. If captured body is empty (lazy-load timing), render PLACEHOLDER with the mandatory visual signature.
- **CTA pair:** primary "Free trial" + outline "View plans and pricing" (improvement #1 — consolidated verbs).
- **Photo:** captured image at `naturalWidth × naturalHeight`, 4:3 or 16:9 aspect, `object-fit: cover`, 16px border-radius, no shadow.
- **Entrance:** `enterUp` staggered 0/80/160ms (eyebrow / h1 / body) per samples; CTA pair 240ms.
- **No** scroll-grow choreography — that's B's amplification.

### 3. Promo strip

2-up grid (`grid-template-columns: 1fr 1fr; gap: 8px`). Each card uses `ds-card` (light bg `#f8f8f8`, 16px radius, 24px padding) with a captured promo image on the left half, copy + CTA on the right half. At <768px stacks to 1-col.

- **Card 1:** H2 "Save 50% on Creative Cloud Pro." + 1-line subcopy (captured) + "View plans and pricing" primary CTA.
- **Card 2:** H2 "Save 30% and go unlimited." + 1-line subcopy (captured) + "Buy now" primary CTA.
- **Entrance:** registered in scroll-driven section entrance with stagger 0.10.

### 4. Product hub tiles

3-up grid (`grid-template-columns: repeat(3, 1fr); gap: 8px`). Each tile:

- Top half: captured product imagery (Creative Cloud / Acrobat / Explore card photo).
- Bottom half: H2 product name + body description + outline CTA.
- **Tile 1:** Creative Cloud — "View plans and pricing"
- **Tile 2:** Acrobat — "View plans and pricing"
- **Tile 3:** Explore — "View all products"

At <768px stacks to 1-col. Entrance: stagger 0.12.

### 5. Featured products (2-up wider tiles)

2-up grid with featured promotional cards. Larger than product hub tiles; each card carries a featured product moment.

- **Card 1:** "Adobe Photoshop" eyebrow / "New partner AI models in Generative Fill." H2 / captured body / "Learn more" outline CTA.
- **Card 2:** "Adobe for Business" eyebrow / "It starts with Adobe." H2 / captured body / "Learn more" outline CTA.

At <900px stacks. Same scroll-driven entrance pattern.

### 6. In the news

Vertical list with 3 captured news items. Section H2 "In the news" at title-3 / weight 900. Items render as cards with thumbnail + H3 + meta (date if captured). Each item links to its captured news URL.

- "Prepare your taxes with Adobe Acrobat this season."
- "Get more done with new AI features in Acrobat."
- "Adobe apps are top choice for Sundance filmmakers."

Render at full width on desktop, single column. At <768px keep single column (already optimal).

### 7. Site-footer

Per `DESIGN-A.json#extensions.systemComponentRoles[role=site-footer]`. Black background (`#000`), 6-column link grid at ≥900px (2-col at tablet, 1-col accordion on mobile). Column titles + link lists per captured copy (see voice classification). Featured products row (Acrobat Reader / Firefly / Express / Photoshop). Bottom bar with legal + social. Full-width Adobe wordmark SVG below with clip-path inset reveal driven by Lenis scroll (samples' wordmark-wipe pattern — variant A keeps this baseline).

## Key states

- **Geo-banner:** dismissed → `[hidden]`, persists per session.
- **Header on scroll:** `scrolled` class adds shadow; backdrop-blur intensifies over photo backgrounds.
- **Cards on hover:** subtle background lift (`background: rgba(0,0,0,0.04)` on `ds-card`). Photos stay static — explore-card hover-reveal is variant C's amplification.
- **CTAs on hover:** primary blue → `#274dea`; outline → `rgba(0,0,0,0.04)` background.
- **Focus-visible:** 3px outline ring `rgba(59,99,251,0.2)` on every interactive control.
- **`prefers-reduced-motion: reduce`:** Lenis lerp disabled, entrance animations collapse to immediate display, wordmark wipe falls back to static.

## Interaction model

- **Geo-banner:** dismiss button → fade out 200ms + collapse height 200ms. Store `localStorage.setItem('adobe-geo-dismissed', '1')`.
- **Header nav links:** standard link behaviour (no hover dropdown in variant A — full mega-nav is migrate-time deployment per system-component-role spec).
- **Card CTAs:** standard link click; no JS-driven interactions on variant A.
- **Smooth scroll:** Lenis instance handles wheel/keyboard scrolling. Scroll-driven section entrance fires once per element on first viewport intersection (bidirectional reverse on scroll-up per samples).

## Structural data attributes

Per `skills/stardust/reference/data-attributes.md` (cross-cutting):

- `<section data-section="geo-banner" data-section-purpose="region-detection">`
- `<header data-component="site-header" data-system-component="header">`
- `<section data-section="hero" data-section-purpose="marquee" data-variant="A">`
- `<section data-section="promo-strip" data-section-purpose="conversion">`
- `<section data-section="product-hub-tiles" data-section-purpose="navigation">`
- `<section data-section="featured-products" data-section-purpose="feature-list">`
- `<section data-section="in-the-news" data-section-purpose="rich-text">`
- `<footer data-component="site-footer" data-system-component="footer">`

## Heading hierarchy

- H1 (one): "Transform how you share information." (hero)
- H2 (sections + cards):
  - "Save 50% on Creative Cloud Pro." (promo-strip card 1)
  - "Save 30% and go unlimited." (promo-strip card 2)
  - "Creative Cloud" (product-hub tile 1)
  - "Acrobat" (product-hub tile 2)
  - "Explore" (product-hub tile 3)
  - "New partner AI models in Generative Fill." (featured-products card 1)
  - "It starts with Adobe." (featured-products card 2)
  - "In the news" (news section)
  - (Footer column titles render as H3, not H2 — visual + semantic distinction)
- H3 (children):
  - 3 news items (titles)
  - Footer column titles ("For individuals & small business", etc.)

## Unsourced content (placeholder enumeration)

| Section | Item | Reason |
|---|---|---|
| geo-banner | exact banner copy | direction-authorized rewrite; final at craft time |
| hero | subcopy body | captured `body[0]` may be empty due to lazy-load; if so, render PLACEHOLDER with visual signature |

Migrate-time review: confirm geo-banner copy reads naturally for international visitors; confirm hero subcopy resolves to a real captured value (not the placeholder).

## Fidelity

`refined` — adds the formal type-scale custom-property block, `font-variant-numeric: tabular-nums` on prices, `text-wrap: balance` on headings, `text-wrap: pretty` on body, `hanging-punctuation: first` on `html`, focus-visible outline ring, baseline-aligned hover states. Per `reference/fidelity-refined-pass.md`.

## Open questions for the user

1. **Hero CTA pair** — improvement #1 consolidates verbs but the captured home has primary "Get started" not "Free trial." Use "Free trial" (the canonical conversion verb in PRODUCT.md § Design Principles 3) or stay with captured "Get started"? Recommend: **Free trial** (per PRODUCT.md discipline).
2. **Featured-products section ordering** — captured order is (promo-strip → product-hub-tiles → featured-products). Keep, or move featured-products before product-hub-tiles? Recommend: **keep captured order** (variant A faithful).
3. **In-the-news** — is this surfaced on home of the live site, or only on news landing? Recommend: **keep on home** per captured H2 sequence.

Brief is ready for review. After user confirmation (or correction), Phase 2 invokes `impeccable:craft` to render `home-A-proposed.html`.
