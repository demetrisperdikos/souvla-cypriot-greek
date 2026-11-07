(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero art: four irregular grilled chunks of varied size on one skewer.
// Charred rim (dark 3-unit stroke), lower half darkened hard, one crisp specular streak per upper lobe.
var CHUNKS = [
  'M30,92 C26,70 44,56 66,60 C78,48 100,50 110,64 C126,70 128,92 116,104 C104,114 80,114 62,110 C44,112 32,104 30,92 Z',
  'M140,88 C134,58 164,38 200,42 C222,30 262,36 276,60 C296,70 300,100 284,116 C266,130 226,132 200,124 C172,130 144,118 140,88 Z',
  'M306,84 C302,62 322,52 342,56 C360,46 384,58 386,78 C394,94 384,110 364,112 C346,118 318,110 308,98 C304,94 307,90 306,84 Z',
  'M396,100 C394,88 404,82 416,84 C428,82 436,92 432,102 C430,112 416,116 406,112 C400,110 397,106 396,100 Z'
];
var STREAK = [
  'M50,70 C62,60 84,58 100,66',
  'M168,60 C190,46 226,44 254,60',
  'M322,66 C332,58 350,58 368,68',
  'M408,90 C412,86 420,85 426,88'
];
var SHADOW = [[76,118,36,5],[205,137,70,6],[330,116,44,5],[414,120,22,4]];

function build() {
  var s = '<svg class="hero-svg" viewBox="0 0 440 144" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">';
  s += '<defs>';
  s += '<linearGradient id="hvChunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A4491F"/><stop offset="0.3" stop-color="#6B2A12"/><stop offset="0.6" stop-color="#2E1207"/><stop offset="1" stop-color="#100402"/></linearGradient>';
  s += '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4F1EE"/><stop offset="0.5" stop-color="#9C958E"/><stop offset="1" stop-color="#5A544F"/></linearGradient>';
  s += '<filter id="hvBlur" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>';
  s += '</defs>';
  s += '<rect x="0" y="84.5" width="440" height="3" rx="1.5" fill="url(#hvSkewer)"/>';
  SHADOW.forEach(function (e) {
    s += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + e[2] + '" ry="' + e[3] + '" fill="#140703" opacity=".3" filter="url(#hvBlur)"/>';
  });
  CHUNKS.forEach(function (d, i) {
    s += '<path d="' + d + '" fill="url(#hvChunk)" stroke="#0C0301" stroke-width="3" stroke-linejoin="round"/>';
    s += '<path d="' + STREAK[i] + '" fill="none" stroke="#FFE6CC" stroke-width="3" stroke-linecap="round" opacity=".95"/>';
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
