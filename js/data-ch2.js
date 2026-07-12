/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Two — "The Apothecary's Ledger".

   Three customers of Blackwood & Daughter died of "weak hearts";
   the prescription ledger says Josiah Blackwood dosed them all with
   digitalis. His daughter Mercy hires Ivy Quinn to prove the ledger
   lies. It does: the entries were forged by coroner's clerk Silas
   Marsh — the fourth "victim", the one who didn't die.

   Hotspot rects are [x, y, w, h] in the art's viewBox coordinates
   (scenes 1600x1000, zooms 1200x800). Handlers receive the engine
   API `g` (see engine.js).

   NOTE: array-valued flags (balOn, mixSteps, proofSteps) must always
   be SET to a fresh array, never mutated in place — setFlag is what
   persists them. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ITEMS = {
  magnifier: {
    name: 'Brass Magnifier',
    desc: 'Josiah\'s reading glass, worn to his grip. Good for fine print — and finer forgeries.',
    icon: Art.ch2.icons.magnifier,
  },
  emptyVial: {
    name: 'Empty Vial',
    desc: 'A stoppered glass vial, chemist-clean. Waiting to hold something.',
    icon: Art.ch2.icons.vial,
  },
  windlassHandle: {
    name: 'Winch Handle',
    desc: 'An iron winch handle from behind the counter. It wants a socket to turn.',
    icon: Art.ch2.icons.winch,
  },
  gallNuts: {
    name: 'Oak Galls',
    desc: 'Dried oak galls, hard as knuckles. Crushed, they are the heart of iron-gall ink.',
    icon: Art.ch2.icons.galls,
  },
  greenVitriol: {
    name: 'Green Vitriol',
    desc: 'Ferrous crystals the colour of bottle glass. The other half of an old ink recipe.',
    icon: Art.ch2.icons.vitriol,
  },
  brush: {
    name: 'Camel-hair Brush',
    desc: 'A fine camel-hair brush from the dispensary bench. Clean, for now.',
    icon: Art.ch2.icons.brush,
  },
  developerVial: {
    name: 'Iron-gall Developer',
    desc: 'A vial of freshly brewed developer. Brushed over hidden writing, it should bring the iron up dark.',
    icon: Art.ch2.icons.developer,
  },
  inkedBrush: {
    name: 'Loaded Brush',
    desc: 'The camel-hair brush, loaded with developer. It wants paper.',
    icon: Art.ch2.icons.inkedBrush,
  },
  notebookPage: {
    name: 'Blank Notebook Page',
    desc: 'A page torn from Josiah\'s notebook — blank, but for a faint sheen where a pen pressed hard and left no ink.',
    icon: Art.ch2.icons.blankPage,
  },
  jarScrapings: {
    name: 'Jar Scrapings',
    desc: 'Green-brown residue scraped from the empty digitalis jar. Enough for one honest test.',
    icon: Art.ch2.icons.scrapings,
  },
  sealRing: {
    name: 'Josiah\'s Seal Ring',
    desc: 'A heavy signet ring — J.B. under a mortar and pestle. Mercy said he never once took it off.',
    icon: Art.ch2.icons.sealRing,
  },
  tonicBottle: {
    name: 'Marsh\'s Tonic',
    desc: '"With gratitude for your discretion — S.M." Half-drunk. The last gift Josiah ever accepted.',
    icon: Art.ch2.icons.tonic,
  },
  blackmailLetter: {
    name: 'Blackmail Letter',
    desc: '"What I record, I can also omit — for a consideration. — S.M." Marsh\'s trade, in his own cramped hand.',
    icon: Art.ch2.icons.blackmail,
  },
};

const COMBOS = {
  'brush+developerVial': g => {
    g.removeItem('brush');
    g.removeItem('developerVial');
    g.addItem('inkedBrush');
    g.narrate('I load the brush until it drips rust-dark. Now — where did a careful man press too hard?');
  },
  'inkedBrush+notebookPage': g => {
    g.removeItem('inkedBrush');
    g.removeItem('notebookPage');
    g.setFlag('messageRevealed');
    g.addClue('hiddenMessage');
    g.sfx('success');
    g.say([
      { text: 'The developer sweeps across the blank page — and writing rises out of the paper like a bruise.' },
      { text: '"Mercy — if you read this, I am past helping. The ledger lies; my duplicates do not. He drinks with me and smiles, and I grow weaker by the week."' },
      { text: '"The shelf remembers what the ledger forgot: the third letter of each remedy, in the order I taught you them. Below, behind the books, is my proof. — J.B."' },
      { who: 'Quinn', text: 'The third letter of each remedy, in the order he taught her. The jars on the shop wall — oldest first.' },
    ]);
  },
};

const CLUES = {
  victims: {
    title: 'Three weak hearts',
    text: [
      'Alderman Hale. Mrs. Vane. Mr. Tolly. Three healthy hearts stopped in one month — and every one of them filled prescriptions at Blackwood & Daughter.',
      'The coroner\'s clerk ruled all three natural. A fourth customer, Silas Marsh, sickened too — and recovered.',
    ],
  },
  ledgerEntries: {
    title: 'The prescription book',
    text: [
      'Three entries, one for each of the dead: tincture of digitalis, prescribed and initialled J.B.',
      'Josiah\'s daughter swears he never once dispensed digitalis without her weighing the dose alongside him.',
    ],
  },
  alteredEntries: {
    title: 'Scraped vellum',
    text: [
      'Under the magnifier the truth shows plain: the vellum has been scraped and rewritten. The digitalis entries sit on ghost-lines of older, gentler prescriptions.',
      'The new hand imitates Josiah\'s — but presses twice as hard, and crabs its letters.',
    ],
  },
  shelfJars: {
    title: 'The remedy shelf',
    text: [
      'Five great jars above the counter, in the order Josiah taught his daughter her trade — oldest lesson first:',
      'CAMPHOR. SPEARMINT. HOREHOUND. ORCHIS. OXYMEL.',
    ],
  },
  riddle: {
    title: 'The balance riddle',
    text: [
      '"Seven years an apprentice; one daughter raised; five shops refused me. Weigh my measure, and be trusted. — J.B."',
      'And beneath, in smaller letters: "a proper chemist doubles his drachms."',
    ],
  },
  emptyJar: {
    title: 'The empty digitalis jar',
    text: [
      'The poison cabinet\'s digitalis jar — empty to the glass, though the ledger records only three small doses.',
      'Someone with access took the lot. The shop\'s own stock became the murder weapon.',
    ],
  },
  inkRecipe: {
    title: 'Ink reviver — J.B.\'s recipe',
    text: [
      '"INK REVIVER, for faded deeds: rainwater first; the vitriol dissolved into it; the galls crushed in after; then warm it gently. Boil it and you may as well pour it in the gutter."',
    ],
  },
  hiddenMessage: {
    title: 'Josiah\'s hidden message',
    text: [
      '"The ledger lies; my duplicates do not. He drinks with me and smiles, and I grow weaker by the week."',
      '"The shelf remembers what the ledger forgot: the third letter of each remedy, in the order I taught you them. Below, behind the books, is my proof. — J.B."',
    ],
  },
  duplicateBook: {
    title: 'The duplicate book',
    text: [
      'Josiah\'s carbon duplicates, kept in the study the killer never found: Hale had a liniment. Mrs. Vane a sleeping draught. Tolly a tonic for his knees.',
      'No digitalis. Not one grain, to anyone, all year.',
    ],
  },
  handwriting: {
    title: 'The clerk\'s hand',
    text: [
      'The coroner\'s findings, signed Silas Marsh, clerk — in a cramped, heavy hand with a crabbed little "d".',
      'The same hand that rewrote the ledger. The man who recorded the deaths as natural is the man who forged their cause.',
    ],
  },
  blackmail: {
    title: 'Marsh\'s letter',
    text: [
      '"What I record, I can also omit — for a consideration. Your customers value discretion; so do I. — S.M."',
      'Hale, Vane and Tolly all paid him. Then they stopped paying — or started threatening to talk.',
    ],
  },
  tonicGift: {
    title: 'A gift of tonic',
    text: [
      '"With gratitude for your discretion — S.M." A half-drunk bottle of tonic, gifted to Josiah.',
      'Josiah drank a courtesy glass of it every evening, and his heart failed by inches. The doctor called it grief.',
    ],
  },
  recipe: {
    title: 'Josiah\'s proof — the method',
    text: [
      '"THE PROOF, for whoever finishes it: the scrapings taken up in spirit; three drops of the vitriol acid; warm until it blushes; then one measure of the suspect draught."',
      '"If the glass turns green, there is foxglove in the draught, and my murderer signs his gifts. — J.B."',
    ],
  },
  lastLetter: {
    title: 'To Mercy',
    text: [
      '"My girl — if I am gone, do not grieve me into carelessness. Trust the shelf, trust the duplicates, trust no kindness from the courthouse."',
      '"You were always the better chemist. Finish my work. — Your father."',
    ],
  },
};

const SCENES = {

  // ---------- the shop floor ----------

  shopFloor: {
    name: 'The Shop Floor',
    art: Art.ch2.shopFloor,
    hotspots: [
      {
        id: 'frontDoor', rect: [60, 150, 230, 558], label: 'Front door',
        onClick: g => g.narrate("BLACKWOOD & DAUGHTER, CHEMISTS — EST. 1858, in gold on the glass. The street outside keeps a wary distance from a poisoner's shop."),
      },
      {
        id: 'window', rect: [330, 190, 250, 380], label: 'Shop window',
        onClick: g => g.narrate('A show globe of green water and a marble mortar in the window. Respectability, arranged like a defence.'),
      },
      {
        id: 'mercy', rect: [490, 390, 180, 320], label: 'Mercy Blackwood',
        onClick: g => {
          if (!g.hasClue('victims')) {
            g.say([
              { who: 'Mercy', text: 'Three customers dead in a month, Detective. Alderman Hale. Mrs. Vane. Poor Mr. Tolly. All "weak hearts" — and all of them ours.' },
              { who: 'Mercy', text: 'The prescription book says Father dosed them with digitalis. He never did. He never ONCE dispensed it without me at his elbow, weighing.' },
              { who: 'Quinn', text: 'And your father died a week ago. Grief, the doctor said.' },
              { who: 'Mercy', text: 'Grief does not stop a heart by inches, Miss Quinn. Every key in the shop is yours. Prove the ledger a liar — whoever wrote it.' },
            ], g2 => g2.addClue('victims'));
          } else if (!g.flag('alteredSeen')) {
            g.say([{ who: 'Mercy', text: 'The book stands open where the constables left it. Father kept his reading glass close by it — he trusted print less than people.' }]);
          } else if (!g.flag('messageRevealed')) {
            g.say([{ who: 'Mercy', text: 'Scraped and rewritten — I knew it. Father suspected something at the end. He burned nothing, Detective; he only ever hid.' }]);
          } else {
            g.say([{ who: 'Mercy', text: '"The order I taught you them." Camphor was my first lesson, Detective. I was six. I can still smell it.' }]);
          }
        },
      },
      {
        id: 'shelfWall', rect: [840, 196, 360, 410], label: 'Remedy shelves',
        onClick: g => g.openZoom('shelfWall'),
      },
      {
        id: 'winch', rect: [1180, 540, 100, 80], label: 'Winch handle',
        visible: g => !g.flag('windlassTaken'),
        onClick: g => {
          g.setFlag('windlassTaken');
          g.addItem('windlassHandle');
          g.narrate('An iron winch handle, hung behind the counter on a nail. Every shop has one thing that opens something else.');
        },
      },
      {
        id: 'counter', rect: [806, 500, 360, 410], label: 'Counter and ledger stand',
        onClick: g => g.openZoom('ledgerStand'),
      },
      {
        id: 'dispensaryDoor', rect: [1330, 150, 230, 560], label: 'Dispensary door',
        onClick: g => g.goTo('dispensary'),
      },
    ],
    zooms: {

      ledgerStand: {
        title: 'The Prescription Book',
        art: Art.ch2.ledgerZoom,
        hotspots: [
          {
            id: 'ledger', rect: [190, 130, 800, 450], label: 'Prescription book',
            onClick: g => {
              if (g.flag('alteredSeen')) {
                g.narrate('Three forged entries on scraped vellum, pretending to be a dead man\'s hand.');
                return;
              }
              g.say([
                { text: 'The prescription book, open where the constables left it. Three entries stand out in ink still proud of itself:' },
                { text: '"Tinct. digitalis — Ald. Hale. Tinct. digitalis — Mrs. Vane. Tinct. digitalis — Mr. Tolly." Each initialled J.B.' },
                { who: 'Quinn', text: 'Fresh ink on an old page. And the dates crowd their columns like latecomers to church.' },
              ], g2 => g2.addClue('ledgerEntries'));
            },
            use: {
              magnifier: g => {
                if (g.flag('alteredSeen')) { g.narrate('I\'ve seen all this page has to confess.'); return; }
                g.setFlag('alteredSeen');
                g.addClue('alteredEntries');
                g.sfx('page');
                g.say([
                  { text: 'Under the glass, the page gives itself away: the vellum is scraped thin where the digitalis entries sit, and older ghost-lines show beneath.' },
                  { who: 'Quinn', text: 'Rewritten. And the new hand presses hard and crabs its letters — that is not the hand that kept forty years of this book.' },
                ]);
              },
            },
          },
          {
            id: 'underStand', rect: [230, 610, 200, 150], label: 'Beneath the stand',
            visible: g => !g.flag('magnifierTaken'),
            onClick: g => {
              g.setFlag('magnifierTaken');
              g.addItem('magnifier');
              g.narrate('Josiah\'s brass reading glass, on its shelf beneath the stand. He trusted print less than people.');
            },
          },
        ],
      },

      shelfWall: {
        title: 'The Remedy Shelf',
        art: Art.ch2.shelfWallZoom,
        hotspots: [
          {
            id: 'jarNote', rect: [300, 60, 600, 100], label: 'Shelf inscription',
            onClick: g => {
              g.addClue('shelfJars');
              g.narrate('"HOUSEHOLD REMEDIES — as I taught her, oldest first. — J.B." A shopkeeper\'s joke, or a father\'s filing system.');
            },
          },
          {
            id: 'jarCamphor', rect: [120, 210, 140, 215], label: 'CAMPHOR jar',
            onClick: g => { g.addClue('shelfJars'); g.narrate('CAMPHOR — for chest rubs and moths. Mercy\'s first lesson, by the shelf\'s own order.'); },
          },
          {
            id: 'jarSpearmint', rect: [325, 210, 140, 215], label: 'SPEARMINT jar',
            onClick: g => { g.addClue('shelfJars'); g.narrate('SPEARMINT — for windy babies and nervous stomachs. Second on the shelf.'); },
          },
          {
            id: 'jarHorehound', rect: [530, 210, 140, 215], label: 'HOREHOUND jar',
            onClick: g => { g.addClue('shelfJars'); g.narrate('HOREHOUND — for coughs. Bitter as a Monday. Third in the row.'); },
          },
          {
            id: 'jarOrchis', rect: [735, 210, 140, 215], label: 'ORCHIS jar',
            onClick: g => { g.addClue('shelfJars'); g.narrate('ORCHIS — salep root, for invalids\' puddings. Fourth lesson.'); },
          },
          {
            id: 'jarOxymel', rect: [940, 210, 140, 215], label: 'OXYMEL jar',
            onClick: g => { g.addClue('shelfJars'); g.narrate('OXYMEL — honey and vinegar, for sore throats. Last of the five.'); },
          },
          {
            id: 'strayVial', rect: [930, 530, 110, 130], label: 'A stray vial',
            visible: g => !g.flag('vialTaken'),
            onClick: g => {
              g.setFlag('vialTaken');
              g.addItem('emptyVial');
              g.narrate('An empty vial, chemist-clean. A detective never refuses a clean container.');
            },
          },
        ],
      },
    },
  },

  // ---------- the dispensary ----------

  dispensary: {
    name: 'The Dispensary',
    art: Art.ch2.dispensary,
    onEnter: g => {
      if (!g.flag('dispensaryVisited')) {
        g.setFlag('dispensaryVisited');
        g.say([
          { who: 'Quinn', text: 'The working room. A hundred little drawers, and every one labelled in the same steady hand — except where somebody else has been tidying.' },
        ]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [60, 180, 210, 530], label: 'Back to the shop floor',
        onClick: g => g.goTo('shopFloor'),
      },
      {
        id: 'drawers', rect: [310, 270, 510, 310], label: 'Drawer bank',
        onClick: g => g.narrate('Senna, sulphur, squills... a hundred drawers of honest trade. The dishonesty here kept itself to one cabinet.'),
      },
      {
        id: 'cabinet', rect: [880, 240, 330, 420], label: 'Poison cabinet',
        onClick: g => g.openZoom('cabinet'),
      },
      {
        id: 'workbench', rect: [330, 540, 480, 250], label: 'Workbench',
        onClick: g => g.openZoom('workbench'),
      },
      {
        id: 'gate', rect: [1300, 400, 260, 320], label: 'Cellar gate',
        onClick: g => {
          if (g.flag('gateOpen')) { g.goTo('cellarLab'); return; }
          g.narrate('An iron gate across the cellar stairs, chained to a winch drum. The drum has a square socket — and no handle.');
        },
        use: {
          windlassHandle: g => {
            if (g.flag('gateOpen')) { g.narrate('The gate stands open.'); return; }
            g.setFlag('gateOpen');
            g.sfx('unlock');
            g.retireItem('windlassHandle');
            g.narrate('The handle seats in the drum. Six hard turns and the gate racks up into the ceiling, dripping chain-oil.');
          },
        },
      },
    ],
    zooms: {

      cabinet: {
        title: 'The Poison Cabinet',
        art: Art.ch2.cabinetZoom,
        hotspots: [
          {
            id: 'doors', rect: [230, 130, 740, 540], label: 'Cabinet doors',
            onClick: g => {
              if (!g.flag('cabinetOpen')) {
                g.openPuzzle('poisonCabinet');
              } else {
                g.narrate('Laudanum, arsenic soap, blue vitriol — all present and dusty. Only the digitalis is gone.');
              }
            },
          },
          {
            id: 'plate', rect: [330, 694, 540, 86], label: 'Brass riddle plate',
            onClick: g => {
              g.addClue('riddle');
              g.narrate('"Seven years an apprentice; one daughter raised; five shops refused me. Weigh my measure, and be trusted. — J.B. — a proper chemist doubles his drachms."');
            },
          },
          {
            id: 'digitalisJar', rect: [300, 140, 180, 200], label: 'Digitalis jar',
            visible: g => g.flag('cabinetOpen'),
            onClick: g => {
              g.addClue('emptyJar');
              g.say([
                { text: 'The digitalis jar — empty to the glass. The ledger records three small doses; this held two hundred.' },
                { who: 'Quinn', text: 'Somebody emptied the shop\'s own poison shelf and let the ledger take the blame. There\'s residue on the shoulder — worth keeping, if I had something clean to keep it in.' },
              ]);
            },
            use: {
              emptyVial: g => {
                if (g.flag('scrapingsTaken')) { g.narrate('I have all the jar can give.'); return; }
                g.setFlag('scrapingsTaken');
                g.removeItem('emptyVial');
                g.addItem('jarScrapings');
                g.narrate('I scrape the green-brown residue from the jar\'s shoulder into the vial. Enough for one honest test.');
              },
            },
          },
          {
            id: 'galls', rect: [330, 420, 190, 130], label: 'Oak galls',
            visible: g => g.flag('cabinetOpen') && !g.flag('gallsTaken'),
            onClick: g => {
              g.setFlag('gallsTaken');
              g.addItem('gallNuts');
              g.narrate('A bowl of oak galls, locked in with the poisons. Odd company — unless somebody prized what they make: ink.');
            },
          },
          {
            id: 'page', rect: [620, 410, 230, 150], label: 'Loose page',
            visible: g => g.flag('cabinetOpen') && !g.flag('pageTaken'),
            onClick: g => {
              g.setFlag('pageTaken');
              g.addItem('notebookPage');
              g.say([
                { text: 'A page torn from Josiah\'s notebook, folded small and locked behind his own balance riddle. Blank.' },
                { who: 'Quinn', text: 'No chemist locks up blank paper. It catches the light oddly — a pen has been here, pressing hard, writing nothing anyone can read. Yet.' },
              ]);
            },
          },
        ],
      },

      workbench: {
        title: 'The Workbench',
        art: Art.ch2.workbenchZoom,
        hotspots: [
          {
            id: 'mortar', rect: [190, 230, 240, 170], label: 'Mortar and pestle',
            onClick: g => g.narrate('The great mortar, ground smooth by two generations. It smells of every remedy at once.'),
          },
          {
            id: 'scales', rect: [520, 210, 230, 190], label: 'Dispensing scales',
            onClick: g => g.narrate('The shop scales — beam snapped, weights gone. Somebody wanted no careful measuring done here. The cabinet lock keeps its own weights, though.'),
          },
          {
            id: 'vitriol', rect: [810, 240, 140, 150], label: 'Green vitriol',
            visible: g => !g.flag('vitriolTaken'),
            onClick: g => {
              g.setFlag('vitriolTaken');
              g.addItem('greenVitriol');
              g.narrate('A jar of green vitriol — ferrous sulphate, the colour of bottle glass. Half of an old, old ink recipe.');
            },
          },
          {
            id: 'brush', rect: [240, 550, 250, 90], label: 'Camel-hair brush',
            visible: g => !g.flag('brushTaken'),
            onClick: g => {
              g.setFlag('brushTaken');
              g.addItem('brush');
              g.narrate('A fine camel-hair brush. For gilding pills — or painting something onto paper, very evenly.');
            },
          },
          {
            id: 'burner', rect: [640, 550, 130, 120], label: 'Spirit burner',
            onClick: g => g.narrate('A spirit burner, still charged. Josiah\'s cellar has a better one.'),
          },
        ],
      },
    },
  },

  // ---------- the cellar laboratory ----------

  cellarLab: {
    name: 'The Cellar Laboratory',
    art: Art.ch2.cellarLab,
    onEnter: g => {
      if (!g.flag('cellarVisited')) {
        g.setFlag('cellarVisited');
        g.say([
          { who: 'Quinn', text: 'A proper laboratory, hidden under a shop that pretends to sell cough drops. And at the back — a locked door with five brass letters. Josiah kept his best secrets below stairs.' },
        ]);
      }
    },
    hotspots: [
      {
        id: 'stairs', rect: [80, 0, 310, 740], label: 'Stairs up',
        onClick: g => g.goTo('dispensary'),
      },
      {
        id: 'alembic', rect: [480, 300, 350, 420], label: 'Alembic and furnace',
        onClick: g => {
          if (g.flag('developerMade')) {
            g.narrate('The alembic sits cooling, still smelling of rust and oak. It has done its work.');
            return;
          }
          if (!g.hasItem('gallNuts') || !g.hasItem('greenVitriol')) {
            g.narrate('A copper alembic over a spirit furnace, scrubbed and ready. I\'d need the makings of something before I light it — the recipe card on the shelf mentions vitriol and galls.');
            return;
          }
          g.openPuzzle('developer');
        },
      },
      {
        id: 'reagentShelf', rect: [950, 240, 520, 180], label: 'Reagent shelf',
        onClick: g => {
          g.addClue('inkRecipe');
          g.say([
            { text: 'Bottles ranked like a choir, and a stained recipe card in Josiah\'s hand:' },
            { text: '"INK REVIVER, for faded deeds: rainwater first; the vitriol dissolved into it; the galls crushed in after; then warm it gently. Boil it and you may as well pour it in the gutter."' },
          ]);
        },
      },
      {
        id: 'furnace', rect: [500, 560, 240, 160], label: 'Furnace',
        onClick: g => g.narrate('The spirit furnace burns low and blue. Someone has kept it fed — Mercy, I\'d wager, keeping her father\'s room alive.'),
      },
      {
        id: 'studyDoor', rect: [1310, 400, 230, 320], label: 'Study door',
        onClick: g => {
          if (g.flag('studyUnlocked')) { g.goTo('study'); return; }
          g.openPuzzle('studyLock');
        },
      },
    ],
  },

  // ---------- the locked study ----------

  study: {
    name: 'The Locked Study',
    art: Art.ch2.study,
    onEnter: g => {
      if (!g.flag('studyVisited')) {
        g.setFlag('studyVisited');
        g.say([
          { who: 'Quinn', text: 'MERCY — he made his daughter\'s name the key to everything he hid. This room has been waiting for her. It will settle for me.' },
        ]);
      }
    },
    hotspots: [
      {
        id: 'doorBack', rect: [60, 180, 200, 530], label: 'Back to the laboratory',
        onClick: g => g.goTo('cellarLab'),
      },
      {
        id: 'reports', rect: [320, 190, 320, 220], label: "Coroner's findings",
        onClick: g => g.narrate('Copies of the coroner\'s findings on all three deaths — "natural causes", each signed by the clerk, Silas Marsh, in a cramped, heavy hand. Worth a closer look than the coroner ever gave them.'),
        use: {
          magnifier: g => {
            if (!g.flag('alteredSeen')) {
              g.narrate('A cramped, heavy hand. It reminds me of something I haven\'t looked at properly yet — the ledger.');
              return;
            }
            if (g.flag('handwritingSeen')) { g.narrate('The same hand. I\'m sure twice over.'); return; }
            g.setFlag('handwritingSeen');
            g.addClue('handwriting');
            g.sfx('success');
            g.retireItem('magnifier');
            g.say([
              { text: 'Under the glass there is no doubting it: the crabbed little "d", the heavy downstroke — the hand that signed these findings is the hand that rewrote the ledger.' },
              { who: 'Quinn', text: 'Silas Marsh. The clerk who ruled the deaths natural forged the book that blames Josiah. And Marsh was the fourth victim — the one who lived.' },
            ]);
          },
        },
      },
      {
        id: 'dupBook', rect: [580, 410, 310, 140], label: 'Duplicate prescription book',
        onClick: g => {
          g.addClue('duplicateBook');
          g.say([
            { text: 'Josiah\'s duplicate book — carbon copies of every prescription, kept where no customer ever went.' },
            { text: 'Hale: a liniment. Mrs. Vane: a sleeping draught. Tolly: a tonic for his knees. No digitalis. Not one grain, to anyone, all year.' },
            { who: 'Quinn', text: 'The ledger upstairs lies, and here is the truth in triplicate.' },
          ]);
        },
      },
      {
        id: 'recipeCard', rect: [360, 480, 140, 90], label: 'Method card',
        onClick: g => {
          g.setFlag('recipeSeen');
          g.addClue('recipe');
          g.say([
            { text: 'A method card in Josiah\'s steadiest hand, dated the week he died:' },
            { text: '"THE PROOF: the scrapings taken up in spirit; three drops of the vitriol acid; warm until it blushes; then one measure of the suspect draught. If the glass turns green, there is foxglove in the draught, and my murderer signs his gifts. — J.B."' },
          ]);
        },
      },
      {
        id: 'drawer', rect: [360, 590, 190, 80], label: 'Desk drawer',
        onClick: g => {
          if (g.flag('ringTaken')) { g.narrate('Pen nibs and sealing wax. The ring was the only thing worth locking a drawer for.'); return; }
          g.setFlag('ringTaken');
          g.addItem('sealRing');
          g.say([
            { text: 'In the drawer, on a folded handkerchief: Josiah\'s seal ring. J.B., under a mortar and pestle.' },
            { who: 'Quinn', text: 'Mercy said he never took it off. Someone took it off FOR him — or he left it here to be found, by somebody who\'d know where a seal belongs.' },
          ]);
        },
      },
      {
        id: 'blackmailPaper', rect: [740, 530, 130, 90], label: 'A letter under the blotter',
        visible: g => !g.flag('blackmailTaken'),
        onClick: g => {
          g.setFlag('blackmailTaken');
          g.addItem('blackmailLetter');
          g.addClue('blackmail');
          g.say([
            { text: 'Under the blotter, a letter Josiah plainly took from a frightened customer:' },
            { text: '"What I record, I can also omit — for a consideration. Your customers value discretion; so do I. — S.M."' },
            { who: 'Quinn', text: 'S.M. sold silence to the sick and the scandalous. Hale, Vane and Tolly bought — until they wouldn\'t. And Josiah collected the evidence.' },
          ]);
        },
      },
      {
        id: 'tonicTable', rect: [890, 470, 170, 250], label: 'Side table',
        visible: g => !g.flag('tonicTaken'),
        onClick: g => {
          g.setFlag('tonicTaken');
          g.addItem('tonicBottle');
          g.addClue('tonicGift');
          g.say([
            { text: 'A bottle of tonic, half-drunk, with a gift card: "With gratitude for your discretion — S.M."' },
            { who: 'Quinn', text: 'Marsh drank a public dose of his own poison to play the victim — and fed Josiah the rest a glassful at a time. Grief, the doctor said.' },
          ]);
        },
      },
      {
        id: 'bookcase', rect: [1100, 150, 424, 560], label: 'Bookcase',
        onClick: g => {
          if (g.flag('bookcaseOpen')) { g.goTo('compoundingRoom'); return; }
          if (g.hasClue('hiddenMessage')) {
            g.narrate('"Below, behind the books, is my proof." The carved crest at the base has a recess in it — small, octagonal, and exactly the shape of a signet.');
          } else {
            g.narrate('Pharmacopoeias by the yard. The carved crest at the base has a curious recess — small and octagonal, polished by touch.');
          }
        },
        use: {
          sealRing: g => {
            if (g.flag('bookcaseOpen')) return;
            g.setFlag('bookcaseOpen');
            g.sfx('unlock');
            g.retireItem('sealRing');
            g.say([
              { text: 'The seal ring seats into the recess and turns like a key — which is what it always was. The bookcase swings out on silent hinges.' },
              { who: 'Quinn', text: 'Behind the books. Just as you said, Josiah.' },
            ], g2 => g2.goTo('compoundingRoom'));
          },
        },
      },
    ],
  },

  // ---------- the compounding room (finale) ----------

  compoundingRoom: {
    name: 'The Compounding Room',
    art: Art.ch2.compoundingRoom,
    onEnter: g => {
      if (!g.flag('compoundingVisited')) {
        g.setFlag('compoundingVisited');
        g.say([
          { text: 'A snug brick room, warm from a burner left charged and ready. A retort stand, a flask, reagents ranked in order of use — an experiment laid out like a table set for guests.' },
          { who: 'Quinn', text: 'He prepared everything and died before he could run it. All it ever needed was a steadier hand. Mine will do.' },
        ]);
      }
    },
    hotspots: [
      {
        id: 'wayBack', rect: [0, 150, 110, 560], label: 'Back through the bookcase',
        onClick: g => g.goTo('study'),
      },
      {
        id: 'letter', rect: [530, 420, 160, 120], label: "Josiah's last letter",
        onClick: g => {
          g.addClue('lastLetter');
          g.say([
            { text: 'Propped against the lamp, a letter that was always going to be read in this room:' },
            { text: '"My girl — if I am gone, do not grieve me into carelessness. Trust the shelf, trust the duplicates, trust no kindness from the courthouse. You were always the better chemist. Finish my work. — Your father."' },
          ]);
        },
      },
      {
        id: 'portrait', rect: [1240, 240, 150, 180], label: 'Portrait',
        onClick: g => g.narrate('Mercy, aged six or so, scowling magnificently in her Sunday best. The frame is the only dusted thing in the room.'),
      },
      {
        id: 'bench', rect: [470, 300, 680, 260], label: 'The proof bench',
        onClick: g => {
          if (g.flag('proofDone')) { g.narrate('The glass glows green as a fresh leaf. Proof, standing in a flask.'); return; }
          const missing = [];
          if (!g.hasItem('jarScrapings')) missing.push('the scrapings from the digitalis jar');
          if (!g.hasItem('tonicBottle')) missing.push('Marsh\'s tonic bottle');
          if (missing.length) {
            g.narrate('Everything is laid out for Josiah\'s test — but I\'m missing ' + missing.join(', and ') + '.');
            return;
          }
          g.openPuzzle('proofCompound');
        },
      },
    ],
  },
};

// ---------- interactive puzzles ----------

/* The finale cutscene, run when the proof compound turns green. */
function runFinale(g) {
  g.say([
    { text: 'I add one measure from Marsh\'s gift bottle. The flask holds its breath — then blushes, then turns green as a foxglove leaf in April.' },
    { who: 'Quinn', text: 'Foxglove in the tonic. Digitalis from this shop\'s own jar, in a bottle signed by the coroner\'s clerk.' },
    { text: 'It takes the Yard a day to do the rest. The duplicates prove the ledger false; the glass proves the tonic fatal; the crabbed little "d" in Marsh\'s findings does the rest.' },
    { who: 'Marsh', text: 'You cannot possibly— I RULED on those deaths. My findings are the record!' },
    { who: 'Quinn', text: 'You ruled on your own murders and invoiced the county for the ink, Mr. Marsh. The one death you never thought to rule on was the one that caught you: the man you poisoned politely, glass by glass.' },
    { text: 'Silas Marsh is taken up for four murders — Hale, Vane, Tolly, and Josiah Blackwood, whose heart did not fail him in any way that mattered.' },
    { who: 'Mercy', text: 'The sign stays as it is, Detective. Blackwood & Daughter. It was only ever the truth — he just wrote it a generation early.' },
    { text: 'By evening the shop smells of camphor and beeswax again. In the ledger, in a firm new hand, the day\'s first honest entry: "Reopened. — M.B."' },
  ], g2 => g2.endChapter());
}

const PUZZLES = {

  poisonCabinet: {
    title: 'The Balance Lock',
    wide: true,
    render(g) {
      const on = g.getFlag('balOn') || [];
      const sum = on.reduce((a, b) => a + b, 0);
      const tilt = sum === 0 ? 6 : (sum === 13 ? 0 : (sum < 13 ? 6 : -6));
      const chips = [1, 2, 4, 8, 16].map(w =>
        `<button class="btn weight-chip${on.includes(w) ? ' on' : ''}" data-act="w${w}">${w} dr</button>`).join('');
      return `
        <div class="puzzle-clock">
        <svg viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg">
          <rect x="205" y="180" width="50" height="14" rx="4" fill="#553a27"/>
          <rect x="222" y="60" width="16" height="126" rx="5" fill="#8a6a30"/>
          <g transform="rotate(${tilt} 230 66)">
            <rect x="80" y="58" width="300" height="12" rx="6" fill="#c9a544" stroke="#8a6a30" stroke-width="2"/>
            <line x1="100" y1="70" x2="100" y2="108" stroke="#8a6a30" stroke-width="3"/>
            <path d="M 60 108 a 40 16 0 0 0 80 0 Z" fill="#b08d3e" stroke="#8a6a30" stroke-width="3"/>
            <text x="100" y="104" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#41300f">J.B.</text>
            <line x1="360" y1="70" x2="360" y2="108" stroke="#8a6a30" stroke-width="3"/>
            <path d="M 320 108 a 40 16 0 0 0 80 0 Z" fill="#b08d3e" stroke="#8a6a30" stroke-width="3"/>
            <text x="360" y="104" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#41300f">${sum} dr</text>
          </g>
          <circle cx="230" cy="64" r="9" fill="#241608"/>
        </svg>
        </div>
        <p class="puzzle-msg">${g.getFlag('balMsg') || 'A sealed weight stamped J.B. hangs on the left. Five drachm weights wait for the right-hand pan.'}</p>
        <div class="puzzle-controls">${chips}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="weigh">Weigh</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const on = g.getFlag('balOn') || [];
        if (act[0] === 'w' && act !== 'weigh') {
          const w = Number(act.slice(1));
          g.setFlag('balOn', on.includes(w) ? on.filter(x => x !== w) : [...on, w]);
          g.setFlag('balMsg', '');
          rerender();
          return;
        }
        // weigh
        const sum = on.reduce((a, b) => a + b, 0);
        if (sum === 13) {
          g.setFlag('cabinetOpen');
          g.sfx('unlock');
          g.closePuzzle();
          g.say([
            { text: 'The pans settle level — and somewhere in the cabinet\'s spine, a bar drops. Both doors sigh open.' },
            { who: 'Quinn', text: 'Seven, and one, and five. Thirteen drachms — the measure of the man.' },
          ]);
        } else {
          g.sfx('error');
          g.setFlag('balMsg', sum < 13
            ? 'The J.B. weight sinks; the right pan rides high. Not enough.'
            : 'The right pan drops like a guilty conscience. Too much.');
          rerender();
        }
      }));
    },
  },

  developer: {
    title: 'The Alembic — Ink Reviver',
    render(g) {
      const steps = g.getFlag('mixSteps') || [];
      const done = { water: 'rainwater', vitriol: 'vitriol, dissolved', galls: 'galls, crushed in', warm: 'warmed gently' };
      const sofar = steps.length ? steps.map(s => done[s]).join(' — ') : 'the vessel stands empty';
      return `
        <p class="puzzle-msg">In the vessel: ${sofar}.</p>
        <p class="puzzle-msg">${g.getFlag('mixMsg') || '"Rainwater first; the vitriol dissolved into it; the galls crushed in after; then warm it gently."'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="water">Pour rainwater</button>
          <button class="btn" data-act="vitriol">Dissolve the vitriol</button>
          <button class="btn" data-act="galls">Crush in the galls</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="warm">Warm it gently</button>
          <button class="btn" data-act="boil">Boil it hard</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="reset">Start over</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ORDER = ['water', 'vitriol', 'galls', 'warm'];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'reset') {
          g.setFlag('mixSteps', []);
          g.setFlag('mixMsg', 'I tip the vessel out and rinse it. Again, and properly.');
          rerender();
          return;
        }
        const steps = g.getFlag('mixSteps') || [];
        if (act === 'boil') {
          g.sfx('error');
          g.setFlag('mixSteps', []);
          g.setFlag('mixMsg', 'It seethes, stinks, and turns to gutter-water. "Boil it and you may as well pour it in the gutter." Quite.');
          rerender();
          return;
        }
        if (ORDER[steps.length] !== act) {
          g.sfx('error');
          g.setFlag('mixSteps', []);
          g.setFlag('mixMsg', 'The mixture clouds into a murky sludge. Out it goes — the card gives the order for a reason.');
          rerender();
          return;
        }
        const next = [...steps, act];
        if (next.length === ORDER.length) {
          g.setFlag('mixSteps', []);
          g.setFlag('developerMade');
          g.removeItem('gallNuts');
          g.removeItem('greenVitriol');
          g.addItem('developerVial');
          g.sfx('success');
          g.closePuzzle();
          g.say([
            { text: 'Warmed gently, the brew turns a deep rust-black — iron-gall developer, keen for any paper a pen has bruised.' },
            { who: 'Quinn', text: 'Now, Josiah — let\'s hear what you pressed into that blank page of yours.' },
          ]);
        } else {
          g.setFlag('mixSteps', next);
          g.setFlag('mixMsg', '');
          rerender();
        }
      }));
    },
  },

  studyLock: {
    title: 'Five Brass Letters',
    render(g) {
      const idx = [1, 2, 3, 4, 5].map(i => g.getFlag('sd' + i) || 0);
      const dial = i => `
        <div class="safe-dial">
          <button class="btn" data-act="u${i}">&#9650;</button>
          <div class="safe-digit">${String.fromCharCode(65 + idx[i])}</div>
          <button class="btn" data-act="d${i}">&#9660;</button>
        </div>`;
      return `
        <div class="safe-dials">${dial(0)}${dial(1)}${dial(2)}${dial(3)}${dial(4)}</div>
        <p class="puzzle-msg">${g.getFlag('sdMsg') || 'Five brass letter dials, A through Z. The door keeps a name, not a number.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="try">Try the door</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'try') {
          const word = [1, 2, 3, 4, 5].map(i => String.fromCharCode(65 + (g.getFlag('sd' + i) || 0))).join('');
          if (word === 'MERCY') {
            g.setFlag('studyUnlocked');
            g.sfx('unlock');
            g.closePuzzle();
            g.say([
              { text: 'M — E — R — C — Y. The fifth letter seats and the whole door exhales, bolts drawing back in order like a scale played downward.' },
              { who: 'Quinn', text: 'Camphor, Spearmint, Horehound, Orchis, Oxymel. He hid his daughter\'s name in her own lessons.' },
            ]);
          } else {
            g.sfx('error');
            g.setFlag('sdMsg', 'The dials turn sweetly and the door ignores them. Not that word.');
            rerender();
          }
          return;
        }
        const i = Number(act.slice(1));
        const k = 'sd' + (i + 1);
        const cur = g.getFlag(k) || 0;
        g.setFlag(k, act[0] === 'u' ? (cur + 1) % 26 : (cur + 25) % 26);
        g.setFlag('sdMsg', '');
        rerender();
      }));
    },
  },

  proofCompound: {
    title: "Josiah's Proof",
    render(g) {
      const steps = g.getFlag('proofSteps') || [];
      const done = { scrapings: 'scrapings in spirit', acid: 'three drops of acid', warm: 'warmed to a blush', tonic: 'the suspect draught' };
      const sofar = steps.length ? steps.map(s => done[s]).join(' — ') : 'the flask holds clean spirit';
      return `
        <p class="puzzle-msg">In the flask: ${sofar}.</p>
        <p class="puzzle-msg">${g.getFlag('proofMsg') || '"The scrapings taken up in spirit; three drops of the vitriol acid; warm until it blushes; then one measure of the suspect draught."'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="scrapings">Add the jar scrapings</button>
          <button class="btn" data-act="acid">Three drops of acid</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="warm">Warm until it blushes</button>
          <button class="btn" data-act="tonic">One measure of the tonic</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="reset">Start over</button>
          <button class="btn" data-act="leave">Step away</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ORDER = ['scrapings', 'acid', 'warm', 'tonic'];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'reset') {
          g.setFlag('proofSteps', []);
          g.setFlag('proofMsg', 'I rinse the flask with spirit and begin again. There is only enough residue for so many attempts — best make this one count.');
          rerender();
          return;
        }
        const steps = g.getFlag('proofSteps') || [];
        if (ORDER[steps.length] !== act) {
          g.sfx('error');
          g.setFlag('proofSteps', []);
          g.setFlag('proofMsg', 'The mixture stays sullen and grey. Wrong order — Josiah\'s card is exact, and so must I be.');
          rerender();
          return;
        }
        const next = [...steps, act];
        if (next.length === ORDER.length) {
          g.setFlag('proofSteps', []);
          g.setFlag('proofDone');
          g.removeItem('jarScrapings');
          g.sfx('success');
          g.closePuzzle();
          runFinale(g);
        } else {
          g.setFlag('proofSteps', next);
          g.setFlag('proofMsg', '');
          rerender();
        }
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch2 = {
  id: 'ch2',
  order: 2,
  title: "The Apothecary's Ledger",
  subtitle: 'Chapter Two — A Poisoner\'s Hand',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'shopFloor',

  intro: [
    { text: 'Wren Lane, under a chemist\'s green-glass globe. Three customers of Blackwood & Daughter are a month in their graves — weak hearts, says the coroner\'s clerk.' },
    { text: 'The prescription book says Josiah Blackwood poisoned them. Josiah Blackwood has been dead a week, and cannot argue.' },
    { who: 'Mercy', text: 'Detective Quinn. They will take the shop, and his name with it, unless somebody proves the book a liar.' },
    { who: 'Quinn', text: 'Books don\'t lie on their own, Miss Blackwood — someone always holds the pen. Show me where it sleeps.' },
  ],

  hints: [],

  end: {
    kicker: 'Chapter Two Complete',
    title: "The Apothecary's Ledger",
    body: 'Silas Marsh — held for four murders, convicted by the very findings he signed. ' +
      'Josiah Blackwood — cleared, mourned, and right about everything. ' +
      'And on Wren Lane, Blackwood & Daughter opens at nine sharp, under new and steadier management.',
    next: null,
  },
};

})();
