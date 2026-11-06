const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:8095/index.html');
  const m = await p.evaluate(() => {
    const s = document.getElementById('lessons');
    const h = s.querySelector('h2'), sub = s.querySelector('.section-sub');
    const r = e => e ? e.getBoundingClientRect() : null;
    const prev = s.previousElementSibling.getBoundingClientRect();
    return { sectionTop: r(s).top + scrollY, h2Top: r(h).top + scrollY, subTop: sub ? r(sub).top + scrollY : null, subBottom: sub ? r(sub).bottom + scrollY : null, gapAboveSection: r(s).top - prev.bottom, sub: sub ? sub.textContent : null, fold: innerHeight };
  });
  console.log(JSON.stringify(m));
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
