# Scout Camp Tracker — Roadmap

**The single source of truth for this project.** One roadmap, not one per session.
Everything else is an appendix and refers back to this file.

**Updated:** 3 August 2026 · build `756aa91` · session S03

- The status board Artifact is a **rendering of this file**, not a separate list.
- Superseded chat widgets are dead the moment this file changes; ignore them.
- Read alongside: [SYSTEM-MAP.md](SYSTEM-MAP.md) (the plans) · [ARCHITECTURE.md](ARCHITECTURE.md) (how it works) · [HANDOVER.md](HANDOVER.md) (state and history).

**Not tracked here:** packing progress, who has ticked what, meal completeness. That is the parent's job, not the app's, and not Claude's.

---

## 1 · Waiting on Mat's answer

| # | Decision | Claude's recommendation |
|---|---|---|
| Q1 | Swipe right-to-left reveals **Edit** and **Archive** | Approved already. Confirming one point: **Archive, not Delete** — nothing in this app hard-deletes, so a mistake stays recoverable. Say otherwise if a true Delete is wanted. |
| Q2 | Bulk actions via a **Select button**, not a left-to-right swipe | A swipe is invisible until you know it exists and fights the iPhone back-gesture. A Select button is discoverable and cannot fire by accident. Would add **Copy to day** at the same time. |
| Q3 | Repo tidy — `IMPORT_PLAN.md`, `open-app.html` | Commit `IMPORT_PLAN.md` (record of the inventory import); delete `open-app.html` (launcher shim, made redundant by home-screen icons). |

## 2 · Needs a proper conversation

**K1 — Camps beyond three days, and rolling this out to other people.**
Mat flagged the commercial/multi-user question. Chain to root:

1. Day 1–3 was hard-coded because this camp is three days.
2. A longer camp breaks it — **half-fixed**: the app now reads the day list from the data, so adding Day 4 in Notion is enough.
3. Another family has different days, meal slots and gear → the day list stops being a setting and becomes **per-event**.
4. Per-event needs an **event** concept the app does not have; today "SR" is only a tag on a row.
5. Another family means **their rows must never touch yours** — one shared Notion database cannot do that safely.
6. Which forces **sign-in with a real identity on every row from day one** — the standard's identity gate.

**Root:** not a "more days" problem. It is whether this stays a family tool or becomes a product — two different applications, and deciding late means a rebuild.
**Recommendation:** finish State Rally on the family version, then hold this conversation with the sign-in project as its first step.

**K2 — The sign-in project (Google).** Worth doing either way; it is what makes a lockout impossible rather than recoverable. Two decisions from Mat, ~15 minutes in Google Cloud and Vercel, then Claude writes the code.

## 3 · Observations from the data (not jobs)

| Item | Detail | Suggested |
|---|---|---|
| Stray `"Friday"` row | A Food row on Day 1 as Dinner. Also why "Friday" appears as an ingredient chip — the chips are built from Food rows. | Archive it. One tap in the app, or Claude can via the Notion connector. |
| Three compasses | "Compass" (Shared/Gear), "Ava compass" (Ava/Safety), "Mia's compass" (Mia/Safety). | Probably deliberate. Making the categories agree would let them filter together. |
| Two tents | Oztrail Genesis II 3V at 3800g (Confirmed) and a 2-person dome at 2150g (Not started). | Archive whichever is not going, so shared gear stays honest. |
| Weights nearly all blank | Only the two tents carry a weight; the app therefore shows ~0.0 kg per child. | Weigh the heavy things only — pack, bag, mat, jacket, boots. |
| Empty `Tags 1` field | Duplicate of `Tags`, unused by the app. | Delete in Notion when convenient. |

## 4 · Open, not urgent

- Delete the unsigned Cloudinary preset `Camping_Inventory` — while it exists, uploads are possible without a key. The signed path already works.
- **No-signal rehearsal** — aeroplane mode, tap dots, restore signal, watch the queue flush. The last unproven behaviour.
- **Generate the packing PDFs while in signal** — there is none at camp.
- **Lightweight hike-in sleeping gear** — open since S01. Bags under 1kg, pads under 300g. Claude can run this as a procurement pre-flight on request.

## 5 · Built and live

- Notion property mismatch fixed — the field is `Meal Verdict`, the app said `Verdict`, so every Food save was rejected. Rating a meal would still have failed.
- **Schema guard** — all 17 property names are checked against Notion on load; a rename can no longer fail silently.
- Saves send **only changed fields**; a refused save names the property Notion rejected and re-syncs the screen.
- Menu day pills **multi-select** with an All-days view; the day list is read from the data.
- Everything in the item sheet is editable — assigned to, category, day, meal, tags, prep, quantity, name inscribed.
- **Offline write queue** with an unsynced badge that cannot contradict the sync light; stuck writes drop after three refusals.
- Bug report in the header, capturing screen, filters, version, last save error and any schema mismatch.
- Packing record prints packed items only; fresh-pack reset per child or camp.
- Overview person cards tap through to that person's packing list.
- SYSTEM-MAP, ARCHITECTURE and a rewritten HANDOVER in the repo.
- Weekend field use proved the whole loop in production across three devices.

---

## Working rules for this project

- **This file is the roadmap.** Update it in place; never start a competing list. The Artifact renders it.
- **Verify before claiming.** Run the change, exercise the path, check the result — network-stubbed tests do not count as proof.
- **Never propose shared-secret auth.** OAuth by default. See the memory note.
- **Property names are load-bearing.** Renaming a Notion column breaks the app by name; the schema guard now catches it.
- Environment variable changes need a redeploy. `index.html` changes do not need a service-worker bump; changing `sw.js` or a cached asset does.
