# The Clockmaker's Secret

A browser point-and-click mystery in the style of mobile escape-room games.
Plain HTML/CSS/JS — no build step, no dependencies.

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
  Click the item again to cancel. Right-click an item to examine it.
- Click anywhere to advance dialogue.
- The Hint button nudges you toward the next step without solving it;
  ask for "another nudge" if you're truly stuck.
- Progress auto-saves to localStorage; use Continue on the title screen.

## Story

Detective Ivy Quinn investigates the disappearance of clockmaker Edmund
Thornfield, who vanished from a shop bolted from the inside — with every
clock stopped at 7:15.
