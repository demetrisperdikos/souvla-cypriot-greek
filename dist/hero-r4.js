(function () {
'use strict';
var U = window.SouvlaUI;
var A = window.SouvlaArt || (window.SouvlaArt = {});

function n(name, attrs, parent) {
  var e = U.svgNode(name, attrs);
  if (parent) parent.appendChild(e);
  return e;
}

// Skewer on a stick: alternating meat cubes and onion rounds.
function skewer(s, y, x0, x1, count) {
  n('path', { d: 'M' + (x0 - 14) + ' ' + y + ' H' + (x1 + 14), stroke: '#7A8699', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
  var step = (x1 - x0) / (count - 1);
  for (var i = 0; i < count; i++) {
    var x = x0 + step * i;
    if (i % 2 === 0) {
      n('rect', { x: x - 15, y: y - 12, width: 30, height: 24, rx: 8, fill: '#C9A27A', stroke: '#A67F57', 'stroke-width': 1.5 }, s);
    } else {
      n('circle', { cx: x, cy: y, r: 11, fill: '#FFFFFF', stroke: '#CFCFCA', 'stroke-width': 1.5 }, s);
    }
  }
}

// Blue mascot face drawn at a given size, anchored top-left.
function mascot(s, x, y, size) {
  var k = size / 120;
  var g = n('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + k + ')' }, s);
  n('rect', { x: 0, y: 0, width: 120, height: 120, rx: 34, fill: '#0062CC' }, g);
  n('circle', { cx: 42, cy: 52, r: 8, fill: '#FFFFFF' }, g);
  n('circle', { cx: 78, cy: 52, r: 8, fill: '#FFFFFF' }, g);
  n('path', { d: 'M38 80 Q60 100 82 80', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  return g;
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  var s = U.svgNode('svg', { viewBox: '0 0 480 320', 'class': 'art', focusable: 'false', preserveAspectRatio: 'xMidYMid meet' });
  // backdrop: soft accent wash with a warm glow behind the grill
  n('rect', { x: 0, y: 0, width: 480, height: 320, fill: '#EAF2FB' }, s);
  n('circle', { cx: 150, cy: 120, r: 96, fill: '#DCE8F5' }, s);
  n('circle', { cx: 150, cy: 120, r: 56, fill: '#F7FAFD' }, s);
  // steam over the grill
  [132, 150, 168].forEach(function (x, i) {
    n('path', { d: 'M' + x + ' 128 q-6 -10 0 -20 t0 -20', fill: 'none', stroke: '#0062CC', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.35 + i * 0.05 }, s);
  });
  // table with soft shadow
  n('ellipse', { cx: 240, cy: 276, rx: 200, ry: 10, fill: '#0B1F3A', opacity: 0.12 }, s);
  n('rect', { x: 52, y: 226, width: 376, height: 28, rx: 10, fill: '#FFFFFF', stroke: '#CFD9E6', 'stroke-width': 2 }, s);
  n('rect', { x: 84, y: 252, width: 12, height: 56, rx: 5, fill: '#7A8699' }, s);
  n('rect', { x: 384, y: 252, width: 12, height: 56, rx: 5, fill: '#7A8699' }, s);
  // grill with two skewers resting on it
  n('rect', { x: 110, y: 200, width: 150, height: 6, rx: 3, fill: '#4A5568' }, s);
  skewer(s, 186, 124, 248, 4);
  skewer(s, 214, 124, 248, 4);
  // mascot at full size, seated beside the table, with a soft shadow
  n('ellipse', { cx: 380, cy: 232, rx: 58, ry: 7, fill: '#0B1F3A', opacity: 0.14 }, s);
  mascot(s, 320, 104, 120);
  wrap.appendChild(s);
  return wrap;
}

// Accent flame badge for the empty streak state.
function flameBadge() {
  var s = U.svgNode('svg', { viewBox: '0 0 48 48', 'class': 'mascot streak-mascot', 'aria-hidden': 'true', focusable: 'false' });
  n('rect', { x: 0, y: 0, width: 48, height: 48, rx: 14, fill: '#E8F1FD' }, s);
  n('path', { d: 'M24 12 C28 18 32 22 32 29 A8 8 0 0 1 16 29 C16 25 18 22 20 20 C20 24 21 26 23 27 C22 21 23 16 24 12 Z', fill: 'none', stroke: '#0062CC', 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, s);
  return s;
}

A.flameBadge = flameBadge;
A.hero = hero;
})();
