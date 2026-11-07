(function () {
  // Brand mark: one flat skewer bar across the full width, three lumpy chunks on it.
  // Bar is dark ink; chunks are the warm accent so the bar shows between them.
  var LUMP = 'M-5 -1 C-6 -5 -3 -6 0 -6 C3 -6 6 -5 6 -1 C7 2 5 5 1 5 C-2 6 -6 4 -5 0 Z';
  function chunk(cx, cy) {
    return "<path transform='translate(" + cx + " " + cy + ")' d='" + LUMP + "' fill='#A0491F'/>";
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='3' y='22.5' width='42' height='3' rx='1.5' fill='#2A0F03'/>" +
      chunk(13, 24) + chunk(24, 24) + chunk(35, 24) +
      '</svg>';
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
