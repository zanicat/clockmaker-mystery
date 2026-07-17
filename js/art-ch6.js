/* Art for Chapter Six — "The Headmistress's Cup".
   Namespaced under Art.ch6. Scenes 1600x1000, zooms 1200x800.

   Aldergate School in the last gold week of autumn: honey stone, slate
   roofs, long low afternoon light, falling leaves and circling rooks.
   The chapter's novelty is the pupils' chalk-glyph LANGUAGE: glyphs are
   painted into the scenes by the glyph()/marks() helpers, and once a
   mark-book batch is validated (S.flags.marks1Done / marks2Done) every
   mark of that batch re-renders with a small pencilled translation —
   the school becomes readable as Ivy learns.

   Signature motion: falling leaves, a slow rook circling, guttering
   gaslight indoors. Give every gradient a unique id per painter; two
   painters can share the DOM through zoom overlays. */

Art.ch6 = (() => {
  const { paperSheet } = Art;

  const C = {
    sky: '#e8c088', skyHigh: '#d9a86a', sun: '#f6e2b0',
    stone: '#c9a15e', stoneDark: '#a87f45', stoneShadow: '#8a6536',
    roof: '#5a4a52', roofDark: '#453a40',
    leaf: '#c97f3a', leafDark: '#a85f28',
    grass: '#9a8a48', grassDark: '#7a6c38',
    wood: '#5b3d26', woodDark: '#3e2a18',
    ink: '#3a2a1e', chalk: '#f6efdf', pencil: '#7a6a52',
    inRoom: '#3a2b20', inRoomDark: '#2a1e14', inWarm: '#54402c',
    cream: '#e8dfc8', text: '#6a4a26', textIn: '#d8c0a0',
    flame: '#ffca7a', brass: '#c9a544', brassDeep: '#8a6a30',
  };

  // ---------- the glyph language ----------

  /* Each glyph is a few chalk strokes. MEANINGS drives the pencilled
     translations; BATCH says which mark-book page confirms it. The
     'beakOld' variant is the forgery tell — never taught, never
     annotated: no pupil has drawn it that way in thirty years. */
  const MEANINGS = {
    thisWay: 'this way', turnBack: 'turn back', allClear: 'all clear',
    danger: 'danger', grub: 'grub here', gates: 'the gates',
    beak: 'a beak (staff)', sentry: 'sentry post', moot: 'meeting',
    boltHole: 'bolt-hole', midnight: 'midnight', carrying: 'carrying a load',
  };
  const BATCH = {
    thisWay: 1, turnBack: 1, allClear: 1, danger: 1, grub: 1, gates: 1,
    beak: 2, sentry: 2, moot: 2, boltHole: 2, midnight: 2, carrying: 2,
  };

  function glyphStrokes(name, s) {
    switch (name) {
      case 'thisWay': return `<line x1="${-s}" y1="0" x2="${s}" y2="0"/><path d="M ${s * 0.3} ${-s * 0.5} L ${s} 0 L ${s * 0.3} ${s * 0.5}" fill="none"/>`;
      case 'turnBack': return `<line x1="${-s}" y1="0" x2="${s}" y2="0"/><path d="M ${-s * 0.3} ${-s * 0.5} L ${-s} 0 L ${-s * 0.3} ${s * 0.5}" fill="none"/><line x1="${s * 0.6}" y1="${-s * 0.7}" x2="${s * 0.6}" y2="${s * 0.7}"/>`;
      case 'allClear': return `<circle cx="0" cy="0" r="${s * 0.7}" fill="none"/>`;
      case 'danger': return `<path d="M ${-s} ${s * 0.5} L ${-s * 0.33} ${-s * 0.5} L ${s * 0.33} ${s * 0.5} L ${s} ${-s * 0.5}" fill="none"/>`;
      case 'grub': return `<path d="M ${-s * 0.7} ${-s * 0.2} A ${s * 0.7} ${s * 0.7} 0 0 0 ${s * 0.7} ${-s * 0.2}" fill="none"/><line x1="${-s * 0.9}" y1="${-s * 0.25}" x2="${s * 0.9}" y2="${-s * 0.25}"/>`;
      case 'gates': return `<line x1="${-s * 0.55}" y1="${-s * 0.7}" x2="${-s * 0.55}" y2="${s * 0.7}"/><line x1="${s * 0.55}" y1="${-s * 0.7}" x2="${s * 0.55}" y2="${s * 0.7}"/><line x1="${-s * 0.55}" y1="${-s * 0.35}" x2="${s * 0.55}" y2="${-s * 0.35}"/>`;
      case 'beak': return `<path d="M ${-s * 0.7} ${s * 0.4} L 0 ${-s * 0.5} L ${s * 0.7} ${s * 0.4} Z" fill="none"/><line x1="0" y1="${-s * 0.5}" x2="${s * 0.5}" y2="${-s * 0.9}"/>`;
      case 'beakOld': return `<path d="M ${-s * 0.7} ${s * 0.4} L 0 ${-s * 0.5} L ${s * 0.7} ${s * 0.4} Z" fill="none"/><line x1="${-s * 0.35}" y1="${-s * 0.75}" x2="${s * 0.35}" y2="${-s * 0.15}"/><line x1="${s * 0.35}" y1="${-s * 0.75}" x2="${-s * 0.35}" y2="${-s * 0.15}"/>`;
      case 'sentry': return `<path d="M ${-s * 0.8} 0 Q 0 ${-s * 0.7} ${s * 0.8} 0 Q 0 ${s * 0.7} ${-s * 0.8} 0 Z" fill="none"/><circle cx="0" cy="0" r="${s * 0.16}"/>`;
      case 'moot': return `<path d="M ${s * 0.3} ${-s * 0.7} A ${s * 0.7} ${s * 0.7} 0 1 0 ${s * 0.3} ${s * 0.7} A ${s * 0.55} ${s * 0.55} 0 1 1 ${s * 0.3} ${-s * 0.7} Z" fill="none"/>`;
      case 'boltHole': return `<rect x="${-s * 0.7}" y="${-s * 0.55}" width="${s * 1.4}" height="${s * 1.1}" fill="none"/><line x1="${-s * 1.1}" y1="0" x2="${-s * 0.1}" y2="0"/><path d="M ${-s * 0.4} ${-s * 0.3} L ${-s * 0.1} 0 L ${-s * 0.4} ${s * 0.3}" fill="none"/>`;
      case 'midnight': return `<line x1="${-s * 0.8}" y1="${-s * 0.6}" x2="${-s * 0.2}" y2="${s * 0.6}"/><line x1="${-s * 0.2}" y1="${-s * 0.6}" x2="${-s * 0.8}" y2="${s * 0.6}"/><line x1="${s * 0.2}" y1="${-s * 0.6}" x2="${s * 0.2}" y2="${s * 0.6}"/><line x1="${s * 0.7}" y1="${-s * 0.6}" x2="${s * 0.7}" y2="${s * 0.6}"/>`;
      case 'carrying': return `<rect x="${-s * 0.6}" y="${-s * 0.3}" width="${s * 1.2}" height="${s * 0.9}" fill="none"/><path d="M ${-s * 0.4} ${-s * 0.3} Q 0 ${-s * 1.1} ${s * 0.4} ${-s * 0.3}" fill="none"/>`;
      default: return `<circle cx="0" cy="0" r="${s * 0.3}"/>`;
    }
  }

  /* One chalked glyph, slightly tilted like a quick hand. If its batch
     is validated in S.flags, a pencilled translation appears under it. */
  function glyph(name, x, y, s, S, color) {
    const stroke = color || C.chalk;
    const done = S && ((BATCH[name] === 1 && S.flags.marks1Done) || (BATCH[name] === 2 && S.flags.marks2Done));
    const tilt = ((x * 7 + y * 3) % 11) - 5; // deterministic little wobble
    const note = done && MEANINGS[name]
      ? `<text x="${x}" y="${y + s * 1.9}" text-anchor="middle" font-size="${Math.max(11, s * 0.8)}" font-family="Georgia, serif" font-style="italic" fill="${C.pencil}">${MEANINGS[name]}</text>`
      : '';
    return `<g>
      <g transform="translate(${x} ${y}) rotate(${tilt})" stroke="${stroke}" stroke-width="${Math.max(2.5, s * 0.18)}" stroke-linecap="round" fill="${stroke}">
        ${glyphStrokes(name, s)}
      </g>
      ${note}
    </g>`;
  }

  function marks(list, S, color) {
    return list.map(m => glyph(m.g, m.x, m.y, m.s || 16, S, color)).join('');
  }

  // ---------- shared scenery ----------

  // Falling leaves: the chapter's signature motion.
  function leaves(x, y, w, h) {
    const spots = [[0.15, 0.1, 9], [0.4, 0.35, 11], [0.65, 0.15, 8], [0.85, 0.45, 10], [0.3, 0.6, 12]];
    let out = '';
    for (const [fx, fy, dur] of spots) {
      const cx = x + w * fx, cy = y + h * fy;
      out += `<path d="M ${cx} ${cy} q 5 -7 10 0 q -5 7 -10 0 Z" fill="${C.leaf}" opacity="0.85">
        <animate attributeName="opacity" values="0;0.9;0" dur="${dur}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 0; ${dur * 2} ${h * 0.5}; ${dur * 3} ${h}" dur="${dur}s" repeatCount="indefinite"/>
      </path>`;
    }
    return `<g>${out}</g>`;
  }

  // A rook, circling slowly.
  function rook(cx, cy, r, dur) {
    return `<g>
      <animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy}; 360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>
      <path d="M ${cx + r} ${cy} q 8 -8 16 0 q -8 -3 -16 0 Z" fill="${C.ink}" opacity="0.7"/>
    </g>`;
  }

  // A small gas flame with flicker (interiors).
  function gasFlame(x, y, dur) {
    return `<path d="M ${x} ${y} q -6 -12 0 -22 q 6 10 0 22 Z" fill="${C.flame}">
      <animate attributeName="opacity" values="0.65;1;0.75;1;0.65" dur="${dur}s" repeatCount="indefinite"/>
    </path>`;
  }

  // A simple standing figure; smaller scale for the pupils.
  function figure(x, y, coat, skin, hair, scale) {
    const k = scale || 1;
    const g = n => (n * k).toFixed(0);
    return `<g>
      <path d="M ${x - g(40)} ${y} Q ${x - g(54)} ${y - g(130)} ${x - g(24)} ${y - g(175)} L ${x + 24 * k} ${y - g(175)} Q ${x + 54 * k} ${y - g(130)} ${x + 40 * k} ${y} Z" fill="${coat}" stroke="#000" stroke-opacity="0.3" stroke-width="3"/>
      <rect x="${x - g(23)}" y="${y - g(200)}" width="${g(46)}" height="${g(44)}" rx="9" fill="${coat}"/>
      <circle cx="${x}" cy="${y - g(220)}" r="${g(26)}" fill="${skin}"/>
      <path d="M ${x - g(26)} ${y - g(226)} Q ${x} ${y - g(254)} ${x + 26 * k} ${y - g(226)} L ${x + 26 * k} ${y - g(216)} Q ${x} ${y - g(238)} ${x - g(26)} ${y - g(216)} Z" fill="${hair}"/>
      <circle cx="${x - g(9)}" cy="${y - g(220)}" r="2.6" fill="#241628"/>
      <circle cx="${x + 9 * k}" cy="${y - g(220)}" r="2.6" fill="#241628"/>
      <line x1="${x - g(34)}" y1="${y - g(150)}" x2="${x - g(50)}" y2="${y - g(60)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
      <line x1="${x + 34 * k}" y1="${y - g(150)}" x2="${x + 52 * k}" y2="${y - g(74)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
    </g>`;
  }

  // ---------- scene: the quad ----------

  function quad(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qdsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.skyHigh}"/>
          <stop offset="100%" stop-color="${C.sky}"/>
        </linearGradient>
        <radialGradient id="qdvig" cx="50%" cy="48%" r="85%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#3a2210" stop-opacity="0.35"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#qdsky)"/>
      <circle cx="1310" cy="140" r="60" fill="${C.sun}" opacity="0.9"/>
      ${rook(800, 120, 210, 34)}${rook(700, 150, 150, 26)}

      <!-- the school range: honey stone, slate roof, warm windows -->
      <g>
        <rect x="120" y="300" width="900" height="380" fill="${C.stone}" stroke="${C.stoneDark}" stroke-width="5"/>
        <polygon points="100,300 570,180 1040,300" fill="${C.roof}" stroke="${C.roofDark}" stroke-width="5"/>
        ${[200, 340, 480, 640, 780, 900].map(wx => `<rect x="${wx}" y="${wx % 2 ? 360 : 380}" width="64" height="96" rx="6" fill="${C.inWarm}" stroke="${C.woodDark}" stroke-width="4"/>`).join('')}
        <!-- the hall doors -->
        <rect x="540" y="500" width="140" height="180" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <line x1="610" y1="500" x2="610" y2="680" stroke="${C.woodDark}" stroke-width="4"/>
        <text x="610" y="490" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">THE GREAT HALL</text>
        <!-- cellar steps beside the buttery, dropping out of the sun -->
        <rect x="860" y="580" width="120" height="100" fill="${C.stoneShadow}"/>
        ${(() => {
          let out = '', pitch = 26, edge = 580;
          for (let i = 0; i < 3; i++) {
            const t = i / 2;
            const inset = t * 16;
            const bx = 860 + inset, bw = 120 - 2 * inset;
            out += `<rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="${C.stoneDark}"/>
              <rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="${C.sun}" opacity="${(0.3 * (1 - t)).toFixed(2)}"/>
              <rect x="${bx}" y="${edge + pitch - 3}" width="${bw}" height="3" fill="${C.inRoomDark}"/>
              <rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="${C.inRoomDark}" opacity="${(0.55 * t).toFixed(2)}"/>`;
            edge += pitch;
            pitch *= 0.72;
          }
          return out + `<rect x="860" y="${edge}" width="120" height="${680 - edge}" fill="${C.inRoomDark}" opacity="0.6"/>`;
        })()}
        <text x="920" y="572" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">CELLARS</text>
      </g>

      <!-- lawn -->
      <rect x="0" y="680" width="1600" height="320" fill="${C.grass}"/>
      <path d="M 0 680 L 1600 680 L 1600 700 L 0 700 Z" fill="${C.grassDark}" opacity="0.5"/>

      <!-- the great elm and the conker ring; Tab holds court -->
      <g>
        <rect x="1180" y="360" width="36" height="330" fill="${C.wood}"/>
        <ellipse cx="1200" cy="330" rx="190" ry="150" fill="${C.leaf}"/>
        <ellipse cx="1130" cy="290" rx="90" ry="70" fill="${C.leafDark}"/>
        <ellipse cx="1280" cy="290" rx="90" ry="70" fill="${C.leafDark}" opacity="0.8"/>
        ${leaves(1050, 340, 320, 320)}
        ${S.flags.conkerTaken ? '' : `<circle cx="1252" cy="672" r="12" fill="#7a4a22" stroke="${C.woodDark}" stroke-width="3"/>`}
        <text x="1200" y="726" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the great elm &mdash; conker season</text>
      </g>
      ${figure(1100, 880, '#5a3a5a', '#caa27e', '#2a1a12', 0.72)}
      <text x="1100" y="908" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Tab Brill, conker champion</text>

      <!-- Ivy's bench under the elm: the mark-book lives here -->
      <g>
        <rect x="1330" y="800" width="200" height="22" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="1345" y="822" width="18" height="60" fill="${C.woodDark}"/>
        <rect x="1497" y="822" width="18" height="60" fill="${C.woodDark}"/>
        ${paperSheet(1390, 760, 80, 50, -4, C.pencil)}
        <text x="1430" y="912" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">Ivy&rsquo;s bench &mdash; the mark-book</text>
      </g>

      <!-- the shrubbery, chalked with trail signs -->
      <g>
        <ellipse cx="220" cy="760" rx="180" ry="80" fill="#6a6c34"/>
        <ellipse cx="120" cy="740" rx="90" ry="60" fill="#5c5e2c"/>
        <ellipse cx="330" cy="745" rx="90" ry="56" fill="#5c5e2c"/>
        <rect x="150" y="700" width="150" height="10" fill="${C.woodDark}" opacity="0.4"/>
        ${marks([
          { g: 'thisWay', x: 150, y: 748, s: 15 },
          { g: 'grub', x: 250, y: 738, s: 15 },
          { g: 'danger', x: 340, y: 752, s: 14 },
        ], S, '#f0e8cc')}
        <text x="230" y="862" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the shrubbery &mdash; somebody chalks it</text>
      </g>

      <!-- the pavilion, with Pip benched beside it -->
      <g>
        <rect x="500" y="740" width="200" height="120" fill="#e6dcc0" stroke="${C.wood}" stroke-width="4"/>
        <polygon points="490,740 600,690 710,740" fill="${C.roof}" stroke="${C.roofDark}" stroke-width="4"/>
        ${glyph('allClear', 660, 800, 13, S, '#c9b98a')}
        <text x="600" y="886" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the pavilion</text>
      </g>
      ${figure(430, 900, '#3a4a6a', '#e2b990', '#6a3a1e', 0.72)}
      <text x="430" y="928" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Pip Fairweather, benched</text>

      <!-- the gates, the lodge, and the old well -->
      <g>
        <rect x="1350" y="430" width="210" height="250" fill="${C.stone}" stroke="${C.stoneDark}" stroke-width="5"/>
        <polygon points="1340,430 1455,360 1570,430" fill="${C.roof}" stroke="${C.roofDark}" stroke-width="4"/>
        <rect x="1470" y="540" width="70" height="140" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <g stroke="${C.ink}" stroke-width="6">
          <line x1="1290" y1="480" x2="1290" y2="680"/><line x1="1330" y1="480" x2="1330" y2="680"/>
          <line x1="1282" y1="500" x2="1338" y2="500"/>
        </g>
        ${glyph('gates', 1408, 500, 15, S)}
        <text x="1440" y="700" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the lodge &mdash; Mrs. Motts keeps the gate</text>
      </g>
      ${figure(1560, 850, '#4a4a42', '#d8b394', '#8a8a86', 0.8)}

      <!-- the old well -->
      <g>
        <ellipse cx="820" cy="850" rx="70" ry="26" fill="${C.stoneDark}"/>
        <rect x="750" y="790" width="140" height="60" fill="${C.stone}" stroke="${C.stoneDark}" stroke-width="4"/>
        <ellipse cx="820" cy="790" rx="70" ry="24" fill="${C.inRoomDark}"/>
        <rect x="806" y="716" width="10" height="70" fill="${C.woodDark}"/>
        <text x="820" y="908" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the old well, off its bucket for years</text>
      </g>

      ${leaves(300, 100, 900, 500)}
      <rect width="1600" height="1000" fill="url(#qdvig)"/>
    </svg>`;
  }

  // ---------- scene: the great hall ----------

  function hall(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hlvig" cx="50%" cy="48%" r="85%">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
        <linearGradient id="hlshaft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${C.sun}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${C.sun}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.inRoom}"/>
      <rect x="0" y="700" width="1600" height="300" fill="${C.inRoomDark}"/>
      <g stroke="${C.woodDark}" stroke-width="3" opacity="0.6">
        <line x1="0" y1="760" x2="1600" y2="760"/><line x1="0" y1="850" x2="1600" y2="850"/><line x1="0" y1="930" x2="1600" y2="930"/>
      </g>

      <!-- high windows, afternoon shafts -->
      ${[260, 640, 1020].map((wx, i) => `<g>
        <rect x="${wx}" y="120" width="120" height="220" rx="50" fill="${C.sky}" stroke="${C.woodDark}" stroke-width="5"/>
        <line x1="${wx + 60}" y1="120" x2="${wx + 60}" y2="340" stroke="${C.woodDark}" stroke-width="4"/>
        <polygon points="${wx},340 ${wx + 120},340 ${wx + 320},700 ${wx + 140},700" fill="url(#hlshaft)"/>
      </g>`).join('')}

      <!-- honours boards -->
      <g>
        <rect x="1180" y="150" width="220" height="300" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <text x="1290" y="190" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${C.brass}" letter-spacing="2">CAPTAINS</text>
        <g font-family="Georgia, serif" font-size="12" fill="${C.textIn}" text-anchor="middle" opacity="0.85">
          <text x="1290" y="230">1888 &mdash; E. Vane</text><text x="1290" y="260">1889 &mdash; A. Okafor</text>
          <text x="1290" y="290">1890 &mdash; M. Bly</text><text x="1290" y="320">1891 &mdash; C. Fairweather</text>
          <text x="1290" y="350">1892 &mdash; ?</text>
        </g>
      </g>

      <!-- the trophy case, its shelf conspicuously bare -->
      <g>
        <rect x="560" y="430" width="300" height="250" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="580" y="450" width="260" height="180" fill="${C.inRoomDark}" stroke="${C.brassDeep}" stroke-width="3"/>
        <ellipse cx="710" cy="600" rx="70" ry="10" fill="#1a1008"/>
        <circle cx="845" cy="560" r="7" fill="${C.brass}"/>
        <text x="710" y="712" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the Aldergate Cup &mdash; its case, and its absence</text>
      </g>

      <!-- the head's study door -->
      <g>
        <rect x="120" y="430" width="170" height="270" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <rect x="150" y="470" width="110" height="34" rx="4" fill="${C.brass}"/>
        <text x="205" y="493" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.woodDark}" letter-spacing="1">DR. BIRCH</text>
        <circle cx="272" cy="570" r="7" fill="${C.brass}"/>
      </g>

      <!-- the bursary door, with its little brass grille -->
      <g>
        <rect x="960" y="430" width="170" height="270" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <rect x="990" y="470" width="110" height="34" rx="4" fill="${C.brass}"/>
        <text x="1045" y="493" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.woodDark}" letter-spacing="1">BURSARY</text>
        <circle cx="1112" cy="570" r="7" fill="${C.brass}"/>
        ${paperSheet(1000, 600, 90, 56, 3, C.pencil)}
      </g>

      <!-- the back stair to the attics, behind a curtain -->
      <g>
        <rect x="1440" y="430" width="130" height="270" fill="${C.inRoomDark}"/>
        ${S.flags.hatchFound ? `
          ${(() => {
            let out = '', pitch = 57, edge = 700;
            for (let i = 0; i < 4; i++) {
              const t = i / 3;
              const inset = t * 18;
              const bx = 1440 + inset, bw = 130 - 2 * inset;
              edge -= pitch;
              out += `<rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="${C.inWarm}" opacity="${(1 - 0.55 * t).toFixed(2)}"/>
                <rect x="${bx}" y="${edge}" width="${bw}" height="5" fill="${C.inRoomDark}"/>
                ${i < 2 ? `<rect x="${bx}" y="${edge + 5}" width="${bw}" height="2" fill="${C.flame}" opacity="${(0.3 - i * 0.15).toFixed(2)}"/>` : ''}`;
              pitch *= 0.76;
            }
            return out;
          })()}
          ${glyph('boltHole', 1505, 466, 13, S)}
          <text x="1505" y="716" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the back stair, up</text>`
          : `<path d="M 1440 430 Q 1505 460 1570 430 L 1570 700 L 1440 700 Z" fill="#4a3020"/>
          <text x="1505" y="716" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">a dusty curtain</text>`}
      </g>

      <!-- landing marks, low on the panelling -->
      ${marks([
        { g: 'sentry', x: 440, y: 660, s: 13 },
        { g: 'turnBack', x: 350, y: 662, s: 13 },
        { g: 'beak', x: 390, y: 660, s: 13 },
      ], S, '#d8cba8')}

      <!-- doors out to the quad -->
      <g>
        <rect x="40" y="760" width="220" height="200" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <line x1="150" y1="760" x2="150" y2="960" stroke="${C.woodDark}" stroke-width="5"/>
        <circle cx="130" cy="870" r="7" fill="${C.brass}"/><circle cx="170" cy="870" r="7" fill="${C.brass}"/>
        <text x="150" y="748" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.textIn}" letter-spacing="1">OUT TO THE QUAD</text>
      </g>

      ${gasFlame(920, 380, 2.6)}${gasFlame(480, 384, 3.1)}
      <rect width="1600" height="1000" fill="url(#hlvig)"/>
    </svg>`;
  }

  // ---------- zoom: the trophy case ----------

  function caseZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cszvig" cx="50%" cy="48%" r="78%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.inRoom}"/>
      <rect x="160" y="90" width="880" height="600" rx="14" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
      <rect x="200" y="130" width="800" height="440" fill="${C.inRoomDark}" stroke="${C.brassDeep}" stroke-width="4"/>

      <!-- the empty plinth, and the honest dust around a vanished stand -->
      <ellipse cx="600" cy="470" rx="160" ry="24" fill="#1a1008"/>
      <ellipse cx="600" cy="464" rx="90" ry="12" fill="none" stroke="${C.brassDeep}" stroke-width="2" stroke-dasharray="6 5"/>
      <text x="600" y="520" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">a clean ring in old dust &mdash; stand and all</text>

      <!-- the lock, unscratched -->
      <g>
        <circle cx="980" cy="350" r="26" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="4"/>
        <rect x="972" y="342" width="16" height="20" rx="3" fill="${C.inRoomDark}"/>
        <text x="980" y="416" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the lock</text>
      </g>

      <!-- where the forged note was pinned -->
      ${S.flags.noteExamined ? '' : `<g transform="rotate(-4 420 300)">
        ${paperSheet(370, 260, 110, 80, 0, C.pencil)}
        ${glyph('beakOld', 420, 300, 14, S, '#5a4a36')}
      </g>`}
      <text x="600" y="740" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">THE ALDERGATE CUP &mdash; presented by the Founder, 1792</text>
      <rect width="1200" height="800" fill="url(#cszvig)"/>
    </svg>`;
  }

  // ---------- zoom: the head's study ----------

  function studyZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sdzvig" cx="50%" cy="48%" r="78%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.inWarm}"/>
      <rect x="0" y="620" width="1200" height="180" fill="${C.inRoomDark}"/>

      <!-- Dr. Birch at her desk -->
      <rect x="420" y="440" width="420" height="180" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
      ${paperSheet(480, 400, 100, 60, -3, C.pencil)}${paperSheet(690, 404, 100, 60, 5, C.pencil)}
      ${figure(920, 620, '#3a3a4a', '#d8b394', '#6a6a68', 0.95)}
      <text x="920" y="652" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}">Dr. Adeline Birch, Headmistress</text>

      <!-- the founder's portrait -->
      <g>
        <rect x="120" y="120" width="200" height="260" rx="8" fill="#2a2018" stroke="${C.brass}" stroke-width="5"/>
        ${figure(220, 350, '#4a3626', '#d8b394', '#b8b8b4', 0.62)}
        <text x="220" y="404" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the Founder, disapproving</text>
      </g>

      <!-- the school plan on the wall -->
      <g>
        <rect x="700" y="120" width="380" height="240" rx="8" fill="#e6dcc0" stroke="${C.wood}" stroke-width="5"/>
        <g fill="none" stroke="${C.ink}" stroke-width="3" opacity="0.75">
          <rect x="740" y="160" width="120" height="70"/><rect x="900" y="160" width="120" height="70"/>
          <rect x="820" y="260" width="120" height="60"/>
          <line x1="860" y1="230" x2="860" y2="260"/><line x1="960" y1="230" x2="900" y2="260"/>
        </g>
        <text x="890" y="150" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.ink}" letter-spacing="1">ALDERGATE SCHOOL &mdash; PLAN</text>
        <text x="800" y="200" text-anchor="middle" font-size="11" font-family="Georgia, serif" fill="${C.ink}">HALL</text>
        <text x="960" y="200" text-anchor="middle" font-size="11" font-family="Georgia, serif" fill="${C.ink}">QUAD</text>
        <text x="880" y="296" text-anchor="middle" font-size="11" font-family="Georgia, serif" fill="${C.ink}">CELLARS</text>
      </g>

      ${gasFlame(400, 320, 2.8)}
      <rect width="1200" height="800" fill="url(#sdzvig)"/>
    </svg>`;
  }

  // ---------- zoom: the bursary ----------

  function bursaryZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bszvig" cx="50%" cy="48%" r="78%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.inRoom}"/>
      <rect x="0" y="640" width="1200" height="160" fill="${C.inRoomDark}"/>
      <text x="600" y="70" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the bursary &mdash; BURSAR AT LUNCHEON, ONE TILL TWO</text>

      <!-- the counting desk: ledger and a nervous abacus -->
      <g>
        <rect x="140" y="440" width="440" height="200" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <g transform="rotate(-3 300 420)">
          <rect x="220" y="380" width="180" height="110" rx="6" fill="#e6dcc0" stroke="${C.brassDeep}" stroke-width="4"/>
          <line x1="310" y1="380" x2="310" y2="490" stroke="${C.brassDeep}" stroke-width="2"/>
          <g stroke="#a05a4a" stroke-width="2"><line x1="234" y1="410" x2="296" y2="410"/><line x1="234" y1="434" x2="296" y2="434"/><line x1="324" y1="410" x2="386" y2="410"/><line x1="324" y1="434" x2="386" y2="458"/></g>
        </g>
        ${paperSheet(440, 390, 100, 66, 6, '#a05a4a')}
        <text x="360" y="672" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the accounts &mdash; figures that flinch</text>
      </g>

      <!-- the confiscation drawer -->
      <g>
        <rect x="680" y="480" width="260" height="160" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <rect x="700" y="510" width="220" height="50" rx="6" fill="${C.woodDark}"/>
        <circle cx="810" cy="535" r="8" fill="${C.brass}"/>
        <text x="810" y="672" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the confiscation drawer, a museum of joy</text>
      </g>

      <!-- Bonaparte's cage, high on the shelf -->
      <g>
        <rect x="960" y="220" width="180" height="16" fill="${C.wood}"/>
        ${S.flags.mouseFreed ? `
          <rect x="1000" y="130" width="100" height="90" rx="10" fill="none" stroke="${C.brassDeep}" stroke-width="4"/>
          <text x="1050" y="270" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">an empty cage</text>`
          : `
          <rect x="1000" y="130" width="100" height="90" rx="10" fill="none" stroke="${C.brass}" stroke-width="4"/>
          <g stroke="${C.brass}" stroke-width="2"><line x1="1016" y1="130" x2="1016" y2="220"/><line x1="1034" y1="130" x2="1034" y2="220"/><line x1="1052" y1="130" x2="1052" y2="220"/><line x1="1070" y1="130" x2="1070" y2="220"/><line x1="1088" y1="130" x2="1088" y2="220"/></g>
          <ellipse cx="1050" cy="206" rx="18" ry="10" fill="#b8a890"/>
          <circle cx="1066" cy="200" r="7" fill="#b8a890"/>
          <path d="M 1032 206 q -10 4 -14 -2" fill="none" stroke="#b8a890" stroke-width="3"/>
          <text x="1050" y="270" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">Bonaparte, in exile</text>`}
      </g>

      <!-- the wastepaper basket -->
      <g>
        <path d="M 500 700 L 590 700 L 578 780 L 512 780 Z" fill="${C.woodDark}" stroke="#1a1008" stroke-width="3"/>
        ${paperSheet(520, 690, 50, 30, 12, C.pencil)}
      </g>

      ${gasFlame(120, 300, 2.4)}
      <rect width="1200" height="800" fill="url(#bszvig)"/>
    </svg>`;
  }

  // ---------- scene: the attics ----------

  function attics(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="atvig" cx="50%" cy="50%" r="85%">
          <stop offset="42%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </radialGradient>
        <linearGradient id="atshaft" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="${C.sun}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${C.sun}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.inRoomDark}"/>

      <!-- rafters -->
      <g stroke="${C.wood}" stroke-width="26">
        <line x1="0" y1="380" x2="800" y2="60"/><line x1="1600" y1="380" x2="800" y2="60"/>
        <line x1="240" y1="284" x2="240" y2="720"/><line x1="800" y1="80" x2="800" y2="720"/><line x1="1360" y1="284" x2="1360" y2="720"/>
      </g>
      <rect x="0" y="720" width="1600" height="280" fill="#241a10"/>
      <g stroke="#180f08" stroke-width="3" opacity="0.7"><line x1="0" y1="790" x2="1600" y2="790"/><line x1="0" y1="880" x2="1600" y2="880"/></g>

      <!-- dormer window and its dusty shaft -->
      <g>
        <rect x="1050" y="180" width="110" height="150" rx="8" fill="${C.sky}" stroke="${C.woodDark}" stroke-width="5"/>
        <polygon points="1050,330 1160,330 1340,720 1130,720" fill="url(#atshaft)"/>
      </g>

      <!-- the hatch down, chalked with the club's welcome -->
      <g>
        <rect x="120" y="740" width="220" height="150" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="150" y="770" width="160" height="90" fill="${C.inRoomDark}"/>
        ${marks([
          { g: 'moot', x: 180, y: 716, s: 13 },
          { g: 'midnight', x: 232, y: 716, s: 13 },
          { g: 'boltHole', x: 290, y: 716, s: 13 },
        ], S)}
        <text x="230" y="922" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" letter-spacing="1">THE HATCH, DOWN</text>
      </g>

      <!-- the club map, chalked on a slate propped against the chimney -->
      <g>
        <rect x="560" y="360" width="100" height="360" fill="${C.stoneShadow}"/>
        <rect x="480" y="440" width="260" height="200" rx="8" fill="#2e2a28" stroke="${C.woodDark}" stroke-width="5" transform="rotate(-4 610 540)"/>
        <g transform="rotate(-4 610 540)" stroke="${C.chalk}" stroke-width="2.5" fill="none" opacity="0.9">
          <rect x="510" y="470" width="70" height="46"/><rect x="610" y="470" width="70" height="46"/>
          <rect x="560" y="560" width="70" height="40"/>
          <path d="M 580 516 L 580 560 M 645 516 L 620 560"/>
        </g>
        ${marks([
          { g: 'carrying', x: 700, y: 500, s: 12 },
          { g: 'gates', x: 700, y: 550, s: 12 },
        ], S)}
        <text x="610" y="700" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the club&rsquo;s own map of the school</text>
      </g>

      <!-- Inky, and the society's strongbox -->
      ${figure(1000, 720, '#4a4038', '#c99a6e', '#1a1410', 0.72)}
      <text x="1000" y="748" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}">Inky Marlow, Chief Scribe</text>
      <g>
        <rect x="1180" y="600" width="220" height="120" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <g stroke="${C.brassDeep}" stroke-width="4"><line x1="1180" y1="640" x2="1400" y2="640"/></g>
        ${S.flags.boxOpen
          ? `<rect x="1200" y="560" width="180" height="40" rx="6" fill="${C.woodDark}"/><text x="1290" y="754" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the strongbox, open</text>`
          : `<circle cx="1290" cy="660" r="20" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="4"/><text x="1290" y="754" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the society&rsquo;s strongbox &mdash; it asks three questions</text>`}
      </g>

      <!-- odd treasures: a twine reel among them -->
      <g>
        <rect x="820" y="820" width="300" height="20" fill="${C.wood}"/>
        ${S.flags.twineTaken ? '' : `<circle cx="880" cy="800" r="20" fill="#c9b98a" stroke="${C.woodDark}" stroke-width="4"/><circle cx="880" cy="800" r="6" fill="${C.woodDark}"/>`}
        <rect x="960" y="784" width="60" height="36" rx="6" fill="#7a4a5a"/>
        <circle cx="1080" cy="796" r="16" fill="#5a7a8a"/>
        <text x="970" y="874" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the club&rsquo;s museum of the confiscatable</text>
      </g>

      <rect width="1600" height="1000" fill="url(#atvig)"/>
    </svg>`;
  }

  // ---------- scene: the cellars ----------

  function cellars(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="clvig" cx="46%" cy="50%" r="85%">
          <stop offset="40%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="#2a2018"/>
      <g fill="#332720" stroke="#1e150e" stroke-width="4">
        <path d="M 200 0 L 200 720 M 700 0 L 700 720 M 1200 0 L 1200 720" fill="none"/>
        <path d="M 0 200 Q 450 60 900 200 M 700 200 Q 1150 60 1600 200" fill="none"/>
      </g>
      <rect x="0" y="720" width="1600" height="280" fill="#1e150e"/>

      <!-- steps up to the quad: the flight climbs OUT of the dark, so
           the fade inverts — afternoon gold spills down from the door
           above, and the top of the well glows instead of drowning -->
      <g>
        <rect x="60" y="280" width="180" height="440" fill="#3a2c22"/>
        ${(() => {
          let out = '', pitch = 88, edge = 720;
          for (let i = 0; i < 5; i++) {
            const t = i / 4;
            const inset = t * 28;
            const bx = 60 + inset, bw = 180 - 2 * inset;
            edge -= pitch;
            out += `<rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="#2a2014"/>
              <rect x="${bx}" y="${edge}" width="${bw}" height="6" fill="${C.stoneDark}"/>
              <rect x="${bx}" y="${edge}" width="${bw}" height="${pitch}" fill="${C.sun}" opacity="${(0.06 + 0.3 * t).toFixed(2)}"/>`;
            pitch *= 0.76;
          }
          return out + `<rect x="60" y="280" width="180" height="${edge - 280}" fill="${C.sun}" opacity="0.3"/>`;
        })()}
        <text x="150" y="266" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.textIn}" letter-spacing="1">UP TO THE QUAD</text>
      </g>

      <!-- the buttery: barrels, jars, the vinegar -->
      <g>
        <rect x="330" y="470" width="300" height="24" fill="${C.wood}"/>
        <rect x="330" y="600" width="300" height="24" fill="${C.wood}"/>
        ${[380, 470, 560].map(bx => `<rect x="${bx - 26}" y="${bx % 2 ? 506 : 512}" width="52" height="88" rx="10" fill="#5a4030" stroke="#2e1e12" stroke-width="4"/>`).join('')}
        ${S.flags.vinegarTaken ? '' : `<g>
          <rect x="404" y="410" width="34" height="58" rx="8" fill="#8a9a5a" stroke="#4a5a2a" stroke-width="3"/>
          <rect x="412" y="398" width="18" height="14" rx="3" fill="#4a5a2a"/>
        </g>`}
        ${glyph('grub', 590, 440, 14, S)}
        <text x="480" y="676" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the buttery shelves</text>
      </g>

      <!-- the feast corner -->
      <g>
        <rect x="760" y="520" width="280" height="100" rx="10" fill="#3a2c22"/>
        ${[800, 850, 900, 950, 1000].map(cx => `<circle cx="${cx}" cy="${cx % 2 ? 500 : 508}" r="6" fill="#e8d8a0"/>`).join('')}
        <rect x="820" y="450" width="14" height="40" fill="#e8d8a0"/>
        <rect x="960" y="446" width="14" height="44" fill="#e8d8a0"/>
        ${marks([
          { g: 'boltHole', x: 790, y: 660, s: 13 },
          { g: 'allClear', x: 850, y: 660, s: 13 },
        ], S)}
        ${glyph('sentry', 1010, 660, 13, S)}
        <text x="900" y="712" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">crumbs, candle stubs, and thirteen apple cores</text>
      </g>

      <!-- the retired desks, carved by generations -->
      <g>
        <g transform="rotate(-6 1320 520)">
          <rect x="1220" y="470" width="200" height="110" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
          ${glyph('beakOld', 1320, 520, 16, S, '#8a6a42')}
          <text x="1320" y="562" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#8a6a42" font-style="italic">A.Q. 1858</text>
        </g>
        <rect x="1240" y="600" width="200" height="90" rx="8" fill="${C.woodDark}" transform="rotate(4 1340 645)"/>
        <text x="1330" y="740" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">retired desks, stacked like tombstones</text>
      </g>

      <!-- the poker by the old furnace -->
      <g>
        <rect x="1120" y="240" width="120" height="150" rx="10" fill="#3a2c22" stroke="#1e150e" stroke-width="4"/>
        <circle cx="1180" cy="315" r="26" fill="#54402c"/>
        ${S.flags.pokerTaken ? '' : `<line x1="1080" y1="280" x2="1110" y2="400" stroke="#6a6a72" stroke-width="8" stroke-linecap="round"/>`}
        <text x="1180" y="420" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.textIn}" font-style="italic">the dead furnace</text>
      </g>

      <!-- a candle left burning low -->
      <g>
        <rect x="878" y="586" width="16" height="30" fill="#e8d8a0"/>
        ${gasFlame(886, 584, 2.2)}
      </g>

      <rect width="1600" height="1000" fill="url(#clvig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const icons = {
    forgedNote: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="40" rx="3" fill="#efe6cf" stroke="#8a6a30" stroke-width="3" transform="rotate(-4 32 32)"/>
      <path d="M 22 40 L 32 26 L 42 40 Z" fill="none" stroke="#5a4a36" stroke-width="3"/>
      <line x1="26" y1="24" x2="38" y2="34" stroke="#5a4a36" stroke-width="2.5"/>
      <line x1="38" y1="24" x2="26" y2="34" stroke="#5a4a36" stroke-width="2.5"/>
    </svg>`,
    conker: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="16" fill="#7a4a22" stroke="#3e2a18" stroke-width="3"/>
      <ellipse cx="26" cy="28" rx="6" ry="4" fill="#a06a38" opacity="0.8"/>
    </svg>`,
    vinegar: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="20" width="20" height="34" rx="6" fill="#8a9a5a" stroke="#4a5a2a" stroke-width="3"/>
      <rect x="27" y="10" width="10" height="12" rx="3" fill="#4a5a2a"/>
    </svg>`,
    seasonedConker: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="16" fill="#5a3416" stroke="#2e1a0c" stroke-width="4"/>
      <ellipse cx="26" cy="28" rx="6" ry="4" fill="#8a5a2a" opacity="0.9"/>
      <path d="M 32 14 L 32 6" stroke="#c9b98a" stroke-width="3"/>
    </svg>`,
    penknife: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="34" width="30" height="12" rx="5" fill="#7a4a5a" stroke="#3e2430" stroke-width="3"/>
      <path d="M 42 38 L 58 24 L 56 34 L 44 44 Z" fill="#c9c9d2" stroke="#6a6a72" stroke-width="2"/>
    </svg>`,
    mouse: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="38" rx="18" ry="12" fill="#b8a890" stroke="#6a5a48" stroke-width="3"/>
      <circle cx="46" cy="32" r="8" fill="#b8a890" stroke="#6a5a48" stroke-width="3"/>
      <circle cx="50" cy="26" r="4" fill="#b8a890"/>
      <circle cx="48" cy="31" r="1.6" fill="#241628"/>
      <path d="M 12 40 q -8 4 -4 10" fill="none" stroke="#6a5a48" stroke-width="3"/>
    </svg>`,
    poker: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <line x1="16" y1="52" x2="46" y2="14" stroke="#6a6a72" stroke-width="6" stroke-linecap="round"/>
      <path d="M 46 14 l 8 8" stroke="#6a6a72" stroke-width="5" stroke-linecap="round"/>
      <circle cx="16" cy="52" r="6" fill="none" stroke="#6a6a72" stroke-width="4"/>
    </svg>`,
    twine: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="16" fill="#c9b98a" stroke="#8a7a52" stroke-width="3"/>
      <circle cx="32" cy="32" r="5" fill="#8a7a52"/>
      <path d="M 46 40 q 12 6 8 16" fill="none" stroke="#8a7a52" stroke-width="3"/>
    </svg>`,
    fishline: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="50" x2="40" y2="16" stroke="#6a6a72" stroke-width="5" stroke-linecap="round"/>
      <path d="M 40 16 q 12 2 10 14 q -2 8 -10 6" fill="none" stroke="#8a7a52" stroke-width="3"/>
      <path d="M 40 40 q 0 8 -8 8" fill="none" stroke="#c9c9d2" stroke-width="3"/>
    </svg>`,
    watchLog: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="4" fill="#2e2a28" stroke="#8a6a30" stroke-width="3"/>
      <path d="M 22 28 q 5 -4 10 0 q -5 4 -10 0 Z" fill="none" stroke="#f6efdf" stroke-width="2.5"/>
      <path d="M 38 24 l 6 8 M 44 24 l -6 8" stroke="#f6efdf" stroke-width="2.5"/>
      <line x1="20" y1="42" x2="44" y2="42" stroke="#f6efdf" stroke-width="2"/>
    </svg>`,
    pawnTicket: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="18" width="44" height="28" rx="4" fill="#efe6cf" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="20" cy="32" r="4" fill="none" stroke="#8a6a30" stroke-width="2"/>
      <text x="36" y="37" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#5a4a36">No. 88</text>
    </svg>`,
  };

  return {
    glyph, marks, MEANINGS, BATCH,
    quad, hall, caseZoom, studyZoom, bursaryZoom, attics, cellars, icons,
  };
})();
