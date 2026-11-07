# Build notes: Fix round (job-195), Round 52

## Status
NOT DONE. Not republished. features.json passes unchanged.

## Measured (check.sh, 1440x900)
- Footer bottom: 883px. Footer above 900px fold: PASS.
- check.sh: OK index=200 data=200, browser tests, clicktest and footer baseline all pass.

## Visual observations (screenshots, estimates from the image)
- 390px: Souvla Test title at about y=696. Stat tiles start about y=818. First bullets are below 844px. Item 4 FAIL.
- 1440px: Souvla Test card first block sits above the fold. Card still runs past 900px. Item 5 FAIL.
- Hero art: chunks have irregular outlines, dark lower halves and a highlight on the upper lobe. Skewer thinned to 3px with metal gradient. Art is small at 390px.
- Brand mark: one skewer through three chunks. Reads as three circles at 48px. 16px read NOT VERIFIED.

## Not verified
- Brand mark at 16px and 24px: NOT VERIFIED.
- 1024px width: NOT VERIFIED.
- 200% and 400% zoom: NOT VERIFIED.
- Design score 8/10 at either width: NOT VERIFIED.

## Done in this round
- Brand mark redrawn (brand.js).
- Skewer thinned to 3px with metal gradient (souvla-hero.js).
- Contact shadow opacity raised to .28.
- Focus ring on day tabs (override.css).
- Icon boxes set to 20px (override.css).
- Card stat tiles lightened (override.css).
- Rooted .shots/, brand-check/, measure18/ removed.
