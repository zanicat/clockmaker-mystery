/* Chapter Seven's journey is monotonic — legs only ever advance, and
   Penrith is the last stop. That makes exactly one thing dangerous: a
   player who runs the train north without doing the work could be
   stranded at the far end with no platform to ask from and no road left
   to time. This test drives that worst case deliberately.

   The two guarantees:
     1. Penrith will not let you leave until you have asked the world
        everything only a platform can ask (and the up-mail crossing
        hands up answers wired AT Penrith, so asking late is never fatal).
     2. Anything needing a running train survives into the last stage. */

Game.init();
chapterBtn("The Guard's Watch", 'New Game');
adv();

// The worst case: take the watch and the blanks, then bolt for the north
// without asking a single question.
hotspot('Abel Hare, guard'); adv();      // the watch
hotspot('The guard\'s desk'); adv();     // the journal
hotspot('The guard\'s desk'); adv();     // the wire blanks
for (var leg = 0; leg < 4; leg++) {
  hotspot('Tell Hare to give the right-away'); adv();
  hotspot('The brakes come on'); adv();
}
assert(__els['scene-status'].textContent.indexOf('Penrith') >= 0,
  'ran straight through to Penrith, got: ' + __els['scene-status'].textContent);

// Guarantee 1: Penrith holds the train rather than stranding the case.
hotspot('Away for Carlisle — the last stage'); adv();
assert(__els['scene-status'].textContent.indexOf('standing at Penrith') >= 0,
  'Penrith refuses the right-away while the world is still unasked');

// ...and everything a platform is for is still here, at the last stop.
hotspot('Down to the platform');
hotspot('The station clock');
puzzleAct('say-0'); puzzleAct('say-0'); adv();        // greenwichTrue
hotspot('Up to the engine'); adv();
hotspot('Job Sherrick, driver'); adv();               // sherrickSlack
hotspot('Down to the platform');

// The up-mail crossing: a wire sent AT Penrith is still answered at
// Penrith. Without this, asking late would be a soft-lock.
hotspot('The telegraph hatch');
puzzleAct('wire-box'); puzzleAct('wire-office'); puzzleAct('leave');
hotspot('The telegraph hatch'); adv();
assert(invNames().indexOf('Telegraph Forms') === -1,
  'the up-mail hands up answers wired at the last stop');

// Now, and only now, Penrith lets her go.
hotspot('Aboard — the guard\'s van');
hotspot('Away for Carlisle — the last stage'); adv();
assert(__els['scene-status'].textContent.indexOf('last stage') >= 0,
  'the last stage begins once the world has been asked');

// Guarantee 2: the running-only work survives into the last stage —
// there is still a road under us all the way to Carlisle.
hotspot('The window');
assert(!isHidden('puzzle'), 'the quarter-posts can still be counted on the last stage');
puzzleAct('leave');
hotspot('Forward to the sorting van'); adv();
hotspot('A spare pouch'); adv();
hotspot('The apparatus door'); adv();
assert(isHidden('puzzle'), 'an unweighted pouch is still a handkerchief');
hotspot('Back to the guard\'s van');
hotspot('The lamp rack'); adv();                      // the dark lantern
hotspot('The lamp rack'); adv();                      // the strap
invClick('Spare Pouch'); invClick('Lamp Strap'); adv();
hotspot('Forward to the sorting van');
hotspot('The apparatus door');
assert(!isHidden('puzzle'), 'the apparatus still answers on the last stage');
puzzleAct('wait'); puzzleAct('wait'); puzzleAct('wait'); puzzleAct('go'); adv();
assert(invNames().indexOf('Weighted Pouch') === -1, 'the experiment lands, twenty miles from Carlisle');

'OK: ch7 journey has no dead end; Penrith holds the train and the last stage still runs'
