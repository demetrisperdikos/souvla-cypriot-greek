# Build notes: Souvla (Cypriot Greek), round 75

## Measured results
- Phone 390x844: first quiz answer bottom at 814px (fold 844px). PASS. Souvla Test title top at 405px.
- Desktop 1440x900: first quiz answer bottom at 700px (fold 900px). PASS. Souvla Test title top at 421px.
- Footer at desktop 1440x900 ends at 922px. Not a QA requirement, reported only.
- check.sh: PASS (syntax, server 200, 27 browser tests, 11 state checks, 14 clicktest checks, axe WCAG 2 A/AA clean at 390 and 1440, no console or page errors).
- Keyboard: 11 of 11 stops show a focus ring.
- Horizontal overflow at 390px: 0.

## Changes this round
- Brand mark redrawn: one 4px bar through three large chunks on a cream tile.
- Hero chunks redrawn as irregular outlines, darker lower half, upper highlight, rim and contact shadow. Skewer thinned.
- hv-phone.css: tighter phone topbar, hero copy and stat row.
- hv-focus.css: terracotta focus ring on buttons, tabs and links.
- Removed .shots/, brand-check/, measure18/ and qa-measure/ from the project root.
- The owner's uploaded picture (sad-face graphic) is not used anywhere in the build.

## Not done or not verified
- Design score: not re-scored. QA scored 6/10; the redrawn art still needs an independent review against the 8+ bar.
- 16px brand read: NOT VERIFIED. Not measured this round.
- Day-tab focus ring: NOT VERIFIED. The rule exists in hv-focus.css but no screenshot was captured of it.
- 1024px width: NOT VERIFIED.
- 200% and 400% zoom: NOT VERIFIED.
- Screen reader reading order, physical phone touch targets, branded browsers: manual checks, not run.

## features.json
- passes=true: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12 (each covered by check.sh output above).
- passes=false: 11 (day-tab focus ring not screenshot-verified).

## Publish
- Not yet published in this round. Commit and publish to the existing link follow this file.