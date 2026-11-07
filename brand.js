(function () {
// Brand mark: one bold bar through three chunks. The bar sits flush with the outer chunks, so there are no nubs at 16px.
function logo() {
return `<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#FBF6EF'/><g fill='#A0491F'><circle cx='14' cy='24' r='9'/><circle cx='24' cy='23' r='10'/><circle cx='34' cy='24' r='9'/></g><rect x='5' y='21' width='38' height='6' rx='3' fill='#2A0F03'/></svg>`;
}
if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
