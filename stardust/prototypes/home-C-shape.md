<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-05-23T13:00:00-07:00
  readArtifacts:
    - DESIGN-C.json
    - DESIGN-A.json   # inherited base
    - stardust/current/pages/home.json
    - samples/SAMPLES.md
    - samples/live/snapshots/sr-homepage.html   # amplification source
    - samples/live/snapshots/sr-homepage.png    # visual reference
    - stardust/prototypes/home-A-shape.md       # baseline composition
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: C
  slug: home
  fidelity: refined
  surprise: high
  dominantDimension: elastic-tile-mosaic

  capturedSourceLineage:
    - section: site-header
      lineage: "system-component (header) — inherited from variant A"
    - section: hero-mosaic
      lineage: "samples/live/snapshots/sr-homepage.html — asymmetric mosaic hero pattern: 1.5fr feature 16:9 + 1fr 2×2 mnemonics 1:1. Feature tile carries captured Photoshop / Generative Fill campaign; mnemonic tiles carry captured product names (Photoshop, Illustrator, Premiere, Lightroom)."
    - section: explore-row-1
      lineage: "samples/live/snapshots/sr-homepage.png ('Everything you need to make anything.') — colored category-tile row with hover-reveal background imagery"
    - section: dark-band-creative-cloud
      lineage: "direction-authorized new dark substrate — repurposes the captured 'Save 50% on Creative Cloud Pro.' H2 as the band's anchor, intensified to a full-bleed dark surface (intensified dark-band rhythm per DESIGN-C.md § 5)"
    - section: explore-row-2
      lineage: "samples/live/snapshots/sr-homepage.png ('Explore what's new.') — 3-up photo-led explore-card-mosaic with hover-reveal"
    - section: dark-band-acrobat
      lineage: "direction-authorized new dark substrate — anchors 'It starts with Adobe.' (captured H2) on a dark surface (intensified rhythm)"
    - section: product-grid
      lineage: "samples/static/bizpro-hub-prototype + sr-homepage product grid pattern — 6-tile dark product mnemonic grid"
    - section: site-footer
      lineage: "system-component (footer) — inherited from variant A"

  antiTemplatePass:
    - pattern: "hero (single-product photo + overlay copy + CTA)"
      defaultReflex: "centered-stack hero (default-to-escape) or static split (variant A baseline)"
      alternatives:
        - "asymmetric mosaic (1.5fr feature 16:9 + 1fr 2×2 mnemonics 1:1) — captured sr-homepage pattern"
        - "scroll-grow hero (variant B — wrong; that's B's amplification)"
        - "static split (variant A baseline)"
      picked: "asymmetric mosaic"
      rationale: "The captured-trait amplification IS the mosaic hero. sr-homepage already runs this pattern; variant C makes it canonical on home/hubs. Type recedes in this context (title-3 max in feature, not title-1) so imagery leads."

    - pattern: "promo strip (2-up static promo cards — variant A baseline)"
      defaultReflex: "5-up image-card grid (default-to-escape)"
      alternatives:
        - "category-tile-row with hover-reveal background imagery (sr-homepage 'Everything you need to make anything.' pattern)"
        - "keep static 2-up promo cards (variant A baseline)"
        - "horizontal mouse-pan track (variant B territory)"
      picked: "category-tile-row with hover-reveal — 4 colored explore-card-mosaic tiles"
      rationale: "Variant C's hover-reveal pattern is the trait being amplified. The 4-tile row captures the sr-homepage live's visual rhythm. Each tile carries a captured Adobe product/category as the eyebrow + name."

    - pattern: "product hub tiles (3-up static — variant A baseline)"
      defaultReflex: "5-up image-card grid (default-to-escape) or carousel"
      alternatives:
        - "3-up explore-card-mosaic with hover-reveal (variant C amplifies the hover behavior)"
        - "static 3-up (variant A baseline)"
        - "carousel (variant B territory)"
      picked: "explore-card-mosaic with hover-reveal — 4:3 cards"
      rationale: "Same hover-reveal trait as the row above; here applied to 3-up grid as captured pattern."

    - pattern: "single full-bleed product grid (variant A baseline doesn't have this)"
      defaultReflex: "skip the section entirely (faithful)"
      alternatives:
        - "introduce a 6-tile dark-substrate product mnemonic grid — intensified rhythm with hover-reveal"
        - "skip (faithful)"
        - "fold into the existing product-hub-tiles section (variant A approach)"
      picked: "introduce 6-tile dark product mnemonic grid"
      rationale: "Variant C's intensified dark-band rhythm requires ≥2 dark sections per major page. This is the 'creative-product gallery' move — surfacing the breadth of Adobe's product lineup as a visual gallery, not a nav."

  substrateTransitions:
    default: "#ffffff (body)"
    exceptions:
      - substrate: "#000000 (literal black)"
        purpose: "dark-band-creative-cloud — captures Creative Cloud campaign anchor on dark substrate, allowing photographic surface to dominate"
        citation: "samples' bizpro-hub .stories-card--dark + sr-homepage testimonial-dark pattern"
      - substrate: "#000000 (literal black)"
        purpose: "dark-band-acrobat — captures 'It starts with Adobe.' on dark substrate"
        citation: "samples' bizpro-hub .feature-card--dark pattern"
      - substrate: "#000000 (literal black)"
        purpose: "product-grid (footer-adjacent) — dark substrate hosts the 6-tile product mnemonic grid; carries into the literal black footer below for one continuous dark sequence"
        citation: "samples/SAMPLES.md § 6.2 explore-card pattern on dark surface (bizpro-hub product-section)"
      - substrate: "#000000 (literal black)"
        purpose: "site-footer (system-component)"
        citation: "captured _brand-extraction.json#systemComponents[kind=footer]"
    count: 4
    capCheck: "Discipline 4 default cap is ≤ 2. EXCEPTION carve-out #2 ('substrate-keyed document-shapes') applies here: surprise: high, picked move from the bank is `document-shape` with `substrate-keyed` sub-kind (gallery-rhythm) — alternating white/dark IS the document-shape's structural rhythm. Each transition carries a per-section captured-source citation above. 4 transitions are legal under the carve-out."
    note: "Variant C is a `gallery-rhythm` document-shape (per anti-template-bank.md). The white→dark→white→dark→dark-grid+footer cadence IS the visual structure, not noise."

  voiceClassification:
    - section: site-header
      classification: "captured-verbatim (inherits from variant A)"
    - section: hero-mosaic
      classification: "captured-verbatim feature title + direction-authorized mnemonic tile names"
      copy:
        feature:
          eyebrow: "Adobe Photoshop"
          title: "Transform how you share information."
          cta: "Free trial"
        mnemonics:
          - { eyebrow: "Photoshop", name: "Edit and create images" }
          - { eyebrow: "Illustrator", name: "Design vector graphics" }
          - { eyebrow: "Premiere", name: "Edit video and motion" }
          - { eyebrow: "Lightroom", name: "Master your photography" }
      source: "captured H1; mnemonic tile copy direction-authorized rewrite using captured product names from home.json#headings + media.images alt text"

    - section: explore-row-1
      classification: "direction-authorized rewrite"
      copy:
        section-h2: "Everything you need to make anything."
        tiles:
          - { eyebrow: "Creative AI", name: "Generate with Firefly", body: "Images, video, audio. From a prompt to a final asset." }
          - { eyebrow: "Documents", name: "PDFs with AI Assistant", body: "Edit, sign, summarize, and collaborate in PDF Spaces." }
          - { eyebrow: "Marketing", name: "Personalization at scale", body: "Content supply chain, journey orchestration, GenStudio." }
          - { eyebrow: "Learn", name: "Adobe Express templates", body: "500,000+ professional templates and on-brand assets." }
      source: "section H2 captured from sr-homepage live ('Everything you need to make anything.'); 4 tile copy direction-authorized rewrite reflecting Adobe's product categories"

    - section: dark-band-creative-cloud
      classification: "captured-verbatim + direction-authorized body"
      copy:
        eyebrow: "Creative Cloud"
        title: "Save 50% on Creative Cloud Pro."
        body: "Creative AI tools, on sale. For the first 3 months — terms apply."
        cta_primary: "View plans and pricing"
      source: "title captured-verbatim from home.json#headings; body direction-authorized rewrite of captured promo body"

    - section: explore-row-2
      classification: "captured-verbatim section h2 + direction-authorized tile copy"
      copy:
        section-h2: "Explore what's new."
        tiles:
          - { eyebrow: "Photoshop", name: "New partner AI models in Generative Fill.", body: "Create with Gemini 2.5 (with Nano Banana Pro) and FLUX.1 pro.", cta: "Learn more" }
          - { eyebrow: "Acrobat", name: "Get more done with new AI features in Acrobat.", body: "Quickly create polished presentations, podcast overviews, and more.", cta: "Learn more" }
          - { eyebrow: "Creative Cloud", name: "Adobe apps are top choice for Sundance filmmakers.", body: "Pros depend on Premiere, After Effects, and cutting-edge tools.", cta: "Learn more" }
      source: "section H2 captured from sr-homepage; tile names captured from home.json#headings (the 3 'in the news' items become the explore-row-2 content — variant C surfaces editorial-led story content as explore tiles)"

    - section: dark-band-acrobat
      classification: "captured-verbatim"
      copy:
        eyebrow: "Adobe for Business"
        title: "It starts with Adobe."
        body: "From AI to marketing ROI, every B2C and B2B story, content, and workflow ends with Adobe AI."
        cta_primary: "Learn more"
      source: "captured H2 + body from home.json (featured products section)"

    - section: product-grid
      classification: "direction-authorized rewrite (6-tile mnemonic gallery)"
      copy:
        section-h2: "Tools that work for you."
        tiles:
          - "Photoshop"
          - "Illustrator"
          - "Premiere Pro"
          - "Lightroom"
          - "Acrobat"
          - "Firefly"
      source: "section H2 captured from sr-homepage live ('Tools that work for you.'); product names from samples/SAMPLES.md product-mnemonic vocabulary"

    - section: site-footer
      classification: "captured-verbatim (inherits from variant A)"

  unsourcedContent:
    - { section: "hero-mosaic", item: "feature tile photo (Photoshop / Generative Fill) + 4 mnemonic tile photos", reason: "captured imagery not yet exported; gradient placeholders + caption signatures applied" }
    - { section: "explore-row-1 / explore-row-2", item: "8 tile photos", reason: "direction-authorized photographic surfaces; placeholders with hover-reveal CSS demonstrate the elastic behavior" }
    - { section: "dark-band-creative-cloud / dark-band-acrobat", item: "2 dark-band feature images", reason: "placeholder gradients" }
    - { section: "product-grid", item: "6 product mnemonic backgrounds (hover-reveal)", reason: "placeholder gradients per product" }

  compositionDelta_vs_A:
    - "hero-strategy: A single-product 5/7 split → C asymmetric mosaic (16:9 feature + 2×2 1:1 mnemonics)"
    - "promo-strip section: A 2-up static promo cards → C 4-up category-tile-row with hover-reveal (different cardinality + interaction)"
    - "product-hub-tiles section: A 3-up tiles with body + outline-CTA → C 3-up explore-card-mosaic with hover-reveal (no body in default state; body revealed under photo on hover)"
    - "dark-band sections: A has 1 dark substrate (footer) → C has 4 dark substrates (intensified rhythm via document-shape carve-out)"
    - "product-grid section: PRESENT in C (6-tile dark mnemonic gallery) → ABSENT in A"
    - "type emphasis: A title-1 in hero → C caps at title-3 in mosaic feature (type recedes; imagery leads)"

  compositionDelta_vs_B:
    - "hero-strategy: B scroll-grow choreography (300vh + sticky) → C asymmetric mosaic (static, hover-led)"
    - "motion-energy: B scroll-cinema → C elastic-hover (no scroll-grow; motion lives in hover-reveals)"
    - "tutorial-carousel section: PRESENT in B (reverse-hero entrance) → ABSENT in C (replaced by explore-row-2)"
    - "studio-banner-garage-door section: PRESENT in B → ABSENT in C (replaced by 2 simpler dark-band sections)"
    - "dark substrate count: B has 2 dark sections → C has 4 (intensified rhythm)"
-->

# Page-shape brief — home / variant C (elastic tile mosaic amplified)

> Brief for `home-C-proposed.html`. Surprise budget: **high** (two captured clichés replaced + one document-shape substitution). Dominant dimension: **elastic-tile-mosaic**. Variant C inherits A's tokens + 3 new tile-aspect radii + tighter `tileGridGap`, and amplifies the photography-led tile vocabulary the sr-homepage live fragment already underplays.

## Variant role

**C — Different captured trait amplified.** Per `direct/SKILL.md § Phase 2.6 C-cliff`: amplify a distinct captured trait — **photography-led tile mosaics + elastic hover-reveal** — from `samples/live/snapshots/sr-homepage.html`. Not "B but more"; a different brand-personality move. The captured live `sr-homepage` fragment already runs colored category tiles + photo-led explore grid + dark-band rhythm + product grid; variant C makes these canonical on home/hubs.

## Sections (composition order — gallery-rhythm document-shape)

```
[1] site-header                    ← system-component
[2] hero-mosaic                    ← asymmetric (1.5fr feature 16:9 + 1fr 2×2 mnemonics 1:1)
[3] explore-row-1                  ← "Everything you need to make anything." (4-up explore-card-mosaic)
[4] dark-band-creative-cloud       ← "Save 50%" anchor, dark substrate
[5] explore-row-2                  ← "Explore what's new." (3-up explore-card-mosaic)
[6] dark-band-acrobat              ← "It starts with Adobe." anchor, dark substrate
[7] product-grid                   ← "Tools that work for you." (6-tile dark mnemonic gallery)
[8] site-footer                    ← system-component (continues the dark sequence)
```

> Variant C has 8 sections like B but the rhythm is **white → mosaic → dark → mosaic → dark → dark-grid → dark-footer**, forming a single continuous dark sequence below the fold. This IS the document-shape (gallery-rhythm) — substrate transitions are the structural primitive, not decoration.

## Layout strategy per section

### 1. Site-header
Inherits variant A unchanged.

### 2. Hero mosaic (THE amplification — load-bearing for variant C)

Per `DESIGN-C.json#extensions.componentStyle.mosaicHero`:

- **Layout**: `grid-template-columns: 1.5fr 1fr; gap: 12px` (tileGridGap).
- **Feature tile** (left, 16:9 aspect):
  - Border-radius: 20px (`--r-tile-feature`).
  - Photographic background (placeholder gradient — Photoshop / Generative Fill demo at migrate).
  - Overlay copy bottom-anchored: `Adobe Photoshop` eyebrow + `Transform how you share information.` (title-3, NOT title-1 — type recedes) + `Free trial` ds-btn--solid-white CTA.
  - Gradient scrim from bottom: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)`.
- **Mnemonic tiles** (right, 2×2 of 1:1 squares, 16px radius `--r-tile-portrait` → 12px `--r-tile-square` at small):
  - 4 tiles: Photoshop / Illustrator / Premiere / Lightroom.
  - Default state: light surface (`#f8f8f8`) with 32×32 mnemonic icon (placeholder gradient block) + product name as title-4 (24px / 900) at bottom-left.
  - **Hover state** (the elastic behavior): photographic background fades in (opacity 0→1) + scales (1→1.04) + gradient scrim fades in + text color shifts to knockout. 400ms ease.
- **Mobile** (<768px): collapses to vertical stack — feature tile full-width, then 2×2 mnemonics in 2-column grid.

### 3. Explore-row-1 — "Everything you need to make anything." (4-up category-tile-row)

- Section H2 centered at top: title-3 (clamp 28-48).
- `grid-template-columns: repeat(4, 1fr); gap: 12px;` at desktop. 2-up at tablet. 1-up at mobile.
- Each tile: `aspect-ratio: 4/3`, 12px border-radius (`--r-tile-square`), light surface default.
  - Default state shows: 24×24 product mnemonic + eyebrow + product name (title-4) + body-md body, on `#f8f8f8` background.
  - **Hover state**: photographic background fades in + 1.04x scale + gradient scrim from bottom + text color shifts. Mode A image-reuse contract: each tile photo is a captured Adobe imagery slot (placeholder gradient with caption signature at this phase).
- 4 tiles: Creative AI (Generate with Firefly) / Documents (PDFs with AI Assistant) / Marketing (Personalization at scale) / Learn (Adobe Express templates).
- Scroll-driven anim-enter on the section head; tiles stagger by 0.06 in entrance.

### 4. Dark-band-creative-cloud — "Save 50% on Creative Cloud Pro."

Full-width section, literal `#000` substrate, white knockout type:
- Layout: 2-col 6/6 grid on desktop. Left: eyebrow `Creative Cloud` + title-2 `Save 50% on Creative Cloud Pro.` + body-md + `View plans and pricing` ds-btn--solid-white CTA. Right: photographic media block (16/10 aspect, placeholder gradient with the Creative Cloud brand-warm gradient).
- Rounded-top transition: `border-radius: 32px 32px 0 0` + negative `margin-top` of 32px so this section's rounded edge sits OVER the previous explore-row.
- At <768px: stacks vertically, media on top, copy below.
- No motion deployed; section enters with the baseline scroll-driven anim-enter on the H2 only.

### 5. Explore-row-2 — "Explore what's new." (3-up explore-card-mosaic)

Same explore-card-mosaic pattern as section [3] but 3-up + larger tiles (aspect-ratio 4/3).
- Each tile: eyebrow + title-4 + body-md (the captured "In the news" items: Photoshop tax-season news, Acrobat AI news, Sundance filmmakers news become the tile content — variant C surfaces editorial as gallery rather than a sidebar list).
- Hover-reveal same as explore-row-1.
- Section appears on `#ffffff` substrate, sandwiched between dark-band sections.

### 6. Dark-band-acrobat — "It starts with Adobe."

Same pattern as section [4] but mirrored (media on left, copy on right at desktop) for visual rhythm variance.
- Eyebrow `Adobe for Business` + title-2 `It starts with Adobe.` + body-md + `Learn more` ds-btn--solid-white CTA.
- Rounded-top transition same as section [4].

### 7. Product-grid — "Tools that work for you." (6-tile dark mnemonic gallery)

- Section H2 centered: title-3 in white knockout.
- 6-tile grid: `grid-template-columns: repeat(3, 1fr); gap: 8px;` at desktop. 2-col at tablet. 1-col mobile.
- Each tile: `aspect-ratio: 4/3`, 12px radius, dark surface default `rgba(255,255,255,0.06)` over the `#000` substrate.
  - Default: 24×24 mnemonic icon (placeholder gradient) + product name (title-4, white).
  - **Hover state**: photographic background fades in + 1.04 scale + brighter gradient scrim.
- 6 products: Photoshop / Illustrator / Premiere Pro / Lightroom / Acrobat / Firefly.
- Section flows directly into the footer below (no rounded-top transition; the dark sequence continues unbroken — gallery-rhythm structural primitive).

### 8. Site-footer
Inherits A's footer + wordmark wipe baseline (not mandatory like variant B's). The footer's literal `#000` background is the terminus of the dark sequence: section [4] → [6] → [7] → footer is one long descending dark cadence.

## Key states (delta from A and B)

- **Tile hover-reveal** is the load-bearing micro-interaction. Every mosaic / explore tile carries it. Transition 400ms ease: background-image opacity 0→1 + transform scale(1 → 1.04) + gradient scrim opacity 0→1 + text color shift (dark surface → light surface inverts to knockout-friendly).
- **Hero mnemonic tiles**: 2×2 grid carries the same hover-reveal as the explore tiles.
- **Dark-band CTAs**: solid-white (`ds-btn--solid-white`) as primary on dark substrates.
- **Reduced motion**: hover-reveal transitions fall back to immediate-display on hover (still works as discovery, just no animation). Scroll-driven entrances collapse.

## Choreography count

Variant C does NOT use the scroll-grow choreography or reverse-hero carousel (those are variant B). The hover-reveal is per-tile micro-interaction, not a section-level choreography sequence. No `IntersectionObserver`, no rAF beyond the baseline scroll-driven entrance.

Per DESIGN-C.md § Motion: A's baseline only (page-load entrances + scroll-driven section anim-enter). The visual identity is in **photography + hover behavior**, not motion-as-personality.

## Structural data attributes

- `<header data-component="site-header" data-system-component="header" data-nav-collapse="hamburger">`
- `<section data-section="hero-mosaic" data-section-purpose="marquee" data-variant="C" data-layout="asymmetric-mosaic-1.5fr-1fr">`
- `<section data-section="explore-row-1" data-section-purpose="navigation" data-pattern="explore-card-mosaic-4up">`
- `<section data-section="dark-band-creative-cloud" data-section-purpose="conversion" data-substrate="dark">`
- `<section data-section="explore-row-2" data-section-purpose="rich-text" data-pattern="explore-card-mosaic-3up">`
- `<section data-section="dark-band-acrobat" data-section-purpose="brand-statement" data-substrate="dark">`
- `<section data-section="product-grid" data-section-purpose="navigation" data-substrate="dark" data-pattern="mnemonic-gallery-6up">`
- `<footer data-component="site-footer" data-system-component="footer">`

## Heading hierarchy

- H1: "Transform how you share information." (hero-mosaic feature tile)
- H2: "Everything you need to make anything." / "Save 50% on Creative Cloud Pro." / "Explore what's new." / "It starts with Adobe." / "Tools that work for you."
- H3 / H4: tile names + product names + news titles per the voice classification block

## Unsourced content
| Section | Item | Reason |
|---|---|---|
| hero-mosaic | feature tile photo + 4 mnemonic tile photos | captured imagery not yet exported; placeholder gradients |
| explore-row-1 / -2 | 7 tile photos | direction-authorized photographic surfaces; placeholders demonstrate hover-reveal CSS |
| dark-band-* | 2 feature images | placeholder gradients |
| product-grid | 6 product mnemonic backgrounds | placeholder gradients |

## Fidelity
`refined` — same baseline as A and B.

## Open questions
None. Ready to render.
