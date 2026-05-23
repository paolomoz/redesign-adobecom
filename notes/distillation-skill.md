# Notes — sample distillation as a future skill

Captured live during the 2026-05-22 adobe.com kickoff so we can productise this into a stardust sub-skill later (working name: `stardust:distill` — runs *before* `stardust:extract`, sits between user-provided samples and `stardust:direct`).

This file is scratch / design — not part of the stardust state machine. Promote into a SKILL.md once we've run the pass on 2–3 more brands.

---

## What the pass does

**Input:** user-provided samples (static HTML files + live URLs) that carry the design language the redesign should adopt.

**Output:**
1. `samples/SAMPLES.md` — human-readable distilled vocabulary; the brief `/stardust:direct` reads as anchor reference.
2. `samples/trait-matrix.json` — structured per-sample traits + shared tokens + identified "amplified traits" for variants B and C.
3. `samples/live/snapshots/<slug>.{html,png,log}` — rendered captures of every live URL.

**Stardust integration:** outputs are consumed by `stardust:direct` Phase 2 (Mode B anchor-reference precedence) and Phase 4 (token + componentStyle authoring). The pass is the "concretiser" — Stardust natively expects anchor refs like *"Pentagram nonprofits"*; distillation lets the user feed actual HTML/URL fidelity and have it translated into structured anchors.

---

## Input contract

```
samples/
  static/                              ← user-populated, free shape (one folder per sample, with assets nearby)
    <sample-id>/<entry>.html
    <sample-id>/assets/                ← user keeps assets next to the HTML
  live/
    urls.json                          ← user-populated
      [{ url, label, notes? }, …]
```

The pass discovers samples — it does **not** require a manifest. It walks `samples/static/*/` for any `.html`, and reads `samples/live/urls.json` for live URLs. The `label` field in `urls.json` becomes the snapshot slug.

---

## Process (the 6 steps actually run on 2026-05-22)

### Step 1 — Inventory samples
- `ls samples/static/` and `find . -name '*.html'` to enumerate static.
- `cat samples/live/urls.json` to enumerate live.
- One-line summary of each in the journal entry's "Decisions" block.

### Step 2 — Install Playwright on first use
- `npm init -y` if no `package.json`.
- `npm i -D playwright` then `npx playwright install chromium` (will be cached on subsequent runs).
- Skip if `node_modules/playwright` exists.

### Step 3 — Fetch live URLs via Playwright (`tools/playwright/fetch.mjs`)
The helper does: launch chromium, navigate at viewport 1440×900 @2x, wait `domcontentloaded` + `networkidle` + 2.5s settle, save HTML + full-page screenshot + console / network log.

**Adobe-properties HTTP/2 bypass — required.** Chromium's browser navigation hits `ERR_HTTP2_PROTOCOL_ERROR` against Adobe's Akamai edge for `*.adobe.com` and `*.adobe.io`. The bypass is:

1. Build a Playwright `request` context (its own HTTP client, not the browser's).
2. Route every adobe.com / adobe.io request: `page.route(u => /(^|\.)adobe\.(com|io)$/.test(u.hostname), handler)`.
3. In the handler, call `apiCtx.fetch(req.url(), { method, data, maxRedirects: 5, timeout: 20_000 })` — **do not forward browser headers**; the Sec-* / `:authority` / upgrade-insecure-requests combination causes Akamai to hang. The API client's defaults work.
4. Strip `content-encoding`, `content-length`, `transfer-encoding` from the response before `route.fulfill` (Playwright re-encodes).
5. The bypass must apply to subresources (`scripts.js`, milo block JS, fonts, images), not just the main document — without that, the page renders blank because the main JS bundle 503s.

Without the bypass, the screenshot is white and the HTML is the un-hydrated shell. With it, we get a fully-rendered DOM (32+ console messages mostly from analytics/IMS 415s; these are non-visible failures, expected when scraping anonymously).

### Step 4 — Read static samples
- `Read` each HTML in chunks if >25k tokens.
- Grep for design-token roots (`:root { --…` blocks) — recognise shared design systems immediately when multiple samples share the same token prefix.
- Grep for script blocks at the end of `<body>` to find the JS stack (Lenis, GSAP, scroll-driven loops).

### Step 5 — Cross-sample synthesis
For each category, identify what's **shared** vs **per-sample**:
- **Tokens** (colors, type, spacing, radii) — usually shared across the brand's samples.
- **Components** (cards, nav, footer, hero, carousel, comparison) — partly shared (footer is the most stable), partly per-sample.
- **Motion** (libraries, loops, primitives) — capture every concrete pattern with timing + easing + the scroll engine it reads from.
- **Voice** — heading sentence cadence, CTA verb taxonomy, eyebrow/heading/body triplet patterns.
- **IA priorities** — what every sample insists on placing in the first viewport.
- **Brand-faithful inversions** — Stardust hard-rules that must yield to the brand's actual surface (pure black/white, glassmorphism, gradient text, etc.).

### Step 6 — Identify amplified traits for variants B and C
The hardest step. Look for traits that:
- Are concretely captured in 1 sample but underplayed in the others.
- Are defensible as a brand direction (not "B but more" or "extreme dense").
- Differ from variant A by ≥2 substantive changes (per stardust's variant differentiation contract).

For adobe.com: **B = scroll cinema** (bizpro's choreography) and **C = elastic tile mosaic** (sr-homepage's photography). Both come from captured surface, neither contradicts the brand, and they differ from A on hero strategy + primary card pattern + motion energy + dark/light rhythm + type emphasis.

---

## Output contract

### `samples/SAMPLES.md` shape
- `_provenance` HTML-comment frontmatter.
- One-paragraph framing of the sample set.
- Numbered sections: type / color / spacing / radius / buttons / cards / nav / footer / motion / JS stack / voice / IA priorities / section primitives.
- Final section: **amplified traits for variants B and C** with a one-paragraph thesis each + variant differentiation table.
- Closing section: **Notes for /stardust:direct** with the resolved direction hints (mode, density tier, ia-fidelity, brand-faithful inversions list).

### `samples/trait-matrix.json` shape
Top-level keys: `_provenance`, `sharedTokens`, `stack`, `components`, `samples[]`, `amplifiedTraits`, `directionHints`. Designed to map cleanly onto:
- `DESIGN.json.extensions.componentStyle` (consumed by direct Phase 4)
- `DESIGN.json.extensions.divergence.seed.anchors[]` (consumed by direct Phase 2 Mode B)
- `DESIGN.json.extensions.iaPriorities[]` (consumed by direct Phase 4 IA audit)

The matrix is **machine-readable but not a strict schema** — stardust will read it as a hint, not a contract.

---

## Lessons learned (2026-05-22)

1. **Static samples are mostly self-distilling** because they include `:root` design tokens, named keyframes, and well-commented section headers. Read them in 700–1500 line chunks (smaller than the Read tool's 25k token cap).

2. **Live samples need the Playwright HTTP/2 bypass.** Without it, Adobe's Akamai aborts the connection and the page never hydrates. Document the bypass clearly — it will be needed on every Adobe redesign.

3. **Header forwarding is the bypass's gotcha.** The first 4 attempts forwarded browser headers (with strip lists for `sec-*`, `host`, etc.) and Akamai timed out at 20s every time. The minimal-headers approach worked on the API client one-liner. The fix: forward zero headers, let the API client use its defaults.

4. **Screenshot validation is mandatory.** The first successful fetch produced a 19KB white PNG — looked like success in logs but the content was missing because the bypass only routed the main URL, not subresources. Render the screenshot via `Read` (vision) and verify visible content before declaring the snapshot done.

5. **Identifying amplified traits is a synthesis step, not extraction.** It requires reading across samples and naming traits the brand owns. The matrix-of-presence helps but the trait name has to be authored. (For adobe.com: "scroll cinema" and "elastic tile mosaic" — both 2–3 word labels, both citing a specific source sample.)

6. **Stardust's Mode A constraints need explicit inversions for adobe.com.** Two hard rules conflict with captured surface: "no pure black/white" (adobe.com uses literal `#000` and `#ffffff`) and "no glassmorphism" (nav pill uses `backdrop-filter: blur`). Document in the direction hints so `/stardust:direct` Phase 4 emits the `brand_faithful_inversions[]` entries.

---

## Future skill API sketch

```
/stardust:distill                    ← scans samples/ for both static and live
/stardust:distill --refresh          ← re-fetches live URLs (overwrites snapshots/)
/stardust:distill --add <url>        ← appends to urls.json + fetches the one new
/stardust:distill --static <path>    ← imports a static sample folder
```

Procedure inside the skill mirrors steps 1–6 above. Output files identical. Skill ends with a one-screen report:

```
distillation complete
=====================

Static samples:   3 (bizpro-hub, plan-page, …)
Live samples:     1 fetched, 0 stale
Shared tokens:    type / color / spacing / radius — confirmed shared across all
Stack:            lenis 1.x (no gsap)
Amplified traits: B = scroll cinema, C = elastic tile mosaic
Inversions:       2 hard-rule inversions needed (pure black/white, glassmorphism)

Wrote:
  samples/SAMPLES.md
  samples/trait-matrix.json
  samples/live/snapshots/<N>.{html,png,log}

Next: $stardust extract <starting-url>  (anchor refs ready)
```

The skill's hard rules:
- Refuse if `samples/` is empty.
- Refuse if no static AND no live sample.
- Always Playwright for live (no curl/wget fallback).
- Always render every generated HTML in Playwright before declaring done (per project CLAUDE.md validation loop).
- Save final screenshot in `samples/live/snapshots/` so reviewers can compare without re-running.

---

## Open questions to resolve before promoting to a skill

1. **Authorisation:** what about live URLs behind login (Adobe Stock, business.adobe.com gated content)? Per-project secret/cookie injection?
2. **De-duplication:** when two static samples share a `:root` block byte-for-byte, do we keep both or just diff? Probably keep both — diffing is the synthesis pass's job, not the fetch's.
3. **Asset capture:** the static samples carry assets adjacent (fonts, SVGs, PNGs). We currently leave them in place. Should the skill copy them into a unified `samples/_assets/` for migrate to reuse? Probably yes when promoting.
4. **Tooling persistence:** `tools/playwright/fetch.mjs` is per-project. Should the skill ship a packaged binary instead? Probably keep as a per-project file the user can edit.
5. **Variant trait identification:** is this still a manual / agent-judgment step, or can the matrix sort by "presence-asymmetry score" to suggest amplified traits? Worth exploring as a deterministic helper.
