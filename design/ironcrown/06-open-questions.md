# 06 — Open questions

## Decided so far

- Land and income are the game. Risk-style, turn-based, seasons.
- No action mini-games. Every contest uses one points-and-odds system with one decision.
  The tournament mechanism (blind purse or plain points) waits until you have played a prototype.
- 800x600, 256-colour VGA palette. Visuals are for later.
- England and Wales, 18 provinces, London is the crown.
- **Every province has its own lord, with cut scenes** (decided September 2026). The four playable
  earls remain the rivals for the crown; the other fourteen provinces are held at the start by
  minor lords rather than faceless levies. Each has a name, a portrait, a house and a temperament,
  and appears in cut scenes: when you take their land, when they submit or defy you, at
  tournaments, at court. This turns the "neutral levy" of the prototype into a character and
  gives the map its cast. Implications are listed under question 1.

## Decided, September 2026, question by question

1. **Minor lords: full loyalty layer.** Vassalage, loyalty numbers, court deeds aimed at named
   lords, rivals turning your vassals, dispossessed lords fleeing to enemy courts. Specified in
   `02-game-design.md` under "Lords of the land".
2. **Cut scenes: sparing, like the original.** About 30 paintings: one per lord (18) plus around
   a dozen shared scenes. Two or three lines each, always skippable, the game remembers the skip.
3. **The player chooses one of the four earls.** The other three are AI rivals.
4. **Slower build, 12 years.** Tune so the crown usually falls in years nine to twelve.
5. **Three wins stay**: crown, treasury, last lord standing.
6. **Deeds: one a season, a second from six provinces.**
7. **Winter is harsher**: no marching, half income, and armies outside a castle lose men.
8. **AI earls have fixed personalities.** Aldric is always the raider, Berta the builder, Gwyn
   the hoarder. Players learn them as characters.
9. **One sitting, autosave as safety.** No recap screens.
10. **Wales stays**: Gwynedd and Powys, with their own lords.
11. **Multiplayer: online, later**, as a separate project after launch. Version one has no server.
    The simulation is kept deterministic and action-log based from the start so a later online
    mode can replay the same log on both machines.
12. **Music: CC0 loops first**, a commissioned score if the game sells.
13. **Name: Ironcrown stays as the working title** until the look is settled.

## Still open

- The tournament mechanism: blind purse or plain points. Waits until you have played a prototype.
- Visual references and the painting style.
- Names, houses and temperaments for the eighteen lords; a first draft is in `09-lords.md`.
