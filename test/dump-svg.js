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
    // ch4
    oculusWound: true, winderTaken4: true, spectroTaken: true, saleTaken: true,
    sourceTraced: true,
    // ch5
    trumpetTaken: true, waxTaken: true, keyTaken: true, chapelOpen: true,
    pipeTaken: true, pipeFitted: true,
    // ch6
    conkerTaken: true, vinegarTaken: true, pokerTaken: true, twineTaken: true,
    mouseFreed: true, hatchFound: true, boxOpen: true, noteExamined: true,
    marks1Done: true, marks2Done: true,
    // ch7
    journalTaken: true, padTaken: true, lanternTaken: true, strapTaken: true,
    oilTaken: true, lanternLit: true, strongOpen: true, sealSeen: true,
    ballastFound: true, caseOpen: true, armOut: true, pouchTaken: true,
    reLettered: true, bulletinRead: true, corrected: true,
  },
};

var nightS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { nightS.flags[k] = fullS.flags[k]; });
nightS.flags.night = true;

// ch4 lit state: every floor's beam-gated art painted (for XML validation).
var litS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { litS.flags[k] = fullS.flags[k]; });
litS.flags.lit_dome = true; litS.flags.lit_workshop = true; litS.flags.lit_vault = true;

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
var ch4Painters = ['domeLantern', 'heliostatZoom', 'gallery', 'logbookZoom',
  'workshop', 'vault', 'corniceZoom'];
for (var i = 0; i < ch4Painters.length; i++) {
  var n = ch4Painters[i];
  out.push({ name: 'ch4.' + n + '.empty', svg: Art.ch4[n](emptyS) });
  out.push({ name: 'ch4.' + n + '.full', svg: Art.ch4[n](fullS) });
  out.push({ name: 'ch4.' + n + '.lit', svg: Art.ch4[n](litS) });
}

// ch5 wind state: the bellows cranked, every breath-gated branch painted.
var windS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { windS.flags[k] = fullS.flags[k]; });
windS.flags.windOn = true;
windS.flags.pipeTaken = false; // the pipe on its chest, rippling

var ch5Painters = ['house', 'box5Zoom', 'stage', 'under', 'chapelZoom',
  'foyer', 'officeZoom', 'facadeZoom'];
for (var i = 0; i < ch5Painters.length; i++) {
  var n = ch5Painters[i];
  out.push({ name: 'ch5.' + n + '.empty', svg: Art.ch5[n](emptyS) });
  out.push({ name: 'ch5.' + n + '.full', svg: Art.ch5[n](fullS) });
  out.push({ name: 'ch5.' + n + '.wind', svg: Art.ch5[n](windS) });
}
/* ch7: the journey IS the state. Paint every painter standing at the
   first stop, running mid-journey with a reply waiting, and on the last
   stage — the three worlds the window can be in. */
var ch7RunS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { ch7RunS.flags[k] = fullS.flags[k]; });
ch7RunS.flags.moving = true;
ch7RunS.flags.leg = 2;
ch7RunS.flags.wiredBoxLeg = 0;
ch7RunS.flags.wiredOfficeLeg = 1;

var ch7FinalS = { flags: {} };
Object.keys(fullS.flags).forEach(function (k) { ch7FinalS.flags[k] = fullS.flags[k]; });
ch7FinalS.flags.moving = true;
ch7FinalS.flags.final = true;
ch7FinalS.flags.leg = 4;

var ch7Painters = ['guardsVan', 'sortingVan', 'corridor', 'footplate', 'platform',
  'strongroomZoom', 'frameZoom', 'caseZoom', 'journalZoom'];
for (var i = 0; i < ch7Painters.length; i++) {
  var n = ch7Painters[i];
  out.push({ name: 'ch7.' + n + '.empty', svg: Art.ch7[n](emptyS) });
  out.push({ name: 'ch7.' + n + '.full', svg: Art.ch7[n](fullS) });
  out.push({ name: 'ch7.' + n + '.running', svg: Art.ch7[n](ch7RunS) });
  out.push({ name: 'ch7.' + n + '.final', svg: Art.ch7[n](ch7FinalS) });
}
// every station's name board and clock
for (var L = 0; L < Art.ch7.stations.length; L++) {
  out.push({ name: 'ch7.platform.leg' + L, svg: Art.ch7.platform({ flags: { leg: L } }) });
}

// ch6 painters: empty (no translations) and full (both pages pencilled in).
var ch6Painters = ['quad', 'hall', 'caseZoom', 'studyZoom', 'bursaryZoom', 'attics', 'cellars'];
for (var i = 0; i < ch6Painters.length; i++) {
  var n = ch6Painters[i];
  out.push({ name: 'ch6.' + n + '.empty', svg: Art.ch6[n](emptyS) });
  out.push({ name: 'ch6.' + n + '.full', svg: Art.ch6[n](fullS) });
}

Object.keys(Art.icons).forEach(function (k) { out.push({ name: 'icon.' + k, svg: Art.icons[k] }); });
Object.keys(Art.ch2.icons).forEach(function (k) { out.push({ name: 'icon2.' + k, svg: Art.ch2.icons[k] }); });
Object.keys(Art.ch3.icons).forEach(function (k) { out.push({ name: 'icon3.' + k, svg: Art.ch3.icons[k] }); });
Object.keys(Art.ch4.icons).forEach(function (k) { out.push({ name: 'icon4.' + k, svg: Art.ch4.icons[k] }); });
Object.keys(Art.ch5.icons).forEach(function (k) { out.push({ name: 'icon5.' + k, svg: Art.ch5.icons[k] }); });
Object.keys(Art.ch6.icons).forEach(function (k) { out.push({ name: 'icon6.' + k, svg: Art.ch6.icons[k] }); });
Object.keys(Art.ch7.icons).forEach(function (k) { out.push({ name: 'icon7.' + k, svg: Art.ch7.icons[k] }); });

// puzzle renders (need a fake g)
var flags = { leg: 1 };
var fakeG = {
  flag: function (k) { return !!flags[k]; },
  getFlag: function (k) { return flags[k]; },
  hasClue: function () { return true; },
  hasItem: function () { return true; },
};
['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'].forEach(function (ch) {
  var puzzles = CHAPTERS[ch].puzzles;
  Object.keys(puzzles).forEach(function (k) {
    out.push({ name: ch + '.puzzle.' + k, svg: '<div>' + puzzles[k].render(fakeG) + '</div>' });
  });
});

JSON.stringify(out);
