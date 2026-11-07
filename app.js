(function () {
'use strict';
var S = window.SouvlaStore;
var U = window.SouvlaUI;
var el = U.el, btn = U.btn, icon = U.icon, shuffle = U.shuffle, levelName = U.levelName, findById = U.findById;
var safeStorage = null;
try { safeStorage = window.localStorage; } catch (e) { safeStorage = null; }
var store = S.createStore(safeStorage || { getItem: function () { return null; }, setItem: function () {} });
var data = null;

function skewerGlyph() {
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '34');
  svg.setAttribute('height', '34');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  var stick = document.createElementNS(NS, 'line');
  stick.setAttribute('x1', '2'); stick.setAttribute('y1', '12');
  stick.setAttribute('x2', '22'); stick.setAttribute('y2', '12');
  stick.setAttribute('stroke', '#FFFFFF'); stick.setAttribute('stroke-width', '2');
  stick.setAttribute('stroke-linecap', 'round');
  svg.appendChild(stick);
  [[6.5, 12, 'tomato'], [12, 12, 'meat'], [17.5, 12, 'tomato']].forEach(function (p) {
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', String(p[0])); c.setAttribute('cy', String(p[1]));
    c.setAttribute('r', p[2] === 'meat' ? '2.6' : '2.2');
    c.setAttribute('fill', p[2] === 'meat' ? '#FFFFFF' : '#B5532A');
    svg.appendChild(c);
  });
  return svg;
}
function renderBrand() {
  var b = document.getElementById('brand');
  b.textContent = '';
  var mark = el('div', 'mark');
  mark.innerHTML = (window.SouvlaArt && window.SouvlaArt.logo) ? window.SouvlaArt.logo() : '';
  if (!mark.firstChild) mark.appendChild(skewerGlyph());
  var t = el('div', 'brand-text');
  t.appendChild(el('div', 'brand-name', 'Souvla'));
  t.appendChild(el('div', 'brand-sub', 'Cypriot Greek'));
  b.appendChild(mark);
  b.appendChild(t);
}
function stat(iconName, value, label, isXp) {
  var s = el('div', 'stat');
  s.setAttribute('aria-label', value + ' ' + label);
  s.appendChild(icon(iconName, 'stat-ico'));
  s.appendChild(el('span', 'stat-val' + (isXp ? ' xp-val' : ''), String(value)));
  s.appendChild(el('span', 'stat-label', label));
  return s;
}
function renderStats() {
  var s = document.getElementById('stats');
  s.setAttribute('aria-live', 'polite');
  s.textContent = '';
  s.appendChild(stat('flame', store.state.streak, 'streak'));
  s.appendChild(stat('bolt', store.state.xp, 'XP', true));
  s.appendChild(stat('skewer', store.skewers(), 'skewers'));
}
function bump() {
  var b = document.querySelector('.xp-val');
  if (!b) return;
  b.classList.remove('bounce');
  void b.offsetWidth;
  b.classList.add('bounce');
}
function award(n) {
  store.addXp(n);
  renderStats();
  bump();
}
function setView(node) {
  var v = document.getElementById('view');
  v.textContent = '';
  v.appendChild(node);
  var h = node.querySelector('h1, h2');
  if (h) { h.setAttribute('tabindex', '-1'); h.classList.add('no-ring'); h.focus({ preventScroll: true }); }
  window.scrollTo(0, 0);
}
function illustration() {
  var wrap = el('div', 'hero-art');
  wrap.setAttribute('aria-hidden', 'true');
  var s = U.svgNode('svg', { viewBox: '0 0 480 360', 'class': 'art', focusable: 'false' });
  s.appendChild(U.svgNode('rect', { x: 0, y: 0, width: 480, height: 360, rx: 28, fill: '#F8EADF' }));
  s.appendChild(U.svgNode('circle', { cx: 360, cy: 96, r: 44, fill: '#FFFFFF' }));
  s.appendChild(U.svgNode('path', { d: 'M0 220 Q60 196 120 220 T240 220 T360 220 T480 220 V360 H0 Z', fill: '#D0703F' }));
  s.appendChild(U.svgNode('path', { d: 'M0 262 Q80 240 160 262 T320 262 T480 262 V360 H0 Z', fill: '#B5532A' }));
  s.appendChild(U.svgNode('path', { d: 'M0 306 Q90 290 180 306 T360 306 T480 306 V360 H0 Z', fill: '#F3EBDD' }));
  s.appendChild(U.svgNode('path', { d: 'M70 150 H410', stroke: '#1A1A1A', 'stroke-width': 6, 'stroke-linecap': 'round' }));
  [120, 182, 244, 306].forEach(function (x) {
    s.appendChild(U.svgNode('rect', { x: x, y: 122, width: 46, height: 46, rx: 12, fill: '#B5532A', stroke: '#1A1A1A', 'stroke-width': 3 }));
  });
  wrap.appendChild(s);
  return wrap;
}

function openLesson(lesson) {
  setView(window.SouvlaLessons.build(ctx).open(lesson));
}
function goLessons() {
  home();
  var s = document.getElementById('lessons');
  if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function home() {
  var wrap = el('div', 'home');
  var hero = el('section', 'hero');
  var copy = el('div', 'hero-copy');
  copy.appendChild(el('p', 'eyebrow', 'A little Cyprus, every day'));
  var hl = el('h1', 'display');
  hl.appendChild(document.createTextNode('Pull up a chair.'));
  hl.appendChild(document.createElement('br'));
  hl.appendChild(document.createTextNode('Let\u2019s talk Cypriot.'));
  copy.appendChild(hl);
  copy.appendChild(el('p', 'lead', 'Discover the words, warmth and culture of Cyprus, one conversation at a time. Start with a short, friendly level check.'));
  var acts = el('div', 'actions');
  copy.appendChild(window.SouvlaArt.pills(['Ten questions', 'About 3 minutes']));
  acts.appendChild(btn('Start diagnosis', 'primary', startQuiz, 'right'));
  acts.appendChild(btn('Browse lessons', 'ghost', goLessons, 'book'));
  copy.appendChild(acts);
  if (store.state.level) copy.appendChild(el('p', 'note', 'Your level: ' + levelName(store.state.level) + '.'));
  hero.appendChild(copy);
  hero.appendChild(window.SouvlaArt.hero());
  wrap.appendChild(hero);

  var row = el('div', 'feature-row');
  row.appendChild(testCard());
  row.appendChild(challengeCard());
  wrap.appendChild(row);

  wrap.appendChild(el('div', 'section-divider'));
  var sec = el('section', 'lessons');
  sec.id = 'lessons';
  sec.appendChild(el('h2', 'h2', 'Lessons'));
  sec.appendChild(el('h2', 'h3', 'Browse all lessons'));
  sec.appendChild(el('p', 'section-sub', 'Short lessons you can finish in a few minutes, grouped by what you want to learn.'));
  var grid = el('div', 'lesson-grid');
  data.lessons.forEach(function (l) { grid.appendChild(lessonCard(l)); });
  sec.appendChild(grid);
  wrap.appendChild(sec);
  setView(wrap);
}

function featIcon(d) {
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('class', 'feat-ico');
  var p = document.createElementNS(NS, 'path');
  p.setAttribute('d', d);
  svg.appendChild(p);
  return svg;
}

function testCard() {
  var card = el('article', 'card test-card');
  var head = el('div', 'card-head');
  var ico = el('div', 'tile tile-blue');
  ico.appendChild(featIcon('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11h.01'));
  head.appendChild(ico);
  head.appendChild(el('h2', 'h3', 'The Souvla Test'));
  card.appendChild(head);
  card.appendChild(el('p', 'body', 'Ten questions to find your starting point. No pressure, no wrong turns.'));
  var meta = el('dl', 'meta-block');
  [['10', 'questions'], ['~3', 'minutes'], ['+XP', 'every right answer']].forEach(function (m) {
    var c = el('div', 'meta-cell');
    c.appendChild(el('dt', 'meta-num', m[0]));
    c.appendChild(el('dd', 'meta-label', m[1]));
    meta.appendChild(c);
  });
  var q0 = data.questions && data.questions[0];
  if (q0) {
    var prev = el('div', 'test-preview');
    prev.appendChild(el('p', 'test-preview-label', 'First question'));
    prev.appendChild(el('p', 'test-preview-q', q0.text));
    card.appendChild(prev);
    var opts = el('div', 'test-opts');
    opts.setAttribute('aria-hidden', 'true');
    (q0.options || []).slice(0, 3).forEach(function (o) { opts.appendChild(el('div', 'test-opt', o.text)); });
    card.appendChild(opts);
  }
  card.appendChild(window.SouvlaArt.whatYouGet());
  card.appendChild(btn('Begin the test', 'primary', startQuiz, 'right'));
  return card;
}

function challengeCard() {
  var card = el('article', 'card challenge-card');
  var head = el('div', 'card-head');
  var ico = el('div', 'tile tile-blue');
  ico.appendChild(featIcon('M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z'));
  head.appendChild(ico);
  head.appendChild(el('h2', 'h3', 'Daily challenge'));
  card.appendChild(head);
  var n = store.state.streak;
  card.appendChild(el('p', 'body', 'Finish one lesson today to keep your streak going. Your current streak is ' + n + (n === 1 ? ' day.' : ' days.')));
  var first = data.lessons[0];
  var label = store.isDone(first.id) ? 'Practise again' : 'Open ' + first.title;
  card.appendChild(window.SouvlaArt.streakPreview(n));
  var next = el('div', 'up-next next-up');
  next.appendChild(el('p', 'up-next-label', 'Up next'));
  var nrow = el('div', 'up-next-row');
  var tline = el('span', 'up-next-title');
  tline.innerHTML = "<svg class='up-next-ico' viewBox='0 0 24 24' width='20' height='20' aria-hidden='true' focusable='false'><path d='M12 2c1 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3.2 2-4.3.2 1.6.9 2.6 2 3.1C11 7.6 11.2 5 12 2z' fill='currentColor'/></svg>";
  tline.appendChild(document.createTextNode(first.title));
  nrow.appendChild(tline);
  nrow.appendChild(el('span', 'up-next-meta', levelName(first.level) + ' · about 5 min'));
  next.appendChild(nrow);
  var bar = el('div', 'up-next-bar');
  bar.setAttribute('aria-hidden', 'true');
  var segCount = first.steps ? first.steps.length : (first.cards ? first.cards.length : 6);
  var doneSegs = store.isDone(first.id) ? segCount : 0;
  for (var si = 0; si < segCount; si++) { bar.appendChild(el('span', 'up-next-seg' + (si < doneSegs ? ' is-done' : ''))); }
  next.appendChild(bar);
  var totalSteps = first.steps ? first.steps.length : (first.cards ? first.cards.length : 6);
  var unit = first.steps ? 'steps' : 'cards';
  var statusText = store.isDone(first.id) ? 'Completed, ' + totalSteps + ' of ' + totalSteps + ' ' + unit : 'Not started, 0 of ' + totalSteps + ' ' + unit;
  next.appendChild(el('span', 'up-next-pct', statusText));
  card.appendChild(next);
  card.appendChild(btn(label, 'primary', function () { openLesson(first); }, 'right'));
  return card;
}

function lessonCard(l) {
  var card = el('article', 'card lesson-card');
  var kind = l.type === 'flashcards' ? ['book', 'tile-blue', 'Flashcards'] : l.type === 'dialogue' ? ['chat', 'tile-blue', 'Dialogue'] : ['puzzle', 'tile-blue', 'Mini-game'];
  var head = el('div', 'card-head');
  var ico = el('div', 'tile ' + kind[1]);
  ico.appendChild(icon(kind[0]));
  head.appendChild(ico);
  var tt = el('div', 'lesson-titles');
  tt.appendChild(el('h3', 'h3', l.title));
  tt.appendChild(el('p', 'small', kind[2] + ' \u00b7 ' + levelName(l.level)));
  head.appendChild(tt);
  card.appendChild(head);
  if (store.isDone(l.id)) card.appendChild(el('p', 'done-chip', 'Completed'));
  card.appendChild(btn(store.isDone(l.id) ? 'Practise again' : 'Start lesson', 'secondary', function () { openLesson(l); }, 'right'));
  return card;
}

function startQuiz() {
  var qs = shuffle(data.questions).slice(0, Math.min(10, data.questions.length));
  showQuestion({ qs: qs, i: 0, score: 0, streakRun: 0, answered: false });
}

function showQuestion(run) {
  run.answered = false;
  var q = run.qs[run.i];
  var wrap = el('section', 'quiz');
  var top = el('div', 'quiz-top');
  top.appendChild(el('p', 'eyebrow', 'Question ' + (run.i + 1) + ' of ' + run.qs.length));
  var bar = el('div', 'progress');
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Quiz progress');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', String(run.qs.length));
  bar.setAttribute('aria-valuenow', String(run.i));
  var fill = el('div', 'progress-fill');
  fill.style.width = (run.i / run.qs.length * 100) + '%';
  bar.appendChild(fill);
  top.appendChild(bar);
  wrap.appendChild(top);
  var qh = el('h1', 'h2 question', q.text);
  qh.id = 'quiz-question';
  wrap.appendChild(qh);
  var list = el('div', 'options');
  list.setAttribute('role', 'group');
  list.setAttribute('aria-labelledby', 'quiz-question');
  list.setAttribute('aria-describedby', 'quiz-feedback');
  var fb = el('p', 'feedback');
  fb.id = 'quiz-feedback';
  fb.setAttribute('aria-live', 'polite');
  var last = run.i === run.qs.length - 1;
  var nextBtn = btn(last ? 'See my level' : 'Next question', 'primary', function () {
    if (last) finishQuiz(run);
    else { run.i++; showQuestion(run); }
  }, 'right');
  nextBtn.disabled = true;
  q.options.forEach(function (o, idx) {
    list.appendChild(btn(o.text, 'option', function () { answer(run, q, idx, list, fb, nextBtn); }, null));
  });
  wrap.appendChild(list);
  wrap.appendChild(fb);
  wrap.appendChild(nextBtn);
  setView(wrap);
}

function answer(run, q, idx, list, fb, nextBtn) {
  if (run.answered) return;
  run.answered = true;
  Array.prototype.forEach.call(list.children, function (b) { b.disabled = true; });
  list.children[idx].setAttribute('aria-pressed', 'true');
  var rightIdx = -1;
  q.options.forEach(function (o, k) { if (o.correct) rightIdx = k; });
  var chosen = list.children[idx];
  if (q.options[idx].correct) {
    run.score++;
    run.streakRun++;
    var gain = 10 + Math.min(2 * (run.streakRun - 1), 10);
    award(gain);
    chosen.classList.add('is-correct');
    fb.textContent = 'Correct! +' + gain + ' XP';
    fb.className = 'feedback good';
  } else {
    run.streakRun = 0;
    chosen.classList.add('is-wrong');
    list.children[rightIdx].classList.add('is-correct');
    fb.textContent = 'Not quite. The answer is: ' + q.options[rightIdx].text + '.';
    fb.className = 'feedback bad';
  }
  nextBtn.disabled = false;
  nextBtn.focus();
}

function finishQuiz(run) {
  var pct = run.score / run.qs.length;
  var level = pct >= 0.8 ? 3 : pct >= 0.5 ? 2 : 1;
  store.setLevel(level);
  var wrap = el('section', 'result');
  wrap.appendChild(el('p', 'eyebrow', 'Your starting point'));
  wrap.appendChild(el('h1', 'display', levelName(level)));
  wrap.appendChild(el('p', 'lead', 'You got ' + run.score + ' of ' + run.qs.length + ' right. We have picked lessons to match.'));
  var acts = el('div', 'actions');
  acts.appendChild(btn('Start learning', 'primary', goLessons, 'right'));
  acts.appendChild(btn('Retake the test', 'ghost', startQuiz, 'refresh'));
  wrap.appendChild(acts);
  renderStats();
  setView(wrap);
}

var ctx = {
  el: el, btn: btn, store: store, award: award, home: home,
  findById: findById, shuffle: shuffle, data: null
};

function waitFonts() {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  var faces = ['800 1em Nunito', '700 1em Nunito', '400 1em Inter', '600 1em Inter'];
  var loads = faces.map(function (f) { return document.fonts.load(f).catch(function () {}); });
  // Never block longer than 3s: a slow font must not stop the app from starting.
  return Promise.race([Promise.all(loads), new Promise(function (r) { setTimeout(r, 3000); })]);
}
function showLoading() {
  var s = el('section', 'loading');
  s.setAttribute('role', 'status');
  s.appendChild(el('div', 'spinner'));
  s.appendChild(el('p', 'lead', 'Loading your lessons…'));
  setView(s);
}
function init() {
  showLoading();
  waitFonts().then(function () { return fetch('data.json', { cache: 'no-store' }); })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (j) {
      data = j;
      ctx.data = j;
      renderBrand();
      renderStats();
      home();
    })
    .catch(function (err) {
      console.error('init failed:', err && err.stack || err);
      init.attempts = (init.attempts || 0) + 1;
      if (init.attempts < 4) { setTimeout(init, 700 * init.attempts); return; }
      renderBrand();
      renderStats();
      var e = el('section', 'empty');
      e.appendChild(window.SouvlaUI.icon('alert', 'err-ic'));
      e.appendChild(el('h1', 'h2', 'We could not load the lessons'));
      e.appendChild(el('p', 'lead', 'Check your connection and try again.'));
      e.appendChild(btn('Try again', 'primary', function () { init.attempts = 0; init(); }, 'refresh'));
      setView(e);
    });
}
init();
})();
