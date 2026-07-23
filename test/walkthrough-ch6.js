/* Full Chapter Six walkthrough: the glyph-language novelty (signs seen
   in context, two mark-book validations, translations gating progress),
   the trail, conkers, the strongbox, the two broken alibis, sad paths,
   and the assembly-reading finale. */

Game.init();
chapterBtn("The Headmistress's Cup", 'New Game');
adv(); // intro (Dr. Birch)

// hint ladder rung 1: scene, accused, keys
__els['btn-hint'].click();
assert(!isHidden('modal'), 'hint modal opens');
assert(__els['modal-text'].textContent.indexOf('keys') >= 0,
  'first hint points at the case and its keys, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- the quad: the accused, the porter, and the first signs ---
hotspot('Pip Fairweather'); adv();                    // clue pipSilent
hotspot('Mrs. Motts, the porter'); adv();             // clue lampAlibi
hotspot('The chalk marks on the shrubbery'); adv();   // clue clubSigns + b1 sightings
hotspot('The pavilion door'); adv();                  // seen allClear
hotspot('The gate arch'); adv();                      // seen gates
assert(labelsIn('scene-hotspots').indexOf('Follow the trail') === -1,
  'the trail cannot be followed before page one is confirmed');

// --- the hall: the case, the note, the head, the last page-one sign ---
hotspot('The Great Hall doors'); adv();               // onEnter
assert(labelsIn('scene-hotspots').indexOf('The back stair') === -1,
  'the back stair hides until the trail is followed');
hotspot('The marks on the panelling'); adv();         // seen turnBack
hotspot('The trophy case');
hotspot('The empty case'); adv();                     // clue caseKeys
hotspot('The note pinned inside'); adv();             // forgedNote + plantedNote
__els['zoom-close'].click();
hotspot('Dr. Birch\'s study');
hotspot('Dr. Adeline Birch'); adv();                  // clue theCase
__els['zoom-close'].click();

// --- the mark-book, page one (sad path: a false pairing) ---
hotspot('Out to the quad');
hotspot('Ivy\'s bench');
assert(!isHidden('puzzle'), 'the mark-book opens');
puzzleAct('cyc-thisWay');                             // guess "danger" — wrong
puzzleAct('confirm');
assert(!isHidden('puzzle'), 'a false page keeps the book open');
puzzleAct('cyc-thisWay');                             // -> "this way"
for (var i = 0; i < 4; i++) puzzleAct('cyc-turnBack');
for (var i = 0; i < 6; i++) puzzleAct('cyc-allClear');
puzzleAct('cyc-danger');
for (var i = 0; i < 3; i++) puzzleAct('cyc-grub');
for (var i = 0; i < 5; i++) puzzleAct('cyc-gates');
puzzleAct('confirm'); adv();                          // clue bookOne, marks1Done
assert(isHidden('puzzle'), 'page one confirmed');

// --- follow the trail (sad path: losing it) ---
hotspot('Follow the trail');
assert(!isHidden('puzzle'), 'the trail opens once page one reads true');
puzzleAct('go-right');                                // arrow was on the LEFT
assert(!isHidden('puzzle'), 'a wrong fork restarts the trail');
puzzleAct('go-left'); puzzleAct('go-right'); puzzleAct('go-left');
puzzleAct('go-right'); puzzleAct('go-left'); adv();   // hatchFound + trailFound
assert(labelsIn('scene-hotspots').indexOf('Follow the trail') === -1,
  'the trail hotspot retires once the stair is found');

// --- the attics: the club wants paying ---
hotspot('The Great Hall doors');
assert(labelsIn('scene-hotspots').indexOf('The back stair') >= 0,
  'the back stair appears once the trail is followed');
hotspot('The back stair'); adv();                     // onEnter
hotspot('Inky Marlow'); adv();                        // terms: Tab + Bonaparte
hotspot('The marks on the hatch'); adv();             // seen moot/midnight/boltHole
hotspot('The club\'s slate map'); adv();              // seen carrying
hotspot('The club museum shelf'); adv();              // twine
hotspot('The society\'s strongbox'); adv();           // locked: no trust yet

// --- conkers: the yard's price (sad path: misreading the hold) ---
hotspot('The hatch down');
hotspot('Out to the quad');
hotspot('The great elm'); adv();                      // conker
hotspot('The cellar steps'); adv();                   // onEnter
hotspot('The buttery shelves'); adv();                // vinegar
hotspot('The feast corner'); adv();                   // clue feastCrumbs
hotspot('The dead furnace'); adv();                   // poker
hotspot('Up to the quad');
invClick('Conker'); invClick('Cook\'s Vinegar');      // combo -> seasoned conker
adv();
assert(invNames().indexOf('Seasoned Conker') >= 0, 'vinegar seasons the conker');
hotspot('Tab Brill, conker champion'); adv();         // challenge accepted
assert(!isHidden('puzzle'), 'the conker match begins');
puzzleAct('under');                                   // she dangles LOW: over was right
assert(!isHidden('puzzle'), 'a tangle keeps the match going');
puzzleAct('over'); puzzleAct('under'); puzzleAct('steady'); adv(); // tabBeaten
assert(invNames().indexOf('Seasoned Conker') === -1, 'the champion conker retires in glory');

// --- Bonaparte: the scribe's price ---
hotspot('The Great Hall doors');
hotspot('The bursary');
hotspot('The accounts ledger'); adv();                // clue quillNumbers
hotspot('The confiscation drawer'); adv();            // penknife
invClick('Confiscated Penknife');
hotspot('Bonaparte\'s cage'); adv();                  // mouse freed, knife retired
assert(invNames().indexOf('Bonaparte') >= 0, 'Bonaparte joins the inventory');
__els['zoom-close'].click();

hotspot('The back stair');
invClick('Bonaparte');
hotspot('Inky Marlow'); adv();                        // inkyTrust + beak/sentry/moot demo
assert(invNames().indexOf('Bonaparte') === -1, 'the emperor is restored to his scribe');

// --- the mark-book, page two ---
hotspot('The hatch down');
hotspot('Out to the quad');
hotspot('Ivy\'s bench');
assert(!isHidden('puzzle'), 'the mark-book opens at page two');
for (var i = 0; i < 2; i++) puzzleAct('cyc-beak');
for (var i = 0; i < 6; i++) puzzleAct('cyc-sentry');
for (var i = 0; i < 4; i++) puzzleAct('cyc-moot');
for (var i = 0; i < 3; i++) puzzleAct('cyc-boltHole');
puzzleAct('cyc-midnight');
for (var i = 0; i < 5; i++) puzzleAct('cyc-carrying');
puzzleAct('confirm'); adv();                          // clue bookTwo, marks2Done

// --- the strongbox (sad path: wrong answers) ---
hotspot('The Great Hall doors');
hotspot('The back stair');
hotspot('The society\'s strongbox');
assert(!isHidden('puzzle'), 'the strongbox opens its questions to a reader');
puzzleAct('open');                                    // moot/moot/moot: wrong
assert(!isHidden('puzzle'), 'wrong answers keep the box shut');
puzzleAct('dial-0');                                  // midnight
puzzleAct('dial-1'); puzzleAct('dial-1'); puzzleAct('dial-1'); // bolt-hole
puzzleAct('dial-2'); puzzleAct('dial-2'); puzzleAct('dial-2'); puzzleAct('dial-2'); // all clear
puzzleAct('open'); adv();                             // watchLog + clue watchLogFound
assert(invNames().indexOf('The Watch-Log') >= 0, 'the watch-log is recovered');

// --- the evidence chain: forgery, Pip's truth, the well ---
hotspot('The hatch down');
hotspot('Out to the quad');
hotspot('The cellar steps');
invClick('The Planted Note');
hotspot('The retired desks'); adv();                  // clue forgeryTell, note retired
assert(invNames().indexOf('The Planted Note') === -1, 'the planted note retires as evidence');
hotspot('Up to the quad');
hotspot('Pip Fairweather'); adv();                    // clue pipWatch
invClick('Furnace Poker'); invClick('Ball of Twine'); // combo -> poker on a line
adv();
invClick('Poker on a Line');
hotspot('The old well'); adv();                       // pawnTicket + replicaWell + pawnFound
assert(invNames().indexOf('Pawn Ticket No. 88') >= 0, 'the pawn ticket surfaces');
assert(invNames().indexOf('Poker on a Line') === -1, 'the grapnel retires at the well');

// casebook: sixteen clues stand before the finale
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 16,
  'expected 16 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, and tier-2 must NOT hand over the reading
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('assembly') >= 0,
  'final hint points at the assembly, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('read the log aloud') >= 0,
  'final hint tier-2 proposes the reading, got: ' + __els['modal-text'].textContent);
assert(__els['modal-text'].textContent.indexOf('sentry') === -1
  && __els['modal-text'].textContent.indexOf('gates') === -1,
  'final hint never translates the line itself');
btnByText('modal-buttons', 'Close');

// --- finale: the reading at assembly (sad path: a fumbled word) ---
hotspot('The Great Hall doors');
assert(labelsIn('scene-hotspots').indexOf('Call the school together') >= 0,
  'the assembly opens once every proof is in the casebook');
hotspot('Call the school together'); adv();           // -> finalReading
assert(!isHidden('puzzle'), 'the reading begins');
puzzleAct('say-0');                                   // "a meeting" — false reading
assert(!isHidden('puzzle'), 'a fumbled word restarts the line');
puzzleAct('say-1'); puzzleAct('say-0'); puzzleAct('say-1'); puzzleAct('say-1');
puzzleAct('say-0'); puzzleAct('say-2'); puzzleAct('say-1'); adv(); // the line lands -> end

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Headmistress's Cup", 'ch6 end title');
assert(!isHidden('btn-end-next'), 'ch6 offers the next chapter');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch6 === true, 'ch6 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch6') === null, 'ch6 save cleared');
assert(invNames().join(',') === '',
  'inventory empty at chapter end, got: ' + invNames().join(','));

'OK: ch6 walkthrough complete; inventory at end: ' + invNames().join(', ');
