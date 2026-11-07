const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
let chromium;
try { chromium = require('playwright').chromium; } catch (e) { chromium = require('playwright-core').chromium; }
const BASE = process.env.BASE || 'http://127.0.0.1:8765/';
const OUT = path.join(__dirname, '..', 'measure18');
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const res = {};
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  res.headline = await page.$eval('h1', e => { const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, height: r.height, fontSize: getComputedStyle(e).fontSize }; });
  res.cardRow = await page.evaluate(() => { const c = document.querySelector('.test-card, .card'); const r = c.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, height: r.height }; });
  res.heroArt = await page.$eval('.hero-art', e => { const r = e.getBoundingClientRect(); const s = e.querySelector('svg').getBoundingClientRect(); return { panelW: r.width, panelH: r.height, svgW: s.width, svgH: s.height, svgCoversW: Math.round(s.width / r.width * 100), svgCoversH: Math.round(s.height / r.height * 100) }; });
  res.ctaCheck = await page.evaluate(() => { const b = [...document.querySelectorAll('.btn.primary')].map(x => { const r = x.getBoundingClientRect(); return { text: x.textContent.trim().slice(0, 30), h: Math.round(r.height), bg: getComputedStyle(x).backgroundColor }; }); return b; });
  res.dayTabSelected = await page.evaluate(() => { const d = document.querySelector('.day.is-selected'); if (!d) return null; const r = d.getBoundingClientRect(); return { w: r.width, h: r.height, shadow: getComputedStyle(d).boxShadow }; });
  res.iconTile = await page.evaluate(() => [...document.querySelectorAll('.card svg, .test-card svg')].slice(0, 2).map(s => { const r = s.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; }));
  res.stats = await page.evaluate(() => [...document.querySelectorAll('.stat')].map(s => { const r = s.getBoundingClientRect(); const l = s.querySelector('.stat-label'); const lr = l ? l.getBoundingClientRect() : null; return { text: s.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), labelVisible: !!lr && lr.width > 0 && lr.height > 0 }; }));
  await page.screenshot({ path: path.join(OUT, 'desktop-1440.png'), fullPage: false });
  const mark = await page.$eval('.souvla-mark-svg', e => e.outerHTML);
  for (const size of [16, 24, 48]) {
    const p = await browser.newPage({ viewport: { width: size + 20, height: size + 20 }, deviceScaleFactor: 1 });
    const html = mark.replace(/width='48' height='48'|width="48" height="48"/, 'width="' + size + '" height="' + size + '"');
    await p.setContent('<body style="margin:10px;background:#fff">' + html + '</body>');
    await p.screenshot({ path: path.join(OUT, 'brand-' + size + '.png'), clip: { x: 0, y: 0, width: size + 20, height: size + 20 } });
    await p.close();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  res.phoneChip = await page.evaluate(() => { const c = document.querySelector('.hero-chip').getBoundingClientRect(); const s = document.querySelector('.hero-art svg').getBoundingClientRect(); return { chipBottom: Math.round(c.bottom), artTop: Math.round(s.top), gap: Math.round(s.top - c.bottom) }; });
  await page.screenshot({ path: path.join(OUT, 'phone-390.png'), fullPage: false });
  await browser.close();
  console.log(JSON.stringify(res, null, 1));
})().catch(e => { console.error('ROUND18_FAIL', e.message); process.exit(1); });
