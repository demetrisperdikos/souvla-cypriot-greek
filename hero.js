(function () {
'use strict';
// Hero scene: three irregular charred chunks threaded on one visible skewer, on a plate that spans the panel.
// Art box 600x220, drawn with preserveAspectRatio slice. Outlines come from a seeded lumpy polygon, so output is deterministic.

function f(n) { return Math.round(n * 10) / 10; }

function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

// Smooth closed blob with uneven lobes: radius varies around the ring by seed.
function blobPath(cx, cy, rx, ry, seed) {
  var n = 14, pts = [], i, t, k;
  for (i = 0; i < n; i++) {
    t = i * 2 * Math.PI / n;
    k = 1 + 0.10 * Math.sin(3 * t + seed) + 0.07 * Math.cos(5 * t + seed * 1.7) + (i % 2 ? 0.05 : -0.03);
    pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k]);
  }
  var m0 = mid(pts[n - 1], pts[0]);
  var d = 'M' + f(m0[0]) + ' ' + f(m0[1]);
  for (i = 0; i < n; i++) {
    var p = pts[i], m = mid(p, pts[(i + 1) % n]);
    d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(m[0]) + ' ' + f(m[1]);
  }
  return d + ' Z';
}

var CHUNKS = [
  { cx: 200, cy: 108, rx: 62, ry: 50, seed: 0.4, hx: -22, hy: -34, hr: -18 },
  { cx: 300, cy: 102, rx: 68, ry: 56, seed: 2.1, hx: -24, hy: -40, hr: -12 },
  { cx: 400, cy: 110, rx: 60, ry: 48, seed: 4.0, hx: -20, hy: -32, hr: -22 }
];

function svg() {
  var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs>' +
    '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#E39A5C"/><stop offset=".35" stop-color="#A9522A"/>' +
    '<stop offset=".45" stop-color="#5A2611"/><stop offset=".65" stop-color="#2A1005"/><stop offset=".85" stop-color="#1A0903"/>' +
    '<stop offset="1" stop-color="#140703"/></linearGradient>' +
    '<linearGradient id="hSkew" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#F4F4F4"/><stop offset=".45" stop-color="#9C9C9C"/>' +
    '<stop offset=".65" stop-color="#5E5E5E"/><stop offset="1" stop-color="#262626"/></linearGradient>' +
    '<linearGradient id="hPlate" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EAE3D4"/></linearGradient>' +
    '</defs>' +
    // plate: shadow, body, rim; spans the full panel width
    '<ellipse cx="300" cy="186" rx="300" ry="20" fill="#5A4A36" opacity=".22"/>' +
    '<ellipse cx="300" cy="180" rx="298" ry="22" fill="#6B5B45"/>' +
    '<ellipse cx="300" cy="176" rx="296" ry="19" fill="url(#hPlate)" stroke="#8A7C63" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
  CHUNKS.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + (c.cy + c.ry * 0.9) + '" rx="' + (c.rx * 0.95) + '" ry="' + (c.ry * 0.22) + '" fill="#1A1A1A" opacity=".3"/>';
    s += '<path d="' + blobPath(c.cx, c.cy, c.rx, c.ry, c.seed) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    s += '<path d="M' + (c.cx - c.rx * 0.5) + ' ' + (c.cy + c.ry * 0.35) + ' q' + (c.rx * 0.5) + ' ' + (c.ry * 0.3) + ' ' + (c.rx) + ' ' + (-c.ry * 0.05) + '" stroke="#140703" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".45"/>';
    s += '<ellipse cx="' + (c.cx + c.hx) + '" cy="' + (c.cy + c.hy) + '" rx="9" ry="2.4" transform="rotate(' + c.hr + ' ' + (c.cx + c.hx) + ' ' + (c.cy + c.hy) + ')" fill="#FFF6EC" opacity=".92"/>';
  });
  // skewer drawn last so it passes in front of the chunks; about 63% of the plate width
  s += '<rect x="110" y="112" width="380" height="10" rx="5" fill="url(#hSkew)" stroke="#1A1A1A" stroke-width="1" vector-effect="non-scaling-stroke"/>' +
    '<rect x="116" y="113" width="368" height="2" rx="1" fill="#FFFFFF" opacity=".6"/>';
  return s + '</svg>';
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = svg() + '<span class="hero-chip">Level check, 3 min</span>';
  return wrap;
}

if (window.SouvlaArt) window.SouvlaArt.hero = hero;
})();
