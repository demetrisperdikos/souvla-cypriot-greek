const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p.goto('http://127.0.0.1:8800/index.html', { waitUntil: 'networkidle0' });
  const out = await p.evaluate(() => {
    const pills = [...document.querySelectorAll('.stat')].map(s => {
      const v = s.querySelector('.stat-val'); const cs = getComputedStyle(v);
      return { text: s.textContent.trim(), valueColor: cs.color, valueWeight: cs.fontWeight };
    });
    const icons = [...document.querySelectorAll('.streak-preview svg, .challenge-card .streak-ico')].slice(0, 3).map(svg => {
      const r = svg.getBoundingClientRect();
      return { tag: svg.tagName, w: r.width, h: r.height, inlineSvg: svg.tagName.toLowerCase() === 'svg' };
    });
    return { pills, icons, textGlyphIcons: [...document.querySelectorAll('.streak-preview')].map(e => e.textContent.trim().slice(0, 30)) };
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error('PROBE ERROR', e.message); process.exit(1); });
