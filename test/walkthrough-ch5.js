/* Full Chapter Five walkthrough: the ring topology, the four listening
   puzzles (pitch match, duct pairing, panel tapping, the vigil), the
   wind novelty (box five's gated hotspot appears only once the bellows
   are cranked), sad paths, and the guilty-client finale. */

Game.init();
chapterBtn("The Impresario's Ghost", 'New Game');
adv(); // intro (Pettibone's brief)

// hint ladder rung 1: ask the household what the wail sounds like
__els['btn-hint'].click();
assert(!isHidden('modal'), 'hint modal opens');
assert(__els['modal-text'].textContent.indexOf('SOUNDS like') >= 0,
  'first hint sends you to the witnesses, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- the house: box five keeps its dust, and its grille wants a better ear ---
hotspot('Box Five');
hotspot('The dust nobody walked'); adv();
hotspot('The grille behind the curtain'); adv();     // bare ear: wants the trumpet
assert(labelsIn('zoom-hotspots').indexOf('The stirring curtain') === -1,
  'the stirring curtain stays hidden while the house holds its breath');
__els['zoom-close'].click();

// --- the stage: Varga, the lease, and the ghost's note ---
hotspot('The pass door to the stage'); adv();        // onEnter
hotspot('Madame Celeste Varga'); adv();              // clue leaseForLife

hotspot('The practice monochord'); adv();            // -> pitchMatch puzzle
assert(!isHidden('puzzle'), 'the monochord opens');
puzzleAct('sound');                                  // sad path: string starts flat
assert(!isHidden('puzzle'), 'a flat string keeps Madame humming');
puzzleAct('tighten'); puzzleAct('tighten'); puzzleAct('tighten');
puzzleAct('sound'); adv();                           // clue vargaPitch
assert(isHidden('puzzle'), 'the notes lock and the puzzle closes');

// --- the prompter's trumpet, Madame's wax, and the combination ---
hotspot('The prompt corner'); adv();                 // crackedTrumpet
hotspot('The dressing table'); adv();                // waxStub
invClick('Cracked Ear-Trumpet'); invClick('Stub of Stage Wax');
adv();
assert(invNames().indexOf('Ear Trumpet') >= 0, 'wax seals the trumpet');
assert(invNames().indexOf('Cracked Ear-Trumpet') === -1, 'cracked trumpet consumed by the combo');

// --- back to box five with a working ear ---
hotspot('The pass door to the house');
hotspot('Box Five');
invClick('Ear Trumpet');
hotspot('The grille behind the curtain'); adv();     // clue boxFive
__els['zoom-close'].click();

// --- the understage: Wick, the five mouths, the wall that breathes ---
hotspot('The pass door to the stage');
hotspot('The trap stairs'); adv();                   // onEnter
hotspot('Wick, the limelight boy'); adv();           // clue haunting (+ wickMet)

hotspot('The duct junction'); adv();                 // bare ear: murmurs only
invClick('Ear Trumpet');
hotspot('The duct junction');                        // -> ductPairs puzzle
assert(!isHidden('puzzle'), 'the duct junction opens to the trumpet');
puzzleAct('mark');                                   // sad path: nothing heard yet
assert(!isHidden('puzzle'), 'marking blind keeps the puzzle open');
puzzleAct('listen-a'); puzzleAct('listen-b'); puzzleAct('listen-c');
puzzleAct('listen-d'); puzzleAct('listen-e');
puzzleAct('mark'); adv();                            // clue ductPath

invClick('Ear Trumpet');
hotspot('The old chapel wall'); adv();               // clue deadWall

// --- the foyer: the client, his ledger, his wainscot, his key board ---
hotspot('The steps up to the foyer'); adv();         // onEnter
hotspot('Mr. Aurelius Pettibone'); adv();            // clue hiredEar

hotspot('The manager\'s office');
hotspot('The box-office ledger'); adv();             // clue showmansGhost
hotspot('The wainscot'); adv();                      // bare ear: wants the trumpet
invClick('Ear Trumpet');
hotspot('The wainscot');                             // -> panelTap puzzle
assert(!isHidden('puzzle'), 'the wainscot opens to the trumpet');
puzzleAct('pry');                                    // sad path: pry before the wall confesses
assert(!isHidden('puzzle'), 'prying blind keeps the puzzle open');
puzzleAct('tap-3'); puzzleAct('tap-6'); puzzleAct('pry'); adv(); // railLetter + railMotive
assert(invNames().indexOf('Railway Letter') >= 0, 'the railway letter is taken');

hotspot('The key board'); adv();                     // lampKey (gated on deadWall + ductPath)
assert(invNames().indexOf('Lamp-Room Key') >= 0, 'the lamp-room key comes off the board');
__els['zoom-close'].click();

// --- the chapel room: the ghost's workshop ---
hotspot('The cellar steps');
invClick('Lamp-Room Key');
hotspot('The old chapel wall'); adv();               // chapelOpen + ghostMachine, zoom opens
assert(invNames().indexOf('Lamp-Room Key') === -1, 'key retired in the lock');
assert(!isHidden('zoom'), 'the chapel room opens');
hotspot('The one church pipe'); adv();               // organPipe
hotspot('The crank'); adv();                         // windOn: the house breathes
__els['zoom-close'].click();

// --- the wind novelty: box five's gated hotspot appears ---
hotspot('The stairs up to the stage');
hotspot('The pass door to the house');
hotspot('Box Five');
assert(labelsIn('zoom-hotspots').indexOf('The stirring curtain') >= 0,
  'the stirring curtain appears once the bellows are cranked');
hotspot('The stirring curtain'); adv();              // clue breathProof
__els['zoom-close'].click();

// --- the pipe against the lobby ---
hotspot('The doors to the foyer');
hotspot('The organ front');
invClick('Church Pipe');
hotspot('The empty socket'); adv();                  // clue pipeMatch
assert(invNames().indexOf('Church Pipe') === -1, 'pipe retired in its socket');
__els['zoom-close'].click();

// casebook: thirteen clues stand before the finale
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 13,
  'expected 13 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, and tier-2 must NOT hand over the moment
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('crank') >= 0,
  'final hint points at the hand on the crank, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('vigil') >= 0,
  'final hint tier-2 proposes the vigil, got: ' + __els['modal-text'].textContent);
assert(__els['modal-text'].textContent.indexOf('ratchet') === -1
  && __els['modal-text'].textContent.indexOf('bellows') === -1,
  'final hint never names the vigil\'s moment');
btnByText('modal-buttons', 'Close');

// --- finale: the midnight vigil ---
hotspot('The cellar steps');
assert(labelsIn('scene-hotspots').indexOf('Keep the midnight vigil') >= 0,
  'the vigil opens once every proof is in the casebook');
hotspot('Keep the midnight vigil'); adv();           // -> vigil puzzle
assert(!isHidden('puzzle'), 'the vigil begins');
puzzleAct('lanterns');                               // sad path: lanterns on mice
assert(!isHidden('puzzle'), 'a false dawn restarts the watch');
puzzleAct('wait'); puzzleAct('wait');                // the stair, then the ratchet
puzzleAct('lanterns'); adv();                        // hand on the crank -> end

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Impresario's Ghost", 'ch5 end title');
assert(!isHidden('btn-end-next'), 'ch5 offers the next chapter');
assert(__els['btn-end-next'].textContent === 'Begin Chapter Six', 'next button names chapter six');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch5 === true, 'ch5 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch5') === null, 'ch5 save cleared');
assert(invNames().join(',') === 'Railway Letter',
  'only the railway letter remains, got: ' + invNames().join(','));

'OK: ch5 walkthrough complete; inventory at end: ' + invNames().join(', ');
