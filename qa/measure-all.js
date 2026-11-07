const { chromium } = require('playwright');
function lum(c){const m=c.match(/[\d.]+/g).map(Number);const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(m[0])+0.7152*f(m[1])+0.0722*f(m[2]);}
function ratio(a,b){const x=lum(a),y=lum(b);return +((Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)).toFixed(2);}
(async()=>{
  const b=await chromium.launch(process.env.CHROME?{executablePath:process.env.CHROME}:{});
  const out={};
  for (const [w,h,dpr] of [[1440,900,1],[1440,900,2],[390,844,1],[390,844,2]]) {
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:dpr});
    await p.goto(process.env.BASE,{waitUntil:'load'});
    await p.waitForSelector('.challenge-card',{timeout:15000});
    await p.waitForTimeout(400);
    const key=`${w}x${h}@${dpr}x`;
    const m=await p.evaluate(()=>{
      const q=s=>document.querySelector(s);
      const R=e=>e.getBoundingClientRect();
      const card=q('.challenge-card'), strip=card.querySelector('.up-next.next-up'), cta=card.querySelector(':scope > .btn');
      const cs=e=>getComputedStyle(e);
      const tc=q('.test-card');
      const tile=card.querySelector('.tile');
      const mark=q('.mark');
      return {
        stripH:Math.round(R(strip).height), stripBottom:Math.round(R(strip).bottom), ctaTop:Math.round(R(cta).top),
        stripToCtaGap:Math.round(R(cta).top-R(strip).bottom), ctaToCardBottom:Math.round(R(card).bottom-R(cta).bottom),
        cardBottom:Math.round(R(card).bottom), footerBottom:Math.round(R(q('.foot')).bottom),
        ctaBg:cs(cta).backgroundColor, ctaColor:cs(cta).color, ctaShadow:cs(cta).boxShadow,
        dailyCard:{bg:cs(card).backgroundColor, border:cs(card).borderTopWidth+' '+cs(card).borderTopColor, shadow:cs(card).boxShadow},
        testCard:{bg:cs(tc).backgroundColor, leftBorder:cs(tc).borderLeftWidth+' '+cs(tc).borderLeftColor, shadow:cs(tc).boxShadow},
        tileBorder:cs(tile).borderTopWidth+' '+cs(tile).borderTopColor+' box '+Math.round(R(tile).width)+'x'+Math.round(R(tile).height),
        markBox:Math.round(R(mark).width)+'x'+Math.round(R(mark).height)
      };
    });
    await p.locator('.challenge-card > .btn').hover();
    await p.waitForTimeout(300);
    m.ctaHoverBg = await p.evaluate(()=>getComputedStyle(document.querySelector('.challenge-card > .btn')).backgroundColor);
    m.ctaContrastWhite = ratio(m.ctaBg, m.ctaColor);
    m.ctaHoverContrastWhite = ratio(m.ctaHoverBg, m.ctaColor);
    if (w===1440) await p.locator('.mark').screenshot({path:`qa/brand-48-${dpr}x.png`});
    out[key]=m;
    await p.close();
  }
  console.log(JSON.stringify(out,null,1));
  await b.close();
})().catch(e=>{console.error('FAIL',e.message);process.exit(1);});
