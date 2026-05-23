---
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:45:00-07:00
  readArtifacts:
    - DESIGN-A.json   # inherits palette/type/spacing/radius/components
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/trait-matrix.json
    - stardust/prototypes/home-improvements.md
  stardustVersion: 0.7.1
  variant: B
  variantRole: "One captured trait amplified — scroll cinema"
  variantThesis: "adobe.com as motion cinema — a trait Adobe owns the bench for but doesn't yet deploy. Sticky scroll-grow hero, reverse-hero carousels, CSS garage-door reveals, wordmark wipe, fully Lenis-driven."
  inherits: DESIGN-A.json
  mode: A
  amplifiedTrait: "scroll-driven choreography (from bizpro-hub sample)"

# Tokens inherited from DESIGN-A — listed here for explicitness but unchanged.
colors: "inherit-from-A"
typography: "inherit-from-A"
rounded: "inherit-from-A"
spacing: "inherit-from-A"

# Variant-local additions to the component vocabulary.
components: [hero-scroll-grow, tutorial-carousel-reverse-hero, studio-banner-garage-door, wordmark-reveal-section, "+all-from-A"]
---

# DESIGN — adobe.com (target, variant B — scroll cinema amplified)

> One captured trait amplified — the scroll-driven choreography demonstrated in `samples/static/bizpro-hub-prototype/`. The thesis: *adobe.com as motion cinema*. Every primary section becomes a directed sequence under scroll, not a passive scroll-past. Variant B inherits A's tokens unchanged; what differs is **motion energy and hero strategy**.

## North star

The captured live home and product pages run motion-light despite Adobe's production-class bench. Variant B amplifies the Lenis-driven scroll choreography demonstrated in the bizpro-hub sample (`hero-scroll-grow`, `tutorial-carousel-reverse-hero`, `studio-banner-garage-door`, `footer-wordmark-wipe`) into the canonical motion pattern across the marketing surface. Tokens stay identical to variant A; the visual identity is in the motion, not the surface.

## Overview

| Area | Spec |
|---|---|
| **Tokens** | Inherited from `DESIGN-A.json` — palette, type, spacing, radius, breakpoints. Variant B does not introduce new tokens. |
| **Motion stack** | Lenis 1.x **required** (not optional). Every primary section is choreographed. CSS scroll-driven animations (`animation-timeline: view(block)`) used on banner sections. No GSAP. |
| **Hero strategy** | **Scroll-grow hero** — 300vh container with sticky child; video/imagery grows from bounded → fullbleed via JS rAF reading `window.__lenis.scroll`. Text parallaxes out faster than imagery scales. (Per `samples/SAMPLES.md` § 9.4.) |
| **Carousel strategy** | **Reverse-hero entrance** — carousels enter from full-bleed (100vw slide width, 0 border-radius, 60px gap) and settle into centered position (1068/1440 width, 16px radius, 8px gap) at 60% of section scroll progress. Then user-controllable carousel takes over. |
| **Banner strategy** | **Garage-door reveal** — full-bleed banner sections use CSS `animation-timeline: view(block)` to translate up `-50vh → 0`, background image scales `1.0 → 1.1`, content fades in over `cover -10% → cover 100%`. |
| **Wordmark** | Footer Adobe wordmark gets the clip-path inset reveal (`60% → 0%` over `0.5vh` scroll) per samples on every page (variant A has this baseline; B confirms as canonical). |

## Key characteristics (delta from A)

1. **Scroll-grow hero is the canonical home + landing pattern.** Every home, product hub, and feature landing gets the 300vh + sticky-child + video/imagery scaling. Text fades out faster than imagery scales; scrim and overlay copy fade in at scroll-fractions 0.25 / 0.35; the next section slides up over residual.
2. **Reverse-hero carousels.** Every multi-slide section (story carousel, tutorial carousel, customer-story carousel) uses the reverse-hero entrance before handing control to user-driven navigation.
3. **CSS scroll-driven banner reveals.** Any full-bleed banner section (`.studio-banner` pattern from samples) declares `animation-timeline: view(block)` for the garage-door grow + scale + content fade. Native CSS, no JS.
4. **Stories mouse-pan.** Horizontal-overflow card tracks (testimonial / customer-story carousels) use the mouse-proximity pan pattern (cursor X relative to viewport center determines translateX). No drag.
5. **Wordmark wipe is mandatory on every page** with a footer — not just home.
6. **Inheritance is total for tokens.** Variant B introduces zero new palette, type, radius, or spacing values. The amplification lives in `motion` + `componentStyle.heroOverlay/carouselEntrance/garageDoor` only.

## Rules (delta from A)

- **Lenis is mandatory**, not optional. Every page that runs JS imports `assets/lenis.min.js` and exposes `window.__lenis`.
- Every primary content section above the fold has a scroll-coupled treatment (entrance, scale, or parallax). Below-fold sections may opt to use only the baseline section-entrance from variant A.
- The `prefers-reduced-motion: reduce` guard is enforced strictly — under reduced motion, Lenis is disabled, the hero shows its bounded final state (no scroll-grow), and all CSS scroll-driven animations fall back to their `to` state immediately.
- `animation-timeline: view(block)` is the only legal API for declarative scroll-driven choreography. JS rAF (per samples' patterns) is the only legal imperative API.
- IntersectionObserver, GSAP, ScrollTrigger, framer-motion remain forbidden.

## Dos (delta from A)

- Hero is scroll-grow, not centered-static.
- Tutorial / story carousels enter reverse-hero, then become standard carousels.
- Full-bleed banners get garage-door reveal.
- Wordmark wipe on every page footer.

## Don'ts (delta from A)

- Scroll-grow hero on inner pages where the IA priority is "answer a specific question" (e.g. comparison chart, FAQ-led pages — these get baseline motion only).
- More than 3 scroll-coupled sequences per page — visitor sensory overload.
- Custom motion patterns invented outside the samples' vocabulary — every choreography deployed must trace to a named pattern in `samples/SAMPLES.md § 9`.
