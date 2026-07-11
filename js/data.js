/* Data: items, combinations, scenes, puzzles and chapter script for
   "The Clockmaker's Secret" — Chapter One: The Silent Shop.

   Hotspot rects are [x, y, w, h] in the art's viewBox coordinates
   (scenes 1600x1000, zooms 1200x800). Handlers receive the engine
   API `g` (see engine.js). */

const ITEMS = {
  brassKey: {
    name: 'Brass Key',
    desc: 'A heavy brass door key. The tape that hid it is still sticky.',
    icon: Art.icons.brassKey,
  },
  screwdriver: {
    name: 'Flat Screwdriver',
    desc: 'Worn smooth — the closest thing to a crowbar in a clockmaker\'s kit.',
    icon: Art.icons.screwdriver,
  },
  rag: {
    name: 'Cotton Rag',
    desc: 'A cotton rag, only slightly oily.',
    icon: Art.icons.rag,
  },
  tinyKey: {
    name: 'Tiny Winding Key',
    desc: 'Stamped "E.T.", on a faded ribbon. Small locks, same maker.',
    icon: Art.icons.tinyKey,
  },
  greasyGear: {
    name: 'Greasy Gear',
    desc: 'A brass gear slick with clock oil. It needs drying before it will seat anywhere.',
    icon: Art.icons.greasyGear,
  },
  gear1: { name: 'Brass Gear', desc: 'A toothed brass wheel, pulled from the office lock.', icon: Art.icons.gear },
  gear2: { name: 'Brass Gear', desc: 'A toothed brass wheel, wiped clean and gleaming.', icon: Art.icons.gear },
  gear3: { name: 'Brass Gear', desc: 'A toothed brass wheel, pulled from the office lock.', icon: Art.icons.gear },
  gear4: { name: 'Brass Gear', desc: 'A toothed brass wheel, pulled from the office lock.', icon: Art.icons.gear },
  crank: {
    name: 'Iron Crank',
    desc: 'Heavy iron, cold as a poker. The tool board misses it.',
    icon: Art.icons.crank,
  },
  note: {
    name: 'Edmund\'s Note',
    desc: '"If you must follow: the door keeps my hour. — E.T."',
    icon: Art.icons.note,
  },
  mabelLetter: {
    name: 'Mabel\'s Letter',
    desc: '"The sons the sign promises; the hands a clock truly needs; the chimes at closing; and the age Clara came to you. In that order. — M."',
    icon: Art.icons.mabelLetter,
  },
  grimsbyLetter: {
    name: 'Grimsby\'s Letter',
    desc: '"The Meridian leaves that shop with me, sold or otherwise. You have until Tuesday. — V. GRIMSBY." Evidence, in his own hand.',
    icon: Art.icons.grimsbyLetter,
  },
  padlockKey: {
    name: 'Iron Key',
    desc: 'New-cut iron, heavy as a chisel. It opens the way below.',
    icon: Art.icons.ironKey,
  },
};

const COMBOS = {
  'greasyGear+rag': g => {
    g.removeItem('greasyGear');
    g.removeItem('rag');
    g.addItem('gear2');
    g.narrate('I work the grease off with the rag until every tooth gleams. Good as new.');
  },
};

// Seat any recovered gear on the office lock's bare arbors.
function seatGear(g, itemId) {
  g.removeItem(itemId);
  const n = (g.getFlag('gearsSeated') || 0) + 1;
  g.setFlag('gearsSeated', n);
  g.narrate([
    'The gear drops onto its arbor and clicks home. Three more stand bare.',
    'A second wheel seats snug against the first. Halfway.',
    'Three seated. One empty arbor left.',
    'The last wheel clicks in and the whole train meshes tight. Now it wants its crank.',
  ][n - 1]);
}

const SCENES = {

  // ---------- the shop floor ----------

  shopfront: {
    name: 'The Shop Floor',
    art: Art.shopfront,
    hotspots: [
      {
        id: 'frontDoor', rect: [60, 160, 235, 548], label: 'Front door',
        onClick: g => {
          g.setFlag('hoursSeen');
          g.narrate("The front door, bolted from the inside — nobody left this way. Under the CLOSED card, a brass plate: 'OPEN NINE UNTIL SIX.'");
        },
      },
      {
        id: 'window', rect: [325, 195, 255, 385], label: 'Window',
        onClick: g => g.narrate("Harrow Lane, empty under the gas lamps. The shop has sat dark for three days while the street walked past."),
      },
      {
        id: 'grandfather', rect: [605, 145, 190, 560], label: 'Grandfather clock',
        onClick: g => g.openZoom('grandfather'),
      },
      {
        id: 'shelf', rect: [832, 215, 376, 360], label: 'Display shelves',
        onClick: g => g.openZoom('shelf'),
      },
      {
        id: 'wallClock', rect: [1188, 254, 132, 132], label: 'Station clock',
        onClick: g => g.narrate("The station clock. 7:15, the same as all the rest. Whatever happened here happened at a quarter past seven."),
      },
      {
        id: 'rug', rect: [140, 765, 580, 190], label: 'Rug',
        onClick: g => {
          if (!g.flag('rugMoved')) {
            g.setFlag('rugMoved');
            g.narrate("I haul the rug aside. Fresh scratch-marks score the boards beneath — long gouges, running toward the workshop door. Something heavy was dragged across this floor.");
          } else {
            g.narrate("Long gouges in the boards, running from the counter toward the workshop. Something heavy went that way — and not long ago.");
          }
        },
      },
      {
        id: 'counter', rect: [838, 455, 470, 460], label: 'Shop counter',
        onClick: g => g.openZoom('counter'),
      },
      {
        id: 'workshopDoor', rect: [1318, 145, 244, 568], label: 'Workshop door',
        onClick: g => {
          if (g.flag('workshopUnlocked')) g.goTo('workshop');
          else g.narrate("'WORKSHOP — PRIVATE.' Locked, with a good brass lock. Edmund took this door seriously.");
        },
        use: {
          brassKey: g => {
            if (g.flag('workshopUnlocked')) {
              g.narrate("It's already unlocked.");
              return;
            }
            g.setFlag('workshopUnlocked');
            g.say([
              { text: "The brass key turns with a heavy, satisfying clunk. The workshop door swings open." },
              { who: 'Quinn', text: "Let's see what you were working on, Mr. Thornfield." },
            ], g2 => g.goTo('workshop'));
          },
        },
      },
    ],
    zooms: {

      counter: {
        title: 'The Counter',
        art: Art.counterZoom,
        hotspots: [
          {
            id: 'register', rect: [150, 55, 355, 400], label: 'Cash register',
            onClick: g => g.narrate("A brass register, polished by forty years of thumbs. Nothing rung up since Tuesday."),
          },
          {
            id: 'drawer', rect: [165, 462, 320, 100], label: 'Register drawer',
            onClick: g => {
              if (g.flag('drawerOpened')) g.narrate("The week's takings, untouched. Whatever V.G. wanted, it was never money.");
              else g.narrate("The cash drawer is locked, and the keyhole is tiny — far smaller than any door key.");
            },
            use: {
              brassKey: g => g.narrate("The brass key is much too big for this dainty little lock."),
              tinyKey: g => {
                if (g.flag('drawerOpened')) { g.narrate("It's already open."); return; }
                g.setFlag('drawerOpened');
                g.narrate("The tiny key fits the register too — of course it does. The drawer rolls open on brass wheels.");
              },
            },
          },
          {
            id: 'drawerGear', rect: [365, 565, 110, 85], label: 'Brass gear',
            visible: g => g.flag('drawerOpened') && !g.flag('drawerGearTaken'),
            onClick: g => {
              g.setFlag('drawerGearTaken');
              g.addItem('gear4');
              g.narrate("Sitting on the coin tray like a paperweight: a brass gear. No thief looks twice at a gear.");
            },
          },
          {
            id: 'ledger', rect: [565, 155, 455, 295], label: 'Sales ledger',
            onClick: g => g.say([
              { text: "The sales ledger, open to its last page. The handwriting gets tighter with every line." },
              { text: "'MONDAY — V.G. again. Refused him again. The Meridian is not for sale, at any price.'" },
              { text: "'TUESDAY — V.G. He does not ask politely anymore. If he calls again, I shall be ready for him.'" },
              { who: 'Quinn', text: "Tuesday — the day Edmund vanished. So: what is the Meridian... and who is V.G.?" },
            ]),
          },
          {
            id: 'bell', rect: [1012, 470, 156, 110], label: 'Counter bell',
            onClick: g => g.narrate("Ding. The note hangs in the dust. Nobody comes."),
          },
          {
            id: 'counterKey', rect: [530, 640, 200, 110], label: 'Something under the counter lip',
            visible: g => !g.flag('counterKeyTaken'),
            onClick: g => {
              g.setFlag('counterKeyTaken');
              g.addItem('brassKey');
              g.narrate("A brass key, taped up under the counter lip — just where no customer's eye would ever fall. Well played, Edmund.");
            },
          },
        ],
      },

      grandfather: {
        title: 'The Grandfather Clock',
        art: Art.grandfatherZoom,
        hotspots: [
          {
            id: 'bigFace', rect: [382, 82, 436, 436], label: 'Clock face',
            onClick: g => g.narrate("Stopped at 7:15 — but this grandfather runs a full week on one winding. It didn't run down. Someone reached in and held the pendulum still."),
          },
          {
            id: 'plaque', rect: [410, 552, 380, 76], label: 'Brass plaque',
            onClick: g => g.say([
              { text: "A brass plaque, engraved by hand: 'To E.T. — time keeps what we hide. — M.'" },
              { who: 'Quinn', text: "M. Not Clara, then. Edmund had a friend we haven't met yet." },
            ]),
          },
          {
            id: 'pendulumDoor', rect: [470, 642, 260, 142], label: 'Pendulum door',
            onClick: g => {
              if (g.flag('pendOpened')) g.narrate("Weights, chains, and fifty years of dust.");
              else g.narrate("A little service door for the pendulum weights — locked. The keyhole is scarcely bigger than a grain of rice.");
            },
            use: {
              brassKey: g => g.narrate("Too big by half. This lock wants a far daintier key."),
              tinyKey: g => {
                if (g.flag('pendOpened')) { g.narrate("It's already open."); return; }
                g.setFlag('pendOpened');
                g.narrate("The tiny key turns twice and the weight door swings wide.");
              },
            },
          },
          {
            id: 'gfNote', rect: [600, 640, 110, 66], label: 'Folded note',
            visible: g => g.flag('pendOpened') && !g.flag('noteTaken'),
            onClick: g => {
              g.setFlag('noteTaken');
              g.addItem('note');
              g.say([
                { text: "A folded note, tucked where only someone winding the clock would ever find it. Edmund's hand — steadier here than in the ledger." },
                { text: "'M — He watches the shop at night, so I am going below with it. I have pulled the teeth from the office lock and scattered them where only a clockmaker's patience will find them.'" },
                { text: "'If you must follow: the door keeps my hour. You of all people know it. Burn this. — E.T.'" },
                { who: 'Quinn', text: "Going below... below where, Edmund? And 'my hour' — this whole shop has been shouting an hour at me since I walked in." },
              ]);
            },
          },
          {
            id: 'gfGear', rect: [608, 698, 90, 72], label: 'Brass gear',
            visible: g => g.flag('pendOpened') && !g.flag('gfGearTaken'),
            onClick: g => {
              g.setFlag('gfGearTaken');
              g.addItem('gear3');
              g.narrate("A brass gear, wedged between the pendulum weights where it could never fall.");
            },
          },
        ],
      },

      shelf: {
        title: 'The Display Shelves',
        art: Art.shelfZoom,
        hotspots: [
          {
            id: 'mantel', rect: [150, 300, 240, 265], label: 'Mantel clock',
            onClick: g => g.narrate("A mantel clock, stopped at 7:15 like everything else in this shop."),
          },
          {
            id: 'carriage', rect: [465, 340, 200, 225], label: 'Carriage clock',
            onClick: g => g.narrate("A carriage clock, dead at 7:15. The hands haven't so much stopped as agreed."),
          },
          {
            id: 'alarm', rect: [815, 350, 195, 215], label: 'Alarm clock',
            onClick: g => {
              if (!g.flag('alarmRattled')) {
                g.setFlag('alarmRattled');
                g.narrate("I pick the little alarm clock up — something rattles inside that has no business rattling.");
              } else if (!g.flag('alarmOpened')) {
                g.setFlag('alarmOpened');
                g.narrate("The back panel swings open, and a tiny key drops to the shelf — on a faded ribbon.");
              } else {
                g.narrate("Its insides are honest clockwork again. Minus the stowaway.");
              }
            },
          },
          {
            id: 'shelfKey', rect: [1005, 515, 95, 55], label: 'Tiny key',
            visible: g => g.flag('alarmOpened') && !g.flag('tinyKeyTaken'),
            onClick: g => {
              g.setFlag('tinyKeyTaken');
              g.addItem('tinyKey');
              g.narrate("A tiny winding key on a ribbon, stamped 'E.T.' Edmund's own — and it never left the shop.");
            },
          },
        ],
      },
    },
  },

  // ---------- the workshop ----------

  workshop: {
    name: 'The Workshop',
    art: Art.workshop,
    onEnter: g => {
      if (!g.flag('workshopVisited')) {
        g.setFlag('workshopVisited');
        g.say([
          { who: 'Quinn', text: "So this is where the real work happened. Dust on every surface — except where it's been disturbed." },
        ]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [55, 175, 220, 540], label: 'Back to the shop floor',
        onClick: g => g.goTo('shopfront'),
      },
      {
        id: 'toolBoard', rect: [295, 245, 530, 230], label: 'Tool board',
        onClick: g => g.narrate("Every tool hangs on its painted outline... except one. The empty outline is shaped like a heavy iron crank."),
      },
      {
        id: 'bench', rect: [240, 480, 820, 300], label: 'Workbench',
        onClick: g => g.openZoom('bench'),
      },
      {
        id: 'window', rect: [1175, 235, 190, 290], label: 'Barred window',
        onClick: g => g.narrate("Bars on the inside of the glass. Edmund was afraid of something that comes in through windows."),
      },
      {
        id: 'crates', rect: [1120, 505, 215, 210], label: 'Wooden crates',
        onClick: g => {
          if (!g.flag('cratePried')) g.narrate("Both crates are nailed shut — recently. The nail heads are still bright.");
          else g.narrate("Packing straw and the smell of pine. Nothing else left inside.");
        },
        use: {
          screwdriver: g => {
            if (g.flag('cratePried')) { g.narrate("Already open."); return; }
            g.setFlag('cratePried');
            g.narrate("The flat blade walks the nails out one by one, and the top crate gives. The bottom one holds nothing but packing straw.");
          },
        },
      },
      {
        id: 'crateCrank', rect: [1150, 530, 115, 62], label: 'Iron crank',
        visible: g => g.flag('cratePried') && !g.flag('crateCrankTaken'),
        onClick: g => {
          g.setFlag('crateCrankTaken');
          g.addItem('crank');
          g.narrate("The missing crank from the tool board — heavy iron, cold as a poker. Nailed into a crate by its own owner.");
        },
      },
      {
        id: 'crateGear', rect: [1240, 540, 70, 58], label: 'Brass gear',
        visible: g => g.flag('cratePried') && !g.flag('crateGearTaken'),
        onClick: g => {
          g.setFlag('crateGearTaken');
          g.addItem('gear1');
          g.narrate("A brass gear, packed in wood shavings like something precious.");
        },
      },
      {
        id: 'officeDoor', rect: [1375, 160, 210, 550], label: 'Office door',
        onClick: g => {
          if (g.flag('officeUnlocked')) { g.goTo('office'); return; }
          if (!g.flag('officeDoorSeen')) {
            g.setFlag('officeDoorSeen');
            g.say([
              { text: "A heavy door with no knob and no keyhole — only a brass plate set flush in the wood, engraved 'E.T. — OFFICE'." },
              { who: 'Quinn', text: "No keyhole means no key. This is a lock only its maker could love." },
            ], g2 => g.openZoom('clockLock'));
          } else {
            g.openZoom('clockLock');
          }
        },
      },
    ],
    zooms: {

      bench: {
        title: 'The Workbench',
        art: Art.benchZoom,
        hotspots: [
          {
            id: 'tray', rect: [205, 165, 210, 115], label: 'Parts tray',
            onClick: g => g.narrate("Screws, pins, washers — none of them wheels."),
          },
          {
            id: 'movement', rect: [455, 255, 290, 290], label: 'Half-dismantled movement',
            onClick: g => g.narrate("A repair abandoned mid-motion. The wheels left on the bench are steel and far too small — the office lock wants its own brass gears back."),
          },
          {
            id: 'tweezers', rect: [330, 240, 110, 105], label: 'Tweezers',
            onClick: g => g.narrate("Set down neatly, mid-task. Edmund meant to come straight back."),
          },
          {
            id: 'mainspring', rect: [745, 215, 145, 120], label: 'Mainspring',
            onClick: g => g.narrate("A mainspring, half-coiled. Handle it wrong and it takes a finger."),
          },
          {
            id: 'benchScrewdriver', rect: [245, 545, 250, 75], label: 'Flat screwdriver',
            visible: g => !g.flag('screwdriverTaken'),
            onClick: g => {
              g.setFlag('screwdriverTaken');
              g.addItem('screwdriver');
              g.narrate("A flat-bladed screwdriver, worn smooth. The closest thing to a crowbar in a clockmaker's kit.");
            },
          },
          {
            id: 'benchRag', rect: [845, 600, 180, 105], label: 'Cotton rag',
            visible: g => !g.flag('ragTaken'),
            onClick: g => {
              g.setFlag('ragTaken');
              g.addItem('rag');
              g.narrate("A cotton rag, only slightly oily. In a workshop, that counts as clean.");
            },
          },
          {
            id: 'oilCan', rect: [900, 150, 240, 200], label: 'Oil can',
            onClick: g => {
              if (!g.flag('oilNoticed')) {
                g.setFlag('oilNoticed');
                g.narrate("The oil can is half-empty by the slosh of it — but far too heavy, and something inside shifts that doesn't slosh.");
              } else if (!g.flag('oilTipped')) {
                g.setFlag('oilTipped');
                g.narrate("I tip it out over the bench. Oil glugs across the wood — and with it comes a gear, slick as an eel.");
              } else {
                g.narrate("Empty now, and the bench will smell of clock oil for a decade.");
              }
            },
          },
          {
            id: 'oilGear', rect: [815, 345, 125, 95], label: 'Greasy gear',
            visible: g => g.flag('oilTipped') && !g.flag('greasyGearTaken'),
            onClick: g => {
              g.setFlag('greasyGearTaken');
              g.addItem('greasyGear');
              g.narrate("A brass gear coated in clock oil. It nearly squirts out of my fingers.");
            },
          },
        ],
      },

      clockLock: {
        title: 'The Clock Lock',
        art: Art.clockLockZoom,
        hotspots: [
          {
            id: 'train', rect: [250, 150, 600, 450], label: 'Gear train',
            onClick: g => {
              const n = g.getFlag('gearsSeated') || 0;
              if (n === 0) g.narrate("Behind the plate: a gear train with every wheel missing — four bare arbors, and a dial that connects to nothing.");
              else if (n < 4) g.narrate(`${['One wheel seated', 'Two wheels seated', 'Three wheels seated'][n - 1]}, ${4 - n} arbor${4 - n > 1 ? 's' : ''} still bare.`);
              else g.narrate("The train is whole. It wants its crank, and then a reason to turn.");
            },
            use: {
              gear1: seatGear, gear2: seatGear, gear3: seatGear, gear4: seatGear,
              greasyGear: g => g.narrate("It squirms off the arbor — far too slick to seat. I need to dry it off first."),
              crank: g => g.narrate("Not here — the crank wants the square boss below the train."),
            },
          },
          {
            id: 'crankBoss', rect: [545, 565, 150, 130], label: 'Crank boss',
            onClick: g => {
              if (g.flag('crankSeated')) g.narrate("The crank sits ready in its boss.");
              else g.narrate("A square boss, cut for a heavy crank. Nothing on the tool board matches it — anymore.");
            },
            use: {
              crank: g => {
                if ((g.getFlag('gearsSeated') || 0) < 4) {
                  g.narrate("The crank fits the square boss — but the train behind it is toothless. Gears first.");
                  return;
                }
                g.setFlag('crankSeated');
                g.narrate("The crank seats with a clack that echoes in the door. Now: wind it to when?");
              },
            },
          },
          {
            id: 'dial', rect: [790, 365, 230, 230], label: 'Dial',
            onClick: g => {
              if (!g.flag('crankSeated')) {
                if ((g.getFlag('gearsSeated') || 0) < 4) g.narrate("I nudge the dial; nothing behind it answers. The train can't turn with its wheels missing.");
                else g.narrate("The train is whole, but a lock this size doesn't turn by hand. It wants a crank.");
                return;
              }
              g.openPuzzle('clockDial');
            },
          },
        ],
      },
    },
  },

  // ---------- the back office ----------

  office: {
    name: 'The Back Office',
    art: Art.office,
    onEnter: g => {
      if (!g.flag('officeVisited')) {
        g.setFlag('officeVisited');
        g.say([
          { who: 'Quinn', text: "A door like a bank vault, for a room the size of a pantry. What were you keeping in here, Edmund — or keeping out?" },
        ]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [55, 175, 210, 540], label: 'Back to the workshop',
        onClick: g => g.goTo('workshop'),
      },
      {
        id: 'desk', rect: [290, 380, 520, 330], label: 'Writing desk',
        onClick: g => g.narrate("Drawers hanging open, papers gone through — by Edmund himself, packing in a hurry. Whatever he took mattered more than tidiness, and Edmund was a tidy man."),
      },
      {
        id: 'tradeCard', rect: [535, 498, 105, 66], label: 'Trade card',
        onClick: g => {
          g.setFlag('cardSeen');
          g.narrate("Edmund's trade card, in copperplate: 'A clock needs two hands and an honest face.' A whole creed in nine words.");
        },
      },
      {
        id: 'photo', rect: [610, 230, 160, 160], label: 'Framed photograph',
        onClick: g => {
          g.setFlag('photoSeen');
          g.narrate("A sepia photograph: a small girl perched on the shop counter, boots swinging. The mount reads — 'Clara, nine years old. Her first day at Harrow Lane.'");
        },
      },
      {
        id: 'certificate', rect: [1075, 215, 160, 170], label: 'Framed certificate',
        onClick: g => {
          g.setFlag('certSeen');
          g.say([
            { text: "A framed Certificate of Registry, gone amber with age: 'THORNFIELD & SONS, Clockmakers, Harrow Lane. Proprietor: E. Thornfield. Partners: NONE.'" },
            { who: 'Quinn', text: "'& Sons.' The sign promises what the registry denies. The old man's sign was always half a wish." },
          ]);
        },
      },
      {
        id: 'window', rect: [840, 190, 220, 260], label: 'Shuttered window',
        onClick: g => g.narrate("Shuttered and latched from the inside. Of course."),
      },
      {
        id: 'papers', rect: [230, 720, 190, 100], label: 'Scattered papers',
        onClick: g => {
          if (g.flag('mabelLetterFound')) {
            g.narrate("Invoices and old receipts. The letter was the only voice among them.");
            return;
          }
          g.setFlag('mabelLetterFound');
          g.addItem('mabelLetter');
          g.say([
            { text: "Under the scattered invoices: a letter in a woman's hand, creased soft with age." },
            { text: "'E — since you lose numbers the way other men lose buttons, I have set your combination to things you cannot lose:'" },
            { text: "'the sons the sign promises; the hands a clock truly needs; the chimes at closing; and the age Clara came to you. In that order.'" },
            { text: "'Stop grumbling. You will thank me. — M.'" },
            { who: 'Quinn', text: "M again. Four numbers, and not one of them written down anywhere. Clever woman." },
          ]);
        },
      },
      {
        id: 'safe', rect: [1140, 415, 320, 370], label: 'Iron safe',
        onClick: g => {
          if (g.flag('safeOpened')) g.narrate("Empty now, but for a felt tray shaped for rolled drawings. The Meridian's papers went below with their maker.");
          else g.openPuzzle('safe');
        },
      },
      {
        id: 'grimsbySpot', rect: [1210, 530, 125, 75], label: 'Sealed letter',
        visible: g => g.flag('safeOpened') && !g.flag('grimsbyTaken'),
        onClick: g => {
          g.setFlag('grimsbyTaken');
          g.addItem('grimsbyLetter');
          g.say([
            { text: "A letter under red wax, the seal split by an angry thumb." },
            { text: "'THORNFIELD — Name your price or I shall name it for you. The Meridian leaves that shop with me, sold or otherwise. You have until Tuesday. — V. GRIMSBY.'" },
            { who: 'Quinn', text: "Victor Grimsby. 'Sold or otherwise.' There's the threat in writing — and there's my evidence." },
          ]);
        },
      },
      {
        id: 'safeKey', rect: [1305, 640, 100, 60], label: 'Iron key',
        visible: g => g.flag('safeOpened') && !g.flag('padlockKeyTaken'),
        onClick: g => {
          g.setFlag('padlockKeyTaken');
          g.addItem('padlockKey');
          g.narrate("An iron key, new-cut, heavy as a chisel. Edmund had something worth a new lock.");
        },
      },
      {
        id: 'trapdoor', rect: [845, 775, 260, 125], label: 'Trapdoor',
        onClick: g => {
          if (g.flag('trapdoorOpened')) { g.goTo('cellar'); return; }
          g.narrate("An iron ring set flush in the floorboards — and a padlock through the hasp. New brass, bright as those crate nails.");
        },
        use: {
          padlockKey: g => {
            if (g.flag('trapdoorOpened')) { g.narrate("It stands open."); return; }
            g.setFlag('trapdoorUnlocked');
            g.setFlag('trapdoorOpened');
            g.narrate("The iron key throws the padlock, and the hatch swings up on hinges somebody has kept lovingly oiled.");
          },
          brassKey: g => g.narrate("Wrong metal, wrong size."),
          tinyKey: g => g.narrate("This padlock would swallow the tiny key whole."),
        },
      },
    ],
  },

  // ---------- the cellar ----------

  cellar: {
    name: 'The Cellar',
    art: Art.cellar,
    onEnter: g => {
      if (!g.flag('cellarVisited')) {
        g.setFlag('cellarVisited');
        g.say([
          { who: 'Quinn', text: "Cold stone, and the smell of lamp oil. Somebody has been living down here." },
        ]);
      }
    },
    hotspots: [
      {
        id: 'ladder', rect: [150, 120, 220, 630], label: 'Ladder up',
        onClick: g => g.goTo('office'),
      },
      {
        id: 'shelves', rect: [390, 190, 410, 440], label: 'Storage shelves',
        onClick: g => g.narrate("Preserves gone cloudy, and clock parts in labelled jars. Edmund's order, even underground."),
      },
      {
        id: 'lantern', rect: [925, 245, 80, 90], label: 'Lantern',
        onClick: g => g.narrate("A lantern, still warm to the touch. Somebody trims this wick."),
      },
      {
        id: 'dragMarks', rect: [380, 810, 900, 130], label: 'Drag marks',
        onClick: g => g.narrate("The drag marks run through the dust and end square at that far wall. Walls don't eat clocks."),
      },
      {
        id: 'wall', rect: [1150, 175, 410, 555], label: 'Cellar wall',
        onClick: g => {
          if (g.flag('hiddenOpen')) { g.goTo('hiddenRoom'); return; }
          if (!g.flag('wallListened')) {
            g.setFlag('wallListened');
            g.narrate("I put my ear to the brick. ...A clock. Ticking, behind two feet of wall. And something else — breathing.");
          } else {
            g.narrate("Solid brick, to the eye. But there's a hairline seam running floor to ceiling, and a brass socket where no wall needs one.");
          }
        },
      },
      {
        id: 'socket', rect: [1280, 458, 100, 100], label: 'Winding socket',
        visible: g => !g.flag('hiddenOpen'),
        onClick: g => g.narrate("A square hole in the mortar, machined brass inside. Walls don't usually take winding."),
        use: {
          crank: g => {
            if (g.flag('hiddenOpen')) return;
            g.setFlag('hiddenOpen');
            g.say([
              { text: "The crank bites into the socket. I wind — and the WALL winds with it: brick and timber pivoting on a hidden axle, smooth as a stage set." },
              { text: "Warm lamplight spills through the gap. And a voice, cracked from three days of whispering—" },
              { who: 'Edmund', text: "Mabel? Is that you, woman? You certainly took your—" },
            ], g2 => g.goTo('hiddenRoom'));
          },
        },
      },
    ],
  },

  // ---------- the hidden room (finale) ----------

  hiddenRoom: {
    name: 'The Hidden Room',
    art: Art.hiddenRoom,
    onEnter: g => g.say([
      { text: "Behind the wall: a snug brick cell. A cot, a lamp, a shelf of bread and tea — and filling the far corner, running soft as a heartbeat, the Meridian." },
      { who: 'Edmund', text: "Stay back! I've a poker, and I— ...You're not one of Grimsby's men. Grimsby's men don't knock by winding. Who the devil are you?" },
      { who: 'Quinn', text: "Detective Ivy Quinn. Your niece hired me, Mr. Thornfield. Clara hasn't slept in three days." },
      { who: 'Edmund', text: "Clara... oh, my girl. I couldn't tell her, Detective. What she didn't know, Grimsby couldn't bully out of her." },
      { who: 'Quinn', text: "So you staged the lot. Bolted your own front door, stopped every clock at your winding hour, and went below with the one thing he wanted." },
      { who: 'Edmund', text: "Quarter past seven — every morning of my working life. Mabel Miller knew the signal the moment she heard of it: 'he's gone below; mind the shop.' I confess I expected her a good deal sooner." },
      { who: 'Quinn', text: "You'll want a better postman. I found Grimsby's letter in your safe — 'sold or otherwise.' A threat in his own hand. Enough for the Yard to knock on HIS door for a change." },
      { who: 'Edmund', text: "Then take it, Detective — and take me up with you. Three days of my own gooseberry preserves is punishment enough for any man alive." },
      { text: "Upstairs, Clara laughed and cried and boxed her uncle's ears, in that order. By morning, Victor Grimsby was answering hard questions at the Yard—" },
      { text: "—and at a quarter past seven, every clock in Thornfield's began to tick again." },
    ], g2 => g2.endChapter()),
    hotspots: [],
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  clockDial: {
    title: 'The Clock Lock',
    render(g) {
      const h = g.getFlag('dialH') || 12;
      const m = g.getFlag('dialM') || 0;
      return `
        <div class="puzzle-clock">
          <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="120" r="112" fill="#6b5a2e" stroke="#8a6a30" stroke-width="4"/>
            ${Art.clockFace(120, 120, 96, h, m)}
          </svg>
        </div>
        <div class="puzzle-time">${h}:${String(m).padStart(2, '0')}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="h-">Hour &#9664;</button>
          <button class="btn" data-act="h+">Hour &#9654;</button>
          <button class="btn" data-act="m-">Min &#9664;</button>
          <button class="btn" data-act="m+">Min &#9654;</button>
        </div>
        <p class="puzzle-msg">${g.getFlag('dialMsg') || 'The little dial waits to be set.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="crank">Turn the crank</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        let h = g.getFlag('dialH') || 12;
        let m = g.getFlag('dialM') || 0;
        if (act === 'h+' || act === 'h-' || act === 'm+' || act === 'm-') {
          if (act === 'h+') h = h % 12 + 1;
          if (act === 'h-') h = (h + 10) % 12 + 1;
          if (act === 'm+') m = (m + 5) % 60;
          if (act === 'm-') m = (m + 55) % 60;
          g.setFlag('dialH', h);
          g.setFlag('dialM', m);
          g.setFlag('dialMsg', '');
          rerender();
          return;
        }
        if (act === 'leave') {
          g.closePuzzle();
          return;
        }
        // turn the crank
        if (h === 7 && m === 15) {
          g.setFlag('officeUnlocked');
          g.closePuzzle();
          g.closeZoom();
          g.say([
            { text: "The crank takes the weight, the train bites — and deep inside the door, tumblers the size of soup plates roll over." },
            { who: 'Quinn', text: "A quarter past seven. Your hour, Edmund." },
          ], g2 => g.goTo('office'));
        } else {
          g.setFlag('dialMsg', 'The crank turns half an inch and stops dead. Not this hour.');
          rerender();
        }
      }));
    },
  },

  safe: {
    title: 'Miller & Sons — Four Dials',
    render(g) {
      const d = [1, 2, 3, 4].map(i => g.getFlag('safe' + i) || 0);
      const dial = i => `
        <div class="safe-dial">
          <button class="btn" data-act="u${i}">&#9650;</button>
          <div class="safe-digit">${d[i]}</div>
          <button class="btn" data-act="d${i}">&#9660;</button>
        </div>`;
      return `
        <div class="safe-dials">${dial(0)}${dial(1)}${dial(2)}${dial(3)}</div>
        <p class="puzzle-msg">${g.getFlag('safeMsg') || 'Four brass dials, nought through nine. The handle waits.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="try">Try the handle</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') {
          g.closePuzzle();
          return;
        }
        if (act === 'try') {
          const code = [1, 2, 3, 4].map(i => g.getFlag('safe' + i) || 0).join('');
          if (code === '0269') {
            g.setFlag('safeOpened');
            g.closePuzzle();
            g.say([
              { text: "The last dial clicks like a knuckle, and the handle throws. The Miller & Sons swings open." },
              { who: 'Quinn', text: "Thank you, Mabel." },
            ]);
          } else {
            g.setFlag('safeMsg', "The handle doesn't budge. The dials look back, unimpressed.");
            rerender();
          }
          return;
        }
        const i = Number(act.slice(1));
        const k = 'safe' + (i + 1);
        const cur = g.getFlag(k) || 0;
        g.setFlag(k, act[0] === 'u' ? (cur + 1) % 10 : (cur + 9) % 10);
        g.setFlag('safeMsg', '');
        rerender();
      }));
    },
  },
};

// ---------- chapter script ----------

const CHAPTER = {
  title: "The Clockmaker's Secret",
  subtitle: 'Chapter One — The Silent Shop',
  startScene: 'shopfront',

  intro: [
    { text: "Harrow Lane, a quarter past nine. Thornfield's Clocks has stood on this corner for fifty years — and for three days, it has stood silent." },
    { text: "Every clock in the shop is stopped at 7:15. And Edmund Thornfield, who never missed a winding day in his life, is gone." },
    { who: 'Clara', text: "Detective Quinn — thank you for coming. The constable found the shop bolted from the inside. He says Uncle Edmund must simply have walked off. He wouldn't. Not ever." },
    { who: 'Quinn', text: "Bolted from the inside, and nobody home. Rooms don't lie, Miss Thornfield — they only wait to be asked. I'll take a look around." },
    { who: 'Clara', text: "One thing more. Uncle hid spare keys about the shop — 'where no customer would think to look,' he always said. I never once found them." },
  ],

  /* Ordered, two-tier hints: `nudge` points at the goal, `more` gets
     specific without solving. Either may be a function of the API. */
  hints: [
    {
      when: g => !g.flag('counterKeyTaken'),
      nudge: "Clara said her uncle hid spare keys 'where no customer would think to look.'",
      more: "A customer only ever sees the top of a counter. Get close to it, and mind its edges.",
    },
    {
      when: g => !g.flag('workshopUnlocked'),
      nudge: "A key that well hidden was guarding something. Edmund kept exactly one thing private.",
      more: "The brass key belongs to the door marked PRIVATE.",
    },
    {
      when: g => !g.flag('officeDoorSeen'),
      nudge: "The workshop has more doors than the one you came through.",
      more: "Look over the heavy door at the far end of the workshop.",
    },
    {
      when: g => (g.getFlag('gearsSeated') || 0) < 4,
      nudge: "The office lock is missing its four gears. Edmund pulled them himself — and hid them the way a clockmaker hides things: in small places, behind small locks.",
      more: g => {
        if (!g.flag('screwdriverTaken')) return "Every search starts at the workbench. Take what a repairman would reach for.";
        if (!g.flag('cratePried')) return "Those crates were nailed shut in a hurry — and you carry a flat blade.";
        if (!g.flag('oilTipped')) return "Half-empty things shouldn't be heavy. Weigh the oil can in your hand — twice.";
        if (g.hasItem('greasyGear')) return "A slick gear will never seat true. Something soft on the bench would dry it.";
        if (!g.flag('tinyKeyTaken')) {
          return g.flag('alarmRattled')
            ? "The little alarm clock rattles. Open up its back."
            : "Handle the clocks on the shop shelves, one by one. One of them will complain.";
        }
        if (!g.flag('pendOpened') || !g.flag('drawerOpened')) return "Edmund's tiny key is not a one-lock key. Think of every keyhole you dismissed as too small.";
        return "You've uncovered a gear somewhere and left it lying. Retrace your steps.";
      },
    },
    {
      when: g => !g.flag('crankSeated'),
      nudge: "The train is whole, but a lock this size doesn't turn by hand.",
      more: g => g.hasItem('crank')
        ? "The square boss in the middle of the plate is cut for the crank you carry."
        : "The tool board's empty outline is crank-shaped. Hurried men stash heavy things close by — behind nails, say.",
    },
    {
      when: g => !g.flag('officeUnlocked'),
      nudge: "Wound and ready. Now the dial — Edmund wrote that the door keeps HIS hour.",
      more: "Every stopped clock in this shop has been telling you the answer since you walked in.",
    },
    {
      when: g => !g.flag('mabelLetterFound'),
      nudge: "Edmund rifled his own desk before he vanished. What he left behind still talks.",
      more: "Shuffle through the papers scattered around the office desk.",
    },
    {
      when: g => !g.flag('safeOpened'),
      nudge: "Mabel's riddle counts four numbers: the sons, the hands, the chimes, and Clara. None of them are written down — all of them are in this building.",
      more: g => {
        if (!g.flag('certSeen')) return "Promises on signs can lie. There's a registry paper framed in the office that counts the truth.";
        if (!g.flag('cardSeen')) return "Edmund had firm opinions on how many hands a clock needs. He printed them on his trade card.";
        if (!g.flag('hoursSeen')) return "When does the shop close? The front door has been telling all of Harrow Lane for fifty years.";
        if (!g.flag('photoSeen')) return "How old was Clara when she came to Harrow Lane? Someone framed that day and hung it in the office.";
        return "Sons the sign promises but the registry denies. Hands by Edmund's creed. The chime the grandfather strikes at closing. Clara's age in the photograph. In Mabel's order.";
      },
    },
    {
      when: g => !g.flag('trapdoorOpened'),
      nudge: "'I am going below with it,' he wrote. Below is a direction.",
      more: "The iron ring in the office floor. The safe held more than letters.",
    },
    {
      when: g => !g.flag('hiddenOpen'),
      nudge: "The drag marks end square at a cellar wall — and walls don't eat clocks.",
      more: "There's a machined square socket in that mortar, and you carry a crank that has already opened one impossible door.",
    },
    {
      when: () => true,
      nudge: "Someone is breathing behind that wall. Go and meet him.",
      more: "Step through.",
    },
  ],
};
