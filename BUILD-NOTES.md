# Build notes, Souvla (job-195), current measured values

Run: bash check.sh (exit 0). Measurements: qa/measure-r10.js (qa/measure-final.json), qa/measure-r15.js (qa/measure-phone-cards.json). Crops: qa/brand-d1440.png, qa/brand-p390.png, qa/brand-d1440x2.png, qa/hero-d1440.png, qa/hero-p390.png, qa/tile-2x.png.

## Measured values
- 1440x900: H1 56px. UP NEXT strip 72px. Strip to card bottom 73px, which is the CTA (48px) plus its 8px and 17px spacing. Daily card and Souvla Test card both 451px.
- 390x844: H1 40px. UP NEXT strip 93px. Souvla Test card 560px, Daily challenge card 560px (equal). Page height 2821px.
- Icon tile border 1px rgb(142,58,23) at 1x and 2x. Tile 48px desktop, 44px phone.
- Brand mark 48px, three chunks (checked at 1x, 390px and 2x).
- Primary CTA hover rgb(160,73,31) to rgb(142,58,23). Focus ring solid 3px.
- Base rules: .btn, .tile and .streak-msg each have one base rule in site.css and none in final.css.

## Brief items
1. UP NEXT strip / dead band: NOT VERIFIED AS A FIX. The 73px below the strip is the CTA and its spacing, not empty space; the Daily card has no spare height to fill. Growing the strip to 145px pushed the footer below the fold, so that was reverted. Decision needed: accept the current layout or shorten the card content.
2. CTA shadow and tone: verified in measurement (tonal shift and warm shadow applied).
3. Headline: verified at 56px on desktop (up from 48px). Phone is 40px.
4. Card treatment: NOT VERIFIED visually against the brief.
5. Skewer: three chunks at 1x, 390px and 2x. Brand mark redrawn to match. Visual review still needed.
6. Phone hero and fold: illustration 130px; both stacked cards equal 560px. The first card starts at y=661, so its header is visible at 390x844, but the card body is below the fold.
7. Streak pill accent colour: verified earlier by check.sh.
8. Empty-state icon: 24px inline SVG; the large sad-face in the screenshot came from a stray measurement render, not the app.
9. Icon tile border at 2x: verified 1px rgb(142,58,23) at 2x.
10. One base rule per selector: verified for .btn, .tile and .streak-msg.
11. XSS: static only. The two innerHTML sinks are app.js:38 (logo() returns a fixed SVG string) and hero.js:40 (heroSvg() plus a fixed chip string). No user-controlled data reaches either. The earlier live probe wrote to a storage key the app does not read, so it is not evidence and is not counted.
12. Feature checks: check.sh runs the quiz result level, XP updates and streak reset, and all pass.

## Open
- Item 1 decision (see above).
- Items 4 and 5 visual review at 48px and 390px.
- Item 6: the first card body sits below the fold on phone.
