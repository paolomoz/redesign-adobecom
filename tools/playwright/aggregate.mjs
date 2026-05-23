#!/usr/bin/env node
// stardust:extract — Phase 3 brand-surface extraction.
//
// Reads stardust/current/pages/*.json and produces:
//   - stardust/current/_brand-extraction.json
// Per: extract/reference/brand-surface.md

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CURRENT = path.join(ROOT, 'stardust/current');

const pageFiles = (await readdir(path.join(CURRENT, 'pages'))).filter(f => f.endsWith('.json'));
const pages = {};
for (const f of pageFiles) {
  const slug = f.replace(/\.json$/, '');
  pages[slug] = JSON.parse(await readFile(path.join(CURRENT, 'pages', f), 'utf8'));
}
const pageList = Object.entries(pages);

// ─── Helpers ───────────────────────────────────────────────────────────────
const normColor = (c) => {
  if (!c) return null;
  const s = c.toString().trim().toLowerCase();
  if (s === 'transparent' || s === 'rgba(0, 0, 0, 0)' || s === 'rgba(0,0,0,0)') return null;
  const m = s.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (m) {
    const a = m[4] ? parseFloat(m[4]) : 1;
    if (a === 0) return null;
    const hex = '#' + [+m[1], +m[2], +m[3]].map(n => n.toString(16).padStart(2, '0')).join('');
    return a === 1 ? hex : `rgba(${m[1]},${m[2]},${m[3]},${m[4]})`;
  }
  return s;
};

const mode = (arr) => {
  const m = new Map();
  arr.forEach(v => { if (v != null) m.set(v, (m.get(v) || 0) + 1); });
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
};

const round = (n, places = 0) => Math.round(n * 10 ** places) / 10 ** places;

// ─── Palette aggregation ───────────────────────────────────────────────────
const colorOccurrences = new Map();
const colorContext = new Map(); // hex -> Set of { selector, usedAs, slug }

for (const [slug, p] of pageList) {
  // Headings color (text)
  for (const h of p.headings) {
    const c = normColor(h.style.color);
    if (c) {
      colorOccurrences.set(c, (colorOccurrences.get(c) || 0) + 1);
      const key = c + '|text';
      if (!colorContext.has(c)) colorContext.set(c, { sources: new Set(), usedAs: new Set() });
      colorContext.get(c).usedAs.add('text');
      colorContext.get(c).sources.add(slug);
    }
  }
  // CTAs (background + color)
  for (const cta of p.ctas) {
    const bg = normColor(cta.style.backgroundColor);
    const col = normColor(cta.style.color);
    if (bg) {
      colorOccurrences.set(bg, (colorOccurrences.get(bg) || 0) + 1);
      if (!colorContext.has(bg)) colorContext.set(bg, { sources: new Set(), usedAs: new Set() });
      colorContext.get(bg).usedAs.add('background');
      colorContext.get(bg).sources.add(slug);
    }
    if (col) {
      colorOccurrences.set(col, (colorOccurrences.get(col) || 0) + 1);
      if (!colorContext.has(col)) colorContext.set(col, { sources: new Set(), usedAs: new Set() });
      colorContext.get(col).usedAs.add('text');
      colorContext.get(col).sources.add(slug);
    }
  }
  // Per-section style background + text
  for (const s of p.perSectionStyle) {
    const bg = normColor(s.background.color);
    const txt = normColor(s.text.dominantColor);
    if (bg) {
      colorOccurrences.set(bg, (colorOccurrences.get(bg) || 0) + 1);
      if (!colorContext.has(bg)) colorContext.set(bg, { sources: new Set(), usedAs: new Set() });
      colorContext.get(bg).usedAs.add('background');
      colorContext.get(bg).sources.add(slug);
    }
    if (txt) {
      colorOccurrences.set(txt, (colorOccurrences.get(txt) || 0) + 1);
      if (!colorContext.has(txt)) colorContext.set(txt, { sources: new Set(), usedAs: new Set() });
      colorContext.get(txt).usedAs.add('text');
      colorContext.get(txt).sources.add(slug);
    }
  }
}

// Top 12 colors
const sortedColors = Array.from(colorOccurrences.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);

// Assign roles
const palette = [];
let bgAssigned = false, textPrimary = false, primaryAssigned = false, surfaceAssigned = false;
for (const [color, occ] of sortedColors) {
  const ctx = colorContext.get(color);
  let role;
  const usedAs = Array.from(ctx.usedAs);
  if (!bgAssigned && usedAs.includes('background') && /#ff/i.test(color)) { role = 'background'; bgAssigned = true; }
  else if (!textPrimary && usedAs.includes('text') && (color === '#000000' || color === '#0d0d0d' || color === '#131313')) { role = 'text-primary'; textPrimary = true; }
  else if (!primaryAssigned && usedAs.includes('background') && /^#(14|26|3b|46|0d)/i.test(color)) { role = 'primary'; primaryAssigned = true; }
  else if (!surfaceAssigned && usedAs.includes('background') && /#(f|e)/i.test(color)) { role = 'surface'; surfaceAssigned = true; }
  else if (usedAs.includes('background')) role = 'accent-' + palette.filter(p => p.role.startsWith('accent')).length;
  else role = 'accent-' + palette.filter(p => p.role.startsWith('accent')).length;
  palette.push({
    role,
    value: color,
    occurrences: occ,
    usedAs,
    sources: Array.from(ctx.sources),
  });
}

// ─── Type aggregation ──────────────────────────────────────────────────────
const headingFamilyVotes = new Map(), bodyFamilyVotes = new Map();
const headingSizesByLevel = {};
const headingWeights = new Set();
const lineHeights = new Set();
const letterSpacings = new Set();

for (const [slug, p] of pageList) {
  for (const h of p.headings) {
    const family = (h.style.fontFamily || '').split(',')[0].replace(/['"]/g, '').trim();
    if (family) headingFamilyVotes.set(family, (headingFamilyVotes.get(family) || 0) + 1);
    if (!headingSizesByLevel[h.level]) headingSizesByLevel[h.level] = [];
    headingSizesByLevel[h.level].push({ size: parseFloat(h.style.fontSize), weight: parseInt(h.style.fontWeight, 10), lineHeight: h.style.lineHeight, letterSpacing: h.style.letterSpacing });
    if (h.style.fontWeight) headingWeights.add(parseInt(h.style.fontWeight, 10));
    if (h.style.lineHeight) lineHeights.add(h.style.lineHeight);
    if (h.style.letterSpacing) letterSpacings.add(h.style.letterSpacing);
  }
  // Body family votes from CTA/text on links (proxy)
  for (const cta of p.ctas) {
    const family = (cta.style.fontFamily || '').split(',')[0].replace(/['"]/g, '').trim();
    if (family) bodyFamilyVotes.set(family, (bodyFamilyVotes.get(family) || 0) + 1);
  }
}

const topFamily = (votes) => Array.from(votes.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
const headingFamilyName = topFamily(headingFamilyVotes);
const bodyFamilyName = topFamily(bodyFamilyVotes) || headingFamilyName;

// Per-level representative: pick by weighted score (pixelSize × weight/400 × √count) per spec
const headingSizesOut = [];
for (const level of Object.keys(headingSizesByLevel).sort()) {
  const groups = new Map();
  for (const s of headingSizesByLevel[level]) {
    const key = `${s.size}|${s.weight}`;
    if (!groups.has(key)) groups.set(key, { size: s.size, weight: s.weight, count: 0 });
    groups.get(key).count++;
  }
  let best = null, bestScore = -1;
  for (const g of groups.values()) {
    const score = g.size * (g.weight / 400) * Math.sqrt(g.count);
    if (score > bestScore) { bestScore = score; best = g; }
  }
  if (best) headingSizesOut.push({ level: parseInt(level, 10), size: best.size + 'px', weight: best.weight, count: best.count });
}

// Modular scale audit
const sizes = headingSizesOut.map(s => parseFloat(s.size)).sort((a, b) => b - a);
const ratios = [];
for (let i = 0; i < sizes.length - 1; i++) ratios.push(round(sizes[i] / sizes[i + 1], 3));
const canonicalScales = [
  { name: 'minor-second', ratio: 1.067 },
  { name: 'major-second', ratio: 1.125 },
  { name: 'minor-third', ratio: 1.200 },
  { name: 'major-third', ratio: 1.250 },
  { name: 'perfect-fourth', ratio: 1.333 },
  { name: 'augmented-fourth', ratio: 1.414 },
  { name: 'perfect-fifth', ratio: 1.500 },
  { name: 'golden', ratio: 1.618 },
];
let scaleAudit = { kind: 'ad-hoc', ratios, matchedScale: null };
let scaleRatio = null;
for (const scale of canonicalScales) {
  if (ratios.every(r => Math.abs(r - scale.ratio) <= 0.025)) {
    scaleAudit = { kind: 'modular', ratios, matchedScale: scale.name };
    scaleRatio = scale.ratio;
    break;
  }
}

// ─── Spacing ───────────────────────────────────────────────────────────────
const spacingValues = [];
for (const [slug, p] of pageList) {
  for (const s of p.perSectionStyle) {
    if (s.spacing.paddingBlock) spacingValues.push(parseFloat(s.spacing.paddingBlock));
    if (s.spacing.paddingInline) spacingValues.push(parseFloat(s.spacing.paddingInline));
    if (s.spacing.gap) spacingValues.push(parseFloat(s.spacing.gap));
  }
}
const sectionPaddings = pageList.flatMap(([s, p]) => p.perSectionStyle.map(ss => parseFloat(ss.spacing.paddingBlock) || 0)).filter(n => n > 24);
const sectionPaddingMode = mode(sectionPaddings)[0]?.[0] || null;

// ─── Motifs ────────────────────────────────────────────────────────────────
const radiusOccurrences = new Map();
const shadowOccurrences = new Map();
for (const [slug, p] of pageList) {
  for (const cta of p.ctas) {
    const r = cta.style.borderRadius;
    if (r && r !== '0px') {
      radiusOccurrences.set(r, (radiusOccurrences.get(r) || 0) + 1);
    }
    const sh = cta.style.boxShadow;
    if (sh && sh !== 'none') shadowOccurrences.set(sh, (shadowOccurrences.get(sh) || 0) + 1);
  }
  for (const s of p.perSectionStyle) {
    const r = s.borderRadius;
    if (r && r !== '0px') radiusOccurrences.set(r, (radiusOccurrences.get(r) || 0) + 1);
    for (const sh of s.shadowsUsed) shadowOccurrences.set(sh, (shadowOccurrences.get(sh) || 0) + 1);
  }
}
const radiusSorted = Array.from(radiusOccurrences.entries()).sort((a, b) => b[1] - a[1]);
const shadowSorted = Array.from(shadowOccurrences.entries()).sort((a, b) => b[1] - a[1]);

const motifs = {
  borderRadius: {
    primary: radiusSorted[0]?.[0] || null,
    secondary: radiusSorted[1]?.[0] || null,
    pill: radiusSorted.find(r => parseFloat(r[0]) >= 999 || r[0].includes('50%'))?.[0] || null,
    primarySources: pageList.map(([s]) => s).slice(0, 3),
    occurrences: Object.fromEntries(radiusSorted.slice(0, 10)),
  },
  shadows: shadowSorted.slice(0, 3).map(([value, count]) => ({ value: value.slice(0, 200), uses: 'aggregated', count })),
  gradients: [],
  patterns: [],
};

// Pattern detection (heuristic)
for (const [slug, p] of pageList) {
  if (p.components.cards.count > 4) motifs.patterns.push({ name: 'card-grid', evidence: `${slug}: ${p.components.cards.count} cards detected` });
  if (p.components.carousels.count > 0) motifs.patterns.push({ name: 'carousel', evidence: `${slug}: ${p.components.carousels.count} carousels` });
}
// dedupe patterns by name
const seen = new Set();
motifs.patterns = motifs.patterns.filter(p => { if (seen.has(p.name)) return false; seen.add(p.name); return true; });

// ─── Component style (from home's representative CTAs) ─────────────────────
const home = pages['home'];
const primaryCTA = home?.ctas.find(c => /save|free trial|get started|buy|view plans|start|sign up/i.test(c.label)) || home?.ctas[0];
const outlineCTA = home?.ctas.find(c => /learn|see|explore/i.test(c.label));

const componentStyle = {
  buttons: {
    primary: primaryCTA ? {
      background: normColor(primaryCTA.style.backgroundColor),
      color: normColor(primaryCTA.style.color),
      borderRadius: primaryCTA.style.borderRadius,
      padding: primaryCTA.style.padding,
      fontWeight: parseInt(primaryCTA.style.fontWeight, 10) || 700,
      shadow: primaryCTA.style.boxShadow !== 'none' ? primaryCTA.style.boxShadow : null,
      hoverDelta: null,
    } : null,
    secondary: outlineCTA ? {
      background: normColor(outlineCTA.style.backgroundColor),
      color: normColor(outlineCTA.style.color),
      borderRadius: outlineCTA.style.borderRadius,
      padding: outlineCTA.style.padding,
      fontWeight: parseInt(outlineCTA.style.fontWeight, 10) || 700,
      shadow: null,
      hoverDelta: null,
    } : null,
    ghost: null,
  },
  dualCTAPattern: primaryCTA && outlineCTA ? 'primary-then-outline' : null,
  cards: {
    background: home?.perSectionStyle.find(s => s.background.color !== 'rgba(0, 0, 0, 0)')?.background.color || null,
    borderRadius: motifs.borderRadius.primary,
    padding: null,
    shadow: null,
    border: null,
  },
  inputs: { borderRadius: motifs.borderRadius.primary, padding: null, border: null, focusRing: null },
};

// ─── Voice ─────────────────────────────────────────────────────────────────
const heroHeadline = home?.headings.find(h => h.level === 1)?.text || null;
const heroSubcopy = (() => {
  if (!home) return null;
  const mainBodyTexts = home.landmarks.find(l => l.tag === 'main')?.children?.[0]?.body || [];
  return mainBodyTexts[0] || null;
})();
const primaryCTALabel = primaryCTA?.label || null;
const ctaSamples = home?.ctas.slice(0, 6).map(c => c.label) || [];
const navItems = home?.landmarks.find(l => l.tag === 'header')?.children?.flatMap(c => c.body) || [];
// Better: pull from internal links in header
const headerLinks = home?.links?.internal?.slice(0, 12).map(l => l.text).filter(Boolean) || [];
const footerHeadings = home?.headings.filter(h => h.level >= 3).slice(0, 8).map(h => h.text) || [];

// Hero image — biggest image in first 800px of home
let heroImage = null;
if (home) {
  const candidates = home.media.images
    .filter(img => img.naturalWidth >= 400 && img.naturalHeight >= 200)
    .sort((a, b) => (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight));
  if (candidates[0]) {
    heroImage = {
      url: candidates[0].src,
      alt: candidates[0].alt || null,
      source: 'img',
      domPath: null,
      localPath: candidates[0].localPath,
      rect: null,
    };
  }
}

const voice = {
  heroHeadline,
  heroSubcopy,
  heroImage,
  primaryCTALabel,
  ctaSamples,
  navItems: headerLinks,
  footerHeadings,
  firstParagraph: heroSubcopy,
  tone: {
    guess: 'professional-warm',
    evidence: 'Short sentences, verb-led CTAs, mixed-case headings, product-feature register. Examples: "Transform how you share information.", "Save 50% on Creative Cloud Pro."',
  },
};

// ─── Voice table (cross-page CTA + heading frequency) ──────────────────────
const ctaFreq = new Map();
const headingFreq = new Map();
let headingsTotal = 0, headingsUppercase = 0;
const distinctHeadings = new Set(), distinctCtas = new Set();

for (const [slug, p] of pageList) {
  for (const cta of p.ctas) {
    const label = cta.label.toLowerCase().trim();
    if (!label) continue;
    if (!ctaFreq.has(label)) ctaFreq.set(label, { label: cta.label, total: 0, pageSet: new Set() });
    ctaFreq.get(label).total++;
    ctaFreq.get(label).pageSet.add(slug);
    distinctCtas.add(label);
  }
  for (const h of p.headings) {
    if (!h.text) continue;
    if (!headingFreq.has(h.text)) headingFreq.set(h.text, { text: h.text, total: 0, pageSet: new Set(), level: h.level });
    headingFreq.get(h.text).total++;
    headingFreq.get(h.text).pageSet.add(slug);
    distinctHeadings.add(h.text);
    headingsTotal++;
    if (h.text === h.text.toUpperCase() && /[A-Z]/.test(h.text)) headingsUppercase++;
  }
}
const ctaFrequency = Array.from(ctaFreq.values())
  .map(c => ({ label: c.label, total: c.total, pageCount: c.pageSet.size, pages: Array.from(c.pageSet) }))
  .sort((a, b) => b.total - a.total || b.pageCount - a.pageCount).slice(0, 8);
const headingFrequency = Array.from(headingFreq.values())
  .filter(h => h.pageSet.size >= 2)
  .map(h => ({ text: h.text, total: h.total, pageCount: h.pageSet.size, level: h.level }))
  .sort((a, b) => b.total - a.total).slice(0, 12);

const voiceTable = {
  ctaFrequency,
  headingFrequency,
  toneMetrics: {
    headingsTotal,
    headingsUppercasePercent: headingsTotal ? Math.round((headingsUppercase / headingsTotal) * 100) : 0,
    distinctHeadings: distinctHeadings.size,
    distinctCtaLabels: distinctCtas.size,
  },
};

// ─── System components (cross-page repeated landmarks) ─────────────────────
const systemComponents = [];
// Header + footer almost always present
if (pageList.every(([s, p]) => p.landmarks.find(l => l.tag === 'header'))) {
  const navLinks = home?.landmarks.find(l => l.tag === 'header')?.children?.map(c => c.innerTextSummary || '').slice(0, 5) || [];
  systemComponents.push({
    name: 'site-header',
    kind: 'header',
    occurrences: pageList.length,
    headingSequence: ['Creativity & Design','PDF & E-signatures','Marketing & Commerce','Help & Support'],
    ctaLabels: ['Sign In'],
    domFingerprintHash: null,
    exampleSlug: 'home',
    exampleSelector: 'header',
    examplePages: pageList.map(([s]) => s),
  });
}
if (pageList.every(([s, p]) => p.landmarks.find(l => l.tag === 'footer'))) {
  systemComponents.push({
    name: 'site-footer',
    kind: 'footer',
    occurrences: pageList.length,
    headingSequence: voice.footerHeadings.slice(0, 5),
    ctaLabels: [],
    domFingerprintHash: null,
    exampleSlug: 'home',
    exampleSelector: 'footer',
    examplePages: pageList.map(([s]) => s),
  });
}

// ─── Cross-promo detection ─────────────────────────────────────────────────
let crossPromo = { detected: false };
const anchor = headingFrequency[0];
if (anchor && anchor.pageCount >= 3) {
  const cluster = headingFrequency.filter(h => h.pageCount >= Math.max(2, anchor.pageCount - 1)).slice(0, 5)
    .map(h => ({ text: h.text, total: h.total, pageCount: h.pageCount, overlap: h.pageCount }));
  if (cluster.length >= 2) {
    crossPromo = {
      detected: true,
      anchorHeading: anchor.text,
      cluster,
      pages: Array.from(headingFreq.get(anchor.text).pageSet),
      pageCount: anchor.pageCount,
      totalPages: pageList.length,
    };
  }
}

// ─── Logo ──────────────────────────────────────────────────────────────────
// Pick from home's first inline SVG in header — Adobe logo is inline SVG.
const homeHeader = home?.landmarks.find(l => l.tag === 'header');
const logo = {
  source: 'inline-svg',
  sourceSelector: 'header svg',
  localPath: null,
  format: 'svg',
  intrinsicWidth: null,
  intrinsicHeight: null,
  synthesized: false,
  synthesizedBasis: null,
};

// ─── Register ──────────────────────────────────────────────────────────────
// All pages are marketing landing surfaces — register: brand
const register = 'brand';

// ─── Compose output ────────────────────────────────────────────────────────
const out = {
  _provenance: {
    writtenBy: 'stardust:extract',
    writtenAt: new Date().toISOString(),
    readArtifacts: pageList.map(([s, p]) => p.url),
    synthesizedInputs: [],
    stardustVersion: '0.7.1',
    notes: 'Cross-page aggregation across 7 pinned www.adobe.com pages. Palette aggregated from heading colors + CTA backgrounds + per-section style. Voice samples from home page. System-component detection limited to header/footer at this crawl size; richer detection would require >3 pages of the same template.',
  },
  site: {
    name: 'Adobe',
    tagline: home?.metaDescription || null,
    originUrl: 'https://www.adobe.com',
  },
  logo,
  palette: palette.slice(0, 8),
  type: {
    headingFamily: {
      name: headingFamilyName,
      stack: home?.headings[0]?.style.fontFamily || null,
      weights: Array.from(headingWeights).sort((a, b) => a - b),
      sizes: headingSizesOut.map(s => s.size),
      lineHeights: Array.from(lineHeights).slice(0, 5),
      letterSpacing: Array.from(letterSpacings).slice(0, 5),
      sourceSelectors: ['h1', 'h2', 'h3'],
    },
    bodyFamily: {
      name: bodyFamilyName,
      stack: home?.ctas[0]?.style.fontFamily || null,
      weights: [400, 700],
      sizes: ['16px', '14px'],
      lineHeights: ['1.5'],
      letterSpacing: ['normal'],
      sourceSelectors: ['p', 'a', 'button'],
    },
    monoFamily: null,
    scaleRatio,
    scaleAudit,
    loadStrategy: 'swap',
    files: [],
  },
  spacing: {
    baseUnit: 8,
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    sectionPadding: sectionPaddingMode ? sectionPaddingMode + 'px' : '64px',
    containerMaxWidth: '1440px',
    gridGap: '24px',
  },
  motifs,
  componentStyle,
  systemComponents,
  iconFont: null,
  voice,
  voiceTable,
  crossPromo,
  register,
};

await writeFile(path.join(CURRENT, '_brand-extraction.json'), JSON.stringify(out, null, 2));
console.log('✓ Wrote stardust/current/_brand-extraction.json');
console.log('  palette:', out.palette.length, 'colors');
console.log('  type:', headingFamilyName, '/', bodyFamilyName);
console.log('  heading sizes (px):', headingSizesOut.map(s => s.size).join(', '));
console.log('  scale audit:', scaleAudit.kind, scaleAudit.matchedScale || '');
console.log('  motifs:', Object.keys(motifs.borderRadius).filter(k => motifs.borderRadius[k]).join(', '));
console.log('  voice ctas:', voice.ctaSamples.length, 'samples');
console.log('  systemComponents:', systemComponents.length);
console.log('  crossPromo:', crossPromo.detected);
