# Build notes: Souvla (job-195)

Live draft: https://sites.willysilly.com/s/lszpu5cvgx646628/

## Stylesheets and selectors
- index.html loads fonts.css, site.css, final.css, hero-fix.css (in that order).
- Hero panel: .hero-art (hero-fix.css), svg inside it: .hero-art > svg. Chip: .hero-art .hero-chip.
- Warm band behind hero: .hero::before (hero-fix.css).
- Card tint: .card (hero-fix.css). Divider: .section-divider (hero-fix.css, markup in app.js home()).
- Hero art, skewer, plate shadow and chunks: hero.js (svg()). Brand mark: brand.js.

## Checks run on this build
- check.sh: exit 0 (index 200, data 200, browser flows, state, reload, click tests, footers 883px at 1440).
- Safety grep: no eval, new Function or _blank. innerHTML: app.js:38 (static logo), app.js:209 (static SVG string), hero.js (code constants and static chip text).
- Features: 12 of 12 marked passing in features.json. Directly run this round: responsive width at 390 and 1440 (no overflow), keyboard focus (16 stops, all with a ring), quiz start with no console or page errors.
- Hero lower body: mean rgb (20, 8, 3) against #140703 target (20, 7, 3).
- Hero chunk rim: 2px black (0, 0, 0) stroke band at the lower edge of each chunk, measured on the rendered svg at 2x.

## Not verified
- Design score vs 8/10: NOT MEASURED. Own estimate 7/10; the bar is not confirmed met.
- Brand mark at 16px in the header: rendered at 16, 24, 48px; legibility against the bar NOT VERIFIED.
- Plate: pale ellipse under the chunks; visual quality against the design bar NOT VERIFIED.

Note: the screenshot tool writes .shots/ into this folder (PNG files). Delete it after each use: rm -rf .shots. It is git-ignored and must not be shipped.
