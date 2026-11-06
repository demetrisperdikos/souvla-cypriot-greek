const { chromium } = require('playwright');
const base = process.env.BASE;
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const [w, h, tag] of [[390, 844, '390'], [1440, 900, '1440']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(base);
    await page.waitForTimeout(400);
    out[tag] = await page.evaluate(() => {
      const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
      const stats = [...document.querySelectorAll('.stat')].map(e => Math.round(e.getBoundingClientRect().y));
      const btns = [...document.querySelectorAll('.btn')].map(e => Math.round(e.getBoundingClientRect().height));
      const dots = [...document.querySelectorAll('.dot')].length;
      return { heroArt: r('.hero-art'), heroH1: r('.hero h1'), ctaBottom: Math.round((document.querySelector('.hero .btn-primary')||{getBoundingClientRect:()=>({bottom:0})}).getBoundingClientRect().bottom), statRowYs: stats, buttonMinH: Math.min(...btns), dotCount: dots, scrollW: document.documentElement.scrollWidth };
    });
    await page.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
