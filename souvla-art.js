(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
var U = window.SouvlaUI;

var MARK = '<svg class="souvla-mark-svg" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
  '<rect width="48" height="48" rx="12" fill="#0062CC"/>' +
  '<rect x="0.5" y="0.5" width="47" height="47" rx="11.5" fill="none" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="1"/>' +
  '<line x1="7" y1="24" x2="41" y2="24" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>' +
  '<circle cx="12" cy="24" r="6" fill="#FFFFFF" stroke="#0062CC" stroke-opacity=".35" stroke-width="1"/>' +
  '<circle cx="24" cy="24" r="6" fill="#FFFFFF" stroke="#0062CC" stroke-opacity=".35" stroke-width="1"/>' +
  '<circle cx="36" cy="24" r="6" fill="#FFFFFF" stroke="#0062CC" stroke-opacity=".35" stroke-width="1"/>' +
  '</svg>';

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

function streakPreview(n) {
  var box = document.createElement('div');
  box.className = 'streak-preview';
  var top = document.createElement('div');
  top.className = 'streak-top';
  top.appendChild(U.icon('flame', 'streak-ico'));
  var msg = document.createElement('p');
  msg.className = 'streak-msg';
  msg.innerHTML = n > 0 ? '<strong>' + n + '-day streak.</strong> Keep it going today.' : '<strong>No streak yet.</strong> <span class="accent">Next step:</span> one lesson today starts it.';
  top.appendChild(msg);
  box.appendChild(top);
  var week = document.createElement('div');
  week.className = 'week';
  var hint = document.createElement('p');
  hint.className = 'week-hint dot-caption';
  hint.textContent = 'Finish a lesson to fill in today.';
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (d, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'day dot' + (i === 0 ? ' is-today' : '') + (i < n ? ' is-done' : '');
    b.textContent = d;
    b.setAttribute('aria-label', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i] + (i < n ? ', streak day' : ', no lesson yet'));
    b.addEventListener('click', function () {
      hint.textContent = b.getAttribute('aria-label') + '. ' + (i < n ? 'Done: part of your streak.' : 'Not done yet. One lesson today counts.');
    });
    week.appendChild(b);
  });
  box.appendChild(week);
  box.appendChild(hint);
  return box;
}

function chunk(x) {
  return '<rect x="' + (x - 31) + '" y="-25" width="62" height="50" rx="14" fill="url(#svChunk)" stroke="#6B7585" stroke-width="2"/>' +
    '<path d="M' + (x - 16) + ' 14 L' + (x + 4) + ' -14 M' + (x - 2) + ' 14 L' + (x + 18) + ' -14" stroke="#1A1A1A" stroke-opacity=".35" stroke-width="2.5" stroke-linecap="round"/>';
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = '<svg class="hero-scene" viewBox="40 50 400 170" preserveAspectRatio="xMidYMid meet" focusable="false">' +
    '<defs>' +
    '<linearGradient id="svChunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".22" stop-color="#F1F4F8"/><stop offset=".7" stop-color="#B9C2CF"/><stop offset="1" stop-color="#7D8898"/></linearGradient>' +
    '<linearGradient id="svPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D5DCE5"/></linearGradient>' +
    '<filter id="svShadow" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '</defs>' +
    '<defs><radialGradient id="svGlow"><stop offset="0" stop-color="#0062CC" stop-opacity=".16"/><stop offset="1" stop-color="#0062CC" stop-opacity="0"/></radialGradient></defs>' +
    '<ellipse cx="240" cy="200" rx="90" ry="22" fill="url(#svGlow)"/>' +
    '' +
    '<g transform="translate(240 120) rotate(-10)">' +
    '<line x1="-172" y1="0" x2="172" y2="0" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>' +
    chunk(-108) + chunk(-36) + chunk(36) + chunk(108) +
    '<circle cx="-172" cy="0" r="6" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2"/>' +
    '<circle cx="172" cy="0" r="6" fill="#0062CC"/>' +
    '</g>' +
    '</svg>' +
    '<span class="hero-chip">Level check, 3 min</span>';
  return wrap;
}

A.logo = logo;
A.pills = pills;
A.whatYouGet = whatYouGet;
A.streakPreview = streakPreview;
A.hero = hero;
})();
