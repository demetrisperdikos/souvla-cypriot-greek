(function () {
  // Hero scene: skewer runs past both panel edges, plate spans the panel, three charred chunks with a #140703 rim of 1.5 screen px and one crisp highlight each.
  var CHUNKS = [
    { x: 200, r: -6, d: 'M-52 -14 C-56 -40 -30 -58 -8 -50 C14 -62 44 -48 50 -18 C60 4 52 30 34 44 C30 60 4 62 -12 54 C-34 62 -58 46 -54 22 C-62 4 -58 -4 -52 -14 Z', hl: 'translate(-20 -34) rotate(-18)' },
    { x: 300, r: 4, d: 'M-46 -26 C-30 -60 6 -62 22 -48 C46 -50 60 -20 54 4 C64 28 46 52 22 50 C8 64 -20 62 -34 50 C-58 48 -66 22 -56 2 C-62 -10 -56 -20 -46 -26 Z', hl: 'translate(-14 -36) rotate(-14)' },
    { x: 400, r: -3, d: 'M-50 -6 C-54 -34 -26 -54 -4 -46 C18 -62 50 -40 52 -12 C64 8 56 40 32 46 C22 62 -10 60 -20 48 C-40 56 -62 36 -56 14 C-60 4 -54 0 -50 -6 Z', hl: 'translate(-18 -34) rotate(-22)' }
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
      s += '<g transform="translate(' + c.x + ' 104) rotate(' + c.r + ')">' +
        '<path d="' + c.d + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<ellipse cx="-18" cy="-30" rx="11" ry="4.5" transform="' + c.hl + '" fill="#FFF6EC" opacity=".92"/>' +
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
