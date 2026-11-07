const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  let dialogs = 0;
  p.on('dialog', d => { dialogs++; d.dismiss(); });
  const payload = '<script>alert(1)</script>';
  await p.goto('http://127.0.0.1:8799/index.html?q=' + encodeURIComponent(payload) + '#' + encodeURIComponent('<img src=x onerror=alert(2)>'));
  await p.waitForSelector('.foot', { state: 'attached' });
  await p.waitForTimeout(800);
  const html = await p.content();
  const r = { dialogs, payloadInDom: html.includes('<script>alert(1)</script>'), onerrorInDom: html.includes('onerror=alert(2)') };
  await p.evaluate(() => { try { localStorage.setItem('souvla', '<script>alert(3)</script>'); } catch (e) {} });
  await p.reload(); await p.waitForTimeout(800);
  r.dialogsAfterStorageReload = dialogs;
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
