# Scout Camp Tracker — System Map (the plans)

**Status:** as-built, drawn 6 Jul 2026 from source at commit `827ec91`.
**Note on provenance:** this app was built before the app-creation standard required plans drawn in parallel. This map was therefore reverse-engineered from the code during the S03 inspection — the "as-built drawings" case. From here it is kept current whenever the app changes.

---

## Mission block

> ⚠️ **DRAFT — Mat to correct.** This was reconstructed from the record, not captured at build time. One line of correction from the owner makes it canon.

- **Mission:** Let Mia and Ava pack and prepare for a Scout camp themselves, from their own device, and leave a record of what they took.
- **What "done" looks like:** Both girls pack unaided from their own iPad — no parent reading a list aloud. Before leaving home signal, a per-child packing record can be printed. At camp, with no signal, the app still works and nothing they tap is lost.
- **WWWWWH**
  - **Who** — Mia (14) and Ava (12); Mat as owner/admin.
  - **What** — a gear, food and packing tracker backed by a Notion database.
  - **When** — before and during Scout camps; State Rally 2026 is the driving event.
  - **Where** — on phones and iPads, at home and at a hike-in camp with no signal.
  - **Why** — a hike-in, self-reliance camp demands careful gear and weight management, and the girls need to own their own preparation.
  - **How** — a single-file PWA on Vercel, reading and writing a Notion database through a thin server proxy.
- **Start → Destination**
  - *Start:* a paper/verbal packing process owned by the parent.
  - *Destination:* two children independently packing against their own live list, with a printable record for safety.

---

## Roots (per the standard)

| Root | Answer |
|---|---|
| Who is it for? | Family (Mat + two children). **Never outside the household.** |
| Where used? | Phone · tablet · **out of signal** |
| Where does its information come from? | A database (Notion) · photos taken on the device |
| What keeps it running? | The cloud — Vercel serverless. Nothing depends on the Mac being awake. |
| How does it stay up to date? | On open, on tab focus, and on manual refresh (↻). Sync state always visible in the header. |

**Root-system line — Notion:**
`Notion "Scout Camp Items" DB → shows as four tab views (Overview / Packing / Menu / Gear) → sorted by person then category → you can change status, edit, add, archive, photograph → jumps queue on Safety-category items being unpacked → hides archived rows and rows not matching the active camp tag → ends up back in Notion, kept indefinitely.`

**Root-system line — photos:**
`Device camera or photo library → shows as a thumbnail on the item card and full-screen on tap → one photo per item → you can add, change, delete → stored on the device (IndexedDB) and in Cloudinary, with the URL written to Notion → kept until the item is deleted or the photo replaced.`

---

## Screens and objects

### Gate — passphrase lock
Plain language: *Locks the app behind the family passphrase before any data loads.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Passphrase field + Unlock | → `localStorage.scoutKey` | Stores the key on the device and loads data. Any API 401 clears it and re-shows this screen. |

> ⚠️ **Known standard breach.** The identity gate requires OAuth sign-in from day one wherever outside-the-household access is ever possible. This app shipped with a shared passphrase. Replacement with Google sign-in is the open R1 item.

### 1 · Overview
Plain language: *At-a-glance packed %, per-child progress, alerts, the printable record and the fresh-pack reset.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Camp tag filter pills | local + `localStorage.f_tag` | Filters every screen. `SR` and `JAM` also include `ALL`-tagged items; `Everything` bypasses filtering. |
| Four stat cards | read-only | Overall %, packed count, missing count, critical-unpacked count — all within the active camp tag. |
| Person cards (Mia / Ava / Shared) | read-only + navigation | Show count, weight and % packed. **Tapping opens that person's Packing list.** |
| Packing record buttons | read-only → browser print | Builds a print-only DOM and calls `window.print()`. Prints **packed and confirmed items only**, plus a Missing section as a safety flag. |
| Fresh-pack reset buttons | → Notion (bulk) | Resets status to Not Started and qty to 0 for the chosen person within the active camp tag. Keeps photos and details. Confirms first. |
| Critical / missing alert banners | read-only + navigation | Safety-category items not packed. Tapping opens that item's sheet. |

### 2 · Packing
Plain language: *The working list — tap the dot to advance status, open a card to edit, add a photo.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Person filter pills | local + `localStorage.f_person` | All / Mia / Ava / Shared. |
| Category filter pills | local + `localStorage.f_cat` | All / Clothing / Gear / Safety / Food / Activity. |
| Status dot (tap) | → Notion | Cycles Not Started → Packed → Confirmed. Optimistic; queued if offline. Missing is set from the sheet only. |
| Item card (tap) | → opens Edit sheet | — |
| Camera button / thumbnail | → IndexedDB → Cloudinary → Notion | Adds or views the item photo. |

### 3 · Menu
Plain language: *Per-day meal plan built from food staples; slotted by meal, rated after the trip.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Day filter pills | local + `localStorage.f_day` | Day 1–3; items marked "All Days" always show. |
| Meal cards | → Notion | Grouped by meal slot: Breakfast, Morning Tea, Lunch, Afternoon Tea, Dinner, Snack. Show ingredients and prep method. |

### 4 · Gear
Plain language: *Shared kit for the patrol — everything assigned to "Shared".*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Category filter pills | local + `localStorage.f_gearcat` | All / Gear / Safety / Activity. |
| Empty state | read-only | Points at the in-app **+** button (not at Notion). |

### Add sheet (the **+** button)
Plain language: *Create a new item, or a new meal.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Name, category, assigned-to, tags, qty, contents, notes | local until submit | Category = Food switches the sheet into meal mode (day, meal slot, prep, ingredient chips, verdict). |
| Ingredient chips | derived from existing Food rows | The 24 unique food staples, de-duplicated from the per-girl rows, as a tappable palette. |
| Add to list | → Notion (POST) | Creates the row, closes, reloads. Shows a loading and an error state. |
| **Dismiss** | — | **Only ✕ or Add to list close this sheet.** Backdrop taps, the handle, and keyboard dismissal do not — this prevented half-typed input being lost. ✕ confirms first if anything has been typed. |

### Edit sheet (tap any item)
Plain language: *Change anything about an item, manage its photo, or archive it.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Item name · Notes · Contents | → Notion (PATCH) | **Editable in-app** — previously read-only, which forced a trip to Notion to fix a typo. |
| Status · Qty packed · Verdict | → Notion (PATCH) | Verdict shows for Food items only. |
| Duplicate meal to another day | → Notion (POST) | Food items only. |
| Photo: add / change / delete | → IndexedDB + Cloudinary + Notion | Delete confirms first. |
| Save | → Notion, via the write queue | Saves everything above in one PATCH. |
| Archive item | → Notion (`Archived` = true) | Removes it from every list but keeps the row in Notion. Confirms first. |
| **Dismiss** | — | Same rule as the Add sheet — ✕ or Save only. |

### Report sheet (🐞 in the header)
Plain language: *Report a problem without leaving the app.*

| Object | Data flow | Intended behaviour |
|---|---|---|
| Description box | local | Free text from the child or adult. |
| Auto-captured context | read-only | Tab, camp filter, day, all filter states, the open item, unsynced count, item count, app version, timestamp, device, viewport. |
| Send report | → native share sheet / mail | Hands off to the device share sheet, addressed to the family email. **Upgrade path:** POST to an `api/report.js` writing to a Notion "Bug reports" database. |

### Header (persistent)

| Object | Data flow | Intended behaviour |
|---|---|---|
| Unsynced badge | `localStorage.pendingWrites` | Appears only when writes are queued. Tapping tries to sync; if nothing drains, offers to discard the stuck writes. |
| Sync dot + label | derived | Syncing / Synced / **Pending** / Offline. **Never contradicts the badge** — any queued write forces Pending. |
| Refresh ↻ | → Notion (GET) | Manual reload. |

---

## Cross-cutting behaviour

- **Status colours:** blue = Not Started · orange = Packed · green = Confirmed · red = Missing.
- **Critical items:** Safety-category items that are Not Started or Missing are surfaced on the Overview and given a red edge on the card.
- **Theme:** follows the device light/dark setting, with a time-of-day fallback (dark 20:00–07:00).
- **Refresh triggers:** on load, on tab focus (throttled to 4s), on manual ↻, and after any successful queue flush.

---

## Known gaps against the standard

| Gap | Detail |
|---|---|
| Identity gate | Shared passphrase instead of OAuth. Open item R1. |
| Mission block | Reconstructed after the fact, not captured at build time. Marked DRAFT above. |
| No-signal proof | The offline queue is built and code-verified but has never been tested at genuine no-signal — the app's core use case. |
