/* Full Chapter Three walkthrough: hub topology, interviews, the
   day/night novelty (round trip + night-only hotspots), all puzzles
   including sad paths, and the hub finale. */

Game.init();
chapterBtn("The Botanist's Bequest", 'New Game');
adv(); // intro

// hint ladder: first rung points at Hoskins
__els['btn-hint'].click();
assert(!isHidden('modal'), 'hint modal opens');
assert(__els['modal-text'].textContent.indexOf('apron') >= 0,
  'first hint points at the gardener, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- hub: meet Hoskins, find the clock stuck ---
hotspot('Hoskins, the head gardener'); adv();      // clues: bequest + hoskinsTale
hotspot('The bloom clock');
hotspot('The mechanism'); adv();                    // stuck at DAY
__els['zoom-close'].click();

// --- potting shed: tools, packets, seed cabinet ---
hotspot('Potting shed'); adv();
hotspot('Secateurs'); adv();
hotspot('Brass winder'); adv();
hotspot('Hand trowel'); adv();
hotspot('Watering can'); adv();
hotspot('Seed packets'); adv();                     // clue
hotspot('Seed cabinet');
hotspot('The journal drawer'); adv();               // locked flavor
hotspot('Season dials');
assert(!isHidden('puzzle'), 'seed cabinet puzzle open');
puzzleAct('open');                                  // sad path: all SPRING
assert(!isHidden('puzzle'), 'wrong seasons keep the drawer shut');
puzzleAct('d1');                                    // foxglove -> SUMMER
puzzleAct('d2'); puzzleAct('d2');                   // sweet pea -> AUTUMN
puzzleAct('d3'); puzzleAct('d3'); puzzleAct('d3');  // hellebore -> WINTER
puzzleAct('open'); adv();                           // cabinetOpen
hotspot('The journal drawer'); adv();               // journal + clue
__els['zoom-close'].click();
hotspot('Back to the glasshouse');

// --- Hoskins translates; the ivy yields to Ivy ---
hotspot('Hoskins, the head gardener'); adv();       // clue: sunward
assert(labelsIn('scene-hotspots').indexOf('Glowing dots on the floor') === -1,
  'no phosphor trail hotspot outside the orchid wing');
invClick('Secateurs');
hotspot('Orchid wing door'); adv();                 // ivyCut
assert(invNames().indexOf('Secateurs') === -1, 'secateurs retired after the ivy');
hotspot('Orchid wing door'); adv();                 // -> orchidWing

// --- orchid wing by day ---
assert(labelsIn('scene-hotspots').indexOf('Glowing dots on the floor') === -1,
  'phosphor trail invisible by day');
hotspot('Miss Petronella Croft'); adv();            // clue: petronella
invClick('Garden Journal');
hotspot('Miss Petronella Croft'); adv();            // clue: bearings
hotspot('The empty plinth'); adv();                 // clue
hotspot('Cold frame'); adv();                       // lettuce
hotspot('Back to the glasshouse');

// --- repair the bloom clock; make it night; see the trail ---
hotspot('The bloom clock');
invClick('Brass Winder');
hotspot('The mechanism'); adv();                    // clockFixed + clue nocturne
assert(invNames().indexOf('Brass Winder') === -1, 'winder retired after repair');
hotspot('The mechanism'); adv();                    // -> night
__els['zoom-close'].click();
hotspot('Orchid wing door');                        // night visit
assert(labelsIn('scene-hotspots').indexOf('Glowing dots on the floor') >= 0,
  'phosphor trail appears at night');
hotspot('Glowing dots on the floor'); adv();        // clue: mossTrail
hotspot('Moonflower'); adv();
hotspot('Back to the glasshouse');
hotspot('The bloom clock');
hotspot('The mechanism'); adv();                    // -> day again
__els['zoom-close'].click();

// --- the maze ---
hotspot('Garden door to the hedge maze'); adv();
hotspot('The maze entrance');
assert(!isHidden('puzzle'), 'maze puzzle open');
puzzleAct('mv-e');                                  // sad path: ejected
assert(!isHidden('puzzle'), 'wrong turn resets, puzzle stays open');
puzzleAct('mv-w'); puzzleAct('mv-n'); puzzleAct('mv-n');
puzzleAct('mv-e'); puzzleAct('mv-s'); puzzleAct('mv-e'); adv(); // solved
hotspot('The maze entrance');                       // -> maze heart zoom
hotspot('The sundial'); adv();                      // clue: sundialKey
invClick('Hand Trowel');
hotspot('Disturbed earth'); adv();                  // mapFragment
assert(invNames().indexOf('Hand Trowel') === -1, 'trowel retired after the dig');
__els['zoom-close'].click();
hotspot('Back to the glasshouse');

// --- garden office: witness, herbarium, planting map ---
hotspot('Garden office'); adv();
hotspot('Mr. Bertram Croft'); adv();                // clue: the "burglar"
hotspot('Herbarium press'); adv();                  // herbariumPage + clue
hotspot('The master planting map');
assert(!isHidden('puzzle'), 'planting map puzzle open');
puzzleAct('cell-A1'); puzzleAct('mark'); adv();     // sad path: wrong row
assert(!isHidden('puzzle'), 'wrong bed keeps the map open');
puzzleAct('cell-R4'); puzzleAct('mark'); adv();     // Bed K
assert(invNames().indexOf('Map Fragment') === -1, 'fragment consumed by the map');
hotspot('Back to the glasshouse');

// --- finale, in the hub ---
invClick('Lettuce');
hotspot('Gladstone'); adv();                        // the burglar departs
assert(invNames().indexOf('Lettuce') === -1, 'lettuce consumed with dignity');
invClick('Herbarium Page');
hotspot('A dull aspidistra'); adv();                // leafMatched + clue foundHer
assert(invNames().indexOf('Herbarium Page') === -1, 'herbarium page retired at the match');
invClick('Watering Can');
hotspot('Rain cistern'); adv();                     // filled
invClick('Watering Can');
hotspot('A dull aspidistra'); adv();                // sad path: needs midnight

__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 15,
  'expected 15 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, context-sensitive
__els['btn-hint'].click();
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('NIGHT') >= 0,
  'final hint tier-2 says to throw the clock to night, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

hotspot('The bloom clock');
hotspot('The mechanism'); adv();                    // night
__els['zoom-close'].click();
invClick('Watering Can');
hotspot('A dull aspidistra'); adv();                // the Empress blooms -> end

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Botanist's Bequest", 'ch3 end title');
assert(isHidden('btn-end-next'), 'no next chapter after ch3');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch3 === true, 'ch3 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch3') === null, 'ch3 save cleared');
assert(invNames().join(',') === 'Garden Journal',
  'only the journal remains, got: ' + invNames().join(','));

'OK: ch3 walkthrough complete; inventory at end: ' + invNames().join(', ');
