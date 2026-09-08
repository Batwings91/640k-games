// Ironcrown cut scenes, text only. Each scene is a portrait slot, a title, and two or three lines.
// The sim emits events (G.events); the page turns the ones that involve the player into scenes.
// Placeholder paintings: a coloured frame with the lord's initials. See 02-game-design.md, "Cut scenes".
(function(root){
'use strict';
// Per-lord first-meeting lines, by lord name. One line each; the temperament line follows it.
const MEET={
  'Ketil Longfell':'"The fells are mine and my father\'s. But the north needs a strong hand. Yours will do."',
  'Hild of Ouse':'"York has the richest hall north of the Trent. Everyone wants it. What are you offering?"',
  'Wulfstan Greycloak':'"We keep to the trees and ask nothing. Leave us the trees and you may have the rest."',
  'Edwin the Miller':'"Lincoln fed kings before your grandfather was born. Mind how you speak to us."',
  'Ralf of the Greenwood':'"The Greenwood answers to no earl. It answers to me, and I answer to the poor."',
  'Madoc ap Rhun':'"Come up into the mountains if you want Gwynedd. Many have. The crows are well fed."',
  'Elen of the Marches':'"The shrine at Powys has stood four hundred years. It will stand when you are dust."',
  'Godric Crossways':'"Every road in England runs through Warwick, and every road has a toll."',
  'Abbess Mildryth':'"Gloucester is God\'s land, held in trust. Raise a hand against it and answer to Him."',
  'Cynric the Elder':'"My line held Wessex when yours herded goats. But the times are what they are. Name a price."',
  'The Lord Mayor':'"London has walls, London has money, and London chooses. Show us a king and we will open the gate."',
  'Leofric Saltmarsh':'"Kent watches the sea. What comes by land, we have learned, is best not resisted."',
  'Aethelmaer of the Fen':'"The fens drown armies. They drowned better than yours. Still, let us talk."',
  'Rowena of Exe':'"Devon is yours already, my lord. The question is what Devon gets for it."'};
const TEMPER={
  proud:'A proud house. They will not kneel to anything but overwhelming force.',
  greedy:'A greedy house. They kneel to strength and stay while your purse is the fullest.',
  fearful:'A fearful house. They kneel easily and stay while your army is the largest.',
  loyal:'A loyal house. They never kneel to force; win them by marriage or pardon and they never leave.',
  city:'The City. It kneels to no one. Bring engines.'};
const EARL_OPEN={
  Osric:['The old king is dead and the north has buried him without tears.','Northumbria is yours, and Cumbria with it. London is a long way south.','Twelve years. Take the land, grow the gold, and the crown will follow.'],
  Aldric:['The old king is dead, and Cornwall did not go to the funeral.','Tin in the ground, Devon at your back, and every road to London runs uphill.','Twelve years. Strike first, and keep striking.'],
  Berta:['The old king is dead and the ledgers of Norfolk are already open.','Wool, ports, and neighbours who can count. London is two days\' ride.','Twelve years. A kingdom is a sum. Add it up.'],
  Gwyn:['The old king is dead and the Marches heard it a week before anyone else.','Chester holds the door to Wales and the road to the Midlands.','Twelve years. Every wall has a gate, and every gate a price.']};
const SHARED={
  homage:['{lord} kneels in the hall at {prov} and swears to hold it in your name.','{temper}','Loyalty 5. Their land pays you and their levy keeps it.'],
  conquest:['{prov} is taken. {lord} rides out by the north gate with a dozen riders and no baggage.','They will find a court that hates you. Keep {prov} quiet, or they will be back.'],
  defection:['{lord} of {prov} sends back your banner, folded, with a courteous note.','{prov} is {newowner}\'s now. Loyalty was a number, and you let it reach zero.'],
  returned:['{lord} is back. {prov} rose for them in the night and your garrison is on the road.','The people remembered their old lord. You gave them reasons.'],
  marriage:['Bells at {prov}. {lord}\'s house and yours are one house now.','Loyalty 7. A marriage is worth ten castles, if you keep the peace.'],
  pardon:['{lord} kneels, is raised, and is given back {prov} with your hand on their shoulder.','Loyalty 7. Mercy is remembered longer than victory.'],
  tourney_win:['The lists at {prov}. Your champion unhorses {rival}\'s on the third pass.','The stakes are yours, and the crowd knows your name.'],
  tourney_loss:['The lists at {prov}. Your champion goes down on the second pass.','{rival} takes the stakes. The crowd is quiet on your side of the field.'],
  siege_win:['The wall at {prov} gives at dawn. {lord} is found in the chapel and treated with courtesy.','The city is yours.'],
  siege_loss:['The wall at {prov} holds. Your engine burns in the ditch and the men come back in twos and threes.','Bring more next time, or come with a different offer.'],
  frozen:['Winter at {prov}. The men outside the walls dig graves in frozen ground.','Bring the army home before the snow, or build walls where it stands.'],
  crown:['London opens its gate. The Lord Mayor kneels, which he has never done before.','The Archbishop is sent for. The crown is heavier than it looks.','Twelve years ago the old king died and nobody wept. They will weep for you.'],
  defeat:['Your last castle falls. A herald reads your name from a list, and moves on.','The land you took forgot you in a season. The gold is in someone else\'s chest.'],
  time_win:['Twelve years. No one holds London, but no one holds more of England than you.','The crown is offered, quietly, by the men who count such things.'],
  time_loss:['Twelve years, and the count goes against you.','{winner} has the land and the gold. You have the memory of both.']};
function fill(s,v){return s.replace(/\{(\w+)\}/g,(m,k)=>v[k]!=null?v[k]:m);}
// Build scenes from sim events for lord index `me`. Returns [{title, initials, colour, lines}].
function fromEvents(events,G,me){
  const out=[];
  events.forEach(e=>{
    const p=e.prov!=null?G.prov[e.prov]:null;const lord=p&&p.lord?p.lord.name:'';const v={prov:p?p.name:'',lord,temper:p&&p.lord?TEMPER[p.lord.temper]:'',
      newowner:e.newowner>=0?G.lords[e.newowner].name:'no one',rival:e.rival!=null?G.lords[e.rival].name:'',winner:e.winner!=null&&e.winner>=0?G.lords[e.winner].name:''};
    const push=(title,lines,who)=>out.push({title,lines:lines.map(l=>fill(l,v)),initials:(who||'').split(' ').map(w=>w[0]).join('').slice(0,2),lord:who||''});
    const involvesMe=e.actor===me||e.target===me;
    if(e.type==='open'&&e.actor===me)push(G.lords[me].name+', '+G.lords[me].title,EARL_OPEN[G.lords[me].name],G.lords[me].name);
    else if(e.type==='meet'&&e.actor===me&&lord)push(lord+' of '+p.name,[MEET[lord]||'"Well. Here you are."',TEMPER[p.lord.temper]],lord);
    else if(SHARED[e.type]&&involvesMe)push(e.title||(lord?lord+' of '+p.name:p?p.name:''),SHARED[e.type],lord||v.rival);
  });
  return out;
}
const Scenes={MEET,TEMPER,EARL_OPEN,SHARED,fromEvents};
if(typeof module!=='undefined'&&module.exports)module.exports=Scenes;else root.Scenes=Scenes;
})(typeof window!=='undefined'?window:globalThis);
