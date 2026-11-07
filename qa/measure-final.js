const { chromium } = require('playwright');
const fs = require('fs');
const BASE = process.env.BASE || 'http://127.0.0.1:8791/index.html';
const OUT = 'qa-shots';
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const out = {};
  for (const [name, w, h] of [['desktop', 1440, 900], ['phone', 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto(BASE);
    await p.waitForSelector('h1.display');
    await p.waitForTimeout(400);
    out[name] = await p.evaluate(() => {
      const R = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) }; };
      return {
        viewport: innerWidth + 'x' + innerHeight,
        eyebrow: R('.eyebrow'), h1: R('h1.display'), hero: R('.hero-art'),
        primaryButtons: [...document.querySelectorAll('.btn.primary')].map(e => { const r = e.getBoundingClientRect(); return { text: e.textContent.trim().slice(0, 28), top: Math.round(r.top), bottom: Math.round(r.bottom) }; }),
        cards: [...document.querySelectorAll('.card')].map(e => { const r = e.getBoundingClientRect(); return { title: ((e.querySelector('h2,h3') || {}).textContent || '').trim(), top: Math.round(r.top), bottom: Math.round(r.bottom) }; }),
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth
      };
    });
    out[name].pageErrors = errs.length;
    await p.locator('h1.display').screenshot({ path: `${OUT}/${name}-headline.png` });
    await p.locator('.hero-art').screenshot({ path: `${OUT}/${name}-hero.png` });
    await p.locator('.card-head').nth(0).screenshot({ path: `${OUT}/${name}-card-head-souvla-test.png` });
    await p.locator('.card-head').nth(1).screenshot({ path: `${OUT}/${name}-card-head-daily.png` });
    await p.locator('.mark').first().screenshot({ path: `${OUT}/${name}-brand-mark.png` });
    if (await p.locator('.week').count()) await p.locator('.week').first().screenshot({ path: `${OUT}/${name}-week-chips.png` });
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(`${OUT}/measure.json`, JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
})().catch(e => { console.error('MEASURE_FAIL', e); process.exit(1); });
