const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox']});
  const p = await b.newPage();
  await p.setViewport({width: 1440, height: 900});
  await p.goto('http://127.0.0.1:8799/', {waitUntil: 'networkidle0'});
  const r = await p.evaluate(() => {
    const c = document.querySelector('.challenge-card');
    const kids = [...c.children].map(k => ({cls: k.className, order: getComputedStyle(k).order, display: getComputedStyle(k).display, top: Math.round(k.getBoundingClientRect().top)}));
    return {display: getComputedStyle(c).display, dir: getComputedStyle(c).flexDirection, kids};
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
