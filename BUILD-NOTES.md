# BUILD NOTES: Souvla, Cypriot Greek portal (QA round 4)

Code commit: 567acb9. This notes commit is the new HEAD and only changes BUILD-NOTES.md.
Every item is VERIFIED with a measured value (Playwright, 1440x900 and 390x844) or marked NOT VERIFIED or FAIL with a reason.

## Stylesheets and selectors
Loaded by index.html in this order: fonts.css, site.css, final.css. There is no styles.css.
Header chips: .stats, .stat, .stat-ico, .stat-label (final.css round 4 block).
Hero: .hero, .hero-copy, .hero-art, .hero-art svg, .hero-chip (final.css round 4 blocks; later blocks override earlier ones).
Daily card: .challenge-card, .up-next.next-up (class kept, not renamed), .up-next-bar (display:none, label kept).
Duplicate .hero-art height rules were overridden in final.css, not merged into site.css. This is a known cascade, not a clean consolidation.

## Header chips (VERIFIED, measured)
1440: three chips 128px, 128px, 128px. Labels streak, XP, skewers. No ellipsis, no clipped label (scrollWidth check).
390: three chips 114px, 114px, 114px. Same labels.
Icon box 20px, stroke 2.

## Primary CTA height (VERIFIED, measured in rendered page)
390: Start diagnosis 48px, Begin the test 48px, Open First Greetings 48px.
1440: Start diagnosis 48px, Begin the test 48px, Open First Greetings 48px.

## Daily challenge card (VERIFIED, measured)
Progress track removed. Label kept: 0% of this lesson.
Gaps at 1440 and 390: streak row to Up Next box 16px; Up Next box to CTA 16px; CTA bottom to card bottom 17px.
Up Next box height 84px at 1440, 108px at 390. Minimum is 72px.

## Hero chip vs art (VERIFIED, measured)
The Level check chip sits in a strip above the art. chipOverlapsSvg is false at 1440 and 390.
The art sits inside its panel at both widths (svgInsidePanel true).

## Top alignment (FAIL, measured)
Eyebrow top 121px at 1440. Hero panel top 125px at 1440, so the panel is 4px below the eyebrow. The gap is not closed.
At 390 the eyebrow is at 141px and the hero panel is at 475px. The panel sits after the buttons by design, so it is not aligned to the eyebrow at this width.

## Hero art centring (NOT VERIFIED)
The vertical centre of the art against the copy column was measured as 16px off in an earlier round. It was not re-measured after the final layout change, so it is not claimed as centred.

## Hero art, chunk rim, highlight, brand mark silhouette (NOT VERIFIED, reviewer-judged)
The lumpy outline, #140703 rim and highlight are visual judgments and are not claimed as passed.

## Brand mark sizes (NOT VERIFIED)
Only the 48px brand box was measured (48x48 at 390 and 1440). The 16px and 24px rendered sizes were not measured.

## Sad-face mark (open owner decision)
The owner attachment showed a sad-face logo. It is not used. The brand mark is the skewer silhouette. Owner decision still needed: restore the sad face or keep the skewer.

## Fonts
No googleapis or gstatic link in the project. fonts.css loads self-hosted files from fonts/. nunito-latin-800-normal.woff2 and inter-latin-400-normal.woff2 are preloaded.

## Housekeeping
.shots/ emptied. qa/ kept, check.sh does not use it. Scratch measure scripts were removed after each run.

## Design score
NOT RE-SCORED by a reviewer. No self score is claimed. The 8+ bar is not claimed.

## Checks
bash check.sh exit 0 on commit 567acb9: syntax, index 200, data.json 200, browser flows, state tests, reload, 34-control click test (0 no-op, 0 errors), footer baseline (883px at 1440 and 390, both above the 900px fold).

## Not verified
Real screen readers, physical phones, Safari, Firefox, Chrome Android.
