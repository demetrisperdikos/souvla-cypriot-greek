(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero art: four irregular grilled chunks on one thin skewer.
// Charred rim is a 1.5px stroke at 1x; lower halves darken toward #140703; one crisp highlight per upper lobe.
var CHUNKS = [
  'M62,98 C58,80 74,66 92,68 C100,58 118,60 124,72 C138,76 140,96 128,108 C118,118 96,120 80,114 C68,112 63,106 62,98 Z',
  'M150,96 C146,70 170,52 204,54 C222,40 256,44 268,64 C290,70 296,96 282,114 C272,128 240,132 214,126 C190,134 156,124 150,96 Z',
  'M300,92 C298,74 314,64 332,68 C344,56 368,60 372,76 C384,84 382,104 368,112 C354,120 326,118 312,110 C302,106 300,100 300,92 Z',
  'M386,106 C384,96 394,90 404,92 C414,94 418,104 412,112 C406,118 390,116 386,106 Z'
];
var HIGHLIGHTS = [
  'M80,80 C88,74 100,74 108,78',
  'M176,68 C192,58 218,56 240,62',
  'M316,80 C324,74 340,72 352,76',
  'M394,100 C398,96 404,95 408,97'
];
var CONTACT = [[96,121,30,4],[214,131,62,5],[342,119,38,4],[400,117,16,3]];

function build() {
  var s = '<svg class="hero-svg" viewBox="0 0 440 144" width="100%" role="img" aria-label="Grilled souvla chunks on a skewer">';
  s += '<defs>';
  s += '<linearGradient id="hvChunk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A4220"/><stop offset="0.45" stop-color="#4A1D0C"/><stop offset="1" stop-color="#140703"/></linearGradient>';
  s += '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDE8E3"/><stop offset="0.5" stop-color="#9C958E"/><stop offset="1" stop-color="#5A544F"/></linearGradient>';
  s += '<filter id="hvBlur" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="3"/></filter>';
  s += '</defs>';
  s += '<rect x="0" y="94" width="440" height="3" rx="1.5" fill="url(#hvSkewer)"/>';
  s += '<rect x="0" y="94.6" width="440" height="0.8" fill="#FFFFFF" opacity=".55"/>';
  CONTACT.forEach(function (e) {
    s += '<ellipse cx="' + e[0] + '" cy="' + e[1] + '" rx="' + e[2] + '" ry="' + e[3] + '" fill="#140703" opacity=".35" filter="url(#hvBlur)"/>';
  });
  CHUNKS.forEach(function (d, i) {
    s += '<path d="' + d + '" fill="url(#hvChunk)" stroke="#0C0301" stroke-width="1.5" stroke-linejoin="round"/>';
    s += '<path d="' + HIGHLIGHTS[i] + '" fill="none" stroke="#FFE0BF" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>';
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
