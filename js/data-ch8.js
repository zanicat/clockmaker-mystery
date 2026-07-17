/* Data: items, combinations, scenes, puzzles and chapter script for
   Chapter Eight — "The Ratcatcher's Nine".

   Gullscombe, a stacked Cornish harbour town, three weeks after the
   death of Jeremiah Pike, ratcatcher. The town knows two things about
   Pike: that forty years of bounties and one enormous salvage award
   went into his pockets, and that not one shilling was ever seen to
   come out. Somewhere, therefore, is Pike's hoard — and somebody
   wants it badly enough to force his strongbox, pry his floors, and
   turn his niece's room out twice in a week. The town has decided the
   niece found it first. The magistrate's man comes Friday, with a
   thirty-year-old note of Silas Grebe's against the estate.

   The truth: there is no hoard, and there never was a rent book. The
   wreck of the NINE SISTERS took nine Gullscombe men in '58; Pike dove
   her cargo for the underwriters and was paid a fortune the town never
   forgave him. He spent thirty years quietly giving every penny of it
   back — the lifeboat, the widow's roof, the bakehouse books, the
   light's oil, the bell — nine columns, one for each man the sea kept,
   delivered along his cats' daily rounds, because nobody watches the
   man when there's a cat in the room. The ninth column is the man
   hunting the hoard: Pike bought Grebe's boat back from the receivers
   and let him call it luck.

   Verb: coax/befriend. The chapter's novelty is THE COMPANION: one
   befriended cat follows at heel (flag `withCat`), is painted into
   every scene, and opens what only a cat can open — the ratter flushes
   the floor-void, the climber robs the jackdaws' nest, the latch-worker
   lets herself into the boathouse. The status chip is who walks with
   you.

   NOTE: keep flags scalar; array-valued flags must never be mutated in
   place (setFlag persists). This chapter uses scalars throughout. */

window.CHAPTERS = window.CHAPTERS || {};

(() => {

const CAT_NAMES = { pilchard: 'Pilchard', tar: 'Tar', duchess: 'Duchess', hapenny: 'Ha’penny' };

const ITEMS = {
  sprat: {
    name: 'A Smoked Sprat',
    desc: 'One smoked sprat, from the string over Hetty\'s stall. The whole quay feeds Pilchard fresh fish and he despises the lot of them for it; this, says Hetty, is the only thing he ever begged off Pike, and he had to sit through a pipe\'s worth of conversation to get it.',
    icon: Art.ch8.icons.sprat,
  },
  cream: {
    name: 'A Jug of Cream',
    desc: 'A penny jug of cream, surrendered by Hetty with the face of a woman arming a diplomat. "Her ladyship takes cream. And she takes it like an apology, mind — not like a bribe. There\'s a difference, and she knows it."',
    icon: Art.ch8.icons.cream,
  },
  driftwood: {
    name: 'Driftwood',
    desc: 'An armful of the tide\'s own firewood, salt-white and dry as biscuit under the top layer. Wood the sea has already had once burns with a green in it, they say here. It will do for a stove that has been cold three weeks too long.',
    icon: Art.ch8.icons.driftwood,
  },
  vestas: {
    name: 'Storm Vestas',
    desc: 'Wick\'s tin of storm vestas, which strike in a gale and would probably strike underwater out of stubbornness. "Bring the tin back," he said, and then, "no hurry," which from a lighthouse keeper is a declaration of love.',
    icon: Art.ch8.icons.vestas,
  },
  scarf: {
    name: 'Pike\'s Scarf',
    desc: 'A knitted scarf the colour of old rust, off the arm of his chair. It smells of shag tobacco and salt and something greener — cheap violet hair-oil, of all things. A man wears a scarf; a scarf, given time, wears the man.',
    icon: Art.ch8.icons.scarf,
  },
  bell: {
    name: 'The Rat-Pole Bell',
    desc: 'The little brass bell off Pike\'s rat-pole. Tansy says he rang it at his own door each evening and the cats came out of the fog like the tide coming in. A dinner gong, a curfew, and a roll-call, in one note.',
    icon: Art.ch8.icons.bell,
  },
  pikesThings: {
    name: 'Pike\'s Things',
    desc: 'The scarf, with the bell knotted into one corner the way a sailor keeps a shilling. The smell of him and the sound of him. It is not much of a man to bring back. It may be exactly enough of one for a cat.',
    icon: Art.ch8.icons.pikesThings,
  },
  tinTag: {
    name: 'Winkle\'s Tag',
    desc: 'A brass collar tag out of the jackdaws\' nest, stamped with a bell. Not a rune, not a cipher, not a compass bearing to buried gold: a bell — and there is exactly one bell in Gullscombe, and it hangs at the old light where Winkle sleeps. It is an address.',
    icon: Art.ch8.icons.tinTag,
  },
  ledger: {
    name: 'The Rent Book',
    desc: 'Pike\'s famous ledger, from the one cupboard the visitor never forced — the cats\'. Nine columns, headed in little marks, kept in a fair hand for thirty years. The town swears it is a rent book. Nobody ever asked the obvious question: rents on WHAT? The man didn\'t own a window-box.',
    icon: Art.ch8.icons.ledger,
  },
  passbook: {
    name: 'The Bank Book',
    desc: 'A passbook on the Penwithick Marine Bank, left lying in a forced strongbox by a burglar who wanted treasure and found arithmetic. Deposits like clockwork for thirty years — and against every one of them, the same month, a withdrawal to bearer. The tide came in; the tide went out, same day.',
    icon: Art.ch8.icons.passbook,
  },
  packet: {
    name: 'The Oilcloth Packet',
    desc: 'An oilcloth packet, tarred twine, dry as the day it was hidden — banked under the floor in the one vault in Gullscombe guarded by rats and known only to cats. Receipts. A slater\'s bill marked paid. A boatbuilder\'s account, settled. A receivers\' release. Paper that has been keeping a secret for decades, and is visibly relieved to stop.',
    icon: Art.ch8.icons.packet,
  },
  scrap: {
    name: 'A Canvas Scrap',
    desc: 'A torn corner of oiled canvas off the nail of Pike\'s window — heavy sail-cloth, herring-bone stitching in tarred twine, done by a man used to mending at sea. Somebody left Pike\'s loft through the window in a hurry, and paid toll on the way out.',
    icon: Art.ch8.icons.scrap,
  },
};

const COMBOS = {
  'bell+scarf': g => {
    g.removeItem('bell');
    g.removeItem('scarf');
    g.addItem('pikesThings');
    g.sfx('stow');
    g.narrate('I knot the bell into the corner of the scarf, the way a sailor keeps a shilling. The smell of the man and the sound of the man, together in one pocketable ghost. If she will not come to Gullscombe\'s idea of Pike, she may come to her own.');
  },
};

const CLUES = {
  theCase: {
    title: 'Pike\'s hoard',
    text: [
      'Jeremiah Pike, harbour ratcatcher, dead three weeks of nothing but eighty-one years. Town legend gives him a fortune: forty years of bounties and the great salvage award of \'59, never once seen to be spent. Since the funeral: his strongbox forced, his floors pried, his niece\'s room turned out twice, and every garden on the Stairs dug over by moonlight.',
      'Tansy Pike inherited a cottage, nine cats, and the ill-will of a town that believes she found the money first. Silas Grebe holds a thirty-year-old note against the estate, and the magistrate\'s man comes Friday. Find the hoard, or prove there is none — and quickly.',
    ],
  },
  hettySays: {
    title: 'What the quay believes',
    text: [
      '"Rent book, they call it. Nine columns, and his cats walked the collecting rounds for him — you\'d see one at a door of a morning, regular as a postman, and old Pike shuffling up after it. Collecting, see. Where\'s it all GONE, is what the town wants to know."',
      'And in the same breath: Pilchard has called at her door every morning since her Tom drowned — and her roof was re-slated that same autumn, paid by nobody she ever found, and she has stopped asking because the not-knowing is company of a kind.',
    ],
  },
  grebeClaim: {
    title: 'Grebe\'s note',
    text: [
      '"Half of what the sea gave us, signed J. Pike. He dove the NINE SISTERS and I crewed his boat over the bar to do it, and I never saw my half. Thirty years I let it lie. I\'ll have it off his estate now, or I\'ll have the cottage." The paper is real, the signature is real, and the grievance has been fed daily for thirty years, like a dog kept mean.',
      'He would not meet my eye, and his sloop rides low — a man living aboard, out of a sea-bag, while he waits to be paid. Whatever Silas Grebe is, he is not a man who found a hoard.',
    ],
  },
  nineSisters: {
    title: 'The Nine Sisters',
    text: [
      'Wick watched it from the gallery, the whole town did: the NINE SISTERS coming home ahead of the gale of \'58 and dying on the harbour bar in sight of her own moorings, with nine Gullscombe men aboard. No boat could live on the bar to reach them. The town buried eight; the sea kept one back a fortnight, to be cruel.',
      'The cargo was tin, insured in London. Pike — the harbour\'s best diver, a young man then — raised it for the underwriters over the year that followed, and was paid a fortune for it. "He grew rich diving through our drowned men\'s rigging," they said, and stopped saying good morning. He never spent a visible penny of it in his life.',
    ],
  },
  bellOil: {
    title: 'The bell, and the oil',
    text: [
      'The harbour bell — the Nine, they call it, rung for fog and funerals — cracked in \'67 and was recast within the year, RECAST 1868, paid for by a subscription. Wick, who has kept the light fifty years, cannot name one man who subscribed.',
      'And when the Trinity House men cut the oil allowance in the lean years, the light never went dim, and Wick never went short, and the oil merchant\'s bill was always somehow squared. "I told myself the Lord provided. The Lord, or somebody local."',
    ],
  },
  ledgerRiddle: {
    title: 'The rent book',
    text: [
      'Nine columns, headed not in names but in little stamped marks — a herring, a loaf, a sail, an oar, a bell, an anchor, a kettle, a boot, a book. Under each, thirty years of dates and small sums in shillings, entered in a fair hand, never missed, never late.',
      'The town reads it as rents collected and asks where the money went. But nothing in this book says COLLECTED. A column of small sums is a column of small sums. It does not tell you which way the shillings were walking.',
    ],
  },
  passbook: {
    title: 'The bank book',
    text: [
      'Penwithick Marine Bank. The salvage award enters in \'59 — a figure that makes the clerk\'s ruled lines look frightened — and then, month upon month for thirty years, the same tide: bounties and interest in, and a withdrawal to bearer out, the same week, regular as the Nine rung for fog.',
      'The burglar had this in his hands and threw it down as worthless. It is the whole story. Pike was not filling a chest. He was emptying one, on schedule, for thirty years — and a man who empties a chest for thirty years dies with exactly what Pike died with: eleven shillings and a houseful of cats.',
    ],
  },
  scrapClue: {
    title: 'The snag on the nail',
    text: [
      'Oiled sail-canvas, torn from a coat or a slop-jacket on the nail of Pike\'s window — the window a visitor used twice, at night, in a hurry. Herring-bone stitching in tarred twine: a sea-going mend, done aboard, by a man whose needlework answers to nobody.',
      'The town\'s night visitor does not live in the town. He rides at its moorings.',
    ],
  },
  receipts: {
    title: 'The oilcloth packet',
    text: [
      'Banked under the floorboards, in the rat-run — the one vault in Gullscombe with teeth. Item: Penberthy, slater — the widow Brill\'s roof, done and paid, J.P. Item: Blyth & Sons, Padstow — one lifeboat, No. 114, paid in full, and let her be named NINE SISTERS. Item: the receivers\' release on a seized sloop, bought back entire by "a gentleman\'s agent, name withheld by instruction."',
      'Thirty years of paid bills where a hoard was supposed to be. Every receipt is a shilling from the rent book, caught in the act of walking the wrong way.',
    ],
  },
  tagTruth: {
    title: 'What the tags say',
    text: [
      'The town believes the nine collar tags are a treasure-writing — nine runes that lead to the hoard, which is why two have already been thieved off living cats. Held against the rent book, they are something better: the tag marks and the column marks are the same marks. A herring. A loaf. A sail. An oar. A bell.',
      'There is one herring sign on the quay — Hetty\'s. One bell — the light. Not runes. ADDRESSES. Each cat wears the door it calls at, and each column is that door\'s account. His ledger had fur on it and walked itself.',
    ],
  },
  lifeboatGift: {
    title: 'The gift of a friend',
    text: [
      'The dedication board in the boathouse: LIFEBOAT — NINE SISTERS. The gift of a friend, 1859. Blyth & Sons, Padstow, No. 114 — the same account, the same boat number, as the builder\'s receipt in Pike\'s packet.',
      'The year after the sea took nine men off the bar because no boat could live to reach them, a boat that could arrived, anonymously, named for them. The town has thanked "a friend" for thirty years without once wondering why the friend never came forward. He was standing next to them the whole time, smelling of rats and violet hair-oil.',
    ],
  },
  catsVerdict: {
    title: 'The ninth round',
    text: [
      'Every night, the grey cat — Ha\'penny, Pike\'s own shadow, that no hand in Gullscombe has ever touched — crosses the quay and takes up her post on the cabin roof of the Bonaventure. Grebe shoos her off; she comes back like fog. The town reads it as haunting.',
      'It is a delivery round with nothing left to deliver. The anchor column. She has kept it every night since the funeral, waiting for the shuffling step that used to follow her down.',
    ],
  },
  roundsRead: {
    title: 'The rounds, read right',
    text: [
      'Set a door to every mark and the rent book confesses: the herring is Hetty\'s door, the loaf the bakehouse books, the sail Pentreath\'s lease, the oar the lifeboat\'s upkeep, the bell the light and its oil. Nine columns for nine households — and every household in the book lost a man on the NINE SISTERS, or kept the town alive after she went down.',
      'Not rents in. Gifts out. Thirty years of them, delivered along the cats\' rounds, because nobody watches the man when there\'s a cat in the room. The hoard is not hidden. It is SPENT, shilling by shilling, into the walls of this town — and the town has been living inside it, calling it luck.',
    ],
  },
  resolution: {
    title: 'Said aloud, under the bell',
    text: [
      'Nine cats for nine men. He could not give the sea back its dead, so he fed its living, and he chose for company the one animal that would never thank him, gossip about him, or forgive him in public. The ninth column was Silas Grebe: the survivor the town could not look at, whose seized sloop was bought back whole by "a gentleman\'s agent" — half of what the sea gave, paid over in full and in secret, to the man who believed himself robbed of it.',
      'Grebe put the note in the fire himself, and asked for a hammer and a morning, and mended the loft window he came through. The magistrate\'s man arrived Friday and found nothing to hear.',
    ],
  },
};

// ---------- the companion: one cat at heel, the chapter's novelty ----------

const heelCat = g => g.getFlag('withCat') || null;

/* Call a befriended cat to heel; whoever held the post goes back to it. */
function callCat(g, id, line) {
  g.setFlag('withCat', id);
  g.sfx('meow');
  g.narrate(line);
}

const SCENES = {

  // ---------- the quay ----------

  quay: {
    name: 'The Quay',
    art: Art.ch8.quay,
    onEnter: g => {
      if (heelCat(g) === 'hapenny' && !g.hasClue('catsVerdict')) {
        g.say([
          { text: 'At the water\'s edge Ha\'penny leaves my heel without a glance — crosses the quay, takes the mooring line like a gangway, and sits herself down on the cabin roof of the Bonaventure. Grebe\'s voice comes up out of the hull, profane and defeated. She does not move. She is not visiting. She is on duty.' },
          { who: 'Quinn', text: 'The anchor column. She has kept his ninth round every night since they buried him, waiting for the step that used to follow her down. The cats were never collecting anything, and this one is still delivering — to the one door in Gullscombe that never knew it was owed.' },
        ], g2 => g2.addClue('catsVerdict'));
      }
    },
    hotspots: [
      {
        id: 'tansyQuay', rect: [1310, 480, 150, 300], label: 'Tansy Pike',
        visible: g => !g.flag('tansyMet'),
        onClick: g => {
          g.say([
            { who: 'Tansy', text: 'Miss Quinn. Thank heaven. I\'d have known you off the packet even without the description — you\'re the only soul on this quay looking at things instead of at me.' },
            { who: 'Quinn', text: 'You wrote that your uncle left you a cottage, nine cats, and a treasure you haven\'t got.' },
            { who: 'Tansy', text: 'The town says forty years of rat bounties and the salvage money from the Nine Sisters, and not a penny ever spent. They\'ve dug the gardens on the Stairs. Somebody\'s been through his loft twice by night — through my room, miss. And now Silas Grebe waves a paper worth two hundred pound at the estate, and the magistrate\'s man comes Friday, and if there\'s no hoard found the cottage settles it.' },
            { who: 'Quinn', text: 'Then we shall want the hoard, or proof it never was. Towns are seldom wrong about money existing, Miss Pike. They are almost always wrong about where it went.' },
            { who: 'Tansy', text: 'I\'ll be up at the loft. He\'d have liked you seeing it as it is — he never held with tidying for company. The company came for the rats.' },
          ], g2 => {
            g2.addClue('theCase');
            g2.setFlag('tansyMet');
          });
        },
      },
      {
        id: 'hetty', rect: [520, 420, 240, 300], label: 'Hetty Brill, at her stall',
        onClick: g => {
          if (!g.hasClue('hettySays')) {
            g.say([
              { who: 'Hetty', text: 'You\'ll be the detective. Sprat for your thoughts, then: yes, there\'s a hoard, no, I never dug for it, and the child up at the loft never hid it neither, whatever the Stairs says over its washing.' },
              { who: 'Quinn', text: 'Tell me about the rent book.' },
              { who: 'Hetty', text: 'Nine columns, kept like scripture. And his cats walked the rounds for him — you\'d see one at a door of a morning, regular as the post, and Pike shuffling up after. Collecting, see. Pilchard\'s called at mine every morning for thirty year — since my Tom drowned. And my roof got done that same autumn, and no slater ever sent me a bill, and I\'ve given up asking who.' },
              { who: 'Quinn', text: 'A collecting round that leaves a roof behind it. Mrs. Brill, I have known some very poor rent collectors, but never one who paid.' },
              { who: 'Hetty', text: 'Here — take a sprat off the string. Smoked, mind. That great marmalade lump at the tide-post won\'t look at fresh; the whole quay feeds him fresh. Smoked was Pike\'s trick, and he made the beast sit through a pipe\'s worth of talk for it, like a proper toll.' },
            ], g2 => {
              g2.addClue('hettySays');
              g2.addItem('sprat');
            });
            return;
          }
          if (g.flag('duchessSeen') && !g.flag('creamGiven')) {
            g.setFlag('creamGiven');
            g.addItem('cream');
            g.say([
              { who: 'Quinn', text: 'The white cat, in the sail-loft window. What does she take?' },
              { who: 'Hetty', text: 'Her ladyship? Cream, and nothing but, and she takes it like an apology — not like a bribe, there\'s a difference and she knows it. Here\'s the jug. And whatever you do, don\'t STARE at her. She\'s buried better manners than yours and mine, that one.' },
            ]);
            return;
          }
          if (g.hasClue('roundsRead') && !g.flag('hettyTold')) {
            g.setFlag('hettyTold');
            g.say([
              { who: 'Quinn', text: 'Mrs. Brill. The herring column. Thirty years of it. It was never rent, and Pilchard was never collecting.' },
              { who: 'Hetty', text: '...The roof. The fish money I put down to Tom\'s club, all these years, only there never was a club, was there. Thirty year that man let me short-weight him on a Friday and never once— oh, drat the man. Drat him. Give her ladyship my cream and drat the man.' },
            ]);
            return;
          }
          g.say([{ who: 'Hetty', text: 'Fog\'ll lift by eight. It always lifts for the verdict, fog.' }]);
        },
      },
      {
        id: 'grebe', rect: [960, 340, 440, 270], label: 'Silas Grebe, aboard the Bonaventure',
        onClick: g => {
          if (!g.hasClue('grebeClaim')) {
            g.say([
              { who: 'Grebe', text: 'Detective, is it. Then detect this, and save the boot leather: half of what the sea gave us, signed J. Pike, his own hand. I crewed his boat over the bar every dive of that year, and I never saw my half. Thirty years I let it lie. I\'ll have it off the estate Friday, or I\'ll have the cottage instead.' },
              { who: 'Quinn', text: 'You were aboard the Nine Sisters, Mr. Grebe.' },
              { who: 'Grebe', text: 'And off her alive, which this town has never pardoned. Eight better men drowned and Gullscombe got me back, and you\'d think I\'d picked the exchange myself. I moved up the coast where the luck could breathe. Now sheer off. Some of us have a claim to sit on.' },
              { who: 'Quinn', text: 'A real paper, a real signature, and a grievance fed daily for thirty years, like a dog kept mean. And a sloop riding low at the waterline. Whatever this man is, he is not a man who has found a hoard.' },
            ], g2 => g2.addClue('grebeClaim'));
            return;
          }
          if (g.hasClue('scrapClue') && g.hasItem('scrap') && !g.flag('scrapShown')) {
            g.setFlag('scrapShown');
            g.retireItem('scrap');
            g.say([
              { who: 'Quinn', text: 'Your slop-jacket wants a patch, Mr. Grebe. Oiled canvas, herring-bone stitch, tarred twine — a sea mend. The nail of Pike\'s window kept the corner of it, the second night you went through.' },
              { who: 'Grebe', text: '...A man may patch a sail with any cloth on this coast, and stitch it any way his father taught him.' },
              { who: 'Quinn', text: 'He may. And a man owed two hundred pounds may grow tired of waiting on magistrates and go looking for his own half by lantern-light, breaking nothing but a window-latch and a dead man\'s privacy. You found no hoard, because you were looking for the wrong thing in the right house. When I have found the right thing, Mr. Grebe, you will want to be there to hear it. You above anyone in Gullscombe.' },
              { who: 'Grebe', text: 'There\'s nothing this town can say to me that I\'d cross a road to hear.' },
            ]);
            return;
          }
          if (g.hasClue('roundsRead')) {
            g.say([{ who: 'Grebe', text: 'That grey devil of his was on my cabin roof again all night. Shoo it off, it comes back like fog. Dead three weeks and the man still has eyes on my deck.' }]);
            return;
          }
          g.say([{ who: 'Grebe', text: 'Friday, detective. Papers beat fairy tales on Friday.' }]);
        },
      },
      {
        id: 'shadow', rect: [1090, 380, 140, 90], label: 'A grey shape on the cabin roof',
        visible: g => !g.flag('hapennyWon'),
        onClick: g => {
          if (g.hasClue('ledgerRiddle') && !g.hasClue('catsVerdict')) {
            g.say([
              { text: 'The grey cat. Ha\'penny — Pike\'s own shadow, the one no hand in Gullscombe has ever touched. She sits on the Bonaventure\'s cabin roof like a figure on a clock, facing the town, perfectly still. Grebe swears she is there every night, and swears at her every night, and every night she comes back like fog.' },
              { who: 'Quinn', text: 'Cats do not haunt, whatever the Stairs thinks. They keep ROUNDS. Nine columns in that book — and here is a round still being walked, nightly, to the deck of the one man in this affair who is owed something. I begin to want the ninth column very much indeed.' },
            ], g2 => g2.addClue('catsVerdict'));
            return;
          }
          g.narrate('A grey shape on the sloop\'s cabin roof, exactly the colour of the hour. When I look again it has not moved, which is somehow worse than if it had. Pike\'s ninth cat, the quay says — the one nobody touches, the one that touched nobody but him.');
        },
      },
      {
        id: 'tidepost', rect: [780, 530, 150, 310], label: 'Pilchard, at the tide-post',
        visible: g => heelCat(g) !== 'pilchard',
        onClick: g => {
          if (g.flag('pilchardWon')) {
            callCat(g, 'pilchard', 'Pilchard rises, stretches fore and aft like a man paid by the hour, and falls in at my heel. Wherever we are going, his manner says, there had better be employment for a professional.');
            return;
          }
          if (g.hasItem('sprat')) { g.openPuzzle('lure'); return; }
          g.narrate('A marmalade tom the size of a kettle, stationed on the tide-post like customs. He watches me the way the town does — from behind a wall of previous disappointments. The quay feeds him fresh fish all day and he takes it as tribute, not friendship. If I want the freedom of his harbour, I shall need the thing he actually wants, and somebody here will know what that is.');
        },
        use: {
          sprat: g => {
            if (g.flag('pilchardWon')) { g.narrate('Won is won. He would take it, mind. He would take the string too.'); return; }
            g.openPuzzle('lure');
          },
        },
      },
      {
        id: 'woodpile', rect: [100, 700, 190, 140], label: 'The tide\'s woodpile',
        visible: g => !g.flag('driftwoodTaken'),
        onClick: g => {
          g.setFlag('driftwoodTaken');
          g.addItem('driftwood');
          g.narrate('The tide keeps its own woodpile against the harbour wall, salt-white and dry under the top layer. I take an armful. Somewhere above me is a stove that has been cold three weeks, and a chapter of this town that went cold with it.');
        },
      },
      {
        id: 'boathouse', rect: [60, 300, 300, 360], label: 'The lifeboat house',
        onClick: g => {
          if (g.flag('boathouseOpen')) { g.openZoom('boathouse'); return; }
          if (heelCat(g) === 'duchess') {
            g.setFlag('boathouseOpen');
            g.sfx('unlock');
            g.say([
              { text: 'Duchess considers the gap under the doors, finds it beneath her, and uses it anyway. A soft thump; a small ladylike grunt of effort; and the latch goes over inside like a shot bolt. The doors swing to the tide\'s own push. Every parlour in Gullscombe has paid cream for that trick, and none of them ever got the doors opened for their money.' },
              { who: 'Quinn', text: 'The coxswain bars it while the paint dries, Hetty says. Nobody bars it against the sail loft\'s cat.' },
            ], g2 => g2.openZoom('boathouse'));
            return;
          }
          g.narrate('Barred from within while the new paint dries, and the coxswain abed. But the doors have sagged a hand\'s breadth off the sill, and the gap under them is exactly the size of a cat with an education. I happen to know where such a cat sits, looking as if she owns the freehold.');
        },
      },
      {
        id: 'stairsUp', rect: [1420, 300, 170, 470], label: 'Up the Harbour Stairs',
        onClick: g => g.goTo('stairs'),
      },
    ],
    zooms: {
      boathouse: {
        title: 'The Lifeboat House',
        art: Art.ch8.boathouseZoom,
        hotspots: [
          {
            id: 'board', rect: [430, 150, 360, 200], label: 'The dedication board',
            onClick: g => {
              if (g.hasClue('lifeboatGift')) { g.narrate('The gift of a friend, 1859. The friend smelled of rats and violet hair-oil, and stood in this town\'s weather for thirty years without correcting it.'); return; }
              g.sfx('page');
              g.addClue('lifeboatGift');
              g.say([
                { text: 'LIFEBOAT — NINE SISTERS. The gift of a friend, 1859. Blyth & Sons, boatbuilders, Padstow. No. 114.' },
                { who: 'Quinn', text: 'The year after the bar took nine men because no boat could live to reach them, a boat that could arrived — anonymously, and named for them. The town has toasted "a friend" for thirty years and never once asked why the friend declined to exist. Blyth & Sons, boat No. 114: if I ever find that account settled in a private hand, this case is over.' },
              ]);
            },
          },
          {
            id: 'bosun', rect: [560, 400, 170, 100], label: 'Bosun, on watch',
            onClick: g => g.narrate('A black-and-white ship\'s cat of tremendous tonnage, asleep in the lifeboat with the entitlement of a founder. The tag on his collar is stamped with an oar. Bosun has slept aboard her every night for years, the quay says — keeps the rats out of the cork, they say. Keeps a round, say I, and begins to make the book in my pocket look less like rents with every passing minute.'),
          },
          {
            id: 'boat', rect: [240, 420, 740, 180], label: 'The lifeboat herself',
            onClick: g => g.narrate('Fresh navy paint, fresh white sheer-strake, oars chocked, cork jackets on their pegs. Thirty years old and kept like a bride. Whatever Gullscombe thinks of its dead ratcatcher, it loves this boat — it simply has no idea they are the same subject.'),
          },
        ],
      },
    },
  },

  // ---------- the harbour stairs ----------

  stairs: {
    name: 'The Harbour Stairs',
    art: Art.ch8.stairs,
    hotspots: [
      {
        id: 'downQuay', rect: [560, 760, 260, 200], label: 'Down to the quay',
        onClick: g => g.goTo('quay'),
      },
      {
        id: 'loftDoor', rect: [332, 396, 180, 364], label: 'Pike\'s loft door',
        onClick: g => g.goTo('loft'),
      },
      {
        id: 'upLight', rect: [660, 120, 280, 220], label: 'Up to the old light',
        onClick: g => g.goTo('light'),
      },
      {
        id: 'hettyRoof', rect: [60, 236, 400, 250], label: 'Hetty\'s cottage',
        onClick: g => g.narrate('Hetty\'s cottage, and a roof in two colours of slate — the middle courses newer by decades, done proper, done dear. Re-slated the autumn her Tom drowned, by a slater nobody hired and nobody paid. Roofs do not mend themselves, whatever a widow chooses to stop asking. Somewhere there is a bill for this, marked settled, and I should very much like to shake its hand.'),
      },
      {
        id: 'duchess', rect: [1150, 300, 170, 190], label: 'Duchess, in the sail-loft window',
        visible: g => heelCat(g) !== 'duchess',
        onClick: g => {
          if (g.flag('duchessWon')) {
            callCat(g, 'duchess', 'Duchess descends from her window by a route of sills and barrel-heads that flatters her figure, and falls in beside me as though the arrangement were her own idea, arrived at some time ago and merely awaiting my readiness.');
            return;
          }
          g.setFlag('duchessSeen');
          if (g.hasItem('cream')) { g.openPuzzle('manners'); return; }
          g.narrate('A white cat in the tall window of the sail loft, upright as a figurehead, inspecting the street below with the expression of a dowager at a regatta. I incline my head. She looks straight through me to a person of better quality standing somewhere behind. Approaching this one empty-handed would be social ruin; even approaching her correctly will want the right gift, and the fishwife strikes me as her ladyship\'s appointed grocer.');
        },
        use: {
          cream: g => {
            if (g.flag('duchessWon')) { g.narrate('She has had my cream and my company. One does not press.'); return; }
            g.setFlag('duchessSeen');
            g.openPuzzle('manners');
          },
        },
      },
      {
        id: 'sailLoft', rect: [1040, 500, 240, 290], label: 'The sail loft',
        onClick: g => g.narrate('Pentreath\'s sail loft, needles idle. The old man\'s hands went to knots years ago, the Stairs says, and yet the lease is never behind and the vultures never land. His window-cat wears a collar tag stamped with a little sail. In most towns that would be sentiment. In this one I am beginning to suspect it is bookkeeping.'),
      },
      {
        id: 'bakehouse', rect: [1330, 540, 220, 250], label: 'The bakehouse',
        onClick: g => g.narrate('The bakehouse: the one door on the Stairs that never quite shuts and the one wall that is warm at four in the morning. Half the town\'s bread goes out of it "on the books" in a bad month, and the books, by reputation, forgive like a saint. Bakers are not saints. Somebody has been settling those books, quietly, for a very long time.'),
      },
      {
        id: 'tarChimney', rect: [1420, 170, 130, 190], label: 'Tar, up the chimney',
        visible: g => !g.flag('tarWon'),
        onClick: g => {
          g.setFlag('tarSeen');
          g.narrate('A black cat folded onto the bakehouse chimney-pot, pressed to the warm brick like a poultice. He watches me with the polite despair of the recently bereaved. This one will not come down for fish, or for flattery — he is not hungry, he is COLD. Cold in the way of a creature that slept twenty years against one particular stove, three weeks extinguished. You cannot call a cat home, but I begin to think you can light one.');
        },
      },
      {
        id: 'mrsMop', rect: [640, 500, 120, 100], label: 'Mrs. Mop, on the wall',
        onClick: g => g.narrate('A tortoiseshell person of middle years, loafed on the wall with her paws tucked in, supervising the Stairs. Her tag is stamped with a little kettle. She permits my nod. The almshouse widows up the lane get their tea and coal by some arrangement nobody has ever produced a benefactor for, and their kettle, I am told, is never off.'),
      },
    ],
  },

  // ---------- Pike's loft ----------

  loft: {
    name: 'Pike\'s Loft',
    art: Art.ch8.loft,
    onEnter: g => {
      if (!g.flag('loftSeen')) {
        g.setFlag('loftSeen');
        g.say([{ who: 'Quinn', text: 'A ratcatcher\'s loft over a net store, turned over twice by a visitor and once, more gently, by grief. A chair, a cold stove, nine bowls in a row — and every drawer in the place flung but one. Whoever searched here wanted a strongbox kind of secret. The room keeps a different kind.' }]);
      }
    },
    hotspots: [
      {
        id: 'out', rect: [40, 560, 150, 320], label: 'Down to the stairs',
        onClick: g => g.goTo('stairs'),
      },
      {
        id: 'tansy', rect: [1380, 500, 150, 280], label: 'Tansy Pike',
        visible: g => g.flag('tansyMet'),
        onClick: g => {
          const hasBook = g.hasItem('passbook');
          const hasPacket = g.hasItem('packet');
          if (hasBook || hasPacket) {
            const lines = [];
            if (hasBook) {
              g.setFlag('tansyPass', true);
              lines.push({ who: 'Quinn', text: 'His bank book. The visitor had it in his hands and threw it away as worthless. Read the columns, Miss Pike. In like the tide, out like the tide, the same week, for thirty years.' });
              lines.push({ who: 'Tansy', text: '...He died with eleven shillings, miss. Eleven shillings and fourpence, the lawyer counted it twice. And he ate from our garden, that last year, and I thought — everyone SAID he was sitting on—' });
              lines.push({ who: 'Quinn', text: 'He was not sitting on anything. He was standing in a river, passing it along. Keep the book. It is the first page of his defence.' });
            }
            if (hasPacket) {
              g.setFlag('tansyPack', true);
              lines.push({ who: 'Quinn', text: 'And these were under the floor, in the rat-run — receipts. The widow\'s roof. A lifeboat, paid in full. A sloop bought back from the receivers by "a gentleman\'s agent". Your uncle banked where only the cats could make a withdrawal.' });
              lines.push({ who: 'Tansy', text: 'The rat-run. He used to say it was the only bank in Cornwall that paid interest in dead rats. I thought it was a JOKE, miss. I thought most of him was a joke. I\'m learning different at a terrible rate.' });
            }
            g.sfx('page');
            g.say(lines, g2 => {
              if (g2.hasItem('passbook')) g2.retireItem('passbook');
              if (g2.hasItem('packet')) g2.retireItem('packet');
              if (g2.flag('tansyPass') && g2.flag('tansyPack')) g2.setFlag('tansyTold', true);
            });
            return;
          }
          if (g.hasClue('roundsRead')) {
            g.say([{ who: 'Tansy', text: 'Nine columns, nine doors. And they\'re saying on the Stairs the grey one still goes down to the harbour every night, to the ninth. Finish it, miss. Say it where they can all hear it — he\'d never have let you, so somebody must.' }]);
            return;
          }
          g.say([{ who: 'Tansy', text: 'Mind the third board by the stove, it tips. Everything in this room bites strangers except the cats.' }]);
        },
      },
      {
        id: 'chair', rect: [430, 380, 200, 350], label: 'Pike\'s chair',
        onClick: g => {
          if (!g.flag('scarfTaken')) {
            g.setFlag('scarfTaken');
            g.addItem('scarf');
            g.narrate('His chair, shaped to him the way harness shapes a horse. Across one arm, a knitted scarf the colour of old rust — shag tobacco, salt, and violet hair-oil, a scent with a whole man folded up in it. Tansy says the grey cat slept on it the first week, and then stopped coming altogether, as if the scarf had disappointed her by not improving.');
            return;
          }
          g.narrate('An empty chair does most of the talking in a room like this. I have taken its scarf, and I mean to make the scarf work for its living.');
        },
      },
      {
        id: 'stove', rect: [130, 330, 220, 370], label: 'The stove',
        onClick: g => {
          if (g.flag('stoveLit')) {
            g.narrate('Alight, and drawing well, and making the whole loft look inhabited again. A stove is a small lighthouse for the people and animals that steer by it.');
            return;
          }
          if (!g.flag('stoveLaid')) {
            if (g.hasItem('driftwood')) {
              g.removeItem('driftwood');
              g.setFlag('stoveLaid');
              g.narrate('I lay the fire the way my grandmother laid arguments: small stuff below, big stuff above, and room for a draught to disagree. Tide-wood, salt-white and dry as biscuit. Now it wants a light with some conviction in it — this fog would drown an ordinary match on principle.');
              return;
            }
            g.narrate('Stone cold, three weeks cold, swept and laid with nothing. The chimney above it was the warmest perch in Gullscombe for twenty years, and every cold cat on the Stairs knows it went out. The tide keeps a woodpile down on the quay; a fire wants wood before it wants philosophy.');
            return;
          }
          if (g.hasItem('vestas')) {
            g.retireItem('vestas');
            g.setFlag('stoveLit');
            g.sfx('crack');
            g.say([
              { text: 'A storm vesta goes off like a small opinion, and the tide-wood catches with the green-hearted flame they promise you here. Smoke climbs the flue. Somewhere above the Stairs, a cold chimney turns warm for the first time in three weeks.' },
              { text: 'It takes four minutes. A shadow crosses the skylight, pauses against the glass, and then a black cat pours himself down through the broken pane and onto the stove-top like the last three weeks being cancelled. He tucks his paws in. He does not look at me. Some gratitude is dignity, and I am content to be the fire\'s secretary.' },
              { who: 'Quinn', text: 'Tar, I presume. You cannot call a cat home. But it appears you can light one.' },
            ], g2 => {
              g2.setFlag('tarWon', true);
              g2.sfx('purr');
            });
            return;
          }
          g.narrate('Laid and waiting, and my matches are wherever matches live in a town this damp. A lighthouse keeper, I should think, owns fire that argues back at weather.');
        },
        use: {
          driftwood: g => {
            if (g.flag('stoveLaid') || g.flag('stoveLit')) { g.narrate('The fire has wood enough.'); return; }
            g.removeItem('driftwood');
            g.setFlag('stoveLaid');
            g.narrate('Small stuff below, big stuff above, and room for a draught to disagree. Now, a light with some conviction in it.');
          },
          vestas: g => {
            if (g.flag('stoveLit')) { g.narrate('Lit, and drawing, and doing more detective work than I am.'); return; }
            if (!g.flag('stoveLaid')) { g.narrate('Flame before wood is how the Stairs thinks the loft got searched. Wood first.'); return; }
            g.retireItem('vestas');
            g.setFlag('stoveLit');
            g.sfx('crack');
            g.say([
              { text: 'The vesta goes off like a small opinion; the tide-wood catches green-hearted; smoke climbs the flue and unfurls over the Stairs like a flag run up. Four minutes later a shadow crosses the skylight, and a black cat pours himself down through the broken pane and onto the stove-top, and tucks in his paws, and forgives nobody, and stays.' },
              { who: 'Quinn', text: 'Tar. You cannot call a cat home. But it appears you can light one.' },
            ], g2 => {
              g2.setFlag('tarWon', true);
              g2.sfx('purr');
            });
          },
        },
      },
      {
        id: 'tarStove', rect: [150, 380, 180, 110], label: 'Tar, by the stove',
        visible: g => g.flag('tarWon') && heelCat(g) !== 'tar',
        onClick: g => callCat(g, 'tar', 'Tar unmakes himself from the stove-top with the reluctance of butter leaving a warm dish, and takes up station at my heel. He will come, his manner says, provided it is understood that we are BETWEEN fires, not without one.'),
      },
      {
        id: 'ratpole', rect: [220, 170, 350, 110], label: 'The rat-pole and its bell',
        onClick: g => {
          if (!g.flag('bellTaken')) {
            g.setFlag('bellTaken');
            g.addItem('bell');
            g.sfx('pickup');
            g.narrate('His rat-pole, hung like a retired colour. On it, a little brass bell. Tansy says he rang it at his own door of an evening and the cats came out of the fog like the tide coming in — nine of them, from nine directions, punctual as sin. The sound of him, as the scarf is the smell of him. I take it down with the feeling of borrowing a church key.');
            return;
          }
          g.narrate('A pole with forty years of honest work in it, and one bell the lighter for my visit.');
        },
      },
      {
        id: 'window', rect: [880, 220, 360, 280], label: 'The window on the harbour',
        onClick: g => g.narrate('The harbour through fog, masts standing in it like pencilled sums. The latch is scratched bright around the keyhole of its little lock — worked from outside, twice, by somebody in a hurry with good sea-fingers. The visitor came and went this way while the town watched the door.'),
      },
      {
        id: 'nail', rect: [1226, 300, 80, 110], label: 'A snag on the nail',
        visible: g => !g.flag('scrapTaken'),
        onClick: g => {
          g.setFlag('scrapTaken');
          g.addItem('scrap');
          g.addClue('scrapClue');
          g.sfx('page');
          g.narrate('On the nail of the window frame: a torn corner of oiled canvas — sail-cloth, mended herring-bone in tarred twine, the stitch of a man whose needlework answers to nobody but weather. The night visitor paid toll going out. The Stairs mends with cotton and lives ashore. This cloth rides at moorings.');
        },
      },
      {
        id: 'strongbox', rect: [640, 620, 240, 190], label: 'The strongbox',
        onClick: g => {
          if (!g.flag('passbookTaken')) {
            g.setFlag('passbookTaken');
            g.addItem('passbook');
            g.addClue('passbook');
            g.sfx('page');
            g.say([
              { text: 'Forced with a jemmy and no patience, and empty — except that it is not quite empty. Face down under the lid lies a bank passbook, Penwithick Marine, thrown back like an undersized fish. The visitor held the whole answer in his two hands and discarded it, because he came for treasure and this is only arithmetic.' },
              { who: 'Quinn', text: 'The salvage award enters in fifty-nine and frightens the clerk\'s ruled lines. And then, month after month for thirty years: in like the tide, out like the tide, to bearer, the same week. This man was not filling a chest. He was emptying one, on a schedule, his whole life — and the burglar read it and learned nothing, which is the kindest thing I can find to say about him.' },
            ]);
            return;
          }
          g.narrate('A forced box that held arithmetic. The visitor wanted a fairy tale and left the accounts. I begin to be grateful for the difference in our educations.');
        },
      },
      {
        id: 'floor', rect: [500, 800, 380, 120], label: 'The pried floorboards',
        onClick: g => {
          if (g.flag('packetTaken')) {
            g.narrate('The rat-run under the floor: the safest bank in Gullscombe, now paid out in full. The visitor pried three boards and never thought to ask the staff.');
            return;
          }
          if (heelCat(g) !== 'pilchard') {
            g.narrate('The visitor pried a board and found dust. But down in the dark under my feet something moves with the confidence of a sitting tenant — a rat-run, old and busy, going down under the skirting where no crowbar follows. Whatever lives down a rat-run is a question for a professional, and the profession in question sits on a post by the tide, taking tolls.');
            return;
          }
          if (!g.flag('ratRunSeen')) {
            g.setFlag('ratRunSeen');
            g.narrate('Pilchard hits the pried gap like a debt collector. Flat to the boards, ears cocked forward, tail-tip beating the slow time of a professional at his ledger — he reads the dark under this floor the way I read a room. There is a run down there, and something at the end of it, and he looks up at me once, to confirm that I am ready for the invoice.');
            return;
          }
          g.sfx('squeak');
          g.say([
            { text: 'He pours in. The floor gives one second of absolute silence and then thunder in miniature — scuffle, squeak, the indignant evacuation of tenants by three bolt-holes at once. And then Pilchard backs out of the gap, hindquarters first, hauling by main force something too big for any rat: an oilcloth packet, tarred twine, dry as the day it went under.' },
            { who: 'Quinn', text: 'Receipts. A slater\'s bill for the widow Brill\'s roof — done and paid, J.P. Blyth and Sons of Padstow, one lifeboat, number 114, paid in full, name her NINE SISTERS. A receivers\' release on a seized sloop, bought back whole by a gentleman\'s agent, name withheld by instruction. He banked where only the cats could make a withdrawal — and thirty years of paid bills are lying where the hoard was supposed to be, caught in the act of walking the wrong way.' },
          ], g2 => {
            g2.setFlag('packetTaken', true);
            g2.addItem('packet');
            g2.addClue('receipts');
          });
        },
      },
      {
        id: 'cupboard', rect: [1010, 600, 260, 190], label: 'The cats\' cupboard',
        onClick: g => {
          if (!g.flag('ledgerTaken')) {
            g.setFlag('ledgerTaken');
            g.addItem('ledger');
            g.addClue('ledgerRiddle');
            g.sfx('page');
            g.say([
              { text: 'The one cupboard in the loft the visitor never forced: the cats\' — dried fish, a tin of odds, and the famous rent book itself, sitting under a herring skin like a bishop under a tea-towel. Nine columns, headed in little stamped marks: a herring, a loaf, a sail, an oar, a bell, an anchor, a kettle, a boot, a book. Thirty years of dates and shillings in a fair hand.' },
              { who: 'Quinn', text: 'The town reads this as rents collected, and asks where the money went. But nothing on these pages says COLLECTED. A column of small sums does not tell you which way the shillings were walking — and a man who kept his accounts in the cats\' cupboard meant them to be read by whoever fed the cats. Which, as of this week, is me.' },
            ]);
            return;
          }
          g.openZoom('ledger');
        },
      },
      {
        id: 'bowls', rect: [950, 845, 520, 135], label: 'The nine bowls',
        onClick: g => g.narrate('Nine bowls in a row, each with a name in paint gone soft with washing: Pilchard, Tar, Duchess, Bosun, Winkle, Mackerel, Puddle, Mrs Mop — and Ha\'penny, first in the row, oldest lettering, the paint renewed so many times it stands up in ridges. Tansy fills them morning and night. Seven get emptied. The marmalade eats his and Puddle\'s. Nobody has seen Ha\'penny take a mouthful since the funeral.'),
      },
    ],
    zooms: {
      ledger: {
        title: 'The Rent Book',
        art: Art.ch8.ledgerZoom,
        hotspots: [
          {
            id: 'columns', rect: [100, 80, 1000, 620], label: 'The nine columns',
            onClick: g => {
              if (g.hasItem('tinTag') && !g.hasClue('tagTruth')) {
                g.sfx('success');
                g.addClue('tagTruth');
                g.setFlag('tagRead');   // setFlag re-renders the zoom, revealing the reading
                g.retireItem('tinTag');
                g.say([
                  { text: 'Winkle\'s tag against the column heads: the bell on the brass and the bell in the book are the same stamp, struck by the same die. Not runes. Not treasure-writing. The tag marks and the column marks are one alphabet — and there is exactly one herring sign on this quay, and it hangs over Hetty\'s door, and there is exactly one bell in Gullscombe.' },
                  { who: 'Quinn', text: 'ADDRESSES. Each cat wears the door it calls at; each column is that door\'s account. His ledger had fur on it and walked itself round the town twice a day. Now — to set a door against every mark, and see what thirty years of shillings were actually doing.' },
                ]);
                return;
              }
              if (g.hasClue('roundsRead')) {
                g.narrate('Nine columns, nine doors, and not one shilling of it coming in. The most slandered document in Cornwall.');
                return;
              }
              if (g.hasClue('tagTruth')) {
                g.narrate('The marks are doors. What remains is to say WHICH doors, mark by mark, and make the book confess in company.');
                return;
              }
              g.narrate('A herring, a loaf, a sail, an oar, a bell, an anchor, a kettle, a boot, a book. The town calls these the treasure-runes and has thieved two tags off living cats trying to collect the alphabet. I would rather find one tag honestly and ask it a civil question.');
            },
          },
          {
            id: 'readRounds', rect: [180, 730, 840, 50], label: 'Set a door to every mark',
            visible: g => g.hasClue('tagTruth') && !g.hasClue('roundsRead'),
            onClick: g => g.openPuzzle('rounds'),
          },
        ],
      },
    },
  },

  // ---------- the old light ----------

  light: {
    name: 'The Old Light',
    art: Art.ch8.light,
    onEnter: g => {
      if (!g.flag('lightSeen')) {
        g.setFlag('lightSeen');
        g.say([{ who: 'Quinn', text: 'The old light, whitewash going grey in the grey, and the first honest colour of dawn coming up behind it. From here the whole of Gullscombe lies below like a model of itself — and out past the harbour mouth, a ruled line of broken water. The bar. Every window in this town looks at it, and no one in this town looks at it.' }]);
      }
    },
    hotspots: [
      {
        id: 'down', rect: [740, 780, 200, 200], label: 'Down the cliff path',
        visible: g => !g.flag('gathered'),
        onClick: g => g.goTo('stairs'),
      },
      {
        id: 'wick', rect: [550, 460, 140, 300], label: 'Wick, the keeper',
        onClick: g => {
          if (!g.flag('wickMet')) {
            g.setFlag('wickMet');
            g.say([
              { who: 'Wick', text: 'Come up about Pike, have you. Fifty years I\'ve kept this light and he\'s the only one ever climbed to it weekly for no reason he\'d give. Sundays, regular. Said he came up to wind the clock.' },
              { who: 'Quinn', text: 'And the clock?' },
              { who: 'Wick', text: 'There\'s no clock up here, miss. Never was. He\'d sit that bench with the grey shadow of his beside him and look at the bar an hour, and go down again. You know about the bar? The Nine Sisters?' },
              { who: 'Wick', text: 'Fifty-eight. She come home ahead of the gale and died on the bar in sight of her own moorings, nine Gullscombe men aboard, and no boat we had could live in that water to reach her. We stood here — the whole town stood where you\'re standing — and watched. The sea kept one of the nine back a fortnight. It does that, to be cruel.' },
              { who: 'Wick', text: 'Young Pike dove her cargo for the underwriters the year after. Tin, insured heavy. They paid him a fortune and the town never said good morning to him again — wreck money, see. Drowned men\'s money. He never spent a penny of it that any soul ever saw. And now they\'re digging his garden up by moonlight for it. There\'s Gullscombe for you: it\'ll forgive the sea anything and a man nothing.' },
              { who: 'Quinn', text: 'Mr. Wick, I am beginning to think he spent every penny of it, in plain sight, and the town has been too busy watching his pockets to notice its own.' },
            ], g2 => g2.addClue('nineSisters'));
            return;
          }
          if (g.hasClue('tagTruth') && !g.flag('wickTold')) {
            g.setFlag('wickTold');
            g.say([
              { who: 'Quinn', text: 'The Sunday visits. The bench. He wasn\'t winding a clock, Mr. Wick — he was keeping the bell\'s column. Your column. The oil in the lean years. RECAST 1868.' },
              { who: 'Wick', text: '...I told myself the Lord provided. Fifty years, miss, I told myself that. The Lord, or somebody local — and there he\'d sit of a Sunday with his cat, saying nothing, and me thanking Providence over his head all the while. If you mean to say this aloud somewhere, say it where I can stand behind you.' },
            ]);
            return;
          }
          g.say([{ who: 'Wick', text: 'Take the vestas off the sill if you\'ve a fire wanting them anywhere below. Storm strikers. Bring the tin back — no hurry.' }]);
        },
      },
      {
        id: 'vestas', rect: [510, 676, 90, 56], label: 'His vesta tin',
        visible: g => g.flag('wickMet') && !g.flag('vestasTaken'),
        onClick: g => {
          g.setFlag('vestasTaken');
          g.addItem('vestas');
          g.narrate('Storm vestas, from a man whose profession is keeping one flame alive against the whole Atlantic. "Bring the tin back. No hurry." From a lighthouse keeper, that is a declaration of love.');
        },
      },
      {
        id: 'bell', rect: [880, 300, 240, 300], label: 'The harbour bell',
        onClick: g => {
          if (!g.hasClue('bellOil')) {
            g.addClue('bellOil');
            g.sfx('knock');
            g.say([
              { text: 'The Nine — rung for fog, rung for funerals, rung the morning they gave up on the ninth man. Around the shoulder, raised in the bronze: RECAST 1868. Cracked in \'67, Wick says, and made whole within the year by subscription — a subscription he has never once, in fifty years of asking, found a single subscriber to.' },
              { who: 'Quinn', text: 'And the light\'s oil through the lean years, when the Trinity House men cut the allowance and the light never went dim. A bell nobody paid for, burning oil nobody bought. This town is upholstered in anonymous kindness and has spent thirty years complaining of the smell of rats.' },
            ]);
            return;
          }
          g.narrate('RECAST 1868. A bell is the one gift you cannot give quietly — so he gave it a fictional committee.');
        },
      },
      {
        id: 'gallery', rect: [430, 240, 190, 110], label: 'The lantern gallery',
        onClick: g => {
          if (g.flag('tagTaken')) {
            g.narrate('The nest, minus one piece of stolen property. The jackdaws have lodged a complaint with every roof in earshot.');
            return;
          }
          if (heelCat(g) !== 'tar') {
            g.narrate('Wedged against the gallery rail, a jackdaws\' nest with a lifetime of theft woven into it — and in among the twigs, a wink of brass. One of the thieved collar tags, thieved a second time. Forty feet of weeping whitewashed ladder, a bird with strong opinions, and me in a travelling skirt. This is employment for something with more legs and less dignity to lose — a climber, bred to chimneys.');
            return;
          }
          g.setFlag('tagTaken');
          g.sfx('gull');
          g.say([
            { text: 'Tar goes up the tower the way smoke goes up a flue — a black thought travelling hand-hold to hand-hold with no visible effort and no consultation. At the rail there is a brief exchange of views with the jackdaw, conducted at volume, in which the jackdaw is comprehensively out-argued. He comes down with brass in his teeth and presents it to the flagstones, not to me. One maintains form.' },
            { who: 'Quinn', text: 'A collar tag, stamped with a bell. Winkle\'s — thieved off a living cat by a treasure-hunter, then thieved off the treasure-hunter\'s windowsill by a jackdaw, which I choose to read as the town\'s conscience operating under an assumed name.' },
          ], g2 => g2.addItem('tinTag'));
        },
      },
      {
        id: 'winkle', rect: [370, 660, 100, 80], label: 'Winkle, in the doorway',
        onClick: g => g.narrate('An elderly white-and-grey cat asleep across the light\'s doorstep, keeping the keeper. Her collar is bare — her tag was thieved off her in the spring by some rune-hunting genius, says Wick, and she has not forgiven the species. She sleeps here every night of her life. Her mark, if I ever recover it, will be a bell; I would stake the case on it.'),
      },
      {
        id: 'bench', rect: [1140, 560, 280, 200], label: 'Pike\'s Sunday bench',
        onClick: g => {
          if (g.flag('hapennyWon')) {
            g.narrate('His bench, facing the bar. It has two occupants\' worth of wear in it, and now, at last, it has had two occupants again.');
            return;
          }
          if (!g.hasItem('pikesThings')) {
            g.narrate('A bench worn to silk in two places: a man\'s breadth, and beside it a small space polished by something lighter. He sat here every Sunday and looked at the bar; the grey cat sat where the small shine is. She is somewhere on this cliff now — I catch the shape of her on the rocks when I do not look for her. If I mean to sit in his place, I had better bring more of him with me than my opinions. His smell. His sound.' );
            return;
          }
          const stage = g.getFlag('hpStage') || 0;
          if (stage === 0) {
            g.setFlag('hpStage', 1);
            g.sfx('stow');
            g.narrate('I spread the scarf on the bench, in the small polished place, with the bell knotted in its corner — and I give the bell one soft stroke of my thumb, a single note, and sit down in the man\'s breadth of wear, and look at the bar, and nothing else. On the rocks below, something grey has turned to face the sound.');
            return;
          }
          if (stage === 1) {
            g.setFlag('hpStage', 2);
            g.narrate('Stillness is a language. I keep my eyes on the broken water and my hands in my lap, and let the fog do the moving. She crosses the grass in three instalments, each ending in stone-stillness — closer now, near enough that I can see the salt on her whiskers, and I do not look, because looking is the only mistake left to make.');
            return;
          }
          g.setFlag('hpStage', 3);
          g.sfx('purr');
          g.say([
            { text: 'A weight arrives on the bench, on the scarf, so lightly the wood does not remark on it. She kneads the wool once, twice, finds the bell with her nose and stops — and then Ha\'penny, whom no hand in Gullscombe has ever touched, folds herself down against my knee with a sound like a small engine taking up work it thought it had lost, and looks at the bar, because that is what one does on this bench.' },
            { who: 'Quinn', text: 'I will not insult either of us by touching you. You are not tamed, and I am not him. But you knew his rounds before anyone, and you have kept the ninth open all on your own credit. Walk them with me, and we will close his book properly — the whole town in attendance, everything read out, nothing owed.' },
          ], g2 => {
            g2.setFlag('hapennyWon', true);
            g2.setFlag('withCat', 'hapenny');
            g2.retireItem('pikesThings');
          });
        },
      },
      {
        id: 'ring', rect: [960, 480, 90, 220], label: 'Ring the nine',
        visible: g => !g.flag('gathered') && g.flag('hapennyWon')
          && g.hasClue('roundsRead') && g.hasClue('receipts') && g.hasClue('lifeboatGift')
          && g.hasClue('catsVerdict') && g.hasClue('nineSisters') && g.hasClue('bellOil')
          && g.hasClue('passbook') && g.hasClue('grebeClaim')
          && g.flag('scrapShown') && g.flag('tansyTold'),
        onClick: g => {
          g.setFlag('gathered', true);
          g.sfx('toll');
          g.say([
            { text: 'I take the rope and ring the Nine — not the fog rhythm, not the funeral rhythm: nine strokes, slow, one for each. The sound rolls down the Stairs and lies over the harbour like a hand laid flat on a table. Doors open. Gullscombe comes up its own cliff in its Sunday nothing-in-particular — Tansy white as the whitewash, Hetty with her apron still on, Wick standing very straight, and last and slowest, hating every step, Silas Grebe.' },
            { who: 'Grebe', text: 'Well, detective. You\'ve rung for the whole parish. Where\'s the hoard?' },
            { who: 'Quinn', text: 'On the bench beside me sits the last of Jeremiah Pike\'s nine cats. In my hand is his famous rent book. Give me four minutes, Mr. Grebe, and I will pay you your half — every farthing of it — in front of witnesses.' },
          ]);
        },
      },
      {
        id: 'sayIt', rect: [640, 780, 560, 200], label: 'Read the book to the town',
        visible: g => g.flag('gathered') && !g.flag('ended'),
        onClick: g => {
          g.say([
            { who: 'Quinn', text: 'Nine columns, thirty years. The town has read this book from the outside its whole life and called it rents. We are going to read it properly, mark by mark — and I want it read by Gullscombe, not to it. Correct me where I am wrong. You will find you cannot.' },
          ], g2 => g2.openPuzzle('ninth'));
        },
      },
    ],
  },
};

// ---------- interactive puzzles ----------

const PUZZLES = {

  /* The verb at its plainest: the right offering, the right distance,
     and the discipline not to look. */
  lure: {
    title: 'The Toll at the Tide-Post',
    wide: true,
    render(g) {
      const step = g.getFlag('lrStep') || 0;
      const board = `<div class="trail-board">${Art.ch8.pilchardBoard(step)}</div>`;
      const q = [
        ['He watches me pat my pockets with the eyes of a customs man. The offering comes first, and the whole quay has taught him to be insulted by the usual.', [
          ['off-sprat', 'The smoked sprat'],
          ['off-mack', 'A fresh mackerel off the stall'],
          ['off-empty', 'Empty hands and honest intentions'],
        ]],
        ['The sprat, then. Now the placing of it &mdash; and the space between two parties is the whole of the negotiation.', [
          ['pl-half', 'Half-way between us, on the stones'],
          ['pl-feet', 'At my own feet'],
          ['pl-press', 'Hold it out to him directly'],
        ]],
        ['Placed. He looks at the sprat, and then at me, and does not move. The last move is mine, and it is to make no move at all &mdash; in the correct direction.', [
          ['w-away', 'Crouch, and study the harbour instead'],
          ['w-stare', 'Watch him steadily, so he knows it&rsquo;s freely given'],
          ['w-grab', 'The moment he takes it &mdash; pick him up'],
        ]],
      ][Math.min(step, 2)];
      return `${board}
        <p class="puzzle-msg">${g.getFlag('lrMsg') || q[0]}</p>
        <div class="puzzle-controls">
          ${q[1].map(o => `<button class="btn" data-act="${o[0]}">${o[1]}</button>`).join('')}
        </div>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Leave him his post</button></div>`;
    },
    wire(g, root, rerender) {
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const fail = (msg, reset) => {
          g.sfx('error');
          if (reset) g.setFlag('lrStep', 0);
          g.setFlag('lrMsg', msg);
          rerender();
        };
        switch (act) {
          case 'off-mack':
            fail('He receives the mackerel the way a toll-keeper receives a coin he has seen forged before: a slow blink of civic disappointment. The whole quay pays him in fresh fish. Fresh fish is not an offer; it is small change.');
            return;
          case 'off-empty':
            fail('I present two honest hands. He looks at each in turn, then out to sea, embarrassed for us both. Sentiment, his manner says, is what people offer when they have failed to bring anything.');
            return;
          case 'off-sprat':
            g.sfx('click');
            g.setFlag('lrStep', 1);
            g.setFlag('lrMsg', '');
            rerender();
            return;
          case 'pl-feet':
            fail('At my own feet: which prices the sprat at one approach to within a stranger\'s arm-reach, and he is not spending that for anything smoked. He fixes the middle distance and waits for the market to correct itself.');
            return;
          case 'pl-press':
            fail('I hold it out. He removes himself six inches down the post — not fleeing, merely restoring the agreed distance, the way one steps back from a talker at a party. Pressed goods are refused goods.');
            return;
          case 'pl-half':
            g.sfx('click');
            g.setFlag('lrStep', 2);
            g.setFlag('lrMsg', '');
            rerender();
            return;
          case 'w-stare':
            fail('I watch him kindly, and kindly is not the point: a straight stare is a challenge in his politics, however it is buttered. His ears tip back a degree, and negotiations pause while I remember my manners.');
            return;
          case 'w-grab':
            fail('The moment his head goes down I reach — and the sprat and the cat are both simply elsewhere, and a marmalade tail is expressing itself from the top of a bollard several diplomatic ranks away. He does return. Cats keep no grudges they can\'t use. But we begin again from the beginning, poorer by one lesson only I needed.', true);
            return;
          case 'w-away':
            g.setFlag('lrStep', 0);
            g.setFlag('lrMsg', '');
            g.setFlag('pilchardWon', true);
            g.setFlag('withCat', 'pilchard');
            g.removeItem('sprat');
            g.sfx('purr');
            g.closePuzzle();
            g.say([
              { text: 'I crouch and give the harbour my full professional attention. Stone. Gull. The tide, doing its rounds. Down the post; a pause I am not invited to observe; and the sprat is eaten in the manner of a rate collected, thoroughly and without gratitude. Then — a weight against my boot. A large marmalade head, presented once, firmly, like a stamp on a document.' },
              { who: 'Quinn', text: 'Pilchard. Pike\'s ratter, if the size of you means anything. I have a floor that wants auditing, sir, and I am told you are the professional.' },
            ]);
            return;
        }
      }));
    },
  },

  /* Cat etiquette, formalised. The wrong move is not fatal; it is
     merely SEEN, and one begins again from the bottom of society. */
  manners: {
    title: 'An Introduction to Her Grace',
    wide: true,
    render(g) {
      const step = g.getFlag('mnStep') || 0;
      const mood = g.flag('mnBad') ? 0 : [1, 1, 2, 3, 3][Math.min(step, 4)];
      const board = `<div class="trail-board">${Art.ch8.duchessBoard(mood)}</div>`;
      return `${board}
        <p class="puzzle-msg">${g.getFlag('mnMsg')
          || 'Her ladyship, at home. The jug is in my hand and her gaze is on the middle of my forehead, where my failings are kept. Among cats, manners means pretending you have somewhere better to be &mdash; and the order of a thing is the whole of the thing.'}</p>
        <div class="puzzle-controls">
          <button class="btn" data-act="sit">Sit down on the sail-maker&rsquo;s crate</button>
          <button class="btn" data-act="away">Look out at the harbour instead</button>
          <button class="btn" data-act="blink">Blink, slowly</button>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="cream">Set the cream on the sill</button>
          <button class="btn" data-act="wait">Wait, and go on waiting</button>
          <button class="btn" data-act="stare">Hold her gaze, politely</button>
          <button class="btn" data-act="reach">Reach up to make friends</button>
        </div>
        <div class="puzzle-controls"><button class="btn" data-act="leave">Withdraw from court</button></div>`;
    },
    wire(g, root, rerender) {
      const ORDER = ['sit', 'away', 'blink', 'cream', 'wait'];
      const REBUKES = {
        stare: 'I hold her gaze, politely. There is no such thing: a held gaze is a duel, and she declines to notice challenges from persons still standing about in the street. The tail begins to write its opinion of me on the windowsill. We start again from the pavement.',
        reach: 'My hand rises an inch and her whole acquaintance with me is cancelled — she is a cat looking at where a person used to be. One does not REACH for a duchess. One is, eventually, permitted to exist nearby. From the beginning.',
        sit: 'Seated already, and sitting twice is fidgeting. She notes it. Everything is noted. From the beginning.',
        away: 'I have already given the harbour my regards; done again out of turn it reads as nerves, and nerves are contagious and vulgar. The audience is dissolved. From the beginning.',
        blink: 'A slow blink out of its turn is flattery, and flattery from the unintroduced is impertinence. The ears tell me precisely what she thinks of impertinence. From the beginning.',
        cream: 'The cream, led with, is a bribe — and she takes cream like an apology, never like a bribe; Hetty was exact on the point. The jug is regarded as if it contained my character. From the beginning.',
        wait: 'I wait — but waiting is only eloquent AFTER the gift, and I have given nothing yet but my company, which is not yet worth waiting about. Begin again, lower.',
      };
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        const step = g.getFlag('mnStep') || 0;
        if (act !== ORDER[step]) {
          g.sfx('error');
          g.setFlag('mnStep', 0);
          g.setFlag('mnBad', true);
          g.setFlag('mnMsg', REBUKES[act]);
          rerender();
          return;
        }
        if (step < ORDER.length - 1) {
          g.sfx('click');
          g.setFlag('mnStep', step + 1);
          g.setFlag('mnBad', false);
          g.setFlag('mnMsg', [
            'I sit on the crate: lower than her sill, as is correct, and no longer looming, which was the first and largest of my offences.',
            'I give my attention to the harbour, renouncing all claim to hers. In the window glass, faintly, I see the tail go quiet.',
            'When our eyes next cross &mdash; by accident, strictly &mdash; I close mine, slowly, and open them elsewhere. Among cats this is a sentence with a verb in it: I am no threat, and I say so at my leisure.',
            'Now, and only now, the cream goes on the sill &mdash; set down and abandoned, a tribute, not a transaction. I return to my harbour-gazing as though jugs simply occur near me.',
          ][step]);
          rerender();
          return;
        }
        g.setFlag('mnStep', 0);
        g.setFlag('mnBad', false);
        g.setFlag('mnMsg', '');
        g.setFlag('duchessWon', true);
        g.setFlag('withCat', 'duchess');
        g.removeItem('cream');
        g.sfx('purr');
        g.closePuzzle();
        g.say([
          { text: 'Time passes at her pleasure. Then, in instalments, with pauses to establish that each stage was her own idea: down from the window, along the sill, a sniff at the cream — taken, in the end, like an apology graciously accepted — and a single deliberate pass of her flank along my sleeve, conferring upon me the freedom of the parish.' },
          { who: 'Quinn', text: 'Your grace. I am given to understand you can work a latch — every parlour on the Stairs speaks of it, mostly in complaint. There is a barred door down on the quay with a question behind it, and I should be honoured by the loan of your talents.' },
        ]);
      }));
    },
  },

  /* The inversion, made by the player's own hand: set a door to every
     mark, and watch the rent book turn into something else entirely. */
  rounds: {
    title: 'The Rent Book, Read Right',
    wide: true,
    render(g) {
      const ROWS = [
        { id: 'herring', name: 'the herring' },
        { id: 'loaf', name: 'the loaf' },
        { id: 'sail', name: 'the sail' },
        { id: 'oar', name: 'the oar' },
        { id: 'bellm', name: 'the bell' },
      ];
      const DOORS = ['Hetty Brill\'s door', 'the bakehouse', 'the sail loft', 'the lifeboat house', 'the old light', 'the Bonaventure'];
      const rows = ROWS.map(r => {
        const v = g.getFlag('rd_' + r.id);
        return `<div class="mark-row">
          <div style="flex:1"><strong>${r.name}</strong></div>
          <button class="btn" data-act="cyc-${r.id}">${v == null ? '?' : DOORS[v]}</button>
        </div>`;
      }).join('');
      return `<p class="puzzle-msg">${g.getFlag('rdMsg')
        || 'Nine marks; five I can already put a door to, if I have walked this town awake. A mark is not a rune &mdash; it is a sign over a door, seen the way a cat sees it, from below, daily. The anchor keeps its own appointment, later, and the last three columns can wait for the reading.'}</p>
        <div class="mark-rows">${rows}
          <div class="mark-row"><div style="flex:1"><strong>the anchor</strong></div><span class="mark-unseen">a round still walked, nightly &mdash; not yet</span></div>
        </div>
        <div class="puzzle-controls">
          <button class="btn" data-act="confirm">Enter the doors in the book</button>
          <button class="btn" data-act="leave">Close the book</button>
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = { herring: 0, loaf: 1, sail: 2, oar: 3, bellm: 4 };
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const act = b.dataset.act;
        if (act === 'leave') { g.closePuzzle(); return; }
        if (act === 'confirm') {
          const right = Object.keys(ANSWER).every(k => g.getFlag('rd_' + k) === ANSWER[k]);
          if (!right) {
            g.sfx('error');
            g.setFlag('rdMsg', 'No. Read them as a cat reads them — from the pavement, on the morning round. The herring hangs over a fishwife\'s door; the loaf lives where the ovens are; a sail is sewn, an oar is pulled, a bell is rung. One door in Gullscombe apiece, and no cleverness wanted: the marks were made to be OBVIOUS. That was their disguise.');
            rerender();
            return;
          }
          g.setFlag('rdMsg', '');
          g.sfx('success');
          g.addClue('roundsRead');
          g.closePuzzle();
          g.say([
            { text: 'The herring: Hetty\'s door, and a roof done dear the year her Tom drowned. The loaf: the bakehouse, whose books forgive like a saint. The sail: Pentreath\'s lease, never behind since his hands went. The oar: the lifeboat, kept like a bride for thirty years. The bell: the light, its oil, RECAST 1868. Nine columns. Nine doors. And every door in the book lost a man on the Nine Sisters, or kept this town alive after she went down.' },
            { who: 'Quinn', text: 'Not rents in. Gifts OUT — thirty years of shillings walking down the cats\' rounds into the walls of this town, while the town watched his pockets. The hoard is not hidden, Miss Pike. It is SPENT. Gullscombe has been living inside it for a generation, and calling it luck, and digging its own gardens up by moonlight looking for what is holding its roofs over its heads.' },
          ]);
          return;
        }
        const id = act.slice(4);
        const cur = g.getFlag('rd_' + id);
        g.setFlag('rd_' + id, cur == null ? 0 : (cur + 1) % 6);
        g.setFlag('rdMsg', '');
        rerender();
      }));
    },
  },

  /* The finale: the book read aloud to the town, mark by mark, until
     the ninth column lands on the man who came to collect it. */
  ninth: {
    title: 'The Ninth Column',
    wide: true,
    render(g) {
      const STEPS = [
        {
          text: 'The herring. Item, from the packet under his floor: <em>Penberthy, slater &mdash; the widow Brill&rsquo;s roof, done and paid, J.P.</em> The roof that mended itself, the autumn the sea took Tom Brill&hellip;',
          opts: ['was Pike, paying quietly down a cat\'s round', 'was the fishermen\'s club after all', 'was Grebe, buying goodwill against this day'],
        },
        {
          text: 'The oar. Item: <em>Blyth &amp; Sons, Padstow &mdash; one lifeboat, No. 114, paid in full &mdash; name her NINE SISTERS.</em> And on the boathouse wall: <em>the gift of a friend, 1859.</em> The friend&hellip;',
          opts: ['was the Trinity House men, by allowance', 'was the man who dove the wreck, giving the sea\'s money back', 'was a subscription the town forgot'],
        },
        {
          text: 'The bell. RECAST 1868, by a subscription with no subscribers; the light&rsquo;s oil through the lean years, when the allowance was cut and the light never dimmed. Who kept the Nine ringing and the light burning?',
          opts: ['the harbour dues, quietly diverted', 'Wick, out of his own wages', 'Pike, up his Sunday round, "winding a clock" that never was'],
        },
        {
          text: 'The anchor &mdash; the ninth column, the round the grey cat keeps to this hour, every night, on one deck in this harbour. Item: <em>the receivers&rsquo; release on a seized sloop, bought back whole by a gentleman&rsquo;s agent, name withheld by instruction.</em> The ninth door&hellip;',
          opts: ['is no door: the anchor marks where the hoard lies sunk', 'is the harbourmaster\'s office, for dues', 'is the Bonaventure &mdash; Silas Grebe, the ninth man of the Nine Sisters, paid his half in full and in secret'],
        },
        {
          text: 'Then say it, Miss Quinn &mdash; the town is listening and the fog is lifting. Where is Pike&rsquo;s hoard?',
          opts: ['under this light, where he sat every Sunday', 'banked in Truro, under another name', 'nowhere, and everywhere: Gullscombe has been living in it for thirty years'],
        },
      ];
      const step = Math.min(g.getFlag('nnStep') || 0, 4);
      const s = STEPS[step];
      const board = `<div class="trail-board">${Art.ch8.tagStrip(Math.min(step, 4))}</div>`;
      return `${board}
        <p class="puzzle-msg">${g.getFlag('nnMsg') || s.text}</p>
        <div class="puzzle-controls">
          ${s.opts.map((o, i) => `<button class="btn" data-act="say-${i}">${o}</button>`).join('')}
        </div>`;
    },
    wire(g, root, rerender) {
      const ANSWER = [0, 1, 2, 2, 2];
      root.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
        const step = Math.min(g.getFlag('nnStep') || 0, 4);
        if (Number(b.dataset.act.slice(4)) !== ANSWER[step]) {
          g.sfx('error');
          g.setFlag('nnStep', 0);
          g.setFlag('nnMsg', 'A murmur runs through the town like wind through wire, and Grebe\'s mouth sets in the old vindicated line. A wrong reading, aloud, in company, costs more than silence — this book has been misread for thirty years and will not stand one minute more of it. From the first mark, and read it the way the paper does: every receipt tells you who PAID.');
          rerender();
          return;
        }
        if (step < 4) {
          g.sfx('click');
          g.setFlag('nnStep', step + 1);
          g.setFlag('nnMsg', '');
          rerender();
          return;
        }
        g.setFlag('ended', true);
        g.setFlag('nnStep', 0);
        g.sfx('chime');
        g.retireItem('ledger');
        g.closePuzzle();
        g.say([
          { who: 'Quinn', text: 'There is no hoard, and there never was a rent book. Nine men went down on the bar in fifty-eight. He could not give the sea back its dead — so he fed its living, for thirty years, down nine rounds walked by nine cats, because nobody watches the man when there\'s a cat in the room. The lifeboat so it could never happen again. The widow\'s roof. The baker\'s books. The sail-maker\'s lease. The light and its bell. The kettle, the boot, the book — the almshouse, the cobbler\'s children, the school pennies. And the anchor.' },
          { who: 'Quinn', text: 'Mr. Grebe. You crewed his boat over the bar, and you were owed half, and you were paid it — twenty-two years ago, when the receivers took your sloop and a gentleman\'s agent bought her back whole, name withheld by instruction. Here is the release, and here is the bank book that bled for it, and there on your cabin roof is the ninth column, still calling nightly to see the payment maintained. He never cheated you of your half. He paid it with interest to the one man in Gullscombe the town wanted paid least — and he let you call it luck, because you would not have taken it as anything else.' },
          { who: 'Grebe', text: '...I broke his window. Twice. I went through a dead man\'s floor with a bar, for money I\'d — for money I\'d already—' },
          { who: 'Hetty', text: 'Sit down, Silas Grebe, before you fall down. You\'re not the only one in this crowd who\'s been paid thirty year and never knew it. He got the whole town, one door at a time. We none of us noticed because we were all of us watching each other.' },
          { who: 'Grebe', text: 'The note.' },
          { who: 'Quinn', text: 'The note, Mr. Grebe, is genuine, and legally you may still present it Friday. I would only ask that you present it beside the receivers\' release, and let the magistrate\'s man do the subtraction in public.' },
          { who: 'Grebe', text: '...No. No, it goes in Wick\'s stove, and I\'ll want a hammer and a morning after — there\'s a window on the Stairs owes its owner some glass, and a floor wants relaying. And somebody had better tell me what that grey devil eats, because it seems I\'m to be haunted regardless, and I won\'t have it said I kept Pike\'s cat hungry.' },
          { who: 'Wick', text: 'Fifty years I thanked Providence over that man\'s head. Ring the bell, someone. Ring it for him this time — it\'s his bell.' },
          { who: 'Tansy', text: 'Miss Quinn — look. LOOK.' },
          { text: 'Ha\'penny has left the bench. She crosses to Silas Grebe through a lane of Sunday shoes, sits down on his boot, and commences, horribly, to purr — the ninth round, delivered at last to its addressee in person. Grebe stands in the middle of Gullscombe with a cat on his foot and thirty years of luck explained, and cries like a man being introduced to his own life.' },
        ], g2 => {
          g2.addClue('resolution');
          g2.endChapter();
        });
      }));
    },
  },
};

// ---------- chapter registration ----------

CHAPTERS.ch8 = {
  id: 'ch8',
  order: 8,
  title: "The Ratcatcher's Nine",
  subtitle: 'Chapter Eight — The Cats of Gullscombe',
  items: ITEMS,
  combos: COMBOS,
  scenes: SCENES,
  puzzles: PUZZLES,
  clues: CLUES,
  startScene: 'quay',

  /* The one line of state the player must never lose: who walks with
     you — the companion is the key that opens the town. */
  status: g => {
    if (g.flag('gathered')) return 'the town, gathered at the Nine';
    const w = g.getFlag('withCat');
    return w ? CAT_NAMES[w] + ' at heel' : 'no cat at heel';
  },

  intro: [
    { text: 'Gullscombe, before dawn: a town stacked up its own cliff like plates in a rack, breathing fog. Three weeks ago they buried Jeremiah Pike, ratcatcher, eighty-one, owner of one cottage, nine cats, and — the whole coast agrees — a hoard: forty years of bounties and the great salvage purse of \'59, never once seen to be spent.' },
    { text: 'Since the funeral: his strongbox forced, his floors pried, his niece\'s room turned out twice by night, and every garden on the Stairs dug over by moonlight. The town has decided the niece found it first. The niece has written to the one detective she has read of who works for the accused.' },
    { who: 'Tansy', text: 'Find my uncle\'s fortune before they pull my house down looking for it, Miss Quinn — or prove there was never one to find. I don\'t much care which, and I don\'t see how either can be done by Friday.' },
    { who: 'Quinn', text: 'Towns are seldom wrong about money existing, Miss Pike. They are almost always wrong about where it went. And a man who kept nine cats in herring on a ratcatcher\'s trade kept books SOMEWHERE, even if the whole coast has been reading them upside-down.' },
    { who: 'Quinn', text: 'Gullscombe at low water: one quay, one town, nine unemployed colleagues of the deceased — and somewhere among them, thirty years of the truth, waiting to be fed.' },
  ],

  /* Ordered two-tier hints. These nudge the THINKING, never the deed:
     no rung names a door before the marks are read, tells the manners
     in order, or says aloud that there is no hoard. */
  hints: [
    {
      when: g => !g.hasClue('theCase'),
      nudge: 'The client is on the quay, watching you off the packet, and she has had three weeks nobody should have alone.',
      more: 'Talk to Tansy Pike before anything else. The case is hers; the town\'s version of it you will get soon enough, and louder.',
    },
    {
      when: g => !g.hasClue('hettySays') || !g.hasClue('grebeClaim'),
      nudge: 'Two more people on this quay are worth the time of day: the one who sells the fish, and the one who thinks he is owed the sea.',
      more: 'Hetty at her stall knows what the town believes, which matters as much as what is true. Grebe aboard his sloop holds the paper that makes Friday dangerous. Hear both.',
    },
    {
      when: g => !g.flag('pilchardWon'),
      nudge: 'The marmalade one at the tide-post runs this harbour, and nothing under this town\'s floors will open to you without a professional.',
      more: 'The whole quay feeds him fresh fish, which is why fresh fish is worthless. Hetty knew Pike\'s trick. Whatever you offer, mind the distance, and remember that to a cat a straight stare is a duel.',
    },
    {
      when: g => !g.hasClue('ledgerRiddle') || !g.hasClue('passbook') || !g.hasClue('scrapClue'),
      nudge: 'The loft has been searched twice by somebody who knew what treasure looks like. Read what he LEFT, not what he took.',
      more: 'A forced strongbox that still has paper in it; a window that was used as a door, and kept a toll for it; and one cupboard in the room the visitor never thought worth forcing — the cats\'.',
    },
    {
      when: g => !g.flag('tarWon'),
      nudge: 'There is a black cat on the warmest chimney on the Stairs, grieving in the only language he has. He will not come down for food. He is not hungry.',
      more: 'His stove has been cold three weeks. The tide keeps a woodpile on the quay, and the keeper of the old light owns fire that argues with weather. You cannot call a cat home; consider what smoke says.',
    },
    {
      when: g => !g.hasClue('tagTruth'),
      nudge: 'The town reads the collar tags as treasure-runes, and has thieved two off living cats to prove it. Try reading them as something duller and much more useful.',
      more: 'One stolen tag ended in the jackdaws\' nest over the lantern gallery, forty feet up weeping whitewash — a climb for something bred to chimneys. Hold what comes down against the heads of the nine columns.',
    },
    {
      when: g => !g.flag('duchessWon'),
      nudge: 'The white one in the sail-loft window opens every latch on the Stairs, and will open exactly none of them for a stranger with no manners.',
      more: 'Hetty is her ladyship\'s grocer and will tell you the tariff. After that, remember that among cats good manners means pretending you have somewhere better to be — and that the gift comes late in the conversation, never first.',
    },
    {
      when: g => !g.hasClue('receipts') || !g.hasClue('lifeboatGift'),
      nudge: 'Two doors in this town open only to cats: one under a floor, one behind a bar the coxswain dropped himself. You have been recruiting the keys all morning.',
      more: 'The ratter reads the dark under Pike\'s floorboards. The latch-worker thinks the lifeboat house is a parlour. What is under the floor is paper; what is behind the doors is painted on a board.',
    },
    {
      when: g => !g.hasClue('roundsRead'),
      nudge: 'Read as rents, the book makes a miser. You now know the marks are doors. Set a door to every mark and see what thirty years of shillings were actually doing.',
      more: 'Open the rent book and set a name to every mark, the way a cat would read them: from the pavement, on the morning round. The marks were made to be obvious. That was their disguise.',
    },
    {
      when: g => !g.hasClue('catsVerdict'),
      nudge: 'Eight columns have doors now. The ninth round is still being walked, every night, by the one cat nobody in Gullscombe has ever touched.',
      more: 'Go down to the water and watch where the grey one sits. Not whose deck you expect — that is rather the point.',
    },
    {
      when: g => !g.flag('hapennyWon'),
      nudge: 'The ninth cat cannot be bought: not fish, not cream, not warmth. She is not hungry, cold, or curious. She is bereaved, and she wants the only thing you cannot fetch.',
      more: 'You cannot fetch the man, but the loft still holds the smell of him and the sound of him. Bring both to the bench he shared with her, take his seat, and be as still as he was. She does the rest, or nothing does.',
    },
    {
      when: g => !g.flag('tansyTold') || !g.flag('scrapShown'),
      nudge: 'Paper is only evidence once it has an owner. Some of what you carry belongs to the niece; some of it belongs, rather pointedly, to a man at his moorings.',
      more: 'Show Tansy what her uncle kept — the bank book and the packet both. And show Grebe the canvas his jacket left on the nail; he should know the case against him before you offer him something better than a case.',
    },
    {
      when: () => true,
      nudge: 'You have the book, the doors, the paper, and the ninth cat at your heel. What remains cannot be whispered to one person at a time — this town believed its slander in company, and must hear the truth the same way.',
      more: 'There is a bell above this town that has always gathered it. Ring the Nine, and when Gullscombe comes up its own cliff, read the book to it — mark by mark, receipt by receipt, and let the ninth column land where it has been landing every night all along.',
    },
  ],

  end: {
    kicker: 'Chapter Eight Complete',
    title: "The Ratcatcher's Nine",
    body: 'The magistrate\'s man came Friday and found no claim to hear: Grebe had burned the note in Wick\'s stove the same morning he reglazed the loft window, and stayed on to relay the floor. The rent book hangs framed in the boathouse now, beside the dedication board, where the whole town can read both documents in one glance and do its own subtraction. ' +
      'The nine were provided for in the only way Gullscombe would tolerate — publicly, at last: Bosun kept his lifeboat, Winkle her lighthouse, Duchess her window, Mrs. Mop her wall and her widows; Pilchard assessed Tansy for half a smoked sprat daily and stayed on as harbour customs; Tar never left the relit stove again. Ha\'penny sails with Grebe, who swears at her nightly, buys her herring in Padstow, and has named nothing after her because, he says, she came named. ' +
      'Ivy Quinn declined a fee she knew could not be paid, and accepted instead one brass bell, which hangs on her office door in London and rings, softly, whenever anyone comes in out of the fog.',
    next: null,
  },
};

})();
