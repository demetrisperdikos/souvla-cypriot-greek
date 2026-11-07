(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: three bold chunks on a thin grey skewer. Chunks fill most of the tile so they read at 16px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><g fill='#B5542A' stroke='#140703' stroke-width='1.5'><circle cx='12' cy='25' r='11'/><circle cx='24' cy='23' r='12.5'/><circle cx='36' cy='25' r='11'/></g><rect x='0' y='22' width='48' height='3' rx='1.5' fill='#6B6B6B'/></svg>";
A.logo = function () { return MARK; };
})();
