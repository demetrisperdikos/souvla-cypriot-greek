# Build notes (QA round 3)

## What was built
Cypriot Greek diagnostic and immersion portal. Static site: index.html, site.css, app.js, lessons.js, hero.js, brand.js, souvla-art.js, store.js, ui.js, data.json. Progress is saved in localStorage.

## Live hero file
index.html loads site.css (single stylesheet). Hero art is drawn by hero.js. No hero-r*.css files exist in the listing.

## Changes this round
- site.css: all blue values replaced with terracotta tints or warm neutrals (#F8EADF, #E3D5C3, #8E3A17, rgba(181,83,42,...)). Grep for D6E6FA, B9D3F3, D6E7FB, 9CC4F2, BFDAF8, 5B9BE6, 7FB0E8, 0062CC and rgba(0,98,204) returns nothing.
- merged-round comment headers removed.
- Desktop UP NEXT strip is 47px (site.css, Round 3 rule). Its class next-up is set in app.js line 204.
- Icon tiles have a 1px #E3D5C3 border.
- Level check chip at 16px top-left inset.
- Brand mark: 48px, rendered to brand-crop-48px.png (qa folder) for crop review.
- Hero plate shadow at 390px: a ::after pseudo-element was added. Not yet reviewed visually.
- check.sh exits 0: browser tests, click test (34 controls, 0 errors), footer baseline.

## Measurements (pos-check.js, final run)
1440x900 desktop:
- Begin the test CTA: 832-880 (target about 880: met)
- Test and challenge cards: 440-897
- UP NEXT strip: 777-824, 47px high. Gap from strip bottom to card bottom: 73px (target 115px not met)
- Hero art 137-337, chip 154-186
- Horizontal overflow: 0

390x844 phone:
- Test card top: 774 (the old 854 was wrong)
- Begin the test CTA: 1243-1291 (reported)
- Challenge card 1548-2171. UP NEXT strip 1998-2074. Gap from strip bottom to card bottom: 97px
- Hero art 550-750 (200px), chip 567-599
- Horizontal overflow: 0

## Still open
1. Phone gap rhythm not re-tightened to an 8px scale (97px strip-to-card gap).
2. Design not re-scored against the 8+ bar. Last QA score was 7/10.
3. Duplicate CSS rules in site.css remain (only comment headers removed).

## How to check
- bash check.sh (from projects/job-195)

## Published (round 3)
- Draft link for QA: https://sites.willysilly.com/s/lszpu5cvgx646628/
- check.sh exit 0 on this build (index 200, data 200, browser tests, click test 0 errors, footer baseline).
- Desktop 1440: Begin the test 832-880 (target about 880 met).
- Phone 390: Begin the test 1243-1291; phone UP NEXT to card bottom gap 97px (8px rhythm not met).
- Detached grey shadow bar under the phone hero (.hero-art::after) removed.
- Still open: phone vertical rhythm, a fresh design score against the 8+ bar, and a visual review of the brand crop at qa/brand-crop-48px.png.

## Phone rhythm (round 3, final run)
- UP NEXT strip now 60px (was 76px), on 8px padding.
- Phone gap from UP NEXT strip bottom to card bottom: 97px (not 16px; still above the 8px-rhythm goal).
- Phone Begin the test 1243-1291; challenge card 1548-2155.
- check.sh exit 0 on this build.

## Stale CSS (round 3, partial)
- Card header rules: 16 superseded lines removed; one consolidated block added. Measurements unchanged; check.sh exit 0.
- Hero height: a single .hero-art height rule added at the end of site.css. Rendered hero height is 200px (art 198px, offset 1px) at 390, 600, 768, 899, 900, 1024 and 1440: identical before and after. check.sh exit 0.
- Older overlapping .hero-art rules are still in site.css (not yet deleted).
- Still open: duplicate rules for .mark, .tile, .streak-msg and others; design re-score; brand crop visual review.

## Stale CSS (round 3, brand mark)
- .mark: superseded rules removed; one consolidated block. Computed style and box position identical before and after at 390 and 1440. check.sh exit 0.
- Still open: duplicate .tile, .streak-msg and .btn rules; brand crop visual review (qa/brand-crop-48px.png); fresh design score against the 8+ bar.

## Round 4 measured values (this run)
- Measure JSON: {"390":{"cardBottom":2163,"nextUpBottom":2066,"nextUpHeight":60,"nextUpToCardBottomGap":97,"chipBox":[25,710,166,741],"firstSkewerBox":[37,609,116,682],"chipBottomToSkewerTop":-132,"overflowX":0},"1440":{"cardBottom":894,"nextUpBottom":821,"nextUpHeight":56,"nextUpToCardBottomGap":73,"chipBox":[727,297,868,328],"firstSkewerBox":[772,176,890,285],"chipBottomToSkewerTop":-152,"overflowX":0}}
- xss-probe: {"dialogs":0,"payloadInDom":false,"onerrorInDom":false,"dialogsAfterStorageReload":0}
- xss-storage: {"storageKey":"souvla.state.v2","dialogs":0,"injectedImg":0,"injectedScript":0,"textHasPayload":true,"pass":true}
- check.sh exit: 0
- Live hero file: site.css (styles.css does not exist in this project).

## Round 4 (final pass, measured)
- Live hero and card file: site.css (styles.css does not exist in this project).
- Hero skewers: rewritten as irregular charred meat with one highlight each (souvla-art.js); brand chunk reshaped to match (brand.js).
- Hero chip clearance (corrected): 1440 chip top 297 vs first skewer bottom 285, gap 12px. 390 chip top 710 vs skewer bottom 682, gap 28px. Earlier negative values were a formula error.
- UP NEXT strip, 1440: 56px tall, sits directly above the CTA. Strip bottom 805, card bottom 878. Strip does NOT fill the card; the CTA takes the bottom space.
- UP NEXT strip, 390: 60px tall, strip-to-card-bottom 97px. Not fixed.
- Stat pill numbers: weight 800, 1.0625rem.
- Streak icon: 24px, unpadded.
- Bluish tints replaced with warm tints.
- Duplicate rules still open: .daily-card>.btn, .card>.btn, .btn-primary:hover, .streak-msg, .btn.
- xss-probe and xss-storage: pass (dialogs 0, no injected nodes).
- check.sh exit: 0

## Round 4 (measured, latest)
- Live files: site.css (base), round4.css (round 4 layout, loaded after site.css from index.html).
- Daily challenge card: UP NEXT strip to CTA gap 8px at 1440 and 390 (qa/measure-gap.js: 1440 strip bottom 805, CTA top 813; 390 strip bottom 2026, CTA top 2034). CTA to card bottom 17px at both widths.
- Hero chip clearance: 1440 chip top 297 vs skewer bottom 285 (12px); 390 chip top 710 vs skewer bottom 682 (28px).
- Hero backdrop: warm accent-tint with fine diagonal grain (round4.css), visible in screenshot.
- Skewers: irregular charred meat, one highlight each (souvla-art.js); brand chunk reshaped (brand.js). 48px brand crop not re-checked.
- Still open: duplicate rules in site.css (.daily-card>.btn, .card>.btn, .btn-primary:hover, .streak-msg, .btn) not merged; primary CTA warmth not separately measured.
- xss-probe: {"dialogs":0,"payloadInDom":false,"onerrorInDom":false,"dialogsAfterStorageReload":0}
- xss-storage: {"storageKey":"souvla.state.v2","dialogs":0,"injectedImg":0,"injectedScript":0,"textHasPayload":true,"pass":true}
