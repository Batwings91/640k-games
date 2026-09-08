# 12 — Visual design

The plan for the look, from the five reference images the owner supplied (in `references/`).
To be implemented after Codex hands back the playable build. The rules of the game do not change
here; this is the rendering layer, the chrome, the scenes and the assets.

## 1. What the references say

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

## 2. Art direction in one paragraph

A painted, late-medieval England seen from above the North Sea at dusk, in the 256-colour manner
of a 1994 VGA game: rich teal water with dithered swell, land in warm greens and umbers with
mountains and forests painted in, each province washed in its holder's colour and rimmed with a
bright line. Over it, a thin layer of gilt-and-ink chrome: dark panels with gold filigree
corners, parchment for anything that is read. Faces are painted busts, three-quarter view, on
parchment. Interiors are cold stone and torchlight. Everything is dithered, nothing is smooth.

## 3. Palette

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

## 4. Typography

Two bitmap faces drawn into the palette:
- **Display**: a serif with slight calligraphic weight, 16 px cap height, for names, the date,
  the season, scene titles, button labels. Modelled on the feel of ref 1's "Geoffrey Longsword",
  not its letterforms.
- **Text**: a rounded serif at 12 px for parchment narrative and panel lines, as in ref 4.
Numbers use the same faces. Until the bitmap fonts exist, a Google-hosted serif is a stand-in
in the browser, but the shipped game embeds its own bitmap font.

## 5. Screens at 800x600

### 5.1 Earl select (ref 5)

Teal dithered ground. A title cartouche in gold at the top. Four parchment cards in a row,
150x250 each, with a painted bust (120x140), the name in red, the seat in ink, and the four stat
pips (Leadership, Stewardship, Cunning, Renown) as filled and empty dots. Hover lifts the card by
4 px and brightens the rim. Below, one parchment line: "Choose your earl." A second row later
holds the fourteen minor lords as a gallery the player can browse.

### 5.2 The map screen (ref 1), the whole game

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

### 5.3 Boxes over the map

All dialogs are **parchment scrolls** unrolled over the sea side of the screen, 480 px wide:
the attack box (count, points, odds bar in gold on ink, stance, Attack and Cancel), the homage
offer (with the lord's portrait), and the season summary. They never cover the selected province
or its neighbours; the box picks its side by where the selection is.

### 5.4 Cut scenes (ref 4)

Full-screen painting, 800x600, with the parchment text block (360x300) on the side the painting
leaves free, and the figure on the other. Text in the rounded serif, red title, two or three
lines. A gold "continue" glyph blinks bottom-right; the whole screen is a button. Skip-all lives
in the gear. Scene paintings and figures are separate layers so one painting serves several lords.

### 5.5 Contest results (refs 2 and 3)

No action. When a battle resolves, a **result screen** shows for one click: the siege painting
for a castle, the field painting for open ground, the courtyard painting for a raid, the lists for
a tournament. A few sprites in the two colours, a parchment strip with the itemised result
("Your 24 against their 15. Bold. Won. Lost 6 men."). This is where ref 3's castle and ref 2's
courtyard live.

### 5.6 The end of a season

The hourglass turns. The map dims slightly; each event flashes its province rim white three
times while a parchment caption appears at the herald line; battles show their result screen
if they involve the player; then the date cartouche flips to the new season with a two-frame
gold flash and a short chord. Then the player's cut scenes. Then the map brightens and the
herald says what to do.

### 5.7 Ledger, title, results

- **Ledger**: a parchment ledger page, two columns, every province's gold this season, works,
  upkeep, the total, and a bar for each of the last four years. Opened from the coin icon.
- **Title**: the crown over a dark map of England, the 640K Games mark, "Continue" and "New".
- **Results**: the coronation or defeat painting, the score on parchment, the seed.

## 6. Motion and sound, deliberately small

Nothing needs reflexes. Motion is for feedback: rim pulses, the hourglass turn, the three-flash
event, the card lift, the parchment unroll (four frames), the season flip. Sound: a coin for
purchases, hooves for a march, a clash for battle, a chord for the season, a fanfare for the
crown, all synthesised as the technical plan says, with a music slot for CC0 loops.

## 7. Asset list

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

## 8. Pipeline

1. `tools/palette.js` builds the master palette from the anchor families in section 3 and
   writes `palette.json` and a swatch PNG for review.
2. `tools/quantise.js` takes any PNG, quantises to the master palette with ordered dither, and
   writes it to `assets/`. The site's `render-hero.js` is the starting point.
3. The map painting is made at 800x600 over a guide rendered from the `sim.js` polygons, so the
   painted coast matches the click regions exactly.
4. Portraits are painted at 240x280 and quantised down.
5. Fonts are drawn as PNG strips and packed by a small script into a glyph table.

## 9. Implementation plan, for when Codex hands back

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

## 10. What the owner decides before painting starts

- Who makes the paintings and portraits (see section 7), and therefore the budget.
- Approve the palette swatch and one test painting (a province of the map) before the rest.
- The name of the game, since it goes on the title cartouche.
