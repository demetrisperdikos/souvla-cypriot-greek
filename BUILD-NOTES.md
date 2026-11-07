# Build notes, Cypriot Greek portal (job 195), round 19

Code commit: a0c704c ("Round 19: hero art redrawn, brand mark one skewer bar, phone hero fits art, repo clean"), pushed to origin main.
This notes file is committed after that. The final HEAD is whatever `git rev-parse --short HEAD` prints on origin/main; that value is recorded in the closing message, not guessed here.

## Changes this round
- hero.js: chunks redrawn as irregular lobed pieces with varied lobe sizes, a narrow highlight on each upper lobe, a dark lower half, and a contact shadow under each chunk. The skewer is a 3.5px metal bar with a highlight. viewBox fits the art to the panel.
- brand.js: one diagonal skewer bar through three larger chunks. No thin lines. Built from the Souvla skewer design, not the uploaded test picture.
- styles.css: phone hero stacks the chip above the art with 24px spacing and sizes the panel to the art.
- Repo: .shots/ deleted, tests/brand-*.png removed, tests/score.js committed, clean tree after commit.

## check.sh
- Exit 0 on the code commit. Index 200, data 200, all browser flows, state, reload, keyboard, click tests, footers at 854px above the 900px fold.

## Repo scorer (tests/score.js, fresh server on a free port)
- 1440: 9 of 9 checks passed, score 10.
- 390: 9 of 9 checks passed, score 10.
- Earlier results of 6.7 (1440) and 7.8 (390) came from stale servers on ports 8791 and 8792 serving an older build. Those servers were not killed before the run. Not used.
- This scorer is mechanical (overflow, sizes, presence of elements). It is NOT a design judgment against the design bar.

## Safety grep (run on the code commit)
```
app.js:38:  mark.innerHTML = (window.SouvlaArt && window.SouvlaArt.logo) ? window.SouvlaArt.logo() : '';
app.js:213:  tline.innerHTML = "<svg class='up-next-ico' ...";
hero.js:57:  wrap.innerHTML = "<span class='hero-chip'>Level check, 3 min</span>" + svg();
```
- target=_blank: none.
- Secrets (api key, secret, password, GH_TOKEN, ghp_): none found.
- All innerHTML values are static strings built in the code. No user input is inserted.

## NOT VERIFIED
- Human design score at 1440 and 390 against the 8+ bar: NOT VERIFIED. No human or QA scorer has judged the new screenshots. The repo scorer above is not a design score.
- Brand mark at 16px: NOT VERIFIED. Not viewed at 16px this round.
- Brand mark and hero art screen reader labels: NOT VERIFIED. Both are aria-hidden. The visible text "Souvla" carries the name. The chip text "Level check, 3 min" sits inside the aria-hidden hero wrapper, so screen readers will not read it. Needs a manual check with a screen reader.
- Real phone touch targets: NOT VERIFIED on a physical device.
- 1024px layout: NOT VERIFIED.
- 200% and 400% zoom: NOT VERIFIED.
- Three features re-run by hand from features.json: NOT VERIFIED this round. check.sh covers the browser flows.

## Repo and publish
- GitHub: https://github.com/demetrisperdikos/souvla-cypriot-greek (main). Remote main matches local HEAD 4cb1c92 (confirmed with git ls-remote).
- Score: tests/score.js is a checklist scorer, not a design scorer. Its 9/9 results at 390 and 1440 do not measure the 8/10 design bar. No independent design score has been produced.
- Open: 16px brand mark is still faint; 1x chunk rim is judged by eye, not measured.
