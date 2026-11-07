const { chromium } = require('../tests/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('http://127.0.0.1:8931/index.html', { waitUntil: 'load' }); await p.waitForSelector('.test-card', { timeout: 15000 }); await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
      const pick = (t) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (n.textContent.trim() === t) { const x = n.parentElement.getBoundingClientRect(); return [Math.round(x.top), Math.round(x.bottom)]; } } return null; };
      const card = document.querySelector('.test-card').getBoundingClientRect();
      return { testCardTop: Math.round(card.top), testCardBottom: Math.round(card.bottom), title: pick('The Souvla Test'), stats: pick('questions'), firstQ: pick('How do you greet a friend casually in Cyprus?'), firstOption: pick('Yassou mas'), footer: (() => { const f = document.querySelector('.foot').getBoundingClientRect(); return [Math.round(f.top), Math.round(f.bottom)]; })() };
    });
    console.log(w, JSON.stringify(r));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
