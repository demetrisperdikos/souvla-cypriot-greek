(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
var U = window.SouvlaUI;

// Brand mark: one geometry shared with favicon.svg. Skewer runs about 70% of the 48px tile.
var MARK_INNER = "<rect width='48' height='48' rx='12' fill='#FBF6EF'/><rect x='0.5' y='0.5' width='47' height='47' rx='11.5' fill='none' stroke='#E2D6C6'/><rect x='2' y='21.5' width='44' height='3' rx='1.5' fill='#2A2A2A'/><g fill='#A0491F'><circle cx='13' cy='24' r='10'/><circle cx='24' cy='23.5' r='11'/><circle cx='35' cy='24' r='10'/></g>";
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
    '<path d="M-31 -8 Q-38 -26 -18 -30 Q-4 -40 12 -31 Q30 -34 34 -14 Q40 4 30 16 Q34 30 16 32 Q2 40 -10 32 Q-28 36 -34 20 Q-42 6 -31 -8 Z" fill="url(#svMeat)" stroke="#2A1204" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M-27 27 Q-14 37 1 30 Q18 36 27 24 Q14 22 -2 26 Q-14 24 -27 27 Z" fill="#2A1204" opacity=".55"/>' +
    '<path d="M-16 -18 L-22 6 M6 -22 L0 4 M18 -12 L14 8" stroke="#2A1204" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".45"/>' +
    '<ellipse cx="-10" cy="-18" rx="11" ry="4.5" transform="rotate(-18 -10 -18)" fill="#FFF3DC" opacity=".7"/>' +
    '</g>';
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
  hint.textContent = 'Tap a day to see whether a lesson was done.';
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
      else hint.textContent = names[i] + ': no lesson yet. Finish one today and this day fills in.';
    });
    week.appendChild(b);
  });
  box.appendChild(week);
  box.appendChild(hint);
  // One supporting line only: the caption above the day chips.
  return box;
}

A.logo = logo;
A.pills = pills;
A.whatYouGet = whatYouGet;
A.streakPreview = streakPreview;
})();
