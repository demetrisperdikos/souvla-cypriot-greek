(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

var MARK = "<svg class='souvla-mark-svg' width='40' height='40' viewBox='0 0 48 48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#FBF6EF'/><g fill='#9A4A22' stroke='#1E0C03' stroke-width='2.5'><circle cx='14' cy='24' r='11.5'/><circle cx='25' cy='23' r='12.5'/><circle cx='35' cy='24' r='10.5'/></g><rect x='-2' y='21' width='52' height='6' rx='3' fill='#1E1E1E'/></svg>";

function blob(cx, cy, rx, ry, m) {
  var n = m.length, p = [], i;
  for (i = 0; i < n; i++) {
    var a = 2 * Math.PI * i / n - Math.PI / 2;
    p.push([cx + rx * m[i] * Math.cos(a), cy + ry * m[i] * Math.sin(a)]);
  }
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
  var s0 = mid(p[n - 1], p[0]);
  var d = 'M' + s0[0].toFixed(1) + ' ' + s0[1].toFixed(1);
  for (i = 0; i < n; i++) {
    var q = p[i], e = mid(p[i], p[(i + 1) % n]);
    d += ' Q' + q[0].toFixed(1) + ' ' + q[1].toFixed(1) + ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1);
  }
  return d + ' Z';
}

function chunk(cx, cy, rx, ry, m) {
  var s = '<ellipse cx="' + (cx + 4) + '" cy="' + (cy + ry * 0.95).toFixed(1) + '" rx="' + (rx * 0.9).toFixed(1) + '" ry="' + (ry * 0.22).toFixed(1) + '" fill="#140703" opacity=".38" filter="url(#hvBlur)"/>';
  s += '<path d="' + blob(cx, cy, rx, ry, m) + '" fill="url(#hvMeat)" stroke="#140703" stroke-width="1.5" stroke-linejoin="round"/>';
  s += '<path d="M' + (cx - rx * 0.55).toFixed(1) + ' ' + (cy - ry * 0.45).toFixed(1) + ' Q' + (cx - rx * 0.1).toFixed(1) + ' ' + (cy - ry * 0.72).toFixed(1) + ' ' + (cx + rx * 0.35).toFixed(1) + ' ' + (cy - ry * 0.5).toFixed(1) + '" fill="none" stroke="#FFF3DC" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>';
  s += '<path d="M' + (cx - rx * 0.4).toFixed(1) + ' ' + (cy + ry * 0.35).toFixed(1) + ' l' + (rx * 0.3).toFixed(1) + ' ' + (-ry * 0.2).toFixed(1) + ' M' + (cx + rx * 0.05).toFixed(1) + ' ' + (cy + ry * 0.45).toFixed(1) + ' l' + (rx * 0.35).toFixed(1) + ' ' + (-ry * 0.25).toFixed(1) + '" stroke="#140703" stroke-width="2" stroke-linecap="round" opacity=".4"/>';
  return s;
}

var SVG = '<svg class="hero-svg" viewBox="0 0 440 140" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">' +
  '<defs><linearGradient id="hvMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C86F36"/><stop offset=".45" stop-color="#8C4520"/><stop offset=".8" stop-color="#4A200B"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<filter id="hvBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>' +
  '<rect x="14" y="65" width="412" height="3" rx="1.5" fill="#3C3C3C"/>' +
  '<rect x="14" y="65" width="412" height="1" rx="0.5" fill="#BDBDBD" opacity=".7"/>' +
  chunk(92, 66, 44, 32, [1, 0.84, 1.06, 0.92, 1.1, 0.86, 1.02, 0.9]) +
  chunk(196, 64, 54, 40, [1, 1.08, 0.9, 1.12, 0.86, 1.04, 0.94, 1.1]) +
  chunk(300, 68, 48, 34, [1.05, 0.88, 1, 1.12, 0.9, 0.98, 0.84, 1.06]) +
  chunk(384, 66, 30, 24, [1, 0.9, 1.1, 0.86, 1.04, 0.95, 1, 0.88]) +
  '</svg>';

function logo() { return MARK; }

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

A.logo = logo;
A.hero = hero;
})();
