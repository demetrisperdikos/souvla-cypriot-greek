const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:8125/index.html', { waitUntil: 'networkidle' });
  await p.waitForSelector('.test-card .test-opts', { timeout: 15000 });
  const r = await p.evaluate(() => {
    const o = document.querySelector('.test-card .test-opts');
    const cs = getComputedStyle(o);
    const btn = [...document.querySelectorAll('.test-card button')].find(e => /Begin the test/.test(e.textContent));
    return { mt: cs.marginTop, mtPrio: o.style.marginTop, optsTop: Math.round(o.getBoundingClientRect().top), optsH: Math.round(o.getBoundingClientRect().height), btnTop: btn ? Math.round(btn.getBoundingClientRect().top) : null, vw: innerWidth, vh: innerHeight };
  });
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
