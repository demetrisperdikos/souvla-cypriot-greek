# Build notes: Souvla (Cypriot Greek)

## HEAD
Code commit: d1beb2e (hero.js, brand.js). This notes commit sits on top of it.

## Stylesheet and selectors
Load order in index.html: fonts.css, site.css, final.css (final.css overrides site.css).
- .hero-art, .hero-art > svg, .hero-art .hero-chip: hero panel (site.css, overridden in final.css media queries at 899px and 900px).
- .btn.primary, .btn: 48px CTAs (site.css line 98, final.css lines 4-6).
- .stats, .stat: header chips (site.css, final.css).
- .challenge-card, .challenge-card > .up-next.next-up, .up-next-bar, .up-next-pct: Daily challenge and Up Next strip (final.css).

## Was .up-next renamed?
No. The class is still up-next next-up.

## Fonts
Self-hosted (fonts.css loads fonts/*.woff2 from the same origin). No remote font link, so no Subresource Integrity is needed.

## Repo hygiene
.shots/ and qa/ removed from the working tree. Test suite is tests/ (what check.sh runs). .shots/ stays in .gitignore.

## Safety grep (full output)
Command: grep -n -e innerHTML -e eval -e new Function -e _blank -e http:// *.js *.html *.css
```
app.js:12:  var NS = 'http://www.w3.org/2000/svg';
app.js:38:  mark.innerHTML = (window.SouvlaArt && window.SouvlaArt.logo) ? window.SouvlaArt.logo() : '';
app.js:147:  var NS = 'http://www.w3.org/2000/svg';
app.js:208:  tline.innerHTML = "<svg class='up-next-ico' viewBox='0 0 24 24' width='18' height='18' aria-hidden='true' focusable='false'><path d='M12 2c1 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3.2 2-4.3.2 1.6.9 2.6 2 3.1C11 7.6 11.2 5 12 2z' fill='currentColor'/></svg>";
hero.js:32:    wrap.innerHTML = svg() + '<span class="hero-chip">Level check, 3 min</span>';
ui.js:3:var SVG_NS = 'http://www.w3.org/2000/svg';
```
Review: no eval, no new Function, no target=_blank. http:// hits are SVG namespace strings only (no network requests). innerHTML: app.js:38 (logo, static SVG string), app.js:208 (static SVG string), hero.js (static SVG built in code, no user input). None of these receive user text, so no change was needed.

## Measured (Playwright, this build)
- Start diagnosis, Begin the test, Open First Greetings: 48px at 1440 and 390.
- Hero skewer: 419px of 734px plate at 1440 (57%); 202px of 354px at 390 (57%).
- check.sh exit 0.

## Items
1. Brand mark: one bold bar (6px) with three chunks, no thin lines. Legibility at 16, 24, 48px: NOT VERIFIED (no pixel check run).
2. Hero chunks: lumpy outline, varied lobes, charred lower half (#140703 rim, 1.5px non-scaling stroke), one crisp highlight each. Design judgement against 8/10: NOT VERIFIED.
3. Phone hero: art full width, 24px air above. Up Next: class kept, progress bar hidden; label text only.
4. Screen reader pass: NOT VERIFIED. No real screen reader was run.
5. Desktop hero vertical centring: not changed in this round. NOT VERIFIED against the brief.

## Republish
Same link via publish_website after this commit.
