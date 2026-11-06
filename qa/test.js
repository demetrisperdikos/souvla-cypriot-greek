const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2] || process.env.BASE || 'http://localhost:8765/index.html';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'));
const failures = [];

function check(name, ok, info) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (info ? ' :: ' + info : ''));
  if (!ok) failures.push(name);
}
async function xp(page) { return Number(await page.locator('.xp-val').innerText()); }
async function streak(page) { return Number(await page.locator('.stat-val').first().innerText()); }
async function goHome(page) { await page.getByRole('button', { name: 'Back to lessons', exact: true }).first().click(); }
async function openLesson(page, n) { await page.locator('.lesson-card').nth(n).getByRole('button').first().click(); }

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE);
  await page.waitForSelector('h1.display', { timeout: 15000 });
  check('home loads', await page.locator('h1.display').count() === 1);
  check('starts at 0 XP', await xp(page) === 0);

  // Diagnostic quiz, all answers correct
  await page.getByRole('button', { name: 'Start diagnosis' }).click();
  for (let i = 0; i < 10; i++) {
    const text = (await page.locator('h1.question').innerText()).trim();
    const q = data.questions.find(x => x.text === text);
    const idx = q.options.findIndex(o => o.correct);
    await page.locator('.options button').nth(idx).click();
    await page.getByRole('button', { name: i === 9 ? 'See my level' : 'Next question', exact: true }).click();
  }
  const level = (await page.locator('.result h1').innerText()).trim();
  check('quiz result shows a level', level === 'Advanced', level);
  check('quiz XP is 170 (10,12,...,20)', await xp(page) === 170, String(await xp(page)));
  check('skewers count 1 at 170 XP', (await page.locator('.stat-val').nth(2).innerText()).trim() === '1');
  check('streak is 1 after first activity', await streak(page) === 1, String(await streak(page)));

  // Flashcards: Previous at first card, Next advance, Finish awards XP
  await page.getByRole('button', { name: 'Start learning', exact: true }).click();
  await openLesson(page, 0);
  await page.getByRole('button', { name: 'Flip card' }).click();
  const body1 = await page.locator('.lesson').innerText();
  check('flashcard shows cypriot_pronunciation', body1.includes('YAS-soo mahs'));
  check('flashcard shows standard_greek_comparison', body1.includes('Yassou (informal)'));
  check('flashcard shows cultural_context', body1.includes('warm and collective'));
  check('Previous disabled on first card', await page.getByRole('button', { name: 'Previous', exact: true }).isDisabled());
  check('Previous on first card stays on first', (await page.locator('.lesson').textContent()).includes('Card 1 of'));
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  check('Next advances to card 2', (await page.locator('.lesson').innerText()).includes('Efharisto'));
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  check('Previous goes back to card 1', (await page.locator('.lesson').innerText()).includes('Yassou mas'));
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  const beforeFinish = await xp(page);
  await page.getByRole('button', { name: 'Finish', exact: true }).click();
  check('Finish awards 20 XP', await xp(page) === beforeFinish + 20, beforeFinish + ' to ' + (await xp(page)));
  await goHome(page);

  // Dialogue lesson, all steps
  await openLesson(page, 1);
  const steps = data.dialogues[0].steps;
  for (let i = 0; i < steps.length; i++) {
    const good = steps[i].choices.find(c => c.correct);
    await page.getByRole('button', { name: good.text, exact: true }).click();
    check('dialogue step ' + (i + 1) + ' feedback', await page.getByText(good.feedback, { exact: true }).count() === 1);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
  }
  check('dialogue completion state shown', await page.locator('.done-box').count() === 1);
  await goHome(page);

  // Word Match mini-game
  await openLesson(page, 2);
  const beforeGame = await xp(page);
  for (const p of data.miniGames[0].pairs) {
    await page.getByRole('button', { name: p.cypriot, exact: true }).click();
    await page.getByRole('button', { name: p.english, exact: true }).click();
  }
  check('Word Match all matched', (await page.locator('.feedback').innerText()).includes('All matched'));
  check('Word Match awards XP (40 + 25)', await xp(page) === beforeGame + 65, beforeGame + ' to ' + (await xp(page)));
  await page.getByRole('button', { name: 'Back to lessons', exact: true }).last().click();
  check('Back to lessons returns home', await page.locator('h1.display').count() === 1);

  // Streak reset after 2 days idle
  await page.evaluate(() => {
    const k = 'souvla.state.v2';
    const s = JSON.parse(localStorage.getItem(k));
    const d = new Date(); d.setDate(d.getDate() - 3);
    s.lastActive = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    localStorage.setItem(k, JSON.stringify(s));
  });
  await page.reload();
  await page.waitForSelector('.stat-val');
  check('streak resets to 0 after 3 idle days', await streak(page) === 0, String(await streak(page)));

  // Streak reset after 2 days idle
  await page.evaluate(() => {
    const k = 'souvla.state.v2';
    const s = JSON.parse(localStorage.getItem(k));
    s.streak = 1;
    const d = new Date(); d.setDate(d.getDate() - 2);
    s.lastActive = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    localStorage.setItem(k, JSON.stringify(s));
  });
  await page.reload();
  await page.waitForSelector('.stat-val');
  check('streak resets to 0 after 2 idle days', await streak(page) === 0, String(await streak(page)));

  // Keyboard focus visibility
  await page.keyboard.press('Tab');
  let visibleFocus = 0, stops = 0;
  for (let i = 0; i < 12; i++) {
    const r = await page.evaluate(() => {
      const a = document.activeElement;
      const cs = getComputedStyle(a);
      return { tag: a.tagName, outline: cs.outlineStyle, shadow: cs.boxShadow };
    });
    if (r.tag === 'BUTTON' || r.tag === 'A') {
      stops++;
      if (r.outline !== 'none' || r.shadow !== 'none') visibleFocus++;
    }
    await page.keyboard.press('Tab');
  }
  check('keyboard reaches buttons', stops >= 3, 'stops=' + stops);
  check('every keyboard stop shows a focus ring', stops > 0 && visibleFocus === stops, visibleFocus + '/' + stops);

  // Phone width: no horizontal overflow
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pp = await phone.newPage();
  await pp.goto(BASE);
  await pp.waitForSelector('.stat-val');
  const overflow = await pp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal overflow at 390px', overflow <= 1, 'overflow=' + overflow);
  await phone.close();

  check('no console or page errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  if (failures.length) { console.log('FAILED: ' + failures.length); process.exit(1); }
  console.log('ALL PASSED');
})().catch(e => { console.error(e); process.exit(1); });
