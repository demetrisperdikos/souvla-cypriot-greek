const { chromium } = require('playwright');
const base = process.env.BASE;
const out = process.env.OUT || '../.shots';
const sizes = [[1440, 900, '1440'], [390, 844, '390']];
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const [w, h, tag] of sizes) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    await page.goto(base);
    await page.waitForTimeout(400);
    await page.screenshot({ path: out + '/home-' + tag + '.png', fullPage: true });
    await page.click('text=Start diagnosis');
    await page.waitForTimeout(300);
    await page.screenshot({ path: out + '/quiz-' + tag + '.png', fullPage: true });
    for (let i = 0; i < 10; i++) {
      await page.locator('.option').first().click();
      await page.waitForTimeout(150);
      if (i === 4) await page.screenshot({ path: out + '/quiz-answered-' + tag + '.png', fullPage: true });
      await page.locator('button', { hasText: /Next question|See my level/ }).first().click();
      await page.waitForTimeout(150);
    }
    await page.screenshot({ path: out + '/result-' + tag + '.png', fullPage: true });
    await page.click('text=Start learning');
    await page.waitForTimeout(300);
    await page.screenshot({ path: out + '/lessons-' + tag + '.png', fullPage: true });
    for (let k = 0; k < 3; k++) {
      try {
        await page.locator('button', { hasText: /Start lesson|Practise again/ }).nth(k).click();
        await page.waitForTimeout(300);
        const kind = (await page.locator('text=Flip card').count()) ? 'flashcard' : (await page.locator('.match-board').count()) ? 'wordmatch' : 'dialogue';
        await page.screenshot({ path: out + '/' + kind + '-' + tag + '.png', fullPage: true });
        if (kind === 'flashcard') { await page.click('text=Flip card'); await page.waitForTimeout(300); await page.screenshot({ path: out + '/flashcard-back-' + tag + '.png', fullPage: true }); }
        await page.click('text=Back to lessons');
        await page.waitForTimeout(300);
      } catch (e) { console.log('lesson ' + k + ' ' + tag + ': ' + e.message.split('\n')[0]); }
    }
    console.log(tag + ' page errors: ' + (errs.length ? errs.join('; ') : 'none'));
    await page.close();
  }
  await browser.close();
  console.log('shots done');
})().catch(e => { console.error(e); process.exit(1); });
