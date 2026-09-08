# 07 — Paper prototype (milestone 1)

One page of rules for playing the campaign layer on a table, before any of it is coded. The point
is to find out whether the map turn is interesting with dice-roll battles and no mini-games at all.
If it is not, no set-piece will save it.

## You need

- A map: 12 provinces drawn as blobs with a road line between neighbours. Mark one **crown**
  province in the centre, three **forests**, two **markets**, one **port**, one **quarry**. Each
  player starts in a corner province with a castle.
- Counters: coins (any tokens), soldiers (cubes), knights (a larger piece), siege engines (a flat
  piece), castles (a marker). Numbers are small: nobody should ever hold more than 30 cubes.
- One six-sided die. A season track of 48 boxes (12 years x 4 seasons).
- 2 to 4 players, or 1 player with the AI script below.

## Turn (one season)

1. **Income.** 1 coin per province, +2 per market, +1 per port. Autumn: double the base.
   Upkeep: 1 coin per knight and per siege engine you hold.
2. **Move.** Your army (all pieces in one province) moves one road step. Winter: no moves.
   A siege engine can only move with at least 4 soldiers.
3. **Recruit** in any province you own with a castle: soldier 1, knight 8 (max 1 per turn), siege
   engine 15, castle 20 (one per province), archer 2 (forest provinces only, defence only).
4. **One deed:**
   - *Raid* a neighbouring rival castle with at least 1 knight: roll d6; 4 to 6 steals 5 coins,
     1 to 2 loses the knight.
   - *Tournament*: name a rival and stakes (5 coins or a border province). Both roll d6 plus
     jousting stat; loser pays.
   - *Court*: draw an event card (write 12 on index cards: alliance, marriage, outlaws, plague,
     good harvest, treachery, and so on).
   - *Pass*: +2 coins.
5. **Battle** happens whenever armies share a province. Field battle: each side rolls d6 plus
   (soldiers ÷ 5) plus knights; defender in hills or forest adds 1. Loser loses half their cubes,
   winner loses a quarter, and the loser retreats one step. Siege: the attacker needs a siege
   engine; roll d6 per turn, 5+ breaches, then fight a field battle against the garrison with
   the defender adding 2.

## Win

Hold the crown province with a castle for four consecutive seasons while holding more provinces
than anyone else, or be the last lord with a castle.

## AI script (solo play)

The rival, each turn: recruit soldiers with all spare coins; if its army is larger than the nearest
neighbour's, move toward them; if it has 20 coins and no castle in a held province, build one; deed
is always *Tournament* against the player if its jousting stat is higher, else *Pass*.

## What to record after each session

- How many seasons the game took and whether it ended by crown or elimination.
- The turn where the winner became obvious, and whether anyone could have stopped it.
- Which decision each player found hardest, and which they never thought about.
- Every rule that had to be invented at the table.

Three sessions, then compare the notes to the pillars in `01-vision.md`.
