# Build notes: Round 34 (QA fix round, NOT complete)

## Done
- Hero art redrawn as lobed grilled-meat chunks: varied sizes, darker lower half, 1.5px charred rim, upper highlight. Stripe lines removed.
- Hero skewer thinned to 3px (hero.js and brand mark in souvla-art.js). Soft contact shadow under each chunk.
- Brand mark: one bar through three larger chunks.
- Phone hero: 'Level check, 3 min' on its own row above the art.
- Souvla Test and Daily challenge cards lowered in weight (Round 34 override in styles.css).
- Repo: .shots/, brand-check/, measure18/ deleted from disk.
- Footer: 854px bottom at 1440x900 (check.sh footers.js).

## NOT done or NOT verified
- Blue stat numerals: NOT DONE. The Round 33 selector did not match a rendered element; not verified.
- Day tabs: focus-ring override added; 20px icon boxes NOT VERIFIED.
- Phone Souvla Test card: still cut at the fold (390px screenshot). Tiles and bullets not tightened.
- Brand mark at 16, 24, 48px: NOT VERIFIED this round.
- CTA and chip width measurements: NOT MEASURED.
- Design score: my judgment from the new screenshots is below 8/10 at 390 (phone Souvla Test card cut at fold, stat row not compact enough). Not handed back.
- Keyboard/accessibility beyond check.sh, 1024px, 200%/400% zoom, console review: NOT VERIFIED.
- features.json: no passes flags changed this round.

## Safety grep
- target=_blank: none. Secrets: none.
- innerHTML uses static strings only (app.js:38, app.js:213, hero.js:53).

## Checks
- check.sh exit 0 (index 200, data 200, browser tests, clicktest, footer 854px).
