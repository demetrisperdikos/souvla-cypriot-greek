(function () {
  var A = window.SouvlaArt;
  var NS = 'http://www.w3.org/2000/svg';

  function node(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  // One scene: a seated mascot at a table with one skewer. 560x300, all edges on the 8px grid.
  function hero() {
    var wrap = document.createElement('div');
    wrap.className = 'hero-art';
    wrap.setAttribute('aria-hidden', 'true');
    var s = node('svg', { viewBox: '0 0 560 300', preserveAspectRatio: 'xMidYMid meet', 'class': 'hero-scene', focusable: 'false' });
    node('rect', { x: 96, y: 200, width: 368, height: 16, rx: 8, fill: '#D3D4CE' }, s);
    node('rect', { x: 120, y: 216, width: 12, height: 56, rx: 4, fill: '#9AA0AA' }, s);
    node('rect', { x: 428, y: 216, width: 12, height: 56, rx: 4, fill: '#9AA0AA' }, s);
    node('line', { x1: 168, y1: 184, x2: 344, y2: 184, stroke: '#7D8390', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
    node('rect', { x: 184, y: 176, width: 32, height: 16, rx: 6, fill: '#B9B2AA' }, s);
    node('rect', { x: 264, y: 176, width: 32, height: 16, rx: 6, fill: '#B9B2AA' }, s);
    node('rect', { x: 432, y: 112, width: 56, height: 56, rx: 20, fill: '#0062CC' }, s);
    node('circle', { cx: 452, cy: 136, r: 4, fill: '#FFFFFF' }, s);
    node('circle', { cx: 468, cy: 136, r: 4, fill: '#FFFFFF' }, s);
    node('path', { d: 'M450 150 Q460 158 470 150', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round' }, s);
    wrap.appendChild(s);
    return wrap;
  }

  // Accent-tinted flame badge for the empty streak state.
  function flameBadge() {
    var s = node('svg', { viewBox: '0 0 48 48', 'class': 'mascot streak-mascot', 'aria-hidden': 'true', focusable: 'false' });
    node('rect', { x: 0, y: 0, width: 48, height: 48, rx: 14, fill: '#E8F1FD' }, s);
    node('path', { d: 'M24 12 C28 18 32 22 32 29 A8 8 0 0 1 16 29 C16 25 18 22 20 20 C20 24 21 26 23 27 C22 21 23 16 24 12 Z', fill: 'none', stroke: '#0062CC', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, s);
    return s;
  }

  A.hero = hero;
  A.flameBadge = flameBadge;
})();
