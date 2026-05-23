<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-05-23T16:30:00-07:00
  readArtifacts:
    - DESIGN-F.json
    - DESIGN-A.json   # inherited base
    - stardust/current/pages/home.json
    - samples/SAMPLES.md
    - samples/static/plan-page/Acrobat Plans — PDF & Productivity.html   # AI add-on gradient source
    - stardust/prototypes/more-directions-D-M.html   # F's first sketch
    - stardust/prototypes/home-A-shape.md   # baseline composition
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: F
  slug: home
  fidelity: refined
  surprise: medium-high
  dominantDimension: ai-gradient-affordance-system

  capturedSourceLineage:
    - section: site-header
      lineage: "system-component (header) — inherited from variant A"
    - section: hero-ai
      lineage: "captured pages/home.json#headings[h1]; direction-authorized reframe to AI-context — dark substrate, gradient eyebrow underline on 'Adobe Photoshop · Generative Fill', ai-sparkle text on key AI verb ('Generative Fill'), gradient CTA primary ('Try AI free') + ghost-white outline. The H1 'Transform how you share information.' stays captured-verbatim."
    - section: ai-feature-row
      lineage: "direction-authorized new (AI affordance system showcase) — 3 ai-cards with gradient border. Anchors: captured H2 'New partner AI models in Generative Fill.' (Photoshop), captured AI Assistant feature (Acrobat), captured Firefly capability. Each carries the gradient border + AI eyebrow."
    - section: promo-strip
      lineage: "captured pages/home.json — 'Save 50% Creative Cloud Pro.' + 'Save 30% and go unlimited.' Stays LIGHT substrate + NO gradient. Reservation discipline: discount promos are not AI affordance."
    - section: product-hub-tiles
      lineage: "captured pages/home.json — Creative Cloud / Acrobat / Explore. Light substrate, no gradient (catalog ≠ AI). Acrobat tile gets a SUBTLE AI-Assistant mention but no gradient border (AI is a sub-feature, not the headline)."
    - section: ai-tools-showcase
      lineage: "direction-authorized new section (dark substrate, gradient-rich) — surfaces Adobe's AI products as a coherent suite: Firefly + Generative Fill + AI Assistant. Each mnemonic carries the ai-mnemonic-ribbon. Section eyebrow + headline use gradient affordances."
    - section: in-the-news
      lineage: "captured pages/home.json — 3 news items. Stays light substrate. The 2 of 3 captured items that mention AI ('Get more done with new AI features in Acrobat.' + 'Adobe apps are top choice for Sundance filmmakers') get gradient eyebrow on their meta tag; the 'Prepare your taxes' item stays token-faithful (taxes ≠ AI)."
    - section: site-footer
      lineage: "system-component (footer) — inherited from variant A, NO gradient (footer is chrome, not affordance)"

  antiTemplatePass:
    - pattern: "hero (single-product photo + overlay copy + CTA)"
      defaultReflex: "centered-stack hero (default-to-escape)"
      alternatives:
        - "dark substrate + gradient affordance hero (variant F amplification — gradient text on AI verb, gradient CTA)"
        - "asymmetric mosaic (variant C — wrong)"
        - "scroll-grow (variant B — wrong)"
        - "static light split (variant A baseline)"
      picked: "dark substrate + gradient affordance hero"
      rationale: "F's load-bearing surface IS the hero. Dark substrate so the gradient affordance reads with high contrast. The captured H1 stays verbatim; the eyebrow and one key verb pick up the gradient affordance. The CTA pair is gradient-primary + ghost-white-outline (one gradient per viewport rule)."

    - pattern: "promo strip (2-up promo cards)"
      defaultReflex: "extend gradient affordance into promo strip (gradient creep)"
      alternatives:
        - "keep static 2-up light (variant A baseline) — discount promos ≠ AI affordance, reservation discipline applies"
        - "gradient promo cards (FORBIDDEN — violates reservation)"
      picked: "keep static 2-up light"
      rationale: "Reservation discipline. 'Save 50%' is about pricing, not AI capability. F MUST NOT extend gradient here or the chromatic vocabulary collapses into ambient decoration."

    - pattern: "AI feature surfacing (in variant A this lives inside featured-products section)"
      defaultReflex: "list AI features as text on light cards (variant A approach)"
      alternatives:
        - "dedicated ai-feature-row with gradient-border cards (F amplification — direction-authorized new section)"
        - "scatter AI features through existing sections (gradient creep)"
        - "single 'AI hub' page link (loses surface affordance)"
      picked: "dedicated ai-feature-row with gradient-border cards"
      rationale: "F's amplification needs a primary surface where the gradient affordance system is the IA. The ai-feature-row sits between hero and promo-strip: dark substrate, 3 ai-cards each with gradient border, each carrying a captured AI capability (Generative Fill / AI Assistant / Firefly)."

    - pattern: "product mnemonic surfacing"
      defaultReflex: "uniform mnemonic grid (variant A approach)"
      alternatives:
        - "selective ai-mnemonic-ribbon on AI-products only — Firefly, AI Assistant, Generative Fill get ribbon; Photoshop/Illustrator/Premiere stay token-faithful"
        - "ribbon on all products (gradient creep)"
        - "no ribbon (loses the chromatic vocabulary)"
      picked: "selective ai-mnemonic-ribbon"
      rationale: "Reservation in product context. The mnemonic ribbon is the chromatic affordance applied to mnemonic tiles — but only AI-products carry it. A user scanning the product grid learns 'gradient ribbon = this product has AI inside.'"

  substrateTransitions:
    default: "#ffffff (body)"
    exceptions:
      - substrate: "#0a0a14 (dark navy-black — F's AI substrate)"
        purpose: "hero-ai — gradient affordance contrast guard"
        citation: "F-specific substrate for AI hero; chosen for ≥4.5:1 contrast against gradient midpoint (~#8C4779)"
      - substrate: "#0a0a14 (dark navy-black)"
        purpose: "ai-feature-row — gradient-border cards need dark substrate so the border reads"
        citation: "samples' .merch-card__addon uses gradient on light surface but at 1.5px border + small element; F's larger cards require dark substrate for legibility"
      - substrate: "#0a0a14 (dark navy-black)"
        purpose: "ai-tools-showcase — gradient-rich dedicated AI section"
        citation: "F's amplification primary surface"
      - substrate: "#000000 (literal black — system-component footer)"
        purpose: "site-footer"
        citation: "captured _brand-extraction.json#systemComponents[kind=footer]"
    count: 4
    capCheck: "Discipline 4 default cap is ≤ 2. F uses the substrate carve-out: the dark↔light cadence carries semantic meaning (dark = AI surface; light = catalog / promo / news). Three dark substrates are F's chromatic-vocabulary architecture. The fourth (#000 footer) is system-component chrome inherited from A. Total 4 transitions — note: this leans into the carve-out boundary; consider revising if review feedback suggests gradient creep risk."

  voiceClassification:
    - section: site-header
      classification: "captured-verbatim (inherits from variant A)"

    - section: hero-ai
      classification: "captured-verbatim h1 + direction-authorized eyebrow + ai-sparkle gradient text"
      copy:
        eyebrow: "Adobe Photoshop · Generative Fill"
        eyebrow-decoration: "gradient underline (.eyebrow--ai)"
        h1: "Transform how you share information."
        h1-emphasis: "key verb 'Generative' wrapped in .ai-sparkle"
        body: "Photoshop's new AI Generative Fill removes the gap between idea and image. Sketch a thought; finish a composition."
        cta_primary: "Try AI free"
        cta_primary-treatment: "ds-btn--ai (gradient surface)"
        cta_outline: "View plans and pricing"
        cta_outline-treatment: "ds-btn--ghost-white"
      source: "h1 captured-verbatim; eyebrow direction-authorized rewrite (added 'Generative Fill' to clarify AI context); body direction-authorized"

    - section: ai-feature-row
      classification: "direction-authorized — but each card carries a captured AI capability anchor"
      copy:
        section-eyebrow: "Adobe AI"
        section-eyebrow-decoration: "gradient underline"
        section-h2: "Everything Adobe makes now thinks with you."
        section-h2-emphasis: "key verb 'thinks' wrapped in .ai-sparkle"
        cards:
          - { eyebrow: "Photoshop · Generative Fill", h: "Sketch a thought; finish a composition.", body: "New partner models from Gemini 2.5 and FLUX.1 pro, in the brush you already use.", cta: "Learn more" }
          - { eyebrow: "Acrobat · AI Assistant", h: "Read a 200-page PDF in 90 seconds.", body: "Summaries, insights, sources. Edit and convert without leaving the document.", cta: "Learn more" }
          - { eyebrow: "Firefly · Commercial-safe AI", h: "Generate images, video, audio.", body: "Models trained on Adobe Stock and openly licensed content. Built for production.", cta: "Learn more" }
      source: "captured AI capability names (Generative Fill, AI Assistant, Firefly) from home.json + brand-extraction. Card body copy direction-authorized; references captured patterns from samples."

    - section: promo-strip
      classification: "captured-verbatim — STAYS LIGHT, NO GRADIENT"
      copy:
        promo1_h2: "Save 50% on Creative Cloud Pro."
        promo1_cta: "View plans and pricing"
        promo2_h2: "Save 30% and go unlimited."
        promo2_cta: "Buy now"
      source: "pages/home.json#headings — discount promos are NOT AI affordance, reservation discipline applies"

    - section: product-hub-tiles
      classification: "captured-verbatim — light substrate, no gradient"
      copy:
        tile1: { eyebrow: "Creative Cloud", body: "Apps and AI for every creator." }
        tile2: { eyebrow: "Acrobat", body: "Edit, sign, collaborate on PDFs with AI-powered tools." }
        tile3: { eyebrow: "Explore", body: "See all Adobe products." }
      source: "captured; Acrobat mentions AI as a sub-feature but the tile itself is catalog not AI affordance"

    - section: ai-tools-showcase
      classification: "direction-authorized — dedicated AI suite surface (dark substrate)"
      copy:
        section-eyebrow: "The Adobe AI suite"
        section-eyebrow-decoration: "gradient underline"
        section-h2: "Four products. One creative intelligence."
        body: "Generative Fill in Photoshop. AI Assistant in Acrobat. On-brand templates in Express. Commercial-safe generation in Firefly. The gradient marks every surface where Adobe AI is working."
        mnemonic-row:
          - { name: "Firefly", treatment: "ai-mnemonic-ribbon" }
          - { name: "Generative Fill", treatment: "ai-mnemonic-ribbon" }
          - { name: "AI Assistant", treatment: "ai-mnemonic-ribbon" }
          - { name: "Express AI", treatment: "ai-mnemonic-ribbon" }
      source: "direction-authorized rewrite anchored to captured AI product names"

    - section: in-the-news
      classification: "captured-verbatim H2 + meta tags; selective AI eyebrow"
      copy:
        h2: "In the news"
        items:
          - { meta: "ACROBAT · TAX SEASON", title: "Prepare your taxes with Adobe Acrobat this season.", ai-context: false }
          - { meta: "ACROBAT · AI", title: "Get more done with new AI features in Acrobat.", ai-context: true, meta-treatment: "gradient underline on 'AI'" }
          - { meta: "CREATIVE CLOUD · SUNDANCE", title: "Adobe apps are top choice for Sundance filmmakers.", ai-context: false }
      source: "captured H2 + 3 H3 items; selective AI affordance applied only to the AI-context item per reservation discipline"

    - section: site-footer
      classification: "captured-verbatim (inherits from variant A) — NO gradient"

  unsourcedContent:
    - { section: "hero-ai", item: "captured Photoshop / Generative Fill demo image", reason: "placeholder gradient with caption signature" }
    - { section: "ai-feature-row", item: "3 AI-card background imagery (Generative Fill demo / AI Assistant interface / Firefly output sample)", reason: "placeholder gradients per card" }
    - { section: "ai-tools-showcase", item: "4 mnemonic tile imagery", reason: "placeholder gradients per product" }

  compositionDelta_vs_A:
    - "hero-substrate: A light → F dark (#0a0a14) for AI gradient affordance contrast"
    - "ai-feature-row section: PRESENT in F (direction-authorized new) → ABSENT in A"
    - "ai-tools-showcase section: PRESENT in F → ABSENT in A"
    - "primary CTA in hero: A blue solid (ds-btn--primary) → F gradient surface (ds-btn--ai) — one gradient CTA per viewport"
    - "AI affordance system: F has 5 (eyebrow underline / card border / text emphasis / CTA surface / mnemonic ribbon) → A has 0"

  compositionDelta_vs_B:
    - "motion energy: F baseline → B scroll-cinema (no scroll-grow in F)"
    - "hero strategy: F dark + gradient affordance → B scroll-grow 300vh sticky"
    - "ai-feature-row section: PRESENT in F → ABSENT in B"
    - "ai-tools-showcase section: PRESENT in F → ABSENT in B"
    - "studio-banner garage-door: ABSENT in F → PRESENT in B"

  compositionDelta_vs_C:
    - "hero strategy: F dark + gradient text + gradient CTA → C asymmetric mosaic (16:9 feature + 2×2 mnemonics)"
    - "primary micro-interaction: F gradient affordance (static, semantic) → C hover-reveal (elastic, photographic)"
    - "tile system: F card-bordered AI cards → C explore-card-mosaic with photo hover-reveal"
    - "dark-band rhythm: F selective dark for AI surfaces (semantic) → C 4-band gallery rhythm (document-shape)"
    - "ai-tools-showcase section: PRESENT in F → ABSENT in C"

  variantHomogeneityCheck:
    pass: true
    note: "F differs from each of A/B/C on ≥4 axes. The gradient affordance system + 2 direction-authorized new sections + dark hero substrate are the load-bearing distinctives."
-->

# Page-shape brief — home / variant F (AI Sparkle Pervasive)

> Brief for `home-F-proposed.html`. Surprise budget: **medium-high** (one captured cliché replaced + one document-shape substitution). Dominant dimension: **ai-gradient-affordance-system**. Variant F inherits A's tokens + 5 AI-affordance surfaces driven by the captured `.merch-card__addon` gradient.

## Variant role

**F — One captured trait amplified.** The trait: samples' `.merch-card__addon` gradient `linear-gradient(135deg, #8D88F2, #EB1000)`. The amplification: elevate the gradient from one-off pricing lockup to a chromatic vocabulary for AI affordance. The brand-personality move: surface AI capability visually, with reservation discipline.

## Sections (composition order)

```
[1] site-header           ← system-component (header)
[2] hero-ai               ← dark substrate, gradient eyebrow + ai-sparkle text + gradient CTA
[3] ai-feature-row        ← direction-authorized new (3 gradient-border AI cards)
[4] promo-strip           ← captured (LIGHT, NO gradient — reservation)
[5] product-hub-tiles     ← captured (LIGHT, NO gradient — catalog)
[6] ai-tools-showcase     ← direction-authorized new (dark, gradient-rich AI suite surface)
[7] in-the-news           ← captured (LIGHT; selective AI affordance on AI-context items only)
[8] site-footer           ← system-component (NO gradient — chrome)
```

Cadence: header → **dark AI hero** → **dark AI features** → **light catalog/promo** → **light catalog/hubs** → **dark AI suite** → **light news** → dark footer. The dark↔light cadence carries semantic meaning: **dark = AI surface; light = catalog / promo / news**. The user develops the rule "gradient appears on dark, dark means AI" through repetition.

## Layout strategy per section

### 1. Site-header
Inherits variant A unchanged. Sticky pill + backdrop-blur. NO gradient — the nav is system-component chrome, not AI affordance. (One exception consideration: app-switcher icon could carry a small gradient ribbon to signal "AI tools available in the app switcher" — defer to migrate-time.)

### 2. Hero AI (load-bearing for variant F)
Dark substrate `#0a0a14`. 2-column 5/7 split at desktop; stacks vertically at <900px.

- **Left column (copy):**
  - Eyebrow: `Adobe Photoshop · Generative Fill` rendered with `.eyebrow--ai` (gradient bottom-border underline).
  - H1: `Transform how you share information.` (title-1, captured-verbatim). The word *"information"* could carry gradient text, but the brief reserves gradient text for explicit AI VERBS — instead, the section H2 below the H1 picks up gradient text on `"Generative"`.
  - Secondary H2 (optional): *"Now with [Generative Fill]"* — where `[Generative Fill]` is wrapped in `.ai-sparkle` gradient text.
  - Body: short paragraph about Generative Fill removing the gap between idea and image.
  - CTA pair: `ds-btn--ai` (gradient surface, "Try AI free") + `ds-btn--ghost-white` ("View plans and pricing"). ONE gradient CTA per viewport.

- **Right column (media):**
  - 16:9 photographic block (captured Photoshop / Generative Fill demo — placeholder gradient with caption signature until media migrates). Subtle gradient halo overlay on the photo edges to tie into the affordance system.

- **Entrance:** baseline `enterUp` staggered 0/80/160/240ms.

### 3. AI feature row (direction-authorized new — gradient-border cards)
Dark substrate continues from hero. Three cards in 3-up grid (1-up on mobile).

- **Section header:** centered eyebrow `Adobe AI` with `.eyebrow--ai` gradient underline + section H2 `Everything Adobe makes now thinks with you.` with `.ai-sparkle` on the word "thinks".
- **3 ai-cards:**
  - Card 1: Photoshop · Generative Fill — Sketch a thought; finish a composition.
  - Card 2: Acrobat · AI Assistant — Read a 200-page PDF in 90 seconds.
  - Card 3: Firefly · Commercial-safe AI — Generate images, video, audio.
- Each card uses the `.ds-card--ai` pattern: layered background-clip giving a 1.5px gradient border on the dark substrate. Padding 24px. Eyebrow + H3 + body + outline CTA per card.
- **Entrance:** `anim-enter` group stagger 0.10.

### 4. Promo strip (LIGHT — reservation)
Light substrate `#ffffff`. Same 2-up captured promo cards as variant A: "Save 50% Creative Cloud Pro." + "Save 30% and go unlimited."
- **NO GRADIENT.** This is the reservation discipline in action: discount promotions are NOT AI affordance.
- The rounded-top 32px section transition (light over dark) signals "context change" — affordance reset.

### 5. Product hub tiles (LIGHT — catalog)
Light substrate continues. 3-up grid as variant A: Creative Cloud / Acrobat / Explore. Each tile carries body copy + outline CTA.
- **NO GRADIENT** on the tiles themselves. The Acrobat tile body MAY mention "AI-powered tools" but no gradient affordance applied — catalog browsing ≠ AI affordance.

### 6. AI tools showcase (direction-authorized new — dark, gradient-rich)
Dark substrate `#0a0a14`. The dedicated AI suite surface.

- Section eyebrow `The Adobe AI suite` with gradient underline.
- Section H2 `Four products. One creative intelligence.`
- Body paragraph naming all four AI products + the brand's chromatic-affordance rule.
- 4-tile row of mnemonic ribbons (Firefly / Generative Fill / AI Assistant / Express AI) — each carries the `.ai-mnemonic-ribbon` 32×32 gradient corner.
- Dual CTA: `ds-btn--ai` ("Explore AI") + `ds-btn--ghost-white` ("See pricing").
- **Entrance:** `anim-enter` baseline.

### 7. In the news (LIGHT — selective AI affordance)
Light substrate. 3-up grid captured from variant A.
- 1st item meta `ACROBAT · TAX SEASON` — no gradient (taxes ≠ AI).
- 2nd item meta `ACROBAT · AI` — the word "AI" gets gradient underline (selective affordance per reservation rule).
- 3rd item meta `CREATIVE CLOUD · SUNDANCE` — no gradient (film festival ≠ AI).
- The user-visible rule: gradient appears ONLY where the content is about AI. Consistency reinforces the chromatic vocabulary.

### 8. Site-footer
Inherits variant A unchanged. NO gradient — footer is system-component chrome, not AI affordance. Footer wordmark wipe baseline.

## Key states (delta from A)

- **Hero `.ds-btn--ai` hover:** elevated shadow `box-shadow: 0 6px 24px rgba(141, 136, 242, 0.36)` + `transform: translateY(-1px)`. NO gradient shift (the gradient is the message; don't dilute on hover).
- **`.eyebrow--ai` hover:** none (the gradient underline is decorative-static).
- **`.ds-card--ai` hover:** the gradient border intensifies via `filter: brightness(1.1)` on the border layer. Subtle. Inner content unchanged.
- **`.ai-sparkle` text:** static. NEVER animates (gradient text animation reads as decoration, fails the reservation rule).
- **`.ai-mnemonic-ribbon`:** static corner ribbon.
- **`prefers-reduced-motion: reduce`:** No additional changes (F's affordances are static; the only motion is the inherited scroll-driven section entrance which already respects reduced-motion via A's pattern).

## Choreography count

F uses zero choreographed sequences beyond A's baseline (page-load entrances + scroll-driven section reveal). The amplification is CHROMATIC, not motion-led. Discipline cap not stressed.

## Structural data attributes

- `<header data-component="site-header" data-system-component="header" data-nav-collapse="hamburger">`
- `<section data-section="hero-ai" data-section-purpose="marquee" data-variant="F" data-substrate="dark" data-ai-affordance="true">`
- `<section data-section="ai-feature-row" data-section-purpose="feature-list" data-substrate="dark" data-ai-affordance="true">`
- `<section data-section="promo-strip" data-section-purpose="conversion">`
- `<section data-section="product-hub-tiles" data-section-purpose="navigation">`
- `<section data-section="ai-tools-showcase" data-section-purpose="feature-list" data-substrate="dark" data-ai-affordance="true">`
- `<section data-section="in-the-news" data-section-purpose="rich-text">`
- `<footer data-component="site-footer" data-system-component="footer">`

## Heading hierarchy

- H1: "Transform how you share information." (hero — captured-verbatim)
- H2: "Everything Adobe makes now thinks with you." (ai-feature-row) / "Save 50% Creative Cloud Pro." (promo) / "Save 30% and go unlimited." (promo) / "Creative Cloud" / "Acrobat" / "Explore" (hub tiles) / "Four products. One creative intelligence." (ai-tools-showcase) / "In the news"
- H3: 3 ai-card titles + 3 news titles + footer column titles

## Unsourced content

| Section | Item | Reason |
|---|---|---|
| hero-ai | photo asset | placeholder gradient + caption signature |
| ai-feature-row | 3 card background imagery | placeholder gradients per card |
| ai-tools-showcase | 4 mnemonic tile imagery | placeholder gradients per product |

## Reservation discipline (the load-bearing check at craft time)

**Every gradient instance in the rendered file must cite an AI-affordance reason.** Audit gate:
- Each gradient occurrence (`linear-gradient(135deg, #8D88F2, #EB1000)`) must appear in a section with `data-ai-affordance="true"` OR be wrapping a literal AI capability (Generative Fill, AI Assistant, Firefly, Express AI, the word "AI", or the brand's "thinks/thinking" verb).
- Non-AI sections (promo / hub / news / footer) must contain ZERO gradient instances.
- Violations refuse render.

## Fidelity
`refined` — same as A. Plus F-specific: WCAG verification on `.ai-sparkle` text against `#0a0a14` substrate (gradient midpoint ~#8C4779 → 6.8:1 against #0a0a14, passes AA).

## Open questions
None. Ready to render.
