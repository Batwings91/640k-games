#!/usr/bin/env node
// Refresh the unlisted test build at play/<token>/ from ../spore-wars, then commit and push.
// Usage (from the website folder):   node tools/update-play.js
// Needs only Node and git. The game repo must sit next to this one as ../spore-wars.
const {execSync}=require('child_process'),fs=require('fs'),path=require('path');
const site=path.dirname(__dirname),game=path.join(site,'..','spore-wars');
const playDir=fs.readdirSync(path.join(site,'play')).find(d=>fs.statSync(path.join(site,'play',d)).isDirectory());
if(!playDir){console.error('No play/<token>/ folder found');process.exit(1);}
console.log('Rebuilding game...');
execSync('node tools/build.js',{cwd:game,stdio:'inherit'});
let html=fs.readFileSync(path.join(game,'dist','spore-wars.html'),'utf8');
if(!/name="robots"/.test(html))html=html.replace('<head>','<head>\n<meta name="robots" content="noindex,nofollow">');
const out=path.join(site,'play',playDir,'index.html');
fs.writeFileSync(out,html,'utf8');
console.log('Wrote play/'+playDir+'/index.html',Math.floor(Buffer.byteLength(html,'utf8')/1024),'KB');
const stamp=new Date().toISOString().slice(0,16).replace('T',' ');
let gameRev='';try{gameRev=execSync('git rev-parse --short HEAD',{cwd:game}).toString().trim();}catch(e){}
execSync('git add play',{cwd:site,stdio:'inherit'});
try{execSync(`git commit -m "Update test build (${stamp}, game ${gameRev})"`,{cwd:site,stdio:'inherit'});}
catch(e){console.log('Nothing changed; not committing.');process.exit(0);}
execSync('git push',{cwd:site,stdio:'inherit'});
console.log('Pushed. Live in about a minute at https://batwings91.github.io/640k-games/play/'+playDir+'/');
