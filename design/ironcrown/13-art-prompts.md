# 13 — Art generation sheet

Decided by the owner: the paintings and portraits are **AI-generated, then hand-corrected**, and
the generation is handed to Codex so the whole art pass can be owned there. This sheet is what
Codex runs from: a style preamble to prefix every prompt, one prompt per asset with its size and
file name, and the post-processing every file goes through. Prompts are tool-neutral; adapt the
syntax to whatever image model is used, and **verify that model's terms allow commercial use
before generating anything that ships**. Record the model and its terms in `CREDITS.txt`.

## 0. Rules for every asset

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

## 1. Style preamble (prefix every prompt)

> Late-medieval England, twelfth century. A painted illustration in the manner of 1990s
> computer-game box art: gouache and airbrush, rich saturated colour, strong directional light,
> clean edges, slightly heroic proportions, no photorealism, no text, no lettering, no borders,
> no watermarks. Palette leaning to teal water, warm green and umber land, gilt and dark wood,
> parchment and torchlight.

Negative, where the tool takes one: text, letters, watermark, signature, frame, border, modern
clothing, photograph, 3D render, anime, blurry, extra fingers, extra limbs.

## 2. The map

**`map-england.png`, 800x600 (generate 1600x1200).**

> Aerial painted map of England and Wales seen from high above the North Sea at dusk, the
> coastline exactly as in the attached guide image, the sea a deep teal with lighter swell
> near the shore, the land a patchwork of green lowland, dark forest, brown hills and grey
> mountains, small painted castles are NOT included, no borders drawn, no labels, atmospheric,
> a few clouds at the far edges.

Attach the guide render of the province polygons (`tools/mapguide.js` draws the coast and cells
from `sim.js`) and ask for the coastline to match it. Province washes, rims, castles and labels
are drawn by the game over this painting.

## 3. Earl portraits (4)

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

## 4. Minor lord portraits (14)

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

## 5. Scene paintings (12)

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

## 6. Figures (18)

**`figure-<name>-<pose>.png`, 400x800 (generate 800x1600), full length, transparent
background, lit to match a torch from the front-left.** Two poses each for the four earls
(standing, kneeling) and one for each minor lord (standing), matching the portrait
descriptions above. Prompt: the portrait prompt plus "full length, standing at three-quarter,
hands visible, boots, on a transparent background" or "kneeling on one knee, head bowed".

## 7. Sprites and chrome

These are drawn, not generated: the generator is poor at 24-pixel sprites and gilt corners.
Codex draws them in the palette directly (a castle 32x28 in two states, a rider 24x24 in four
colours, a tent cluster 24x16, smoke in four frames 24x32, banners 12x20 in four colours,
three frames each for waving, two cloud sprites 120x40, the hourglass in eight frames 64x64,
the gilt frame and cartouche corners, the parchment nine-slice, the eight 16x16 icons). If a
generator is used for reference, generate one "gilt filigree corner ornament on dark, gold leaf"
and one "aged parchment texture" as texture sources only.

## 8. Fonts

Not generated. Codex draws two bitmap fonts in the palette: a 16 px display serif and a 12 px
text serif, ASCII plus the accented letters in the lords' names. A free bitmap-font tool or a
converted open-licence serif is acceptable if its licence permits embedding; record it.

## 9. Post-processing, in order

1. Hand-correct in any editor: faces, hands, lines, anachronisms, stray text.
2. Downscale to target with a sharp filter.
3. `node tools/quantise.js in.png out.png` to the master palette with ordered dither.
4. For figures, keep the alpha as a 1-bit mask (dithered edges look wrong; use a clean cut).
5. View at 1x in the game before approving; the dither reads differently at 2x.

## 10. Order of generation

The map first (one asset, the biggest effect), then the four earl portraits, then the six
scene paintings the loyalty layer needs most (hall, courtyard, siege, field, london, ruin),
then the minor lords, then the rest. The owner approves the map and the first portrait before
the batch runs.
