(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function node(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  // One scene in the accent tint: the mascot at a table with a skewer on the grill. No brown tiles.
  function hero() {
    var wrap = document.createElement('div');
    wrap.className = 'hero-art';
    wrap.setAttribute('aria-hidden', 'true');
    var s = node('svg', { viewBox: '0 0 560 300', preserveAspectRatio: 'xMidYMid meet', 'class': 'hero-scene', focusable: 'false' });
    node('ellipse', { cx: 280, cy: 264, rx: 170, ry: 10, fill: '#CFDDF0' }, s);
    node('circle', { cx: 200, cy: 96, r: 64, fill: '#DCE8F5' }, s);
    node('circle', { cx: 200, cy: 96, r: 44, fill: '#FFFFFF' }, s);
    node('path', { d: 'M190 80 Q194 72 190 64 M204 80 Q208 72 204 64', fill: 'none', stroke: '#9DBDE3', 'stroke-width': 3, 'stroke-linecap': 'round' }, s);
    node('rect', { x: 112, y: 200, width: 320, height: 16, rx: 8, fill: '#FFFFFF', stroke: '#CFCFCA' }, s);
    node('rect', { x: 136, y: 216, width: 12, height: 56, rx: 4, fill: '#7D8390' }, s);
    node('rect', { x: 408, y: 216, width: 12, height: 56, rx: 4, fill: '#7D8390' }, s);
    node('line', { x1: 152, y1: 180, x2: 344, y2: 180, stroke: '#4A4F5A', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
    [168, 216, 264, 312].forEach(function (x) {
      node('rect', { x: x - 14, y: 166, width: 28, height: 28, rx: 10, fill: '#E4E9F1', stroke: '#B8C3D4' }, s);
    });
    node('rect', { x: 400, y: 80, width: 96, height: 96, rx: 28, fill: '#0062CC' }, s);
    node('circle', { cx: 428, cy: 116, r: 7, fill: '#FFFFFF' }, s);
    node('circle', { cx: 468, cy: 116, r: 7, fill: '#FFFFFF' }, s);
    node('path', { d: 'M424 144 Q448 164 472 144', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 5, 'stroke-linecap': 'round' }, s);
    wrap.appendChild(s);
    return wrap;
  }

  window.SouvlaArt = window.SouvlaArt || {};
  window.SouvlaArt.hero = hero;
})();
