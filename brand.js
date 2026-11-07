(function () {
  // Brand mark: bold flat silhouette. One skewer bar, three lumpy chunks about 1.3x the original width,
  // each separated from its neighbour by a cream keyline, one crisp highlight per chunk.
  var LUMP = 'M-7 -1 C-7 -6 -3 -8 0 -7 C3 -8 7 -6 7 -1 C8 3 6 7 2 7.5 C0 8.5 -3 8.5 -4 7 C-7 7 -8 3 -7 -1 Z';
  function chunk(cx) {
    return "<g transform='translate(" + cx + " 24)'>" +
      "<path d='" + LUMP + "' fill='#2A0F03' stroke='#FBF6EF' stroke-width='1.2' paint-order='stroke' stroke-linejoin='round'/>" +
      "<ellipse cx='-2.5' cy='-3.5' rx='2' ry='0.9' transform='rotate(-20 -2.5 -3.5)' fill='#FBF6EF'/>" +
      '</g>';
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='0.5' y='0.5' width='47' height='47' rx='11.5' fill='none' stroke='#E2D6C6'/>" +
      "<rect x='3' y='22.5' width='42' height='3' rx='1.5' fill='#2A0F03'/>" +
      chunk(13) + chunk(24) + chunk(35) +
      '</svg>';
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
