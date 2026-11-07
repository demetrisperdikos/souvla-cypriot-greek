const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base, { waitUntil: 'networkidle' });
    out[w] = await p.evaluate(() => {
      const r = (s) => { const e = document.querySelector(s); if (!e) return null; const x = e.getBoundingClientRect(); return { top: Math.round(x.top), bottom: Math.round(x.bottom), h: Math.round(x.height) }; };
      const card = document.querySelector('.challenge-card');
      const cb = card && card.getBoundingClientRect().bottom;
      const strip = document.querySelector('.challenge-card .next-up');
      const cta = card && card.querySelector(':scope > .btn');
      const hint = document.querySelector('.week-hint');
      const week = document.querySelector('.challenge-card .week');
      return {
        cardBottom: Math.round(cb),
        strip: strip && { top: Math.round(strip.getBoundingClientRect().top), bottom: Math.round(strip.getBoundingClientRect().bottom), h: Math.round(strip.getBoundingClientRect().height) },
        stripToCardBottom: strip ? Math.round(cb - strip.getBoundingClientRect().bottom) : null,
        ctaBottomToCard: cta ? Math.round(cb - cta.getBoundingClientRect().bottom) : null,
        weekBottom: week ? Math.round(week.getBoundingClientRect().bottom) : null,
        hintTop: hint ? Math.round(hint.getBoundingClientRect().top) : null,
        hintLeft: hint ? Math.round(hint.getBoundingClientRect().left) : null,
        weekLeft: week ? Math.round(week.getBoundingClientRect().left) : null,
        hintText: hint ? hint.textContent : null,
        emptyIconSvg: !!document.querySelector('.err-ic') && document.querySelector('.err-ic').tagName,
        titleWeight: getComputedStyle(document.querySelector('.card-head h2')).fontWeight,
        duplicates: [...document.styleSheets].length
      };
    });
    await p.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
