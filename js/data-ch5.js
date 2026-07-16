/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Five — "The Impresario's Ghost".

   For six weeks a wail out of empty, dust-sealed Box Five has been driving
   the Empress Music Hall dark. The manager, Aurelius Pettibone, hires Ivy
   Quinn to catch the ghost — or to certify, in writing, that it cannot be
   caught. The truth: there is no ghost and never was. Pettibone built one —
   a pin-barrel, a bellows and one church pipe in a hidden chapel room,
   ducted up to Box Five — to frighten his own company into surrendering
   their lease-for-life so he could sell the freehold to the railway.
   He hired the detective to fail, famously. The client is the culprit.

   Verb: listen/tune. The chapter's novelty is the WIND: cranking the
   understage bellows sets the windOn flag — the whole house breathes,
   scenes re-render with stirring curtains and sound-ripples, and Box
   Five's gated hotspot appears. Sound is evidence throughout: pitch is
   matched, ducts are told apart by ear, walls are tapped for hollows,
   and the finale is a vigil kept in the dark, by ear alone. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ITEMS = {
  crackedTrumpet: {
    name: 'Cracked Ear-Trumpet',
    desc: 'The old prompter\'s ear-trumpet, split down the bell. It gathers a whisper and then hisses it away through the crack. Wants sealing.',
    icon: Art.ch5.icons.crackedTrumpet,
  },
  waxStub: {
    name: 'Stub of Stage Wax',
    desc: 'A stub of theatrical wax from Madame\'s dressing table — the kind that seals greasepaint, gaps in scenery, and, at a pinch, a split in brass.',
    icon: Art.ch5.icons.waxStub,
  },
  earTrumpet: {
    name: 'Ear Trumpet',
    desc: 'The prompter\'s trumpet, its crack sealed with stage wax. Held to a grille, a wall or a duct mouth, it turns a murmur into testimony.',
    icon: Art.ch5.icons.earTrumpet,
  },
  lampKey: {
    name: 'Lamp-Room Key',
    desc: 'From the manager\'s board, tagged LAMP RM. in copperplate. Wick has never heard of a lamp room, and this house lights itself with gas. A key to a room that doesn\'t exist.',
    icon: Art.ch5.icons.lampKey,
  },
  organPipe: {
    name: 'Church Pipe',
    desc: 'A cold tin organ pipe, heavier than it looks, stamped at the foot like all honest pipes: HOYLE & SON — and its note, G. The ghost\'s one and only word.',
    icon: Art.ch5.icons.organPipe,
  },
  railLetter: {
    name: 'Railway Letter',
    desc: 'The Metropolitan & Coast Railway Company begs to renew its offer for the freehold of the Empress — "contingent, as before, upon vacant possession." Addressed to A. Pettibone, Esq.',
    icon: Art.ch5.icons.railLetter,
  },
};

const COMBOS = {
  'crackedTrumpet+waxStub': g => {
    g.removeItem('crackedTrumpet');
    g.removeItem('waxStub');
    g.addItem('earTrumpet');
    g.setFlag('trumpetMade');
    g.narrate('Wax warmed in the palm, worked along the split, smoothed with a thumbnail: the trumpet holds a whisper again. The Empress may keep no secrets from a sealed ear.');
  },
};

const CLUES = {
  haunting: {
    title: 'The Gallery Ghost',
    text: [
      'Six weeks of it: a wail out of Box Five during the performance — always Box Five, always locked, always empty — until the gallery stampedes for the doors. Three sopranos gone, half the band, most of the audience.',
      'Nobody has ever SEEN anything. Every scrap of this ghost arrives by ear.',
    ],
  },
  hiredEar: {
    title: 'The client\'s brief',
    text: [
      '"Catch it — or certify in writing that it cannot be caught." Mr. Pettibone will pay the same fee for either paper, and pressed the second on me twice.',
      'A curious thing to shop for, a detective\'s failure. Most men who hire me want to be told the truth. He wants to be told SOMETHING, signed.',
    ],
  },
  leaseForLife: {
    title: 'The company\'s lease',
    text: [
      'Old Pettibone\'s deed, as Madame Varga recites it: the company holds the Empress "so long as they choose to play on." They cannot be put out, rents raised or building sold from under them.',
      'They can only QUIT. Which means they can only be frightened out. Whoever profits from an empty Empress must first empty it.',
    ],
  },
  boxFive: {
    title: 'Box Five',
    text: [
      'The dust in the haunted box lies like fresh snow — six weeks of wailing and not one footprint. Nothing with feet has stood in Box Five.',
      'But low behind the half-curtain there is a brass grille, and through the trumpet it breathes: far-off cellar air, faintly tallow-smelling, in a box that should have no breath at all. The ghost doesn\'t live here. It is DELIVERED here.',
    ],
  },
  vargaPitch: {
    title: 'The ghost\'s note',
    text: [
      'Tuned against Madame Varga\'s ear: the wail is a single G, dead in the centre of the note, every night the same.',
      'Madame\'s verdict: "A pipe\'s G — an open diapason. No throat holds one note forever, detective, and that thing has never once drawn breath." A voice that never breathes is not a voice.',
    ],
  },
  ductPath: {
    title: 'The fifth mouth',
    text: [
      'At the junction under the stage, four duct mouths answer the trumpet with honest rooms — the stage, the pit, the gallery, the dressing rooms.',
      'The fifth breathes close, boxy air with tallow on it — Box Five\'s breath, to the smell — and its trunk turns down INTO the old chapel wall. Box Five talks to a room this house pretends not to have.',
    ],
  },
  deadWall: {
    title: 'The wall that breathes',
    text: [
      'Through the trumpet, the bricked chapel arch is not quite silent: a thread of moving air whispers behind stone that was sealed a generation ago.',
      'Walls do not breathe. Rooms breathe. There is a live room behind that dead wall.',
    ],
  },
  lampRoomKey: {
    title: 'A key for no room',
    text: [
      'On the manager\'s board, in the manager\'s copperplate: LAMP RM. — a room no soul in the building has heard of, in a house lit end to end by gas.',
      'The key turned like it was oiled on Sunday, and the "brick" arch swung on silent hinges. Somebody loves that door\'s silence, and only one man\'s board held its key.',
    ],
  },
  ghostMachine: {
    title: 'The ghost\'s workshop',
    text: [
      'Behind the chapel wall: a pin-barrel scored with one dismal phrase, a bellows fat as a bishop, a wind-chest bearing a single church pipe, and a duct climbing toward Box Five. A ghost, laid out like a patient on a table.',
      'The crank is greased, the hinges oiled, the tallow fresh over old. This ghost is TENDED — weekly, by somebody with keys, patience and a talent for silence.',
    ],
  },
  pipeMatch: {
    title: 'The pipe and the gap',
    text: [
      'The machine\'s one pipe slides into the empty socket of the lobby organ front like a tooth into its own jaw — HOYLE & SON, 1811, the same stamp as its brothers, its note struck at the foot: G.',
      'The ghost\'s voice was plundered from the manager\'s own wall, ten steps from the manager\'s own door.',
    ],
  },
  breathProof: {
    title: 'The house breathes',
    text: [
      'With the bellows cranked and my own wind in the ducts, the half-curtain in Box Five lifts and settles, lifts and settles — breathing in an empty box, two floors above my hands.',
      'Machine and box are one instrument. Whoever winds one, plays the other.',
    ],
  },
  railMotive: {
    title: 'Vacant possession',
    text: [
      'Behind the hollow office panel: the Metropolitan & Coast Railway renews its offer for the freehold of the Empress — "contingent, as before, upon vacant possession." Addressed to A. Pettibone, Esq.',
      '"As before": this is an old courtship. The lease-for-life is the one thing standing between the manager and the railway\'s money — and the lease dies only if the company quits.',
    ],
  },
  showmansGhost: {
    title: 'A showman\'s ghost',
    text: [
      'The box-office ledger, six weeks of ruin — and a pattern in it: the ghost sings only to FULL houses. Thin Tuesdays, never a whisper. It has never once wasted a wail on empty seats.',
      'Real grief doesn\'t check the receipts. This ghost has a showman\'s instinct for an audience — or a showman at the crank.',
    ],
  },
  resolution: {
    title: 'The ghost, under new management',
    text: [
      'Caught hand-on-crank before the whole company: Mr. Aurelius Pettibone, impresario — who built a ghost to frighten out the living, then hired a detective famous enough that her failure would certify it.',
      'The fraud goes to the Yard; the Empress goes back to work. I was paid to listen. For once in this house, somebody got exactly what they paid for.',
    ],
  },
};

const SCENES = {

  // ---------- the auditorium (start) ----------

  house: {
    name: 'The Auditorium',
    art: Art.ch5.house,
    hotspots: [
      {
        id: 'passDoor', rect: [42, 470, 150, 252], label: 'The pass door to the stage',
        onClick: g => g.goTo('stage'),
      },
      {
        id: 'foyerDoors', rect: [1382, 540, 180, 222], label: 'The doors to the foyer',
        onClick: g => g.goTo('foyer'),
      },
      {
        id: 'box5', rect: [1080, 220, 290, 240], label: 'Box Five',
        onClick: g => g.openZoom('box5'),
      },
      {
        id: 'footlights', rect: [150, 640, 720, 90], label: 'The footlights',
        onClick: g => g.narrate('Cold burners in a brass trough. The wail never rose from down here — every witness had it high on the right, out of Box Five, riding over the band like a soloist who knows her house.'),
      },
      {
        id: 'chandelier', rect: [690, 30, 220, 190], label: 'The chandelier',
        onClick: g => g.narrate('The gasman swears it sways of itself on wailing nights, and crosses himself. Chandeliers don\'t frighten; they hang in draughts. Something in this house moves AIR when the ghost sings.'),
      },
    ],
    zooms: {
      box5: {
        title: 'Box Five',
        art: Art.ch5.box5Zoom,
        hotspots: [
          {
            id: 'dust', rect: [120, 600, 560, 160], label: 'The dust nobody walked',
            onClick: g => g.narrate('Six weeks of nightly wailing, and the dust lies like fresh snow — no boot, no bare foot, no bird. Nothing with feet has ever stood in this box while its ghost performed.'),
          },
          {
            id: 'grille', rect: [840, 490, 200, 160], label: 'The grille behind the curtain',
            onClick: g => {
              if (g.hasClue('boxFive')) { g.narrate('The grille breathes its faint tallow breath. Boxes don\'t breathe. Ducts do.'); return; }
              g.narrate('Low behind the half-curtain, a brass grille — and out of it, when the house should have no breath at all, a warm stir of air. My bare ear catches a murmur and loses it. I want a better ear than mine.');
            },
            use: {
              earTrumpet: g => {
                if (g.hasClue('boxFive')) { g.narrate('The same far-off breath: cellar air and tallow. The ghost is delivered to this box like the morning milk.'); return; }
                g.sfx('breath');
                g.addClue('boxFive');
                g.say([
                  { text: 'The trumpet against the grille, and the murmur becomes a place: far-off cellar air, a big soft space of it, faintly tallow-smelling — in a box that hasn\'t been opened in six weeks.' },
                  { who: 'Quinn', text: 'The ghost doesn\'t live in Box Five. It\'s DELIVERED here — piped up like gas, from somewhere that burns cheap candles. I\'ve met stage machinery before. I\'ve never met it haunted.' },
                ]);
              },
            },
          },
          {
            id: 'stirring', rect: [790, 250, 240, 230], label: 'The stirring curtain',
            visible: g => g.flag('windOn'),
            onClick: g => {
              if (g.hasClue('breathProof')) { g.narrate('Lift and settle, lift and settle — my own wind, breathing in an empty box. I could watch it all night, now I know whose lungs it is.'); return; }
              g.sfx('breath');
              g.addClue('breathProof');
              g.say([
                { text: 'The half-curtain over the grille lifts and settles, lifts and settles — stirred by the wind I cranked into the ducts two floors below, with my own hands.' },
                { who: 'Quinn', text: 'Machine and box are one instrument. Whoever winds one, plays the other — and now I\'ve played it myself, there\'s no ghost left in it for me.' },
              ]);
            },
          },
        ],
      },
    },
  },

  // ---------- the stage ----------

  stage: {
    name: 'The Stage',
    art: Art.ch5.stage,
    onEnter: g => {
      if (!g.flag('stageSeen')) {
        g.setFlag('stageSeen');
        g.say([{ who: 'Quinn', text: 'The boards, seen from the working side: ropes, wax, chalk marks, and one lamp burning against the dark — the ghost light. Theatres keep one flame lit for luck. This one looks like it\'s working overtime.' }]);
      }
    },
    hotspots: [
      {
        id: 'passDoor', rect: [34, 400, 140, 290], label: 'The pass door to the house',
        onClick: g => g.goTo('house'),
      },
      {
        id: 'trap', rect: [990, 790, 220, 170], label: 'The trap stairs',
        onClick: g => g.goTo('under'),
      },
      {
        id: 'varga', rect: [826, 470, 148, 260], label: 'Madame Celeste Varga',
        onClick: g => {
          if (!g.flag('vargaMet')) {
            g.setFlag('vargaMet');
            g.say([
              { who: 'Varga', text: 'You may tell Mr. Pettibone I am NOT leaving. My grandmother sang on these boards. The deed says the company plays here so long as we choose to play — and I choose, detective. I choose nightly.' },
              { who: 'Quinn', text: 'The lease dies only if the company quits?' },
              { who: 'Varga', text: 'We cannot be put out. Only frightened out. Half the band has obliged already.' },
              { who: 'Quinn', text: 'And the thing that frightens them — you\'ve heard it closer than anyone. What is it like?' },
              { who: 'Varga', text: 'One note. Always ONE note, always the same, riding over everything — a pipe\'s note, not a throat\'s. A singer knows breath when she hears it, Miss Quinn. That thing has never once drawn breath.' },
            ], g2 => g2.addClue('leaseForLife'));
          } else if (g.hasClue('vargaPitch') && !g.flag('ended')) {
            g.say([{ who: 'Varga', text: 'A pipe\'s G. I have duelled organs in five capitals, detective, and never lost to a machine yet. I do not propose to begin at the Empress.' }]);
          } else {
            g.say([{ who: 'Varga', text: 'I am not leaving. Sing that back to whoever asks. If you need my ear, it is the best in the house, and it is at your service.' }]);
          }
        },
      },
      {
        id: 'promptCorner', rect: [200, 460, 200, 270], label: 'The prompt corner',
        onClick: g => {
          if (g.flag('trumpetTaken')) { g.narrate('The prompter\'s high desk, a script gone soft at the corners, and the ghost of a thousand whispered cues.'); return; }
          g.setFlag('trumpetTaken');
          g.addItem('crackedTrumpet');
          g.narrate('On a nail above the prompter\'s desk, an old ear-trumpet — the prompter\'s tool for catching a dried actor\'s mumble from the wings. Cracked down the bell, sadly; it hisses like a kettle. But a crack is only a gap with ambitions.');
        },
      },
      {
        id: 'dressingTable', rect: [1240, 420, 220, 300], label: 'The dressing table',
        onClick: g => {
          if (g.flag('waxTaken')) { g.narrate('Powder, paint, and a mirror ringed with gas jets — the tools of a woman who has no intention of taking off her armour.'); return; }
          g.setFlag('waxTaken');
          g.addItem('waxStub');
          g.narrate('Madame\'s dressing table. Among the paint: a stub of stage wax — for sealing greasepaint, gaps in scenery, and anything else that leaks. The theatre mends itself with this stuff.');
        },
      },
      {
        id: 'monochord', rect: [470, 470, 200, 220], label: 'The practice monochord',
        onClick: g => {
          if (!g.flag('vargaMet')) { g.narrate('A practice monochord — one string, one tuning peg, a rehearsal-room relic. Until I know what note I\'m hunting, it\'s furniture.'); return; }
          if (g.hasClue('vargaPitch')) { g.narrate('The string still holds the ghost\'s G, if ever I want reminding. I don\'t. It\'s the one tune I can\'t get out of my head.'); return; }
          g.say([
            { who: 'Quinn', text: 'Madame — you said your ear is at my service. Hum me the ghost, and hold it.' },
            { who: 'Varga', text: 'Hold it? Detective, I shall hold it till Tuesday. Tune your little string; I shall tell you when you and the ghost agree.' },
          ], g2 => g2.openPuzzle('pitchMatch'));
        },
      },
      {
        id: 'flyRopes', rect: [1480, 220, 110, 500], label: 'The fly ropes',
        onClick: g => g.narrate('The fly ropes, each pinned and named in chalk. I know creaking rope when I hear it, and Wick knows these by voice in the dark. None of them sings a steady G.'),
      },
    ],
  },

  // ---------- the understage ----------

  under: {
    name: 'The Understage',
    art: Art.ch5.under,
    onEnter: g => {
      if (!g.flag('underSeen')) {
        g.setFlag('underSeen');
        g.say([{ who: 'Quinn', text: 'Under the boards: stone piers, counterweights, the limelight sighing up through its slot — and the bones of whatever stood here before the Empress did. A theatre\'s cellar remembers everything.' }]);
      }
    },
    hotspots: [
      {
        id: 'stairsStage', rect: [60, 300, 180, 440], label: 'The stairs up to the stage',
        onClick: g => g.goTo('stage'),
      },
      {
        id: 'stepsFoyer', rect: [280, 560, 160, 180], label: 'The steps up to the foyer',
        onClick: g => g.goTo('foyer'),
      },
      {
        id: 'wick', rect: [446, 500, 148, 240], label: 'Wick, the limelight boy',
        onClick: g => {
          if (!g.flag('wickMet')) {
            g.setFlag('wickMet');
            g.say([
              { who: 'Wick', text: 'It ain\'t me, miss, whatever the scene-shifters say. I know every board that talks and every rope that groans in this house — that\'s my TRADE — and I say the Empress speaks, but she never used to sing.' },
              { who: 'Quinn', text: 'Then help me learn her voice. What\'s down here that a stranger wouldn\'t know?' },
              { who: 'Wick', text: 'They built her on the old Bethel chapel — that arch in the wall\'s the last of it, bricked up before my time. And don\'t ask me for keys: Master Pettibone keeps every key in the house on his office board. I ain\'t trusted with the coal-hole.' },
            ], g2 => g2.addClue('haunting'));
          } else if (g.hasClue('ghostMachine') && !g.flag('ended')) {
            g.say([{ who: 'Wick', text: 'A barrel-organ ghost! I TOLD them it weren\'t me. Didn\'t I say she never used to sing? Boards talk, miss. Somebody TAUGHT this house music.' }]);
          } else {
            g.say([{ who: 'Wick', text: 'Every board that talks, every rope that groans — I know them by name, miss. The wail ain\'t one of mine.' }]);
          }
        },
      },
      {
        id: 'limeRig', rect: [600, 400, 170, 260], label: 'The limelight rig',
        onClick: g => g.narrate('Wick\'s limelight, hissing its slow green-white sigh up through the stage slot. The one flame in this house that earns its keep honestly.'),
      },
      {
        id: 'junction', rect: [930, 380, 270, 280], label: 'The duct junction',
        onClick: g => {
          if (g.hasClue('ductPath')) { g.narrate('Five tin mouths. Four honest rooms, and the fifth road runs into the chapel wall. I\'ve heard all this tin has to say.'); return; }
          g.narrate('The house\'s speaking-tubes and vent ducts gather here — one trunk, five tin mouths, all murmuring like seashells. A bare ear can\'t tell one from another. A trumpet against each mouth might.');
        },
        use: {
          earTrumpet: g => {
            if (g.hasClue('ductPath')) { g.narrate('The tin has testified. The fifth mouth is the ghost\'s road.'); return; }
            g.openPuzzle('ductPairs');
          },
        },
      },
      {
        id: 'arch', rect: [1270, 300, 240, 420], label: 'The old chapel wall',
        visible: g => !g.flag('chapelOpen'),
        onClick: g => {
          if (g.hasClue('deadWall')) { g.narrate('Brick and limewash, sound-dead a generation — except that it breathes. A door dressed as a wall wants a key kept as a lie.'); return; }
          g.narrate('The last of the old Bethel chapel: an arch, bricked and limewashed before Wick was born. Sound-dead, or supposed to be. Everything else in this house talks; the silence of this wall is starting to feel like a performance.');
        },
        use: {
          earTrumpet: g => {
            if (g.hasClue('deadWall')) { g.narrate('The same thread of wind, whispering behind dead stone. Rooms breathe. Walls don\'t.'); return; }
            g.sfx('breath');
            g.addClue('deadWall');
            g.say([
              { text: 'Trumpet to the limewash. The wall is not quite silent: a thread of moving air whispers behind it, patient as a sleeper — stone that was sealed a generation ago, breathing.' },
              { who: 'Quinn', text: 'Walls do not breathe, and dead rooms have no weather. There is a live room behind this arch — and live rooms have doors, and doors have keys, and Wick tells me exactly one man in this house keeps those.' },
            ]);
          },
          lampKey: g => {
            g.setFlag('chapelOpen');
            g.sfx('unlock');
            g.retireItem('lampKey');
            g.addClue('lampRoomKey');
            g.say([
              { text: 'The key turns like it was oiled on Sunday. A seam opens in the limewash, and the "wall" swings — a flat of painted brick on hinges that make no more noise than falling dust.' },
              { who: 'Quinn', text: 'A lamp room with no lamps, behind a wall with a keyhole, on a board in the manager\'s office. Somebody loves this door\'s silence. Let\'s go and disappoint them.' },
            ], g2 => {
              g2.setFlag('machineSeen');
              g2.addClue('ghostMachine');
              g2.openZoom('chapel');
              g2.say([
                { text: 'Tallow-light on a low stone room. A pin-barrel long as my arm. A bellows fat as a bishop. A wind-chest with one lonely church pipe — and a tin duct climbing away into the dark, toward Box Five. The Empress\'s ghost, laid out like a patient on a table.' },
                { who: 'Quinn', text: 'Greased crank, oiled hinges, fresh tallow over old. This ghost is TENDED — weekly, by somebody with keys, patience, and a talent for silence.' },
              ]);
            });
          },
        },
      },
      {
        id: 'chapelDoor', rect: [1270, 300, 240, 420], label: 'The chapel doorway',
        visible: g => g.flag('chapelOpen'),
        onClick: g => g.openZoom('chapel'),
      },
      {
        id: 'vigil', rect: [620, 140, 360, 240], label: 'Keep the midnight vigil',
        visible: g => g.hasClue('vargaPitch') && g.hasClue('ductPath') && g.hasClue('ghostMachine')
          && g.hasClue('pipeMatch') && g.hasClue('breathProof') && g.hasClue('railMotive')
          && g.hasClue('showmansGhost') && g.hasClue('leaseForLife') && !g.flag('ended'),
        onClick: g => {
          g.say([
            { who: 'Quinn', text: 'I have the machine, the motive, and the man — and none of it convicts like a hand caught on the crank. So: word goes round the company, loud enough to reach the foyer. The detective is beaten. She keeps one last vigil in Box Five at midnight, and if the ghost sings for her, she signs Mr. Pettibone his paper: HAUNTED, certified.' },
            { text: 'The pipe goes back on its wind-chest. The crank stands exactly as its keeper left it. And in the blind dark of the understage, the company and I hood our lanterns, and wait, and listen.' },
          ], g2 => {
            g2.setFlag('windOn', false);
            g2.setFlag('pipeFitted', false);
            g2.openPuzzle('vigil');
          });
        },
      },
    ],
    zooms: {
      chapel: {
        title: 'The Ghost\'s Workshop',
        art: Art.ch5.chapelZoom,
        hotspots: [
          {
            id: 'barrel', rect: [240, 330, 320, 220], label: 'The pin-barrel',
            onClick: g => g.narrate('A barrel scored with one short phrase, over and over — a music box with a single dismal tune. The pins are worn bright at the tips. This ghost has given a great many performances.'),
          },
          {
            id: 'pipe', rect: [760, 200, 90, 230], label: 'The one church pipe',
            visible: g => !g.flag('pipeTaken'),
            onClick: g => {
              g.setFlag('pipeTaken');
              g.addItem('organPipe');
              g.narrate('The pipe lifts off its chest — cold tin, heavier than it looks, and stamped at the foot like all honest pipes with its maker and its note. HOYLE & SON. G. Somewhere upstairs, I fancy, there\'s a jaw missing this exact tooth.');
            },
          },
          {
            id: 'crank', rect: [930, 420, 190, 200], label: 'The crank',
            onClick: g => {
              if (!g.flag('windOn')) {
                g.setFlag('windOn');
                g.sfx('breath');
                g.say([
                  { text: 'I lean my weight on the crank. Click, click — the ratchet takes up, the bellows fills under my hands, and far above, faint as weather, the Empress draws one long breath.' },
                  { who: 'Quinn', text: 'There\'s my wind in the house\'s lungs. Now — let\'s go upstairs and see what my ghost stirs.' },
                ]);
              } else {
                g.setFlag('windOn', false);
                g.narrate('I ease the crank back and the house lets its breath out, slow and polite. Everything stands as its keeper left it.');
              }
            },
          },
          {
            id: 'bellows', rect: [630, 470, 280, 210], label: 'The bellows',
            onClick: g => g.narrate('A bellows fat as a bishop, patched with the same stage wax that mends everything in this house. Wind for one pipe, cranked by one hand. The whole ghost runs on elbow grease.'),
          },
          {
            id: 'tallowShelf', rect: [150, 140, 240, 120], label: 'The tallow shelf',
            onClick: g => g.narrate('Cheap tallow candles, fresh drips over old drips over older. Gas would need the main and the gasman; tallow needs only a shilling and a match. Somebody visits this room often enough to keep it stocked — and never after dark on wailing nights, I\'d wager, but just before.'),
          },
        ],
      },
    },
  },

  // ---------- the grand foyer ----------

  foyer: {
    name: 'The Grand Foyer',
    art: Art.ch5.foyer,
    onEnter: g => {
      if (!g.flag('foyerSeen')) {
        g.setFlag('foyerSeen');
        g.say([{ who: 'Quinn', text: 'Gilt, marble, and gas — the front the Empress shows the street. Handsome as a wedding cake, and lately about as well attended.' }]);
      }
    },
    hotspots: [
      {
        id: 'houseDoors', rect: [80, 360, 230, 360], label: 'The doors to the house',
        onClick: g => g.goTo('house'),
      },
      {
        id: 'cellarSteps', rect: [1410, 690, 170, 280], label: 'The cellar steps',
        onClick: g => g.goTo('under'),
      },
      {
        id: 'pettibone', rect: [330, 500, 150, 260], label: 'Mr. Aurelius Pettibone',
        onClick: g => {
          if (!g.hasClue('hiredEar')) {
            g.say([
              { who: 'Pettibone', text: 'Miss Quinn! Prowling already — capital, capital. Search anywhere, question anyone; the Empress is your oyster. Though I confess I begin to think our visitor is beyond nature. Six weeks! No footprint, no wire, no WIRE, madam — I looked!' },
              { who: 'Quinn', text: 'Who profits, Mr. Pettibone, if the hall stands haunted?' },
              { who: 'Pettibone', text: 'PROFITS? Madam, I lose forty pound a dark night! No, no. You\'ll find no profit here — only grief. Which is why, if it comes to it, your certificate — your considered professional word that the thing is beyond explanation — would at least let us all grieve OFFICIALLY.' },
              { who: 'Quinn', text: 'You\'ve mentioned that certificate twice now. Most men who hire me want the truth. I\'ll get you the truth, Mr. Pettibone — whichever paper it fits on.' },
            ], g2 => { g2.addClue('haunting'); g2.addClue('hiredEar'); });
          } else if (g.hasClue('railMotive') && !g.flag('ended')) {
            g.say([{ who: 'Pettibone', text: 'Progress, dear lady? Do remember the OTHER paper remains available. The wording can be quite accommodating. Quite... brief.' }]);
          } else {
            g.say([{ who: 'Pettibone', text: 'Mind the gilt, detective — it flakes if you look at it too hard. Everything in this house does, lately.' }]);
          }
        },
      },
      {
        id: 'organFront', rect: [560, 180, 480, 460], label: 'The organ front',
        onClick: g => g.openZoom('facade'),
      },
      {
        id: 'officeDoor', rect: [1170, 380, 200, 340], label: 'The manager\'s office',
        onClick: g => g.openZoom('office'),
      },
    ],
    zooms: {
      facade: {
        title: 'The Old Organ Front',
        art: Art.ch5.facadeZoom,
        hotspots: [
          {
            id: 'socket', rect: [640, 160, 90, 380], label: 'The empty socket',
            visible: g => !g.flag('pipeFitted'),
            onClick: g => g.narrate('Nine show pipes ranked in gilt — no, eight, and a gap like a missing tooth. Show pipes are dumb as statues, mostly. Somebody helped themselves to the one that wasn\'t.'),
            use: {
              organPipe: g => {
                g.setFlag('pipeFitted');
                g.sfx('success');
                g.addClue('pipeMatch');
                g.retireItem('organPipe');
                g.say([
                  { text: 'The pipe slides into the empty socket like a tooth into its own jaw. HOYLE & SON, 1811 — the same stamp as its brothers, the same gilt worn in the same places.' },
                  { who: 'Quinn', text: 'The ghost\'s voice was plundered from the manager\'s own lobby, ten steps from the manager\'s own door — and its note is Madame\'s G. I\'ll want it back downstairs before the ghost misses it. But first, the whole house shall see where it grew.' },
                ]);
              },
            },
          },
          {
            id: 'plaque', rect: [480, 590, 240, 90], label: 'The builder\'s plaque',
            onClick: g => g.narrate('HOYLE & SON, organ-builders, 1811. The chapel\'s organ went for scrap when the Empress went up — all but the show front. And, it would seem, one working survivor.'),
          },
        ],
      },
      office: {
        title: 'The Manager\'s Office',
        art: Art.ch5.officeZoom,
        hotspots: [
          {
            id: 'ledger', rect: [400, 450, 220, 160], label: 'The box-office ledger',
            onClick: g => {
              if (g.hasClue('showmansGhost')) { g.narrate('Full houses, wails. Thin houses, silence. A ghost that reads its receipts.'); return; }
              g.sfx('page');
              g.addClue('showmansGhost');
              g.say([
                { text: 'The box-office ledger: six weeks of ruin in a neat clerk\'s hand. And a pattern, once you look for it — the ghost sings only to FULL houses. Thin Tuesdays, never a whisper. Not one wail wasted on empty seats.' },
                { who: 'Quinn', text: 'Real grief doesn\'t check the receipts. This ghost has a showman\'s instinct for an audience. I know precisely one showman in this building.' },
              ]);
            },
          },
          {
            id: 'keyBoard', rect: [130, 200, 200, 260], label: 'The key board',
            onClick: g => {
              if (g.flag('keyTaken')) { g.narrate('A bare hook where LAMP RM. hung. I don\'t feel guilty. I feel thorough — and he DID say the Empress was my oyster.'); return; }
              if (g.hasClue('deadWall') && g.hasClue('ductPath')) {
                g.setFlag('keyTaken');
                g.addItem('lampKey');
                g.say([
                  { text: 'Every key in the house, each tagged in the manager\'s copperplate — STAGE DR., WARDROBE, COAL... and one, third from the bell: LAMP RM.' },
                  { who: 'Quinn', text: 'A lamp room. In a house lit end to end by gas, that Wick has never heard of, on a wall that breathes. Mr. Pettibone said search anywhere. I\'m choosing to remember that fondly.' },
                ]);
                return;
              }
              g.narrate('Rows of keys in copperplate: STAGE DR., WARDROBE, COAL, and the rest of a working house. Nothing here I know enough to want — yet. Keys answer questions; you have to bring the question.');
            },
          },
          {
            id: 'wainscot', rect: [870, 250, 270, 400], label: 'The wainscot',
            onClick: g => {
              if (g.flag('panelDone')) { g.narrate('The hollow panel hangs open on its secret hinge, empty now, and considerably less smug.'); return; }
              g.narrate('Nine panels of handsome oak — the only wall in the room hung with nothing at all. Walls with nothing to say usually have something to hide. A knuckle would tell me, if I had a better ear to put behind it.');
            },
            use: {
              earTrumpet: g => {
                if (g.flag('panelDone')) { g.narrate('The wall has said its piece.'); return; }
                g.openPuzzle('panelTap');
              },
            },
          },
          {
            id: 'desk', rect: [380, 600, 470, 100], label: 'The manager\'s desk',
            onClick: g => g.narrate('Final notices in every drawer, duns under the blotter — the Empress is eating him alive, and has been for a year. Poverty isn\'t guilt. But it is excellent kindling.'),
          },
        ],
      },
    },
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  /* Tune the monochord against Madame Varga's held note. The string
     starts flat; 'sound the pair' plays both and she says higher/lower.
     Target is 7 on a peg-scale of 1..10 (the ghost's G). */
  pitchMatch: {
    title: 'The Ghost\'s Note',
    render(g) {
      const val = g.getFlag('pitchVal') || 4;
      const sx = 60 + (val - 1) * 31;
      return `<div class="pitch-board"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="220" rx="8" fill="#241214" stroke="#3a2a2e" stroke-width="3"/>
        <rect x="40" y="90" width="320" height="70" rx="10" fill="#3a2620" stroke="#241610" stroke-width="4"/>
        <line x1="52" y1="96" x2="348" y2="96" stroke="#e8dfc8" stroke-width="${(2 + val * 0.2).toFixed(1)}"/>
        <circle cx="${sx}" cy="96" r="9" fill="#cba045" stroke="#8a6a30" stroke-width="3"/>
        <g stroke="#5a4a42" stroke-width="2">${[1,2,3,4,5,6,7,8,9,10].map(i => `<line x1="${60 + (i - 1) * 31}" y1="166" x2="${60 + (i - 1) * 31}" y2="176"/>`).join('')}</g>
        <text x="200" y="40" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#d8b8a8" font-style="italic">Madame holds the ghost&rsquo;s note. The string holds mine.</text>
        <text x="200" y="200" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#8a7a72">slack &#9664; &mdash; the peg &mdash; &#9654; taut</text>
      </svg></div>
        <p class="puzzle-msg">${g.getFlag('pitchMsg') || 'Tighten or slacken the string, then sound the pair together until the two notes lock.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="slacken">Slacken</button>
          <button class="btn" data-act="tighten">Tighten</button>
          <button class="btn" data-act="sound">Sound the pair</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const val = g.getFlag('pitchVal') || 4;
        if (act === 'tighten' || act === 'slacken') {
          const nv = Math.max(1, Math.min(10, val + (act === 'tighten' ? 1 : -1)));
          g.setFlag('pitchVal', nv);
          g.sfx('pitch' + nv);
          g.setFlag('pitchMsg', '');
          rerender();
          return;
        }
        // sound the pair
        g.sfx('pitch' + val);
        g.sfx('hum');
        if (val === 7) {
          g.setFlag('pitchDone');
          g.sfx('success');
          g.addClue('vargaPitch');
          g.closePuzzle();
          g.say([
            { text: 'The peg turns by a hair — and the two notes stop quarrelling and lock, like hands. Madame lifts one finger without breaking her breath.' },
            { who: 'Varga', text: 'There. G — the open G of a church diapason, dead in the centre of the note. I have duelled organs in five capitals, detective. I know a pipe when I sing against one.' },
            { who: 'Quinn', text: 'A pipe\'s G, out of a box no pipe stands in — from a house whose organ went for scrap forty years ago. Then somewhere in this building is a pipe nobody plays. Officially.' },
          ]);
        } else {
          const n = (g.getFlag('pitchFails') || 0) + 1;
          g.setFlag('pitchFails', n);
          g.setFlag('pitchMsg', n >= 3
            ? 'Madame\'s patience is operatic, but listen for the BEATS — two notes nearly agreed throb against each other, slower and slower as they close. Chase the slow throb.'
            : (val < 7 ? 'Madame\'s eyebrow climbs a semitone: "Higher, detective."' : 'A wince, beautifully controlled: "Lower. You are sharp of me."'));
          rerender();
        }
      }));
    },
  },

  /* The duct junction: five tin mouths. Listen at each with the trumpet;
     four give honest rooms, the fifth breathes tallow and turns into the
     chapel wall. Mark the ghost's road — marking an honest room fails. */
  ductPairs: {
    title: 'The Five Mouths',
    wide: true,
    render(g) {
      const heard = ['a', 'b', 'c', 'd', 'e'].filter(k => g.flag('duct_' + k));
      const mouth = (i, k) => `<g>
        <rect x="${40 + i * 70}" y="120" width="56" height="46" rx="8" fill="#8a7f72" stroke="#5a5248" stroke-width="3"/>
        <ellipse cx="${68 + i * 70}" cy="143" rx="16" ry="12" fill="#1a0e14"/>
        <text x="${68 + i * 70}" y="196" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${g.flag('duct_' + k) ? '#efd58a' : '#8a7a72'}">${k.toUpperCase()}</text>
      </g>`;
      return `<div class="duct-board"><svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="220" rx="8" fill="#241214" stroke="#3a2a2e" stroke-width="3"/>
        <rect x="180" y="10" width="40" height="110" fill="#8a7f72" stroke="#5a5248" stroke-width="3"/>
        ${['a', 'b', 'c', 'd', 'e'].map((k, i) => mouth(i, k)).join('')}
        <text x="200" y="214" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#8a7a72" font-style="italic">${heard.length}/5 mouths heard</text>
      </svg></div>
        <p class="puzzle-msg">${g.getFlag('ductMsg') || 'One trunk, five mouths. The trumpet against each in turn — then mark the mouth that lies.'}</p>
        <div class="puzzle-controls">
          ${['a', 'b', 'c', 'd', 'e'].map(k => `<button class="btn" data-act="listen-${k}">Listen at ${k.toUpperCase()}</button>`).join('')}
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="mark">That one is the ghost’s road</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const REPORTS = {
        a: 'Rosin, swept boards, a chalk-marked rope creaking — the STAGE, honest as bread.',
        b: 'A draught worrying loose sheet-music, the cold smell of brass — the PIT.',
        c: 'A long sigh of high cold air with rain on its breath — the GALLERY.',
        d: 'A kettle, and two dressers arguing about a hem — the DRESSING ROOMS.',
        e: 'Close, boxy air. Tallow on its breath — the smell of Box Five\'s grille, to the life. And this mouth\'s trunk doesn\'t climb with the others. It turns down, INTO the chapel wall.',
      };
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act.slice(0, 7) === 'listen-') {
          const k = act.slice(7);
          g.sfx(k === 'e' ? 'breath' : 'knock');
          g.setFlag('duct_' + k);
          g.setFlag('ductLast', k);
          g.setFlag('ductMsg', REPORTS[k]);
          rerender();
          return;
        }
        // mark
        const last = g.getFlag('ductLast');
        if (last === 'e') {
          g.setFlag('ductsDone');
          g.sfx('success');
          g.addClue('ductPath');
          g.closePuzzle();
          g.say([
            { text: 'Four mouths gave me honest rooms — stage, pit, gallery, a kettle and a quarrel. The fifth breathes tallow, and its trunk runs down into the old chapel wall.' },
            { who: 'Quinn', text: 'Box Five doesn\'t talk to any room of this house. It talks to a room this house pretends not to have. Ghosts want exorcists; hidden rooms want detectives. Lucky for the Empress which one they hired.' },
          ]);
        } else {
          g.sfx('error');
          g.setFlag('ductMsg', last
            ? 'That mouth handed me an honest room, plain as a signpost. Honest rooms don\'t wail. Listen again — mark the mouth that lies.'
            : 'Mark which? I haven\'t put the trumpet to anything yet. The tin speaks first; I choose after.');
          rerender();
        }
      }));
    },
  },

  /* The office wainscot: nine oak panels. Tap each with a knuckle and
     listen through the trumpet — eight answer dead, one hollow. Prying
     before the wall confesses gets you nothing. */
  panelTap: {
    title: 'Nine Smug Panels',
    render(g) {
      const found = g.flag('panelFound');
      const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n =>
        `<button class="btn" data-act="tap-${n}">${found && n === 6 ? '&#9679;' : '&#9633;'} ${n}</button>`).join('');
      return `<div class="panel-grid">${btns}</div>
        <p class="puzzle-msg">${g.getFlag('panelMsg') || 'A knuckle to each panel, the trumpet behind it. Wood tells the truth even when its owner doesn\'t.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="pry">Pry the hollow one</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'pry') {
          if (!g.flag('panelFound')) {
            g.sfx('error');
            g.setFlag('panelMsg', 'Pry which? The wall hasn\'t confessed yet. Knuckles first, crowbar manners after.');
            rerender();
            return;
          }
          g.setFlag('panelDone');
          g.sfx('unlock');
          g.addItem('railLetter');
          g.addClue('railMotive');
          g.closePuzzle();
          g.say([
            { text: 'The hollow panel swings on a hidden hinge. Behind it, one letter, kept close: the Metropolitan & Coast Railway Company begs to renew its offer for the freehold of the Empress — "contingent, as before, upon vacant possession." Addressed to A. Pettibone, Esq.' },
            { who: 'Quinn', text: '"As before." This is an old courtship. And "vacant possession" is the one thing the deed will never give him — unless the company gives it up first. Somebody has forty thousand reasons to want this house frightened empty.' },
          ]);
          return;
        }
        const n = Number(act.slice(4));
        if (n === 6) {
          g.sfx('hollow');
          g.setFlag('panelFound');
          g.setFlag('panelMsg', 'THERE. Dead, dead, dead — and one panel with a whole room\'s echo behind its ribs. Hollow as an alderman\'s promise.');
        } else {
          g.sfx('knock');
          g.setFlag('panelMsg', 'Knock. Dead as a magistrate. Solid oak, solid brick behind it.');
        }
        rerender();
      }));
    },
  },

  /* The finale: a vigil kept in the blind dark, by ear. Three sounds come
     in order; unhood the lanterns at the only moment no lie survives.
     Too early and he talks his way out; too late and he's gone. */
  vigil: {
    title: 'The Midnight Vigil',
    render(g) {
      const step = g.getFlag('vigilStep') || 0;
      const HEARD = [
        'Black dark, and the house settling: mice in the walls, timbers ticking as the Empress cools, Wick breathing through his mouth beside me.',
        'The area door, soft as an apology. Then a step on the chapel stair &mdash; unhurried, sure of its own house.',
        'A ratchet takes up &mdash; click, click &mdash; and deep in the wall a bellows begins to fill, drawing one long breath.',
      ];
      return `<div class="vigil-board"><svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="130" rx="8" fill="#0d0609"/>
        ${[80, 200, 320].map((lx, i) => `<g>
          <rect x="${lx - 14}" y="58" width="28" height="40" rx="6" fill="#241214" stroke="#3a2a2e" stroke-width="2"/>
          <circle cx="${lx}" cy="78" r="5" fill="#ffca7a" opacity="${i < step ? '0.55' : '0.12'}"/>
        </g>`).join('')}
        <text x="200" y="30" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#8a7a72" font-style="italic">lanterns hooded &mdash; the whole company, holding its breath</text>
      </svg></div>
        <p class="puzzle-msg">${g.getFlag('vigilMsg') || HEARD[step]}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="wait">Wait, and listen</button>
          <button class="btn" data-act="lanterns">NOW &mdash; lanterns!</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        const step = g.getFlag('vigilStep') || 0;
        if (act === 'wait') {
          if (step === 0) { g.sfx('creak'); g.setFlag('vigilStep', 1); g.setFlag('vigilMsg', ''); rerender(); return; }
          if (step === 1) { g.sfx('wind'); g.setFlag('vigilStep', 2); g.setFlag('vigilMsg', ''); rerender(); return; }
          // waited too long: the wail sings and he's gone
          g.sfx('wail');
          g.setFlag('vigilStep', 0);
          g.setFlag('vigilMsg', 'The wail sings its one G into the dark — and before a lantern moves, the cellar door claps shut behind it. Gone. He\'ll laugh us off by morning. We hood up and keep the vigil again.');
          rerender();
          return;
        }
        // lanterns
        if (step === 0) {
          g.sfx('error');
          g.setFlag('vigilMsg', 'Lanterns blaze on... mice. Wick treads on a cat. The company\'s nerve won\'t stand many false dawns — we hood up and start the watch again.');
          rerender();
          return;
        }
        if (step === 1) {
          g.sfx('error');
          g.setFlag('vigilStep', 0);
          g.setFlag('vigilMsg', 'The light finds Mr. Pettibone on the stair in his nightshirt, wounded innocence itself: "May a man not walk his own cellars?" We could not say he might not. Hood up; another night.');
          rerender();
          return;
        }
        // step 2: hand on the crank — no lie survives
        g.setFlag('ended');
        g.setFlag('vigilStep', 0);
        g.sfx('success');
        g.retireItem('earTrumpet');
        g.closePuzzle();
        g.say([
          { text: 'The lanterns unhood as one. And there — hand still on the crank, the bellows half-charged, the wail unborn in the chest — stands Mr. Aurelius Pettibone, impresario, in his shirt-sleeves.' },
          { who: 'Pettibone', text: 'I— Detective! Thank heaven you\'re here. I heard the villain at his work and came down at once to—' },
          { who: 'Quinn', text: 'To wind his machine for him? The key to this room hangs on your board. The tallow on that shelf is bought on your accounts. And the railway\'s letter wants "vacant possession" in your name. You didn\'t hire me to catch a ghost, Mr. Pettibone. You hired me to FAIL — famously. My signature was to be the last nail in the Empress\'s coffin.' },
          { who: 'Varga', text: 'You WAILED at us, Aurelius. Six weeks. And little Wick carried the blame of it in every public house on the street.' },
          { who: 'Pettibone', text: 'The house is DYING, Celeste! Forty pound a week, dying! The railway\'s money would have pensioned every soul of you like duchesses. I built you a golden goodbye — and you were all too proud to be frightened into taking it!' },
          { who: 'Quinn', text: 'You built a ghost to evict the living, and dressed the fraud as a favour. The Yard can price the fraud; the company can price the fright. My bill is simpler. I was paid to listen, Mr. Pettibone — and for once in this house, somebody got exactly what they paid for.' },
        ], g2 => {
          g2.addClue('resolution');
          g2.endChapter();
        });
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch5 = {
  id: 'ch5',
  order: 5,
  title: "The Impresario's Ghost",
  subtitle: 'Chapter Five — The Haunted Hall',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'house',

  intro: [
    { text: 'The Empress Music Hall, crimson and gilt under one guttering chandelier — dark now a full week. Six weeks of hauntings: a wail out of empty, locked, dust-sealed Box Five, night upon night, until the gallery stampedes for the doors.' },
    { who: 'Pettibone', text: 'Three sopranos gone, Miss Quinn! Half my band! The Empress — MY Empress — emptied by a voice with no body, no footprint, and no respect whatever for the interval.' },
    { who: 'Pettibone', text: 'I shall be plain, madam. I am buying one of two papers. The ghost, caught and explained — or your written word, as the most celebrated ear in England, that it CANNOT be. Even a great detective\'s failure has its value. It would settle... certain questions.' },
    { who: 'Quinn', text: 'What a curious thing to shop for, Mr. Pettibone — my failure, priced and framed. Very well. Let\'s find out which paper you\'ve bought.' },
  ],

  /* Ordered two-tier hints. These nudge the THINKING, never the action:
     no rung names a panel number, the target note, or the vigil's moment. */
  hints: [
    {
      when: g => !g.hasClue('haunting') || !g.hasClue('leaseForLife') || !g.flag('wickMet'),
      nudge: 'Three people live with this ghost: the man who pays for it, the woman who defies it, and the boy who\'s blamed for it. Ask each what the wail SOUNDS like — and who is better off if it stays.',
      more: 'Mr. Pettibone keeps to his foyer, Madame Varga to her stage, Wick to the understage. None of them will bite, and at least two of them won\'t lie.',
    },
    {
      when: g => !g.flag('trumpetMade'),
      nudge: 'This is a case for the ears, and mine are only human. The old prompter kept a better one — cracked now. But the stage keeps wax as well as secrets.',
      more: 'The prompt corner keeps the trumpet; Madame\'s dressing table keeps the wax. A cracked bell can be sealed.',
    },
    {
      when: g => !g.hasClue('boxFive'),
      nudge: 'The ghost keeps an address: Box Five. Rooms that wail deserve a close listen — low down, behind the curtain, where the box does its breathing.',
      more: 'Take the ear trumpet into Box Five and hold it to the grille. And mind the dust on your way in — it has something to say about feet.',
    },
    {
      when: g => !g.hasClue('vargaPitch'),
      nudge: 'Madame Varga can hold the ghost\'s note till Tuesday, and her ear is at your service. Steel and string don\'t flatter — set the monochord against her and tune until the two lock.',
      more: 'Tighten or slacken, then sound the pair together and mind her eyebrow. And ask yourself what kind of throat holds ONE note forever without ever drawing breath.',
    },
    {
      when: g => !g.hasClue('ductPath'),
      nudge: 'The house talks through its tin. Five mouths under the stage — four will hand you honest rooms. Listen for the one that lies.',
      more: 'The trumpet against each duct mouth in turn. When one of them breathes tallow at you, notice which way its trunk runs.',
    },
    {
      when: g => !g.flag('chapelOpen'),
      nudge: 'A wall that breathes is a door out of work.',
      more: 'The trumpet against the old chapel arch, first. Then think where a careful manager keeps the key to a room nobody in the house has ever heard of.',
    },
    {
      when: g => !g.hasClue('breathProof') || !g.hasClue('pipeMatch'),
      nudge: 'You\'ve found the instrument. Now make it testify — its wind against the box upstairs, its pipe against the lobby.',
      more: 'Crank the bellows, then go and see what stirs in Box Five. And carry the pipe up to the organ front: teeth remember their own jaws.',
    },
    {
      when: g => !g.hasClue('railMotive') || !g.hasClue('showmansGhost'),
      nudge: 'A ghost this punctual keeps books — and so does the man it works for. His office knows more than he tells.',
      more: 'The ledger first; count which nights the ghost thought worth singing for. Then the wainscot — offices keep their best paper behind the wall, where a knock comes back hollow.',
    },
    {
      when: () => true,
      nudge: 'You know the machine, the motive and the man. None of it convicts like a hand caught on the crank.',
      more: 'Let it be known the detective is beaten, and keep one last vigil in the dark below. A man on his own stair is only a man on a stair — hold your light for the moment no lie survives.',
    },
  ],

  end: {
    kicker: 'Chapter Five Complete',
    title: "The Impresario's Ghost",
    body: 'The ghost of the Empress was a barrel, a bellows and one stolen pipe, wound by the very hand that signed my fee — ' +
      'a manager who hired a detective to fail. The company keeps its lease; the railway keeps its money. ' +
      'And the Empress plays to full houses again, top of the bill: THE HAUNTED HALL — its ghost, under new management, ' +
      'singing one honest G at nine o\'clock sharp.',
    next: null,
  },
};

})();
