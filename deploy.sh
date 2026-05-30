#!/usr/bin/env bash
# One-command update: rebuild the map from the vault, bump the offline cache,
# and publish to GitHub Pages. After running, open the app on each phone once
# WITH internet so it pulls the new version.
set -euo pipefail

VAULT="/Users/kiliancallebaut/Documents/Projects/MomentumVault/Momentum/Projects/Personal/Reizen/madagascar-2026"
REPO="$HOME/Documents/madagascar-pwa"

# 1. Rebuild Reisroute-interactief.html from Reisroute-data.json
cd "$VAULT/_build"
uv run python madagascar_interactive.py

# 2. Copy the fresh map into the site as index.html
cp "$VAULT/Reisroute-interactief.html" "$REPO/index.html"

# 3. Bump the service-worker cache version (this is what makes phones refresh)
VER="mad-$(date +%Y-%m-%d-%H%M%S)"
cd "$REPO"
sed -i '' "s/^const CACHE = .*/const CACHE = '$VER';/" sw.js

# 4. Publish
git add index.html sw.js
git commit -q -m "Update map ($VER)"
git push -q

echo "Published $VER -> https://kcmomentum.github.io/madagascar-2026/"
echo "Now open the app on each phone once WITH internet to pull the update."
