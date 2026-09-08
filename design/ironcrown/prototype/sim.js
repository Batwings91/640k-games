// Ironcrown campaign simulation. Pure logic, no rendering. Runs in the browser (campaign.html)
// and in Node (balance.js). Everything the design docs specify lives here; see 02-game-design.md
// and 08-parameters.md. Deterministic: all randomness comes from the seed.
(function(root){
'use strict';

const SEASONS=['Spring','Summer','Autumn','Winter'];
const COST={soldier:1,knight:8,engine:15,castle:20,mill:5,market:12,marriage:15};
const STANCE=['cautious','steady','bold'];
const EARLS=[
  {name:'Osric',title:'Earl of Northumbria',ai:'steward',lead:2,stew:2,cun:1,renown:2},
  {name:'Aldric',title:'Earl of Cornwall',ai:'raider',lead:2,stew:1,cun:3,renown:1},
  {name:'Berta',title:'Countess of Norfolk',ai:'builder',lead:1,stew:2,cun:1,renown:3},
  {name:'Gwyn',title:'Earl of Chester',ai:'hoarder',lead:1,stew:2,cun:3,renown:2}];
// name, lon, lat, terrain, feature, base income, lord name, temperament
const SEATS=[
  ['Northumbria',-1.9,55.15,'hills','quarry',3,null,null],
  ['Cumbria',-3.0,54.55,'hills',null,3,'Ketil Longfell','loyal'],
  ['York',-1.1,54.0,'lowland','market',3,'Hild of Ouse','greedy'],
  ['Lancaster',-2.7,53.75,'forest',null,2,'Wulfstan Greycloak','fearful'],
  ['Lincoln',-0.4,53.2,'lowland','mill',2,'Edwin the Miller','proud'],
  ['Chester',-2.9,53.15,'lowland','port',3,null,null],
  ['Nottingham',-1.2,52.95,'forest',null,2,'Ralf of the Greenwood','loyal'],
  ['Gwynedd',-3.9,52.9,'hills',null,1,'Madoc ap Rhun','proud'],
  ['Powys',-3.25,52.25,'hills','shrine',1,'Elen of the Marches','loyal'],
  ['Norfolk',0.9,52.65,'lowland','port',2,null,null],
  ['Warwick',-1.6,52.4,'lowland','market',3,'Godric Crossways','greedy'],
  ['Gloucester',-2.35,51.85,'lowland','mill',3,'Abbess Mildryth','loyal'],
  ['Wessex',-1.4,51.1,'lowland','shrine',3,'Cynric the Elder','greedy'],
  ['Cornwall',-4.7,50.4,'hills','quarry',2,null,null],
  ['Devon',-3.7,50.75,'forest',null,3,'Rowena of Exe','greedy'],
  ['London',-0.1,51.5,'lowland','crown',5,'The Lord Mayor','city'],
  ['Kent',0.8,51.2,'coast','port',3,'Leofric Saltmarsh','fearful'],
  ['Essex',0.85,52.0,'marsh',null,1,'Aethelmaer of the Fen','proud']];
const CROWN=15,HOMES=[0,13,9,5],SECOND=[[1,0],[14,1]];
const COAST=[[-2.0,55.77],[-1.6,55.35],[-1.4,55.0],[-0.9,54.55],[-0.4,54.3],[-0.1,54.1],[0.1,53.6],[0.35,53.15],[0.2,52.85],[0.5,52.95],[1.3,52.93],[1.75,52.48],
  [1.35,51.95],[1.15,51.8],[0.9,51.5],[1.45,51.38],[1.32,51.12],[0.97,50.92],[0.25,50.73],[-0.8,50.72],[-1.6,50.65],[-2.45,50.52],[-3.65,50.22],[-4.4,50.3],[-5.2,49.96],[-5.7,50.07],
  [-5.5,50.2],[-4.55,51.0],[-4.1,51.2],[-3.0,51.2],[-2.4,51.75],[-3.2,51.45],[-3.95,51.6],[-5.1,51.65],[-5.3,51.9],[-4.65,52.1],[-4.1,52.4],[-4.75,52.8],[-4.6,53.35],[-3.85,53.33],
  [-3.1,53.25],[-3.05,53.45],[-3.05,53.7],[-2.9,54.1],[-3.25,54.1],[-3.6,54.5],[-3.0,54.95],[-2.5,55.4]];
const NOSEA=[['Powys','Devon'],['Gwynedd','Devon']];
const EXTRA=[['Northumbria','Lancaster']]; // the Pennine road: gives the north a third way out
const MAPX=8,MAPY=30,SC=560/5.9,LON0=-5.8,LAT0=55.8;
const proj=([lon,lat])=>({x:MAPX+(lon-LON0)*SC*0.6,y:MAPY+(LAT0-lat)*SC});
const SUBMIT_FACTOR={fearful:1.5,greedy:2,proud:3,loyal:Infinity,city:Infinity};

function clipHalf(poly,a,b){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y;const side=p=>(p.x-mx)*dx+(p.y-my)*dy;
  const out=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],sp=side(p),sq=side(q);
    if(sp<=0)out.push(p);if((sp<0)!==(sq<0)){const t=sp/(sp-sq);out.push({x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t});}}return out;}
function buildMap(){
  const coastPoly=COAST.map(proj);
  const cells=SEATS.map((s,i)=>{const c=proj([s[1],s[2]]);let poly=coastPoly;SEATS.forEach((o,j)=>{if(j!==i)poly=clipHalf(poly,c,proj([o[1],o[2]]));});
    let cx=0,cy=0;poly.forEach(p=>{cx+=p.x;cy+=p.y;});cx/=poly.length;cy/=poly.length;return {poly,cx:Math.round((cx+c.x)/2),cy:Math.round((cy+c.y)/2)};});
  const adj=cells.map(()=>new Set());
  cells.forEach((a,i)=>cells.forEach((b,j)=>{if(i<j){let shared=0;a.poly.forEach(p=>{if(b.poly.some(q=>Math.abs(p.x-q.x)<0.6&&Math.abs(p.y-q.y)<0.6))shared++;});
    const an=SEATS[i][0],bn=SEATS[j][0];if(shared>=2&&!NOSEA.some(([m,n])=>(an===m&&bn===n)||(an===n&&bn===m))){adj[i].add(j);adj[j].add(i);}}}));
  EXTRA.forEach(([m,n])=>{const i=SEATS.findIndex(x=>x[0]===m),j=SEATS.findIndex(x=>x[0]===n);adj[i].add(j);adj[j].add(i);});
  return {cells,adj,coastPoly};
}
const MAP=buildMap();

function createGame(seed,playerLord){
  const G={seed0:seed,seed,player:playerLord==null?0:playerLord,turn:0,log:[],over:null,
    gold:[25,25,25,25],alive:[1,1,1,1],crownHeld:[0,0,0,0],richHeld:[0,0,0,0],
    moved:false,deeds:0,knightBought:false,allies:{},pending:null,outlaws:[3,3,3,3],events:[],met:{}};
  G.lords=EARLS.map(e=>Object.assign({},e,{renownYear:e.renown}));
  G.prov=SEATS.map((s,i)=>({id:i,name:s[0],terrain:s[3],feature:s[4],base:s[5],owner:-1,vassal:false,
    levy:0,soldiers:0,knights:0,engines:0,castle:false,tax:1,unrest:0,mill:false,market:s[4]==='market',
    lord:s[6]?{name:s[6],temper:s[7],loyalty:5,dispossessed:false,host:-1,home:i}:null}));
  const r=()=>rnd(G);
  G.prov.forEach(p=>{if(p.lord)p.levy=3+Math.floor(r()*4);});
  const L=G.prov[CROWN];L.levy=10;L.castle=true;
  HOMES.forEach((id,l)=>{const p=G.prov[id];p.owner=l;p.soldiers=8;p.knights=1;p.castle=true;p.home=true;});
  SECOND.forEach(([id,l])=>{const p=G.prov[id];p.owner=l;p.vassal=true;p.lord.loyalty=7;p.levy=3;});
  say(G,'Spring, year 1. Take the neutral lands first; a weak lord may submit.');
  if(G.player>=0)ev(G,{type:'open',actor:G.player});
  return G;
}
function ev(G,e){G.events.push(e);}
function meet(G,l,p){if(p.lord&&!G.met[l+':'+p.id]){G.met[l+':'+p.id]=true;ev(G,{type:'meet',actor:l,prov:p.id});}}
function rnd(G){G.seed=(G.seed*1103515245+12345)&0x7fffffff;return G.seed/0x7fffffff;}
function say(G,s){G.log.push(s);if(G.log.length>120)G.log.shift();}
function season(G){return SEASONS[G.turn%4];}
function year(G){return 1+Math.floor(G.turn/4);}
function adj(a,b){return MAP.adj[a].has(b);}
function neighbours(G,i){return [...MAP.adj[i]].map(j=>G.prov[j]);}
function count(G,l){return G.prov.filter(p=>p.owner===l).length;}
function maxDeeds(G,l){return count(G,l)>=6?2:1;}

// ---- economy ----
function provIncome(G,p){
  if(p.owner<0)return 0;
  const seasonMod=season(G)==='Autumn'?2:season(G)==='Winter'?0.5:1;
  const tax=p.vassal?1:p.tax;
  let v=Math.floor(p.base*tax*seasonMod);
  if(p.market)v+=2;if(p.mill)v+=1+(season(G)==='Autumn'?1:0);if(p.feature==='port')v+=1;
  if(p.vassal)v=Math.max(0,v-1);
  return v;
}
function upkeep(G,l){let u=0,castles=0;G.prov.forEach(p=>{if(p.owner===l){u+=p.knights+p.engines;if(p.castle&&!p.vassal)castles++;}});return u+Math.max(0,castles-1);}
function income(G,l){let v=0;G.prov.forEach(p=>{if(p.owner===l)v+=provIncome(G,p);});v+=Math.floor(count(G,l)/4)*G.lords[l].stew;v-=upkeep(G,l);
  if(!G.prov.some(p=>p.owner===l&&p.home&&p.castle))v=Math.floor(v/2);return v;}
function totalIncome(G){let t=0;for(let l=0;l<4;l++)t+=Math.max(0,income(G,l));return t;}
function armyPoints(G,l){let s=0;G.prov.forEach(p=>{if(p.owner===l)s+=p.soldiers+3*p.knights;});return s;}

// ---- contests ----
function strength(G,p,attacking){
  let s=p.soldiers+p.knights*3+(p.vassal&&!attacking?Math.round(p.levy*1.5):(p.levy||0));
  if(p.owner>=0)s+=G.lords[p.owner].lead;
  if(!attacking){if(p.castle)s*=2;if(p.terrain==='hills')s+=2;if(p.terrain==='forest')s+=1;}
  else if(p.engines>1)s=Math.round(s*(1+0.25*(p.engines-1)));
  return s;
}
function odds(as,ds,stance){return Math.max(0.05,Math.min(0.95,as/(as+ds)+((stance==null?1:stance)-1)*0.1));}
function lordName(G,p){return p.owner<0?(p.lord?p.lord.name:'no one'):G.lords[p.owner].name;}

// Returns {ok, offer} ; offer means a submission is on the table and nothing has moved yet.
function march(G,from,to,leaveN,stance,accept){
  const A=G.prov[from],D=G.prov[to],att=A.owner;
  const moveS=A.soldiers-leaveN,moveK=A.knights,moveE=A.engines;
  if(moveS<=0&&moveK<=0){say(G,'No one to march.');return {ok:false};}
  if(D.owner===att){ // move within own land (vassal land: loyalty cost)
    D.soldiers+=moveS;D.knights+=moveK;D.engines+=moveE;A.soldiers=leaveN;A.knights=0;A.engines=0;
    if(D.vassal){D.lord.loyalty=Math.max(0,D.lord.loyalty-2);say(G,G.lords[att].name+' marches through '+D.name+'; '+D.lord.name+' resents it.');}
    else say(G,G.lords[att].name+' marches to '+D.name+'.');
    ev(G,{type:'move',actor:att,prov:to,from});
    return {ok:true};
  }
  if(D.owner>=0&&G.allies[key(att,D.owner)]>G.turn){say(G,'You are sworn to peace with '+G.lords[D.owner].name+'.');return {ok:false};}
  if(D.castle&&moveE<=0){say(G,'Walls at '+D.name+'. You need a siege engine.');return {ok:false};}
  const stack={soldiers:moveS,knights:moveK,engines:moveE,owner:att,levy:0};
  const as=strength(G,stack,true),ds=strength(G,D,false);
  if(accept===undefined)meet(G,att,D);
  // submission offer from an independent lord
  if(D.owner<0&&D.lord&&!D.lord.dispossessed){
    const f=SUBMIT_FACTOR[D.lord.temper];
    if(as>=ds*f){
      if(accept===undefined)return {ok:false,offer:{from,to,leave:leaveN,stance,as,ds}};
      if(accept){A.soldiers=leaveN;A.knights=0;A.engines=0;D.owner=att;D.vassal=true;D.lord.loyalty=5;D.soldiers=moveS;D.knights=moveK;D.engines=moveE;
        say(G,D.lord.name+' of '+D.name+' kneels to '+G.lords[att].name+'.');ev(G,{type:'homage',actor:att,prov:to});return {ok:true,submitted:true};}
    }
  }
  const pWin=odds(as,ds,stance),won=rnd(G)<pWin,pct=Math.round(pWin*100)+'%';
  const who=D.owner<0?(D.lord?D.lord.name+' at '+D.name:'the levies of '+D.name):G.lords[D.owner].name+' at '+D.name;
  if(won){
    const lossFrac=Math.max(0.2,Math.min(0.6,ds/as*0.5));
    const lostS=Math.max(1,Math.round(moveS*lossFrac)),lostK=Math.round(moveK*lossFrac);
    A.soldiers=leaveN;A.knights=0;A.engines=0;conquer(G,D,att);
    D.soldiers=moveS-lostS;D.knights=moveK-lostK;D.engines=moveE;
    say(G,G.lords[att].name+' beats '+who+' ('+as+' v '+ds+', '+pct+'), loses '+(lostS+lostK)+'.');
    ev(G,{type:'battle',actor:att,target:D.owner,prov:to,won:true,as,ds});
    if(D.castle)ev(G,{type:'siege_win',actor:att,target:D.owner,prov:to});
  }else{
    ev(G,{type:'battle',actor:att,target:D.owner,prov:to,won:false,as,ds});
    if(D.castle)ev(G,{type:'siege_loss',actor:att,target:D.owner,prov:to});
    const f=D.castle?0.25:stance===0?0.25:stance===2?0.8:0.5;
    const lostS=Math.round(moveS*f),lostK=Math.round(moveK*f);
    A.soldiers-=lostS;A.knights-=lostK;
    const dl=D.castle?0.1:0.25;D.levy=Math.max(0,D.levy-Math.round(D.levy*dl));D.soldiers=Math.max(0,D.soldiers-Math.round(D.soldiers*dl));
    say(G,G.lords[att].name+' repulsed by '+who+' ('+as+' v '+ds+', '+pct+'), loses '+(lostS+lostK)+'.');
  }
  return {ok:true};
}
function key(a,b){return a<b?a+'-'+b:b+'-'+a;}
function conquer(G,p,l){
  const old=p.owner;
  if(p.lord&&(old<0||p.vassal)&&!p.lord.dispossessed&&p.lord.temper!=='city'){
    p.lord.dispossessed=true;p.lord.loyalty=0;
    // flees to the court of the living earl with the highest cunning who is not the conqueror
    let host=-1;for(let e=0;e<4;e++)if(e!==l&&G.alive[e]&&(host<0||G.lords[e].cun>G.lords[host].cun))host=e;
    p.lord.host=host;if(host>=0)say(G,p.lord.name+' flees to the court of '+G.lords[host].name+'.');
    ev(G,{type:'conquest',actor:l,target:old,prov:p.id});
  }
  if(p.lord&&p.lord.temper==='loyal'&&old<0){G.lords[l].renown=Math.max(0,G.lords[l].renown-1);}
  p.owner=l;p.vassal=false;p.levy=0;p.soldiers=0;p.knights=0;p.engines=0;p.unrest=0;p.tax=1;
  if(old>=0&&count(G,old)===0){G.alive[old]=0;say(G,G.lords[old].name+' is finished.');}
}

// ---- deeds ----
function tournament(G,l,r,stake,purse){
  if(G.gold[l]<stake+purse){say(G,'Not enough gold for that wager.');return false;}
  const L=G.lords[l],R=G.lords[r];
  const rp=Math.max(0,R.ai==='hoarder'?Math.min(G.gold[r]-stake,3):R.ai==='raider'?Math.min(G.gold[r]-stake,12):Math.min(G.gold[r]-stake,6+Math.floor(rnd(G)*6)));
  const kn=x=>G.prov.filter(p=>p.owner===x&&p.home).reduce((a,p)=>a+p.knights,0);
  const my=L.renown+purse+kn(l),theirs=R.renown+rp+kn(r);
  const p=odds(my,theirs,1),won=rnd(G)<p;
  G.gold[l]-=purse;G.gold[r]=Math.max(0,G.gold[r]-rp);
  if(won){G.gold[l]+=stake;G.gold[r]=Math.max(0,G.gold[r]-stake);L.renown=Math.min(10,L.renown+1);}
  else{G.gold[l]-=stake;G.gold[r]+=stake;L.renown=Math.max(0,L.renown-1);}
  say(G,'Tourney v '+R.name+': '+my+' v '+theirs+' ('+Math.round(p*100)+'%). '+(won?'Won':'Lost')+' '+stake+'g.');
  const home=G.prov.find(q=>q.owner===l&&q.home)||G.prov.find(q=>q.owner===l);ev(G,{type:won?'tourney_win':'tourney_loss',actor:l,target:r,rival:r,prov:home?home.id:undefined,title:'The tournament'});
  return true;
}
function raid(G,from,to){
  const A=G.prov[from],D=G.prov[to],l=A.owner;
  if(A.knights<1){say(G,'A raid needs a knight.');return false;}
  const L=G.lords[l];
  const rp=L.cun+1+(D.castle?0:2),gp=Math.floor((D.soldiers+D.levy+D.knights*3)/2)+(D.castle?2:0)+Math.max(0,2-D.unrest);
  const p=odds(rp,gp,1),won=rnd(G)<p;
  if(won){if(D.owner>=0){const g=Math.floor(G.gold[D.owner]*0.25);G.gold[D.owner]-=g;G.gold[l]+=g;say(G,'Raid on '+D.name+' ('+Math.round(p*100)+'%): stole '+g+'g.');}
    else{D.levy=Math.max(0,D.levy-2);say(G,'Raid on '+D.name+' ('+Math.round(p*100)+'%): levy scattered.');}}
  else{A.knights-=1;L.renown=Math.max(0,L.renown-1);say(G,'Raid on '+D.name+' fails ('+Math.round(p*100)+'%). Knight lost.');}
  return true;
}
function ally(G,l,r){if(!G.alive[r]){return false;}G.allies[key(l,r)]=G.turn+4;say(G,G.lords[l].name+' and '+G.lords[r].name+' swear four seasons of peace.');return true;}
function marry(G,l,pid){
  const p=G.prov[pid],L=G.lords[l];
  if(!p.lord||p.owner>=0||p.lord.dispossessed||p.lord.temper==='city'){say(G,'No house to marry into there.');return false;}
  if(L.renown<5){say(G,'Your renown is too low for '+p.lord.name+'.');return false;}
  if(G.gold[l]<COST.marriage){say(G,'A wedding costs 15 gold.');return false;}
  if(!neighbours(G,pid).some(q=>q.owner===l)){say(G,'You share no border with '+p.name+'.');return false;}
  G.gold[l]-=COST.marriage;p.owner=l;p.vassal=true;p.lord.loyalty=7;
  say(G,'A wedding at '+p.name+'. '+p.lord.name+' is family now.');ev(G,{type:'marriage',actor:l,prov:pid});return true;
}
function turnVassal(G,l,pid){
  const p=G.prov[pid],L=G.lords[l];
  if(!p.vassal||p.owner===l||p.owner<0){say(G,'That is no rival\'s vassal.');return false;}
  const pr=odds(L.cun,Math.max(1,p.lord.loyalty/3),1),won=rnd(G)<pr;
  if(won){const old=p.owner;p.owner=l;p.lord.loyalty=5;p.soldiers=0;p.knights=0;p.engines=0;say(G,p.lord.name+' turns from '+G.lords[old].name+' to '+L.name+' ('+Math.round(pr*100)+'%).');if(count(G,old)===0)G.alive[old]=0;}
  else{p.lord.loyalty=Math.min(10,p.lord.loyalty+1);say(G,p.lord.name+' refuses '+L.name+' ('+Math.round(pr*100)+'%) and tells their lord.');}
  return true;
}
function pardon(G,l,pid){
  const p=G.prov[pid],L=G.lords[l];
  if(!p.lord||!p.lord.dispossessed||p.owner!==l){say(G,'No one to pardon there.');return false;}
  if(p.lord.temper==='proud'){if(L.renown<2){say(G,'Too little renown to pardon a proud lord.');return false;}L.renown-=2;}
  if(p.lord.temper==='greedy'){if(G.gold[l]<10){say(G,'A greedy lord wants 10 gold.');return false;}G.gold[l]-=10;}
  p.lord.dispossessed=false;p.lord.host=-1;p.vassal=true;p.lord.loyalty=7;p.levy=3;p.unrest=0;
  say(G,p.lord.name+' is pardoned and kneels at '+p.name+'.');ev(G,{type:'pardon',actor:l,prov:pid});return true;
}
function drawCard(G,l){
  const r=rnd(G),mine=G.prov.filter(p=>p.owner===l);
  if(r<0.3){G.gold[l]+=5;say(G,'Good harvest: +5 gold.');}
  else if(r<0.5){const p=mine[Math.floor(rnd(G)*mine.length)];p.soldiers=Math.max(0,p.soldiers-2);p.levy=Math.max(0,p.levy-1);say(G,'Plague at '+p.name+'.');}
  else if(r<0.75){if(G.outlaws[l]>0&&mine.some(p=>p.terrain==='forest'&&!p.vassal)){const p=mine.find(q=>q.terrain==='forest'&&!q.vassal);p.soldiers+=6;G.outlaws[l]--;say(G,'The outlaws of '+p.name+' send six men.');}else say(G,'The outlaws send word, but you hold no forest.');}
  else{const v=mine.filter(p=>p.vassal);if(v.length){const p=v[Math.floor(rnd(G)*v.length)];p.lord.loyalty=Math.max(0,p.lord.loyalty-2);say(G,'Treachery whispered at '+p.name+'.');}else{G.gold[l]+=2;say(G,'A quiet season at court. +2 gold.');}}
  return true;
}

// ---- player-facing buys ----
function buy(G,l,pid,kind){
  const p=G.prov[pid];if(p.owner!==l||p.vassal){say(G,'Not your land to build on.');return false;}
  let cost=COST[kind];if(kind==='castle'&&p.feature==='quarry')cost=12;if(kind==='knight'&&season(G)==='Spring')cost=6;
  if(G.gold[l]<cost){say(G,'Not enough gold.');return false;}
  if(kind==='castle'&&p.castle){say(G,'Already a castle.');return false;}
  if(kind==='mill'&&p.mill){say(G,'Already a mill.');return false;}
  if(kind==='market'){if(p.market){say(G,'Already a market.');return false;}const have=G.prov.filter(q=>q.owner===l&&q.market&&!q.vassal).length;if(have>=Math.floor(count(G,l)/3)){say(G,'One market charter per three provinces.');return false;}}
  if(kind==='knight'&&G.knightBought){say(G,'One knight a season.');return false;}
  if(!p.castle&&(kind==='soldier'||kind==='knight'||kind==='engine')){say(G,'Recruiting needs a castle here.');return false;}
  G.gold[l]-=cost;
  if(kind==='soldier')p.soldiers++;if(kind==='knight'){p.knights++;G.knightBought=true;}if(kind==='engine')p.engines++;
  if(kind==='castle')p.castle=true;if(kind==='mill')p.mill=true;if(kind==='market')p.market=true;
  return true;
}

// ---- season end ----
function endSeason(G){
  for(let l=0;l<4;l++)if(l!==G.player&&G.alive[l])aiTurn(G,l);
  for(let l=0;l<4;l++)if(G.alive[l])G.gold[l]=Math.max(0,G.gold[l]+income(G,l));
  const winter=season(G)==='Winter';
  G.prov.forEach(p=>{
    if(p.owner>=0&&!p.vassal){
      if(p.tax>1)p.unrest++;else if(p.tax<1)p.unrest=Math.max(0,p.unrest-1);
      if(!p.castle&&p.soldiers+p.knights+p.levy===0)p.unrest++;
      if(p.tax<=1&&p.unrest<3&&p.levy<3&&!winter)p.levy++; // local militia
    }else if(p.owner>=0&&p.vassal){
      if(p.levy<6&&!winter)p.levy++; // a lord keeps retainers
      if(p.unrest>=5){say(G,p.name+' revolts against '+G.lords[p.owner].name+'!');ev(G,{type:'revolt',actor:p.owner,target:p.owner,prov:p.id});revolt(G,p);}
    }else if(p.owner<0){
      if(p.feature==='crown'){if(p.levy<16)p.levy++;}else if(winter&&p.levy<8)p.levy++;
    }
    if(winter&&!p.castle&&p.soldiers+p.knights>3){const lost=Math.max(1,Math.round(p.soldiers*0.1));p.soldiers-=lost;if(p.owner>=0){say(G,lost+' of '+G.lords[p.owner].name+'\'s men freeze at '+p.name+'.');if(!G.frozeOnce){G.frozeOnce=true;ev(G,{type:'frozen',actor:p.owner,prov:p.id});}}}
  });
  // loyalty
  G.prov.forEach(p=>{
    if(!p.vassal||p.owner<0)return;const L=G.lords[p.owner],ld=p.lord;
    if(ld.temper==='greedy'&&[0,1,2,3].every(o=>o===p.owner||!G.alive[o]||income(G,o)<income(G,p.owner)))ld.loyalty++;
    if(ld.temper==='fearful'&&[0,1,2,3].every(o=>o===p.owner||!G.alive[o]||armyPoints(G,o)<armyPoints(G,p.owner)))ld.loyalty++;
    if(neighbours(G,p.id).some(q=>q.owner===-1&&q.lord&&q.lord.host===-1&&q.unrest===0&&q.justRevolted))ld.loyalty--;
    ld.loyalty=Math.max(0,Math.min(10,ld.loyalty));
    if(ld.loyalty<=0){const old=p.owner;let best=-1,bs=0;neighbours(G,p.id).forEach(q=>{if(q.owner>=0&&q.owner!==old){const s=armyPoints(G,q.owner);if(s>bs){bs=s;best=q.owner;}}});
      p.owner=best;p.vassal=best>=0;ld.loyalty=5;p.soldiers=0;p.knights=0;p.engines=0;
      say(G,ld.name+' of '+p.name+' renounces '+G.lords[old].name+(best>=0?' for '+G.lords[best].name:'')+'.');ev(G,{type:'defection',actor:old,target:old,prov:p.id,newowner:best});if(count(G,old)===0)G.alive[old]=0;}
  });
  G.prov.forEach(p=>{p.justRevolted=false;});
  // dispossessed lords return
  G.prov.forEach(p=>{const ld=p.lord;if(!ld||!ld.dispossessed||ld.host<0||!G.alive[ld.host]||p.owner<0)return;
    if(p.unrest>=2&&rnd(G)<0.1*G.lords[ld.host].cun){say(G,ld.name+' returns and '+p.name+' rises for them!');ev(G,{type:'returned',actor:p.owner,target:p.owner,prov:p.id});revolt(G,p);ld.dispossessed=false;ld.host=-1;ld.loyalty=5;}});
  G.turn++;G.moved=false;G.knightBought=false;G.deeds=0;G.pending=null;
  if(G.turn%4===0){G.prov.forEach(p=>{if(p.feature==='shrine'&&p.owner>=0)G.lords[p.owner].renown=Math.min(10,G.lords[p.owner].renown+1);});
    G.lords.forEach((L,l)=>{const d=L.renown-L.renownYear;if(d!==0)G.prov.forEach(p=>{if(p.vassal&&p.owner===l)p.lord.loyalty=Math.max(0,Math.min(10,p.lord.loyalty+(d>0?1:-1)));});L.renownYear=L.renown;});}
  // victory
  const crown=G.prov[CROWN];
  for(let l=0;l<4;l++){
    const inc=income(G,l),best=[0,1,2,3].every(o=>o===l||!G.alive[o]||income(G,o)<inc);
    G.crownHeld[l]=(crown.owner===l&&crown.castle&&best)?G.crownHeld[l]+1:0;
    G.richHeld[l]=(G.alive[l]&&inc>=totalIncome(G)*0.6&&inc>=20)?G.richHeld[l]+1:0;
    if(G.crownHeld[l]>=4)G.over={l,how:'crown'};else if(G.richHeld[l]>=4)G.over={l,how:'treasury'};
  }
  const living=[0,1,2,3].filter(l=>G.alive[l]);
  if(living.length===1)G.over={l:living[0],how:'last'};
  if(G.player>=0&&!G.alive[G.player]&&!G.over)G.over={l:-1,how:'dead'};
  if(G.turn>=48&&!G.over){let b=living[0];living.forEach(l=>{if(income(G,l)>income(G,b))b=l;});G.over={l:b,how:'time'};}
  if(G.over&&G.player>=0){const o=G.over,me=G.player;
    if(o.l===me)ev(G,{type:o.how==='time'?'time_win':'crown',actor:me,prov:CROWN,title:o.how==='time'?'Twelve years':'The crown'});
    else ev(G,{type:o.how==='time'?'time_loss':'defeat',actor:me,winner:o.l,prov:CROWN,title:o.how==='time'?'Twelve years':'The end'});}
  if(G.player>=0)say(G,'— '+season(G)+', year '+year(G)+'. Income '+income(G,G.player)+', treasury '+G.gold[G.player]+' —');
}
function revolt(G,p){const o=p.owner;p.owner=-1;p.vassal=false;p.levy=4;p.soldiers=0;p.knights=0;p.engines=0;p.unrest=0;p.tax=1;p.justRevolted=true;if(p.lord&&p.lord.dispossessed){p.lord.dispossessed=false;p.lord.host=-1;}if(count(G,o)===0)G.alive[o]=0;}

// BFS through own land from `from` to the nearest province not owned by l; returns the first step
function nextStep(G,l,from,goal){
  goal=goal||(pn=>pn.owner!==l);
  const prev={};prev[from]=null;const q=[from];
  while(q.length){const c=q.shift();for(const n of MAP.adj[c]){if(n in prev)continue;prev[n]=c;const pn=G.prov[n];
    if(goal(pn)){let x=n;while(prev[x]!==from&&prev[x]!==null)x=prev[x];return x===n?n:x;}
    if(pn.owner===l)q.push(n);}}
  return null;
}
// ---- AI ----
function aiTurn(G,l){
  const mine=G.prov.filter(p=>p.owner===l);if(!mine.length)return;
  const own=mine.filter(p=>!p.vassal);const pers=G.lords[l].ai;const home=mine.find(p=>p.home)||own[0]||mine[0];
  own.forEach(p=>{p.tax=(pers==='hoarder'&&p.unrest<2&&p.castle)?1.5:(p.unrest>=3?0.5:1);});
  if(!home.castle&&!home.vassal&&G.gold[l]>=COST.castle){home.castle=true;G.gold[l]-=COST.castle;}
  {const t=own.find(p=>!p.mill);const need=pers==='builder'?COST.mill+5:COST.mill+15;if(t&&G.gold[l]>=need){t.mill=true;G.gold[l]-=COST.mill;}}
  if(own.length>=3&&G.gold[l]>=COST.castle+8){const t=own.filter(p=>!p.castle).sort((a,b)=>b.base-a.base)[0];if(t){t.castle=true;G.gold[l]-=COST.castle;}}
  const base=own.filter(p=>p.castle).sort((a,b)=>strength(G,b,true)-strength(G,a,true))[0]||home;
  const reserve=pers==='hoarder'?12:pers==='builder'?8:3;
  const kn=mine.reduce((a,p)=>a+p.knights,0);
  if(kn<2&&income(G,l)>=5&&G.gold[l]-reserve>=COST.knight&&base.castle){base.knights++;G.gold[l]-=COST.knight;}
  const rec=(G.turn>=28&&mine.filter(p=>p.castle&&p.soldiers>0).sort((a,b)=>b.soldiers-a.soldiers)[0])||base;
  if(rec.castle){const n=Math.max(0,Math.min(20,G.gold[l]-reserve));rec.soldiers+=n;G.gold[l]-=n;}
  // deeds: pardon a threat, marry when able, turn a vassal, else nothing
  let deeds=0;const max=maxDeeds(G,l);
  const threat=own.find(p=>p.lord&&p.lord.dispossessed&&p.unrest>=1);
  if(deeds<max&&threat&&pardon(G,l,threat.id))deeds++;
  if(deeds<max&&G.lords[l].renown>=5&&G.gold[l]>=COST.marriage+10){const t=G.prov.find(p=>p.owner<0&&p.lord&&!p.lord.dispossessed&&p.lord.temper!=='city'&&neighbours(G,p.id).some(q=>q.owner===l));if(t&&marry(G,l,t.id))deeds++;}
  if(deeds<max&&pers==='hoarder'){const t=G.prov.find(p=>p.vassal&&p.owner>=0&&p.owner!==l&&p.lord.loyalty<=4&&neighbours(G,p.id).some(q=>q.owner===l));if(t&&turnVassal(G,l,t.id))deeds++;}
  if(deeds<max&&pers==='raider'){const from=own.find(p=>p.knights>=2);if(from){const t=neighbours(G,from.id).find(q=>q.owner>=0&&q.owner!==l&&G.gold[q.owner]>=12);if(t&&raid(G,from.id,t.id))deeds++;}}
  const crownP=G.prov[CROWN];const late=G.turn>=28&&crownP.owner!==l;
  if(late){ // stage an engine where the army is
    const big=mine.filter(p=>p.soldiers+p.knights>0).sort((a,b)=>strength(G,b,true)-strength(G,a,true))[0];
    if(big&&!mine.some(p=>p.engines>0)&&G.gold[l]>=COST.engine){big.engines++;G.gold[l]-=COST.engine;}
  }
  if(season(G)==='Winter')return;
  const from=mine.filter(p=>p.soldiers+p.knights>0).sort((a,b)=>strength(G,b,true)-strength(G,a,true))[0];if(!from)return;
  const leave=from.castle?2:3;const stack={soldiers:from.soldiers-leave,knights:from.knights,engines:from.engines,owner:l,levy:0};
  if(stack.soldiers+stack.knights<=2)return;
  const as=strength(G,stack,true);
  const targets=neighbours(G,from.id).filter(t=>t.owner!==l&&!(t.owner>=0&&G.allies[key(l,t.owner)]>G.turn)).map(t=>({t,ds:strength(G,t,false)})).filter(o=>!(o.t.castle&&from.engines===0));
  const margin=pers==='raider'?1.3:1.6;const crownMargin=1.2;
  let best=null;targets.forEach(o=>{const v=(o.t.base+(o.t.market?2:0)+(o.t.feature==='crown'?3:0)+(o.t.owner<0?1:0))/(o.ds+1);if(as>o.ds*(o.t.feature==='crown'?crownMargin:margin)&&(!best||v>best.v))best={...o,v};});
  if(best){const stance=(pers==='raider'&&as>=best.ds*1.5)?2:1;const r=march(G,from.id,best.t.id,leave,stance);
    if(r.offer)march(G,from.id,best.t.id,leave,stance,!(pers==='raider'&&r.offer.as>=r.offer.ds*3));return;}
  // nothing worth attacking next door: walk the army through own land toward the nearest foreign province
  if(late&&from.engines>0){ // walk the siege train toward London through own land
    const step=nextStep(G,l,from.id,pn=>pn.id===CROWN);
    if(step!=null&&G.prov[step].owner===l){march(G,from.id,step,leave,1);return;}
  }
  if(targets.length===0||as>Math.min(...targets.map(o=>o.ds))*0.8){
    const step=nextStep(G,l,from.id);if(step!=null&&G.prov[step].owner===l){march(G,from.id,step,leave,1);return;}
  }
  if(neighbours(G,from.id).some(t=>t.owner!==l&&t.castle)&&G.gold[l]>=COST.engine+5&&from.engines===0){from.engines++;G.gold[l]-=COST.engine;}
}

function preview(G,from,to,moveS,stance){const A=G.prov[from],D=G.prov[to];const stack={soldiers:moveS,knights:A.knights,engines:A.engines,owner:A.owner,levy:0};const as=strength(G,stack,true),ds=strength(G,D,false);
  const f=D.owner<0&&D.lord&&!D.lord.dispossessed?SUBMIT_FACTOR[D.lord.temper]:Infinity;
  return {as,ds,odds:odds(as,ds,stance),needEngine:D.castle&&A.engines<=0,mayKneel:as>=ds*f,ally:D.owner>=0&&G.allies[key(A.owner,D.owner)]>G.turn,own:D.owner===A.owner};}
const Sim={preview,SEASONS,COST,STANCE,EARLS,SEATS,CROWN,MAP,createGame,season,year,adj,neighbours,count,maxDeeds,provIncome,upkeep,income,totalIncome,armyPoints,strength,odds,lordName,march,tournament,raid,ally,marry,turnVassal,pardon,drawCard,buy,endSeason,aiTurn,say,key};
if(typeof module!=='undefined'&&module.exports)module.exports=Sim;else root.Sim=Sim;
})(typeof window!=='undefined'?window:globalThis);
