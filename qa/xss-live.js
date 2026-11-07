const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  const payload = '<img src=x onerror="window.__xss=1">';
  await p.goto('http://127.0.0.1:8123/index.html');
  await p.evaluate((pl) => {
    const s = JSON.parse(localStorage.getItem('souvla.state.v2') || 'null') || { level: null, xp: 0, streak: 0, lastActive: null, done: {} };
    s.done = {}; s.done[pl] = true; s.lastActive = pl; s.level = pl;
    localStorage.setItem('souvla.state.v2', JSON.stringify(s));
  }, payload);
  await p.reload();
  await p.waitForTimeout(800);
  const out = await p.evaluate(() => ({ xss: window.__xss || 0, injectedImgs: document.querySelectorAll('img[src="x"]').length, bodyHasRaw: document.body.innerHTML.includes('<img src=x onerror') }));
  console.log('LIVE PROBE via localStorage souvla.state.v2 + reload:', JSON.stringify(out), 'pageerrors=' + errs.length);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
