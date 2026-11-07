# Build notes: Round 33 (QA fix round)

## Done this round
- Hero art redrawn: lobed grilled-meat chunks, varied sizes, darkened lower half toward #140703, 1.5px charred rim, crisp upper highlight. Stripe lines removed.
- Skewer thinned to 5px in the art and given a metal gradient with a light top edge. Soft contact shadow under each chunk.
- Brand mark: one bold skewer bar through three larger chunks (souvla-art.js).
- Phone hero: 'Level check, 3 min' sits on its own row above the art; the panel fits the art.
- Repo: .shots/ deleted from disk; brand-check/ and measure18/ deleted; tests/brand-*.png removed.
- Footer: 854px bottom at 1440x900 (check.sh footers.js).

## Not done or not verified
- Souvla Test and Daily challenge card weight: NOT DONE. Cards still use the same visual weight as before.
- Blue stat numerals and tighter phone stat tiles: override added in styles.css, NOT VERIFIED in screenshot.
- Day tabs: focus ring override added; 20px icon boxes NOT VERIFIED.
- Brand mark at 16, 24, 48px: NOT VERIFIED this round.
- CTA and chip width measurements: NOT MEASURED.
- Design score at 1440 and 390 from new screenshots: NOT VERIFIED. Not yet 8/10 at both sizes by my own judgment; phone Souvla Test card is still cut off at the fold.
- Keyboard and accessibility beyond check.sh: NOT VERIFIED.
- 1024px layout, 200%/400% zoom: NOT VERIFIED.
- Console errors: check.sh reports no page errors; manual console review NOT VERIFIED.
- features.json: no passes flags changed this round.

## Safety grep
- target=_blank: none
- secrets (api key, GH_TOKEN, ghp_): none
- innerHTML uses static strings only (app.js:38, app.js:213, hero.js:53)

## Checks
- check.sh exit 0 on code commit 5017b32 (index 200, data 200, browser tests passed, clicktest passed, footer 854px).

## Repo
- Code commit: 5017b32. This notes file is committed separately.
