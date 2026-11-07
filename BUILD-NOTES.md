# BUILD NOTES: Souvla, Cypriot Greek portal (QA round 5)

Code commit: d653858 (last code change, check.sh exit 0). Measured with Playwright at 1440x900 and 390x844.

## Stylesheets and selectors
Loaded by index.html in order: fonts.css, site.css, final.css. There is no styles.css.
Header chips: .stats, .stat, .stat-ico, .stat-label (final.css round 4 block; later blocks override).
Hero: .hero, .hero-copy, .hero-art, .hero-art svg, .hero-chip (final.css rounds 4 to 13).
Daily card: .challenge-card, .up-next.next-up (class kept, not renamed), .up-next-bar (display:none, label kept).

## Header chips (VERIFIED, measured)
1440: 128px, 128px, 128px. Labels streak, XP, skewers. No ellipsis, not clipped.
390: 114px, 114px, 114px. Same labels.
Icon box 20px, stroke 2 (.stat-ico).

## Primary CTA height (VERIFIED, measured)
390 and 1440: Start diagnosis 48px, Begin the test 48px, Open First Greetings 48px.

## Daily challenge card (VERIFIED, measured)
Progress track removed, label kept (0% of this lesson).
Gaps at 1440 and 390: streak row to Up Next 16px, Up Next to CTA 16px, CTA bottom to card bottom 17px.

## Hero chip vs art (VERIFIED, measured)
chipOverlapsSvg = false at 1440 and 390. Chip sits in a strip above the skewer.

## Top alignment (VERIFIED at 1440, measured)
Eyebrow top 121px, hero panel top 121px (0px difference).
390: eyebrow top 141px; the art panel sits below the buttons at 463px by design (stacked layout), so it is not aligned to the eyebrow at 390.

## Desktop centring (VERIFIED at 1440, measured)
Skewer centre minus copy column centre: 0px at 1440.
390: art sits in the stacked layout; centring against the copy is not applicable.

## Footer (VERIFIED)
Footer baseline 883px at 1440 and 390; footer above the 900px fold at 1440.

## Brand mark (PARTLY VERIFIED)
Measured: brand SVG box 48x48 at 390 and 1440.
NOT VERIFIED: legibility as a crisp silhouette at 16px and 24px, and dark/light system themes. Reviewer-judged.

## Hero art quality (NOT VERIFIED, reviewer-judged)
Lumpy outline, #140703 rim (about 1.5px) and highlight are in the code. Visual quality is for the reviewer to judge.

## Sad-face mark (open owner decision)
The owner attachment showed a sad-face mark. It is not used. The skewer silhouette is the brand mark. Owner has been asked: restore or keep. Default is keep until they answer.

## Fonts
No googleapis or gstatic link in the project. fonts.css loads self-hosted files from fonts/.

## Design score
NOT RE-SCORED by a reviewer. No score is claimed. The 8+ bar is not claimed.

## Not verified
Real screen readers, physical phones, Safari, Firefox, Chrome Android.

## Brand mark sizes (measured, round 14)
Rendered #brand svg measured with inline size overrides: 16px -> 16x16, 24px -> 24x24, 48px -> 48x48 (Playwright, 1440x900). The default header size is 48x48.
Legibility of the silhouette at 16 and 24px is a visual judgement: NOT VERIFIED by a reviewer. Crops saved at /tmp/brand-16.png, /tmp/brand-24.png, /tmp/brand-48.png on the company computer.
Sad-face mark: owner decision asked (ask_owner). Default in use: skewer silhouette.
Design score: NOT RE-SCORED; no 8+ claim.
