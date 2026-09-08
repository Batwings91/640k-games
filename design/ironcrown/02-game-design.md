# 02 — Game design

Everything below is a first pass to react to. Numbers are placeholders for feel, not balance.

## The loop

```
Campaign turn (a season)
  1. Events and income     — harvest, taxes, a herald with news, maybe a court event
  2. Move and recruit      — move the army along roads, buy troops and works at home
  3. One deed              — raid, tournament, court, or sabotage (or pass to bank a bonus)
  4. Rivals act            — visible on the map, fast-forwardable
  5. Battles and sieges    — any clash triggers a set-piece
Repeat until one lord holds the crown or the year count runs out.
```

Four seasons make a year. A default campaign is 12 to 16 years (48 to 64 turns) and should take
30 to 45 minutes. Autumn is harvest, winter halves movement. That alone gives the map a rhythm the
original lacked.

## The map

- A fictional kingdom of **12 to 16 provinces**, each with a castle site, a terrain type (lowland,
  hills, forest, marsh, coast) and a road graph to its neighbours. Provinces are large enough to be
  readable at 320x200 and few enough that each has a personality.
- **Roads** are the only way to move at full speed. Off-road costs a turn. Chokepoints (a bridge, a
  pass) are where fights happen; this is the "reasons to hold specific territories" fix.
- **Province value** is income plus one feature: a market (extra gold), a quarry (cheaper siege works),
  a forest (archers, and where the outlaws live), a port (news and trade events), a shrine
  (reputation). Owning a set of features is more valuable than owning many plain provinces.
- The **crown province** sits in the centre, empty at the start, and cannot be held without a castle.
  Taking it is a siege everyone sees coming.

## Lords and factions

- **Four playable lords**, each with one strong and one weak mini-game and a starting corner. Stats
  are visible and explained ("Osric: Leadership 3 — troops fight at +1 in the field. Jousting 1 —
  narrower lance window."). Differences should change how you play, not just how well.
- **Rival lords** are the same pool: whoever you do not pick, the AI plays. Every lord has a
  personality profile that drives the AI (raider, builder, tourney-hound, opportunist).
- Replay comes from lord choice × map seed × event deck. One hand-made map ships first; a second map
  and a random-map generator are stretch goals (see roadmap).

## Economy

Small numbers on purpose. Gold is the only currency, shown as a number and as a coin pile.

| Thing | Cost (placeholder) | Notes |
|---|---|---|
| Soldier | 1 | The bulk of any army; cap by province count |
| Archer | 2 | Only from forest provinces; strong on defence |
| Knight | 8 | Rare; wins field battles, needed to raid |
| Siege engine | 15 | Needed to attack a walled castle; slow to move |
| Castle | 20 | Turns a province into a stronghold; one per province |
| Wall repair | 5 | Restores a damaged castle; also the sabotage target |

Income per turn is the sum of held provinces, plus market and port bonuses, minus upkeep for
knights and engines. Autumn doubles farm income. Losing your home castle halves income until you
retake it.

## Set-pieces (the mini-games)

Each one gets a practice entry on the main menu and a one-screen "how to read this" the first time
it appears. The player must be able to say, after losing, what they should have done.

### Field battle (army vs army, no castle)

Not a mini-game in the original; it was a dice roll. Here it is a **short, readable auto-battle with
one decision**: before the clash, choose a formation (line, wedge, hold) against a preview of the
enemy's; it plays out in a few seconds of sprites, then a result screen with a simple breakdown.
Terrain and lord stats are visible modifiers. No hidden roll bigger than ±15%.

### Siege (attacking a castle)

The catapult stays, because it was the best thing in the game. Fixes:
- The **wall has a visible weak section** that moves a little each shot; hitting it matters.
- Three shot types are a resource (boulder: damage, fire: keeps defenders off the wall next shot,
  rot: reduces the garrison), shown as a hand of tokens, not a mystery.
- Distance is set by the trajectory arc drawn on screen before release; the skill is timing the
  release on a moving power bar and reading wind. The arc is honest.
- Defenders shoot back; you lose troops per turn spent, so a siege is a race, not a grind.

### Raid (sneaking into a rival castle)

The swordfight, made a **rhythm-and-read duel** instead of a mash: the guard telegraphs high, low, or
thrust with a two-frame wind-up; you block by matching, then get a window to strike. Later guards
feint. The raid is a corridor of 2 to 4 guards ending at the treasury (steal gold) or the tower
(rescue a captive). Failure costs the knights you sent, not the campaign.

### Tournament (the joust)

The most broken thing in the original, so it gets the most design:
- Both riders approach on a fixed rail. A **target reticle drifts** on the opponent's shield; you
  steer the lance with up/down and commit with one press. The drift pattern is the opponent's
  skill, and it is visible.
- Three passes. Points for shield hits, a win for an unhorse. Ties resolve by points.
- Stakes are chosen before the joust: fame (reputation), gold, or a province against the same from
  the rival. The AI accepts based on its personality and how it rates your jousting record.

### Court

New, and where the "drama between battles" lives. A deed spent at court draws from an event deck:
alliances (a rival will not attack you for N turns), marriages (a province and an ally, at the cost
of a rival's enmity), the outlaws of the forest (a limited, free army for one battle, three uses,
found by holding a forest province), and the occasional treachery. All text-choice, all with the
odds shown.

## Reputation

A single visible bar per lord, from Tyrant to Beloved. Won in tournaments, rescues and fair fights;
lost by sabotage, rot, and attacking allies. It sets recruitment caps, event outcomes and whether the
last neutral provinces join you or your rival when the crown is contested. This replaces the original's
invisible "fame" with something the player can steer.

## Victory and defeat

- **Win**: hold the crown province with a castle for four consecutive turns while holding more
  provinces than any rival, or eliminate every rival lord.
- **Lose**: lose your last castle. There is no "lose your home and limp on"; a new campaign starts in
  a minute.
- **Score**: years taken, provinces held, reputation, and a title ("Osric the Patient"). A local
  high-score table per lord, and a seed shown on the result screen for sharing.

## Difficulty

Three named settings that change AI aggression, AI income, and the size of the hidden roll, all
listed on the settings screen. No setting changes the mini-games' timing windows; those are skill.

## Accessibility

Every mini-game has a "generous" timing option that widens windows by a fixed fraction and is not a
difficulty setting; it is in accessibility, and it does not affect score. All input is keyboard,
gamepad or mouse/touch; the mini-games are designed around one axis and one button so touch works.
