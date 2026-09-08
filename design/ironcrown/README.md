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
| [10-review-brief.md](10-review-brief.md) | Stand-alone brief for an outside design review: rules, playtest findings, questions |
| [11-build-brief.md](11-build-brief.md) | Handover brief for whoever builds the game: why it exists, decisions, roles, files, assets, conventions, backlog |
| [10-review-brief.md](10-review-brief.md) | Self-contained brief for an outside review: concept, rules, what exists, playtest findings, questions |
| [prototype/campaign.html](prototype/campaign.html) | Playable campaign: choose an earl, England at 800x600, the loyalty layer (submission, vassals, dispossessed lords, court deeds), contests by points and odds, winter attrition, three victories. Needs `sim.js` beside it; `?seed=1234` fixes the levies |
| [prototype/sim.js](prototype/sim.js) | The rules, as one file shared by the page and the balance runner; emits the events the scenes are built from |
| [prototype/scenes.js](prototype/scenes.js) | Cut scenes as text: a line per lord on first meeting, temperament lines, and the shared scenes (homage, conquest, defection, marriage, pardon, tournament, siege, winter, crown, defeat) |
| [prototype/balance.js](prototype/balance.js) | Headless balance runner: `node balance.js 300` prints win rates, endings and end years |
| [prototype/siege.html](prototype/siege.html) | Shelved catapult set-piece, kept for reference only (320x200) |

## Where the design stands

The land-and-income strategy is the core, the map is England, and the look is 800x600 with a
256-colour VGA palette, all decided September 2026. There are no action mini-games:
every contest is resolved by one visible points-and-odds system. The balance runner exists and the first tuning pass is done; the state of
balance is recorded at the end of `08-parameters.md`.

## Legal note, up front

*Defender of the Crown* is a Cinemaware property (the company still exists and still sells it). Nothing
in this design uses its name, character names, art, music, or text. "In the spirit of" is fine; a
lookalike is not. The working title, character names and place names in these documents are
placeholders and will be replaced.
