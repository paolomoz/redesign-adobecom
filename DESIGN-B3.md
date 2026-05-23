---
_provenance:
  writtenBy: stardust:direct --add-variant B3
  writtenAt: 2026-05-23T19:00:00-07:00
  readArtifacts:
    - DESIGN-B.json   # immediate parent
    - DESIGN-A.json   # transitive base (B inherits from A)
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/static/bizpro-hub-prototype/bizpro-hub.html
    - stardust/direction.md
    - stardust/prototypes/b-directions-B1-B5.html   # B3 sketched here
  stardustVersion: 0.7.1
  variant: B3
  variantRole: "Surface fork of B — Maximal cinema (loud register)"
  variantThesis: "Adobe's full motion bench, on every primary surface. Same captured trait as B (scroll-driven choreography), intensified across all 6 surface axes."
  parentVariant: B
  parentRole: "One captured trait amplified — scroll cinema"
  inherits: DESIGN-B.json (which inherits DESIGN-A.json)
  mode: A
  surfaceForkAxes:
    - "type-weight: +1 weight on body H3s (700 vs B's 400)"
    - "type-scale ratio: perfect-fifth 1.5 (vs B's clamp() inherited from A)"
    - "density: packed 48px desktop (vs B's balanced 64px)"
    - "motion energy: 5 choreographies (vs B's 3) — B-cap override"
    - "color temperature: warm-leaning placeholder tints"
    - "spacing rhythm: compact"
  capOverride: "DESIGN-B's '≤3 choreographed sequences per page' rule is overridden to ≤5 for B3 specifically. Justified by the load-bearing thesis (maximal cinema). Risk: motion fatigue — see § Risk notes."

colors: "inherit-from-B-to-A"
typography:
  "inherit-from-B-to-A (family + clamp scale)":
    "+B3-overrides":
      scale-ratio: "perfect-fifth (1.5) at desktop"
      title-1-size: "clamp(48px, 8vw, 108px)"
      title-1-letter-spacing: "-3.5px"
      title-1-line-height: "0.90"
      body-H3-weight: 700

rounded: "inherit-from-B-to-A"

spacing:
  "inherit-from-B-to-A (8pt base scale)":
    "+B3-overrides":
      sectionPadding-desktop: "48px"
      sectionPadding-tablet: "36px"
      sectionPadding-mobile: "24px"
      densityTier: "packed"

components: "inherit-from-B (button-primary, button-outline, etc.) + B3 adds: parallax-host, scroll-scrub-host"
---

# DESIGN — adobe.com (target, variant B3 — Loud / Maximal cinema)

> Surface fork of variant B. Same captured-trait amplification (scroll-driven choreography from `bizpro-hub.html`), tuned to its loudest defensible expression. **The variant a stakeholder picks when they want to demo Adobe's full motion bench.**

## Variant role

B3 is **not** a distinct captured-trait amplification (those are siblings of B — variants C, F, etc.). B3 is a **surface fork of B** — it carries the same scroll-cinema thesis tuned across the 6 surface axes per `direct/SKILL.md § Phase 2.6 verbatim fork rules`. The non-standard part: surface forks are officially A1/A2/A3 under `ia-fidelity: verbatim`, and we're in `reimagined`. B3 is documented as the parent direction's tuning, not a new role.

## North star

Maximal scroll cinema. If B is *"adobe.com as motion cinema, deployed at sample-fidelity,"* B3 is *"adobe.com as motion cinema, with every dial turned up that can be turned up without breaking the brand."* The variant exists to test the question: how loud can the scroll choreography get before motion fatigue beats expressive payoff?

## Overview

| Area | Inherited from B (and A) | B3 override |
|---|---|---|
| **Palette** | Adobe blue #3b63fb + brand-red #eb1000 reserved + grayscale | — (Mode A pin) |
| **Typography family** | Adobe Clean / Adobe Clean Display | — (Mode A pin) |
| **Type scale** | A's clamp() (≈1.43 at desktop) | **perfect-fifth 1.5** at desktop (louder ratio) |
| **Type weight** | 900 display · 700 labels · 400 body | **+ 700 on body H3s** |
| **Spacing** | balanced 64/48/32 (desktop/tablet/mobile) | **packed 48/36/24** |
| **Rounded** | 16 / 8 / 32 / 999 / 12 | — |
| **Motion stack** | Lenis 1.x mandatory · rAF + CSS view-block | — (B's stack inherited) |
| **Choreography count cap** | B's ≤3 rule | **B3 override: ≤5** |
| **Choreographies deployed** | 3 (hero-scroll-grow + stories-mouse-pan + tutorial-reverse-hero) + CSS garage-door + wordmark wipe | **+ featured-products-parallax + news-scroll-scrub-3-stage** = 5 rAF total |
| **Color temperature** | neutral (captured palette) | **warm-leaning** (placeholder tints emphasize amber/orange where photographic substrates appear) |
| **Spacing rhythm** | standard | **compact** (gridGap tightens from 16px → 8px; card padding 24px → 20px) |
| **Brand-faithful inversions** | inherited 3 | — (B3 adds 0 new inversions) |
| **IA-priority audit** | inherited (5 priorities) | — (cannot opt out under Mode A) |

## New choreographies (B3-specific)

### 6. featured-products-parallax

Featured-products section's media imagery translates at 60% of scroll velocity while the container scrolls at 100%. Creates a sense of depth — image sits in a deeper plane than its container.

```js
// rAF on featured-products section
const rate = 0.6;
const rect = featuredEl.getBoundingClientRect();
const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
mediaEl.style.transform = `translateY(${(progress - 0.5) * rect.height * (1 - rate)}px)`;
```

Bidirectional. Reduced-motion: parallax disabled, media renders at default position.

### 7. news-scroll-scrub-3-stage

In-the-news section's 3 photo grid items reveal in three stages tied to scroll progress through the section. Item 1 fades in at rawP=0.2; item 2 at rawP=0.5; item 3 at rawP=0.8.

```js
// rAF on news section
const stages = [0.2, 0.5, 0.8];
const progress = clamp((sY - newsTop + vh) / (vh + newsH), 0, 1);
items.forEach((el, i) => {
  const p = clamp((progress - stages[i]) / 0.15, 0, 1);
  el.style.opacity = String(p);
  el.style.transform = `translateY(${(1 - p) * 24}px)`;
});
```

This is a finer-grained stagger than the universal `anim-enter` pattern A/B share — the gap between item appearances is wider (0.3 scroll fractions vs ~0.10 stagger), giving each item more weight.

## Rules (delta from B)

- **≤5 choreographed sequences per page** (B-cap override, B3-specific).
- **Below-fold motion is also choreographed** — A/B's below-fold uses only the baseline anim-enter; B3's below-fold sections each get a custom motion treatment (featured = parallax; news = 3-stage scrub).
- **Compact rhythm enforced** — section padding bumps from B's 64px to 48px desktop; cards from 24px to 20px padding; grid gaps from 16px to 8px.
- **Warm placeholder tints** — when placeholder gradients stand in for captured imagery, B3 uses amber/orange dominant gradients (vs B's neutral grays + blue accents).
- **Display type at perfect-fifth scale** — title-1 reaches 108px at extreme viewports (vs B's 80px max). Bigger marquee read.

## Risk notes

1. **Motion fatigue.** Five concurrent rAF loops + CSS view-block animations per page. Even on modern hardware, this approaches the ceiling of what feels intentional vs overstimulating. Verify with `prefers-reduced-motion` users and on lower-end devices (M1 baseline acceptable; older Intel laptops + low-end Android may stutter).
2. **Layout shift on slow networks.** With 5 motion-coupled elements, any image lazy-load that shifts layout will disrupt all 5 timings simultaneously. Mitigations: explicit `aspect-ratio` on every media element; eager-load LCP image; `font-display: swap` only with size-adjust to prevent FOUT shift.
3. **Below-fold attention budget.** Variant A/B keep below-fold calm so above-fold motion lands clearly. B3 saturates below-fold too. Acceptable if the user's attention budget *is* the marketing message ("Adobe is dense with creativity"); risky if it isn't.

## Brand-faithful inversions

Inherited from B (which inherits from A's 3):
1. Pure surfaces — `#000` and `#ffffff` legal.
2. Backdrop-blur glassmorphism on nav legal.
3. Hex color format retained (no OKLCH conversion).

B3 adds **zero** new inversions. The amplification is in motion + density + scale, none of which require breaking impeccable hard rules.

## Dos (delta from B)

- Featured-products imagery parallaxes at 60% scroll velocity.
- News grid items appear in 3-stage scrub (0.2 / 0.5 / 0.8).
- Hero title at title-1 perfect-fifth scale (clamp 48px → 108px).
- Body H3s at weight 700 (heavier than B's 400).
- Section padding 48px desktop (compact rhythm).
- Warm-leaning placeholder gradients.

## Don'ts (delta from B)

- Adding a 6th rAF choreography (cap stays ≤5 even in B3).
- Below-fold sections without motion (B3's thesis requires saturation).
- Calm placeholder gradients (warm-leaning is the temperature).
- Title-1 below 80px max (perfect-fifth scale is the rule).
- Section padding above 56px desktop (compact stays compact).
