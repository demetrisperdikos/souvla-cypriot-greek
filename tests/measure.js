// Repeatable measurements for BUILD-NOTES.md. Brand mark is measured against its header box.
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://127.0.0.1:8000/index.html';
const SIZES = [
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'desktop-1440', width: 1440, height: 900 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  for (const s of SIZES) {
    const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForSelector('.challenge-card', { state: 'attached', timeout: 30000 }); await page.waitForTimeout(800);
    const m = await page.evaluate(() => {
      const box = (el) => (el ? el.getBoundingClientRect() : null);
      const card = document.querySelector('.challenge-card');
      const strip = document.querySelector('.up-next.next-up');
      const cta = card ? card.querySelector('.btn:last-child') : null;
      const mark = document.querySelector('#brand svg');
      const header = mark ? (mark.closest('header') || mark.parentElement.parentElement) : null;
      const cr = box(card), sr = box(strip), tr = box(cta), mr = box(mark), hr = box(header);
      const note = document.querySelector('.week-note');
      return {
        cardHeight: cr && Math.round(cr.height),
        stripHeight: sr && Math.round(sr.height),
        ctaGapToCardEdge: cr && tr && Math.round(cr.bottom - tr.bottom),
        brandMarkWidth: mr && Math.round(mr.width),
        brandMarkHeight: mr && Math.round(mr.height),
        headerHeight: hr && Math.round(hr.height),
        brandMarkCentreYOffsetFromHeader: mr && hr && Math.round((mr.top + mr.height / 2) - (hr.top + hr.height / 2)),
        brandMarkCentreXOffsetFromHeader: mr && hr && Math.round((mr.left + mr.width / 2) - (hr.left + hr.width / 2)),
        hasWeekNote: !!note && getComputedStyle(note).display !== 'none',
        btnBackground: cta && getComputedStyle(cta).backgroundColor
      };
    });
    console.log(s.name, JSON.stringify(m));
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
