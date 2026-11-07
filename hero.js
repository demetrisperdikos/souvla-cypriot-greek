(function () {
  // Hero scene: skewer runs past both panel edges, plate spans the panel.
  // Three lumpy charred chunks, enlarged 1.2x; rim is #140703 at 1.5 screen px (non-scaling stroke); one crisp highlight each.
  var CHUNKS = [
    { x: 200, r: -6, d: 'M-62 -6 C-70 -36 -40 -66 -10 -58 C6 -74 40 -66 52 -38 C70 -24 68 6 56 22 C64 44 40 66 14 60 C0 72 -30 70 -40 56 C-64 60 -76 36 -66 14 C-74 4 -70 -2 -62 -6 Z', hl: 'translate(-24 -40) rotate(-18)' },
    { x: 300, r: 4, d: 'M-58 -20 C-50 -52 -16 -70 6 -58 C30 -76 66 -48 62 -14 C76 4 66 36 44 46 C40 68 10 74 -6 62 C-28 74 -60 58 -62 30 C-78 18 -74 -10 -58 -20 Z', hl: 'translate(-20 -42) rotate(-14)' },
    { x: 400, r: -3, d: 'M-56 -10 C-62 -44 -28 -62 -6 -50 C14 -72 50 -54 54 -22 C68 -6 64 30 42 42 C34 66 2 68 -10 56 C-30 66 -60 50 -58 22 C-72 12 -66 -4 -56 -10 Z', hl: 'translate(-22 -40) rotate(-22)' }
  ];
  function svg() {
    var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<defs>' +
      '<radialGradient id="hMeat" cx="36%" cy="30%" r="74%"><stop offset="0" stop-color="#F0B27A"/><stop offset=".55" stop-color="#C9783E"/><stop offset="1" stop-color="#8E4A22"/></radialGradient>' +
      '<linearGradient id="hSkew" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A4A4A"/><stop offset="1" stop-color="#1A1A1A"/></linearGradient>' +
      '<linearGradient id="hPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EAE3D4"/></linearGradient>' +
      '</defs>' +
      '<ellipse cx="300" cy="190" rx="300" ry="20" fill="#5A4A36" opacity=".22"/>' +
      '<ellipse cx="300" cy="180" rx="292" ry="24" fill="#6B5B45"/>' +
      '<ellipse cx="300" cy="176" rx="284" ry="20" fill="url(#hPlate)" stroke="#8A7C63" stroke-width="1.5" vector-effect="non-scaling-stroke"/>' +
      '<rect x="-120" y="98" width="840" height="9" rx="4.5" fill="url(#hSkew)"/>';
    CHUNKS.forEach(function (c) {
      s += '<g transform="translate(' + c.x + ' 104) rotate(' + c.r + ') scale(1.2)">' +
        '<path d="' + c.d + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<ellipse cx="-18" cy="-30" rx="11" ry="4" transform="' + c.hl + '" fill="#FFF6EC" opacity=".92"/>' +
        '</g>';
    });
    return s + '</svg>';
  }
  function hero() {
    var wrap = document.createElement('div');
    wrap.className = 'hero-art';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = svg() + '<span class="hero-chip">Level check, 3 min</span>';
    return wrap;
  }
  if (window.SouvlaArt) window.SouvlaArt.hero = hero;
})();
