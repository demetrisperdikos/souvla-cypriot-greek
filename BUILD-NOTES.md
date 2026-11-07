# Build notes, Cypriot Greek portal (job 195), round 18

Last CSS/JS change: fb11e67. Content HEAD before this notes fix: 4f0eccb. Content HEAD before this line: ab31f14. Latest HEAD: run git rev-parse HEAD.

## Measured at 1440x900 (fresh server on port 8790, clean run)
- Headline h1: top 139, bottom 236.9, height 97.9, font 48px.
- Card row: top 385.9, bottom 871.4. Headline sits 149px above the card row. Measured.
- Souvla Test card: top 385.9, bottom 871.4. Fits above the 900px fold. Measured.
- Souvla Test card contents: header, body, first question, 3 options, Begin the test button. Measured by inspect18.js.
- Primary CTAs (Start diagnosis, Begin the test, Open First Greetings): height 48px, background rgb(181,83,42). Measured.
- Week tabs: 40x40px. Selected (today) tab: background rgb(181,83,42), ring 3px white plus 5px accent. Plain tab: white with edge border. Measured.
- Hero panel: 577.75 x 200. SVG viewBox 40 20 520 180 fills the panel width. Measured as art box coverage, visually confirmed in the 1440 screenshot.
- Icon tiles: 40px tile, 20px icon. Measured 20x20 after round 18 CSS fix.
- Stats (streak, XP, skewers): 3 tiles, labels visible, 40px tall. Measured.

## Measured at 390px
- Phone chip bottom 528, art top 552, gap 24px. Measured.

## Brand mark
- PNGs saved at tests/brand-16.png, tests/brand-24.png, tests/brand-48.png. Rendered at 16x16, 24x24, 48x48. Sizes measured.
- NOT VERIFIED: I have not viewed the PNGs in this round, so the one-bar, three-chunk look at each size is unconfirmed by eye.

## Not verified
- Chunk charred rim at 1x: NOT VERIFIED (not measured).
- Design score at 1440 and 390: NOT VERIFIED. No scorer was run and the repo contains no scorer script. Not measured, so no score is claimed.
- Three features from features.json re-run by hand: NOT VERIFIED in this round. check.sh runs the browser flows (quiz, lessons, dialogue, streak, keyboard) and passed.

## check.sh
- Exit 0. 24 controls tested, 0 with errors. Footer bottom 854 on desktop, under the 900px fold.

## Repo
- .shots/ deleted from disk. Repo has no screenshot folders.
