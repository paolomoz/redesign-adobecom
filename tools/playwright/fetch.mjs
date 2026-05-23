#!/usr/bin/env node
// Fetch a URL via headless Chromium, save the rendered HTML + a full-page
// desktop screenshot. Captures console + network failures to a sibling .log.
//
// Adobe-properties workaround: Chromium's browser navigation hits
// ERR_HTTP2_PROTOCOL_ERROR against Adobe's Akamai edge for some endpoints.
// We bypass it by routing every adobe.com request through Playwright's
// `request` API (its own HTTP client), then fulfilling the browser request
// with the response. This applies to the main document AND every adobe.com
// subresource (scripts.js, milo blocks, fonts, images, etc.) — without this
// the page renders blank because the main JS bundle never loads.
//
// Usage:
//   node tools/playwright/fetch.mjs <url> <outDir> [--label=<slug>]

import { chromium, request as apiRequest } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args[0];
const outDir = args[1];
const labelArg = args.find(a => a.startsWith('--label='));
const label = labelArg ? labelArg.split('=')[1] : new URL(url).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'page';

if (!url || !outDir) {
  console.error('Usage: node tools/playwright/fetch.mjs <url> <outDir> [--label=<slug>]');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
});
const page = await ctx.newPage();

// HTTP/2-bypass route: hand every adobe.com request to the request API.
const apiCtx = await apiRequest.newContext();
const bypassErrors = [];
await page.route(u => {
  try {
    const host = (u instanceof URL ? u : new URL(u)).hostname;
    return /(^|\.)adobe\.(com|io)$/.test(host);
  } catch { return false; }
}, async (route, req) => {
  try {
    // Don't forward browser headers — they cause Akamai to hang on the main
    // document for reasons we don't fully understand. The API client supplies
    // its own default headers; that's the one combination empirically known
    // to work against Adobe's Akamai edge.
    const r = await apiCtx.fetch(req.url(), {
      method: req.method(),
      data: req.postDataBuffer() || undefined,
      maxRedirects: 5,
      timeout: 20_000,
    });
    const respHeaders = r.headers();
    delete respHeaders['content-encoding'];
    delete respHeaders['content-length'];
    delete respHeaders['transfer-encoding'];
    await route.fulfill({ status: r.status(), headers: respHeaders, body: await r.body() });
  } catch (e) {
    bypassErrors.push(`${req.url()} → ${e.message.slice(0, 120)}`);
    await route.abort();
  }
});

const consoleMessages = [];
const networkFails = [];
page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => consoleMessages.push(`[pageerror] ${err.message}`));
page.on('requestfailed', req => networkFails.push(`${req.failure()?.errorText || 'fail'} ${req.url()}`));
page.on('response', r => { if (r.status() >= 400) networkFails.push(`${r.status()} ${r.url()}`); });

console.log(`→ Loading ${url}`);
try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
} catch (e) {
  console.error(`goto failed: ${e.message.slice(0, 200)}`);
  console.error(`bypass errors (${bypassErrors.length}):`);
  for (const m of bypassErrors.slice(0, 10)) console.error(`  ${m}`);
  await apiCtx.dispose();
  await browser.close();
  process.exit(1);
}
await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
// Settle any post-networkidle animations / lazy-loads
await page.waitForTimeout(2500);

const html = await page.content();
const htmlPath = path.join(outDir, `${label}.html`);
const screenshotPath = path.join(outDir, `${label}.png`);
const logPath = path.join(outDir, `${label}.log`);

await writeFile(htmlPath, html);
await page.screenshot({ path: screenshotPath, fullPage: true });
await writeFile(logPath, [
  `URL: ${url}`,
  `Final URL: ${page.url()}`,
  `Title: ${await page.title()}`,
  `Viewport: 1440x900 @2x`,
  `Console (${consoleMessages.length}):`,
  ...consoleMessages.map(m => `  ${m}`),
  `Network failures (${networkFails.length}):`,
  ...networkFails.map(m => `  ${m}`),
  `Bypass errors (${bypassErrors.length}):`,
  ...bypassErrors.slice(0, 30).map(m => `  ${m}`),
].join('\n'));

console.log(`✓ html        ${htmlPath}`);
console.log(`✓ screenshot  ${screenshotPath}`);
console.log(`✓ log         ${logPath}  (${consoleMessages.length} console, ${networkFails.length} network fails)`);

await apiCtx.dispose();
await browser.close();
