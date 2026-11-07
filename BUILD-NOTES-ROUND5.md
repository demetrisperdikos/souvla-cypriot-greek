# Build notes, round 5 (measured, job-195)

Live files: index.html loads site.css, final.css. card-variety.css and round4.css are not linked.
Hero builder: hero.js only.

Measured (Playwright, fresh server):
- 1440x900: UP NEXT strip 80px; CTA 8px below strip; card bottom 900px; footer 883px (check.sh) vs 1479px (measure script, unreconciled).
- 390x844: strip 88px; CTA 8px below strip; card bottom 2274px.
- Primary CTA rgb(169,80,42), white text 5.43:1; hover rgb(142,58,23) 7.59:1.
- Icon tile border 1px rgb(226,214,198); 48x48 desktop, 44x44 phone; same at 1x and 2x.

Open:
- QA item 5: strip does not fill the Daily card; needs a content or hero decision.
- Brand crop vs hero drawing: not compared.
- Design re-score: not done.
- Owner must rotate the GitHub token printed by git remote -v.
