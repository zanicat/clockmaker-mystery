/* Full Chapter Eight walkthrough: the companion novelty (one cat at
   heel, swapped at perches, gating the cat-only paths), all four
   courtships with their sad paths (wrong lure, grabbing, staring,
   bribing out of turn), the ledger inversion, the finale under the
   bell, and the emptied inventory. */

Game.init();
chapterBtn("The Ratcatcher's Nine", 'New Game');
adv(); // intro (Tansy's letter, and the town digging its own gardens)

// the status readout: the companion chip, walking alone at first
assert(!isHidden('scene-status'), 'ch8 shows a status readout');
assert(__els['scene-status'].textContent.indexOf('no cat at heel') >= 0,
  'status opens with no companion, got: ' + __els['scene-status'].textContent);

// hint rung 1 points at the client on the quay
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('quay') >= 0,
  'first hint points at the quay, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- the quay: client, gossip, claimant ---
hotspot('Tansy Pike'); adv();                    // clue theCase; she goes up to the loft
assert(labelsIn('scene-hotspots').indexOf('Tansy Pike') === -1,
  'Tansy leaves the quay once met');
hotspot('Hetty Brill, at her stall'); adv();     // clue hettySays + the sprat
assert(invNames().indexOf('A Smoked Sprat') >= 0, 'Hetty hands over the sprat');
hotspot('Silas Grebe, aboard the Bonaventure'); adv();  // clue grebeClaim
hotspot('A grey shape on the cabin roof'); adv();       // flavour only, no ledger yet
hotspot('The tide\'s woodpile'); adv();          // driftwood
assert(labelsIn('scene-hotspots').indexOf('The tide\'s woodpile') === -1,
  'the woodpile is spent');
hotspot('The lifeboat house'); adv();
assert(isHidden('zoom'), 'the boathouse stays barred without a latch-worker');

// --- Pilchard (sad paths: wrong lure, pressing, grabbing) ---
hotspot('Pilchard, at the tide-post');
assert(!isHidden('puzzle'), 'the courtship opens with the sprat in hand');
puzzleAct('off-mack');                           // fresh fish is small change
assert(!isHidden('puzzle'), 'a mackerel does not move a toll-keeper');
puzzleAct('off-sprat');
puzzleAct('pl-press');                           // pressed goods are refused goods
puzzleAct('pl-half');
puzzleAct('w-grab');                             // full reset, lesson learned
puzzleAct('off-sprat'); puzzleAct('pl-half'); puzzleAct('w-away'); adv();
assert(isHidden('puzzle'), 'Pilchard is won');
assert(invNames().indexOf('A Smoked Sprat') === -1, 'the sprat is eaten, without gratitude');
assert(__els['scene-status'].textContent.indexOf('Pilchard') >= 0,
  'status shows Pilchard at heel, got: ' + __els['scene-status'].textContent);
assert(labelsIn('scene-hotspots').indexOf('Pilchard, at the tide-post') === -1,
  'his post stands empty while he walks with me');

// --- up the Stairs: the courtiers surveyed ---
hotspot('Up the Harbour Stairs');
hotspot('Duchess, in the sail-loft window'); adv();   // duchessSeen — unlocks the cream
hotspot('Tar, up the chimney'); adv();                // cold, not hungry
hotspot('The sail loft'); adv();
hotspot('Hetty\'s cottage'); adv();
hotspot('Mrs. Mop, on the wall'); adv();

// --- Pike's loft: read what the visitor left ---
hotspot('Pike\'s loft door'); adv();             // onEnter
hotspot('Tansy Pike'); adv();                    // nothing to show her yet
hotspot('Pike\'s chair'); adv();                 // the scarf
hotspot('The rat-pole and its bell'); adv();     // the bell
hotspot('The strongbox'); adv();                 // passbook + clue
hotspot('A snag on the nail'); adv();            // scrap + clue
hotspot('The cats\' cupboard'); adv();           // the rent book + clue ledgerRiddle
hotspot('The cats\' cupboard');
assert(!isHidden('zoom'), 'the cupboard opens the rent book once taken');
hotspot('The nine columns'); adv();              // marks without a tag: no reading yet
assert(labelsIn('zoom-hotspots').indexOf('Set a door to every mark') === -1,
  'the rounds cannot be read before the tags are understood');
__els['zoom-close'].click();

// the ratter audits the floor (two visits: point, then flush)
hotspot('The pried floorboards'); adv();         // he reads the dark
hotspot('The pried floorboards'); adv();         // the oilcloth packet + clue receipts
assert(invNames().indexOf('The Oilcloth Packet') >= 0, 'the rat-run pays out');

// the stove: laid now, lit later
hotspot('The stove'); adv();                     // driftwood laid
assert(invNames().indexOf('Driftwood') === -1, 'the driftwood goes into the stove');
hotspot('The stove'); adv();                     // wants a light with conviction

// the paper finds its owner
hotspot('Tansy Pike'); adv();                    // passbook + packet read and kept
assert(invNames().indexOf('The Bank Book') === -1, 'the bank book stays with Tansy');
assert(invNames().indexOf('The Oilcloth Packet') === -1, 'the receipts stay with Tansy');

// --- the old light: the wreck, the bell, the vestas ---
hotspot('Down to the stairs');
hotspot('Up to the old light'); adv();           // onEnter
hotspot('Wick, the keeper'); adv();              // clue nineSisters
hotspot('His vesta tin'); adv();                 // storm vestas
hotspot('The harbour bell'); adv();              // clue bellOil
hotspot('The lantern gallery'); adv();           // forty feet of ladder, no climber
assert(invNames().indexOf('Winkle\'s Tag') === -1, 'the nest keeps its brass from mere people');
hotspot('Pike\'s Sunday bench'); adv();          // worn in two places
hotspot('Winkle, in the doorway'); adv();
assert(labelsIn('scene-hotspots').indexOf('Ring the nine') === -1,
  'the bell cannot be rung with the case half-made');

// --- light the stove; Tar comes home ---
hotspot('Down the cliff path');
hotspot('Pike\'s loft door');
invClick('Storm Vestas'); hotspot('The stove'); adv();   // lit — and Tar arrives
assert(invNames().indexOf('Storm Vestas') === -1, 'the vestas retire to the mantel');
hotspot('Tar, by the stove'); adv();             // Tar to heel; Pilchard back to his post
assert(__els['scene-status'].textContent.indexOf('Tar') >= 0,
  'status shows Tar at heel, got: ' + __els['scene-status'].textContent);

// Pike's things, made one
invClick('Pike\'s Scarf'); invClick('The Rat-Pole Bell'); adv();
assert(invNames().indexOf('Pike\'s Things') >= 0, 'scarf and bell knot together');

// --- the climber robs the jackdaws ---
hotspot('Down to the stairs');
assert(labelsIn('scene-hotspots').indexOf('Tar, up the chimney') === -1,
  'the chimney perch stands empty once Tar is won');
hotspot('Up to the old light');
hotspot('The lantern gallery'); adv();           // Winkle's tag, twice-stolen
assert(invNames().indexOf('Winkle\'s Tag') >= 0, 'Tar brings down the brass');

// --- the tag against the book: addresses, then the rounds ---
hotspot('Down the cliff path');
hotspot('Pike\'s loft door');
hotspot('The cats\' cupboard');
hotspot('The nine columns'); adv();              // clue tagTruth; the tag retires
assert(invNames().indexOf('Winkle\'s Tag') === -1, 'the tag has said its piece');
hotspot('Set a door to every mark');
assert(!isHidden('puzzle'), 'the rounds open to a reader who knows the alphabet');
puzzleAct('confirm');                            // nothing entered: the book rebukes
assert(!isHidden('puzzle'), 'an unread book stays unread');
puzzleAct('cyc-herring');                                                  // Hetty's door
puzzleAct('cyc-loaf'); puzzleAct('cyc-loaf');                              // the bakehouse
puzzleAct('cyc-sail'); puzzleAct('cyc-sail'); puzzleAct('cyc-sail');       // the sail loft
for (var i = 0; i < 4; i++) puzzleAct('cyc-oar');                          // the lifeboat house
for (var j = 0; j < 5; j++) puzzleAct('cyc-bellm');                        // the old light
puzzleAct('confirm'); adv();                     // clue roundsRead — gifts OUT
assert(isHidden('puzzle'), 'the rounds are read');
__els['zoom-close'].click();

// --- the quay again: cream, the ninth round, and the canvas shown ---
hotspot('Down to the stairs');
hotspot('Down to the quay');
hotspot('Hetty Brill, at her stall'); adv();     // the cream, for her ladyship
assert(invNames().indexOf('A Jug of Cream') >= 0, 'Hetty arms the diplomat');
hotspot('A grey shape on the cabin roof'); adv();       // clue catsVerdict
hotspot('Silas Grebe, aboard the Bonaventure'); adv();  // the scrap shown; he stonewalls
assert(invNames().indexOf('A Canvas Scrap') === -1, 'the canvas is shown and done');

// --- Duchess (sad paths: staring, and manners out of order) ---
hotspot('Up the Harbour Stairs');
hotspot('Duchess, in the sail-loft window');
assert(!isHidden('puzzle'), 'the audience opens with cream in hand');
puzzleAct('stare');                              // a held gaze is a duel
assert(!isHidden('puzzle'), 'staring restarts the acquaintance');
puzzleAct('sit'); puzzleAct('blink');            // flattery out of turn
puzzleAct('sit'); puzzleAct('away'); puzzleAct('blink'); puzzleAct('cream'); puzzleAct('wait');
adv();
assert(isHidden('puzzle'), 'her grace is won');
assert(invNames().indexOf('A Jug of Cream') === -1, 'the cream is taken like an apology');
assert(__els['scene-status'].textContent.indexOf('Duchess') >= 0,
  'status shows Duchess at heel, got: ' + __els['scene-status'].textContent);

// --- the latch-worker opens the boathouse ---
hotspot('Down to the quay');
hotspot('The lifeboat house'); adv();
assert(!isHidden('zoom'), 'the boathouse opens to Duchess');
hotspot('The dedication board'); adv();          // clue lifeboatGift
hotspot('Bosun, on watch'); adv();
hotspot('The lifeboat herself'); adv();
__els['zoom-close'].click();
hotspot('Hetty Brill, at her stall'); adv();     // thirty years of "Tom's club"

// --- the ninth cat: the bench, the scarf, the stillness ---
hotspot('Up the Harbour Stairs');
hotspot('Up to the old light');
hotspot('Pike\'s Sunday bench'); adv();          // the things laid, the bell stroked once
hotspot('Pike\'s Sunday bench'); adv();          // she crosses in instalments
hotspot('Pike\'s Sunday bench'); adv();          // Ha'penny, against my knee
assert(invNames().indexOf('Pike\'s Things') === -1, 'the scarf and bell are hers now');
assert(__els['scene-status'].textContent.indexOf('penny') >= 0,
  'status shows Ha’penny at heel, got: ' + __els['scene-status'].textContent);

// casebook: thirteen clues stand before the bell
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 13,
  'expected 13 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, and tier-2 must not name the ninth door
__els['btn-hint'].click();
assert(__els['modal-text'].textContent.indexOf('ninth cat') >= 0,
  'final hint gathers the case, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('Ring the Nine') >= 0,
  'final hint tier-2 proposes the bell, got: ' + __els['modal-text'].textContent);
assert(__els['modal-text'].textContent.indexOf('Grebe') === -1
  && __els['modal-text'].textContent.indexOf('Bonaventure') === -1,
  'the final hint never lands the ninth column itself');
btnByText('modal-buttons', 'Close');

// --- ring the nine; the town comes up its own cliff ---
hotspot('Ring the nine'); adv();
assert(__els['scene-status'].textContent.indexOf('gathered') >= 0,
  'status shows the town gathered, got: ' + __els['scene-status'].textContent);
assert(labelsIn('scene-hotspots').indexOf('Down the cliff path') === -1,
  'nobody leaves before it is said');

// --- the reading (sad path: a wrong reading, aloud, in company) ---
hotspot('Read the book to the town'); adv();
assert(!isHidden('puzzle'), 'the ninth column opens');
puzzleAct('say-1');                              // the club never existed
assert(!isHidden('puzzle'), 'a wrong reading restarts the book');
puzzleAct('say-0'); puzzleAct('say-1'); puzzleAct('say-2'); puzzleAct('say-2');
puzzleAct('say-2'); adv();                       // nowhere, and everywhere

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Ratcatcher's Nine", 'ch8 end title');
assert(isHidden('btn-end-next'), 'no next chapter after ch8');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch8 === true, 'ch8 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch8') === null, 'ch8 save cleared');
assert(invNames().length === 0,
  'every tool ends its life under the bell, got: ' + invNames().join(', '));

'OK: ch8 walkthrough complete; nine columns closed, nothing owed'
