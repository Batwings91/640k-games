# 05 — Roadmap

Milestones are ordered so each one proves something and could be the point where the project is
shelved without waste. Durations are rough and assume one person part-time.

| # | Milestone | Proves | Deliverable |
|---|---|---|---|
| 0 | **Design lock, first pass** (this folder, then your references and keep/cut list) | We agree on what the game is | Updated docs, a one-page pitch, a palette and three reference images |
| 1 | **Paper prototype** of the campaign turn, 2 weeks | The map layer is interesting on its own | A printable map, counters, and the turn rules on one page; three play sessions with notes |
| 2 | **Campaign prototype** (done: `prototype/campaign.html` on `sim.js`, with `balance.js`) | Land, income and lords are fun with nothing else | England, earl choice, income, tax, garrisons, contests, the loyalty layer, deeds, winter, three victories, a headless balance runner |
| 3 | **Campaign proper**, 4 weeks | The prototype's loop survives real data | Hand-made map with features and works, seasons, save/load, the income ledger screen, victory and score |
| 4 | **Contest screen**, 2 weeks | One points-and-odds screen serves battle, siege, tournament and raid | Itemised points, odds, stance or wager, itemised result; the catapult prototype is shelved |
| 5 | **Lords and loyalty**, 4 weeks | The loyalty layer makes the map richer without slowing the turn | Eighteen lords in JSON with temperaments, submission, vassals, loyalty, defection, dispossessed lords, court deeds aimed at named lords |
| 5b | **Cut scenes** (text done in the prototype: `scenes.js`; art in milestone 7) | Scenes are sparing, skippable, and land | Scene system, first-draft text for every lord and shared scene, placeholder frames, skip remembered |
| 6 | **Real AI and balance**, 3 weeks | The game can be lost, and each lord plays differently | Personality planners, the headless balance runner, tuned tables |
| 7 | **Art and music pass**, 4 to 6 weeks | It looks and sounds like the pitch | All screens painted to the palette, music per scene, transitions, title |
| 8 | **Playtest via the unlisted link**, 3 weeks | Strangers can learn it without help | Ten external testers, a feedback form, a fix list |
| 9 | **itch.io release with demo**, 2 weeks | People pay for it | Store page, HTML5 and zip builds, demo build, trailer, `games/ironcrown.html` on the site |
| 10 | **Portal demos** (CrazyGames, Poki), 2 weeks | The demo brings traffic | Demo with SDK hooks, portal submissions |
| 11 | **Steam build**, 4 weeks, *gated on 9 showing interest* | The desktop wrapper and store assets | Electron/Tauri build, Steamworks, achievements, page, keys for itch buyers |
| 12 | **Post-launch**: commissioned score if sales justify it; then online multiplayer as a separate project (server, lockstep replay of the action log) | Replay value for the long tail | Free updates, each a devlog |

Roughly nine months to the itch release at a part-time pace. Milestones 2 and 3 can swap if the
paper prototype says the map layer needs the most work.

## What to build first, concretely

The map. The campaign prototype is where the time goes. There are no action mini-games to build;
the contest screen is UI over the same resolver the map already uses.
