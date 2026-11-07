(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Brand mark: one bold skewer bar through three larger chunks, few details.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><rect x='3' y='22.25' width='42' height='3.5' rx='1.75' fill='#140703'/><g fill='#B5542A' stroke='#140703' stroke-width='2'><circle cx='13' cy='24' r='12'/><circle cx='24' cy='24' r='12'/><circle cx='35' cy='24' r='12'/></g></svg>";
A.logo = function () { return MARK; };
})();
