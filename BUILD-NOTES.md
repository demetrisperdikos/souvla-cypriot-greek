# Build notes: Souvla (job-195), QA round 3

Commit: a0c4b9e (notes commit follows). Check: bash check.sh, exit 0.

## Items

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Helper note (.week-note) visible | VERIFIED | hasWeekNote true at 390 and 1440 (measure.js) |
| 2 | UP NEXT strip minimum 72px | VERIFIED | strip 97px at 390, 72px at 1440 |
| 3 | CTA 8px under strip, 17px above card edge | VERIFIED | ctaGapToCardEdge 17 at 390 and 1440 |
| 4 | Flame icon and accent fill on UP NEXT | NOT VERIFIED (computed) | Visible in 1440 screenshot; no computed-style check |
| 5 | Brand mark 48px, centred | PARTLY VERIFIED | Size 48x48 at both widths. Vertical: +1px from header centre at 1440 (VERIFIED); -27px at 390 (header is two rows, so this is not a defect, but not a centring pass). Horizontal offset -154 (390) and -671 (1440) is the logo's left-aligned position, not a centring test. |
| 6 | Brand chunk redraw reads at 48px | NOT VERIFIED | No crop taken or reviewed |
| 7 | Hero plate contact shadow | NOT VERIFIED | Second ellipse added in hero.js (opacity .34, plus existing .18). No crop taken. |
| 8 | One .btn.primary base and one hover rule | VERIFIED | final.css has one base and one hover rule; computed background rgb(160, 73, 31) at 390 and 1440 |
| 9 | One .tile base rule | VERIFIED | final.css .tile override removed; site.css .tile base appears once (line 61). Lesson-card tile (line 259) and tile-blue (line 342) are separate selectors. |
| 10 | Scratch tree removed, tests in tests/ | VERIFIED | Earlier round; check.sh runs from tests/ |
| 11 | Stray local servers stopped | NOT VERIFIED | pkill could not stop one server (permission). Port 8123 may still be listening from measurement. |
| 12 | Owner picture not used as branding | VERIFIED | Default mark kept; owner question open |
| 13 | Design score 8+ | NOT VERIFIED | Not re-judged in this round |
| 14 | Manual checks: screen reader, 390px touch targets, Safari iOS skewer | NOT VERIFIED | Not runnable here |
| 15 | Republish from clean tree with commit hash | PENDING | Draft link is published from a0c4b9e; republish after notes commit |

## Commands
- bash check.sh (from project root)
- BASE=http://127.0.0.1:8123/index.html node tests/measure.js (with a served copy)
