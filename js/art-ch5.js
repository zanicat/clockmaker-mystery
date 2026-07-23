/* Art for Chapter Five — "The Impresario's Ghost".
   Namespaced under Art.ch5. Scenes 1600x1000, zooms 1200x800.

   A gaslit music hall in crimson velvet and gilt, lit FROM BELOW — every
   scene's light climbs upward from footlights, limelight or tallow, throwing
   long soft shadows up the walls. The chapter's novelty is the WIND: once
   the understage bellows are cranked (S.flags.windOn) the house breathes —
   painters add stirring curtains and visible sound-ripples at the duct
   grilles, and box five's half-curtain lifts.

   Signature motion: guttering footlight flames, a slow chandelier sway,
   and concentric sound-ripples wherever the ducts speak. Give every
   gradient a unique id per painter; two painters can share the DOM
   through zoom overlays. */

Art.ch5 = (() => {
  const { paperSheet, gearGlyph } = Art;

  const C = {
    dark: '#1a0e14', wall: '#2a141c', wallDeep: '#20101a',
    velvet: '#5a2230', velvetDeep: '#411722', velvetLit: '#7a3040',
    gilt: '#cba045', giltLit: '#efd58a', giltDeep: '#8a6a30',
    foot: '#ffd9a0', lime: '#eafbe8',
    wood: '#3a2620', woodDark: '#241610',
    stone: '#33222a', stoneDark: '#241820',
    tin: '#8a7f72', tinDark: '#5a5248',
    text: '#d8b8a8', cream: '#e8dfc8',
    flame: '#ffca7a',
  };

  /* Stair bands receding inside a stairwell box, lit from below like
     everything in this house: riser faces catch the warm up-glow,
     treads sit in their own shadow.  'up' climbs away above its
     threshold (the lowest riser warmest), 'pit' falls away into the
     dark, and 'glow' falls toward a light — the understage trap, whose
     deepest steps burn brightest.  Draws bands only; the caller keeps
     its own backing and frame. */
  function stairSteps(x, y, w, h, mode, funnel) {
    const n = h >= 300 ? 7 : 4;
    let pitch = (mode === 'up' ? 0.17 : 0.22) * h;
    let edge = mode === 'up' ? y + h : y;
    let out = '';
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const inset = t * w * (funnel || 0.10);
      const bx = x + inset, bw = w - 2 * inset;
      let by;
      if (mode === 'up') { edge -= pitch; by = edge; }
      else { by = edge; edge += pitch; }
      if (mode === 'up') {
        out += `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.stone}"/>
          <rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.foot}" opacity="${(0.2 * (1 - t)).toFixed(2)}"/>
          <rect x="${bx}" y="${by}" width="${bw}" height="5" fill="${C.dark}" opacity="0.7"/>
          ${i < 3 ? `<rect x="${bx}" y="${by + 5}" width="${bw}" height="2" fill="${C.foot}" opacity="${(0.5 * (1 - t)).toFixed(2)}"/>` : ''}
          <rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.dark}" opacity="${(0.5 * t).toFixed(2)}"/>`;
      } else if (mode === 'pit') {
        out += `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.stone}"/>
          <rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.foot}" opacity="${(0.2 * (1 - t)).toFixed(2)}"/>
          <rect x="${bx}" y="${by + pitch - 4}" width="${bw}" height="4" fill="#0f080c"/>
          <rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.dark}" opacity="${(0.6 * t).toFixed(2)}"/>`;
      } else {
        const r = Math.max(5, pitch * 0.3);
        out += `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.stone}" opacity="0.35"/>
          <rect x="${bx}" y="${by + pitch - r}" width="${bw}" height="${r}" fill="${C.foot}" opacity="${(0.14 + 0.3 * t).toFixed(2)}"/>
          <rect x="${bx}" y="${by}" width="${bw}" height="2" fill="${C.dark}" opacity="0.6"/>`;
      }
      pitch *= 0.8;
    }
    if (mode === 'up') out += `<rect x="${x}" y="${y}" width="${w}" height="${edge - y}" fill="${C.dark}" opacity="0.55"/>`;
    else if (mode === 'pit') out += `<rect x="${x}" y="${edge}" width="${w}" height="${y + h - edge}" fill="${C.dark}" opacity="0.55"/>`;
    else out += `<ellipse cx="${x + w / 2}" cy="${y + h - 10}" rx="${w * 0.3}" ry="8" fill="${C.foot}" opacity="0.22"/>`;
    return out;
  }

  // A row of guttering footlight flames with an upward glow.
  function footlights(x, y, w, n, id) {
    let f = '';
    for (let i = 0; i < n; i++) {
      const fx = x + (i + 0.5) * (w / n);
      f += `<g>
        <rect x="${(fx - 7).toFixed(0)}" y="${y}" width="14" height="12" rx="3" fill="${C.giltDeep}"/>
        <path d="M ${fx.toFixed(0)} ${y} q -7 -14 0 -26 q 7 12 0 26 Z" fill="${C.flame}">
          <animate attributeName="opacity" values="0.65;1;0.75;1;0.65" dur="${(2.2 + (i % 3) * 0.7).toFixed(1)}s" repeatCount="indefinite"/>
        </path>
      </g>`;
    }
    return `<g>
      <defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="${C.foot}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${C.foot}" stop-opacity="0"/>
      </linearGradient></defs>
      <rect x="${x}" y="${y - 190}" width="${w}" height="190" fill="url(#${id})"/>
      <rect x="${x - 8}" y="${y + 8}" width="${w + 16}" height="12" fill="${C.woodDark}"/>
      ${f}
    </g>`;
  }

  // Concentric sound-ripples: the house's breath made visible.
  function ripples(cx, cy, color) {
    let r = '';
    for (let i = 0; i < 3; i++) {
      r += `<circle cx="${cx}" cy="${cy}" r="8" fill="none" stroke="${color || C.foot}" stroke-width="2.5">
        <animate attributeName="r" values="8;46" dur="2.4s" begin="-${(i * 0.8).toFixed(1)}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0" dur="2.4s" begin="-${(i * 0.8).toFixed(1)}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return `<g>${r}</g>`;
  }

  // A brass duct grille: frame and slats.
  function grille(x, y, w, h) {
    let slats = '';
    const n = Math.max(3, Math.round(h / 18));
    for (let i = 1; i < n; i++) {
      const sy = y + (i * h) / n;
      slats += `<line x1="${x + 6}" y1="${sy.toFixed(0)}" x2="${x + w - 6}" y2="${sy.toFixed(0)}" stroke="${C.giltDeep}" stroke-width="4"/>`;
    }
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${C.dark}" stroke="${C.gilt}" stroke-width="4"/>
      ${slats}
    </g>`;
  }

  // A simple standing figure (the small cast). coat/skin/hair vary.
  function figure(x, y, coat, skin, hair) {
    return `<g>
      <path d="M ${x - 40} ${y} Q ${x - 54} ${y - 130} ${x - 24} ${y - 175} L ${x + 24} ${y - 175} Q ${x + 54} ${y - 130} ${x + 40} ${y} Z" fill="${coat}" stroke="#000" stroke-opacity="0.35" stroke-width="3"/>
      <rect x="${x - 23}" y="${y - 200}" width="46" height="44" rx="9" fill="${coat}"/>
      <circle cx="${x}" cy="${y - 220}" r="26" fill="${skin}"/>
      <path d="M ${x - 26} ${y - 226} Q ${x} ${y - 254} ${x + 26} ${y - 226} L ${x + 26} ${y - 216} Q ${x} ${y - 238} ${x - 26} ${y - 216} Z" fill="${hair}"/>
      <circle cx="${x - 9}" cy="${y - 220}" r="2.6" fill="#241628"/>
      <circle cx="${x + 9}" cy="${y - 220}" r="2.6" fill="#241628"/>
      <line x1="${x - 34}" y1="${y - 150}" x2="${x - 50}" y2="${y - 60}" stroke="${coat}" stroke-width="13" stroke-linecap="round"/>
      <line x1="${x + 34}" y1="${y - 150}" x2="${x + 52}" y2="${y - 74}" stroke="${coat}" stroke-width="13" stroke-linecap="round"/>
    </g>`;
  }

  // Swagged velvet with gilt fringe, hung from a rail.
  function swag(x, y, w, drop, fill) {
    return `<g>
      <path d="M ${x} ${y} Q ${x + w / 2} ${y + drop} ${x + w} ${y} L ${x + w} ${y - 14} L ${x} ${y - 14} Z" fill="${fill || C.velvet}" stroke="${C.velvetDeep}" stroke-width="3"/>
      <path d="M ${x} ${y} Q ${x + w / 2} ${y + drop} ${x + w} ${y}" fill="none" stroke="${C.gilt}" stroke-width="4" stroke-dasharray="2 7"/>
    </g>`;
  }

  // ---------- scene: the auditorium ----------

  function house(S) {
    const wind = !!S.flags.windOn;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hovig" cx="42%" cy="60%" r="85%">
          <stop offset="42%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.wall}"/>
      <rect x="0" y="760" width="1600" height="240" fill="${C.wallDeep}"/>

      <!-- the proscenium and stage, left -->
      <g>
        <rect x="120" y="130" width="780" height="590" fill="${C.dark}"/>
        <rect x="100" y="110" width="820" height="40" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="4"/>
        <rect x="100" y="110" width="46" height="610" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="4"/>
        <rect x="874" y="110" width="46" height="610" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="4"/>
        <circle cx="510" cy="130" r="26" fill="${C.giltLit}" stroke="${C.giltDeep}" stroke-width="3"/>
        <!-- the great curtain, lit from below -->
        ${swag(146, 210, 364, 60)}${swag(510, 210, 364, 60)}
        <path d="M 160 190 L 240 700 L 146 700 L 146 190 Z" fill="${C.velvet}"/>
        <path d="M 860 190 L 780 700 L 874 700 L 874 190 Z" fill="${C.velvet}"/>
        <path d="M 146 690 Q 510 640 874 690 L 874 706 L 146 706 Z" fill="${C.velvetLit}"/>
        <g stroke="${C.velvetDeep}" stroke-width="5" opacity="0.7">
          <line x1="300" y1="212" x2="330" y2="690"/><line x1="440" y1="220" x2="450" y2="680"/>
          <line x1="580" y1="220" x2="570" y2="680"/><line x1="720" y1="212" x2="690" y2="690"/>
        </g>
        ${footlights(150, 700, 720, 9, 'hofoot')}
        <text x="510" y="86" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the Empress, dark a week now</text>
      </g>

      <!-- the pass door beside the proscenium -->
      <g>
        <rect x="42" y="470" width="150" height="252" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <circle cx="170" cy="600" r="8" fill="${C.gilt}"/>
        <text x="117" y="454" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">PASS DOOR</text>
      </g>

      <!-- the chandelier, swaying just perceptibly -->
      <g>
        <line x1="800" y1="0" x2="800" y2="70" stroke="${C.giltDeep}" stroke-width="5"/>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-1.2 800 20; 1.2 800 20; -1.2 800 20" dur="7s" repeatCount="indefinite"/>
          <path d="M 720 110 Q 800 180 880 110 L 856 88 Q 800 130 744 88 Z" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="3"/>
          <line x1="800" y1="70" x2="800" y2="100" stroke="${C.giltDeep}" stroke-width="4"/>
          ${[736, 774, 812, 850].map(fx => `<path d="M ${fx} 96 q -5 -10 0 -19 q 5 9 0 19 Z" fill="${C.flame}">
            <animate attributeName="opacity" values="0.6;1;0.7;1;0.6" dur="2.8s" repeatCount="indefinite"/>
          </path>`).join('')}
        </g>
      </g>

      <!-- the boxes tier, right; Box Five above -->
      <g>
        <rect x="1010" y="150" width="560" height="580" fill="${C.wallDeep}"/>
        <rect x="1080" y="240" width="290" height="190" rx="10" fill="${C.dark}" stroke="${C.gilt}" stroke-width="5"/>
        <path d="M 1080 430 Q 1225 470 1370 430 L 1370 452 L 1080 452 Z" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="3"/>
        ${swag(1092, 262, 266, 34)}
        <circle cx="1225" cy="228" r="16" fill="none" stroke="${C.giltLit}" stroke-width="4"/>
        <text x="1225" y="234" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${C.giltLit}">V</text>
        ${wind ? ripples(1330, 400) : ''}
        <text x="1225" y="496" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">Box Five &mdash; where the wailing lives</text>
        <rect x="1080" y="540" width="290" height="150" rx="10" fill="${C.dark}" stroke="${C.giltDeep}" stroke-width="4"/>
        ${swag(1092, 560, 266, 26, C.velvetDeep)}
      </g>

      <!-- the doors out to the foyer -->
      <g>
        <rect x="1382" y="540" width="180" height="222" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <line x1="1472" y1="540" x2="1472" y2="762" stroke="${C.woodDark}" stroke-width="4"/>
        <circle cx="1452" cy="655" r="7" fill="${C.gilt}"/><circle cx="1492" cy="655" r="7" fill="${C.gilt}"/>
        <text x="1472" y="524" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">TO THE FOYER</text>
      </g>

      <!-- the stalls, rows of empty seat-backs -->
      <g fill="${C.velvetDeep}" stroke="${C.dark}" stroke-width="3">
        ${[820, 880, 945].map((ry, i) => {
          let row = '';
          for (let sx = 240 + i * 40; sx < 1300; sx += 96) {
            row += `<rect x="${sx}" y="${ry}" width="66" height="${52 + i * 8}" rx="12"/>`;
          }
          return row;
        }).join('')}
      </g>
      <text x="770" y="992" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a full house of nobody</text>

      <rect width="1600" height="1000" fill="url(#hovig)"/>
    </svg>`;
  }

  // ---------- zoom: box five ----------

  function box5Zoom(S) {
    const wind = !!S.flags.windOn;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="b5vig" cx="50%" cy="55%" r="78%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
        <linearGradient id="b5dust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.stone}" stop-opacity="0"/>
          <stop offset="100%" stop-color="#8a7a6a" stop-opacity="0.35"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.wallDeep}"/>
      <rect x="60" y="60" width="1080" height="620" rx="14" fill="${C.wall}" stroke="${C.gilt}" stroke-width="5"/>
      <circle cx="330" cy="180" r="40" fill="none" stroke="${C.giltDeep}" stroke-width="5"/>
      <circle cx="330" cy="180" r="18" fill="${C.velvet}" stroke="${C.giltDeep}" stroke-width="3"/>
      <text x="330" y="260" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the rosette</text>

      <!-- two shrouded chairs -->
      <g fill="${C.velvet}" stroke="${C.velvetDeep}" stroke-width="4">
        <path d="M 180 620 Q 175 470 240 460 L 330 460 Q 395 470 390 620 Z"/>
        <path d="M 430 620 Q 425 470 490 460 L 580 460 Q 645 470 640 620 Z"/>
      </g>
      <path d="M 180 500 L 640 500" stroke="${C.cream}" stroke-width="0" fill="none"/>

      <!-- the dust: one even, unbroken sheen -->
      <rect x="120" y="620" width="560" height="140" fill="url(#b5dust)"/>
      <text x="400" y="784" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">dust like fresh snow &mdash; and not one footprint in it</text>

      <!-- the half-curtain, and the grille behind it -->
      <g>
        <line x1="790" y1="250" x2="1050" y2="250" stroke="${C.giltDeep}" stroke-width="6"/>
        ${grille(850, 510, 180, 130)}
        ${wind ? ripples(940, 575, C.foot) : ''}
        <path d="M 800 250 L 796 640 L 900 640 Q 884 440 908 250 Z" fill="${C.velvet}" stroke="${C.velvetDeep}" stroke-width="3">
          ${wind ? `<animateTransform attributeName="transform" type="skewX" values="0;-2.5;0;-1.5;0" dur="3.2s" repeatCount="indefinite"/>` : ''}
        </path>
        <text x="920" y="690" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">${wind ? 'the curtain lifts and settles, lifts and settles' : 'a half-curtain, and a brass grille behind'}</text>
      </g>

      <rect width="1200" height="800" fill="url(#b5vig)"/>
    </svg>`;
  }

  // ---------- scene: the stage ----------

  function stage(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="stvig" cx="50%" cy="58%" r="85%">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </radialGradient>
        <linearGradient id="stboards" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.wood}"/>
          <stop offset="100%" stop-color="${C.woodDark}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.dark}"/>
      <rect x="0" y="0" width="1600" height="240" fill="${C.wallDeep}"/>
      <g stroke="${C.woodDark}" stroke-width="4" opacity="0.8">
        <line x1="0" y1="60" x2="1600" y2="60"/><line x1="0" y1="140" x2="1600" y2="140"/>
      </g>
      <text x="800" y="40" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the flies, rope and shadow</text>

      <!-- the boards -->
      <rect x="0" y="620" width="1600" height="380" fill="url(#stboards)"/>
      <g stroke="${C.woodDark}" stroke-width="3" opacity="0.7">
        <line x1="0" y1="700" x2="1600" y2="700"/><line x1="0" y1="790" x2="1600" y2="790"/><line x1="0" y1="890" x2="1600" y2="890"/>
      </g>

      <!-- the pass door, downstage left -->
      <g>
        <rect x="34" y="400" width="140" height="290" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <circle cx="150" cy="550" r="7" fill="${C.gilt}"/>
        <text x="104" y="384" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">TO THE HOUSE</text>
      </g>

      <!-- the prompt corner: high desk, script, the prompter's relics -->
      <g>
        <rect x="200" y="560" width="180" height="170" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="212" y="530" width="156" height="40" rx="4" fill="${C.woodDark}"/>
        ${paperSheet(230, 480, 90, 60, -5, '#8a7f66')}
        ${S.flags.trumpetTaken ? '' : `<g>
          <path d="M 310 500 q 40 -6 52 -34 l 14 8 q -14 34 -62 42 Z" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="3"/>
          <circle cx="382" cy="468" r="13" fill="none" stroke="${C.giltDeep}" stroke-width="4"/>
          <line x1="330" y1="492" x2="352" y2="478" stroke="${C.dark}" stroke-width="2"/>
        </g>`}
        <text x="290" y="756" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the prompt corner</text>
      </g>

      <!-- the practice monochord on its stand -->
      <g>
        <rect x="470" y="640" width="200" height="26" rx="6" fill="${C.woodDark}"/>
        <rect x="490" y="480" width="160" height="164" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <line x1="570" y1="492" x2="570" y2="632" stroke="${C.cream}" stroke-width="3"/>
        <circle cx="570" cy="486" r="8" fill="${C.gilt}"/>
        <circle cx="570" cy="562" r="18" fill="${C.dark}" stroke="${C.giltDeep}" stroke-width="3"/>
        <text x="570" y="690" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the practice monochord</text>
      </g>

      <!-- the ghost light: one flame on a pole, the stage's only courtesy -->
      <g>
        <rect x="742" y="560" width="14" height="150" fill="${C.tinDark}"/>
        <circle cx="749" cy="540" r="24" fill="none" stroke="${C.giltDeep}" stroke-width="4"/>
        <path d="M 749 552 q -8 -14 0 -28 q 8 14 0 28 Z" fill="${C.flame}">
          <animate attributeName="opacity" values="0.7;1;0.8;1;0.7" dur="3.1s" repeatCount="indefinite"/>
        </path>
        <text x="749" y="736" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the ghost light</text>
      </g>

      <!-- Madame Varga, centre stage, going nowhere -->
      ${figure(900, 720, '#7a2036', '#e8cbaa', '#2a1a20')}
      <text x="900" y="758" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Madame Celeste Varga</text>

      <!-- the trap stairs, open in the boards -->
      <g>
        <rect x="990" y="800" width="220" height="160" rx="8" fill="${C.dark}" stroke="${C.woodDark}" stroke-width="6"/>
        ${stairSteps(1000, 812, 200, 140, 'glow', 0.24)}
        <text x="1100" y="790" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">DOWN TO THE UNDERSTAGE</text>
      </g>

      <!-- the dressing table, mirror ringed with gas jets -->
      <g>
        <rect x="1240" y="560" width="220" height="160" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
        <rect x="1270" y="420" width="160" height="140" rx="10" fill="#4a3a44" stroke="${C.gilt}" stroke-width="4"/>
        <ellipse cx="1310" cy="460" rx="14" ry="24" fill="#7a6a78" opacity="0.7"/>
        ${[1276, 1424].map(fx => `<path d="M ${fx} 414 q -5 -10 0 -19 q 5 9 0 19 Z" fill="${C.flame}">
          <animate attributeName="opacity" values="0.6;1;0.7;1;0.6" dur="2.6s" repeatCount="indefinite"/>
        </path>`).join('')}
        ${S.flags.waxTaken ? '' : `<rect x="1300" y="536" width="16" height="30" rx="4" fill="#e8d8a0" stroke="${C.giltDeep}" stroke-width="2" transform="rotate(18 1308 551)"/>`}
        <text x="1350" y="748" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">Madame&rsquo;s dressing table</text>
      </g>

      <!-- the fly ropes, pinned along the far wall -->
      <g>
        <g stroke="#6a5a48" stroke-width="6">
          <line x1="1510" y1="220" x2="1502" y2="720"/><line x1="1544" y1="220" x2="1540" y2="720"/><line x1="1578" y1="220" x2="1576" y2="720"/>
        </g>
        <rect x="1490" y="640" width="104" height="26" rx="6" fill="${C.woodDark}"/>
      </g>

      <rect width="1600" height="1000" fill="url(#stvig)"/>
    </svg>`;
  }

  // ---------- scene: the understage ----------

  function under(S) {
    const wind = !!S.flags.windOn;
    const open = !!S.flags.chapelOpen;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="unvig" cx="45%" cy="52%" r="85%">
          <stop offset="40%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.66"/>
        </radialGradient>
        <linearGradient id="unlime" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="${C.lime}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${C.lime}" stop-opacity="0.04"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.stoneDark}"/>

      <!-- the stage floor overhead, light bleeding down the seams -->
      <rect x="0" y="0" width="1600" height="120" fill="${C.woodDark}"/>
      <g stroke="${C.foot}" stroke-width="3" opacity="0.35">
        <line x1="120" y1="118" x2="380" y2="118"/><line x1="520" y1="118" x2="820" y2="118"/><line x1="980" y1="118" x2="1240" y2="118"/>
      </g>
      <g stroke="${C.dark}" stroke-width="5"><line x1="0" y1="120" x2="1600" y2="120"/></g>

      <!-- stone piers -->
      <g fill="${C.stone}" stroke="${C.stoneDark}" stroke-width="5">
        <rect x="330" y="120" width="90" height="620"/>
        <rect x="820" y="120" width="90" height="620"/>
      </g>
      <rect x="0" y="740" width="1600" height="260" fill="${C.dark}"/>
      <rect x="0" y="734" width="1600" height="10" fill="#0f080c"/>

      <!-- stairs up to the stage -->
      <g>
        <rect x="60" y="300" width="180" height="440" fill="${C.stoneDark}"/>
        ${stairSteps(60, 300, 180, 440, 'up')}
        <text x="150" y="286" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">UP TO THE STAGE</text>
      </g>

      <!-- cellar steps up to the foyer -->
      <g>
        <rect x="280" y="600" width="160" height="140" fill="${C.stoneDark}"/>
        ${stairSteps(280, 600, 160, 140, 'up')}
        <text x="360" y="588" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">UP TO THE FOYER</text>
      </g>

      <!-- the limelight rig, its cone climbing through the stage slot -->
      <g>
        <polygon points="640,140 740,140 760,430 620,430" fill="url(#unlime)"/>
        <rect x="620" y="430" width="140" height="90" rx="10" fill="${C.tin}" stroke="${C.tinDark}" stroke-width="4"/>
        <circle cx="690" cy="475" r="22" fill="${C.lime}" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.8;1;0.7" dur="2.9s" repeatCount="indefinite"/>
        </circle>
        <rect x="660" y="520" width="60" height="120" fill="${C.tinDark}"/>
        <text x="690" y="672" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the limelight, sighing upward</text>
      </g>

      <!-- Wick, the limelight boy -->
      ${figure(520, 740, '#4a4038', '#dcbf9f', '#8a5a30')}
      <text x="520" y="778" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Wick, the limelight boy</text>

      <!-- the duct junction: one trunk, five tin mouths -->
      <g>
        <rect x="1010" y="120" width="70" height="420" fill="${C.tin}" stroke="${C.tinDark}" stroke-width="4"/>
        ${[[950, 400, 'a'], [950, 490, 'b'], [1120, 400, 'c'], [1120, 490, 'd'], [1120, 580, 'e']].map(([mx, my]) =>
          `<g><rect x="${mx}" y="${my}" width="66" height="54" rx="8" fill="${C.tin}" stroke="${C.tinDark}" stroke-width="4"/>
           <ellipse cx="${mx + 33}" cy="${my + 27}" rx="20" ry="16" fill="${C.dark}"/></g>`).join('')}
        <path d="M 1186 607 Q 1260 620 1300 560" fill="none" stroke="${C.tin}" stroke-width="22"/>
        ${wind ? ripples(1043, 340, C.lime) : ''}
        <text x="1050" y="700" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the duct junction &mdash; five mouths, all murmuring</text>
      </g>

      <!-- the old chapel wall: a bricked arch under limewash -->
      <g>
        <path d="M 1270 720 L 1270 420 Q 1390 300 1510 420 L 1510 720 Z" fill="${open ? C.dark : '#5a4a42'}" stroke="#3a2e28" stroke-width="6"/>
        ${open
          ? `<rect x="1300" y="470" width="180" height="250" fill="#241214"/>
             <path d="M 1300 470 L 1480 470 L 1480 720 L 1440 720 Q 1430 560 1300 500 Z" fill="${C.flame}" opacity="0.14"/>
             <text x="1390" y="756" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the &#8220;wall&#8221;, swung wide on silent hinges</text>`
          : `<g stroke="#4a3a34" stroke-width="3" opacity="0.8">
               <line x1="1290" y1="480" x2="1490" y2="480"/><line x1="1290" y1="540" x2="1490" y2="540"/>
               <line x1="1290" y1="600" x2="1490" y2="600"/><line x1="1290" y1="660" x2="1490" y2="660"/>
               <line x1="1350" y1="480" x2="1350" y2="540"/><line x1="1430" y1="480" x2="1430" y2="540"/>
               <line x1="1390" y1="540" x2="1390" y2="600"/><line x1="1330" y1="600" x2="1330" y2="660"/>
             </g>
             <text x="1390" y="756" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the old Bethel chapel wall</text>`}
      </g>

      <rect width="1600" height="1000" fill="url(#unvig)"/>
    </svg>`;
  }

  // ---------- zoom: the chapel machine room ----------

  function chapelZoom(S) {
    const wind = !!S.flags.windOn;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chvig" cx="50%" cy="55%" r="78%">
          <stop offset="46%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.58"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#241214"/>
      <path d="M 80 720 L 80 260 Q 600 60 1120 260 L 1120 720 Z" fill="${C.stoneDark}" stroke="#0f080c" stroke-width="6"/>
      <text x="600" y="120" text-anchor="middle" font-size="18" font-family="Georgia, serif" fill="${C.giltLit}" letter-spacing="2">THE GHOST&rsquo;S WORKSHOP</text>

      <!-- the tallow shelf, cheap candles burning low -->
      <g>
        <rect x="150" y="220" width="240" height="16" fill="${C.wood}"/>
        ${[190, 250, 310].map(cx => `<g>
          <rect x="${cx - 9}" y="${cx % 2 ? 176 : 182}" width="18" height="${cx % 2 ? 44 : 38}" fill="#e8d8a0" stroke="${C.giltDeep}" stroke-width="2"/>
          <path d="M ${cx} ${cx % 2 ? 172 : 178} q -6 -12 0 -22 q 6 10 0 22 Z" fill="${C.flame}">
            <animate attributeName="opacity" values="0.6;1;0.75;1;0.6" dur="2.4s" repeatCount="indefinite"/>
          </path>
        </g>`).join('')}
        <text x="270" y="266" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">tallow, fresh this week</text>
      </g>

      <!-- the pin-barrel -->
      <g>
        <rect x="240" y="360" width="320" height="150" rx="70" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <ellipse cx="560" cy="435" rx="28" ry="72" fill="${C.woodDark}"/>
        <g fill="${C.gilt}">
          ${[[290, 396], [340, 470], [380, 410], [430, 452], [470, 392], [510, 462], [300, 452], [450, 420]].map(([px, py]) => `<circle cx="${px}" cy="${py}" r="5"/>`).join('')}
        </g>
        <text x="400" y="548" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a pin-barrel, scored with one phrase</text>
      </g>

      <!-- the wind-chest and its one church pipe; the duct climbs away -->
      <g>
        <rect x="680" y="360" width="240" height="70" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        ${S.flags.pipeTaken ? `<rect x="770" y="212" width="60" height="148" fill="${C.dark}" opacity="0.5"/>` : `<g>
          <rect x="774" y="216" width="52" height="144" rx="8" fill="${C.tin}" stroke="${C.tinDark}" stroke-width="4"/>
          <ellipse cx="800" cy="238" rx="12" ry="7" fill="${C.dark}"/>
        </g>`}
        <path d="M 900 300 Q 990 240 1010 160" fill="none" stroke="${C.tin}" stroke-width="26"/>
        ${wind && !S.flags.pipeTaken ? ripples(800, 200, C.foot) : ''}
        <text x="800" y="460" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">one lonely pipe on a wind-chest</text>
      </g>

      <!-- the bellows -->
      <g>
        <path d="M 640 560 L 900 540 L 900 660 L 640 680 Z" fill="#6a4a3a" stroke="${C.woodDark}" stroke-width="5">
          ${wind ? `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0" dur="2.2s" repeatCount="indefinite"/>` : ''}
        </path>
        <g stroke="${C.woodDark}" stroke-width="3"><line x1="680" y1="565" x2="680" y2="672"/><line x1="740" y1="560" x2="740" y2="668"/><line x1="800" y1="553" x2="800" y2="664"/><line x1="860" y1="548" x2="860" y2="660"/></g>
        <text x="770" y="712" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a bellows fat as a bishop${wind ? ' &mdash; breathing' : ''}</text>
      </g>

      <!-- the crank -->
      <g>
        ${gearGlyph(1010, 520, 40, C.gilt, C.giltDeep)}
        ${gearGlyph(1052, 578, 24, C.gilt, C.giltDeep)}
        <line x1="1010" y1="520" x2="1064" y2="452" stroke="${C.giltDeep}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="1064" cy="452" r="10" fill="${C.gilt}"/>
        <text x="1020" y="640" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the crank, greased kind</text>
      </g>

      <rect width="1200" height="800" fill="url(#chvig)"/>
    </svg>`;
  }

  // ---------- scene: the grand foyer ----------

  function foyer(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fovig" cx="50%" cy="52%" r="85%">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.58"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.wall}"/>

      <!-- chequered marble floor -->
      <rect x="0" y="720" width="1600" height="280" fill="#3a2a2e"/>
      <g fill="#241a1e">
        ${[0, 1, 2].map(r => {
          let row = '';
          for (let i = r % 2; i < 16; i += 2) row += `<rect x="${i * 100}" y="${720 + r * 94}" width="100" height="94"/>`;
          return row;
        }).join('')}
      </g>

      <!-- gas brackets -->
      ${[120, 1480].map((bx, i) => `<g>
        <path d="M ${bx} 300 q ${i ? -30 : 30} -8 ${i ? -34 : 34} -40" fill="none" stroke="${C.giltDeep}" stroke-width="6"/>
        <path d="M ${bx + (i ? -34 : 34)} 262 q -6 -14 0 -26 q 6 12 0 26 Z" fill="${C.flame}">
          <animate attributeName="opacity" values="0.65;1;0.75;1;0.65" dur="${(2.5 + i * 0.6).toFixed(1)}s" repeatCount="indefinite"/>
        </path>
      </g>`).join('')}

      <!-- doors back into the house -->
      <g>
        <rect x="80" y="360" width="230" height="360" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <line x1="195" y1="360" x2="195" y2="720" stroke="${C.woodDark}" stroke-width="5"/>
        <circle cx="172" cy="540" r="8" fill="${C.gilt}"/><circle cx="218" cy="540" r="8" fill="${C.gilt}"/>
        <text x="195" y="344" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">TO THE HOUSE</text>
      </g>

      <!-- the organ front from the chapel days: gilt pipes, one gap -->
      <g>
        <rect x="560" y="180" width="480" height="460" rx="12" fill="${C.wood}" stroke="${C.giltDeep}" stroke-width="6"/>
        <rect x="580" y="200" width="440" height="380" rx="8" fill="${C.dark}"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
          const px = 600 + i * 45;
          const ph = 300 - Math.abs(i - 4) * 34;
          if (i === 5 && !S.flags.pipeFitted) {
            return `<rect x="${px}" y="${560 - ph}" width="36" height="${ph}" rx="6" fill="#140a0e" stroke="#3a2a2e" stroke-width="3"/>`;
          }
          return `<g><rect x="${px}" y="${560 - ph}" width="36" height="${ph}" rx="6" fill="${i === 5 ? C.giltLit : C.gilt}" stroke="${C.giltDeep}" stroke-width="3"/>
            <ellipse cx="${px + 18}" cy="${560 - ph + 26}" rx="9" ry="5" fill="${C.dark}"/></g>`;
        }).join('')}
        <text x="800" y="672" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the old chapel organ front${S.flags.pipeFitted ? '' : ' &mdash; a gap like a missing tooth'}</text>
      </g>

      <!-- Mr. Pettibone, gladhanding an empty room -->
      ${figure(400, 760, '#6a3050', '#e6c6a6', '#7a6a58')}
      <text x="400" y="798" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Mr. Aurelius Pettibone</text>

      <!-- the manager's office door -->
      <g>
        <rect x="1170" y="380" width="200" height="340" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="6"/>
        <rect x="1200" y="420" width="140" height="40" rx="4" fill="${C.gilt}"/>
        <text x="1270" y="447" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${C.woodDark}" letter-spacing="2">MANAGER</text>
        <circle cx="1345" cy="560" r="8" fill="${C.gilt}"/>
      </g>

      <!-- cellar steps down -->
      <g>
        <rect x="1410" y="700" width="170" height="270" fill="${C.stoneDark}"/>
        ${stairSteps(1410, 700, 170, 270, 'pit')}
        <text x="1495" y="688" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">DOWN TO THE CELLARS</text>
      </g>

      <rect width="1600" height="1000" fill="url(#fovig)"/>
    </svg>`;
  }

  // ---------- zoom: the manager's office ----------

  function officeZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ch5ofvig" cx="50%" cy="52%" r="78%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.52"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.wall}"/>
      <rect x="0" y="640" width="1200" height="160" fill="${C.woodDark}"/>

      <!-- a framed playbill -->
      <g>
        <rect x="480" y="90" width="240" height="150" rx="6" fill="#e8dfc4" stroke="${C.gilt}" stroke-width="5"/>
        <text x="600" y="140" text-anchor="middle" font-size="18" font-family="Georgia, serif" fill="#3a2f22" letter-spacing="2">THE EMPRESS</text>
        <text x="600" y="172" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#5f4718" font-style="italic">Mme Varga &mdash; twice nightly</text>
        <text x="600" y="205" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#7a2f2f">POSITIVELY NO GHOSTS</text>
      </g>

      <!-- the key board -->
      <g>
        <rect x="130" y="200" width="200" height="230" rx="8" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        ${[[170, 250], [230, 250], [290, 250], [170, 320], [290, 320], [170, 390], [230, 390], [290, 390]].map(([kx, ky]) => `<g>
          <circle cx="${kx}" cy="${ky - 14}" r="4" fill="${C.giltDeep}"/>
          <circle cx="${kx}" cy="${ky}" r="8" fill="none" stroke="${C.gilt}" stroke-width="3"/>
          <line x1="${kx}" y1="${ky + 8}" x2="${kx}" y2="${ky + 22}" stroke="${C.gilt}" stroke-width="4"/>
        </g>`).join('')}
        ${S.flags.keyTaken
          ? `<circle cx="230" cy="306" r="4" fill="${C.giltDeep}"/>`
          : `<g><circle cx="230" cy="306" r="4" fill="${C.giltDeep}"/>
             <circle cx="230" cy="322" r="9" fill="none" stroke="${C.giltLit}" stroke-width="3"/>
             <line x1="230" y1="331" x2="230" y2="348" stroke="${C.giltLit}" stroke-width="4"/>
             <rect x="216" y="352" width="28" height="14" rx="3" fill="#e8dfc4"/></g>`}
        <text x="230" y="456" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">every key in the house</text>
      </g>

      <!-- the desk: ledger and a drift of unpaid bills -->
      <g>
        <rect x="380" y="480" width="470" height="200" rx="10" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="5"/>
        <g transform="rotate(-4 520 520)">
          <rect x="430" y="470" width="180" height="110" rx="6" fill="#e8dfc4" stroke="${C.giltDeep}" stroke-width="4"/>
          <line x1="520" y1="470" x2="520" y2="580" stroke="${C.giltDeep}" stroke-width="2"/>
          <g stroke="#8a7a5e" stroke-width="2"><line x1="444" y1="500" x2="508" y2="500"/><line x1="444" y1="524" x2="508" y2="524"/><line x1="532" y1="500" x2="596" y2="500"/><line x1="532" y1="524" x2="596" y2="524"/></g>
        </g>
        ${paperSheet(660, 490, 100, 70, 6, '#a05a4a')}
        ${paperSheet(700, 520, 100, 70, -8, '#8a7f66')}
        <text x="615" y="712" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the box-office ledger, and a snowdrift of final notices</text>
      </g>

      <!-- the wainscot panels -->
      <g>
        ${[0, 1, 2].map(r => [0, 1, 2].map(c =>
          `<rect x="${880 + c * 84}" y="${260 + r * 128}" width="72" height="116" rx="6" fill="${C.wood}" stroke="${C.woodDark}" stroke-width="4"/>
           <rect x="${892 + c * 84}" y="${274 + r * 128}" width="48" height="88" rx="4" fill="none" stroke="${C.giltDeep}" stroke-width="2"/>`
        ).join('')).join('')}
        <text x="1006" y="682" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">nine smug oak panels</text>
      </g>

      <rect width="1200" height="800" fill="url(#ch5ofvig)"/>
    </svg>`;
  }

  // ---------- zoom: the organ front ----------

  function facadeZoom(S) {
    const fitted = !!S.flags.pipeFitted;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fzvig" cx="50%" cy="50%" r="78%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.wall}"/>
      <rect x="160" y="80" width="880" height="600" rx="14" fill="${C.wood}" stroke="${C.giltDeep}" stroke-width="6"/>
      <rect x="190" y="110" width="820" height="470" rx="10" fill="${C.dark}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        const px = 230 + i * 84;
        const ph = 380 - Math.abs(i - 4) * 44;
        if (i === 5 && !fitted) {
          return `<g><rect x="${px}" y="${540 - ph}" width="64" height="${ph}" rx="8" fill="#140a0e" stroke="#3a2a2e" stroke-width="4"/>
            <text x="${px + 32}" y="${540 - ph / 2}" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic" transform="rotate(-90 ${px + 32} ${540 - ph / 2})">an empty socket</text></g>`;
        }
        return `<g><rect x="${px}" y="${540 - ph}" width="64" height="${ph}" rx="8" fill="${i === 5 ? C.giltLit : C.gilt}" stroke="${C.giltDeep}" stroke-width="4"/>
          <ellipse cx="${px + 32}" cy="${540 - ph + 40}" rx="15" ry="8" fill="${C.dark}"/></g>`;
      }).join('')}
      ${fitted ? `<text x="600" y="562" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.giltLit}" font-style="italic">a tooth back in its jaw</text>` : ''}

      <!-- the builder's plaque -->
      <g>
        <rect x="480" y="600" width="240" height="60" rx="8" fill="${C.gilt}" stroke="${C.giltDeep}" stroke-width="4"/>
        <text x="600" y="626" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${C.woodDark}" letter-spacing="1">HOYLE &amp; SON</text>
        <text x="600" y="648" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.woodDark}">organ-builders &mdash; 1811</text>
      </g>

      <rect width="1200" height="800" fill="url(#fzvig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const icons = {
    crackedTrumpet: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 44 q 24 -2 32 -22 l 8 5 q -10 26 -38 27 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="54" cy="24" r="7" fill="none" stroke="#8a6a30" stroke-width="4"/>
      <path d="M 22 42 l 10 -8" stroke="#2a141c" stroke-width="2.5" fill="none"/>
    </svg>`,
    waxStub: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="14" width="16" height="38" rx="5" fill="#e8d8a0" stroke="#8a6a30" stroke-width="3" transform="rotate(12 32 33)"/>
      <path d="M 30 12 q 6 5 2 10" fill="none" stroke="#c9a544" stroke-width="3"/>
    </svg>`,
    earTrumpet: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 44 q 24 -2 32 -22 l 8 5 q -10 26 -38 27 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="54" cy="24" r="7" fill="none" stroke="#8a6a30" stroke-width="4"/>
      <path d="M 22 42 l 10 -8" stroke="#e8d8a0" stroke-width="4" fill="none"/>
    </svg>`,
    lampKey: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="22" r="10" fill="none" stroke="#c9a544" stroke-width="5"/>
      <line x1="27" y1="29" x2="46" y2="48" stroke="#c9a544" stroke-width="6" stroke-linecap="round"/>
      <path d="M 40 48 l 8 -8 M 46 54 l 8 -8" stroke="#c9a544" stroke-width="5"/>
      <rect x="10" y="38" width="20" height="12" rx="3" fill="#e8dfc4" stroke="#8a6a30" stroke-width="2"/>
    </svg>`,
    organPipe: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="8" width="16" height="48" rx="5" fill="#8a7f72" stroke="#5a5248" stroke-width="3"/>
      <ellipse cx="32" cy="16" rx="5" ry="3" fill="#1a0e14"/>
      <path d="M 26 40 l 12 0" stroke="#5a5248" stroke-width="2"/>
    </svg>`,
    railLetter: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="34" rx="3" fill="#efe6cf" stroke="#8a6a30" stroke-width="3"/>
      <path d="M 10 16 L 32 36 L 54 16" fill="none" stroke="#8a6a30" stroke-width="3"/>
      <circle cx="44" cy="44" r="8" fill="#4a5a6a" stroke="#2a3540" stroke-width="2"/>
      <path d="M 39 44 l 10 0 M 44 39 l 0 10" stroke="#e8dfc8" stroke-width="2"/>
    </svg>`,
  };

  return {
    house, box5Zoom, stage, under, chapelZoom, foyer, officeZoom, facadeZoom, icons,
  };
})();
