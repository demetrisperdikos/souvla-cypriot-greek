# Build notes: Souvla (job-195), QA round 12

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Current commit: f01ebcc (QA round 12). Previous: d4c3613 (QA round 11).
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek

## Round 12 changes
- Desktop hero (1440): copy and illustration panel share one row, centred on each other (copy about y=123 to 395, panel about y=128 to 387).
- Hero chunks: irregular outlines with varied lobe sizes, darker lower half (gradient ends at #140703), crisp highlight on each upper lobe, 1.5px charred rim.
- Phone (390): 24px space above and below the hero art before the Souvla Test card.
- Cards: 1px divider and 48px bottom padding under the cards before the footer.
- .shots folder deleted; BRAND-SIZES files removed.

## Not done by the developer
- Design score: not re-scored here; QA scores it against the 8/10 bar.
- Brand mark at 16px and 24px: not visually checked by the developer.
- Header chip widths and 20px icon boxes: not measured in this round.

## Checks
- check.sh: EXIT=0 (index=200, data=200, browser tests passed, clicktest passed, footers share baseline).

## Safety grep (innerHTML, eval, target=_blank, http://)
app.js:12:  var NS = 'http://www.w3.org/2000/svg';
app.js:38:  mark.innerHTML = (window.SouvlaArt && window.SouvlaArt.logo) ? window.SouvlaArt.logo() : '';
app.js:148:  var NS = 'http://www.w3.org/2000/svg';
app.js:209:  tline.innerHTML = "<svg class='up-next-ico' viewBox='0 0 24 24' width='20' height='20' aria-hidden='true' focusable='false'><path d='M12 2c1 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3.2 2-4.3.2 1.6.9 2.6 2 3.1C11 7.6 11.2 5 12 2z' fill='currentColor'/></svg>";
hero.js:55:wrap.innerHTML = "<span class='hero-chip'>Level check, 3 min</span>" + svg();
ui.js:3:var SVG_NS = 'http://www.w3.org/2000/svg';
