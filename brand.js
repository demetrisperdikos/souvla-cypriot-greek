(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: three bold chunks on one dark skewer bar. Drawn at 16, 24 and 48px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><circle cx='12' cy='24' r='12' fill='#B5542A'/><circle cx='24' cy='22' r='13' fill='#B5542A'/><circle cx='36' cy='24' r='12' fill='#B5542A'/><rect x='0' y='19' width='48' height='10' rx='4' fill='#140703'/></svg>";
A.logo = function () { return MARK; };
})();
