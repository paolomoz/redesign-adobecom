---
_provenance:
  writtenBy: stardust:direct --add-variant F
  writtenAt: 2026-05-23T16:00:00-07:00
  readArtifacts:
    - DESIGN-A.json   # inheritance base
    - stardust/current/_brand-extraction.json
    - samples/SAMPLES.md
    - samples/static/plan-page/Acrobat Plans — PDF & Productivity.html   # AI add-on gradient source
    - stardust/direction.md
    - stardust/prototypes/more-directions-D-M.html   # F's first sketch
  stardustVersion: 0.7.1
  variant: F
  variantRole: "One captured trait amplified — AI Sparkle Pervasive"
  variantThesis: "The captured AI add-on lockup gradient becomes a chromatic vocabulary for AI activity. The brand signals where AI is working without claiming it in words."
  amplifiedTrait: "samples' .merch-card__addon gradient linear-gradient(135deg, #8D88F2, #EB1000) — elevated from one-off pricing lockup to ambient AI affordance system"
  inherits: DESIGN-A.json
  appliedImprovements: [1, 2, 3, 4, 5]   # inherits A's improvements floor
  mode: A
  reservationDiscipline: "The AI gradient is SEMANTIC, not decorative. It marks AI-active surfaces (Generative Fill, AI Assistant, Firefly contexts, AI add-on rows). Non-AI surfaces (pricing promos, standard product hubs, generic news) stay token-faithful. The gradient is a chromatic affordance — not ambient ornamentation."

colors: "inherit-from-A"
typography: "inherit-from-A"
rounded: "inherit-from-A"
spacing: "inherit-from-A"

# Variant-local: AI gradient affordance system
extensions:
  ai-affordance-tokens:
    gradient: "linear-gradient(135deg, #8D88F2 0%, #EB1000 100%)"
    gradient-stops: ["#8D88F2", "#EB1000"]
    gradient-reservation: "AI-active surfaces only — Generative Fill, AI Assistant, Firefly mentions, AI add-on rows, AI feature cards. Forbidden on non-AI conversion or content surfaces."
    surfaces:
      - eyebrow-underline: "2px gradient bottom-border on eyebrows of AI-context sections"
      - card-border: "1.5px gradient border via layered background-clip on AI feature cards"
      - text-emphasis: "background-clip: text on key AI verbs ('thinks', 'generative', 'assistant')"
      - cta-surface: "gradient as button background for AI-context primary CTAs (e.g. 'Try AI free')"
      - icon-accent: "gradient as fill on AI-product mnemonic chips (Firefly, AI Assistant)"

components: [button-primary, button-outline, button-ai-gradient, ai-card, ai-eyebrow, link, badge, all-from-A]
---

# DESIGN — adobe.com (target, variant F — AI Sparkle Pervasive)

> One captured trait amplified — the AI add-on lockup gradient. Variant F inherits A's tokens unchanged; the variant-local move is a chromatic vocabulary for AI affordance. The brand signals **where AI is** without saying so in words.

## Variant role

**F — One captured trait amplified.** Per `direct/SKILL.md § Phase 2.6 Variant role contract`: amplify a specific trait already in the captured brand surface. The trait: `samples/static/plan-page/Acrobat Plans — PDF & Productivity.html § .merch-card__addon` — the purple→red gradient `linear-gradient(135deg, #8D88F2, #EB1000)` used as a 1.5px border on the AI add-on row inside business pricing cards.

The brand-personality move: surfaces AI capability as a recognizable chromatic affordance. A user developing visual vocabulary for "Adobe + AI" reads the gradient as "this surface does AI work" without parsing copy. The discipline is **reservation** — the gradient is forbidden on non-AI surfaces, so it stays a meaningful signal rather than ambient ornamentation.

## North star

The captured `.merch-card__addon` gradient is currently a one-off — it appears once per business pricing card, on a single 40px tall row. Variant F asks: *what if the gradient were the brand's chromatic shorthand for AI*? Eyebrows underlined with it on AI-context sections. AI feature cards bordered with it (via the captured layered-background-clip technique). Key AI verbs ("thinks", "generative", "assistant") set in gradient text. The primary CTA in AI contexts ("Try AI free") uses the gradient as button surface.

But the discipline is non-negotiable: **gradient ≠ ambient decoration**. The captured `.merch-card__addon` row only appears next to the AI feature in business pricing — that's the brand's existing reservation rule, scaled up. F amplifies the rule's *scope* (more surfaces) while preserving the rule's *semantic* (gradient = AI affordance).

## Overview

| Area | Spec |
|---|---|
| **Tokens** | Inherited from `DESIGN-A.json` — palette, type, spacing, radius. **No new colors** introduced (gradient stops `#8D88F2` and `#EB1000` are captured in samples). |
| **Gradient stops** | `#8D88F2` (Adobe Firefly partner purple, captured) → `#EB1000` (Adobe brand-mnemonic red, captured). Direction `135deg`. |
| **AI surfaces (4 patterns)** | (1) Eyebrow underline — 2px gradient bottom-border on `.eyebrow--ai`. (2) Card border — 1.5px gradient border via layered background-clip on `.ds-card--ai`. (3) Text emphasis — `background-clip: text` on key AI verbs. (4) CTA surface — gradient as button background for `.ds-btn--ai`. |
| **Reservation** | Gradient appears on AI-active surfaces only. Generative Fill, AI Assistant, Firefly, AI add-on, AI feature sections. Non-AI surfaces (promos, hubs, generic news, footer) stay token-faithful. |
| **Motion** | Inherits A's baseline (entrance + scroll-driven section reveal). No scroll-grow (that's B), no hover-reveal tile system (that's C). |

## Key characteristics (delta from A/B/C)

1. **Gradient as chromatic affordance** — when the user sees the gradient, AI is at work in that surface. Repetition + reservation builds the vocabulary.
2. **Dark hero substrate** — variant F's hero sits on `#0a0a14` (dark navy-black) so the gradient affordances read with high contrast. (Light substrate makes the gradient muddy.)
3. **Light non-AI sections retain A's tokens** — promo strip, generic product hub, news section all stay light + standard. The dark↔light cadence carries semantic meaning (dark = AI; light = catalog/promo).
4. **One AI-context CTA surface variant** — `ds-btn--ai` uses gradient as background. Used in AI contexts only; one per viewport.
5. **AI-product mnemonics get gradient corner accents** — Firefly's tile in any product grid carries a gradient ribbon; AI Assistant's tile likewise. Standard products (Photoshop without Generative Fill emphasis, Illustrator, Premiere) stay token-faithful.
6. **Text emphasis sparingly** — `background-clip: text` is dangerous (gradient text fails contrast on many surfaces). F uses gradient text ONLY in dark-substrate AI hero contexts where contrast is preserved. Per the impeccable hard rule "gradient text — never", variant F adds an inversion: *"gradient text legal in AI-affordance contexts on dark substrates ≥ 4.5:1 contrast against gradient midpoint"*.

## Rules (delta from A)

- **Gradient = AI signal.** Never decorative. Never on non-AI sections.
- **AI hero substrate is dark.** Light AI hero is forbidden — gradient affordance reads weak on white.
- **One AI gradient CTA per viewport.** Same rule as one primary CTA — don't dilute.
- **Gradient text only on dark with contrast check.** AA on darkest gradient stop required.
- **Non-AI sections stay token-faithful.** No gradient creep.
- **Inherits all of A's rules** — Adobe blue still the standard CTA color, Adobe red still reserved (the gradient uses brand-red as stop 2; this is the captured pattern, not creep).

## Brand-faithful inversions (variant F adds 1 to A's 3)

| # | Rule | Inversion | Reason |
|---|---|---|---|
| 1 | no pure black/white | literal #000 and #ffffff legal | inherited from A |
| 2 | no glassmorphism | backdrop-blur nav legal | inherited from A |
| 3 | OKLCH only | hex retained | inherited from A |
| 4 | **gradient text — never** | **legal in AI-affordance contexts on dark substrates with ≥4.5:1 contrast against gradient midpoint** | Variant F adds. The captured AI add-on lockup uses gradient as border, not text — but F's amplification extends to text emphasis on key AI verbs. Contrast verified on dark navy substrate. |

## Dos

- "Adobe Photoshop, now with Generative Fill." — eyebrow on hero gets gradient underline; "Generative Fill" gets gradient text emphasis.
- "Acrobat AI Assistant" feature card carries 1.5px gradient border.
- "Try AI free" CTA in AI contexts uses gradient surface.
- "Firefly" product chip in mnemonic grid gets a gradient corner ribbon.
- Dark substrate for any section that features the gradient.

## Don'ts

- Gradient on the "Save 50% Creative Cloud Pro" promo (it's a discount, not AI).
- Gradient on standard product hub tiles (Creative Cloud / Acrobat outline-CTA cards — those are catalog).
- Gradient on the footer (footer is system-component chrome, not AI affordance).
- Gradient text on light substrates (contrast risk; not the captured pattern).
- More than one gradient CTA per viewport.
- Decorative gradient strips or ambient washes — gradient is signal, not motif.
