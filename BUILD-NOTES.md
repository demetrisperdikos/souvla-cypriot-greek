# Build notes: Souvla (job-195)

Live draft: https://sites.willysilly.com/s/lszpu5cvgx646628/

## Stylesheets
- index.html loads fonts.css and styles.css. Those are the only stylesheets in the project.
- Hero: .hero, .hero-art (the chunk panel), with the svg produced by hero.js (svg()).
- Warm band: removed. .hero::before is set to display:none in the final layer at the end of styles.css.
- Gap and divider: .home flex gap sets the space above the cards; .section-divider is a 1px rule with no extra margin.
- Brand mark: brand.js.

## Changes this round
- Grey/warm band behind the hero removed.
- Gap between hero and cards kept (from .home gap); divider between cards and Lessons kept.
- Chunk outline in hero.js softened to a 1px dark brown stroke (#2A0F05).
- .shots/ deleted; it is git-ignored and must not ship.
- Footer moved back above the 900px fold by removing duplicate margins.

## Checks run on this build
- check.sh: see the latest run output (footer baseline check is the one being re-run).
- Functional and state tests: pass (tests/ suite, 12 features).
- Keyboard focus, hover, and axe WCAG 2 A/AA on home and quiz at 390 and 1440: pass.

## Not verified
- Design score: NOT MEASURED in this round. Earlier 6/10 and 8/10 figures were estimates and are withdrawn. QA must score it against the design bar.
- Brand mark legibility at 16px: not verified.
