(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: three separated lighter chunks on a dark tile, one clear light skewer through them. Reads at 16px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#3A1C0D'/><ellipse cx='10.5' cy='24' rx='5.2' ry='9' fill='#D9803F'/><ellipse cx='24' cy='24' rx='5.2' ry='10.5' fill='#E9995A'/><ellipse cx='37.5' cy='24' rx='5.2' ry='9' fill='#D9803F'/><rect x='2' y='22.75' width='44' height='2.5' rx='1.25' fill='#FFF4EA'/></svg>";
A.logo = function () { return MARK; };
})();
