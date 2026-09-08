# 02 — Game design

The map and the income are the game. This document is ordered that way: the campaign layer is
specified in full, the set-pieces are short and optional. Numbers are placeholders for feel.

## The loop

```
Season turn
  1. Ledger        — income arrives, upkeep leaves, the income line updates on screen
  2. Rule          — set tax per province, build works, recruit, garrison
  3. March         — move armies along roads; battles resolve where armies meet
  4. One deed      — tournament, raid or court (optional; pass banks 2 gold)
  5. Rivals move   — visibly, fast-forwardable
Repeat until one lord holds the crown, one lord holds enough income, or the years run out.
```

Four seasons make a year. Spring: recruitment is cheaper. Summer: full movement. Autumn: harvest
doubles farm income. Winter: no movement, half income, garrisons matter. A default campaign is
12 years (48 turns), 30 to 45 minutes.

## The map

- **England and Wales, 18 provinces** (decided September 2026; see the prototype): Northumbria,
  Cumbria, York, Lancaster, Lincoln, Chester, Nottingham, Gwynedd, Powys, Norfolk, Warwick,
  Gloucester, Wessex, Cornwall, Devon, London, Kent, Essex. The map is a painted England at
  800x600 with a road graph to neighbours; the Bristol Channel and the Wash are not crossings.
  Every province has:
  - **Terrain**: lowland (rich, open), hills (poor, defends), forest (archers, outlaws),
    marsh (poor, slow), coast (ports, trade).
  - **Base income**: 1 to 4 gold a season. Visible on the map at all times as a coin count.
  - **One feature**, or none: market (+2 gold), quarry (siege engines and castles cost less),
    mill (+1 gold, +1 more in autumn), port (+1 gold and trade events), shrine (+reputation while
    held), forest (archers).
  - **A castle site**. Castles are built, not given; a castle holds the province when the army
    leaves.
- **Roads** are the only full-speed routes. Chokepoints (bridge, pass, ford) are where the fights
  happen, so holding one province can shield three.
- **Every province has a lord.** The fourteen provinces not held by the four earls belong to
  minor lords with names, portraits and cut scenes (decided September 2026). At the start they hold
  their land with a levy of 2 to 5 that grows each winter if nobody takes it. What else can be
  done with them (submission, alliance, marriage, vassalage) is question 1 in
  `06-open-questions.md`.
- **London is the crown province**: walled and garrisoned by the city from the start, the biggest
  income on the map, and it takes a siege engine to assault. It is the late game. The four homes are the corners:
  Northumbria, Cornwall, Norfolk and Chester.

## Income, in full

The income line, shown on every screen: `Income 14 / season  (Treasury 37)`.

```
income = Σ provinces ( base × tax modifier × season modifier + feature ) − upkeep
```

- **Tax** is set per province: *low* (×0.5, unrest falls, reputation rises slowly), *fair* (×1),
  *harsh* (×1.5, unrest rises each season). Harsh tax is the early-game gamble: fast gold now, a
  revolt later if the garrison is thin. Unrest is a visible 0 to 5 on the province; at 5 it revolts
  and returns to neutral with a levy.
- **Works** are one-off purchases that raise a province permanently: a mill (5 gold, +1), a road
  (8 gold, full-speed movement through marsh or hills), a market charter (12 gold, +2, only one
  per three provinces), walls (see castles). Works survive conquest, so building up a border
  province is a gift to whoever takes it. That is a deliberate tension.
- **Upkeep**: 1 gold per knight, 1 per siege engine, 1 per castle beyond the first. Soldiers are
  free to keep, so a big army of soldiers is cheap but slow and weak in the field.
- **Autumn** doubles base income. The whole year's plan is built around what you hold in autumn.
- **Losing your home castle** halves income until you retake it. The home is worth defending.

## Armies and garrisons

Small numbers on purpose. A lord who has never held 40 soldiers is doing fine.

| Unit | Cost | Notes |
|---|---|---|
| Soldier | 1 | Bulk. Moves at road speed. Counts 1 in battle |
| Archer | 2 | Forest provinces only. Counts 1 attacking, 2 defending |
| Knight | 8, upkeep 1 | Counts 3. Needed to raid. Max one recruited per season |
| Siege engine | 15, upkeep 1 | Needed to attack a castle. Halves army speed |
| Castle | 20 (12 with a quarry) | Holds a province with a garrison of 2; defenders count ×2 |

- **Garrisons**: when an army leaves a province, it leaves what you tell it to. An ungarrisoned
  province with no castle is taken by anyone who walks in, and its unrest rises by 1 a season.
  The core tension of the game is how thin to spread.
- **One army per lord moves per season**, one road step (two on roads through your own land).
  Other stacks stay as garrisons. This keeps the turn to one decision.

## Contests: one system for every fight

Decided September 2026: there are no action mini-games. Every contest in the game, field battle,
siege, tournament, raid, is resolved by the same **points and odds** system, so the player learns
one thing and applies it everywhere. The catapult prototype is shelved; it can return later as an
optional flourish, but nothing depends on it.

The contest screen always shows:

1. **Both sides' points**, itemised (men, knights, terrain, castle, lord's stat, works).
2. **The odds** as a percentage, computed from the points with a roll no wider than ±15%.
3. **A stance**, the player's one decision: *bold* (odds up 10 points, losses on defeat doubled),
   *steady* (as shown), *cautious* (odds down 10, losses on either side halved, and a lost
   field battle becomes a retreat rather than a rout). The AI picks by personality.
4. **The result**, itemised the same way, so the player can see what decided it.

Turn-based and readable, like a Risk battle with the dice on the table.

### Field battle (army meets army in the open)

```
attack points  = soldiers + 3×knights + leadership
defence points = soldiers + 3×knights + 2×archers + terrain + leadership
odds(attacker) = attack / (attack + defence), then stance, then the roll
```
Winner takes the province. Loser's losses: 50% of the stack (rout) or 25% (cautious retreat).
Winner's losses: half the loser's points as a fraction of the winner's, minimum one man.

### Siege (army against a castle)

Needs a siege engine in the stack. Defence points are doubled by the walls; each engine beyond
the first adds 25% to attack points. A siege that fails costs the attacker 25% and the engine
stays; the defender loses 10%. Sieges are the expensive, deliberate move of the game, which is
how London is taken.

### Tournament (a deed, no armies)

The original's joust, without the joystick. A tournament is a **sealed wager**:
- You name a rival and stakes: gold (5 to 20), or a border province against one of theirs.
- Both sides secretly commit *purse* gold on top of the stakes. Points = renown + committed purse
  + 1 per knight at home. The AI commits by personality and by how it rates your renown.
- Higher points win; the roll is ±15%. Winner takes the stakes and gains renown; the loser
  loses the stakes. Committed purse is spent by both sides, win or lose (it paid for the feast).
The decision is how much to risk against a lord whose purse you cannot see.

### Raid (a deed, needs a knight)

The original's castle infiltration, as a **points check**:
```
raid points   = cunning + knights sent + 2 if the target has no castle
guard points  = garrison ÷ 2 + 2 if castle + 1 per unrest below 2
success odds  = raid / (raid + guard), roll ±15%
```
Success steals 25% of the target's treasury (or frees a captive, from the court deck). Failure
loses the knights sent and costs renown. A raid on a neutral province steals nothing but lowers
its levy by 2.

### Court (a deed)

Draw from the event deck, text choices with the odds shown: alliance (a rival holds off for 4
seasons), marriage (a province and an ally), outlaws of the forest (a free levy of 6 for one
battle, from a held forest province, 3 uses), captive (a raid target that yields a province),
plague, good harvest, treachery. Cheap to build, feeds the map, stays.

## Victory

- **Crown**: hold London with a castle for four consecutive seasons while holding the highest
  income on the map.
- **Treasury**: hold 60% of the map's total income (and at least 12 a season) for a full year.
- **Last lord standing.**
- **Defeat**: lose your last castle. **Time**: after 12 years, the highest income wins.
- **Score**: years taken, peak income, provinces, renown, a title. The seed on the result screen.

## Lords

Four lords, each with a home corner and three visible stats from 1 to 3 that change map
decisions: *Leadership* (points in battle), *Stewardship* (+1 gold per 4 provinces per point),
*Cunning* (raids), plus starting *Renown*. The far corners (Northumbria, Cornwall) start with two
provinces because they are further from London; the near corners (Norfolk, Chester) start with
one. Rivals are the lords you did not pick, played by an AI with a matching personality:
builder, raider, hoarder, opportunist. Full numbers in `08-parameters.md`.

## Renown

One visible number per lord, 0 to 10. Fair tax, held shrines, won tournaments and rescues raise
it; harsh tax, failed raids and attacking allies lower it. It sets how big a levy neutral provinces raise
against you, whether they join you when the crown is contested, and the price of works. It
replaces the original's invisible fame with something the player steers from the map.

## Difficulty and accessibility

Three named settings changing AI income, AI aggression and the width of the roll, all listed.
Nothing in the game needs reflexes, so accessibility is about text size, colour-blind province
fills (a pattern per lord as well as a colour), and full keyboard or touch play.
