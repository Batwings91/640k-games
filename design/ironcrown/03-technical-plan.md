# 03 — Technical plan

The Spore Wars way, with the differences a strategy game needs.

## Stack

- **Plain HTML5 Canvas 2D and JavaScript, no engine, no framework.** One build script in Node, as
  the Spore Wars repo has. This keeps the studio's one-person pipeline and lets the same output ship
  to itch.io (HTML5), the portals, and a desktop wrapper.
- A new repo (`ironcrown/`) beside this site repo, so `tools/update-play.js` here can be pointed at
  it with a one-line change.
- **Deterministic simulation.** All campaign randomness comes from a seeded PRNG stored in the save.
  This gives shareable seeds, replayable bug reports, and a testable AI.
- **Data-driven design tables.** Lords, provinces, unit costs, event deck and AI personalities live
  in JSON, loaded after boot. Balancing means editing a file, not code. A debug overlay (a query
  parameter) shows the tables live.

## Screen and art pipeline

- Logical resolution **320x200**, scaled by an integer factor to the window with letterboxing.
  Wide screens get black bars, on purpose. (If your references come back as 320x240 or 640x400,
  this is a one-constant change as long as it is decided before the map is painted.)
- A **256-colour master palette** for the whole game, and per-scene sub-palettes of ~64. Art is
  authored at any depth and quantised and ordered-dithered by a tool in the repo, the same approach
  as `tools/render-hero.js` here. This is what makes it look mid-90s instead of "pixel art".
- Screens are painted backgrounds plus sprite layers. Sprite sheets are one PNG per scene. Font is a
  bitmap font, two sizes, in the palette.
- Fallback expectation for build size: under 15 MB total including music, so portals and itch.io
  browser embeds load fast.

## Audio

- Sound effects synthesised at runtime (the Spore Wars approach) so they are palette-consistent
  and cost nothing in download.
- Music as short looped OGG/MP3 tracks in the OPL/General MIDI style, one per scene family (map,
  siege, raid, tourney, court, victory, defeat) with a fanfare bank. Licensing as with Spore Wars:
  CC0 or commissioned, with a `CREDITS.txt` that the site page mirrors.

## Architecture

```
src/
  main.js          boot, canvas, scaling, input, scene stack
  rng.js           seeded PRNG
  data/            JSON tables (lords, map, units, events, ai)
  campaign/        state, turn resolver, economy, reputation, victory check
  ai/              per-lord personality planner (evaluate moves, pick one deed)
  scenes/
    map/           map view, movement, recruit panel, AI turn playback
    battle/        field battle preview + auto-resolve
    siege/         catapult
    raid/          duel
    tourney/       joust
    court/         event deck UI
    shell/         title, lord select, practice, settings, results, credits
  render/          palette, dither, sprite, bitmap font, transitions
  audio/           synth sfx, music player
  save.js          localStorage + export/import as a text code
tools/
  build.js         concatenate/minify to dist/, copy assets, stamp version
  quantise.js      palette + ordered dither for art
  balance.js       headless AI-vs-AI campaign runner for tuning
```

The **scene stack** is the key structure: the map pushes a set-piece, the set-piece pops with a
result object, the campaign applies it. Every set-piece is playable standalone from the practice
menu with fake inputs, which is also how it gets developed first.

## Save data

- Autosave every turn to `localStorage`, one slot per campaign plus a settings blob.
- Export/import as a short text code (seed + compressed action log) so a save can move between the
  browser build and the desktop build with no server.
- No accounts, no server, no analytics beyond what the portals inject.

## Headless balance runner

`tools/balance.js` runs N AI-vs-AI campaigns in Node with no rendering and prints win rates per lord,
average length, and which set-piece decided most games. This is what stops the "one port is
unlosable" problem: balance is measured, not felt.

## Desktop wrapper (for Steam and the like)

The same `dist/` folder inside **Electron** (well-trodden for HTML5 games on Steam; the Steamworks
overlay and achievements have community wrappers) or **Tauri** (smaller binary; Steam integration is
less mature). Decision deferred to the Steam milestone; nothing in the game code depends on it, and
the save format already works offline.

## Testing

- Unit tests for the turn resolver, economy and victory check (Node's built-in test runner, no deps).
- The balance runner as an integration test in CI.
- Set-piece "golden" tests: feed a scripted input sequence, assert the result object.
- Manual: a checklist per milestone in the game repo, and the unlisted `play/` link on this site for
  playtesters, exactly as Spore Wars does it.
