const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  const out = {};
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const url = 'http://127.0.0.1:8800/index.html';
  // Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  out.desktop = await page.evaluate(() => {
    const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), height: +b.height.toFixed(2) }; };
    const card = document.querySelector('.challenge-card').getBoundingClientRect();
    const strip = document.querySelector('.challenge-card .up-next').getBoundingClientRect();
    const cta = document.querySelector('.challenge-card > .btn').getBoundingClientRect();
    const foot = document.querySelector('.foot').getBoundingClientRect();
    const test = document.querySelector('.test-card');
    const tcs = getComputedStyle(test);
    const tile = document.querySelector('.card-head .tile');
    const tcsTile = getComputedStyle(tile);
    const h2 = getComputedStyle(document.querySelector('.card-head h2') || document.querySelector('.card-head .h3'));
    return {
      stripTop: +strip.top.toFixed(2), stripBottom: +strip.bottom.toFixed(2), stripHeight: +strip.height.toFixed(2),
      ctaTop: +cta.top.toFixed(2), ctaBottom: +cta.bottom.toFixed(2),
      cardBottom: +card.bottom.toFixed(2),
      stripToCtaGap: +(cta.top - strip.bottom).toFixed(2),
      ctaToCardBottom: +(card.bottom - cta.bottom).toFixed(2),
      stripToCardBottomGap: +(card.bottom - strip.bottom).toFixed(2),
      testCardLeftBorder: tcs.borderLeftWidth + ' ' + tcs.borderLeftColor,
      testCardHeight: +test.getBoundingClientRect().height.toFixed(2),
      challengeCardHeight: +card.height.toFixed(2),
      tileBorder: tcsTile.borderTopWidth + ' ' + tcsTile.borderTopStyle,
      tileWidth: tcsTile.width,
      headWeight: h2 ? h2.fontWeight : null,
      footBottom: +foot.bottom.toFixed(2),
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  // Hover and focus on primary button
  const cta = await page.$('.challenge-card > .btn');
  const before = await page.evaluate(el => getComputedStyle(el).backgroundColor, cta);
  await cta.hover();
  await new Promise(r => setTimeout(r, 300));
  const hovered = await page.evaluate(el => getComputedStyle(el).backgroundColor, cta);
  out.hover1440 = { before, hovered };
  await page.keyboard.press('Tab');
  await page.evaluate(() => document.querySelector('.challenge-card > .btn').focus());
  await page.keyboard.press('Tab');
  out.focusRing1440 = await page.evaluate(() => { const e = document.querySelector('.challenge-card > .btn'); e.focus(); const s = getComputedStyle(e); return s.outlineWidth + ' ' + s.outlineStyle + ' ' + s.outlineColor; });
  // Hero backdrop and chip position at 390
  await page.screenshot({ path: 'qa/final-1440.png' });
  // Phone 390x844, dsf 1 and 2
  for (const dsf of [1, 2]) {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: dsf });
    await page.goto(url, { waitUntil: 'networkidle0' });
    out['phone_dsf' + dsf] = await page.evaluate(() => {
      const card = document.querySelector('.challenge-card').getBoundingClientRect();
      const strip = document.querySelector('.challenge-card .up-next').getBoundingClientRect();
      const cta = document.querySelector('.challenge-card > .btn').getBoundingClientRect();
      const tile = getComputedStyle(document.querySelector('.card-head .tile'));
      const chip = document.querySelector('.hero-chip').getBoundingClientRect();
      const art = document.querySelector('.hero-art').getBoundingClientRect();
      const test = document.querySelector('.test-card').getBoundingClientRect();
      return {
        stripHeight: +strip.height.toFixed(2), stripToCardBottomGap: +(card.bottom - strip.bottom).toFixed(2),
        ctaToCardBottom: +(card.bottom - cta.bottom).toFixed(2),
        challengeCardHeight: +card.height.toFixed(2), testCardHeight: +test.height.toFixed(2),
        tileBorder: tile.borderTopWidth, tileWidth: tile.width,
        chipInsetLeft: +(chip.left - art.left).toFixed(2), chipInsetTop: +(chip.top - art.top).toFixed(2),
        docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
  }
  await page.screenshot({ path: 'qa/final-390.png' });
  out.pageErrors = errors;
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
