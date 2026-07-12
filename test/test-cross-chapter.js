/* Cross-chapter checks: independent save slots, chapter-1-into-2 flow,
   and puzzle sad paths (wrong weights, ruined brew, wrong cipher). */

Game.init();

// --- start ch1, make progress, quit ---
chapterBtn("The Clockmaker's Secret", 'New Game');
adv();
hotspot('Shop counter');
hotspot('Something under the counter lip'); adv();   // brassKey
__els['zoom-close'].click();
assert(invNames().join(',') === 'Brass Key', 'ch1 progress made');
__els['btn-menu'].click();
btnByText('modal-buttons', 'Quit to title');

// --- start ch2, make different progress, check sad paths ---
chapterBtn("The Apothecary's Ledger", 'New Game');
adv();
assert(invNames().length === 0, 'ch2 starts with empty inventory despite ch1 save');
hotspot('Winch handle'); adv();

// wrong-item generic message
invClick('Winch Handle');
hotspot('Mercy Blackwood'); adv();                   // "doesn't do anything there"

// balance sad path: wrong weight sum
hotspot('Dispensary door'); adv();
hotspot('Poison cabinet');
hotspot('Cabinet doors');
puzzleAct('w16'); puzzleAct('weigh');
assert(!isHidden('puzzle'), 'cabinet stays shut on wrong weight');
puzzleAct('w16'); // take it off again
puzzleAct('w1'); puzzleAct('w4'); puzzleAct('w8');
puzzleAct('weigh'); adv();
__els['zoom-close'].click();

// study cipher sad path: wrong word (AAAAA)
invClick('Winch Handle'); hotspot('Cellar gate'); adv();
hotspot('Cellar gate'); adv();
hotspot('Study door');
puzzleAct('try');
assert(!isHidden('puzzle'), 'study door ignores AAAAA');
puzzleAct('leave');

// developer sad path: boiling ruins the brew (needs galls+vitriol first)
hotspot('Stairs up');
hotspot('Poison cabinet');
hotspot('Oak galls'); adv();
__els['zoom-close'].click();
hotspot('Workbench');
hotspot('Green vitriol'); adv();
__els['zoom-close'].click();
hotspot('Cellar gate'); adv();
hotspot('Alembic and furnace');
puzzleAct('water'); puzzleAct('boil');
assert(!isHidden('puzzle'), 'boiled brew resets, puzzle stays open');
puzzleAct('water'); puzzleAct('galls');              // wrong order -> reset
puzzleAct('water'); puzzleAct('vitriol'); puzzleAct('galls'); puzzleAct('warm');
adv();
assert(invNames().indexOf('Iron-gall Developer') >= 0, 'brew succeeds after failures');

// --- quit ch2, continue ch1: state independent and intact ---
__els['btn-menu'].click();
btnByText('modal-buttons', 'Quit to title');
chapterBtn("The Clockmaker's Secret", 'Continue');
assert(__els['scene-name'].textContent === 'The Shop Floor', 'ch1 resumes in its own scene');
assert(invNames().join(',') === 'Brass Key', 'ch1 inventory untouched by ch2 session');

// --- ch2 continue also intact ---
__els['btn-menu'].click();
btnByText('modal-buttons', 'Quit to title');
chapterBtn("The Apothecary's Ledger", 'Continue');
assert(__els['scene-name'].textContent === 'The Cellar Laboratory', 'ch2 resumes where it left off');
assert(invNames().indexOf('Iron-gall Developer') >= 0, 'ch2 inventory intact');

'OK: cross-chapter saves independent; sad paths behave';
