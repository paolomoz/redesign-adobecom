<!--
_provenance:
  writtenBy: distillation pass (manual, conversational)
  writtenAt: 2026-05-22T13:00:00-07:00
  readArtifacts:
    - samples/static/bizpro-hub-prototype/bizpro-hub.html
    - samples/static/plan-page/Acrobat Plans — PDF & Productivity.html
    - samples/live/snapshots/sr-homepage.html
    - samples/live/snapshots/sr-homepage.png
    - samples/live/snapshots/sr-homepage.log
  samples:
    - bizpro-hub  (static, business marketing surface, video hero)
    - plan-page   (static, pricing/conversion surface, sticky hero)
    - sr-homepage (live fragment, consumer creative hub, tile-rich)
  stardustRole: anchor reference set for /stardust:direct (Phase 2 Mode B inputs)
-->

# Distilled design vocabulary — adobe.com redesign samples

Three samples form a tight reference set: all share the same **s2a- token system**, **Adobe Clean / Adobe Clean Display** type stack, **Lenis-driven scroll choreography**, and **rounded-top section transitions over a black ground**. They differ in *register* — bizpro-hub is business-pro (grayscale + blue, video hero), plan-page is conversion-pricing (sticky parallax hero, license/tier cards), sr-homepage is consumer-creative (color-saturated tile mosaics, photography-led).

This file is the brief that `/stardust:direct` will read as the resolved anchor set. The structured equivalent is `samples/trait-matrix.json`.

---

## 1 — Type system

| Token | Value | Use |
|---|---|---|
| `--s2a-typography-font-size-title-1` | 80px, line 76px, tracking -3.2px | Hero display (full marquee) |
| `--s2a-typography-font-size-title-2` | 56px, line 56px, tracking -1.68px | Section heading |
| `--s2a-typography-font-size-title-3` | 48px, line 48px, tracking -1.2px | Sub-section / hero overlay |
| `--s2a-typography-font-size-title-4` | 24px, line 24px, tracking -0.48px | Card title, FAQ question |
| `--s2a-typography-font-size-eyebrow` | 16px, line 20px, tracking -0.2px, weight 700 | Eyebrow / category label |
| `--s2a-typography-font-size-body-lg` | 20px, line 24px | Hero body / FAQ answer |
| `--s2a-typography-font-size-body-md` | 16px, line 20px, tracking 0.16px | Default body |
| `--s2a-typography-font-size-body-sm` | 14px, line 18px, tracking 0.16px | Card body, table cell |
| `--s2a-typography-font-size-label` | 14px, line 18px, weight 700 | Button label, nav link |

**Families:**
- `'adobe-clean-display'` — black weight 900 used for all `.title-*` classes. Compressed line-height (0.95–1.05), tight letter-spacing.
- `'adobe-clean'` — body, eyebrow, label, button text. Weight 400/700.
- Both ship as local OTF (`assets/fonts/Adobe Clean Display/*`, `assets/fonts/AdobeClean/*`).

**Fluid heading sizes:** title-1/2/3 use `clamp(<min>, <vw-based>, <max>)` — title-1 = `clamp(40px, 6.25vw, 80px)`, title-2 = `clamp(32px, 4.375vw, 56px)`, title-3 = `clamp(28px, 3.125vw, 48px)`.

**Display rules:**
- Headings render mixed-case (not uppercase). Eyebrow renders title-case but at 16px/700, not uppercase.
- Body text capped at `max-width: 80ch` (~13 words per line) — used on `.body-*` classes by default.
- `.title-1` weight 900, line-height **0.95** — tight, near-stacking display.

---

## 2 — Color rhythm

**Grayscale ramp (gray-50 → gray-900):**
```
#f8f8f8 #f3f3f3 #e9e9e9 #e1e1e1 #dadada #c6c6c6 #8f8f8f #717171 #505050 #292929 #131313
```

**Brand:**
- `--s2a-color-blue-900: #3b63fb` — primary CTA solid (the "Adobe blue" of these samples; not the legacy #FF0000 Adobe red).
- `--s2a-color-blue-1000: #274dea` — primary CTA hover.
- `--s2a-color-brand-adobe-red: #eb1000` — reserved for brand mnemonic, AI-sparkle gradient stop, and lockup contexts. **Not used as a CTA color.**

**Surfaces:**
- Background default: `#ffffff` (literal pure white).
- Background subtle: `#f8f8f8` (gray-50).
- Content default: `#000000` (literal black).
- Content subtle: `rgba(0,0,0,0.64)`.
- Black sections use `#000` (true black), white sections use `#fff` (true white). The stardust hard-rule "no pure black/white" will need to be relaxed for the Mode A inversion list — this is brand-faithful behavior.

**Transparency tokens:**
- `--s2a-color-transparent-black-08: rgba(0,0,0,0.08)` — card borders, dividers
- `--s2a-color-transparent-black-16: rgba(0,0,0,0.16)` — nav slash, group dividers
- `--s2a-color-transparent-white-64: rgba(255,255,255,0.64)` — nav glass on light-over-bright
- `--s2a-color-transparent-white-12, -64` — for knockout type on dark

**Accent imagery:** sr-homepage introduces **saturated photographic tiles** (red Firefly sleeve, thermal-cam textures, kitchen photo, etc.) — these are the brand's photography surface, not introduced colors. Mode A image-reuse contract preserves position.

**AI add-on lockup** (plan-page `merch-card__addon`): a gradient border `linear-gradient(135deg, #8D88F2, #EB1000)` — purple→red — appears whenever AI-augmented purchase intent is being surfaced. **Reserve** this gradient to the AI-add-on context; do not use as ambient decoration.

---

## 3 — Spacing scale + grid

**Base scale (4pt):**
```
2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 32 · 2xl 40 · 3xl 48 · 4xl 64 · 5xl 80 · 6xl 96
```

**Layout:**
- `--s2a-layout-sm: 80px` — section padding on small / mobile-aware sections
- `--s2a-layout-lg: 124px` — section padding on hero / large sections

**Grid:**
- 6-col @ mobile (<768px), 12-col @ tablet/desktop (≥768px).
- Outer pad: `--grid-margin-sm: 24px` mobile, `--grid-margin-md: 8.333vw` ≥768.
- Gutter: `--grid-gutter: 8px`.
- Max content width: 1920px (centered ≥2304px on plan-page, ≥1441px on bizpro). Grid overlay debug widget present in both static samples.

**Section padding (density):** `padding-block: var(--s2a-spacing-6xl)` (96px) for primary sections, `5xl` (80px) for secondary, `4xl` (64px) for footer header. Translates to **packed-balanced** in stardust's density vocabulary — closer to packed than airy.

---

## 4 — Border radius vocabulary

| Token | Value | Use |
|---|---|---|
| `--s2a-border-radius-sm` | 8px | Form fields, small cards, panel containers |
| `--s2a-border-radius-md` | 16px | Cards, hero video, image assets, nav pill |
| `--s2a-border-radius-lg` | 32px | Top-of-section rounding (where a section slides over the previous one), heading lock-ups |
| `--s2a-border-radius-999` | 999px | Buttons, search bar, tab bar, eyebrow chips |

**Rounded-top section pattern:** sections that scroll over a previous one (`.stories`, `.plans-section`, `.faq-section`, `.solutions`) use `border-radius: 32px 32px 0 0` plus a negative `margin-top` (e.g. `-32px` or `-100vh` for hero overlap), creating the "drawer sliding up" visual. This is a load-bearing pattern across all three samples.

---

## 5 — Buttons

```css
.btn {
  height: 40px;  /* 32px for --sm */
  padding-inline: var(--s2a-spacing-lg);   /* 24px */
  border-radius: var(--s2a-border-radius-999);
  font-size: 14px; font-weight: 700; letter-spacing: 0;
  border: 1.5px solid transparent;
  transition: background 200ms cubic-bezier(0.42, 0, 0, 1),
              border-color 200ms cubic-bezier(0.42, 0, 0, 1),
              color 200ms cubic-bezier(0.42, 0, 0, 1);
}
```

**Variants:**
- `.btn--primary` — Adobe blue solid, white text, no border. Hover → blue-1000.
- `.btn--outline` — transparent bg, 1.5px black border, black text. Hover → 6% black wash.
- `.btn--dark` — black bg, white text.
- `.btn--ghost-white` — transparent, 1.5px white border at 50% alpha, white text, `backdrop-filter: blur(16px)`. Hover → 8% white wash. Used on dark hero overlay + studio banner.
- `.btn--solid-white` — white bg, black text (used on dark studio banner / hero overlay).
- `.btn--full` — width: 100% (used inside card actions to fill the slot).
- `.btn--sm` — 32px h, 18px padding-inline.

**Pairing rule:** Primary (blue) + outline (black) is the canonical 2-CTA pair on light. Solid-white + ghost-white is the canonical 2-CTA pair on dark.

---

## 6 — Cards

Five card patterns, each with a clear role. **Variant C amplification candidate:** elasticity = card hover behavior (image scale 1.03–1.04, gradient overlay fade-in) is consistent and load-bearing.

### 6.1 `story-card` — full-bleed photo card (bizpro stories carousel)
- 351×468, radius 16px, overflow:hidden.
- Layers (bottom-up): `.story-card__photo` background-image; `.story-card__gradient` linear-gradient(to bottom, transparent 50%, #000 101%); `.story-card__icon` 40×40 top-left; `.story-card__footer` bottom-anchored with category (white at 48% alpha) + title (white).
- **Hover:** photo `transform: scale(1.03)` over 500ms easeOut.

### 6.2 `explore-card` — product tile with hover-reveal background (bizpro product grid + sr-homepage tile mosaics)
- Aspect-ratio 4:3, radius 12px, background `rgba(255,255,255,0.08)` (dark sections) or transparent (light).
- Default state: 32×32 icon + title-4 heading + body-md description. No background image visible.
- **Hover:** `.explore-card-background img` opacity 0→1 + `transform: scale(1.04)` over 400ms ease, plus gradient scrim (`linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)`) opacity 0→1 over 400ms ease.

### 6.3 `merch-card` — pricing card with nested subgrid layout (plan-page)
- Subgrid rows so multiple cards align (`display:grid; grid-row: span 2; grid-template-rows: subgrid;`).
- Outer wrapper: light-mode bg `#f8f8f8` with `outline: 4px solid #f8f8f8` (creates "wrapper border" without box-sizing math); dark-mode bg `#000` with matching outline.
- Inner white card: `background: #fff; border-radius: 12px`. The 4px outline is the gap.
- Slots: mnemonic icon + eyebrow, name + desc, pricing area (with optional license-dropdown + AI-addon row), secure-transaction footer, accordion-toggled features list.
- **Mobile / tablet (<1280px):** features collapse into an accordion. On md (768–1280) the toggle syncs cards in the same row.

### 6.4 `price-card` — older pricing pattern (bizpro pricing section)
- 16px radius outer + 4px solid `#f8f8f8` inset border on inner white card creating a nested ring.
- Plan name + product icon in the gray slot; price + billing + actions + features in the inner.

### 6.5 `acrobat-card` / `included-card` — image + copy + cta (bizpro 3-up, plan-page included-section)
- Asset aspect-ratio **488 / 366** (`= 4:3` near-enough), radius 16px, `object-fit: cover` over a `#eceae7` placeholder background.
- Copy block under the image: 24px top-padding, title-4 + body-md, trailing `.acrobat-cta` (label + 3×6 chevron) at 0.7 opacity on hover.

### Card hover taxonomy
| Card | Hover effect | Duration | Easing |
|---|---|---|---|
| story-card | photo scale(1.03) | 500ms | cubic-bezier(0.42, 0, 0, 1) |
| explore-card | bg-image opacity 0→1 + scale(1.04) + gradient scrim 0→1 | 400ms | ease |
| acrobat-cta | label opacity 1→0.7 | 200ms | cubic-bezier(0.42, 0, 0, 1) |
| btn | bg / border-color tween per variant | 200ms | cubic-bezier(0.42, 0, 0, 1) |
| price-card | (none — entrance only) | — | — |
| merch-card | (none — entrance + accordion) | — | — |

---

## 7 — Nav (header)

```
.nav-wrap            fixed top, padding 8px outer
.nav                 height 64px, backdrop-blur 64–128px, bg rgba(255,255,255,0.64), border-radius 16px
.nav.scrolled        adds 0 2px 12px rgba(0,0,0,0.08) shadow
```

**Anatomy:**
- Left: logo (67×16 SVG) + 1px vertical slash + horizontal link list (≥900px).
- Right: icon button (waffle / all-apps, 32×32) + primary CTA (`btn--primary btn--sm`) + outline CTA (`btn--outline btn--sm`).
- Plan-page nav has the same shell but in **inverted state**: starts transparent over the hero marquee, logo + icon are white (`filter: brightness(0) invert(1)`), outline CTA reads on dark; on scroll it adopts the white-glass treatment with blur(64px).

**Entrance:** `enterDown` keyframes (translateY -24px → 0 + opacity 0 → 1, 600ms ease).

**Mobile:** link list hidden below 900px; only logo + waffle + sign-in shown.

---

## 8 — Footer

Shared shell across all three samples — **the most stable cross-sample component.**

**Block 1 — link grid** (`.footer__cols`):
- 6 columns on ≥900px (`grid-template-columns: repeat(6, 1fr)`), 2-column @ mobile, single-column accordion on plan-page mobile.
- Column header: 16px / weight 700 / white. Link list: 16px / weight 400 / white at 64% alpha. Hover lifts to 90% alpha.

**Block 2 — featured products** (bizpro): label + horizontal row of 4–6 product chips (16×16 icon + 12px / weight 700 name).

**Block 3 — bottom bar**: legal items (Change region, copyright, Do not sell, AdChoices, CCPA mark) on the left + 4–5 social icons (18×18, white) on the right. Mobile collapses vertically.

**Block 4 — wordmark reveal**: full-width Adobe wordmark SVG, `aspect-ratio: 1440/338`. Animated on scroll via `clip-path: inset(<X>% 0 0 0)` driven by rAF + Lenis scroll progress; wipes from 60% inset → 0% over 0.5vh.

**Background:** `#000` (literal black). Surface against this: white headings, 64% white body, 64% white legal copy.

---

## 9 — Motion library

Single load-bearing rule: **all scroll-coupled motion reads `window.__lenis.scroll`** (with `window.scrollY` fallback). No GSAP. No ScrollTrigger. No IntersectionObserver. Two scroll engines coexist in every sample:

1. **Lenis** (smooth scroll, lerp 0.1) — drives `window.__lenis.scroll` from its own rAF loop.
2. **CSS scroll-driven animations** (`animation-timeline: view(block)`) — used for the **garage-door** pattern on `.studio-banner`. Native browser feature; no JS needed.

### 9.1 Lenis instance

```js
const lenis = new Lenis({ lerp: 0.1 });
window.__lenis = lenis;
(function lenisRaf(time) { lenis.raf(time); requestAnimationFrame(lenisRaf); })(performance.now());
```

Loaded from `assets/lenis.min.js` (Lenis 1.x). All hero / section animation loops read `window.__lenis.scroll` for smoothed scroll position.

### 9.2 Page-load entrance (no scroll dependency)

```css
@keyframes enterDown { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes enterUp   { from { opacity: 0; transform: translateY(24px);  } to { opacity: 1; transform: translateY(0); } }
```

Applied to `.nav` (enterDown) and hero text/title/body (enterUp, staggered 0/80/160ms). Duration 600ms, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

### 9.3 Scroll-driven section entrance (`anim-enter` rAF loop)

Shared registry (`animList`) holds `{ el, triggerTop, staggerDelay }` per registered element. On rAF tick, per item:

```js
const raw = (sY + vh * 0.85 - item.triggerTop) / (vh * 0.3);
const p   = easeOut3(clamp(raw - item.staggerDelay, 0, 1));
el.style.opacity   = String(p);
el.style.transform = `translateY(${(1 - p) * 40}px)`;
```

**Bidirectional** — scrolling up reverses. Trigger: element enters viewport at 85% from top. Travel: opacity 0→1 + translateY 40→0 over `0.3vh` of scroll. Easing: `easeOut3 = 1 - (1-t)³`. Per-item stagger 0–0.15 inside a group.

**Group rules:**
- Story cards: `i * 0.10` stagger.
- Acrobat 3-up: `i * 0.12`.
- Price cards: `i * 0.15`.
- Product grid: `i * 0.06` (tighter for 9 items).
- Search bar inputs: 0 / 0.12 / 0.22 stagger.

### 9.4 Hero scroll choreography (bizpro)

300vh container holds a sticky-top child. JS reads Lenis scroll, normalises against `vh`:

```
horizP = easeOut3(clamp(rawP * 2, 0, 1))   // 2x faster, completes at rawP=0.5
vertP  = easeOut3(rawP)                     // full range
```

- **Video grows** from bounded (left = grid-margin, width = grid-width, aspect 1068/600) → full-bleed (left=0, width=vw, height=vw*0.5625). Horizontal completes first; vertical (top) completes last.
- **Border radius** decreases 16→0 based on which edge is within 40px of viewport.
- **Box shadow** grows upward (negative y-offsets) as the video rises over the text.
- **Text** parallaxes out faster: `opacity 1→0` over rawP 0→0.6, `translateY 0 → -40px`.
- **Scrim** fades in from rawP 0.25; **overlay copy** fades in from rawP 0.35 with 20px upward translate.
- **Stories cover deduction**: as the next section's top enters the viewport, scrim and overlay fade out (`clamp(1 - st/vh, 0, 1)`).

### 9.5 Hero marquee parallax (plan-page)

Sticky `.hero-marquee` at top: 50vh (35vw at ≥1280). Background image + scrim + content. CSS variable `--parallax-progress` driven by JS (Lenis-coupled) controls a fade-to-dark overlay:

```css
.hero-marquee::after { background: black; opacity: calc(var(--parallax-progress, 0) * var(--parallax-fade, 0.75)); }
```

The post-hero wrapper (`.post-hero`) uses `transform: translateY(-50vh)` + `margin-bottom: -50vh` to overlap the hero. The hero itself is initially `transform: translateY(-35vh)` (set inline) — the visual ground is offset; scroll progress brings it to rest.

### 9.6 Stories mouse-pan (bizpro)

```
ZONE = 0.5 (left/right 50% each, meeting at center)
overflow = nCards*351 + (nCards-1)*8 - section.offsetWidth + 16
On mousemove: t = (clientX - rectL) / rectW; pan(t < ZONE ? range : -range)
On mouseleave: pan(0)
```

Track CSS transition: `transform 400ms cubic-bezier(0.42, 0, 0, 1)`. No drag — pure proximity.

### 9.7 Tutorial infinite-loop carousel (bizpro)

Track layout: `[clone-2 | real-0 | real-1 | real-2 | clone-0]`. After transition into a clone, silently `goTo(real-equivalent, animate=false)` using double-rAF to suppress the snap.

**Scroll-driven entrance (reverse-hero):** as the section enters viewport, the active slide animates from full-bleed (100vw width, 0 radius) to centered (1068/1440 width, 16px radius). Gap animates 60px → 8px, completing at 60% of entrance progress. Once `tutP === 1`, one-time restore hands control back to the carousel JS.

### 9.8 Studio-banner garage-door (bizpro, CSS scroll-driven)

```css
.studio-banner {
  animation: garage-door-grow ease-out both;
  animation-timeline: view(block);
  animation-range: entry 0% cover 40%;
}
@keyframes garage-door-grow { from { transform: translateY(var(--gd-grow-from)); } to { transform: translateY(0); } }
```

Three concurrent CSS animations on different ranges:
- Banner translate `-50vh → 0` over `entry 0% → cover 40%`.
- Background image scale `1.0 → 1.1` over `entry 0% → cover 100%`.
- Content content fade + translate over `cover -10% → cover 100%`.

At ≥1280px the grow-from doubles (`-110vh`) and range extends to `cover 50%`.

### 9.9 Footer wordmark wipe (bizpro)

```js
const wP = easeOut3(clamp((sY + vh - wordmarkTop) / (vh * 0.5), 0, 1));
wordmarkEl.style.clipPath = `inset(${(1 - wP) * 60}% 0 0 0)`;
```

Reveal completes over 0.5vh of scroll from when the wordmark top crosses bottom-of-viewport.

### 9.10 Comparison-chart sticky header (plan-page)

A `<header>` clone is appended to `<body>` (outside any transform context) and positioned `fixed; top: 96px` when the sentinel scrolls past the nav. Scroll-direction-aware: scrolling down collapses the price + CTA, scrolling up expands them, both over 360ms with `cubic-bezier(0.42,0,0,1)`. A rAF loop checks every frame.

### 9.11 Merch-card features accordion (plan-page)

Mobile / md only. Height animates `0 → scrollHeight` over 300ms `cubic-bezier(0.42,0,0,1)`. Cleanup removes inline styles on transitionend. At md (768–1280) cards in the same grid row sync open/close.

---

## 10 — JS stack contract

| Library | Version | Purpose | Verdict |
|---|---|---|---|
| Lenis | 1.x (UMD `assets/lenis.min.js`) | Smooth scroll, exposes scroll position to rAF loops | **Required** — load on every prototype + migrated page |
| GSAP | — | not used | **Not required** — samples deliberately avoid it |
| ScrollTrigger | — | not used | **Not required** |
| IntersectionObserver | — | not used | not required |
| CSS scroll-driven animations | native | garage-door studio banner | **Required** — used on `studio-banner`-class sections |

**Loading pattern (canonical):**
```html
<link rel="stylesheet" href="assets/lenis.min.css">
<!-- … page styles + body … -->
<script src="assets/lenis.min.js"></script>
<script>
  (function () {
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    (function lenisRaf(t) { lenis.raf(t); requestAnimationFrame(lenisRaf); })(performance.now());
  })();
</script>
```

Lenis is at the end of `<body>`, after all per-page animation setup. The page-specific JS reads `window.__lenis.scroll` lazily with `|| window.scrollY` fallback.

---

## 11 — Voice / copy patterns

- **Eyebrow → Heading → Body** triplet is the dominant section anatomy. Eyebrow is 1–3 words ("PDF & Productivity", "Customer Stories", "Tutorial"); heading is 1 sentence ("Real teams. Real work. Real impact."); body is 1–2 sentences capped at 80ch.
- Headings use **short, period-terminated sentences** (e.g. "Solutions that work for you.", "Plans that work for you.", "Find what you're looking for."). Period is part of the brand voice on display.
- Plan-page uses **edit-mode tagging** (`data-copy-key="cards.individuals.reader.eyebrow"`) for every authored string — surfaces an in-browser copy editor. The taxonomy is hierarchical (`section.role.field`).
- sr-homepage adds the consumer-tone register: "Everything you need to make anything.", "Explore what's new.", "Tools that work for you." — same short-sentence cadence, less feature-jargon, more user-aspiration.
- CTAs are **verb-led, terse**: "Free trial", "Buy now", "Learn more", "Get free app", "View Pricing", "Sign In", "Download now". 1–3 words.

**DOs**
- Period-terminated display headings.
- Eyebrow + heading + body triplet.
- One canonical verb per conversion funnel (Free trial / Buy now / Get free app are the only three).
- Short body lines (80ch / ~13 words).

**DON'Ts**
- Uppercase display headings (samples deliberately render mixed-case at 900 weight).
- Multiple primary CTAs in the same viewport (one primary + one outline = canonical pair).
- Editorial-register vocabulary ("atelier", "the studio", "journal") — wrong register for adobe.com.

---

## 12 — IA priorities observed across samples

In stardust's vocabulary, these are `extensions.iaPriorities[]` candidates the variants must preserve:

| Priority | Evidence | Scope | Mutability |
|---|---|---|---|
| Commercial conversion | Every sample has primary CTA pair within viewport-1 | site-wide | locked under Mode A |
| Audience routing | bizpro pricing tabs (Individuals / Businesses / Students), plan-page same triplet | conversion pages | movable |
| Trust signals | Secure-transaction lock row, comparison chart, FAQ, customer logos in stories | conversion pages | movable |
| Product mnemonic discoverability | Product-grid tiles repeated on bizpro + sr-homepage | home / hub | movable |
| Persistent help / search | bizpro's `.search-section` agentic search bar (768px pill, dark) | hub | movable |

---

## 13 — Section transition primitive

A single primitive recurs:

> A section with `border-radius: 32px 32px 0 0` and a negative `margin-top` (or `-100vh` for hero) slides up over the previous section. Z-index is sequenced (`hero-scroll z=0, stories z=2, solutions z=2, studio-banner z=2 inherited`). Background colors alternate: white → black → white → black → black footer. The 32px top radius is the visual signal of "new context."

Every variant must inherit this primitive — it is the page's structural rhythm.

---

## 14 — Amplified traits for variants B and C

Stardust runs three variants (`A` faithful + improvements, `B` and `C` each amplifying one captured trait). After distillation, two distinct traits stand out as defensible amplifications:

### Variant B — "scroll cinema"

Amplify the **scroll-driven choreography** from bizpro-hub. The hero is the load-bearing example — the video grows from a bounded frame to full-bleed under scroll, text parallaxes out, scrim and overlay fade in at precise scroll fractions, the next section slides up over the residual. This is the move sr-homepage and plan-page underplay.

In variant B, every section that can carry choreography gets it: hero video scroll-grow on home and major product pages; reverse-hero entrance on every multi-slide carousel; garage-door reveal on every full-bleed banner; per-card scroll-driven entrance with staggered groups; footer wordmark wipe on every page. Lenis stack is mandatory.

The thesis: **adobe.com as a piece of motion cinema** — every scroll is a directed sequence, not a passive scroll. This amplifies a trait the brand owns (Adobe has the bench to do this) but underplays in current execution.

### Variant C — "elastic tile mosaic"

Amplify the **photography-led tile vocabulary** from sr-homepage. The visible-on-screenshot tile rows ("Everything you need to make anything.", the colored product chips, the "Explore what's new" 3-up of saturated photo cards) are the most distinctive captured trait — and they are the consumer-creative register that bizpro-hub deliberately tones down. The elastic card hover (image scale 1.03–1.04, gradient overlay fade, optional border-radius transition) is the load-bearing micro-interaction.

In variant C, the home and hub pages lead with **full-bleed photography tiles in 4:3 mosaics**, with hover-revealed background imagery and saturated color overlays. The grid is asymmetric — some tiles span 2 columns, some 1, some are 16:9, some 4:3, some 1:1. Type recedes; imagery leads. CTAs are smaller and tucked into corners. The dark-section rhythm intensifies (more black surface, more knockout type).

The thesis: **adobe.com as a creative-product gallery** — the work the products enable leads, not the products themselves. This amplifies the sr-homepage trait — the most consumer-tone of the three samples.

### Variant differentiation contract

| Axis | A | B | C |
|---|---|---|---|
| Hero | bounded image / video, fade entrance | sticky scroll-grow video, multi-stage parallax | full-bleed photography mosaic, no scroll-grow |
| Card primary | merch-card / price-card | story-card (full-bleed photo carousel) | explore-card (asymmetric photo tile mosaic) |
| Motion energy | scroll-driven entrances only | full scroll cinema (every section choreographed) | elastic hovers + asymmetric tile reveals |
| Dark/light rhythm | white-led, two dark sections | white-led, three dark sections (banner + product + footer) | dark-led, white insets |
| Type emphasis | display headings central | display headings central | display headings smaller, photography leads |

This satisfies stardust's "≥2 substantive changes" between every pair.

---

## 15 — Notes for /stardust:direct

- **Mode A** is correct. adobe.com brand surface (extracted in next phase) will be `signal-strong`. Palette and type pinned to the captured surface (which matches what's in this brief: Adobe Clean / Display, the s2a-* token system, blue #3b63fb, brand red #eb1000 reserved).
- **Density tier** = `balanced` (96px primary section padding lands between 64 balanced and 96 airy — but with the brand-register multi-audience floor, 64–96 is the legal range; sit at 64–72 by default).
- **IA-fidelity** = `reimagined` — we're refreshing adobe.com's marketing surface; variants A/B/C may demote / promote / re-shape priorities within the floor (commercial conversion + audience routing + persistent help).
- The Mode A image-reuse contract applies — variant A reuses captured imagery at the same semantic position; variants B and C may reframe photography but inside the captured set (no synthesised stock).
- The stardust hard-rule "no pure black/white" needs an inversion entry in `brand_faithful_inversions[]`: adobe.com uses literal `#000` and `#ffffff`. Document in `direction.md`.
- The stardust hard-rule "no glassmorphism" needs a similar inversion: the nav pill uses `backdrop-filter: blur(64–128px)` with `rgba(255,255,255,0.64)` — this is brand-faithful and load-bearing.

---

*See `samples/trait-matrix.json` for the structured per-sample trait table consumed by `stardust:direct` Phase 2 anchor resolution.*
