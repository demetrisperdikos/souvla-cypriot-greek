(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
var U = window.SouvlaUI;

// Brand mark: one geometry shared with favicon.svg. Skewer runs about 70% of the 48px tile.
var MARK_INNER = '<rect width="48" height="48" rx="12" fill="#0062CC"/>' +
  '<rect x="0.5" y="0.5" width="47" height="47" rx="11.5" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="1"/>' +
  '<line x1="7" y1="26" x2="41" y2="22" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>' +
  '<line x1="9" y1="24.6" x2="39" y2="20.6" stroke="#FFFFFF" stroke-opacity="0.55" stroke-width="1" stroke-linecap="round"/>' +
  '<rect x="10" y="15" width="9" height="18" rx="4.5" fill="#FFFFFF"/>' +
  '<rect x="19.5" y="13" width="9" height="18" rx="4.5" fill="#FFFFFF"/>' +
  '<rect x="29" y="11" width="9" height="18" rx="4.5" fill="#FFFFFF"/>';
var MARK = '<svg class="souvla-mark-svg" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + MARK_INNER + '</svg>';

function logo() { return MARK; }

function pills(labels) {
  var row = document.createElement('div');
  row.className = 'pills';
  labels.forEach(function (t) {
    var s = document.createElement('span');
    s.className = 'pill';
    s.textContent = t;
    row.appendChild(s);
  });
  return row;
}

function whatYouGet() {
  var box = document.createElement('div');
  box.className = 'what-get';
  var h = document.createElement('h3');
  h.className = 'what-title';
  h.textContent = 'What you get';
  box.appendChild(h);
  var ul = document.createElement('ul');
  ul.className = 'what-list';
  ['Ten short questions, no wrong turns', 'XP for every right answer', 'Lessons matched to where you start'].forEach(function (t) {
    var li = document.createElement('li');
    li.textContent = t;
    ul.appendChild(li);
  });
  box.appendChild(ul);
  return box;
}

// One kebab chunk: rich meat gradient, top highlight, lower shade, soft contact shadow, visible grill marks.
function chunk(cx) {
  return '<g transform="translate(' + cx + ' 0)">' +
    '<ellipse cx="4" cy="36" rx="36" ry="8" fill="#1A1A1A" opacity=".4" filter="url(#svBlur)"/>' +
    '<rect x="-34" y="-30" width="68" height="62" rx="24" fill="url(#svMeat)"/>' +
    '<rect x="-34" y="-30" width="68" height="62" rx="24" fill="none" stroke="#7A4420" stroke-opacity=".45" stroke-width="1.5"/>' +
    '<path d="M-30 14 Q0 34 30 14 L30 22 Q0 40 -30 22 Z" fill="#4A2410" opacity=".3"/>' +
    '<ellipse cx="-6" cy="-14" rx="25" ry="11" fill="url(#svHi)"/>' +
    '<path d="M-14 -22 L-22 16 M4 -22 L-4 16" stroke="#3A1C08" stroke-width="7" stroke-linecap="round" opacity=".9"/>' +
    '</g>';
}

function heroSvg() {
  var xs = [-144, -48, 48, 144];
  var chunks = xs.map(chunk).join('');
  return '<svg class="hero-scene" viewBox="40 30 440 215" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="svMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3DC"/><stop offset=".3" stop-color="#F0C385"/><stop offset=".7" stop-color="#C07A3E"/><stop offset="1" stop-color="#7A4420"/></linearGradient>' +
    '<linearGradient id="svHi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".95"/><stop offset="1" stop-color="#FFF6E6" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="svPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D3DBE5"/></linearGradient>' +
    '<linearGradient id="svRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D3E0"/><stop offset="1" stop-color="#8D9BB0"/></linearGradient>' +
    '' +
    '<linearGradient id="svSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A4A4A"/><stop offset="1" stop-color="#101010"/></linearGradient>' +
    '<filter id="svBlur" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="3.5"/></filter>' +
    '</defs>' +
    '<ellipse cx="260" cy="206" rx="214" ry="22" fill="#1A1A1A" opacity=".14" filter="url(#svBlur)"/>' +
    '<ellipse cx="260" cy="200" rx="206" ry="30" fill="url(#svPlate)"/>' +
    '<ellipse cx="260" cy="200" rx="206" ry="30" fill="none" stroke="url(#svRim)" stroke-width="5"/>' +
    '<ellipse cx="260" cy="196" rx="168" ry="16" fill="#FFFFFF" opacity=".8"/>' +
    '<g transform="translate(260 118)">' +
    '<line x1="-190" y1="6" x2="190" y2="6" stroke="#000" stroke-width="7" stroke-linecap="round" opacity=".3" filter="url(#svBlur)"/>' +
    '<line x1="-190" y1="0" x2="190" y2="0" stroke="url(#svSkewer)" stroke-width="10" stroke-linecap="round"/>' +
    '<line x1="-188" y1="-2" x2="188" y2="-2" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>' +
    chunks +
    '<circle cx="-190" cy="0" r="6" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2"/>' +
    '<circle cx="190" cy="0" r="6" fill="#0062CC"/>' +
    '</g>' +
    '</svg>';
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = heroSvg() + '<span class="hero-chip">Level check, 3 min</span>';
  return wrap;
}

function streakPreview(n) {
  var names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var letters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  var box = document.createElement('div');
  box.className = 'streak-preview';
  var top = document.createElement('div');
  top.className = 'streak-top';
  top.appendChild(U.icon('flame', 'streak-ico'));
  var msg = document.createElement('p');
  msg.className = 'streak-msg';
  n = Math.floor(Number(n)); if (!isFinite(n) || n < 0) n = 0;
  msg.textContent = '';
  if (n > 0) { var st = document.createElement('strong'); st.textContent = n + '-day streak.'; msg.appendChild(st); msg.appendChild(document.createTextNode(' Keep it going today.')); }
  else { var st0 = document.createElement('strong'); st0.textContent = 'No streak yet.'; msg.appendChild(st0); msg.appendChild(document.createTextNode(' ')); var acc = document.createElement('span'); acc.className = 'accent'; acc.textContent = 'Next step:'; msg.appendChild(acc); msg.appendChild(document.createTextNode(' one lesson today starts it.')); }
  top.appendChild(msg);
  box.appendChild(top);
  var week = document.createElement('div');
  week.className = 'week';
  week.setAttribute('role', 'group');
  week.setAttribute('aria-label', 'This week');
  var hint = document.createElement('p');
  hint.className = 'week-hint dot-caption';
  hint.setAttribute('aria-live', 'polite');
  hint.textContent = 'Tap a day to see its status.';
  letters.forEach(function (d, i) {
    var done = i < n;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'day dot' + (i === 0 ? ' is-today today' : '') + (done ? ' is-done done' : '');
    b.textContent = d;
    b.setAttribute('aria-label', names[i] + (done ? ', done' : ', not done'));
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(week.children, function (x) { x.classList.remove('is-selected'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('is-selected');
      b.setAttribute('aria-pressed', 'true');
      if (done) hint.textContent = names[i] + ': done. Nice work.';
      else if (i === 0) hint.textContent = names[i] + ': today. Finish a lesson to fill it in.';
      else hint.textContent = names[i] + ': not done yet.';
    });
    week.appendChild(b);
  });
  box.appendChild(week);
  box.appendChild(hint);
  var note = document.createElement('p');
  note.className = 'week-note';
  note.textContent = 'Miss a day and the streak resets. One small lesson is enough to keep it.';
  box.appendChild(note);
  return box;
}

A.logo = logo;
A.pills = pills;
A.whatYouGet = whatYouGet;
A.streakPreview = streakPreview;
A.hero = hero;
})();
