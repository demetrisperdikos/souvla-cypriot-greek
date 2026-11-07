# Build notes: job-195, Round 73

## Status
NOT DONE. Design bar not met. features.json passes unchanged (all 12 remain as they were).

## Measured (qa-measure/pos.js, check.sh)
- 1440x900: Souvla Test card 402 to 881px. Footer bottom 864px. Footer above the 900px fold: PASS.
- 390x844: first answer option 791 to 843px. Above the 844px fold: PASS by 1px.
- check.sh: exit 0.

## Brand mark (viewed in qa-measure/brand-view screenshot)
- 48px: three chunks on a visible skewer bar. Reads as a skewer mark.
- 24px: reads as chunks with a bar, legible but small.
- 16px: reads as a dark blob. NOT MET (item 3).

## Known problems (not fixed)
- Phone hero art is about 56px tall. The chunks read small. Enlarging them pushes the first answer below 844px. Items 1 and 4 conflict in the current layout. Needs the phone hero reflowed in the base styles.
- Phone lead paragraph hidden (override.css, Round 53). Owner must confirm.
- override.css holds Rounds 51 to 72 stacked. Should be merged into the base styles.

## NOT VERIFIED
- Day-tab focus ring in terracotta (CSS added, not seen in a screenshot).
- 1024px width, 200% and 400% zoom.
- Design score 8/10 at either width.
