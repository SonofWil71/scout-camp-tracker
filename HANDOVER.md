# Scout Camp Tracker — Handover

**Last updated:** 6 July 2026 · commit `827ec91` · session S03
**Previous version of this file was stale (26 Jun) and has been replaced.**

---

## Read these first

1. [SYSTEM-MAP.md](SYSTEM-MAP.md) — the plans: every screen, every object, what it is supposed to do, and the Mission block.
2. [ARCHITECTURE.md](ARCHITECTURE.md) — how the gate, the Notion proxy, the write queue, photos and the service worker actually work.
3. This file — current state and what is outstanding.

Open Claude Code from `iCloud/Claude/Scout Camp/scout-camp-tracker/`.

---

## What this is

A PWA that lets Mia (14) and Ava (12) pack and prepare for Scout camps from their own device, backed by a Notion database. Driving event: **State Rally 2026** — a hike-in, self-reliance camp with **no phone signal**.

- **Live:** https://scout-camp-tracker.vercel.app *(always use this URL — never a deployment-hash URL)*
- **Repo:** `SonofWil71/scout-camp-tracker`, branch `main`, auto-deploys to Vercel
- **Notion DB:** Scout Camp Items — `83786cdf-ab7d-4102-815a-3c7923316b86`
- **Scouts hub:** https://app.notion.com/p/38a7508224fa81e79a0bdbf1734c99d2

---

## Current state

**Inventory:** ~174 active rows. Under the `SR` tag: Mia 43 · Ava 42 · Shared 11 = 96 items. Includes ~48 food staples (24 × 2 children) used as an ingredient palette, and the Oztrail Genesis II 3V tent.

**Working and verified:**
- Four tabs (Overview / Packing / Menu / Gear) with a camp-tag filter across all of them
- Read and write to Notion; status cycling; quantities; verdicts
- Add items and meals in-app; meal builder with ingredient chips; duplicate a meal to another day
- **Edit** name, notes and contents in-app; **archive** an item in-app
- Photos: camera, photo library and clipboard paste → device → Cloudinary → Notion, visible on all devices
- **Offline write queue** with an unsynced badge and automatic flush on reconnect
- Packing-record PDF via browser print — **packed items only**, plus a Missing section
- Fresh-pack reset per child or camp, keeping photos and details
- In-app bug report (🐞 in the header) capturing screen, filters, version and device

**Security posture:**
- Passphrase gate on both API routes; no-index; CORS locked to the production origin
- Signed Cloudinary uploads; the secret never reaches the browser
- Scoped Notion connection ("Scout Camp"), database-only, minimal permissions
- The passphrase was rotated on 6 Jul 2026 and is held only by Mat

---

## Outstanding — in priority order

### Blocked on Mat (nobody else can do these)
1. **Devices** — confirm the new passphrase has been entered on **Ava's iPad** (Mia's believed done); confirm each home-screen icon opens the production URL and each device is on build `827ec91` (🐞 Report in the header, › chevron on person cards).
2. **Acceptance test** — watch one child pack one item end to end.
3. **R5 proof** — confirm the tent shows under Gear → Shared with the `SR` filter on. This proves the scoped token reads the database and closes R5.
4. **Cloudinary** — delete the unsigned preset `Camping_Inventory` (open security item since 27 Jun; the signed path already works, so deleting breaks nothing).
5. **OAuth (R1)** — create a Google OAuth client, add the credentials to Vercel. Two decisions needed first: *Gmail-as-lock vs per-user identity*, and *where the allow-list lives*.
6. **Notion tidy** — delete the leftover empty `Tags 1` field; refine tags per event.
7. **Untracked files** — decide keep / commit / delete for `IMPORT_PLAN.md` and `open-app.html`.

### Needs field testing (built, code-verified, never proven in use)
- **Offline queue at genuine no-signal** — the camp-critical one. Airplane mode → tap several status dots → badge counts up → signal back → badge flushes to zero.
- In-app edit · archive · fresh-pack reset · photo-delete confirm · the stuck-queue fix.

### Pre-camp
- Generate the packing PDFs **while still in signal**.
- Source lightweight hike-in sleeping gear — open since S01. Current bags and mats are car-camping weight. Target: bags under 1kg, pads under 300g.
- Confirm real day-by-day meals are built, not just staples loaded.

---

## Standing rules for this project

- **Never propose a shared-secret or passphrase gate for Mat's apps.** He asked for Google sign-in from the start; the passphrase was the wrong call and caused a live lockout. Default to OAuth.
- **Never suggest reading a secret back out of Vercel.** Sensitive environment variables are write-only once saved. If one is lost: read it from a still-logged-in device, or rotate.
- **Environment variable changes require a redeploy** to take effect.
- **Service worker:** `index.html` changes need no version bump (network-first). Changing `sw.js` or a cached asset **does** — bump the cache name.
- **Separate rows per child**, never multi-assign. Kits are one row with a `Contents` list and one photo.
- Food staples stay untagged and un-slotted — they are an ingredient palette, not meals.

---

## History

- **S01** (25–26 Jun) — scaffold, Notion DB, deploy, 24 seed items.
- **S02** (26–27 Jun, 30 Jun) — full inventory import; photo cloud sync; service worker rewritten network-first; meals and meal builder; camp tag filter; security pass (passphrase gate, signed uploads, no-index, CORS); packing-record PDF; scoped Notion connection.
- **S03** (5–6 Jul) — `/app-renovate` inspection → rectification brief → built: in-app edit, offline write queue, bug report, fresh-pack reset, PDF trimmed to packed-only, photo-delete confirm, archive, persisted filters. Then four field bugs fixed: stuck queue, contradictory sync state, dead person-card taps, image paste. Passphrase lockout hit and resolved by rotation. QA/QC board run with ownership assigned. These three documents written.
