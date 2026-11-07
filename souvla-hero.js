(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero art: four irregular grilled chunks on one thin skewer.
// Lower half darkens toward #140703, a crisp highlight sits on each upper lobe, 1.5px charred rim.
function pts(cx, cy, rx, ry, m) {
  var n = m.length, p = [], i;
  for (i = 0; i < n; i++) {
    var a = 2 * Math.PI * i / n;
    p.push([cx + rx * m[i] * Math.cos(a), cy + ry * m[i] * Math.sin(a)]);
  }
  return p;
}

function outline(p) {
  var n = p.length, i, d, s, e, q;
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
  s = mid(p[n - 1], p[0]);
  d = 'M' + s[0].toFixed(1) + ' ' + s[1].toFixed(1);
  for (i = 0; i < n; i++) {
    q = p[i]; e = mid(p[i], p[(i + 1) % n]);
    d += ' Q' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1);
  }
  return d + ' Z';
}

function chunk(cx, cy, rx, ry, m) {
  var p = pts(cx, cy, rx, ry, m);
  var s = '<ellipse cx="' + (cx + 5).toFixed(1) + '" cy="' + (cy + ry * 0.92).toFixed(1) + '" rx="' + (rx * 0.85).toFixed(1) + '" ry="' + (ry * 0.2).toFixed(1) + '" fill="#140703" opacity=".4" filter="url(#hvBlur)"/>';
  s += '<path d="' + outline(p) + '" fill="url(#hvMeat)" stroke="#140703" stroke-width="1.5" stroke-linejoin="round"/>';
  s += '<path d="M' + (cx - rx * 0.6).toFixed(1) + ' ' + (cy - ry * 0.35).toFixed(1) + ' Q' + (cx - rx * 0.2).toFixed(1) + ' ' + (cy - ry * 0.78).toFixed(1) + ' ' + (cx + rx * 0.3).toFixed(1) + ' ' + (cy - ry * 0.52).toFixed(1) + '" fill="none" stroke="#FFE7C2" stroke-width="3.5" stroke-linecap="round" opacity=".85"/>';
  return s;
}

var SVG = '<svg class="hero-svg" viewBox="0 0 440 140" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">' +
  '<defs>' +
  '<linearGradient id="hvMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B8602C"/><stop offset=".5" stop-color="#7A3517"/><stop offset=".75" stop-color="#3A1608"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDEDED"/><stop offset=".5" stop-color="#9A9A9A"/><stop offset="1" stop-color="#4A4A4A"/></linearGradient>' +
  '<filter id="hvBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>' +
  '</defs>' +
  '<rect x="12" y="68" width="416" height="3" rx="1.5" fill="url(#hvSkewer)"/>' +
  chunk(88, 70, 44, 34, [1, 0.82, 1.08, 0.9, 1.12, 0.84, 1.04, 0.92]) +
  chunk(196, 68, 52, 40, [1, 1.1, 0.88, 1.14, 0.86, 1.05, 0.93, 1.08]) +
  chunk(302, 71, 46, 36, [1.06, 0.88, 1, 1.12, 0.9, 0.98, 0.84, 1.07]) +
  chunk(390, 70, 30, 26, [1, 0.9, 1.1, 0.86, 1.04, 0.95, 1, 0.88]) +
  '</svg>';

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  var chip = document.createElement('span');
  chip.className = 'hero-chip';
  chip.textContent = 'Level check, 3 min';
  wrap.appendChild(chip);
  wrap.insertAdjacentHTML('beforeend', SVG);
  return wrap;
}

A.hero = hero;
})();
