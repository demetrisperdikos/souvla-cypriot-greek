(function () {
  // Brand mark: flat dark silhouette. One skewer bar, three lumpy chunks (about 1.25x), each separated from its neighbour by a cream keyline, one crisp highlight.
  var LUMP = 'M-5 -3 C-5 -7 -2 -8 0 -7 C2 -8.5 5 -7 5 -3 C6 0 5.5 4 2 5 C0 7 -3 7 -4.5 5 C-7 4 -7 0 -5 -3 Z';
  function chunk(cx) {
    return "<g transform='translate(" + cx + " 24) scale(1.25)'>" +
      "<path d='" + LUMP + "' fill='#2A0F03' stroke='#FBF6EF' stroke-width='1' paint-order='stroke'/>" +
      "<ellipse cx='-2' cy='-3.6' rx='1.4' ry='0.6' transform='rotate(-20 -2 -3.6)' fill='#FBF6EF'/>" +
      '</g>';
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='0.5' y='0.5' width='47' height='47' rx='11.5' fill='none' stroke='#E2D6C6'/>" +
      "<rect x='3' y='22.5' width='42' height='3' rx='1.5' fill='#2A0F03'/>" +
      chunk(14) + chunk(24) + chunk(34) +
      '</svg>';
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
