(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Brand mark: three large chunks on one skewer bar, the bar drawn last so it reads at 16px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><g fill='#B5542A' stroke='#140703' stroke-width='2.5'><ellipse cx='13' cy='24' rx='10' ry='11'/><ellipse cx='24' cy='24' rx='11' ry='12.5'/><ellipse cx='35' cy='24' rx='10' ry='11'/></g><rect x='1' y='22.5' width='46' height='3' rx='1.5' fill='#140703'/></svg>";
A.logo = function () { return MARK; };
})();
