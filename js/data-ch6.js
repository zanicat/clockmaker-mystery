/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Six — "The Headmistress's Cup".

   Three days before Founders' Day the Aldergate Cup vanishes from a
   locked case, and Pip Fairweather — first girl to bowl for the First
   Eleven — faces expulsion: caught out of bed at midnight, and she
   won't say why. The truth: the bursar, Mr. Quill, pawned the Cup in
   July to cover his railway shares, "stole" the school's electrotype
   match copy before the governors could handle it on Founders' Day,
   and planted a note in the pupils' own secret chalk code to make a
   child carry the blame. Pip won't talk because her real alibi is the
   Lantern Club's midnight feast — where she stood sentry, and wrote
   the very log line that clears her and convicts him.

   Verb: trace/follow. The chapter's novelty is the GLYPH LANGUAGE:
   marks are seen in context (seen_<glyph> flags), confirmed in the
   mark-book in two batches (marks1Done / marks2Done — each validation
   re-renders every scene with pencilled translations), and the finale
   is read glyph by glyph before the whole school.

   NOTE: keep flags scalar; array-valued flags must never be mutated
   in place (setFlag persists). This chapter uses scalars throughout. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ITEMS = {
  forgedNote: {
    name: 'The Planted Note',
    desc: 'Found pinned inside the rifled case: a scrap of paper in the pupils\' chalk code. The governors call it proof. Something about its triangle-sign snags my eye, though I can\'t yet say what.',
    icon: Art.ch6.icons.forgedNote,
  },
  conker: {
    name: 'Conker',
    desc: 'A fine fat conker from under the great elm, still glossy from its shell. Raw recruits crack, though — everyone in the quad agrees a fighting conker wants hardening.',
    icon: Art.ch6.icons.conker,
  },
  vinegar: {
    name: 'Cook\'s Vinegar',
    desc: 'A jar of malt vinegar from the buttery shelf. Its lawful use is pickles. Its higher calling, every pupil knows, is conkers.',
    icon: Art.ch6.icons.vinegar,
  },
  seasonedConker: {
    name: 'Seasoned Conker',
    desc: 'Bathed in vinegar and hard as a magistrate\'s heart. A conker fit to challenge a champion.',
    icon: Art.ch6.icons.seasonedConker,
  },
  penknife: {
    name: 'Confiscated Penknife',
    desc: 'From the bursar\'s confiscation drawer — a pupil\'s penknife with a broken-in blade. Confiscated goods, liberated for the public good.',
    icon: Art.ch6.icons.penknife,
  },
  mouse: {
    name: 'Bonaparte',
    desc: 'A white mouse of imperial composure, lately exiled to a cage in the bursary. He belongs to Inky Marlow, and Inky Marlow knows things.',
    icon: Art.ch6.icons.mouse,
  },
  poker: {
    name: 'Furnace Poker',
    desc: 'A long iron poker from the dead furnace, hooked at the business end. Wants only a line to be a fishing rod.',
    icon: Art.ch6.icons.poker,
  },
  twine: {
    name: 'Ball of Twine',
    desc: 'Good waxed twine from the club\'s museum shelf. The Lantern Club would want it back, but I am, after all, an ally of the crown.',
    icon: Art.ch6.icons.twine,
  },
  fishline: {
    name: 'Poker on a Line',
    desc: 'The furnace poker lashed to good twine: a grapnel for wells, drains, and other places where inconvenient things get dropped.',
    icon: Art.ch6.icons.fishline,
  },
  watchLog: {
    name: 'The Watch-Log',
    desc: 'The Lantern Club\'s sentry log, in chalk on black card. The night of the theft is one line of seven signs — initialled P.F.',
    icon: Art.ch6.icons.watchLog,
  },
  pawnTicket: {
    name: 'Pawn Ticket No. 88',
    desc: 'Marley & Flint, pawnbrokers: "one cup, silver, two-handled, engraved ALDERGATE 1792." Pledged in JULY. The Cup left this school months before its theft.',
    icon: Art.ch6.icons.pawnTicket,
  },
};

const COMBOS = {
  'conker+vinegar': g => {
    g.removeItem('conker');
    g.removeItem('vinegar');
    g.addItem('seasonedConker');
    g.narrate('The conker takes its vinegar bath and comes out dark, dense and disgraceful — hard as a magistrate\'s heart. Tab Brill may now be formally challenged.');
  },
  'poker+twine': g => {
    g.removeItem('poker');
    g.removeItem('twine');
    g.addItem('fishline');
    g.narrate('Poker, meet twine. Lashed at the neck, the hook swings sweetly: a grapnel fit for anything a hurried man might drop down a well.');
  },
};

const CLUES = {
  theCase: {
    title: 'The Cup and the accusation',
    text: [
      'Three days before Founders\' Day, the Aldergate Cup leaves a locked case in a locked hall. Pip Fairweather, caught out of her dormitory at midnight, will not say where she was — so the governors have their thief, aged twelve.',
      'Dr. Birch does not believe it, cannot disprove it, and will not expel a child on a chalked triangle. Hence me, quietly.',
    ],
  },
  pipSilent: {
    title: 'Pip won\'t talk',
    text: [
      '"I was in bed." She was not in bed; the housemistress saw her on the stair at midnight, and Pip knows she was seen. She repeats the lie anyway, chin first, like a batsman taking guard.',
      'Children lie badly for themselves and magnificently for others. That girl is protecting something — and it isn\'t herself.',
    ],
  },
  caseKeys: {
    title: 'A key, not a crowbar',
    text: [
      'The case lock is unscratched, the glass whole, the dust inside disturbed in one clean ring — stand and all, lifted out by somebody with time and a key.',
      'Three keys exist: Dr. Birch\'s, the porter\'s, the bursar\'s. All three keepers are vouched for — dinner with the governors, the lodge, a counting-room lamp that burned till two. Somebody\'s vouching is about to have a bad week.',
    ],
  },
  plantedNote: {
    title: 'The note in the case',
    text: [
      'Pinned inside the case: a scrap of the pupils\' own chalk code. To the governors it damns the children — who else writes in the children\'s alphabet?',
      'But what kind of thief signs a burglary in a code that points straight at the people he robbed... unless pointing was the entire purpose of the note?',
    ],
  },
  clubSigns: {
    title: 'The chalk that talks',
    text: [
      'Low on walls, child-height, all over the school: little chalked signs — arrows, circles, triangles — refreshed often, rubbed out where staff pass. A whole grammar of them.',
      'The pupils have a written language the staff can\'t read. Whoever learns it can hear every wall in Aldergate testify.',
    ],
  },
  bookOne: {
    title: 'Mark-book: page one',
    text: [
      'Six signs confirmed against their contexts: this way, turn back, all clear, danger, grub here, the gates.',
      'The trail signs are the road-signs of a hidden school. I can follow where they point now — and marks are meant to be FOLLOWED.',
    ],
  },
  trailFound: {
    title: 'The trail to the back stair',
    text: [
      'The shrubbery marks run true: through the kitchen yard, in at the boot-room, along the panelling — to a dusty curtain in the Great Hall that has never once been dusty.',
      'Behind it, a back stair, and chalked at its foot: the bolt-hole sign. The Lantern Club lives upstairs.',
    ],
  },
  bookTwo: {
    title: 'Mark-book: page two',
    text: [
      'Six more, confirmed: a beak, sentry post, meeting, bolt-hole, midnight, carrying a load. The alphabet is mine.',
      'Every chalked wall in this school just became a witness statement.',
    ],
  },
  feastCrumbs: {
    title: 'The midnight feast',
    text: [
      'The cellar corner tells it plainly: crumbs, candle stubs, thirteen apple cores, and the club\'s signs on the wall — bolt-hole, all clear. A feast was held the very night the Cup "vanished".',
      'A dozen children were awake, hidden, and posted about the school at midnight. The theft had witnesses. They simply can\'t confess to being witnesses.',
    ],
  },
  pipWatch: {
    title: 'Pip\'s real midnight',
    text: [
      'The log\'s night line is initialled P.F. — Pip Fairweather stood sentry at the buttery stair while the club feasted. She was caught coming DOWN from her post, and said nothing sooner than betray them all.',
      'Her false alibi breaks, and an honest one stands up in its place: at the hour the case was opened, the accused was guarding a cellar full of cake.',
    ],
  },
  quillNumbers: {
    title: 'The bursar\'s arithmetic',
    text: [
      'The school accounts flinch: sums re-entered, a column that never quite crosses, and dividend notices from a railway company gone to the wall. Mr. Quill has been losing money he did not have.',
      'Poverty isn\'t guilt. But a man drowning quietly will clutch at silver.',
    ],
  },
  lampAlibi: {
    title: 'The lamp that worked late',
    text: [
      'Mrs. Motts at the lodge: gates locked at nine, nobody in or out, and the bursary lamp burning till two — "poor Mr. Quill, working himself to a shred."',
      'A lamp burning in a room is not a man sitting in it. Lamps are excellent employees: they never stop working just because their master steps out.',
    ],
  },
  forgeryTell: {
    title: 'A thirty-year-old hand',
    text: [
      'The planted note\'s "beak" sign is crossed at the crown — the OLD form, carved on the retired desks in the cellar and drawn by no pupil in thirty years. The current children draw it with a tassel. The forger learned this code long ago, and never saw it grow.',
      'One retired desk lid carries the old beak sign and a set of initials, cut deep by a bored boy: A.Q., 1858. The bursar was an Aldergate pupil. The note is his childhood, showing.',
    ],
  },
  watchLogFound: {
    title: 'The watch-log',
    text: [
      'From the club\'s strongbox: the sentry rota, kept nightly in chalk on black card, in a language no adult in the school can read. The night of the theft is one line of seven signs, initialled P.F.',
      'A document written by children, for children, with no reason on earth to lie to either. The most honest witness in the building has been sitting in a tuck-box.',
    ],
  },
  pawnFound: {
    title: 'Pawn ticket No. 88',
    text: [
      'Fished from the well, wrapped in the packing: Marley & Flint, pawnbrokers — "one cup, silver, two-handled, engraved ALDERGATE 1792." Pledged in July.',
      'The Aldergate Cup left this school in the summer holidays. Whatever vanished three nights ago, it was not the Cup.',
    ],
  },
  replicaWell: {
    title: 'The copy in the well',
    text: [
      'Also from the well: the school\'s electrotype match-day copy of the Cup, stand and all — the thing that actually stood in the case since July.',
      'A thief steals silver. Only the silver\'s keeper steals a COPY — because on Founders\' Day, old captains pick the Cup up, and an electrotype in the hand gives the whole game away. The "theft" was a bookkeeping entry, made with a key, at midnight.',
    ],
  },
  resolution: {
    title: 'Read before the whole school',
    text: [
      'The watch-log, translated aloud at assembly: a beak, carrying a load, this way to the gates, midnight, danger. Corroborated by a lamp with no master, a copy in a well, a ticket pledged in July, and a beak-sign thirty years out of date above the initials A.Q.',
      'Mr. Quill confessed before the second reading. Pip Fairweather bowls on Saturday. And the Lantern Club\'s alphabet remains, officially, unreadable.',
    ],
  },
};

// The order the mark-book offers meanings; guesses cycle through these.
const POOL1 = ['danger', 'this way', 'grub here', 'turn back', 'the gates', 'all clear'];
const ROWS1 = [
  { g: 'thisWay', a: 1 }, { g: 'turnBack', a: 3 }, { g: 'allClear', a: 5 },
  { g: 'danger', a: 0 }, { g: 'grub', a: 2 }, { g: 'gates', a: 4 },
];
const POOL2 = ['midnight', 'a beak (staff)', 'bolt-hole', 'meeting', 'carrying a load', 'sentry post'];
const ROWS2 = [
  { g: 'beak', a: 1 }, { g: 'sentry', a: 5 }, { g: 'moot', a: 3 },
  { g: 'boltHole', a: 2 }, { g: 'midnight', a: 0 }, { g: 'carrying', a: 4 },
];

const SCENES = {

  // ---------- the quad (start) ----------

  quad: {
    name: 'The Quad',
    art: Art.ch6.quad,
    hotspots: [
      {
        id: 'hallDoors', rect: [540, 480, 140, 200], label: 'The Great Hall doors',
        onClick: g => g.goTo('hall'),
      },
      {
        id: 'cellarSteps', rect: [860, 560, 120, 120], label: 'The cellar steps',
        onClick: g => g.goTo('cellars'),
      },
      {
        id: 'pip', rect: [360, 640, 140, 290], label: 'Pip Fairweather',
        onClick: g => {
          if (!g.hasClue('pipSilent')) {
            g.say([
              { who: 'Pip', text: 'If you\'ve come to make me say it again: I was in bed. I don\'t care who saw what on the stair. I was in bed.' },
              { who: 'Quinn', text: 'You bowl with that chin out too, I expect. Miss Fairweather, I\'m not here to catch you. I\'m here because your Headmistress doesn\'t believe a word of this.' },
              { who: 'Pip', text: '...Then she can not-believe it quietly, like me. I was in bed. That\'s all anyone\'s getting.' },
            ], g2 => g2.addClue('pipSilent'));
          } else if (g.hasItem('watchLog') && g.flag('marks2Done') && !g.hasClue('pipWatch')) {
            g.say([
              { who: 'Quinn', text: 'One line, seven signs, initialled P.F. — "sentry, buttery stair, midnight." You weren\'t out stealing cups, Pip. You were on watch.' },
              { who: 'Pip', text: 'You can READ it?! Nobody can read it. Not even the beaks who confiscate it can— oh. Oh, you\'re going to get the whole club expelled, and it\'ll STILL be my fault.' },
              { who: 'Quinn', text: 'Nobody is getting expelled for cake. Your post has a view of the buttery stair — and your log says a beak crossed the quad at midnight, carrying. You saw the thief, wrote it down in a language no adult reads, and then took the blame rather than translate. That\'s the most honourable stupid thing I\'ve heard all year.' },
              { who: 'Pip', text: '...It was a good feast, too. Nobody\'s even asked me about the sponge cake.' },
            ], g2 => g2.addClue('pipWatch'));
          } else if (g.hasClue('pipWatch') && !g.flag('ended')) {
            g.say([{ who: 'Pip', text: 'You\'ll really read it out? In front of everyone? ...Read it well, then. I wrote it very neatly, considering it was midnight.' }]);
          } else {
            g.say([{ who: 'Pip', text: 'I was in bed. Practising being in bed. It\'s where I sleep.' }]);
          }
        },
      },
      {
        id: 'tab', rect: [1030, 620, 140, 290], label: 'Tab Brill, conker champion',
        onClick: g => {
          if (g.flag('tabBeaten')) {
            g.say([{ who: 'Tab', text: 'Beaten fair, beaten square. You want the Chief Scribe — and mind, I never said there WAS a Chief Scribe. Or a club. Or an anything.' }]);
            return;
          }
          if (g.hasItem('seasonedConker')) {
            g.say([
              { who: 'Tab', text: 'Vinegar-hard, is it? Proper. Right then, detective — my sixty-sixer against your recruit. Winner asks one question and gets a true answer. That\'s the yard\'s law.' },
            ], g2 => g2.openPuzzle('conkers'));
            return;
          }
          g.say([
            { who: 'Tab', text: 'You want to know about the chalk. Everyone suddenly wants to know about the chalk. The yard doesn\'t talk to grown-ups, missus — unless a grown-up earns it.' },
            { who: 'Quinn', text: 'And how is it earned?' },
            { who: 'Tab', text: 'Conkers, obviously. My sixty-sixer against anything you can field. Elm drops them; Cook\'s vinegar hardens them — everyone knows THAT much. Come back with a conker worth splitting.' },
          ]);
        },
      },
      {
        id: 'elm', rect: [1180, 560, 150, 140], label: 'The great elm',
        onClick: g => {
          if (g.flag('conkerTaken')) { g.narrate('The elm rains leaves and ammunition in season. The whole school\'s arsenal grows on this one tree.'); return; }
          g.setFlag('conkerTaken');
          g.addItem('conker');
          g.narrate('A fat glossy conker, fresh from its shell. Raw, though. If I\'m to duel a champion, the quad\'s own science says it wants a vinegar bath first.');
        },
      },
      {
        id: 'shrubbery', rect: [60, 690, 340, 130], label: 'The chalk marks on the shrubbery',
        onClick: g => {
          g.setFlag('seen_thisWay');
          g.setFlag('seen_grub');
          g.setFlag('seen_danger');
          if (g.hasClue('clubSigns')) { g.narrate('The arrow, the little bowl-sign, the zigzag — refreshed this week, child-height, and pointing away into the bushes. Signs are sentences. I want the grammar.'); return; }
          g.say([
            { text: 'Low on the shrubbery stakes, at exactly the height of a twelve-year-old\'s hand: chalked signs. An arrow. A shape like a bowl on a shelf — and near the tuck-shop path, of all places. A hard little zigzag under the housemistress\'s window.' },
            { who: 'Quinn', text: 'An arrow where a path forks. A "something nice" where the biscuits live. A warning under the one window nobody dares pass. This isn\'t scribble — it\'s a LANGUAGE, and the school is covered in it.' },
          ], g2 => g2.addClue('clubSigns'));
        },
      },
      {
        id: 'trail', rect: [60, 820, 340, 100], label: 'Follow the trail',
        visible: g => g.flag('marks1Done') && !g.flag('hatchFound'),
        onClick: g => g.openPuzzle('trailRoute'),
      },
      {
        id: 'pavilion', rect: [500, 690, 210, 170], label: 'The pavilion door',
        onClick: g => {
          g.setFlag('seen_allClear');
          g.narrate('On the pavilion door, a chalked circle — and the pavilion is the one place staff never trouble to check after dark. If I had to guess the circle\'s meaning, I\'d guess it means nobody ever has to.');
        },
      },
      {
        id: 'gateArch', rect: [1350, 430, 210, 250], label: 'The gate arch',
        onClick: g => {
          g.setFlag('seen_gates');
          g.narrate('Two chalked posts with a bar — drawn on the arch beside the actual gates, the way a child labels a drawing. Some signs are places, then. This one can hardly be anything but "the gates".');
        },
      },
      {
        id: 'motts', rect: [1490, 600, 140, 260], label: 'Mrs. Motts, the porter',
        onClick: g => {
          if (g.hasClue('lampAlibi')) { g.say([{ who: 'Mrs. Motts', text: 'Locked at nine, opened at six, and my kettle between me and the gate the whole night. Nothing bigger than a cat came through, and I knew the cat.' }]); return; }
          g.say([
            { who: 'Mrs. Motts', text: 'Gates locked at nine sharp, Miss Quinn, and nobody through them till milk. If that Cup left the grounds, it flew.' },
            { who: 'Quinn', text: 'And the staff? All abed?' },
            { who: 'Mrs. Motts', text: 'Headmistress dined with the governors till past one — I let their carriages out myself. And poor Mr. Quill\'s lamp was burning in the bursary till two if it burned a minute. Works himself to a shred, that man, and no wife to stop him.' },
            { who: 'Quinn', text: 'A lamp burning in a room. Mrs. Motts, you\'d be surprised how hard a lamp finds it to prove who\'s sitting beside it.' },
          ], g2 => g2.addClue('lampAlibi'));
        },
      },
      {
        id: 'well', rect: [740, 780, 160, 100], label: 'The old well',
        onClick: g => {
          if (g.flag('wellFished')) { g.narrate('The well has given up its secrets: one electrotype cup, one pawn ticket, and the last of Mr. Quill\'s bookkeeping.'); return; }
          g.narrate('The old well, off its bucket for years, conveniently on the path from hall to gates. The log says a burden went "this way" at midnight — and burdens that reach the gates but never pass them have a way of going downward instead. I\'d want a hook on a line before I swear to it.');
        },
        use: {
          fishline: g => {
            if (g.flag('wellFished')) { g.narrate('Nothing left down there but honest water.'); return; }
            g.setFlag('wellFished');
            g.sfx('splash');
            g.addItem('pawnTicket');
            g.addClue('replicaWell');
            g.addClue('pawnFound');
            g.retireItem('fishline');
            g.say([
              { text: 'The hook bites on the third cast. Up, dripping: the school\'s electrotype match-day copy of the Cup, stand and all — and lodged in the base, wrapped against rattling, a pawnbroker\'s ticket. Marley & Flint, No. 88: one cup, silver, two-handled, ALDERGATE 1792. Pledged in JULY.' },
              { who: 'Quinn', text: 'The real Cup left in the summer holidays. What stood in that case was the copy — and on Founders\' Day, old captains take the Cup DOWN and hold it, and an electrotype in the hand betrays itself in a moment. A thief steals silver. Only its keeper steals a copy.' },
            ]);
          },
        },
      },
      {
        id: 'bench', rect: [1330, 740, 210, 150], label: 'Ivy\'s bench',
        onClick: g => {
          if (g.flag('marks2Done')) { g.narrate('The mark-book, complete: twelve signs, two confirmed pages, one readable school. The best afternoon\'s work this bench has ever seen.'); return; }
          g.openPuzzle('markBook');
        },
      },
    ],
  },

  // ---------- the great hall ----------

  hall: {
    name: 'The Great Hall',
    art: Art.ch6.hall,
    onEnter: g => {
      if (!g.flag('hallSeen')) {
        g.setFlag('hallSeen');
        g.say([{ who: 'Quinn', text: 'Honours boards, oak panels, three shafts of afternoon — and one glass case with nothing in it, which is somehow the loudest thing in the room.' }]);
      }
    },
    hotspots: [
      {
        id: 'quadDoors', rect: [40, 740, 220, 220], label: 'Out to the quad',
        onClick: g => g.goTo('quad'),
      },
      {
        id: 'trophyCase', rect: [560, 430, 300, 260], label: 'The trophy case',
        onClick: g => g.openZoom('case'),
      },
      {
        id: 'studyDoor', rect: [120, 430, 170, 270], label: 'Dr. Birch\'s study',
        onClick: g => g.openZoom('study'),
      },
      {
        id: 'bursaryDoor', rect: [960, 430, 170, 270], label: 'The bursary',
        onClick: g => g.openZoom('bursary'),
      },
      {
        id: 'panelMarks', rect: [320, 620, 190, 80], label: 'The marks on the panelling',
        onClick: g => {
          g.setFlag('seen_turnBack');
          g.narrate('Low on the panelling by the landing: the barred arrow again — and two more signs I can\'t fathom, a triangle with a little flag and an eye-shape. Drawn where a lookout would stand, if a lookout stood things. Page material, all of it — but the last two won\'t give up their meanings to guesswork.');
        },
      },
      {
        id: 'curtain', rect: [1440, 430, 130, 270], label: 'The dusty curtain',
        visible: g => !g.flag('hatchFound'),
        onClick: g => g.narrate('A curtain across an alcove, allegedly dusty. It is the only "dusty" thing in this hall with a polished floor in front of it. I suspect the school of having more staircases than its plan admits — but barging in teaches nothing. Better to be LED there properly.'),
      },
      {
        id: 'backStair', rect: [1440, 430, 130, 270], label: 'The back stair',
        visible: g => g.flag('hatchFound'),
        onClick: g => g.goTo('attics'),
      },
      {
        id: 'assembly', rect: [560, 120, 480, 260], label: 'Call the school together',
        visible: g => g.hasClue('pipWatch') && g.hasClue('forgeryTell') && g.hasClue('pawnFound')
          && g.hasClue('replicaWell') && g.hasClue('lampAlibi') && g.hasClue('quillNumbers')
          && g.hasItem('watchLog') && !g.flag('ended'),
        onClick: g => {
          g.say([
            { who: 'Quinn', text: 'Dr. Birch — call them all together. Governors, staff, every pupil down to the smallest. A lie has survived a detective for three days; let\'s see it survive an assembly. I have a document to read, and I intend to read it slowly.' },
            { text: 'The hall fills: gowns and gabardine, the governors in the front row, Mr. Quill by the honours boards with his ledger held like a shield. Ivy opens the black card of the watch-log to its night page, initialled P.F.' },
          ], g2 => g2.openPuzzle('finalReading'));
        },
      },
    ],
    zooms: {
      case: {
        title: 'The Trophy Case',
        art: Art.ch6.caseZoom,
        hotspots: [
          {
            id: 'emptyCase', rect: [200, 380, 800, 200], label: 'The empty case',
            onClick: g => {
              if (g.hasClue('caseKeys')) { g.narrate('One clean ring in old dust — stand and all, lifted out with time and a key. Burglars snatch. Keepers TIDY.'); return; }
              g.say([
                { text: 'The lock unscratched, the glass whole, and inside, one clean ring in the dust where cup and stand were lifted out together — unhurried, both hands, nothing knocked.' },
                { who: 'Quinn', text: 'A key did this, and there are three: Dr. Birch\'s, at dinner with eleven governors. Mrs. Motts\', in the lodge. And the bursar\'s — behind a door with a lamp burning till two. When every key is innocent, one alibi is lying.' },
              ], g2 => g2.addClue('caseKeys'));
            },
          },
          {
            id: 'pinnedNote', rect: [340, 230, 170, 130], label: 'The note pinned inside',
            visible: g => !g.flag('noteExamined'),
            onClick: g => {
              g.setFlag('noteExamined');
              g.addItem('forgedNote');
              g.addClue('plantedNote');
              g.say([
                { text: 'Pinned inside the case, where no one could miss it: a scrap of paper covered in the pupils\' chalk code. This is what convicted Pip in the governors\' minds — who else writes in the children\'s alphabet?' },
                { who: 'Quinn', text: 'Who else indeed. A thief who leaves a signed confession in someone ELSE\'s handwriting isn\'t confessing. He\'s pointing. I\'ll keep this — and one day soon I\'ll be able to read what it actually says, and more usefully, how it says it.' },
              ]);
            },
          },
        ],
      },
      study: {
        title: 'The Head\'s Study',
        art: Art.ch6.studyZoom,
        hotspots: [
          {
            id: 'birch', rect: [830, 360, 180, 290], label: 'Dr. Adeline Birch',
            onClick: g => {
              if (!g.hasClue('theCase')) {
                g.say([
                  { who: 'Dr. Birch', text: 'Miss Quinn. Three days before Founders\' Day, the Aldergate Cup leaves a locked case without so much as a scratch, and the governors have settled on a twelve-year-old because she was out of bed and won\'t say why.' },
                  { who: 'Quinn', text: 'And you don\'t believe it.' },
                  { who: 'Dr. Birch', text: 'I have been Headmistress eleven years. Pip Fairweather could no more fence silver than fly, and I will not expel a child on the strength of a triangle chalked on a scrap of paper. But belief is not evidence, and the governors want a culprit before the old captains arrive. Find me the truth, and find it quietly.' },
                ], g2 => g2.addClue('theCase'));
              } else if (g.hasClue('pipWatch') && !g.flag('ended')) {
                g.say([{ who: 'Dr. Birch', text: 'On watch for a midnight feast. Of course. Half my staff would resign if they knew, and the better half would ask what was served. Bring me the rest, Miss Quinn — bring me something I can read ALOUD.' }]);
              } else {
                g.say([{ who: 'Dr. Birch', text: 'The governors ask daily. I tell them enquiries proceed. Kindly make it true.' }]);
              }
            },
          },
          {
            id: 'schoolPlan', rect: [700, 120, 380, 240], label: 'The school plan',
            onClick: g => g.narrate('The official plan: hall, quad, cellars, dormitories. No back stair. No attic worth the name. Buildings, like people, keep a public account and a private one — and I\'ve seen a second version of this map, chalked on slate, that\'s rather more honest.'),
          },
          {
            id: 'portrait', rect: [120, 120, 200, 280], label: 'The Founder\'s portrait',
            onClick: g => g.narrate('The Founder, disapproving of everything since 1792. His Cup, his school, his motto under the frame: TRUTH, PLAINLY SPOKEN. I intend to take him at his word, at volume, in front of everyone.'),
          },
        ],
      },
      bursary: {
        title: 'The Bursary',
        art: Art.ch6.bursaryZoom,
        hotspots: [
          {
            id: 'ledger', rect: [180, 360, 260, 160], label: 'The accounts ledger',
            onClick: g => {
              if (g.hasClue('quillNumbers')) { g.narrate('Figures that flinch, and railway paper gone to the wall. The Empress taught me what a drowning man\'s bookkeeping looks like; Mr. Quill\'s is treading water with its chin up.'); return; }
              g.sfx('page');
              g.addClue('quillNumbers');
              g.say([
                { text: 'The bursar is at luncheon, one till two, punctual as grief — and his ledger is out. The school\'s accounts flinch: sums re-entered, a column that never quite crosses, and folded among the leaves, dividend notices from a railway company that went to the wall last spring.' },
                { who: 'Quinn', text: 'Mr. Quill has been losing money he did not have. Poverty isn\'t guilt — but a man drowning quietly will clutch at whatever silver floats past.' },
              ]);
            },
          },
          {
            id: 'drawer', rect: [680, 470, 260, 180], label: 'The confiscation drawer',
            onClick: g => {
              if (g.flag('knifeTaken')) { g.narrate('Catapults, mice, marbles, a mummified sandwich — a museum of everything joyful. Every exhibit labelled with its owner and offence, in the bursar\'s tidy hand.'); return; }
              g.setFlag('knifeTaken');
              g.addItem('penknife');
              g.narrate('The confiscation drawer: catapults, marbles, tops, one mummified sandwich — and a pupil\'s penknife, blade broken in soft. Confiscated goods. I hereby confiscate them further, for the public good.');
            },
          },
          {
            id: 'cage', rect: [960, 110, 180, 170], label: 'Bonaparte\'s cage',
            onClick: g => {
              if (g.flag('mouseFreed')) { g.narrate('An empty cage, high on the shelf. The empire is restored.'); return; }
              g.narrate('High on the shelf, a white mouse of imperial bearing, caged — the label reads "MARLOW, vermin, indefinite." The latch is wired shut, and I know at least one Chief Scribe who\'d trade a great deal for this prisoner. The wire wants a blade.');
            },
            use: {
              penknife: g => {
                if (g.flag('mouseFreed')) { g.narrate('The cage stands open and empty.'); return; }
                g.setFlag('mouseFreed');
                g.sfx('squeak');
                g.addItem('mouse');
                g.retireItem('penknife');
                g.narrate('The wire gives to the blade, the door swings, and Bonaparte marches up my sleeve and establishes a court in my coat pocket. One emperor, liberated. One Chief Scribe, about to owe me.');
              },
            },
          },
          {
            id: 'basket', rect: [480, 680, 130, 110], label: 'The wastepaper basket',
            onClick: g => g.narrate('Torn envelopes, spoiled sums — and a corner of good cream notepaper, burnt, with three chalk-code strokes still visible in pencil rehearsal. Somebody in this office has been PRACTISING their schoolboy hand. Practice paper burns; habits don\'t.'),
          },
        ],
      },
    },
  },

  // ---------- the attics ----------

  attics: {
    name: 'The Attics',
    art: Art.ch6.attics,
    onEnter: g => {
      if (!g.flag('atticsSeen')) {
        g.setFlag('atticsSeen');
        g.say([{ who: 'Quinn', text: 'Rafters, dust, one dormer of gold light — and everywhere the signs of settled civilisation: a slate map, a strongbox, a museum shelf. Not a den. A CAPITAL.' }]);
      }
    },
    hotspots: [
      {
        id: 'hatch', rect: [120, 740, 220, 160], label: 'The hatch down',
        onClick: g => g.goTo('hall'),
      },
      {
        id: 'hatchMarks', rect: [150, 680, 190, 60], label: 'The marks on the hatch',
        onClick: g => {
          g.setFlag('seen_moot');
          g.setFlag('seen_midnight');
          g.setFlag('seen_boltHole');
          g.narrate('Over the hatch, three signs like a house-plate: the crescent, the crossed-and-stroked marks, the box with the arrow diving in. A moon for meeting, a scratched XII for the hour, a hole to bolt to — the club\'s whole address, if I read the shapes by their sense.');
        },
      },
      {
        id: 'inky', rect: [930, 480, 140, 250], label: 'Inky Marlow',
        onClick: g => {
          if (g.flag('inkyTrust')) {
            if (!g.flag('boxOpen')) {
              g.say([{ who: 'Inky', text: 'The box? The box keeps the club\'s papers, and the box asks three questions of anyone who touches it: WHEN do we meet, WHERE do we bolt, and IS IT SAFE. Answer in signs. Wrongly, and it stays a box.' }]);
            } else {
              g.say([{ who: 'Inky', text: 'Read it out loud, at assembly, in front of the beaks? ...Pip stood sentry for us. Read it, missus. Read it like a bell.' }]);
            }
            return;
          }
          if (!g.flag('inkyMet')) {
            g.setFlag('inkyMet');
            g.say([
              { who: 'Inky', text: 'Halt. This floor is club territory, and the club doesn\'t know you. You found the stair, which counts for something — but reading a trail isn\'t being TRUSTED, is it.' },
              { who: 'Quinn', text: 'And how does a detective come to be trusted, Chief Scribe?' },
              { who: 'Inky', text: 'You know my office. Hm. Two ways, then, and you\'ll do both: Tab speaks for the yard — beat her fair. And Bonaparte speaks for me — the bursar\'s had him in a cage a fortnight for the crime of being a mouse. Bring him home.' },
            ]);
          } else {
            const need = [];
            if (!g.flag('tabBeaten')) need.push('Tab still speaks for the yard');
            if (!g.flag('mouseGiven')) need.push('Bonaparte is still in exile');
            g.say([{ who: 'Inky', text: need.join(', and ') + '. The terms don\'t change, missus. The club has RULES.' }]);
          }
        },
        use: {
          mouse: g => {
            g.setFlag('mouseGiven');
            g.removeItem('mouse');
            if (!g.flag('tabBeaten')) {
              g.say([{ who: 'Inky', text: 'BONAPARTE! Sir! You\'re thinner. — This counts, missus, this counts for a great deal. But Tab still speaks for the yard. Rules are rules even when I\'d rather they weren\'t.' }]);
              return;
            }
            g.setFlag('inkyTrust');
            g.sfx('success');
            g.setFlag('seen_beak');
            g.setFlag('seen_sentry');
            g.setFlag('seen_moot');
            g.say([
              { who: 'Inky', text: 'BONAPARTE! Sir! You\'re thinner. — Right. Tab\'s beaten, the emperor\'s home, and the club pays its debts. Slate. Sit.' },
              { text: 'Inky chalks three signs, quick as handwriting: a triangle with a little flag — "that\'s a BEAK, the flag\'s the mortarboard tassel." An eye — "SENTRY. Whoever wears it, watches." A crescent — "MOOT. Meeting. And that\'s all you get free, missus; the rest you earn like everyone, by looking."' },
              { who: 'Quinn', text: 'A beak, a watcher, a meeting. Chief Scribe, you may have just handed me half of somebody\'s midnight.' },
            ]);
          },
        },
      },
      {
        id: 'slateMap', rect: [470, 430, 280, 230], label: 'The club\'s slate map',
        onClick: g => {
          g.setFlag('seen_carrying');
          g.narrate('The school, chalked from a pupil\'s eye: every real room, plus the stairs the plan forgets. One route is marked with the strapped-box sign — the haul road, plainly, the way heavy tuck travels — and it runs from the buttery, across the quad, TOWARD THE GATES. The very road a burden took at midnight.');
        },
      },
      {
        id: 'strongbox', rect: [1180, 560, 220, 170], label: 'The society\'s strongbox',
        onClick: g => {
          if (g.flag('boxOpen')) { g.narrate('Open, and holding the club\'s constitution, three IOUs in toffee, and — gone to my keeping — the watch-log.'); return; }
          if (!g.flag('inkyTrust')) { g.narrate('An iron-strapped box with three brass tumblers cut in the club\'s own signs. Territory, trust, then treasure — in that order, I suspect.'); return; }
          if (!g.flag('marks2Done')) { g.narrate('Three brass tumblers cut with the club\'s signs. Inky\'s three questions want three answers — and I don\'t yet read well enough to be sure of mine. The mark-book first.'); return; }
          g.openPuzzle('glyphLock');
        },
      },
      {
        id: 'museumShelf', rect: [820, 770, 300, 80], label: 'The club museum shelf',
        onClick: g => {
          if (g.flag('twineTaken')) { g.narrate('The museum of the confiscatable, minus one exhibit, on loan to the crown.'); return; }
          g.setFlag('twineTaken');
          g.addItem('twine');
          g.narrate('The club\'s museum: a brass doorknob of mysterious provenance, a blue bottle, and a ball of good waxed twine. I requisition the twine. The club may bill Scotland Yard.');
        },
      },
    ],
  },

  // ---------- the cellars ----------

  cellars: {
    name: 'The Cellars',
    art: Art.ch6.cellars,
    onEnter: g => {
      if (!g.flag('cellarsSeen')) {
        g.setFlag('cellarsSeen');
        g.say([{ who: 'Quinn', text: 'Stone vaults, barrel-breath, and a candle someone left burning low. Cellars are the memory of a building — and this one smells recently of cake.' }]);
      }
    },
    hotspots: [
      {
        id: 'stepsUp', rect: [60, 280, 180, 440], label: 'Up to the quad',
        onClick: g => g.goTo('quad'),
      },
      {
        id: 'buttery', rect: [330, 400, 300, 230], label: 'The buttery shelves',
        onClick: g => {
          if (g.flag('vinegarTaken')) { g.narrate('Barrels, jars, and the bowl-sign chalked shamelessly on the shelf-edge. The club\'s commissariat, hidden in plain sight.'); return; }
          g.setFlag('vinegarTaken');
          g.addItem('vinegar');
          g.narrate('The buttery shelves, and the little bowl-sign chalked right on the wood — "grub here", if context is any teacher. Among the jars: Cook\'s malt vinegar. Its lawful business is pickles. Its higher calling, as any pupil will testify, is conkers.');
        },
      },
      {
        id: 'feastCorner', rect: [760, 440, 280, 180], label: 'The feast corner',
        onClick: g => {
          if (g.hasClue('feastCrumbs')) { g.narrate('Crumbs, stubs, thirteen apple cores. Somewhere, a cook is missing a sponge cake and saying nothing.'); return; }
          g.addClue('feastCrumbs');
          g.say([
            { text: 'Behind the third pier: crumbs, candle stubs, thirteen apple cores in a tidy pyramid, and the club\'s signs on the wall — the bolt-hole, the circle. A feast was held here, and lately.' },
            { who: 'Quinn', text: 'The very night the Cup "vanished", a dozen children were awake, hidden, and POSTED about this school. The theft had witnesses — witnesses who can\'t confess to being witnesses. No wonder Pip\'s chin is out.' },
          ]);
        },
      },
      {
        id: 'oldDesks', rect: [1200, 440, 240, 260], label: 'The retired desks',
        onClick: g => {
          if (g.hasClue('forgeryTell')) { g.narrate('The old beak-sign, crossed at the crown, over the initials A.Q., 1858. Desks never forget a bored boy.'); return; }
          g.narrate('Retired desks, stacked like tombstones, every lid carved by generations of the bored. The club\'s signs are here too — older, stiffer. One triangle is crossed at the crown instead of flagged. Handwriting drifts, even in chalk; if I could read PROPERLY, I could date a hand by it.');
        },
        use: {
          forgedNote: g => {
            if (!g.flag('marks2Done')) { g.narrate('One triangle looks much like another until I can truly read. The mark-book first — both pages.'); return; }
            if (g.hasClue('forgeryTell')) { g.narrate('Compared and condemned: the note is written in a thirty-year-old hand.'); return; }
            g.sfx('chalk');
            g.addClue('forgeryTell');
            g.retireItem('forgedNote');
            g.say([
              { text: 'Note against desk lid. The planted note draws its beak CROSSED AT THE CROWN — the old form, carved here by boys of thirty years ago. Every child now living draws it with a tassel. Inky\'s generation wouldn\'t recognise the old form; the old form is all this forger knows.' },
              { who: 'Quinn', text: 'And the deepest carving of the old beak sits on a lid initialled A.Q., 1858. Aldergate keeps its bursars in the family, I see — Mr. Quill was a PUPIL here. The note isn\'t the children\'s handwriting. It\'s his childhood\'s.' },
            ]);
          },
        },
      },
      {
        id: 'furnace', rect: [1080, 240, 170, 170], label: 'The dead furnace',
        onClick: g => {
          if (g.flag('pokerTaken')) { g.narrate('The furnace sleeps its summer sleep, unarmed.'); return; }
          g.setFlag('pokerTaken');
          g.addItem('poker');
          g.narrate('The furnace is dead till October, but its poker is very much alive — long, iron, and hooked at the business end. Half of a fishing rod, wanting only a line.');
        },
      },
    ],
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  /* The mark-book: Sennaar-style validation. Each page pairs six glyphs
     with six meanings; every glyph must have been SEEN in context, and
     the page confirms all-or-nothing — a wrong page only "rings false",
     never says which pairing failed. */
  markBook: {
    title: 'The Mark-Book',
    wide: true,
    render(g) {
      const page2 = g.flag('marks1Done');
      const rows = page2 ? ROWS2 : ROWS1;
      const pool = page2 ? POOL2 : POOL1;
      const pref = page2 ? 'g2_' : 'g1_';
      const allSeen = rows.every(r => g.flag('seen_' + r.g));
      const rowHtml = rows.map(r => {
        const seen = g.flag('seen_' + r.g);
        const guess = g.getFlag(pref + r.g);
        const label = seen ? (guess == null ? '?' : pool[guess]) : 'not yet seen';
        const glyphSvg = `<svg viewBox="0 0 56 48" xmlns="http://www.w3.org/2000/svg">${
          Art.ch6.glyph(seen ? r.g : 'unknown', 28, 24, 13, null, '#e8dfc8')}</svg>`;
        const btn = seen
          ? `<button class="btn" data-act="cyc-${r.g}">${label}</button>`
          : `<span class="mark-unseen">${label}</span>`;
        return `<div class="mark-row">${glyphSvg}${btn}</div>`;
      }).join('');
      return `<p class="puzzle-msg">${g.getFlag('bookMsg')
        || (page2 ? 'Page two: the club\'s own signs. Pair each with its meaning, then confirm the page.'
          : 'Page one: the trail signs. Pair each with its meaning, then confirm the page.')}</p>
        <div class="mark-rows">${rowHtml}</div>
        <div class="puzzle-controls">
          ${allSeen ? '<button class="btn" data-act="confirm">The page reads true</button>' : ''}
          <button class="btn" data-act="leave">Close the book</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const page2 = g.flag('marks1Done');
      const rows = page2 ? ROWS2 : ROWS1;
      const pool = page2 ? POOL2 : POOL1;
      const pref = page2 ? 'g2_' : 'g1_';
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'confirm') {
          const right = rows.every(r => g.getFlag(pref + r.g) === r.a);
          if (right) {
            g.sfx('success');
            g.setFlag('bookMsg', '');
            if (page2) {
              g.setFlag('marks2Done');
              g.addClue('bookTwo');
              g.closePuzzle();
              g.say([
                { text: 'Six more signs settle into their meanings and stay there: beak, sentry, meeting, bolt-hole, midnight, carrying. The page reads true, top to bottom.' },
                { who: 'Quinn', text: 'The alphabet is mine. Every chalked wall in this school just became a witness statement — and there is one document in particular I intend to hear testify.' },
              ]);
            } else {
              g.setFlag('marks1Done');
              g.addClue('bookOne');
              g.closePuzzle();
              g.say([
                { text: 'Arrow by the fork, bowl by the biscuits, zigzag under the dreaded window — each sign against its context, and the page suddenly reads as easily as print: this way, turn back, all clear, danger, grub here, the gates.' },
                { who: 'Quinn', text: 'The trail signs are the road-signs of a hidden school. And roads, unlike people, never lie about where they go. Time to follow one.' },
              ]);
            }
            return;
          }
          g.sfx('error');
          g.setFlag('bookFails', (g.getFlag('bookFails') || 0) + 1);
          g.setFlag('bookMsg', (g.getFlag('bookFails') || 0) >= 3
            ? 'Still false somewhere. Trust the CONTEXTS, not the shapes: what stood beside each mark when I found it? The bowl was by food, the zigzag under the worst window in the school...'
            : 'Read through once more and something rings false — one pairing or more. The wall knew what it meant; I evidently don\'t, quite.');
          rerender();
          return;
        }
        // cycle a guess
        const name = act.slice(4);
        const cur = g.getFlag(pref + name);
        g.setFlag(pref + name, cur == null ? 0 : (cur + 1) % pool.length);
        g.setFlag('bookMsg', '');
        rerender();
      }));
    },
  },

  /* Follow the trail: five forks, each chalked. The sign decides the
     path — an arrow beckons, a barred arrow warns off, a zigzag means
     the marked side is watched. A wrong turn loses the trail. */
  trailRoute: {
    title: 'Following the Trail',
    wide: true,
    render(g) {
      const step = g.getFlag('trailStep') || 0;
      const FORKS = [
        { sign: 'thisWay', side: 'left', text: 'The path forks at the laurels. The ARROW is chalked on the left-hand stake.' },
        { sign: 'turnBack', side: 'left', text: 'Fork by the kitchen yard. The BARRED arrow sits on the left-hand gatepost.' },
        { sign: 'danger', side: 'right', text: 'The boot-room passage splits. The ZIGZAG is scratched beside the right-hand door.' },
        { sign: 'thisWay', side: 'right', text: 'Twin corridors past the pantry. The ARROW is chalked low on the right.' },
        { sign: 'turnBack', side: 'right', text: 'Last fork, at the panelling. The BARRED arrow is on the right-hand side.' },
      ];
      const f = FORKS[Math.min(step, 4)];
      const glyphSvg = `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="80" height="60" rx="8" fill="#241a10"/>
        ${Art.ch6.glyph(f.sign, 40, 30, 16, null, '#f6efdf')}
      </svg>`;
      return `<div class="trail-board">${glyphSvg}</div>
        <p class="puzzle-msg">${g.getFlag('trailMsg') || ('Fork ' + (step + 1) + ' of 5. ' + f.text)}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="go-left">Take the left</button>
          <button class="btn" data-act="go-right">Take the right</button>
          <button class="btn" data-act="leave">Turn back for now</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWERS = ['left', 'right', 'left', 'right', 'left'];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const step = g.getFlag('trailStep') || 0;
        const pick = act === 'go-left' ? 'left' : 'right';
        if (pick !== ANSWERS[step]) {
          g.sfx('error');
          g.setFlag('trailStep', 0);
          g.setFlag('trailMsg', 'Ten steps on, the chalk runs out and the path dies in nettles — the marked school doesn\'t go this way. Lost the trail; back to the shrubbery and read again. An arrow BECKONS; a barred arrow or a zigzag warns off the side it sits on.');
          rerender();
          return;
        }
        if (step >= 4) {
          g.setFlag('hatchFound');
          g.setFlag('trailStep', 0);
          g.sfx('success');
          g.addClue('trailFound');
          g.closePuzzle();
          g.say([
            { text: 'Laurels, kitchen yard, boot-room, pantry, panelling — the marks run true as rails, and end at the Great Hall\'s "dusty" curtain. Behind it: a back stair, and the bolt-hole sign chalked at its foot like a welcome mat.' },
            { who: 'Quinn', text: 'A staircase the plan forgets, kept by people the school underestimates. Up, then — politely. I am about to be a guest in somebody\'s capital.' },
          ]);
          return;
        }
        g.sfx('chalk');
        g.setFlag('trailStep', step + 1);
        g.setFlag('trailMsg', '');
        rerender();
      }));
    },
  },

  /* Conkers against Tab Brill: three rounds, each with a readable tell.
     Low dangle wants a strike over the top; hoisted high wants one from
     beneath; a short doubled lace wants a steady straight knock. */
  conkers: {
    title: 'Conkers, for a True Answer',
    render(g) {
      const round = g.getFlag('conkRound') || 0;
      const TELLS = [
        'Tab dangles her sixty-sixer LOW, lazy as bait, daring a big swing.',
        'Now she hoists it HIGH over her knuckles, grinning down at you.',
        'For the kill she wraps the lace TWICE — short string, tight guard, no swing room.',
      ];
      return `<p class="puzzle-msg">${g.getFlag('conkMsg') || ('Round ' + (round + 1) + ' of 3. ' + TELLS[Math.min(round, 2)])}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="over">Strike over the top</button>
          <button class="btn" data-act="under">Strike from beneath</button>
          <button class="btn" data-act="steady">A steady straight knock</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="leave">Concede the yard</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWERS = ['over', 'under', 'steady'];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const round = g.getFlag('conkRound') || 0;
        if (act !== ANSWERS[round]) {
          g.sfx('error');
          g.setFlag('conkMsg', 'Laces tangle; the yard groans; Tab untwists with the patience of royalty. "Again. Read the HOLD, missus — the hold tells you the strike."');
          rerender();
          return;
        }
        g.sfx('crack');
        if (round >= 2) {
          g.setFlag('tabBeaten');
          g.setFlag('conkRound', 0);
          g.retireItem('seasonedConker');
          g.closePuzzle();
          g.say([
            { text: 'CRACK. The sixty-sixer gives up its ghost in two flying halves, and the whole yard goes silent the way only a yard can.' },
            { who: 'Tab', text: '...Well. Sixty-six and one, and beaten by a GROWN-UP with a vinegar recruit. Ask your question, detective — the yard keeps its law.' },
            { who: 'Quinn', text: 'Then here it is: who speaks for the chalk? "Chief Scribe," you\'ll say. Where do I find the office?' },
            { who: 'Tab', text: 'You don\'t. You find the STAIR, if you can read your way to it — and if you can\'t, you were never worth the telling. That\'s two answers. The yard is generous in defeat.' },
          ]);
          return;
        }
        g.setFlag('conkRound', round + 1);
        g.setFlag('conkMsg', '');
        rerender();
      }));
    },
  },

  /* The strongbox: three brass tumblers cut in the club's signs. It asks
     WHEN we meet, WHERE we bolt, and IS IT SAFE. */
  glyphLock: {
    title: 'The Strongbox\'s Three Questions',
    wide: true,
    render(g) {
      const OPTS = ['moot', 'midnight', 'sentry', 'boltHole', 'allClear', 'danger'];
      const QUESTIONS = ['WHEN do we meet?', 'WHERE do we bolt?', 'IS IT SAFE?'];
      const dials = [0, 1, 2].map(i => {
        const v = g.getFlag('boxDial' + i) || 0;
        const glyphSvg = `<svg viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="60" height="48" rx="8" fill="#241a10" stroke="#8a6a30" stroke-width="2"/>
          ${Art.ch6.glyph(OPTS[v], 32, 26, 13, null, '#e8dfc8')}
        </svg>`;
        return `<div class="mark-row">${glyphSvg}
          <button class="btn" data-act="dial-${i}">${QUESTIONS[i]}</button>
        </div>`;
      }).join('');
      return `<p class="puzzle-msg">${g.getFlag('boxMsg') || 'Three brass tumblers, each cut with the club\'s signs. Turn each until it answers its question truly.'}</p>
        <div class="mark-rows">${dials}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="open">Try the lid</button>
          <button class="btn" data-act="leave">Leave it be</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = [1, 3, 4]; // midnight, boltHole, allClear
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act.slice(0, 5) === 'dial-') {
          const i = Number(act.slice(5));
          g.setFlag('boxDial' + i, ((g.getFlag('boxDial' + i) || 0) + 1) % 6);
          g.setFlag('boxMsg', '');
          rerender();
          return;
        }
        // open
        if ([0, 1, 2].every(i => (g.getFlag('boxDial' + i) || 0) === ANSWER[i])) {
          g.setFlag('boxOpen');
          g.sfx('unlock');
          g.addItem('watchLog');
          g.addClue('watchLogFound');
          g.closePuzzle();
          g.say([
            { text: 'Midnight; the bolt-hole; all clear. The lid gives with a click of old brass. Inside: the club\'s constitution (three articles, two about cake), some toffee IOUs — and a black card chalked in neat columns. The watch-log.' },
            { who: 'Quinn', text: 'A sentry rota, kept every night in a language no adult reads — and the night of the theft is one line of seven signs, initialled P.F. Miss Fairweather, I believe I\'ve just found your alibi. And unless I misread the middle of it, a good deal more besides.' },
          ]);
        } else {
          g.sfx('error');
          g.setFlag('boxMsg', 'The lid doesn\'t budge. Wrong answer somewhere — when we meet, where we bolt, whether it\'s safe. The hatch over the stairs wears the club\'s whole address; the box only asks it back.');
          rerender();
        }
      }));
    },
  },

  /* The finale: the watch-log's night line, read aloud at assembly,
     glyph by glyph. A fumbled word restarts the line — the school is
     listening, and the reading must be perfect. */
  finalReading: {
    title: 'The Reading at Assembly',
    wide: true,
    render(g) {
      const STEPS = [
        { g: 'sentry', opts: ['a meeting', 'sentry post', 'all clear'] },
        { g: 'beak', opts: ['a beak — one of the staff', 'a pupil', 'the porter'] },
        { g: 'carrying', opts: ['running', 'carrying a load', 'empty-handed'] },
        { g: 'thisWay', opts: ['turn back', 'this way — moving on', 'danger'] },
        { g: 'gates', opts: ['toward the gates', 'toward the cellars', 'toward the attics'] },
        { g: 'midnight', opts: ['at noon', 'at ten o\'clock', 'at midnight'] },
        { g: 'danger', opts: ['all clear', 'danger — all hide', 'grub here'] },
      ];
      const step = g.getFlag('readStep') || 0;
      const line = STEPS.map((s, i) => `<g opacity="${i < step ? '1' : i === step ? '0.9' : '0.25'}">
        ${Art.ch6.glyph(s.g, 34 + i * 52, 30, 14, null, i < step ? '#efd58a' : '#e8dfc8')}
      </g>`).join('');
      const cur = STEPS[Math.min(step, 6)];
      const opts = cur.opts.map((o, i) => `<button class="btn" data-act="say-${i}">&#8220;${o}&#8221;</button>`).join('');
      return `<div class="trail-board"><svg viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="400" height="60" rx="8" fill="#2e2a28"/>
        ${line}
      </svg></div>
        <p class="puzzle-msg">${g.getFlag('readMsg') || ('The hall holds its breath. Sign ' + (step + 1) + ' of 7 — read it aloud.')}</p>
        <div class="puzzle-controls">${opts}</div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = [1, 0, 1, 1, 0, 2, 1];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        const step = g.getFlag('readStep') || 0;
        if (Number(act.slice(4)) !== ANSWER[step]) {
          g.sfx('error');
          g.setFlag('readStep', 0);
          g.setFlag('readMsg', 'A murmur runs the benches — that reading rang false, and Inky\'s wince says so. From the top, and read it TRUE: the whole case stands on this line.');
          rerender();
          return;
        }
        if (step < 6) {
          g.sfx('chalk');
          g.setFlag('readStep', step + 1);
          g.setFlag('readMsg', '');
          rerender();
          return;
        }
        // the line is read
        g.setFlag('ended');
        g.setFlag('readStep', 0);
        g.sfx('success');
        g.retireItem('watchLog');
        g.closePuzzle();
        g.say([
          { who: 'Quinn', text: 'Sentry post. A beak. Carrying a load. This way — toward the gates. At midnight. Danger; all hide. One line, written at her post by the child you were going to expel for it.' },
          { who: 'Quill', text: 'Children\'s SCRIBBLE! You would stand there and take a chalk doodle\'s word against a man\'s thirty years of service—' },
          { who: 'Quinn', text: 'The doodle doesn\'t stand alone, Mr. Quill. A lamp burning till two in a room nobody can see into. The school\'s electrotype copy fished out of the well — a thief steals silver; only its KEEPER steals a copy. Ticket number eighty-eight at Marley and Flint, one cup, pledged in July. And a planted note whose beak-sign is crossed at the crown — a form no pupil has drawn in thirty years, carved deepest on a desk lid initialled A.Q., 1858.' },
          { who: 'Quill', text: '...The shares were meant to come GOOD. It was one term. Two. I was going to buy it back — every single term I was going to buy it back, and every term the hole was deeper, and then the old captains were coming and they would PICK IT UP. You don\'t understand what it is to sit with books that don\'t balance.' },
          { who: 'Quinn', text: 'So you sold the Cup, staged its theft, and dressed a twelve-year-old in it — a child who held her tongue through the worst week of her life to protect a cake in a cellar. Your books didn\'t balance, Mr. Quill. Hers did.' },
          { who: 'Dr. Birch', text: 'Mr. Quill will make his arithmetic plain to the governors, and then to the magistrates. Miss Fairweather — you are restored, and you bowl on Saturday. As for this... log, and the club it belongs to: I find I cannot read a word of it. What club?' },
        ], g2 => {
          g2.addClue('resolution');
          g2.endChapter();
        });
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch6 = {
  id: 'ch6',
  order: 6,
  title: "The Headmistress's Cup",
  subtitle: 'Chapter Six — The Secret Alphabet',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'quad',

  intro: [
    { text: 'Aldergate School, in the last gold week of autumn: honey stone, falling leaves, rooks over the quad — and three days before Founders\' Day, an empty trophy case where the Aldergate Cup has stood since 1792.' },
    { who: 'Dr. Birch', text: 'The case was locked, Miss Quinn. The hall was locked. And the governors have decided the thief is Philippa Fairweather, aged twelve — the first girl ever to bowl for our First Eleven — because she was caught out of bed at midnight and will not say why.' },
    { who: 'Dr. Birch', text: 'I do not believe it. I cannot disprove it. And I will not expel a child on the strength of a triangle chalked on a scrap of paper. Find me the truth before Saturday — and find it quietly. Schools die of scandal faster than they die of theft.' },
    { who: 'Quinn', text: 'A locked case, a silent child, and a note in a code nobody grown can read. Dr. Birch, your school has been talking all along. Somebody simply has to learn the language.' },
  ],

  /* Ordered two-tier hints. These nudge the THINKING, never the action:
     no rung names a pairing, a dial sign, or the culprit. */
  hints: [
    {
      when: g => !g.hasClue('theCase') || !g.hasClue('pipSilent') || !g.hasClue('caseKeys'),
      nudge: 'Begin where every case begins: the scene, the accused, and whoever\'s paying. A locked case has a short list of keys, and a silent child has a reason.',
      more: 'Dr. Birch is in her study off the Great Hall; Pip is benched by the pavilion; the case itself will tell you whether it was forced or OPENED.',
    },
    {
      when: g => !g.hasClue('clubSigns'),
      nudge: 'The school is covered in somebody\'s handwriting — low on walls, at exactly the height of a twelve-year-old\'s hand.',
      more: 'Start with the shrubbery in the quad. Signs sit NEXT to things; the things are the dictionary.',
    },
    {
      when: g => !g.flag('marks1Done'),
      nudge: 'Seeing signs isn\'t reading them. A detective who won\'t show her workings is only guessing — the mark-book on the bench wants its first page filled.',
      more: 'Pair each sign with its context: what stood beside the arrow, the bowl, the zigzag, the circle, the two posts? Six signs seen, six meanings — then confirm the page.',
    },
    {
      when: g => !g.flag('hatchFound'),
      nudge: 'Marks are meant to be FOLLOWED. Now that the trail signs read true, read your way down the trail.',
      more: 'Back to the shrubbery, and take the forks as the chalk commands: an arrow beckons; a barred arrow or a zigzag warns off the side it sits on.',
    },
    {
      when: g => !g.flag('inkyTrust'),
      nudge: 'The club has a yard and a scribe, and both have a price. The yard\'s is paid in conkers; the scribe\'s is small, white, and unjustly imprisoned.',
      more: 'The elm drops conkers and the buttery keeps vinegar — Tab told you the recipe herself. As for the scribe\'s price: ask what the bursar keeps caged, and what might open a cage.',
    },
    {
      when: g => !g.flag('marks2Done'),
      nudge: 'Page two of the mark-book wants the club\'s own signs — some taught, some worn on the club\'s own doorposts.',
      more: 'Inky\'s slate lesson, the marks over the hatch, and the slate map\'s haul-road sign. Six more seen, six more meanings, and the alphabet is yours.',
    },
    {
      when: g => !g.flag('boxOpen'),
      nudge: 'The club keeps its papers in a box that asks three questions of anyone who touches it.',
      more: 'When do they meet, where do they bolt, is it safe? The hatch over the stairs wears the club\'s whole address. Answer the box in its own signs.',
    },
    {
      when: g => !g.hasClue('pipWatch') || !g.hasClue('forgeryTell') || !g.hasClue('pawnFound') || !g.hasClue('quillNumbers') || !g.hasClue('lampAlibi'),
      nudge: 'You can read now — so make the school testify. The log names an hour and a road; the road ends somewhere wet; the old desks remember every hand that ever learned this code; and offices tell the truth at luncheon.',
      more: 'Follow the log\'s burden toward the gates and think about what lies along that path with a long way down. Set the planted note against the retired desks. And the porter, the ledger and Pip herself each hold a piece — ask, read, compare.',
    },
    {
      when: () => true,
      nudge: 'You know the thief, the hour, the road and the price of the pledge. A lie has survived a detective for three days. It will not survive an assembly.',
      more: 'Have Dr. Birch call the whole school together and read the log aloud — slowly, sign by sign, and let every bench hear it land.',
    },
  ],

  end: {
    kicker: 'Chapter Six Complete',
    title: "The Headmistress's Cup",
    body: 'The Cup came home from Marley & Flint two days before the match — redeemed, Dr. Birch let it be known, "from cleaning." ' +
      'Pip Fairweather took seven wickets on Saturday and was carried to tea on the yard\'s shoulders. The Lantern Club\'s alphabet remains officially unreadable; ' +
      'unofficially, there is a new sign chalked very small on Ivy Quinn\'s train-window when she leaves — a magnifying glass, meaning FRIEND. It is not in any mark-book. It doesn\'t need to be.',
    next: 'ch7',
  },
};

})();
