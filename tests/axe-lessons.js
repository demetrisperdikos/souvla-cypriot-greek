const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const BASE = process.env.BASE;
(async () => {
  const axeSrc = fs.readFileSync(require.resolve('axe-core', { paths: [__dirname] }), 'utf8');
  const b = await chromium.launch();
  let bad = 0, runs = 0;
  for (const w of [390, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto(BASE);
    await p.waitForSelector('.hero');
    await p.getByText('Browse lessons').first().click();
    const n = await p.locator('button:has-text("Start lesson"), button:has-text("Open")').count();
    for (let i = 0; i < n; i++) {
      await p.goto(BASE);
      await p.waitForSelector('.hero');
      await p.getByText('Browse lessons').first().click();
      await p.locator('button:has-text("Start lesson"), button:has-text("Open")').nth(i).click();
      await p.waitForTimeout(150);
      await p.addScriptTag({ content: axeSrc });
      const r = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] }));
      runs++;
      bad += r.violations.length;
      for (const v of r.violations) console.log('VIOLATION', w, 'lesson', i + 1, v.id, v.impact, v.nodes.length);
    }
    console.log('width', w, 'lessons scanned', n, 'page errors', errs.length);
    await p.close();
  }
  await b.close();
  console.log('AXE_LESSONS runs=' + runs + ' violations=' + bad);
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
