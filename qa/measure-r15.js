const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
  await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('.feature-row > .card')].map(c => ({ cls: c.className, top: Math.round(c.getBoundingClientRect().top + scrollY), h: Math.round(c.getBoundingClientRect().height) }));
    const strip = document.querySelector('.up-next.next-up');
    return { cards, stripH: Math.round(strip.getBoundingClientRect().height), footerBottom: Math.round(document.querySelector('footer.foot').getBoundingClientRect().bottom + scrollY), pageH: document.documentElement.scrollHeight };
  });
  console.log(JSON.stringify(m, null, 1));
  await p.screenshot({ path: 'qa/phone-full.png', fullPage: true });
  await p.screenshot({ path: 'qa/phone-fold.png' });
  await b.close();
})();
