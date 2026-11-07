import re
p = 'site.css'
s = open(p, encoding='utf-8').read()
a = s.index('/* Desktop: CTAs sit')
b = s.index('/* Streak header: one row')
desk = '''/* Desktop (>=900px): one consolidated ruleset. The 1440x900 fold holds the CTAs. Hero art height: 184px. */
@media (min-width:900px){
  .main{padding-top:var(--s2)}
  .home{gap:var(--s3)}
  .hero{gap:var(--s3);align-items:start;padding:0}
  .hero-copy{gap:var(--s1);padding-top:0}
  .display{font-size:2.25rem;line-height:1.1}
  .lead{font-size:.9375rem;margin:0;max-width:36ch}
  .hero .actions{margin-top:0}
  .hero-art{height:184px;min-height:0;max-height:184px}
  .hero-copy .pills{display:none}
  .feature-row{margin-top:0;gap:var(--s2)}
  .feature-row .card{padding:var(--s2)}
  .feature-row .card-head{min-height:0;gap:var(--s1)}
  .test-card,.challenge-card{gap:var(--s1);padding:var(--s2) var(--s3)}
  .test-card .what-get{display:none}
  .what-get{padding:var(--s1) var(--s2)}
  .what-title{font-size:.9375rem;margin-bottom:0}
  .what-list{flex-direction:row;flex-wrap:wrap;gap:4px 16px;margin:0}
  .what-list li:nth-child(3){display:none}
  .test-preview{padding:var(--s1)}
  .streak-preview{padding:var(--s1) var(--s2);gap:var(--s1)}
  .streak-preview .streak-top{margin:0}
  .up-next{padding:var(--s1) var(--s2)}
  .week-note{display:none}
  .challenge-card .week-hint{margin:4px 0 0}
}

'''
s = s[:a] + desk + s[b:]
c = s.index('/* Fix round 11')
tail = '''/* Type, cards and buttons */
.display{line-height:1.1;letter-spacing:-.01em}
.lead{color:var(--ink3)}
.card-head h2,.card-head h3{font-weight:800}
.card-head>:first-child{background:#D6E7FB;color:var(--accent-ink);border:1px solid #9CC4F2}
.btn.secondary:focus-visible{outline:3px solid var(--accent-hi);outline-offset:2px}
.btn.secondary:hover:not(:disabled){box-shadow:0 2px 8px rgba(0,98,204,.18)}
'''
s = s[:c] + tail
# streak icon sizes: one ruleset
s = s.replace('.streak-top svg,.streak-ico{width:24px;height:24px;flex:none}\n.streak-msg{margin:0}\n.streak-top svg,.streak-ico{width:20px;height:20px;flex:none}', '.streak-top svg,.streak-ico{width:20px;height:20px;flex:none}\n.streak-msg{margin:0}')
open(p, 'w', encoding='utf-8').write(s)
print('ok', s.count('min-width:900px'), 'hero-art heights:', re.findall(r'hero-art\{height:(\d+)px', s), 'important:', s.count('!important'))
