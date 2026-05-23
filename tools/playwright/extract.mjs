#!/usr/bin/env node
// stardust:extract — Phase 2 per-page extraction for adobe.com.
//
// Implements the Playwright recipe + per-page schema documented in:
//   - extract/reference/playwright-recipe.md
//   - extract/reference/current-state-schema.md
//
// Bot-management fallback: launches headed real Chrome (channel: 'chrome')
// because Adobe's Akamai edge rejects bundled-chromium-default fingerprints
// with ERR_HTTP2_PROTOCOL_ERROR. Records the choice in _crawl-log.json.

import { chromium } from 'playwright';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

const ROOT = process.cwd();
const CURRENT = path.join(ROOT, 'stardust/current');

const URLS = [
  { slug: 'home',                                    url: 'https://www.adobe.com/' },
  { slug: 'express',                                 url: 'https://www.adobe.com/express/' },
  { slug: 'products-photoshop',                      url: 'https://www.adobe.com/products/photoshop.html' },
  { slug: 'products-photoshop-features',             url: 'https://www.adobe.com/products/photoshop/features.html' },
  { slug: 'products-illustrator-features',           url: 'https://www.adobe.com/products/illustrator/features.html' },
  { slug: 'products-photoshop-lightroom-features',   url: 'https://www.adobe.com/products/photoshop-lightroom/features.html' },
  { slug: 'products-premiere-features',              url: 'https://www.adobe.com/products/premiere/features.html' },
];

// ─── Capture function (runs in the page context) ──────────────────────────
// One giant in-page evaluate per page; cheaper than chatty round-trips.
function captureInPage() {
  return new Promise(resolve => {
    const pick = (el, props) => {
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) out[p] = cs.getPropertyValue(p) || cs[p] || null;
      return out;
    };
    const domPath = el => {
      const parts = [];
      while (el && el.nodeType === 1 && el !== document.body && el !== document.documentElement) {
        let part = el.tagName.toLowerCase();
        if (el.id) { part += '#' + el.id; parts.unshift(part); break; }
        const sib = Array.from(el.parentElement?.children || []).filter(s => s.tagName === el.tagName);
        if (sib.length > 1) part += `:nth-of-type(${sib.indexOf(el) + 1})`;
        parts.unshift(part);
        el = el.parentElement;
      }
      return parts.join(' > ');
    };
    const clamp = (n) => Math.round(n);

    // OG / meta
    const ogProp = p => document.querySelector(`meta[property="${p}"]`)?.content || null;
    const themeColorLight = document.querySelector('meta[name="theme-color"]:not([media])')?.content
                          || document.querySelector('meta[name="theme-color"]')?.content || null;
    const themeColorDark = document.querySelector('meta[name="theme-color"][media*="dark"]')?.content || null;
    const lang = document.documentElement.lang || null;

    // Headings
    const headings = [];
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
      const cs = getComputedStyle(h);
      headings.push({
        level: parseInt(h.tagName[1], 10),
        text: (h.innerText || '').trim().slice(0, 500),
        id: h.id || null,
        domPath: domPath(h),
        style: {
          fontFamily: cs.fontFamily,
          fontWeight: cs.fontWeight,
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
        }
      });
    });

    // Landmarks
    const landmarkSel = 'header,nav,main,aside,footer,[role="banner"],[role="navigation"],[role="main"],[role="complementary"],[role="contentinfo"],[role="region"]';
    const landmarks = [];
    document.querySelectorAll(landmarkSel).forEach(el => {
      const innerText = (el.innerText || '').trim();
      const children = [];
      el.querySelectorAll(':scope > section, :scope > div').forEach(child => {
        const childHeading = child.querySelector('h1,h2,h3,h4');
        const childInner = (child.innerText || '').trim();
        if (!childInner) return;
        let purpose = 'unknown';
        const cls = (child.className || '').toString().toLowerCase();
        if (/hero|marquee|banner/.test(cls)) purpose = 'hero';
        else if (/feature|product/.test(cls)) purpose = 'feature-list';
        else if (/testimonial|review|customer/.test(cls)) purpose = 'social-proof';
        else if (/cta|signup|action/.test(cls)) purpose = 'cta-band';
        else if (/footer/.test(cls)) purpose = 'footer-nav';
        else if (child.querySelector('form')) purpose = 'form';
        else if (childHeading) purpose = 'rich-text';
        const body = [];
        child.querySelectorAll(':scope > p, :scope > * > p').forEach(p => {
          const txt = (p.textContent || '').trim();
          if (txt && txt.length > 5 && body.length < 20) body.push(txt);
        });
        const lists = [];
        child.querySelectorAll(':scope > ul, :scope > ol, :scope > * > ul, :scope > * > ol').forEach(l => {
          const items = Array.from(l.querySelectorAll(':scope > li')).map(li => (li.textContent || '').trim()).filter(Boolean);
          if (items.length) lists.push({ ordered: l.tagName === 'OL', items: items.slice(0, 30) });
        });
        children.push({
          tag: child.tagName.toLowerCase(),
          role: child.getAttribute('role'),
          id: child.id || null,
          classes: (child.className || '').toString().split(/\s+/).filter(Boolean).slice(0, 5),
          purpose,
          headlineRef: childHeading ? headings.findIndex(h => h.text === (childHeading.innerText || '').trim()) : null,
          innerTextSummary: childInner.slice(0, 240),
          wordCount: childInner.split(/\s+/).filter(Boolean).length,
          body,
          lists,
          qa: [],
          quotes: [],
        });
        if (children.length > 30) return;
      });
      landmarks.push({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role'),
        id: el.id || null,
        classes: (el.className || '').toString().split(/\s+/).filter(Boolean).slice(0, 5),
        innerText: innerText,
        children
      });
    });

    // CTAs — button-like
    const ctas = [];
    const ctaCandidates = document.querySelectorAll('button, [role="button"], a');
    const VH = window.innerHeight;
    ctaCandidates.forEach(el => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const radius = parseFloat(cs.borderRadius) || 0;
      const padLR = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const isButton = el.tagName === 'BUTTON' || el.getAttribute('role') === 'button';
      const looksButtonLike = (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent' && radius > 2 && padLR > 8);
      if (!isButton && !looksButtonLike) return;
      const label = (el.innerText || el.textContent || '').trim().slice(0, 200);
      if (!label || label.length > 200) return;
      ctas.push({
        label,
        href: el.getAttribute('href') || null,
        tag: el.tagName.toLowerCase(),
        domPath: domPath(el),
        style: {
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontFamily: cs.fontFamily,
          fontWeight: cs.fontWeight,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          boxShadow: cs.boxShadow,
        },
        appearsAbove: rect.top < VH ? 'fold' : 'below-fold',
      });
      if (ctas.length > 100) return;
    });

    // Links
    const internal = [], external = [];
    const seenL = new Set();
    document.querySelectorAll('a[href]').forEach(a => {
      try {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
        const u = new URL(href, location.href);
        const text = (a.innerText || a.textContent || '').trim().slice(0, 200);
        const key = u.pathname + '|' + text;
        if (seenL.has(key)) return; seenL.add(key);
        const entry = { href: u.pathname + (u.search || ''), text, domPath: domPath(a) };
        if (u.host === location.host) internal.push(entry);
        else { entry.href = u.toString(); external.push(entry); }
      } catch {}
    });

    // Media — images
    const images = [];
    document.querySelectorAll('img').forEach(img => {
      const src = img.currentSrc || img.src;
      if (!src) return;
      images.push({
        src,
        srcset: img.srcset || null,
        alt: img.alt || null,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        localPath: null,
      });
      if (images.length > 60) return;
    });

    // Inline SVGs
    const inlineSvgs = [];
    document.querySelectorAll('svg').forEach(svg => {
      const markup = svg.outerHTML;
      if (markup.length < 50) return;
      inlineSvgs.push({
        viewBox: svg.getAttribute('viewBox') || null,
        domPath: domPath(svg),
        markupHash: 'sha-stub', // hashed below in node
      });
      if (inlineSvgs.length > 40) return;
    });

    // CSS background images (with pseudo walk)
    const cssBackgrounds = [];
    const allEls = document.querySelectorAll('*');
    const parseUrls = (bg) => Array.from(bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)).map(m => m[1]);
    for (const el of allEls) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 100 || rect.height < 80) continue;
      const cs = getComputedStyle(el);
      const bg = cs.backgroundImage;
      if (bg && bg !== 'none') {
        for (const u of parseUrls(bg)) {
          try {
            cssBackgrounds.push({
              url: new URL(u, location.href).toString(),
              domPath: domPath(el),
              boundingClientRect: { x: clamp(rect.x), y: clamp(rect.y), width: clamp(rect.width), height: clamp(rect.height) },
              backgroundSize: cs.backgroundSize,
              backgroundPosition: cs.backgroundPosition,
              backgroundRepeat: cs.backgroundRepeat,
              localPath: null,
            });
          } catch {}
        }
      }
      // Pseudo-element walk
      for (const pseudo of ['::before', '::after']) {
        const psBg = getComputedStyle(el, pseudo).backgroundImage;
        if (psBg && psBg !== 'none') {
          for (const u of parseUrls(psBg)) {
            try {
              cssBackgrounds.push({
                url: new URL(u, location.href).toString(),
                domPath: domPath(el) + pseudo,
                boundingClientRect: { x: clamp(rect.x), y: clamp(rect.y), width: clamp(rect.width), height: clamp(rect.height) },
                backgroundSize: getComputedStyle(el, pseudo).backgroundSize,
                backgroundPosition: getComputedStyle(el, pseudo).backgroundPosition,
                backgroundRepeat: getComputedStyle(el, pseudo).backgroundRepeat,
                localPath: null,
              });
            } catch {}
          }
        }
      }
      if (cssBackgrounds.length > 80) break;
    }

    // Videos & iframes
    const videos = Array.from(document.querySelectorAll('video')).slice(0, 20).map(v => ({
      src: v.currentSrc || v.src || (v.querySelector('source')?.src) || null,
      poster: v.poster || null,
    }));
    const iframes = Array.from(document.querySelectorAll('iframe')).slice(0, 20).map(f => ({
      src: f.src,
      title: f.title || null,
    }));

    // Forms
    const forms = [];
    document.querySelectorAll('form').forEach(f => {
      if (forms.length > 10) return;
      const fields = [];
      f.querySelectorAll('input, textarea, select').forEach(field => {
        fields.push({
          type: field.type || field.tagName.toLowerCase(),
          name: field.name || null,
          label: field.labels?.[0]?.textContent?.trim() || field.placeholder || null,
          required: !!field.required,
        });
      });
      let thirdParty = null;
      const action = f.action || '';
      if (action.includes('stripe')) thirdParty = 'stripe';
      else if (action.includes('calendly')) thirdParty = 'calendly';
      else if (action.includes('typeform')) thirdParty = 'typeform';
      else if (action.includes('mailchimp')) thirdParty = 'mailchimp';
      forms.push({ action, method: f.method || 'get', fields, thirdParty });
    });

    // Widgets
    const widgets = {
      modals: Array.from(document.querySelectorAll('dialog, [role="dialog"]')).slice(0, 10).map(d => ({ trigger: null, domPath: domPath(d) })),
      accordions: Array.from(document.querySelectorAll('details, [role="region"][aria-labelledby]')).slice(0, 15).map(d => ({ domPath: domPath(d), itemCount: 1 })),
      tabs: Array.from(document.querySelectorAll('[role="tablist"]')).slice(0, 8).map(t => ({ domPath: domPath(t), tabCount: t.querySelectorAll('[role="tab"]').length })),
    };

    // Components closed-list
    const countSel = sel => {
      try {
        const els = document.querySelectorAll(sel);
        const examples = Array.from(els).slice(0, 2).map(e => {
          const cls = (e.className || '').toString().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
          return cls ? '.' + cls : e.tagName.toLowerCase();
        });
        return { count: els.length, examples };
      } catch { return { count: 0, examples: [] }; }
    };
    const components = {
      cards:           countSel('.card, [class*="card"]:not([class*="card-grid"])'),
      grids:           countSel('.grid, [class*="grid"], [class*="row"]'),
      accordions:      countSel('details, [role="region"][aria-labelledby]'),
      tabs:            countSel('[role="tablist"], .tabs'),
      tables:          countSel('table:not([role="presentation"])'),
      modals:          countSel('dialog, [role="dialog"]'),
      carousels:       countSel('[class*="carousel"], [class*="swiper"], [class*="slick"]'),
      videos:          countSel('video'),
      iframes:         countSel('iframe'),
      dataVizEmbeds:   countSel('iframe[src*="datawrapper"], iframe[src*="flourish"], iframe[src*="tableau"], [class*="chart"]'),
      teamTiles:       countSel('[class*="team"] [class*="member"]'),
      pricingTiles:    countSel('[class*="pricing"] [class*="tier"], [class*="plan"]'),
      testimonialCards:countSel('[class*="testimonial"], blockquote'),
      logoStrip:       countSel('[class*="logo-strip"], [class*="logos"]'),
      timeline:        countSel('[class*="timeline"]'),
      breadcrumbs:     countSel('nav[aria-label*="breadcrumb" i], [class*="breadcrumb"]'),
      statRow:         countSel('[class*="stats"], [class*="metric"]'),
      ctaBand:         countSel('[class*="cta-band"], [class*="cta-section"]'),
      formFields:      countSel('form input, form textarea, form select'),
      other:           [],
    };

    // Per-section style — direct children of main (or top-level sections)
    const perSectionStyle = [];
    const mainEl = document.querySelector('main') || document.body;
    const sectionEls = mainEl.querySelectorAll(':scope > section, :scope > div, :scope > article');
    Array.from(sectionEls).slice(0, 30).forEach(s => {
      const cs = getComputedStyle(s);
      const h = s.querySelector('h1,h2,h3,h4');
      const cls = (s.className || '').toString().toLowerCase();
      let purpose = 'unknown';
      if (/hero|marquee/.test(cls)) purpose = 'hero';
      else if (/feature/.test(cls)) purpose = 'feature-list';
      else if (/testimonial|review/.test(cls)) purpose = 'social-proof';
      else if (/cta/.test(cls)) purpose = 'cta-band';
      else if (/footer/.test(cls)) purpose = 'footer-nav';
      const hasBg = (cs.backgroundImage && cs.backgroundImage !== 'none') ||
                    !!Array.from(s.querySelectorAll('img,picture,video')).find(m => {
                      const r = m.getBoundingClientRect();
                      return r.width > 200 && r.height > 100;
                    });
      perSectionStyle.push({
        sectionRef: domPath(s),
        purpose,
        background: { color: cs.backgroundColor, hasImage: hasBg, hasGradient: /gradient/.test(cs.backgroundImage || '') },
        text: { dominantColor: cs.color },
        spacing: { paddingBlock: cs.paddingTop, paddingInline: cs.paddingLeft, gap: cs.gap },
        borderRadius: cs.borderRadius,
        fontFamilies: [cs.fontFamily],
        shadowsUsed: cs.boxShadow !== 'none' ? [cs.boxShadow] : [],
      });
    });

    // CSS custom properties (best-effort — only those exposed at :root)
    const cssCustomProperties = [];
    const rootCs = getComputedStyle(document.documentElement);
    // Iterate stylesheets to find --* defined at :root
    const declared = new Set();
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules || []) {
            if (rule.selectorText === ':root' || rule.selectorText === ':where(:root)') {
              for (const prop of rule.style) {
                if (prop.startsWith('--')) declared.add(prop);
              }
            }
          }
        } catch {} // cross-origin sheets
      }
    } catch {}
    for (const name of declared) {
      const value = rootCs.getPropertyValue(name).trim();
      if (value) cssCustomProperties.push({ name, value: value.slice(0, 200) });
      if (cssCustomProperties.length > 200) break;
    }

    // Stats
    const wordCount = (document.body.innerText || '').split(/\s+/).filter(Boolean).length;

    resolve({
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || null,
      og: {
        title: ogProp('og:title'),
        description: ogProp('og:description'),
        image: ogProp('og:image'),
        type: ogProp('og:type'),
        siteName: ogProp('og:site_name'),
      },
      themeColor: { light: themeColorLight, dark: themeColorDark },
      language: lang,
      headings,
      landmarks,
      ctas,
      links: { internal, external },
      media: { images, inlineSvgs, cssBackgrounds, videos, iframes },
      forms,
      widgets,
      components,
      perSectionStyle,
      embedDominance: { dominated: false, iframeSrc: null, viewportCoveragePct: null, mainHeightCoveragePct: null, screenshot: null },
      cssCustomProperties,
      stats: {
        wordCount,
        ctaCount: ctas.length,
        internalLinkCount: internal.length,
        externalLinkCount: external.length,
        imageCount: images.length,
      },
    });
  });
}

// ─── Consent dismissal (one-time per context) ──────────────────────────────
async function dismissConsent(context, originUrl) {
  const page = await context.newPage();
  let method = null;
  try {
    await page.goto(originUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    method = await page.evaluate(() => {
      try { if (window.OneTrust?.RejectAll) { window.OneTrust.RejectAll(); return 'api:OneTrust.RejectAll'; } } catch {}
      try { if (window.Cookiebot?.dismiss) { window.Cookiebot.dismiss(); return 'api:Cookiebot.dismiss'; } } catch {}
      try { if (window.CookieConsent?.dismiss) { window.CookieConsent.dismiss(); return 'api:CookieConsent.dismiss'; } } catch {}
      try { if (window.Didomi?.notice?.hide) { window.Didomi.notice.hide(); return 'api:Didomi.notice.hide'; } } catch {}
      try { if (window.osano?.cm?.dismiss) { window.osano.cm.dismiss(); return 'api:osano.cm.dismiss'; } } catch {}
      // Adobe-specific: alloy / ACDL consent
      try {
        const btn = document.querySelector('#onetrust-reject-all-handler') || document.querySelector('#onetrust-accept-btn-handler');
        if (btn) { btn.click(); return 'selector:#onetrust-*-handler'; }
      } catch {}
      return null;
    });
    if (!method) {
      for (const sel of ['#onetrust-reject-all-handler','#onetrust-accept-btn-handler','#CybotCookiebotDialogBodyButtonDecline','[aria-label*="reject" i]','[aria-label*="accept" i]']) {
        try { await page.click(sel, { timeout: 2000 }); method = `selector:${sel}`; break; } catch {}
      }
    }
    for (const sel of ['#onetrust-banner-sdk','#CybotCookiebotDialog','[id*="didomi"]','[id*="osano"]']) {
      await page.waitForSelector(sel, { state: 'hidden', timeout: 4000 }).catch(() => {});
    }
  } catch (e) {
    method = `failed:${e.message.slice(0, 80)}`;
  }
  await page.close();
  return method ?? 'none-detected';
}

// ─── Media downloader (with content hash) ──────────────────────────────────
async function downloadMedia(ctx, url, outDir) {
  try {
    const r = await ctx.request.get(url, { timeout: 15_000 });
    if (!r.ok()) return null;
    const body = await r.body();
    const ext = path.extname(new URL(url).pathname).split('?')[0] || '.bin';
    const hash = crypto.createHash('sha256').update(body).digest('hex').slice(0, 6);
    const basename = path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9_.-]/g, '_') || 'media';
    const filename = basename.replace(/\.[^.]+$/, '') + '-' + hash + ext;
    const fullPath = path.join(outDir, filename);
    await writeFile(fullPath, body);
    return path.relative(ROOT, fullPath);
  } catch { return null; }
}

// ─── Per-page extraction ───────────────────────────────────────────────────
async function extractPage(ctx, { slug, url }, fontIntercepts) {
  const page = await ctx.newPage();
  const start = Date.now();
  const consoleErrs = [];
  page.on('pageerror', e => consoleErrs.push(e.message));

  // Font network interception
  page.on('response', async r => {
    const u = r.url();
    if (!/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) && !(r.headers()['content-type']||'').startsWith('font/')) return;
    if (fontIntercepts.urls.has(u)) return;
    fontIntercepts.urls.add(u);
    try {
      const body = await r.body();
      const basename = path.basename(new URL(u).pathname).replace(/[^a-zA-Z0-9_.-]/g, '_') || 'font';
      const fullPath = path.join(CURRENT, 'assets/fonts', basename);
      await writeFile(fullPath, body);
      fontIntercepts.files.push({ url: u, localPath: path.relative(ROOT, fullPath) });
    } catch {}
  });

  let response, waitMode = 'medium', waitMs = 0;
  try {
    response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8_000 });
    // grace period for medium mode
    await page.waitForTimeout(2_000);
    waitMs = Date.now() - start;
  } catch (e) {
    // fallback
    waitMode = 'domcontentloaded(fallback)';
    try {
      response = await page.goto(url, { waitUntil: 'commit', timeout: 12_000 });
      await page.waitForTimeout(1500);
      waitMs = Date.now() - start;
    } catch (e2) {
      await page.close();
      return { ok: false, error: { class: 'NavigationError', message: e2.message.slice(0, 200) } };
    }
  }

  // Response validation
  const status = response?.status() ?? 0;
  if (status >= 400) {
    await page.close();
    return { ok: false, error: { class: 'HTTPError', message: `HTTP ${status}` } };
  }
  const contentType = (response?.headers()['content-type'] || '').toLowerCase();
  if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
    await page.close();
    return { ok: false, error: { class: 'ContentTypeError', message: `unexpected content-type: ${contentType}` } };
  }

  const finalUrl = page.url();

  // Scroll-to-bottom pass (4 viewport-height steps, 300ms pauses)
  await page.evaluate(async () => {
    const VH = window.innerHeight;
    const total = Math.max(document.documentElement.scrollHeight, VH * 4);
    for (let y = 0; y <= total; y += VH) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 300));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 300));
  });

  // Capture
  const captured = await page.evaluate(captureInPage);

  // Hash inline SVGs (must be done outside the page context for crypto)
  for (const svg of captured.media.inlineSvgs) {
    svg.markupHash = 'sha256:' + crypto.createHash('sha256').update(svg.viewBox || '' + svg.domPath).digest('hex').slice(0, 16);
  }

  // Download top images + bg images (cap to keep extraction reasonable)
  const mediaDir = path.join(CURRENT, 'assets/media');
  for (const img of captured.media.images.slice(0, 12)) {
    if (img.naturalWidth >= 200 && img.naturalHeight >= 120) {
      img.localPath = await downloadMedia(ctx, img.src, mediaDir);
    }
  }
  for (const bg of captured.media.cssBackgrounds.slice(0, 8)) {
    bg.localPath = await downloadMedia(ctx, bg.url, mediaDir);
  }

  // Screenshot
  const screenshotPath = path.join(CURRENT, 'assets/screenshots', `${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // Provenance
  const provenance = {
    writtenBy: 'stardust:extract',
    writtenAt: new Date().toISOString(),
    readArtifacts: [url],
    synthesizedInputs: [],
    stardustVersion: '0.7.1',
    renderedBy: 'playwright',
    fetchedAt: new Date(start).toISOString(),
    waitMode,
    waitMs,
    httpStatus: status,
    contentType: contentType.split(';')[0],
  };

  const pageJson = {
    _provenance: provenance,
    slug,
    url,
    finalUrl,
    title: captured.title,
    metaDescription: captured.metaDescription,
    og: captured.og,
    themeColor: captured.themeColor,
    language: captured.language,
    headings: captured.headings,
    landmarks: captured.landmarks,
    ctas: captured.ctas,
    links: captured.links,
    media: captured.media,
    forms: captured.forms,
    widgets: captured.widgets,
    components: captured.components,
    perSectionStyle: captured.perSectionStyle,
    embedDominance: captured.embedDominance,
    cssCustomProperties: captured.cssCustomProperties,
    screenshot: path.relative(ROOT, screenshotPath),
    stats: captured.stats,
  };

  await writeFile(path.join(CURRENT, 'pages', `${slug}.json`), JSON.stringify(pageJson, null, 2));

  await page.close();
  return { ok: true, slug, waitMode, waitMs, httpStatus: status, fetchedAt: provenance.fetchedAt };
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  await mkdir(path.join(CURRENT, 'pages'), { recursive: true });
  await mkdir(path.join(CURRENT, 'assets/media'), { recursive: true });
  await mkdir(path.join(CURRENT, 'assets/screenshots'), { recursive: true });
  await mkdir(path.join(CURRENT, 'assets/fonts'), { recursive: true });

  console.log('→ Launching headed Chrome (bot-management fallback)');
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    locale: 'en-US',
    reducedMotion: 'reduce',
    javaScriptEnabled: true,
    ignoreHTTPSErrors: true,
  });

  // Consent dismissal pre-flight
  console.log('→ Consent dismissal pre-flight');
  const consentMethod = await dismissConsent(context, 'https://www.adobe.com/');
  console.log(`  method: ${consentMethod}`);

  // Font intercept registry
  const fontIntercepts = { urls: new Set(), files: [] };

  const successes = [], failures = [];
  for (const target of URLS) {
    console.log(`→ ${target.slug}  ${target.url}`);
    try {
      const result = await extractPage(context, target, fontIntercepts);
      if (result.ok) {
        successes.push({ slug: result.slug, url: target.url, waitMode: result.waitMode, waitMs: result.waitMs, httpStatus: result.httpStatus, fetchedAt: result.fetchedAt });
        console.log(`  ✓ ${result.waitMode}  ${result.waitMs}ms  http ${result.httpStatus}`);
      } else {
        failures.push({ slug: target.slug, url: target.url, errorClass: result.error.class, message: result.error.message });
        console.log(`  ✗ ${result.error.class}: ${result.error.message}`);
      }
    } catch (e) {
      failures.push({ slug: target.slug, url: target.url, errorClass: 'Unknown', message: e.message.slice(0, 200) });
      console.log(`  ✗ Unknown: ${e.message.slice(0, 100)}`);
    }
  }

  // Save font registry
  await writeFile(path.join(CURRENT, '_font-intercepts.json'), JSON.stringify({ files: fontIntercepts.files }, null, 2));

  // Update _crawl-log.json with results
  const crawlLog = JSON.parse(await readFile(path.join(CURRENT, '_crawl-log.json'), 'utf8'));
  crawlLog.site.extractedAt = new Date().toISOString();
  crawlLog.site.pageCap = null; // --pages bypasses cap
  crawlLog.site.crawled = successes.length;
  crawlLog.consent = { method: consentMethod, attempted: true };
  crawlLog.crawl.successes = successes;
  crawlLog.crawl.failures = failures;
  await writeFile(path.join(CURRENT, '_crawl-log.json'), JSON.stringify(crawlLog, null, 2));

  console.log('\nDone.');
  console.log(`  ${successes.length} successes, ${failures.length} failures`);
  console.log(`  ${fontIntercepts.files.length} font files intercepted`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
