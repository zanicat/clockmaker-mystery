# CLAUDE.md

Browser point-and-click mystery series ("The Ivy Quinn Mysteries"). Plain
HTML/CSS/JS globals — no build step, no dependencies, no npm. Script order in
`index.html` matters: art.js → art-ch2.js → sfx.js → data-ch1.js → data-ch2.js
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
  set-piece puzzle speaks it. Unclaimed: align/aim (optics), listen/tune
  (sound), navigate/plot (maps/tides), trace/follow (tracks, wires).
- **Mystery shape** — the structural twist type, not the plot. Unclaimed:
  impossible theft, alibi-breaking, guilty client, crime-that-never-was.
- **Tone & stakes** — alternate the register between chapters.
- **Sensory identity** — one palette, one recurring motif, one signature SFX.
- **Topology & cast** — both existing chapters are linear room-chains ending
  in a hidden room with a mostly-solo detective; the next should break that
  (hub-and-spoke, rooms that change state, interviewable suspects).
- **One systemic novelty** — exactly one small meta-system per chapter.

| Chapter | Verb | Twist type | Tone | Palette/motif | Topology | Novelty |
|---|---|---|---|---|---|---|
| ch1 Clockmaker's Secret | wind/mechanism | staged disappearance, no real crime | cozy, warm | brass & browns / clocks stopped at 7:15 | linear chain → hidden room | four-gear clock-lock |
| ch2 Apothecary's Ledger | weigh/brew/chemistry | frame-job; killer posed as a victim | dark, four murders | pharmacy greens & cream / labelled jars | linear chain → hidden room | evidence-chemistry chain |

Extend this table when a chapter ships.
