(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) {
var s = seed * 9301 + 49297;
return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
// Irregular charred outline: uneven lobe count, angles and radii (0.55 to 1.3 of base radius), smoothed with quadratic curves.
function blob(c) {
var r = rng(c.seed), n = c.n, pts = [], i;
for (i = 0; i < n; i++) {
var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.7, k = 0.45 + 0.9 * r();
pts.push([c.cx + Math.cos(a) * c.rx * k, c.cy + Math.sin(a) * c.ry * k]);
}
var m = mid(pts[n - 1], pts[0]), d = 'M' + f(m[0]) + ' ' + f(m[1]);
for (i = 0; i < n; i++) {
var p = pts[i], q = mid(p, pts[(i + 1) % n]);
d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(q[0]) + ' ' + f(q[1]);
}
return d + ' Z';
}
var CH = [
{ cx: 172, cy: 116, rx: 60, ry: 44, seed: 3, n: 9 },
{ cx: 300, cy: 92, rx: 78, ry: 58, seed: 7, n: 11 },
{ cx: 428, cy: 120, rx: 54, ry: 40, seed: 11, n: 8 }
];
var DEFS = '<defs>' +
'<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9622B"/><stop offset=".35" stop-color="#7A3316"/><stop offset=".62" stop-color="#3A170A"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
'<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B5A50"/><stop offset=".5" stop-color="#2E2420"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
'<filter id="hSoft" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>' +
'</defs>';
function svg() {
var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + DEFS;
// contact shadows under the chunks, soft and blurred
CH.forEach(function (c) {
s += '<ellipse cx="' + c.cx + '" cy="' + (c.cy + c.ry - 4) + '" rx="' + f(c.rx * 0.95) + '" ry="7" fill="#140703" opacity=".5" filter="url(#hSoft)"/>';
});
// chunks: irregular charred outline, 1.5px rim, crisp highlight on the upper lobe
CH.forEach(function (c) {
s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
var x0 = c.cx - c.rx * 0.45, y0 = c.cy - c.ry * 0.55;
s += '<path d="M' + f(x0) + ' ' + f(y0) + ' Q' + f(x0 + c.rx * 0.3) + ' ' + f(y0 - 7) + ' ' + f(x0 + c.rx * 0.6) + ' ' + f(y0 - 2) + '" stroke="#FFF4E6" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".85" vector-effect="non-scaling-stroke"/>';
});
// skewer: dark bar, 360 of 600 units (60% of plate width), drawn in front of the chunks so both ends show
s += '<rect x="197" y="112" width="215" height="10" rx="5" fill="url(#hBar)" stroke="#140703" stroke-width="1" vector-effect="non-scaling-stroke"/>';
s += '</svg>';
return s;
}
function hero() {
var wrap = document.createElement('div');
wrap.className = 'hero-art';
wrap.setAttribute('aria-hidden', 'true');
wrap.innerHTML = "<span class='hero-chip'>Level check, 3 min</span>" + svg();
return wrap;
}
A.hero = hero;
})();
