(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: one bold skewer bar running diagonally through three larger chunks.
// No thin lines. Built from the Souvla skewer design, not the uploaded test picture.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
  "<defs><linearGradient id='mBar' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#E7D9CC'/><stop offset='.5' stop-color='#4A3B33'/><stop offset='1' stop-color='#140703'/></linearGradient></defs>" +
  "<rect width='48' height='48' rx='12' fill='#F5E4D5'/>" +
  "<g transform='rotate(-18 24 24)'>" +
  "<rect x='2' y='21' width='44' height='6' rx='3' fill='url(#mBar)'/>" +
  "<ellipse cx='12' cy='24' rx='8.5' ry='9' fill='#B5542A'/>" +
  "<ellipse cx='24' cy='24' rx='10' ry='10.5' fill='#8E4119'/>" +
  "<ellipse cx='36' cy='24' rx='8.5' ry='9' fill='#B5542A'/>" +
  "<rect x='2' y='21' width='44' height='6' rx='3' fill='url(#mBar)' opacity='.92'/>" +
  "</g></svg>";
A.logo = function () { return MARK; };
})();
