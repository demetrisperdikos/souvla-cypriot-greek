const { chromium } = require('../qa/node_modules/playwright');
(async () => {
  const base = process.env.BASE;
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const row = document.querySelector('.feature-row');
    const cards = [...document.querySelectorAll('.feature-row > .card')];
    return {
      rowDisplay: row ? getComputedStyle(row).display : 'missing',
      cards: cards.map(c => {
        const b = c.querySelector('.btn:last-child') || c.querySelector('.btn');
        const cr = c.getBoundingClientRect();
        const br = b ? b.getBoundingClientRect() : null;
        return { cls: c.className, cardTop: Math.round(cr.top), cardBottom: Math.round(cr.bottom), cardH: Math.round(cr.height), btnText: b ? b.textContent.trim() : null, btnTop: br ? Math.round(br.top) : null, btnBottom: br ? Math.round(br.bottom) : null, display: getComputedStyle(c).display, btnMarginTop: b ? getComputedStyle(b).marginTop : null };
      })
    };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
