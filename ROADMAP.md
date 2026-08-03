# Scout Camp Tracker — Roadmap

**The single source of truth for this project.** One roadmap, not one per session.
Everything else is an appendix and refers back to this file.

**Updated:** 3 August 2026 · build `c44fd5e` · session S03

- The status board Artifact is a **rendering of this file**, not a separate list.
- Superseded chat widgets are dead the moment this file changes; ignore them.
- Read alongside: [SYSTEM-MAP.md](SYSTEM-MAP.md) (the plans) · [ARCHITECTURE.md](ARCHITECTURE.md) (how it works) · [HANDOVER.md](HANDOVER.md) (state and history).

**Not tracked here:** packing progress, who has ticked what, meal completeness. That is the parent's job, not the app's, and not Claude's.

---

## 1 · Waiting on Mat's answer

*Nothing outstanding.* All three questions were decided on 3 Aug and built — see section 5.

**Q1 was decided against Claude's recommendation, correctly.** Claude argued for archive-only. Mat's reasoning stands: an accidental addition must be removable without trawling through Notion, the swipe is the only sensible place for delete, the girls know what they are doing, and reset covers the end of camp. Claude's objection was also weaker than stated — Notion's delete moves the page to the workspace trash, recoverable for 30 days, so it is not destruction. **Do not re-litigate this.**

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

**Status (3 Aug):** Mat — *"Discuss following this activity."* Parked until after State Rally.

**K2 — The sign-in project (Google).** **On hold at Mat's direction (3 Aug).** Worth doing either way; it is what makes a lockout impossible rather than recoverable. Two decisions from Mat, ~15 minutes in Google Cloud and Vercel, then Claude writes the code. Do not start it unprompted.

## 3 · Observations from the data — closed by Mat, 3 Aug

All dismissed with reasons. Recorded so they are not raised again.

| Item | Mat's ruling |
|---|---|
| Stray `"Friday"` row | **Not a concern.** They eat dinner before arrival; family takeaway covers it. |
| Three compasses | **Use the delete button.** This was the case that justified Delete. |
| Two tents | **Not an issue.** The girls choose based on real conditions on the day. |
| Weights nearly all blank | **N/A for now.** |
| Empty `Tags 1` field | Explanation was too thin — see below. |

**What `Tags 1` actually is.** When the `Tags` column was built in S02, Notion also created a second column called `Tags 1` carrying the same five options (SR · JAM · ALL · 1Oak · Patrol). It is empty on every row and the app never reads or writes it — the code only knows `Tags`. It is a leftover, not a backup and not in use. The only effect is an extra empty column in the Notion table view. Deleting it changes nothing in the app; leaving it changes nothing either. Purely cosmetic, zero risk both ways.

## 4 · Open, not urgent

- Delete the unsigned Cloudinary preset `Camping_Inventory` — while it exists, uploads are possible without a key. The signed path already works.
- **No-signal rehearsal** — aeroplane mode, tap dots, restore signal, watch the queue flush. The last unproven behaviour.
- **Generate the packing PDFs while in signal** — there is none at camp.
- **Lightweight hike-in sleeping gear** — open since S01. Bags under 1kg, pads under 300g. Claude can run this as a procurement pre-flight on request.

## 5 · Built and live

**3 Aug — swipe actions, select mode, repo tidy (`c44fd5e`)**
- **Swipe a row right-to-left** to reveal **Edit · Archive · Delete**. Archive keeps the row in the database, hidden from the app. Delete sends it to the Notion trash, recoverable there for 30 days. Both confirm first. A swipe never opens the item sheet; tapping an open row closes it.
- **Select mode** — a visible *Select* button on Packing, Menu and Gear. Tick rows, then **Reset**, **Archive**, or **Copy to day** (Menu only). Deliberately a button, not a hidden left-to-right gesture.
- The **+ button hides** while a row is open or while selecting, so it can no longer cover the Delete action.
- `api/notion.js` PATCH now accepts an `archived` flag, which is how delete reaches Notion.
- Repo tidy: `IMPORT_PLAN.md` committed, `open-app.html` removed. Both revertible from git history.

**Earlier**
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
