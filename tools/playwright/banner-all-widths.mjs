import { chromium } from 'playwright';
const url = 'file:///Users/paolo/stardust/redesign-adobecom/stardust/prototypes/home-B3-proposed.html';
const out = '/Users/paolo/stardust/redesign-adobecom/stardust/validation/home-B3';

for (const [vw, vh, label] of [[390, 844, 'mobile'], [768, 1024, 'tablet'], [1440, 900, 'desktop']]) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  // Scroll progressively to trigger lazy-load + scroll-driven layouts, then find banner center
  for (let s = 0; s < 8000; s += 600) {
    await page.evaluate((y) => window.scrollTo(0, y), s);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(300);
  // Read banner in-flow position from offsetTop chain
  const inFlowTop = await page.evaluate(() => {
    const b = document.querySelector('.ds-banner');
    let t = 0, el = b;
    while (el) { t += el.offsetTop; el = el.offsetParent; }
    return t;
  });
  const bestSy = Math.max(0, Math.round(inFlowTop - (vh - 720) / 2));
  await page.evaluate((y) => window.scrollTo(0, y), bestSy);
  await page.waitForTimeout(500);

  const visible = await page.evaluate(() => {
    const e = document.querySelector('.ds-banner__eyebrow');
    const t = document.querySelector('.ds-banner__title');
    const er = e.getBoundingClientRect();
    const tr = t.getBoundingClientRect();
    return { e: er.top > 0 && er.bottom < window.innerHeight, t: tr.top > 0 && tr.bottom < window.innerHeight, eTop: Math.round(er.top), tTop: Math.round(tr.top), tBot: Math.round(tr.bottom) };
  });
  console.log(`[${label} ${vw}×${vh}] sY=${bestSy} | eyebrow visible=${visible.e} (y=${visible.eTop}) | title visible=${visible.t} (y=${visible.tTop}-${visible.tBot})`);

  await page.screenshot({ path: `${out}/fix-banner-${label}.png` });
  await browser.close();
}
