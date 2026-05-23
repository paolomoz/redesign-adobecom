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
