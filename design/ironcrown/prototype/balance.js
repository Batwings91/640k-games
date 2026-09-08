#!/usr/bin/env node
// Headless balance runner: AI v AI campaigns, no rendering.
// Usage: node balance.js [games=200] [seedStart=1]
// Prints win rate per earl, how games end, when they end, and average land per earl at the end.
const Sim=require('./sim.js');
const N=+process.argv[2]||200,S0=+process.argv[3]||1;
const wins=[0,0,0,0],how={crown:0,treasury:0,last:0,time:0},years=[],land=[0,0,0,0],inc=[0,0,0,0],endTurns=[];
for(let i=0;i<N;i++){
  const G=Sim.createGame(S0+i,-1);
  let t=0;while(!G.over&&t<48){Sim.endSeason(G);t++;}
  if(G.over&&G.over.l>=0)wins[G.over.l]++;if(G.over)how[G.over.how]=(how[G.over.how]||0)+1;
  years.push(Sim.year(G));endTurns.push(G.turn);
  for(let l=0;l<4;l++){land[l]+=Sim.count(G,l);inc[l]+=Math.max(0,Sim.income(G,l));}
}
const avg=a=>(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1);
const dist=years.reduce((m,y)=>{m[y]=(m[y]||0)+1;return m;},{});
console.log('games',N);
Sim.EARLS.forEach((e,l)=>console.log(e.name.padEnd(8),'wins',String(Math.round(wins[l]/N*100)).padStart(3)+'%','  avg land',(land[l]/N).toFixed(1),'  avg income',(inc[l]/N).toFixed(1)));
console.log('ends by',how);
console.log('avg end year',avg(years),' by year:',Object.entries(dist).map(([y,c])=>y+':'+c).join(' '));
