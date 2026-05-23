<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-05-23T12:00:00-07:00
  readArtifacts:
    - DESIGN-B.json
    - DESIGN-A.json   # inherited base
    - stardust/current/pages/home.json
    - samples/SAMPLES.md
    - samples/static/bizpro-hub-prototype/bizpro-hub.html  # scroll choreography source
    - stardust/prototypes/home-A-shape.md   # baseline composition
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: B
  slug: home
  fidelity: refined
  surprise: medium
  dominantDimension: scroll-cinema-choreography

  capturedSourceLineage:
    - section: site-header
      lineage: "system-component (header) — inherited from variant A"
    - section: hero-scroll-grow
      lineage: "captured choreography from samples/static/bizpro-hub-prototype/bizpro-hub.html § hero-scroll (300vh container + sticky child + video scaling). Headline + body + CTAs from pages/home.json#headings[h1]; eyebrow direction-authorized."
    - section: stories-strip
      lineage: "samples/SAMPLES.md § 9.6 stories mouse-pan + samples' .stories pattern. Repurposes the captured 'Save 50%' + 'Save 30%' promo cards as 2 cards in a horizontal-overflow track."
    - section: tutorial-carousel
      lineage: "samples/SAMPLES.md § 9.7 tutorial-carousel-reverse-hero. Repurposes the 3 captured product hub tiles (Creative Cloud / Acrobat / Explore) as carousel slides with reverse-hero entrance."
    - section: featured-products
      lineage: "captured pages/home.json#headings[h2='New partner AI models...', 'It starts with Adobe.']"
    - section: studio-banner-garage-door
      lineage: "samples/SAMPLES.md § 9.8 studio-banner garage-door + CSS animation-timeline: view(block). Direction-authorized new: a brand-statement full-bleed section that didn't exist on the captured live home."
    - section: in-the-news
      lineage: "captured pages/home.json#headings[h2='In the news' + 3 H3 items] — same as variant A baseline"
    - section: site-footer
      lineage: "system-component (footer) — inherited from variant A, with mandatory wordmark wipe per variant B amplification"

  antiTemplatePass:
    - pattern: "hero (single-product photo + overlay copy + CTA)"
      defaultReflex: "centered-stack hero (default-to-escape)"
      alternatives:
        - "scroll-grow hero — 300vh container, sticky child, video/photo scales from bounded → fullbleed (samples' bizpro-hub pattern)"
        - "asymmetric mosaic (variant C — wrong)"
        - "static split (variant A — wrong; that's the baseline B amplifies past)"
      picked: "scroll-grow hero"
      rationale: "The captured-trait amplification IS the hero choreography. Adobe owns the production bench for this (samples demonstrate it); the live home underplays it. Variant B's thesis lives in this one section more than any other."

    - pattern: "promo strip (2 promo cards static)"
      defaultReflex: "carousel (over-engineering)"
      alternatives:
        - "horizontal-overflow mouse-pan track (samples' .stories pattern) — pans on cursor proximity, no drag"
        - "keep static 2-up (variant A baseline)"
        - "tutorial-style reverse-hero entrance carousel"
      picked: "horizontal-overflow mouse-pan track"
      rationale: "The 'Save 50%' + 'Save 30%' promo cards become more expressive as a panned track than as static cards. The mouse-pan is non-template (no drag, no buttons) and ties to the scroll-cinema thesis."

    - pattern: "product hub tiles (3-up static grid)"
      defaultReflex: "5-up image-card grid (default-to-escape) or 3-up grid as captured (variant A baseline)"
      alternatives:
        - "tutorial-reverse-hero carousel — slides enter from 100vw width + 60px gap and settle to centered 1068/1440 + 8px gap as the section scrolls into view"
        - "static 3-up (variant A baseline)"
        - "asymmetric mosaic (variant C territory)"
      picked: "tutorial-reverse-hero carousel"
      rationale: "Direct application of samples' captured carousel-entrance choreography. Once settled, the carousel is user-controllable (prev/next/dots). The reverse-hero entrance IS the surprise move."

    - pattern: "in-the-news (3 captured items)"
      defaultReflex: "3-up grid (variant A) or carousel"
      alternatives:
        - "keep 3-up grid + scroll-driven section entrance (faithful + baseline)"
        - "reverse-hero carousel (saturates the choreography — overuse)"
      picked: "keep 3-up grid + scroll-driven section entrance"
      rationale: "≤3 choreographed sequences per page (per DESIGN-B.md § Rules). The hero + stories + tutorial already give variant B three; in-the-news inherits A's baseline entrance only."

  substrateTransitions:
    default: "#ffffff (body — captured)"
    exceptions:
      - substrate: "#000000 (literal black — captured on footer, plus studio-banner garage-door section)"
        purpose: "system-component footer + brand-statement banner sequence (the garage-door reveals a full-bleed black section that swallows the page momentarily before footer)"
        citation: "samples' bizpro-hub .studio-banner pattern; cited from samples/SAMPLES.md § 9.8"
    count: 2
    capCheck: "2 ≤ 2 — passes Discipline 4. Hero photo / tutorial slide imagery / news thumbnails are content not substrate."

  voiceClassification:
    - section: site-header
      classification: "captured-verbatim (inherits from variant A)"
    - section: hero-scroll-grow
      classification: "captured-verbatim + direction-authorized eyebrow"
      copy:
        eyebrow: "Adobe Photoshop"
        h1: "Transform how you share information."
        body: "Photoshop's new AI Generative Fill removes the gap between idea and image. Sketch a thought; finish a composition."
        cta_primary: "Free trial"
        cta_outline: "View plans and pricing"
        overlay-product-title: "Acrobat Studio"
        overlay-product-body: "The highly secure PDF and e-signature solution with advanced tools and AI assistance."
        overlay-cta-primary: "Buy now"
        overlay-cta-outline: "Learn more"
      source: "h1 captured-verbatim; overlay product-block from samples' bizpro-hub hero overlay pattern (direction-authorized adaptation)"
    - section: stories-strip
      classification: "captured-verbatim H2s"
      copy:
        h2_1: "Save 50% on Creative Cloud Pro."
        h2_2: "Save 30% and go unlimited."
      source: "pages/home.json#headings"
    - section: tutorial-carousel
      classification: "captured-verbatim eyebrows + headlines + direction-authorized 'Tutorial' frame"
      copy:
        slides:
          - { eyebrow: "Creative Cloud", h2: "Creative AI for every creator.", body: "From Photoshop to Premiere — apps and AI in one subscription.", cta: "View plans and pricing" }
          - { eyebrow: "Acrobat", h2: "Edit, sign, and collaborate on PDFs.", body: "AI-powered tools for documents and e-signatures.", cta: "View plans and pricing" }
          - { eyebrow: "Explore", h2: "See all Adobe products.", body: "For individuals, business, and education.", cta: "View all products" }
      source: "eyebrows captured-verbatim; slide body copy direction-authorized rewrite"
    - section: featured-products
      classification: "captured-verbatim (inherits from variant A)"
    - section: studio-banner-garage-door
      classification: "direction-authorized new"
      copy:
        eyebrow: "Acrobat Studio"
        title: "The AI-powered hub for everything you do with documents."
        body: "PDF Spaces. AI Assistant. Express Premium. Plus admin features for teams."
        cta_primary: "Buy now"
        cta_outline: "Learn more"
      source: "direction-authorized adaptation from samples' bizpro-hub .studio-banner content"
    - section: in-the-news
      classification: "captured-verbatim (inherits from variant A)"
    - section: site-footer
      classification: "captured-verbatim (inherits from variant A)"

  unsourcedContent:
    - { section: "hero-scroll-grow", item: "captured hero photo asset (Photoshop Generative Fill demo)", reason: "not yet exported into assets/; gradient placeholder with caption signature applied" }
    - { section: "studio-banner-garage-door", item: "full-bleed banner image asset", reason: "direction-authorized new section; placeholder gradient with caption" }

  compositionDelta_vs_A:
    - "hero-strategy: A static 5/7 split → B scroll-grow 300vh + sticky child with video/photo bounded → fullbleed under scroll"
    - "stories-strip section: A 2-up static promo grid → B horizontal-overflow mouse-pan track (samples' stories pattern)"
    - "tutorial-carousel section: A 3-up static grid → B reverse-hero entrance carousel (samples' tutorial pattern)"
    - "studio-banner-garage-door section: PRESENT in B (direction-authorized new) → ABSENT in A"
    - "wordmark wipe: A baseline (home only) → B mandatory on every page"

  compositionDelta_vs_C:
    - "hero-strategy: B scroll-grow choreography → C asymmetric mosaic (16:9 feature + 2×2 mnemonics)"
    - "motion-energy: B amplifies scroll → C amplifies hover-reveal"
    - "tile pattern: B tutorial-reverse-hero carousel → C explore-card-mosaic with hover-reveals"
    - "dark-band rhythm: B 2 dark sections (garage-door + footer) → C ≥2 dark bands intensified (different positions)"
-->

# Page-shape brief — home / variant B (scroll cinema amplified)

> Brief for `home-B-proposed.html`. Surprise budget: **medium** (one captured cliché replaced — single-product static hero → scroll-grow choreography). Dominant dimension: **scroll-cinema-choreography**. Variant B inherits A's tokens, voice, and IA-priority audit unchanged; it amplifies the scroll choreography captured in `samples/static/bizpro-hub-prototype/bizpro-hub.html` across the page.

## Variant role

**B — One captured trait amplified.** Per `direct/SKILL.md § Phase 2.6`: amplify a specific trait already in the captured brand surface in service of a brand-personality move from PRODUCT.md. The trait: **scroll-driven choreography**. The personality move: *"aspirational but specific"* — Adobe owns the production bench for cinematic scroll storytelling; this variant deploys it.

## Sections (composition order)

```
[1] site-header                  ← system-component (header)
[2] hero-scroll-grow             ← captured-choreography (300vh + sticky + video scales)
[3] stories-strip                ← captured-promos in a mouse-pan track (samples' stories pattern)
[4] tutorial-carousel            ← captured-hub-tiles in a reverse-hero carousel
[5] featured-products            ← captured (2-up; baseline from A)
[6] studio-banner-garage-door    ← direction-authorized new (CSS animation-timeline: view(block))
[7] in-the-news                  ← captured (3-up; baseline from A)
[8] site-footer                  ← system-component (footer); mandatory wordmark wipe
```

> Variant B has 8 sections vs A's 7 (the studio-banner garage-door section is direction-authorized new). All other section purposes carry over from A but the *layout strategy* changes per the anti-template pass above.

## Layout strategy per section

### 1. Site-header
Unchanged from variant A (sticky pill, backdrop-blur, 4-track nav, primary + outline CTAs, burger at <640px). Entrance: `enterDown` 600ms baseline.

### 2. Hero scroll-grow (THE amplification — load-bearing for variant B)
Per `DESIGN-B.json#extensions.motion.heroChoreography`:
- Container: `300vh` height, position relative, isolation isolate.
- Sticky child: `position: sticky; top: 0; height: 100vh; background: #ffffff; z-index: 1;`.
- **Text layer**: copy column on the left (eyebrow + h1 + body + CTA pair). `enterUp` page-load + `text.opacity = 1 - clamp(rawP/0.6, 0, 1)` (fades faster than the video grows). translateY -40 * textP.
- **Video wrap**: absolute, growing from bounded (left = grid-margin, width = grid-width, aspect 1068/600) → fullbleed (left=0, width=vw, height=vw*0.5625). Horizontal (left + width + height) completes at `horizP = easeOut3(clamp(rawP * 2, 0, 1))` (faster, done by rawP=0.5). Vertical (top) at `vertP = easeOut3(rawP)` (slower, done at rawP=1).
- **Border-radius**: `lerp(16px, 0px, max(leftProx40, topProx40))` — corners square off as edges approach viewport.
- **Box-shadow**: upward-cast, intensifies at `shadowP = easeOut3(clamp(rawP / 0.5, 0, 1))`.
- **Scrim**: dark gradient overlay, fades in at `scrimIn = clamp((rawP - 0.25) / 0.6, 0, 1)`.
- **Overlay copy (product lockup)**: "Acrobat Studio" lockup with Buy now + Learn more CTA pair. Fades in at `overlayIn = clamp((rawP - 0.35) / 0.6, 0, 1)` with `translateY(20 → 0)`.
- **Next-section cover**: scrim + overlay subtract `cover = clamp(1 - storiesTop / vh, 0, 1)` as section [3] slides up.
- Pointer-events on overlay only `auto` when `overlayIn > 0.5` (no phantom clicks during entry).
- Reduced motion: hero shows its FINAL (fullbleed) state immediately; scrim + overlay are visible; text is hidden. Acceptable static fallback.

### 3. Stories-strip (mouse-pan horizontal track)
The two captured promo cards ("Save 50% on Creative Cloud Pro." / "Save 30% and go unlimited.") in a horizontal-overflow track that pans on cursor proximity (no drag, no buttons). Per samples' `.stories__viewport` + `.stories__track` pattern.
- Track total width exceeds viewport by ~30% — cards are wider (~480px each at desktop) than the available split.
- On `mousemove` over the viewport: `t = (e.clientX - rect.left) / rect.width`; range = `(trackW - sectionW + 16) / 2`; `translateX = t < 0.5 ? range : -range`.
- On `mouseleave`: `translateX(0)`.
- Mobile: drops to static 1-col stack (no pan); the horizontal-overflow only makes sense with mouse hardware.
- Rounded-top section transition (32px) from hero to this section.
- Scroll-driven entrance for the section header only.

### 4. Tutorial-carousel (reverse-hero entrance + infinite-loop carousel)
Three product-hub slides (Creative Cloud / Acrobat / Explore — captured eyebrows + direction-authorized body) in samples' tutorial-carousel pattern.
- **Track layout**: `[clone-Explore | Creative-Cloud | Acrobat | Explore | clone-Creative-Cloud]` — 5 slides, 3 real + 2 clones for infinite-loop.
- **Reverse-hero entrance**: as the section enters the viewport (from `sectionTop - vh` to `sectionTop + 0.75 * sectionH - vh`):
  - Slide width animates from `100vw` → `calc(100vw - 2 * 8.333vw)` (1068/1440 at desktop).
  - Gap animates from `60px` → `8px`. Gap completes at 60% of overall progress (cards arrive after width settles).
  - Active slide border-radius animates `0 → 16px`.
- After entrance settles, control hands off to the standard carousel JS: prev/next arrows + dots, infinite-loop snap-back on transitionend via double-rAF.
- Copy: eyebrow + title-3 headline + outline CTA. Each slide is 1068×600 aspect at desktop, full-bleed photographic asset behind.

### 5. Featured products
Same 2-up as variant A — "New partner AI models in Generative Fill." (light) + "It starts with Adobe." (dark with knockout). Scroll-driven entrance baseline.

### 6. Studio-banner garage-door (direction-authorized new)
Full-bleed black section that uses CSS `animation-timeline: view(block)` for the garage-door reveal. Per samples' `.studio-banner` pattern.
- Background image (placeholder gradient until migrated). Three concurrent CSS animations:
  - Banner translates `-50vh → 0` over `entry 0% → cover 40%` (60% on ≥1280px range to `cover 50%`).
  - Background image scales `1.0 → 1.1` over `entry 0% → cover 100%`.
  - Content (eyebrow + title-2 + body + dual-CTA) fades in over `cover -10% → cover 100%`.
- Acrobat Studio brand-statement (eyebrow + title-2 + body + Buy now + Learn more). Title clamp(32, 4.375vw, 56) — title-2 max in this section, not title-1 (no display-fight with the hero).
- Reduced motion: section appears at final state immediately; no scroll-driven transform.
- Rounded-top 32px section transition from featured-products. The next section (in-the-news) slides up over residual.

### 7. In the news
Same 3-up grid as variant A. Scroll-driven entrance baseline.

### 8. Site-footer + wordmark wipe (mandatory amplification)
Inherits A's footer. The wordmark clip-path inset wipe (`60% → 0%` over `0.5vh` scroll) is **mandatory** on every page in variant B (vs A's baseline).

## Key states (delta from A)
- **Hero overlay-CTA hover**: solid-white → 88% white tint; ghost-white → 8% white wash.
- **Tutorial active slide**: while reverse-hero entrance is active, no hover behavior; after entrance completes, slide is statically visible (no hover-reveal — that's variant C's territory).
- **Studio-banner reduced-motion**: skips garage-door; section appears at final state.

## Choreography cap (Discipline-aware)
Per DESIGN-B.md § Rules: **≤3 choreographed sequences per page**. Variant B's 3 deployed:
1. Hero scroll-grow (the load-bearing one).
2. Stories-strip mouse-pan.
3. Tutorial-carousel reverse-hero.

Below-fold sections (featured / in-the-news / studio-banner / footer) use baseline scroll-driven entrance only (the universal `anim-enter` pattern), plus the studio-banner's CSS scroll-driven garage-door (which is declarative, not imperative, and doesn't count toward the choreographed-rAF cap per the spec).

## Structural data attributes
- `<header data-component="site-header" data-system-component="header" data-nav-collapse="hamburger">`
- `<section data-section="hero-scroll-grow" data-section-purpose="marquee" data-variant="B">`
- `<section data-section="stories-strip" data-section-purpose="conversion" data-pan="mouse-proximity">`
- `<section data-section="tutorial-carousel" data-section-purpose="navigation" data-carousel="reverse-hero-infinite">`
- `<section data-section="featured-products" data-section-purpose="feature-list">`
- `<section data-section="studio-banner-garage-door" data-section-purpose="brand-statement" data-animation-timeline="view-block">`
- `<section data-section="in-the-news" data-section-purpose="rich-text">`
- `<footer data-component="site-footer" data-system-component="footer" data-wordmark-wipe="mandatory">`

## Heading hierarchy
- H1: "Transform how you share information." (hero)
- H2 (sections + cards): Save 50% / Save 30% / each carousel slide / featured #1 / featured #2 / studio-banner title / In the news
- H3 (children): 3 news items + footer column titles

## Unsourced content
| Section | Item | Reason |
|---|---|---|
| hero-scroll-grow | hero photo asset (Photoshop / Generative Fill) | not yet exported into assets/; placeholder gradient + caption |
| studio-banner-garage-door | full-bleed banner background image | direction-authorized new section; placeholder gradient + caption |

## Fidelity
`refined` — same as A (focus-visible, text-wrap, hanging-punctuation, etc.). Plus variant-B-specific: `will-change: opacity, transform` on hero text + video-wrap during entrance.

## Open questions
None — the brief inherits A's resolved questions. Render directly.
