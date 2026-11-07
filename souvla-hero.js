(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero art: four irregular grilled chunks of different sizes on one thin skewer.
// Lower half darkens toward #140703, one crisp highlight on each upper lobe, 1.5px charred rim, soft contact shadow.
var CHUNKS = [
  'M52,84 C48,62 66,48 88,50 C104,44 124,52 128,70 C132,86 124,100 104,104 C90,108 66,106 56,98 C52,94 53,89 52,84 Z',
  'M158,84 C152,56 178,36 206,40 C232,32 262,44 266,68 C272,92 256,110 226,112 C200,116 170,108 160,98 C157,94 159,89 158,84 Z',
  'M290,80 C286,60 302,46 324,48 C346,46 362,58 362,76 C362,94 348,104 326,104 C304,106 292,96 290,80 Z',
  'M390,88 C388,76 398,70 410,70 C424,68 434,78 432,88 C431,98 422,103 410,102 C398,103 391,98 390,88 Z'
];
var HIGHLIGHT = [
  'M70,62 C80,54 98,52 112,58',
  'M180,56 C196,46 224,46 244,58',
  'M302,62 C312,56 332,55 346,62',
  'M400,78 C405,73 416,72 424,76'
];
var SHADOW = [[90,108,34,5],[211,113,50,6],[326,107,36,5],[411,106,20,4]];

function build() {
  var s = '<svg class="hero-svg" viewBox="0 0 440 140" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">';
  s += '<defs>';
  s += '<linearGradient id="hvChunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E3F1C"/><stop offset="0.42" stop-color="#5A2611"/><stop offset="0.75" stop-color="#2A1208"/><stop offset="1" stop-color="#140703"/></linearGradient>';
  s += '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F1EE"/><stop offset="0.5" stop-color="#9C958E"/><stop offset="1" stop-color="#5A544F"/></linearGradient>';
  s += '<filter id="hvBlur" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>';
  s += '</defs>';
  s += '<rect x="8" y="68.5" width="424" height="3" rx="1.5" fill="url(#hvSkewer)"/>';
  SHADOW.forEach(function (e) {
    s += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + e[2] + '" ry="' + e[3] + '" fill="#140703" opacity=".28" filter="url(#hvBlur)"/>';
  });
  CHUNKS.forEach(function (d, i) {
    s += '<path d="' + d + '" fill="url(#hvChunk)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    s += '<path d="' + HIGHLIGHT[i] + '" fill="none" stroke="#F2C9A5" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>';
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
