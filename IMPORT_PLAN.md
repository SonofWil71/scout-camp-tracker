# Scout Camp Tracker — Import Plan (Mia = template)
**Built:** 26 Jun 2026 · **Status:** PROPOSAL — nothing written to Notion until approved
**Source:** jamborette_confirm_inventory.html (accurate per-child descriptions) reconciled against the live 23-item DB.

---

## Decisions baked in (object to any)

**1. Tag legend (short codes — saves card space on mobile)**
| Code | Means |
|---|---|
| `SR` | State Rally 2026 — hike-in, winter, weight-limited |
| `JAM` | Jamborette 2026 — car-camping |
| `ALL` | Goes to every camp |
| `1Oak` | 1st Oakville — troop uniform / branded item |
| `Patrol` | Patrol-level shared gear |

- The existing `Camp` field is renamed → **`Tags`** (multi-select, short codes). Existing rows get re-tagged in the same write.
- Legend lives in-app for now; can be promoted to a linked Notion "Tags" table later with no rework.

**2. Kits = ONE item, not many rows** (your "collective but individual" model)
- **Mess kit** = 1 item, `Contents` lists the pieces, ONE group photo. Not 7 rows.
- **Toiletry bag** = 1 item, `Contents` lists the pieces.

**3. New category: `Toiletries`** (added to Category select) — keeps filtering clean vs dumping into Gear.

**4. Weight logic for SR (hike-in):** heavy comfort gear (stretcher, foam/self-inflating mattress, the -5°C winter bag) tagged `JAM` only. Winter warmth (beanie, gloves, jacket, thermals) tagged `SR` — it's a cold camp.

---

## Cleanup actions (existing rows)
| Action | Row |
|---|---|
| 🗑 Delete | The blank/empty item row |
| 🗑 Delete | Duplicate "Mia · Tactical backpack" (the one with no tag) — keep the SR-tagged copy |

---

## MIA — full mapping

Legend: **NEW** = create row · **UPD** = update existing row · Name✓ = name inscribed

### Bag & carry
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Main backpack | Gear | SR JAM | | Camouflage backpack | UPD (was "Tactical backpack") |
| Scout hat | Clothing | 1Oak ALL | | Blue broad-brimmed Scout hat | NEW |
| First aid kit (on bag) | Safety | ALL | | Red camo kit, front of bag | NEW |
| Drink bottle | Gear | ALL | ✓ | Pink double-wall, Mia label | NEW |
| Shoe bag | Gear | ALL | | (Mia's shoe bag — large lavender bag) | NEW |
| Shoulder day bag | Gear | ALL | | TAS black canvas | NEW |
| Lavender bags ×2 (spare) | Gear | ALL | | Medium = mess bag (in use), small = spare | NEW |

### Sleeping
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Stretcher | Gear | JAM | | Wanderer Flinders Compact II — too heavy for hike | NEW |
| Sleeping bag | Gear | JAM | | Hinterland Commander -5°C — heavy; SR needs lightweight (TBD) | UPD |
| Pillow | Gear | JAM | | Pink/purple checkered | NEW |
| Poncho blanket | Clothing | JAM 1Oak | | Blue checkered — warmth + badge display | NEW |
| Towel | Gear | ALL | | Pink flamingo, aqua | NEW |
| Swim towel | Gear | JAM | | Confirm if packed | NEW |

### Warmth & weather (SR winter essentials)
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Beanie | Clothing | SR JAM | | Black | NEW |
| Gloves | Clothing | SR JAM | | Black | NEW |
| Rain poncho | Safety | SR JAM ALL | | Black self-compacting packable | NEW |
| Warm jacket | Clothing | SR JAM | | Black Crane jacket, grey liner + hood | NEW |

### Shirts & upper body
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Scout shirt | Clothing | 1Oak ALL | ✓ | Dark blue-green | NEW |
| Woggle | Clothing | 1Oak | | Brown leather | NEW |
| Activity shirt | Clothing | 1Oak | ✓ | Yellow 1st Oakville (blue/green trim) — photo best | NEW |
| Scouts fishing shirt | Clothing | 1Oak | | Two-tone blue/green | NEW |
| Extra fishing shirt | Clothing | 1Oak | | Long-sleeve multi-colour | NEW |
| Jumpers | Clothing | SR JAM | | Nike white/black zip jacket | NEW |

### Pants & lower body
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Scout pants | Clothing | 1Oak | | | NEW |
| Long pants | Clothing | SR JAM | | Army-style | NEW |
| Shorts | Clothing | JAM | | Black | NEW |
| Sleepwear / thermals | Clothing | SR JAM | | Kathmandu thermals / long tights | NEW |

### Footwear
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Enclosed shoes | Clothing | ALL | | Black/white sand-shoe runners | NEW |
| Thongs (showers) | Clothing | JAM | | | NEW |
| Reef shoes (canoeing) | Clothing | JAM | | | NEW |

### Swimwear & underwear
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Swimwear | Clothing | JAM | | Blue period swimmers | NEW |
| Underwear ×3 | Clothing | ALL | | | NEW |
| Period underwear ×2 | Clothing | ALL | | | NEW |
| Socks thick ×3 | Clothing | SR JAM | | Anko bamboo workwear | NEW |
| Socks sports ×2 | Clothing | ALL | | | NEW |

### Toiletries
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Toiletry bag (KIT) | Toiletries | ALL | | Shampoo/body wash · deodorant roll-on · toothbrush + paste · hairbrush/comb · lip balm | NEW |
| Sanitary pads — day ×3 | Toiletries | ALL | | + sanitary bags | NEW |
| Sanitary pads — night ×3 | Toiletries | ALL | | + sanitary bags | NEW |
| Dirty clothes bag | Toiletries | ALL | | Soiled-clothing bag | NEW |

### Mess kit
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Mess kit (KIT) | Gear | ALL | ✓ | Wanderer enamel plate, bowl, mug · Sea to Summit cutlery (knife, fork, spoon, teaspoon) · tea towel · PVC placemat/mug grip · in Anko packing cube | NEW |

### Lighting & day pack
| Item | Cat | Tags | Name✓ | Contents / Notes | Action |
|---|---|---|---|---|---|
| Head torch | Gear | ALL | | Black zoom-lens (= existing "Headlamp") | UPD |
| Tent lamp | Gear | SR JAM | | Green 4-wing fold-down LED | NEW |
| Battery pack | Gear | ALL | | 10,000mAh USB-C (= existing "Power bank") | UPD |
| Sunscreen | Safety | ALL | | Family sunscreen | NEW |
| Insect repellent | Safety | ALL | | Roll-on | NEW |
| Hand sanitiser | Safety | ALL | | | NEW |
| Notebook + pen | Activity | ALL | | | NEW |
| Tissues | Toiletries | ALL | | | NEW |
| Lunch box | Gear | ALL | | | NEW |
| Swimming goggles | Activity | JAM | | Confirm packed | NEW |

---

## Mat's flagged additions (apply to BOTH girls + shared)
| Item | Cat | Tags | Assigned | Notes |
|---|---|---|---|---|
| Rubbish bag (carry-out) | Safety | SR ALL | each | Take out plastics/tins — leave no trace |
| Cleaning wipes | Safety | SR ALL | each | Wipe self + cooking items, avoid food contamination |
| Spare bin liner | Gear | SR ALL | each | Wet/dirty gear |

---

## Counts (Mia only, this template)
- **NEW rows:** ~44 · **UPDATE existing:** 4 (backpack, sleeping bag, headlamp, power bank) · **Delete:** 2 cleanup
- Ava mirrors this with her own descriptions (Coleman Pilbara bag, grey beanie/gloves, etc.); Shared cooking gear already exists and gets `Contents` + tags.

---
**On approval:** I rename Camp→Tags, add Toiletries category, run the cleanup, write Mia's rows, then mirror to Ava + tag the shared gear.
