(function () {
  function chunk(cx, cy, rot) {
    return "<g transform='translate(" + cx + " " + cy + ") rotate(" + rot + ")'>" +
      "<path d='M-10 -5 Q-12 -12 -4 -11 Q2 -15 9 -9 Q12 -2 9 4 Q11 11 3 11 Q-2 14 -8 9 Q-13 4 -10 -5 Z' fill='#B8642E' stroke='#3A1606' stroke-width='1.6' stroke-linejoin='round'/>" +
      "<ellipse cx='-3' cy='-5' rx='2.6' ry='1.2' transform='rotate(-20 -3 -5)' fill='#FFE2B8' opacity='.85'/>" +
      "</g>";
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='0.5' y='0.5' width='47' height='47' rx='11.5' fill='none' stroke='#E2D6C6'/>" +
      "<line x1='6' y1='26' x2='42' y2='22' stroke='#3A1606' stroke-width='2.5' stroke-linecap='round'/>" +
      chunk(12, 25, -6) + chunk(24, 23, 4) + chunk(36, 25, -4) +
      "</svg>";
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
