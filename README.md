# The Ivy Quinn Mysteries

Browser point-and-click mysteries in the style of mobile escape-room games.
Plain HTML/CSS/JS — no build step, no dependencies.

Six chapters, selectable from the title screen (each with its own save slot):

1. **The Clockmaker's Secret** — clockmaker Edmund Thornfield vanishes from a
   shop bolted from the inside, every clock stopped at 7:15.
2. **The Apothecary's Ledger** — three customers of Blackwood & Daughter die
   of "weak hearts", and the prescription ledger blames a dead man.
3. **The Botanist's Bequest** — the rarest orchid in England vanishes, pot
   and all, with a fortune riding on its bloom. Nobody suspects the tortoise.
4. **The Astronomer's Star** — the Vesper diamond is stolen from a sealed,
   all-night-watched vault it could not have left. A dozen witnesses saw it
   shine till dawn.
5. **The Impresario's Ghost** — a wail out of empty, dust-sealed Box Five is
   emptying the Empress Music Hall, and the manager will pay Ivy Quinn to
   catch it — or to certify, in writing, that she can't.
6. **The Headmistress's Cup** — the Aldergate Cup leaves a locked case three
   days before Founders' Day, and the accused is twelve, silent, and
   innocent. The school's walls know the truth — in an alphabet no
   grown-up can read.

## Run it

Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

- Click things in the scene to inspect them; some open a zoom view.
- Click an inventory item to select it, then click where to use it —
  or click a second inventory item to combine the two.
  Click the item again to cancel. Right-click (or press and hold) an
  item to examine it. Items that have served their purpose are put
  away automatically.
- Click anywhere (or press Space/Enter) to advance dialogue;
  Escape closes the topmost overlay.
- **Casebook** keeps every clue and letter you've found, plus a log of
  past dialogue — nothing plot-critical is ever lost.
- **Spots** briefly highlights everything you can interact with.
- The Hint button nudges you toward the next step without solving it;
  ask for "another nudge" if you're truly stuck.
- Sound effects are synthesized in-browser; toggle them from the Menu.
- Progress auto-saves to localStorage per chapter; use Continue on the
  title screen.

## Code layout

- `js/engine.js` — chapter-agnostic engine (state, saves, rendering,
  dialogue, inventory, casebook, hints, puzzles overlay).
- `js/data-ch1.js` … `js/data-ch6.js` — one self-registering chapter each
  (`CHAPTERS.chN`): items, scenes, hotspots, puzzles, clues, hints.
- `js/art.js`, `js/art-ch2.js` … `js/art-ch6.js` — SVG scene painters and
  inventory icons.
- `js/sfx.js` — Web Audio synthesized sound effects.

## Tests

Headless regression tests (no browser needed):

```
pip install mini-racer
python3 test/run_test.py    # full walkthroughs of every chapter, saves, sad paths
python3 test/check_svg.py   # every scene/icon/puzzle render validated as XML
```
