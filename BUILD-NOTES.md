# BUILD NOTES: Souvla, Cypriot Greek portal (fix round, QA item)

HEAD: 04618a9 (round 18). The fix round commits on top of it.
Stylesheets: index.html loads fonts.css, site.css, final.css. Round-18 rules live in final.css. Nothing in the repo uses styles.css.

## Suite
- check.sh exit 0: index=200, data=200, browser tests passed, clicktest passed (34 controls, 0 with errors), footer baseline passed.
- VERIFIED: 34 controls tested, 0 with errors (clicktest output).

## Fonts (brief: fonts)
- Self-hosted. fonts.css loads fonts/*.woff2 from the same folder. No remote font link exists in index.html, fonts.css or final.css (grep shows none), so Subresource Integrity is not needed.
- VERIFIED: grep for http(s):// in index.html, fonts.css, final.css, site.css returns nothing.

## Repo hygiene
- .shots/ is empty of shot-1440-0.png and shot-390-0.png (removed). .shots/ and uploads/ are git-ignored.
- qa/ is empty. The only test suite check.sh uses is tests/ (test.js, states.js, reload.js, clicktest.js, footers.js); tests/measure.js is not called by check.sh.
- VERIFIED: ls shows no PNGs or scratch scripts in qa/.

## Header chips (brief item 5)
- VERIFIED at 1440: 128 / 128 / 128 px.
- VERIFIED at 390: 114 / 114 / 114 px.
- 20px icon box and 2px stroke: set in final.css (.stat-ico 20x20, stroke-width 2). NOT VERIFIED by measurement in this round.

## Brand mark (brief item 1)
- Redrawn as flat silhouette in brand.js: one skewer bar, three lumpy chunks, cream keyline, one highlight each.
- VERIFIED: rendered #brand svg is 48x48 at 1440 and 390.
- NOT VERIFIED: 16px and 24px renders (not measured in this round). Legibility at those sizes NOT VERIFIED.

## Hero chunks (brief item 2)
- Lumpy path outlines in hero.js, rim #140703 at 1.5px via non-scaling-stroke, one highlight ellipse each.
- VERIFIED in code: stroke colour and width.
- NOT VERIFIED: char gradient on lower half (the gradient is a radial from top-left, not a lower-half darkening), and visual quality of the rim at 1x and 2x density.

## Desktop hero (brief item 3)
- VERIFIED: hero panel 578 x 200 at (718, 121). Plate and skewer run to the panel edges via viewBox -120..720.
- NOT VERIFIED: skewer at 60% of plate width; vertical centring against the text block; empty space top right and below the CTAs.

## Phone hero (brief item 4)
- VERIFIED: hero panel 358 px wide at 390 (16 to 374), i.e. full content width.
- NOT VERIFIED: 24px air above the illustration; trimmed padding above the Souvla Test card.

## Top alignment (brief item 8)
- VERIFIED: hero panel top 121 and eyebrow top 121 at 1440.
- VERIFIED: hero panel top 463 and eyebrow top 141 at 390 (differs, phone stacks the hero).

## Daily challenge UP NEXT strip (brief item 6)
- The 0% grey track is replaced by a lesson meter: the bar is 8px tall and the label reads '0% of this lesson'. The strip is not 'Not started, 0 of 6 steps' as the brief suggested.
- VERIFIED: icon box 24x24, bar 8px tall at 1440 (upIco 24x24, upBar 8px).
- VERIFIED: up-next strip 96px tall at 1440 (735 to 831).
- NOT VERIFIED: the 16px gap between streak row, Up Next box and CTA. The streak row sits at 435 to 483 and the up-next strip starts at 735, so other elements sit between them; the 16px gap was not measured.

## Primary CTAs (brief item 7)
- VERIFIED: Start diagnosis 48px tall (bottom 394 at 1440). Begin the test 48px. Open First Greetings 48px (both bottom 895 at 1440).
- VERIFIED at 390: all three primary CTAs 48px tall.

## Footer / fold
- VERIFIED: footer buttons bottom at 895 on 1440x900 (fold 900).

## Design score
- NOT RE-SCORED by a reviewer. No 8+ claim is made. Measured values above are the only evidence.

## Not verified
Real screen readers, physical phones, Safari, Firefox, Chrome Android. Visual judgement of the hero, brand mark and up-next strip by a reviewer.
OPEN: sad-face mark decision (owner asked; default is the skewer silhouette).