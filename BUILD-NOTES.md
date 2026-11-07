# Build notes: Souvla (job-195)

Live draft: https://sites.willysilly.com/s/lszpu5cvgx646628/

Current commit: 9517086 (QA round 11)

## Selectors (line numbers from grep below)
- hero.js: .hero-art (wrapper, built in hero()), svg with chunks (path stroke #140703 1.5px), highlights, skewer rect x=197 w=215 (about 60% of plate)
- styles.css: .hero, .hero-art, .home, .section-divider, .brand, .hero::before (warm band, line set in final override layer)
- brand.js: brand mark (one bar, three chunks, cream tile)
- app.js: up-next segmented bar (.up-next-bar, .up-next-seg)

## Measurements (1440px, measure.js)
- Skewer: 64.9% of plate edge-to-edge before narrowing; re-measured after 215-unit width (see run log).
- Plate edge-to-edge: 321.6px.
- Section divider top: 936px (below 900px fold, lower section).
- Footer bottom: 895px (check.sh footers PASS).
- Brand mark PNGs at 16, 24, 48px: .shots/brand-16.png, brand-24.png, brand-48.png (not viewed by a person yet).

## Grep
$ grep -n "hero\|section-divider\|\.brand\|\.home" styles.css
26:.brand{display:flex;gap:var(--s2);align-items:center}
28:.brand-name{font:800 1.5rem Nunito,sans-serif;letter-spacing:-.01em;line-height:1.1}
29:.brand-sub{font-size:.875rem;color:var(--ink2)}
40:.home{display:flex;flex-direction:column;gap:var(--s4)}
41:.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:var(--s4);align-items:center}
42:.hero-copy{display:flex;flex-direction:column;gap:var(--s2)}
46:.hero .actions{margin-top:var(--s1)}
47:.hero-art{position:relative;height:260px;border-radius:var(--r-lg);overflow:hidden;background:var(--accent-tint);box-shadow:var(--shadow)}
48:.hero-art svg,.hero-art .art{width:100%;height:100%;display:block}
49:.hero-scene{position:absolute;top:0;left:0;width:100%;height:100%}
50:.hero-chip{position:absolute;bottom:16px;left:16px;padding:6px 12px;border-radius:999px;background:var(--surface);font-size:.8125rem;font-weight:600;color:var(--accent-ink);box-shadow:var(--shadow)}
161:  .brand-name{font-size:1.375rem}
166:  .home{gap:var(--s3)}
167:  .hero{grid-template-columns:minmax(0,1fr);gap:var(--s3)}
180:  .home{gap:var(--s3)}
181:  .hero{gap:var(--s3);align-items:start;padding:0}
182:  .hero-copy{gap:var(--s1);padding-top:0}
185:  .hero .actions{margin-top:0}
186:  .hero-copy .pills{display:none}
214:.hero{padding-top:0}
217:.hero-copy{gap:var(--s2)}
230:.hero-art .hero-scene{height:calc(100% - 52px)}
231:.hero-chip{top:auto;bottom:14px;left:14px}
237:  .hero{padding-top:var(--s4)}
238:  .hero-copy .display{font-size:3rem;line-height:1.02}
239:  .hero-art .hero-scene{height:calc(100% - 52px)}
241:/* Single hero height ruleset (replaces all overlapping .hero-art height overrides). */
242:.hero-art{height:200px;min-height:0;max-height:200px}
244:  .hero-art{height:200px;min-height:0;max-height:200px}
247:  .hero-art{height:220px;min-height:0;max-height:220px}
249:.hero-art{background:linear-gradient(180deg,#F7F1E8 0%,#EFE3D3 100%);border:1px solid #E6D9C7}
250:.hero-art .hero-scene{height:calc(100% - 52px);width:100%}
251:.hero-chip{box-shadow:0 2px 8px rgba(42,20,4,.12)}
264:.hero-art{background:#F5F3EF;border:1px solid #D9D4CB}
269:.hero-art{height:200px;min-height:0;max-height:none;position:relative;overflow:hidden}
270:.hero-art .hero-scene{position:absolute;top:0;left:0;width:100%;height:100%;top:0}
271:.hero-chip{top:12px;bottom:auto;left:12px}
272:@media (min-width:900px){.hero-art{height:200px}}
283:.hero-art .hero-scene{filter:drop-shadow(0 10px 8px rgba(42,20,4,.22))}
289:  .hero-art{height:260px}
290:  .hero-art .hero-scene{height:calc(100% - 52px)}
291:  .hero-chip{top:12px;bottom:auto;left:12px}
310:  .hero-art{height:200px;min-height:0;max-height:200px}
311:  .hero-art .hero-scene{height:100%;top:0}
312:  .hero-chip{top:12px;bottom:auto;left:12px}
343:@media (max-width:600px){.hero-art{height:280px;min-height:0;max-height:none}.hero-art .hero-scene{height:100%;width:100%}}
350:  .hero-art{height:200px;min-height:0;max-height:200px}
351:  .hero-art .art{height:100%;width:100%}
368:/* Final QA fixes: icon tile border, card header scale, hero plate shadow, chip inset, UP NEXT stretch. */
371:.hero-art .hero-chip{top:16px;bottom:auto;left:16px}
390:/* Consolidated hero height: one rule, the effective value at every width. */
391:.hero-art{height:200px;min-height:0;max-height:200px}
399:.hero-art .hero-chip{top:auto;bottom:8px;left:8px}
414:/* Warm textured backdrop behind the hero art: soft tonal grain, one accent tint. */
415:.hero-art{background-color:var(--accent-tint);background-image:radial-gradient(circle at 20% 15%,rgba(255,255,255,.55),transparent 45%),radial-gradient(circle at 80% 90%,rgba(142,58,23,.08),transparent 50%),repeating-linear-gradient(35deg,rgba(142,58,23,.025) 0 2px,transparent 2px 6px)}
431:/* Final layer for job-195, loaded last. Owns: primary button, Daily challenge card and UP NEXT strip, day hint, hero chip and backdrop, phone card rhythm, skewer shading, Souvla Test accent. */
458:.hero-art{background:#F8EADF;background-image:none}
459:.hero-art .hero-chip{top:16px;bottom:auto;left:16px}
462:.hero-art .art{filter:brightness(1.1) drop-shadow(0 0 1px rgba(255,243,220,.85))}
479:  .hero-copy .display{font-size:3rem;line-height:1.02}
480:  .hero-copy .lead{max-width:56ch;margin:0}
481:  .hero .actions{margin-top:0}
482:  .hero{gap:var(--s3)}
491:@media (min-width:900px){.hero-copy .display{font-size:3.5rem;line-height:1.02}}
493:@media (max-width:899px){.hero-art{height:150px;max-height:150px}.hero-art .hero-scene{width:100%;height:100%}}
504:  .hero-copy .pills{display:none}
505:  .hero-art{height:130px;max-height:130px}
517:@media (max-width:899px){.hero-art .hero-chip{top:8px;left:8px}}
520:  .hero-copy .actions{display:flex;flex-direction:row;flex-wrap:wrap;gap:8px}
521:  .hero-copy .actions .btn{flex:1 1 150px;margin:0}
522:  .hero-art{height:116px;max-height:116px;margin-top:16px}
523:  .hero-art .hero-scene{height:100%}
524:  .hero-copy .lead{margin-bottom:0}
529:  .hero-copy h1,.hero-copy .display{font-size:36px;line-height:1.1;margin:8px 0}
530:  .hero-copy .eyebrow,.hero-copy .kicker{margin-top:8px;margin-bottom:0}
531:  .hero-copy .lead{font-size:.9375rem;line-height:1.45;margin:8px 0 12px}
532:  .hero-art{height:100px;max-height:100px;margin-top:12px}
533:  .hero-copy .actions{margin-top:12px}
538:  .hero-copy .actions{flex-direction:row;flex-wrap:nowrap;gap:8px}
539:  .hero-copy .actions .btn{flex:1 1 0;min-width:0;width:auto;padding-left:8px;padding-right:8px;font-size:.9375rem}
565:@media (min-width:900px){.hero{align-items:center}}
573:.btn.primary,.btn-primary,.hero-copy .actions .btn.primary,.challenge-card > .btn,.challenge-card .btn.primary,.card .btn.primary{min-height:var(--cta-h);height:var(--cta-h);box-sizing:border-box}
578:/* (3) Phone hero: larger illustration. */
580:  .hero-art{height:200px;min-height:0;max-height:none}
581:  .hero-art .hero-scene{width:100%;height:100%}
584:/* (2) Desktop hero: skewer and plate fill the panel and sit centred against the text block. */
586:  .hero-art{display:flex;align-items:center;justify-content:center;padding:24px 32px}
587:  .hero-art .hero-scene{width:100%;height:auto;max-width:520px}
590:@media (min-width:900px){.hero-art .hero-chip{top:auto;bottom:12px;left:12px}}
603:.hero-art{align-self:center}
604:@media (max-width:899px){.hero-art{height:auto;aspect-ratio:430/146}.hero{gap:var(--s2)}}
615:.hero-art{position:relative;display:flex;flex-direction:column;gap:12px;padding:12px;margin:0;height:auto;aspect-ratio:auto;min-height:0;overflow:visible;align-self:center}
616:.hero-art > svg{position:static;display:block;width:100%;height:auto;max-height:none;margin:0;transform:none}
617:.hero-art .hero-chip{position:static;align-self:flex-start;top:auto;left:auto;bottom:auto;right:auto}
619:.hero{align-items:start}
620:.hero-art{display:block;padding:55px 0 40px;gap:0;align-self:start}
621:.hero-art > svg{position:relative;max-width:440px;margin:0 auto}
622:.hero-art .hero-chip{position:absolute;top:6px;left:12px}
632:.hero-art{display:flex;flex-direction:column;justify-content:center;align-self:stretch;padding:0;box-sizing:border-box}
633:.hero-art > svg{margin:0 auto}
637:.hero-art{min-height:273px;height:273px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-self:start}
638:.hero-art > svg{margin:0 auto}
642:.hero-art{margin-top:8px;margin-bottom:-8px}
645:/* Desktop hero art fills the panel (overrides the earlier max-width:440px rules). */
647:  .hero-art{position:relative;overflow:hidden;padding:0}
648:  .hero-art > svg{position:absolute;inset:0;width:100%;height:100%;max-width:none;margin:0;transform:none}
653:.hero-art{position:relative;display:block;height:auto;aspect-ratio:auto;min-height:0;padding:24px 0 0;margin:0;gap:0;overflow:hidden;align-self:stretch}
654:.hero-art > svg{position:static;display:block;width:100%;max-width:none;height:auto;margin:0;transform:none}
655:.hero-art .hero-chip{position:absolute;top:12px;left:12px}
658:.hero-art{position:relative;overflow:hidden;padding:0;display:flex;flex-direction:column;justify-content:center}
663:.hero-art .hero-chip{position:absolute;top:auto;bottom:12px;left:12px}
666:/* Round 28: hero band, desktop centring, lower-section divider, bottom padding, stronger display moment */
667:.hero{position:relative;isolation:isolate}
668:.hero::before{content:"";position:absolute;left:50%;transform:translateX(-50%);top:-24px;bottom:-24px;width:100vw;background:linear-gradient(180deg,#F6E6D8 0%,#FBF3EC 100%);z-index:-1}
669:@media (min-width:900px){.hero{align-items:center}.hero-copy{align-self:center}}
670:@media (max-width:899px){.hero-art{margin-top:24px}}
672:.section-divider{border:0;height:1px;background:linear-gradient(90deg,transparent,#E4D3C2 20%,#E4D3C2 80%,transparent);margin:var(--s5,40px) 0}
674:.hero-copy .display{letter-spacing:-.02em}
676:/* Round 28 fix: header stays above the hero band; band fades into the page background */
678:.hero::before{background:linear-gradient(180deg,#F6E6D8 0%,#FBF3EC 70%,#F9F8F5 100%)}
680:/* Round 28: centre hero copy (text + CTA) against the art panel on desktop */
681:@media (min-width:900px){.hero-copy{display:flex;flex-direction:column;justify-content:center;height:100%}.hero-copy .actions{margin-top:var(--s3,24px)}}
684:@media (min-width:900px){.hero-copy .actions{margin-top:0}}
688:@media (min-width:900px){.hero{align-items:center}.hero-copy{align-self:center;height:auto;justify-content:center}.hero-art{align-self:center}}
689:/* Round 31: hero art sizing, warm band without a rounded bottom, card tint, display moment, divider and bottom padding. Loads last. */
690:.hero-art{position:relative;overflow:hidden;height:240px;min-height:0;padding:0;margin:0;display:block;align-self:stretch;box-sizing:border-box}
691:.hero-art>svg{position:absolute;inset:0;width:100%;height:100%;max-width:none;margin:0;transform:none;display:block}
692:.hero-art .hero-chip{position:absolute;top:12px;left:12px;bottom:auto;z-index:2}
693:@media (max-width:899px){.hero-art{margin-top:24px;height:200px}}
694:.hero::before{top:-24px;bottom:-24px;left:50%;transform:translateX(-50%);width:100vw;background:#F5E4D5;border-radius:0;z-index:-1}
695:.hero-copy .display{letter-spacing:-.02em;font-weight:800}
697:.section-divider{height:1px;border:0;background:#E6D2BD;margin:24px 0 0}
699:.brand svg{display:block}
700:.hero-art>svg{overflow:visible}
701:/* Final fix layer: no band behind hero; clear gap and divider between hero and cards. */
702:.hero{position:relative}
703:.hero::before{content:"";position:absolute;left:50%;transform:translateX(-50%);top:-24px;bottom:-24px;width:100vw;background:#F5E4D5;z-index:-1}
704:/* card gap comes from the .home flex gap */
705:.section-divider{display:block;height:1px;border:0;background:#E6D2BD;margin:0}

$ grep -n "hBar\|x=\"197\"" hero.js
31:'<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B5A50"/><stop offset=".5" stop-color="#2E2420"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
47:s += '<rect x="197" y="112" width="215" height="10" rx="5" fill="url(#hBar)" stroke="#140703" stroke-width="1" vector-effect="non-scaling-stroke"/>';
