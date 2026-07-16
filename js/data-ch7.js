/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Seven — "The Guard's Watch".

   The Down Night Mail, 14th March 1897. At Crewe the registered sack
   comes out of the strongroom sealed, seals good, and stuffed with
   yesterday's newspaper. Guard Abel Hare had the only key, and his own
   journal hangs him: he sealed the strongroom at 2.30, and the last
   lineside apparatus — Cadger's Bank, the only way anything leaves a
   moving mail train — was passed at 2.26. The sack outlived its last
   chance to leave. Therefore Hare.

   The truth: Hare's watch is four minutes fast. His 2.30 IS 2.26. He
   sealed the door at the exact second the trial pouch flew into a net
   at Cadger's Bank, four feet behind him. Nobody aboard did a thing
   wrong: Tench lettered the pouches as ordered, Sherrick lost four
   minutes for permanent-way as ordered, Hare sealed the sack unopened
   as ordered, and every watch on the train was regulated at the
   Superintendent's office as ordered. Special Traffic Notice No. 41,
   signed M. Vane — a man who never boarded, and who committed a
   robbery by writing a timetable.

   Verb: time/count. The chapter's novelty is THE WIRE: an enquiry
   telegraphed from a platform is answered at the NEXT stop, so every
   question costs a leg of the journey, and the journey has five.
   Penrith is the last wire in England (the up-mail crosses there and
   brings any outstanding answers with it) — so leaving Penrith is
   gated on having asked everything the world can answer, and after it
   there is nothing left but the train, the dark, and Carlisle.

   NOTE: keep flags scalar; array-valued flags must never be mutated in
   place (setFlag persists). This chapter uses scalars throughout. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const ST = Art.ch7.stations;
const LAST = ST.length - 1;   // Penrith: the last wire in England

/* A reply is waiting if a leg has passed since the wire went — or if we
   are at Penrith, where the up-mail crosses and hands up anything still
   outstanding. Without that second clause a player who asked late would
   be carried past their own answers. */
const replyReady = (g, sentFlag) => {
  const sent = g.getFlag(sentFlag);
  if (sent == null) return false;
  const leg = g.getFlag('leg') || 0;
  return leg > sent || leg === LAST;
};

const ITEMS = {
  watch: {
    name: 'Hare\'s Watch',
    desc: 'The guard\'s watch: a fat silver turnip, wound nightly, cherished for thirty years. It has never once lost a second. That is not the same thing as never having been wrong, and I begin to think the difference is the whole case.',
    icon: Art.ch7.icons.watch,
  },
  journal: {
    name: 'The Guard\'s Journal',
    desc: 'Hare\'s night book, kept in pencil in a hand like a copperplate exercise. Sowerby at 2.10. The sack in at 2.22. Strongroom sealed at 2.30. Every entry honest, and every entry taken from the watch in his waistcoat.',
    icon: Art.ch7.icons.journal,
  },
  pad: {
    name: 'Telegraph Forms',
    desc: 'A pad of Post Office wire blanks from the guard\'s desk. Ask England a question at one platform and England answers at the next: the fastest thing in the world, provided you are willing to spend a stop on it.',
    icon: Art.ch7.icons.pad,
  },
  lantern: {
    name: 'Dark Lantern',
    desc: 'A guard\'s dark lantern off the rack — shutter, reflector, and a wick as dry as a sermon. Wants oil, and there is a can of it on the footplate if I can reach a platform.',
    icon: Art.ch7.icons.lantern,
  },
  oilCan: {
    name: 'Oil Can',
    desc: 'A long-spouted can off the engine\'s tool ledge, warm from the boiler. Nib says it oils anything from a big end to a magistrate.',
    icon: Art.ch7.icons.oilCan,
  },
  litLantern: {
    name: 'Lantern, Lit',
    desc: 'Oiled, trimmed and burning: a fist of yellow light with a shutter on it. A strongroom has no window, and the dark in one is the only dark in England that keeps its secrets standing up.',
    icon: Art.ch7.icons.litLantern,
  },
  key: {
    name: 'Strongroom Key',
    desc: 'The registered strongroom\'s key, surrendered by Inspector Rooke with the face of a man lending his umbrella to the rain. There is exactly one, and its keeper is in his own van under arrest.',
    icon: Art.ch7.icons.key,
  },
  newspaper: {
    name: 'The Ballast',
    desc: 'What was in the registered sack instead of the registered post: an evening paper of the 14th, folded to the racing page. Printed in London. Sold in London. In a sack that was sealed before it ever saw a train.',
    icon: Art.ch7.icons.newspaper,
  },
  notice41: {
    name: 'Notice No. 41',
    desc: 'Special Traffic Notice No. 41, for the night of the 14th, signed M. Vane, Superintendent. Nine clauses of clean official prose, not one of them a crime, and all nine of them together a robbery.',
    icon: Art.ch7.icons.notice,
  },
  pouch: {
    name: 'Spare Pouch',
    desc: 'An empty leather exchange pouch from the sorting van. Empty, it would flutter off the arm like a handkerchief; a net wants something with an opinion in it.',
    icon: Art.ch7.icons.pouch,
  },
  strap: {
    name: 'Lamp Strap',
    desc: 'A weighted leather strap from the tail-lamp locker, with a good brass buckle. Heavy enough to give an empty pouch the courage of its convictions.',
    icon: Art.ch7.icons.strap,
  },
  weightedPouch: {
    name: 'Weighted Pouch',
    desc: 'A spare pouch with the lamp strap buckled inside it: the weight of a night\'s registered post, near enough. Now to find out whether a net can really take one off a train at fifty-eight miles an hour, because a man\'s liberty says it can\'t.',
    icon: Art.ch7.icons.weightedPouch,
  },
};

const COMBOS = {
  'lantern+oilCan': g => {
    g.removeItem('lantern');
    g.removeItem('oilCan');
    g.addItem('litLantern');
    g.sfx('pickup');
    g.narrate('Oil to the wick, a match to the oil, the shutter down to a slot: the lantern comes up gold and throws my shadow the length of the van. Nib\'s can goes back with my compliments and a promise not to say where it went.');
  },
  'pouch+strap': g => {
    g.removeItem('pouch');
    g.removeItem('strap');
    g.addItem('weightedPouch');
    g.sfx('stow');
    g.narrate('Strap coiled into pouch, buckle to the bottom, flap down. It swings with a satisfying seriousness — about the weight of a night\'s registered letters, and about the weight of the thing a net is supposed to be unable to take.');
  },
};

const CLUES = {
  theCase: {
    title: 'The sack full of newspaper',
    text: [
      'At Crewe the registered strongroom was opened and the sack was exactly where it should be: sealed, seals good, and stuffed with yesterday\'s evening paper. Somewhere between Rugby and Crewe, on a train that stopped nowhere, the registered post of the north stepped off.',
      'One key. One keeper. A guard with thirty years in and a sack of newspaper in his care, and a train full of people who will all swear nobody came near it.',
    ],
  },
  hareSays: {
    title: 'Abel Hare, guard',
    text: [
      '"I sealed it at half past two, miss, and I never opened it, because the notice said not to. Here\'s my book. Every hour of it true." And it is true. That is precisely his difficulty.',
      'He gave me his watch when I asked for it — held it out on his palm like a man handing over his own heart, and said it was the only honest thing he owned. It was, too. Nobody ever tells a bigger lie than an honest instrument.',
    ],
  },
  rookeCase: {
    title: 'Rooke\'s arithmetic',
    text: [
      'Inspector Culpepper Rooke, Post Office Investigation Branch, has the case written out already: the sack was sealed into the strongroom at 2.30, and Cadger\'s Bank — the last lineside apparatus, the only way anything leaves a running mail — was passed at 2.26. The sack was still aboard four minutes after its last chance to leave. Only Hare had the key.',
      'It is a good case. It is, in fact, an airtight case. It rests on comparing a man\'s watch with a railway timetable, and calling the pair of them one clock.',
    ],
  },
  hareLog: {
    title: 'The journal',
    text: [
      '2.10 Sowerby Trough, exchange as booked. 2.22 registered sack received from the sorters, sealed unopened. 2.30 strongroom sealed, tail lamp trimmed. 2.34 passed Cadger\'s Bank, nothing to exchange. 3.05 Crewe: sack sealed, sack full of newspaper.',
      'Written in pencil, at night, at fifty miles an hour, by a man taking every single figure off the watch in his waistcoat pocket.',
    ],
  },
  greenwichTrue: {
    title: 'Four minutes fast',
    text: [
      'The station clock is set from Greenwich by wire every morning and has no imagination whatever. It says 4.02. Hare\'s watch, in my hand, beside it, says 4.06.',
      'Four minutes. Every hour in that journal is four minutes further along than the night it describes. The Down Mail has been running through a private evening of its own since Euston.',
    ],
  },
  watchOdd: {
    title: 'Set, not broken',
    text: [
      'Three-quarters of a mile of quarter-posts, timed on the watch\'s own second hand: forty-six and a half seconds. Fifty-eight miles an hour, and the working timetable books this stretch at fifty-eight exactly.',
      'So the watch is not sick. It keeps perfect rate — it would win a prize. A watch that runs true and reads wrong has not gone wrong at all: it has been SET wrong, once, by a hand, and left to tick out an honest lie all night. Somebody moved those four minutes there on purpose.',
    ],
  },
  sealHonest: {
    title: 'A London seal, unbroken',
    text: [
      'The lead on the ballast sack is not Hare\'s and never was: it is a London seal, squeezed shut at Mount Pleasant before the engine was coupled, and it has not been touched since. Clause 4 of the notice forbade him to open it, and he didn\'t.',
      'The sack he sealed away so carefully was made up before he ever set eyes on it. Whatever happened to the registered post, it did not happen in Abel Hare\'s hands.',
    ],
  },
  ballastLondon: {
    title: 'Printed in London',
    text: [
      'The ballast is an evening paper of the 14th — London edition, London ink, folded to a racing page nobody read. It was in that sack, under a London seal, when the sack came aboard.',
      'The dummy was built in London hours before the theft. This crime was finished on paper before the Down Mail had steam up.',
    ],
  },
  tenchLettering: {
    title: 'Tench letters the pouches',
    text: [
      '"Re-lettered the whole frame at Euston, miss, per the notice. A and B as booked, F for the trial exchange, R for the strongroom. Took me twenty minutes and I did it right." He did do it right. He shows me the notice pinned to his bulkhead as though it were his character reference, which, poor man, it is.',
      'The most dangerous thing you can hand a conscientious man is a clear instruction.',
    ],
  },
  sherrickSlack: {
    title: 'The ordered slack',
    text: [
      'Job Sherrick, driver: "Clause three. Four minutes slack at Cadger\'s Bank for permanent way. I lost \'em to the second — I always do, and there wasn\'t a navvy in sight, and I thought no more about it than I think about rain."',
      'So the whole train believed itself four minutes down. Four minutes late by the timetable, four minutes fast by the watch. Two lies pulling exactly opposite, and between them the crew went through the night thinking every clock they owned agreed.',
    ],
  },
  noticeFound: {
    title: 'Special Traffic Notice No. 41',
    text: [
      'Out of the Inspector\'s own dispatch case, where it has been riding north all night as an exhibit against Hare: the working orders for the 14th, signed M. Vane, Superintendent.',
      'Rooke brought the murder weapon aboard himself, filed under "background".',
    ],
  },
  noticeClauses: {
    title: 'Nine clauses, no crime',
    text: [
      'Clause 3: four minutes\' slack at Cadger\'s Bank, for permanent way. Clause 4: registered sacks for the trial to be sealed unopened. Clause 6: all watches of the train crew to be regulated at the Superintendent\'s office before departure. Clause 7: registered sacks for the north to be lettered F for the trial exchange. Clause 9: the Cadger\'s Bank apparatus re-commissioned, one night only, for trial.',
      'Not one clause is an offence. A man could read the lot aloud at a Board meeting and be thanked for his diligence. Together they are a set of instructions for robbing a mail train using nobody but honest men.',
    ],
  },
  pouchRoute: {
    title: 'Where clause 7 sends it',
    text: [
      'I letter the frame myself, exactly as the notice directs, and watch the registered sack of the north walk straight into the F pouch — the trial pouch — the pouch that hangs in the apparatus arm and gets thrown at a net at fifty-eight miles an hour.',
      'Clause 7 loaded the catapult. Tench pulled nothing, chose nothing, knew nothing. He read an order and obeyed it, which is what he is paid four and six a week to do.',
    ],
  },
  apparatusProof: {
    title: 'A net can take it',
    text: [
      'My own pouch, weighted like a night\'s post, hung in the arm and let go at the standard: the net takes it out of the air with a bang like a door slamming in another county, and the arm comes back empty. Tench barely looks up. They do it forty times a night.',
      'So the impossible thing the Post Office says did not happen is a thing this train does routinely, in the dark, at speed, without slowing. It needs only two conditions: a net waiting, and a pouch in the arm. Somebody arranged both, in writing.',
    ],
  },
  wireBox: {
    title: 'The wire from Cadger\'s Bank',
    text: [
      'REPLY TO YOURS. APPARATUS PULLED OFF 2.26 PER NOTICE 41. DOWN MAIL PASSED 2.26. NET CLEARED BY PERMANENT WAY GANG. NO GANGER\'S WARRANT SHOWN. THOUGHT IT ODD. SIGNALMAN, CADGER\'S BANK BOX.',
      'A signal box is the one honest witness on a railway: it keeps Greenwich time by regulation and writes everything down whether it wants to or not. 2.26, world time, and the net cleared by men who had no business on the line.',
    ],
  },
  wireOffice: {
    title: 'The wire from London',
    text: [
      'REPLY TO YOURS. REGULATOR CLOCK IN SUPERINTENDENT\'S ROOM FOUND FOUR MINUTES FAST THIS MORNING. ADJUSTED BY MR VANE PERSONALLY 11.20 PM 14TH. CREW WATCHES SET BY IT 11.25 PM PER NOTICE 41 CLAUSE 6. HOPE THIS ASSISTS.',
      'There it is: the whole robbery, in a clock nobody looked at, in a room nobody suspected, four hundred miles behind us and fast asleep. He moved the hands of one clock and let five honest men carry it north for him.',
    ],
  },
  resolution: {
    title: 'Read in the guard\'s van',
    text: [
      'Sealed at 2.30 by a watch that was four minutes fast: sealed at 2.26 by the world. Cadger\'s Bank passed at 2.26. The apparatus pulled off at 2.26. Abel Hare had his hands on that door at the exact second the trial pouch went into the net behind him, which is why he heard nothing, saw nothing, and wrote down the time that would have hanged him.',
      'Rooke wired the Yard from Carlisle before the train had properly stopped. Mordaunt Vane was taken at his desk at seven, under a regulator clock now keeping perfect time.',
    ],
  },
};

/* ---------- the journey ----------
   One number is the whole state of time: `leg` (which stop we last
   left), plus `moving`, plus `final` for the last stage. */

const clockOf = g => (g.flag('final') ? '5.40' : ST[Math.min(g.getFlag('leg') || 0, LAST)].time);

const SCENES = {

  // ---------- the guard's van (the rear of the train) ----------

  guardsVan: {
    name: 'The Guard\'s Van',
    art: Art.ch7.guardsVan,
    hotspots: [
      {
        id: 'forward', rect: [30, 290, 150, 460], label: 'Forward to the sorting van',
        onClick: g => g.goTo('sortingVan'),
      },
      {
        id: 'hare', rect: [1020, 500, 150, 270], label: 'Abel Hare, guard',
        onClick: g => {
          if (!g.hasClue('hareSays')) {
            g.say([
              { who: 'Hare', text: 'You\'ll be the detective they woke at Crewe. I\'ll save you the trouble, miss: I sealed the registered sack into that strongroom at half past two, I never opened it, because the notice said not to, and at Crewe it come out full of yesterday\'s paper. I can\'t explain it. I\'ve give up trying.' },
              { who: 'Quinn', text: 'You have a journal.' },
              { who: 'Hare', text: 'Every hour of it true. Thirty years I\'ve kept it. And here\'s my watch — take it, take it, I\'d rather it was in an honest hand than mine tonight. Never lost a second since my father give it me. It\'s the only honest thing I own.' },
              { who: 'Quinn', text: 'Mr. Hare, I have spent a career among honest things, and they are the most dangerous witnesses in England. They never lie. They simply answer a question nobody thought to ask them.' },
            ], g2 => {
              g2.addClue('hareSays');
              g2.addItem('watch');
            });
          } else if (g.hasClue('greenwichTrue') && !g.flag('toldHare')) {
            g.setFlag('toldHare');
            g.say([
              { who: 'Quinn', text: 'Mr. Hare. Your watch is four minutes fast.' },
              { who: 'Hare', text: '...No, miss. No. It don\'t GAIN. It\'s never gained in thirty year, I\'d stake my life—' },
              { who: 'Quinn', text: 'You very nearly have. It doesn\'t gain. It was set. Somebody moved it four minutes on the night you most needed to know the time, and then let you write those four minutes into your own book in your own hand for four hundred miles.' },
              { who: 'Hare', text: 'Set it. Set it by what? The only clock I set it by was the one in the Superintendent\'s room, same as all of us, same as the notice said, half past eleven, all of us in a line like choirboys...' },
            ]);
          } else if (g.hasClue('resolution')) {
            g.say([{ who: 'Hare', text: 'Thirty year I carried it, miss. I don\'t know as I want it back.' }]);
          } else {
            g.say([{ who: 'Hare', text: 'Ask what you like. I\'ve nothing to hide and nothing to give you, which is a terrible combination in a man they mean to convict.' }]);
          }
        },
      },
      {
        id: 'desk', rect: [250, 500, 380, 100], label: 'The guard\'s desk',
        onClick: g => {
          if (g.flag('journalTaken') && g.flag('padTaken')) { g.openZoom('journal'); return; }
          if (!g.flag('journalTaken')) {
            g.setFlag('journalTaken');
            g.addItem('journal');
            g.addClue('hareLog');
            g.sfx('page');
            g.say([
              { text: 'The night book, open at the 14th. 2.10, Sowerby Trough, exchange as booked. 2.22, registered sack received from the sorters, sealed unopened. 2.30, strongroom sealed, tail lamp trimmed. 2.34, passed Cadger\'s Bank, nothing to exchange. 3.05, Crewe: sack sealed, sack full of newspaper.' },
              { who: 'Quinn', text: 'A copperplate hand at fifty miles an hour in the dark. And every figure in it taken off the watch in his waistcoat — which means this book is not a record of the night. It is a record of the watch.' },
            ]);
            return;
          }
          g.setFlag('padTaken');
          g.addItem('pad');
          g.narrate('A pad of Post Office wire blanks under the inkstand. Ask England a question at one platform and England answers you at the next — the fastest thing in the world, provided you\'re willing to spend a stop on it. And I have five stops, and a man\'s liberty at the end of them.');
        },
      },
      {
        id: 'rack', rect: [690, 480, 130, 100], label: 'The lamp rack',
        onClick: g => {
          if (!g.flag('lanternTaken')) {
            g.setFlag('lanternTaken');
            g.addItem('lantern');
            g.narrate('A guard\'s dark lantern off the rack — shutter, reflector, and a wick as dry as a sermon. There\'ll be oil on the footplate, if I can get at an engine while we\'re standing.');
            return;
          }
          if (!g.flag('strapTaken')) {
            g.setFlag('strapTaken');
            g.addItem('strap');
            g.narrate('The tail-lamp locker gives up a weighted leather strap with a good brass buckle. Heavy, and going nowhere useful in a locker.');
            return;
          }
          g.narrate('An empty rack, a bare locker, and a guard too polite to ask what I have done with his property.');
        },
      },
      {
        id: 'window', rect: [240, 210, 620, 240], label: 'The window',
        onClick: g => {
          if (!g.flag('moving')) {
            g.narrate('A platform\'s gas hanging in the glass, and the night beyond it holding perfectly still. You cannot measure a train that isn\'t going anywhere.');
            return;
          }
          if (!g.hasItem('watch')) {
            g.narrate('Quarter-posts, flicking past the glass out of the dark and back into it. Something to count — and nothing to count them WITH.');
            return;
          }
          if (g.hasClue('watchOdd')) {
            g.narrate('Fifty-eight miles an hour, booked at fifty-eight. This watch would win a prize at any horological society in England. That is the trouble with it.');
            return;
          }
          g.openPuzzle('mileposts');
        },
      },
      {
        id: 'strongroom', rect: [1180, 280, 300, 470], label: 'The registered strongroom',
        onClick: g => {
          if (g.flag('strongOpen')) { g.openZoom('strongroom'); return; }
          if (!g.hasItem('key')) {
            g.narrate('An iron door, a brass lock, and a Post Office seal across the jamb that Rooke put there himself at Crewe. There is precisely one key to it, and the Inspector is sitting on it like a hen.');
            return;
          }
          g.setFlag('strongOpen');
          g.sfx('unlock');
          g.retireItem('key');
          g.openZoom('strongroom');
        },
        use: {
          key: g => {
            if (g.flag('strongOpen')) { g.narrate('It stands open already.'); return; }
            g.setFlag('strongOpen');
            g.sfx('unlock');
            g.retireItem('key');
            g.narrate('The wards turn like a sentence being finished. The door swings back on a black square of nothing at all — a strongroom has no window, and nobody ever thought to give a place full of money a light.');
            g.openZoom('strongroom');
          },
        },
      },
      {
        id: 'vanDoor', rect: [880, 300, 130, 450], label: 'Down to the platform',
        visible: g => !g.flag('moving'),
        onClick: g => g.goTo('platform'),
      },
      {
        id: 'rightAway', rect: [1500, 430, 100, 130], label: 'Tell Hare to give the right-away',
        visible: g => !g.flag('moving') && (g.getFlag('leg') || 0) < LAST,
        onClick: g => {
          const leg = g.getFlag('leg') || 0;
          g.setFlag('moving', true);
          g.sfx('whistle');
          g.narrate('Hare leans out with his lamp, shows a green, and thirty years of habit does the rest. The couplings take up one by one down the train like a sentence being spoken slowly, and ' + ST[leg].name + ' slides backwards into the dark. ' + ST[leg + 1].name + ' next, and one more stop gone.');
        },
      },
      {
        id: 'nextStop', rect: [1500, 430, 100, 130], label: 'The brakes come on',
        visible: g => g.flag('moving') && !g.flag('final'),
        onClick: g => {
          const leg = Math.min((g.getFlag('leg') || 0) + 1, LAST);
          g.setFlag('leg', leg);
          g.setFlag('moving', false);
          g.sfx('brake');
          g.narrate('The brake comes on in a long grinding sigh, gas lamps swim up out of the dark one at a time, and the Down Mail sets its feet down in ' + ST[leg].name + ' at ' + ST[leg].time + '. A stop spent. ' + (leg === LAST ? 'And Penrith is the last wire in England: past here there is nothing but the train, the dark, and Carlisle.' : 'Four to go.'));
        },
      },
      {
        id: 'lastStage', rect: [1500, 430, 100, 130], label: 'Away for Carlisle — the last stage',
        visible: g => !g.flag('moving') && (g.getFlag('leg') || 0) === LAST && !g.flag('final'),
        onClick: g => {
          if (!g.hasClue('wireBox') || !g.hasClue('wireOffice') || !g.hasClue('greenwichTrue') || !g.hasClue('sherrickSlack')) {
            g.sfx('error');
            g.say([
              { who: 'Hare', text: 'Penrith\'s the last wire, miss. Past the home signal there\'s no station, no telegraph and no clock but the one in my pocket, and you\'ve told me what that\'s worth. Anything you mean to ask the world, ask it on this platform.' },
              { who: 'Quinn', text: 'Then hold your green a moment longer, Mr. Hare. I am not finished asking.' },
            ]);
            return;
          }
          g.setFlag('final', true);
          g.setFlag('moving', true);
          g.sfx('whistle');
          g.say([
            { text: 'The green goes out, Penrith goes out, and the Down Mail puts her head down for the last twenty-five miles. No stations. No telegraph. The sky over the fells has begun, very slightly, to go the colour of a fish\'s belly.' },
            { who: 'Rooke', text: 'Carlisle in twenty-five minutes, madam, and my constables on the platform. Whatever it is you think you have — you have until the buffers.' },
          ]);
        },
      },
      {
        id: 'makeCase', rect: [830, 510, 110, 240], label: 'Make the case to Rooke',
        visible: g => g.flag('final') && !g.flag('ended')
          && g.hasClue('greenwichTrue') && g.hasClue('watchOdd') && g.hasClue('sealHonest')
          && g.hasClue('ballastLondon') && g.hasClue('pouchRoute') && g.hasClue('sherrickSlack')
          && g.hasClue('wireBox') && g.hasClue('wireOffice') && g.hasClue('apparatusProof')
          && g.hasClue('noticeClauses') && g.hasItem('journal') && g.hasItem('watch'),
        onClick: g => {
          g.say([
            { who: 'Quinn', text: 'Inspector. Sit down, and bring the notice. Mr. Hare, keep your lamp handy — you\'ll want to be doing something with your hands.' },
            { who: 'Rooke', text: 'Twenty-five minutes, madam.' },
            { who: 'Quinn', text: 'I shall need four. Your entire case is a subtraction sum, Inspector, and you have never once done it. The journal, then, entry by entry — and every figure in it four minutes ahead of the world.' },
          ], g2 => g2.openPuzzle('reconstruction'));
        },
      },
    ],
    zooms: {
      journal: {
        title: 'The Guard\'s Journal',
        art: Art.ch7.journalZoom,
        hotspots: [
          {
            id: 'entries', rect: [130, 100, 940, 600], label: 'The night\'s entries',
            onClick: g => {
              if (g.hasClue('greenwichTrue')) {
                g.narrate('The same five entries, and every one of them now carrying a second time in red underneath: four minutes back into the night, where the world actually was. Sowerby at 2.06. The sack at 2.18. The strongroom sealed at 2.26 — and I do not much like the look of 2.26, because I have seen that minute somewhere else tonight.');
                return;
              }
              g.narrate('Five entries in a copperplate hand at fifty miles an hour in the dark. Rooke reads this book as a confession; Hare offers it as an alibi; and it is neither. It is a very careful record of what one small object in a waistcoat pocket believed.');
            },
          },
        ],
      },
      strongroom: {
        title: 'The Registered Strongroom',
        art: Art.ch7.strongroomZoom,
        hotspots: [
          {
            id: 'seal', rect: [800, 200, 200, 200], label: 'The seal on the sack',
            visible: g => !g.flag('sealSeen'),
            onClick: g => {
              g.setFlag('sealSeen');
              g.addClue('sealHonest');
              g.sfx('knock');
              g.say([
                { text: 'The lead lies against the sack\'s throat, squeezed flat and stamped, and the stamp is not the one in Hare\'s van. It is a Mount Pleasant die: a London seal, closed in London, uncut and unslit ever since.' },
                { who: 'Quinn', text: 'Clause four told him to seal it away unopened, and he obeyed, being that ruinous thing, a conscientious man. This sack was made up before he ever set eyes on it. Whatever happened to the registered post, it did not happen in Abel Hare\'s hands.' },
              ]);
            },
          },
          {
            id: 'sack', rect: [400, 420, 400, 240], label: 'The sack itself',
            onClick: g => {
              if (g.flag('ballastFound')) { g.narrate('A slit sack, a spill of newsprint, and a racing page from a city four hundred miles behind us.'); return; }
              if (!g.hasItem('litLantern')) {
                g.narrate('Something canvas and heavy, felt rather than seen — the strongroom is black as the inside of a hat and there is no window in it to be black. I can get my hands on it and learn nothing. I want a light.');
                return;
              }
              g.setFlag('ballastFound');
              g.addItem('newspaper');
              g.addClue('ballastLondon');
              g.retireItem('litLantern');
              g.sfx('page');
              g.say([
                { text: 'The shutter comes up and the strongroom turns gold. The sack is slit where Rooke slit it at Crewe, and what comes out of it is not the registered post of the north: it is newspaper, pressed in tight, sheet on sheet on sheet.' },
                { who: 'Quinn', text: 'An evening paper of the 14th. London edition, London ink, folded to a racing page nobody read. It was inside a London seal when it came aboard. Inspector Rooke believes this dummy was built in a guard\'s van at half past two in the morning. It was built at a desk, in London, before this train had steam up.' },
              ]);
            },
            use: {
              litLantern: g => {
                if (g.flag('ballastFound')) { g.narrate('Lit and looked at and understood, thank you.'); return; }
                g.setFlag('ballastFound');
                g.addItem('newspaper');
                g.addClue('ballastLondon');
                g.retireItem('litLantern');
                g.sfx('page');
                g.say([
                  { text: 'The shutter comes up and the strongroom turns gold. The sack is slit where Rooke slit it at Crewe, and what spills is newspaper — pressed in tight, sheet on sheet, with the weight of a night\'s letters and the value of none of them.' },
                  { who: 'Quinn', text: 'An evening paper of the 14th. London edition, folded to a racing page nobody read. Inside a London seal. This dummy was built at a desk four hundred miles behind us, before the engine was coupled.' },
                ]);
              },
            },
          },
        ],
      },
    },
  },

  // ---------- the travelling post office ----------

  sortingVan: {
    name: 'The Travelling Post Office',
    art: Art.ch7.sortingVan,
    onEnter: g => {
      if (!g.flag('tpoSeen')) {
        g.setFlag('tpoSeen');
        g.say([{ who: 'Quinn', text: 'A room forty feet long doing eighty miles an hour: pigeonholes to the roof, a man sorting Carlisle from Carstairs by touch, and a door in the side of the world that opens at speed. Every mail train in England is a factory that happens to be falling northward.' }]);
      }
    },
    hotspots: [
      {
        id: 'forward', rect: [30, 290, 140, 460], label: 'Forward to the carriage',
        onClick: g => g.goTo('corridor'),
      },
      {
        id: 'back', rect: [1430, 290, 140, 460], label: 'Back to the guard\'s van',
        onClick: g => g.goTo('guardsVan'),
      },
      {
        id: 'tench', rect: [1160, 500, 150, 250], label: 'Tench, sorter',
        onClick: g => {
          if (!g.hasClue('tenchLettering')) {
            g.say([
              { who: 'Tench', text: 'You\'ll want to know if I done it right. I done it right, miss. Re-lettered the whole frame at Euston, per the notice: A and B as booked, F for the trial exchange, R for the strongroom. Twenty minutes it took me and I checked it twice.' },
              { who: 'Quinn', text: 'And the registered sack for the north?' },
              { who: 'Tench', text: 'Lettered as the notice says, and passed on as the notice says. It\'s pinned to my bulkhead — I never do a thing that isn\'t on that bulkhead. Twenty-two years, miss, and not one letter astray.' },
              { who: 'Quinn', text: 'Twenty-two years and not one letter astray. Mr. Tench, I am beginning to think that is exactly what somebody was counting on.' },
            ], g2 => g2.addClue('tenchLettering'));
          } else if (g.hasClue('pouchRoute')) {
            g.say([{ who: 'Tench', text: 'The F pouch. The F POUCH. I hung it in the arm myself and give it the flap and never — miss, I\'ve sorted for twenty-two years, I could no more...' }, { who: 'Quinn', text: 'You did it perfectly, Mr. Tench. That was the point of you.' }]);
          } else {
            g.say([{ who: 'Tench', text: 'Per the notice, miss. It\'s all per the notice. Read it yourself, it\'s on the bulkhead.' }]);
          }
        },
      },
      {
        id: 'frame', rect: [220, 200, 470, 420], label: 'The sorting frame',
        onClick: g => g.openZoom('frame'),
      },
      {
        id: 'pouch', rect: [650, 670, 100, 100], label: 'A spare pouch',
        visible: g => !g.flag('pouchTaken'),
        onClick: g => {
          g.setFlag('pouchTaken');
          g.addItem('pouch');
          g.narrate('A spare exchange pouch off the hook. Empty, it would flutter off the arm like a handkerchief — a net wants something with an opinion in it. But the makings of an experiment, and there is a question here nobody has thought to put to the railway itself.');
        },
      },
      {
        id: 'apparatus', rect: [820, 470, 300, 280], label: 'The apparatus door',
        onClick: g => {
          if (g.hasClue('apparatusProof')) { g.narrate('The arm, the net, and forty times a night. The most ordinary miracle on the London and North Western.'); return; }
          if (!g.flag('moving')) {
            g.narrate('The arm and its net, folded against the van side. A lineside apparatus takes a pouch at speed or not at all — standing in a station it is so much ironmongery, and the standards are all out there in the dark going by at fifty-eight.');
            return;
          }
          if (!g.hasItem('weightedPouch')) {
            g.narrate('Tench swings the door and the night comes in like a slap: the arm out, the net folded, a lineside standard flicking past every half-minute. Rooke says nothing can leave this train. I should very much like to make something leave this train — but I want a pouch with some weight in it, not a handkerchief.');
            return;
          }
          g.openPuzzle('apparatus');
        },
        use: {
          weightedPouch: g => {
            if (!g.flag('moving')) { g.narrate('At a stand, the arm is ironmongery. This wants a road under us.'); return; }
            g.openPuzzle('apparatus');
          },
        },
      },
    ],
    zooms: {
      frame: {
        title: 'The Sorting Frame',
        art: Art.ch7.frameZoom,
        hotspots: [
          {
            id: 'bulkhead', rect: [860, 490, 330, 200], label: 'The orders on the bulkhead',
            visible: g => !g.flag('bulletinRead'),
            onClick: g => {
              g.setFlag('bulletinRead');
              g.sfx('page');
              g.narrate('Pinned to the bulkhead at a sorter\'s eye level, thumbed soft at the corners: tonight\'s working orders, in the clean official prose of a man who has never lifted a sack in his life. "SPECIAL TRAFFIC NOTICE No. 41." The pin has been through it a dozen times. Mr. Tench has consulted his own destruction hourly, with pride.');
            },
          },
          {
            id: 'holes', rect: [100, 90, 940, 200], label: 'The pigeonholes',
            onClick: g => {
              if (g.hasClue('pouchRoute')) { g.narrate('A B F R. Two as booked, one for a trial, and one for a strongroom — and clause seven quietly deciding which of them gets the crown jewels.'); return; }
              if (!g.hasItem('notice41')) {
                g.narrate('Four lettered pouches and a frame re-lettered at Euston. Without the notice in my hand I am reading the second half of a sentence: I can see what Tench did, and not one word of what he was told.');
                return;
              }
              g.openPuzzle('pigeonholes');
            },
            use: {
              notice41: g => {
                if (g.hasClue('pouchRoute')) { g.narrate('Read, obeyed, and understood. Clause seven has confessed.'); return; }
                g.openPuzzle('pigeonholes');
              },
            },
          },
        ],
      },
    },
  },

  // ---------- the first-class corridor ----------

  corridor: {
    name: 'The Corridor',
    art: Art.ch7.corridor,
    hotspots: [
      {
        id: 'forward', rect: [30, 290, 140, 460], label: 'Forward to the engine end',
        onClick: g => {
          if (g.flag('moving')) {
            g.narrate('The vestibule door, and beyond it the tender\'s back and a gap full of noise and cinders going by at fifty-eight. Nobody walks onto a footplate from a moving train — not twice, at any rate. That is a thing to do from a platform.');
            return;
          }
          g.narrate('The gangway ends at the tender. From a platform I could walk up the length of her and climb the ladder; from in here, all I can do is admire the coal.');
        },
      },
      {
        id: 'back', rect: [1430, 290, 140, 460], label: 'Back to the sorting van',
        onClick: g => g.goTo('sortingVan'),
      },
      {
        id: 'door', rect: [560, 300, 120, 450], label: 'Down to the platform',
        visible: g => !g.flag('moving'),
        onClick: g => g.goTo('platform'),
      },
      {
        id: 'rooke', rect: [1110, 460, 150, 260], label: 'Inspector Rooke',
        onClick: g => {
          if (!g.hasClue('rookeCase')) {
            g.say([
              { who: 'Rooke', text: 'Miss Quinn. I know your reputation and I have no use for it. This is not a mystery, madam, it is a subtraction: the sack was sealed into the strongroom at 2.30. The last lineside apparatus — Cadger\'s Bank, the only way anything gets off a running mail — was passed at 2.26.' },
              { who: 'Rooke', text: 'Four minutes. The sack was still aboard four minutes after its last chance to leave, and one man had the key. At Carlisle I put him in irons and go home to my breakfast.' },
              { who: 'Quinn', text: 'You have the guard\'s 2.30 from the guard\'s watch, and Cadger\'s Bank\'s 2.26 from a printed timetable. Those are two different clocks, Inspector, and you have added them together as though they were one.' },
              { who: 'Rooke', text: 'They are both CLOCKS, madam. Good night.' },
            ], g2 => g2.addClue('rookeCase'));
            return;
          }
          // Gate one: the watch is four minutes fast — so the log is worthless.
          if (g.hasClue('greenwichTrue') && !g.flag('gaveKey')) {
            g.setFlag('gaveKey');
            g.addItem('key');
            g.sfx('unlock');
            g.say([
              { who: 'Quinn', text: 'Your 2.30 came out of a watch that is four minutes fast. I stood it beside the Greenwich clock on the platform and made it say so in front of witnesses.' },
              { who: 'Rooke', text: '...Then his book is worth nothing. Which helps him not at all, madam — a guard with a wrong watch is a guard with a wrong watch, and he still had the only key to a strongroom full of newspaper.' },
              { who: 'Quinn', text: 'Then you will have no objection to my looking inside it.' },
              { who: 'Rooke', text: 'Take the key. Take the van. Take the whole confounded train. You have until Carlisle, and I shall enjoy watching you spend it.' },
            ]);
            return;
          }
          // Gate two: set, not broken — and a dummy built in London.
          if (g.hasClue('watchOdd') && g.hasClue('ballastLondon') && !g.flag('caseOpen')) {
            g.setFlag('caseOpen');
            g.retireItem('newspaper');
            g.sfx('page');
            g.say([
              { who: 'Quinn', text: 'Two things, Inspector, and then you may go back to your breakfast. The watch is not broken: I timed three-quarters of a mile of quarter-posts on its own second hand and it keeps fifty-eight to the yard. A watch that runs true and reads wrong has been SET wrong. By a hand. On purpose.' },
              { who: 'Rooke', text: 'And the second thing?' },
              { who: 'Quinn', text: 'This. Out of your sealed sack: an evening paper of the 14th, London edition, under a London seal that has never been cut. Your dummy was made up four hundred miles behind us before the engine was coupled — which is a long reach for a guard who has not been south of Crewe since Christmas.' },
              { who: 'Rooke', text: '...There is a notice in my case. Special Traffic Notice No. 41, for the 14th. I have been carrying it north all night as BACKGROUND, madam. Read it, and tell me I have been carrying the thing itself.' },
            ], g2 => g2.addClue('noticeFound'));
            return;
          }
          if (g.flag('caseOpen') && !g.hasItem('notice41') && !g.flag('noticeTaken')) {
            g.say([{ who: 'Rooke', text: 'The notice is in the case, madam. Take it. I find I would rather you had it than me.' }]);
            return;
          }
          if (g.hasClue('noticeClauses') && !g.flag('final')) {
            g.say([{ who: 'Rooke', text: 'Nine clauses and not an offence among them. I have read that notice forty times, madam. I read it as HOUSEKEEPING.' }, { who: 'Quinn', text: 'So did every honest man on this train. That was the arrangement.' }]);
            return;
          }
          g.say([{ who: 'Rooke', text: 'Carlisle, madam. Carlisle, and irons, and my breakfast. Bring me something a magistrate can hold in his hand.' }]);
        },
      },
      {
        id: 'dispatch', rect: [830, 470, 170, 96], label: 'His dispatch case',
        onClick: g => {
          if (!g.flag('caseOpen')) {
            g.narrate('Brass locks, Post Office leather, and the Inspector\'s knee against it. Whatever is in there is in there at his pleasure, and his pleasure at present is Abel Hare in irons at Carlisle.');
            return;
          }
          g.openZoom('case');
        },
      },
    ],
    zooms: {
      case: {
        title: 'The Inspector\'s Dispatch Case',
        art: Art.ch7.caseZoom,
        hotspots: [
          {
            id: 'notice', rect: [230, 170, 340, 400], label: 'Special Traffic Notice No. 41',
            onClick: g => {
              if (!g.hasClue('noticeClauses')) {
                g.sfx('page');
                g.addClue('noticeClauses');
                g.setFlag('noticeTaken');
                g.addItem('notice41');
                g.say([
                  { text: 'Nine clauses, foolscap, signed at the foot: M. Vane, Superintendent. Clause 3: four minutes\' slack at Cadger\'s Bank, for permanent way. Clause 4: registered sacks for the trial to be sealed unopened. Clause 6: all watches of the train crew to be regulated at the Superintendent\'s office before departure. Clause 7: registered sacks for the north to be lettered F for the trial exchange. Clause 9: the Cadger\'s Bank apparatus re-commissioned, one night only, for trial.' },
                  { who: 'Quinn', text: 'Not one of these is an offence. A man could read the lot aloud to the Board and be thanked for his diligence. And laid end to end they are a complete set of instructions for robbing a mail train — using nobody but honest men, none of whom will ever know they did it.' },
                  { who: 'Quinn', text: 'He never boarded, Inspector. He never touched a sack, a lock, a key or a pouch. He wrote a timetable, and five good men carried it north for him at fifty-eight miles an hour.' },
                ]);
                return;
              }
              if (!g.hasItem('notice41') && !g.flag('noticeReTaken')) {
                g.setFlag('noticeReTaken');
                g.addItem('notice41');
                g.narrate('I take the notice back off the Inspector. He does not fight me for it.');
                return;
              }
              g.narrate('Nine clauses of clean official prose, and a signature under them like a man signing for a parcel.');
            },
          },
          {
            id: 'charge', rect: [640, 190, 320, 320], label: 'The charge sheet',
            onClick: g => g.narrate('Made out at Crewe in a fair round hand, wanting only a magistrate: ABEL HARE, GUARD, LARCENY BY A SERVANT OF THE CROWN. He wrote it before he interviewed anybody. It is not laziness — it is a man who has done the sum and cannot find the flaw in it. Neither could I, for an hour. The flaw is that he did the sum with two clocks.'),
          },
        ],
      },
    },
  },

  // ---------- the footplate ----------

  footplate: {
    name: 'The Footplate',
    art: Art.ch7.footplate,
    onEnter: g => {
      if (!g.flag('fpSeen')) {
        g.setFlag('fpSeen');
        g.say([{ who: 'Quinn', text: 'Heat like a slap, and the first honest warmth I have felt since Crewe. Everything else on this train is steel and paperwork; here two men in a steel box are having a personal relationship with a fire.' }]);
      }
    },
    hotspots: [
      {
        id: 'down', rect: [30, 560, 70, 260], label: 'Down to the platform',
        onClick: g => g.goTo('platform'),
      },
      {
        id: 'sherrick', rect: [1110, 480, 150, 260], label: 'Job Sherrick, driver',
        onClick: g => {
          if (!g.hasClue('sherrickSlack')) {
            g.say([
              { who: 'Sherrick', text: 'Ask away, miss, we\'ve four minutes here and I\'ve nothing to do but watch Nib drop coal on his own boots.' },
              { who: 'Quinn', text: 'Cadger\'s Bank, tonight. Did anything happen there?' },
              { who: 'Sherrick', text: 'Happen? Clause three happened. Four minutes\' slack for permanent way — I lost \'em to the second, I always do. And there wasn\'t a navvy on the road, not a lamp, not a shovel. I thought no more about it than I think about rain. They put slacks in the notice every night of the year.' },
              { who: 'Quinn', text: 'So the whole train believed itself four minutes down.' },
              { who: 'Sherrick', text: 'Four down and knowing it, miss, and my watch agreeing with the guard\'s to the tick, same as it should — we\'re all set off the same clock at the office, per the notice. Nothing on this train ever disagreed with anything all night.' },
              { who: 'Quinn', text: 'No. That is precisely what has been done to you, Mr. Sherrick. Two lies pulling opposite ways, and the pair of you sailing between them thinking every clock you owned agreed.' },
            ], g2 => g2.addClue('sherrickSlack'));
          } else {
            g.say([{ who: 'Sherrick', text: 'Four minutes for permanent way, and not a navvy in sight. I shall be thinking about that for the rest of my life, miss, and I don\'t thank you for it.' }]);
          }
        },
      },
      {
        id: 'nib', rect: [1330, 480, 150, 260], label: 'Nib, fireman',
        onClick: g => g.say([{ who: 'Nib', text: 'Shap\'s coming, miss. When Shap comes I\'ve no conversation in me at all — you can ask me who I am and I shan\'t know.' }]),
      },
      {
        id: 'oil', rect: [360, 570, 160, 110], label: 'The oil can',
        visible: g => !g.flag('oilTaken'),
        onClick: g => {
          g.setFlag('oilTaken');
          g.addItem('oilCan');
          g.narrate('A long-spouted can off the tool ledge, warm from the boiler. "Oils anything," says Nib, "from a big end to a magistrate." I shall want it for a wick, but I take the philosophy with me.');
        },
      },
      {
        id: 'fire', rect: [700, 470, 200, 150], label: 'The firehole',
        onClick: g => g.narrate('Nib swings the door and the whole footplate turns the colour of a held breath. It is the only warm light on the Down Mail — everything else in this chapter of my life has been the colour of a signal lamp going past at speed.'),
      },
    ],
  },

  // ---------- the platform (a different station every time) ----------

  platform: {
    name: 'The Platform',
    art: Art.ch7.platform,
    hotspots: [
      {
        id: 'aboardVan', rect: [700, 300, 130, 450], label: 'Aboard — the guard\'s van',
        onClick: g => g.goTo('guardsVan'),
      },
      {
        id: 'aboardCarriage', rect: [1080, 700, 120, 220], label: 'Aboard — the carriage',
        onClick: g => g.goTo('corridor'),
      },
      {
        id: 'upToEngine', rect: [60, 700, 120, 220], label: 'Up to the engine',
        onClick: g => g.goTo('footplate'),
      },
      {
        id: 'clock', rect: [1180, 280, 240, 240], label: 'The station clock',
        onClick: g => {
          if (g.hasClue('greenwichTrue')) {
            const st = ST[Math.min(g.getFlag('leg') || 0, LAST)];
            g.narrate('Greenwich, by wire, every morning of its life: ' + st.time + ' exactly. And four minutes behind it, in my pocket, a silver turnip telling an honest lie.');
            return;
          }
          if (!g.hasItem('watch')) {
            g.narrate('The station clock, set from Greenwich by wire every morning and utterly without imagination. It knows what time it is. It is the only thing on this railway that does — and I have nothing to hold up against it.');
            return;
          }
          g.openPuzzle('clockCheck');
        },
        use: {
          watch: g => {
            if (g.hasClue('greenwichTrue')) { g.narrate('Compared, and the comparison stands: four minutes.'); return; }
            g.openPuzzle('clockCheck');
          },
        },
      },
      {
        id: 'telegraph', rect: [140, 330, 300, 290], label: 'The telegraph hatch',
        onClick: g => {
          const boxReady = replyReady(g, 'wiredBoxLeg') && !g.flag('gotBox');
          const officeReady = replyReady(g, 'wiredOfficeLeg') && !g.flag('gotOffice');
          if (boxReady || officeReady) {
            const lines = [];
            if (boxReady) {
              g.setFlag('gotBox');
              g.addClue('wireBox');
              lines.push({ text: 'From Cadger\'s Bank box, chased up the line and handed through the hatch on a flimsy: APPARATUS PULLED OFF 2.26 PER NOTICE 41. DOWN MAIL PASSED 2.26. NET CLEARED BY PERMANENT WAY GANG. NO GANGER\'S WARRANT SHOWN. THOUGHT IT ODD.' });
              lines.push({ who: 'Quinn', text: 'Thought it odd, and wrote it down, and went on pulling his levers. A signal box keeps Greenwich time by regulation and writes everything down whether it wants to or not — the one honest witness on a railway. The net was cleared at 2.26 by men with no business on the line.' });
            }
            if (officeReady) {
              g.setFlag('gotOffice');
              g.addClue('wireOffice');
              lines.push({ text: 'From London, by way of three relays and a sleepy boy: REGULATOR CLOCK IN SUPERINTENDENT\'S ROOM FOUND FOUR MINUTES FAST THIS MORNING. ADJUSTED BY MR VANE PERSONALLY 11.20 PM 14TH. CREW WATCHES SET BY IT 11.25 PM PER NOTICE 41 CLAUSE 6. HOPE THIS ASSISTS.' });
              lines.push({ who: 'Quinn', text: 'It assists. There is the whole robbery, four hundred miles behind us, fast asleep: he moved the hands of one clock at twenty past eleven and let five honest men carry it north for him.' });
            }
            g.sfx('page');
            g.say(lines, g2 => {
              if (g2.flag('gotBox') && g2.flag('gotOffice') && g2.hasItem('pad')) g2.retireItem('pad');
            });
            return;
          }
          if (!g.hasItem('pad')) {
            g.narrate('A hatch, a clerk, a key clacking away to Carlisle and Glasgow and everywhere. He will not take a word from me without a Post Office wire blank, and I have none. There is a pad on the guard\'s desk.');
            return;
          }
          g.openPuzzle('telegraph');
        },
        use: {
          pad: g => g.openPuzzle('telegraph'),
        },
      },
      {
        id: 'nameboard', rect: [560, 330, 480, 110], label: 'The name board',
        onClick: g => {
          const leg = g.getFlag('leg') || 0;
          const st = ST[leg];
          g.narrate(st.name.toUpperCase() + ', at ' + st.time + ' in the morning. ' + (leg === LAST
            ? 'Penrith: the last wire in England. Past the home signal there is no telegraph, no station and no clock that has not been tampered with — only the fells, the dark, and Carlisle at five past six with a constable on the platform.'
            : 'Stop ' + (leg + 1) + ' of five, and the whole of England asleep except for the men who move its letters about and the one man who is going to be ruined for it.'));
        },
      },
    ],
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  /* The wire: the chapter's novelty at its plainest. An enquiry sent
     from this platform is answered at the next — so a question costs a
     stop, and there are only five. */
  telegraph: {
    title: 'The Telegraph Hatch',
    wide: true,
    render(g) {
      const leg = g.getFlag('leg') || 0;
      const row = (act, to, text, sentFlag, gotFlag) => {
        const sent = g.getFlag(sentFlag);
        const got = g.flag(gotFlag);
        const state = got ? 'answered'
          : sent != null ? (replyReady(g, sentFlag) ? 'the answer is at the hatch now' : 'sent from ' + ST[sent].name + ' &mdash; the answer comes at the next stop')
            : null;
        return `<div class="mark-row">
          <div style="flex:1">
            <strong>${to}</strong><br/><span class="mark-unseen">${text}</span>
            ${state ? `<br/><em>${state}</em>` : ''}
          </div>
          ${sent == null ? `<button class="btn" data-act="${act}">Send it</button>` : ''}
        </div>`;
      };
      return `<p class="puzzle-msg">${g.getFlag('wireMsg')
        || ('The clerk licks his pencil. It is ' + ST[leg].time + ' at ' + ST[leg].name + ', and a wire sent here is answered at the next stop &mdash; not one minute sooner, and there are only ' + (LAST - leg) + ' stops left after this one.')}</p>
        <div class="mark-rows">
          ${row('wire-box', 'The signalman, Cadger\'s Bank box', 'What passed your box between two and three this morning, and who was on the ground?', 'wiredBoxLeg', 'gotBox')}
          ${row('wire-office', 'The regulator room, London', 'The Superintendent\'s office clock: is it right, and who last had his hands on it?', 'wiredOfficeLeg', 'gotOffice')}
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="leave">Leave the hatch</button>
        </div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const leg = g.getFlag('leg') || 0;
        g.sfx('click');
        if (act === 'wire-box') {
          g.setFlag('wiredBoxLeg', leg);
          g.setFlag('wireMsg', 'The key stutters away into the dark toward Cadger\'s Bank. A hundred and forty miles behind us a man in a signal box will put down his cocoa and be surprised. The answer will be waiting at ' + (leg < LAST ? ST[leg + 1].name : 'the up-mail\'s crossing') + '.');
        } else {
          g.setFlag('wiredOfficeLeg', leg);
          g.setFlag('wireMsg', 'Away to London, through three relays and a sleepy boy at Preston, to ask a clock what it has been doing. The answer will be waiting at ' + (leg < LAST ? ST[leg + 1].name : 'the up-mail\'s crossing') + '.');
        }
        rerender();
      }));
    },
  },

  /* The clock check: two dials side by side, and the whole case in the
     gap between them. Which of them is Greenwich — and by how much does
     the other lie? */
  clockCheck: {
    title: 'The Watch and the Clock',
    wide: true,
    render(g) {
      const leg = Math.min(g.getFlag('leg') || 0, LAST);
      const [hh, mm] = ST[leg].time.split('.').map(Number);
      const wm = mm + 4;
      const step = g.getFlag('ckStep') || 0;
      const board = `<div class="trail-board"><svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="460" height="220" rx="8" fill="#0b1020"/>
        ${Art.ch7.stationClock(120, 108, 78, hh, mm)}
        ${Art.ch7.watchDial(340, 108, 64, hh, wm)}
        <text x="120" y="212" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#9fb0c4">the station clock</text>
        <text x="340" y="212" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#9fb0c4">Hare&#8217;s watch</text>
      </svg></div>`;
      const q = step === 0
        ? ['Which of these two knows what time it is?', [
          'The station clock — set from Greenwich by wire',
          'The watch — thirty years and never a second lost',
          'Neither: at this hour, who could say',
        ]]
        : ['Then hold them side by side and say it plainly. The watch is&hellip;', [
          'four minutes fast',
          'four minutes slow',
          'exactly right, and the railway is wrong',
        ]];
      return `${board}
        <p class="puzzle-msg">${g.getFlag('ckMsg') || q[0]}</p>
        <div class="puzzle-controls">
          ${q[1].map((o, i) => `<button class="btn" data-act="say-${i}">${o}</button>`).join('')}
        </div>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Step back</button></div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const step = g.getFlag('ckStep') || 0;
        const pick = Number(act.slice(4));
        if (pick !== 0) {
          g.sfx('error');
          g.setFlag('ckMsg', step === 0
            ? 'A watch is a man\'s opinion of the time. That clock is set from Greenwich by wire every morning of its life and has never had an opinion about anything. Try again.'
            : 'Read them again, and mind which way round it goes: the watch says MORE than the clock does. A watch that says more than the world has run on ahead of it.');
          rerender();
          return;
        }
        if (step === 0) {
          g.sfx('click');
          g.setFlag('ckStep', 1);
          g.setFlag('ckMsg', '');
          rerender();
          return;
        }
        g.setFlag('ckStep', 0);
        g.setFlag('ckMsg', '');
        g.setFlag('corrected', true);
        g.sfx('success');
        g.addClue('greenwichTrue');
        g.closePuzzle();
        g.say([
          { text: 'Clock and watch, side by side under the gas, with a porter and a milk float for witnesses. The station clock says ' + ST[Math.min(g.getFlag('leg') || 0, LAST)].time + '. The watch in my hand says four minutes more, and goes on saying it, sweetly and steadily, exactly as it has said it all night.' },
          { who: 'Quinn', text: 'Four minutes. Every hour in that journal is four minutes further along than the night it describes. The Down Mail has been running through a private evening of its own since Euston — and one man wrote it all down in pencil in his own honest hand.' },
        ]);
      }));
    },
  },

  /* The mileposts: the verb at its purest. Count the quarter-posts on
     the watch's own second hand and the watch turns out to be perfect —
     which is the worst news the watch could possibly have given. */
  mileposts: {
    title: 'Counting the Quarter-Posts',
    wide: true,
    render(g) {
      const marks = g.getFlag('mpMarks') || 0;
      const times = ['0', '15&#189;', '31', '46&#189;'];
      const board = `<div class="trail-board"><svg viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg">
        ${Art.ch7.postStrip(460, 150, marks)}
      </svg></div>`;
      const read = marks === 0 ? 'the second hand at rest on the twelve'
        : 'post ' + marks + ' of 4 &mdash; ' + times[marks - 1] + ' seconds by the second hand';
      const done = marks >= 4;
      return `${board}
        <p class="puzzle-msg">${g.getFlag('mpMsg')
          || (done
            ? 'Three-quarters of a mile in forty-six and a half seconds. That is fifty-eight miles an hour, and the working timetable books this stretch at fifty-eight exactly. So what have I got in my hand?'
            : 'The quarter-posts come out of the dark and go back into it. Mark each one as it passes the glass &mdash; ' + read + '.')}</p>
        <div class="puzzle-controls">
          ${done ? `
            <button class="btn" data-act="say-0">A watch that keeps perfect rate &mdash; so it was SET wrong, by a hand</button>
            <button class="btn" data-act="say-1">A watch that runs fast &mdash; it is simply a broken watch</button>
            <button class="btn" data-act="say-2">A train losing time &mdash; we are late, and that is all</button>
          ` : '<button class="btn" data-act="mark">Mark</button>'}
        </div>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Leave the window</button></div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'mark') {
          g.sfx('click');
          g.setFlag('mpMarks', (g.getFlag('mpMarks') || 0) + 1);
          g.setFlag('mpMsg', '');
          rerender();
          return;
        }
        if (act !== 'say-0') {
          g.sfx('error');
          g.setFlag('mpMsg', act === 'say-1'
            ? 'A broken watch loses or gains as it goes. This one has just measured three-quarters of a mile against the printed timetable and agreed with it to the yard. It is not ill. That is the point.'
            : 'The posts and the timetable agree: fifty-eight, exactly as booked. The train is doing precisely what the book says. It is not the train that is out by four minutes.');
          rerender();
          return;
        }
        g.setFlag('mpMarks', 0);
        g.setFlag('mpMsg', '');
        g.sfx('success');
        g.addClue('watchOdd');
        g.closePuzzle();
        g.say([
          { text: 'Post, post, post, post — forty-six and a half seconds for three-quarters of a mile, taken off the second hand of the very watch that is supposed to have ruined a man. Fifty-eight miles an hour. Booked at fifty-eight.' },
          { who: 'Quinn', text: 'It keeps perfect rate. It would win a prize at any horological society in England. And a watch that runs true and reads wrong has not GONE wrong — it has been SET wrong, once, by a hand, and left to tick out an honest lie for four hundred miles. Somebody put those four minutes there, Mr. Hare. On purpose. And then sent you north with them.' },
        ]);
      }));
    },
  },

  /* Clause seven, reenacted. The player letters the frame exactly as
     the notice directs and watches the crown jewels walk into the
     catapult of their own accord. */
  pigeonholes: {
    title: 'Lettering the Frame, per Notice No. 41',
    wide: true,
    render(g) {
      const SACKS = [
        { id: 'ordA', label: 'Ordinary letters &mdash; Warrington' },
        { id: 'ordB', label: 'Ordinary letters &mdash; Preston' },
        { id: 'reg', label: 'The registered sack &mdash; for the north' },
      ];
      const POOL = ['A pouch (as booked)', 'B pouch (as booked)', 'F pouch (the trial exchange)', 'R &mdash; the strongroom'];
      const rows = SACKS.map(s => {
        const v = g.getFlag('pg_' + s.id);
        return `<div class="mark-row">
          <div style="flex:1"><strong>${s.label}</strong></div>
          <button class="btn" data-act="cyc-${s.id}">${v == null ? '?' : POOL[v]}</button>
        </div>`;
      }).join('');
      return `<p class="puzzle-msg">${g.getFlag('pgMsg')
        || 'Clause 7: <em>registered sacks for the north to be lettered F for the trial exchange.</em> Clause 9: <em>the Cadger&#8217;s Bank apparatus re-commissioned, one night only, for trial.</em> Letter the frame as the notice directs &mdash; exactly as Tench did, and no cleverer.'}</p>
        <div class="mark-rows">${rows}</div>
        <div class="puzzle-controls">
          <button class="btn" data-act="confirm">Letter it as the notice directs</button>
          <button class="btn" data-act="leave">Step back from the frame</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = { ordA: 0, ordB: 1, reg: 2 };   // A, B, and the registered sack to F
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'confirm') {
          const right = Object.keys(ANSWER).every(k => g.getFlag('pg_' + k) === ANSWER[k]);
          if (!right) {
            g.sfx('error');
            g.setFlag('pgMsg', 'That is not what the notice says, and Tench is not a man who improves on a notice. Ordinary sacks go where they are booked. And clause 7 has an opinion about the registered sack of the north that I would very much like the Inspector to hear.');
            rerender();
            return;
          }
          g.setFlag('reLettered', true);
          g.setFlag('pgMsg', '');
          g.sfx('success');
          g.addClue('pouchRoute');
          g.retireItem('notice41');
          g.closePuzzle();
          g.say([
            { text: 'A to the A pouch. B to the B pouch. And the registered sack of the north — by clause 7, in black and white, over the Superintendent\'s own signature — into F. The trial pouch. The pouch that hangs in the apparatus arm and gets thrown at a net at fifty-eight miles an hour.' },
            { who: 'Quinn', text: 'There it is. Clause 7 loaded the catapult and clause 9 built the net to catch it, and Tench read his orders and obeyed them, as he has obeyed them for twenty-two years without one letter astray. He chose nothing. He knew nothing. He was the instrument — and I have just been the instrument myself, in front of witnesses, in under a minute.' },
          ]);
          return;
        }
        const id = act.slice(4);
        const cur = g.getFlag('pg_' + id);
        g.setFlag('pg_' + id, cur == null ? 0 : (cur + 1) % 4);
        g.setFlag('pgMsg', '');
        rerender();
      }));
    },
  },

  /* The experiment: prove the impossible thing is routine. The arm goes
     out, the standard comes on, and the whole question is WHEN. */
  apparatus: {
    title: 'The Apparatus, at Fifty-Eight',
    wide: true,
    render(g) {
      const tick = g.getFlag('apTick') || 0;
      const dist = [220, 160, 100, 44, 6][Math.min(tick, 4)];
      const board = `<div class="trail-board"><svg viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="460" height="150" rx="8" fill="#0b1020"/>
        <rect x="0" y="118" width="460" height="32" fill="#14161c"/>
        <!-- the van side and its arm -->
        <rect x="0" y="40" width="60" height="80" fill="#2a3340" stroke="#57677d" stroke-width="3"/>
        <line x1="60" y1="70" x2="110" y2="70" stroke="#57677d" stroke-width="6"/>
        <path d="M 96 70 L 110 70 L 110 96 L 96 96 Z" fill="#6a4a30" stroke="#0a0c10" stroke-width="2"/>
        <!-- the lineside net, coming on -->
        <g transform="translate(${110 + dist} 0)">
          <rect x="-4" y="40" width="8" height="78" fill="#57677d"/>
          <path d="M 4 56 L 40 44 L 40 104 L 4 92 Z" fill="none" stroke="#7fd8d0" stroke-width="4"/>
        </g>
        <text x="300" y="26" text-anchor="middle" font-size="13" font-family="Georgia, serif" font-style="italic" fill="#9fb0c4">${dist > 60 ? 'the standard, coming on out of the dark' : dist > 20 ? 'nearly level &mdash; NOW, or never' : 'level'}</text>
      </svg></div>`;
      return `${board}
        <p class="puzzle-msg">${g.getFlag('apMsg')
          || 'Tench holds the door. The arm is out with my pouch on it, and the lineside standard is coming on at eighty-five feet a second. Count it on, and let her go when the net is level &mdash; not a beat before.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="wait">Count it on</button>
          <button class="btn" data-act="go">Let her go</button>
        </div>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Shut the door</button></div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.setFlag('apTick', 0); g.setFlag('apMsg', ''); g.closePuzzle(); return; }
        const tick = g.getFlag('apTick') || 0;
        if (act === 'wait') {
          if (tick >= 4) {
            g.sfx('error');
            g.setFlag('apTick', 0);
            g.setFlag('apMsg', 'Gone. The standard goes by with my pouch still swinging on the arm like a man missing his own train. Tench reels it in without comment and sets the next one. "They come every half-minute, miss."');
            rerender();
            return;
          }
          g.sfx('click');
          g.setFlag('apTick', tick + 1);
          g.setFlag('apMsg', '');
          rerender();
          return;
        }
        if (tick < 3) {
          g.sfx('error');
          g.setFlag('apTick', 0);
          g.setFlag('apMsg', 'Too soon: the pouch drops away into the dark forty yards short of anything and goes bouncing down the ballast. Tench, wordless, hooks another out of the locker. "Half a minute to the next one, miss."');
          rerender();
          return;
        }
        g.setFlag('apTick', 0);
        g.setFlag('apMsg', '');
        g.setFlag('armOut', true);
        g.sfx('crack');
        g.addClue('apparatusProof');
        g.retireItem('weightedPouch');
        g.closePuzzle();
        g.say([
          { text: 'BANG. The net takes it out of the air like a door slamming in another county, the arm swings back empty, and my pouch is lying in a wicker basket beside a Westmorland hedge doing nothing at all. Total elapsed time: rather less than a heartbeat.' },
          { who: 'Tench', text: 'That\'s all it is, miss. Forty a night. You get so you don\'t hear it.' },
          { who: 'Quinn', text: 'Forty a night. Inspector Rooke has built a man\'s ruin on the word IMPOSSIBLE, and the impossible thing is a chore this train does forty times between here and Scotland without slowing down. It wants only two things: a pouch in the arm, and a net waiting. Both of which somebody put in writing.' },
        ]);
      }));
    },
  },

  /* The finale: the subtraction Rooke never did. Every entry in the
     journal, minus the four minutes that were put in the watch — until
     two events land on the same minute and the case falls apart. */
  reconstruction: {
    title: 'The Subtraction',
    wide: true,
    render(g) {
      const STEPS = [
        { logged: '2.10', what: 'Sowerby Trough apparatus &mdash; exchange as booked', opts: ['2.06', '2.10', '2.14'] },
        { logged: '2.22', what: 'The registered sack received from the sorters, sealed unopened', opts: ['2.26', '2.22', '2.18'] },
        { logged: '2.30', what: 'Strongroom sealed. Tail lamp trimmed.', opts: ['2.34', '2.30', '2.26'] },
        { logged: '3.05', what: 'Crewe. Sack sealed, seals good, sack full of newspaper.', opts: ['3.01', '3.05', '3.09'] },
        {
          logged: '&mdash;', what: 'And at 2.26, by the world\'s own clock, what else was happening?',
          opts: [
            'Nothing whatever &mdash; Cadger\'s Bank was long behind us',
            'The Down Mail passed Cadger\'s Bank, and the trial pouch went into the net',
            'The guard opened the strongroom and took out the post',
          ],
        },
      ];
      const step = Math.min(g.getFlag('rcStep') || 0, 4);
      const s = STEPS[step];
      const ANSWER = [0, 2, 2, 0, 1];
      const done = (g.getFlag('rcStep') || 0);
      const strip = STEPS.slice(0, 4).map((r, i) => `<tr>
        <td style="padding:2px 10px;color:#9fb0c4">${r.logged}</td>
        <td style="padding:2px 10px;color:#9fb0c4">${r.what}</td>
        <td style="padding:2px 10px;color:${i < done ? '#7fd8d0' : '#3d4a5c'}">${i < done ? r.opts[ANSWER[i]] + ' true' : '&mdash;'}</td>
      </tr>`).join('');
      return `<div class="trail-board"><table style="width:100%;font-family:Georgia,serif;font-size:14px">
        <tr><td style="padding:2px 10px;color:#6a7a8e"><em>by the watch</em></td><td style="padding:2px 10px;color:#6a7a8e"><em>the entry</em></td><td style="padding:2px 10px;color:#6a7a8e"><em>by the world</em></td></tr>
        ${strip}
      </table></div>
        <p class="puzzle-msg">${g.getFlag('rcMsg')
          || (step < 4
            ? 'The watch is four minutes fast. His book says <strong>' + s.logged + '</strong>: &#8220;' + s.what + '&#8221; &mdash; so when was it, truly?'
            : s.what)}</p>
        <div class="puzzle-controls">
          ${s.opts.map((o, i) => `<button class="btn" data-act="say-${i}">${o}</button>`).join('')}
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = [0, 2, 2, 0, 1];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const step = Math.min(g.getFlag('rcStep') || 0, 4);
        if (Number(b.dataset.act.slice(4)) !== ANSWER[step]) {
          g.sfx('error');
          g.setFlag('rcStep', 0);
          g.setFlag('rcMsg', 'Rooke\'s eyebrow goes up, and quite right too — that sum is wrong, and a wrong sum in front of this man is worth less than silence. From the top: the watch reads FOUR MINUTES MORE than the world, so the world is always four minutes BEHIND what he wrote.');
          rerender();
          return;
        }
        if (step < 4) {
          g.sfx('click');
          g.setFlag('rcStep', step + 1);
          g.setFlag('rcMsg', '');
          rerender();
          return;
        }
        g.setFlag('ended', true);
        g.setFlag('rcStep', 0);
        g.sfx('success');
        g.retireItem('journal');
        g.retireItem('watch');
        g.closePuzzle();
        g.say([
          { who: 'Quinn', text: 'There is your case, Inspector, done properly. He sealed the strongroom at 2.30 by a watch four minutes fast — which is 2.26 by the world. And at 2.26 by the world, on the signalman\'s own register, the Down Mail passed Cadger\'s Bank and the apparatus was pulled off. Abel Hare had both hands on that door at the very second the trial pouch went into the net four feet behind his back.' },
          { who: 'Rooke', text: '...Both at 2.26.' },
          { who: 'Quinn', text: 'Both at 2.26. Your entire case was the four minutes between them, and the four minutes were never there. You had a man\'s watch on one side of your sum and a railway timetable on the other, and you called the pair of them one clock. They have not been one clock since twenty past eleven last night, when Mordaunt Vane put his thumb on a regulator in a locked room in London.' },
          { who: 'Rooke', text: 'Vane never came near this train, madam. He has not been out of Blackfriars in a year.' },
          { who: 'Quinn', text: 'He never needed to come near it. Clause 6 set every watch aboard. Clause 3 made your driver lose four minutes so the crew would think themselves late and never look twice. Clause 4 stopped your guard opening a sack that was stuffed with newspaper in London. Clause 7 walked the registered post into the trial pouch in Tench\'s honest hands. Clause 9 built the net to catch it. Five good men, Inspector, each doing one dull lawful thing exactly as ordered — and not one of them will ever be able to tell you what he did, because none of them did anything.' },
          { who: 'Quinn', text: 'You have been hunting a thief on this train all night. There has never been a thief on this train. The robbery was committed at a desk, in ink, four hundred miles behind us, by a man who has an alibi for every second of it because he wrote it down in advance and signed it. It is the only confession I have ever met that was circulated to eleven departments.' },
          { who: 'Rooke', text: '...Nib! NIB, damn you, tell your driver to make Carlisle before six or I\'ll fire the thing myself. Madam — the wire office at Carlisle opens at five. I mean to have Mordaunt Vane out of his bed by seven, and I should like you standing behind me while I do it, because I am going to have to say all of this ALOUD.' },
          { who: 'Hare', text: '...Miss. My watch. Was it ever right? In thirty year, was it ever right at all?' },
          { who: 'Quinn', text: 'It was right every second of every one of those thirty years, Mr. Hare, and it was right tonight, and it will be right tomorrow. That is the whole trouble with honest things. Somebody moved it four minutes and it went on telling the truth about a lie, faithfully, all the way to Crewe — exactly as they knew you would.' },
        ], g2 => {
          g2.addClue('resolution');
          g2.endChapter();
        });
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch7 = {
  id: 'ch7',
  order: 7,
  title: "The Guard's Watch",
  subtitle: 'Chapter Seven — The Down Night Mail',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'guardsVan',

  /* The one line of state the player must never lose: where we are in
     the night, and whether the night is still moving. */
  status: g => {
    const leg = Math.min(g.getFlag('leg') || 0, LAST);
    if (g.flag('final')) return '5.40 — the last stage: Penrith to Carlisle';
    if (g.flag('moving')) return 'running — ' + ST[leg].name + ' to ' + ST[Math.min(leg + 1, LAST)].name;
    return ST[leg].time + ' a.m. — standing at ' + ST[leg].name;
  },

  intro: [
    { text: 'The Down Night Mail, the 14th of March, somewhere in the small hours: forty feet of sorting van doing fifty-eight miles an hour through a country with all its lamps out.' },
    { text: 'At Crewe they opened the registered strongroom and found the sack exactly where it should be — sealed, seals good, and stuffed to the throat with yesterday\'s evening paper. Somewhere between Rugby and Crewe, on a train that stopped nowhere, the registered post of the north got off.' },
    { who: 'Rooke', text: 'Investigation Branch, madam, and I don\'t require your assistance. It is arithmetic. The sack was sealed in at 2.30. The last lineside apparatus was passed at 2.26. Four minutes too late to leave, one key, one keeper. At Carlisle I put the guard in irons.' },
    { who: 'Quinn', text: 'Your 2.30 came off a man\'s watch, Inspector. Your 2.26 came off a printed timetable. Those are two clocks, and you have added them together as if they were one — which is the most expensive piece of arithmetic I have seen this year.' },
    { who: 'Quinn', text: 'Carlisle at five past six. Five stops, one telegraph key, and a night that will not slow down for either of us. Let us find out which clock is lying.' },
  ],

  /* Ordered two-tier hints. These nudge the THINKING, never the action:
     no rung names the four minutes before they are earned, names a
     pouch letter, or names Vane. */
  hints: [
    {
      when: g => !g.hasClue('hareSays') || !g.hasClue('rookeCase') || !g.hasClue('hareLog'),
      nudge: 'Three things before anything else: the man they mean to hang, the man who means to hang him, and the book the whole quarrel is about.',
      more: 'Hare is in his own van and will give you anything you ask for, including the one object he trusts most. Rooke is forward in the carriage with his case on his knee. The journal is on the guard\'s desk — and take the wire blanks beside it while you are there.',
    },
    {
      when: g => !g.hasClue('greenwichTrue'),
      nudge: 'Every figure in that journal came out of one small object in a waistcoat pocket, and nobody in this affair has ever once checked it against anything.',
      more: 'A station platform has a clock on it that is set from Greenwich by wire every morning. Hold the one up against the other and see whether they are telling the same night.',
    },
    {
      when: g => !g.hasClue('wireBox') || !g.hasClue('wireOffice'),
      nudge: 'You cannot go back down the line — but a question can. The hatch on the platform will send anything you like, and the answer will be waiting for you one stop further north.',
      more: 'Two questions are worth a stop each: what the signal box behind us saw between two and three, and what a certain clock in London has been doing. Ask early; every stop you spend is a stop you have not got. And Penrith is the last wire in England.',
    },
    {
      when: g => !g.hasClue('watchOdd'),
      nudge: 'A wrong watch is not evidence — Rooke will tell you so, and he is right. It matters enormously WHY it is wrong, and there are only two possibilities.',
      more: 'A sick watch and a tampered one look identical on a platform. They do not look identical against three-quarters of a mile of quarter-posts and a printed timetable. Do that from the window, while she is running.',
    },
    {
      when: g => !g.hasClue('ballastLondon') || !g.hasClue('sealHonest'),
      nudge: 'Everyone in this affair has been arguing about the sack and nobody has looked inside it. It is still in the strongroom, and the strongroom has no window.',
      more: 'The Inspector holds the only key and will part with it once you have shown him something he cannot answer. Then you will want a light — there is a lantern on the guard\'s rack and oil on the footplate, and an engine can only be reached from a platform.',
    },
    {
      when: g => !g.hasClue('sherrickSlack') || !g.hasClue('tenchLettering'),
      nudge: 'Five people did their work perfectly tonight. Ask each of them what they were told to do, and by whom — the answer is the same answer every time.',
      more: 'The driver at the front (walk up from a platform while she stands) and the sorter amidships. Neither has anything to hide. That is what is wrong with them.',
    },
    {
      when: g => !g.hasClue('noticeClauses'),
      nudge: 'Every honest man on this train keeps saying the same four words: "per the notice, miss." Somebody ought to read the notice.',
      more: 'A copy is pinned to the sorters\' bulkhead, and a better copy is riding north in the Inspector\'s dispatch case as background. He will open it once you can show him both that the watch was set by a hand and that the dummy was built before the train left.',
    },
    {
      when: g => !g.hasClue('pouchRoute'),
      nudge: 'The notice does not accuse anybody. It instructs them. The fastest way to understand what it did is to obey it yourself, at the frame, exactly as written.',
      more: 'Letter the sorting frame as the notice directs — ordinary sacks as booked, and the registered sack of the north wherever clause 7 says it goes. Do not be cleverer than Tench was.',
    },
    {
      when: g => !g.hasClue('apparatusProof'),
      nudge: 'Rooke\'s whole case leans on the word "impossible". Test it. This train has the apparatus for it and does the impossible thing forty times a night.',
      more: 'A spare pouch hangs in the sorting van and there is a weighted strap in the tail-lamp locker; an empty pouch is a handkerchief. Then open the arm — with a road under us, not standing — and let her go when the net is level, not a beat before.',
    },
    {
      when: () => true,
      nudge: 'You have every piece. What you have not done is the sum — the one the Inspector never did, entry by entry, out loud, with four minutes taken off each.',
      more: 'Get her away from Penrith and make the case to Rooke in the guard\'s van before the buffers. Take his journal line by line, and watch what happens when two of those entries land on the same minute.',
    },
  ],

  end: {
    kicker: 'Chapter Seven Complete',
    title: "The Guard's Watch",
    body: 'Mordaunt Vane was taken at his desk at seven, under a regulator clock now keeping perfect time; the registered post of the north was recovered from a hayloft two fields from Cadger\'s Bank, less eleven pounds spent on a horse. ' +
      'Tench sorted the down mail that same night, per the notice. Sherrick lost four minutes at Cadger\'s Bank for permanent way and has never lost a minute since without getting out to look. ' +
      'Abel Hare had his watch back on the platform at Carlisle and would not take it — so Ivy Quinn wound it, set it by the station clock, and put it in his hand herself. "It never lied to you, Mr. Hare. It was simply asked the wrong question. So was everybody on that train." He kept it. He checks it against Greenwich every morning of his life, and has never once found it wrong.',
    next: null,
  },
};

})();
