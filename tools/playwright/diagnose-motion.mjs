#!/usr/bin/env node
// Motion diagnostic — scroll a prototype through key positions and report
// (a) elements with computed opacity < 0.05 that should be visible
// (b) sections whose motion treatments overlap unexpectedly
// (c) sections that look "stuck" (opacity 0 after the section should have settled)

import { chromium } from 'playwright';
import path from 'node:path';

const file = process.argv[2];
if (!file) { console.error('usage: diagnose-motion.mjs <html-path>'); process.exit(1); }
const url = 'file://' + path.resolve(process.cwd(), file);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('console.error: ' + m.text().slice(0, 200)); });

await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 });

// Helper to dump diagnostic at the current scroll position
async function diag(label, scrollY) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await page.waitForTimeout(500); // let rAF settle

  const report = await page.evaluate(() => {
    const sY = window.scrollY;
    const vh = window.innerHeight;
    function rectIntersectsViewport(r) {
      return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < window.innerWidth;
    }
    function isReasonablySized(r) {
      return r.width >= 80 && r.height >= 24;
    }

    // CHECK 1: elements with opacity < 0.05 inside the current viewport
    // — these should either be intentionally hidden (aria-hidden, display:none ancestor) or not in viewport
    const allEls = document.body.querySelectorAll('*');
    const hidden = [];
    for (const el of allEls) {
      const r = el.getBoundingClientRect();
      if (!rectIntersectsViewport(r) || !isReasonablySized(r)) continue;
      const cs = getComputedStyle(el);
      const op = parseFloat(cs.opacity);
      if (op >= 0.05) continue;
      // Skip elements with display:none ancestors (handled by getBoundingClientRect returning 0,0)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      // Skip aria-hidden purely-decorative
      if (el.getAttribute('aria-hidden') === 'true' && !el.textContent.trim()) continue;
      // Skip pseudoelement targets (::before/::after handled differently)
      const tag = el.tagName.toLowerCase();
      const hasText = el.textContent && el.textContent.trim().length > 0;
      const isImg = tag === 'img' || tag === 'svg' || tag === 'video' || tag === 'picture';
      if (!hasText && !isImg) continue;
      hidden.push({
        tag,
        classes: (el.className || '').toString().slice(0, 80),
        opacity: op,
        rect: { top: Math.round(r.top), height: Math.round(r.height), width: Math.round(r.width) },
        text: el.textContent.trim().slice(0, 60),
        ariaHidden: el.getAttribute('aria-hidden'),
        section: el.closest('[data-section]')?.dataset.section || el.closest('[data-component]')?.dataset.component || null,
      });
      if (hidden.length > 20) break;
    }

    // CHECK 2: section overlap — bounding rects of [data-section] elements
    // (sections shouldn't visually overlap unless designed to — e.g. sticky hero into rounded-top sibling)
    const sections = Array.from(document.querySelectorAll('[data-section], [data-component]'));
    const sectionRects = sections.map(s => ({
      key: s.dataset.section || s.dataset.component,
      top: s.getBoundingClientRect().top + window.scrollY,
      bottom: s.getBoundingClientRect().bottom + window.scrollY,
      height: s.getBoundingClientRect().height,
    }));
    // Find overlaps where bottom of one section > top of next + sticky-aware exception
    const overlaps = [];
    for (let i = 0; i < sectionRects.length - 1; i++) {
      const a = sectionRects[i];
      const b = sectionRects[i + 1];
      if (a.bottom > b.top + 1) {
        overlaps.push({ a: a.key, b: b.key, by: Math.round(a.bottom - b.top), aBottom: Math.round(a.bottom), bTop: Math.round(b.top) });
      }
    }

    // CHECK 3: in-viewport sections + their visible elements
    const visibleSections = sections.filter(s => {
      const r = s.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }).map(s => ({
      key: s.dataset.section || s.dataset.component,
      top: Math.round(s.getBoundingClientRect().top),
      bottom: Math.round(s.getBoundingClientRect().bottom),
      hasVisibleH: !!s.querySelector('h1, h2, h3, h4'),
    }));

    return { sY, vh, hidden, overlaps, visibleSections };
  });

  console.log(`\n=== ${label} (scrollY=${scrollY}) ===`);
  console.log(`  in-view sections: ${report.visibleSections.map(s => s.key).join(' · ')}`);
  if (report.hidden.length) {
    console.log(`  HIDDEN-IN-VIEWPORT (${report.hidden.length}):`);
    for (const h of report.hidden.slice(0, 10)) {
      console.log(`    [${h.section || '-'}] <${h.tag}.${h.classes}> op=${h.opacity.toFixed(2)} rect.top=${h.rect.top} h=${h.rect.height} text="${h.text}"`);
    }
  } else {
    console.log('  HIDDEN-IN-VIEWPORT: (none)');
  }
  if (report.overlaps.length) {
    console.log(`  SECTION OVERLAPS (${report.overlaps.length}):`);
    for (const o of report.overlaps) {
      console.log(`    ${o.a} bottom=${o.aBottom} → ${o.b} top=${o.bTop} (overlap by ${o.by}px)`);
    }
  }
  return report;
}

// Probe scroll positions: top, mid-hero, post-hero, stories, tutorial, featured, banner, news, footer
const heroH = await page.evaluate(() => document.querySelector('.ds-hero-scroll')?.offsetHeight || 0);
const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
const vh = await page.evaluate(() => window.innerHeight);

const probes = [
  ['top of page', 0],
  ['mid-hero (rawP ≈ 0.5)', Math.round(heroH * 0.5)],
  ['hero finished (rawP ≈ 1.0)', Math.round(heroH * 0.95)],
  ['stories visible', Math.round(heroH + 200)],
  ['mid-page', Math.round(totalH * 0.45)],
  ['featured/banner area', Math.round(totalH * 0.65)],
  ['news area', Math.round(totalH * 0.85)],
  ['footer', Math.round(totalH - vh)],
];

for (const [label, y] of probes) await diag(label, y);

if (errs.length) {
  console.log(`\nCONSOLE ERRORS (${errs.length}):`);
  errs.slice(0, 10).forEach(e => console.log('  ' + e));
}

await browser.close();
