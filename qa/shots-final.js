const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8096/index.html';
const CHROME = process.env.CHROME || undefined;
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(BASE);
    await p.getByRole('button', { name: 'Browse lessons' }).first().click();
    await p.waitForTimeout(300);
    await p.screenshot({ path: `../.shots/final-lessons-${tag}.png`, fullPage: true });
    await p.goto(BASE);
    await p.getByRole('button', { name: 'Open First Greetings' }).click();
    await p.waitForTimeout(300);
    await p.screenshot({ path: `../.shots/final-flashcard-${tag}.png` });
    await p.goto(BASE);
    await p.getByRole('button', { name: 'Start lesson' }).nth(1).click();
    await p.waitForTimeout(300);
    await p.screenshot({ path: `../.shots/final-dialogue-${tag}.png` });
    await p.goto(BASE);
    await p.getByRole('button', { name: 'Start lesson' }).nth(2).click();
    await p.waitForTimeout(300);
    await p.screenshot({ path: `../.shots/final-wordmatch-${tag}.png` });
    await p.close();
  }
  await b.close();
  console.log('final shots ok');
})().catch(e => { console.error(e.message); process.exit(1); });
