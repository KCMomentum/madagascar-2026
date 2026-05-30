# Madagascar 2026 — offline reisroute

Interactive, fully offline travel map for the Madagascar trip (Kilian & Karian,
28 jun – 19 jul 2026). It's a Progressive Web App (PWA): a single web page that
installs to your home screen and works with no signal once loaded.

**Live URL:** https://kcmomentum.github.io/madagascar-2026/

## Install on a phone (one-time, do it on wifi)

- **iPhone (Safari only):** open the link in Safari → Share → **Add to Home
  Screen** → Add.
- **Android (Chrome):** open the link in Chrome → ⋮ menu → **Add to Home
  screen** / **Install app** → Add.

Tapping the baobab icon opens it fullscreen. After the first load everything is
cached, so it works offline.

## Updating the map

The map is generated from the Obsidian vault, not edited here directly.

1. Edit the itinerary in the vault:
   `…/Reizen/madagascar-2026/Reisroute-data.json`
2. Publish in one command:
   ```bash
   ~/Documents/madagascar-pwa/deploy.sh
   ```
   That rebuilds the map, bumps the offline cache version, and pushes to
   GitHub Pages.

## How an update reaches the phones

There is **no push to phones** — each phone *pulls* the new version.

1. `deploy.sh` publishes the new version to the web.
2. The next time a phone **opens the app while it has internet**, the app
   detects the newer version, downloads it in the background, and shows it. Then
   it's cached offline again.

Practical rule: re-publish *before* you lose signal (or on wifi), then open the
app once on each phone while still online so it refreshes.

The thing that triggers the refresh is the cache version inside `sw.js`
(`const CACHE = '…'`). `deploy.sh` bumps it automatically every run — if you
ever edit `index.html` by hand, bump that string too, or phones keep serving the
old cached copy.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The map (generated; self-contained). |
| `manifest.json` | PWA metadata — name, icons, standalone display. |
| `sw.js` | Service worker — caches everything for offline use. |
| `icon-192/512/180.png` | Home-screen icons (baobab). |
| `icon.svg` | Source for the icons. |
| `deploy.sh` | Rebuild + publish in one command. |

## Privacy

The repo is public but lives at an unguessable `github.io` URL. The map shows
names, hotels, and dates — no passport or financial data.
