# Ironcrown — brief for an outside design review

This is a self-contained brief for a reviewer (human or AI) who has not seen the rest of this
folder. It says what the game is, what it must feel like, what exists, what the first playtester
found, and what kind of suggestions are wanted. Read it top to bottom; the pointers at the end
lead to the full documents and the code.

## 1. What the game is

**Ironcrown** (working title) is a turn-based strategy game in the spirit of Cinemaware's
*Defender of the Crown* (1986), made by a one-person studio, 640K Games, for itch.io first and
Steam later. It is a single-player game, browser-first, plain HTML5 Canvas and JavaScript, no
engine. 800x600, a 256-colour VGA palette, mid-1990s PC look. Visuals are deliberately not the
subject of this review; the current art is placeholder.

The premise: the old king of England is dead. The player is one of four earls. Twelve years, one
season a turn, to take London and the crown. The map is England and Wales cut into eighteen
provinces. Every province has a lord. Every province pays gold each season.

**The core, decided by the owner:** the game is about **taking land and growing income**, like
Risk with an economy. The original's action mini-games (the joust, the swordfight, the catapult)
are gone. Every contest is resolved by one visible **points-and-odds** system: both sides' points
itemised, the odds as a percentage, one decision (a stance, or a wager), and an itemised result.
Nothing in the game needs reflexes.

## 2. What it must feel like (the pillars, in priority order)

1. **The map is the game.** Every season's real decision is on the map: which province, which
   road, how much to leave behind, what to build, how hard to tax.
2. **Income is the score.** The income line is always on screen. Land is worth different amounts,
   and holding land well pays more than holding a lot of it badly.
3. **Every contest readable.** Points itemised before and after, odds shown, one decision. A
   player who loses can see why.
4. **Small numbers, big consequences.** Armies of 10 to 30 men. Losing a province hurts.
5. **A crown in 40 minutes.** Twelve years, 48 seasons, under a minute a season.
6. **Cinematic but skippable.** Painted cut scenes when a lord kneels, defects, marries, returns.
   One press skips; the game remembers.

## 3. The rules as they stand

**Season turn.** In any order: recruit and build at any province with a castle; march one army
once (one road step); use one deed (two from six provinces); then end the season. The AI earls
then act, income arrives, the map updates.

**Calendar.** Spring: knights cheaper. Autumn: base income doubled. Winter: income halved, no
marching, and any stack of more than three men outside a castle loses a tenth to the cold.

**Income.** Each province has a base of 1 to 5 gold. Tax per province: low (x0.5, unrest falls),
fair (x1), harsh (x1.5, unrest rises; at 5 the province revolts). Works: a mill (+1, +2 in
autumn), a market charter (+2, one per three provinces). Upkeep: 1 gold per knight, per siege
engine, and per castle beyond the first. Losing the home castle halves income.

**Armies.** Soldier 1 gold, 1 point. Knight 8 gold (6 in spring), 3 points, one a season.
Siege engine 15 gold, required against any castle. Castle 20 gold: recruits, doubles defence,
holds land. Hills add 2 to defence, forest 1. Every province also has a local levy that grows
slowly and defends.

**Contests.** `odds = attack / (attack + defence)`, then stance: cautious (odds -10 points,
losses halved, a loss is a retreat), steady, bold (odds +10, losses doubled). A roll of at most
±15% decides it.

**Lords and loyalty.** The fourteen non-earl provinces are held by named minor lords with a
temperament: proud, greedy, fearful or loyal. March on one with enough superiority (1.5x for
fearful, 2x greedy, 3x proud, never for loyal) and they offer to kneel. Accept, and they become a
**vassal**: their land pays you at fair tax minus one, their own levy defends it, and they carry a
visible **loyalty** from 0 to 10. Loyalty rises with your renown, or with your income (greedy) or
army (fearful); it falls if your renown falls, if you march through their land, if a neighbour
revolts. At 8 they send levies with your marches. At 0 they defect to the strongest neighbouring
earl. Refuse or beat them and the lord is **dispossessed**: they flee to a rival's court and may
return to raise their old province if its unrest is 2 or more.

**Deeds.** Raid a neighbour (needs a knight; cunning against garrison; steals a quarter of their
treasury or loses the knight). Tournament (a sealed wager: stake plus a blind purse against a
rival's; points are renown + purse + knights at home). Marry into an independent lord's house
(renown 5, 15 gold, shared border; vassal at loyalty 7). Turn a rival's vassal (cunning against
loyalty). Pardon a dispossessed lord (vassal at loyalty 7). Ally with an earl (four seasons of
peace). Draw a court card (harvest, plague, outlaws, treachery).

**Victory.** Hold London with a castle for four seasons while having the highest income; or take
60% of all income (and at least 20 a season) for a year; or be the last earl standing. Lose your
last castle and you are out. After twelve years the highest income wins.

**The four earls.** Osric of Northumbria (far corner, starts with Cumbria as a vassal), Aldric of
Cornwall (far corner, starts with Devon), Berta of Norfolk and Gwyn of Chester (near corners, one
province). Each has Leadership, Stewardship and Cunning from 1 to 3 and a starting Renown. The AI
earls have fixed personalities: raider, builder, hoarder.

## 4. What exists

- `prototype/sim.js`: the whole rule set as one pure module, deterministic from a seed, no
  rendering. Runs in the browser and in Node.
- `prototype/campaign.html`: the playable page on top of it. Choose an earl, the England map, a
  side panel in three numbered steps (recruit and build, march, deeds), an attack box with troop
  count and odds, a homage offer box, cut scenes as text with placeholder portraits, an animated
  end-of-season playback that flashes each province where something happened, a help page.
- `prototype/scenes.js`: the cut-scene text.
- `prototype/balance.js`: a headless runner, `node balance.js 300`, AI against AI. Current
  result: win rates Osric 19%, Aldric 31%, Berta 35%, Gwyn 16%; 70% of games end by the crown
  around year ten. Balance is for the AI's shape only; nobody has tuned for a human yet.
- `08-parameters.md`: every number, with the arithmetic that checks they make a 12-year game.
- `09-lords.md`: the cast, with a line each.

## 5. What the first human playtest found

The owner played it twice. Nearly every note was about **not knowing what to do**, not about the
rules being wrong:

- Did not know how to buy soldiers or what they cost. Did not know what "(s)" on a button meant
  (a keyboard shortcut; now removed).
- Did not know who they were on the map, or what the colours meant.
- Did not know how to move troops to an adjacent province, or how to choose how many.
- After taking one province, did not know whether they could attack another (the answer is no,
  one march a season, and the game did not say so).
- Did not know when they could buy more soldiers or equipment.
- Buttons that could not be used gave no feedback.
- Could not tell when a season had ended.
- Found the side panel "super confusing".
- Wanted the end of a turn to be an event: flashing, animation, as the original had.
- Wanted the earls' faces on the choose screen.
- The panel jumped when buying repeatedly (a message area grew), and a tutorial overlay covered
  the player's own corner of the map.

Most of these have had a first fix (the panel is now three numbered steps; clicking your province
then a neighbour opens an attack box with a troop counter and the odds; a guided first turn blinks
the next thing to click; there is an end-of-season playback and a help page). But the pattern is
clear: the game's **onboarding and turn structure** are where the design is weakest, and a fresh
eye on them is worth more than more rules.

## 6. What the owner wants from a review

The goal is **playability**: a new player should sit down, understand the turn inside two
minutes without reading anything, and feel the pull of "one more season" by the end of year two.

Questions, in priority order:

1. **Turn structure.** Is "recruit, march, deed, end season" the right shape for a one-minute
   turn? Should the order be enforced (a wizard) or free (as now)? Is one march a season the
   right constraint, and how should the game teach it? Would the original's approach, a fixed
   sequence of screens each season, be better than a free panel?
2. **Onboarding.** What is the minimum a first-time player must be shown, in what order, and by
   what means (a guided first year, a herald who speaks, a shrinking hint bar, a tutorial map)?
   Assume no manual is read.
3. **The side panel.** Propose a better layout for the 280x576 panel at 800x600, or argue for
   moving actions onto the map itself (click a province, get a small menu there).
4. **Feedback.** How should the game show that an action happened, that it cannot happen, and
   that a season ended? The original used short animations and sound. What is the minimum set?
5. **The economy loop.** Is income-as-score legible enough? What one screen or ledger would make
   "my income grew this year" land emotionally?
6. **Vassals versus conquest.** Is the loyalty layer understandable to a new player, and is the
   homage choice a real decision? Should it be simpler?
7. **Contests.** Is the stance choice (cautious, steady, bold) worth its complexity, or should
   the attack box just show the odds and an Attack button?
8. **Deeds.** Seven deed types is a lot. Which would you cut or fold together for a first
   release, and why?
9. **Anything the rules get wrong** for a Risk-style land-and-income game: dominant strategies,
   dead ends, snowballing, turns where there is nothing to do.

Constraints a review should respect: single player, turn-based, no reflexes, no server, plain
Canvas, 800x600, under a minute a season, a full game in about 40 minutes. Do not propose
action mini-games; the owner has ruled them out. Visuals are for later; propose layout and
information design, not art.

Useful output shapes: a prioritised list of changes with the reasoning, a sketch (text or ASCII)
of a better panel or turn flow, a first-two-minutes script for a new player, and any rule
changes with the numbers they would move.

## 7. Where everything is

```
design/ironcrown/
  README.md                index
  01-vision.md             pillars, what made the original great, what never worked
  02-game-design.md        full rules
  03-technical-plan.md     stack, resolution, palette, save, balance runner
  04-platforms-and-monetisation.md
  05-roadmap.md
  06-open-questions.md     the thirteen decisions taken, and what is still open
  07-paper-prototype.md    table rules for the campaign turn
  08-parameters.md         every number, and the arithmetic
  09-lords.md              the cast
  10-review-brief.md       this file
  prototype/sim.js         the rules, runnable in Node
  prototype/scenes.js      cut-scene text
  prototype/campaign.html  the playable page (needs sim.js and scenes.js beside it)
  prototype/balance.js     node balance.js 300
```
