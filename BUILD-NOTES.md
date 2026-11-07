# BUILD NOTES: Souvla, Cypriot Greek portal (fix round)

HEAD before this round: 04618a9. Fix-round commit: see git log -1 (notes commit on top of 04618a9).
Stylesheets: index.html loads fonts.css, site.css, final.css. Round-18 rules live in final.css. Nothing uses styles.css.

## Suite
- check.sh exit 0 after every change: index=200, data=200, browser tests, clicktest (34 controls, 0 errors), footer baseline.

## Fonts
- Self-hosted from fonts/*.woff2. No remote font link in index.html, fonts.css or final.css, so no SRI needed.

## Repo hygiene
- .shots/ no longer holds shot-1440-0.png or shot-390-0.png. qa/ is empty.
- check.sh uses tests/ only (test.js, states.js, reload.js, clicktest.js, footers.js). tests/measure.js is not called by check.sh.

## Brief items
1. Brand mark: flat silhouette in brand.js. VERIFIED: rendered 16x16, 24x24, 48x48. NOT VERIFIED: legibility at 16 and 24px (visual judgement).
2. Hero chunks: lumpy outlines, #140703 rim at 1.5px (non-scaling stroke), one highlight each. Chunk fill changed to a linear gradient darkening the lower half (#E9A46A top to #3E1C0C bottom). VERIFIED in code. NOT VERIFIED: rim quality at 1x and 2x density.
3. Desktop hero: plate and skewer run to the panel edges. CONFLICT: a skewer at 60% of plate width cannot also run to the panel edges; edge extension kept, 60% not applied. NOT VERIFIED: vertical centring against the text block and empty space top right / below CTAs.
4. Phone hero: illustration is 358px wide (full content width at 390). VERIFIED: gap above the Souvla Test card is 24px (hero bottom 655, card top 679). NOT VERIFIED: trimmed padding above the card beyond that gap.
5. Header chips: VERIFIED 128/128/128 at 1440 and 114/114/114 at 390. NOT VERIFIED by measurement this round: 20px icon box and stroke weight.
6. Up Next strip: label is '0% of this lesson' with an 8px meter; not the 'Not started, 0 of 6 steps' wording. VERIFIED: 24x24 icon box, 8px meter, strip 96px tall at 1440. VERIFIED: 16px gap from streak preview to Up Next (719 to 735) and from Up Next to CTA (831 to 847) at 1440; same at 390 (1583 to 1599, 1719 to 1735).
7. Primary CTAs: VERIFIED 48px tall at 1440 and 390 (Start diagnosis, Begin the test, Open First Greetings).
8. Top alignment: VERIFIED at 1440, hero panel top 121 and eyebrow top 121. At 390 the hero stacks: panel top 463, eyebrow top 141.

## Footer / fold
- VERIFIED: footer buttons bottom at 895 on 1440x900 (fold 900).

## Design score
- NOT RE-SCORED by a reviewer. No 8+ claim is made.

## Not verified
Screen readers, physical phones, Safari, Firefox, Chrome Android. Visual judgement of hero, brand mark and Up Next strip by a reviewer.
OPEN: sad-face mark decision for the owner (default: skewer silhouette).
Leftover test http.server processes may still run on ports 8765 and 8766. Not killed (permission).

## Round 19b: desktop hero centring (brief item 3, partial)
- Desktop .hero-art is 273px tall (final.css, round 19b block), from the eyebrow top (121) to the hero CTA bottom (394), matching the text block.
- VERIFIED at 1440x900: panel 121 to 394; illustration 177 to 338. Panel centre 257.5, illustration centre 257.5, so the group is vertically centred.
- Phone (390px) is unchanged: round 19 rules are inside min-width:900px.
- NOT VERIFIED: empty space top right and below the CTAs after this change (needs visual review).
