/* Art for Chapter Seven — "The Guard's Watch".
   Namespaced under Art.ch7. Scenes 1600x1000, zooms 1200x800.

   The Down Night Mail, a night in March 1897, running Crewe to Carlisle
   in the dark. This chapter founds its identity on a SHAPE GRAMMAR the
   series hasn't used: no perspective boxes, no vanishing point. Every
   carriage is a strict side-elevation cutaway in horizontal bands —
   roof, interior, floor, underframe — as though the train were drawn by
   a carriage-works draughtsman and then had one side lifted off.

   The light MOVES. Earlier chapters lit a room from a fixed source and
   held still; here the only steady light is the swaying oil lamp, and
   everything else — signal lamps, cottage windows, station gas, the
   sparks off the chimney — streams past the window strip at speed. The
   window is the clock: S.flags.moving decides whether the world runs.

   Signature motion: the streaming window, the lamp's slow pendulum, and
   sparks. Give every gradient a unique id per painter; two painters can
   share the DOM through zoom overlays. */

Art.ch7 = (() => {
  const { paperSheet, clockFace, stars } = Art;

  const C = {
    night: '#0b1020', nightFar: '#161f38', nightGlow: '#24365c',
    soot: '#14161c', steel: '#2a3340', steelLit: '#3d4a5c', steelHi: '#57677d',
    wood: '#4a3524', woodDark: '#2e2118',
    amber: '#f0b25a', amberDim: '#a8783a', glow: '#ffd89a',
    brass: '#c9a544', brassDeep: '#8a6a30',
    cream: '#e8dfc8', paper: '#d8d0b8',
    ink: '#0a0c10', text: '#9fb0c4', textDim: '#6a7a8e',
    clear: '#7fd8d0', danger: '#e05a4a', firebox: '#ff8a3a',
    canvas: '#6a5a48', leather: '#5a4030',
  };

  /* The journey. The chapter's whole state of time is one number: which
     stop we have last left (S.flags.leg), plus whether we are moving.
     Everything else in the night — the sky, the window, the platform —
     is painted from it. Leg 4 (Penrith) is the last wire in England;
     after it S.flags.final runs the train at Carlisle without stopping. */
  const stations = [
    { name: 'Crewe', time: '3.40' },
    { name: 'Warrington', time: '4.02' },
    { name: 'Preston', time: '4.31' },
    { name: 'Lancaster', time: '4.55' },
    { name: 'Penrith', time: '5.40' },
  ];

  // The sky bleeds from dead midnight-black toward the first grey of a
  // March dawn as the legs pass. The night itself is a progress bar.
  function skyOf(S) {
    const leg = S.flags.final ? 5 : (S.flags.leg || 0);
    return [C.night, C.night, '#101830', '#16203c', '#1e2a44', '#33405c'][Math.min(leg, 5)];
  }

  // ---------- the streaming world ----------

  /* The window strip: the chapter's signature motion. Standing, the
     night holds still and a station's gas hangs in it; running, two
     tiled copies of the same country stream leftward forever, and the
     signal lamps sweep through. */
  function worldStrip(id, x, y, w, h, S) {
    const sky = skyOf(S);
    const moving = !!S.flags.moving;
    const dur = 9;

    const country = ox => `<g transform="translate(${ox} 0)">
      <path d="M 0 ${h * 0.72} L 90 ${h * 0.6} L 190 ${h * 0.75} L 320 ${h * 0.58} L 430 ${h * 0.74} L 560 ${h * 0.66} L ${w} ${h * 0.78} L ${w} ${h} L 0 ${h} Z" fill="${C.soot}"/>
      ${[70, 250, 430, 600].map(px => `<g stroke="${C.soot}" stroke-width="4">
        <line x1="${px}" y1="${h * 0.28}" x2="${px}" y2="${h * 0.72}"/>
        <line x1="${px - 14}" y1="${h * 0.34}" x2="${px + 14}" y2="${h * 0.34}"/>
        <line x1="${px - 11}" y1="${h * 0.44}" x2="${px + 11}" y2="${h * 0.44}"/>
      </g>`).join('')}
      <rect x="150" y="${h * 0.55}" width="34" height="26" fill="${C.soot}"/>
      <rect x="158" y="${h * 0.6}" width="10" height="9" fill="${C.amberDim}" opacity="0.9"/>
      <rect x="500" y="${h * 0.58}" width="30" height="24" fill="${C.soot}"/>
      <rect x="507" y="${h * 0.62}" width="9" height="8" fill="${C.amberDim}" opacity="0.75"/>
    </g>`;

    // Signal lamps sweeping through at speed — the light that moves.
    const signals = moving ? [0, 1].map(i => `<g>
      <circle cx="${w + 40}" cy="${h * 0.42}" r="7" fill="${i ? C.clear : C.danger}" opacity="0.95">
        <animate attributeName="opacity" values="0;1;1;0" dur="${dur * 1.5}s" begin="${i * 5.5}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 0; ${-(w + 120)} 0" dur="${dur * 1.5}s" begin="${i * 5.5}s" repeatCount="indefinite"/>
      </circle>
    </g>`).join('') : '';

    // Standing: a platform's gas lamps hang steady in the glass instead.
    const platformGlass = moving ? '' : `<g>
      ${[90, 300, 510].map(px => `<g>
        <rect x="${px}" y="${h * 0.2}" width="5" height="${h * 0.45}" fill="${C.soot}"/>
        <circle cx="${px + 2}" cy="${h * 0.2}" r="10" fill="${C.glow}" opacity="0.75">
          <animate attributeName="opacity" values="0.6;0.85;0.6" dur="4.5s" repeatCount="indefinite"/>
        </circle>
      </g>`).join('')}
    </g>`;

    return `<g>
      <defs>
        <clipPath id="${id}clip"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
        <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${sky}"/>
          <stop offset="100%" stop-color="${C.nightFar}"/>
        </linearGradient>
      </defs>
      <g clip-path="url(#${id}clip)">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}sky)"/>
        <g transform="translate(${x} ${y})">
          ${stars([[60, 24, 1.6], [180, 16, 1.2], [300, 30, 1.8], [420, 18, 1.3], [540, 26, 1.5]], '#c8d6ea')}
          ${moving ? `<g>
            <animateTransform attributeName="transform" type="translate" values="0 0; ${-w} 0" dur="${dur}s" repeatCount="indefinite"/>
            ${country(0)}${country(w)}
          </g>` : country(0)}
          ${platformGlass}
          ${signals}
        </g>
      </g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${C.woodDark}" stroke-width="6"/>
    </g>`;
  }

  // ---------- carriage grammar ----------

  /* The draughtsman's band: roof line, body, floor, solebar. Every
     carriage in this chapter is built from this and nothing else. */
  function carriageShell(id, wall) {
    return `<g>
      <defs>
        <linearGradient id="${id}wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${wall || C.steelLit}"/>
          <stop offset="100%" stop-color="${C.steel}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.soot}"/>
      <!-- roof band -->
      <rect x="0" y="60" width="1600" height="70" fill="${C.steel}"/>
      <rect x="0" y="126" width="1600" height="10" fill="${C.ink}" opacity="0.6"/>
      <!-- interior band -->
      <rect x="0" y="136" width="1600" height="614" fill="url(#${id}wall)"/>
      <!-- floor band: planks worn flat by boots, soot pooling at the ends -->
      <rect x="0" y="750" width="1600" height="60" fill="${C.wood}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i =>
        `${i % 2 ? `<rect x="${i * 130}" y="758" width="130" height="52" fill="${C.ink}" opacity="0.08"/>` : ''}
         <line x1="${i * 130}" y1="758" x2="${i * 130}" y2="810" stroke="${C.woodDark}" stroke-width="2" opacity="0.6"/>`).join('')}
      <rect x="0" y="770" width="1600" height="22" fill="${C.cream}" opacity="0.06"/>
      <rect x="0" y="750" width="90" height="60" fill="${C.ink}" opacity="0.35"/>
      <rect x="1510" y="750" width="90" height="60" fill="${C.ink}" opacity="0.35"/>
      <rect x="0" y="750" width="1600" height="8" fill="${C.woodDark}"/>
      <!-- solebar and underframe: the draughtsman's cutaway -->
      <rect x="0" y="810" width="1600" height="34" fill="${C.steelHi}" opacity="0.5"/>
      <rect x="0" y="844" width="1600" height="156" fill="${C.ink}"/>
      ${wheelset(240)}${wheelset(560)}${wheelset(1060)}${wheelset(1380)}
      <rect x="0" y="978" width="1600" height="22" fill="${C.steel}"/>
    </g>`;
  }

  // A wheel, turning while the train runs. Never a hotspot — decoration.
  function wheelset(cx) {
    return `<g>
      <circle cx="${cx}" cy="${920}" r="62" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="5"/>
      <circle cx="${cx}" cy="${920}" r="14" fill="${C.steelHi}"/>
      <g stroke="${C.steelHi}" stroke-width="4">
        <animateTransform attributeName="transform" type="rotate" values="0 ${cx} 920; 360 ${cx} 920" dur="1.4s" repeatCount="indefinite"/>
        ${[0, 45, 90, 135].map(a => {
          const r = a * Math.PI / 180;
          return `<line x1="${(cx - 52 * Math.cos(r)).toFixed(1)}" y1="${(920 - 52 * Math.sin(r)).toFixed(1)}" x2="${(cx + 52 * Math.cos(r)).toFixed(1)}" y2="${(920 + 52 * Math.sin(r)).toFixed(1)}"/>`;
        }).join('')}
      </g>
    </g>`;
  }

  /* The one steady light in the chapter — and it sways. Everything else
     the eye can see is going past at fifty miles an hour. */
  function swayLamp(id, x, y) {
    return `<g>
      <defs>
        <radialGradient id="${id}pool" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="${C.glow}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${C.glow}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-2.2 ${x} ${y - 10}; 2.2 ${x} ${y - 10}; -2.2 ${x} ${y - 10}" dur="6s" repeatCount="indefinite"/>
        <line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 30}" stroke="${C.brassDeep}" stroke-width="5"/>
        <path d="M ${x - 34} ${y + 88} L ${x - 22} ${y + 30} L ${x + 22} ${y + 30} L ${x + 34} ${y + 88} Z" fill="${C.glow}" opacity="0.9"/>
        <ellipse cx="${x}" cy="${y + 88}" rx="34" ry="9" fill="${C.amber}"/>
        <ellipse cx="${x}" cy="${y + 190}" rx="150" ry="150" fill="url(#${id}pool)"/>
      </g>
    </g>`;
  }

  // Sparks off the chimney, streaming back over the train.
  function sparks(x, y, n) {
    let out = '';
    for (let i = 0; i < n; i++) {
      const dur = 2 + (i % 4) * 0.7;
      out += `<circle cx="${x}" cy="${y}" r="${2 + (i % 3)}" fill="${C.firebox}">
        <animate attributeName="opacity" values="1;0.9;0" dur="${dur}s" begin="${(i * 0.43).toFixed(2)}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 0; ${260 + i * 40} ${-40 - (i % 5) * 22}" dur="${dur}s" begin="${(i * 0.43).toFixed(2)}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return `<g>${out}</g>`;
  }

  // A figure, drawn flat to the elevation like everything else.
  function figure(x, y, coat, skin, hair, scale) {
    const k = scale || 1;
    const g = n => (n * k).toFixed(0);
    return `<g>
      <path d="M ${x - g(40)} ${y} Q ${x - g(54)} ${y - g(130)} ${x - g(24)} ${y - g(175)} L ${x + 24 * k} ${y - g(175)} Q ${x + 54 * k} ${y - g(130)} ${x + 40 * k} ${y} Z" fill="${coat}" stroke="${C.ink}" stroke-opacity="0.55" stroke-width="3"/>
      <rect x="${x - g(23)}" y="${y - g(200)}" width="${g(46)}" height="${g(44)}" rx="9" fill="${coat}"/>
      <circle cx="${x}" cy="${y - g(220)}" r="${g(26)}" fill="${skin}"/>
      <path d="M ${x - g(28)} ${y - g(228)} Q ${x} ${y - g(256)} ${x + 28 * k} ${y - g(228)} L ${x + 28 * k} ${y - g(220)} Q ${x} ${y - g(242)} ${x - g(28)} ${y - g(220)} Z" fill="${hair}"/>
      <circle cx="${x - g(9)}" cy="${y - g(220)}" r="2.6" fill="${C.ink}"/>
      <circle cx="${x + 9 * k}" cy="${y - g(220)}" r="2.6" fill="${C.ink}"/>
      <line x1="${x - g(34)}" y1="${y - g(150)}" x2="${x - g(50)}" y2="${y - g(60)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
      <line x1="${x + 34 * k}" y1="${y - g(150)}" x2="${x + 52 * k}" y2="${y - g(74)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
    </g>`;
  }

  function label(x, y, text, size) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 13}" font-family="Georgia, serif" font-style="italic" fill="${C.text}">${text}</text>`;
  }

  // A carriage door in the side elevation — how you get to a platform.
  function carriageDoor(x, open) {
    return `<g>
      <rect x="${x}" y="${300}" width="130" height="450" rx="6" fill="${open ? C.ink : C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
      ${open ? '' : `<rect x="${x + 22}" y="330" width="86" height="120" rx="4" fill="${C.night}" stroke="${C.woodDark}" stroke-width="4"/>
      <circle cx="${x + 104}" cy="530" r="9" fill="${C.brass}"/>`}
    </g>`;
  }

  // ---------- shared small dials (also used by the puzzle renders) ----------

  /* The guard's watch. It runs four minutes fast all night and never
     once lies about it — nobody asked it the right question. */
  function watchDial(cx, cy, r, h, m) {
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="${C.brassDeep}"/>
      <rect x="${cx - 5}" y="${cy - r - 20}" width="10" height="14" rx="3" fill="${C.brass}"/>
      ${clockFace(cx, cy, r, h, m, { face: '#f4ecd6', rim: C.brass, ink: '#241c14' })}
    </g>`;
  }

  // A station clock: gas-lit, Greenwich-true, and utterly unbothered.
  function stationClock(cx, cy, r, h, m) {
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="${C.ink}" stroke="${C.steelHi}" stroke-width="5"/>
      ${clockFace(cx, cy, r, h, m, { face: '#e9e4d2', rim: '#8a929c', ink: '#1a1c22' })}
      <text x="${cx}" y="${cy + r * 0.55}" text-anchor="middle" font-size="${Math.max(7, r * 0.13)}" font-family="Georgia, serif" fill="#5a6068">GREENWICH</text>
    </g>`;
  }

  // The quarter-mileposts, for counting against a watch.
  function postStrip(w, h, lit) {
    let out = `<rect x="0" y="0" width="${w}" height="${h}" rx="8" fill="${C.night}"/>
      <rect x="0" y="${h - 16}" width="${w}" height="16" fill="${C.soot}"/>`;
    for (let i = 0; i < 4; i++) {
      const x = 46 + i * ((w - 92) / 3);
      const on = i < lit;
      out += `<g opacity="${on ? 1 : 0.3}">
        <rect x="${x - 3}" y="${h * 0.42}" width="6" height="${h * 0.42}" fill="${on ? C.clear : C.steelHi}"/>
        <rect x="${x - 17}" y="${h * 0.3}" width="34" height="24" rx="3" fill="${on ? C.cream : C.steel}" stroke="${C.steelHi}" stroke-width="2"/>
        <text x="${x}" y="${h * 0.3 + 17}" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${on ? C.ink : C.textDim}">${['118', '&#188;', '&#189;', '&#190;'][i]}</text>
      </g>`;
    }
    return out;
  }

  // ---------- scene: the guard's van (the rear of the train) ----------

  function guardsVan(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      ${carriageShell('gv', '#3a4452')}
      ${swayLamp('gv', 800, 140)}

      <!-- forward gangway to the sorters -->
      <g>
        <rect x="30" y="290" width="150" height="460" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="6"/>
        <path d="M 60 320 L 150 320 L 150 720 L 60 720 Z" fill="${C.night}"/>
        ${[340, 420, 500, 580, 660].map(y => `<line x1="60" y1="${y}" x2="150" y2="${y}" stroke="${C.steelHi}" stroke-width="3" opacity="0.5"/>`).join('')}
        ${label(105, 780, 'forward &mdash; the sorting van')}
      </g>

      <!-- the window strip: the night, running or held -->
      ${worldStrip('gvw', 240, 210, 620, 240, S)}
      ${label(550, 480, F.moving ? 'the world, going by at fifty' : 'the window &mdash; we are standing')}

      <!-- the guard's desk: journal, telegraph forms, the lamp rack -->
      <g>
        <rect x="250" y="560" width="380" height="26" rx="4" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="268" y="586" width="20" height="164" fill="${C.woodDark}"/>
        <rect x="592" y="586" width="20" height="164" fill="${C.woodDark}"/>
        ${F.journalTaken ? '' : `<g><rect x="290" y="520" width="110" height="44" rx="3" fill="${C.leather}" stroke="${C.ink}" stroke-width="3"/>
          <rect x="296" y="514" width="98" height="8" fill="${C.paper}"/>
          ${label(345, 508, 'the journal', 12)}</g>`}
        ${F.padTaken ? '' : `<g>${paperSheet(450, 520, 90, 44, -3, '#8a90a0')}
          ${label(495, 508, 'telegraph forms', 12)}</g>`}
      </g>

      <!-- the lamp rack: a dark lantern, dry as a sermon -->
      <g>
        <rect x="690" y="560" width="120" height="16" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="3"/>
        ${F.lanternTaken ? '' : `<g>
          <rect x="720" y="490" width="60" height="70" rx="6" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="4"/>
          <rect x="732" y="506" width="36" height="38" rx="3" fill="${C.ink}"/>
          <path d="M 730 490 q 20 -26 40 0" fill="none" stroke="${C.steelHi}" stroke-width="4"/>
          ${label(750, 588, 'a dark lantern', 12)}</g>`}
      </g>

      <!-- Abel Hare, guard of the Down Mail, waiting to be ruined -->
      ${figure(1080, 740, '#22303e', '#d8b394', '#8a8a86', 0.92)}
      ${label(1080, 772, 'Abel Hare, guard')}

      <!-- the strongroom: the whole case in one iron door -->
      <g>
        <rect x="1180" y="280" width="300" height="470" rx="8" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="6"/>
        <rect x="1210" y="310" width="240" height="410" rx="6" fill="${F.strongOpen ? C.ink : '#333d4c'}" stroke="${C.steelHi}" stroke-width="5"/>
        ${F.strongOpen ? `<g>
          ${[350, 430, 510].map(y => `<rect x="1240" y="${y}" width="180" height="10" fill="${C.steelHi}" opacity="0.5"/>`).join('')}
          ${F.ballastFound ? '' : `<rect x="1252" y="546" width="156" height="110" rx="8" fill="${C.canvas}" stroke="${C.ink}" stroke-width="4" opacity="${F.lanternLit ? 1 : 0.25}"/>`}
        </g>` : `<g>
          <circle cx="1330" cy="520" r="34" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="5"/>
          <line x1="1330" y1="496" x2="1330" y2="544" stroke="${C.brassDeep}" stroke-width="5"/>
          ${F.sealSeen ? '' : `<circle cx="1418" cy="430" r="14" fill="#9aa0a8" stroke="${C.ink}" stroke-width="3"/>`}
        </g>`}
        ${label(1330, 782, 'the registered strongroom')}
      </g>

      <!-- the last stage: Rooke comes back for his arrest, and gets
           something else entirely -->
      ${F.final ? `<g>${figure(880, 744, '#1c2530', '#e2c0a0', '#4a4038', 0.9)}
        ${label(880, 776, 'Inspector Rooke')}</g>` : ''}

      <!-- the tail lamp and the rear door out to a platform -->
      ${F.final ? '' : carriageDoor(880, false)}
      ${F.final ? '' : label(945, 790, 'the van door')}
      <g>
        <circle cx="1540" cy="470" r="26" fill="${C.danger}" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="5s" repeatCount="indefinite"/>
        </circle>
        <rect x="1516" y="490" width="48" height="40" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="3"/>
        ${label(1540, 560, 'the tail lamp', 12)}
      </g>
    </svg>`;
  }

  // ---------- scene: the travelling post office ----------

  function sortingVan(S) {
    const F = S.flags;
    const bags = ['A', 'B', 'F', 'R'];
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      ${carriageShell('sv', '#38414e')}
      ${swayLamp('sv', 420, 140)}
      ${swayLamp('sv2', 1180, 140)}

      <!-- gangways: forward to the carriage, back to the guard -->
      <g>
        <rect x="30" y="290" width="140" height="460" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="6"/>
        ${label(100, 780, 'forward &mdash; the carriage')}
      </g>
      <g>
        <rect x="1430" y="290" width="140" height="460" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="6"/>
        ${label(1500, 780, 'back &mdash; the guard&rsquo;s van')}
      </g>

      <!-- the sorting frame: pigeonholes to the roof, re-lettered tonight -->
      <g>
        <rect x="220" y="200" width="470" height="420" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${236 + c * 90}" y="${216 + r * 100}" width="78" height="88" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="3"/>`).join('')).join('')}
        ${[0, 1, 2, 3, 4].map(c => `<rect x="${236 + c * 90}" y="${606 + 0}" width="78" height="12" fill="${C.paper}" opacity="0.8"/>`).join('')}
        ${label(455, 650, 'the sorting frame &mdash; re-lettered for tonight')}
      </g>

      <!-- the pouches hanging ready, one of them a trap -->
      <g>
        <rect x="760" y="250" width="360" height="14" fill="${C.steel}"/>
        ${bags.map((b, i) => `<g>
          <line x1="${800 + i * 90}" y1="264" x2="${800 + i * 90}" y2="300" stroke="${C.steelHi}" stroke-width="4"/>
          <path d="M ${772 + i * 90} 300 L ${828 + i * 90} 300 L ${822 + i * 90} 390 L ${778 + i * 90} 390 Z" fill="${b === 'F' ? '#6a4a30' : C.leather}" stroke="${C.ink}" stroke-width="3"/>
          <text x="${800 + i * 90}" y="${350}" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="${C.cream}">${b}</text>
        </g>`).join('')}
        ${label(940, 420, 'the pouches, lettered A B F R')}
      </g>

      <!-- Tench, the sorter, honest to his fingertips -->
      ${figure(1230, 740, '#2e3c4e', '#caa27e', '#3a2a18', 0.86)}
      ${label(1230, 772, 'Tench, sorter')}

      <!-- the apparatus door: where the mail leaves at speed -->
      <g>
        <rect x="820" y="470" width="300" height="280" rx="6" fill="${F.armOut ? C.ink : C.steel}" stroke="${C.steelHi}" stroke-width="6"/>
        ${F.armOut ? `<g>
          <rect x="850" y="500" width="240" height="220" fill="${C.night}"/>
          <line x1="850" y1="560" x2="1090" y2="560" stroke="${C.steelHi}" stroke-width="8"/>
          <path d="M 1000 560 L 1060 560 L 1060 640 L 1000 640" fill="none" stroke="${C.clear}" stroke-width="5"/>
        </g>` : `<g>
          ${[0, 1, 2].map(i => `<line x1="${860 + i * 96}" y1="500" x2="${860 + i * 96}" y2="720" stroke="${C.steelHi}" stroke-width="4" opacity="0.5"/>`).join('')}
          <circle cx="1090" cy="610" r="12" fill="${C.brass}"/>
        </g>`}
        ${label(970, 782, 'the apparatus door &mdash; nets and arms')}
      </g>
      ${F.pouchTaken ? '' : `<g>
        <path d="M 660 690 L 736 690 L 728 756 L 668 756 Z" fill="${C.leather}" stroke="${C.ink}" stroke-width="3"/>
        ${label(698, 682, 'a spare pouch', 12)}</g>`}
    </svg>`;
  }

  // ---------- scene: the first-class corridor ----------

  function corridor(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      ${carriageShell('co', '#463a44')}
      ${swayLamp('co', 500, 140)}
      ${swayLamp('co2', 1220, 140)}

      <!-- forward to the engine end; back to the sorters -->
      <g>
        <rect x="30" y="290" width="140" height="460" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="6"/>
        ${label(100, 780, 'forward &mdash; the engine end')}
      </g>
      <g>
        <rect x="1430" y="290" width="140" height="460" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="6"/>
        ${label(1500, 780, 'back &mdash; the sorting van')}
      </g>

      ${worldStrip('cow', 200, 200, 340, 220, S)}
      ${carriageDoor(560, false)}
      ${label(625, 790, 'the carriage door')}

      <!-- the compartment: buttoned plush, and a man who has decided -->
      <g>
        <rect x="760" y="180" width="620" height="570" rx="8" fill="#3e2f3c" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="790" y="560" width="560" height="30" rx="6" fill="#5a3a4a"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${820 + i * 100}" cy="640" r="7" fill="#7a4a5a"/>`).join('')}
        <rect x="790" y="590" width="560" height="160" fill="#4a3140"/>
        ${label(1070, 782, 'Inspector Rooke&rsquo;s compartment')}
      </g>
      ${figure(1180, 700, '#1c2530', '#e2c0a0', '#4a4038', 0.9)}
      ${label(1180, 730, 'Inspector Culpepper Rooke', 12)}

      <!-- the dispatch case: everything Ivy needs is inside it -->
      <g>
        <rect x="830" y="470" width="170" height="96" rx="6" fill="${F.caseOpen ? '#6a4a30' : C.leather}" stroke="${C.ink}" stroke-width="4"/>
        ${F.caseOpen ? `<g>
          ${paperSheet(915, 452, 100, 40, 3, '#7a8090')}
          <rect x="846" y="500" width="138" height="56" fill="${C.ink}" opacity="0.5"/>
        </g>` : `<g>
          <rect x="898" y="462" width="34" height="16" rx="6" fill="none" stroke="${C.ink}" stroke-width="4"/>
          <rect x="900" y="508" width="30" height="20" rx="3" fill="${C.brass}"/>
        </g>`}
        ${label(915, 590, 'his dispatch case', 12)}
      </g>
    </svg>`;
  }

  // ---------- scene: the footplate ----------

  function footplate(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fpfire" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#ffd08a" stop-opacity="0.95"/>
          <stop offset="60%" stop-color="${C.firebox}" stop-opacity="0.65"/>
          <stop offset="100%" stop-color="${C.firebox}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.soot}"/>
      <rect x="0" y="0" width="1600" height="200" fill="${skyOf(S)}"/>
      ${stars([[200, 70, 1.8], [420, 40, 1.3], [900, 84, 1.5], [1240, 52, 1.7], [1450, 90, 1.2]], '#c8d6ea')}

      <!-- the boiler backhead in flat elevation, and the fire -->
      <rect x="0" y="200" width="1600" height="620" fill="${C.steel}"/>
      <rect x="0" y="820" width="1600" height="180" fill="${C.ink}"/>
      ${wheelset(320)}${wheelset(700)}${wheelset(1180)}
      <g>
        <rect x="560" y="240" width="480" height="500" rx="10" fill="#232a34" stroke="${C.steelHi}" stroke-width="6"/>
        ${[0, 1, 2].map(i => `<circle cx="${640 + i * 150}" cy="330" r="34" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="4"/>`).join('')}
        <!-- the firehole: the one warm thing in this chapter -->
        <rect x="700" y="470" width="200" height="150" rx="8" fill="${C.ink}" stroke="${C.steelHi}" stroke-width="5"/>
        <rect x="716" y="486" width="168" height="118" fill="${C.firebox}">
          <animate attributeName="opacity" values="0.75;1;0.8;1;0.75" dur="2.4s" repeatCount="indefinite"/>
        </rect>
        <ellipse cx="800" cy="545" rx="290" ry="230" fill="url(#fpfire)"/>
        ${label(800, 780, 'the firehole &mdash; the only warmth on the Down Mail')}
      </g>

      <!-- the chimney end, throwing sparks back down the train -->
      <g>
        <rect x="120" y="300" width="180" height="120" fill="#232a34" stroke="${C.steelHi}" stroke-width="5"/>
        <rect x="170" y="230" width="80" height="80" rx="6" fill="${C.ink}" stroke="${C.steelHi}" stroke-width="4"/>
        ${sparks(210, 230, 9)}
      </g>

      ${figure(1180, 740, '#1a1e24', '#c99a72', '#241a12', 0.92)}
      ${label(1180, 772, 'Job Sherrick, driver')}
      ${figure(1400, 740, '#1a1e24', '#d8b394', '#3a2a18', 0.86)}
      ${label(1400, 772, 'Nib, fireman')}

      <!-- the oil can on the tool ledge -->
      ${F.oilTaken ? '' : `<g>
        <rect x="360" y="640" width="150" height="14" fill="${C.steelHi}"/>
        <path d="M 400 640 L 400 596 L 452 596 L 452 640 Z" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="3"/>
        <path d="M 452 606 L 500 574" stroke="${C.brassDeep}" stroke-width="5"/>
        ${label(435, 682, 'the oil can', 12)}</g>`}

      <!-- down the ladder to the platform -->
      <g>
        <rect x="30" y="560" width="70" height="260" fill="${C.ink}" stroke="${C.steelHi}" stroke-width="4"/>
        ${[600, 660, 720, 780].map(y => `<line x1="30" y1="${y}" x2="100" y2="${y}" stroke="${C.steelHi}" stroke-width="5"/>`).join('')}
        ${label(65, 850, 'down', 12)}
      </g>
    </svg>`;
  }

  // ---------- scene: the platform (re-painted at every stop) ----------

  /* The moving map made visible. One painter, five stations: the name
     board, the clock, the sky and the waiting reply all come out of
     S.flags.leg. Standing here is the only place a question can be
     asked of the world beyond the train. */
  function platform(S) {
    const F = S.flags;
    const leg = Math.min(F.leg || 0, stations.length - 1);
    const st = stations[leg];
    const [hh, mm] = st.time.split('.').map(Number);
    const waiting = (F.wiredBoxLeg != null && !F.gotBox && (leg > F.wiredBoxLeg || leg === 4))
      || (F.wiredOfficeLeg != null && !F.gotOffice && (leg > F.wiredOfficeLeg || leg === 4));
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${skyOf(S)}"/>
          <stop offset="100%" stop-color="${C.nightGlow}"/>
        </linearGradient>
        <radialGradient id="plgas" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stop-color="${C.glow}" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="${C.glow}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#plsky)"/>
      ${stars([[140, 90, 1.7], [520, 60, 1.3], [980, 100, 1.5], [1380, 70, 1.8]], '#c8d6ea')}

      <!-- the platform itself: flagstones, a coping edge, gaslight pooling -->
      <rect x="0" y="620" width="1600" height="80" fill="${C.soot}"/>
      <rect x="0" y="620" width="1600" height="6" fill="${C.steelHi}" opacity="0.5"/>
      <g stroke="${C.ink}" stroke-width="2" opacity="0.5">
        ${[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500].map(x =>
          `<line x1="${x}" y1="626" x2="${x}" y2="700"/>`).join('')}
      </g>
      ${[220, 620, 1020, 1420].map(x =>
        `<ellipse cx="${x}" cy="660" rx="120" ry="24" fill="${C.glow}" opacity="0.10"/>`).join('')}

      <!-- the station awning and its gas -->
      <rect x="0" y="180" width="1600" height="40" fill="${C.steel}"/>
      ${[220, 620, 1020, 1420].map(x => `<g>
        <rect x="${x - 5}" y="220" width="10" height="70" fill="${C.steel}"/>
        <circle cx="${x}" cy="300" r="16" fill="${C.glow}">
          <animate attributeName="opacity" values="0.75;1;0.8;1;0.75" dur="${4 + (x % 3)}s" repeatCount="indefinite"/>
        </circle>
        <ellipse cx="${x}" cy="420" rx="150" ry="190" fill="url(#plgas)"/>
      </g>`).join('')}

      <!-- the name board: the whole novelty, spelled out in serif -->
      <g>
        <rect x="560" y="330" width="480" height="110" rx="6" fill="${C.ink}" stroke="${C.steelHi}" stroke-width="5"/>
        <text x="800" y="402" text-anchor="middle" font-size="52" font-family="Georgia, serif" fill="${C.cream}" letter-spacing="4">${st.name.toUpperCase()}</text>
      </g>
      ${stationClock(1300, 400, 96, hh, mm)}
      ${label(1300, 530, 'the station clock &mdash; set from Greenwich by wire')}

      <!-- the telegraph hatch: questions in, answers a stop later -->
      <g>
        <rect x="140" y="330" width="300" height="290" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="176" y="366" width="228" height="140" rx="4" fill="${C.amberDim}" opacity="0.5"/>
        <rect x="176" y="366" width="228" height="140" rx="4" fill="none" stroke="${C.woodDark}" stroke-width="4"/>
        ${waiting ? `<g>${paperSheet(290, 530, 110, 44, -5, '#7a8090')}
          <circle cx="360" cy="352" r="12" fill="${C.clear}">
            <animate attributeName="opacity" values="0.35;1;0.35" dur="1.8s" repeatCount="indefinite"/>
          </circle></g>` : ''}
        <text x="290" y="600" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="${C.cream}" letter-spacing="2">TELEGRAPH</text>
        ${label(290, 660, waiting ? 'something is waiting for you' : 'ask, and wait a stop for the answer')}
      </g>

      <!-- the train itself, drawn flat along the platform edge -->
      <rect x="0" y="700" width="1600" height="40" fill="${C.steelHi}" opacity="0.4"/>
      <rect x="0" y="740" width="1600" height="180" fill="${C.steel}"/>
      ${[120, 470, 900, 1330].map(x => `<rect x="${x}" y="760" width="150" height="90" rx="4" fill="${C.night}" stroke="${C.steelHi}" stroke-width="3"/>`).join('')}
      <rect x="0" y="920" width="1600" height="80" fill="${C.ink}"/>
      ${label(800, 968, 'the Down Mail, standing &mdash; and the clock running on without her')}

      <!-- the doors back aboard -->
      ${carriageDoor(700, true)}
      ${label(765, 690, 'aboard &mdash; the guard&rsquo;s van')}
      <g>
        <rect x="1080" y="700" width="120" height="220" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="5"/>
        ${label(1140, 690, 'aboard &mdash; the carriage')}
      </g>
      <g>
        <rect x="60" y="700" width="120" height="220" rx="6" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="5"/>
        ${label(120, 690, 'up to the engine')}
      </g>
    </svg>`;
  }

  // ---------- zooms ----------

  function strongroomZoom(S) {
    const F = S.flags;
    const dark = !F.lanternLit;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="srbeam" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="${C.glow}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${C.glow}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.ink}"/>
      <rect x="60" y="60" width="1080" height="680" fill="${C.steel}" stroke="${C.steelHi}" stroke-width="6"/>
      ${[0, 1, 2].map(r => `<rect x="100" y="${110 + r * 190}" width="1000" height="16" fill="${C.steelHi}" opacity="0.55"/>`).join('')}
      ${dark ? '' : `<ellipse cx="600" cy="420" rx="520" ry="380" fill="url(#srbeam)"/>`}
      <g opacity="${dark ? 0.14 : 1}">
        ${F.ballastFound ? `<g>
          ${paperSheet(470, 470, 260, 150, -4, '#6a7080')}
          <text x="600" y="520" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="#2a2e38">EVENING &#183; 14th</text>
          <text x="600" y="560" text-anchor="middle" font-size="15" font-family="Georgia, serif" font-style="italic" fill="#3a4048">printed in London, and never north of it</text>
        </g>` : `<g>
          <path d="M 430 640 L 770 640 L 740 440 L 460 440 Z" fill="${C.canvas}" stroke="${C.ink}" stroke-width="5"/>
          <line x1="470" y1="452" x2="730" y2="452" stroke="${C.ink}" stroke-width="4"/>
          <text x="600" y="560" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#3a3228">REGISTERED</text>
        </g>`}
        ${F.sealSeen ? '' : `<g>
          <circle cx="900" cy="300" r="42" fill="#9aa0a8" stroke="${C.ink}" stroke-width="4"/>
          <text x="900" y="308" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#2a2e34">G.P.O.</text>
          <line x1="858" y1="300" x2="700" y2="330" stroke="#b8bcc4" stroke-width="4"/>
        </g>`}
      </g>
      <text x="600" y="740" text-anchor="middle" font-size="17" font-family="Georgia, serif" font-style="italic" fill="${dark ? C.textDim : C.text}">${dark ? 'black as the inside of a hat &mdash; and no window in a strongroom' : 'the strongroom, lit at last'}</text>
    </svg>`;
  }

  function frameZoom(S) {
    const F = S.flags;
    const letters = ['A', 'B', 'F', 'R'];
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="${C.soot}"/>
      <rect x="60" y="60" width="1080" height="600" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
      ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<g>
        <rect x="${110 + c * 250}" y="${100 + r * 180}" width="230" height="160" fill="${C.ink}" stroke="${C.woodDark}" stroke-width="4"/>
        ${r === 0 ? `<rect x="${110 + c * 250}" y="${262}" width="230" height="22" fill="${C.paper}"/>
          <text x="${225 + c * 250}" y="${279}" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${C.ink}">${letters[c]}</text>` : ''}
        ${r === 0 && F.reLettered ? `<text x="${225 + c * 250}" y="${180}" text-anchor="middle" font-size="15" font-family="Georgia, serif" font-style="italic" fill="${C.clear}">${['as booked', 'as booked', 'the trial pouch', 'the strongroom'][c]}</text>` : ''}
      </g>`).join('')).join('')}
      <text x="600" y="720" text-anchor="middle" font-size="18" font-family="Georgia, serif" font-style="italic" fill="${C.text}">the sorting frame &mdash; and a bulkhead with tonight&rsquo;s orders pasted to it</text>
      ${F.bulletinRead ? '' : `<g>${paperSheet(940, 540, 170, 100, 4, '#8a90a0')}
        <text x="1025" y="590" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#2a2e38">NOTICE</text></g>`}
    </svg>`;
  }

  function caseZoom(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="${C.soot}"/>
      <rect x="120" y="90" width="960" height="560" rx="10" fill="${C.leather}" stroke="${C.ink}" stroke-width="6"/>
      <rect x="160" y="130" width="880" height="480" rx="6" fill="#4a3628"/>
      ${F.caseOpen ? `<g>
        ${paperSheet(230, 190, 340, 380, -2, '#7a8090')}
        <text x="400" y="250" text-anchor="middle" font-size="20" font-family="Georgia, serif" fill="#2a2e38">SPECIAL TRAFFIC</text>
        <text x="400" y="282" text-anchor="middle" font-size="20" font-family="Georgia, serif" fill="#2a2e38">NOTICE No. 41</text>
        ${[330, 370, 410, 450, 490].map(y => `<line x1="255" y1="${y}" x2="545" y2="${y}" stroke="#8a90a0" stroke-width="3"/>`).join('')}
        <text x="400" y="545" text-anchor="middle" font-size="15" font-family="Georgia, serif" font-style="italic" fill="#3a4048">M. Vane, Supt.</text>
        ${paperSheet(640, 210, 320, 300, 3, '#8a90a0')}
        <text x="800" y="360" text-anchor="middle" font-size="17" font-family="Georgia, serif" font-style="italic" fill="#3a4048">the charge sheet, already written</text>
      </g>` : `<g>
        <rect x="500" y="330" width="200" height="90" rx="6" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="5"/>
        <circle cx="600" cy="375" r="22" fill="${C.brassDeep}"/>
        <text x="600" y="500" text-anchor="middle" font-size="18" font-family="Georgia, serif" font-style="italic" fill="${C.text}">locked, and its owner in no mood</text>
      </g>`}
    </svg>`;
  }

  function journalZoom(S) {
    const F = S.flags;
    const rows = [
      ['2.10', 'Sowerby Trough apparatus &mdash; exchange as booked'],
      ['2.22', 'Registered sack received from sorters, sealed unopened'],
      ['2.30', 'Strongroom sealed. Tail lamp trimmed.'],
      ['2.34', 'Passed Cadger&rsquo;s Bank (per timetable). Nothing to exchange.'],
      ['3.05', 'Crewe. Sack sealed, seals good, sack full of newspaper.'],
    ];
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="${C.soot}"/>
      <rect x="90" y="60" width="1020" height="680" rx="8" fill="${C.leather}" stroke="${C.ink}" stroke-width="6"/>
      <rect x="130" y="100" width="940" height="600" fill="#e6dfc8"/>
      <line x1="300" y1="100" x2="300" y2="700" stroke="#b8a888" stroke-width="3"/>
      <text x="600" y="150" text-anchor="middle" font-size="20" font-family="Georgia, serif" fill="#3a3428">GUARD&#8217;S JOURNAL &#183; DOWN MAIL &#183; 14th MARCH</text>
      ${rows.map((r, i) => `<g>
        <text x="215" y="${230 + i * 90}" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#2a2620">${r[0]}</text>
        <text x="330" y="${230 + i * 90}" font-size="19" font-family="Georgia, serif" fill="#3a3428">${r[1]}</text>
        ${F.corrected ? `<text x="330" y="${256 + i * 90}" font-size="16" font-family="Georgia, serif" font-style="italic" fill="#8a3a2a">true time ${['2.06', '2.18', '2.26', '2.30', '3.01'][i]} &mdash; four minutes earlier than he thought</text>` : ''}
      </g>`).join('')}
      <text x="600" y="770" text-anchor="middle" font-size="16" font-family="Georgia, serif" font-style="italic" fill="${C.text}">every hour of it honest, and every hour of it wrong</text>
    </svg>`;
  }

  // ---------- icons ----------

  const icons = {
    watch: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="20" fill="#8a6a30"/>
      <circle cx="32" cy="36" r="16" fill="#f4ecd6" stroke="#c9a544" stroke-width="2"/>
      <rect x="28" y="10" width="8" height="10" rx="2" fill="#c9a544"/>
      <line x1="32" y1="36" x2="32" y2="25" stroke="#241c14" stroke-width="2.5"/>
      <line x1="32" y1="36" x2="41" y2="40" stroke="#241c14" stroke-width="2.5"/>
    </svg>`,
    journal: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="42" rx="3" fill="#5a4030" stroke="#0a0c10" stroke-width="3"/>
      <rect x="18" y="18" width="28" height="30" fill="#e6dfc8"/>
      <line x1="22" y1="26" x2="42" y2="26" stroke="#8a7a5a" stroke-width="2"/>
      <line x1="22" y1="34" x2="42" y2="34" stroke="#8a7a5a" stroke-width="2"/>
      <line x1="22" y1="42" x2="36" y2="42" stroke="#8a7a5a" stroke-width="2"/>
    </svg>`,
    notice: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="36" height="46" rx="2" fill="#d8d0b8" stroke="#5a6068" stroke-width="3"/>
      <text x="32" y="30" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#2a2e38">41</text>
      <line x1="20" y1="38" x2="44" y2="38" stroke="#7a8090" stroke-width="2"/>
      <line x1="20" y1="45" x2="44" y2="45" stroke="#7a8090" stroke-width="2"/>
    </svg>`,
    lantern: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="24" height="30" rx="4" fill="#2a3340" stroke="#57677d" stroke-width="3"/>
      <rect x="26" y="27" width="12" height="16" rx="2" fill="#0a0c10"/>
      <path d="M 24 20 q 8 -12 16 0" fill="none" stroke="#57677d" stroke-width="3"/>
    </svg>`,
    litLantern: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="35" r="20" fill="#ffd89a" opacity="0.35"/>
      <rect x="20" y="20" width="24" height="30" rx="4" fill="#2a3340" stroke="#57677d" stroke-width="3"/>
      <rect x="26" y="27" width="12" height="16" rx="2" fill="#ffd89a"/>
      <path d="M 24 20 q 8 -12 16 0" fill="none" stroke="#57677d" stroke-width="3"/>
    </svg>`,
    oilCan: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 50 L 18 30 L 40 30 L 40 50 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <path d="M 40 34 L 56 20" stroke="#8a6a30" stroke-width="4"/>
      <rect x="24" y="22" width="10" height="8" fill="#8a6a30"/>
    </svg>`,
    pad: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="14" width="38" height="38" rx="2" fill="#e8e2cc" stroke="#5a6068" stroke-width="3"/>
      <rect x="13" y="14" width="38" height="9" fill="#7fd8d0"/>
      <line x1="20" y1="34" x2="44" y2="34" stroke="#8a90a0" stroke-width="2"/>
      <line x1="20" y1="42" x2="38" y2="42" stroke="#8a90a0" stroke-width="2"/>
    </svg>`,
    key: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="32" r="10" fill="none" stroke="#c9a544" stroke-width="5"/>
      <line x1="32" y1="32" x2="52" y2="32" stroke="#c9a544" stroke-width="5"/>
      <line x1="46" y1="32" x2="46" y2="42" stroke="#c9a544" stroke-width="4"/>
    </svg>`,
    seal: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="36" r="15" fill="#9aa0a8" stroke="#0a0c10" stroke-width="3"/>
      <text x="32" y="41" text-anchor="middle" font-size="11" font-family="Georgia, serif" fill="#2a2e34">GPO</text>
      <path d="M 20 30 L 8 20" stroke="#b8bcc4" stroke-width="3"/>
      <path d="M 44 30 L 56 20" stroke="#b8bcc4" stroke-width="3"/>
    </svg>`,
    newspaper: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="34" rx="2" fill="#d8d0b8" stroke="#5a6068" stroke-width="3" transform="rotate(-3 32 33)"/>
      <text x="32" y="30" text-anchor="middle" font-size="9" font-family="Georgia, serif" fill="#2a2e38">EVENING</text>
      <line x1="16" y1="38" x2="48" y2="38" stroke="#7a8090" stroke-width="2"/>
      <line x1="16" y1="44" x2="42" y2="44" stroke="#7a8090" stroke-width="2"/>
    </svg>`,
    pouch: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 18 L 46 18 L 42 52 L 22 52 Z" fill="#5a4030" stroke="#0a0c10" stroke-width="3"/>
      <line x1="18" y1="26" x2="46" y2="26" stroke="#0a0c10" stroke-width="2.5"/>
    </svg>`,
    strap: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 40 q 22 -22 44 0" fill="none" stroke="#5a4030" stroke-width="6"/>
      <rect x="28" y="24" width="10" height="8" rx="2" fill="#c9a544"/>
    </svg>`,
    weightedPouch: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 18 L 46 18 L 42 52 L 22 52 Z" fill="#6a4a30" stroke="#0a0c10" stroke-width="3"/>
      <path d="M 14 22 q 18 -16 36 0" fill="none" stroke="#5a4030" stroke-width="5"/>
      <circle cx="32" cy="40" r="7" fill="#2a3340"/>
    </svg>`,
  };

  return {
    stations,
    icons,
    watchDial,
    stationClock,
    postStrip,
    guardsVan,
    sortingVan,
    corridor,
    footplate,
    platform,
    strongroomZoom,
    frameZoom,
    caseZoom,
    journalZoom,
  };
})();
