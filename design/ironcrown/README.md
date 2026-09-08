# Ironcrown (working title) — design and plan

A retro strategy game in the spirit of Cinemaware's *Defender of the Crown* (1986), made by 640K Games
in the studio's usual way: HTML5 Canvas and JavaScript, no engine, one build that runs in a browser and
can be wrapped for desktop stores.

This folder is the living design. It is written to be argued with. The next step is the visual
references and the keep/cut list, which will reshape most of what is here.

| File | What it covers |
|---|---|
| [01-vision.md](01-vision.md) | Pillars, the "what made it great / what never worked" hypothesis, the tone |
| [02-game-design.md](02-game-design.md) | Systems: map campaign, castle economy, siege, raid, tournament, court, victory |
| [03-technical-plan.md](03-technical-plan.md) | Stack, architecture, resolution and palette, save data, build outputs |
| [04-platforms-and-monetisation.md](04-platforms-and-monetisation.md) | itch.io, Steam, portals; pricing; what each platform needs from the build |
| [05-roadmap.md](05-roadmap.md) | Milestones from paper prototype to launch, with what each proves |
| [06-open-questions.md](06-open-questions.md) | Decisions that need you, and the reference material still to come |
| [07-paper-prototype.md](07-paper-prototype.md) | Milestone 1: one-page table rules for the campaign turn |
| [08-parameters.md](08-parameters.md) | Every number in one place, and the arithmetic showing they make the intended game |
| [09-lords.md](09-lords.md) | First-draft cast: the four earls and fourteen minor lords with temperaments |
| [prototype/campaign.html](prototype/campaign.html) | Milestone 2: playable map campaign, land, income, tax, garrisons, three AI lords, three victory conditions. England at 800x600. Open in a browser; `?seed=1234` fixes the levies |
| [prototype/siege.html](prototype/siege.html) | Shelved catapult set-piece, kept for reference only (320x200) |

## Where the design stands

The land-and-income strategy is the core, the map is England, and the look is 800x600 with a
256-colour VGA palette, all decided September 2026. There are no action mini-games:
every contest is resolved by one visible points-and-odds system. Balance in the campaign prototype is untuned: a scripted player that garrisons
and builds castles wins on most seeds, and the AI lords churn land between themselves. Tuning waits
for the headless balance runner in `03-technical-plan.md`.

## Legal note, up front

*Defender of the Crown* is a Cinemaware property (the company still exists and still sells it). Nothing
in this design uses its name, character names, art, music, or text. "In the spirit of" is fine; a
lookalike is not. The working title, character names and place names in these documents are
placeholders and will be replaced.
