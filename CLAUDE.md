# adobe.com redesign — stardust project

Multi-page redesign of the adobe.com marketing surface using the **stardust** plugin (v0.7.1) on top of **impeccable**. Driven by user-provided design samples that carry the target visual language (cards, elasticity, motion, GSAP usage, header, footer anatomy).

---

## Journal rule (mandatory)

**On every prompt execution, append a new entry to `stardust/journal.md` before ending the turn.** No exceptions — the journal is the shared narrative layer over stardust's own state machine and how we maintain continuity across sessions.

Entry format:

```
## <ISO-8601 timestamp> — <one-line summary>

**Prompt:** <one-paragraph paraphrase of the user's request>

**Decisions:**
- <decision 1>
- <decision 2>

**Artifacts touched:**
- <path> — <created | updated | read>

**Open questions:**
- <question> (or "none")

**Next:** <one-line recommendation for the next prompt>
```

Append-only. If a prior entry turns out wrong, write a new entry that corrects it; do not edit history.

---

## Playwright rule (mandatory)

**All HTML fetching, scraping, and validation runs through Playwright.** No `curl` / `wget` / plain HTTP `fetch` against HTML resources — they miss client-rendered content, and Adobe properties (adobe.com Marquee/Milo, business.adobe.com) are heavily client-rendered.

### When Playwright is required

- **Fetching any reference page** (samples in `samples/live/`, stardust extract crawl pages, any URL we want to read). Use Playwright to load, wait for `networkidle`, capture rendered DOM + full-page screenshot.
- **Validating any HTML we generate** (prototypes, migrated pages, sample distillation artifacts). No HTML is considered done until it has rendered cleanly in a real browser.

### Validation loop (recursive fix)

After writing any HTML the user will see:

1. Render in Playwright (file:// for static, or local dev server).
2. Capture at three viewports — desktop **1440×900**, tablet **768×1024**, mobile **390×844**:
   - Full-page screenshot.
   - Browser console messages (errors + warnings).
   - Network failures (4xx / 5xx / aborted requests, missing assets).
   - Uncaught JS exceptions + unhandled promise rejections.
   - Layout sanity: no horizontal overflow; key landmarks (`header`, `main`, `footer`, hero, primary CTA) present and non-empty.
   - a11y quick-pass: `<img>` alt text, `<input>` labels, heading order, contrast on text-over-image.
   - Interaction smoke: hover an interactive card, scroll-trigger fires, nav opens/closes, primary CTA reachable by keyboard.
3. **If any issue is found, fix it and re-run the loop.** Iterate recursively until either (a) no issues remain or (b) the fix needs user input — in which case surface the question and stop. Do not report a task complete with known issues outstanding.
4. Save the final clean-pass screenshots to `stardust/validation/<artifact>/<viewport>.png` so reviewers can compare without re-running.

### Tooling

Install Playwright in the project on first use: `npm init -y` (if no `package.json`), then `npm i -D playwright` and `npx playwright install chromium`. Reusable helpers under `tools/playwright/` (e.g. `fetch.mjs`, `validate.mjs`).

---

## Working tree

| Path | Owner | Purpose |
|---|---|---|
| `samples/static/` | user | Static HTML sample files (already populated: `bizpro-hub-prototype/`, `plan-page/`). |
| `samples/live/urls.json` | scaffold | List of live sample URLs to fetch. |
| `samples/live/snapshots/` | distillation pass | Fetched HTML + screenshots of live samples. |
| `samples/SAMPLES.md` | distillation pass | Distilled design vocabulary; the anchor brief for `/stardust:direct`. |
| `samples/trait-matrix.json` | distillation pass | Structured per-sample traits (cards, motion, type, color, voice). |
| `stardust/journal.md` | every turn | Chronological prompt journal (see § Journal rule). |
| `stardust/current/` | `/stardust:extract` | Crawl output: current PRODUCT.md, DESIGN.md, DESIGN.json, per-page inventory, `_brand-extraction.json`. |
| `stardust/direction.md` | `/stardust:direct` | Resolved direction + reasoning trace + per-variant resolutions. |
| `stardust/direction/` | manual after direct | Supplementary briefs (`CARDS.md`, `MOTION.md`, `HEADER.md`, `FOOTER.md`, `STACK.md`) that extend DESIGN.json with per-sample fidelity. Read by prototype + migrate. |
| `stardust/prototypes/` | `/stardust:prototype` | Per-page rendered prototypes + shape briefs. |
| `stardust/state.json` | stardust | State machine: per-page lifecycle, variants registry. |
| `PRODUCT.md` | `/stardust:direct` | Target strategy. Shared across variants. |
| `DESIGN-{A,B,C}.md` / `DESIGN-{A,B,C}.json` | `/stardust:direct` | Target visual system per variant. Multi-variant mode. |

---

## Decisions locked

- **Scope:** broad marketing surface of adobe.com + business.adobe.com. Extract starts from `https://www.adobe.com/` with `--cap 20`. Must-include pages are listed in the first journal entry.
- **Variants:** three. A = faithful + improvements (Mode A floor). B = one captured trait amplified. C = different captured trait amplified. B/C amplified traits are selected during sample distillation.
- **Motion stack:** adopt whatever the samples use, faithfully. The distillation pass detects loaded libraries (GSAP, ScrollTrigger, Lenis, etc.), pins versions, and declares them in `stardust/direction/STACK.md`.
- **Brand mode:** Mode A (brand-faithful) is the default and expected — adobe.com reads as `signal-strong`. Palette and type pinned to extracted brand surface; samples drive expressive/distinctiveness/density/motion axes, not palette or type families.

---

## Flow

1. Distill `samples/` → `samples/SAMPLES.md` + `samples/trait-matrix.json`. *(Manual, conversational. Not a stardust command.)*
2. `/stardust:extract https://www.adobe.com/ --cap 20` (with must-include URL pinning).
3. `/stardust:direct "<phrase referencing SAMPLES.md>"` — three variants.
4. Author `stardust/direction/{CARDS,MOTION,HEADER,FOOTER,STACK}.md` (+ per-variant overlays where they diverge).
5. `/stardust:prototype <slug>` — iterate.
6. `/stardust:prepare-migration` → `/stardust:migrate`.
