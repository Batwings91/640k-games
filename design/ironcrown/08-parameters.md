# 08 — Parameters, and whether they hang together

Every number in the game in one place, followed by the arithmetic that checks they make a game
of the intended shape: 12 years, 30 to 45 minutes, small armies, income as the score. These are
the prototype's values; the headless balance runner will move them, this file records why they
start where they do.

## Calendar

| Parameter | Value | Why |
|---|---|---|
| Seasons per year | 4 | Spring, Summer, Autumn, Winter |
| Campaign length | 12 years, 48 seasons | About 40 minutes at under a minute a season |
| Spring | knights cost 6 instead of 8 | A recruiting season |
| Autumn | base income ×2 | The harvest is the year's plan |
| Winter | base income ×0.5, no marching, field attrition | Any stack over 3 men in a province with no castle loses 10% (min 1) |

## Map (England and Wales, 18 provinces)

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

## Income

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

## Armies

| Unit | Cost | Points | Notes |
|---|---|---|---|
| Soldier | 1 | 1 | Free to keep |
| Archer | 2 | 1 attacking, 2 defending | Forest provinces only |
| Knight | 8 (6 in spring), upkeep 1 | 3 | One recruited a season; needed to raid |
| Siege engine | 15, upkeep 1 | +25% attack each beyond the first | Needed against any castle |
| Castle | 20 (12 with a quarry) | defence ×2 | Recruits; holds land with 2 men |

Starting army per lord: 8 soldiers and 1 knight at home. One army marches a season, one road step,
two through your own land.

## Deeds and lords

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

## Contests

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

## Lords

| Lord | Home | Start | Leadership | Stewardship | Cunning | Renown | AI |
|---|---|---|---|---|---|---|---|
| Osric | Northumbria | + Cumbria | 2 | 2 | 1 | 2 | (player default) |
| Aldric | Cornwall | + Devon | 3 | 1 | 2 | 1 | raider |
| Berta | Norfolk | — | 1 | 3 | 1 | 3 | builder |
| Gwyn | Chester | — | 1 | 2 | 3 | 2 | hoarder |

## Does it hang together? The arithmetic

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

**Known imbalance, from scripted runs of the prototype (September 2026).** With the contest
system and AI castle-building in, the near-corner lords (Norfolk, Chester) won every seed, by the
crown or by treasury, between years four and eight; the far corners (Northumbria, Cornwall) held
three to six provinces and never threatened. The second starting province for the far corners was
not enough. Levers, in the order to try them in the balance runner: London's levy growth (now +1
a season to 16), the treasury win threshold (60% may be too low with four lords), the near-corner
base incomes (Norfolk 3 and Chester 2 could drop by 1), and giving the far corners a mill. The
campaign should end in years nine to twelve most of the time; it currently ends in four to eight.
