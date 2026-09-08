# 02 — Game design

The map and the income are the game. This document is ordered that way: the campaign layer is
specified in full, the set-pieces are short and optional. Numbers are placeholders for feel.

## The loop

```
Season turn
  1. Ledger        — income arrives, upkeep leaves, the income line updates on screen
  2. Rule          — set tax per province, build works, recruit, garrison
  3. March         — move armies along roads; battles resolve where armies meet
  4. One deed      — court, tournament or raid (optional; pass banks 2 gold)
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
- **Neutral provinces** start with local levies (3 to 8 soldiers). They are the early game: cheap
  land at first, expensive later because the levies grow if nobody takes them.
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

## Battles, auto-resolved and readable

Field battles are not a mini-game. Before the clash the screen shows both strengths with the
modifiers listed (terrain, castle, knights, lord's leadership), the odds as a percentage, and a
single choice: **attack**, **hold**, or **withdraw**. The hidden roll is at most ±15%. The result
screen shows the losses and why. A siege against a castle needs an engine and offers the catapult
set-piece or **auto-resolve at the shown odds**.

## Victory

- **Crown**: hold the crown province with a castle for four consecutive seasons while holding the
  highest income on the map.
- **Treasury**: hold 60% of the map's total income for a full year. This is the win for the
  player who would rather build than storm.
- **Last lord standing.**
- **Defeat**: lose your last castle.
- **Score**: years taken, peak income, provinces, reputation, a title. The seed on the result screen.

## Lords

Four lords, each with a starting corner and stats that change map decisions, not just odds:
*Leadership* (field battle bonus), *Stewardship* (+1 gold per 4 provinces), *Renown* (reputation
starts higher, tournaments favour you), *Cunning* (raids and sabotage). Rivals are the lords you did
not pick, played by an AI with a matching personality: builder, raider, hoarder, opportunist.

## Set-pieces, all optional

Every set-piece has an **auto-resolve** button showing the odds first. A **strategy only** toggle
in settings auto-resolves everything silently. Playing them well moves the odds by a margin; it
never replaces the map.

- **Siege** (the catapult, prototype built): the one set-piece worth keeping. Under a minute.
  The weak stone tell, three shot types, defenders shoot back. Wired into castle assaults.
- **Tournament**: a deed. Stakes are gold or a border province. Candidate for cutting; if it stays,
  it is a three-pass joust with a visible drift reticle.
- **Raid**: a deed needing a knight. Steal gold from a rival treasury. Candidate for cutting; if
  it stays, a short read-and-block duel.
- **Court**: a deed drawing from an event deck: alliances (a rival holds off for N seasons),
  marriage (a province and an ally), outlaws (a free levy for one battle, from forest provinces),
  treachery. Text choices with the odds shown. Cheap to build and feeds the map, so it stays.

## Reputation

One visible bar per lord, Tyrant to Beloved. Fair tax, held promises and won tournaments raise it;
harsh tax, rot and attacking allies lower it. It sets how big a levy neutral provinces raise
against you, whether they join you when the crown is contested, and the price of works. It
replaces the original's invisible fame with something the player steers from the map.

## Difficulty and accessibility

Three named settings changing AI income, AI aggression and the size of the hidden roll, all listed.
Set-piece timing is never a difficulty setting; a "generous timing" option lives in accessibility.
All input works with keyboard, gamepad or mouse and touch.
