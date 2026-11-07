# Build notes: Souvla (job-195)

Stylesheets (in load order): fonts.css, then styles.css. styles.css is the old site.css, final.css and hero-fix.css concatenated in that order, so later rules still win and the cascade is unchanged. Consolidation DONE; check.sh passes after it.
Hero art: hero.js (svg(): blob() outlines, CH chunk list, hMeat gradient, hGround fade, skewer rect x=120 width=360, drawn after the chunks). Hero layout: styles.css (.hero-art, .hero-art>svg, .hero-art .hero-chip, .hero::before band, .section-divider, .card).
Brand mark: brand.js (three circles with one bar on top).

## Checks run on this build
- check.sh: exit 0 (index 200, data 200, browser tests, click tests, footers at 883px, above the 900px fold).
- Feature runs (earlier this round, same app): responsive width 390 and 1440 (no overflow), keyboard focus (16 stops, all with a ring), quiz start with no console or page errors.
- Safety grep: no eval, new Function or _blank. innerHTML: app.js:38 (static logo string), app.js:209 (static SVG string), hero.js (code constants and a static chip label).
- Pixel check (earlier build): lower chunk body measured about (24, 8, 3) against #140703.
- .shots/ and PROGRESS.md removed.

## NOT VERIFIED or not done
- Design score vs the 8/10 bar: NOT MEASURED. My own estimate is 7/10, which is below the bar.
- Hero rim and darkening on this final build: NOT re-measured after the last rewrite.
- Brand mark at 16px: rendered at 16, 24, 48px (brandtest page), viewed, reads as a dark bar through three chunks. Not compared against the bar.
- Feature runs on this final build: NOT re-run after the last rewrite; check.sh passes.
- Divider and warm card tint: present in CSS; visible in screenshots, not scored.
