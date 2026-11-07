# Build notes: Souvla (job-195), QA round 13

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)
Code commit for this round: d82a0ba, plus 'phone header tightened to 113px' (the commit after it). The commit that adds these notes comes after both.
Previous round: 7563440 (QA round 12).

## Round 13 changes
- Hero art (hero.js): chunks redrawn with irregular outlines, varied lobes, lower half toward #140703, highlight on each upper lobe, 1.5px charred rim.
- Skewer: thinner, metal highlight, 360 of 600 units wide (60% of plate), soft contact shadow.
- Plate background matches the illustration panel; the grey band is removed.
- Headline: accent keyword 'Cypriot.' with tighter tracking.
- Phone: Level check chip above the art; 24px air before the Souvla Test card.
- Stat figures in accent colour with tighter label line-height; card icon boxes 20px.
- Day tabs: selected state has a 3px ring.
- Phone header: padding 8px 16px, chips 32px high; header 121px -> 113px.

## Measured (fresh run at 1440x900 and 390x844)
- Header chips: 128px x3 at 1440; 114px x3 at 390 (equal widths).
- CTA height (Start diagnosis): 48px at both widths.
- Header height: 81px at 1440; 113px at 390.
- Hero art height: 260px at 1440; 185px at 390.
- Topbar bottom to primary CTA top: 269px at 1440; 263px at 390. This span includes the headline and paragraph, so it is not a chip-to-CTA gap.

## Not met or NOT VERIFIED
- Phone header tightening: partly met (121px to 113px). The chip-to-CTA gap is not reduced because the headline and paragraph sit between them.
- Design score: not re-scored. QA scores against the 8/10 bar.
- Brand mark at 16, 24 and 48px: not re-rendered in this round.
- Up Next fill: the .up-next-fill rule exists, but the markup still uses .up-next-seg segments. Visible fill NOT VERIFIED.
- Up Next label: counts cards (2 for First Greetings). data.json unchanged; deviation from the lesson model with steps.
- Section divider and 48px bottom padding: present from round 12, not re-measured this round.

## Checks
- check.sh: EXIT=0 after the header change (index=200, data=200, browser tests, clicktest, footers share baseline at y=898).

## Safety grep (grep -n -E 'innerHTML|eval\(|target=.?_blank|http://' *.js)
app.js:12 var NS = 'http://www.w3.org/2000/svg' (namespace string, not a request)
app.js:38 mark.innerHTML = static logo SVG from brand.js
app.js:149 var NS = 'http://www.w3.org/2000/svg'
app.js:210 tline.innerHTML = static up-next flame SVG
hero.js:56 wrap.innerHTML = static chip and hero SVG
ui.js:3 SVG_NS = 'http://www.w3.org/2000/svg'
No eval(), no target=_blank, no http script sources.
