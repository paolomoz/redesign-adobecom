<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-05-22T14:30:00-07:00
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/brand-review.html
    - stardust/current/pages/home.json
    - stardust/current/pages/express.json
    - samples/SAMPLES.md
    - samples/trait-matrix.json
  stardustVersion: 0.7.1
-->

# Improvements — home (and applicable cross-page)

Five specific weaknesses observed across the 7 extracted www.adobe.com pages, each meeting the specificity bar (measurable observation + named pattern + concrete fix). Variant A applies every item; B and C inherit the list as a floor.

1. **[ia-clutter]** **39 distinct CTAs on home alone**, with verbs spanning *"View plans and pricing"*, *"Get started"*, *"Free trial"*, *"Buy now"*, *"Learn more"*, *"Sign In"*, *"Explore"* — and audience-routing labels (*"Creativity & Design"*, *"PDF & E-signatures"*, *"Marketing & Commerce"*) classified by the heuristic as both nav-link and CTA-candidate. (See `T-cta-vocab-fragmentation` in `brand-review.html`. Per-page `ctas` count: home=39, express=23, photoshop=18, photoshop-features=15, illustrator-features=14, lightroom-features=12, premiere-features=16.)
   *Fix:* Consolidate per-audience-track to one canonical verb pair. Primary conversion: **"Free trial" → "Buy now"** (Acrobat/CC funnel). Discovery: **"View plans and pricing"** (single label, never paired with another verb in the same viewport). Sign-in stays as its own outline CTA in the nav. Audience-routing labels (*"Creativity & Design"*, etc.) are nav links only — class-strip the `[role="button"]` styling that's confusing the heuristic and downstream copy.

2. **[missed-opportunity]** **The captured live home is motion-light** despite Adobe's bench. Per `_brand-extraction.json#motion` and the cross-page audit, scroll-driven choreography is essentially absent on the captured live pages — no scroll-grow hero, no reverse-hero carousels, no garage-door reveals. The samples (`samples/static/bizpro-hub-prototype/bizpro-hub.html` lines 2289–2685) demonstrate exactly what's achievable in Adobe's own design system: a 300vh hero container with sticky child whose video parallaxes from bounded → fullbleed under scroll, plus Lenis-driven section entrances. (See variant B for the amplification thesis; variant A still gets the entrance animations.)
   *Fix (variant A floor):* Add Lenis-driven page-load entrance for nav (`enterDown` 600ms) + hero text (`enterUp` staggered 0/80/160ms) per samples' `@keyframes`, and the shared scroll-driven section-entrance rAF loop (opacity 0→1 + translateY 40→0, bidirectional, easeOut3, stagger 0.10–0.15 per group). No new motion patterns vs samples; just deploy what's already designed.

3. **[cliché]** **Hero is a single product demo** (currently Photoshop / Generative Fill on a brick wall) interrupted by a **geolocation-redirect modal** for international visitors. (See `T-geo-redirect-modal` in `brand-review.html`; observed on the home screenshot at 1440×900 with `viewport.location: it` substituted by IP detection.) The combination — single-product hero + intercepting dialog — is the 2024–2025 hub-page pattern that competitors have largely moved past: the home is supposed to route, not pitch one product to a global audience.
   *Fix (variant A):* Keep the active product demo in the hero rotation (it's a strong asset) but introduce **product-mnemonic eyebrow** ("Adobe Photoshop") above the headline so the framing is "Adobe[product]" rather than "Adobe = this one product." Demote the geolocation interrupt to a **dismissible top-bar banner** (`<aside role="region" aria-label="Region detection">`) anchored above the nav — visible, dismissible, non-modal. Variants B and C may further reshape hero strategy under `ia-fidelity: reimagined`.

4. **[scale-discipline]** **Ad-hoc type scale** — captured heading-size ratios across pages: 1.286, 1.0, 1.273, 1.1 (per `_brand-extraction.json#type.scaleAudit`). No canonical fit (major-third 1.250 / perfect-fourth 1.333 / etc.). H2 and H4 land at the same 28px on some pages, breaking visual hierarchy. The samples use `clamp()` fluid sizing (e.g. `clamp(40px, 6.25vw, 80px)`) which produces clean ratios at every viewport — the captured live pages don't yet adopt this.
   *Fix:* Adopt the samples' `clamp()`-based fluid type scale verbatim:
   - title-1: `clamp(40px, 6.25vw, 80px)` / lh 0.95 / tracking `clamp(-1.5px, -0.25vw, -3.2px)`
   - title-2: `clamp(32px, 4.375vw, 56px)` / lh 1.0 / tracking `clamp(-0.8px, -0.13vw, -1.68px)`
   - title-3: `clamp(28px, 3.125vw, 48px)` / lh 1.05
   - title-4: 24px / lh 1.0
   This produces the perfect-fourth-adjacent ratio at desktop (1.42 between -1/-2, 1.17 between -2/-3) and lands within the canonical band at 1440px+ without bumping into the mid-viewport collapsed-stack of the current pages.

5. **[token-discipline]** **Two stardust hard-rules need explicit brand-faithful inversions** (per `T-mode-A-inversion-needed`). Currently the `current/DESIGN.json#extensions.brandFaithfulInversions[]` documents these but the constraint hasn't propagated into the target token files — easy to lose at prototype time.
   *Fix:* Carry both inversions verbatim into every variant's `DESIGN-{A,B,C}.json#extensions.divergence.brand_faithful_inversions[]`:
   - Pure surfaces — literal `#000` and `#ffffff` are legal and load-bearing (footer black, body white). Captured on every page.
   - Backdrop-blur nav — `backdrop-filter: blur(64–128px)` over `rgba(255,255,255,0.64)` (or transparent over dark hero, transitioning to blur on scroll). Captured on every page. Load-bearing.

---

### Stopping-condition check

The list has 5 items, all meeting the specificity bar (measurable observation drawn from per-page JSON or brand-review tension ID + named design pattern + one concrete fix). Variant A's brief is anchored; the *"better"* claim is defensible.

Variants B and C honor this list as a floor (they may extend in service of their amplified trait but cannot contradict). Item 5 in particular is inheritable as-is.
