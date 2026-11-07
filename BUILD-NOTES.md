# Souvla build notes (job-195)

Measured by `tests/measure.js` (run it with BASE=http://127.0.0.1:PORT/index.html from a served copy of this folder). One run, values below.

## Measured values
- 390px UP NEXT strip height: 95px (min-height 72px met: VERIFIED)
- 390px Daily card height: 500px
- 390px CTA gap to card edge: 17px (VERIFIED)
- 1440px UP NEXT strip height: 72px (min-height met: VERIFIED)
- 1440px Daily card height: 429px
- 1440px CTA gap to card edge: 17px (VERIFIED)
- Brand mark size at header: 48 x 48px (VERIFIED)
- Primary button background: rgb(160, 73, 31); radius 999px

## Items
1. Helper note (.week-note) visible at all widths: VERIFIED (restored below the day chips, `hasWeekNote: true` at 390 and 1440).
2. UP NEXT strip flexes with 72px minimum at 390 and 1440: VERIFIED (95px and 72px).
3. CTA sits 17px above card edge at 390 and 1440: VERIFIED.
4. Flame icon and stronger accent fill on UP NEXT: VERIFIED visually in the 1440 screenshot; NOT VERIFIED by computed style.
5. Brand mark 48px sharp and centred: size VERIFIED (48px); centring NOT VERIFIED. The centre-offset reading from the script (-154 at 390, -671 at 1440) is measured from the wrong reference point and is not a valid result. Needs a re-measure against the header box.
6. Brand chunk redraw (irregular outline, charred edge, one highlight): NOT VERIFIED at 48px in a crop; the outline was changed but no crop was taken.
7. Hero skewer chunks: redrawn to a new outline and plate shadow lightened (opacity .45 to .18); NOT VERIFIED as evenly spaced or as matching the palette. Needs owner-level design review.
8. .btn rule consolidation (site.css and final.css): NOT DONE. final.css still overrides .btn.primary; computed-style check at 390 and 1440 NOT VERIFIED.
9. .tile rule consolidation: NOT DONE; NOT VERIFIED.
10. Scratch qa/ tree removed from git (commit 502fb4a) and kept tests moved to tests/: VERIFIED (check.sh runs from tests/).
11. Stray servers on ports 8123-8136 stopped: VERIFIED (none listening).
12. Owner picture (sad-face ring and cloud blob): NOT used as branding. Owner asked whether favicon or lesson illustration; default is current mark until answered.
13. Design bar 8/10 on fresh screenshots: NOT VERIFIED; not scored in this round.
14. Manual checks (screen reader, 390px touch targets, Safari iOS skewer): NOT VERIFIED here (not runnable).
15. Republish from a clean tree with live link and commit hash: PENDING (see final commit below).

## Commands
- `bash check.sh` from the project root (exit 0 at last run).
- `node tests/measure.js` with a served copy and BASE set.
