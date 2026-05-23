<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:35:00-07:00
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/trait-matrix.json
  stardustVersion: 0.7.1
  sharedAcross: ["variant-A", "variant-B", "variant-C"]
  variantInvariant: true
  scope: "Target strategy for www.adobe.com marketing surface redesign. business.adobe.com pending sister project."
-->

# PRODUCT — adobe.com (target)

The target strategy for the marketing-surface redesign. Shared across all three variants (Mode A — per-brand strategy doesn't shift between variants). Carries forward from `stardust/current/PRODUCT.md` with the resolved direction applied.

## Register

**brand**

adobe.com is and remains a marketing landing surface. The redesign target stays brand-register; product/dashboard register lives on subdomains out of scope.

## Users

Four audience tracks the marketing surface routes between. The redesign preserves this routing IA (per the IA-priority audit in `DESIGN-*.json#extensions.iaPriorities[]`):

1. **Consumers / individual creators** — entry through `/`, `/express/`. Discovery: Photoshop, Illustrator, Lightroom, Premiere, Acrobat. Conversion verb: **"Free trial"** then **"Buy now"**. The aesthetic accent of this track is **photography-led** (a generated brick wall, a creator's workspace, a Premiere timeline frame).
2. **Small business and team buyers** — surfaced through "View plans and pricing" → Creative Cloud Pro / Acrobat Pro pricing pages. License-quantity dropdowns and AI-add-on rows live here (per `samples/static/plan-page/`). The aesthetic accent is **structured + comparison-rich** (4-up merch cards, nested-radius pricing, comparison chart with sticky header).
3. **Enterprise decision-makers** — surfaced through "Marketing & Commerce" top-nav and "Adobe for Business" sections. Link-out to business.adobe.com for B2B funnel; routing-only on www. The aesthetic accent is **conservative + dense** (no marketing motion, IA-heavy).
4. **Students / educators** — partial visibility on marketing surface; discovery primarily on dedicated `/education/` paths (out of crawl). Aesthetic accent inherits from track 1.

The marketing surface is a routing layer first, persuasion second. Hero copy on `/` foregrounds the active campaign (currently Photoshop / Generative Fill); the redesign preserves this practice but anchors it with stronger product-mnemonic framing.

## Product Purpose

> Make the breadth of Adobe — 20+ creative apps, document tools, business solutions — legible to a global multi-audience visitor in the first viewport, then route them to the right conversion funnel without forcing them through a generic SaaS pitch.

Scope: the public marketing surface (`/`, `/products/*`, `/express/`). Out of scope: product-internal UI (creativecloud.adobe.com), the Acrobat web app, business.adobe.com, education paths.

## Brand Personality

Five moves the redesign target makes, each derived from a resolved axis movement:

- **Professional warm** *(tone, inherited)* — short sentences, mixed-case display headings, period-terminated marquee voice ("Transform how you share information."). No jargon. No casual exclamation.
- **Aspirational but specific** *(expressive axis, A: restrained → B/C: committed)* — feature-named copy ("Generative Fill", "PDF Spaces", "AI Assistant"). Product mnemonic is the trust signal. Variant A keeps this restrained; B and C push expressive in their amplified-trait direction (motion or photography).
- **Confidently restrained** *(distinctiveness, A: familiar)* — the marketing surface earns trust by being recognizably Adobe across every page, not by reinventing the language. Variants B and C move toward `distinctive` only within Mode A's captured-trait amplification.
- **Multi-audience routing IA** *(intentional, all variants)* — top nav surfaces 4 audience tracks before any product. Discovery beats persuasion in the first viewport. (IA-priority audit locks this for all variants under `reimagined` ia-fidelity.)
- **Tile-led, photo-led** *(layout, captured)* — surfaces stay near-monochrome; photographic imagery + product mnemonics provide the only chroma alongside Adobe blue CTAs. Variant C amplifies this; A and B keep current execution.

## Anti-references

The redesign target explicitly does **not** become:

- **Editorial / atelier register** — "the studio," "the journal," "mise-en-place," "the atelier" do not appear. adobe.com is a product brand, not an editorial publisher. (See `divergence-toolkit.md § Voice-rule moves → editorial-register-vocabulary-applied-to-non-editorial-brands`.)
- **Cute / casual** — emoji, exclamation marks, hand-drawn iconography. Brand voice stays direct.
- **Single-product narrative** — collapse to one product's story. Adobe's marketing surface is deliberately multi-product, multi-audience; all three variants preserve this.
- **Generic 2026-SaaS silhouette** — centered hero + dual CTA + gradient mesh background + abstract illustration. (Anti-toolbox guardrail; all three variants must explicitly avoid.)
- **Pre-2024 SaaS template silhouette** — left-anchored hero + stock photo of two engineers at a laptop + double CTA. Outdated pattern none of the captured pages use.
- **Editorial reimagination** — adobe.com is not a magazine; the target keeps the routing-IA discipline. Variant C's "elastic tile mosaic" amplifies *captured* tile patterns, not a magazine layout.

## Design Principles

Five principles, each mapping to a specific axis movement or constraint:

1. **Show the work, not the chrome.** *(distinctiveness, captured-pattern)* Hero imagery is product output — generated content, real compositions, real frames. Not stylized SaaS illustration, not abstract gradients.
2. **Route before persuade.** *(IA-priority, locked)* Top nav and home grid surface audience tracks before any specific product or feature pitch. The visitor disambiguates first; the funnel persuades after.
3. **One verb per conversion track.** *(improvements list #1)* "Free trial" + "Buy now" is the canonical conversion pair. "View plans and pricing" is the canonical discovery verb. No more than one of each per viewport.
4. **Mixed-case display at weight 900.** *(captured + improvements #4)* Adobe Clean Display at weight 900, mixed case, period-terminated for marquee voice. Fluid `clamp()`-based scale (samples' ratio). Never uppercase except short imperative chips.
5. **Lenis-first motion, no GSAP.** *(samples + improvements #2)* Motion derives from Lenis + rAF + native CSS scroll-driven animations. No GSAP, no ScrollTrigger, no IntersectionObserver. This is a hard rule for prototype + migrate so the stack stays consistent across pages and variants.

## Accessibility & Inclusion

- **Heading order preserved**: every page emits semantically-ordered h1-h6. The redesign does not break this.
- **Alt text required** on all product mnemonic images and editorial photography. Decorative imagery (background motifs) uses empty alt + aria-hidden.
- **Geolocation interrupt non-modal**: per improvements list #3, the geo-redirect surface becomes a dismissible banner, not a focus-trapping dialog. Keyboard-only flow reaches the hero from the address bar in one tab.
- **Theme-color meta** added (currently absent on every captured page). Dark-mode users see brand-aligned chrome.
- **Focus-visible** on every interactive control. Pill buttons get a 3px outline ring at 20% Adobe blue (`0 0 0 3px rgba(59,99,251,0.2)`).
- **Reduced-motion**: variant B's scroll choreography respects `prefers-reduced-motion: reduce` — Lenis instance disables its lerp, scroll-driven entrances collapse to immediate display, garage-door reveals fall back to static.
- **Contrast**: Adobe blue `#3b63fb` on white passes AA at 4.6:1 for normal text but **fails AA on `#f8f8f8` surfaces at ~3.3:1**. Reserve blue CTAs to white grounds; use `#274dea` (the hover state) on gray surfaces.
