# Ironcrown — build brief and handover

This is the second brief. Read `10-review-brief.md` first for the rules and the playtest notes;
this one adds what that brief left out: why the game exists, what it must feel like, who owns what,
where every file and asset is, the conventions the code must keep, how to run and test it, and
the backlog with acceptance criteria. Whoever builds from this should be able to take ownership of
the codebase from here without asking the owner anything that is already answered below.

## 1. Why this game exists, in the owner's terms

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

## 2. Decisions already taken (do not reopen without the owner)

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

## 3. Roles

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

## 4. Where everything is

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

## 5. Assets: what exists and what does not

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

## 6. Technical conventions the code must keep

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

## 7. How to run

```
# play
open design/ironcrown/prototype/campaign.html          # needs sim.js and scenes.js beside it
# a fixed map
open 'design/ironcrown/prototype/campaign.html?seed=1234'
# balance
cd design/ironcrown/prototype && node balance.js 300
# trace one AI game
node -e "const S=require('./sim.js');const G=S.createGame(7,-1);for(let t=0;t<48&&!G.over;t++)S.endSeason(G);console.log(G.over,G.log.slice(-10))"
```

Keys in the page: Enter ends the season, H help, S/K/C buy soldier/knight/castle, M march,
Escape skips scenes or playback.

## 8. Current state of play, honestly

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

## 9. Backlog, in order, with acceptance criteria

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

## 10. Working agreement

- Small commits with messages that say what changed for the player.
- Any rules or number change: `sim.js`, then `08-parameters.md`, then run the balance runner and
  paste its output in the commit or PR.
- Keep `02-game-design.md` true. If the code diverges from it on purpose, change the document in
  the same commit.
- Report in terms the owner uses: what a player will notice, not what a function does.
- Before asking the owner a question, check sections 2 and 6 here and `06-open-questions.md`.
  Ask the owner about feel, priorities and anything in section 2. Decide the rest.
