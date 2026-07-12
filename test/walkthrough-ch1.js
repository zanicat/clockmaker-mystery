/* Full Chapter One walkthrough against the headless DOM stub.
   Throws on the first thing that goes wrong; returns 'OK ...' on success. */

Game.init();

// Title screen: chapter card for ch1 with a New Game button
assert(__els['chapter-list'].children.length >= 1, 'chapter list rendered');
btnByText('chapter-list', 'New Game');
adv(); // intro

// --- shop floor ---
hotspot('Front door'); adv();                    // hoursSeen + clue
hotspot('Station clock'); adv();                 // clue
hotspot('Shop counter');                          // zoom: counter
hotspot('Sales ledger'); adv();                   // clue (after dialogue)
hotspot('Something under the counter lip'); adv(); // brassKey
__els['zoom-close'].click();

invClick('Brass Key');
hotspot('Workshop door'); adv();                  // unlock + goTo workshop
assert(invNames().indexOf('Brass Key') === -1, 'brass key retired after unlocking workshop');

// --- workshop ---
adv();
hotspot('Workbench');
hotspot('Flat screwdriver'); adv();
hotspot('Cotton rag'); adv();
hotspot('Oil can'); adv();
hotspot('Oil can'); adv();
hotspot('Greasy gear'); adv();
__els['zoom-close'].click();

invClick('Greasy Gear'); invClick('Cotton Rag'); adv();  // combo -> gear2
assert(invNames().indexOf('Cotton Rag') === -1, 'rag consumed by combo');

invClick('Flat Screwdriver');
hotspot('Wooden crates'); adv();                  // cratePried
assert(invNames().indexOf('Flat Screwdriver') === -1, 'screwdriver retired after crates');
hotspot('Iron crank'); adv();
hotspot('Brass gear'); adv();                     // gear1

hotspot('Back to the shop floor');
hotspot('Display shelves');
hotspot('Alarm clock'); adv();
hotspot('Alarm clock'); adv();
hotspot('Tiny key'); adv();
__els['zoom-close'].click();

hotspot('Shop counter');
invClick('Tiny Winding Key');
hotspot('Register drawer'); adv();                // drawerOpened
hotspot('Brass gear'); adv();                     // gear4
__els['zoom-close'].click();

hotspot('Grandfather clock');
hotspot('Brass plaque'); adv();                   // clue
invClick('Tiny Winding Key');
hotspot('Pendulum door'); adv();                  // pendOpened -> tiny key retired (both locks open)
assert(invNames().indexOf('Tiny Winding Key') === -1, 'tiny key retired after both locks');
hotspot('Folded note'); adv();
hotspot('Brass gear'); adv();                     // gear3
__els['zoom-close'].click();

// examine an item via right-click path
invExamine("Edmund's Note"); adv();

// casebook: opens, tabs switch, dialogue backlog has lines
__els['btn-journal'].click();
assert(!isHidden('journal'), 'journal opens');
__els['tab-log'].click();
assert(__els['journal-body'].children.length > 0, 'dialogue backlog populated');
__els['journal-close'].click();
assert(isHidden('journal'), 'journal closes');

// --- office lock ---
hotspot('Workshop door');
hotspot('Office door'); adv();                    // officeDoorSeen -> opens clockLock zoom
assert(!isHidden('zoom'), 'clock lock zoom open');
for (var i = 0; i < 4; i++) { invClick('Brass Gear'); hotspot('Gear train'); adv(); }
invClick('Iron Crank'); hotspot('Crank boss'); adv();
hotspot('Dial');
assert(!isHidden('puzzle'), 'clock dial puzzle open');
for (var i = 0; i < 7; i++) puzzleAct('h+');      // 12 -> 7
for (var i = 0; i < 3; i++) puzzleAct('m+');      // 0 -> 15
puzzleAct('crank'); adv();                        // officeUnlocked -> office
assert(invNames().indexOf("Edmund's Note") === -1, 'note retired once office is open');

// --- office ---
adv();
hotspot('Trade card'); adv();
hotspot('Framed photograph'); adv();
hotspot('Framed certificate'); adv();
hotspot('Scattered papers'); adv();               // mabelLetter
hotspot('Iron safe');
assert(!isHidden('puzzle'), 'safe puzzle open');
puzzleAct('u1'); puzzleAct('u1');                 // 2
for (var i = 0; i < 6; i++) puzzleAct('u2');      // 6
puzzleAct('d3');                                  // 9
puzzleAct('try'); adv();                          // safeOpened
assert(invNames().indexOf("Mabel's Letter") === -1, 'mabel letter retired once safe is open');
hotspot('Sealed letter'); adv();
hotspot('Iron key'); adv();

// all 10 casebook entries should be collected by now
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 10,
  'expected 10 casebook clues, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

invClick('Iron Key');
hotspot('Trapdoor'); adv();                       // unlocked
assert(invNames().indexOf('Iron Key') === -1, 'padlock key retired after trapdoor');
hotspot('Trapdoor');                              // goTo cellar
adv();

// --- cellar ---
hotspot('Cellar wall'); adv();                    // wallListened
invClick('Iron Crank');
hotspot('Winding socket'); adv();                 // hiddenOpen -> hiddenRoom -> finale -> endChapter

// --- end screen ---
assert(!isHidden('screen-end'), 'end screen shown');
assert(invNames().join(',') === "Grimsby's Letter",
  'only the evidence remains in inventory, got: ' + invNames().join(','));
assert(__els['end-title'].textContent === 'The Silent Shop', 'end title from chapter data');
assert(__els['end-kicker'].textContent === 'Chapter One Complete', 'end kicker from chapter data');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch1 === true, 'completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch1') === null, 'ch1 save cleared');
// "Begin Chapter Two" flows straight into ch2
assert(!isHidden('btn-end-next'), 'next-chapter button shown');
assert(__els['btn-end-next'].textContent === 'Begin Chapter Two', 'button labelled from ch2 subtitle');
var endInv = invNames().join(', ');
__els['btn-end-next'].click();
adv(); // ch2 intro
assert(!isHidden('screen-game'), 'game screen active after next-chapter');
assert(__els['scene-name'].textContent === 'The Shop Floor', 'ch2 opens in the pharmacy');
assert(invNames().length === 0, 'ch2 starts with a fresh inventory');

'OK: ch1 walkthrough complete (and flowed into ch2); ch1 end inventory: ' + endInv;
