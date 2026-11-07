# Build notes: Souvla (job-195)

Commit: 47ef044 (main, local)
Stylesheets: fonts.css, site.css, final.css (final.css loads last).
Key selectors: .hero, .hero::before (warm band), .hero-art, .hero-chip, .hero-copy, .stats, .topbar (z-index 5), .up-next, .up-next-fill, .up-next-pct, .card, .section-divider, .main (bottom padding).
Hero art: hero.js (svg(), blobPath(), CHUNKS, skewer rect x=120 width=360). Brand mark: brand.js.

## Checks run on this commit
- check.sh: exit 0 (index 200, data 200, flows, states, reload, clicktest, footers; footer bottom 883px at 1440).
- Axe WCAG 2 A/AA: clean on home and quiz at 390 and 1440.
- measure.js: phone art to Souvla Test card gap 24px; desktop chips 128px each, phone 114px each.
- brandsizes.js: rendered brand-16.png, brand-24.png, brand-48.png (in .shots/). Only file sizes checked (398, 558, 851 bytes). NOT VERIFIED visually.
- Safety grep (this run):
  - eval / new Function / target=_blank: none
  - innerHTML: app.js:38 (SouvlaArt.logo, static), app.js:208 (static SVG string), hero.js:72 (svg() from code constants plus static chip text)

## NOT DONE or NOT VERIFIED
- Desktop text and CTA centring against the art panel: NOT MET. The copy block fills the full panel height (273px), so there is no offset to centre.
- Hero chunk darkening to #140703 and 1.5px charred rim: in code, not confirmed by pixel check.
- Contact shadow under plate: present, soft; not measured.
- Brand mark at 16 and 24px: rendered, not visually compared.
- Up Next progress: bar element and status text present; checked from code only.
- Design score vs 8/10: NOT SCORED.
- GitHub push: see final status below.
