# CLAUDE.md

Browser point-and-click mystery series ("The Ivy Quinn Mysteries"). Plain
HTML/CSS/JS globals — no build step, no dependencies, no npm. Script order in
`index.html` matters: art.js → art-chN.js (all) → sfx.js → data-chN.js (all)
→ engine.js → main.js.

## Architecture contract

- `js/engine.js` is **chapter-agnostic**. It only reads the active chapter `C`
  (an entry in the global `CHAPTERS` registry) and exposes the `g` API to
  content: flags, items, `say`/`narrate`, `goTo`, zooms, puzzles,
  `addClue`/`hasClue`, `retireItem`, `sfx`, `endChapter`.
- A chapter may export an optional `status(g)` → one short string, rendered
  as a chip in the topbar and re-rendered on every `setFlag`/`goTo`. It is
  for state the player must never lose track of (ch7's clock and leg).
  Chapters without one leave the slot hidden.
- Each chapter is one IIFE file (`js/data-chN.js`) that self-registers
  `CHAPTERS.chN = { id, order, title, subtitle, items, combos, scenes,
  puzzles, clues, startScene, intro, hints, end }`.
- Adding a chapter = new `data-chN.js` + painters (namespaced like `Art.chN`)
  + two script tags in `index.html`. Content must never reach into engine
  internals or another chapter's globals.

## Content rules (non-obvious)

- **Array-valued flags** (e.g. puzzle state like `balOn`, `mixSteps`): always
  `setFlag` a *fresh* array — `setFlag` is what saves and re-renders; in-place
  mutation is silently lost.
- **Item lifecycle**: every tool must end its life — consumed by a combo or
  puzzle, or `g.retireItem(id)` at its final success site (retire explicitly;
  the engine cannot tell a successful use from a rejected one). Readable
  evidence must also be registered via `g.addClue(id)` so its text survives
  in the casebook after the item is retired.
- **Puzzles**: `{ title, render(g) → html, wire(g, body, rerender), wide? }`.
  State lives in flags (so it autosaves mid-puzzle). Interactive elements must
  be `data-act` buttons — the test harness parses and clicks them.
- **Hotspots**: rects are `[x, y, w, h]` in art viewBox coords — scenes
  1600×1000, zooms 1200×800. Overlapping hotspots: later in the list renders
  on top. Keep `label` text stable; tests click hotspots by aria-label.
  Every hotspot must sit on something *painted* — scene exits especially
  (a door, path, or signpost), never a bare patch of background.
- **Maze/route puzzles**: a solution walk must never immediately reverse
  direction (the trail would retrace itself and read as an error).
- Hints are an ordered ladder: first entry whose `when(g)` is true wins;
  `nudge`/`more` may be functions of `g`.

## Art rules

- Painters return SVG strings; give gradients unique ids per painter (two
  painters can be in the DOM at once via zoom overlays).
- Reuse shared glyph helpers from `art.js`: `clockFace`, `gearGlyph`,
  `jarGlyph` (labels auto-fit their band — still prefer short labels),
  `bottleGlyph`, `paperSheet`, `stars`.
- No external assets of any kind (fonts, images, audio files). SFX are
  synthesized in `js/sfx.js`; add new voices there and call via `g.sfx(name)`.
- Ambient motion is inline SMIL (`<animate>`/`<animateTransform>` inside the
  SVG strings) — subtle opacity/position loops only; never move hotspot
  geometry.
- UI chrome colors come from CSS variables (`--accent` etc. in style.css).
  The engine stamps `data-chapter` on `<body>`; a new chapter tints its
  frame by adding one `body[data-chapter="chN"]` override block.
- Only use HTML entities listed in `test/check_svg.py`'s ENTITIES map (or
  numeric ones); anything else fails XML validation.

## Testing (no Node, no browser in this environment)

```
pip install mini-racer
python3 test/run_test.py     # full walkthroughs, saves, sad paths
python3 test/check_svg.py    # every render validated as XML
```

The DOM stub (`test/dom-stub.js`) plays the game by clicking hotspot
aria-labels, inventory item names, and puzzle `data-act` buttons. Renaming any
of those means updating the walkthrough scripts. New content must extend the
walkthroughs (and `test/dump-svg.js` for new painters) — a chapter isn't done
until a scripted playthrough completes it.

## Saves

localStorage: `clockmakers-secret-save-<chapterId>` (per-chapter),
`clockmakers-secret-meta` (completion badges), `clockmakers-secret-settings`
(mute). A one-time migration adopts the legacy `-v1` key as ch1's slot. When
changing the save schema, keep old saves loadable (missing fields default).

## Chapter design charter

Every new chapter must feel meaningfully different. Before writing
`data-chN.js`, declare all six of these and check them against the table —
no value may repeat the previous chapter's, and twist types never repeat at all:

- **Verb** — the physical thing the player's hands do all chapter; every
  set-piece puzzle speaks it. The original candidate list is now spent
  (align/aim — ch4; listen/tune — ch5; trace/follow + read/decipher — ch6;
  time/count — ch7; coax/befriend, the first creature-verb — ch8): a new
  chapter must coin a fresh verb (e.g. weigh anchors? climb? barter?).
- **Mystery shape** — the structural twist type, not the plot. Spent:
  staged disappearance, frame-job, crime-that-never-was, impossible theft,
  guilty client, alibi-breaking (ch6 broke two, one to clear and one to
  catch), the distributed crime (ch7 — every hand innocent, the guilt
  is in the arrangement), and the phantom hoard (ch8 — the hunted treasure
  was spent in secret long ago; the hunter was its last beneficiary):
  invent a new one.
- **Tone & stakes** — alternate the register between chapters.
- **Art signature** — declare a palette structure, light source, line
  language, signature ambient motion, and chrome accent (`--accent`
  override). Shape grammar & camera is now claimed (ch7: flat banded
  side-elevation cutaway, no vanishing point) — a further recomposition
  must go somewhere else again. So is moving light (ch7), and so is
  NO-source light (ch8: diffuse fog-dawn, nothing casts). Still unclaimed:
  feTurbulence paper-grain / hand-inked wobble (needs in-browser tuning
  before committing).
- **Topology & cast** — vary the map shape and NPC presence against the
  table (ch1/ch2: linear chains into a hidden room, solo; ch3: hub-and-spoke
  with interviewable characters and a finale back in the hub).
- **One systemic novelty** — exactly one small meta-system per chapter.

| Chapter | Verb | Twist type | Tone | Art signature | Topology | Novelty |
|---|---|---|---|---|---|---|
| ch1 Clockmaker's Secret | wind/mechanism | staged disappearance, no real crime | cozy, warm | warm brass lamplight; stopped-clock motif; deliberate stillness — the ticking Meridian in the finale is the chapter's only motion; brass chrome | linear chain → hidden room | four-gear clock-lock |
| ch2 Apothecary's Ledger | weigh/brew/chemistry | frame-job; killer posed as a victim | dark, four murders | cold green gaslight pools (furnace the one warm note); labelled-jar motif; bubbling/flickering ambient motion; verdigris chrome | linear chain → hidden room | evidence-chemistry chain |
| ch3 Botanist's Bequest | navigate/plot | crime-that-never-was; the "theft" was the will's own test | whimsical, sunny, no crime at all | first daylight chapter — green glass & dappled sun vs. moonlit phosphor night; butterfly/moth/firefly motion + Gladstone's blink; sky-blue chrome | hub-and-spoke, interviewable cast, finale in the hub | day/night lever (`night` flag re-renders scenes, gates hotspots) |
| ch4 Astronomer's Star | align/aim (optics) | impossible theft — a real theft made to look impossible; the watched "diamond" was a counterfeit of light | cold, hushed, wondrous — awe with an edge | deep indigo dome, one hard collimated beam through the oculus; thin-brass instrument diagrams; drifting dust-motes + a slowly rotating prismatic Star; amethyst chrome | vertical tower on a light-shaft, two-hander-with-witness cast | the beam — aiming the heliostat sets `lit_<floor>` flags that re-render that floor and gate its hotspots (multi-target, harder-difficulty: hints nudge the thinking, limited attempts, evidence synthesized across floors) |
| ch5 Impresario's Ghost | listen/tune (sound) | guilty client — the manager who hired Quinn staged the haunting himself, buying her famous failure as certification | playful-eerie gaslit ghost story that resolves warm; stakes are livelihoods, no murder | crimson velvet & gilt lit FROM BELOW (footlights/limelight up-glow); duct-grille motif; guttering flames + visible sound-ripples + slow chandelier sway; rose-crimson chrome | a ring — front-of-house and backstage circling the proscenium wall; client + two allies | the wind — cranking the hidden bellows sets `windOn`: the house breathes, scenes re-render with ripples/stirring cloth and Box Five's proof hotspot appears |
| ch6 Headmistress's Cup | trace/follow (trails, and reading a code by following context) | alibi-breaking, twice — the accused child's false alibi broken to CLEAR her; the bursar's lamp alibi broken to catch him | sunny-autumn school comedy; no murder — embezzlement, a staged theft, and a framed twelve-year-old | honey stone & slate in low gold afternoon light; chalk-glyph motif; falling leaves + circling rooks + guttering gas; conker-copper chrome | a warren — the official school plus the pupils' secret routes, unlocked by reading their signs; mixed-gender child cast + client | the glyph language — signs seen in context set `seen_*` flags, two mark-book validations (`marks1Done`/`marks2Done`) re-render every scene with pencilled translations, and the finale is read glyph by glyph |
| ch7 Guard's Watch | time/count (stopwatch, mileposts, timetables) | the distributed crime — every hand innocent; the architect never boarded and robbed a mail train by writing a schedule | taut nocturnal thriller with a real deadline and an adversary aboard; no murder — a man's liberty, and five good men used as tools | first shape-grammar break: flat banded side-elevation cutaway, no vanishing point; the light MOVES (signal lamps, station gas and sparks stream past the window strip; the one steady lamp sways); soot & steel-blue with sodium-amber, sky greying by leg; signal-green chrome | a moving corridor — four carriages linear in space, re-rendering by leg; adversary holds the evidence | the wire — an enquiry telegraphed from a platform is answered at the NEXT stop, so questions cost legs and there are five (Penrith is the last wire in England; the up-mail crossing there keeps asking late from ever being fatal) |
| ch8 Ratcatcher's Nine | coax/befriend (lure, placement, manners, warmth, stillness — the locks are animals) | the phantom hoard — the treasure everyone hunts was given away in secret over thirty years; the break-ins are real but chase nothing, and the hunter turns out to be the ninth beneficiary | warm sea-fog elegy that resolves in communal grace; no murder — a dead man's name, a niece's home, and nine cats' futures | first NO-source light: diffuse fog-dawn, nothing casts, amber windows and the cats are the only saturated notes; wet-mirror motif (the harbour repeats everything upside-down, wobbling); motion = tail-flicks, slow blinks, drifting fog banks, bobbing hulls, wheeling gulls; fog-pearl chrome | a terraced climb (quay → stairs → loft → old light) with a second, feline map laid over it — perches, rat-runs, gutters, latches — opened cat by cat; client + fishwife + keeper + adversary-at-moorings | the companion — one befriended cat follows at heel (`withCat`), is painted into every scene, and gates the cat-only paths (ratter flushes the floor-void, climber robs the nest, latch-worker opens the boathouse); the status chip is who walks with you |

Extend this table when a chapter ships.
