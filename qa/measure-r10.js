const { chromium } = require('playwright');
const fs = require('fs');
const BASE = process.env.BASE;
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const out = {};
  const runs = [['desktop', 1440, 900, 1], ['phone', 390, 844, 1], ['desktop2x', 1440, 900, 2], ['phone2x', 390, 844, 2]];
  for (const [name, w, h, dpr] of runs) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    out[name] = await page.evaluate(() => {
      const box = (e) => e ? e.getBoundingClientRect() : null;
      const h1 = document.querySelector('h1.display');
      const strip = document.querySelector('.up-next.next-up');
      const card = document.querySelector('.challenge-card');
      const cta = card && card.querySelector('.btn:last-child');
      const tile = document.querySelector('.tile');
      const ts = tile && getComputedStyle(tile);
      const mark = document.querySelector('#brand svg, .brand svg, .mark svg');
      const sb = box(strip), cb = box(card), kb = box(cta), fb = box(document.querySelector('footer.foot'));
      return {
        h1Font: h1 && getComputedStyle(h1).fontSize,
        stripH: sb && Math.round(sb.height),
        stripToCardBottom: sb && cb && Math.round(cb.bottom - sb.bottom),
        ctaToCardBottom: kb && cb && Math.round(cb.bottom - kb.bottom),
        cardHeights: [...document.querySelectorAll('.challenge-card, .feature-row > .card')].map(e => Math.round(e.getBoundingClientRect().height)),
        tileBorder: ts && (ts.borderTopWidth + ' ' + ts.borderTopColor),
        tileSize: tile && Math.round(box(tile).width),
        brandMarkSize: mark && Math.round(box(mark).width),
        pageHeight: document.documentElement.scrollHeight,
        footerBottom: fb && Math.round(fb.bottom)
      };
    });
    if (dpr === 2) { const t = await page.$('.tile'); if (t) await t.screenshot({ path: 'qa/tile-2x.png' }); }
    if (name === 'phone') await page.screenshot({ path: 'qa/phone-full.png', fullPage: true });
    if (name === 'desktop') { const hh = await page.$('.hero-art'); if (hh) await hh.screenshot({ path: 'qa/hero-desktop.png' }); const bm = await page.$('.mark, .brand'); if (bm) await bm.screenshot({ path: 'qa/brand-48.png' }); }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync('qa/measure-r10.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
})().catch(e => { console.error('MEASURE_FAILED', e); process.exit(1); });
