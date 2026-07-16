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
  set-piece puzzle speaks it. Unclaimed: trace/follow (tracks, wires).
  (Claimed: align/aim optics — ch4; listen/tune — ch5.)
- **Mystery shape** — the structural twist type, not the plot. Unclaimed:
  alibi-breaking. (Claimed: impossible theft — ch4; guilty client — ch5.)
- **Tone & stakes** — alternate the register between chapters.
- **Art signature** — declare a palette structure, light source, line
  language, signature ambient motion, and chrome accent (`--accent`
  override). Available-but-unclaimed levers: feTurbulence paper-grain /
  hand-inked wobble (needs in-browser tuning before committing); shape
  grammar & camera changes (recomposition + hotspot re-derivation — big
  enough to be a future chapter's founding identity, not a retrofit).
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

Extend this table when a chapter ships.
