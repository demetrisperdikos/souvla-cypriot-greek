const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://127.0.0.1:8800/index.html', { waitUntil: 'networkidle0' });
  const out = await p.evaluate(() => {
    const card = document.querySelector('.challenge-card');
    const cs = getComputedStyle(card);
    return {
      cardH: card.getBoundingClientRect().height,
      display: cs.display, gap: cs.rowGap, padding: cs.padding, height: cs.height, alignSelf: cs.alignSelf,
      children: [...card.children].map(c => { const s = getComputedStyle(c); return c.tagName + '.' + c.className + ' h=' + Math.round(c.getBoundingClientRect().height) + ' flex=' + s.flex + ' margin=' + s.margin; })
    };
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error('PROBE ERROR', e.message); process.exit(1); });
