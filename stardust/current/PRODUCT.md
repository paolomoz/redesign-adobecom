<!--
_provenance:
  writtenBy: stardust:extract
  writtenAt: 2026-05-22T13:50:00-07:00
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/home.json
    - stardust/current/pages/express.json
    - stardust/current/pages/products-photoshop.json
    - stardust/current/pages/products-{illustrator,premiere,photoshop-lightroom}-features.json
  stardustVersion: 0.7.1
  scope: "Descriptive snapshot of www.adobe.com marketing surface. business.adobe.com excluded (single-origin per extract); will be a sibling project."
-->

# PRODUCT — adobe.com (current state)

## Register

**brand**

adobe.com is a marketing landing surface. Hero, social proof, product pricing, conversion CTAs above the fold, no authentication required to see the page. Tool / dashboard register lives on subdomains (`creativecloud.adobe.com`, `acrobat.adobe.com`, `business.adobe.com`) not crawled in this extract.

## Users

The marketing surface routes four primary audience tracks:

1. **Consumers / individual creators** — entry from `/`, `/express/`. Photoshop, Illustrator, Lightroom, Premiere product pages. Emphasis: free trial CTA, "Save 50% on Creative Cloud Pro," named product features ("Generative Fill," AI assistants).
2. **Small business and team buyers** — surfaced through "View plans and pricing," "Acrobat plans and pricing." Pricing tiers + multi-license dropdowns (see samples; not present on the crawled marketing surface).
3. **Enterprise / business decision makers** — surfaced through "Marketing & Commerce" top-nav, "Adobe for Business" sections, link-outs to business.adobe.com.
4. **Students / educators** — partial visibility on marketing pages; primary discovery via dedicated `/education/` subpath (not crawled).

The marketing surface is a routing layer. Direct conversion happens on Creative Cloud product pages and the Acrobat plans funnel.

## Product Purpose

> "Adobe is changing the world through digital experiences. We help our customers create, deliver and optimize content and applications."
>
> *— captured `og:description`, applied site-wide*

The marketing surface signals breadth (20+ apps under Creative Cloud, business solutions, document tools) while routing each visitor's audience track to the appropriate conversion funnel. Hero copy on `/` foregrounds the active product launch ("Transform how you share information." — currently Photoshop's Generative Fill).

## Brand Personality

Derived from captured copy + computed-style brand surface + observed tone:

- **Professional warm** — short sentences, mixed-case display headings (not uppercase), period-terminated display copy ("Transform how you share information."), no jargon.
- **Aspirational but technical** — feature-led copy ("Save 50% on Creative Cloud Pro," "Generative Fill," "AI Assistant"), product-name foregrounded over abstract claims.
- **Confidently restrained** — minimal decorative motion in production marketing pages (relative to the static samples, which push much further on choreography). The captured live home is image-heavy, motion-light.
- **Dense, IA-first** — top nav surfaces 4 audience tracks ("Creativity & Design / PDF & E-signatures / Marketing & Commerce / Help & Support") before any product is named. Discovery beats persuasion in the IA priority.

## Anti-references

Captured from the brand surface + observed contrast against the design samples:

- **Editorial / atelier register** — "the studio," "the journal," "mise-en-place" don't appear and would not fit the product-feature register.
- **Cute / casual** — emoji, exclamation marks, hand-drawn iconography don't appear; brand voice is direct, never colloquial.
- **Single-product narrative** — Adobe's marketing surface is deliberately multi-product, multi-audience; the brand-faithful redesign cannot collapse to a single-product story.
- **Generic 2026-SaaS silhouette** — Adobe.com explicitly diverges from the *Vercel / Linear / Stripe* hero pattern (centered hero + dual CTA + gradient mesh background). The captured home leads with a product demo image (skateboard photo + Photoshop Generative Fill brick wall), not abstract gradients.

## Design Principles

Derived from observed patterns across the 7 captured pages:

1. **Show the work, not the chrome.** Hero imagery is product output (a generated brick wall, a Photoshop composition, a Premiere timeline frame), not stylized SaaS illustration.
2. **Route before persuade.** Top nav and home grid surface audience tracks before any specific product or feature. The visitor disambiguates first; the funnel persuades after.
3. **Dense over sparse.** Section padding stays compact (mode ~64px); the page is information-rich and tile-led, not luxuriously airy.
4. **Mixed-case display, not uppercase.** Headings render at 700–900 weight in Adobe Clean / Adobe Clean Display, mixed case, period-terminated for the marquee voice.
5. **Product-name first, claim second.** "Photoshop / Generative Fill" anchors the hero before any benefit copy. The product mnemonic is the trust signal.

## Accessibility & Inclusion

Captured signals (incomplete — extract did not run a full a11y audit):

- All 7 pages declare `lang` on `<html>`.
- Heading outline present on every page (avg 27 headings on home, 18–25 on product pages).
- Most `<img>` carry alt attributes; a few decorative images carry empty alt (correct usage).
- Geolocation redirect modal on home (visible at `/`) introduces a focus-trapping dialog before the main content — known interruption to keyboard-only flow.
- Theme-color meta absent on every page — dark-mode users get default browser chrome.
- Cross-page distinct CTAs reach high count (per `voiceTable.distinctCtaLabels`) — moderate vocabulary fragmentation observed.
