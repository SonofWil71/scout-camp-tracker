# Scout Camp Tracker — how it actually works

Plain-English mechanics of the running app, current at commit `827ec91` (6 Jul 2026).
The *plans* (screens, objects, intended behaviour) live in [SYSTEM-MAP.md](SYSTEM-MAP.md). This file is the *engine room*.

---

## The shape of it

Five files do everything. There is no framework and no build step — what is in the repo is what runs.

| File | Job |
|---|---|
| `index.html` | The entire app: markup, styling and logic in one file. |
| `api/notion.js` | Server-side go-between for the Notion database. |
| `api/sign.js` | Issues short-lived permission slips for photo uploads. |
| `sw.js` | Service worker — makes it installable and keeps it working offline. |
| `manifest.json` | Makes it behave like an app when added to a home screen. |

Hosting is Vercel, deploying automatically from the `main` branch of `SonofWil71/scout-camp-tracker`. Push to `main` and it is live within a minute or two. **Nothing depends on the Mac being switched on.**

---

## 1 · Getting in (the passphrase gate)

1. On open, the app looks for a saved passphrase on the device (browser storage, key `scoutKey`).
2. If there isn't one, it shows the lock screen and nothing loads.
3. Once entered, the passphrase is saved on that device and attached to **every** request as a header (`x-app-key`).
4. Both server routes compare that header against the `APP_KEY` value held in Vercel. No match → `401 Unauthorized`.
5. Any 401 wipes the saved passphrase and re-shows the lock screen.

**Consequences worth knowing:**
- The passphrase is checked *on the server*, so the data is genuinely protected — not just the screen.
- The value in Vercel is write-only once saved. **It cannot be read back.** If it's forgotten, the only options are reading it from a device that is still logged in, or rotating it.
- **Rotating means every device must re-enter the new value.** Changing it in Vercel does nothing until you redeploy.

> **This design is a known breach of the app-creation standard**, which requires OAuth sign-in from day one for anything that could ever reach beyond the household. Replacing it with Google sign-in is open item R1.

---

## 2 · Reading and writing the inventory (the Notion proxy)

The browser never talks to Notion, and never sees the Notion token. It talks to `api/notion.js`, which does:

- **GET** — queries the database, following pagination until every row is collected, and returns them as one list. The app then discards anything marked `Archived`.
- **PATCH** — updates one row's properties. Used by status taps, edits, photo URLs, archiving and the fresh-pack reset.
- **POST** — creates a new row. Used by Add item, Add meal and Duplicate meal.

The route also locks browser access to the app's own origin, marks itself no-index, and refuses anything without the passphrase header.

**Why a proxy at all:** the Notion token is a master key to the database. Putting it in the browser would hand it to anyone who opened developer tools. It lives only in Vercel's environment.

The token in use is a **scoped connection** ("Scout Camp") with access to this one database and minimal permissions — not the hub-wide integration it originally inherited.

---

## 3 · Never losing a change (the write queue)

This is the part that matters at a hike-in camp with no signal.

Every write goes through one function that returns one of three answers:

| Answer | Meaning | What happens |
|---|---|---|
| **ok** | Notion saved it | Done. A brief confirmation appears. |
| **offline** | The network failed | The change is stored on the device and retried later, forever. |
| **rejected** | Notion refused it | Retried up to 3 times, then dropped with a clear message telling you to redo it. |

Queued changes live in browser storage under `pendingWrites`. The header shows **"⚠︎ N unsynced"** whenever anything is waiting, and the sync label switches to **Pending** so the two indicators can never disagree.

The queue flushes automatically when the app regains signal (`online` event) and after every successful data load. Tapping the badge forces a flush; if nothing drains, it offers to discard the stuck changes.

**Why the three-way answer exists:** the original version only knew "worked" or "didn't work", so a change Notion actively rejected would retry forever and the unsynced count could never reach zero. That was a real field fault, reported 5 Jul.

---

## 4 · Photos

One pipeline serves the camera, the photo library and clipboard paste:

1. The image is resized in the browser to a maximum of 1200px and re-encoded as JPEG (quality 0.82) — this keeps uploads small enough for a weak signal.
2. It is written to the device's own database (IndexedDB, store `scout-photos`), keyed by the item's Notion page id. **The photo is visible immediately, before any network call.**
3. The app asks `api/sign.js` for a signature. That route builds a Cloudinary signature server-side; the Cloudinary secret never reaches the browser.
4. The browser uploads straight to Cloudinary using that signature.
5. The returned URL is written back to the item's `Photo URL` in Notion — which is what makes the photo appear on everyone else's device.

If any step after (2) fails, the photo is safe on the device and a `photo` job goes into the write queue; the upload is retried when signal returns.

> **Open security item:** the old *unsigned* upload preset `Camping_Inventory` still exists in Cloudinary. While it does, anyone who finds it can upload to the account without a key. The signed path above already works, so deleting the preset breaks nothing.

---

## 5 · Staying up to date on every device (the service worker)

`sw.js` (cache `scout-camp-v3`) uses two different strategies:

- **App HTML — network-first.** Always fetch the newest version when online; fall back to the cached copy when offline. This is what makes a push reach installed devices without anyone reinstalling anything.
- **Static assets (icons, manifest) — cache-first.**
- **API calls — never intercepted.** The service worker stays out of the way of `/api/`.

When a new worker takes control, the page reloads once so nobody is left on stale code.

> **Deploy rule:** changing `index.html` needs no version bump — network-first handles it. **But if you change `sw.js` itself or a cached static asset, bump the cache name** (`scout-camp-v4`, etc.) so old caches are purged.

**Historical trap:** the first service worker was cache-first with a manually bumped version. Editing `index.html` and pushing did *not* update installed devices — they served stale HTML forever. That caused the "photos sync to Notion but don't appear on other devices" bug in S02.

---

## 6 · What lives where on the device

| Store | Key | Holds |
|---|---|---|
| localStorage | `scoutKey` | The family passphrase for this device |
| localStorage | `pendingWrites` | Changes not yet accepted by Notion |
| localStorage | `f_tag`, `f_person`, `f_cat`, `f_gearcat`, `f_day` | Remembered filter choices |
| IndexedDB | `scout-photos` → `photos` | Full-size item photos, keyed by Notion page id |

Everything else — the inventory itself — is held in memory for the session and re-fetched from Notion.

---

## 7 · The settings the app cannot run without

Held in Vercel → Project → Settings → Environment Variables. **Changes only take effect after a redeploy.**

| Name | Purpose |
|---|---|
| `NOTION_TOKEN` | The scoped "Scout Camp" connection |
| `NOTION_DATABASE_ID` | Which database to read and write |
| `APP_KEY` | The family passphrase |
| `CLOUDINARY_API_KEY` | Photo uploads |
| `CLOUDINARY_API_SECRET` | Signing uploads server-side |
| `CLOUDINARY_CLOUD_NAME` | Optional; defaults to `dx11frxfp` |

**Always use the production URL** `https://scout-camp-tracker.vercel.app`. Deployment-hash URLs sit behind Vercel's own SSO and will show a login screen — that was the "lock screen" mystery of S02.

---

## 8 · The database columns the app depends on

`Item Name` (title) · `Category` · `Assigned To` · `Status` · `Day` · `Meal` · `Weight (g)` · `Qty Needed` · `Qty Packed` · `Notes` · `Archived` · `Photo URL` · `Contents` · `Name Inscribed` · `Verdict` · `Prep` · `Tags`

Renaming any of these in Notion **will silently break** the matching feature — the app looks them up by name.

**Tags:** `SR` (State Rally) · `JAM` (Jamborette) · `ALL` · `1Oak` (troop) · `Patrol`. No years, because the events recur annually. Filtering by SR or JAM also includes ALL-tagged items.
