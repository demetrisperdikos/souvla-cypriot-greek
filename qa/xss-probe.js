const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const p = await b.newPage();
  const dialogs = [];
  p.on('dialog', d => { dialogs.push(d.message()); d.dismiss(); });
  await p.goto('http://127.0.0.1:8800/index.html', { waitUntil: 'networkidle0' });
  const payload = "<img src=x onerror=window.__xss=1>";
  const result = await p.evaluate((payload) => {
    const hits = [];
    const host = document.querySelector('#view') || document.body;
    const probe = document.createElement('div');
    probe.innerHTML = payload;
    hits.push({ sink: 'probe-div', executed: !!window.__xss });
    const hero = document.querySelector('.hero-art');
    hits.push({ sink: 'hero-art present', value: !!hero });
    hits.push({ sink: 'script-tags in DOM', value: document.querySelectorAll('script[src*="inject"]').length });
    return hits;
  }, payload);
  console.log(JSON.stringify({ result, dialogs, xssGlobal: await p.evaluate(() => window.__xss || 0) }, null, 1));
  await b.close();
})().catch(e => { console.error('PROBE ERROR', e.message); process.exit(1); });
