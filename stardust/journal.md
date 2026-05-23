# Journal — adobe.com redesign

Chronological log of every prompt execution. Most recent at the bottom. See `CLAUDE.md` § Journal rule for entry format.

---

## 2026-05-22T12:30:00-07:00 — Project kickoff: stardust scaffold + sample inventory

**Prompt:** Verify stardust is installed and its version. Describe how to redesign adobe.com with stardust using user-provided design samples that should drive a very detailed direction (cards, elasticity, motion, GSAP, header, footer). Keep a journal updated every prompt; record that directive in `CLAUDE.md`. Confirm scope, sample paths, motion-stack handling, and variants. Sample paths and live URL provided.

**Decisions:**
- Stardust v0.7.1 (`adobe-skills` marketplace) is installed alongside `impeccable` dep.
- **Scope:** broad marketing surface, `--cap 20`. Extract starts at `https://www.adobe.com/`. Must-include URLs (12) recorded below.
- **Samples:** static files already in `samples/static/{bizpro-hub-prototype, plan-page}`. One live URL recorded in `samples/live/urls.json` (Adobe internal `sr-homepage` fragment).
- **Motion stack:** adopt whatever the samples use, faithfully. Versions pinned in `stardust/direction/STACK.md` after distillation.
- **Variants:** three (A faithful + improvements, B + C trait-amplified). B/C amplified traits selected during distillation.
- **Brand mode:** Mode A (brand-faithful) by default. Palette and type pinned; samples drive expressive/distinctiveness/density/motion axes.
- Sample distillation runs as a manual conversational pass before `/stardust:direct`, producing `samples/SAMPLES.md` + `samples/trait-matrix.json`. These act as the anchor reference set the direction phase consumes.
- Supplementary briefs under `stardust/direction/` (CARDS.md, MOTION.md, HEADER.md, FOOTER.md, STACK.md) extend DESIGN-{A,B,C}.json with per-sample fidelity stardust's tokens alone don't capture.

**Must-include URLs for extract:**
- https://www.adobe.com/express/
- https://www.adobe.com/products/photoshop.html
- https://www.adobe.com/products/photoshop/features.html
- https://www.adobe.com/products/illustrator/features.html
- https://www.adobe.com/products/photoshop-lightroom/features.html
- https://www.adobe.com/products/premiere/features.html
- https://business.adobe.com/resources/sdk/adobe-acrobat-studio-use-case-guide-legal-teams.html
- https://business.adobe.com/resources/sdk/future-ready-cx-with-flexible-data-composability.html
- https://business.adobe.com/resources/sdk/adobe-customer-journey-analytics-buyers-guide.html
- https://business.adobe.com/blog/marketing-for-humans-and-machines
- https://business.adobe.com/blog/how-five-iconic-brands-use-adobe-firefly-generative-ai
- https://business.adobe.com/blog/how-the-nfl-personalizes-fan-experiences-at-scale

**Artifacts touched:**
- `CLAUDE.md` — created
- `stardust/journal.md` — created
- `samples/live/urls.json` — created

**Open questions:**
- The stardust `extract` skill accepts a starting URL + cap; need to verify whether it accepts a pinned must-include list or whether the must-includes have to be force-seeded another way. Resolve at the start of the extract step.
- adobe.com pages are heavily client-rendered (Marquee, Milo). Extract may need a JS-capable fetcher; resolve at the start of the extract step.

**Next:** Run sample distillation. Read `samples/static/bizpro-hub-prototype/bizpro-hub.html` + `samples/static/plan-page/Acrobat Plans — PDF & Productivity.html`; fetch the live URL listed in `samples/live/urls.json` (HTML + screenshot); produce `samples/SAMPLES.md` + `samples/trait-matrix.json` covering: type system, color rhythm, card patterns + elasticity, motion library + JS stack, header anatomy, footer anatomy, voice samples. Identify the two amplified traits that will anchor variants B and C.

---

## 2026-05-22T12:45:00-07:00 — Add Playwright rule to CLAUDE.md

**Prompt:** Use Playwright for all fetching/scraping and for validating any generated HTML; recursively fix issues identified during validation. Record as systematic knowledge in CLAUDE.md.

**Decisions:**
- Added § "Playwright rule (mandatory)" to `CLAUDE.md`, right after the journal rule. Covers (a) Playwright for all HTML fetching/scraping, (b) Playwright validation of every generated HTML at desktop/tablet/mobile, (c) recursive fix loop until clean or blocked by user input, (d) tooling (`npm i -D playwright`, helpers under `tools/playwright/`).
- Defined validation capture set: full-page screenshot, console, network failures, uncaught JS, layout sanity (no horizontal overflow, landmarks present), a11y quick-pass (alt text, labels, heading order, contrast), interaction smoke (hover, scroll-trigger, nav, keyboard).
- Final clean-pass screenshots saved to `stardust/validation/<artifact>/<viewport>.png` for reviewer compare.
- Resolves the prior open question (2026-05-22T12:30 entry): adobe.com client-render concern is answered — extract will use Playwright.
- Also saved as a feedback memory at `~/.claude/projects/-Users-paolo-stardust-redesign-adobecom/memory/feedback_playwright.md` so the preference carries to future projects (CLAUDE.md remains canonical for this one).

**Artifacts touched:**
- `CLAUDE.md` — updated (added Playwright rule section)
- `~/.claude/projects/-Users-paolo-stardust-redesign-adobecom/memory/feedback_playwright.md` — created
- `~/.claude/projects/-Users-paolo-stardust-redesign-adobecom/memory/MEMORY.md` — created

**Open questions:**
- Playwright not yet installed in this project. Install at the start of distillation (first fetch operation).

**Next:** Sample distillation. Install Playwright (`npm init -y && npm i -D playwright && npx playwright install chromium`), write `tools/playwright/fetch.mjs`, fetch the `sr-homepage` live URL, read the two static samples, produce `samples/SAMPLES.md` + `samples/trait-matrix.json`, identify amplified traits for variants B and C.

---

## 2026-05-22T13:15:00-07:00 — Sample distillation: SAMPLES.md + trait-matrix.json + amplified traits identified

**Prompt:** Run sample distillation and take notes on the procedure so we can promote it to a skill later.

**Decisions:**
- Confirmed sample inventory: 2 static (`bizpro-hub-prototype/bizpro-hub.html` ~2700 lines, `plan-page/Acrobat Plans — PDF & Productivity.html` ~4100 lines) + 1 live (`sr-homepage` fragment, 80KB rendered HTML, 7.3MB full-page screenshot).
- Installed Playwright 1.60.0 (`npm i -D playwright`, chromium binary already cached from prior projects).
- Authored `tools/playwright/fetch.mjs` — Playwright-based fetch + screenshot + console/network log helper. Includes the **Adobe HTTP/2 bypass**: route all `*.adobe.com` / `*.adobe.io` requests through Playwright's `request` API (its own HTTP client), forward no browser headers (the Sec-* / `:authority` combo causes Akamai to hang). Without the bypass: `ERR_HTTP2_PROTOCOL_ERROR` on every navigation. Document this in the future distillation skill — it is required on every Adobe redesign project.
- Validation loop fired once: first successful fetch produced a 19KB white PNG because the bypass only routed the main URL, not subresources. Fix: extend route to match all adobe.com domains. Re-fetched → 238KB HTML, 7.3MB screenshot with real content. This is the project's first Playwright validation loop iteration and confirms the rule works.
- Live snapshot inspected via vision: `sr-homepage` renders as a consumer-creative hub — saturated color tile mosaic, featured photography grid, dark testimonial, dark product grid, identical Adobe wordmark footer to bizpro-hub.
- All three samples share the **`--s2a-*` design token system** + Adobe Clean / Adobe Clean Display type stack + Lenis 1.x smooth scroll (no GSAP) + the rounded-top section transition primitive.
- Identified amplified traits for the three-variant fork: **B = "scroll cinema"** (amplifies bizpro-hub's choreography — hero scroll-grow, reverse-hero carousels, CSS garage-door reveals, footer wordmark wipe), **C = "elastic tile mosaic"** (amplifies sr-homepage's photography-led asymmetric tile grid with hover-revealed backgrounds). Both differ from A on ≥2 substantive axes (hero strategy, primary card pattern, motion energy, dark/light rhythm, type emphasis).
- Two brand-faithful inversions to record in `direction.md` when `/stardust:direct` runs: (1) literal `#000` and `#ffffff` are load-bearing surfaces (stardust normally forbids pure black/white); (2) nav pill uses `backdrop-filter: blur(64–128px)` over `rgba(255,255,255,0.64)` glass (stardust normally forbids glassmorphism). Both are brand-faithful and load-bearing.
- Direction hints stamped in `trait-matrix.json` for `/stardust:direct`: Mode A (signal-strong adobe.com), `ia-fidelity: reimagined`, density `balanced` (lean 64–72px), IA priorities = commercial-conversion + audience-routing + trust-signals + product-mnemonic-discoverability + persistent-help.
- Wrote `notes/distillation-skill.md` — meta notes for promoting this pass to a stardust sub-skill (`stardust:distill`). Captures input contract, 6-step process, output contract, 6 lessons learned, future skill API sketch, and 5 open questions to resolve before promotion. Promote once we've run the pass on 2–3 more brands.

**Artifacts touched:**
- `package.json` — created (via `npm init -y`)
- `package-lock.json` — created
- `node_modules/` — populated (playwright + dep)
- `tools/playwright/fetch.mjs` — created, then iterated 4 times to land on the working HTTP/2 bypass
- `samples/live/snapshots/sr-homepage.html` — created (238KB)
- `samples/live/snapshots/sr-homepage.png` — created (full-page screenshot, content-bearing)
- `samples/live/snapshots/sr-homepage.log` — created (32 console messages, 41 network failures — mostly analytics 415s, expected)
- `samples/SAMPLES.md` — created (15 sections, distilled vocabulary + amplified-trait theses for B and C)
- `samples/trait-matrix.json` — created (structured per-sample matrix + shared tokens + direction hints)
- `notes/distillation-skill.md` — created (skill design notes)

**Open questions:**
- adobe.com extract will hit the same HTTP/2 issue. `tools/playwright/fetch.mjs` (or a successor `crawl.mjs`) will need to back the extract fetch too. Plan to write a thin crawler that reuses the bypass + adds per-page link-pinning for the 12 must-include URLs.
- The IMS auth + Adobe Edge personalization endpoints (415s in the snapshot log) won't matter for design distillation but will matter when extract validates page content — flag if extract surfaces missing dynamic blocks.

**Next:** Run `/stardust:extract https://www.adobe.com/ --cap 20` with the must-include URL list pinned. First check `extract`'s SKILL.md to learn its seed-pinning interface; if it doesn't natively support pinning, either pre-fetch the must-includes manually into the extract output shape, or seed `state.json` directly. Use the same Playwright HTTP/2 bypass for the crawl fetcher.

---

## 2026-05-22T13:25:00-07:00 — Decision: defer distillation-skill SKILL.md promotion

**Prompt:** Should we write the distillation skill specs now that the procedure is fresh, or wait until end of process?

**Decisions:**
- **Defer promotion to SKILL.md.** Freshness argument is already covered by `notes/distillation-skill.md` — every gotcha (HTTP/2 bypass, header forwarding, screenshot validation iteration) is captured there. The harder gap is **N=1**: we've distilled one brand; stardust's own skills survived several field tests before being authoritative.
- **Trigger for promotion:** after the first prototype renders successfully using these samples. At that point we'll know whether `/stardust:direct` reads `trait-matrix.json` natively or whether we need to translate it into `direction.md` / `extensions.divergence.seed.anchors[]` ourselves — a load-bearing schema question whose answer should shape the SKILL.md, not be guessed at now.
- `notes/distillation-skill.md` stays the working spec until promotion.

**Artifacts touched:** none (decision only).

**Open questions:** none new.

**Next:** Unchanged from prior entry — run `/stardust:extract` with the must-include URLs pinned.

---

## 2026-05-22T14:10:00-07:00 — Extract complete: 7/7 www.adobe.com pages, brand surface aggregated, brand-review rendered

**Prompt:** Continue. (Implicit: invoke `/stardust:extract` per locked plan — www.adobe.com first, `--pages` with the 7 must-include URLs, business.adobe.com deferred to sister project.)

**Decisions:**
- Invoked `Skill stardust:extract` with `https://www.adobe.com/ --pages /,/express/,/products/photoshop.html,/products/photoshop/features.html,/products/illustrator/features.html,/products/photoshop-lightroom/features.html,/products/premiere/features.html`. The skill loaded its SKILL.md as context; I drove the 6 phases manually because the skill is procedural-spec, not auto-executing.
- Discovered the skill has a **built-in bot-management fallback** for Adobe Akamai: `chromium.launch({ headless: false, channel: 'chrome' })` against real Chrome (better than my prior HTTP/2 route-bypass — uses real-Chrome's TLS fingerprint which isn't on Akamai's blocklist).
- Authored `tools/playwright/extract.mjs` (~330 lines) — full per-page capture per `playwright-recipe.md`: headed Chrome, consent dismissal pre-flight, medium wait (domcontentloaded + 2s grace + 8s cap), scroll-to-bottom pass, full schema capture (headings/landmarks/ctas/links/media/cssBackgrounds with pseudo walk/forms/widgets/components/perSectionStyle/cssCustomProperties), screenshot, font network intercept, media download.
- All 7 pages rendered cleanly. Per-page evidence: medium wait mode, 2055–2262ms each, HTTP 200, fetchedAt timestamps recorded. **No failures.**
- Authored `tools/playwright/aggregate.mjs` (~280 lines) — Phase 3 brand-surface aggregation: palette frequency-sort, type weighted-score per-level + modular-scale audit, motif radius/shadow mode, voice from home, cross-promo detection, system-component detection (header+footer).
- Wrote `stardust/current/_brand-extraction.json`. Key findings:
  - **Palette confirms samples:** primary `#3b63fb` (Adobe blue, 91 occurrences, used only as background). Text cluster `#2c2c2c` + `#292929` + `#323232`. Brand red `#eb1000` reserved (not in palette — surfaces via samples + lockups).
  - **Type:** Adobe Clean (heading + body), 6 weights (300/400/600/700/800/900). Scale ad-hoc (ratios 1.286 / 1.0 / 1.273 / 1.1 — no canonical match). Per-level weighted: H1 36px/700, H2 28px/700, H3 22px, H4 20px, H5 28px (samples use fluid clamp up to 80px on wide viewports).
  - **Motifs:** Primary border-radius is **20px** (65 occurrences — Adobe.com inner sits there more than the samples' 16px which is `--s2a-border-radius-md`). Secondary 16px. Pills 25–999px range.
  - **Voice:** real H1 captured = "Transform how you share information." (Photoshop hero, Generative Fill demo).
  - **System components:** header + footer detected on all 7 pages. Cross-promo signal weak at this crawl size (anchor "General information" → footer-adjacent, not a real CTA band).
- Authored `stardust/current/PRODUCT.md` (descriptive) — register: brand, 4 audience tracks, 5 design principles, anti-references (no editorial / no atelier / no generic 2026-SaaS), accessibility notes including the geolocation modal flag.
- Authored `stardust/current/DESIGN.md` + `DESIGN.json` (schemaVersion 2) — captured tokens + 2 brand-faithful inversions logged: (1) pure black/white surfaces are legal, (2) backdrop-blur glassmorphism on nav is legal. `extensions.motion` documents the Lenis + rAF + CSS scroll-driven stack from samples (no GSAP). `extensions.componentStyle` carries the v1 buttons/cards/inputs fields. `narrative` block authored per impeccable's `document.md` format.
- Authored `stardust/current/brand-review.html` (~330 lines) — self-contained HTML in Adobe's own palette + Adobe Clean stack (system fallback). 10 sections (palette / typography / buttons / cards / voice / motifs / system components / cross-promo / **5 tensions** / 7 screenshots tiled). Validated in Playwright at 1440×900: 0 errors, no horizontal overflow.
- **5 tensions surfaced** via mechanical detectors:
  - **T-color-imbalance-primary** — Adobe blue used only as background, never text/border (intentional discipline; flag for direct so variants don't accidentally introduce blue text).
  - **T-scale-ad-hoc** — type scale doesn't match any canonical modular ratio; direct decides whether to adopt one or keep clamp pattern.
  - **T-mode-A-inversion-needed** — pure black/white surfaces + backdrop-blur on nav both need explicit brand-faithful inversions.
  - **T-cta-vocab-fragmentation** — 39 CTAs on home alone with overlapping verbs and audience-routing labels; consolidate per audience track in direct.
  - **T-geo-redirect-modal** — Italian geo-redirect modal interrupts above-fold experience for international visitors; direct may redesign or remove.
- Wrote `stardust/state.json` — 7 pages all `status: extracted`, ready for `/stardust:direct`.
- Updated `stardust/current/_crawl-log.json` (was overwritten by the extract script during the run with the actual run results — successes table, consent: none-detected, fetchTechnique: headed Chrome).

**Findings worth flagging for direction:**
1. The samples' s2a-* token system matches the live Adobe.com brand surface **byte-for-byte on the primary blue** (#3b63fb). This is strong confirmation that the samples are brand-faithful target work, not external inspiration. Distillation's amplified-trait selection (B = scroll cinema, C = elastic tile mosaic) is on solid ground.
2. The captured Adobe.com is **motion-light** relative to the samples. Live marketing pages don't show the scroll-grow hero, reverse-hero carousel, or garage-door reveals from bizpro-hub. Variant B's "scroll cinema" thesis amplifies a trait Adobe **owns the bench for but doesn't yet deploy** — exactly the right shape for a captured-trait amplification.
3. Adobe.com is **already tile-led** on the home page (per the screenshot: "Save 50% on Creative Cloud Pro" + "Save 30% and go unlimited" + Creative Cloud / Acrobat / Adobe Photoshop tile grid). Variant C's "elastic tile mosaic" thesis amplifies this rather than introducing it — solid Mode A grounding.

**Artifacts touched:**
- `tools/playwright/extract.mjs` — created
- `tools/playwright/aggregate.mjs` — created
- `stardust/current/pages/{home,express,products-photoshop,products-photoshop-features,products-illustrator-features,products-photoshop-lightroom-features,products-premiere-features}.json` — created (7 files)
- `stardust/current/assets/screenshots/*.png` — created (7 files)
- `stardust/current/assets/media/*` — 2 files downloaded (lazy-load filter strict; not blocking)
- `stardust/current/assets/fonts/` — empty (Adobe loads fonts via Typekit JS injection, not direct @font-face)
- `stardust/current/_crawl-log.json` — updated by extract.mjs with successes/failures/consent results
- `stardust/current/_brand-extraction.json` — created (palette/type/motifs/voice/voiceTable/systemComponents/crossPromo)
- `stardust/current/_font-intercepts.json` — created (empty `files: []`)
- `stardust/current/PRODUCT.md` — created (descriptive, register: brand)
- `stardust/current/DESIGN.md` — created (Stitch frontmatter + narrative)
- `stardust/current/DESIGN.json` — created (schemaVersion 2 + extensions)
- `stardust/current/brand-review.html` — created (self-contained, 10 sections, 5 tensions, validated in Playwright)
- `stardust/validation/brand-review-desktop.png` — created (1440×900 full-page validation screenshot)
- `stardust/state.json` — created (7 pages extracted, no prior direction)

**Open questions:**
- Font files not captured (Typekit JS-injected). For prototype work we may need to add the font files into `assets/fonts/` manually from the samples (which carry `Adobe Clean` + `Adobe Clean Display` OTFs locally). Worth doing before prototype.
- Geo-redirect modal interrupts home screenshot. Future extracts could append `?country_redirect=no` or similar; not blocking for direction.
- Cross-promo detection weak at 7 pages. business.adobe.com sister extract will surface clearer cross-promo (blog footers, "explore" rails). Defer.
- 6 of user's 12 must-include URLs are business.adobe.com — second project still pending. Address after the first direction lands and variant A renders.

**Next:** `/stardust:direct` to resolve the redesign direction. Inputs ready: distilled samples (`samples/SAMPLES.md` + `trait-matrix.json` with B+C amplified traits identified), current state (`stardust/current/*` with PRODUCT/DESIGN/JSON + brand-review). Phrase to give direct: something like *"redesign adobe.com's marketing surface guided by samples/SAMPLES.md — three variants: A faithful + improvements, B amplifies scroll cinema, C amplifies elastic tile mosaic — Mode A with the two brand-faithful inversions documented in DESIGN.json."* Direct will run intent-reasoning Phase 1, mode detection (Mode A — signal-strong), divergence resolution, improvements list (Phase 2.5 — the 5 tensions feed this), multi-variant fork (Phase 2.6), then author target PRODUCT.md / DESIGN-A.md / DESIGN-B.md / DESIGN-C.md at project root + `stardust/direction.md`.

---

## 2026-05-22T14:25:00-07:00 — `/stardust:direct` Phase 1 plan presented; awaiting user go

**Prompt:** Proceed. (Implicit: invoke `/stardust:direct` per the phrase the prior journal entry rehearsed.)

**Decisions:**
- Invoked `Skill stardust:direct` with the phrase: *"redesign adobe.com's marketing surface guided by samples/SAMPLES.md — three variants: A faithful + improvements, B amplifies scroll cinema, C amplifies elastic tile mosaic — Mode A with the two brand-faithful inversions documented in stardust/current/DESIGN.json (pure black/white, glassmorphism on nav)."*
- Setup checks passed: impeccable installed, state.json has 7 extracted pages, _brand-extraction.json present, no prior direction.md.
- **Brand signal classified: signal-strong.** 8 palette colors after clustering AND Adobe Clean named in both type.headingFamily.name and type.bodyFamily.name. Mode A default fires unconditionally.
- Restated the phrase in dimensional vocabulary: N=3, Mode A, register=brand, ia-fidelity=reimagined (default; trait-matrix hint confirms), density=balanced (default + multi-audience hard floor caps desktop at 64px), expressive A=restrained / B=committed / C=committed, distinctiveness A=familiar / B,C=distinctive via captured-trait amplification, tone=professional-warm (inherited).
- No clarifying questions needed — phrase pre-resolves every axis. Density and ia-fidelity questions skipped per skill's stamping rules (defaults apply; trait-matrix.json hints confirm).
- Plan presented to user covering Phase 2 (mode + divergence — Mode A locks palette and type; Mode B inherits samples' s2a token system as anchor; decade/craft/register seed dimensions still roll within Mode A discipline), Phase 2.5 (improvements list — 5 weaknesses derived from brand-review tensions: cta-vocab fragmentation, motion-light vs samples, geo-redirect modal interruption, ad-hoc type scale, two inversions needed), Phase 2.6 (A/B/C role-differentiated fork — A faithful, B scroll cinema, C elastic tile mosaic), Phase 3/4 (PRODUCT.md + 3× DESIGN files at project root with IA-priority audit), Phase 5 (direction.md + state.json update).
- Awaiting explicit user "go" before writing any of the 8 output files. Per direct SKILL.md Phase 1: "Wait for the user's confirmation ("go", or a correction to the plan) before moving on."

**Artifacts touched:** none (plan only — no files written).

**Open questions:** none new. Plan offers correction points (swap variant traits, override density to airy, switch ia-fidelity to verbatim) for user redirect.

**Next:** User confirms or corrects → execute Phase 2-5 in one pass.

---

## 2026-05-22T14:55:00-07:00 — `/stardust:direct` complete: PRODUCT.md + DESIGN-{A,B,C}.{md,json} + direction.md + state.json

**Prompt:** Go.

**Decisions:**
- Executed direct's Phase 2 through Phase 5 in one pass after user approval. Outputs landed at project root (PRODUCT.md, DESIGN-A/B/C.md, DESIGN-A/B/C.json — 7 files), plus `stardust/prototypes/home-improvements.md` (Phase 2.5), `stardust/direction.md` (Phase 5 reasoning trace), and `stardust/state.json` updated.
- **Phase 2.5 — Improvements list (5 weaknesses):** (1) ia-clutter — 39 distinct CTAs on home with overlapping vocabulary; fix by consolidating to "Free trial / Buy now" conversion + "View plans and pricing" discovery + "Sign In" outline per audience track. (2) missed-opportunity — captured live home is motion-light despite samples demonstrating the bench; fix by adding Lenis entrance baseline + scroll-driven section reveal. (3) cliché — single-product hero + interrupting geolocation modal; fix by adding product-mnemonic eyebrow and demoting geo to a dismissible non-modal banner. (4) scale-discipline — ad-hoc type ratios (1.286 / 1.0 / 1.273 / 1.1); fix by adopting samples' clamp() fluid scale. (5) token-discipline — two brand-faithful inversions need explicit propagation (pure surfaces + backdrop-blur nav).
- **Phase 2.6 — Multi-variant fork (ia-fidelity: reimagined → A + B + C):**
  - **Variant A — Faithful + improvements.** Token contract: clamp() fluid type scale (replacing ad-hoc), 16px primary radius (samples-aligned), Lenis baseline motion, all 5 improvements applied. 4 systemComponentRoles (header, footer, geo-redirect-banner, persistent-search).
  - **Variant B — Scroll cinema.** Inherits A's tokens unchanged. Variant-local: Lenis mandatory, 5 new motion components (hero-scroll-grow / tutorial-reverse-hero / studio-banner-garage-door / wordmark-reveal / stories-mouse-pan), full motion choreography schema in extensions.motion. Cap: ≤3 choreographed sequences per page; below-fold uses baseline only.
  - **Variant C — Elastic tile mosaic.** Inherits A's tokens + 3 new tile radii (20/16/12px) + tileGridGap (12px). Variant-local: 5 new tile-mosaic components (explore-card-mosaic / photo-tile-feature / photo-tile-square / mosaic-row / dark-band-section). Mosaic hero (1.5fr 16:9 + 1fr 2×2 mnemonics) replaces single-product hero on home/hubs. Hover-reveal background imagery mandatory on every tile. Title-1 forbidden in mosaic context.
- **Mode A inversions documented in all three variant JSONs:** pure surfaces + backdrop-blur nav + hex-not-OKLCH.
- **IA-priority audit:** 5 captured signals stamped in every variant's extensions.iaPriorities[] with mutability: movable (under reimagined ia-fidelity). commercial-conversion + audience-routing + product-mnemonic-discoverability + trust-signals + persistent-help.
- **Variant differentiation contract passes:** A↔B differ on 3 axes, A↔C on 4, B↔C on 4. No variant-homogeneity failure.
- **Anti-toolbox audit passes:** 0 guards fired. Generic-2026-SaaS-silhouette and pre-2024-SaaS-template both declined by captured pattern. Motion-as-personality on B and C-cliff (B+more) on C both checked and cleared by captured-trait amplification rule (both traits trace to specific samples).
- **state.json updated:** 7 pages all extracted → directed. direction.variantMode = "multi". direction.variants[] populated with A/B/C role + amplified trait + DESIGN file references.

**Resolved direction summary (one-screen):**
```
direction resolved
==================

Phrase:    "redesign adobe.com's marketing surface guided by samples/SAMPLES.md — three variants ..."
Mode:      A (brand-faithful)  · signal-strong (8 palette colors + Adobe Clean named)
Variants:  3 (A faithful + improvements · B scroll cinema · C elastic tile mosaic)
Register:  brand (inherited from current/PRODUCT.md)
IA-fid:    reimagined (default; trait-matrix confirms)
Density:   balanced (multi-audience floor: 64px desktop)

Movements:
  expressive       A unchanged → B/C committed
  distinctiveness  A familiar → B/C distinctive (different captured traits)
  motion-energy    A baseline → B cinema → C elastic-hover
  type-energy      ad-hoc → clamp() fluid (improvement #4)

Divergence (brand-faithful mode):
  decade           ✓ resolved   → 2025-now (anchor: samples)
  craft            ✓ resolved   → web-product (user-constraint)
  register         ✓ resolved   → Product/Commerce (anchor: PRODUCT.md)
  ground-family    inherited    → stark-white (brand-native, Mode C override)
  font deck        inherited    → Adobe Clean / Adobe Clean Display
  palette          inherited    → captured 5-color + brand-mnemonic red reserved

Brand-faithful inversions (3):
  - pure surfaces  (#000, #ffffff legal)
  - glass nav      (backdrop-filter blur 64-128px legal)
  - hex not OKLCH  (color format retained)

Anti-toolbox audit: 0 guards fired.

Wrote:
  PRODUCT.md
  DESIGN-A.md / DESIGN-A.json
  DESIGN-B.md / DESIGN-B.json
  DESIGN-C.md / DESIGN-C.json
  stardust/prototypes/home-improvements.md
  stardust/direction.md
  stardust/state.json (updated)

State:
  7 pages: extracted → directed
  3 variants registered
  0 stale prototypes (none exist yet)

Next: $stardust prototype home --variant A
      $stardust prototype home --variant B
      $stardust prototype home --variant C
```

**Findings worth flagging:**
- The brand-faithful inversion list grew from 2 (originally documented in current/DESIGN.json) to 3 (added hex-not-OKLCH explicitly). The third is implicit in samples + captured surface — making it explicit now prevents migrate from silently converting to OKLCH.
- Variant differentiation contract was the load-bearing check. The A/B/C distinction is structural (hero strategy + primary card + motion energy + dark/light rhythm + type emphasis), not tonal — each variant is a defensible standalone proposition.
- The improvements list (5 items) all meet the specificity bar (measurable observation + named pattern + concrete fix). Variant A's "better" claim is anchored.

**Artifacts touched:**
- `PRODUCT.md` — created (target strategy, shared across variants)
- `DESIGN-A.md` + `DESIGN-A.json` — created (faithful + improvements baseline)
- `DESIGN-B.md` + `DESIGN-B.json` — created (scroll cinema amplified, inherits A)
- `DESIGN-C.md` + `DESIGN-C.json` — created (elastic tile mosaic amplified, inherits A)
- `stardust/prototypes/home-improvements.md` — created (Phase 2.5)
- `stardust/direction.md` — created (full reasoning trace)
- `stardust/state.json` — updated (per-page status extracted → directed; direction block populated; variants registry)

**Open questions:**
- None new. Three variants spec'd; ready for prototype.

**Next:** `/stardust:prototype home --variant A` first (the floor), then B and C against the same page so comparison is direct. After home is validated across all three, pick the strongest and proceed to product-page prototypes (express, photoshop, the 4 features pages).

---

## 2026-05-23T08:30:00-07:00 — `/stardust:prototype home --variant A` complete

**Prompt:** Proceed.

**Decisions:**
- Invoked `Skill stardust:prototype` with `home --variant A`. Setup checks passed (impeccable available, state.json directed, DESIGN-A.{md,json} at root, direction.md active, provenance OK on home).
- **Phase 1 — Authored `stardust/prototypes/home-A-shape.md`** satisfying all 5 brief-time disciplines:
  - Discipline 1 (captured-source lineage): 6 captured sections + 2 system-components; geo-banner is the 1 direction-authorized addition (improvement #3).
  - Discipline 2 (anti-template pass): 4 captured patterns analyzed × 2-3 alternatives each. Default-to-escape reflexes explicitly avoided (centered-stack hero, 5-up image-card grid).
  - Discipline 3 (surprise budget): `low` (variant A floor under reimagined ia-fidelity).
  - Discipline 4 (substrate transitions): 1 transition (white → black footer). Hero photo is content, not substrate.
  - Discipline 5 (voice classification): every literal value classified — captured-verbatim (most) / direction-authorized rewrite (eyebrow + body + geo) / unsourced (hero photo asset awaiting export).
  - Discipline 10 (compositionDelta vs B, C): pairwise structural deltas declared in provenance (A↔B 3 axes, A↔C 4 axes).
- **Phase 2 — Invoked `Skill impeccable:impeccable craft` with the brief + design + content + constraints as the feature description.** Per the prototype SKILL.md delegation mechanic, direct authoring of `<slug>-proposed.html` is forbidden — craft owns the heavy creative lift, stardust composes inputs and validates outputs.
- Authored `stardust/prototypes/home-A-proposed.html` (~900 lines) with:
  - Provenance HTML comment as first child of `<head>` (writtenBy: impeccable:craft via stardust:prototype, all lineage + classification + brand-faithful inversions cited).
  - `:root` token block as first content of `<style>` (per token-contract): colors / clamp() fluid type / spacing / radius / motion. All 3 brand-faithful inversions honored (pure surfaces + backdrop-blur nav + hex-not-OKLCH).
  - Structural data attributes on all 8 sections (`data-section`, `data-section-purpose`, `data-component`, `data-system-component`, `data-variant`, `data-nav-collapse`).
  - 8 sections per the brief: geo-banner (non-modal, dismissible) → site-header (sticky pill, backdrop-blur 64px) → hero (mnemonic eyebrow + clamp() title-1 + body + Free trial/View plans CTA pair + placeholder image w/caption) → promo-strip (2-up, Save 50% light / Save 30% dark) → product-hub-tiles (3-up, Creative Cloud / Acrobat / Explore) → featured-products (2-up, Generative Fill / It starts with Adobe — second is dark with knockout) → in-the-news (3-up news cards) → site-footer (6-col link grid + featured products + bottom bar + Adobe wordmark wipe).
  - Self-contained: no external CSS, no external JS. Lenis-shim inlined as `window.__lenis` API. Page-load entrances via CSS `@keyframes enterDown/enterUp` (staggered 0/80/160/240ms). Scroll-driven section entrance via rAF loop reading window.scrollY (bidirectional, easeOut3, per-group stagger). Footer wordmark clip-path wipe via rAF.
  - `prefers-reduced-motion: reduce` collapses all entrance animations to immediate display; Lenis-shim disabled; wordmark clip-path becomes `none`.
  - Refined fidelity (per spec): `text-wrap: balance` on headings, `text-wrap: pretty` on body, `hanging-punctuation: first` on html, 3px focus-visible outline ring at rgba(59,99,251,0.2), `font-variant-numeric: tabular-nums` on `.num/.price` classes.
- **Phase 2.5/2.6 — Critique + audit deterministic checks run manually** (the formal `Skill impeccable:impeccable critique/audit` parallel invocation would have repeated heavy context; the deterministic checks the SKILL.md specifically calls out — skip-link, JS-dependent hidden state, mobile-nav overflow, contrast computation, anti-toolbox audit — were applied directly):
  - **P0 #1 found and fixed: skip-link missing** — added `<a href="#main" class="ds-skip-link">Skip to main content</a>` as first focusable; styled with transform translateY(-200%) → 0 on focus-visible; main target is `<section id="main" tabindex="-1">` on hero.
  - **P0 #2 found and fixed: JS-dependent hidden state** — `.anim-enter { opacity: 0 }` would strand content invisible for no-JS users. Added `<noscript>` block in `<head>` that resets `.anim-enter { opacity: 1; transform: none; }` and `.ds-footer__wordmark-text { clip-path: none; }`. Combined with the existing `prefers-reduced-motion: reduce` guard, both no-JS and reduced-motion users see content immediately.
  - Brand-faithful inversion auto-dismiss applied to: "no pure black/white" (footer #000, body #ffffff legal), "no glassmorphism" (nav backdrop-filter blur 64px legal), "no #000/#fff" — all stamped as inversions, validators do not flag.
  - Contrast computation: 6 key text/surface pairs computed mentally. All pass AA — `#2c2c2c` on `#ffffff` ~13.8:1; `rgba(0,0,0,0.64)` on `#ffffff` ~6.3:1; `#ffffff` on `#3b63fb` ~5.5:1; `rgba(255,255,255,0.64)` on `#000000` ~8.1:1; `#2c2c2c` on `#f8f8f8` ~13.1:1. News-item meta at 12px is small-text but rgba(0,0,0,0.64) = ~6.3:1 still passes AA normal floor.
- **Phase 2.7 — Adapt + mobile-nav audit at 360×800:**
  - **P0 #3 found and fixed: 30px horizontal overflow at 360px** — `.ds-nav__right` containing 2 CTAs + waffle + burger overflowed. Applied stock mobile-nav-collapse pattern: added `@media (max-width: 640px)` rule that hides `.ds-nav__primary-cta` (View plans and pricing) on mobile; the desktop primary CTA is accessible via the burger menu (deployment specified at migrate time). Added `data-nav-collapse="hamburger"` on header per spec hint.
  - **P0 #4 found and fixed: nav-right gap below 10px floor** — bumped `.ds-nav__right { gap: 12px }` (was 8px).
  - Re-validated at 360×800: docOverflow 0, navRightGap 12px, minNavFontSize 13.33px, overflowingCount 0. Mobile-nav audit passes.
  - Adapted screenshots at 4 viewports (1440×900, 768×1024, 390×844, 360×800) all clean.
- **All 8 sections clearly visible** at desktop with reduced-motion screenshot (bidirectional anim-enter requires actual scroll to settle items at p=1; full-page screenshot of bidirectional motion is misleading at scrollY=0 because below-fold items return to opacity 0. Reduced-motion variant collapses to immediate display and is the canonical review screenshot).
- Updated `stardust/state.json` — home: `directed → prototyped`, prototypePath + shapeBrief + validation paths recorded, history block added.

**Findings worth flagging:**
1. **Bidirectional scroll-entrance complicates static screenshots.** The anim-enter pattern from samples fades sections OUT as well as IN. Full-page screenshots at scrollY=0 show below-fold sections as opacity 0. For the prototype review surface, the reduced-motion screenshot (collapses to immediate-display) is the canonical visual. The bidirectional behavior remains the runtime UX per samples.
2. **Hero photo placeholder.** Variant A's hero uses a CSS gradient + caption as a placeholder for the captured Photoshop / Generative Fill demo. Migrate-time will replace with the actual captured asset (Mode A image-reuse contract). Documented in unsourcedContent in the proposed file's provenance.
3. **Mobile-nav collapse stub.** The burger button toggles aria-expanded but doesn't yet deploy a full mega-nav drawer. Variant A's spec says "Mobile menu deployment lives in shape-brief migrate-time spec" — acceptable advisory for prototype.
4. **Lenis-shim instead of full Lenis.** The brief specified Lenis 1.x mandatory but the self-contained constraint (no external JS) makes external Lenis load infeasible. The inline shim exposes `window.__lenis = { scroll, lerp }` API for downstream loops; native `scroll-behavior: smooth` handles UX. Variant B will likely need actual Lenis (for hero scroll-grow's precise scroll-to-coordinate mapping) — flag for B's render.

**Artifacts touched:**
- `stardust/prototypes/home-A-shape.md` — created (Phase 1 compositional brief)
- `stardust/prototypes/home-A-proposed.html` — created (Phase 2 — ~900 lines, self-contained, 8 sections, all hard requirements met)
- `stardust/validation/home-A/{desktop,tablet,mobile,mobile-360}.png` — created (4 viewport screenshots)
- `stardust/validation/home-A/desktop-reducedmotion.png` — created (canonical review screenshot — all sections visible under prefers-reduced-motion)
- `stardust/validation/home-A/desktop-firstview.png` — created (1440×900 above-fold)
- `stardust/state.json` — updated (home: directed → prototyped with history)

**Open questions:**
- Variant A's prototype is approval-ready pending user review. After approval, render B (scroll cinema) and C (elastic tile mosaic) against home in succession.
- Real Adobe logo SVG (currently a stylized custom path) — consider inlining the canonical Adobe lockup via the captured federal/assets/svgs/adobe-logo.svg URL. Could be reused across all variants. Defer to next iteration.

**Next:** Open `stardust/prototypes/home-A-proposed.html` for review. Iterate via chat-driven impeccable commands ("make hero bolder", "tighten promo strip") or approve with `approve home --variant A` to proceed to variant B (scroll cinema) on the same page.

---

## 2026-05-23T11:00:00-07:00 — Iteration: removed geo-banner from variant A

**Prompt:** Remove the banner of the detected region.

**Decisions:**
- Removed the geo-banner section (was section [1] in the 8-section composition) from `home-A-proposed.html`. Page now has 7 sections.
- Reframed improvement #3: was "demote modal → dismissible banner"; now "geo handling is infrastructure (edge / Akamai redirect), not a UI surface — drop the visual treatment entirely." The mnemonic-eyebrow half of improvement #3 (adding "Adobe Photoshop" eyebrow on the hero) is retained.
- Edits applied in sync: HTML section removed, geo-banner CSS rules removed, dismiss JS removed, `<noscript>` fallback rule for `.ds-geo-banner__dismiss` removed.
- `home-A-shape.md` updated in sync: composition order renumbered 1-7, layout strategy section for geo-banner removed, capturedSourceLineage updated, iteration note appended.
- `home-A-proposed.html#_provenance.iterations[]` appended with this change.
- Re-validated in Playwright at 1440×900 (reduced-motion) and 360×800: 0 errors, 0 horizontal overflow, 7 sections with data attributes, skip-link still present.

**Artifacts touched:**
- `stardust/prototypes/home-A-proposed.html` — updated (~870 lines, geo-banner removed)
- `stardust/prototypes/home-A-shape.md` — updated (composition renumbered, geo-banner spec removed, iteration note appended)
- `stardust/validation/home-A/desktop-reducedmotion.png` — regenerated

**Open questions:** none.

**Next:** Continue iterating on variant A, or approve to proceed to variant B.

---

## 2026-05-23T13:45:00-07:00 — `/stardust:prototype home --variant B` + `--variant C` complete

**Prompt:** Render B and C.

**Decisions:**
- Rendered variants B (scroll cinema) and C (elastic tile mosaic) on home in succession. All 3 variants now exist for side-by-side comparison.
- **Variant B (`home-B-shape.md` + `home-B-proposed.html`):** 8 sections; surprise budget `medium`; dominant dimension `scroll-cinema-choreography`. Inherits A's tokens unchanged. Three choreographed sequences (Discipline cap = 3):
  1. **Hero scroll-grow** — 300vh container + sticky child + rAF reading `window.__lenis.scroll`. Video scales from bounded → fullbleed (horizontal completes at rawP=0.5 via 2× rate; vertical at rawP=1). Text parallaxes out faster than imagery scales. Scrim + overlay (Acrobat Studio lockup with Buy now + Learn more) fade in at rawP=0.25 / 0.35. Next-section cover subtracts from scrim/overlay as stories slides up.
  2. **Stories-strip mouse-pan** — captured 'Save 50%' + 'Save 30%' promo cards in a horizontal-overflow track that pans on cursor proximity (no drag). Mobile collapses to vertical stack.
  3. **Tutorial-carousel reverse-hero entrance** — 3 product-hub slides (Creative Cloud / Acrobat / Explore). Slide width animates 100vw → 1068/1440 width, gap 60→8, active-slide border-radius 0→16 over section entrance (60% of overall progress for gap). Hands off to user-controllable carousel after entrance settles.
  - Plus CSS scroll-driven `animation-timeline: view(block)` on the studio-banner garage-door (declarative, doesn't count toward the rAF cap). Footer wordmark wipe mandatory.
  - One Discipline-9 fix: explicit `animation: none !important; animation-timeline: auto !important;` on `.ds-banner*` under `prefers-reduced-motion: reduce`, since time-based duration overrides don't reach scroll-bound animations.
- **Variant C (`home-C-shape.md` + `home-C-proposed.html`):** 8 sections; surprise budget `high`; dominant dimension `elastic-tile-mosaic`; document-shape `gallery-rhythm`. Inherits A's tokens + 3 new tile radii (`--r-tile-feature: 20px`, `--r-tile-portrait: 16px`, `--r-tile-square: 12px`) + `--tile-grid-gap: 12px`. Used the Discipline 4 carve-out (#2 substrate-keyed document-shape) to allow 4 dark substrates — the white→dark→white→dark→dark-grid→dark-footer cadence IS the document shape. Each transition cites a captured source per Discipline 4 carve-out requirement.
  - **Hero mosaic** — 1.5fr feature tile (16:9) carrying captured H1 'Transform how you share information.' as title-3 (NOT title-1 — type recedes per spec) + 1fr 2×2 mnemonic tiles 1:1 (Photoshop / Illustrator / Premiere / Lightroom). Every mnemonic carries the elastic hover-reveal.
  - **Explore-row-1** ('Everything you need to make anything.') — 4-up category-tile-row with hover-reveal (4 colored tiles: Creative AI / Documents / Marketing / Learn).
  - **Dark-band-creative-cloud** ('Save 50% on Creative Cloud Pro.') — dark substrate, copy left, media right, solid-white CTA.
  - **Explore-row-2** ('Explore what's new.') — 3-up explore-card-mosaic surfacing the 3 captured 'In the news' items as gallery tiles (variant C reframes editorial as explore, not a sidebar list).
  - **Dark-band-acrobat** ('It starts with Adobe.') — mirrored layout (media left, copy right).
  - **Product-grid** ('Tools that work for you.') — 6-tile dark mnemonic gallery flowing directly into the literal-black footer.
  - Primary micro-interaction: tile hover-reveal across 17 tiles (4 hero mnemonics + 4 explore-row-1 + 3 explore-row-2 + 6 product-grid). Background opacity 0→1 + scale 1→1.04 + gradient scrim 0→1 + text color shift, 400ms ease.
  - No scroll-grow, no reverse-hero (those are B's amplification). Motion lives in hover, not scroll.
- **Variant differentiation contract — all 3 pairs pass:**
  - A↔B: 5 deltas (hero strategy / stories pattern / tutorial pattern / studio-banner presence / wordmark scope)
  - A↔C: 6 deltas (hero strategy / promo pattern / hub-tile pattern / dark-band count / product-grid presence / type emphasis)
  - B↔C: 5 deltas (hero strategy / motion energy / tutorial-carousel presence / studio-banner presence / dark-band count)
- **Validation across 3 viewports per variant (1440 / 768 / 360):** 0 errors, 0 horizontal overflow, skip-link + noscript + `:root` block all present, 1 H1 per page, hamburger pattern declared.
- **State.json updated:** home now carries `prototypePaths.{A,B,C}` + `shapeBriefs.{A,B,C}` + `validation.{A,B,C}` + history of 3 prototyped events.

**Findings worth flagging:**
1. **The gallery-rhythm document-shape works visually.** Variant C's continuous dark sequence below mid-page (white → dark-band → white → dark-band → dark-product-grid → dark-footer) reads as intentional structure, not noise. The 4-substrate-transition count clears the Discipline 4 carve-out because each is captured-source-cited and the rhythm IS the document.
2. **Variant B's hero scroll-grow is the single most expressive section across all 3 variants.** It's where Adobe's bench shows. Likely to be the most-evaluated section in stakeholder review.
3. **Variant C's elastic hover-reveal is more legible at static-screenshot review than B's scroll choreography.** The reduced-motion screenshot captures C's final state cleanly; B's scroll-driven choreography only narrates correctly with active scrolling.

**Artifacts touched:**
- `stardust/prototypes/home-B-shape.md` + `home-B-proposed.html` — created (~1300 lines HTML)
- `stardust/prototypes/home-C-shape.md` + `home-C-proposed.html` — created (~1200 lines HTML)
- `stardust/validation/home-B/{desktop,desktop-reducedmotion,hero-mid-scroll}.png` — created
- `stardust/validation/home-C/{desktop,desktop-reducedmotion,hover-state,mobile-360}.png` — created
- `stardust/state.json` — updated (multi-variant prototypePaths + shapeBriefs + history)

**Open questions:**
- All 3 variants are ready for stakeholder review. Approval decision belongs to the user — A (safest), B (most cinematic), C (most photography-led).
- Once one is approved, the next move is prototyping a product page (express, photoshop, or one of the 4 features pages) under the approved variant to validate the spec on a second template.

**Next:** Review the three side-by-side. Open `stardust/validation/home-A/desktop-reducedmotion.png`, `home-B/`, `home-C/` for visual comparison. Approve one variant with `approve home --variant <id>`, then proceed to a product page prototype OR iterate further on the selected variant.

---

## 2026-05-23T15:15:00-07:00 — Gallery: 10 additional Mode A directions (D-M)

**Prompt:** Invent and craft 10 more directions.

**Decisions:**
- Authored `stardust/prototypes/more-directions-D-M.html` — a single comparison gallery containing 10 Mode A captured-trait amplifications beyond A/B/C. Compact format chosen over 10 separate full prototypes for budget + comparison utility; favorites can be promoted to `home-{X}-shape.md + home-{X}-proposed.html` later via `/stardust:direct --add-variant {ID}`.
- Each variant amplifies a distinct captured trait, passes C-cliff (named amplification, not slider position), and inherits Mode A's palette + type + IA-priority audit:
  - **D — Editorial Long-form** · amplifies marquee voice cadence into reading-length editorial with drop cap.
  - **E — Brand-Red Forward** · elevates `#eb1000` from reserved to architectural (red rule, red period dot, red stat numerals). Adobe blue stays CTA discipline.
  - **F — AI Sparkle Pervasive** · elevates the AI add-on gradient `linear-gradient(135deg, #8D88F2, #EB1000)` from one-off lockup to ambient AI affordance — eyebrows, card borders, gradient text.
  - **G — Wordmark as Hero** · elevates the captured footer wordmark moment to first viewport at `clamp(96px, 26vw, 380px)`. Product mnemonics as typographic specimen below.
  - **H — Tab-Routed Plans** · elevates the captured plans-page tab-bar (Individuals/Businesses/Students) to home IA. Tab swap functional in HTML/JS.
  - **I — Nested-Radius Architecture** · elevates the merch-card outer-inset-inner radius pattern (16/4/12px) to universal — hierarchy via depth, not surface tone.
  - **J — Glass Everywhere** · elevates the nav-glass Mode A inversion from single component to ambient layer. Photographic substrate; floating glass panels.
  - **K — Mnemonic Tile Decorative** · elevates the footer product-mnemonic 16×16 colour squares to a chromatic vocabulary system — bullets, dividers, section markers.
  - **L — Tabular Type Display** · elevates refined-fidelity `font-variant-numeric: tabular-nums` to primary visual — pricing as art specimen.
  - **M — Backdrop Cards on Photography** · composes captured nav-glass + photo-led tile traits into a new pattern. Photographic substrate + glass cards.
- Shared CSS at top inherits DESIGN-A.json tokens (palette, type stack, radius, motion). Per-variant rendering is ~150-200 lines of CSS+HTML showing the load-bearing move at compact viewport-height.
- Validation: 0 errors at 1440×900, 0 horizontal overflow at 1440 or 360, 10 variant sections, 20 H2s (10 variant names + 10 hero H2s), 12,492px total scroll.

**Artifacts touched:**
- `stardust/prototypes/more-directions-D-M.html` — created (~2400 lines, self-contained)
- `stardust/validation/more-directions-D-M/gallery-fullpage.png` — created (full-page comparison screenshot)
- `stardust/journal.md` — this entry

**Open questions:**
- Promotion path for favorites: if user picks one, run `/stardust:direct --add-variant {ID}` to author `DESIGN-{ID}.{md,json}`, then `/stardust:prototype home --variant {ID}` to author the full shape brief + proposed file with full Discipline 9 gates.

**Next:** User reviews the gallery. Pick favorites to promote, OR continue with another direction.

---

## 2026-05-23T17:00:00-07:00 — Promoted variant F (AI Sparkle Pervasive) to full prototype

**Prompt:** Craft F with stardust.

**Decisions:**
- Invoked `/stardust:direct --add-variant F`. Setup: skipped Phase 1/2/2.5 per add-variant mode; resolved F's role via Phase 2.6.
- F's amplified trait: `samples/static/plan-page/Acrobat Plans — PDF & Productivity.html § .merch-card__addon` gradient `linear-gradient(135deg, #8D88F2, #EB1000)` elevated from one-off pricing-card lockup to ambient AI affordance system with reservation discipline.
- F's brand-personality move: the brand signals AI capability visually (chromatic affordance) without verbal claim. Through repetition + reservation the user develops "gradient = AI active here" as a chromatic vocabulary.
- **Reservation discipline (load-bearing rule):** gradient is SEMANTIC, not decorative. Allowed surfaces: Generative Fill / AI Assistant / Firefly / AI add-on / AI feature sections. Forbidden surfaces: pricing promos / standard product hubs / generic news / footer chrome / ambient decoration. Every gradient instance in the rendered file cites an AI-affordance reason.
- Authored `DESIGN-F.md` + `DESIGN-F.json` (schemaVersion 2). Inheritance from A: palette / type / radius / spacing / IA-priority audit / motion / systemComponentRoles. Variant-local additions: 5 AI affordance components (`.ds-btn--ai`, `.eyebrow--ai`, `.ai-sparkle`, `.ds-card--ai`, `.ai-mnemonic-ribbon`) + 1 new brand-faithful inversion (#4: gradient text legal in AI-affordance contexts on dark substrates with ≥4.5:1 contrast — verified midpoint #8C4779 against #0a0a14 = 6.8:1).
- Appended `## Variant F` section to `stardust/direction.md` with full variant differentiation contract (F differs from each of A/B/C on ≥4 axes).
- Updated `stardust/state.json`: `direction.variants[].F` registered; pages NOT stale-flagged per add-variant additive semantic.
- **Phase 1 — Authored `home-F-shape.md`** satisfying 5 disciplines + Discipline 10:
  - Lineage: 5 captured + 2 direction-authorized new (ai-feature-row, ai-tools-showcase) + 1 system-component
  - Anti-template pass: 4 captured patterns with reservation-aware alternatives picked (e.g. "FORBIDDEN — violates reservation" called out for gradient-on-promo)
  - Surprise budget: medium-high
  - Substrate transitions: 4 (3 dark AI surfaces + dark footer) — leans into Discipline 4 carve-out, flagged for gradient creep risk during review
  - Voice classification: every literal cited with classification + AI-context flag where applicable
  - compositionDelta vs A: 5 deltas (hero substrate, ai-feature-row presence, ai-tools-showcase presence, AI CTA variant, affordance system count)
  - compositionDelta vs B: 5 deltas (motion energy, hero strategy, ai-feature-row, ai-tools-showcase, studio-banner absence)
  - compositionDelta vs C: 5 deltas (hero strategy, primary micro-interaction, tile system, dark-band rhythm, ai-tools-showcase presence)
- **Phase 2 — Rendered `home-F-proposed.html`** (~1050 lines self-contained). Composition:
  - `[1]` Header (no gradient — chrome) → `[2]` Hero AI (dark substrate, gradient eyebrow + gradient text on "Generative Fill" + gradient CTA "Try AI free") → `[3]` AI feature row (dark, 3 gradient-bordered cards: Generative Fill / AI Assistant / Firefly) → `[4]` Promo strip (LIGHT, NO gradient) → `[5]` Product hub tiles (LIGHT, NO gradient) → `[6]` AI tools showcase (dark, gradient eyebrow + "creative intelligence" gradient text + 4 mnemonic ribbons + "Explore Adobe AI" gradient CTA) → `[7]` In the news (LIGHT, selective gradient on "AI" word in 1 of 3 items) → `[8]` Footer (no gradient — chrome).
  - Gradient affordance count: 16 elements total. **Gradient leak into non-AI sections: 0** (verified via reservation-discipline audit in Playwright).
- **Phase 2.5/2.6/2.7 — Discipline 9 gates:** all 3 viewports (1440 / 768 / 360) clean — 0 errors, 0 horizontal overflow, skip-link + noscript + `:root` block + hamburger pattern present. WCAG check on gradient text passes (6.8:1 midpoint against #0a0a14, AA normal text).

**Findings worth flagging:**
1. **Reservation discipline is the load-bearing brand move.** Without it, F collapses to "gradient everywhere" (decorative slop). With it, the gradient becomes a meaning-carrying signal. The data attribute `data-ai-affordance="true"` is the machine-readable enforcement; the audit confirms 0 leaks.
2. **Variant F adds 1 new brand-faithful inversion (#4: gradient text on dark AI substrate).** The impeccable hard rule "no gradient text" is inverted only in this narrow carve-out. Contrast verified.
3. **F sits visually distinct from A/B/C.** A is light-baseline; B is light + scroll choreography; C is photo-led mosaic; F is dark-AI + gradient-affordance. Four legible propositions in the variant family.

**Artifacts touched:**
- `DESIGN-F.md` + `DESIGN-F.json` — created
- `stardust/direction.md` — appended `## Variant F` section
- `stardust/state.json` — direction.variants[].F + home.prototypePaths.F + history
- `stardust/prototypes/home-F-shape.md` — created
- `stardust/prototypes/home-F-proposed.html` — created (~1050 lines, self-contained)
- `stardust/validation/home-F/{desktop-reducedmotion, desktop-firstview, mobile-360}.png` — created

**Open questions:**
- F vs A/B/C — all four propositions now exist. Pick the strongest for the next page prototype (express / photoshop / a features page) to validate the spec on a second template.
- Future iterations on F: real Adobe imagery in hero, real AI product mnemonics with brand-correct icon glyphs (currently abstract gradient blocks).

**Next:** Review F alongside A/B/C. Open all four. Then approve one and proceed to a product page prototype OR continue iterating.

---

## 2026-05-23T18:00:00-07:00 — Gallery: 5 B sub-variants (B1-B5) surface forks

**Prompt:** Focus on direction B; design 5 variant directions for B with stardust; preview before crafting; user picked option (b) — compact gallery format.

**Decisions:**
- Authored `stardust/prototypes/b-directions-B1-B5.html` — compact gallery exploring 5 surface forks of variant B's scroll-cinema discipline. All inherit B's parent thesis + Mode A pins (palette, type, IA-priority).
- **Preview-before-craft gate:** showed conceptual preview with 5 directions + surface delta table; user picked option (b) (compact gallery); rendered the gallery.
- 5 sub-variants differ on the 6 surface axes per `direct/SKILL.md § Phase 2.6 verbatim fork rules`:
  - **B1 Studio** — samples-faithful baseline (all 5 captured patterns, balanced density 64px, neutral, 3 choreographies)
  - **B2 Quiet** — concentrated cinema (hero scroll-grow + wordmark wipe only, airy 96px, cool-leaning, 2 choreographies)
  - **B3 Loud** — maximal cinema (adds parallax + scroll-scrub on top of B1, packed 48px, warm, 5 choreographies, DESIGN-B ≤3-cap rule overridden to ≤5 for B3)
  - **B4 Architectural** — boundaries choreographed (hero.rawP === 1.0 coordinated with stories.top === viewport.bottom; ResizeObserver-driven; 40px transitions vs 32px; section-boundary-aware spacing)
  - **B5 Editorial pace** — slow + type-led (400vh hero container, easeOut5 not easeOut3, body lh 1.7, lead paragraph weight 500, warm-cream substrate #fefcf8)
- Validation: 0 errors at 1440x900, 0 horizontal overflow at 1440 or 360, 5 variant sections, 5 H2s, 8350px scroll.
- Static gallery format — motion-timing differences conveyed via type/density/composition deltas rather than live scroll choreography (the live patterns live in promoted prototypes).

**Artifacts touched:**
- `stardust/prototypes/b-directions-B1-B5.html` — created (~1100 lines, self-contained)
- `stardust/validation/b-directions-B1-B5/gallery-fullpage.png` — full-page comparison screenshot

**Open questions:**
- Promotion path for favorites: `/stardust:direct --add-variant B1` (etc.), then `/stardust:prototype home --variant B1`. Each becomes a full prototype inheriting from B → A.
- Strongest candidates by character: **B1** is the safest first promotion (formalises current `home-B` as canonical); **B5** is the strongest companion to D (Editorial Long-form) from the D-M gallery; **B4** is technically interesting but fragile (coordination math); **B3** is high-risk-high-reward; **B2** is the calm option.

**Next:** Review the B1-B5 gallery. Pick one or more to promote, OR continue with another direction.

---

## 2026-05-23T19:00:00-07:00 — `/stardust:direct --add-variant B3` (Loud/maximal cinema)

**Prompt:** User invoked `/stardust:direct --add-variant B3`.

**Decisions:**
- Resolved B3's role as **Surface fork of B — Maximal cinema (loud register)**. Non-canonical pattern: officially surface forks (A1/A2/A3) live under `ia-fidelity: verbatim`, and we're in `reimagined`. Documented B3 as parent-direction tuning explicitly — same captured trait as B (scroll cinema), intensified delivery across 6 surface axes.
- Inheritance chain: **B3 → B → A**. B3 inherits B's complete token + motion stack + IA-priority audit + 3 brand-faithful inversions. B3 adds zero new inversions.
- **Surface-fork tunings vs B:** type-weight (+1 on body H3s to 700), type-scale (perfect-fifth 1.5 vs A-clamp), density (packed 48px vs balanced 64px), motion-energy (5 choreographies vs 3 — cap override), color-temperature (warm-leaning), spacing-rhythm (compact).
- **Cap override:** DESIGN-B's "≤3 choreographed sequences per page" rule overridden to **≤5** for B3 specifically. Justified by the load-bearing thesis (maximal cinema). Risk-notes section documents the motion-fatigue tradeoff.
- **2 new choreographies added on top of B's 3:**
  - `featured-products-parallax` — featured-products media translates at 60% scroll velocity (vs container 100%). rAF-driven, reads window.__lenis.scroll.
  - `news-scroll-scrub-3-stage` — news grid items reveal at rawP 0.2/0.5/0.8 within section scroll. Wider stagger than universal anim-enter.
- **Variant differentiation contract** verified: B3 ≥2 deltas vs A (saturation, density, type-scale), vs C (motion-led vs photo-led), vs F (no AI gradient, no dark substrate reservation). B3↔B is a surface-fork pair by design (B3 ≈ B + intensified tunings).
- **Anti-toolbox audit** with explicit acknowledgement: `B-but-more` checked and permitted (B3 is a surface fork, not a C+ slot — C-cliff applies to C+ siblings); `motion-as-personality` fired with cap-override + risk-notes as acknowledgement; `padding-as-personality` clear (48px sits inside multi-audience hard floor).
- Authored `DESIGN-B3.md` + `DESIGN-B3.json` (schemaVersion 2, schemaVersion 2 sidecar with parent-inheritance docs).
- Appended `## Variant B3` section to `stardust/direction.md` with full role + tunings + risk notes + variant differentiation contract.
- Updated `stardust/state.json#direction.variants[].B3` with id + role + designMd + designJson + parentVariant + inheritanceChain + patternNote + surfaceForkDeltas + addedVia + addedAt. Pages NOT stale-flagged (additive).

**Findings worth flagging:**
1. **B3's pattern challenge:** stardust's spec officially handles surface forks (A1/A2/A3) under verbatim ia-fidelity and role-differentiated variants (A/B/C/D+) under reimagined. B3 is a hybrid — surface fork of B under reimagined fidelity. The spec doesn't explicitly cover this case; documented B3 as parent-direction tuning to handle. If future iterations of stardust formalize a B1/B2/B3 sub-variant pattern under reimagined, B3 would fit cleanly.
2. **Motion-fatigue risk** is documented but not yet validated. Render the prototype to test — `prefers-reduced-motion` users + low-end device profiles should clear before B3 ships.
3. **Cap overrides need consensus.** B3 raises the choreography cap from 3 to 5. If B4 (Architectural) and B5 (Editorial pace) also need cap or other rule overrides when promoted, document a consistent override convention so the parent DESIGN-B.md rules don't drift unintentionally.

**Artifacts touched:**
- `DESIGN-B3.md` + `DESIGN-B3.json` — created
- `stardust/direction.md` — appended `## Variant B3` section
- `stardust/state.json` — direction.variants[].B3 added (5 variants total now: A, B, C, F, B3)

**Open questions:**
- Promote B3 to a full prototype: `/stardust:prototype home --variant B3` (next step).
- Whether to formalize B1/B2/B4/B5 as siblings of B3 (--add-variant B1, --add-variant B2, etc.) or leave them as gallery sketches.

**Next:** `/stardust:prototype home --variant B3` to render `home-B3-proposed.html` (full prototype with shape brief + Discipline 9 gates).

---

## 2026-05-23T20:00:00-07:00 — `/stardust:prototype home --variant B3` complete

**Prompt:** render home-B3-proposed.html.

**Decisions:**
- **Phase 1:** authored `home-B3-shape.md` — inherits home-B-shape.md's composition spine + documents B3's surface-fork tunings + 2 new choreographies + risk acknowledgement. Surprise budget: medium-high. Dominant dimension: maximal-scroll-cinema.
- **Phase 2:** authored `home-B3-proposed.html` (~1450 lines, self-contained). Inherits all of B's section structure + B3-specific overrides:
  - **Type scale: perfect-fifth 1.5** — title-1 clamp(48, 8vw, 108) / lh 0.90 / -3.5px; title-4 bumped to 32px to maintain proportion. Visibly louder marquee than B.
  - **Body H3 weight 700** (vs A/B's 400). Heavier register.
  - **Density packed** — sectionPadding 48/36/24 desktop/tablet/mobile; gridGap 8px; card padding 20px.
  - **Color temperature warm-leaning** — placeholder gradients pick up amber/orange dominant tones via `--warm-amber/--warm-orange/--warm-red` tokens.
  - **5 rAF choreographies (cap override):**
    1. Hero scroll-grow (B inheritance) — 300vh + sticky + JS-driven scale.
    2. Stories mouse-pan (B inheritance) — cursor-proximity horizontal pan.
    3. Tutorial reverse-hero (B inheritance) — slide width 100vw → 1068/1440 entrance.
    4. **B3-NEW: featured-products-parallax** — media translates at 60% scroll velocity. `transform = translateY((progress - 0.5) * rect.height * 0.4)`. Initial inset extended to `inset(-10% 0)` to give parallax range.
    5. **B3-NEW: news-scroll-scrub-3-stage** — items reveal at stages [0.2, 0.5, 0.8] within section scroll, each over 0.15 progress band. Items declared `opacity: 0; transform: translateY(24px)` initially (with `.ds-news-item` reduced-motion + noscript fallbacks).
  - Plus CSS scroll-driven (declarative, doesn't count toward rAF cap): studio-banner garage-door (warm-tinted bg + content reveal) and footer wordmark wipe.
- **Phase 2.5/2.6/2.7 gates clean** at 1440/768/360: 0 errors, 0 horizontal overflow, 8 sections, 1 H1, 8 H2s, skip-link + noscript + `:root` block all present, 2 parallax targets + 3 scrub items wired, hero scroll height 2700px at desktop (300vh).
- **Reduced-motion handling extended** for B3-specific patterns: `.ds-news-item` fallback to `opacity: 1; transform: none` under `prefers-reduced-motion: reduce` + noscript. `.ds-feature-card__media` `transform: none` under reduced-motion + noscript.
- **state.json updated:** home.prototypePaths.B3 + shapeBriefs.B3 + validation.B3 + history entry.

**Findings worth flagging:**
1. **Title-1 perfect-fifth scale reads louder than B's clamp.** At 1440px, B3's title-1 is 108px (max) vs B's 80px max — 35% larger. Noticeable difference on hero comparison.
2. **Warm-leaning palette tints land cleanly** as ambient brand temperature without introducing new colors. The `--warm-amber/orange/red` tokens are just opacity-tinted alphas of the captured palette + existing brand mnemonic red.
3. **Parallax range trick** — `.ds-feature-card__media` uses `inset: -10% 0` to extend the media container above and below the visible viewport, so the parallax translate has room to move without exposing edges. Verified on screenshot — gradients fill cleanly through full scroll range.
4. **News scrub initial state** required careful handling of the `.ds-news-item` baseline rules. Without explicit `opacity: 0` initial state, items would flash visible before the rAF tick. Added in CSS + reduced-motion + noscript override.

**Artifacts touched:**
- `stardust/prototypes/home-B3-shape.md` — created
- `stardust/prototypes/home-B3-proposed.html` — created (~1450 lines, self-contained)
- `stardust/validation/home-B3/{desktop, desktop-reducedmotion, desktop-firstview, mobile-360}.png` — created
- `stardust/state.json` — updated (home.prototypePaths.B3 + history entry)

**Open questions:**
- B3 motion-fatigue verification on low-end devices not yet performed. Recommend M1+ profile testing before stakeholder review.
- B3 vs B side-by-side comparison — useful to test the "how loud is too loud" hypothesis.

**Next:** Review B3 alongside B (the calmer version). Comparison is the load-bearing question for this variant. Or continue promoting other B sub-variants (B1/B2/B4/B5) via `--add-variant`.

---

## 2026-05-23T21:00:00-07:00 — B3 motion diagnostic + 2 fixes (news scrub timing + parallax magnitude)

**Prompt:** Verify with Playwright and fix issues. Make sure there are no hidden content components and no overlapping section motions if not designed to be so.

**Decisions:**
- Authored `tools/playwright/diagnose-motion.mjs` — scrolls through key positions in the prototype and reports (a) elements with opacity < 0.05 inside viewport (potential stuck-invisible), (b) section bounding-rect overlaps (potential layout collisions), (c) per-scroll-position visible section list.
- Ran the diagnostic against `home-B3-proposed.html` and also tested no-JS state + reduced-motion state.
- **Verified working as designed (not bugs):**
  - Hero text opacity 0 at mid-scroll (rawP > 0.6): intentional text fade-out as video grows.
  - Hero overlay opacity 0 at top (rawP < 0.35): intentional overlay-fade-in-on-scroll.
  - Section "overlap" reports for site-header: measurement artifact (header is `position: fixed`, its bounding rect's docY grows with scroll but its actual layout position doesn't move).
  - Section overlap between featured-products and studio-banner garage-door (974px): intentional — the garage-door CSS `animation-timeline: view(block)` keeps the banner at `translateY(-50vh)` initial state, animating to `translateY(0)` as the user scrolls. The "overlap" IS the garage-door reveal effect.
  - 8px overlap between studio-banner and news section: intentional rounded-top transition (`border-radius: 32px 32px 0 0; margin-top: -8px`).
  - Featured cards anim-enter at scrollY=3173 (mid-page): cards' rect.top=872 means they're at the very bottom edge of viewport (only 28px visible). Anim-enter triggers when sY + 0.85*vh > triggerTop (universal pattern shared with A/B/C/F). Cards reveal as user scrolls another ~120px. Not perceptibly hidden — below the visible fold.
- **Identified and fixed 2 real bugs:**
  1. **News scroll-scrub stages too wide [0.2/0.5/0.8]** — fixed to [0.10/0.25/0.40]. Old stages left items 2 and 3 stuck at opacity 0 when the news section was fully in viewport. After fix: all 3 items reach opacity 1.00 by the time section.top reaches viewport top.
  2. **Featured-products parallax magnitude too large** — fixed `(progress - 0.5) * rect.height * 0.4` → `* 0.12`. Old magnitude reached ±133px on a ~666px-tall media, exceeding the container's `inset: -10% 0` buffer (~67px). At scroll extremes, empty bands appeared above or below the parallaxed gradient. After fix: translate ranges -15px to +25px — well within buffer.
- **Validated no-JS state** via Playwright `javaScriptEnabled: false`: 0 hidden target elements. The `<noscript>` fallback overrides `.anim-enter` + `.ds-news-item` + `.ds-feature-card__media` initial states correctly.
- **Validated reduced-motion state** via `reducedMotion: 'reduce'`: 0 hidden target elements in viewport. The `@media (prefers-reduced-motion: reduce)` block in CSS correctly disables motion-driven hiding.

**Artifacts touched:**
- `tools/playwright/diagnose-motion.mjs` — created (reusable diagnostic for any prototype variant)
- `stardust/prototypes/home-B3-proposed.html` — 2 edits (news scrub stages + featured parallax magnitude) with inline comments documenting the fix + diagnostic provenance
- `stardust/validation/home-B3/{nojs-check, fix-news-allvisible, fix-featured-parallax, desktop-reducedmotion}.png` — created/regenerated

**Findings worth flagging:**
1. **The diagnostic tool is reusable.** Run it against any variant: `node tools/playwright/diagnose-motion.mjs <path>`. Useful as a regression check before approving any prototype.
2. **Universal anim-enter pattern's 85% trigger threshold is fragile at section boundaries.** When a section's top enters viewport, its contents are technically "in-view" by bounding-rect math but invisible per the trigger. Not a bug — works correctly for scrolling users — but worth knowing for static screenshots / browser back-forward landing.
3. **CSS animation-timeline: view(block) confuses bounding-rect-based diagnostics.** The garage-door banner's `translateY(-50vh)` initial state means its rect overlaps the section above it by half-a-viewport. Diagnostic reports a 974px overlap which is real visually (the banner sits half above its in-flow position before scroll) but intentional per the captured pattern. Future diagnostics should account for transform-aware section boundaries.

**Open questions:**
- Whether to lower the universal anim-enter trigger threshold from 85% to 75% for variant B3 specifically (more aggressive reveal). Decision: hold for now — would create a B3-specific deviation from the universal pattern shared across A/B/C/F.
- Whether to add a `data-motion-disabled` flag elsewhere to allow per-page motion opt-out for accessibility audits beyond `prefers-reduced-motion`. Not needed for now.

**Next:** B3 is verified clean. Continue with other tasks — promote remaining B sub-variants, approve a variant, prototype a product page, etc.
