/* Full Chapter Two walkthrough. Assumes dom-stub + all game scripts loaded. */

Game.init();
chapterBtn("The Apothecary's Ledger", 'New Game');
adv(); // intro

// hint ladder: first rung points at Mercy
__els['btn-hint'].click();
assert(!isHidden('modal'), 'hint modal opens');
assert(__els['modal-text'].textContent.indexOf('client') >= 0,
  'first hint mentions the client, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- shop floor ---
hotspot('Mercy Blackwood'); adv();               // clue: victims
hotspot('Counter and ledger stand');              // zoom: ledger stand
hotspot('Prescription book'); adv();              // clue: ledgerEntries
hotspot('Beneath the stand'); adv();              // magnifier
invClick('Brass Magnifier');
hotspot('Prescription book'); adv();              // clue: alteredEntries
__els['zoom-close'].click();

hotspot('Remedy shelves');
hotspot('Shelf inscription'); adv();              // clue: shelfJars
hotspot('A stray vial'); adv();                   // emptyVial
__els['zoom-close'].click();

hotspot('Winch handle'); adv();                   // windlassHandle
hotspot('Dispensary door'); adv();                // -> dispensary, onEnter

// --- dispensary ---
hotspot('Poison cabinet');                        // zoom: cabinet
hotspot('Brass riddle plate'); adv();             // clue: riddle
hotspot('Cabinet doors');                         // balance puzzle
assert(!isHidden('puzzle'), 'balance puzzle open');
puzzleAct('w1'); puzzleAct('w4'); puzzleAct('w8'); // 13 = 1+4+8
puzzleAct('weigh'); adv();                        // cabinetOpen
hotspot('Digitalis jar'); adv();                  // clue: emptyJar
invClick('Empty Vial');
hotspot('Digitalis jar'); adv();                  // jarScrapings
assert(invNames().indexOf('Empty Vial') === -1, 'vial consumed into scrapings');
hotspot('Oak galls'); adv();
hotspot('Loose page'); adv();
__els['zoom-close'].click();

hotspot('Workbench');
hotspot('Green vitriol'); adv();
hotspot('Camel-hair brush'); adv();
__els['zoom-close'].click();

invClick('Winch Handle');
hotspot('Cellar gate'); adv();                    // gateOpen
assert(invNames().indexOf('Winch Handle') === -1, 'winch handle retired after gate');
hotspot('Cellar gate'); adv();                    // -> cellarLab, onEnter

// --- cellar laboratory ---
// hint ladder mid-game: should point at the developer brew, second tier at the order
__els['btn-hint'].click();
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('recipe card') >= 0,
  'developer hint tier-2 points at the recipe card, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

hotspot('Reagent shelf'); adv();                  // clue: inkRecipe
hotspot('Alembic and furnace');
assert(!isHidden('puzzle'), 'developer puzzle open');
puzzleAct('water'); puzzleAct('vitriol'); puzzleAct('galls'); puzzleAct('warm');
adv();                                            // developer made
assert(invNames().indexOf('Oak Galls') === -1, 'galls consumed');
assert(invNames().indexOf('Green Vitriol') === -1, 'vitriol consumed');
assert(invNames().indexOf('Iron-gall Developer') >= 0, 'developer vial gained');

invClick('Camel-hair Brush'); invClick('Iron-gall Developer'); adv(); // -> loaded brush
invClick('Loaded Brush'); invClick('Blank Notebook Page'); adv();     // hidden message
assert(invNames().indexOf('Blank Notebook Page') === -1, 'page consumed at reveal');

hotspot('Study door');
assert(!isHidden('puzzle'), 'letter-dial puzzle open');
// M E R C Y = 12 4 17 2 24
for (var i = 0; i < 12; i++) puzzleAct('u0');
for (var i = 0; i < 4; i++) puzzleAct('u1');
for (var i = 0; i < 9; i++) puzzleAct('d2');      // 26-9 = 17 -> R
puzzleAct('u3'); puzzleAct('u3');
puzzleAct('d4'); puzzleAct('d4');                  // 26-2 = 24 -> Y
puzzleAct('try'); adv();                           // studyUnlocked
hotspot('Study door'); adv();                      // -> study, onEnter

// --- the study ---
hotspot("Coroner's findings"); adv();
invClick('Brass Magnifier');
hotspot("Coroner's findings"); adv();              // clue: handwriting
assert(invNames().indexOf('Brass Magnifier') === -1, 'magnifier retired after comparison');
hotspot('Duplicate prescription book'); adv();     // clue: duplicateBook
hotspot('Method card'); adv();                     // clue: recipe
hotspot('Desk drawer'); adv();                     // sealRing
hotspot('A letter under the blotter'); adv();      // blackmailLetter + clue
hotspot('Side table'); adv();                      // tonicBottle + clue

invClick("Josiah's Seal Ring");
hotspot('Bookcase'); adv();                        // bookcaseOpen -> compoundingRoom
assert(invNames().indexOf("Josiah's Seal Ring") === -1, 'seal ring retired at bookcase');
adv();                                             // onEnter cutscene

// --- the compounding room ---
hotspot("Josiah's last letter"); adv();            // clue: lastLetter

__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 14,
  'expected 14 casebook clues, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

hotspot('The proof bench');
assert(!isHidden('puzzle'), 'proof puzzle open');
puzzleAct('scrapings'); puzzleAct('acid'); puzzleAct('warm'); puzzleAct('tonic');
adv();                                             // finale -> end screen

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Apothecary's Ledger", 'ch2 end title');
assert(isHidden('btn-end-next'), 'no next chapter after ch2');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch2 === true, 'ch2 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch2') === null, 'ch2 save cleared');
assert(invNames().join(',') === "Blackmail Letter,Marsh's Tonic",
  'only evidence remains, got: ' + invNames().join(','));

'OK: ch2 walkthrough complete; inventory at end: ' + invNames().join(', ');
