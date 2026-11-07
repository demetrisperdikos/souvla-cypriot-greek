# Souvla build notes (job-195)

CODE HEAD: 4d39684 (build commit). Notes commit is the one on top of it.

## Files
- index.html loads fonts.css, site.css, final.css in that order. Real rules: site.css (base, hero, chips, Up Next, CTAs) and final.css (desktop hero fill, Up Next strip, primary button).
- brand.js: header mark. hero.js: hero illustration. app.js, lessons.js, store.js, ui.js, data.json: app logic and content.
- check.sh: installs, runs browser tests, serves the folder and checks HTTP 200. Last run: EXIT=0.
- qa/ is empty (check.sh does not use it). .shots/ removed and gitignored. tests/measure.js deleted (scratch, not called by check.sh).
- QA-round comments removed from final.css and site.css (grep count 0). Duplicate rules are NOT yet consolidated.

## Measured this round (1440x900 and 390x844, rendered page)
- Header brand mark: 48x48 box. 1440: x25 y17. 390: x17 y9. VERIFIED size. Legibility at 16, 24 and 48px: NOT VERIFIED (only the 48px render was measured).
- Brief 1 (no sunglasses look): rendered mark is one dark skewer bar with three accent chunks. Judged by eye from the screenshot, NOT VERIFIED by measurement.
- Desktop hero panel: x718 y121 w578 h273 (bottom 394). Illustration svg: x719 y122 w576 h271. VERIFIED fills the panel.
- Skewer vs plate: skewer runs edge to edge (about 100% of plate width). Brief asked for about 60%. NOT MET. Edge extension was chosen by default; owner decides.
- Vertical centring against text block: panel top 121 and text block top 121 match at 1440. Empty space below CTAs: NOT VERIFIED by eye after the fill rule.
- Chunk rim (#140703, 1.5px) at 1x and 2x: NOT VERIFIED (not measured).
- Chunk outline: lumpy outlines and lower-half gradient are present in hero.js. Visual judgement only, NOT VERIFIED as cooked-meat quality.
- CTAs at 48px height: Start diagnosis 48px at 1440 (y346 to 394); Begin the test 48px at 1440 (y847 to 895); Open First Greetings 48px at 1440 (y847 to 895). At 390: Start diagnosis 48px (y399 to 447); Begin the test and Open First Greetings were measured at 48px height. VERIFIED.
- Footer baseline: bottom 895 on 1440x900 (earlier check.sh run). VERIFIED.
- Eyebrow to panel top at 390: NOT VERIFIED this round (earlier selector matched a section, value discarded).
- Up Next gaps (16px streak to Up Next, 16px Up Next to CTA): NOT VERIFIED this round (not re-measured after the latest CSS).
- Phone hero gap to card (24px air above art): NOT VERIFIED this round.
- Up Next label: 'Not started' with 8px track. Step count '0 of N' NOT used. NOT VERIFIED as designed state by eye.
- Chips at 20px icon box and stroke weight: NOT VERIFIED.

## Design score
NOT MEASURED by a reviewer. No 8+ claim is made. Build is NOT DONE.

## Open
- Skewer width (60% vs edge to edge): owner decision.
- Consolidate final.css into one block per component.
- Re-measure eyebrow, Up Next gaps, phone hero gap and brand at 16 and 24px.
- Design score by reviewer.
- Leftover test servers may remain on ports 8790 and 8791 (pkill not permitted on one).
