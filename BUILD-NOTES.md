# Build notes: Souvla (job-195)

Base commit for this notes file: 72a82e4 (main). Pushed to https://github.com/demetrisperdikos/souvla-cypriot-greek
Stylesheets: fonts.css, site.css, final.css (final.css loads last).
Key selectors: .hero, .hero::before (warm band), .hero-art, .hero-chip, .hero-copy, .stats, .topbar (z-index 5), .up-next, .up-next-fill, .up-next-pct, .card, .section-divider, .main (bottom padding).
Hero art: hero.js (svg(), blobPath(), CHUNKS, skewer rect x=120 width=360). Brand mark: brand.js.
Measurement scripts: tests/measure.js (layout boxes), tests/brandsizes.js (renders brand at 16/24/48px).

## Checks run for this commit
- check.sh: exit 0 (index 200, data 200, flows, states, reload, clicktest, footers; footer bottom 883px at 1440).
- Axe WCAG 2 A/AA: clean on home and quiz at 390 and 1440.
- measure.js: 1440 copy group and art panel share the same box (121-394px), offsets 0. 390: art sits 24px above the Souvla Test card. Chips 128px (1440) and 114px (390).
- brandsizes.js: brand-16.png, brand-24.png, brand-48.png written to .shots/. Only file sizes checked (398, 558, 851 bytes). NOT VERIFIED visually.
- Safety grep (run on this commit):
  - eval / new Function / target=_blank: none
  - innerHTML: app.js:38 (SouvlaArt.logo, static), app.js:208 (static SVG string), hero.js:72 (svg() from code constants plus static chip text)

## NOT VERIFIED or NOT DONE
- Desktop visible text: the eyebrow sits inside the copy group, so the text starts about 8px below the panel top. The group box matches the panel.
- Hero chunks: darker lower half (#140703) and 1.5px charred rim are in the code; not confirmed by pixel check. The rim is hard to see at this size.
- Contact shadow under plate: present, soft; not measured.
- Brand mark at 16 and 24px: rendered, not visually compared.
- Up Next progress: bar element and status text present; checked from source only.
- Design score vs 8/10: NOT SCORED.
