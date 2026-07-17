/* Art for Chapter Eight — "The Ratcatcher's Nine".
   Namespaced under Art.ch8. Scenes 1600x1000, zooms 1200x800.

   Gullscombe, a stacked Cornish harbour town, in the hour before a
   foggy dawn. The chapter's art signature is DIFFUSE light: for the
   first time in the series there is no single source — no lamp, no
   beam, no footlights. Brightness seeps in evenly through sea-fog,
   and the only warm notes are amber windows and the cats themselves.

   The second signature is the WET MIRROR: the harbour repeats
   everything upside-down. Quay stones and still water carry wobbling,
   half-erased reflections of whatever stands on them.

   Signature motion: the cats (tail-flicks and slow blinks), drifting
   fog banks, bobbing hulls and their reflections, wheeling gulls.
   Give every gradient a unique id per painter; two painters can share
   the DOM through zoom overlays. Never animate hotspot geometry. */

Art.ch8 = (() => {
  const { paperSheet, stars } = Art;

  const C = {
    // the fog-pearl sky, brightening as the town climbs
    skyHi: '#39485a', sky: '#5c7284', skyLow: '#93a6b2', dawn: '#d9c39a',
    fog: '#aebfc9', sea: '#243440', seaMid: '#3c5462', seaHi: '#5f7d8c',
    // the town
    stone: '#57616b', stoneLit: '#7c8994', slate: '#39424c', slateNew: '#5d6a76',
    limewash: '#c9cbc0', limeDim: '#a3a89e', tar: '#14181d', ink: '#0d1014',
    wood: '#4c3b2b', woodDark: '#2c2216', woodLit: '#6b5334',
    amber: '#f2c076', glow: '#ffe0a8', brass: '#c9a544', brassDeep: '#8a6a30',
    rust: '#8a5a38', rope: '#a08a5e', canvas: '#8d8672',
    // the cats: the only saturated things in Gullscombe
    marmalade: '#d68a3c', marmDeep: '#a96524', black: '#181b20', blackHi: '#2e333c',
    white: '#ece9e0', whiteDim: '#c9c5ba', grey: '#88919a', greyDeep: '#5f6871',
    tortie: '#6b4a30', eyeGreen: '#a8d8a0', eyeAmber: '#f0c060', eyeMoon: '#cfe0d8',
    // ink for labels
    text: '#a8b6c2', textDim: '#71808c', paper: '#ded5bd',
  };

  // ---------- small weather ----------

  /* Fog banks: flat translucent lozenges sliding slowly across.  The
     whole chapter breathes at this tempo. */
  function fogBands(y, w, n, dur) {
    let out = '';
    for (let i = 0; i < n; i++) {
      const yy = y + i * 46;
      const d = (dur || 34) + i * 9;
      out += `<g opacity="0.16">
        <ellipse cx="${-300 + i * 220}" cy="${yy}" rx="460" ry="26" fill="${C.fog}">
          <animateTransform attributeName="transform" type="translate" values="0 0; ${w + 900} 0" dur="${d}s" repeatCount="indefinite"/>
        </ellipse>
      </g>`;
    }
    return out;
  }

  // A gull, wheeling on a slow circle. Decoration only, never a hotspot.
  function gull(cx, cy, r, dur, begin) {
    return `<g>
      <g transform="translate(${cx} ${cy})">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${dur}s" begin="${begin || 0}s" repeatCount="indefinite"/>
          <path d="M ${r} 0 q 9 -8 18 0 q -9 -3 -18 0 Z M ${r} 0 q -9 -8 -18 0 q 9 -3 18 0 Z" fill="${C.limewash}" opacity="0.85"/>
        </g>
      </g>
    </g>`;
  }

  function label(x, y, text, size) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 14}" font-family="Georgia, serif" font-style="italic" fill="${C.text}">${text}</text>`;
  }

  // ---------- the cats ----------

  /* The shared cat glyph. Poses: 'sit' (upright, tail curled round),
     'loaf' (paws tucked), 'perch' (crouched high, tail hanging).
     Every cat blinks, and every tail-tip keeps its own slow time. */
  function cat(x, y, s, opts) {
    const o = opts || {};
    const fill = o.fill || C.grey;
    const eye = o.eye || C.eyeAmber;
    const pose = o.pose || 'sit';
    const flip = o.flip ? -1 : 1;
    const stripes = o.stripes || '';
    const chest = o.chest || '';
    const dur = o.dur || 7;
    const n = v => (v * s).toFixed(1);

    const eyes = o.asleep
      ? `<path d="M -10 -66 q 4 3 8 0 M 2 -66 q 4 3 8 0" stroke="${C.ink}" stroke-width="2" fill="none" transform="scale(${s})"/>`
      : `<g transform="scale(${s})">
          <ellipse cx="-7" cy="-67" rx="3.4" ry="4.4" fill="${eye}">
            <animate attributeName="ry" values="4.4;4.4;0.5;4.4" keyTimes="0;0.9;0.94;1" dur="${dur}s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="7" cy="-67" rx="3.4" ry="4.4" fill="${eye}">
            <animate attributeName="ry" values="4.4;4.4;0.5;4.4" keyTimes="0;0.9;0.94;1" dur="${dur}s" repeatCount="indefinite"/>
          </ellipse>
        </g>`;

    const head = `
      <g transform="scale(${s})">
        <circle cx="0" cy="-64" r="17" fill="${fill}"/>
        <path d="M -14 -74 L -19 -92 L -4 -79 Z" fill="${fill}"/>
        <path d="M 14 -74 L 19 -92 L 4 -79 Z" fill="${fill}"/>
        <path d="M -13.5 -75 L -16 -85 L -8 -78 Z" fill="${C.ink}" opacity="0.35"/>
        <path d="M 13.5 -75 L 16 -85 L 8 -78 Z" fill="${C.ink}" opacity="0.35"/>
      </g>
      ${eyes}
      <g transform="scale(${s})" stroke="${C.textDim}" stroke-width="0.8" opacity="0.8">
        <line x1="10" y1="-60" x2="26" y2="-62"/><line x1="10" y1="-57" x2="26" y2="-56"/>
        <line x1="-10" y1="-60" x2="-26" y2="-62"/><line x1="-10" y1="-57" x2="-26" y2="-56"/>
      </g>`;

    let body = '';
    let tail = '';
    if (pose === 'sit') {
      body = `<g transform="scale(${s})">
        <path d="M -16 0 Q -22 -34 -8 -50 L 10 -50 Q 22 -30 18 0 Z" fill="${fill}"/>
        ${chest ? `<path d="M -4 -2 Q -8 -30 2 -46 L 8 -46 Q 14 -26 12 -2 Z" fill="${chest}"/>` : ''}
        ${stripes ? `<g stroke="${stripes}" stroke-width="3" opacity="0.7" fill="none">
          <path d="M -14 -34 q 14 -6 28 0"/><path d="M -15 -22 q 15 -6 31 0"/><path d="M -16 -10 q 16 -6 33 0"/>
        </g>` : ''}
        <ellipse cx="-8" cy="-1" rx="9" ry="4" fill="${fill}"/>
        <ellipse cx="10" cy="-1" rx="9" ry="4" fill="${fill}"/>
      </g>`;
      tail = `<g transform="scale(${s})">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 18 -4; 9 18 -4; 0 18 -4" dur="${dur * 0.8}s" repeatCount="indefinite"/>
          <path d="M 18 -4 Q 38 -2 40 -22" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>
        </g>
      </g>`;
    } else if (pose === 'loaf') {
      body = `<g transform="scale(${s})">
        <path d="M -30 0 Q -32 -34 -6 -38 L 16 -38 Q 34 -30 32 0 Z" fill="${fill}"/>
        ${stripes ? `<g stroke="${stripes}" stroke-width="3" opacity="0.7" fill="none">
          <path d="M -22 -26 q 24 -8 48 0"/><path d="M -24 -14 q 26 -8 52 0"/>
        </g>` : ''}
      </g>`;
      tail = `<g transform="scale(${s})">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 -28 -6; -7 -28 -6; 0 -28 -6" dur="${dur * 0.9}s" repeatCount="indefinite"/>
          <path d="M -28 -6 Q -44 -4 -46 -14" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>
        </g>
      </g>`;
      // loaf: head sits lower and forward
      return `<g transform="translate(${x} ${y}) scale(${flip} 1)">
        ${tail}${body}
        <g transform="translate(${n(14)} ${n(26)})">${head}</g>
      </g>`;
    } else { // perch: crouched on an edge, tail hanging below
      body = `<g transform="scale(${s})">
        <path d="M -26 0 Q -28 -30 -4 -34 L 14 -34 Q 30 -26 28 0 Z" fill="${fill}"/>
      </g>`;
      tail = `<g transform="scale(${s})">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 -22 -2; 6 -22 -2; 0 -22 -2" dur="${dur}s" repeatCount="indefinite"/>
          <path d="M -22 -2 Q -30 20 -24 34" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>
        </g>
      </g>`;
      return `<g transform="translate(${x} ${y}) scale(${flip} 1)">
        ${tail}${body}
        <g transform="translate(${n(12)} ${n(22)})">${head}</g>
      </g>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${flip} 1)">${tail}${body}${head}</g>`;
  }

  // The four principals, so scenes and boards paint them consistently.
  const CATS = {
    pilchard: { fill: C.marmalade, stripes: C.marmDeep, eye: C.eyeGreen, chest: '#e8c9a0' },
    tar:      { fill: C.black, eye: C.eyeGreen },
    duchess:  { fill: C.white, eye: C.eyeAmber },
    hapenny:  { fill: C.grey, eye: C.eyeMoon },
  };

  /* The companion, drawn at Ivy's heel wherever she stands. The scene
     painters pass their own heel-spot; the chip in the topbar and this
     little figure are the same fact told twice. */
  function companion(S, x, y, s) {
    const w = S.flags.withCat;
    if (!w || !CATS[w]) return '';
    const k = CATS[w];
    const names = { pilchard: 'Pilchard', tar: 'Tar', duchess: 'Duchess', hapenny: 'Ha&rsquo;penny' };
    return cat(x, y, s || 0.8, { fill: k.fill, eye: k.eye, stripes: k.stripes, chest: k.chest, pose: 'sit' })
      + label(x, y + 30, names[w] + ', at heel', 12);
  }

  // ---------- the marks: Pike's column-heads, tag-stamps, door-signs ----------

  /* One little glyph language, used on the collar tags, at the heads
     of the ledger columns, and on the finale board. */
  function markGlyph(kind, x, y, s, color) {
    const k = color || C.brassDeep;
    const g = {
      herring: `<path d="M -14 0 Q -4 -8 8 0 Q -4 8 -14 0 Z M 8 0 L 15 -6 L 15 6 Z" fill="none" stroke="${k}" stroke-width="2.6"/>`,
      loaf: `<path d="M -13 6 L -13 0 Q -13 -9 0 -9 Q 13 -9 13 0 L 13 6 Z" fill="none" stroke="${k}" stroke-width="2.6"/><line x1="-6" y1="-8" x2="-4" y2="-2" stroke="${k}" stroke-width="2"/><line x1="4" y1="-8" x2="6" y2="-2" stroke="${k}" stroke-width="2"/>`,
      sail: `<path d="M -2 -14 L -2 10 M -2 -12 Q 14 -6 12 8 L -2 8 M -2 10 L -10 10" fill="none" stroke="${k}" stroke-width="2.6"/>`,
      oar: `<path d="M -12 12 L 6 -8 M 6 -8 Q 8 -16 14 -14 Q 16 -8 10 -4 Q 6 -2 6 -8 Z" fill="none" stroke="${k}" stroke-width="2.6"/>`,
      bell: `<path d="M -10 8 Q -10 -4 0 -12 Q 10 -4 10 8 Z" fill="none" stroke="${k}" stroke-width="2.6"/><circle cx="0" cy="11" r="2.4" fill="${k}"/>`,
      anchor: `<line x1="0" y1="-12" x2="0" y2="8" stroke="${k}" stroke-width="2.6"/><circle cx="0" cy="-12" r="3" fill="none" stroke="${k}" stroke-width="2.2"/><path d="M -12 2 Q -10 12 0 12 Q 10 12 12 2 M -12 2 L -7 4 M 12 2 L 7 4" fill="none" stroke="${k}" stroke-width="2.6"/>`,
      kettle: `<path d="M -10 8 L -8 -4 L 8 -4 L 10 8 Z M -8 -2 Q -16 -4 -12 4 M 0 -4 L 0 -9 M -3 -9 L 3 -9" fill="none" stroke="${k}" stroke-width="2.4"/>`,
      boot: `<path d="M -6 -12 L 4 -12 L 4 2 L 14 6 L 14 10 L -6 10 Z" fill="none" stroke="${k}" stroke-width="2.4"/>`,
      book: `<path d="M 0 -8 Q -8 -12 -14 -8 L -14 8 Q -8 4 0 8 Q 8 4 14 8 L 14 -8 Q 8 -12 0 -8 L 0 8" fill="none" stroke="${k}" stroke-width="2.4"/>`,
    }[kind] || '';
    return `<g transform="translate(${x} ${y}) scale(${s || 1})">${g}</g>`;
  }

  const MARKS = ['herring', 'loaf', 'sail', 'oar', 'bell', 'anchor', 'kettle', 'boot', 'book'];

  // ---------- people ----------

  // A figure, fog-muted. Same grammar as the rest of the series.
  function figure(x, y, coat, skin, hair, scale) {
    const k = scale || 1;
    const g = n => (n * k).toFixed(0);
    return `<g>
      <path d="M ${x - g(40)} ${y} Q ${x - g(54)} ${y - g(130)} ${x - g(24)} ${y - g(175)} L ${x + 24 * k} ${y - g(175)} Q ${x + 54 * k} ${y - g(130)} ${x + 40 * k} ${y} Z" fill="${coat}" stroke="${C.ink}" stroke-opacity="0.5" stroke-width="3"/>
      <rect x="${x - g(23)}" y="${y - g(200)}" width="${g(46)}" height="${g(44)}" rx="9" fill="${coat}"/>
      <circle cx="${x}" cy="${y - g(220)}" r="${g(26)}" fill="${skin}"/>
      <path d="M ${x - g(28)} ${y - g(228)} Q ${x} ${y - g(256)} ${x + 28 * k} ${y - g(228)} L ${x + 28 * k} ${y - g(220)} Q ${x} ${y - g(242)} ${x - g(28)} ${y - g(220)} Z" fill="${hair}"/>
      <circle cx="${x - g(9)}" cy="${y - g(220)}" r="2.6" fill="${C.ink}"/>
      <circle cx="${x + 9 * k}" cy="${y - g(220)}" r="2.6" fill="${C.ink}"/>
      <line x1="${x - g(34)}" y1="${y - g(150)}" x2="${x - g(50)}" y2="${y - g(60)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
      <line x1="${x + 34 * k}" y1="${y - g(150)}" x2="${x + 52 * k}" y2="${y - g(74)}" stroke="${coat}" stroke-width="${11 * k}" stroke-linecap="round"/>
    </g>`;
  }

  // ---------- scene: the quay ----------

  function quay(S) {
    const F = S.flags;
    const horizon = 250;
    const waterTop = horizon;
    const apron = 640;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="q8sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.skyHi}"/>
          <stop offset="78%" stop-color="${C.sky}"/>
          <stop offset="100%" stop-color="${C.skyLow}"/>
        </linearGradient>
        <linearGradient id="q8sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.seaHi}"/>
          <stop offset="100%" stop-color="${C.sea}"/>
        </linearGradient>
        <linearGradient id="q8apron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.stone}"/>
          <stop offset="100%" stop-color="#454e57"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="${waterTop}" fill="url(#q8sky)"/>
      ${stars([[150, 40, 1.2], [420, 70, 1.0], [1340, 50, 1.3]], '#c8d6ea')}
      <rect x="0" y="${waterTop}" width="1600" height="${apron - waterTop}" fill="url(#q8sea)"/>
      <rect x="0" y="${apron}" width="1600" height="${1000 - apron}" fill="url(#q8apron)"/>

      <!-- the far arm of the harbour, and a grey suggestion of dawn -->
      <path d="M 0 ${horizon} L 0 ${horizon - 28} L 260 ${horizon - 36} L 520 ${horizon - 18} L 760 ${horizon - 26} L 900 ${horizon} Z" fill="#46545f" opacity="0.8"/>
      <ellipse cx="1200" cy="${horizon - 8}" rx="330" ry="30" fill="${C.dawn}" opacity="0.14"/>
      ${gull(500, 130, 60, 22)} ${gull(1240, 110, 44, 17, 4)}

      <!-- wet apron courses: the stones keep the sky -->
      ${[700, 760, 830, 910].map(y => `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="${C.ink}" stroke-width="3" opacity="0.25"/>`).join('')}
      <ellipse cx="620" cy="880" rx="270" ry="34" fill="${C.skyLow}" opacity="0.08"/>
      <ellipse cx="1250" cy="940" rx="220" ry="30" fill="${C.skyLow}" opacity="0.07"/>

      <!-- the lifeboat house, gable to the sea -->
      <g>
        <path d="M 60 380 L 210 300 L 360 380 L 360 650 L 60 650 Z" fill="${C.limeDim}" stroke="${C.slate}" stroke-width="5"/>
        <path d="M 44 388 L 210 292 L 376 388" fill="none" stroke="${C.slate}" stroke-width="14"/>
        <rect x="112" y="440" width="196" height="210" fill="${F.boathouseOpen ? C.ink : C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        ${F.boathouseOpen
          ? `<path d="M 112 440 L 60 470 L 60 660 L 112 650 Z" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="5"/>
             <path d="M 140 640 Q 210 600 280 640 L 280 650 L 140 650 Z" fill="#2c4258"/>`
          : `<line x1="210" y1="440" x2="210" y2="650" stroke="${C.woodDark}" stroke-width="5"/>
             <circle cx="196" cy="556" r="7" fill="${C.rust}"/>
             <path d="M 132 648 L 176 636 L 176 650 Z" fill="${C.ink}" opacity="0.7"/>`}
        <rect x="150" y="368" width="120" height="40" rx="4" fill="${C.paper}" opacity="0.85"/>
        <text x="210" y="394" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="#3a4048">LIFEBOAT</text>
        ${label(210, 690, 'the lifeboat house')}
      </g>

      <!-- Hetty Brill's stall: one amber lamp, herring by the dozen -->
      <g>
        <rect x="490" y="400" width="290" height="24" fill="${C.canvas}"/>
        <path d="M 480 400 L 790 400 L 770 350 L 500 350 Z" fill="#7a6a52" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="500" y="424" width="270" height="150" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <rect x="516" y="440" width="238" height="58" fill="#9aa4a8"/>
        ${[0, 1, 2, 3, 4].map(i => `<path d="M ${534 + i * 44} 462 Q ${548 + i * 44} 452 ${562 + i * 44} 462 Q ${548 + i * 44} 472 ${534 + i * 44} 462 Z M ${562 + i * 44} 462 L ${570 + i * 44} 456 L ${570 + i * 44} 468 Z" fill="#c2ccd0" stroke="#5a6870" stroke-width="2"/>`).join('')}
        <circle cx="760" cy="380" r="13" fill="${C.glow}" opacity="0.9">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="5s" repeatCount="indefinite"/>
        </circle>
        ${figure(626, 700, '#5a4a52', '#d8b394', '#b8b4a8', 0.9)}
        ${label(626, 730, 'Hetty Brill, at her stall')}
        <!-- the wet mirror keeps her one amber lamp -->
        <ellipse cx="760" cy="742" rx="16" ry="30" fill="${C.glow}" opacity="0.10">
          <animate attributeName="opacity" values="0.06;0.13;0.06" dur="6s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      <!-- the Bonaventure, moored fast, riding the swell -->
      <g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 7; 0 0" dur="7s" repeatCount="indefinite"/>
          <path d="M 960 520 L 1420 520 L 1380 610 L 1010 610 Z" fill="${C.tar}" stroke="${C.blackHi}" stroke-width="4"/>
          <rect x="960" y="540" width="460" height="10" fill="#7a2e28"/>
          <rect x="1090" y="440" width="150" height="80" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
          <rect x="1104" y="456" width="34" height="26" fill="${C.amber}" opacity="0.85"/>
          <line x1="1300" y1="520" x2="1300" y2="240" stroke="${C.woodDark}" stroke-width="9"/>
          <path d="M 1300 250 L 1300 430 L 1190 430 Z" fill="${C.canvas}" opacity="0.9"/>
          <path d="M 1236 386 L 1292 386 L 1292 428 L 1236 428 Z" fill="#6f6a58"/>
          <text x="1200" y="596" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${C.paper}">BONAVENTURE</text>
          ${figure(1050, 520, '#33404c', '#caa27e', '#6a625a', 0.82)}
          ${F.hapennyWon ? '' : `<g>
            ${cat(1165, 442, 0.62, { fill: C.grey, eye: C.eyeMoon, pose: 'perch', flip: true, dur: 9 })}
          </g>`}
        </g>
        <!-- the wet mirror: the sloop upside-down and half-erased -->
        <g opacity="0.16">
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 14 0; 0 0" dur="9s" repeatCount="indefinite"/>
            <path d="M 1010 622 L 1380 622 L 1420 700 L 960 700 Z" fill="${C.tar}"/>
            <line x1="1300" y1="622" x2="1300" y2="850" stroke="${C.woodDark}" stroke-width="8"/>
          </g>
        </g>
        ${label(1190, 646, 'the Bonaventure &mdash; S. Grebe, salvage', 13)}
      </g>

      <!-- mooring lines, a stone bollard, and the tide's woodpile -->
      <path d="M 968 552 Q 900 600 862 648" fill="none" stroke="${C.rope}" stroke-width="5"/>
      ${F.driftwoodTaken ? '' : `<g>
        <path d="M 120 780 L 268 764 L 262 786 L 126 800 Z" fill="#8a8272" stroke="${C.ink}" stroke-width="3"/>
        <path d="M 140 758 L 246 774 L 242 786 L 138 772 Z" fill="#6f6a58" stroke="${C.ink}" stroke-width="3"/>
        <path d="M 168 744 L 232 750 L 230 762 L 166 756 Z" fill="#9a927e" stroke="${C.ink}" stroke-width="2"/>
        ${label(196, 830, 'the tide&rsquo;s woodpile', 12)}
      </g>`}

      <!-- the tide-post, and its toll-keeper -->
      <g>
        <rect x="826" y="620" width="36" height="180" rx="8" fill="${C.woodDark}"/>
        <ellipse cx="844" cy="622" rx="22" ry="9" fill="${C.wood}"/>
        ${F.withCat === 'pilchard' ? '' : (F.pilchardWon
          ? cat(846, 622, 0.72, { fill: C.marmalade, stripes: C.marmDeep, chest: '#e8c9a0', eye: C.eyeGreen, pose: 'loaf', dur: 8 })
          : cat(846, 620, 0.78, { fill: C.marmalade, stripes: C.marmDeep, chest: '#e8c9a0', eye: C.eyeGreen, pose: 'sit' }))}
        ${label(844, 838, 'Pilchard, at the tide-post', 13)}
        <g opacity="0.14"><path d="M 826 802 L 862 802 L 862 920 L 826 920 Z" fill="${C.woodDark}"/></g>
      </g>

      <!-- Tansy, off the same packet, waiting to be believed -->
      ${F.tansyMet ? '' : figure(1385, 760, '#4a5a4e', '#e2c0a0', '#6a4a30', 0.9) + label(1385, 792, 'Tansy Pike')}

      <!-- the Harbour Stairs, up into the town -->
      <g>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${1445 + i * 8}" y="${720 - i * 62}" width="${150 - i * 8}" height="26" fill="${C.stoneLit}" stroke="${C.ink}" stroke-width="3" opacity="0.95"/>`).join('')}
        <rect x="1436" y="300" width="12" height="440" fill="${C.rust}"/>
        <rect x="1520" y="330" width="70" height="44" rx="4" fill="${C.paper}" opacity="0.85" transform="rotate(-4 1555 352)"/>
        <text x="1555" y="350" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#3a4048" transform="rotate(-4 1555 352)">TO THE</text>
        <text x="1555" y="366" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#3a4048" transform="rotate(-4 1555 352)">STAIRS</text>
        ${label(1512, 780, 'up the Harbour Stairs')}
      </g>

      ${fogBands(300, 1600, 3, 30)}
      ${companion(S, 330, 900, 0.85)}
    </svg>`;
  }

  // ---------- scene: the harbour stairs ----------

  function stairs(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="s8sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.skyHi}"/>
          <stop offset="100%" stop-color="${C.skyLow}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#s8sky)"/>

      <!-- the old light, above everything -->
      <g opacity="0.85">
        <rect x="760" y="120" width="70" height="120" fill="#6e7c88"/>
        <rect x="748" y="100" width="94" height="26" fill="#5a6874"/>
        <rect x="768" y="70" width="54" height="34" fill="#8c9aa4"/>
        <path d="M 700 260 L 890 260 L 940 240 L 660 240 Z" fill="#4e5c68"/>
        ${[0, 1, 2, 3].map(i => `<rect x="${716 + i * 6}" y="${262 + i * 56}" width="${160 - i * 0}" height="22" fill="${C.stoneLit}" stroke="${C.ink}" stroke-width="3"/>`).join('')}
        <rect x="700" y="212" width="60" height="34" rx="4" fill="${C.paper}" opacity="0.8" transform="rotate(3 730 229)"/>
        <text x="730" y="234" text-anchor="middle" font-size="11" font-family="Georgia, serif" fill="#3a4048" transform="rotate(3 730 229)">LIGHT</text>
        ${label(796, 300, 'the path up to the old light')}
      </g>
      ${gull(1100, 150, 52, 20, 2)}

      <!-- left terrace: Hetty's cottage, its roof two colours of slate -->
      <g>
        <rect x="60" y="330" width="380" height="430" fill="${C.limeDim}" stroke="${C.slate}" stroke-width="5"/>
        <path d="M 40 336 L 250 236 L 460 336 Z" fill="${C.slate}"/>
        ${[0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${140 + c * 46 + r * 10}" y="${266 + r * 24}" width="40" height="20" fill="${r === 1 && c > 0 && c < 4 ? C.slateNew : C.slate}" stroke="${C.ink}" stroke-width="1.5"/>`).join('')).join('')}
        <rect x="120" y="470" width="90" height="120" fill="${C.amber}" opacity="0.35"/>
        <rect x="120" y="470" width="90" height="120" fill="none" stroke="${C.woodDark}" stroke-width="5"/>
        <line x1="165" y1="470" x2="165" y2="590" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="280" y="500" width="110" height="260" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        ${label(250, 790, 'Hetty&rsquo;s cottage &mdash; the roof done twice', 13)}
      </g>

      <!-- Pike's loft over the net store, its shingle still swinging -->
      <g>
        <g>
          <rect x="332" y="420" width="176" height="340" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
          <rect x="352" y="440" width="136" height="200" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
          <circle cx="472" cy="560" r="8" fill="${C.brass}"/>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-3 420 396; 3 420 396; -3 420 396" dur="6s" repeatCount="indefinite"/>
            <rect x="366" y="396" width="108" height="34" rx="5" fill="${C.paper}" stroke="${C.woodDark}" stroke-width="3"/>
            <path d="M 388 415 Q 398 406 412 412 Q 424 416 434 412 L 442 415 L 434 419 Q 420 423 406 419 Q 394 417 388 415 Z" fill="#3a4048"/>
            <text x="420" y="426" text-anchor="middle" font-size="10" font-family="Georgia, serif" fill="#3a4048">J. PIKE &#183; RATS</text>
          </g>
          ${label(420, 790, 'Pike&rsquo;s loft, over the net store')}
        </g>
      </g>

      <!-- the stairs themselves, switchbacking down the picture -->
      <g>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${560 + (i % 2) * 14}" y="${420 + i * 58}" width="${230 - (i % 2) * 20}" height="26" fill="${C.stoneLit}" stroke="${C.ink}" stroke-width="3"/>`).join('')}
        <ellipse cx="680" cy="700" rx="130" ry="16" fill="${C.skyLow}" opacity="0.10"/>
        ${label(672, 940, 'down to the quay')}
      </g>

      <!-- washing, strung tier to tier, stirring -->
      <g>
        <path d="M 460 380 Q 700 420 940 370" fill="none" stroke="${C.rope}" stroke-width="3"/>
        ${[540, 660, 800].map((x, i) => `<g>
          <animateTransform attributeName="transform" type="rotate" values="-2 ${x} ${392 + i * 4}; 2 ${x} ${392 + i * 4}; -2 ${x} ${392 + i * 4}" dur="${5 + i}s" repeatCount="indefinite"/>
          <rect x="${x - 26}" y="${392 + i * 4}" width="52" height="64" fill="${i === 1 ? '#b8c2c6' : C.limewash}" opacity="0.9"/>
        </g>`).join('')}
      </g>

      <!-- Mrs. Mop, holding the wall against all comers -->
      ${cat(700, 560, 0.6, { fill: C.tortie, eye: C.eyeAmber, pose: 'loaf', flip: true, dur: 11 })}
      ${label(700, 588, 'Mrs. Mop', 11)}

      <!-- right terrace: the sail loft, and the bakehouse below it -->
      <g>
        <rect x="1020" y="420" width="430" height="360" fill="${C.limeDim}" stroke="${C.slate}" stroke-width="5"/>
        <path d="M 1000 426 L 1235 330 L 1470 426 Z" fill="${C.slate}"/>
        <rect x="1130" y="300" width="170" height="130" fill="none" stroke="none"/>
        <!-- the sail loft's tall window, her ladyship's box at the opera -->
        <rect x="1150" y="300" width="170" height="164" fill="#2c3640" stroke="${C.woodDark}" stroke-width="6"/>
        <line x1="1235" y1="300" x2="1235" y2="464" stroke="${C.woodDark}" stroke-width="4"/>
        <line x1="1150" y1="382" x2="1320" y2="382" stroke="${C.woodDark}" stroke-width="4"/>
        ${F.withCat === 'duchess' ? '' : cat(1206, 460, 0.66, { fill: C.white, eye: C.eyeAmber, pose: 'sit', dur: 10 })}
        ${label(1235, 490, 'the sail-loft window', 12)}
        <rect x="1060" y="540" width="200" height="240" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <path d="M 1090 600 Q 1160 560 1230 600 L 1230 640 Q 1160 610 1090 640 Z" fill="${C.canvas}" opacity="0.7"/>
        ${label(1160, 810, 'the sail loft &mdash; Pentreath&rsquo;s', 13)}
      </g>
      <g>
        <rect x="1330" y="560" width="220" height="220" fill="#8a5a3c" stroke="${C.woodDark}" stroke-width="5"/>
        <path d="M 1350 640 a 40 40 0 0 1 80 0 Z" fill="${C.ink}"/>
        <rect x="1348" y="640" width="84" height="80" fill="${C.ink}"/>
        <circle cx="1390" cy="660" r="16" fill="${C.amber}" opacity="0.5">
          <animate attributeName="opacity" values="0.35;0.6;0.35" dur="4s" repeatCount="indefinite"/>
        </circle>
        ${label(1440, 810, 'the bakehouse', 13)}
        <!-- the chimney: the one warm perch left in Gullscombe -->
        <rect x="1452" y="330" width="54" height="230" fill="#7a4e34" stroke="${C.woodDark}" stroke-width="4"/>
        <path d="M 1462 322 q 18 -30 8 -58" stroke="${C.fog}" stroke-width="10" fill="none" opacity="0.35">
          <animate attributeName="opacity" values="0.25;0.45;0.25" dur="6s" repeatCount="indefinite"/>
        </path>
        ${F.tarWon ? '' : `<g>
          ${cat(1478, 330, 0.66, { fill: C.black, eye: C.eyeGreen, pose: 'perch', dur: 8 })}
          ${label(1479, 258, 'Tar, up the chimney', 12)}
        </g>`}
      </g>

      ${fogBands(500, 1600, 3, 38)}
      ${companion(S, 250, 920, 0.85)}
    </svg>`;
  }

  // ---------- scene: Pike's loft ----------

  function loft(S) {
    const F = S.flags;
    const bowls = ['Pilchard', 'Tar', 'Duchess', 'Bosun', 'Winkle', 'Mackerel', 'Puddle', 'Mrs Mop', 'Ha&rsquo;penny'];
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="l8wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4e4234"/>
          <stop offset="100%" stop-color="#3a3226"/>
        </linearGradient>
        <radialGradient id="l8stove" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stop-color="#ff9a4a" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#ff9a4a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#l8wall)"/>
      ${[220, 480, 740, 1000, 1260].map(x => `<line x1="${x}" y1="0" x2="${x}" y2="820" stroke="${C.woodDark}" stroke-width="6" opacity="0.5"/>`).join('')}
      <rect x="0" y="820" width="1600" height="180" fill="${C.wood}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${i * 210}" y1="820" x2="${i * 210 + 60}" y2="1000" stroke="${C.woodDark}" stroke-width="4" opacity="0.6"/>`).join('')}

      <!-- the skylight: fog-light falling evenly, asking nothing -->
      <path d="M 620 0 L 980 0 L 940 60 L 660 60 Z" fill="#8fa0ae" opacity="0.5"/>
      <path d="M 640 60 L 960 60 L 1060 820 L 540 820 Z" fill="#aebfc9" opacity="0.07"/>

      <!-- the door down to the stairs -->
      <g>
        <rect x="40" y="560" width="150" height="320" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="6"/>
        <circle cx="170" cy="720" r="8" fill="${C.brass}"/>
        <path d="M 52 588 L 178 574 M 52 608 L 178 594" stroke="${C.woodDark}" stroke-width="3" opacity="0.6"/>
        ${label(115, 910, 'down to the stairs')}
      </g>

      <!-- the stove: cold, laid, or alight -->
      <g>
        ${F.stoveLit ? `<ellipse cx="240" cy="560" rx="240" ry="220" fill="url(#l8stove)"/>` : ''}
        <rect x="130" y="330" width="60" height="120" fill="${C.tar}"/>
        <rect x="140" y="450" width="200" height="220" rx="12" fill="${C.tar}" stroke="${C.blackHi}" stroke-width="5"/>
        <rect x="170" y="510" width="140" height="90" rx="8" fill="${F.stoveLit ? '#ff8a3a' : (F.stoveLaid ? '#3a3025' : C.ink)}"/>
        ${F.stoveLaid && !F.stoveLit ? `<path d="M 186 580 L 296 550 M 190 556 L 292 586" stroke="#8a8272" stroke-width="8"/>` : ''}
        ${F.stoveLit ? `<g>
          <path d="M 206 592 Q 216 548 240 566 Q 250 540 268 570 Q 282 552 288 592 Z" fill="#ffc06a">
            <animate attributeName="opacity" values="0.8;1;0.85;1;0.8" dur="1.6s" repeatCount="indefinite"/>
          </path>
          <path d="M 156 322 q 16 -36 4 -72" stroke="${C.fog}" stroke-width="12" fill="none" opacity="0.4">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite"/>
          </path>
        </g>` : ''}
        <rect x="200" y="670" width="80" height="30" fill="${C.blackHi}"/>
        ${label(240, 740, F.stoveLit ? 'the stove, alive again' : (F.stoveLaid ? 'the stove, laid and waiting' : 'the stove, stone cold'))}
        ${F.tarWon && F.withCat !== 'tar' ? cat(238, 452, 0.7, { fill: C.black, eye: C.eyeGreen, pose: 'loaf', asleep: true }) + label(238, 408, 'Tar, by the stove', 12) : ''}
      </g>

      <!-- Pike's chair, and what he left across its arm -->
      <g>
        <rect x="430" y="520" width="200" height="26" rx="8" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="430" y="546" width="24" height="180" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="606" y="546" width="24" height="180" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="442" y="620" width="180" height="30" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="430" y="380" width="200" height="150" rx="10" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="448" y="398" width="164" height="240" rx="10" fill="#5c4a34" opacity="0.55"/>
        ${F.scarfTaken ? '' : `<path d="M 436 512 Q 500 490 530 516 Q 560 540 606 522 L 610 556 Q 560 576 520 552 Q 480 530 440 548 Z" fill="#8a4a34" stroke="${C.woodDark}" stroke-width="3"/>`}
        ${label(530, 760, 'Pike&rsquo;s chair')}
      </g>

      <!-- the rat-pole on the wall, bell and all -->
      <g>
        <line x1="220" y1="220" x2="560" y2="200" stroke="${C.woodLit}" stroke-width="12"/>
        <line x1="240" y1="240" x2="252" y2="200" stroke="${C.rope}" stroke-width="4"/>
        ${F.bellTaken ? '' : `<g>
          <path d="M 528 236 Q 528 214 542 202 Q 556 214 556 236 Z" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="3"/>
          <circle cx="542" cy="242" r="5" fill="${C.brassDeep}"/>
        </g>`}
        ${label(390, 280, 'the rat-pole and its bell', 13)}
      </g>

      <!-- the window on the harbour, and the nail that kept a souvenir -->
      <g>
        <rect x="880" y="220" width="360" height="270" fill="#5c7284" stroke="${C.woodDark}" stroke-width="8"/>
        <path d="M 880 340 L 1240 340" stroke="${C.fog}" stroke-width="20" opacity="0.4"/>
        <path d="M 940 490 L 970 400 L 976 490 Z M 1130 490 L 1160 380 L 1170 490 Z" fill="${C.tar}" opacity="0.8"/>
        <line x1="1060" y1="220" x2="1060" y2="490" stroke="${C.woodDark}" stroke-width="6"/>
        <line x1="880" y1="356" x2="1240" y2="356" stroke="${C.woodDark}" stroke-width="6"/>
        ${label(1060, 528, 'the window on the harbour', 13)}
        <circle cx="1252" cy="330" r="5" fill="${C.rust}"/>
        ${F.scrapTaken ? '' : `<path d="M 1252 334 L 1244 380 L 1268 366 L 1258 400 Z" fill="${C.canvas}" stroke="${C.ink}" stroke-width="2">
          <animateTransform attributeName="transform" type="rotate" values="-4 1252 334; 4 1252 334; -4 1252 334" dur="4s" repeatCount="indefinite"/>
        </path>`}
        ${label(1290, 420, F.scrapTaken ? '' : 'a snag on the nail', 11)}
      </g>

      <!-- the visitor's work: a drawer flung, a box forced -->
      <path d="M 700 850 L 840 840 L 848 890 L 706 900 Z" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4" transform="rotate(-8 774 870)"/>
      <g>
        <rect x="646" y="672" width="210" height="130" rx="8" fill="${C.blackHi}" stroke="${C.ink}" stroke-width="5"/>
        <path d="M 646 672 L 856 672 L 872 630 L 662 630 Z" fill="${C.blackHi}" stroke="${C.ink}" stroke-width="5" transform="rotate(-14 760 660)"/>
        <rect x="700" y="700" width="100" height="12" fill="${C.ink}"/>
        ${F.passbookTaken ? '' : `<rect x="716" y="700" width="76" height="48" rx="3" fill="#2c3a4a" stroke="${C.brass}" stroke-width="2"/>`}
        ${label(752, 838, 'the strongbox, forced', 13)}
      </g>

      <!-- the pried floorboards, and the freehold underneath -->
      <g>
        <rect x="500" y="826" width="380" height="26" fill="${C.ink}"/>
        <path d="M 520 826 L 700 818 L 700 830 L 520 838 Z" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="3" transform="rotate(-5 610 828)"/>
        <path d="M 560 870 a 26 22 0 0 1 52 0 Z" fill="${C.ink}"/>
        ${label(690, 902, 'the pried floorboards', 13)}
      </g>

      <!-- the cats' corner: cupboard above, nine bowls below -->
      <g>
        <rect x="1010" y="600" width="260" height="180" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <line x1="1140" y1="600" x2="1140" y2="780" stroke="${C.woodDark}" stroke-width="4"/>
        ${F.ledgerTaken
          ? `<rect x="1030" y="640" width="90" height="110" fill="${C.ink}" opacity="0.55"/>`
          : `<rect x="1030" y="640" width="90" height="110" fill="${C.ink}" opacity="0.55"/>
             <rect x="1042" y="668" width="66" height="74" rx="3" fill="#7a3a2e" stroke="${C.woodDark}" stroke-width="3"/>
             ${markGlyph('herring', 1075, 705, 0.8, C.brass)}`}
        <rect x="1152" y="640" width="106" height="110" fill="${C.ink}" opacity="0.4"/>
        ${[0, 1, 2].map(i => `<path d="M ${1162 + i * 32} 736 Q ${1170 + i * 32} 726 ${1178 + i * 32} 736 Q ${1170 + i * 32} 744 ${1162 + i * 32} 736 Z" fill="#8f9aa0" stroke="${C.ink}" stroke-width="1.5"/>`).join('')}
        ${label(1140, 812, 'the cats&rsquo; cupboard', 13)}
      </g>
      <g>
        ${bowls.map((b, i) => `<g>
          <ellipse cx="${1000 + (i % 5) * 105}" cy="${880 + Math.floor(i / 5) * 62}" rx="40" ry="15" fill="#7a6a52" stroke="${C.woodDark}" stroke-width="3"/>
          <text x="${1000 + (i % 5) * 105}" y="${912 + Math.floor(i / 5) * 62}" text-anchor="middle" font-size="11" font-family="Georgia, serif" font-style="italic" fill="${C.textDim}">${b}</text>
        </g>`).join('')}
      </g>

      <!-- Tansy, keeping her back straight about it -->
      ${F.tansyMet ? figure(1450, 740, '#4a5a4e', '#e2c0a0', '#6a4a30', 0.9) + label(1450, 772, 'Tansy Pike') : ''}

      ${companion(S, 320, 960, 0.8)}
    </svg>`;
  }

  // ---------- scene: the old light ----------

  function light(S) {
    const F = S.flags;
    // Ha'penny's approach across the grass, stage by stage.
    const hp = F.hapennyWon ? -1 : (F.hpStage || 0);
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g8sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#42556a"/>
          <stop offset="60%" stop-color="#71889a"/>
          <stop offset="100%" stop-color="#c9b493"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="720" fill="url(#g8sky)"/>
      <rect x="0" y="600" width="1600" height="120" fill="${C.seaMid}" opacity="0.6"/>
      <path d="M 0 700 L 0 640 Q 400 600 700 660 L 1600 680 L 1600 1000 L 0 1000 Z" fill="#5a6a52"/>
      <path d="M 0 720 Q 500 680 1600 716 L 1600 1000 L 0 1000 Z" fill="#4c5a46"/>
      ${gull(300, 200, 70, 26)} ${gull(1200, 260, 50, 19, 6)}
      <ellipse cx="800" cy="560" rx="500" ry="40" fill="${C.dawn}" opacity="0.18"/>

      <!-- the tower: whitewash, gallery, and a lantern room asleep -->
      <g>
        <path d="M 240 900 L 280 320 L 460 320 L 500 900 Z" fill="${C.limewash}" stroke="#8c9aa4" stroke-width="5"/>
        <path d="M 240 900 L 280 320 L 340 320 L 320 900 Z" fill="${C.limeDim}" opacity="0.6"/>
        <rect x="256" y="300" width="228" height="26" fill="#5a6874"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${268 + i * 40}" y1="300" x2="${268 + i * 40}" y2="272" stroke="#5a6874" stroke-width="5"/>`).join('')}
        <rect x="292" y="200" width="156" height="76" fill="#2c3640" stroke="#5a6874" stroke-width="6"/>
        <line x1="344" y1="200" x2="344" y2="276" stroke="#5a6874" stroke-width="4"/>
        <line x1="396" y1="200" x2="396" y2="276" stroke="#5a6874" stroke-width="4"/>
        <path d="M 286 200 L 370 160 L 454 200 Z" fill="#4e5c68"/>
        <rect x="330" y="700" width="90" height="200" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        ${label(370, 940, 'the old light')}
        <!-- the jackdaws' nest, wedged against the gallery rail -->
        ${F.tagTaken ? '' : `<g>
          <path d="M 468 296 q 20 -18 44 -6 q 18 10 2 22 q -26 12 -46 -2 Z" fill="#5a4a34" stroke="${C.ink}" stroke-width="3"/>
          <path d="M 474 292 l 18 -8 M 486 306 l 24 -4 M 470 302 l 14 6" stroke="#3a3226" stroke-width="3"/>
          <circle cx="502" cy="288" r="3" fill="${C.brass}"/>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="3.5s" repeatCount="indefinite"/>
            <path d="M 522 280 q 10 -10 22 -2 l -8 4 q 8 2 4 8 q -12 4 -18 -4 Z" fill="#33383e"/>
            <circle cx="538" cy="281" r="1.8" fill="${C.eyeMoon}"/>
          </g>
          ${label(505, 340, 'the lantern gallery &mdash; a nest', 12)}
        </g>`}
        ${F.tagTaken ? label(505, 340, 'the lantern gallery, robbed back', 12) : ''}
      </g>

      <!-- Wick, and the sill where his vestas live -->
      ${figure(620, 730, '#3c4a58', '#d8b394', '#c9c5ba', 0.92)}
      ${label(620, 762, 'Wick, the keeper')}
      ${F.wickMet && !F.vestasTaken ? `<g>
        <rect x="520" y="700" width="70" height="26" rx="4" fill="${C.stoneLit}" stroke="${C.ink}" stroke-width="3"/>
        <rect x="534" y="682" width="44" height="20" rx="3" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="3"/>
        ${label(556, 748, 'his vesta tin', 11)}
      </g>` : ''}
      ${cat(415, 700, 0.56, { fill: '#b8bcb2', eye: C.eyeAmber, pose: 'loaf', asleep: true, dur: 12 })}
      ${label(415, 726, 'Winkle', 11)}

      <!-- the harbour bell in its frame, and the rope that gathers the town -->
      <g>
        <rect x="900" y="330" width="26" height="360" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="1074" y="330" width="26" height="360" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="880" y="300" width="240" height="34" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-1.6 1000 334; 1.6 1000 334; -1.6 1000 334" dur="7s" repeatCount="indefinite"/>
          <path d="M 952 470 Q 952 370 1000 348 Q 1048 370 1048 470 Z" fill="${C.brass}" stroke="${C.brassDeep}" stroke-width="5"/>
          <circle cx="1000" cy="480" r="10" fill="${C.brassDeep}"/>
          <line x1="1000" y1="480" x2="1000" y2="660" stroke="${C.rope}" stroke-width="6"/>
          <path d="M 992 660 q 8 26 16 0" fill="none" stroke="${C.rope}" stroke-width="6"/>
        </g>
        <text x="1000" y="446" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.brassDeep}">RECAST 1868</text>
        ${label(1000, 720, 'the harbour bell &mdash; the Nine', 13)}
      </g>

      <!-- Pike's bench, facing the bar where she went down -->
      <g>
        <rect x="1150" y="640" width="260" height="22" rx="6" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="1160" y="662" width="20" height="80" fill="${C.woodDark}"/>
        <rect x="1380" y="662" width="20" height="80" fill="${C.woodDark}"/>
        <rect x="1150" y="580" width="260" height="18" rx="6" fill="${C.woodLit}" stroke="${C.woodDark}" stroke-width="4"/>
        ${hp >= 1 ? `<path d="M 1180 636 Q 1230 620 1268 640 Q 1300 654 1330 640 L 1334 652 Q 1290 668 1250 652 Q 1210 640 1184 650 Z" fill="#8a4a34"/>
          <path d="M 1342 628 Q 1342 616 1350 610 Q 1358 616 1358 628 Z" fill="${C.brass}"/>` : ''}
        ${label(1280, 780, 'Pike&rsquo;s Sunday bench', 13)}
      </g>
      ${hp === 1 ? cat(1480, 900, 0.7, { fill: C.grey, eye: C.eyeMoon, pose: 'sit', flip: true, dur: 5 }) : ''}
      ${hp === 2 ? cat(1420, 800, 0.74, { fill: C.grey, eye: C.eyeMoon, pose: 'sit', flip: true, dur: 4 }) : ''}
      ${F.hapennyWon && F.withCat !== 'hapenny' ? cat(1300, 630, 0.7, { fill: C.grey, eye: C.eyeMoon, pose: 'loaf' }) : ''}

      <!-- the town, come up the cliff to hear it said aloud -->
      ${F.gathered ? `<g>
        ${figure(760, 900, '#4a5a4e', '#e2c0a0', '#6a4a30', 0.85)}
        ${figure(860, 920, '#5a4a52', '#d8b394', '#b8b4a8', 0.85)}
        ${figure(1120, 930, '#33404c', '#caa27e', '#6a625a', 0.88)}
        ${figure(680, 930, '#3e4650', '#d8b394', '#3a3226', 0.8)}
        ${label(920, 968, 'Gullscombe, answering its bell')}
      </g>` : `<g>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${760 + i * 16}" y="${800 + i * 24}" width="${140 - i * 6}" height="18" fill="${C.stoneLit}" stroke="${C.ink}" stroke-width="3"/>`).join('')}
        ${label(850, 980, 'down the cliff path')}
      </g>`}

      ${fogBands(420, 1600, 2, 40)}
      ${companion(S, 200, 900, 0.85)}
    </svg>`;
  }

  // ---------- zoom: the lifeboat house ----------

  function boathouseZoom(S) {
    const F = S.flags;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="b8wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3a4048"/>
          <stop offset="100%" stop-color="#2a3038"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#b8wall)"/>
      <path d="M 0 140 L 600 30 L 1200 140" fill="none" stroke="${C.woodDark}" stroke-width="16"/>
      ${[200, 400, 800, 1000].map(x => `<line x1="${x}" y1="${140 - Math.abs(600 - x) * 0.11}" x2="${x}" y2="700" stroke="${C.woodDark}" stroke-width="8" opacity="0.5"/>`).join('')}
      <path d="M 40 180 L 250 180 L 250 560 L 40 560 Z" fill="#8fa0ae" opacity="0.28"/>

      <!-- the boat herself, fresh paint and old purpose -->
      <g>
        <rect x="330" y="600" width="90" height="90" fill="${C.woodDark}"/>
        <rect x="820" y="600" width="90" height="90" fill="${C.woodDark}"/>
        <path d="M 240 480 Q 600 420 980 480 L 940 590 Q 600 640 300 590 Z" fill="#2c4258" stroke="${C.ink}" stroke-width="6"/>
        <path d="M 240 480 Q 600 420 980 480 L 972 508 Q 600 452 250 508 Z" fill="${C.white}" opacity="0.85"/>
        <text x="610" y="566" text-anchor="middle" font-size="30" font-family="Georgia, serif" fill="${C.paper}" letter-spacing="6">NINE SISTERS</text>
        ${[380, 520, 660, 800].map(x => `<line x1="${x}" y1="472" x2="${x - 30}" y2="430" stroke="${C.wood}" stroke-width="8"/>`).join('')}
        ${cat(640, 470, 0.8, { fill: C.black, chest: C.white, eye: C.eyeAmber, pose: 'loaf', asleep: true, dur: 13 })}
        ${label(640, 430, 'Bosun, on watch', 13)}
      </g>

      <!-- cork jackets, oars, and the board that answers a question -->
      ${[880, 960, 1040].map(x => `<g>
        <circle cx="${x}" cy="220" r="30" fill="none" stroke="#b89a6a" stroke-width="14"/>
      </g>`).join('')}
      <line x1="120" y1="620" x2="360" y2="240" stroke="${C.wood}" stroke-width="10"/>
      <line x1="160" y1="630" x2="400" y2="250" stroke="${C.wood}" stroke-width="10"/>

      <g>
        <rect x="430" y="150" width="360" height="150" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="446" y="166" width="328" height="118" rx="4" fill="${C.paper}"/>
        <text x="610" y="204" text-anchor="middle" font-size="21" font-family="Georgia, serif" fill="#3a4048">LIFEBOAT &#183; NINE SISTERS</text>
        <text x="610" y="236" text-anchor="middle" font-size="17" font-family="Georgia, serif" font-style="italic" fill="#4a5058">the gift of a friend &#183; 1859</text>
        <text x="610" y="266" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#6a7078">Blyth &amp; Sons, boatbuilders, Padstow &#183; No. 114</text>
        ${label(610, 330, 'the dedication board', 13)}
      </g>

      ${S.flags.withCat === 'duchess' ? cat(180, 700, 0.8, { fill: C.white, eye: C.eyeAmber, pose: 'sit' }) + label(180, 730, 'the latch-worker, admiring her work', 12) : ''}
    </svg>`;
  }

  // ---------- zoom: the rent book ----------

  function ledgerZoom(S) {
    const F = S.flags;
    const heads = MARKS; // nine columns, nine marks
    const answers = ['Hetty&rsquo;s door', 'the bakehouse', 'the sail loft', 'the lifeboat', 'the old light', '&mdash;', 'the almshouse', 'the cobbler', 'the school'];
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="800" fill="#2c2a22"/>
      <rect x="70" y="50" width="1060" height="700" rx="10" fill="#7a3a2e" stroke="${C.ink}" stroke-width="6"/>
      <rect x="100" y="80" width="1000" height="640" fill="#e6dfc8"/>
      <line x1="600" y1="80" x2="600" y2="720" stroke="#b8a888" stroke-width="4"/>
      <text x="600" y="130" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="#3a3428">THE ROUNDS &#183; J. PIKE</text>

      ${heads.map((h, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 170 + col * 200 - (row * 60);
        const y = 210 + row * 260;
        if (i > 4 && col > 3) return '';
        return `<g>
          <circle cx="${x}" cy="${y}" r="34" fill="none" stroke="#8a7a5a" stroke-width="3"/>
          ${markGlyph(h, x, y, 1.25, '#4a4032')}
          ${[0, 1, 2, 3].map(t => `<g>
            <line x1="${x - 18}" y1="${y + 62 + t * 26}" x2="${x + 6}" y2="${y + 62 + t * 26}" stroke="#6a5f48" stroke-width="3"/>
            <text x="${x + 16}" y="${y + 67 + t * 26}" font-size="12" font-family="Georgia, serif" fill="#6a5f48">${['1/6', '2/-', '&#8211;/9', '3/6'][(t + i) % 4]}</text>
          </g>`).join('')}
          ${F.roundsRead && i < 5 ? `<text x="${x}" y="${y + 190}" text-anchor="middle" font-size="13" font-family="Georgia, serif" font-style="italic" fill="#8a3a2a">${answers[i]}</text>` : ''}
        </g>`;
      }).join('')}

      <text x="600" y="770" text-anchor="middle" font-size="15" font-family="Georgia, serif" font-style="italic" fill="${C.text}">${F.roundsRead
        ? 'nine columns, nine doors &mdash; and not one shilling of it coming IN'
        : 'nine columns, headed in marks, kept for thirty years &mdash; the town calls it his rent book'}</text>
    </svg>`;
  }

  // ---------- boards for the puzzle overlays ----------

  /* Pilchard at the tide-post, for the lure puzzle. */
  function pilchardBoard(step) {
    return `<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="200" rx="8" fill="#2c3640"/>
      <rect x="0" y="168" width="460" height="32" fill="#454e57"/>
      <rect x="336" y="70" width="18" height="100" rx="5" fill="${C.woodDark}"/>
      ${cat(348, 72, 0.5, { fill: C.marmalade, stripes: C.marmDeep, chest: '#e8c9a0', eye: C.eyeGreen, pose: 'perch', flip: true, dur: 5 })}
      ${step >= 1 ? `<path d="M 210 160 Q 220 152 232 160 Q 220 168 210 160 Z M 232 160 L 240 155 L 240 165 Z" fill="#b07840" stroke="#5a3a20" stroke-width="2"/>` : ''}
      ${step >= 2 ? `<g transform="translate(70 150)">
        <circle cx="0" cy="-30" r="12" fill="#d8b394"/>
        <path d="M -14 -22 Q 0 -44 14 -22 Z" fill="#4a3a52"/>
        <path d="M -18 20 Q -16 -14 0 -16 Q 16 -14 18 20 Z" fill="#4a3a52"/>
      </g>` : ''}
      <text x="230" y="26" text-anchor="middle" font-size="13" font-family="Georgia, serif" font-style="italic" fill="${C.text}">${['the tide-post, and its collector of tolls', 'the sprat, placed &mdash; now the manner of the thing', 'eyes on the harbour, not on the cat'][Math.min(step, 2)]}</text>
    </svg>`;
  }

  /* Duchess in her window, for the manners puzzle. Mood runs 0..4:
     affronted, wary, considering, thawing, won. */
  function duchessBoard(mood) {
    const earL = [[-14, -74, -22, -86, -4, -79], [-14, -74, -20, -90, -4, -79], [-14, -74, -19, -92, -4, -79], [-14, -74, -19, -92, -4, -79], [-14, -74, -19, -92, -4, -79]][mood];
    const tailDur = [1.2, 2.5, 4, 6, 8][mood];
    const eyeRy = [4.6, 4.4, 4.0, 3.2, 1.6][mood];
    const words = ['affronted &mdash; the tail is writing its opinion', 'wary &mdash; watched, and watching back', 'considering &mdash; the tail has gone quiet', 'thawing &mdash; the eyes are closing to a compliment', 'won'][mood];
    return `<svg viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="220" rx="8" fill="#2c3640"/>
      <rect x="150" y="20" width="160" height="170" fill="#232c36" stroke="${C.woodDark}" stroke-width="6"/>
      <line x1="230" y1="20" x2="230" y2="190" stroke="${C.woodDark}" stroke-width="4"/>
      <g transform="translate(230 186) scale(1.05)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 18 -4; ${mood < 2 ? 22 : 8} 18 -4; 0 18 -4" dur="${tailDur}s" repeatCount="indefinite"/>
          <path d="M 18 -4 Q 40 -2 42 -24" fill="none" stroke="${C.white}" stroke-width="7" stroke-linecap="round"/>
        </g>
        <path d="M -16 0 Q -22 -34 -8 -50 L 10 -50 Q 22 -30 18 0 Z" fill="${C.white}"/>
        <ellipse cx="-8" cy="-1" rx="9" ry="4" fill="${C.white}"/>
        <ellipse cx="10" cy="-1" rx="9" ry="4" fill="${C.white}"/>
        <circle cx="0" cy="-64" r="17" fill="${C.white}"/>
        <path d="M ${earL[0]} ${earL[1]} L ${earL[2]} ${earL[3]} L ${earL[4]} ${earL[5]} Z" fill="${C.white}"/>
        <path d="M 14 -74 L ${-earL[2]} ${earL[3]} L 4 -79 Z" fill="${C.white}"/>
        <ellipse cx="-7" cy="-67" rx="3.4" ry="${eyeRy}" fill="${C.eyeAmber}"/>
        <ellipse cx="7" cy="-67" rx="3.4" ry="${eyeRy}" fill="${C.eyeAmber}"/>
      </g>
      <text x="230" y="212" text-anchor="middle" font-size="13" font-family="Georgia, serif" font-style="italic" fill="${C.text}">${words}</text>
    </svg>`;
  }

  /* The nine marks in a strip, for the finale board. `done` marks are
     lit; the anchor waits at the end like a held breath. */
  function tagStrip(done) {
    return `<svg viewBox="0 0 460 110" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="110" rx="8" fill="#2c3640"/>
      ${['herring', 'oar', 'bell', 'anchor'].map((m, i) => `<g opacity="${i < done ? 1 : 0.35}">
        <circle cx="${70 + i * 108}" cy="48" r="30" fill="none" stroke="${i < done ? C.brass : C.textDim}" stroke-width="3"/>
        ${markGlyph(m, 70 + i * 108, 48, 1.15, i < done ? C.brass : C.textDim)}
        <text x="${70 + i * 108}" y="98" text-anchor="middle" font-size="11" font-family="Georgia, serif" font-style="italic" fill="${C.textDim}">${['the herring', 'the oar', 'the bell', 'the anchor'][i]}</text>
      </g>`).join('')}
    </svg>`;
  }

  // ---------- icons ----------

  const icons = {
    sprat: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 34 Q 24 22 42 34 Q 24 46 10 34 Z" fill="#b07840" stroke="#5a3a20" stroke-width="3"/>
      <path d="M 42 34 L 54 26 L 54 42 Z" fill="#b07840" stroke="#5a3a20" stroke-width="3"/>
      <circle cx="20" cy="32" r="2" fill="#2c2216"/>
    </svg>`,
    cream: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20 24 L 44 24 L 40 52 L 24 52 Z" fill="#e8e2d2" stroke="#8a8272" stroke-width="3"/>
      <path d="M 20 24 Q 14 20 16 14 L 24 20 Z" fill="#e8e2d2" stroke="#8a8272" stroke-width="2"/>
      <ellipse cx="32" cy="24" rx="12" ry="4" fill="#f6f2e6"/>
    </svg>`,
    driftwood: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 40 L 50 30 L 52 38 L 10 48 Z" fill="#8a8272" stroke="#2c2216" stroke-width="3"/>
      <path d="M 14 30 L 54 40 L 52 46 L 12 36 Z" fill="#6f6a58" stroke="#2c2216" stroke-width="3"/>
    </svg>`,
    vestas: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="26" width="40" height="20" rx="4" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <line x1="30" y1="16" x2="42" y2="22" stroke="#a08a5e" stroke-width="4"/>
      <circle cx="44" cy="23" r="4" fill="#e05a4a"/>
    </svg>`,
    scarf: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 26 Q 32 14 52 26 Q 32 38 12 26 Z" fill="#8a4a34" stroke="#5a2e1e" stroke-width="3"/>
      <path d="M 24 32 L 20 52 L 30 50 L 30 34 Z" fill="#8a4a34" stroke="#5a2e1e" stroke-width="3"/>
      <line x1="21" y1="46" x2="29" y2="45" stroke="#5a2e1e" stroke-width="2"/>
    </svg>`,
    bell: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 42 Q 18 22 32 14 Q 46 22 46 42 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="32" cy="48" r="5" fill="#8a6a30"/>
      <path d="M 28 12 q 4 -6 8 0" fill="none" stroke="#8a6a30" stroke-width="3"/>
    </svg>`,
    pikesThings: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 30 Q 28 18 48 30 Q 28 42 8 30 Z" fill="#8a4a34" stroke="#5a2e1e" stroke-width="3"/>
      <path d="M 40 44 Q 40 32 48 27 Q 56 32 56 44 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="2.5"/>
      <circle cx="48" cy="47" r="3" fill="#8a6a30"/>
    </svg>`,
    tinTag: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="18" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="32" cy="18" r="4" fill="none" stroke="#8a6a30" stroke-width="3"/>
      <path d="M 24 40 Q 24 30 32 24 Q 40 30 40 40 Z" fill="none" stroke="#5a4020" stroke-width="2.5"/>
    </svg>`,
    ledger: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="3" fill="#7a3a2e" stroke="#0d1014" stroke-width="3"/>
      <rect x="18" y="16" width="28" height="32" fill="#e6dfc8"/>
      <path d="M 24 26 Q 30 20 38 26 Q 30 32 24 26 Z" fill="none" stroke="#6a5f48" stroke-width="2"/>
      <line x1="24" y1="38" x2="40" y2="38" stroke="#8a7a5a" stroke-width="2"/>
      <line x1="24" y1="44" x2="36" y2="44" stroke="#8a7a5a" stroke-width="2"/>
    </svg>`,
    passbook: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="36" height="42" rx="3" fill="#2c3a4a" stroke="#0d1014" stroke-width="3"/>
      <rect x="14" y="12" width="36" height="10" fill="#c9a544"/>
      <line x1="22" y1="34" x2="42" y2="34" stroke="#6a7a8e" stroke-width="2"/>
      <line x1="22" y1="42" x2="38" y2="42" stroke="#6a7a8e" stroke-width="2"/>
    </svg>`,
    packet: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="40" height="30" rx="4" fill="#5a5648" stroke="#2c2a22" stroke-width="3"/>
      <line x1="32" y1="18" x2="32" y2="48" stroke="#a08a5e" stroke-width="4"/>
      <line x1="12" y1="33" x2="52" y2="33" stroke="#a08a5e" stroke-width="4"/>
      <circle cx="32" cy="33" r="4" fill="#a08a5e"/>
    </svg>`,
    scrap: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 16 14 L 46 18 L 50 34 L 40 32 L 44 50 L 22 44 L 26 30 L 14 28 Z" fill="#8d8672" stroke="#2c2a22" stroke-width="3"/>
      <line x1="24" y1="24" x2="40" y2="27" stroke="#6f6a58" stroke-width="2"/>
    </svg>`,
  };

  return {
    icons,
    cat,
    CATS,
    markGlyph,
    pilchardBoard,
    duchessBoard,
    tagStrip,
    quay,
    stairs,
    loft,
    light,
    boathouseZoom,
    ledgerZoom,
  };
})();
