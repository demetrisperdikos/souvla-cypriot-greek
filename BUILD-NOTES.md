# Build notes: job-195, Round 74

## Status
NOT DONE. Not republished. Design bar not met (QA scored 6/10, bar is 8).

## Measured (qa-measure/pos.js, run on a fresh server)
- 390x844: card title 547px, stat tiles 691px, first question 789 to 837px, first option 872 to 924px. First answer is BELOW the 844px fold: FAIL.
- 1440x900: first option 683 to 724px, footer 900 to 908px. Footer is BELOW the 900px fold: FAIL.
- check.sh exits 0, but it does not test these positions. Do not read its exit code as a layout pass.
- clicktest.js could not reach its server on 127.0.0.1:8000 in the last run, so its result is not evidence.

## Brand mark
- 48px and 24px: three separate chunks on one bar. Readable.
- 16px: still a small dark cluster. NOT MET (brief item 3).

## Hero art
- souvla-hero.js redrawn with separate chunks and highlights. Visible at 1440px and 390px.
- Charred rim, lower-half darkening to #140703 and the 1.5px rim at 1x are NOT VERIFIED against a close-up render.

## Done
- .shots/, brand-check/ and measure18/ removed from the project root.
- features.json: all 12 set to passes:false. Each needs a fresh screenshot or test before it can be true.

## Not done
- Phone hero reflow in base styles. Override rules Rounds 51 to 72 are still stacked in override.css and hv-v2.css. They must be merged into styles.css before the 844px fold can pass.
- Phone lead paragraph hidden since Round 53. Owner decision needed: restore it or remove it.
- Day-tab focus ring (terracotta, on an unselected tab) has no screenshot evidence.
- Icon boxes at a consistent 20px: not verified.
- Republish: not done. The link must be rebuilt from the new commit after the fold passes.

## NOT VERIFIED
- 1024px width.
- 200% and 400% zoom.
- Day-tab focus ring.
- 16px brand read (known NOT MET above).
- Design score at 1440px and 390px (QA: 6/10).