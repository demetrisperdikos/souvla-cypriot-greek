// Repeatable measurements for BUILD-NOTES.md. Prints every value the notes cite.
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://127.0.0.1:8000/index.html';
const SIZES = [{ name: 'phone-390', width: 390, height: 844 }, { name: 'desktop-1440', width: 1440, height: 900 }];

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  let failed = false;
  for (const s of SIZES) {
    const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForSelector('.challenge-card', { timeout: 15000 });
    const m = await page.evaluate(() => {
      const r = (el) => el ? el.getBoundingClientRect() : null;
      const card = document.querySelector('.challenge-card');
      const strip = document.querySelector('.up-next.next-up');
      const cta = card ? card.querySelector('.btn:last-child') : null;
      const mark = document.querySelector('#brand svg');
      const cr = r(card), sr = r(strip), tr = r(cta), mr = r(mark);
      return {
        cardHeight: cr && Math.round(cr.height),
        stripHeight: sr && Math.round(sr.height),
        stripMinHeight: strip && getComputedStyle(strip).minHeight,
        ctaGapToCardEdge: cr && tr && Math.round(cr.bottom - tr.bottom),
        brandMarkWidth: mr && Math.round(mr.width),
        brandMarkHeight: mr && Math.round(mr.height),
        brandMarkCentreOffsetX: mr && Math.round((mr.left + mr.width / 2) - (window.innerWidth / 2 - 0)) ,
        hasWeekNote: !!document.querySelector('.week-note') && getComputedStyle(document.querySelector('.week-note')).display !== 'none',
        btnBackground: cta && getComputedStyle(cta).backgroundColor,
        btnRadius: cta && getComputedStyle(cta).borderRadius
      };
    });
    console.log(`[${s.name}]`);
    for (const [k, v] of Object.entries(m)) console.log(`  ${k}: ${v}`);
    const ok = m.stripHeight >= 72 && m.ctaGapToCardEdge === 17;
    console.log(`  checks: stripMin72=${m.stripHeight >= 72} cta17=${m.ctaGapToCardEdge === 17}`);
    if (!ok) failed = true;
    await page.close();
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
