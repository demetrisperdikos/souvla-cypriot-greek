const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE || 'http://127.0.0.1:8799/index.html';
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  let dialogs = 0;
  p.on('dialog', d => { dialogs++; d.dismiss(); });
  const poison = '<img src=x onerror=alert(9)><script>alert(9)</script>';
  const state = {
    level: poison, xp: poison, streak: poison, lastActive: poison,
    done: { [poison]: true, 'lesson-1': true }
  };
  await p.goto(base);
  await p.evaluate((s) => { localStorage.setItem('souvla.state.v2', s); }, JSON.stringify(state));
  await p.reload();
  await p.waitForSelector('.foot', { state: 'attached' });
  await p.waitForTimeout(800);
  const result = await p.evaluate(() => ({
    injectedImg: document.querySelectorAll('img[onerror]').length,
    injectedScript: Array.from(document.querySelectorAll('script:not([src])')).length,
    textHasPayload: document.body.textContent.includes('<img src=x onerror=alert(9)>')
  }));
  const pass = dialogs === 0 && result.injectedImg === 0 && result.injectedScript === 0;
  console.log(JSON.stringify({ storageKey: 'souvla.state.v2', dialogs, ...result, pass }));
  await b.close();
  if (!pass) process.exit(1);
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
