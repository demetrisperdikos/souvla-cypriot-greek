# Build notes: Souvla (job-195), QA round 3

Status: functional checks pass. Design score is 7/10 (self-assessed from this build's screenshots), below the 8/10 bar. NOT FINISHED against the design brief.

## Commit
Base commit: a5d83c8. Uncommitted changes in this round: hero.js (rewritten), BUILD-NOTES.md, brand.js. .shots/ deleted (ls -a | grep -c '^.shots$' prints 0).

## Stylesheets (index.html load order)
fonts.css, site.css, final.css, hero-fix.css (last). Cascade: hero-fix.css overrides final.css, which overrides site.css. Consolidation into one file NOT DONE.

## Real selectors that style the hero and page
- hero-fix.css: .hero-art, .hero-art>svg, .hero-art .hero-chip, .hero::before (warm band), .hero-copy .display, .card, .section-divider, .main (bottom padding 40px), .brand svg
- final.css: .hero-art (base), .hero-art .art, .feature-row > .card
- hero.js: plate ellipse cy=196 rx=360 ry=20 fill #FBF6EF; contact shadows are blurred ellipses (filter hSoft); chunks are 9-lobe blobPath() outlines with hMeat gradient ending #140703; highlight strokes #FFF4E6; skewer rect x=120 w=360 (60% of 600) with hSkew metallic gradient, drawn last
- brand.js: one bar through three circles

## Safety greps (run this round, from projects/job-195)
$ grep -rn "eval(\|new Function\|_blank" --include=*.js --include=*.html . --exclude-dir=node_modules
(no output, exit 1)
$ grep -rln "innerHTML\|eval(" tests/ --exclude-dir=node_modules
(no output, exit 1)
$ grep -rn innerHTML --include=*.js --include=*.html . --exclude-dir=node_modules
./app.js:38: mark.innerHTML = SouvlaArt.logo() (static brand SVG string from code)
./app.js:209: tline.innerHTML = static SVG string literal (no data)
./hero.js:62: wrap.innerHTML = static chip text plus svg() built from code constants
Lesson text: no innerHTML line in app.js, hero.js or brand.js references lessons or data.json content (grep for lesson/data in innerHTML lines: no output, exit 1). Lesson text is set with textContent elsewhere.

## Checks run on this build
- check.sh: exit 0. index 200, data 200, test.js ALL PASSED, states.js ALL STATE CHECKS PASSED (incl. axe WCAG 2 A/AA home and quiz at 390 and 1440: clean), reload persistence PASS, clicktest 34 controls, 0 errors, footers share baseline at bottom 883.
- Screenshots taken by the system after this round's changes (desktop 1440, phone 390). Plate band removed; chunks have varied lobes and darker lower half.

## Design score: 7/10 (not 8)
Still below the bar: chunks read as dark lumps at small size; hero is still a standard two-column layout; the skewer is thin against the chunks.

## NOT VERIFIED (not run this round)
- Brand mark sizes: tests/brandsizes.js renders brand.js at 16, 24, 48px in Chromium and measures the SVG boxes: 16x16, 24x24, 48x48 (exact). Output saved as BRAND-SIZES.png. Visual legibility of the 16px mark in a real browser tab is NOT VERIFIED (manual check).
- Charred rim 1.5px and highlight measurement: not pixel-measured this round.
- Keyboard pass (manual focus order walk): not run this round; check.sh keyboard count from states.js only.
- Axe scan beyond the home and quiz screens: not run.
- Screen reader labels on tabs and chips: manual check, cannot run here.
- Real phone touch targets: manual check, cannot run here.
- 16px brand mark in a real browser tab: manual check, cannot run here.
