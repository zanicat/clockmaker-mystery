/* Art for Chapter Four — "The Astronomer's Star".
   Namespaced under Art.ch4. Scenes 1600x1000, zooms 1200x800.

   A night observatory rendered in deep indigo and thin brass. The one
   light source is a hard collimated beam through the dome's oculus; the
   chapter's novelty is that beam. Floors light up only when the beam is
   aimed at them: painters branch on S.flags.lit_dome / lit_workshop /
   lit_vault, adding the shaft, the blazing optics, and — in the vault —
   the caustic "Star" on the north wall.

   Signature motion: dust motes drifting down the light-shaft and a slowly
   rotating prismatic star. Give every gradient a unique id per painter;
   two painters can share the DOM through zoom overlays. */

Art.ch4 = (() => {
  const { paperSheet, stars, gearGlyph, clockFace, bottleGlyph } = Art;

  const C = {
    dome: '#171426', wall: '#201a34', stone: '#2a2442', rib: '#3a3560',
    ribDark: '#282343', brass: '#8a7a4a', brassLit: '#cbb56a',
    beam: '#f6efce', caustic: '#cdb8ff', glow: '#2c2650',
    ink: '#0d0b18', panel: '#171528', text: '#b7a9e0', floor: '#1b1730',
    floorDark: '#120f22',
  };

  // Dust motes drifting slowly down a shaft of light.
  function motes(x, y, w, h) {
    const spots = [[0.2, 0.15, 7], [0.55, 0.4, 9], [0.8, 0.7, 6.5], [0.35, 0.8, 8], [0.68, 0.25, 7.5]];
    let m = '';
    for (const [fx, fy, dur] of spots) {
      const cx = x + w * fx, cy = y + h * fy;
      m += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="2.4" fill="${C.beam}" opacity="0.5">
        <animate attributeName="cy" values="${cy.toFixed(0)};${(cy + 60).toFixed(0)};${cy.toFixed(0)}" dur="${dur}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0.6;0" dur="${dur}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return `<g>${m}</g>`;
  }

  // A collimated shaft of light from (x1,y1) to (x2,y2), half-width w.
  function beamShaft(x1, y1, x2, y2, w, id) {
    return `<g opacity="0.85">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${C.beam}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${C.beam}" stop-opacity="0.12"/>
      </linearGradient></defs>
      <polygon points="${x1 - w},${y1} ${x1 + w},${y1} ${x2 + w * 2},${y2} ${x2 - w * 2},${y2}" fill="url(#${id})"/>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.beam}" stroke-width="3" opacity="0.7"/>
    </g>`;
  }

  /* A stair flight receding into its well.  Depth is taper, pitch
     compression and gloom under the top-down light: 'up' shows shadowed
     riser faces marching away above the threshold, 'down' shows pale
     tread tops sinking behind it, 'pit' descends from a threshold in
     the floor.  The nearest nosings catch a thin line of brass. */
  function stairFlight(x, y, w, h, mode) {
    const n = h >= 400 ? 6 : 4;
    let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.ribDark}"/>`;
    let pitch = (mode === 'up' ? 0.19 : mode === 'pit' ? 0.2 : 0.11) * h;
    let edge = mode === 'pit' ? y : y + h;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const inset = t * w * 0.17;
      const bx = x + inset, bw = w - 2 * inset;
      let by;
      if (mode === 'pit') { by = edge; edge += pitch; }
      else { edge -= pitch; by = edge; }
      out += mode === 'up'
        ? `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.floorDark}"/>
           <rect x="${bx}" y="${by}" width="${bw}" height="4" fill="${C.rib}"/>`
        : `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.rib}"/>
           <rect x="${bx}" y="${mode === 'pit' ? by + pitch - 4 : by}" width="${bw}" height="4" fill="${C.floorDark}"/>`;
      if (i < 2) {
        const ny = mode === 'up' ? by : mode === 'pit' ? by : by + pitch - 2;
        out += `<rect x="${bx}" y="${ny}" width="${bw}" height="2" fill="${C.brassLit}" opacity="${(0.35 - i * 0.15).toFixed(2)}"/>`;
      }
      out += `<rect x="${bx}" y="${by}" width="${bw}" height="${pitch}" fill="${C.ink}" opacity="${(0.55 * t).toFixed(2)}"/>`;
      pitch *= 0.78;
    }
    return out + (mode === 'pit'
      ? `<rect x="${x}" y="${edge}" width="${w}" height="${y + h - edge}" fill="${C.ink}" opacity="0.55"/>`
      : `<rect x="${x}" y="${y}" width="${w}" height="${edge - y}" fill="${C.ink}" opacity="0.55"/>`);
  }

  // The rotating prismatic Star — a caustic figure of light on a wall.
  function caustic(cx, cy, r) {
    let rays = '';
    for (let i = 0; i < 8; i++) {
      const a = i * 45;
      rays += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r}" stroke="${C.caustic}" stroke-width="${i % 2 ? 2 : 4}" opacity="0.8" transform="rotate(${a} ${cx} ${cy})"/>`;
    }
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="${r * 1.3}" fill="${C.caustic}" opacity="0.12"/>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy}; 360 ${cx} ${cy}" dur="40s" repeatCount="indefinite"/>
        ${rays}
      </g>
      <circle cx="${cx}" cy="${cy}" r="7" fill="${C.beam}">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>`;
  }

  // A simple standing figure (the small cast). robe/skin/hair vary.
  function figure(x, y, robe, skin, hair) {
    return `<g>
      <path d="M ${x - 40} ${y} Q ${x - 54} ${y - 130} ${x - 24} ${y - 175} L ${x + 24} ${y - 175} Q ${x + 54} ${y - 130} ${x + 40} ${y} Z" fill="${robe}" stroke="#000" stroke-opacity="0.35" stroke-width="3"/>
      <rect x="${x - 23}" y="${y - 200}" width="46" height="44" rx="9" fill="${robe}"/>
      <circle cx="${x}" cy="${y - 220}" r="26" fill="${skin}"/>
      <path d="M ${x - 26} ${y - 226} Q ${x} ${y - 254} ${x + 26} ${y - 226} L ${x + 26} ${y - 216} Q ${x} ${y - 238} ${x - 26} ${y - 216} Z" fill="${hair}"/>
      <circle cx="${x - 9}" cy="${y - 220}" r="2.6" fill="#241628"/>
      <circle cx="${x + 9}" cy="${y - 220}" r="2.6" fill="#241628"/>
      <line x1="${x - 34}" y1="${y - 150}" x2="${x - 50}" y2="${y - 60}" stroke="${robe}" stroke-width="13" stroke-linecap="round"/>
      <line x1="${x + 34}" y1="${y - 150}" x2="${x + 52}" y2="${y - 74}" stroke="${robe}" stroke-width="13" stroke-linecap="round"/>
    </g>`;
  }

  // The dome roof with its oculus, shared by the top scene.
  function domeRoof(oculusOpen) {
    let ribs = '';
    for (let i = 0; i <= 8; i++) {
      const x = 200 + i * 150;
      ribs += `<path d="M ${x} 60 Q 800 -260 ${x} 60" fill="none"/>`;
    }
    const oc = oculusOpen
      ? `<ellipse cx="800" cy="70" rx="120" ry="40" fill="#0a0a16"/>
         ${stars([[740, 60, 2], [800, 48, 1.6], [860, 66, 2.2], [780, 78, 1.4], [830, 80, 1.7]])}
         <ellipse cx="800" cy="70" rx="120" ry="40" fill="none" stroke="${C.brassLit}" stroke-width="4"/>`
      : `<ellipse cx="800" cy="70" rx="120" ry="40" fill="${C.stone}" stroke="${C.brass}" stroke-width="4"/>
         <line x1="680" y1="70" x2="920" y2="70" stroke="${C.brass}" stroke-width="3"/>`;
    return `<g>
      <path d="M 40 300 Q 800 -140 1560 300 Z" fill="${C.dome}" stroke="${C.ribDark}" stroke-width="6"/>
      <g stroke="${C.rib}" stroke-width="4" fill="none">
        <path d="M 200 300 Q 800 -100 200 300"/>
        <path d="M 800 300 L 800 40"/>
        <path d="M 500 300 Q 640 40 800 40"/>
        <path d="M 1100 300 Q 960 40 800 40"/>
        <path d="M 350 300 Q 560 90 800 60"/>
        <path d="M 1250 300 Q 1040 90 800 60"/>
      </g>
      ${oc}
    </g>`;
  }

  // ---------- scene: the dome / lantern ----------

  function domeLantern(S) {
    const lit = !!S.flags.lit_dome;
    const wound = !!S.flags.oculusWound;
    const shaft = lit
      ? beamShaft(800, 110, 800, 640, 40, 'dlbeam') + motes(720, 120, 160, 520)
      : '';
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dlvig" cx="50%" cy="42%" r="80%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.dome}"/>
      ${domeRoof(wound)}

      <!-- constellation labels ringing the dome interior -->
      <g font-family="Georgia, serif" fill="${C.text}" opacity="0.66" font-size="17" font-style="italic" text-anchor="middle">
        <text x="300" y="360">Vela</text><text x="560" y="330">Eridanus</text>
        <text x="800" y="316">Sagitta</text><text x="1040" y="330">Pavo</text>
        <text x="1300" y="360">Equuleus</text><text x="800" y="384" font-size="14" opacity="0.8">Regulus &mdash; the little king</text>
      </g>
      ${stars([[360, 300, 1.6], [640, 270, 1.4], [980, 276, 1.6], [1240, 300, 1.5]], C.caustic)}

      <rect x="0" y="640" width="1600" height="360" fill="${C.floor}"/>
      <rect x="0" y="634" width="1600" height="10" fill="${C.floorDark}"/>

      <!-- the great objective lens on its mount -->
      <g>
        <rect x="360" y="560" width="60" height="160" rx="8" fill="${C.ribDark}" stroke="#000" stroke-opacity="0.4" stroke-width="3"/>
        <ellipse cx="390" cy="540" rx="76" ry="86" fill="${lit ? '#d9ecff' : C.stone}" stroke="${lit ? C.brassLit : C.brass}" stroke-width="6"/>
        <ellipse cx="390" cy="540" rx="40" ry="52" fill="${lit ? '#f4ecc8' : C.glow}" opacity="${lit ? '0.85' : '0.4'}"/>
        <text x="390" y="742" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the great objective</text>
      </g>

      <!-- the heliostat: a mirror on a geared cradle -->
      <g>
        <rect x="1120" y="600" width="180" height="30" rx="6" fill="${C.ribDark}"/>
        <rect x="1180" y="470" width="26" height="140" fill="${C.ribDark}"/>
        <g transform="rotate(-18 1210 470)">
          <rect x="1150" y="420" width="120" height="90" rx="8" fill="${lit ? '#dfe6ff' : '#5a5578'}" stroke="${C.brass}" stroke-width="5"/>
          <line x1="1160" y1="432" x2="1260" y2="498" stroke="${C.beam}" stroke-width="2" opacity="${lit ? '0.9' : '0.3'}"/>
        </g>
        ${gearGlyph(1210, 610, 30, C.brass, '#5a4d28')}
        ${gearGlyph(1262, 620, 20, C.brass, '#5a4d28')}
        <text x="1210" y="742" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the heliostat</text>
      </g>

      <!-- oculus clockwork with its winding socket -->
      <g>
        <rect x="720" y="500" width="160" height="150" rx="10" fill="${C.wall}" stroke="${C.ribDark}" stroke-width="4"/>
        ${gearGlyph(770, 560, 26, wound ? C.brassLit : C.brass, '#5a4d28')}
        ${gearGlyph(830, 590, 20, wound ? C.brassLit : C.brass, '#5a4d28')}
        ${wound
          ? `<circle cx="835" cy="545" r="12" fill="${C.brassLit}" stroke="#5a4d28" stroke-width="3"/>`
          : `<circle cx="835" cy="545" r="12" fill="${C.ink}" stroke="${C.brass}" stroke-width="3"/>`}
        <text x="800" y="672" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">${wound ? 'the oculus, wound' : 'oculus clockwork &mdash; socket empty'}</text>
      </g>

      ${shaft}

      <!-- stair down to the gallery -->
      <g>
        ${stairFlight(60, 760, 240, 220, 'pit')}
        <text x="180" y="748" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">DOWN TO THE GALLERY</text>
      </g>

      <rect width="1600" height="1000" fill="url(#dlvig)"/>
    </svg>`;
  }

  // ---------- zoom: the heliostat / oculus mechanism ----------

  function heliostatZoom(S) {
    const wound = !!S.flags.oculusWound;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hzvig" cx="50%" cy="45%" r="75%">
          <stop offset="56%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.wall}"/>
      <rect x="180" y="90" width="840" height="620" rx="16" fill="${C.dome}" stroke="${C.ribDark}" stroke-width="6"/>
      <text x="600" y="156" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="${C.brassLit}" letter-spacing="2">THE HELIOSTAT</text>
      <text x="600" y="186" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">one mirror, and the patience to aim it &mdash; H.V.</text>

      <g transform="rotate(-14 600 400)">
        <rect x="470" y="300" width="260" height="180" rx="10" fill="#dfe6ff" stroke="${C.brass}" stroke-width="6"/>
        <line x1="486" y1="320" x2="714" y2="460" stroke="${C.beam}" stroke-width="3">
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="5s" repeatCount="indefinite"/>
        </line>
      </g>
      <!-- the clockwork turns whether anyone watches or not -->
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 600 560; 360 600 560" dur="60s" repeatCount="indefinite"/>
        ${gearGlyph(600, 560, 48, C.brass, '#5a4d28')}
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="360 690 580; 0 690 580" dur="90s" repeatCount="indefinite"/>
        ${gearGlyph(690, 580, 32, C.brass, '#5a4d28')}
      </g>
      ${wound
        ? `<circle cx="820" cy="520" r="20" fill="${C.brassLit}" stroke="#5a4d28" stroke-width="4"/><text x="820" y="576" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">wound &amp; willing</text>`
        : `<circle cx="820" cy="520" r="20" fill="${C.ink}" stroke="${C.brass}" stroke-width="4"/><text x="820" y="576" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">winding socket, empty</text>`}
      <rect width="1200" height="800" fill="url(#hzvig)"/>
    </svg>`;
  }

  // ---------- scene: the instrument gallery ----------

  function gallery(S) {
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glvig" cx="50%" cy="45%" r="80%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.wall}"/>
      <rect x="0" y="0" width="1600" height="180" fill="${C.dome}"/>
      ${stars([[180, 90, 1.6], [520, 70, 1.4], [900, 100, 1.7], [1300, 80, 1.5], [1460, 130, 1.4]], C.caustic)}
      <circle cx="700" cy="60" r="1.5" fill="${C.caustic}">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1120" cy="120" r="1.5" fill="${C.caustic}">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="6s" repeatCount="indefinite"/>
      </circle>
      <rect x="0" y="720" width="1600" height="280" fill="${C.floor}"/>
      <rect x="0" y="714" width="1600" height="10" fill="${C.floorDark}"/>

      <!-- stair up (left) and stair down (right) -->
      <g>
        ${stairFlight(40, 300, 170, 420, 'up')}
        <text x="125" y="286" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">UP TO THE DOME</text>
      </g>
      <g>
        ${stairFlight(1390, 300, 170, 420, 'down')}
        <text x="1475" y="286" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">DOWN TO THE WORKSHOP</text>
      </g>

      <!-- the great telescope, starlight idling in its objective -->
      <g opacity="0.55">${motes(660, 260, 280, 320)}</g>
      <g transform="rotate(-24 820 520)">
        <rect x="700" y="470" width="360" height="70" rx="30" fill="${C.stone}" stroke="${C.brass}" stroke-width="5"/>
        <ellipse cx="700" cy="505" rx="18" ry="35" fill="${C.glow}" stroke="${C.brass}" stroke-width="4">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="7s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="1060" cy="505" rx="14" ry="28" fill="${C.ink}" stroke="${C.brass}" stroke-width="4"/>
      </g>
      <rect x="800" y="560" width="30" height="150" fill="${C.ribDark}"/>
      <path d="M 760 710 L 870 710 L 900 740 L 730 740 Z" fill="${C.ribDark}"/>

      <!-- the logbook on a reading stand -->
      <g>
        <rect x="360" y="600" width="30" height="120" fill="${C.ribDark}"/>
        <g transform="rotate(-12 375 560)">
          <rect x="300" y="520" width="150" height="90" rx="6" fill="#e8dfc4" stroke="${C.brass}" stroke-width="4"/>
          <line x1="375" y1="520" x2="375" y2="610" stroke="${C.brass}" stroke-width="2"/>
          <g stroke="#8a7a5e" stroke-width="2"><line x1="312" y1="544" x2="366" y2="544"/><line x1="312" y1="566" x2="366" y2="566"/><line x1="384" y1="544" x2="438" y2="544"/><line x1="384" y1="566" x2="438" y2="566"/></g>
        </g>
        <text x="375" y="742" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the observing log</text>
      </g>

      <!-- the framed cipher note -->
      <g>
        ${paperSheet(600, 470, 120, 150, 3, '#5a4d8a')}
        <text x="660" y="642" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a note in star-signs</text>
      </g>

      <!-- the spectroscope -->
      ${S.flags.spectroTaken ? '' : `<g>
        <rect x="1050" y="640" width="120" height="24" rx="6" fill="${C.ribDark}"/>
        <rect x="1080" y="590" width="60" height="52" rx="6" fill="${C.stone}" stroke="${C.brass}" stroke-width="4"/>
        <path d="M 1140 604 l 40 -10 l 0 34 l -40 -10 Z" fill="${C.caustic}" opacity="0.7"/>
        <text x="1110" y="686" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="${C.text}" font-style="italic">spectroscope</text>
      </g>`}

      <!-- the oculus winder on the bench -->
      ${S.flags.winderTaken ? '' : `<g>
        <circle cx="1240" cy="640" r="20" fill="none" stroke="${C.brassLit}" stroke-width="7"/>
        <line x1="1240" y1="660" x2="1240" y2="700" stroke="${C.brassLit}" stroke-width="8" stroke-linecap="round"/>
        <rect x="1228" y="696" width="24" height="14" rx="4" fill="${C.brass}"/>
      </g>`}

      <!-- Ottoline Vaux -->
      ${figure(300, 720, '#4a3a66', '#e6c6a6', '#3a2740')}
      <text x="300" y="760" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Miss Ottoline Vaux</text>

      <rect width="1600" height="1000" fill="url(#glvig)"/>
    </svg>`;
  }

  // ---------- zoom: the observing log ----------

  function logbookZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lzvig" cx="50%" cy="45%" r="75%">
          <stop offset="56%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.stone}"/>
      <rect x="120" y="90" width="960" height="620" rx="10" fill="#e8dfc4" stroke="${C.brass}" stroke-width="6"/>
      <line x1="600" y1="110" x2="600" y2="690" stroke="#c9b89a" stroke-width="3"/>
      <text x="360" y="150" text-anchor="middle" font-size="20" font-family="Georgia, serif" fill="#3a2f22" letter-spacing="1">THE OBSERVING LOG</text>
      <text x="360" y="182" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#5f4718" font-style="italic">the Star, hour by hour</text>

      <!-- left page: the nightly drift, a caustic walking across the wall -->
      <g fill="#5a4d8a">
        ${[[220, 300], [300, 330], [380, 300], [460, 344], [540, 316]].map(([x, y], i) =>
          `<circle cx="${x}" cy="${y}" r="8"/><text x="${x}" y="${y + 34}" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#5f4718">${9 + i}pm</text>`).join('')}
      </g>
      <path d="M 220 300 L 300 330 L 380 300 L 460 344 L 540 316" fill="none" stroke="#8a5a9a" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="360" y="430" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#3a2f22" font-style="italic">it never holds still &mdash; it walks with the sky</text>
      <text x="360" y="620" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#3a2f22">Vela, Sagitta, Pavo, Regulus, Vega, Equuleus</text>

      <!-- right page: the theft-night sketch, pinned in one place -->
      <text x="840" y="230" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#7a2f2f" font-style="italic">14th, the sealed night:</text>
      <circle cx="840" cy="360" r="10" fill="#7a2f2f"/>
      <circle cx="840" cy="360" r="26" fill="none" stroke="#7a2f2f" stroke-width="2" stroke-dasharray="3 4"/>
      <text x="840" y="430" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#3a2f22" font-style="italic">fixed. it did not move all night.</text>
      <rect width="1200" height="800" fill="url(#lzvig)"/>
    </svg>`;
  }

  // ---------- scene: the optician's workshop ----------

  function workshop(S) {
    const lit = !!S.flags.lit_workshop;
    const shaft = lit ? beamShaft(1470, 300, 1180, 620, 30, 'wsbeam') + motes(1180, 340, 300, 260) : '';
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ch4wsvig" cx="48%" cy="45%" r="80%">
          <stop offset="48%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.wall}"/>
      <rect x="0" y="720" width="1600" height="280" fill="${C.floor}"/>
      <rect x="0" y="714" width="1600" height="10" fill="${C.floorDark}"/>

      <!-- stair up and stair down -->
      <g>
        ${stairFlight(40, 300, 170, 420, 'up')}
        <text x="125" y="286" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">UP TO THE GALLERY</text>
      </g>
      <g>
        ${stairFlight(1390, 740, 180, 240, 'pit')}
        <text x="1480" y="728" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">DOWN TO THE VAULT</text>
      </g>

      <!-- the lens-grinding lathe -->
      <g>
        <rect x="560" y="560" width="240" height="30" rx="6" fill="${C.ribDark}"/>
        <circle cx="620" cy="540" r="40" fill="${C.stone}" stroke="${C.brass}" stroke-width="5"/>
        <circle cx="620" cy="540" r="16" fill="${C.brass}"/>
        <rect x="700" y="524" width="80" height="16" rx="6" fill="${C.brass}"/>
      </g>

      <!-- the cluttered bench (the hidden-object hunt lives here) -->
      <g>
        <rect x="380" y="620" width="820" height="30" rx="6" fill="#3a2f4e" stroke="${C.floorDark}" stroke-width="4"/>
        <rect x="420" y="590" width="70" height="30" rx="4" fill="${C.stone}"/>
        <ellipse cx="560" cy="606" rx="34" ry="14" fill="${C.glow}"/>
        <rect x="640" y="584" width="50" height="36" rx="4" fill="${C.ribDark}"/>
        <circle cx="760" cy="600" r="20" fill="${C.stone}" stroke="${C.brass}" stroke-width="3"/>
        <rect x="840" y="590" width="60" height="30" rx="4" fill="${C.ribDark}"/>
        <path d="M 960 620 l 30 -30 l 20 20 l -30 30 Z" fill="${C.stone}"/>
        <rect x="1060" y="586" width="90" height="34" rx="4" fill="${C.stone}"/>
        <text x="790" y="690" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the optician&rsquo;s bench &mdash; a magpie&rsquo;s nest of glass</text>
      </g>

      <!-- the under-bench recess: dark, unless the beam is on it -->
      <g>
        <rect x="1180" y="640" width="260" height="150" rx="8" fill="${C.ink}" stroke="${C.floorDark}" stroke-width="4"/>
        ${lit
          ? `<rect x="1200" y="660" width="220" height="110" fill="${C.glow}" opacity="0.5"/>
             ${S.flags.saleTaken ? '' : paperSheet(1250, 668, 110, 90, -4, '#5a4d8a')}
             <text x="1310" y="812" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">something pale, tucked well back</text>`
          : `<text x="1310" y="812" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a recess, black as a coal-hole</text>`}
      </g>

      ${shaft}

      <!-- Silvan Roke -->
      ${figure(1250, 560, '#2f3a4a', '#dcc0a2', '#6a6156')}
      <text x="1250" y="600" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Silvan Roke, optician</text>

      <rect width="1600" height="1000" fill="url(#ch4wsvig)"/>
    </svg>`;
  }

  // ---------- scene: the vault ----------

  function vault(S) {
    const lit = !!S.flags.lit_vault;
    const shaft = lit ? beamShaft(1400, 300, 1180, 560, 28, 'vtbeam') + motes(1180, 320, 240, 240) : '';
    const starWall = lit ? caustic(360, 470, 90) : '';
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vtvig" cx="46%" cy="45%" r="82%">
          <stop offset="46%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="${C.stone}"/>
      <g stroke="${C.floorDark}" stroke-width="3" opacity="0.5">
        <line x1="0" y1="240" x2="1600" y2="240"/><line x1="0" y1="480" x2="1600" y2="480"/>
        <line x1="400" y1="0" x2="400" y2="720"/><line x1="800" y1="0" x2="800" y2="720"/><line x1="1200" y1="0" x2="1200" y2="720"/>
      </g>
      <rect x="0" y="720" width="1600" height="280" fill="${C.floor}"/>
      <rect x="0" y="714" width="1600" height="10" fill="${C.floorDark}"/>

      <!-- the north wall (left) where the Star is cast -->
      <g>
        <rect x="120" y="300" width="480" height="360" rx="6" fill="${C.wall}" stroke="${C.floorDark}" stroke-width="4"/>
        ${starWall}
        <text x="360" y="700" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the north wall</text>
      </g>

      <!-- the cornice above the wall: rig hides here, seen only when lit -->
      <g>
        <rect x="120" y="270" width="480" height="34" fill="${C.ribDark}"/>
        ${lit ? `
          <rect x="470" y="240" width="110" height="60" rx="6" fill="${C.dome}" stroke="${C.brassLit}" stroke-width="3"/>
          <path d="M 500 270 l 40 -6 l 0 28 l -40 -6 Z" fill="${C.caustic}" opacity="0.8"/>
          <circle cx="500" cy="270" r="10" fill="${C.beam}" opacity="0.9"/>
        ` : ''}
      </g>

      <!-- the pedestal, bare -->
      <g>
        <rect x="720" y="520" width="140" height="180" rx="6" fill="${C.wall}" stroke="${C.floorDark}" stroke-width="4"/>
        <ellipse cx="790" cy="520" rx="70" ry="16" fill="${C.ribDark}"/>
        <ellipse cx="790" cy="516" rx="40" ry="8" fill="none" stroke="${C.brass}" stroke-width="2" stroke-dasharray="6 5"/>
        <text x="790" y="726" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">THE VESPER &mdash; its empty pedestal</text>
      </g>

      <!-- the barred window -->
      <g>
        <rect x="1000" y="330" width="150" height="220" rx="6" fill="${C.dome}" stroke="${C.floorDark}" stroke-width="4"/>
        ${stars([[1040, 380, 1.6], [1100, 420, 1.4], [1070, 470, 1.5]], C.caustic)}
        <g stroke="${C.brass}" stroke-width="6"><line x1="1000" y1="400" x2="1150" y2="400"/><line x1="1000" y1="470" x2="1150" y2="470"/><line x1="1050" y1="330" x2="1050" y2="550"/><line x1="1100" y1="330" x2="1100" y2="550"/></g>
      </g>

      <!-- the sealed iron door with broken wax seal -->
      <g>
        <rect x="1250" y="360" width="150" height="300" rx="6" fill="${C.ribDark}" stroke="${C.floorDark}" stroke-width="5"/>
        <circle cx="1360" cy="510" r="10" fill="${C.brass}"/>
        <circle cx="1325" cy="470" r="16" fill="#7a2f3a" stroke="#4a1c24" stroke-width="3"/>
        <path d="M 1317 470 l 16 0" stroke="#4a1c24" stroke-width="2"/>
        <text x="1325" y="700" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}" font-style="italic">the vault door &mdash; seal broken at dawn</text>
      </g>

      <!-- stair up -->
      <g>
        ${stairFlight(120, 770, 180, 210, 'up')}
        <text x="210" y="758" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" letter-spacing="1">UP TO THE WORKSHOP</text>
      </g>

      ${shaft}

      <!-- Crell, the watchman -->
      ${figure(600, 940, '#3a3428', '#d8bfa0', '#4a4030')}
      <text x="600" y="978" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${C.text}">Crell, the night watchman</text>

      <rect width="1600" height="1000" fill="url(#vtvig)"/>
    </svg>`;
  }

  // ---------- zoom: the cornice rig ----------

  function corniceZoom(S) {
    const traced = !!S.flags.sourceTraced;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ch4czvig" cx="50%" cy="45%" r="75%">
          <stop offset="56%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${C.dome}"/>
      <rect x="80" y="120" width="1040" height="120" fill="${C.ribDark}"/>
      <text x="600" y="96" text-anchor="middle" font-size="18" font-family="Georgia, serif" fill="${C.brassLit}" letter-spacing="1">INSIDE THE CORNICE</text>

      <!-- the boxed reservoir lamp -->
      <g>
        <rect x="300" y="300" width="200" height="150" rx="10" fill="${C.wall}" stroke="${C.brass}" stroke-width="5"/>
        ${bottleGlyph(400, 420, 70, 120, '#c9a544', '#5a4d28')}
        <circle cx="510" cy="376" r="26" fill="${C.beam}">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.4s" repeatCount="indefinite"/>
        </circle>
        <text x="400" y="500" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a reservoir lamp, timed to the shutter</text>
      </g>

      <!-- the master prism and mirror train -->
      <g>
        <path d="M 640 340 l 70 -20 l 0 90 l -70 -20 Z" fill="${C.caustic}" opacity="0.85" stroke="${C.brass}" stroke-width="3"/>
        <line x1="510" y1="376" x2="640" y2="376" stroke="${C.beam}" stroke-width="3" opacity="0.8"/>
        <line x1="710" y1="376" x2="880" y2="420" stroke="${C.caustic}" stroke-width="3">
          <animate attributeName="opacity" values="0.6;0.85;0.6" dur="5.5s" repeatCount="indefinite"/>
        </line>
        ${[[820, 400], [900, 440], [980, 470]].map(([x, y]) => `<rect x="${x}" y="${y}" width="34" height="10" rx="3" fill="#dfe6ff" stroke="${C.brass}" stroke-width="2" transform="rotate(-30 ${x + 17} ${y + 5})"/>`).join('')}
        <text x="760" y="560" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${C.text}" font-style="italic">a bevelled prism, and a train of little mirrors</text>
      </g>

      ${traced ? `<text x="600" y="660" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${C.brassLit}" font-style="italic">the Star was born here &mdash; never on the pedestal</text>` : ''}
      <rect width="1200" height="800" fill="url(#ch4czvig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const icons = {
    oculusWinder: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="18" r="11" fill="none" stroke="#c9a544" stroke-width="6"/>
      <line x1="32" y1="29" x2="32" y2="48" stroke="#c9a544" stroke-width="7" stroke-linecap="round"/>
      <rect x="24" y="46" width="16" height="10" rx="3" fill="#8a6a30"/>
    </svg>`,
    handMirror: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="16" fill="#dfe6ff" stroke="#8a7a4a" stroke-width="4"/>
      <ellipse cx="27" cy="19" rx="5" ry="8" fill="#ffffff" opacity="0.7"/>
      <rect x="28" y="40" width="8" height="18" rx="4" fill="#8a7a4a"/>
    </svg>`,
    groundLens: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#bcd8ff" stroke="#8a7a4a" stroke-width="4" opacity="0.85"/>
      <ellipse cx="26" cy="26" rx="4" ry="7" fill="#ffffff" opacity="0.7"/>
    </svg>`,
    tracingScope: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="26" width="34" height="14" rx="7" fill="#2a2442" stroke="#8a7a4a" stroke-width="3" transform="rotate(-18 29 33)"/>
      <circle cx="48" cy="22" r="10" fill="#dfeeff" stroke="#8a7a4a" stroke-width="3"/>
      <ellipse cx="16" cy="41" rx="6" ry="9" fill="#bcd8ff" stroke="#8a7a4a" stroke-width="2" transform="rotate(-18 16 41)"/>
    </svg>`,
    masterPrism: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14 L44 22 L44 46 L20 54 Z" fill="#cdb8ff" stroke="#8a7a4a" stroke-width="3"/>
      <line x1="8" y1="34" x2="20" y2="34" stroke="#f6efce" stroke-width="3"/>
      <line x1="44" y1="30" x2="58" y2="20" stroke="#cdb8ff" stroke-width="3"/>
      <line x1="44" y1="38" x2="58" y2="42" stroke="#a8d8ff" stroke-width="3"/>
    </svg>`,
    pasteReplica: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 12 L46 26 L32 54 L18 26 Z" fill="#e8f0ff" stroke="#8a7a4a" stroke-width="3"/>
      <path d="M18 26 L46 26 M32 12 L32 54" stroke="#b8c8e0" stroke-width="2"/>
    </svg>`,
    spectroCard: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="32" rx="4" fill="#1a1730" stroke="#8a7a4a" stroke-width="3"/>
      <rect x="16" y="24" width="32" height="16" fill="#3a3560"/>
      <rect x="16" y="24" width="6" height="16" fill="#e05a5a"/><rect x="22" y="24" width="6" height="16" fill="#e0c05a"/>
      <rect x="28" y="24" width="6" height="16" fill="#5ae07a"/><rect x="34" y="24" width="6" height="16" fill="#5a9ae0"/>
      <rect x="40" y="24" width="6" height="16" fill="#8a5ae0"/>
    </svg>`,
    saleLetter: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="3" fill="#efe6cf" stroke="#8a7a4a" stroke-width="3"/>
      <path d="M12 14 L32 34 L52 14" fill="none" stroke="#8a7a4a" stroke-width="3"/>
      <circle cx="44" cy="44" r="7" fill="#7a2f3a" stroke="#4a1c24" stroke-width="2"/>
    </svg>`,
  };

  return {
    domeLantern, heliostatZoom, gallery, logbookZoom,
    workshop, vault, corniceZoom, icons,
  };
})();
