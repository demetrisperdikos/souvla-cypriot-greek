(function () {
'use strict';
var U = window.SouvlaUI;
var ACC = '#0062CC';

function add(parent, name, attrs) {
  var n = U.svgNode(name, attrs);
  parent.appendChild(n);
  return n;
}

function wave(s, y, amp, color, op) {
  var d = 'M0 ' + y + ' q30 ' + (-amp) + ' 60 0';
  for (var i = 1; i < 8; i++) d += ' t60 0';
  add(s, 'path', { d: d, fill: 'none', stroke: color, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: op || 1 });
}

// Skewer resting across the grill: meat (warm neutral) and onion (cream) rhythm.
function skewer(s, y, x0, x1, count) {
  add(s, 'path', { d: 'M' + (x0 - 12) + ' ' + y + ' H' + (x1 + 12), stroke: '#8C8C8C', 'stroke-width': 4, 'stroke-linecap': 'round' });
  var step = (x1 - x0) / (count - 1);
  for (var i = 0; i < count; i++) {
    var x = x0 + step * i;
    if (i % 2 === 0) {
      add(s, 'rect', { x: x - 13, y: y - 11, width: 26, height: 22, rx: 7, fill: '#B9B2AA', stroke: '#8A8580', 'stroke-width': 1.5 });
      add(s, 'rect', { x: x - 8, y: y - 7, width: 9, height: 4, rx: 2, fill: '#CFCAC4' });
    } else {
      add(s, 'circle', { cx: x, cy: y, r: 10, fill: '#FBF8F3', stroke: '#E2E1DE', 'stroke-width': 1.5 });
      add(s, 'circle', { cx: x, cy: y, r: 5, fill: 'none', stroke: '#E2E1DE', 'stroke-width': 1.5 });
    }
  }
}

// The mascot: a skewer character with a face. Drawn at (x, y) with its base on that line.
function character(s, x, y, sc) {
  var g = add(s, 'g', { transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' });
  add(g, 'ellipse', { cx: 0, cy: 30, rx: 44, ry: 7, fill: '#5A5A5A', opacity: 0.12 });
  add(g, 'rect', { x: -3, y: -100, width: 6, height: 130, rx: 3, fill: '#B9B2AA' });
  add(g, 'circle', { cx: 0, cy: -104, r: 6, fill: '#B9B2AA' });
  add(g, 'rect', { x: -34, y: -64, width: 68, height: 90, rx: 30, fill: ACC });
  add(g, 'circle', { cx: -22, cy: -12, r: 5, fill: '#8FB6E4', opacity: 0.7 });
  add(g, 'circle', { cx: 22, cy: -12, r: 5, fill: '#8FB6E4', opacity: 0.7 });
  add(g, 'circle', { cx: -12, cy: -28, r: 4.5, fill: '#FFFFFF' });
  add(g, 'circle', { cx: 12, cy: -28, r: 4.5, fill: '#FFFFFF' });
  add(g, 'path', { d: 'M-11 -10 Q0 2 11 -10', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3, 'stroke-linecap': 'round' });
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  var s = U.svgNode('svg', { viewBox: '0 0 480 400', 'class': 'art', focusable: 'false', preserveAspectRatio: 'xMidYMid slice' });
  add(s, 'rect', { x: 0, y: 0, width: 480, height: 400, rx: 28, fill: '#F2F2F0' });
  add(s, 'circle', { cx: 384, cy: 96, r: 64, fill: '#FBF8F3', opacity: 0.7 });
  add(s, 'circle', { cx: 384, cy: 96, r: 40, fill: '#FFFFFF' });
  add(s, 'rect', { x: 0, y: 196, width: 480, height: 70, fill: '#DCE8F5' });
  wave(s, 222, 6, '#BCD3EA', 1);
  wave(s, 246, 5, '#BCD3EA', 0.8);
  add(s, 'path', { d: 'M0 300 Q120 286 240 300 T480 300 V400 H0Z', fill: '#ECEAE6' });
  // parasol on the left
  add(s, 'rect', { x: 46, y: 176, width: 4, height: 124, rx: 2, fill: '#8C8C8C' });
  add(s, 'path', { d: 'M22 182 Q48 150 74 182 Z', fill: '#FFFFFF', stroke: '#E2E1DE', 'stroke-width': 1.5 });
  // grill
  add(s, 'rect', { x: 80, y: 272, width: 8, height: 40, fill: '#4A4A4A' });
  add(s, 'rect', { x: 332, y: 272, width: 8, height: 40, fill: '#4A4A4A' });
  add(s, 'rect', { x: 60, y: 252, width: 300, height: 22, rx: 8, fill: '#5A5A5A' });
  add(s, 'rect', { x: 70, y: 244, width: 280, height: 6, rx: 3, fill: '#8C8C8C' });
  for (var gx = 80; gx <= 340; gx += 14) {
    add(s, 'rect', { x: gx, y: 244, width: 2, height: 8, fill: '#6E6E6E' });
  }
  skewer(s, 230, 90, 350, 5);
  skewer(s, 214, 104, 336, 4);
  character(s, 428, 300, 1);
  wrap.appendChild(s);
  return wrap;
}

function pills(labels) {
  var row = document.createElement('div');
  row.className = 'pills';
  labels.forEach(function (t) {
    var p = document.createElement('span');
    p.className = 'pill';
    p.textContent = t;
    row.appendChild(p);
  });
  return row;
}

var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
var CAPTIONS = {
  done: 'done. Nice work, keep it up.',
  today: 'today. One lesson keeps the streak alive.',
  upcoming: 'still ahead. It unlocks as your streak grows.'
};

// Seven day markers with three states: done, today, upcoming.
function streakPreview(n) {
  n = Math.max(0, Math.min(n || 0, 7));
  var box = document.createElement('div');
  box.className = 'streak-preview';
  if (n === 0) {
    var empty = document.createElement('div');
    empty.className = 'streak-empty';
    var mascotSvg = window.SouvlaArt.flameBadge();
    mascotSvg.setAttribute('class', 'mascot streak-mascot');
    empty.appendChild(mascotSvg);
    var msg = document.createElement('p');
    msg.className = 'small';
    msg.textContent = 'No streak yet. One lesson today starts it.';
    empty.appendChild(msg);
    box.appendChild(empty);
  } else {
    var label = document.createElement('p');
    label.className = 'small';
    label.textContent = n >= 7 ? 'A full week. Keep it going.' : 'Seven days, one lesson each.';
    box.appendChild(label);
  }
  var row = document.createElement('div');
  row.className = 'dots';
  var caption = document.createElement('p');
  caption.className = 'dot-caption small';
  caption.setAttribute('aria-live', 'polite');
  caption.textContent = 'Tap a day to see its status.';
  for (var i = 0; i < 7; i++) {
    var state = i < n ? 'done' : (i === n && n < 7 ? 'today' : 'upcoming');
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot ' + state;
    d.textContent = LETTERS[i];
    d.setAttribute('aria-label', DAYS[i] + ', ' + state);
    d.addEventListener('click', function (st, name) {
      return function () { caption.textContent = name + ' is ' + CAPTIONS[st]; };
    }(state, DAYS[i]));
    row.appendChild(d);
  }
  box.appendChild(row);
  box.appendChild(caption);
  return box;
}

// Small bright mascot used on feature tiles and the empty streak state.
function mascot(kind) {
  var s = U.svgNode('svg', { viewBox: '0 0 48 48', 'class': 'mascot', 'aria-hidden': 'true', focusable: 'false' });
  var body = kind === 'flame' ? '#8C8C8C' : ACC;
  add(s, 'rect', { x: 22, y: 2, width: 4, height: 44, rx: 2, fill: '#B9B2AA' });
  add(s, 'rect', { x: 13, y: 12, width: 22, height: 26, rx: 11, fill: body });
  add(s, 'circle', { cx: 20, cy: 22, r: 2, fill: '#FFFFFF' });
  add(s, 'circle', { cx: 28, cy: 22, r: 2, fill: '#FFFFFF' });
  add(s, 'path', { d: 'M19 28 Q24 31 29 28', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-linecap': 'round' });
  return s;
}

window.SouvlaArt = { hero: hero, pills: pills, streakPreview: streakPreview, mascot: mascot };
})();
