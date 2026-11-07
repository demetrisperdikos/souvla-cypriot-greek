(function () {
'use strict';
// Round 19 brand mark: one skewer line through three seared chunks with a highlight.
// Drawn on a 32 grid so it reads at 24px and 48px on the accent tile.

function chunkPath(cx) {
  var l = cx - 4.2, r = cx + 4.2;
  return 'M' + l + ' 16 C' + (l - 0.6) + ' 11.5 ' + (cx - 2.4) + ' 8.6 ' + cx + ' 8.8 ' +
    'C' + (cx + 2.4) + ' 8.6 ' + (r + 0.6) + ' 11.5 ' + r + ' 16 ' +
    'C' + (r + 0.6) + ' 20.5 ' + (cx + 2.4) + ' 23.4 ' + cx + ' 23.2 ' +
    'C' + (cx - 2.4) + ' 23.4 ' + (l - 0.6) + ' 20.5 ' + l + ' 16 Z';
}

function logo() {
  var xs = [8, 16, 24];
  var chunks = xs.map(function (cx) {
    return '<path d="' + chunkPath(cx) + '" fill="url(#brandMeat19)" stroke="#3B1606" stroke-width="1"/>' +
      '<path d="M' + (cx - 1.8) + ' 12.5 L' + (cx + 1.2) + ' 19.5" stroke="#3B1606" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>' +
      '<circle cx="' + (cx - 1.6) + '" cy="11.6" r="1.1" fill="#FFFFFF" opacity=".95"/>';
  }).join('');
  return '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
    '<defs><radialGradient id="brandMeat19" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFD9A0"/><stop offset=".5" stop-color="#E0883A"/><stop offset="1" stop-color="#7A3510"/></radialGradient></defs>' +
    '<path d="M2 16 H30" stroke="#E9EEF8" stroke-width="1.8" stroke-linecap="round"/>' +
    chunks +
    '</svg>';
}

if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
