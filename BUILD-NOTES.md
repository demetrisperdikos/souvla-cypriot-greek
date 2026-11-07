# Build notes: Souvla (job-195), QA round 2

Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek

## Run and check
- bash check.sh (installs, runs flows, states, reload, click test, footers; serves on a free port). Exit 0 on this build.
- Stylesheets: fonts.css, site.css, final.css, hero-fix.css (loads last).
- Hero art: hero.js (viewBox 600x220, meet). Brand mark: brand.js.

## Changes this round
- PROGRESS.md untracked with git rm --cached; it stays in .gitignore.
- tests/brandsizes.js and tests/measure.js removed (not run by check.sh).
- uploads/H4v7rLO9oqgJ.png is not used in the js, css or html and is not in the repo (uploads/ is gitignored). Left out until the owner says what it is for.
- Hero chunks: 9-lobe irregular outlines with varied radii, gradient darkening to #140703, 1.5px charred stroke, narrow highlight on each upper lobe.
- Skewer: 360 of 600 units (60% of the plate width).
- Ground band: now runs past the viewBox edges, so the plate reaches both panel edges with a soft contact shadow.
- Level check chip: moved to the top-left above the art on phone (kept clear of the chunks).
- Brand mark: one bold bar through three chunks, no outer nubs.
- Hero: warm band is a flat shape (#F5E4D5), display headline enlarged to clamp(36px, 4.2vw, 56px).

## Checks run
- check.sh: exit 0 (index 200, data 200, flows, states, reload, click test 34 controls, footers at 883px at 1440 and 390).
- Axe WCAG 2 A/AA: clean on home and quiz at 390 and 1440.
- Screenshots (1440 and 390) taken after the last change.

## Design score: 7/10 (self-measured from the new screenshots). Below the 8/10 bar.
Remaining gaps I can see: the plate still reads as a flat grey strip, the chunks are still small in the panel, and the warm band is still a fairly plain tint rather than a designed shape.

## NOT VERIFIED
- Brand mark at 16px and 24px: rendered by source, not visually compared at pixel level.
- Charred rim and #140703 darkening: in the code, not confirmed by pixel check.
- Desktop eyebrow offset: text starts about 8px below the panel top.
- Up Next progress: checked from source only.
- Owner picture purpose: not confirmed with the owner.
