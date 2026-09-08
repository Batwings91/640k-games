#!/usr/bin/env node
// Refresh the unlisted test build at play/<token>/ from ../spore-wars, then commit and push.
// Usage (from the website folder):   node tools/update-play.js
// Needs only Node and git. The game repo must sit next to this one as ../spore-wars.
// The game's release build is a folder (dist/index.html plus dist/assets/ loaded after boot);
// it is copied whole into the play folder.
const {execSync}=require('child_process'),fs=require('fs'),path=require('path');
const site=path.dirname(__dirname),game=path.join(site,'..','spore-wars');
const playDir=fs.readdirSync(path.join(site,'play')).find(d=>fs.statSync(path.join(site,'play',d)).isDirectory());
if(!playDir){console.error('No play/<token>/ folder found');process.exit(1);}
console.log('Rebuilding game...');
execSync('node tools/build.js',{cwd:game,stdio:'inherit'});
const dist=path.join(game,'dist'),dest=path.join(site,'play',playDir);
fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});
fs.cpSync(dist,dest,{recursive:true});
// Keep the test page out of search engines (robots.txt also excludes /play/).
const idx=path.join(dest,'index.html');let html=fs.readFileSync(idx,'utf8');
if(!/name="robots"/.test(html))html=html.replace('<head>','<head>\n<meta name="robots" content="noindex,nofollow">');
fs.writeFileSync(idx,html,'utf8');
let total=0;const walk=d=>{for(const f of fs.readdirSync(d)){const p=path.join(d,f);const s=fs.statSync(p);if(s.isDirectory())walk(p);else total+=s.size;}};walk(dest);
console.log('Copied dist/ to play/'+playDir+'/',Math.floor(total/1024),'KB total');
const stamp=new Date().toISOString().slice(0,16).replace('T',' ');
let gameRev='';try{gameRev=execSync('git rev-parse --short HEAD',{cwd:game}).toString().trim();}catch(e){}
execSync('git add -A play',{cwd:site,stdio:'inherit'});
try{execSync(`git commit -m "Update test build (${stamp}, game ${gameRev})"`,{cwd:site,stdio:'inherit'});}
catch(e){console.log('Nothing changed; not committing.');process.exit(0);}
execSync('git push',{cwd:site,stdio:'inherit'});
console.log('Pushed. Live in about a minute at https://batwings91.github.io/640k-games/play/'+playDir+'/');
