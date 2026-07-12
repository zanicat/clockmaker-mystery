/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Three — "The Botanist's Bequest".

   Sir Digby Croft willed his fortune to whichever relative tends his
   glasshouse "until the Midnight Empress blooms" — and the Empress,
   rarest orchid in England, has vanished, pot and all. The truth:
   no crime. Digby repotted and disguised her himself, leaving a trail
   (coded journal → maze sundial → planting map) only a true gardener
   could follow. His tortoise has been asleep on her since scene one.

   Whimsical, daylight, hub topology. The chapter's novelty is the
   `night` flag: Digby's nocturne mechanism toggles every scene to
   moonlight, and some hotspots only exist after dark.

   NOTE: array-valued flags (mazePath) must always be SET to a fresh
   array, never mutated in place — setFlag is what persists them. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ITEMS = {
  secateurs: {
    name: 'Secateurs',
    desc: 'Sir Digby\'s pruning shears, sharp as a solicitor. For cutting back anything overfamiliar.',
    icon: Art.ch3.icons.secateurs,
  },
  brassWinder: {
    name: 'Brass Winder',
    desc: 'A heavy brass winding key from the tool rack. Sized for something grander than a mantel clock.',
    icon: Art.ch3.icons.winder,
  },
  trowel: {
    name: 'Hand Trowel',
    desc: 'A gardener\'s trowel, edge polished by honest work. Made for digging small, deliberate holes.',
    icon: Art.ch3.icons.trowel,
  },
  journal: {
    name: 'Garden Journal',
    desc: '"Let the garden choose." Digby\'s coded journal — bed names, bearings, and a maze riddle, with Latin in the margins.',
    icon: Art.ch3.icons.journal,
  },
  herbariumPage: {
    name: 'Herbarium Page',
    desc: 'A pressed specimen of the Midnight Empress: strap leaves with a silver midrib, unmistakable once you\'ve seen them.',
    icon: Art.ch3.icons.herbarium,
  },
  mapFragment: {
    name: 'Map Fragment',
    desc: 'The torn corner of the master planting map, dug from a biscuit tin. Smells faintly of shortbread.',
    icon: Art.ch3.icons.fragment,
  },
  wateringCan: {
    name: 'Watering Can',
    desc: 'A long-spouted watering can. A garden is tended or it is merely owned.',
    icon: Art.ch3.icons.wateringCan,
  },
  lettuce: {
    name: 'Lettuce',
    desc: 'One crisp lettuce from the cold frame. Irresistible, if you happen to be a tortoise.',
    icon: Art.ch3.icons.lettuce,
  },
};

const COMBOS = {};

const CLUES = {
  bequest: {
    title: 'The bequest',
    text: [
      '"My fortune to whichever of my relations tends my garden until the Midnight Empress blooms." — Sir Digby Croft\'s will, entire.',
      'The Empress has vanished, pot and all. No bloom, no bequest — and the heirs are measuring each other for handcuffs.',
    ],
  },
  hoskinsTale: {
    title: 'Hoskins on Sir Digby',
    text: [
      '"Fifty years I gardened for him, and he never once trusted a soul who couldn\'t read a garden. Said a bed tells you everything, if you know its grammar."',
      '"And mind where you step. Gladstone has right of way. Sir Digby was most particular."',
    ],
  },
  seedPackets: {
    title: 'Four seed packets',
    text: [
      'Nasturtium — "sow in SPRING, obviously."',
      'Foxglove — "high SUMMER, and stand well back."',
      'Sweet pea — "AUTUMN, whatever the books say."',
      'Hellebore — "WINTER, when nothing sensible grows. My kind of plant."',
    ],
  },
  journal: {
    title: 'The garden journal',
    text: [
      '"To whoever reads gardens: let mine choose. What I have hidden, I have hidden in plain bed."',
      'The maze riddle: "Widdershins first at the laurel; then twice to midnight; sunward once at the yew; last, toward the morning — and take tea with the gnomon."',
      'The margins are annotated in Latin, in a hand too small for my patience. Petronella\'s the botanist.',
    ],
  },
  sunward: {
    title: 'Hoskins translates',
    text: [
      '"Sunward\'s south, miss — any gardener knows. Midnight\'s north, morning\'s east. And widdershins is leftwise: west, if you\'re facing away from the house."',
    ],
  },
  emptyPlinth: {
    title: 'The empty plinth',
    text: [
      'The Empress\'s plinth, bare. But the dust tells a story: the pot wasn\'t lifted — it SLID, in a long smear, about eight inches off the ground.',
      'Beside the smear: a half-eaten lettuce leaf. Burglars rarely stop for salad.',
    ],
  },
  petronella: {
    title: 'Miss Petronella Croft',
    text: [
      '"Bertram couldn\'t tell an orchid from an artichoke, but he CAN tell a will from a windfall. Of course I suspect him."',
      'She has watered the wing every day since the funeral. Not because of the will, she says. Because the plants were thirsty.',
    ],
  },
  bertramWitness: {
    title: 'Mr. Bertram Croft, witness',
    text: [
      '"I SAW the burglar, you know. Night before they noticed the flower gone. Low fellow. Very low. Moving with tremendous... deliberation. Wearing a sort of — helmet."',
      '"And when I challenged him, Detective, he HISSED at me."',
    ],
  },
  empressLeaf: {
    title: 'What the Empress looks like',
    text: [
      'From Digby\'s herbarium: the Midnight Empress has strap leaves with a silver midrib. The bloom is violet-white and opens only at midnight.',
      'Out of flower, she could pass for something perfectly dull. Say — an aspidistra.',
    ],
  },
  nocturne: {
    title: 'The nocturne mechanism',
    text: [
      'Digby\'s bloom clock shades the whole glasshouse and lights phosphor lamps — artificial midnight, "for the persuasion of night-blooming stock."',
      'The garden can be told it is night. The Empress can be persuaded to bloom.',
    ],
  },
  sundialKey: {
    title: 'The sundial\'s secret',
    text: [
      'Carved on the maze sundial: "HER MAJESTY FACES THE MORNING — D.C."',
      'The planting map\'s rows are named for monarchs. Her Majesty is the REGINA row — read from the morning side.',
    ],
  },
  bearings: {
    title: 'Petronella reads the margins',
    text: [
      '"Regina regnat: a muro matutino, lux tertia." — "The Queen reigns: from the morning wall, the third light."',
      'The Regina row, third bed counted from the east. Petronella translated it at sight, then apologised for showing off.',
    ],
  },
  bedPlot: {
    title: 'Bed K',
    text: [
      'The master map, corner restored: Regina row, third bed from the morning wall — Bed K, the palm bed in the Great Glasshouse.',
      'Registered contents, in Digby\'s hand: "one aspidistra, QUITE ORDINARY, do not fuss." Underlined twice.',
    ],
  },
  mossTrail: {
    title: 'The phosphor trail',
    text: [
      'Under artificial midnight, dots of phosphor paint glow along the orchid wing floor — a dotted line from the empty plinth toward the Great Glasshouse.',
      'Digby marked the pot\'s road. He WANTED it followed — by someone who\'d learned to make it night.',
    ],
  },
  foundHer: {
    title: 'The Empress, found',
    text: [
      'Under the dust, the "aspidistra" has strap leaves with a silver midrib. The shabby pot\'s label, in Digby\'s hand: "ASPIDISTRA — QUITE ORDINARY, DO NOT FUSS."',
      'Nobody stole anything. Digby repotted her himself and set his tortoise to sleep on the evidence.',
    ],
  },
  digbyLetter: {
    title: 'Digby\'s letter, in the pot',
    text: [
      '"If you are reading this, you made it night, followed my beds, and moved Gladstone politely. The garden has chosen you, as I knew it would choose whoever deserved it."',
      '"The fortune is yours to steward. The Empress is HERS — she merely permits us to watch. — D.C."',
    ],
  },
};

const SCENES = {

  // ---------- the great glasshouse (hub) ----------

  glasshouse: {
    name: 'The Great Glasshouse',
    art: Art.ch3.glasshouse,
    hotspots: [
      {
        id: 'hoskins', rect: [260, 470, 160, 350], label: 'Hoskins, the head gardener',
        onClick: g => {
          if (!g.hasClue('hoskinsTale')) {
            g.say([
              { who: 'Hoskins', text: 'Detective, is it. Fifty years I gardened for Sir Digby, and he never once trusted a soul who couldn\'t read a garden.' },
              { who: 'Hoskins', text: 'Said a bed tells you everything, if you know its grammar. Whatever\'s happened to the Empress, the garden knows it.' },
              { who: 'Quinn', text: 'Then I\'ll learn the grammar. Anything else I should know?' },
              { who: 'Hoskins', text: 'Mind where you step. Gladstone has right of way. Sir Digby was most particular.' },
            ], g2 => {
              g2.addClue('bequest');
              g2.addClue('hoskinsTale');
            });
          } else if (g.hasItem('journal') && !g.hasClue('sunward')) {
            g.say([
              { who: 'Quinn', text: 'Hoskins — the journal says "sunward at the yew." Sunward being...?' },
              { who: 'Hoskins', text: 'South, miss. Any gardener knows. Midnight\'s north, morning\'s east — and widdershins is leftwise. West, if you\'re facing away from the house.' },
              { who: 'Quinn', text: 'A compass in an apron. Thank you.' },
            ], g2 => g2.addClue('sunward'));
          } else if (g.hasClue('bedPlot') && !g.flag('bloomed')) {
            g.say([{ who: 'Hoskins', text: 'Bed K? That dusty aspidistra Gladstone sleeps on? ...Well I\'ll be blowed. Fifty years, and the old man could still fox me.' }]);
          } else {
            g.say([{ who: 'Hoskins', text: 'Garden won\'t weed itself, miss. Sing out if you need the names of things.' }]);
          }
        },
      },
      {
        id: 'shedDoor', rect: [40, 460, 160, 330], label: 'Potting shed',
        onClick: g => g.goTo('pottingShed'),
      },
      {
        id: 'mazeDoor', rect: [740, 440, 170, 250], label: 'Garden door to the hedge maze',
        onClick: g => g.goTo('maze'),
      },
      {
        id: 'orchidDoor', rect: [1408, 460, 160, 330], label: 'Orchid wing door',
        onClick: g => {
          if (g.flag('ivyCut')) { g.goTo('orchidWing'); return; }
          g.narrate('The orchid wing door, buried under a fortnight\'s enthusiastic ivy. Untended, it grows an inch a day. I refuse to take it personally.');
        },
        use: {
          secateurs: g => {
            if (g.flag('ivyCut')) { g.narrate('The way is clear.'); return; }
            g.setFlag('ivyCut');
            g.sfx('success');
            g.retireItem('secateurs');
            g.say([
              { text: 'Snip. Snip-snip. The ivy comes away in armfuls and the door swings free.' },
              { who: 'Quinn', text: 'Nothing personal. Professional courtesy, one Ivy to another.' },
            ]);
          },
        },
      },
      {
        id: 'officeDoor', rect: [1110, 700, 140, 110], label: 'Garden office',
        onClick: g => g.goTo('gardenOffice'),
      },
      {
        id: 'gladstone', rect: [620, 560, 180, 120], label: 'Gladstone',
        visible: g => !g.flag('gladstoneMoved'),
        onClick: g => {
          if (g.hasClue('bedPlot')) {
            g.narrate('Gladstone, asleep on the very pot I need. He is ninety if he\'s a day and moving him bodily would be an assault on a national institution. He\'ll want persuading. Tortoises have one price.');
          } else {
            g.narrate('A tortoise, asleep against a flowerpot with the boneless commitment of the truly old. The brass on his shell reads GLADSTONE. He declines to comment.');
          }
        },
        use: {
          lettuce: g => {
            g.setFlag('gladstoneMoved');
            g.removeItem('lettuce');
            g.say([
              { text: 'I set the lettuce down a respectful distance away. A geological pause. Then Gladstone rises and pursues it at a stately toddle — the very picture of Bertram\'s "low fellow in a helmet."' },
              { who: 'Quinn', text: 'There goes the burglar. Hissed at you, did he, Mr. Croft?' },
            ]);
          },
        },
      },
      {
        id: 'gladstoneMoved', rect: [810, 590, 180, 110], label: 'Gladstone',
        visible: g => g.flag('gladstoneMoved'),
        onClick: g => g.narrate('Gladstone addresses his lettuce with the unhurried confidence of a creature who has outlived three prime ministers and intends to outlive the salad.'),
      },
      {
        id: 'dullPot', rect: [640, 460, 130, 170], label: 'A dull aspidistra',
        onClick: g => {
          if (g.flag('bloomed')) { g.narrate('The Midnight Empress, in full imperial bloom. Quite ordinary indeed.'); return; }
          if (g.flag('leafMatched')) { g.narrate('The Empress in her shabby pot, incognita no longer. She wants her midnight, and a drink.'); return; }
          if (g.hasClue('bedPlot')) { g.narrate('Bed K\'s registered contents: "one aspidistra, quite ordinary, do not fuss." A plant nobody would look at twice — under a tortoise nobody would dare move. If I could compare the leaves against something...'); return; }
          g.narrate('A very dull plant in a very shabby pot, currently serving as a tortoise\'s pillow. Neither invites questions.');
        },
        use: {
          herbariumPage: g => {
            if (!g.flag('gladstoneMoved')) { g.narrate('Gladstone is asleep against the leaves. Science must wait its turn behind the tortoise.'); return; }
            if (g.flag('leafMatched')) { g.narrate('Matched, beyond argument.'); return; }
            g.setFlag('leafMatched');
            g.sfx('success');
            g.addClue('foundHer');
            g.retireItem('herbariumPage');
            g.say([
              { text: 'Dust off, page up: strap leaves, silver midrib — stroke for stroke the pressed specimen. And the pot\'s label, in Digby\'s own hand: "ASPIDISTRA — QUITE ORDINARY, DO NOT FUSS."' },
              { who: 'Quinn', text: 'Your Majesty. Nobody stole you at all — your gardener tucked you up in the plainest pot in England and posted a tortoise on guard.' },
            ]);
          },
          wateringCan: g => {
            if (!g.flag('leafMatched')) { g.narrate('I\'m not watering a stranger. Identify first, irrigate second.'); return; }
            if (!g.flag('canFilled')) { g.narrate('The can is empty. The cistern is not.'); return; }
            if (!g.flag('night')) { g.narrate('Not yet. She\'s a MIDNIGHT Empress — let\'s give her her midnight. The bloom clock can arrange one.'); return; }
            g.setFlag('watered');
            g.setFlag('bloomed');
            g.retireItem('wateringCan');
            g.sfx('success');
            g.say([
              { text: 'Under the phosphor lamps I water her, the way Digby would have: slowly, at the roots, saying nothing foolish.' },
              { text: 'And at the glasshouse\'s made midnight, the Midnight Empress opens — violet-white, luminous, entirely unhurried. Somewhere behind me Hoskins removes his cap.' },
              { text: 'Tucked in the pot, oilskin-wrapped: a letter. "If you are reading this, you made it night, followed my beds, and moved Gladstone politely. The garden has chosen you, as I knew it would choose whoever deserved it."' },
              { who: 'Petronella', text: 'It wasn\'t stolen. It was ASSIGNED READING.' },
              { who: 'Bertram', text: 'I maintain the tortoise behaved suspiciously.' },
              { who: 'Quinn', text: 'The only crime here is the label, Mr. Croft. "Quite ordinary" — of the rarest orchid in England. Your uncle should answer for that.' },
              { text: 'Petronella takes the stewardship, having been the only one to water anything. Hoskins keeps the cottage, and Gladstone. Bertram, by codicil, receives the cocktail cabinet — "the one bed," Digby wrote, "he ever tended."' },
              { text: 'And every night thereafter, at the glasshouse\'s own midnight, the Empress blooms for anyone who troubles to look.' },
            ], g2 => {
              g2.addClue('digbyLetter');
              g2.endChapter();
            });
          },
        },
      },
      {
        id: 'cistern', rect: [950, 740, 200, 120], label: 'Rain cistern',
        onClick: g => g.narrate('The rain cistern, brim-full and cold. Digby piped it off the whole roof — "the sky waters my garden; I merely make introductions."'),
        use: {
          wateringCan: g => {
            if (g.flag('canFilled')) { g.narrate('Full to the brim already.'); return; }
            g.setFlag('canFilled');
            g.narrate('The can goes under with a glug and comes up heavy. Rainwater — the Empress will take nothing less.');
          },
        },
      },
      {
        id: 'bloomClock', rect: [1180, 460, 190, 250], label: 'The bloom clock',
        onClick: g => g.openZoom('bloomClock'),
      },
    ],
    zooms: {
      bloomClock: {
        title: 'The Nocturne Mechanism',
        art: Art.ch3.bloomClockZoom,
        hotspots: [
          {
            id: 'mechanism', rect: [240, 90, 720, 620], label: 'The mechanism',
            onClick: g => {
              if (!g.flag('clockFixed')) {
                g.narrate('"THE NOCTURNE MECHANISM — for the persuasion of night-blooming stock." Canvas shades, phosphor lamps, one enormous dial... and an empty winding socket. The lever is stuck fast at DAY.');
                return;
              }
              const toNight = !g.flag('night');
              g.setFlag('night', toNight);
              g.sfx('unlock');
              if (toNight) {
                g.narrate('The lever throws. Canvas rolls across the glass with a sound like a held breath, the phosphor lamps kindle green — and the garden believes, completely, that it is midnight.');
              } else {
                g.narrate('The lever comes back. The shades gather themselves up, and honest daylight pours in as if it had never been sent away.');
              }
            },
            use: {
              brassWinder: g => {
                if (g.flag('clockFixed')) { g.narrate('Wound and willing.'); return; }
                g.setFlag('clockFixed');
                g.sfx('unlock');
                g.addClue('nocturne');
                g.retireItem('brassWinder');
                g.say([
                  { text: 'The brass winder seats in its socket like it never left. Six firm turns; deep in the case, a mainspring takes up its old argument.' },
                  { who: 'Quinn', text: 'A machine for making midnight. Digby, you eccentric marvel — your garden can be LIED to.' },
                ]);
              },
            },
          },
        ],
      },
    },
  },

  // ---------- the potting shed ----------

  pottingShed: {
    name: 'The Potting Shed',
    art: Art.ch3.pottingShed,
    onEnter: g => {
      if (!g.flag('shedVisited')) {
        g.setFlag('shedVisited');
        g.say([{ who: 'Quinn', text: 'A shed like a ship\'s cabin — everything racked, labelled, and exactly where a dead man left it.' }]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [60, 200, 180, 520], label: 'Back to the glasshouse',
        onClick: g => g.goTo('glasshouse'),
      },
      {
        id: 'secateurs', rect: [340, 210, 130, 150], label: 'Secateurs',
        visible: g => !g.flag('secateursTaken'),
        onClick: g => {
          g.setFlag('secateursTaken');
          g.addItem('secateurs');
          g.narrate('Secateurs, honed to a whisper. Somewhere in this garden is a door wearing more ivy than a church.');
        },
      },
      {
        id: 'winder', rect: [480, 220, 110, 140], label: 'Brass winder',
        visible: g => !g.flag('winderTaken'),
        onClick: g => {
          g.setFlag('winderTaken');
          g.addItem('brassWinder');
          g.narrate('A brass winding key the size of my hand, hanging apart from the common tools. Whatever this winds, Digby considered it garden equipment.');
        },
      },
      {
        id: 'trowel', rect: [610, 210, 130, 150], label: 'Hand trowel',
        visible: g => !g.flag('trowelTaken'),
        onClick: g => {
          g.setFlag('trowelTaken');
          g.addItem('trowel');
          g.narrate('A hand trowel, polished bright by use. For digging small, deliberate holes — or undoing somebody else\'s.');
        },
      },
      {
        id: 'seedCabinet', rect: [850, 200, 240, 430], label: 'Seed cabinet',
        onClick: g => g.openZoom('seedDrawers'),
      },
      {
        id: 'packets', rect: [1160, 450, 350, 150], label: 'Seed packets',
        onClick: g => g.say([
          { text: 'Four seed packets propped on the bench, each annotated in Digby\'s hand:' },
          { text: '"Nasturtium — sow in SPRING, obviously." "Foxglove — high SUMMER, and stand well back."' },
          { text: '"Sweet pea — AUTUMN, whatever the books say." "Hellebore — WINTER, when nothing sensible grows. My kind of plant."' },
        ], g2 => g2.addClue('seedPackets')),
      },
      {
        id: 'can', rect: [430, 720, 300, 140], label: 'Watering can',
        visible: g => !g.flag('canTaken'),
        onClick: g => {
          g.setFlag('canTaken');
          g.addItem('wateringCan');
          g.narrate('Digby\'s watering can, empty and waiting. A garden is tended or it is merely owned.');
        },
      },
    ],
    zooms: {
      seedDrawers: {
        title: 'Seeds, In Their Seasons',
        art: Art.ch3.seedDrawersZoom,
        hotspots: [
          {
            id: 'cabinetFace', rect: [170, 80, 860, 400], label: 'Season dials',
            onClick: g => {
              if (g.flag('cabinetOpen')) { g.narrate('The seasons stand set, and the cabinet keeps no more secrets up here.'); return; }
              g.openPuzzle('seedCabinet');
            },
          },
          {
            id: 'journalDrawer', rect: [380, 500, 440, 160], label: 'The journal drawer',
            onClick: g => {
              if (!g.flag('cabinetOpen')) { g.narrate('The long drawer at the bottom is locked. Above it, four season dials wait to be convinced.'); return; }
              if (g.flag('journalTaken')) { g.narrate('Empty now, but for the ghost of shortbread.'); return; }
              g.setFlag('journalTaken');
              g.addItem('journal');
              g.addClue('journal');
              g.say([
                { text: 'In the drawer: Digby\'s garden journal, green cloth, much thumbed. The flyleaf: "To whoever reads gardens: let mine choose. What I have hidden, I have hidden in plain bed."' },
                { text: 'One page is all riddle: "Widdershins first at the laurel; then twice to midnight; sunward once at the yew; last, toward the morning — and take tea with the gnomon."' },
                { who: 'Quinn', text: 'And the margins are in Latin, in a hand too small for my patience. I know an earnest botanist who\'d enjoy showing off.' },
              ]);
            },
          },
        ],
      },
    },
  },

  // ---------- the orchid wing ----------

  orchidWing: {
    name: 'The Orchid Wing',
    art: Art.ch3.orchidWing,
    onEnter: g => {
      if (!g.flag('wingVisited')) {
        g.setFlag('wingVisited');
        g.say([{ who: 'Quinn', text: 'Orchids by the yard, each fussier than the last — and one plinth standing conspicuously, eloquently empty.' }]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [40, 460, 160, 330], label: 'Back to the glasshouse',
        onClick: g => g.goTo('glasshouse'),
      },
      {
        id: 'petronella', rect: [160, 580, 210, 270], label: 'Miss Petronella Croft',
        onClick: g => {
          if (!g.hasClue('petronella')) {
            g.say([
              { who: 'Petronella', text: 'You\'ll be the detective. Good. Bertram couldn\'t tell an orchid from an artichoke, but he CAN tell a will from a windfall. Of course I suspect him.' },
              { who: 'Quinn', text: 'And yet you\'re here watering, not counting silver.' },
              { who: 'Petronella', text: 'The plants were thirsty. That isn\'t a legal position, it\'s just TRUE.' },
            ], g2 => g2.addClue('petronella'));
          } else if (g.hasClue('bedPlot') && !g.flag('bloomed')) {
            g.say([{ who: 'Petronella', text: 'Bed K. BED K. I have walked past that aspidistra every day of my mourning and apologised to it once for bumping the pot. Uncle Digby, you absolute fiend.' }]);
          } else {
            g.say([{ who: 'Petronella', text: 'If you need Latin, botany, or somebody to say unkind things about Bertram, I am completely at your disposal.' }]);
          }
        },
        use: {
          journal: g => {
            if (g.hasClue('bearings')) { g.narrate('She\'s already given me the margins, chapter and verse.'); return; }
            g.addClue('bearings');
            g.sfx('page');
            g.say([
              { who: 'Petronella', text: 'Uncle\'s journal! Oh, the margins — "Regina regnat: a muro matutino, lux tertia." The Queen reigns: from the morning wall, the third light.' },
              { who: 'Quinn', text: 'The Queen\'s row, third bed from the east. You read that at sight.' },
              { who: 'Petronella', text: '...I did, didn\'t I. Sorry. He always said showing off was forgivable in Latin.' },
            ]);
          },
        },
      },
      {
        id: 'plinth', rect: [1290, 590, 190, 280], label: 'The empty plinth',
        onClick: g => {
          g.addClue('emptyPlinth');
          g.say([
            { text: 'The Empress\'s plinth, bare as a Sunday larder. But the dust has kept minutes: the pot wasn\'t lifted — it SLID, in one long smear, about eight inches off the ground.' },
            { who: 'Quinn', text: 'And beside the smear, a half-eaten lettuce leaf. Burglars rarely stop for salad.' },
          ]);
        },
      },
      {
        id: 'benches', rect: [280, 520, 900, 220], label: 'Orchid benches',
        onClick: g => {
          if (g.flag('night')) g.narrate('By made-midnight the wing is another country: petals shut, one pale moonflower open, and the air holding its breath.');
          else g.narrate('Ranks of orchids, sulking gorgeously. Petronella has watered every one; the labels are Digby\'s, the tenderness is hers.');
        },
      },
      {
        id: 'coldFrame', rect: [590, 820, 320, 160], label: 'Cold frame',
        onClick: g => {
          if (g.flag('lettuceTaken')) { g.narrate('The remaining lettuces huddle closer together.'); return; }
          g.setFlag('lettuceTaken');
          g.addItem('lettuce');
          g.narrate('Lettuces under glass, grown — per the little sign — "FOR GLADSTONE. NOT FOR SALADS. — D.C." I liberate one, for purposes Sir Digby would endorse.');
        },
      },
      {
        id: 'mossTrail', rect: [480, 840, 720, 90], label: 'Glowing dots on the floor',
        visible: g => g.flag('night') && g.flag('clockFixed') && !g.hasClue('mossTrail'),
        onClick: g => {
          g.addClue('mossTrail');
          g.sfx('page');
          g.say([
            { text: 'Under the phosphor lamps, the floor lights up: painted dots, glowing green, in a tidy dotted line from the plinth toward the Great Glasshouse.' },
            { who: 'Quinn', text: 'He marked the pot\'s road — in paint you can only see if you\'ve learned to make it night. This whole garden is an entrance exam.' },
          ]);
        },
      },
      {
        id: 'nightBloomer', rect: [930, 500, 150, 120], label: 'Moonflower',
        visible: g => g.flag('night'),
        onClick: g => g.narrate('A moonflower, wide open under the artificial midnight and frankly delighted about it. The mechanism works. Night-bloomers can be fooled.'),
      },
    ],
  },

  // ---------- the hedge maze ----------

  maze: {
    name: 'The Hedge Maze',
    art: Art.ch3.maze,
    onEnter: g => {
      if (!g.flag('mazeVisited')) {
        g.setFlag('mazeVisited');
        g.say([{ who: 'Quinn', text: 'A hedge maze with opinions. The gaps all look alike, and I suspect that\'s the point.' }]);
      }
    },
    hotspots: [
      {
        id: 'wayBack', rect: [0, 740, 280, 260], label: 'Back to the glasshouse',
        onClick: g => g.goTo('glasshouse'),
      },
      {
        id: 'entrance', rect: [415, 420, 110, 320], label: 'The maze entrance',
        onClick: g => {
          if (g.flag('mazeSolved')) { g.openZoom('mazeHeart'); return; }
          g.openPuzzle('mazePuzzle');
        },
      },
      {
        id: 'laurel', rect: [490, 690, 150, 120], label: 'Potted laurel',
        onClick: g => g.narrate('A laurel in a pot, stationed at the entrance like a doorman. "Widdershins first at the laurel," the journal says — this is where the counting starts.'),
      },
      {
        id: 'hedges', rect: [880, 360, 320, 380], label: 'The hedges',
        onClick: g => g.narrate('Yew, mostly, clipped to the severity of a bank. A robin follows my progress with open scepticism.'),
      },
    ],
    zooms: {
      mazeHeart: {
        title: 'The Heart of the Maze',
        art: Art.ch3.mazeHeartZoom,
        hotspots: [
          {
            id: 'sundial', rect: [480, 290, 240, 310], label: 'The sundial',
            onClick: g => {
              g.addClue('sundialKey');
              g.say([
                { text: 'A stone sundial — "tea with the gnomon," as promised. Around the base, chiselled deep: "HER MAJESTY FACES THE MORNING — D.C."' },
                { who: 'Quinn', text: 'The planting map\'s rows are named for monarchs. Her Majesty will be the REGINA row — read from the morning side. Digby, you made your garden into a filing system.' },
              ]);
            },
          },
          {
            id: 'digSpot', rect: [790, 500, 190, 110], label: 'Disturbed earth',
            onClick: g => {
              if (g.flag('dugTin')) { g.narrate('An empty hole, refilled tidily. Standards are standards.'); return; }
              g.narrate('A patch of earth by the sundial, disturbed and then patted flat — by somebody with small standards of tidiness and a trowel.');
            },
            use: {
              trowel: g => {
                if (g.flag('dugTin')) { g.narrate('Already dug, already pocketed.'); return; }
                g.setFlag('dugTin');
                g.sfx('success');
                g.retireItem('trowel');
                g.addItem('mapFragment');
                g.narrate('Six inches down, a biscuit tin; in the tin, wrapped in oilskin, the torn corner of a map — beds ruled and lettered in Digby\'s hand. It smells faintly of shortbread. So does everything he loved.');
              },
            },
          },
          {
            id: 'tortoiseTracks', rect: [280, 560, 220, 100], label: 'Small flat tracks',
            onClick: g => g.narrate('Flat, unhurried tracks through the dew, straight through the maze\'s trickiest corner. Gladstone knows the way and has never once been asked.'),
          },
        ],
      },
    },
  },

  // ---------- the garden office ----------

  gardenOffice: {
    name: 'The Garden Office',
    art: Art.ch3.gardenOffice,
    onEnter: g => {
      if (!g.flag('officeVisited')) {
        g.setFlag('officeVisited');
        g.say([{ who: 'Quinn', text: 'Digby\'s office: half study, half seed catalogue. His hat is still on the chair, and nobody has had the heart.' }]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [60, 200, 180, 520], label: 'Back to the glasshouse',
        onClick: g => g.goTo('glasshouse'),
      },
      {
        id: 'masterMap', rect: [330, 170, 520, 340], label: 'The master planting map',
        onClick: g => {
          if (g.hasClue('bedPlot')) { g.narrate('Corner restored, bed found. The map has told me everything it was built to tell.'); return; }
          if (!g.hasItem('mapFragment') && !g.flag('fragmentUsed')) {
            g.narrate('The master planting map of Croft Hall — every bed ruled, lettered, and named. One corner has been torn clean away, and with it the beds\' key. Torn, not worn: Digby took it somewhere.');
            return;
          }
          g.openPuzzle('plantingMap');
        },
      },
      {
        id: 'herbarium', rect: [950, 410, 200, 190], label: 'Herbarium press',
        onClick: g => {
          if (g.flag('herbariumTaken')) { g.narrate('The press keeps its remaining flowers flat and its opinions to itself.'); return; }
          g.setFlag('herbariumTaken');
          g.addItem('herbariumPage');
          g.addClue('empressLeaf');
          g.say([
            { text: 'In the herbarium press, one page set apart: a pressed specimen of the Midnight Empress herself. Strap leaves, silver midrib, bloom like a violet-white trumpet.' },
            { who: 'Quinn', text: 'So that\'s her face. Out of flower she\'d pass for something perfectly dull — say, an aspidistra.' },
          ]);
        },
      },
      {
        id: 'desk', rect: [330, 580, 420, 120], label: 'Digby\'s desk',
        onClick: g => g.narrate('Seed invoices, a half-written letter to a chrysanthemum society ("Sirs — you are all cowards"), and his hat on the chair. The room is waiting for him. Rooms do that, for a while.'),
      },
      {
        id: 'bertram', rect: [1110, 430, 200, 390], label: 'Mr. Bertram Croft',
        onClick: g => {
          if (!g.hasClue('bertramWitness')) {
            g.say([
              { who: 'Bertram', text: 'Detective! Thank heavens. Petronella will have told you I did it. I did NOTHING — except, I may say, witness the entire crime.' },
              { who: 'Quinn', text: 'Did you now.' },
              { who: 'Bertram', text: 'Night before the flower was missed. A burglar — low fellow, VERY low, moving with tremendous... deliberation. Wearing a sort of helmet. And when I challenged him, madam, he HISSED at me.' },
              { who: 'Quinn', text: 'A low, slow, hissing burglar in a helmet. I\'ll circulate the description.' },
            ], g2 => g2.addClue('bertramWitness'));
          } else if (g.flag('gladstoneMoved') || g.hasClue('foundHer')) {
            g.say([{ who: 'Bertram', text: 'I maintain that from a distance, in poor light, after a fortifying brandy, the resemblance to a burglar was TOTAL.' }]);
          } else {
            g.say([{ who: 'Bertram', text: 'If you need me, I shall be guarding the cocktail cabinet. From burglars.' }]);
          }
        },
      },
    ],
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  seedCabinet: {
    title: 'Seeds, In Their Seasons',
    render(g) {
      const SEASONS = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
      const plants = ['NASTURTIUM', 'FOXGLOVE', 'SWEET PEA', 'HELLEBORE'];
      const dial = i => `
        <div class="safe-dial">
          <div class="seed-plant">${plants[i]}</div>
          <button class="btn" data-act="d${i}">${SEASONS[g.getFlag('seed' + (i + 1)) || 0]}</button>
        </div>`;
      return `
        <div class="safe-dials">${dial(0)}${dial(1)}${dial(2)}${dial(3)}</div>
        <p class="puzzle-msg">${g.getFlag('seedMsg') || '"Set each to its sowing, and the garden will open. — D.C." Each button turns its season wheel.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="open">Try the drawer</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'open') {
          const set = [1, 2, 3, 4].map(i => g.getFlag('seed' + i) || 0).join('');
          if (set === '0123') {
            g.setFlag('cabinetOpen');
            g.sfx('unlock');
            g.closePuzzle();
            g.say([
              { text: 'Spring, summer, autumn, winter — the four wheels seat in order and the long drawer springs open an inch, smug as its maker.' },
              { who: 'Quinn', text: 'Sown in season. Very well, Sir Digby: I\'m listening.' },
            ]);
          } else {
            g.sfx('error');
            g.setFlag('seedMsg', 'The drawer doesn\'t budge. Somewhere in here, something is sown out of season.');
            rerender();
          }
          return;
        }
        const i = Number(act.slice(1)) + 1;
        g.setFlag('seed' + i, ((g.getFlag('seed' + i) || 0) + 1) % 4);
        g.setFlag('seedMsg', '');
        rerender();
      }));
    },
  },

  mazePuzzle: {
    title: 'The Hedge Maze',
    wide: true,
    /* Correct walk, from the journal riddle + Hoskins's compass:
       widdershins (W), twice to midnight (N, N), sunward once (S),
       toward the morning (E). */
    render(g) {
      const path = g.getFlag('mazePath') || [];
      const STEP = { w: [-52, 0], n: [0, -40], s: [0, 40], e: [52, 0] };
      let x = 190, y = 208;
      let trail = `M ${x} ${y}`;
      for (const m of path) {
        x += STEP[m][0];
        y += STEP[m][1];
        trail += ` L ${x} ${y}`;
      }
      const WHERE = [
        'At the laurel, four green mouths gaping.',
        'A long alley; a robin supervises.',
        'Deeper. The hedges swallow the birdsong.',
        'Deeper still. Somebody clipped a yew into a suggestion of a duchess.',
        'A turn past the yew; the gravel goes silver.',
      ];
      return `
        <div class="puzzle-clock">
        <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="364" height="224" rx="10" fill="#2c4527" stroke="#1e2f1a" stroke-width="4"/>
          <circle cx="190" cy="208" r="7" fill="#c9dff0"/>
          <path d="${trail}" fill="none" stroke="#c9dff0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          ${path.length ? `<circle cx="${x}" cy="${y}" r="7" fill="#e8b64c"/>` : ''}
          <text x="190" y="30" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#a8c49a" font-style="italic">what Ivy remembers of the way</text>
        </svg>
        </div>
        <p class="puzzle-msg">${g.getFlag('mazeMsg') || (WHERE[path.length] || 'The heart is close; the hedges lean in to listen.')}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="mv-n">North</button>
          <button class="btn" data-act="mv-w">West</button>
          <button class="btn" data-act="mv-e">East</button>
          <button class="btn" data-act="mv-s">South</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="leave">Step out and catch your breath</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const SOLUTION = ['w', 'n', 'n', 's', 'e'];
      const QUIPS = [
        'A dead end wearing a smirk of topiary. The hedges usher me, courteously, back to the laurel.',
        'Ten confident strides and I am outside the maze again. The robin says nothing. Loudly.',
        'That alley curls like a question mark and deposits me at the entrance, which I feel is editorialising.',
      ];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const move = act.slice(3);
        const path = g.getFlag('mazePath') || [];
        if (SOLUTION[path.length] !== move) {
          g.sfx('error');
          const n = ((g.getFlag('mazeFails') || 0)) % QUIPS.length;
          g.setFlag('mazeFails', (g.getFlag('mazeFails') || 0) + 1);
          g.setFlag('mazePath', []);
          g.setFlag('mazeMsg', QUIPS[n]);
          rerender();
          return;
        }
        const next = [...path, move];
        if (next.length === SOLUTION.length) {
          g.setFlag('mazePath', []);
          g.setFlag('mazeSolved');
          g.sfx('success');
          g.closePuzzle();
          g.say([
            { text: 'Widdershins at the laurel; twice to midnight; sunward once at the yew; then toward the morning — and the hedges open onto a green room with a sundial at its heart.' },
            { who: 'Quinn', text: 'Tea with the gnomon it is.' },
          ]);
        } else {
          g.setFlag('mazePath', next);
          g.setFlag('mazeMsg', '');
          rerender();
        }
      }));
    },
  },

  plantingMap: {
    title: 'The Beds of Croft Hall',
    wide: true,
    /* Rows named for monarchs; the morning wall is the EAST (right)
       edge. Solution: Regina row, third light from the morning wall
       — with six columns, that is column 4 from the west. */
    render(g) {
      const ROWS = ['ALBERT', 'REGINA', 'GEORGE', 'ANNE'];
      const sel = g.getFlag('mapSel') || '';
      let grid = '';
      for (let r = 0; r < 4; r++) {
        grid += `<div class="map-row"><span class="map-rowname">${ROWS[r]}</span>`;
        for (let c = 1; c <= 6; c++) {
          const id = ROWS[r][0] + c;
          grid += `<button class="btn map-cell${sel === id ? ' on' : ''}" data-act="cell-${id}">${id}</button>`;
        }
        grid += '</div>';
      }
      const known = [
        g.hasClue('bearings') ? '“From the morning wall, the third light.”' : 'The margins were Latin — someone bookish could read them.',
        g.hasClue('sundialKey') ? '“Her Majesty faces the morning” — the Regina row, read from the east.' : 'The rows are named for monarchs; which one matters, something in the garden must say.',
      ].map(t => `<p class="puzzle-msg">${t}</p>`).join('');
      return `
        <p class="puzzle-msg">The fragment fits. Beds ruled and lettered — the morning wall is the map's eastern edge, on the right.</p>
        <div class="map-grid">${grid}</div>
        ${known}
        <div class="puzzle-controls">
          <button class="btn" data-act="mark">Mark the bed</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act.slice(0, 5) === 'cell-') {
          g.setFlag('mapSel', act.slice(5));
          rerender();
          return;
        }
        // mark
        const sel = g.getFlag('mapSel') || '';
        if (!sel) { g.setFlag('mapSel', ''); rerender(); return; }
        if (sel === 'R4') {
          g.setFlag('fragmentUsed');
          g.removeItem('mapFragment');
          g.setFlag('mapSel', '');
          g.sfx('success');
          g.addClue('bedPlot');
          g.closePuzzle();
          g.say([
            { text: 'Regina row, third light from the morning wall. The restored corner names it: BED K — the palm bed, Great Glasshouse. Registered contents, in Digby\'s hand:' },
            { text: '"One aspidistra. QUITE ORDINARY. Do not fuss." Underlined twice.' },
            { who: 'Quinn', text: 'Nobody underlines "ordinary" twice unless it isn\'t. And I have walked past that pot a dozen times — it has a TORTOISE on it.' },
          ]);
        } else {
          g.sfx('error');
          g.narrate(sel[0] === 'R'
            ? 'The right row, the wrong light — this bed holds hostas, which have never kept a secret in their lives.'
            : 'The journal is quite firm that Her Majesty reigns here, and this is not Her Majesty\'s row.');
        }
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch3 = {
  id: 'ch3',
  order: 3,
  title: "The Botanist's Bequest",
  subtitle: 'Chapter Three — The Midnight Empress',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'glasshouse',

  intro: [
    { text: 'Croft Hall, ten in the morning, everything in unforgivably good weather. Under an acre of glass, the late Sir Digby Croft grew the rarest garden in England — and one tortoise.' },
    { who: 'Prewitt', text: 'The will is... horticultural, Detective. The whole fortune goes to whichever relation tends the garden "until the Midnight Empress blooms."' },
    { who: 'Prewitt', text: 'The difficulty being that the Empress has vanished. Pot and all. No orchid, no bloom; no bloom, no bequest — and the family are at each other\'s throats like convolvulus.' },
    { who: 'Quinn', text: 'A missing flower, a locked garden, and heirs in full cry. Very well, Mr. Prewitt — let\'s see what the beds have to say for themselves.' },
  ],

  hints: [],

  end: {
    kicker: 'Chapter Three Complete',
    title: "The Botanist's Bequest",
    body: 'No thief, no crime — only a gardener\'s last examination, passed. ' +
      'Petronella keeps the garden, Hoskins keeps the cottage and the tortoise, and Bertram keeps the cocktail cabinet, as foreseen. ' +
      'And every midnight under glass, for anyone who troubles to look, the Empress blooms.',
    next: null,
  },
};

})();
