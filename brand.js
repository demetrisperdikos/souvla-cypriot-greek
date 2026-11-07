(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: one bold skewer bar through three separate chunks. Gaps between chunks keep them distinct at 16px.
var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><g fill='#8E3F1C'><rect x='4' y='13' width='11' height='19' rx='5.5'/><rect x='18.5' y='12' width='11' height='21' rx='5.5'/><rect x='33' y='13' width='11' height='19' rx='5.5'/></g><rect x='0' y='21' width='48' height='5' rx='2.5' fill='#140703'/></svg>";
A.logo = function () { return MARK; };
})();
