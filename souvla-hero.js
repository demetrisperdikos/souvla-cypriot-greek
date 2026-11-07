(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero art: four irregular grilled chunks on one 3px skewer.
// Upper lobe is lighter, lower half darkens toward #140703, crisp highlight on top, 1.5px charred rim, soft contact shadow.
var CHUNKS = [
  'M52,80 C49,57 69,44 92,46 C113,43 131,55 128,78 C126,97 108,104 88,102 C66,102 53,96 52,80 Z',
  'M158,82 C153,53 180,35 212,38 C245,35 268,52 265,78 C262,101 240,109 210,106 C180,107 160,100 158,82 Z',
  'M284,86 C281,62 300,47 327,50 C352,49 367,63 364,84 C362,101 346,105 323,102 C299,103 285,98 284,86 Z',
  'M389,88 C387,72 398,63 412,64 C427,63 437,75 434,88 C432,99 421,103 410,102 C396,102 390,96 389,88 Z'
];
var HIGHLIGHT = [
  'M66,62 C80,52 102,52 116,62',
  'M178,56 C196,46 226,46 246,58',
  'M300,66 C312,58 334,58 346,66',
  'M402,74 C409,69 420,69 426,74'
];
var SHADOW = [[90,110,34,6],[211,113,50,7],[325,108,38,6],[411,108,22,4]];

function build() {
  var s = '<svg class="hero-svg" viewBox="0 0 440 140" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">';
  s += '<defs>';
  s += '<linearGradient id="hvChunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8502A"/><stop offset="0.55" stop-color="#5E2611"/><stop offset="1" stop-color="#140703"/></linearGradient>';
  s += '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6E1DC"/><stop offset="0.5" stop-color="#8C857F"/><stop offset="1" stop-color="#4A4541"/></linearGradient>';
  s += '<filter id="hvBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>';
  s += '</defs>';
  s += '<rect x="8" y="68.5" width="424" height="3" rx="1.5" fill="url(#hvSkewer)"/>';
  SHADOW.forEach(function (e) {
    s += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + e[2] + '" ry="' + e[3] + '" fill="#140703" opacity=".32" filter="url(#hvBlur)"/>';
  });
  CHUNKS.forEach(function (d, i) {
    s += '<path d="' + d + '" fill="url(#hvChunk)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    s += '<path d="' + HIGHLIGHT[i] + '" fill="none" stroke="#F2C9A5" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>';
  });
  s += '</svg>';
  return s;
}

var SVG = build();

A.hero = function () {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.innerHTML = SVG;
  return wrap;
};
})();
