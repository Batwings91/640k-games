#!/usr/bin/env node
// Renders assets/spore-wars/hangar.png (960x540) and hangar-half.png (480x270) from the game's
// menu_hangar.webp: cover-crop, then 4x4 ordered dither to an 8-level-per-channel palette so the
// PNG is small and looks like a VGA-era image. Uses headless Chrome, no npm packages.
// Usage: node tools/render-hero.js [path/to/menu_hangar.webp]
const {execFileSync}=require('child_process'),fs=require('fs'),path=require('path'),os=require('os');
const SRC=path.resolve(process.argv[2]||path.join(__dirname,'..','..','spore-wars','assets','menu_hangar.webp'));
const CHROME=[process.env.CHROME,'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome','/usr/bin/chromium'].filter(Boolean).find(p=>fs.existsSync(p));
if(!CHROME){console.error('No Chrome/Edge found; set CHROME=<path>');process.exit(1);}
const OUT=path.join(__dirname,'..','assets','spore-wars');fs.mkdirSync(OUT,{recursive:true});
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'640k-hero-'));
const toUrl=p=>'file:///'+p.split(path.sep).join('/').replace(/ /g,'%20');
const srcUrl=toUrl(SRC);
for(const [W,H,name] of [[960,540,'hangar'],[480,270,'hangar-half']]){
  const page=path.join(tmp,name+'.html');
  fs.writeFileSync(page,`<body><div id="out"></div><script>
const W=${W},H=${H},img=new Image();
img.onload=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const s=Math.max(W/img.width,H/img.height),dw=img.width*s,dh=img.height*s;
 x.drawImage(img,(W-dw)*0.62,(H-dh)*0.5,dw,dh);
 const d=x.getImageData(0,0,W,H),p=d.data,B=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
 const L=8,q=v=>Math.round(v*(L-1)/255)*255/(L-1);
 for(let y=0;y<H;y++)for(let xx=0;xx<W;xx++){const i=(y*W+xx)*4,t=(B[y&3][xx&3]/16-0.5)*(255/20);
  for(let k=0;k<3;k++)p[i+k]=q(Math.max(0,Math.min(255,p[i+k]+t)));}
 x.putImageData(d,0,0);document.getElementById('out').textContent=c.toDataURL('image/png').split(',')[1];};
img.onerror=()=>document.getElementById('out').textContent='IMGERR';img.src=${JSON.stringify(srcUrl)};
</script></body>`);
  const dom=execFileSync(CHROME,['--headless=new','--disable-gpu','--no-first-run','--allow-file-access-from-files',
    '--user-data-dir='+path.join(tmp,'profile'),'--virtual-time-budget=20000','--dump-dom',toUrl(page)],
    {maxBuffer:64*1024*1024,stdio:['ignore','pipe','ignore']}).toString();
  const m=dom.match(/<div id="out">([A-Za-z0-9+\/=]+)<\/div>/);
  if(!m){console.error(name+': render failed (image not found?)');process.exit(1);}
  const out=path.join(OUT,name+'.png');fs.writeFileSync(out,Buffer.from(m[1],'base64'));
  console.log('wrote',path.relative(process.cwd(),out),W+'x'+H,(fs.statSync(out).size/1024|0)+'KB');
}
fs.rmSync(tmp,{recursive:true,force:true});
