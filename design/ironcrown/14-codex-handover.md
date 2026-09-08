# Ironcrown — complete handover for Codex

**Read this file alone and you have everything.** It merges the design intent, the decisions, the
rules, the code map, the conventions, the playtest findings, the backlog, the visual design and
every art prompt. The separate files in `design/ironcrown/` remain the working documents and
should be kept in step; this one is the handover.

Owner: 640K Games (one person). Repository: `github.com/Batwings91/640k-games`, branch
`claude/retro-defender-game-design-d8yk69`, folder `design/ironcrown/`. The game will move to
its own repository once the owner names it (backlog item B3).

## How the work is split from here

- **Codex owns the build**: code, structure, tests, builds, the art pass, and giving the owner a
  playable link. Codex proposes, implements and reports in terms of what the player will notice.
- **Claude reviews and tests**: the owner brings Codex's changes to Claude for design review
  against this document, balance runs (`node balance.js 300`), scripted headless UI checks in
  Chromium, and a written verdict with specific fixes. Claude does not edit the code Codex owns
  unless the owner asks. To make review easy, each hand-back should say: what changed for the
  player, which backlog items it covers, the balance runner output, and how to run it.
- **The owner decides** feel, priorities, and anything listed under "Decisions". Everything
  else that fits the pillars, Codex decides and reports.

## Order of work

1. Playability (B1) on the current prototype, until the owner can play a year without confusion.
2. Repository, build and tests (B3), so every later step ships as a link.
3. The ledger (B2) and the save (B4).
4. The visual design (Part D): chrome and layout first on placeholder art, then the art pass
   (Part E) with the map and one portrait approved before the batch.
5. The rest of the backlog in order.

Each step ends with a hand-back to the owner and a review by Claude.

---

# PART A — Intent, decisions, roles, files, conventions, backlog

This is the second brief. Read `10-review-brief.md` first for the rules and the playtest notes;
this one adds what that brief left out: why the game exists, what it must feel like, who owns what,
where every file and asset is, the conventions the code must keep, how to run and test it, and
the backlog with acceptance criteria. Whoever builds from this should be able to take ownership of
the codebase from here without asking the owner anything that is already answered below.

### 1. Why this game exists, in the owner's terms

The owner played *Defender of the Crown* (Cinemaware, 1986; the DOS port a year later) as a
child and wants to **recreate that feeling** for themselves and for players like them, and sell
it. Not a remake, not a clone: a game that gives back what was great about it and drops what was
never good.

What was great, in the owner's memory and confirmed in design:
- **Taking over the lands of England, one at a time, and watching the income grow.** The map
  spreading in your colour and the gold coming in each turn. This is the heart. Everything else
  serves it.
- **A cast.** Named lords with faces, and cut scenes when something happens to them: a knight
  kneels, a lady is married, a castle falls. The painted, cinematic feel of a short, dramatic game.
- **A crown at the end.** A finite campaign with a coronation, winnable in one sitting.
- **The turn as an event.** The original flashed and animated as things happened at the end of a
  turn. The owner explicitly asked for that back.

What was never good, and is cut:
- **The joystick mini-games.** The jousting (opaque timing, felt random), the swordfight in the
  castle raid (a button-mash), and by extension the catapult. The owner: "I never liked the
  jousting or castle hand-to-hand fighting bits, let's drop that." They survive only as
  turn-based contests resolved by visible points and odds: the tournament is a sealed wager, the
  raid is a points check, the siege is a battle with an engine. **No reflexes anywhere in the
  game. This is a hard rule.**
- **A thin strategy layer.** The original had little reason to hold one province over another.
  This game gives every province a value, a terrain, a feature, and a lord.
- **Randomness deciding everything.** The roll is at most ±15% around odds the player saw first.

What must be improved beyond the original:
- **Playability first.** The owner's two playtests were almost entirely "I don't know what to do".
  A new player must understand the turn inside two minutes with nothing to read. This is the
  current priority above every feature.
- **Depth without size.** Small armies (10 to 30 men), 18 provinces, 12 years. Depth comes from
  the loyalty layer (vassals, defections, dispossessed lords) and the economy, not from scale.

The owner's own words on how to work: "we focus on gameplay for the moment and then can sort out
the visuals." Visuals are placeholder until the game plays well.

### 2. Decisions already taken (do not reopen without the owner)

1. Land and income are the core. Risk-style, turn-based, seasons.
2. No action mini-games. One points-and-odds contest system with one decision (stance or wager).
3. 800x600, 256-colour VGA palette, mid-90s PC look. Visuals later.
4. England and Wales, 18 real regions, London is the crown. Wales stays.
5. Every province has a lord with a temperament. Full loyalty layer: submission, vassals with a
   loyalty number, court deeds aimed at named lords, rivals turning vassals, dispossessed lords
   fleeing to enemy courts and returning.
6. Cut scenes: sparing, about 30 paintings (one per lord plus a dozen shared), two or three lines
   each, always skippable, the skip remembered.
7. The player chooses one of four earls; the other three are AI with fixed personalities.
8. Slower build, 12 years; the crown should usually fall in years nine to twelve.
9. Three wins: crown, treasury (60% of income for a year), last earl standing. Time limit: highest
   income wins.
10. Deeds: one a season, two from six provinces.
11. Winter is harsh: no marching, half income, armies outside walls lose men.
12. One sitting with autosave; no recap screens.
13. Online multiplayer later as a separate project; version one has no server. The simulation is
    deterministic and the save is the action log so that can be added.
14. Music: CC0 loops first, commissioned if it sells. Sound effects synthesised.
15. Name: Ironcrown is a working title.
16. Still open, for the owner after playing: the tournament mechanism (blind purse or plain points);
    everything visual.

### 3. Roles

- **The owner** (640K Games, one person) decides design, plays every build, and is the only
  source of "does it feel right".
- **Codex** takes ownership of building the game from the current prototype: code, structure,
  tests, builds. It should propose changes, make them, and report what changed and why.
- **Claude** (this session's author) planned the design, wrote the documents and the prototype,
  and will keep doing design planning, review, and testing: the headless balance runner, scripted
  UI checks, and reading Codex's changes against the design. Claude does not own the code from
  here.
- Anything that changes a decision in section 2 goes to the owner. Anything else that is within
  the pillars, Codex may decide and report.

### 4. Where everything is

Repository: `github.com/Batwings91/640k-games`, the studio's website repo (plain HTML and CSS,
GitHub Pages). All Ironcrown work is on branch **`claude/retro-defender-game-design-d8yk69`**
under `design/ironcrown/`. Nothing Ironcrown is on `main` yet. The plan (`03-technical-plan.md`)
is to move the game into its own repo `ironcrown/` beside this one when the prototype settles;
that move is in the backlog below, and Codex may do it once the owner names the repo.

```
design/ironcrown/
  README.md                        index and status
  01-vision.md                     pillars, what made the original great, what never worked
  02-game-design.md                the full rules (the source of truth for behaviour)
  03-technical-plan.md             stack, resolution, palette, save format, runner, wrapper
  04-platforms-and-monetisation.md itch.io first, Steam later, demo strategy, pricing hypothesis
  05-roadmap.md                    milestones
  06-open-questions.md             the decisions above and what is still open
  07-paper-prototype.md            table rules used to test the turn on paper
  08-parameters.md                 every number, the arithmetic behind it, balance runner results
  09-lords.md                      the cast: four earls, fourteen minor lords, temperaments, lines
  10-review-brief.md               rules summary, playtest findings, review questions
  11-build-brief.md                this file
  prototype/
    sim.js        the entire rule set, pure, deterministic, runs in browser and Node. ~380 lines.
    scenes.js     cut-scene text keyed by event type and lord name
    campaign.html the playable page: choose earl, map, panel, attack box, homage box, scenes,
                  end-of-season playback, help, guided first turn. Loads sim.js and scenes.js.
    balance.js    node balance.js [games] [seedStart]: AI-only campaigns, win rates, endings
    siege.html    the shelved catapult prototype (320x200, action mini-game). Reference only.
```

The site itself (`index.html`, `games/`, `assets/`, `css/`, `tools/`) is the studio shopfront;
`games/spore-wars.html` is the template a future `games/ironcrown.html` page copies.
`tools/update-play.js` pushes a game's `dist/` folder to an unlisted GitHub Pages URL for
playtesters; it expects the game repo at `../spore-wars` and needs a one-line change to point at
`../ironcrown`. `tools/render-hero.js` is the studio's palette-quantise-and-dither tool and is the
model for the game's art pipeline.

**Hosted build for the owner to play:** a single-file bundle (campaign.html with sim.js and
scenes.js inlined, wrappers stripped) is published as a private Claude artifact at
`https://claude.ai/code/artifact/70bcda95-66ae-4143-bcfb-30289be2ea8d`. Codex will need its own
way to give the owner a playable link: GitHub Pages from the game repo, or itch.io's private
upload, or the unlisted `play/` folder on this site via `update-play.js`.

### 5. Assets: what exists and what does not

There is **no final art, audio or font**. Everything visible is procedural placeholder:

- **Map**: a hand-traced coastline of England and Wales as (lon, lat) pairs in `sim.js`
  (`COAST`), province seats (`SEATS`), Voronoi cells clipped to the coast, adjacency from shared
  edges plus one hand-added road (Northumbria to Lancaster) and two removed sea "borders"
  (Powys/Gwynedd to Devon). The final game will paint this map; the polygons stay as the
  click regions.
- **Portraits**: four procedural 16x16 pixel faces for the earls in `campaign.html` (`face()`);
  minor lords get a framed box with initials. Final: about 18 painted portraits.
- **Scenes**: text only, in `scenes.js`. Final: about 30 paintings, listed in `02-game-design.md`
  under "Cut scenes" and `09-lords.md`.
- **Palette**: no master palette file yet. The rule is in `03-technical-plan.md`: 256 colours,
  each snapped to 6 bits per channel (the `vga()` function in `campaign.html` does the snap).
  The final game needs a master palette table and the quantise tool.
- **Font**: the browser's monospace at 14px bold and 12px. Final: a bitmap font in the palette.
- **Audio**: none in the campaign prototype. `siege.html` has a small Web Audio synth
  (`tone()`, `noise()`) that shows the intended approach for effects. Music: CC0 loops, to be
  chosen, with a `CREDITS.txt`.
- **Brand**: the 640K Games logo exports are in `assets/logo/` in the site repo; the master is a
  separate Logo repo. The game's title screen may use them; do not edit them.
- **Licensing rule** (from `04-platforms-and-monetisation.md`): every asset CC0 or owned, listed
  in `CREDITS.txt`, mirrored on the site page. Nothing from the original game: no names, art,
  music or text.

### 6. Technical conventions the code must keep

- **Plain HTML5 Canvas 2D and JavaScript. No engine, no framework, no npm dependencies at
  runtime.** The studio's other game ships as a single HTML file plus assets and this one should
  too. Build tooling in Node is fine (a `tools/build.js` that concatenates and copies).
- **`sim.js` stays pure.** No DOM, no rendering, no timers. Everything the rules do lives there so
  the balance runner and tests exercise the same code the page runs. The UI reads state and calls
  functions; it never mutates rules state except through `Sim` functions (the prototype's UI still
  pokes `p.tax` directly in one place; fix that).
- **Deterministic.** All randomness through `rnd(G)` from the seed in `G`. Same seed and same
  inputs give the same game. `?seed=1234` on the page fixes a map.
- **The action log is the save.** Not yet implemented. Every player action is appended to a log
  (`{turn, type, args}`); a save is `{seed, earl, log}`; loading replays the log through `Sim`.
  This is what makes autosave, undo, bug reports and a later online mode cheap.
- **Events, not polling.** `sim.js` pushes to `G.events`; the UI turns them into playback steps
  and scenes. New behaviour that the player should see must emit an event.
- **800x600 logical, scaled to fit, integer scale at 2x or more.** All coordinates in logical
  pixels. Colours through the VGA snap.
- **Data-driven numbers.** Costs, incomes, temperaments, lords and AI personalities are tables
  at the top of `sim.js`; the plan is to move them to JSON. Any number change is recorded in
  `08-parameters.md` with the reason.
- **Tests.** Node's built-in test runner, no dependencies. Unit tests for `sim.js`: income,
  contest odds, submission thresholds, loyalty changes, victory checks. The balance runner is
  the integration test: after any rules or AI change, `node balance.js 300` must still show all
  four earls between roughly 15% and 40% wins, most games ending by the crown, average end in
  years nine to twelve. UI checks are done with headless Chromium through Playwright scripts that
  click through a turn and assert phases and no console errors (Claude has such scripts and can
  run them on request; Codex should add its own to the repo).
- **Style.** Small files, plain functions, comments that say why. Keep the prototype's habit of
  one-line reasons in the docs when a number moves.

### 7. How to run

```
## play
open design/ironcrown/prototype/campaign.html          # needs sim.js and scenes.js beside it
## a fixed map
open 'design/ironcrown/prototype/campaign.html?seed=1234'
## balance
cd design/ironcrown/prototype && node balance.js 300
## trace one AI game
node -e "const S=require('./sim.js');const G=S.createGame(7,-1);for(let t=0;t<48&&!G.over;t++)S.endSeason(G);console.log(G.over,G.log.slice(-10))"
```

Keys in the page: Enter ends the season, H help, S/K/C buy soldier/knight/castle, M march,
Escape skips scenes or playback.

### 8. Current state of play, honestly

- The rules in `02-game-design.md` are all implemented in `sim.js` except: works beyond mill and
  market (roads), archers, the outlaws as a proper court deed, the random court deck being more
  than four cards, and difficulty settings.
- The AI is simple and readable (`aiTurn` in `sim.js`): tax, build, recruit, one march at the best
  value target, a deed by personality, and from year eight it stages an engine and walks toward
  London. It is good enough to give a game shape, not good enough to be a satisfying opponent.
- Balance (AI against AI, 300 games): Osric 19%, Aldric 31%, Berta 35%, Gwyn 16%; 70% of games
  end by the crown, average end year 10.6. Nothing is tuned for a human.
- The UI has had two rounds of fixes from the owner's playtests and is still the weakest part.
  Its current shape: side panel in three numbered steps, click-your-province-then-a-neighbour
  attacks with a troop counter and odds, homage offers, a guided first turn that blinks the next
  thing to click, an end-of-season playback that flashes provinces, and a help page.
- Known rough edges: the panel is dense; the tournament purse is unexplained in play; the log is
  three lines; the treasury win is invisible until it happens; there is no ledger screen showing
  where the income comes from; no save; no sound.

### 9. Backlog, in order, with acceptance criteria

**B1. Playability pass (top priority).** A stranger sits down, gets no explanation, and by the
end of year one has bought soldiers, taken a province, and ended a season without confusion.
Measured by watching the owner and one other person play. Deliverables: whatever the review
(`10-review-brief.md`, questions 1 to 4) recommends, implemented. Likely: an enforced or clearly
signposted turn order, actions on the map itself, one obvious "what now" at all times, feedback on
every click, and a season-end that reads as an event.

**B2. The ledger.** One screen or panel that shows this season's income line by line (each
province, works, upkeep, stewardship) and a year-on-year bar. Acceptance: a player can say why
their income changed. This is pillar two made visible.

**B3. Game repo and build.** Move the prototype into its own repo with `src/`, `tools/build.js`
producing `dist/index.html` plus assets, `npm test` running the sim tests and a short balance
run, and the site's `update-play.js` pointed at it. Acceptance: one command builds, one command
tests, the owner gets a playable link.

**B4. Save as action log.** Autosave every season to localStorage, export/import as a text code,
"continue" on the title screen. Acceptance: reload mid-game and continue; the replayed state is
identical (a test compares state after replay to live state).

**B5. Scenes with art hooks.** Replace the initials box with a slot that takes a painting by
lord name, falling back to the placeholder. Portraits and scenes are data. Acceptance: dropping a
PNG in the right folder shows it.

**B6. AI as an opponent.** Threat awareness (garrison the border facing the strongest rival),
purposeful deed use, and use of the loyalty layer against the player. Balance bands kept.

**B7. Sound.** Synthesised effects for buy, march, battle won and lost, homage, season end,
coronation; a music slot with CC0 loops. Acceptance: mute works and is remembered.

**B8. Difficulty and settings.** Three named difficulties changing AI income, aggression and roll
width; scenes on/off; sound; text size.

**B9. Title, results and score.** Title screen with the brand, results with the seed, a local
high-score table per earl.

**B10. itch.io build and page.** HTML5 upload, a demo/full flag in the build, `CREDITS.txt`, and
`games/ironcrown.html` on the studio site.

Later, from `05-roadmap.md`: art and music pass, playtest via unlisted link, Steam wrapper,
post-launch online.

### 10. Working agreement

- Small commits with messages that say what changed for the player.
- Any rules or number change: `sim.js`, then `08-parameters.md`, then run the balance runner and
  paste its output in the commit or PR.
- Keep `02-game-design.md` true. If the code diverges from it on purpose, change the document in
  the same commit.
- Report in terms the owner uses: what a player will notice, not what a function does.
- Before asking the owner a question, check sections 2 and 6 here and `06-open-questions.md`.
  Ask the owner about feel, priorities and anything in section 2. Decide the rest.

---

# PART B — The rules, the playtest findings and the review questions

This is a self-contained brief for a reviewer (human or AI) who has not seen the rest of this
folder. It says what the game is, what it must feel like, what exists, what the first playtester
found, and what kind of suggestions are wanted. Read it top to bottom; the pointers at the end
lead to the full documents and the code.

### 1. What the game is

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

### 2. What it must feel like (the pillars, in priority order)

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

### 3. The rules as they stand

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

### 5. What the first human playtest found

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

### 6. What the owner wants from a review

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


---

# PART C — The cast

Placeholder names and temperaments for the eighteen lords, so the loyalty layer has a cast to
test with. All invented; none is a historical figure or a character from the original game.
Replace freely.

### The four earls (playable)

| Earl | Seat | Leadership | Stewardship | Cunning | Renown | AI personality | Line |
|---|---|---|---|---|---|---|---|
| Osric | Northumbria (+ Cumbria) | 2 | 2 | 1 | 2 | — | The old border earl. "The north does not ask. It endures." |
| Aldric | Cornwall (+ Devon) | 3 | 1 | 2 | 1 | raider | Tin-rich, land-poor, quick to the sword. "Gold in the ground, and a crown to spend it on." |
| Berta | Norfolk | 1 | 3 | 1 | 3 | builder | Wool and ports and ledgers. "A kingdom is a sum. I can add." |
| Gwyn | Chester | 1 | 2 | 3 | 2 | hoarder | The marcher lord, half Welsh, all schemes. "Every wall has a gate, and every gate a price." |

### The fourteen minor lords

| Province | Lord | House | Temperament | Levy | Note for the scene |
|---|---|---|---|---|---|
| York | Hild of Ouse | Ouse | proud | 5 | Sits in the richest hall in the north and knows it |
| Lancaster | Wulfstan Greycloak | Greycloak | fearful | 3 | Forest lord, sends archers, wants to be left alone |
| Lincoln | Edwin the Miller | Fenmill | greedy | 4 | Counts sacks; submits for a market charter |
| Nottingham | Ralf of the Greenwood | Greenwood | loyal | 3 | The outlaws answer to him, not to any earl |
| Gwynedd | Madoc ap Rhun | Rhun | proud | 4 | Mountain lord; submits to no one under 3x |
| Powys | Elen of the Marches | Marches | loyal | 3 | Keeps the shrine; marriage is the only road |
| Warwick | Godric Crossways | Crossways | greedy | 5 | Holds the crossroads of England and sells passage |
| Gloucester | Abbess Mildryth | Severn | loyal | 4 | Church land; will not be taken by force without a renown cost |
| Wessex | Cynric the Elder | Wessex | proud | 5 | Claims the old kingship; a rival for the crown in spirit |
| London | The Lord Mayor | The City | greedy | 10, +1 a season | Walled, garrisoned, sells to the strongest |
| Kent | Leofric Saltmarsh | Saltmarsh | fearful | 4 | Port lord watching the sea |
| Essex | Aethelmaer of the Fen | Fen | fearful | 3 | Marsh lord, poor and cautious |
| Cumbria | Ketil Longfell | Longfell | loyal | 3 | Osric's vassal from the start |
| Devon | Rowena of Exe | Exe | greedy | 4 | Aldric's vassal from the start |

The two starting vassals (Cumbria, Devon) begin at loyalty 7. London's Lord Mayor never submits;
the city is always a siege.

### Shared scenes (about a dozen)

First meeting, submission, conquest, defection, marriage, pardon, tournament, siege, coronation,
defeat, the herald's news, winter. Each is one painting with variants only in the portrait and
the two or three lines of text.

---

# PART D — Visual design

The plan for the look, from the five reference images the owner supplied (in `references/`).
To be implemented after Codex hands back the playable build. The rules of the game do not change
here; this is the rendering layer, the chrome, the scenes and the assets.

### 1. What the references say

| Ref | What it is | What to take from it |
|---|---|---|
| 1 `ref-1-map-screen-modern.jpg` | A high-resolution map screen in the original's style: portrait and stat pips top-left, a resource row, three parchment-framed buttons, a date top-right, an hourglass end-turn, England painted over a deep teal sea with each province tinted and rimmed in a glowing colour, castles and a mounted rider as sprites, smoke over a contested forest | The whole layout of the map screen: **no side panel**, the chrome floats over the sea. Stat pips instead of numbers. One portrait always on screen. The date as the turn indicator. The hourglass as "end season". Glowing province rims in the owner's colour. Castles as sprites on the land. |
| 2 `ref-2-castle-courtyard.jpg` | The original's castle raid interior: grey stone, wooden balconies, torchlight, two figures | Interior scenes: cold stone, warm torches, high contrast. We use this mood for the raid result and the pardon scene, never as an action game. |
| 3 `ref-3-siege-castle.jpg` | The original's siege: a grey castle on a green hill under a cloudy sky, soldiers in blue, a catapult | Exterior battle scenes: a painting with a few sprites in the earl's colour. The siege result screen is this view with the outcome told in text. |
| 4 `ref-4-parchment-scene.png` | A painted scene with a character at right and a parchment scroll of narrative text at left, over a campfire | **The cut-scene format.** Painting full-screen, parchment text block, one figure. Two or three lines of story. This is exactly `scenes.js` with art. |
| 5 `ref-5-portrait-cards.png` | Eight portraits on parchment cards, names in red, on a teal ground | **The earl-select screen and the lord gallery.** Parchment cards with a painted bust and a red name. |

A legal note that governs all of it: these images are references for mood and layout only. Ref 1
appears to be from a modern high-resolution version of the original; refs 2 to 5 are the 1986
game. Nothing is copied: no art, no names, no text. Our map is drawn from our own coastline
data, our portraits are our own cast, our chrome is our own drawing. "Looks like it belongs to
the same tradition" is the target; "could be mistaken for it" is the line not to cross.

### 2. Art direction in one paragraph

A painted, late-medieval England seen from above the North Sea at dusk, in the 256-colour manner
of a 1994 VGA game: rich teal water with dithered swell, land in warm greens and umbers with
mountains and forests painted in, each province washed in its holder's colour and rimmed with a
bright line. Over it, a thin layer of gilt-and-ink chrome: dark panels with gold filigree
corners, parchment for anything that is read. Faces are painted busts, three-quarter view, on
parchment. Interiors are cold stone and torchlight. Everything is dithered, nothing is smooth.

### 3. Palette

The rule stands: 256 colours, each 6 bits per channel. The master palette is built from these
families, roughly 32 entries each, with the remainder for portraits:

| Family | Role | Anchor colours (before the VGA snap) |
|---|---|---|
| Sea | the ground of the map screen | #0c3c4c, #14606c, #1c8080, #2ca090 (teal, four steps) |
| Land | painted terrain | #4c6c2c green, #7c8c3c olive, #8c6c3c umber, #a89058 sand, #5c5c64 rock |
| Rims | province owner tints, applied as a translucent wash plus a bright rim | player blue #3868f0, red #e04040, green #40c060, gold #f0c040, purple #a050e0 for a fifth if ever needed; neutral: no wash, a pale sand rim #d8c898 |
| Chrome | panels and frames | ink #101018, panel #1c1820, gold #d8a040, gold light #f0d080, gold dark #8c6020 |
| Parchment | everything read | #f0e0b8, #e0c898, #c8a870, text ink #302018, name red #b02020 |
| Stone | interiors | #303038, #505058, #787880, #a0a0a8 |
| Fire | torches, smoke, the flash of an event | #f8c040, #f88020, #e04010, smoke #605868 |
| Skin and hair | portraits | six skin steps, six hair steps |

The province wash is a 50% ordered-dither of the owner colour over the terrain, so the terrain
stays visible; the rim is a 2-pixel solid line in the light tint. That is how ref 1 reads as both
a map and a painting.

### 4. Typography

Two bitmap faces drawn into the palette:
- **Display**: a serif with slight calligraphic weight, 16 px cap height, for names, the date,
  the season, scene titles, button labels. Modelled on the feel of ref 1's "Geoffrey Longsword",
  not its letterforms.
- **Text**: a rounded serif at 12 px for parchment narrative and panel lines, as in ref 4.
Numbers use the same faces. Until the bitmap fonts exist, a Google-hosted serif is a stand-in
in the browser, but the shipped game embeds its own bitmap font.

### 5. Screens at 800x600

#### 5.1 Earl select (ref 5)

Teal dithered ground. A title cartouche in gold at the top. Four parchment cards in a row,
150x250 each, with a painted bust (120x140), the name in red, the seat in ink, and the four stat
pips (Leadership, Stewardship, Cunning, Renown) as filled and empty dots. Hover lifts the card by
4 px and brightens the rim. Below, one parchment line: "Choose your earl." A second row later
holds the fourteen minor lords as a gallery the player can browse.

#### 5.2 The map screen (ref 1), the whole game

**No side panel.** The map fills the screen; England is drawn larger than now (about 560 px
tall, 480 wide, centred right) and the chrome floats over the sea to the left and along the top.

Layout, in logical pixels:
- **Top-left, 300x150**: the earl's portrait (96x112) in a gilt frame, name in display type,
  four stat rows as pips, renown as a number. Below it, the **resource row**: treasury (coin
  icon and number, with "+income" beneath in green), the selected province's men and knights
  (helm and horse icons), engines (a small catapult icon). Everything in gold on dark.
- **Below that, the action row**: three parchment-framed buttons, 140x56: **Recruit**, **March**,
  **Deeds**. They act on the selected province. Recruit opens a small parchment tray beneath with
  the six purchases and their prices; March highlights neighbours and shows the stance; Deeds
  opens a tray of the seven deeds with the rival, stake and purse. The tray is the only thing
  that ever expands, and it expands downward over sea, never over land.
- **Top-right**: the date as "Spring, Year 3" in display type on a gold cartouche, and beneath it
  the **hourglass**: the end-season button, 64x64, which glows when the season's march is done.
- **Bottom-right**: a small gear for settings and a "?" for the help scroll.
- **Bottom-left**: the herald line: one line of parchment that carries the hint, the guide and
  every flash message. Fixed height, never moves anything.

On the land:
- Each province: the wash and rim; a **castle sprite** (32x28) where there is a castle; a
  **banner** in the owner's colour at the seat; the province name in small display type on a
  parchment tag; the men as a **rider sprite** (24x24) with a count when an army is there; a
  **levy** shown as a small tent cluster. Vassal land carries a thin second rim inside the first
  in the vassal-hatch pattern. A province with unrest 3 or more smokes, as ref 1's forest does.
- Selection: the province rim pulses white. March targets: neighbours' rims pulse gold.
- Roads are not drawn as lines; adjacency is shown by the pulsing rims when it matters.

#### 5.3 Boxes over the map

All dialogs are **parchment scrolls** unrolled over the sea side of the screen, 480 px wide:
the attack box (count, points, odds bar in gold on ink, stance, Attack and Cancel), the homage
offer (with the lord's portrait), and the season summary. They never cover the selected province
or its neighbours; the box picks its side by where the selection is.

#### 5.4 Cut scenes (ref 4)

Full-screen painting, 800x600, with the parchment text block (360x300) on the side the painting
leaves free, and the figure on the other. Text in the rounded serif, red title, two or three
lines. A gold "continue" glyph blinks bottom-right; the whole screen is a button. Skip-all lives
in the gear. Scene paintings and figures are separate layers so one painting serves several lords.

#### 5.5 Contest results (refs 2 and 3)

No action. When a battle resolves, a **result screen** shows for one click: the siege painting
for a castle, the field painting for open ground, the courtyard painting for a raid, the lists for
a tournament. A few sprites in the two colours, a parchment strip with the itemised result
("Your 24 against their 15. Bold. Won. Lost 6 men."). This is where ref 3's castle and ref 2's
courtyard live.

#### 5.6 The end of a season

The hourglass turns. The map dims slightly; each event flashes its province rim white three
times while a parchment caption appears at the herald line; battles show their result screen
if they involve the player; then the date cartouche flips to the new season with a two-frame
gold flash and a short chord. Then the player's cut scenes. Then the map brightens and the
herald says what to do.

#### 5.7 Ledger, title, results

- **Ledger**: a parchment ledger page, two columns, every province's gold this season, works,
  upkeep, the total, and a bar for each of the last four years. Opened from the coin icon.
- **Title**: the crown over a dark map of England, the 640K Games mark, "Continue" and "New".
- **Results**: the coronation or defeat painting, the score on parchment, the seed.

### 6. Motion and sound

Nothing needs reflexes. Feedback motion: rim pulses, the hourglass turn, the three-flash
event, the card lift, the parchment unroll (four frames), the season flip. Ambient motion,
chosen by the owner: the sea shimmers (a two-frame dither cycle on the swell), cloud shadows
drift across the land (two sprites on a slow loop), seat banners wave (three frames), the rider
trots along the road when an army marches (half a second, which doubles as feedback), smoke
curls over unrest, torches flicker in interior scenes. Ambient motion is quiet enough to ignore
and never the only signal of anything. Sound: a coin for
purchases, hooves for a march, a clash for battle, a chord for the season, a fanfare for the
crown, all synthesised as the technical plan says, with a music slot for CC0 loops.

### 7. Asset list

| Asset | Count | Size | Notes |
|---|---|---|---|
| Map painting | 1 | 800x600 | Sea, land, terrain. Province polygons stay as click regions and wash masks |
| Province wash masks | 18 | from polygons | Generated from `sim.js` polygons, not drawn |
| Castle sprite | 1, 2 states | 32x28 | Plain and with a banner |
| Rider sprite | 4 colours | 24x24 | Army marker |
| Tent cluster | 1 | 24x16 | Levy marker |
| Smoke | 4 frames | 24x32 | Unrest |
| Banner | 4 colours | 12x20 | At the seat |
| Chrome: frames, cartouche, buttons, tray, hourglass, gear | 1 set | various | Gold on dark, drawn once, nine-sliced |
| Parchment: card, scroll, tag, herald strip | 1 set | various | Nine-sliced |
| Earl portraits | 4 | 120x140 | Painted busts on parchment |
| Minor lord portraits | 14 | 96x112 | Same style, smaller |
| Scene paintings | 12 | 800x600 | Hall, courtyard, siege, field, lists, chapel, road, forest, winter, London gate, coronation, ruin |
| Scene figures | 18 | 200x400 | One per lord, kneeling or standing, layered on paintings |
| Bitmap fonts | 2 | 16 px display, 12 px text | In the palette |
| Icons | 8 | 16x16 | Coin, helm, horse, catapult, mill, market, crown, loyalty |

About 40 paintings and portraits. The owner decides how they are made: commissioned, made by the
owner, or generated with a tool and then hand-corrected. Whatever the source, every file passes
through the quantise-and-dither tool to the master palette, and the licence is recorded in
`CREDITS.txt`.

### 8. Pipeline

1. `tools/palette.js` builds the master palette from the anchor families in section 3 and
   writes `palette.json` and a swatch PNG for review.
2. `tools/quantise.js` takes any PNG, quantises to the master palette with ordered dither, and
   writes it to `assets/`. The site's `render-hero.js` is the starting point.
3. The map painting is made at 800x600 over a guide rendered from the `sim.js` polygons, so the
   painted coast matches the click regions exactly.
4. Portraits are painted at 240x280 and quantised down.
5. Fonts are drawn as PNG strips and packed by a small script into a glyph table.

### 9. Implementation plan, for when Codex hands back

The rendering layer is rewritten; `sim.js`, `scenes.js` and the balance runner are untouched.

1. **Palette and quantise tools**, the swatch approved by the owner.
2. **Chrome and layout**: the map screen rebuilt as in 5.2 with the current placeholder map and
   procedural sprites, so the layout is playable before any painting exists. This is the biggest
   change and the one to test first.
3. **Bitmap fonts.**
4. **Map painting** over the polygon guide; washes and rims; castle, rider, tent, banner, smoke.
5. **Parchment boxes** replacing the current dialogs; the herald line.
6. **Earl select** as cards; portraits as they arrive, placeholders until then.
7. **Cut scenes** with the painting and figure layers; the twelve paintings as they arrive.
8. **Contest result screens.**
9. **Season-end sequence** with the hourglass and the flashes; sound.
10. **Ledger, title, results.**

Each step is playable at the end of it. The owner sees step 2 before anything is painted.

### 10. Decisions taken (September 2026)

- **Art source**: AI-generated, then hand-corrected; the generation is handed to Codex so the
  art pass is owned there. The prompt sheet is `13-art-prompts.md`. The model's commercial-use
  terms must be verified and recorded in `CREDITS.txt`.
- **Map screen**: floating chrome over the sea, no side panel, as in reference 1.
- **Motion**: feedback motion plus ambient life: sea swell and cloud shadows, banners waving,
  riders trotting along the road on a march, smoke over unrest and torch flicker in interiors.
  Section 6 is extended accordingly; ambient motion is subtle and never carries information.
- **Portraits**: painted busts on parchment (reference 5). The player's earl sits top-left for
  the whole game; the selected lord's portrait appears in dialogs.
- **Name**: Ironcrown stays until the title screen exists.
- Still to approve: the palette swatch, the map painting, and the first earl portrait, before
  the batch is generated.

---

# PART E — Art generation sheet, every prompt

Decided by the owner: the paintings and portraits are **AI-generated, then hand-corrected**, and
the generation is handed to Codex so the whole art pass can be owned there. This sheet is what
Codex runs from: a style preamble to prefix every prompt, one prompt per asset with its size and
file name, and the post-processing every file goes through. Prompts are tool-neutral; adapt the
syntax to whatever image model is used, and **verify that model's terms allow commercial use
before generating anything that ships**. Record the model and its terms in `CREDITS.txt`.

### 0. Rules for every asset

- Generate at 2x the target size or larger, then downscale and quantise with the tool
  (`tools/quantise.js`, ordered dither to the master palette). The VGA look comes from the
  tool, not the prompt; do not ask the model for "pixel art".
- Nothing from the original game or its remasters: no character names, no copying of its
  compositions, no "in the style of Defender of the Crown" in a prompt. The style words below
  are enough.
- Every file is named as listed, saved under `assets/src/` (raw) and `assets/` (quantised),
  and listed in `CREDITS.txt` with the model and date.
- The owner approves each asset. Hand-correct before quantising: fix hands, faces, straight
  lines, anachronisms, text in the image (there must be none).

### 1. Style preamble (prefix every prompt)

> Late-medieval England, twelfth century. A painted illustration in the manner of 1990s
> computer-game box art: gouache and airbrush, rich saturated colour, strong directional light,
> clean edges, slightly heroic proportions, no photorealism, no text, no lettering, no borders,
> no watermarks. Palette leaning to teal water, warm green and umber land, gilt and dark wood,
> parchment and torchlight.

Negative, where the tool takes one: text, letters, watermark, signature, frame, border, modern
clothing, photograph, 3D render, anime, blurry, extra fingers, extra limbs.

### 2. The map

**`map-england.png`, 800x600 (generate 1600x1200).**

> Aerial painted map of England and Wales seen from high above the North Sea at dusk, the
> coastline exactly as in the attached guide image, the sea a deep teal with lighter swell
> near the shore, the land a patchwork of green lowland, dark forest, brown hills and grey
> mountains, small painted castles are NOT included, no borders drawn, no labels, atmospheric,
> a few clouds at the far edges.

Attach the guide render of the province polygons (`tools/mapguide.js` draws the coast and cells
from `sim.js`) and ask for the coastline to match it. Province washes, rims, castles and labels
are drawn by the game over this painting.

### 3. Earl portraits (4)

**`portrait-earl-<name>.png`, 240x280 (generate 960x1120), bust, three-quarter view, plain
dark background so the parchment card can be composited.** Names are placeholders from
`09-lords.md`.

- **Osric, Earl of Northumbria**: a man of sixty, grey beard cut square, weathered face, calm
  eyes, a dark blue cloak with a plain iron brooch, a fur collar, snow-light from the left.
- **Aldric, Earl of Cornwall**: a man of thirty-five, red hair, a scar through the left
  eyebrow, a short beard, a red surcoat over mail, sun-light, a hard half-smile.
- **Berta, Countess of Norfolk**: a woman of forty, fair hair under a white veil and a thin gold
  circlet, a green gown with wool trim, shrewd and amused, a ledger just visible at the edge.
- **Gwyn, Earl of Chester**: a man of forty-five, black hair, a dark hood pushed back, a gold
  chain, narrow eyes, a slight smile, the Welsh hills faint behind.

### 4. Minor lord portraits (14)

**`portrait-lord-<province>.png`, 192x224 (generate 768x896), same framing as the earls.**

| Province | Prompt |
|---|---|
| Cumbria | Ketil Longfell: a fell shepherd-lord, sixty, wind-burned, a grey plait, a sheepskin over leather, loyal and tired. |
| York | Hild of Ouse: a merchant lady of fifty, rings on every finger, a fur-lined red gown, calculating. |
| Lancaster | Wulfstan Greycloak: a forester of forty, a grey cloak and hood, a longbow over the shoulder, wary. |
| Lincoln | Edwin the Miller: a proud burgher of fifty-five, broad, flour-pale hands, a chain of office, chin up. |
| Nottingham | Ralf of the Greenwood: an outlaw-lord of thirty, lean, green and brown, a sword at his hip, a dangerous grin. |
| Gwynedd | Madoc ap Rhun: a mountain prince of forty, dark, a torc at the throat, snow behind, unbending. |
| Powys | Elen of the Marches: an abbess-like lady of sixty, a white wimple, a shrine's candles behind, serene. |
| Warwick | Godric Crossways: a toll-lord of forty-five, fat, a velvet cap, coins on the table, sly. |
| Gloucester | Abbess Mildryth: a nun of fifty, black habit, a silver cross, stern kindness. |
| Wessex | Cynric the Elder: an old king's heir of seventy, white hair, a faded purple cloak, a hawk's stare. |
| London | The Lord Mayor: a florid man of fifty in scarlet and gold chain, a city wall behind, unimpressed. |
| Kent | Leofric Saltmarsh: a harbour lord of forty, salt-stained, a sailor's coat, nervous eyes. |
| Essex | Aethelmaer of the Fen: a marsh lord of fifty, thin, reeds and mist behind, a suspicious frown. |
| Devon | Rowena of Exe: a lady of thirty-five, auburn hair, a green riding cloak, a tin-mine token, appraising. |

### 5. Scene paintings (12)

**`scene-<name>.png`, 800x600 (generate 1600x1200).** Each is a background only; the figure is a
separate layer. Leave the left or right third uncluttered for the parchment text block, as noted.

| File | Prompt | Clear side |
|---|---|---|
| `scene-hall` | A stone great hall lit by a long fire, banners hanging, a dais with an empty carved chair, rushes on the floor. | left |
| `scene-courtyard` | A castle courtyard at night, grey stone walls, a wooden gallery above, two torches, a wet flagstone floor. | left |
| `scene-siege` | A grey castle on a green hill under a moving sky, a wooden siege engine in the foreground, tents and banners, no soldiers. | right |
| `scene-field` | An open English field at morning, hedgerows, a low hill, mist lifting, no figures. | right |
| `scene-lists` | A tournament ground: a wooden tilt barrier, stands with cloth of many colours, pennants, empty. | left |
| `scene-chapel` | A small stone chapel interior, candles, a painted saint, a shaft of coloured light. | right |
| `scene-road` | A muddy road through winter woods, a lone rider's tracks, a grey sky. | left |
| `scene-forest` | Deep greenwood at dusk, a campfire in a clearing, oaks, no figures. | left |
| `scene-winter` | A camp in snow outside castle walls at night, dying fires, tents sagging under snow. | right |
| `scene-london` | The gate of a walled city on a river at dawn, the gate half open, guards on the wall, a crowd's heads below. | left |
| `scene-coronation` | A cathedral nave full of light, an altar, a crown on a cushion, no figures. | right |
| `scene-ruin` | A burned hall, black beams against a pale sky, crows, a broken banner. | left |

### 6. Figures (18)

**`figure-<name>-<pose>.png`, 400x800 (generate 800x1600), full length, transparent
background, lit to match a torch from the front-left.** Two poses each for the four earls
(standing, kneeling) and one for each minor lord (standing), matching the portrait
descriptions above. Prompt: the portrait prompt plus "full length, standing at three-quarter,
hands visible, boots, on a transparent background" or "kneeling on one knee, head bowed".

### 7. Sprites and chrome

These are drawn, not generated: the generator is poor at 24-pixel sprites and gilt corners.
Codex draws them in the palette directly (a castle 32x28 in two states, a rider 24x24 in four
colours, a tent cluster 24x16, smoke in four frames 24x32, banners 12x20 in four colours,
three frames each for waving, two cloud sprites 120x40, the hourglass in eight frames 64x64,
the gilt frame and cartouche corners, the parchment nine-slice, the eight 16x16 icons). If a
generator is used for reference, generate one "gilt filigree corner ornament on dark, gold leaf"
and one "aged parchment texture" as texture sources only.

### 8. Fonts

Not generated. Codex draws two bitmap fonts in the palette: a 16 px display serif and a 12 px
text serif, ASCII plus the accented letters in the lords' names. A free bitmap-font tool or a
converted open-licence serif is acceptable if its licence permits embedding; record it.

### 9. Post-processing, in order

1. Hand-correct in any editor: faces, hands, lines, anachronisms, stray text.
2. Downscale to target with a sharp filter.
3. `node tools/quantise.js in.png out.png` to the master palette with ordered dither.
4. For figures, keep the alpha as a 1-bit mask (dithered edges look wrong; use a clean cut).
5. View at 1x in the game before approving; the dither reads differently at 2x.

### 10. Order of generation

The map first (one asset, the biggest effect), then the four earl portraits, then the six
scene paintings the loyalty layer needs most (hall, courtyard, siege, field, london, ruin),
then the minor lords, then the rest. The owner approves the map and the first portrait before
the batch runs.

---

# PART F — Parameters (the numbers) and the balance state

Every number in the game in one place, followed by the arithmetic that checks they make a game
of the intended shape: 12 years, 30 to 45 minutes, small armies, income as the score. These are
the prototype's values; the headless balance runner will move them, this file records why they
start where they do.

### Calendar

| Parameter | Value | Why |
|---|---|---|
| Seasons per year | 4 | Spring, Summer, Autumn, Winter |
| Campaign length | 12 years, 48 seasons | About 40 minutes at under a minute a season |
| Spring | knights cost 6 instead of 8 | A recruiting season |
| Autumn | base income ×2 | The harvest is the year's plan |
| Winter | base income ×0.5, no marching, field attrition | Any stack over 3 men in a province with no castle loses 10% (min 1) |

### Map (England and Wales, 18 provinces)

| Province | Terrain | Feature | Base | Notes |
|---|---|---|---|---|
| Northumbria | hills | quarry | 2 | Osric's home (far corner, starts with Cumbria too) |
| Cumbria | hills | — | 1 | |
| York | lowland | market | 3 | Richest of the north |
| Lancaster | forest | — | 2 | Archers |
| Lincoln | lowland | mill | 3 | |
| Chester | lowland | port | 2 | Gwyn's home (near corner) |
| Nottingham | forest | — | 2 | Archers; the outlaws' forest |
| Gwynedd | hills | — | 1 | |
| Powys | hills | shrine | 1 | Renown while held |
| Norfolk | lowland | port | 3 | Berta's home (near corner) |
| Warwick | lowland | market | 3 | The crossroads of the map |
| Gloucester | lowland | mill | 3 | |
| Wessex | lowland | shrine | 3 | |
| Cornwall | hills | quarry | 1 | Aldric's home (far corner, starts with Devon too) |
| Devon | forest | — | 2 | |
| London | lowland | crown | 5 | Walled and garrisoned by the city (10 men), needs an engine |
| Kent | coast | port | 3 | |
| Essex | marsh | — | 2 | |

Total base income on the map: 42 a season, 84 in autumn. Terrain: hills +2 defence, forest +1
defence and archers, marsh and hills cost a full season to enter without a road. The Bristol
Channel is not a crossing.

Neutral levies: 2 to 5 men at the start, +1 each winter up to 8. London's city levy grows by 1
every season up to 16, so the crown gets harder the longer it waits.

### Income

| Parameter | Value |
|---|---|
| Tax: low / fair / harsh | ×0.5 / ×1 / ×1.5 of base, floored |
| Unrest | +1 a season under harsh tax; +1 if no garrison and no castle; −1 under low tax; revolt at 5 |
| Militia | +1 man a season, up to 3, in land taxed fair or low with unrest under 3 (not winter) |
| Market | +2 a season; charter costs 12, one per three provinces held |
| Mill | +1 a season, +2 in autumn; costs 5 |
| Port | +1 a season |
| Shrine | +1 renown a year while held |
| Upkeep | 1 per knight, 1 per engine, 1 per castle beyond the first |
| Home castle lost | income halved until retaken |
| Stewardship | +1 a season per 4 provinces held, per point |
| Starting treasury | 25 |

### Armies

| Unit | Cost | Points | Notes |
|---|---|---|---|
| Soldier | 1 | 1 | Free to keep |
| Archer | 2 | 1 attacking, 2 defending | Forest provinces only |
| Knight | 8 (6 in spring), upkeep 1 | 3 | One recruited a season; needed to raid |
| Siege engine | 15, upkeep 1 | +25% attack each beyond the first | Needed against any castle |
| Castle | 20 (12 with a quarry) | defence ×2 | Recruits; holds land with 2 men |

Starting army per lord: 8 soldiers and 1 knight at home. One army marches a season, one road step,
two through your own land.

### Deeds and lords

| Parameter | Value |
|---|---|
| Deeds a season | 1; 2 from six provinces held |
| Submission offer | attack points ≥ defence × 1.5 (fearful), × 2 (greedy, loyal by marriage only), × 3 (proud) |
| Vassal income | province pays at fair tax, minus 1 kept by the lord |
| Loyalty start | 5 by submission; 7 by marriage or pardon |
| Loyalty per season | +1 renown rose this year; +1 greedy if your income is highest; +1 fearful if your army is largest; −1 renown fell; −1 a neighbouring province revolted; −2 marched through their land |
| Loyalty 8+ | +2 levies on your marches from a neighbouring province |
| Loyalty 0 | defects to the strongest neighbouring earl, or independence |
| Turn vassal | rival cunning (1 to 3) vs loyalty ÷ 3, contest odds |
| Marriage | renown ≥ 5, 15 gold, shared border |
| Pardon | 2 renown (proud) or 10 gold (greedy); others free |
| Dispossessed return | 10% × host earl's cunning each season, only if the old province's unrest ≥ 2 |
| Alliance | 4 seasons; breaking it costs 3 renown |

### Contests

| Parameter | Value |
|---|---|
| Roll | each side ×(0.85 to 1.15) |
| Stance bold / steady / cautious | odds +10 / 0 / −10 points; loser's losses ×2 / ×1 / ×0.5 |
| Field loss, loser | 50% (cautious: 25%, and it is a retreat, not a rout) |
| Field loss, winner | (loser points ÷ winner points) × 50%, min 1 man, max 60% |
| Siege fail | attacker −25%, engine kept; defender −10% |
| Tournament stakes | 5 to 20 gold, or a border province each; purse 0 to 15 committed blind |
| Tournament points | renown + purse + 1 per knight at home |
| Raid points | cunning + knights sent + 2 if no castle; guards = garrison ÷ 2 + 2 if castle |
| Raid success | 25% of the target treasury; failure loses the knights and 1 renown |
| Court deck | 12 events; outlaws usable 3 times from a held forest |

### Lords

| Lord | Home | Start | Leadership | Stewardship | Cunning | Renown | AI |
|---|---|---|---|---|---|---|---|
| Osric | Northumbria | + Cumbria | 2 | 2 | 1 | 2 | (player default) |
| Aldric | Cornwall | + Devon | 3 | 1 | 2 | 1 | raider |
| Berta | Norfolk | — | 1 | 3 | 1 | 3 | builder |
| Gwyn | Chester | — | 1 | 2 | 3 | 2 | hoarder |

### Does it hang together? The arithmetic

**Year one.** A far-corner lord holds two provinces worth 3 base together, with fair tax:
3 a season, 6 in autumn, 1 in winter, so 13 gold in the year, plus the 25 starting treasury,
minus 1 a season of knight upkeep (4). About 34 gold to spend in year one. That buys the first
neutral province by force (the 8 soldiers and 1 knight, 11 points, beat a levy of 2 to 5 in
lowland at 70 to 85%), a second castle (20) by the end of the year, and a few soldiers.
Year one is "take one or two neutrals and build the second castle". That is the intended shape.

**Growth.** Each fairly taxed lowland province adds 3 a season. By year four a lord who has
taken four neutrals holds six provinces at roughly 15 a season, 30 in autumn, about 70 a year,
minus upkeep for two knights and two extra castles (16). That is 50 gold a year of real spending:
a siege engine and a knight and twenty soldiers, or two castles. The map has 18 provinces and four
lords, so the neutral land runs out around year four, and from there growth means taking from a
rival. The rise from 3 to 15 a season is visible on the income line every season; that is the score.

**Armies stay small.** Soldiers are free to keep but only 1 point each, and knights cost upkeep.
A 50-gold year buys at most 30 points of army. A castle doubles defence, so a garrison of 6 with a
castle is 12 points and holds against a 15-point stack more often than not. Nobody needs 40 men.

**Harsh tax is a real gamble.** Harsh on a 3-base province pays 4 instead of 3, and 6 instead of 3
in autumn, so about 8 extra gold a year per province, with a revolt in 5 seasons unless the tax
is dropped. Two seasons of harsh tax across four provinces before an autumn buys a castle. That is
the intended temptation, and dropping to low tax to cool unrest costs the same again.

**London is the late game.** 10 city men behind walls is 20 defence points at the start, 32 by
year three when the levy reaches 16. Taking it needs an engine (15) and about 24 attack points at steady stance for even
odds, or 30 for comfort: eight knights' worth, or a 20-soldier stack with three knights. No lord
has that before year five without going harsh on tax, and the crown then needs four seasons of
holding with the highest income, which invites everyone else's siege. That is the intended climax.

**Winter attrition.** A 20-man stack wintering in the field loses 2 men a season, 4 over the
winter if it stays out through two winter turns. That is a knight's worth of gold a year for
leaving an army outside walls, enough to make the player bring it home, not enough to cripple.

**Vassals versus conquest.** A vassal pays base minus 1 and needs no garrison; a conquered
province pays base and can be taxed harsh but needs 2 men and a castle to hold. On a 3-base
province that is 2 a season with no cost, against 3 (or 4 harsh) with 20 gold of castle and an
upkeep-free garrison. Vassalage is the cheap fast way to spread; conquest is the way to hold the
rich land you mean to keep. That is the intended choice.

**Time.** Under a minute a season for the player's part, and the AI turn is visible but instant.
48 seasons is 35 to 45 minutes including contests. If playtests run long, the first lever is a
10-year campaign, not fewer provinces.

**Balance state, from the runner (`node balance.js 300`, September 2026).** Four AI earls, no
player. Before tuning, Norfolk won 98% of games with any personality: the cause was geography
(four rich lowland neighbours and two steps to London), not the AI. Levers pulled, in order:
vassal levies grow to 6 and defend at 1.5x (vassal land was a free grab); neutral levies start
at 3 to 6; attacker losses floor at 20%; the treasury win needs 20 income as well as 60%; base
incomes moved toward the far corners (Northumbria 3, Cumbria 2, Chester 3, Cornwall 2, Devon 3)
and away from the east (Norfolk 2, Lincoln 2, Essex 1); temperaments placed so each earl has one
easy neighbour and one hard; every AI builds mills and gathers larger stacks. After that:

Second pass: a Pennine road (Northumbria to Lancaster) so the north has three ways out; Cumbria
base 3; Aldric's leadership 3 to 2 and cunning 2 to 3; and from year eight every AI stages a
siege engine with its largest stack, recruits there, and walks the train toward London through
its own land, attacking at 1.2x rather than 1.6x.

| Earl | Win rate | Note |
|---|---|---|
| Osric (Northumbria) | 19% | Was 9% before the Pennine road and Cumbria 3 |
| Aldric (Cornwall) | 31% | |
| Berta (Norfolk) | 35% | |
| Gwyn (Chester) | 16% | The weak corner now; Wales at its back pays little |

Endings over 300 games: 207 by the crown, 22 by treasury, 71 on time. Average end in year 10.6,
with the bulk of games ending in years nine to eleven. That is the intended shape. Remaining
work for the runner: Gwyn's corner, and the quarter of games that still run out the clock.
A human player is not the AI; these figures set the AI's shape, not the player's experience.

---

# PART G — Hand-back checklist

Before handing a build back to the owner and Claude for review:

1. `node balance.js 300` output pasted; all four earls between 15% and 40%; most games end by
   the crown; average end in years nine to twelve. If a number moved, `08-parameters.md` says why.
2. The page opens with no console errors, from a fresh browser with no saved data, and a new
   player's first turn is guided.
3. A playable link for the owner.
4. A short note: what the player will notice, which backlog items are done, what is known to
   be rough, what Codex wants a decision on.
5. Any new asset listed in `CREDITS.txt` with source, model and licence.

Claude then reviews against Parts A, B and D, runs the balance runner and the headless UI
scripts, and returns a verdict with specific fixes. The owner plays and reports feel.
