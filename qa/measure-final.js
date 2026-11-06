const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE, { waitUntil: 'load' });
  const r = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('.feature-row .card')].map(c => {
      const btn = c.querySelector('.btn');
      const cr = c.getBoundingClientRect();
      const br = btn ? btn.getBoundingClientRect() : null;
      return { title: c.querySelector('h2') && c.querySelector('h2').textContent, bottom: Math.round(cr.bottom), height: Math.round(cr.height), btnBottom: br ? Math.round(br.bottom) : null };
    });
    return cards;
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.error('MEASURE_ERR', e.message); process.exit(1); });
