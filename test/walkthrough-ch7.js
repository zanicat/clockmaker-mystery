/* Full Chapter Seven walkthrough: the wire novelty (an enquiry costs a
   leg; answers wait at the next stop), the moving map (platform and
   footplate only reachable standing, mileposts and apparatus only while
   running), Rooke's two concessions, the four minutes, sad paths, and
   the subtraction at the finale. */

Game.init();
chapterBtn("The Guard's Watch", 'New Game');
adv(); // intro (Rooke, and the arithmetic)

// the status readout: the chapter's clock, on the topbar
assert(!isHidden('scene-status'), 'ch7 shows a status readout');
assert(__els['scene-status'].textContent.indexOf('Crewe') >= 0,
  'status opens standing at Crewe, got: ' + __els['scene-status'].textContent);

// hint ladder rung 1: the man, the man, and the book
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('book') >= 0,
  'first hint points at the journal, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- Crewe: the guard, his book, his watch, and the makings ---
hotspot('Abel Hare, guard'); adv();            // clue hareSays + the watch
assert(invNames().indexOf('Hare\'s Watch') >= 0, 'Hare hands over his watch');
hotspot('The guard\'s desk'); adv();           // journal + clue hareLog
hotspot('The guard\'s desk'); adv();           // the wire blanks
hotspot('The lamp rack'); adv();               // dark lantern
hotspot('The lamp rack'); adv();               // lamp strap
assert(labelsIn('scene-hotspots').indexOf('The brakes come on') === -1,
  'nothing to arrive at while we are standing');

// the strongroom is Rooke's until Rooke says otherwise
hotspot('The registered strongroom'); adv();
assert(isHidden('zoom'), 'the strongroom stays shut without the key');

// --- the sorting van and the corridor ---
hotspot('Forward to the sorting van'); adv();  // onEnter
hotspot('Tench, sorter'); adv();               // clue tenchLettering
hotspot('A spare pouch'); adv();
hotspot('The apparatus door'); adv();          // standing: so much ironmongery
assert(isHidden('puzzle'), 'the apparatus needs a road under it');
hotspot('Forward to the carriage');
hotspot('Inspector Rooke'); adv();             // clue rookeCase
hotspot('His dispatch case'); adv();
assert(isHidden('zoom'), 'the dispatch case stays shut at his pleasure');

// --- the footplate: only reachable from a platform ---
hotspot('Down to the platform');
hotspot('Up to the engine'); adv();            // onEnter
hotspot('Job Sherrick, driver'); adv();        // clue sherrickSlack
hotspot('The oil can'); adv();
hotspot('Down to the platform');

// --- the station clock (sad path: trusting the watch) ---
hotspot('The station clock');
assert(!isHidden('puzzle'), 'the clock comparison opens');
puzzleAct('say-1');                            // "the watch" — a man's opinion
assert(!isHidden('puzzle'), 'a wrong reading keeps the comparison open');
puzzleAct('say-0');                            // the station clock is Greenwich
puzzleAct('say-0'); adv();                     // four minutes fast -> greenwichTrue
assert(isHidden('puzzle'), 'the four minutes are established');

// --- the wire: both questions sent from Crewe, at the cost of a stop ---
hotspot('The telegraph hatch');
assert(!isHidden('puzzle'), 'the hatch takes a wire once we have blanks');
puzzleAct('wire-box');
puzzleAct('wire-office');
puzzleAct('leave');
hotspot('The telegraph hatch'); adv();
assert(!isHidden('puzzle'), 'no answer comes back at the stop it was sent from');
puzzleAct('leave');

// --- away: the first leg ---
hotspot('Aboard — the guard\'s van');

// the emptied desk still opens the book — and the book has re-annotated
// itself in red now that the four minutes are known
hotspot('The guard\'s desk');
assert(!isHidden('zoom'), 'the emptied desk still opens the journal');
hotspot('The night\'s entries'); adv();
__els['zoom-close'].click();

invClick('Dark Lantern'); invClick('Oil Can'); adv();   // combo -> lit lantern
assert(invNames().indexOf('Lantern, Lit') >= 0, 'oil and a match make a lantern');
hotspot('Tell Hare to give the right-away'); adv();
assert(__els['scene-status'].textContent.indexOf('running') >= 0,
  'status shows the train running, got: ' + __els['scene-status'].textContent);
assert(labelsIn('scene-hotspots').indexOf('Down to the platform') === -1,
  'no platform while she runs');

// --- the mileposts (sad path: calling a set watch a broken one) ---
hotspot('The window');
assert(!isHidden('puzzle'), 'the quarter-posts can be counted with a watch in hand');
for (var i = 0; i < 4; i++) puzzleAct('mark');
puzzleAct('say-1');                            // "simply a broken watch"
assert(!isHidden('puzzle'), 'a broken watch does not keep fifty-eight to the yard');
puzzleAct('say-0'); adv();                     // set, not broken -> watchOdd

hotspot('The brakes come on'); adv();          // leg 1: Warrington
assert(__els['scene-status'].textContent.indexOf('Warrington') >= 0,
  'status stands at Warrington, got: ' + __els['scene-status'].textContent);

// --- the answers, waiting one stop north ---
hotspot('Down to the platform');
hotspot('The telegraph hatch'); adv();         // clues wireBox + wireOffice
assert(invNames().indexOf('Telegraph Forms') === -1, 'the wire blanks retire once both answers are in');

// --- Rooke concedes the key ---
hotspot('Aboard — the carriage');
hotspot('Inspector Rooke'); adv();             // gate one -> the strongroom key
assert(invNames().indexOf('Strongroom Key') >= 0, 'a four-minute watch buys the strongroom');
hotspot('Back to the sorting van');
hotspot('Back to the guard\'s van');
hotspot('The registered strongroom');
assert(!isHidden('zoom'), 'the strongroom opens to its key');
assert(invNames().indexOf('Strongroom Key') === -1, 'the key retires in the lock');
hotspot('The seal on the sack'); adv();        // clue sealHonest
hotspot('The sack itself'); adv();             // ballast + clue ballastLondon
assert(invNames().indexOf('Lantern, Lit') === -1, 'the lantern retires once the sack is read');
__els['zoom-close'].click();

// --- Rooke concedes the notice ---
hotspot('Forward to the sorting van');
hotspot('Forward to the carriage');
hotspot('Inspector Rooke'); adv();             // gate two -> the dispatch case
assert(invNames().indexOf('The Ballast') === -1, 'the ballast goes to the Inspector');
hotspot('His dispatch case');
assert(!isHidden('zoom'), 'the dispatch case opens');
hotspot('The charge sheet'); adv();
hotspot('Special Traffic Notice No. 41'); adv();   // clue noticeClauses + the notice
assert(invNames().indexOf('Notice No. 41') >= 0, 'Notice No. 41 changes hands');
__els['zoom-close'].click();

// --- clause seven, reenacted (sad path: being cleverer than Tench) ---
hotspot('Back to the sorting van');
hotspot('The sorting frame');
hotspot('The orders on the bulkhead'); adv();
hotspot('The pigeonholes');
assert(!isHidden('puzzle'), 'the frame can be lettered with the notice in hand');
puzzleAct('confirm');                          // nothing lettered at all
assert(!isHidden('puzzle'), 'a frame lettered wrongly is not what Tench did');
puzzleAct('cyc-ordA');                                            // A
puzzleAct('cyc-ordB'); puzzleAct('cyc-ordB');                     // B
puzzleAct('cyc-reg'); puzzleAct('cyc-reg'); puzzleAct('cyc-reg'); // F, per clause 7
puzzleAct('confirm'); adv();                   // clue pouchRoute
assert(invNames().indexOf('Notice No. 41') === -1, 'the notice retires having confessed');
__els['zoom-close'].click();

// --- the experiment (sad path: letting go too soon) ---
invClick('Spare Pouch'); invClick('Lamp Strap'); adv();  // combo -> weighted pouch
hotspot('Back to the guard\'s van');
hotspot('Tell Hare to give the right-away'); adv();
hotspot('Forward to the sorting van');
hotspot('The apparatus door');
assert(!isHidden('puzzle'), 'the arm goes out with a road under us');
puzzleAct('go');                               // forty yards short
assert(!isHidden('puzzle'), 'a pouch let go early bounces down the ballast');
puzzleAct('wait'); puzzleAct('wait'); puzzleAct('wait');
puzzleAct('go'); adv();                        // clue apparatusProof
assert(invNames().indexOf('Weighted Pouch') === -1, 'the pouch retires into a Westmorland hedge');

// --- north: Preston, Lancaster, Penrith ---
hotspot('Back to the guard\'s van');
hotspot('The brakes come on'); adv();           // leg 2: Preston
hotspot('Tell Hare to give the right-away'); adv();
hotspot('The brakes come on'); adv();           // leg 3: Lancaster
hotspot('Tell Hare to give the right-away'); adv();
hotspot('The brakes come on'); adv();           // leg 4: Penrith
assert(__els['scene-status'].textContent.indexOf('Penrith') >= 0,
  'status stands at Penrith, got: ' + __els['scene-status'].textContent);
assert(labelsIn('scene-hotspots').indexOf('Tell Hare to give the right-away') === -1,
  'there is no ordinary next stop after Penrith');

// casebook: fifteen clues stand before the last stage
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 15,
  'expected 15 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, and tier-2 must NOT hand over the sum
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('sum') >= 0,
  'final hint points at the subtraction, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('Rooke') >= 0,
  'final hint tier-2 proposes the confrontation, got: ' + __els['modal-text'].textContent);
assert(__els['modal-text'].textContent.indexOf('2.26') === -1
  && __els['modal-text'].textContent.indexOf('Vane') === -1,
  'the final hint never does the sum or names the architect');
btnByText('modal-buttons', 'Close');

// --- the last stage, and the subtraction (sad path: a wrong sum) ---
hotspot('Away for Carlisle — the last stage'); adv();
assert(__els['scene-status'].textContent.indexOf('last stage') >= 0,
  'status shows the last stage, got: ' + __els['scene-status'].textContent);
assert(labelsIn('scene-hotspots').indexOf('The brakes come on') === -1,
  'there are no more stops after Penrith');
hotspot('Make the case to Rooke'); adv();
assert(!isHidden('puzzle'), 'the reconstruction begins');
puzzleAct('say-1');                            // 2.10 logged is not 2.10 true
assert(!isHidden('puzzle'), 'a wrong sum restarts it in front of Rooke');
puzzleAct('say-0'); puzzleAct('say-2'); puzzleAct('say-2'); puzzleAct('say-0');
puzzleAct('say-1'); adv();                     // both at 2.26 -> the end

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Guard's Watch", 'ch7 end title');
assert(!isHidden('btn-end-next'), 'ch8 is offered after ch7');
assert(__els['btn-end-next'].textContent === 'Begin Chapter Eight',
  'next button names chapter eight, got: ' + __els['btn-end-next'].textContent);
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch7 === true, 'ch7 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch7') === null, 'ch7 save cleared');
assert(invNames().length === 0,
  'every tool ends its life by the buffers, got: ' + invNames().join(', '));

'OK: ch7 walkthrough complete; the Down Mail runs empty-handed into Carlisle'
