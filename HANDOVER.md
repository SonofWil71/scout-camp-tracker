# Scout Camp Tracker — Session Handover
**Last updated:** 26 June 2026

---

## What was built

Full PWA scaffold — identical pattern to filament-tracker.

**Files:**
- `index.html` — complete 4-tab app (Overview / Packing / Menu / Gear)
- `api/notion.js` — GET/PATCH/POST Notion passthrough
- `sw.js` — service worker, cache key `scout-camp-v1`
- `manifest.json` — PWA, green theme (#2E7D32)
- `vercel.json` / `package.json` / `icon.svg`

**Daughters:** Mia (14) and Ava (12) — used throughout UI labels and Notion options.

**Notion database:** Scout Camp Items
- URL: https://app.notion.com/p/83786cdfab7d4102815a3c7923316b86
- NOTION_DATABASE_ID: `83786cdf-ab7d-4102-815a-3c7923316b86`
- Location: SoW Master Hub → 🎯 4. Hobbies → 🏕️ Scouts → Scout Camp Items
- Scouts hub page: https://app.notion.com/p/38a7508224fa81e79a0bdbf1734c99d2

**Deployed:** https://scout-camp-tracker.vercel.app (live)

---

## Database status — FULLY POPULATED

**24 items in DB** (as of 26 Jun 2026):

### Pre-existing (Mat added manually — updated with Camp tags + weight flags):
| Item | Assigned To | Camp | Note |
|---|---|---|---|
| Sleeping Bag (x2) | Mia / Ava | State Rally 2026 + Jamborette | ⚠️ Car-camping weight — Jamborette only |
| Self inflating mattress (x2) | Mia / Ava | State Rally 2026 + Jamborette | ⚠️ Car-camping weight — Jamborette only |
| Foam mattress Black & Silver (x2) | Mia / Ava | State Rally 2026 + Jamborette | ⚠️ Car-camping weight — Jamborette only |

### Bulk-added (Camp = State Rally 2026):
**Shared gear:** Campmaster Ultra Jet 1 stove, orange canister stabilizer, gas canisters (x2 needed), Temu nesting pot/pan kit, stove pot support/cross stand

**Mia:** Tactical backpack, power bank/phone holder, headlamp, emergency blanket, winter clothing layers, emergency whistle

**Ava:** Tactical backpack, power bank/phone holder, headlamp, emergency blanket, winter clothing layers, emergency whistle

**Activity (Shared):** Trial pack-down dry run

---

## Outstanding tasks

1. **Lightweight sleeping solution** — sleeping bags and mattresses flagged as car-camping weight. Need to source lightweight mummy bags (<1kg) and ultralight sleeping pads (<300g) for both girls for the hike-in State Rally.

2. ~~**icon-512.png**~~ — ✅ DONE. Generated opaque 512×512 PNG via macOS `qlmanage`, wired apple-touch-icon to it, cached in sw.js (v2). Deployed.

3. **Camp filter in app** — `index.html` currently has no Camp field filter. Future enhancement: add Camp selector to filter views by "State Rally 2026" / "Jamborette" / "All Camps".

4. **End-to-end test** — open https://scout-camp-tracker.vercel.app on iPhone/iPad, verify items load from Notion and status taps save back.

5. **Food/menu items** — no Food category items in DB yet. Need to add meal plan for Day 1/2/3 (Breakfast/Lunch/Dinner/Snack) for the hike-in camp.

---

## Next session start instructions

Open Claude Code from this folder:
`iCloud/Claude/Scout Camp/scout-camp-tracker/`

Read this file first. Vercel and GitHub are connected and deployed. Notion DB is fully populated. Pick up from outstanding tasks above.
