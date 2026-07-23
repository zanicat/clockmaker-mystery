/* Full Chapter Four walkthrough: the vertical tower, the four new puzzle
   types (drift reconstruction, star-cipher decode, hidden-object bench,
   heliostat beam-routing), the beam/lit novelty (a floor's hotspots appear
   only once the beam is aimed at it), sad paths, and the vault finale. */

Game.init();
chapterBtn("The Astronomer's Star", 'New Game');
adv(); // intro (Fenn)

// hint ladder rung 1: question the witnesses, not the answer
__els['btn-hint'].click();
assert(!isHidden('modal'), 'hint modal opens');
assert(__els['modal-text'].textContent.indexOf('its light') >= 0,
  'first hint asks diamond-or-light, got: ' + __els['modal-text'].textContent);
btnByText('modal-buttons', 'Close');

// --- gallery: the heir, the log (drift proof), the cipher, tools ---
hotspot('Miss Ottoline Vaux'); adv();               // clues theft + heirWants

hotspot('The observing log');                        // -> logbook zoom
hotspot('The drift of the Star'); adv();             // -> driftProof puzzle
assert(!isHidden('puzzle'), 'drift proof opens');
puzzleAct('pt-1'); puzzleAct('submit');              // sad path: wrong walk
assert(!isHidden('puzzle'), 'wrong drift keeps the puzzle open');
puzzleAct('pt-8'); puzzleAct('pt-7'); puzzleAct('pt-6'); puzzleAct('pt-5'); puzzleAct('pt-4');
puzzleAct('submit'); adv();                          // clue drift
__els['zoom-close'].click();

hotspot('The note in star-signs'); adv();            // -> starCipher puzzle
assert(!isHidden('puzzle'), 'star cipher opens');
puzzleAct('decode');                                 // sad path: key AAAAAA
assert(!isHidden('puzzle'), 'wrong key keeps the cipher open');
var KEY = [21, 4, 18, 15, 4, 17];                    // V E S P E R
for (var i = 0; i < 6; i++) { for (var k = 0; k < KEY[i]; k++) puzzleAct('u' + i); }
puzzleAct('decode'); adv();                          // clue warning
assert(isHidden('puzzle'), 'cipher closes on the right key');

hotspot('The spectroscope'); adv();                  // spectroCard
hotspot('The oculus winder'); adv();                 // oculusWinder

// --- workshop (still dark): meet Roke, hunt the bench, build the scope ---
hotspot('Down to the workshop'); adv();              // onEnter
assert(labelsIn('scene-hotspots').indexOf('A dark recess') >= 0,
  'recess reads as dark before the beam lights the workshop');
assert(labelsIn('scene-hotspots').indexOf('The under-bench recess') === -1,
  'lit recess hidden while the workshop is dark');

hotspot('Silvan Roke, optician'); adv();             // clue access
hotspot('The optician\'s bench'); adv();             // -> benchHunt
assert(!isHidden('puzzle'), 'bench hunt opens');
puzzleAct('find-lens');                              // find one...
puzzleAct('find-decoy1');                            // ...then a decoy steals it back
assert(invNames().indexOf('Ground Lens') === -1, 'decoy scatters the last find');
puzzleAct('find-lens'); puzzleAct('find-mirror');
puzzleAct('find-prism'); puzzleAct('find-paste'); adv(); // clues makersBevel + replica
assert(invNames().indexOf('Bevelled Prism') >= 0, 'prism taken from the bench');

invClick('Silvered Hand-Mirror'); invClick('Ground Lens'); // combine -> tracing scope
assert(invNames().indexOf('Tracing Scope') >= 0, 'lens + mirror make the tracing scope');
assert(invNames().indexOf('Ground Lens') === -1, 'lens consumed by the combo');

// --- dome: wind the oculus, aim the beam down to the workshop ---
hotspot('Up to the gallery');
hotspot('Up to the dome'); adv();                    // onEnter
hotspot('The constellations on the dome'); adv();    // clue constellations
invClick('Oculus Winder');
hotspot('The oculus clockwork'); adv();              // oculusWound + lit_dome
assert(invNames().indexOf('Oculus Winder') === -1, 'winder retired after winding');

hotspot('The heliostat');                            // -> heliostat zoom
hotspot('Aim the mirror');                            // -> heliostat puzzle (goal: workshop)
assert(!isHidden('puzzle'), 'heliostat opens once wound');
puzzleAct('aim');                                    // sad path: mirrors flat
assert(!isHidden('puzzle'), 'a wrong aim keeps the heliostat open');
puzzleAct('rot-m1'); puzzleAct('rot-m2');            // B=/  C=/  -> workshop
puzzleAct('aim'); adv();                             // lit_workshop
__els['zoom-close'].click();

// --- back down: the beam has opened the dark (novelty proof) ---
hotspot('Down to the gallery');
hotspot('Down to the workshop');
assert(labelsIn('scene-hotspots').indexOf('The under-bench recess') >= 0,
  'the lit recess hotspot appears once the beam is on the workshop');
hotspot('The under-bench recess'); adv();            // saleLetter + saleMotive

// --- vault (still dark): witness, pedestal, seal ---
hotspot('Down to the vault'); adv();                 // onEnter
hotspot('Crell, the night watchman'); adv();         // clue starWatched
hotspot('The empty pedestal'); adv();                // clue emptyPedestal
hotspot('The barred window'); adv();                 // clue sealIntact
assert(labelsIn('scene-hotspots').indexOf('The cornice above the wall') === -1,
  'the cornice rig is invisible until the vault is lit');

// --- dome again: aim the beam all the way to the vault ---
hotspot('Up to the workshop');
hotspot('Up to the gallery');
hotspot('Up to the dome');
hotspot('The heliostat');                            // -> heliostat zoom
hotspot('Aim the mirror');                            // goal now: vault
assert(!isHidden('puzzle'), 'heliostat reopens for the vault');
puzzleAct('rot-m1'); puzzleAct('rot-m1');            // B=\
puzzleAct('rot-m3'); puzzleAct('rot-m3');            // D=\  -> vault
puzzleAct('aim'); adv();                             // lit_vault
__els['zoom-close'].click();

// --- vault, lit: the Star wakes; trace and test it ---
hotspot('Down to the gallery');
hotspot('Down to the workshop');
hotspot('Down to the vault');
assert(labelsIn('scene-hotspots').indexOf('The cornice above the wall') >= 0,
  'the cornice appears once the vault is lit');
invClick('Spectroscope Card');
hotspot('The north wall'); adv();                    // clue noFire
assert(invNames().indexOf('Spectroscope Card') === -1, 'spectroscope retired after the reading');
invClick('Tracing Scope');
hotspot('The cornice above the wall'); adv();         // clues hiddenLamp + sourceTraced
assert(invNames().indexOf('Tracing Scope') === -1, 'tracing scope retired at the source');
__els['zoom-close'].click();

// casebook: fifteen clues stand before the finale
__els['btn-journal'].click();
assert(__els['journal-body'].children.length === 15,
  'expected 15 casebook clues before the finale, got ' + __els['journal-body'].children.length);
__els['journal-close'].click();

// final hint rung: two-tier, and tier-2 must NOT hand over the solution
__els['btn-hint'].click();
btnByText('modal-buttons', 'Another nudge');
assert(__els['modal-text'].textContent.indexOf('pedestal') >= 0,
  'final hint tier-2 points at the empty pedestal, got: ' + __els['modal-text'].textContent);
assert(__els['modal-text'].textContent.indexOf('rot-') === -1 && __els['modal-text'].textContent.indexOf('B=') === -1,
  'final hint never states a literal mirror setting');
btnByText('modal-buttons', 'Close');

// --- finale: wake the Star with nothing on the pedestal ---
assert(labelsIn('scene-hotspots').indexOf('Wake the Star before them') >= 0,
  'the confrontation opens once every proof is in the casebook');
hotspot('Wake the Star before them'); adv();          // -> heliostat (goal: pedestal)
assert(!isHidden('puzzle'), 'the finale heliostat opens');
puzzleAct('rot-m1'); puzzleAct('rot-m1');             // B=\
puzzleAct('rot-m3');                                  // D=/  -> pedestal
puzzleAct('aim'); adv();                              // the Star wakes over nothing -> end

assert(!isHidden('screen-end'), 'end screen shown');
assert(__els['end-title'].textContent === "The Astronomer's Star", 'ch4 end title');
assert(!isHidden('btn-end-next'), 'ch4 offers the next chapter');
assert(__els['btn-end-next'].textContent === 'Begin Chapter Five', 'next button names chapter five');
var meta = JSON.parse(localStorage.getItem('clockmakers-secret-meta'));
assert(meta.completed && meta.completed.ch4 === true, 'ch4 completion recorded');
assert(localStorage.getItem('clockmakers-secret-save-ch4') === null, 'ch4 save cleared');
assert(invNames().join(',') === '',
  'inventory empty at chapter end, got: ' + invNames().join(','));

'OK: ch4 walkthrough complete; inventory at end: ' + invNames().join(', ');
