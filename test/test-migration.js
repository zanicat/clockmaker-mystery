/* Legacy save migration: v1 key becomes the ch1 slot, Continue restores it. */
localStorage.setItem('clockmakers-secret-save-v1',
  JSON.stringify({ scene: 'workshop', inventory: ['screwdriver', 'rag'], flags: { workshopUnlocked: true, screwdriverTaken: true, ragTaken: true } }));

Game.init();

assert(localStorage.getItem('clockmakers-secret-save-v1') === null, 'legacy key removed');
var migrated = JSON.parse(localStorage.getItem('clockmakers-secret-save-ch1'));
assert(migrated && migrated.scene === 'workshop', 'legacy save adopted as ch1 slot');

btnByText('chapter-list', 'Continue');
assert(!isHidden('screen-game'), 'game screen shown');
assert(__els['scene-name'].textContent === 'The Workshop', 'restored into the workshop');
assert(invNames().join(',') === 'Flat Screwdriver,Cotton Rag', 'inventory restored');

'OK: legacy save migration works';
