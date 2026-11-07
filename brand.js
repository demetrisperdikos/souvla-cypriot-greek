(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: one bold light skewer through three larger chunks on a dark tile. Legible at 16, 24 and 48px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='10' fill='#3A1C0D'/><rect x='2' y='22.5' width='44' height='3' rx='1.5' fill='#F4E9DE'/><ellipse cx='11' cy='24' rx='7' ry='11' fill='#D9733A'/><ellipse cx='24' cy='24' rx='8' ry='13' fill='#E9995A'/><ellipse cx='37' cy='24' rx='7' ry='11' fill='#D9733A'/></svg>";
A.logo = function () { return MARK; };
})();
