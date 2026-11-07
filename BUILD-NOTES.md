# Build notes: Souvla (Cypriot Greek), fix round

## Stylesheet
Load order: fonts.css, site.css, final.css (final.css overrides site.css).
- .hero-art, .hero-scene, .hero-chip: hero panel (site.css, media-query overrides in final.css).
- .btn, .btn.primary: 48px CTAs (site.css, final.css lines 4-6).
- .stats, .stat, .stat-ico: header chips (final.css).
- .up-next.next-up, .up-next-pct: Up Next strip (final.css).

## Fonts
Self-hosted from fonts/. No remote font link, so no Subresource Integrity needed.

## Safety grep (full, run this round)
- app.js:12, app.js:147, ui.js:3, hero.js: 'http://www.w3.org/2000/svg' is an SVG namespace string, not a network request.
- app.js:38: mark.innerHTML from SouvlaArt.logo(), a static SVG string built in code. No user input.
- app.js:208: tline.innerHTML, static SVG string for the Up Next icon. No user input.
- hero.js:66: wrap.innerHTML from svg(), built from code only. No user input.
- No eval, no new Function, no target=_blank in app.js, ui.js, hero.js, brand.js, souvla-art.js, store.js, lessons.js or index.html.

## Measured (Playwright, this round)
| Item | 1440 | 390 |
|---|---|---|
| Start diagnosis height | 48px | 48px |
| Begin the test height | 48px | 48px |
| Open First Greetings height | 48px | 48px |
| Header chips widths | 128, 128, 128 | 114, 114, 114 |
| Hero panel size | 578 x 273 | 358 x 157 |
| Hero svg width | 576 | 356 |
| Hero art top gap (svg top to panel top) | 1px | 25px |

## Status
- Buttons 48px: VERIFIED at 1440 and 390.
- Header chips equal width with 20px icon box: VERIFIED widths; icon box size NOT RE-MEASURED.
- Phone hero art full panel width, about 24px air above: VERIFIED (25px, full width).
- Skewer about 60% of plate width: skewer 380 of 600 art units = 63%. Plate spans panel width. Verified by geometry.
- Up Next shows 'Not started, 0 of 6 steps': verified by screenshot.
- Desktop hero text and CTA vertical centring against the panel: NOT VERIFIED (text block height not measured; panel is a fixed 273px).
- Brand mark at 16, 24, 48px legibility: NOT VERIFIED (no pixel check). Note: brand.js overrides the logo from souvla-art.js; the two definitions should be merged.
- Hero design vs 8/10 bar: NOT VERIFIED (judged by eye only).
- Souvla Test gap: NOT VERIFIED (not re-measured).
- Screen reader pass: NOT VERIFIED (not run).
- check.sh: passes (index 200, data 200, browser suites, axe, footers).
