# 01 — Vision

## One line

A one-sitting conquest of a divided kingdom, told as a cinematic: a hand-painted map, a handful of
set-piece mini-games, and a court drama that plays out between the battles.

## What the original was

For shared reference, this is what *Defender of the Crown* actually did (Amiga 1986, then ports to
most home computers, including a DOS version in 1987):

- You picked one of four Saxon lords after the death of the king. England was a map of territories.
- Each turn you moved a small army, bought soldiers, knights, catapults and castles from your income,
  and could do one "special" action: raid a rival castle (a swordfight), hold a tournament (a joust),
  or go to Sherwood to ask Robin's men for help (limited uses).
- Sieges were a catapult mini-game: boulders, Greek fire, disease, against a castle wall.
- Winning tournaments earned land or fame; losing could cost you land.
- Rescuing a captive lady (a raid variant) led to marriage and her family's land.
- The Normans were the AI opponents. You won by holding the whole map.
- Presentation carried it: Jim Sachs' painted screens, cinematic interstitials, and a strong score.

## Hypothesis: what made it great

To be confirmed or overturned by you. Ordered by how sure I am.

1. **It is a cinematic, not a spreadsheet.** Every action is a scene. The map is a painting, the
   raid is a swordfight in a courtyard, the wedding is a screen you remember. The game is short
   enough that every scene stays fresh.
2. **Small numbers, big consequences.** You never have more than a few dozen soldiers and a few
   knights. Losing a tournament and a territory with it hurts in a way that losing 3% of an
   empire never does.
3. **One decision per turn.** Move, buy, then one special action. The turn is fast, the tension is in
   the choice, and the AI moves visibly on the same map.
4. **Set-piece variety.** Four or five completely different mini-games, each rare enough to be an
   event.
5. **A winnable arc in under an hour.** Ideal for the "one more game" loop and for a browser build.
6. **Sound and pacing.** Music that changes with the scene, fanfares for wins, silence for losses.

## Hypothesis: what never worked

1. **The mini-games were opaque.** Jousting in particular: the timing window was never explained and
   the outcome felt random. The swordfight was a button-mash. Neither rewarded learning.
2. **The strategy layer was thin.** Little reason to hold specific territories, no terrain, no supply.
   Once you had one big army the map was a formality.
3. **The AI was passive and uneven across versions.** Some ports were nearly unlosable, others
   punishing, and the difference was balance data rather than design.
4. **Randomness decided too much.** Battle results were a roll with light modifiers, so a good plan
   and a bad plan often ended the same way.
5. **No reason to replay.** Four lords with stat differences, one map, one enemy faction. After two
   wins you had seen everything.
6. **Nothing to do while waiting.** The AI turns and the interstitials were unskippable and slow.

## Pillars for Ironcrown

These are the rules the rest of the design answers to.

- **Every scene readable, every mini-game learnable.** Each mini-game has a visible tell, a clear
  input, and a skill ceiling. Practice mode from the main menu. If a player loses, they know why.
- **Strategy that matters without getting bigger.** Keep the small numbers. Add *reasons*: terrain,
  roads, harvest, alliances, reputation. Depth from interaction, not from scale.
- **Forty minutes to a crown.** A full campaign fits in a lunch break. Longer maps are an option,
  not the default.
- **Replay through faction, map and event variety**, not through grind.
- **Cinematic by default, skippable always.** Every interstitial can be skipped with one press and
  the game remembers the choice.
- **Mid-90s PC look, not Amiga.** 640K Games' brand is the DOS era: 320x200 VGA, 256 colours,
  painted screens with dithering, a sound-card-style score. This differentiates from the original's
  Amiga look without losing the "painted" feel. (Visual references from you will settle this.)

## Tone

Legend rather than history. A fictional kingdom (so we owe nothing to real geography and nobody
argues about the Normans). Straight-faced, slightly grand, occasionally funny in the way the herald
announcing your defeat is funny. No grimdark, no blood spray; a Saturday-afternoon film.
