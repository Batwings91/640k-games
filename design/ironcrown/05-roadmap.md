# 05 — Roadmap

Milestones are ordered so each one proves something and could be the point where the project is
shelved without waste. Durations are rough and assume one person part-time.

| # | Milestone | Proves | Deliverable |
|---|---|---|---|
| 0 | **Design lock, first pass** (this folder, then your references and keep/cut list) | We agree on what the game is | Updated docs, a one-page pitch, a palette and three reference images |
| 1 | **Paper prototype** of the campaign turn, 2 weeks | The map layer is interesting on its own | A printable map, counters, and the turn rules on one page; three play sessions with notes |
| 2 | **Map and economy prototype** (done first, `prototype/campaign.html`) | Land, income and armies are fun with nothing else | Browser map, provinces, income, tax, garrisons, recruit, move, auto-battle, AI rivals, victory |
| 3 | **Campaign proper**, 4 weeks | The prototype's loop survives real data | Hand-made map with features and works, seasons, save/load, the income ledger screen, victory and score |
| 4 | **Siege set-piece** (prototype done, `prototype/siege.html`) + auto-resolve, 2 weeks | The best mini-game earns its minute | Wired into the campaign with an "auto-resolve at shown odds" button |
| 4b | **Joust and raid**, 3 weeks, *may be cut* | The other mini-games justify themselves | Both playable from practice; each has auto-resolve; the strategy-only toggle hides them |
| 5 | **Court, reputation, event deck**, 3 weeks | The drama-between-battles layer earns its place | Event JSON, court scene, reputation effects wired in |
| 6 | **Real AI and balance**, 3 weeks | The game can be lost, and each lord plays differently | Personality planners, the headless balance runner, tuned tables |
| 7 | **Art and music pass**, 4 to 6 weeks | It looks and sounds like the pitch | All screens painted to the palette, music per scene, transitions, title |
| 8 | **Playtest via the unlisted link**, 3 weeks | Strangers can learn it without help | Ten external testers, a feedback form, a fix list |
| 9 | **itch.io release with demo**, 2 weeks | People pay for it | Store page, HTML5 and zip builds, demo build, trailer, `games/ironcrown.html` on the site |
| 10 | **Portal demos** (CrazyGames, Poki), 2 weeks | The demo brings traffic | Demo with SDK hooks, portal submissions |
| 11 | **Steam build**, 4 weeks, *gated on 9 showing interest* | The desktop wrapper and store assets | Electron/Tauri build, Steamworks, achievements, page, keys for itch buyers |
| 12 | **Post-launch**: second map, random map generator, extra lords | Replay value for the long tail | Free updates, each a devlog |

Roughly nine months to the itch release at a part-time pace. Milestones 2 and 3 can swap if the
paper prototype says the map layer needs the most work.

## What to build first, concretely

The map. Both prototypes now exist; the campaign one is where the time goes. The siege waits until
the map loop is proven, and the joust and raid are only built if the map game wants them.
