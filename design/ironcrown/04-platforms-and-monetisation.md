# 04 — Platforms and monetisation

Spore Wars is free with portal ads. Ironcrown is a different shape: a premium, finishable game with
replay value. That points to **paid first, free demo as the funnel**. What follows is what I am
confident of about each platform; fees and policies change, so verify each before launch.

## Platform plan

| Platform | Build | Role | What it needs |
|---|---|---|---|
| **itch.io** | HTML5 (browser) and downloadable zip | First release. Paid, with a free browser demo | Store page, cover, screenshots, a trailer GIF; the HTML5 build must fit their size limits and run inside an iframe |
| **Steam** | Electron/Tauri desktop | Main revenue once the game is proven | $100 app fee per title (recouped after $1,000 in sales at the time of writing), store assets in their fixed sizes, a Windows build at minimum, achievements are optional but expected |
| **CrazyGames / Poki** | HTML5 free demo only | Discovery, not revenue. A cut-down "first four years" version with a link to the full game | Their SDKs for ads and progress; both prefer fast-loading, no-account games |
| **GOG / Epic** | Desktop | Later, if Steam shows demand | Curation applies; not a launch target |
| **640K site** | Links only | Store page mirror, credits, the unlisted playtest link | A `games/ironcrown.html` page in this repo, same template as Spore Wars |

Console and mobile stores are out of scope for the first year; the input design (one axis, one
button) keeps mobile possible later.

## Pricing hypothesis

- itch.io: **$7.99**, pay-what-you-want disabled, with a launch discount. itch.io lets the developer
  set the platform's share (default 10%); leave the default.
- Steam: **$9.99**, matching the itch price after Steam's 30% cut is considered, and a 10 to 15%
  launch discount. Steam keys can be bundled with the itch purchase, which is a standard pattern for
  small studios and rewards early itch buyers.
- The free demo everywhere: the first four years on one lord, no saving past that, results screen
  with a buy link. Demo size and content is a milestone deliverable, not an afterthought.

These are placeholders for feel. Comparable retro strategy games on itch and Steam cluster between
$5 and $15; the final price is a launch-week decision.

## What the build must do for money to work

- **Demo/full switch in data**, not in a separate codebase: one flag in the build stamps the demo.
- **No server dependency**; the browser paid build on itch runs behind their paywall with nothing
  extra from us.
- **Licensing hygiene**: every asset CC0 or owned, listed in `CREDITS.txt`, mirrored on the site
  page. This is the one thing a store takedown hangs on.
- **Save export/import** so a player who buys on itch and later on Steam does not lose a campaign.

## Marketing beats, minimal version

1. Devlog posts on itch from the first playable set-piece (the siege is the obvious first GIF).
2. A Steam "coming soon" page early, because wishlists accumulate and Steam's launch visibility is
   driven by them.
3. A short trailer cut from in-game capture, 30 to 45 seconds, over the map theme.
4. The demo on the portals a month before launch, not after.

## Revenue expectations, honestly

No numbers here would be more than guesses. The plan is built so the costs are near zero (time, the
Steam fee, any commissioned music), so the game does not need to hit a sales target to be worth
finishing. Whether to do the Steam build is the one paid decision, and it is gated on the itch
release showing real interest (see roadmap).
