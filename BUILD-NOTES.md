# BUILD NOTES: Souvla, Cypriot Greek portal (QA round 4)

HEAD: f901411 (includes the final CSS round 4k and these notes). Last full check.sh run before the notes commit: exit 0.

Every item is VERIFIED with a measured value (Playwright, 1440x900 and 390x844) or marked NOT VERIFIED or FAIL with a reason.

## Stylesheets and selectors
Loaded by index.html in this order: fonts.css, site.css, final.css. There is no styles.css.
Header chips: .stats, .stat, .stat-ico, .stat-label (final.css round 4 block).
Hero: .hero, .hero-copy, .hero-art, .hero-art svg, .hero-chip (final.css round 4 blocks; later blocks override earlier ones).
Daily card: .challenge-card, .up-next.next-up (class kept, not renamed), .up-next-bar (display:none).

## Header chips (VERIFIED, measured)
1440: 128px, 128px, 128px (streak, XP, skewers). No clipped label.
390: 114px, 114px, 114px (streak, XP, skewers). No clipped label.
Icon box 20px, stroke 2 (.stat-ico).

## Primary CTA height (VERIFIED, measured in rendered page)
390: Start diagnosis 48px, Begin the test 48px, Open First Greetings 48px.
1440: Start diagnosis 48px, Begin the test 48px, Open First Greetings 48px.

## Daily challenge card (VERIFIED, measured)
Progress track removed; labelled 0% text kept.
Gaps at 1440 and 390: streak row to Up Next box 16px; Up Next box to CTA 16px; CTA bottom to card bottom 17px.
Up Next box height: 84px at 1440, 108px at 390.

## Hero chip vs art (VERIFIED, measured)
Chip 'Level check, 3 min' sits in a strip above the art. Chip does not overlap the SVG at 1440 or 390. Art is inside its panel at both widths.

## Top alignment (FAIL, 1px off at 1440)
Eyebrow top 121px and hero panel top 122px at 1440 (1px offset, not exactly aligned).
Eyebrow top 141px and hero panel top 475px at 390. The panel sits below the buttons at 390 by design, so this is not an alignment target there.

## Hero art, chunk rim, highlight, brand mark
NOT VERIFIED (reviewer-judged): lumpy outline, #140703 rim, crisp highlight, and the overall quality of the hero art.
NOT VERIFIED: brand mark at 16, 24 and 48px in the rendered header. Only the 48px box was measured (48x48 at 390 and 1440).
NOT VERIFIED: vertical centring of the art against the copy column at 1440 after the last change. An earlier round measured 16px off; not re-measured after round 4k.

## Sad-face mark (open owner decision)
The owner attachment showed a sad-face logo. It is not used. The brand mark is the skewer silhouette. Owner decision still needed: restore the sad face or keep the skewer.

## Fonts
No googleapis or gstatic link in the project. fonts.css loads self-hosted files from fonts/.

## Housekeeping
.shots/ emptied. qa/ kept (not used by check.sh). Scratch measure scripts removed after each run.

## Design score
NOT RE-SCORED by a reviewer. No self score is claimed. The 8+ bar is not claimed.

## Checks
bash check.sh exit 0: syntax, index 200, data.json 200, browser flows, state tests, reload, 34-control click test (0 no-op, 0 errors), footer baseline (883px at 1440 and 390; both above the 900px fold).

## Not verified
Real screen readers, physical phones, Safari, Firefox, Chrome Android.
