# Updating the Madagascar travel app

This repo is an offline travel PWA for Kilian & Karian's Madagascar trip
(29 Jun – 19 Jul 2026). Live: https://kcmomentum.github.io/madagascar-2026/

If the user gives you a travel update ("the Morondava pickup moved to 09:00",
"new phone number for the agent", "extra note about the Tsingy hike"), this is
how you apply it. Default to doing it — keep it small and factual; it's a real
itinerary.

## Where the content lives: `docs.json`

The app's **Reisdocumenten** tab is driven entirely by `docs.json` — a JSON
array of documents:

```json
{ "title": "Vluchten", "source": "…where it came from…", "body": "plain text…" }
```

- `body` is plain text; `\n` line breaks render as-is (it's shown in a `<pre>`).
- Existing entries to match the style of: **Vluchten** (flights), **Chauffeurs
  & contacten** (drivers), **Reisroute dag tot dag**, **Algemene reisinfo**,
  **Ervaringstips**, **Adres lokale agent**.

## How to apply an update

1. Edit `docs.json`: add to the matching entry's `body`, or add a new
   `{title, source, body}` entry. **Keep it valid JSON.**
2. Commit straight to `main` with a short message (e.g. "Chauffeurs: update
   Morondava pickup to 09:00").
3. **Do not edit `sw.js`.** A GitHub Action auto-bumps the offline cache for any
   push that doesn't touch `sw.js`, and the app loads `docs.json` network-first.

The user then opens the app on wifi and sees the change within ~1 minute.

## Do NOT

- Don't hand-edit `index.html` for content — it's generated from an Obsidian
  vault on the owner's laptop, and content edits there get overwritten on the
  next rebuild. Content goes in `docs.json`.
- Don't bump `sw.js` yourself; the Action handles it.

## If a change should be permanent

`docs.json` is regenerated from the vault by `deploy.sh` at home, so a direct
edit here is a live patch. Tell the user: "applied live — fold it into the vault
generator when you're home if you want it permanent."
