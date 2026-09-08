# 05 — Roadmap

Milestones are ordered so each one proves something and could be the point where the project is
shelved without waste. Durations are rough and assume one person part-time.

| # | Milestone | Proves | Deliverable |
|---|---|---|---|
| 0 | **Design lock, first pass** (this folder, then your references and keep/cut list) | We agree on what the game is | Updated docs, a one-page pitch, a palette and three reference images |
| 1 | **Paper prototype** of the campaign turn, 2 weeks | The map layer is interesting on its own | A printable map, counters, and the turn rules on one page; three play sessions with notes |
| 2 | **Siege set-piece**, standalone, 3 weeks | The best mini-game is fun and readable in the studio's tech | Playable in a browser from the practice menu, with sound; first devlog GIF |
| 3 | **Map and turn loop**, 4 weeks | A campaign can be played start to finish against a dumb AI | Hand-made map, economy, movement, field battle auto-resolve, save/load, victory |
| 4 | **Joust and raid**, 4 weeks | The two "opaque" mini-games are fixed | Both playable from practice and from the campaign; practice mode explains the tells |
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

If the design lock takes a while, the technically safe start is milestone 2, the siege: it depends
on nothing else, it exercises the whole render/audio/input stack, and it is the first thing worth
showing anyone.
