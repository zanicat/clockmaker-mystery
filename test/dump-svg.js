/* Render every painter under representative flag states and return
   JSON [{name, svg}] for XML validation on the Python side. */

var out = [];

var emptyS = { flags: {} };
var fullS = {
  flags: {
    rugMoved: true, drawerOpened: true, drawerGearTaken: true, counterKeyTaken: true,
    pendOpened: true, gfGearTaken: true, noteTaken: true, alarmOpened: true, tinyKeyTaken: true,
    screwdriverTaken: true, ragTaken: true, oilNoticed: true, oilTipped: true, greasyGearTaken: true,
    cratePried: true, crateCrankTaken: true, crateGearTaken: true, officeUnlocked: true,
    gearsSeated: 4, crankSeated: true, dialH: 7, dialM: 15,
    safeOpened: true, grimsbyTaken: true, padlockKeyTaken: true,
    trapdoorUnlocked: true, trapdoorOpened: true, wallListened: true, hiddenOpen: true,
    // ch2
    windlassTaken: true, magnifierTaken: true, alteredSeen: true, vialTaken: true,
    cabinetOpen: true, gallsTaken: true, pageTaken: true, scrapingsTaken: true,
    vitriolTaken: true, brushTaken: true, gateOpen: true, developerMade: true,
    studyUnlocked: true, bookcaseOpen: true, tonicTaken: true, proofDone: true,
    // ch3
    ivyCut: true, gladstoneMoved: true, bloomed: true, clockFixed: true,
    journalTaken: true, secateursTaken: true, winderTaken: true, trowelTaken: true,
    canTaken: true, lettuceTaken: true, mazeSolved: true, dugTin: true,
    fragmentUsed: true, herbariumTaken: true, leafMatched: true,
  },
};

var nightS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { nightS.flags[k] = fullS.flags[k]; });
nightS.flags.night = true;

var ch1Painters = ['title', 'shopfront', 'counterZoom', 'grandfatherZoom', 'workshop',
  'benchZoom', 'shelfZoom', 'clockLockZoom', 'office', 'cellar', 'hiddenRoom'];
for (var i = 0; i < ch1Painters.length; i++) {
  var n = ch1Painters[i];
  out.push({ name: 'ch1.' + n + '.empty', svg: Art[n](emptyS) });
  out.push({ name: 'ch1.' + n + '.full', svg: Art[n](fullS) });
}
var ch2Painters = ['shopFloor', 'ledgerZoom', 'shelfWallZoom', 'dispensary', 'cabinetZoom',
  'workbenchZoom', 'cellarLab', 'study', 'compoundingRoom'];
for (var i = 0; i < ch2Painters.length; i++) {
  var n = ch2Painters[i];
  out.push({ name: 'ch2.' + n + '.empty', svg: Art.ch2[n](emptyS) });
  out.push({ name: 'ch2.' + n + '.full', svg: Art.ch2[n](fullS) });
}
var ch3Painters = ['glasshouse', 'bloomClockZoom', 'pottingShed', 'seedDrawersZoom',
  'orchidWing', 'maze', 'mazeHeartZoom', 'gardenOffice'];
for (var i = 0; i < ch3Painters.length; i++) {
  var n = ch3Painters[i];
  out.push({ name: 'ch3.' + n + '.empty', svg: Art.ch3[n](emptyS) });
  out.push({ name: 'ch3.' + n + '.full', svg: Art.ch3[n](fullS) });
  out.push({ name: 'ch3.' + n + '.night', svg: Art.ch3[n](nightS) });
}
Object.keys(Art.icons).forEach(function (k) { out.push({ name: 'icon.' + k, svg: Art.icons[k] }); });
Object.keys(Art.ch2.icons).forEach(function (k) { out.push({ name: 'icon2.' + k, svg: Art.ch2.icons[k] }); });
Object.keys(Art.ch3.icons).forEach(function (k) { out.push({ name: 'icon3.' + k, svg: Art.ch3.icons[k] }); });

// puzzle renders (need a fake g)
var flags = {};
var fakeG = {
  flag: function (k) { return !!flags[k]; },
  getFlag: function (k) { return flags[k]; },
  hasClue: function () { return true; },
  hasItem: function () { return true; },
};
['ch1', 'ch2', 'ch3'].forEach(function (ch) {
  var puzzles = CHAPTERS[ch].puzzles;
  Object.keys(puzzles).forEach(function (k) {
    out.push({ name: ch + '.puzzle.' + k, svg: '<div>' + puzzles[k].render(fakeG) + '</div>' });
  });
});

JSON.stringify(out);
