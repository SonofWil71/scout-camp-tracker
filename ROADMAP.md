# Scout Camp Tracker — Roadmap

**The single source of truth for this project.** One roadmap, not one per session.
Everything else is an appendix and refers back to this file.

**Updated:** 29 August 2026 · build `395fc28` · session S05 (first on Hawks)

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

**K3 — The tag model conflates four different things (S05, 28 Aug).** Mat: *"1st Oakville is the Scout group. A Patrol is a small section within the group. Jamborette, State Rally, Comp Camp, Hiking, Camping, Canoeing, Abseiling and more are activities, ranging from 1 day to days."* The single `Tags` multi-select currently mixes: group (`1Oak`), section (`Patrol`), activity (`SR`, `JAM`), and a catch-all (`ALL`). It also can't say whether an item is **group-provided** or **personal**, or whether it's needed *this* camp vs *this kind of* camp.

Mat's direction: **look at camp structure, not the name.** `SR` and `JAM` are named only because they are major and structurally different; an ordinary camp (one night, standing, tents supplied) doesn't get a name. A camp is a **structure profile** — nights, standing/hike, what the group supplies this time, conditions — and the app should resolve the packing pool from that. This profile is also where the itinerary/agenda and per-camp quantities live.

**Rework (Tranche 2, not started):** split `Tags` into real dimensions (group / section / activity / provision); add a Camps profile concept; then re-audit tagging once, against the corrected model. Touches K1 — do not open the multi-user question inside it.

**K4 — Per-camp quantities (S05, 28 Aug).** `Qty Needed` is a property of (item × camp), not the item. Mat: Jamborette needs ~4 of a thing where a one-nighter needs 1. His idea: **"setting up the activity base requirements"** — a per-activity baseline the app suggests and the human confirms. Mat: *"the human should be involved in the planning process. As young girls might need more because of hygiene or biology needs."* The itinerary can inform the suggestion; it is never the authority.

## 3 · Observations from the data — closed by Mat, 3 Aug

All dismissed with reasons. Recorded so they are not raised again.

| Item | Mat's ruling |
|---|---|
| Stray `"Friday"` row | **Not a concern.** They eat dinner before arrival; family takeaway covers it. |
| Three compasses | **Use the delete button.** This was the case that justified Delete. |
| Two tents | **Not an issue.** The girls choose based on real conditions on the day. |
| Weights nearly all blank | **N/A for now.** |
| Empty `Tags 1` field | Explanation was too thin — see below. |

**What `Tags 1` actually is.** When the `Tags` column was built in S02, Notion also created a second column called `Tags 1` carrying the same five options (SR · JAM · ALL · 1Oak · Patrol). It is empty on every row and the app never reads or writes it — the code only knows `Tags`. It is a leftover, not a backup and not in use. The only effect is an extra empty column in the Notion table view. Deleting it changes nothing in the app; leaving it changes nothing either. Purely cosmetic, zero risk both ways. (S05: Mat — "incidental, read the room" — left in place.)

## 3.5 · State Rally field debrief (Mat, S05, 27 Aug)

The reason S03 was closed. Mat's account of the first real use, 1–3 Aug:

- Both girls **overpacked / left gear unused**. Root cause: they weren't fully involved in the packing. They used the app and gathered gear, but Mat ended up putting things in the bags himself and running all of the food.
- **Food:** some eaten, some not — the food side worked, but it was on Mat, not the girls.
- **The app itself worked well.**
- **The real gap: the weekend's agenda wasn't known at packing time**, so packing couldn't be matched to what the camp actually needed. The Competition Camp brief exists because that agenda *is* known this time.

Net: the app proved out, but it doesn't yet close the loop between *what a camp requires* and *what goes in the bag* — that loop is K3 + K4.

## 4 · Open, not urgent

- **Reset & Save-PDF placement (S05 feedback, Mat, 28 Aug).** The fresh-pack reset sits low on the Overview page and is easy to miss on a phone — Mat missed it and asked for a manual Notion reset instead. Proposal: a **per-cell pill row inside each child's cell and the Shared cell — "Save as PDF" and "Reset"** — so every person's snapshot detail and actions live together in their own cell.
- Delete the unsigned Cloudinary preset `Camping_Inventory` — while it exists, uploads are possible without a key. The signed path already works.
- **No-signal rehearsal** — aeroplane mode, tap dots, restore signal, watch the queue flush. The last unproven behaviour.
- **Generate the packing PDFs while in signal** — there is none at camp.
- **Lightweight hike-in sleeping gear** — open since S01. Bags under 1kg, pads under 300g. Claude can run this as a procurement pre-flight on request. Note (S05): the −5 °C bags already owned are the right gear for cold standing camps; lightweight is a hike-in-only need.

## 5 · Built and live

**27–28 Aug — camp filter fix, data-driven pills (`395fc28`, session S05)**
- `matchTag()` only added `ALL`-tagged items to the `SR` and `JAM` pills. Selecting `1Oak` or `Patrol` hid ~54 basics — toiletries, first aid, head torch, core clothing. **Every camp pill now includes `ALL`-tagged items** ("needed at every activity").
- The camp pills and the Add/Edit tag chips are now **built from the tags in the data** plus a base set (`SR`/`JAM`/`1Oak`/`Patrol`), mirroring `knownDays()`. Adding an activity tag in Notion makes it appear as a pill and a chip with no code change. `ALL` stays an assignable chip, never a pill.
- Verified on the live production build by running the shipped functions against real data (the app is behind the passphrase gate, so the click-through UI check is Mat's). `SR`/`JAM` views unchanged.
- Also: `APP_VERSION` → `v5-s05`; stale `Verdict` → `Meal Verdict` fixed in `ARCHITECTURE.md` and `SYSTEM-MAP.md`.
- Notion, same session: `1Oak` added to 21 warm-layer/sleep rows so a cold troop camp has them in its pool (no removals — a tag is "relevant to", not "pack this"); Mia's mess kit brought into line with Ava's; a full fresh-pack reset for the 29–30 Aug Competition Camp.

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

## The owner's rulings — verbatim, and what they settle

Mat's own words. Where these appear, **his meaning governs.** Do not paraphrase them into something softer, and do not re-open them.

**On Delete (3 Aug), overruling Claude's archive-only recommendation:**
> *"Once [One] of the swipe directions has to be a delete and not make someone trawl through notion or another system to delete because of accidental addition.. The swipe in that place is the only place to delete. The kids know what they are doing. At the end of the camp we have the reset function. We can change the camp and item is required at. Archiving is there for later resurrection if required. This is also the first use, so we're compiling and confirming a lot of aspect through physical application and function."*

Settled: Delete lives in the swipe. Archive is for later resurrection; Delete is for genuine mistakes. **Do not re-litigate.**

**On scope (3 Aug):**
> *"Don't be concerned with how tasks are tracking. As the parent that is my role. You remain on keeping the app running as expected add detailed across our 3 session chats to get to this point. I expect consistency and reliability."*

Settled: the app is Claude's job. Packing progress is Mat's. Do not infer problems from the girls' data or report on their progress.

**On the multi-user / commercial question (1 Aug):**
> *"Problem is we need further discussion and forseeability around app function and rolling to other users - commercial application."*

Settled: this is a conversation, not a build item. Parked until after State Rally, at Mat's direction: *"Discuss following this activity."*

**On working method (1 Aug):**
> *"So you making the changes, but not reading and checking your work. Or you doing the changes and not waiting to see if errors arise."*

Settled: verify in the running app before claiming done.

**On documents (3 Aug):**
> *"Why are we drifting between various document/artefacts? I hope you're not creating multiple independent file plans/lists!"*

Settled: this file is the only list. The Artifact renders it and moves in the same turn.

## Working rules for this project

- **This file is the roadmap.** Update it in place; never start a competing list. The Artifact renders it.
- **Verify before claiming.** Run the change, exercise the path, check the result — network-stubbed tests do not count as proof.
- **Never propose shared-secret auth.** OAuth by default. See the memory note.
- **Property names are load-bearing.** Renaming a Notion column breaks the app by name; the schema guard now catches it.
- Environment variable changes need a redeploy. `index.html` changes do not need a service-worker bump; changing `sw.js` or a cached asset does.
- **A tag means "relevant to this kind of activity," not "pack this."** What actually goes in the bag is the girls' judgement on the day. Never remove a tag to try to compute a packing list; never add one expecting it to.
- **Point at what already exists before building around it.** S05: Mat asked for a reset; the app already had `resetPacking()` / `bulkReset()` from S03, but a Notion workaround was built instead of saying "tap Reset on Overview." Read the code first.
- **Hawks has no GitHub push credential** (S05). Code commits are pushed via the Mac Mini session (`gh` + keychain) unless/until `gh auth login` or a scoped token is set up on Hawks — Mat's standing-config call.
