# Build notes: Fix round (job-195), Round 70

## Status
Partly done. check.sh passes (exit 0). Not yet republished at the time of this note. features.json passes are unchanged.

## Measured (Playwright probe, qa-measure/pos.js, and check.sh)
- 1440x900: Souvla Test card 386 to 881px in the latest probe. Footer bottom 864px in check.sh. Footer above the 900px fold: PASS.
- 390x844: Souvla Test title about 461px. First answer option 787 to 839px. Above the 844px fold: PASS (by 5px).
- Phone hero: the lead paragraph is hidden on phone only (override.css, Round 53). Owner to confirm this is acceptable.
- Phone hero art is 56px tall at 390px. The chunks are small. Design bar at phone width: NOT VERIFIED.

## Visual observations (screenshots)
- Desktop: hero art fills the right panel. Four chunks with irregular outlines, dark lower halves, highlight on upper lobe, thin metal skewer.
- Brand mark: one skewer through three chunks. 16px and 24px read NOT VERIFIED.

## Not verified
- Brand mark at 16px and 24px.
- 1024px width.
- 200% and 400% zoom.
- Design score 8/10 at either width.
- Focus ring on day tabs in the terracotta accent (CSS added, not visually confirmed).

## Changes this round
- Brand mark redrawn (brand.js).
- Skewer 3px with metal gradient (souvla-hero.js).
- Stat tiles lightened and icon boxes set to 20px (override.css).
- Phone and desktop spacing tightened (override.css, Rounds 51 to 70). Several rounds were overrides on top of overrides and should be consolidated later.
