# Build notes: job-195, Round 72

## Status
NOT DONE. Design bar not met. features.json passes unchanged (all 12 remain as they were).

## Measured (qa-measure/pos.js, check.sh)
- 1440x900: Souvla Test card 402 to 881px. Footer bottom 864px. Footer above the 900px fold: PASS. Title and first answer above the fold: PASS.
- 390x844: Souvla Test title about 465px. First answer option 791 to 843px. Above the 844px fold: PASS by 1px.
- check.sh: exit 0 (index 200, data 200, browser tests, clicktest, footer baseline).

## Known problems (not fixed)
- Phone hero art is about 56px tall. The four chunks read small and the panel is mostly empty. The brief's item 1 (chunks readable at phone width) is NOT MET. Making the art bigger pushes the first answer below 844px, so items 1 and 4 conflict at this layout. A real fix needs the hero copy and the art reflowed, not more overrides.
- Phone lead paragraph is hidden (override.css, Round 53). Owner must confirm, since it removes copy.
- override.css holds Rounds 51 to 72 stacked on each other. It should be merged into the base styles.

## NOT VERIFIED
- Brand mark at 16px and 24px (rendered to qa-measure/brand-sizes.png, not inspected).
- 1024px width.
- 200% and 400% zoom.
- Day-tab focus ring in terracotta (CSS added, not seen in a screenshot).
- Design score 8/10 at either width.
