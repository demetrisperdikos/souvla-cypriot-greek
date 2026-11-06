(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function node(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  // One scene: the Souvla mascot seated at a table with a skewer on the grill. 560x300, edges on the 8px grid.
  function hero() {
    var wrap = document.createElement('div');
    wrap.className = 'hero-art';
    wrap.setAttribute('aria-hidden', 'true');
    var s = node('svg', { viewBox: '0 0 560 300', preserveAspectRatio: 'xMidYMid meet', 'class': 'hero-scene', focusable: 'false' });
    node('ellipse', { cx: 280, cy: 264, rx: 160, ry: 10, fill: '#DCE8F5' }, s);
    node('circle', { cx: 232, cy: 96, r: 64, fill: '#DCE8F5' }, s);
    node('circle', { cx: 232, cy: 96, r: 44, fill: '#FFFFFF' }, s);
    node('path', { d: 'M222 80 Q226 72 222 64 M236 80 Q240 72 236 64', fill: 'none', stroke: '#9DBDE3', 'stroke-width': 3, 'stroke-linecap': 'round' }, s);
    node('rect', { x: 128, y: 200, width: 304, height: 16, rx: 8, fill: '#FFFFFF', stroke: '#CFCFCA' }, s);
    node('rect', { x: 152, y: 216, width: 12, height: 56, rx: 4, fill: '#7D8390' }, s);
    node('rect', { x: 396, y: 216, width: 12, height: 56, rx: 4, fill: '#7D8390' }, s);
    node('line', { x1: 168, y1: 176, x2: 352, y2: 176, stroke: '#4A4F5A', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
    node('line', { x1: 168, y1: 200, x2: 352, y2: 200, stroke: '#4A4F5A', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
    [176, 240, 304, 336].forEach(function (x) {
      node('rect', { x: x - 12, y: 164, width: 24, height: 24, rx: 8, fill: '#C9A27E' }, s);
      node('rect', { x: x - 12, y: 188, width: 24, height: 24, rx: 8, fill: '#C9A27E' }, s);
    });
    node('rect', { x: 424, y: 96, width: 88, height: 88, rx: 24, fill: '#0062CC' }, s);
    node('circle', { cx: 448, cy: 124, r: 6, fill: '#FFFFFF' }, s);
    node('circle', { cx: 488, cy: 124, r: 6, fill: '#FFFFFF' }, s);
    node('path', { d: 'M446 150 Q468 168 490 150', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, s);
    wrap.appendChild(s);
    return wrap;
  }

  window.SouvlaArt = window.SouvlaArt || {};
  window.SouvlaArt.hero = hero;
})();
