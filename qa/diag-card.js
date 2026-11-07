const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:8799/index.html', { waitUntil: 'networkidle0' });
  const rows = await page.evaluate(() => {
    const card = document.querySelector('.challenge-card');
    const r = (e) => { const b = e.getBoundingClientRect(); return { cls: e.className, top: Math.round(b.top), h: Math.round(b.height), bottom: Math.round(b.bottom) }; };
    return { card: r(card), kids: [...card.children].map(r), row: r(card.parentElement), footer: r(document.querySelector('.foot')) };
  });
  console.log(JSON.stringify(rows, null, 1));
  await browser.close();
})();
