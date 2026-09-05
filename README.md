# 640K Games — studio website

The studio shopfront: plain HTML and CSS, no build step, no dependencies, no JavaScript needed.
Hosted for free on GitHub Pages. The games themselves live on portals (itch.io, CrazyGames, Poki);
this site links out to them.

## Files
```
index.html              home
games/spore-wars.html   one page per game; play links + full CC attributions (mirror of the game's CREDITS.txt)
about.html              studio, how games are made, contact (mailto only)
credits.html            studio-wide licence notes; links to each game's attributions
404.html                GitHub Pages serves this for missing pages
css/style.css           the whole look; colours are the brand palette (see Logo/README.md)
assets/logo/            copies of the brand exports — the master is the Logo repo, never edit these here
assets/spore-wars/      hangar.png (960x540, game page) and hangar-half.png (480x270, home) — the game's
                        menu_hangar.webp, cover-cropped and ordered-dithered to 512 colours. Regenerate
                        with tools/render-hero.js when the game art changes
.nojekyll               tells GitHub Pages to serve files as-is
```

## Editing
- Every page has the same header/footer block. To change the nav, change it on all five pages.
- When a game goes live on a portal: in `games/spore-wars.html`, find the `PLAY LINKS` comment,
  set the `href` and delete `aria-disabled="true"`. Add a button per portal.
- Adding a game: copy `games/spore-wars.html`, add a card on `index.html`, add a link on `credits.html`.
- Keep the credits on the game page in step with the game repo's `CREDITS.txt`.
- Images: only the SVG logos and PNGs at integer scales (`class="pixel"` gives crisp scaling).

## Preview locally
Open `index.html` in a browser, or serve the folder with any static server.

## Publish (GitHub Pages)
1. Create a repo (e.g. `Batwings91/640k-site`), push `main`.
2. Repo Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Site appears at `https://batwings91.github.io/<repo>/`. For a custom domain, add a `CNAME` file
   containing the domain and set the DNS records GitHub shows you.

Note: `404.html` uses root-absolute links (`/css/style.css`), which only work when the site is at the
domain root (custom domain, or a repo named `batwings91.github.io`). If it lives under `/<repo>/`,
prefix those links with the repo name.
