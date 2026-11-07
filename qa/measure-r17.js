const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(process.env.BASE);
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
      const top = e => (e ? Math.round(e.getBoundingClientRect().top + scrollY) : null);
      const bottom = e => (e ? Math.round(e.getBoundingClientRect().bottom + scrollY) : null);
      const cta = [...document.querySelectorAll('a,button')].find(e => /Start diagnosis/.test(e.textContent));
      const cards = [...document.querySelectorAll('.card')];
      const diag = cards.find(c => /Souvla Test/.test(c.textContent)) || cards[0];
      const daily = cards.find(c => /Daily challenge/.test(c.textContent)) || cards[1];
      return { ctaBottom: bottom(cta), diagnosisCardTop: top(diag), dailyCardTop: top(daily), docHeight: document.documentElement.scrollHeight };
    });
    console.log(w + 'x' + h, JSON.stringify(r));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
