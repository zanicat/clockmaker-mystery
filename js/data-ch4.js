/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Four — "The Astronomer's Star".

   The Vesper diamond is stolen from a wax-sealed, all-night-watched vault
   it could not have left. The truth: it left the afternoon BEFORE the seal,
   in the optician Silvan Roke's pocket. What a dozen witnesses watched all
   night was not a diamond but its counterfeit in light — a hidden lamp,
   a bevelled prism, and a train of little mirrors painting the Star on the
   wall, timed to douse itself at dawn. A real theft, a real thief, real
   gain: Roke intercepted the heir's sale for himself and staged the
   impossible so no plain lens-grinder was ever suspected.

   Verb: align/aim. The chapter's novelty is the BEAM. Aiming the heliostat
   sets lit_<floor> flags that re-render that floor and gate its hotspots —
   the trick that faked the crime is the key that solves it.

   NOTE: array-valued flags (mounts, huntFound, driftPath) must always be
   SET to a fresh array, never mutated in place — setFlag is what persists. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ITEMS = {
  oculusWinder: {
    name: 'Oculus Winder',
    desc: 'A brass winding key, sized for the dome clockwork. Winds the shutter — and the lamp on the same shaft, though I don\'t know that yet.',
    icon: Art.ch4.icons.oculusWinder,
  },
  handMirror: {
    name: 'Silvered Hand-Mirror',
    desc: 'A palm mirror, silvered to a cold perfection. Roke grinds and silvers his own; the back is stamped with his maker\'s bevel.',
    icon: Art.ch4.icons.handMirror,
  },
  groundLens: {
    name: 'Ground Lens',
    desc: 'A small objective lens, ground true. Hold it to the eye and the far wall leaps close.',
    icon: Art.ch4.icons.groundLens,
  },
  tracingScope: {
    name: 'Tracing Scope',
    desc: 'Lens and mirror married into a little scope. Point it along a beam and it hunts the beam back to its source.',
    icon: Art.ch4.icons.tracingScope,
  },
  masterPrism: {
    name: 'Bevelled Prism',
    desc: 'A heavy prism, one long edge bevelled in a way I have seen exactly once before — on the back of Roke\'s hand-mirror. The same hand cut both.',
    icon: Art.ch4.icons.masterPrism,
  },
  pasteReplica: {
    name: 'Paste Vesper',
    desc: 'A lump of leaded glass, faceted to the Vesper\'s shape. It throws no fire at all. A stand-in — for a stone that was already gone.',
    icon: Art.ch4.icons.pasteReplica,
  },
  spectroCard: {
    name: 'Spectroscope Card',
    desc: 'A little direct-vision spectroscope on a card. Real diamond splits white light into a ladder of colours; a mirror gives it back unbroken.',
    icon: Art.ch4.icons.spectroCard,
  },
  saleLetter: {
    name: "Collector's Draft",
    desc: 'A banker\'s draft and a note from a private collector: full price for the Vesper, "delivered quietly, no questions." Made out to S. Roke.',
    icon: Art.ch4.icons.saleLetter,
  },
};

const COMBOS = {
  'groundLens+handMirror': g => {
    g.removeItem('groundLens');
    g.removeItem('handMirror');
    g.addItem('tracingScope');
    g.sfx('pickup');
    g.narrate('Lens seated against silvered glass, bound with a twist of wire: a tracing scope. Now, if a beam has a hiding place, I can walk it home.');
  },
};

const CLUES = {
  theft: {
    title: 'The impossible theft',
    text: [
      'The Vesper diamond, gone from the vault. The single iron door was wax-sealed at dusk by the solicitor and the seal broken, intact, at dawn. The one window is barred to the width of a wrist.',
      'And all night, a dozen people watched the Star shine on the vault wall through those bars. It faded at first light. At dawn the pedestal was bare.',
    ],
  },
  heirWants: {
    title: 'Miss Ottoline Vaux',
    text: [
      '"I told them I\'d sell the wretched thing and close this cold barn of a tower. So of course you\'ll think I stole it." She did not need to steal what she was about to inherit and sell.',
      'She wanted the Vesper gone, not vanished. There\'s a difference, and she\'s clinging to it.',
    ],
  },
  drift: {
    title: 'The drift of the Star',
    text: [
      'The observing log: every clear night the Star\'s figure DRIFTS across the wall, hour by hour, as the sky turns. It never once holds still.',
      'The theft-night page shows it pinned in one place from dusk to dawn. A real caustic follows the heavens. This one obeyed a clock.',
    ],
  },
  warning: {
    title: "The Professor's note",
    text: [
      'Decoded from the star-sign cipher, in Halcyon Vaux\'s hand: "Any competent optician can forge my Star. Trust the drift, not the light."',
      'He knew his treasure could be counterfeited in light. He left the warning keyed to the stone\'s own name.',
    ],
  },
  constellations: {
    title: 'The dome ceiling',
    text: [
      'The old man ringed his dome with the constellations he loved and named his diamond for none of them: the Vesper, the evening star, that is no star at all but a planet — a light pretending.',
    ],
  },
  starWatched: {
    title: 'Crell, the watchman',
    text: [
      '"Bright as a coal it was, sir, all the night through — but no COLOURS to it. A real diamond throws its little rainbows. This one was white as a lamp and never stirred."',
      'He swears he watched the Star, not the stone. Nobody in this town has looked at the Vesper itself in years — only at what it throws on the wall.',
    ],
  },
  access: {
    title: 'Silvan Roke, optician',
    text: [
      '"I ground every lens in this tower, and I align the oculus each season — alone, the afternoon before it\'s sealed. Someone must." He offers it freely, guiding me room to room.',
      'The one man with reason to be in the sealed vault the day before, and the skill to grind anything glass can be made to do.',
    ],
  },
  makersBevel: {
    title: "A maker's bevel",
    text: [
      'The prism from the cornice and the hand-mirror from the bench carry the same long bevel, cut the same way. Roke signs his glass without meaning to.',
      'Whoever built the thing in the cornice grinds mirrors exactly as Roke does.',
    ],
  },
  replica: {
    title: 'The paste Vesper',
    text: [
      'A leaded-glass fake, faceted to the Vesper\'s shape, thrown among the bench glass. It gives no fire.',
      'Something sat on that pedestal for the sealing. It did not need to be a diamond. It only needed to be there when the door was shut.',
    ],
  },
  saleMotive: {
    title: 'The collector\'s draft',
    text: [
      'A private collector\'s banker\'s draft: full price for the Vesper, "delivered quietly," made out to S. Roke.',
      'The heir meant to sell it at auction, in the open. Roke sold it first, in the dark, and kept the difference and the stone.',
    ],
  },
  noFire: {
    title: 'A Star without fire',
    text: [
      'Through the spectroscope, the wall-Star gives back white light unbroken — no ladder of colour. A cut diamond would spill a spectrum. A mirror gives you back exactly what you shone into it.',
      'What shone on that wall all night was never refracted through a gem. It was reflected off glass.',
    ],
  },
  hiddenLamp: {
    title: 'The lamp in the cornice',
    text: [
      'Boxed into the vault cornice: a reservoir lamp, wicked to burn dusk-to-dawn and geared to the oculus clockwork — so it lit itself at the shutter\'s opening and doused itself, sharp, at its close.',
      'No hand tended it in the sealed room. That sharp dawn extinction is the tell — real moonlight fades by inches.',
    ],
  },
  sourceTraced: {
    title: 'The Star\'s true source',
    text: [
      'Traced along the beam: the wall-Star is born in the cornice — lamp, prism, a train of little mirrors — and thrown down onto the wall. It never touched the pedestal at all.',
      'The diamond was gone before the door was sealed. Only its ghost of light kept the watch.',
    ],
  },
  sealIntact: {
    title: 'The sealed door',
    text: [
      'The wax seal was set at dusk and found unbroken at dawn — the solicitor sealed the ROOM, with the pedestal unexamined behind a grille. He sealed a door, not a stone.',
      'Nothing entered or left in the night. So the stone left before the night began.',
    ],
  },
  emptyPedestal: {
    title: 'The empty pedestal',
    text: [
      'The Vesper\'s pedestal, bare, its grille shut. In the dust: a small square print, where something rested that was not lifted but taken away clean.',
      'Whatever wore the seal\'s watch on this stone sat here only long enough to be sealed in.',
    ],
  },
  resolution: {
    title: 'The Star that was only light',
    text: [
      'Roke took the stone the afternoon he aligned the oculus, sold it quietly to his collector, and left a lamp to keep its watch. The impossible theft was a theft made to look impossible — so no lens-grinder need be suspected.',
      'He loved the sky more than the stone. It is not, in the end, a defence.',
    ],
  },
};

const SCENES = {

  // ---------- the instrument gallery (start) ----------

  gallery: {
    name: 'The Instrument Gallery',
    art: Art.ch4.gallery,
    hotspots: [
      {
        id: 'stairUp', rect: [40, 300, 170, 420], label: 'Up to the dome',
        onClick: g => g.goTo('domeLantern'),
      },
      {
        id: 'stairDown', rect: [1390, 300, 170, 420], label: 'Down to the workshop',
        onClick: g => g.goTo('workshop'),
      },
      {
        id: 'ottoline', rect: [230, 500, 150, 250], label: 'Miss Ottoline Vaux',
        onClick: g => {
          if (!g.hasClue('heirWants')) {
            g.say([
              { who: 'Ottoline', text: 'You\'ll be the detective. Good. I told the whole town I meant to sell my father\'s diamond and close this cold barn of a tower. So naturally I am the thief.' },
              { who: 'Quinn', text: 'Are you?' },
              { who: 'Ottoline', text: 'One does not STEAL what one is about to inherit and sell at auction, Miss Quinn. I wanted it gone. Not gone like THIS. Not a conjuring trick with my father\'s name on it.' },
              { who: 'Quinn', text: 'Gone, and vanished. You\'re right that those aren\'t the same word. Let\'s find out which one this is.' },
            ], g2 => { g2.addClue('theft'); g2.addClue('heirWants'); });
          } else if (g.hasClue('sourceTraced') && !g.flag('ended')) {
            g.say([{ who: 'Ottoline', text: 'A lamp. All that grief and gossip, and it was a LAMP. I could almost admire it, if it hadn\'t used my father to do it.' }]);
          } else {
            g.say([{ who: 'Ottoline', text: 'Ask what you like. I\'ve nothing left to hide but my temper, and that\'s common knowledge.' }]);
          }
        },
      },
      {
        id: 'logbook', rect: [290, 500, 170, 220], label: 'The observing log',
        onClick: g => g.openZoom('logbook'),
      },
      {
        id: 'cipherNote', rect: [590, 460, 140, 170], label: 'The note in star-signs',
        onClick: g => {
          if (g.hasClue('warning')) { g.narrate('The note, read at last: "Trust the drift, not the light." He left me my whole case in six letters.'); return; }
          g.say([
            { text: 'Framed on the wall, a note in the Professor\'s hand — but written in little constellation glyphs, a private alphabet. At the foot, plain: "keyed to what I called her."' },
            { who: 'Quinn', text: 'A cipher. Six dials of it. And "what he called her" — the diamond had a name.' },
          ], g2 => g2.openPuzzle('starCipher'));
        },
      },
      {
        id: 'spectroscope', rect: [1050, 585, 130, 110], label: 'The spectroscope',
        visible: g => !g.flag('spectroTaken'),
        onClick: g => {
          g.setFlag('spectroTaken');
          g.addItem('spectroCard');
          g.narrate('A little direct-vision spectroscope on a card. Shine white light through a true diamond and it breaks into a ladder of colours. Worth carrying — a stone that gives no rainbow is no stone.');
        },
      },
      {
        id: 'winder', rect: [1210, 610, 100, 110], label: 'The oculus winder',
        visible: g => !g.flag('winderTaken'),
        onClick: g => {
          g.setFlag('winderTaken');
          g.addItem('oculusWinder');
          g.narrate('A brass winding key on the bench, sized for the dome. Nothing turns in this tower without it — the shutter least of all.');
        },
      },
    ],
    zooms: {
      logbook: {
        title: 'The Observing Log',
        art: Art.ch4.logbookZoom,
        hotspots: [
          {
            id: 'driftPage', rect: [180, 240, 420, 380], label: 'The drift of the Star',
            onClick: g => {
              if (g.hasClue('drift')) { g.narrate('The Star walks the wall with the sky, every honest night. The sealed night, it stood still.'); return; }
              g.say([
                { text: 'Page after page, the same careful record: each clear night the Star\'s figure DRIFTS across the wall as the hours pass and the sky turns. A little march, dusk to dawn.' },
                { who: 'Quinn', text: 'Can you walk it as he drew it? If the theft-night Star didn\'t drift, that tells me more than any broken lock.' },
              ], g2 => g2.openPuzzle('driftProof'));
            },
          },
          {
            id: 'sketch', rect: [640, 260, 380, 300], label: 'The sealed-night sketch',
            onClick: g => {
              g.narrate('The 14th, the sealed night: one sketch, the Star pinned in a single spot from dusk to dawn. Underlined twice, in the watchman\'s clumsy hand: "did not move."');
            },
          },
        ],
      },
    },
  },

  // ---------- the dome / lantern ----------

  domeLantern: {
    name: 'The Dome',
    art: Art.ch4.domeLantern,
    onEnter: g => {
      if (!g.flag('domeSeen')) {
        g.setFlag('domeSeen');
        g.say([{ who: 'Quinn', text: 'The lantern of the tower: one great lens, one mirror on a cradle, and a hole in the roof that can be told when to open. A machine for catching light and sending it where you like.' }]);
      }
    },
    hotspots: [
      {
        id: 'stairDown', rect: [60, 760, 240, 220], label: 'Down to the gallery',
        onClick: g => g.goTo('gallery'),
      },
      {
        id: 'ceiling', rect: [200, 300, 1200, 100], label: 'The constellations on the dome',
        onClick: g => {
          if (g.hasClue('constellations')) { g.narrate('Vela, Sagitta, Pavo, Equuleus — and the Vesper, named for the evening star that is no star at all.'); return; }
          g.say([
            { text: 'Ringed round the dome, the constellations the old man loved, each lettered in gold. His diamond is named for none of them: the VESPER — the evening star.' },
            { who: 'Quinn', text: 'Which is a planet, of course. Not a star at all. A light pretending to be one. He did like a private joke.' },
          ], g2 => g2.addClue('constellations'));
        },
      },
      {
        id: 'clockwork', rect: [720, 500, 160, 150], label: 'The oculus clockwork',
        onClick: g => {
          if (g.flag('oculusWound')) { g.narrate('Wound and running. The shutter answers the clock — and so, though I don\'t yet know it, does more than the shutter.'); return; }
          g.narrate('The oculus clockwork, its winding socket empty. Wind it and the dome will open on command — and whatever else shares this shaft will keep the same time.');
        },
        use: {
          oculusWinder: g => {
            if (g.flag('oculusWound')) { g.narrate('Already wound.'); return; }
            g.setFlag('oculusWound');
            g.setFlag('lit_dome');
            g.sfx('shutter');
            g.retireItem('oculusWinder');
            g.say([
              { text: 'Six firm turns. High overhead the shutter draws back with a clack, the night pours in, and the great lens gathers it to a hard white rod of light down the middle of the dome.' },
              { who: 'Quinn', text: 'There. Now I have light to spend. The only question is where to aim it.' },
            ]);
          },
        },
      },
      {
        id: 'heliostat', rect: [1120, 420, 200, 320], label: 'The heliostat',
        onClick: g => {
          if (!g.flag('oculusWound')) { g.narrate('The heliostat\'s mirror sits dead and dark. No sense aiming a beam I haven\'t lit — the oculus clockwork wants winding first.'); return; }
          if (g.flag('lit_workshop') && g.flag('lit_vault')) {
            g.narrate('Both floors below stand lit. Whatever\'s left to prove happens down in the vault now — and it wants an audience, not another rehearsal.');
            return;
          }
          g.openZoom('heliostat');
        },
      },
      {
        id: 'greatLens', rect: [314, 454, 150, 290], label: 'The great objective lens',
        onClick: g => g.narrate('The objective, wide as a dinner plate, ground for gathering faint things out of the dark. Roke keeps it flawless. He keeps all the glass here flawless — it is the one thing everyone agrees about him.'),
      },
    ],
    zooms: {
      heliostat: {
        title: 'The Heliostat',
        art: Art.ch4.heliostatZoom,
        hotspots: [
          {
            id: 'aim', rect: [300, 260, 600, 300], label: 'Aim the mirror',
            onClick: g => {
              if (!g.flag('oculusWound')) { g.narrate('No light to aim yet.'); return; }
              g.setFlag('beamGoal', g.flag('lit_workshop') ? 'vault' : 'workshop');
              g.openPuzzle('heliostat');
            },
          },
        ],
      },
    },
  },

  // ---------- the optician's workshop ----------

  workshop: {
    name: "The Optician's Workshop",
    art: Art.ch4.workshop,
    onEnter: g => {
      if (!g.flag('workshopSeen')) {
        g.setFlag('workshopSeen');
        g.say([{ who: 'Quinn', text: 'Roke\'s workshop, halfway down the tower. Everything here is glass or the tools for torturing it into shape. A patient trade. A patient man.' }]);
      }
    },
    hotspots: [
      {
        id: 'stairUp', rect: [40, 300, 170, 420], label: 'Up to the gallery',
        onClick: g => g.goTo('gallery'),
      },
      {
        id: 'stairDown', rect: [1390, 740, 180, 240], label: 'Down to the vault',
        onClick: g => g.goTo('vault'),
      },
      {
        id: 'roke', rect: [1200, 340, 130, 250], label: 'Silvan Roke, optician',
        onClick: g => {
          if (!g.hasClue('access')) {
            g.say([
              { who: 'Roke', text: 'Detective. Ask me anything — I\'ve nothing to do but grind, and I grind better with company.' },
              { who: 'Quinn', text: 'Who could have been in the vault before it was sealed?' },
              { who: 'Roke', text: 'I could. I align the oculus each season, the afternoon before the sealing — alone, someone must. But a lens-grinder walking out with the Vesper? They\'d have hanged me by tea-time. No. This was cleverer than any of us.' },
              { who: 'Quinn', text: 'Cleverer than all of us. I\'ll remember you said so.' },
            ], g2 => g2.addClue('access'));
          } else if (g.hasClue('sourceTraced') && !g.flag('ended')) {
            g.say([{ who: 'Roke', text: '...You made it night in the vault. Of course you did. I always said this one was cleverer than us.' }]);
          } else {
            g.say([{ who: 'Roke', text: 'Mind the bench — half of it is worth more than the tower, and the other half is worth nothing at all. The trick is telling which.' }]);
          }
        },
      },
      {
        id: 'bench', rect: [380, 560, 820, 120], label: 'The optician\'s bench',
        onClick: g => {
          if (g.flag('benchDone')) { g.narrate('Picked over. Whatever Roke let lie among his glass, I have it now.'); return; }
          g.say([
            { text: 'A magpie\'s hoard of glass — lenses, offcuts, silvered scraps, prisms, all a-jumble on the bench.' },
            { who: 'Quinn', text: 'A man hides a thing best in a heap of its own kind. Let\'s see what\'s here that oughtn\'t be.' },
          ], g2 => g2.openPuzzle('benchHunt'));
        },
      },
      {
        id: 'recess', rect: [1180, 640, 260, 150], label: 'The under-bench recess',
        visible: g => g.flag('lit_workshop'),
        onClick: g => {
          if (g.flag('saleTaken')) { g.narrate('The recess is empty now, and a good deal less innocent than it looked in the dark.'); return; }
          g.setFlag('saleTaken');
          g.addItem('saleLetter');
          g.addClue('saleMotive');
          g.say([
            { text: 'The beam, bent down here from the dome, finds a black recess under the bench — and in it, pushed well back, a folded paper the dark had kept for me.' },
            { who: 'Quinn', text: 'A collector\'s draft. Full price for the Vesper, "delivered quietly," and made out to S. Roke. Miss Ottoline meant to sell it in the open. Somebody sold it first.' },
          ]);
        },
      },
      {
        id: 'recessDark', rect: [1180, 640, 260, 150], label: 'A dark recess',
        visible: g => !g.flag('lit_workshop'),
        onClick: g => g.narrate('A recess under the bench, black as a coal-hole. Something pale is pushed back inside it, but I can\'t make it out. It wants light — and I know where light is kept in this tower.'),
      },
    ],
  },

  // ---------- the vault ----------

  vault: {
    name: 'The Vault',
    art: Art.ch4.vault,
    onEnter: g => {
      if (!g.flag('vaultSeen')) {
        g.setFlag('vaultSeen');
        g.say([{ who: 'Quinn', text: 'The vault at the tower\'s foot. Bare pedestal, barred window, a door that wore an unbroken seal all night. A room that swears nothing came or went. I believe the room. It\'s the Star I don\'t believe.' }]);
      }
    },
    hotspots: [
      {
        id: 'stairUp', rect: [120, 770, 180, 210], label: 'Up to the workshop',
        onClick: g => g.goTo('workshop'),
      },
      {
        id: 'crell', rect: [560, 740, 130, 200], label: 'Crell, the night watchman',
        onClick: g => {
          if (!g.hasClue('starWatched')) {
            g.say([
              { who: 'Crell', text: 'I watched it myself, sir, the whole night through. Bright as a coal on that wall, steady as you like.' },
              { who: 'Quinn', text: 'The diamond, or the Star it throws?' },
              { who: 'Crell', text: '...The Star, I suppose. You can\'t see the stone itself — it\'s behind its grille, in the dark. But a real one throws little rainbows, my old mother said. This threw none. White as a lamp, and never stirred all night.' },
              { who: 'Quinn', text: 'White as a lamp. Mr. Crell, you may have just described the whole crime and not known it.' },
            ], g2 => g2.addClue('starWatched'));
          } else {
            g.say([{ who: 'Crell', text: 'Never stirred, sir. I\'d swear to it. Steady as a lamp on a shelf.' }]);
          }
        },
      },
      {
        id: 'pedestal', rect: [720, 520, 140, 200], label: 'The empty pedestal',
        onClick: g => {
          if (g.hasClue('emptyPedestal')) { g.narrate('The bare pedestal, and that small square print in the dust. Something plain-sided rested here just long enough to be sealed in.'); return; }
          g.say([
            { text: 'The pedestal, bare behind its shut grille. In the dust, a small square print — not the round base of a mounted gem, but something flat-sided, set down and taken up clean.' },
            { who: 'Quinn', text: 'Round stone, square print. Whatever kept this pedestal warm for the sealing, it wasn\'t the Vesper in its mount.' },
          ], g2 => g2.addClue('emptyPedestal'));
        },
      },
      {
        id: 'window', rect: [1000, 330, 150, 220], label: 'The barred window',
        onClick: g => {
          if (g.hasClue('sealIntact')) { g.narrate('Bars a wrist could not pass, and the seal on the door unbroken till dawn. Nothing came or went. The stone left before the watch began.'); return; }
          g.say([
            { text: 'The one window: bars set a wrist\'s width apart, the mortar sound. And the door\'s wax seal, set at dusk, was found whole at dawn — the solicitor sealed the room without ever lifting the grille to look at the stone.' },
            { who: 'Quinn', text: 'He sealed a door, not a diamond. Nothing entered or left in the night — so the only night that matters is the afternoon before it.' },
          ], g2 => g2.addClue('sealIntact'));
        },
      },
      {
        id: 'northWall', rect: [120, 300, 480, 360], label: 'The north wall',
        onClick: g => {
          if (!g.flag('lit_vault')) { g.narrate('The blank north wall, where the Star is said to shine. Just now it shines with nothing at all. If I want to see the trick, I must first light this room the way the thief did — from the dome.'); return; }
          if (g.hasClue('noFire')) { g.narrate('The Star, blazing white on the wall — and through the spectroscope, still giving back light without a scrap of colour. A mirror\'s work, start to finish.'); return; }
          g.narrate('And there it is: the Star, woken on the wall by my own beam from the dome, with nothing whatever on the pedestal. Bright. Steady. Beautiful, and completely false. I want to test its colours.');
        },
        use: {
          spectroCard: g => {
            if (!g.flag('lit_vault')) { g.narrate('No Star on the wall yet to test.'); return; }
            if (g.hasClue('noFire')) { g.narrate('Tested, and told: white light, unbroken. No gem did this.'); return; }
            g.setFlag('noFire');
            g.sfx('prism');
            g.addClue('noFire');
            g.retireItem('spectroCard');
            g.say([
              { text: 'I raise the spectroscope to the blazing wall-Star. A true diamond would spill a whole ladder of colour. This gives the white light straight back, unbroken — the signature of a mirror, not a stone.' },
              { who: 'Quinn', text: 'No fire. Crell\'s "no rainbows," in a laboratory\'s words. Whatever shone here all night was reflected, never refracted.' },
            ]);
          },
        },
      },
      {
        id: 'cornice', rect: [120, 240, 480, 64], label: 'The cornice above the wall',
        visible: g => g.flag('lit_vault'),
        onClick: g => {
          if (g.hasClue('sourceTraced')) { g.openZoom('cornice'); return; }
          g.narrate('High on the north wall, where the Star seems to hang, the cornice runs — and in this light something up there glitters that has no business glittering. I\'d know it for certain if I could follow the beam into it.');
        },
        use: {
          tracingScope: g => {
            if (g.hasClue('sourceTraced')) { g.openZoom('cornice'); return; }
            g.setFlag('sourceTraced');
            g.sfx('beam');
            g.addClue('hiddenLamp');
            g.addClue('sourceTraced');
            g.retireItem('tracingScope');
            g.openZoom('cornice');
            g.say([
              { text: 'I sight the tracing scope along the beam and walk it home — up off the wall, into the cornice, to a boxed reservoir lamp, a bevelled prism, and a train of little mirrors. The Star is BORN up here and thrown down. It never once touched the pedestal.' },
              { who: 'Quinn', text: 'A lamp geared to the same clockwork as the shutter — lighting itself at dusk, dousing itself sharp at dawn. Real moonlight fades by inches. This one was switched off. And that prism has a bevel I have seen before.' },
            ]);
          },
        },
      },
      {
        id: 'confront', rect: [700, 480, 180, 260], label: 'Wake the Star before them',
        visible: g => g.flag('lit_vault') && g.flag('sourceTraced') && g.flag('noFire')
          && g.flag('benchDone') && g.flag('saleTaken') && g.flag('driftDone') && !g.flag('ended'),
        onClick: g => {
          g.narrate('I have the lamp, the fire that isn\'t, the drift that didn\'t, the bevel, and the draft with his name on it. Time to make a Star wake with nothing on the pedestal — and let the room draw its own conclusion. I\'ll aim it from the dome, before them all.');
          g.setFlag('beamGoal', 'pedestal');
          g.openPuzzle('heliostat');
        },
      },
    ],
    zooms: {
      cornice: {
        title: 'Inside the Cornice',
        art: Art.ch4.corniceZoom,
        hotspots: [
          {
            id: 'rig', rect: [300, 300, 340, 160], label: 'The lamp and prism',
            onClick: g => g.narrate('Lamp, prism, mirrors — the whole conjuror\'s kit, boxed in the stone. He couldn\'t retrieve it without breaking the seal and betraying that he\'d been inside. So he gambled the crime would be ruled impossible and the cornice never searched. He gambled on everyone trusting the light.'),
          },
        ],
      },
    },
  },
};

// ---------- interactive puzzles ----------

/* Shared beam tracer for the heliostat. Grid 5 wide x 5 tall; the beam
   enters the top of column 2 travelling down. Four mounts, each 0=open,
   1='/', 2='\'. Returns the exit {port, at} and the cell path so the
   render can draw a truthful beam. Verified reachable:
     workshop = bottom col 0  (mount B='/', C='/')
     vault    = bottom col 4  (mount B='\', D='\')
     pedestal = top col 4     (mount B='\', D='/')  */
const BEAM = (() => {
  const W = 5, H = 5;
  const MOUNTS = [{ c: 2, r: 1 }, { c: 2, r: 3 }, { c: 0, r: 3 }, { c: 4, r: 3 }];
  const DC = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  function turn(d, m) {
    return m === 1
      ? { down: 'left', left: 'down', up: 'right', right: 'up' }[d]
      : { down: 'right', right: 'down', up: 'left', left: 'up' }[d];
  }
  function trace(cfg) {
    let c = 2, r = 0, d = 'down', steps = 0;
    const path = [[c, r]];
    while (steps++ < 60) {
      for (let i = 0; i < MOUNTS.length; i++) {
        if (MOUNTS[i].c === c && MOUNTS[i].r === r && cfg[i] !== 0) { d = turn(d, cfg[i]); break; }
      }
      const nc = c + DC[d][0], nr = r + DC[d][1];
      if (nc < 0 || nc >= W || nr < 0 || nr >= H) {
        path.push([nc, nr]);
        const port = nc < 0 ? 'left' : nc >= W ? 'right' : nr < 0 ? 'top' : 'bottom';
        return { port, at: port === 'left' || port === 'right' ? r : c, path };
      }
      c = nc; r = nr; path.push([c, r]);
    }
    return { port: 'loop', at: -1, path };
  }
  const GOALS = {
    workshop: { port: 'bottom', at: 0, label: 'the workshop stair' },
    vault: { port: 'bottom', at: 4, label: 'the vault, far below' },
    pedestal: { port: 'top', at: 4, label: "the vault's north cornice" },
  };
  return { W, H, MOUNTS, trace, GOALS };
})();

const PUZZLES = {

  heliostat: {
    title: 'The Heliostat',
    wide: true,
    render(g) {
      const mounts = g.getFlag('mounts') || [0, 0, 0, 0];
      const t = BEAM.trace(mounts);
      const cell = 64, ox = 60, oy = 30;
      const X = c => ox + c * cell + cell / 2;
      const Y = r => oy + r * cell + cell / 2;
      // grid
      let grid = '';
      for (let r = 0; r < BEAM.H; r++) for (let c = 0; c < BEAM.W; c++) {
        grid += `<rect x="${ox + c * cell}" y="${oy + r * cell}" width="${cell}" height="${cell}" fill="none" stroke="#2a2442" stroke-width="1"/>`;
      }
      // beam path
      let pts = t.path.map(([c, r]) => {
        const cc = Math.max(-0.5, Math.min(BEAM.W - 0.5, c));
        const rr = Math.max(-0.5, Math.min(BEAM.H - 0.5, r));
        return `${X(cc).toFixed(0)},${Y(rr).toFixed(0)}`;
      }).join(' ');
      // mounts
      const GLYPH = ['&#9711;', '&#9585;', '&#9586;']; // ◯ ╱ ╲
      let mg = '';
      BEAM.MOUNTS.forEach((mp, i) => {
        const o = mounts[i];
        const stroke = o === 0 ? '#5a5578' : '#cbb56a';
        if (o === 1) mg += `<line x1="${ox + mp.c * cell + 12}" y1="${oy + mp.r * cell + cell - 12}" x2="${ox + mp.c * cell + cell - 12}" y2="${oy + mp.r * cell + 12}" stroke="${stroke}" stroke-width="6"/>`;
        else if (o === 2) mg += `<line x1="${ox + mp.c * cell + 12}" y1="${oy + mp.r * cell + 12}" x2="${ox + mp.c * cell + cell - 12}" y2="${oy + mp.r * cell + cell - 12}" stroke="${stroke}" stroke-width="6"/>`;
        else mg += `<circle cx="${X(mp.c)}" cy="${Y(mp.r)}" r="14" fill="none" stroke="${stroke}" stroke-width="3"/>`;
        mg += `<text x="${X(mp.c)}" y="${oy + mp.r * cell + cell - 6}" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#8a83b0">${'ABCD'[i]}</text>`;
      });
      const svg = `<div class="beam-board"><svg viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="350" rx="8" fill="#100d20" stroke="#2a2442" stroke-width="3"/>
        ${grid}
        <text x="${X(2)}" y="18" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#cbb56a">beam in</text>
        <polyline points="${pts}" fill="none" stroke="#f6efce" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>
        ${mg}
      </svg></div>`;
      const goal = g.getFlag('beamGoal') || 'workshop';
      const gl = BEAM.GOALS[goal];
      const where = t.port === 'loop' ? 'nowhere — it eats its own tail' :
        (t.port === gl.port && t.at === gl.at) ? gl.label + ' — dead true' : 'somewhere it is no use to me';
      const controls = BEAM.MOUNTS.map((_, i) => `<button class="btn" data-act="rot-m${i}">Turn ${'ABCD'[i]}</button>`).join('');
      return `${svg}
        <p class="puzzle-msg">${g.getFlag('beamMsg') || 'Aim the beam at ' + gl.label + '. The log gives the Star\'s true angle; the mirrors need only obey it. The beam now falls on: ' + where + '.'}</p>
        <div class="puzzle-controls">${controls}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="aim">Send the beam</button>
          <button class="btn" data-act="leave">Step back</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act.slice(0, 5) === 'rot-m') {
          const i = Number(act.slice(5));
          const mounts = (g.getFlag('mounts') || [0, 0, 0, 0]).slice();
          mounts[i] = (mounts[i] + 1) % 3;
          g.setFlag('mounts', mounts);
          g.setFlag('beamMsg', '');
          rerender();
          return;
        }
        // aim
        const goal = g.getFlag('beamGoal') || 'workshop';
        const gl = BEAM.GOALS[goal];
        const t = BEAM.trace(g.getFlag('mounts') || [0, 0, 0, 0]);
        if (t.port === gl.port && t.at === gl.at) {
          g.sfx('beam');
          if (goal === 'pedestal') {
            g.setFlag('ended');
            g.setFlag('mounts', [0, 0, 0, 0]);
            g.retireItem('masterPrism');
            g.retireItem('pasteReplica');
            g.closePuzzle();
            g.say([
              { text: 'Before Ottoline, Crell, and Roke, I wind the dome and throw the mirror. The beam races down the tower, into the cornice — and the Star wakes on the wall, bright and steady and perfect, above a pedestal with NOTHING on it.' },
              { who: 'Crell', text: 'That\'s — that\'s IT. That\'s exactly it. But the stone\'s not—' },
              { who: 'Quinn', text: 'There was never a stone here at night, Mr. Crell. Only a lamp keeping its watch. You were all guarding a reflection.' },
              { who: 'Ottoline', text: 'A lamp. All that grief, and it was a LAMP.' },
              { who: 'Roke', text: '...The bevel on the prism. You matched it to my mirror. I did always say this one was cleverer than us.' },
              { who: 'Quinn', text: 'You aligned the oculus the afternoon before the sealing, Mr. Roke. You carried out the Vesper, sold it quiet to your collector, and left your light to stand its watch. You couldn\'t fetch the lamp back without breaking the seal — so you gambled we\'d call it impossible and never look up.' },
              { who: 'Roke', text: 'I loved this tower more than the stone in it. She was going to close us. I only meant to save the sky.' },
              { who: 'Quinn', text: 'You saved the sky and sold the star, and dressed a theft as a wonder. Was a man who loves the light a thief, or only something sadder? The Yard can weigh that. I only had to catch it.' },
            ], g2 => {
              g2.addClue('resolution');
              g2.endChapter();
            });
            return;
          }
          g.setFlag('lit_' + goal);
          g.setFlag('mounts', [0, 0, 0, 0]);
          g.closePuzzle();
          if (goal === 'workshop') {
            g.say([
              { text: 'The mirror bites, the beam bends off it and races down into the workshop below — and where it lands, a black recess under the bench is suddenly, helpfully lit.' },
              { who: 'Quinn', text: 'Light does love to give things away. Let\'s go and see what the dark was keeping.' },
            ]);
          } else {
            g.say([
              { text: 'I bend the beam all the way to the foot of the tower. Deep below, the vault fills with hard light — and I can feel, without seeing it, a Star waking on a wall over an empty stone.' },
              { who: 'Quinn', text: 'Now to go down and catch it in the act.' },
            ]);
          }
        } else {
          g.sfx('error');
          const n = (g.getFlag('beamFails') || 0) + 1;
          g.setFlag('beamFails', n);
          g.setFlag('beamMsg', n >= 3
            ? 'Still spilling wide. Stop guessing and READ the drift: the log says which way the Star leans at that hour, and that is the only angle the mirrors may take.'
            : 'The beam scatters off into the stonework, useful to no one. A mirror set wrong sends light everywhere but home.');
          rerender();
        }
      }));
    },
  },

  starCipher: {
    title: 'The Note in Star-Signs',
    /* Six dials spell the key. The key is the diamond's name — VESPER —
       "what he called her", learnable from the intro and the dome ceiling.
       Decoding reveals a NEW fact (his warning), never restated elsewhere. */
    render(g) {
      const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const dial = i => `
        <div class="safe-dial">
          <button class="btn" data-act="u${i}">&#9650;</button>
          <div class="safe-digit">${LETTERS[g.getFlag('cip' + i) || 0]}</div>
          <button class="btn" data-act="d${i}">&#9660;</button>
        </div>`;
      const plate = g.flag('cipherSolved')
        ? '<p class="puzzle-msg">"Any competent optician can forge my Star. Trust the drift, not the light. &mdash; H.V."</p>'
        : `<p class="puzzle-msg">${g.getFlag('cipMsg') || 'Six glyphs, six dials. "Keyed to what I called her" — and he called his diamond by one name only.'}</p>`;
      return `
        <div class="safe-dials">${[0, 1, 2, 3, 4, 5].map(dial).join('')}</div>
        ${plate}
        <div class="puzzle-controls">
          <button class="btn" data-act="decode">Read the note</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'decode') {
          const word = [0, 1, 2, 3, 4, 5].map(i => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[g.getFlag('cip' + i) || 0]).join('');
          if (word === 'VESPER') {
            g.setFlag('cipherSolved');
            g.sfx('success');
            g.addClue('warning');
            g.closePuzzle();
            g.say([
              { text: 'The glyphs resolve. In the Professor\'s hand: "Any competent optician can forge my Star. Trust the drift, not the light."' },
              { who: 'Quinn', text: 'He knew. He knew his treasure could be counterfeited in light, and he left me the warning under lock. "Trust the drift." The log it is.' },
            ]);
          } else {
            g.sfx('error');
            g.setFlag('cipFails', (g.getFlag('cipFails') || 0) + 1);
            g.setFlag('cipMsg', (g.getFlag('cipFails') || 0) >= 3
              ? 'Still nonsense. He named it for the evening star — go and read what the dome itself calls her, then come back.'
              : 'The glyphs stay glyphs. Wrong key. What did the old man call his diamond?');
            rerender();
          }
          return;
        }
        const dir = act[0] === 'u' ? 1 : 25;
        const i = Number(act.slice(1));
        g.setFlag('cip' + i, ((g.getFlag('cip' + i) || 0) + dir) % 26);
        g.setFlag('cipMsg', '');
        rerender();
      }));
    },
  },

  benchHunt: {
    title: "The Optician's Bench",
    wide: true,
    /* Find the four things Roke let lie among his glass. Two decoys punish
       a careless click (they cost you a find). No "Spots" reveal in here. */
    render(g) {
      const found = g.getFlag('huntFound') || [];
      const TARGETS = [
        { id: 'lens', x: 60, y: 150, name: 'a stray objective lens' },
        { id: 'mirror', x: 250, y: 90, name: 'a silvered hand-mirror' },
        { id: 'prism', x: 430, y: 175, name: 'a heavy bevelled prism' },
        { id: 'paste', x: 545, y: 110, name: 'a lump of faceted glass' },
      ];
      const spot = t => `<button class="hunt-spot${found.indexOf(t.id) >= 0 ? ' got' : ''}" data-act="find-${t.id}" style="left:${t.x}px;top:${t.y}px" aria-label="${t.name}"></button>`;
      const decoy = (n, x, y) => `<button class="hunt-spot" data-act="find-decoy${n}" style="left:${x}px;top:${y}px" aria-label="glint of nothing"></button>`;
      const scene = `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" class="hunt-svg">
        <rect x="0" y="0" width="640" height="300" fill="#1a1730"/>
        <rect x="0" y="230" width="640" height="70" fill="#2a2442"/>
        <g fill="#3a3560" stroke="#4a4570" stroke-width="2">
          <ellipse cx="110" cy="200" rx="40" ry="24"/><rect x="270" y="150" width="60" height="70" rx="6"/>
          <circle cx="470" cy="215" r="30"/><path d="M 560 150 l 40 20 l -40 40 l -20 -30 Z"/>
          <rect x="150" y="180" width="70" height="40" rx="6"/><ellipse cx="390" cy="210" rx="34" ry="18"/>
        </g>
        <g fill="#cbb8ff" opacity="0.5">
          <path d="M 470 190 l 20 8 l -20 30 l -10 -18 Z"/><ellipse cx="110" cy="196" rx="18" ry="22"/>
          <circle cx="300" cy="120" r="16"/><path d="M 560 128 l 16 8 l -16 24 l -8 -12 Z"/>
        </g>
        <text x="320" y="286" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#8a83b0" font-style="italic">four things here don&rsquo;t belong &mdash; ${found.length}/4 found</text>
      </svg>`;
      return `<div class="hunt-scene">${scene}${TARGETS.map(spot).join('')}${decoy(1, 200, 200)}${decoy(2, 490, 90)}</div>
        <p class="puzzle-msg">${g.getFlag('huntMsg') || 'Look, don\'t grab. A wrong snatch scatters what you\'ve gathered.'}</p>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Step away</button></div>`;
    },
    wire(g, root, rerender) {
      const NAMES = { lens: 'groundLens', mirror: 'handMirror', prism: 'masterPrism', paste: 'pasteReplica' };
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act.slice(0, 10) === 'find-decoy') {
          g.sfx('error');
          const found = (g.getFlag('huntFound') || []).slice();
          const lost = found.pop();
          g.setFlag('huntFound', found);
          if (lost) g.removeItem(NAMES[lost]);
          g.setFlag('huntMsg', 'Only a glint off a water-glass — and I fumble the last thing I picked up back into the heap. Slower, Ivy.');
          rerender();
          return;
        }
        const id = act.slice(5);
        const found = (g.getFlag('huntFound') || []).slice();
        if (found.indexOf(id) >= 0) return;
        found.push(id);
        g.setFlag('huntFound', found);
        g.addItem(NAMES[id]);
        g.sfx('pickup');
        if (found.length >= 4) {
          g.setFlag('benchDone');
          g.addClue('makersBevel');
          g.addClue('replica');
          g.setFlag('huntFound', []);
          g.closePuzzle();
          g.say([
            { text: 'Four things that oughtn\'t be there, now mine: a stray lens, a silvered hand-mirror, a heavy bevelled prism, and a lump of leaded glass faceted to the Vesper\'s very shape.' },
            { who: 'Quinn', text: 'The glass "Vesper" throws no fire — a stand-in, for a stone already gone. And the prism\'s bevel is the twin of the mirror\'s. One hand ground both. I wonder whose.' },
          ]);
        } else {
          g.setFlag('huntMsg', '');
          rerender();
        }
      }));
    },
  },

  driftProof: {
    title: 'The Drift of the Star',
    wide: true,
    /* Reproduce the caustic's nightly walk as the log records it: it leans
       west-to-east across five hours. Eight points; the true drift is the
       lower arc, left to right. The theft-night Star did none of this. */
    render(g) {
      const path = g.getFlag('driftPath') || [];
      const PTS = [[200, 70], [270, 90], [320, 150], [320, 230], [270, 290], [200, 310], [130, 290], [80, 230]];
      let dots = '';
      PTS.forEach((p, i) => {
        const on = path.indexOf(i + 1) >= 0;
        dots += `<circle cx="${p[0]}" cy="${p[1]}" r="12" fill="${on ? '#cbb8ff' : '#2a2442'}" stroke="#8a83b0" stroke-width="2"/>`;
      });
      let trail = '';
      if (path.length) {
        trail = '<polyline points="' + path.map(n => PTS[n - 1].join(',')).join(' ') + '" fill="none" stroke="#cbb8ff" stroke-width="3" stroke-dasharray="4 4"/>';
      }
      const btns = PTS.map((_, i) => `<button class="btn drift-pt" data-act="pt-${i + 1}">${i + 1}</button>`).join('');
      return `<div class="drift-caustic"><svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="380" rx="8" fill="#201a34" stroke="#2a2442" stroke-width="3"/>
        <text x="200" y="30" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#8a83b0" font-style="italic">the wall, and how the Star crosses it</text>
        ${trail}${dots}
      </svg></div>
        <p class="puzzle-msg">${g.getFlag('driftMsg') || 'Walk the Star\'s honest path, dusk to dawn — the way the log draws it, along the lower arc from the west edge to the east.'}</p>
        <div class="puzzle-controls">${btns}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="submit">That is the way it drifts</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const SOLUTION = [8, 7, 6, 5, 4]; // west edge up-to-down-to-east: lower arc left→right
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'submit') {
          const path = g.getFlag('driftPath') || [];
          if (path.join(',') === SOLUTION.join(',')) {
            g.setFlag('driftDone');
            g.sfx('success');
            g.addClue('drift');
            g.setFlag('driftPath', []);
            g.closePuzzle();
            g.say([
              { text: 'Point by point, the Star\'s true march comes back under my finger, exactly as the log has it — a slow drift across the wall as the whole sky wheels overhead.' },
              { who: 'Quinn', text: 'And the sealed night, it did none of this. It stood stock-still from dusk to dawn. A caustic that ignores the heavens isn\'t following a diamond. It\'s following a clock.' },
            ]);
          } else {
            g.sfx('error');
            g.setFlag('driftFails', (g.getFlag('driftFails') || 0) + 1);
            g.setFlag('driftPath', []);
            g.setFlag('driftMsg', (g.getFlag('driftFails') || 0) >= 3
              ? 'Not his hand. The log walks the LOWER arc, west edge to east — point eight, then down and round to point four. Trace that.'
              : 'That\'s not the walk the log records. Clear it and follow his arc again, dusk to dawn.');
            rerender();
          }
          return;
        }
        // a point
        const n = Number(act.slice(3));
        const path = (g.getFlag('driftPath') || []).slice();
        if (path.indexOf(n) >= 0) return;
        path.push(n);
        g.setFlag('driftPath', path);
        g.setFlag('driftMsg', '');
        rerender();
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch4 = {
  id: 'ch4',
  order: 4,
  title: "The Astronomer's Star",
  subtitle: 'Chapter Four — The Stolen Light',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'gallery',

  intro: [
    { text: 'The Vaux Observatory, a stone tower on the cliff, and at its foot a vault holding the Vesper — the Evening Star, a diamond the town knows only by the figure it throws on the wall each clear night.' },
    { who: 'Fenn', text: 'I sealed that door myself at dusk, Detective, with my own wax. It was whole at dawn. The window bars would not pass a fist. And a dozen witnesses watched the Star shine on the wall the whole night through.' },
    { who: 'Fenn', text: 'At first light the seal broke clean and the pedestal was bare. The stone was there all night — they SAW it — and it was gone. I am a solicitor. I do not believe in the impossible. I believe I am being made a fool of.' },
    { who: 'Quinn', text: 'Then we agree on the important thing, Mr. Fenn. A room that cannot be robbed has just been robbed — so one of the things everyone knows about it is a lie. Let\'s go and find the lie.' },
  ],

  /* Ordered two-tier hints. These nudge the THINKING, never the action:
     no rung names a mirror setting, a dial letter, or the culprit. */
  hints: [
    {
      when: g => !g.hasClue('theft') || !g.hasClue('starWatched'),
      nudge: 'Every witness swears the Star shone all night. Ask each of them the same quiet question — did you see the diamond, or did you see its light?',
      more: 'Testimony about a Star on a wall is not testimony about a stone on a pedestal. Start with the heir in the gallery and the watchman in the vault.',
    },
    {
      when: g => !g.hasClue('sealIntact'),
      nudge: 'The room itself is honest: sealed door, barred window, sound walls. If nothing came or went in the night, the interesting hour is not in the night at all.',
      more: 'Look hard at the seal and the window. When could the stone have left, if not while it was watched?',
    },
    {
      when: g => !g.flag('cipherSolved'),
      nudge: 'The Professor left a note in his own star-alphabet, and told you its key: "what I called her."',
      more: g => 'He named his diamond for the evening star. Read what the dome ceiling calls her if the name won\'t come — the cipher wants that one word.',
    },
    {
      when: g => !g.hasClue('drift'),
      nudge: 'A real caustic cannot hold still — it rides the turning sky. The observing log knows exactly how the Star should move.',
      more: 'Reproduce the Star\'s nightly drift from the log, then set it against the sealed-night sketch. What does a Star that refuses to move tell you it is obeying?',
    },
    {
      when: g => !g.flag('oculusWound'),
      nudge: 'You cannot investigate light you haven\'t got. The whole tower is built to catch a beam and throw it about — but nothing turns until the clockwork is wound.',
      more: 'The winder is in the gallery; the empty socket is in the dome. Wind the oculus and you\'ll have a beam to spend.',
    },
    {
      when: g => !g.flag('lit_workshop'),
      nudge: 'The dark keeps things the light would give away. There is a beam upstairs and a black recess downstairs — introduce them.',
      more: 'At the heliostat, aim the beam down onto the workshop. Two instruments already told you the true angle: the log\'s drift and the dome\'s setting. The mirrors only have to obey it.',
    },
    {
      when: g => !g.flag('benchDone'),
      nudge: 'A man hides a thing best in a heap of its own kind. Roke\'s bench is all glass; some of that glass is evidence.',
      more: 'Search the bench and take the four things that don\'t belong — but look before you grab; a careless snatch scatters what you\'ve found.',
    },
    {
      when: g => !g.hasClue('sourceTraced') || !g.hasClue('noFire'),
      nudge: 'Light always confesses where it comes from, if you make it travel — and it will tell you, too, whether a gem ever touched it.',
      more: g => 'Aim the beam to the vault to wake the Star, then follow it home with the tracing scope, and read its colours with the spectroscope. A reflection and a refraction do not look alike.',
    },
    {
      when: () => true,
      nudge: 'You can accuse the man, or you can accuse the light. Only one of them will confess in front of witnesses.',
      more: 'Everything he built to fake a diamond is still up in that cornice. Make a Star wake with nothing on the pedestal, before them all, and let the room draw its own conclusion.',
    },
  ],

  end: {
    kicker: 'Chapter Four Complete',
    title: "The Astronomer's Star",
    body: 'A real theft, dressed as a wonder. Silvan Roke carried the Vesper out the afternoon before the seal, ' +
      'sold it to his collector, and left a lamp to keep its watch — trusting the whole town to believe its own eyes. ' +
      'The Star still wakes each night on the vault wall, for anyone who now knows to ask what casts it.',
    next: null,
  },
};

})();
