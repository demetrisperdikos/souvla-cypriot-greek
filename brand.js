(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: one bold skewer through three large chunks. Thick skewer and few details so it reads at 16px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><rect x='2' y='21' width='44' height='6' rx='3' fill='#140703'/><ellipse cx='13' cy='24' rx='9.5' ry='11.5' fill='#8E3F1C'/><ellipse cx='24' cy='24' rx='9.5' ry='11.5' fill='#5A2611'/><ellipse cx='35' cy='24' rx='9.5' ry='11.5' fill='#8E3F1C'/></svg>";
A.logo = function () { return MARK; };
})();
