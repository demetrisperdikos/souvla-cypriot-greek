# Souvla: build notes, round 4 fix (job-195)

## Status
- Commit: 9230b02 (working tree clean after this file is committed).
- Published: https://sites.willysilly.com/s/lszpu5cvgx646628/ (draft for QA).
- Design score at 1440 and 390: NOT SCORED. QA scores from the fresh screenshots.

## Changes in this pass
- Lesson grid moved off home onto a Lessons page. Browse lessons opens it. Lesson 'Back to lessons' buttons return to it.
- Desktop fold: both feature-card buttons end at y=854 at 1440px; footer sits above 900px. Measured by tests/footers.js (PASS).
- Skewer: thinner bar (3 units tall, rx 1.5) with a lighter highlight line.
- Phone hero: 'Level check, 3 min' chip in normal flow above the art, 24px gap, panel height fits the art. Checked in phone screenshot only, not pixel-measured.
- Desktop hero: art height 200px, display size 3rem.
- Repo: renders/ and .shots/ removed from disk and from the index; both in .gitignore. git status --porcelain returns 0 lines at 9230b02.

## Check
- bash check.sh passed on 9230b02: syntax, HTTP 200 on index.html and data.json, flow, state, reload, keyboard, axe WCAG 2 A/AA, click tests, footer fold.

## NOT VERIFIED
- Design score against the 8/10 bar.
- Brand mark legibility at 16, 24 and 48px (renders were removed in this pass).
- 1.5px charred rim on the meat chunks reading at 1x.
- Lower-half darkening of the chunks toward #140703: present in code, not visually re-checked.
- Souvla Test stat label spacing and single accent treatment.
- Day-tab selected state and 20px icon box consistency.
- Measured CTA sizes and chip values were not re-measured in this pass; earlier values (buttons 48px tall on phone, 192x48 and 198x48 on desktop) are from round 3 and may have shifted.
