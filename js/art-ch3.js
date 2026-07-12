/* Art for Chapter Three — "The Botanist's Bequest".
   Namespaced under Art.ch3. Scenes 1600x1000, zooms 1200x800.

   Every scene painter branches on S.flags.night: shared geometry,
   swapped palette. Day is dappled sun through glass; night is the
   nocturne mechanism — indigo, moonlight, phosphor lamps.
   Signature motion: butterflies by day, moths and fireflies by
   night, and Gladstone's very occasional blink. */

Art.ch3 = (() => {
  const { potGlyph, leafSpray, paperSheet, stars } = Art;

  const DAY = {
    sky: '#cfe4f0', glass: '#e9f2ee', rib: '#b9c4c9', ribDark: '#8a9aa0',
    floor: '#9c6a4a', floorDark: '#6e4a34', leaf: '#4e7a3a', leafLight: '#6da24f',
    leafPale: '#8fae5c', bench: '#7a5a3d', glow: '#fff6d8',
  };
  const NIGHT = {
    sky: '#1c2440', glass: '#232c44', rib: '#3a4560', ribDark: '#2a3450',
    floor: '#4a3630', floorDark: '#32241e', leaf: '#2e4a34', leafLight: '#3a5a40',
    leafPale: '#46684a', bench: '#4a3a2c', glow: '#9fffcf',
  };
  const pal = S => (S.flags.night ? NIGHT : DAY);

  // Two butterflies drifting along a lazy path (day only).
  function butterflies(x, y) {
    const wing = (dx, c) => `
      <g transform="translate(${dx} 0)">
        <ellipse cx="-7" cy="0" rx="8" ry="5" fill="${c}">
          <animate attributeName="ry" values="5;1.5;5" dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="7" cy="0" rx="8" ry="5" fill="${c}">
          <animate attributeName="ry" values="5;1.5;5" dur="0.5s" repeatCount="indefinite"/>
        </ellipse>
      </g>`;
    return `
      <g transform="translate(${x} ${y})" opacity="0.9">
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="0 0; 90 -50; 210 10; 330 -70; 420 -10; 330 -70; 210 10; 90 -50; 0 0" dur="26s" repeatCount="indefinite"/>
          ${wing(0, '#e8b64c')}
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="60 40; -40 -30; 120 -90; 300 -30; 460 -80; 300 -30; 120 -90; -40 -30; 60 40" dur="34s" repeatCount="indefinite"/>
          ${wing(0, '#c9dff0')}
        </g>
      </g>`;
  }

  // Moths circling a phosphor lamp + a few fireflies (night only).
  function nightLife(x, y) {
    let flies = '';
    const spots = [[x - 260, y + 140, 3.1], [x + 180, y + 200, 4.3], [x - 60, y + 260, 3.7]];
    for (const [fx, fy, dur] of spots) {
      flies += `<circle cx="${fx}" cy="${fy}" r="3" fill="#d8ffb0">
        <animate attributeName="opacity" values="0;0.9;0;0" dur="${dur}s" repeatCount="indefinite"/>
      </circle>`;
    }
    return `
      <g>
        <g transform="translate(${x} ${y})">
          <g>
            <animateTransform attributeName="transform" type="rotate" values="0; 360" dur="7s" repeatCount="indefinite"/>
            <ellipse cx="46" cy="0" rx="7" ry="4" fill="#cfd8c0" opacity="0.85"/>
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="140; 500" dur="9s" repeatCount="indefinite"/>
            <ellipse cx="60" cy="0" rx="6" ry="3.5" fill="#bcc8ae" opacity="0.7"/>
          </g>
        </g>
        ${flies}
      </g>`;
  }

  // Gladstone the tortoise, asleep on/near the dull pot. Blinks, slowly.
  function gladstone(x, y, moved) {
    const gx = moved ? x + 190 : x;
    const gy = moved ? y + 26 : y;
    return `
      <g transform="translate(${gx} ${gy})">
        <ellipse cx="0" cy="20" rx="64" ry="14" fill="#000" opacity="0.18"/>
        <path d="M -58 12 A 58 44 0 0 1 58 12 Z" fill="#5a6a3f" stroke="#39442a" stroke-width="4"/>
        <path d="M -34 -22 q 34 -18 68 0 M -48 -4 q 48 -22 96 0" fill="none" stroke="#39442a" stroke-width="3"/>
        <ellipse cx="70" cy="6" rx="18" ry="13" fill="#8a9455" stroke="#39442a" stroke-width="3"/>
        <circle cx="76" cy="2" r="2.6" fill="#241608"/>
        <rect x="70" y="-2" width="13" height="8" rx="4" fill="#8a9455" opacity="0">
          <animate attributeName="opacity" values="0;0;0;1;0;0" dur="7s" repeatCount="indefinite"/>
        </rect>
        <rect x="-46" y="10" width="16" height="12" rx="5" fill="#8a9455" stroke="#39442a" stroke-width="2.5"/>
        <rect x="26" y="10" width="16" height="12" rx="5" fill="#8a9455" stroke="#39442a" stroke-width="2.5"/>
        ${moved ? `<ellipse cx="96" cy="14" rx="12" ry="7" fill="#8fce6a" stroke="#4e7a3a" stroke-width="2"/>` : ''}
      </g>`;
  }

  // Glass roof: arched ribs over a sky, with moon/dapple by state.
  function glassRoof(P, night) {
    let ribs = '';
    for (let x = 0; x <= 1600; x += 160) {
      ribs += `<path d="M ${x} 420 Q ${x + 80} 60 ${x + 160} 420" fill="none" stroke="${P.rib}" stroke-width="7"/>`;
    }
    const skyBits = night
      ? `${stars([[220, 120, 2], [480, 80, 1.6], [760, 130, 2.2], [1040, 70, 1.5], [1320, 120, 2], [1480, 200, 1.4]])}
         <circle cx="1180" cy="140" r="52" fill="#e9e2c8"/>
         <circle cx="1158" cy="130" r="46" fill="${P.sky}" opacity="0.85"/>`
      : `<circle cx="1200" cy="150" r="64" fill="#fff6d8" opacity="0.9"/>
         <ellipse cx="420" cy="120" rx="130" ry="34" fill="#ffffff" opacity="0.7"/>
         <ellipse cx="900" cy="90" rx="100" ry="26" fill="#ffffff" opacity="0.55"/>`;
    const dapple = night ? '' : `
      <g fill="#fff6d8">
        <ellipse cx="500" cy="760" rx="180" ry="40" opacity="0.14">
          <animate attributeName="opacity" values="0.09;0.17;0.09" dur="8s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="1050" cy="820" rx="220" ry="46" opacity="0.12">
          <animate attributeName="opacity" values="0.14;0.07;0.14" dur="11s" repeatCount="indefinite"/>
        </ellipse>
      </g>`;
    return `
      <rect width="1600" height="420" fill="${P.sky}"/>
      ${skyBits}
      <rect width="1600" height="420" fill="${P.glass}" opacity="0.35"/>
      ${ribs}
      <line x1="0" y1="420" x2="1600" y2="420" stroke="${P.ribDark}" stroke-width="10"/>
      ${dapple}`;
  }

  // ---------- scene: the great glasshouse (hub) ----------

  function glasshouse(S) {
    const P = pal(S);
    const night = !!S.flags.night;

    // the dull pot — and, when the chapter ends, the Empress in bloom
    const empress = S.flags.bloomed ? `
      <g>
        <path d="M 700 560 Q 692 470 706 420" fill="none" stroke="#4e7a3a" stroke-width="6"/>
        <g>
          <ellipse cx="706" cy="404" rx="34" ry="18" fill="#e8dff5" transform="rotate(-24 706 404)"/>
          <ellipse cx="706" cy="404" rx="34" ry="18" fill="#e8dff5" transform="rotate(24 706 404)"/>
          <ellipse cx="706" cy="392" rx="16" ry="26" fill="#d8c8f0"/>
          <circle cx="706" cy="404" r="9" fill="#9fffcf">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        <ellipse cx="706" cy="420" rx="60" ry="80" fill="#9fffcf" opacity="0.18">
          <animate attributeName="opacity" values="0.12;0.24;0.12" dur="3.4s" repeatCount="indefinite"/>
        </ellipse>
      </g>` : '';
    const dullPlant = S.flags.bloomed ? empress : `
      ${leafSpray(700, 560, 60, night ? '#3a5040' : '#5c7a4a', 5)}`;

    const clockFaceArt = `
      <g>
        <rect x="1180" y="470" width="190" height="240" rx="10" fill="#6b5a2e" stroke="#41371c" stroke-width="4"/>
        <circle cx="1275" cy="545" r="56" fill="#efe6cf" stroke="#8a6a30" stroke-width="4"/>
        ${night
          ? '<path d="M 1291 545 a 26 26 0 1 1 -14 -24 a 20 20 0 1 0 14 24 Z" fill="#3a4560"/>'
          : '<circle cx="1275" cy="545" r="20" fill="#e8b64c"/>'}
        <rect x="1252" y="626" width="46" height="54" rx="6" fill="#41371c"/>
        <rect x="1266" y="612" width="18" height="22" fill="#c9a544" stroke="#8a6a30" stroke-width="2"/>
      </g>`;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ghvig" cx="50%" cy="45%" r="80%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="${night ? '0.5' : '0.3'}"/>
        </radialGradient>
      </defs>

      ${glassRoof(P, night)}
      <rect x="0" y="420" width="1600" height="380" fill="${P.glass}"/>
      <g stroke="${P.rib}" stroke-width="6">
        <line x1="200" y1="420" x2="200" y2="800"/><line x1="520" y1="420" x2="520" y2="800"/>
        <line x1="840" y1="420" x2="840" y2="800"/><line x1="1160" y1="420" x2="1160" y2="800"/>
        <line x1="1480" y1="420" x2="1480" y2="800"/>
      </g>
      <rect x="0" y="800" width="1600" height="200" fill="${P.floor}"/>
      <rect x="0" y="794" width="1600" height="10" fill="${P.floorDark}"/>

      ${night ? `
      <g>
        <line x1="420" y1="420" x2="420" y2="470" stroke="#2a3450" stroke-width="5"/>
        <circle cx="420" cy="490" r="20" fill="#9fffcf" opacity="0.8">
          <animate attributeName="opacity" values="0.65;0.9;0.65" dur="4s" repeatCount="indefinite"/>
        </circle>
        <ellipse cx="420" cy="520" rx="130" ry="90" fill="#9fffcf" opacity="0.08"/>
      </g>
      ${nightLife(420, 490)}
      ` : butterflies(500, 560)}

      <!-- doors: potting shed (W), garden door to maze (centre), orchid wing (E), office (SE) -->
      <g>
        <rect x="40" y="480" width="150" height="300" fill="${P.ribDark}"/>
        <rect x="52" y="492" width="126" height="288" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <circle cx="166" cy="630" r="7" fill="#c9a544"/>
        <text x="115" y="466" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${night ? '#8a97b8' : '#6e6151'}" letter-spacing="1">POTTING SHED</text>
      </g>
      <g>
        <rect x="740" y="452" width="170" height="230" fill="${P.ribDark}"/>
        <rect x="752" y="464" width="146" height="218" fill="${night ? '#141c30' : '#bcd8a8'}" stroke="${P.ribDark}" stroke-width="3"/>
        <path d="M 762 682 q 30 -60 40 -120 M 898 682 q -30 -60 -40 -120" fill="none" stroke="${P.leaf}" stroke-width="8"/>
        <text x="825" y="440" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${night ? '#8a97b8' : '#6e6151'}" letter-spacing="1">THE HEDGE MAZE</text>
      </g>
      <g>
        ${S.flags.ivyCut ? `
        <rect x="1408" y="480" width="150" height="300" fill="${P.ribDark}"/>
        <rect x="1420" y="492" width="126" height="288" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <circle cx="1434" cy="630" r="7" fill="#c9a544"/>
        <path d="M 1408 480 q 20 40 8 90 M 1558 480 q -18 36 -8 80" fill="none" stroke="${P.leaf}" stroke-width="7"/>
        ` : `
        <rect x="1408" y="480" width="150" height="300" fill="${P.ribDark}"/>
        <rect x="1420" y="492" width="126" height="288" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <g stroke="${P.leafLight}" stroke-width="9" fill="none">
          <path d="M 1420 780 Q 1400 640 1450 540 Q 1500 470 1470 492"/>
          <path d="M 1546 780 Q 1566 660 1500 560 Q 1450 500 1490 492"/>
          <path d="M 1436 780 Q 1480 680 1452 588"/>
        </g>
        <g fill="${P.leaf}">
          <ellipse cx="1448" cy="620" rx="14" ry="8" transform="rotate(40 1448 620)"/>
          <ellipse cx="1502" cy="560" rx="13" ry="8" transform="rotate(-30 1502 560)"/>
          <ellipse cx="1462" cy="700" rx="15" ry="9" transform="rotate(15 1462 700)"/>
        </g>
        `}
        <text x="1483" y="466" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${night ? '#8a97b8' : '#6e6151'}" letter-spacing="1">ORCHID WING</text>
      </g>
      <g>
        <rect x="1120" y="720" width="120" height="80" fill="${P.ribDark}"/>
        <rect x="1128" y="728" width="104" height="72" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <text x="1180" y="712" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="${night ? '#8a97b8' : '#6e6151'}" letter-spacing="1">GARDEN OFFICE</text>
      </g>

      <!-- palm bed with the dull pot and Gladstone -->
      <g>
        <ellipse cx="640" cy="812" rx="330" ry="70" fill="${night ? '#26301f' : '#3f5533'}" stroke="${P.floorDark}" stroke-width="5"/>
        ${leafSpray(480, 780, 130, P.leaf, 6)}
        ${leafSpray(560, 800, 100, P.leafLight, 5)}
        ${leafSpray(810, 790, 120, P.leaf, 6)}
        ${potGlyph(700, 620, 90, '#8a6a52')}
        ${dullPlant}
        ${gladstone(700, 640, !!S.flags.gladstoneMoved)}
      </g>

      <!-- cistern -->
      <g>
        <ellipse cx="1050" cy="850" rx="86" ry="20" fill="#41551e" opacity="0.6"/>
        <path d="M 970 850 L 978 760 L 1122 760 L 1130 850 Z" fill="#6e7a80" stroke="#3f4a50" stroke-width="4"/>
        <ellipse cx="1050" cy="760" rx="72" ry="16" fill="${night ? '#22304a' : '#8fb4c9'}" stroke="#3f4a50" stroke-width="3"/>
      </g>

      <!-- the bloom clock -->
      ${clockFaceArt}

      <!-- Hoskins -->
      <g>
        <rect x="272" y="700" width="18" height="120" fill="#5a4a35"/>
        <path d="M 300 700 Q 282 590 312 545 L 368 545 Q 396 590 380 700 Z" fill="#4a5568" stroke="#333c4c" stroke-width="3"/>
        <rect x="318" y="520" width="46" height="44" rx="8" fill="#4a5568"/>
        <circle cx="340" cy="500" r="26" fill="#d8a380"/>
        <path d="M 314 494 Q 340 470 366 494 L 372 486 Q 340 458 308 486 Z" fill="#6e5a3f" stroke="#4a3b28" stroke-width="2"/>
        <rect x="306" y="486" width="68" height="9" rx="4" fill="#6e5a3f"/>
        <path d="M 326 512 q 14 10 28 0" fill="none" stroke="#8a5a3e" stroke-width="3"/>
        <circle cx="331" cy="500" r="2.6" fill="#3a2f22"/><circle cx="349" cy="500" r="2.6" fill="#3a2f22"/>
        <line x1="304" y1="580" x2="281" y2="700" stroke="#4a5568" stroke-width="13" stroke-linecap="round"/>
        <line x1="376" y1="580" x2="392" y2="660" stroke="#4a5568" stroke-width="13" stroke-linecap="round"/>
      </g>

      <rect width="1600" height="1000" fill="url(#ghvig)"/>
    </svg>`;
  }

  // ---------- zoom: the bloom clock ----------

  function bloomClockZoom(S) {
    const night = !!S.flags.night;
    const fixed = !!S.flags.clockFixed;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bcvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${night ? '#232c44' : '#dce8dc'}"/>
      <rect x="240" y="90" width="720" height="620" rx="16" fill="#6b5a2e" stroke="#41371c" stroke-width="6"/>
      <rect x="270" y="120" width="660" height="560" rx="10" fill="#7a6836" stroke="#41371c" stroke-width="3"/>
      <text x="600" y="176" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="#41300f" letter-spacing="2">THE NOCTURNE MECHANISM</text>
      <text x="600" y="204" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#5f4718" font-style="italic">for the persuasion of night-blooming stock &mdash; D.C.</text>

      <circle cx="600" cy="400" r="150" fill="#efe6cf" stroke="#8a6a30" stroke-width="6"/>
      <g ${night ? 'transform="rotate(180 600 400)"' : ''}>
        <circle cx="600" cy="330" r="44" fill="#e8b64c"/>
        <g transform="rotate(180 600 400)">
          <path d="M 622 330 a 34 34 0 1 1 -18 -31 a 27 27 0 1 0 18 31 Z" fill="#3a4560"/>
        </g>
      </g>
      <circle cx="600" cy="400" r="10" fill="#41371c"/>

      ${fixed ? `
      <rect x="560" y="560" width="80" height="34" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <text x="600" y="583" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#41300f">${night ? 'NIGHT' : 'DAY'}</text>
      <rect x="820" y="330" width="26" height="140" rx="8" fill="#8a8578" stroke="#55524a" stroke-width="3"/>
      <circle cx="833" cy="316" r="16" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      ` : `
      <rect x="820" y="380" width="26" height="90" rx="8" fill="#8a8578" stroke="#55524a" stroke-width="3" transform="rotate(24 833 425)"/>
      <rect x="560" y="560" width="80" height="34" rx="8" fill="#5f5340" stroke="#41371c" stroke-width="3"/>
      <text x="600" y="583" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#2e2610">STUCK</text>
      <circle cx="700" cy="600" r="12" fill="none" stroke="#41371c" stroke-width="4"/>
      <rect x="694" y="612" width="12" height="10" fill="#41371c"/>
      `}
      <rect width="1200" height="800" fill="url(#bcvig)"/>
    </svg>`;
  }

  // ---------- scene: the potting shed ----------

  function pottingShed(S) {
    const night = !!S.flags.night;
    const win = night
      ? `<rect x="1190" y="230" width="240" height="220" fill="#1c2440"/>${stars([[1240, 280, 1.8], [1330, 260, 1.4], [1390, 320, 2]])}<circle cx="1370" cy="292" r="26" fill="#e9e2c8"/><circle cx="1358" cy="286" r="22" fill="#1c2440" opacity="0.85"/>`
      : `<rect x="1190" y="230" width="240" height="220" fill="#cfe4f0"/><circle cx="1350" cy="290" r="30" fill="#fff6d8"/><ellipse cx="1260" cy="330" rx="50" ry="14" fill="#fff" opacity="0.7"/>`;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="psvig" cx="48%" cy="45%" r="80%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="${night ? '0.55' : '0.4'}"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="720" fill="${night ? '#3a3226' : '#6e5a41'}"/>
      <g stroke="${night ? '#2a241b' : '#55462f'}" stroke-width="5">
        <line x1="0" y1="140" x2="1600" y2="140"/><line x1="0" y1="330" x2="1600" y2="330"/>
        <line x1="260" y1="0" x2="260" y2="720"/><line x1="1120" y1="0" x2="1120" y2="720"/>
      </g>
      <rect x="0" y="720" width="1600" height="280" fill="${night ? '#2c241c' : '#4f3f2c'}"/>
      <rect x="0" y="714" width="1600" height="10" fill="#2a2118"/>

      <!-- door back -->
      <g>
        <rect x="60" y="200" width="180" height="520" fill="#2a2118"/>
        <rect x="74" y="214" width="152" height="492" fill="${night ? '#3f3526' : '#5f4d35'}"/>
        <circle cx="212" cy="470" r="8" fill="#c9a544"/>
      </g>

      ${win}

      <!-- tool rack -->
      <g>
        <rect x="300" y="180" width="480" height="260" rx="8" fill="${night ? '#2e281e' : '#4a3d2a'}" stroke="#2a2118" stroke-width="5"/>
        ${S.flags.secateursTaken ? '' : `<g transform="rotate(20 400 280)">
          <path d="M 380 240 q -20 24 0 46 q 20 -22 0 -46" fill="#b8c0cc" stroke="#55524a" stroke-width="3"/>
          <line x1="374" y1="290" x2="360" y2="330" stroke="#7c3b3b" stroke-width="8" stroke-linecap="round"/>
          <line x1="388" y1="290" x2="398" y2="330" stroke="#7c3b3b" stroke-width="8" stroke-linecap="round"/>
        </g>`}
        ${S.flags.winderTaken ? '' : `<g>
          <circle cx="530" cy="270" r="20" fill="none" stroke="#c9a544" stroke-width="7"/>
          <line x1="530" y1="290" x2="530" y2="340" stroke="#c9a544" stroke-width="8" stroke-linecap="round"/>
          <rect x="518" y="336" width="24" height="14" rx="4" fill="#8a6a30"/>
        </g>`}
        ${S.flags.trowelTaken ? '' : `<g transform="rotate(-14 660 290)">
          <path d="M 648 240 L 672 240 L 666 300 L 654 300 Z" fill="#b8c0cc" stroke="#55524a" stroke-width="3"/>
          <rect x="652" y="300" width="16" height="42" rx="6" fill="#6e4a34"/>
        </g>`}
        <g fill="none" stroke="#26231e" stroke-width="6">
          <path d="M 730 240 l 0 90 m -14 -90 l 0 24 m 28 -24 l 0 24"/>
        </g>
      </g>

      <!-- seed cabinet -->
      <g>
        <rect x="850" y="200" width="240" height="420" rx="8" fill="${night ? '#33291d' : '#553f28'}" stroke="#2a2118" stroke-width="5"/>
        <g fill="${night ? '#241c12' : '#41301d'}" stroke="#2a2118" stroke-width="2">
          <rect x="866" y="220" width="94" height="56" rx="4"/><rect x="980" y="220" width="94" height="56" rx="4"/>
          <rect x="866" y="292" width="94" height="56" rx="4"/><rect x="980" y="292" width="94" height="56" rx="4"/>
          <rect x="866" y="364" width="94" height="56" rx="4"/><rect x="980" y="364" width="94" height="56" rx="4"/>
          <rect x="866" y="436" width="208" height="70" rx="4"/>
        </g>
        <g fill="#c9a544">
          <circle cx="913" cy="248" r="5"/><circle cx="1027" cy="248" r="5"/>
          <circle cx="913" cy="320" r="5"/><circle cx="1027" cy="320" r="5"/>
          <circle cx="913" cy="392" r="5"/><circle cx="1027" cy="392" r="5"/>
        </g>
        ${S.flags.journalTaken ? '' : (S.flags.cabinetOpen ? `
        <rect x="880" y="450" width="120" height="44" rx="4" fill="#3f6b4f" stroke="#1e4634" stroke-width="3"/>
        <line x1="896" y1="464" x2="984" y2="464" stroke="#b8e6c8" stroke-width="2"/>
        <line x1="896" y1="478" x2="972" y2="478" stroke="#b8e6c8" stroke-width="2"/>
        ` : `
        <circle cx="970" cy="471" r="12" fill="#0d0906" stroke="#c9a544" stroke-width="3"/>
        `)}
        <text x="970" y="540" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${night ? '#7a6f5a' : '#c9b89a'}" font-style="italic">seeds, in their seasons</text>
      </g>

      <!-- seed packets on the bench -->
      <g>
        <rect x="1170" y="560" width="330" height="30" rx="6" fill="${night ? '#3a2e20' : '#6b4a2c'}" stroke="#2a2118" stroke-width="4"/>
        ${paperSheet(1190, 480, 66, 74, -6)}
        ${paperSheet(1268, 486, 66, 74, 4)}
        ${paperSheet(1346, 478, 66, 74, -3)}
        ${paperSheet(1424, 488, 66, 74, 7)}
      </g>

      <!-- watering can -->
      ${S.flags.canTaken ? '' : `<g>
        <path d="M 480 830 L 480 760 L 620 760 L 620 830 A 70 22 0 0 1 480 830 Z" fill="#6e7a80" stroke="#3f4a50" stroke-width="4"/>
        <path d="M 620 780 L 700 740 L 706 756 L 626 796 Z" fill="#6e7a80" stroke="#3f4a50" stroke-width="3"/>
        <path d="M 480 780 Q 440 800 480 822" fill="none" stroke="#3f4a50" stroke-width="7"/>
        <ellipse cx="550" cy="760" rx="70" ry="14" fill="#556066" stroke="#3f4a50" stroke-width="3"/>
      </g>`}

      <rect width="1600" height="1000" fill="url(#psvig)"/>
    </svg>`;
  }

  // ---------- zoom: the seed drawers (cabinet puzzle surround) ----------

  function seedDrawersZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sdvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#4a3d2a"/>
      <rect x="170" y="80" width="860" height="640" rx="12" fill="#553f28" stroke="#2a2118" stroke-width="6"/>
      <text x="600" y="146" text-anchor="middle" font-size="24" font-family="Georgia, serif" fill="#c9b89a" letter-spacing="2">SEEDS, IN THEIR SEASONS</text>
      <text x="600" y="178" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#a08d6e" font-style="italic">set each to its sowing, and the garden will open &mdash; D.C.</text>
      <g fill="#41301d" stroke="#2a2118" stroke-width="3">
        <rect x="210" y="210" width="180" height="120" rx="6"/><rect x="405" y="210" width="180" height="120" rx="6"/>
        <rect x="600" y="210" width="180" height="120" rx="6"/><rect x="795" y="210" width="180" height="120" rx="6"/>
      </g>
      <g font-family="Georgia, serif" text-anchor="middle" font-size="17" fill="#c9b89a">
        <text x="300" y="280">NASTURTIUM</text><text x="495" y="280">FOXGLOVE</text>
        <text x="690" y="280">SWEET PEA</text><text x="885" y="280">HELLEBORE</text>
      </g>
      ${S.flags.cabinetOpen ? `
      <rect x="380" y="520" width="440" height="120" rx="8" fill="#1c1208"/>
      ${S.flags.journalTaken ? '' : `<g transform="rotate(-3 600 580)">
        <rect x="500" y="540" width="200" height="86" rx="6" fill="#3f6b4f" stroke="#1e4634" stroke-width="4"/>
        <text x="600" y="590" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="#b8e6c8" font-style="italic">Garden Journal</text>
      </g>`}
      ` : `
      <rect x="380" y="520" width="440" height="120" rx="8" fill="#41301d" stroke="#2a2118" stroke-width="4"/>
      <circle cx="600" cy="580" r="16" fill="#0d0906" stroke="#c9a544" stroke-width="4"/>
      <text x="600" y="676" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#a08d6e" font-style="italic">the journal drawer &mdash; locked to the seasons</text>
      `}
      <rect width="1200" height="800" fill="url(#sdvig)"/>
    </svg>`;
  }

  // ---------- scene: the orchid wing ----------

  function orchidWing(S) {
    const P = pal(S);
    const night = !!S.flags.night;
    let orchids = '';
    const colors = night
      ? ['#46684a', '#3a5a40', '#46684a', '#3a5a40', '#46684a']
      : ['#d88ab0', '#e8b64c', '#c9dff0', '#d8a3e8', '#e89a7a'];
    for (let i = 0; i < 5; i++) {
      const x = 340 + i * 170;
      orchids += `
        ${potGlyph(x, 700, 56, '#8a6a52')}
        <path d="M ${x} 660 Q ${x - 6} 600 ${x + 4} 570" fill="none" stroke="${P.leaf}" stroke-width="4"/>
        <ellipse cx="${x + 4}" cy="560" rx="16" ry="10" fill="${colors[i]}"/>
        <ellipse cx="${x + 4}" cy="560" rx="7" ry="12" fill="${colors[i]}" opacity="0.8"/>`;
    }
    const nightBloomer = night ? `
      <g>
        <ellipse cx="1000" cy="548" rx="20" ry="13" fill="#e8f0ff">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="1000" cy="560" rx="42" ry="30" fill="#9fffcf" opacity="0.14"/>
      </g>` : '';
    const mossTrail = (night && S.flags.clockFixed) ? `
      <g fill="#9fffcf">
        ${[[520, 900], [640, 880], [770, 895], [900, 875], [1030, 892], [1160, 872]].map(([x, y], i) =>
          `<circle cx="${x}" cy="${y}" r="7" opacity="0.8">
            <animate attributeName="opacity" values="0.5;0.95;0.5" dur="${(2.4 + i * 0.3).toFixed(1)}s" repeatCount="indefinite"/>
          </circle>`).join('')}
      </g>` : '';

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="owvig" cx="50%" cy="45%" r="80%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="${night ? '0.52' : '0.32'}"/>
        </radialGradient>
      </defs>
      ${glassRoof(P, night)}
      <rect x="0" y="420" width="1600" height="380" fill="${P.glass}"/>
      <g stroke="${P.rib}" stroke-width="6">
        <line x1="320" y1="420" x2="320" y2="800"/><line x1="800" y1="420" x2="800" y2="800"/>
        <line x1="1280" y1="420" x2="1280" y2="800"/>
      </g>
      <rect x="0" y="800" width="1600" height="200" fill="${P.floor}"/>
      <rect x="0" y="794" width="1600" height="10" fill="${P.floorDark}"/>

      <!-- door back -->
      <g>
        <rect x="40" y="480" width="150" height="300" fill="${P.ribDark}"/>
        <rect x="52" y="492" width="126" height="288" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <circle cx="166" cy="630" r="7" fill="#c9a544"/>
      </g>

      <!-- orchid benches -->
      <g>
        <rect x="280" y="710" width="900" height="26" rx="6" fill="${P.bench}" stroke="#241608" stroke-width="4"/>
        <rect x="310" y="736" width="22" height="120" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        <rect x="1130" y="736" width="22" height="120" fill="${P.bench}" stroke="#241608" stroke-width="3"/>
        ${orchids}
        ${nightBloomer}
      </g>

      <!-- the empty plinth -->
      <g>
        <rect x="1310" y="640" width="150" height="180" rx="8" fill="${night ? '#3a4560' : '#b9c4c9'}" stroke="${P.ribDark}" stroke-width="4"/>
        <ellipse cx="1385" cy="640" rx="76" ry="16" fill="${night ? '#2a3450' : '#d5dde0'}" stroke="${P.ribDark}" stroke-width="3"/>
        <ellipse cx="1385" cy="636" rx="44" ry="9" fill="none" stroke="${night ? '#8a97b8' : '#8a9aa0'}" stroke-width="2" stroke-dasharray="6 5"/>
        <text x="1385" y="852" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="${night ? '#8a97b8' : '#6e6151'}" font-style="italic">THE MIDNIGHT EMPRESS</text>
      </g>

      <!-- cold frame with lettuces -->
      <g>
        <rect x="600" y="880" width="300" height="90" rx="8" fill="${P.bench}" stroke="#241608" stroke-width="4"/>
        <path d="M 600 880 L 660 838 L 900 838 L 900 880 Z" fill="${night ? '#22304a' : '#cfe4f0'}" stroke="#241608" stroke-width="3" opacity="0.9"/>
        ${S.flags.lettuceTaken ? `
        <ellipse cx="700" cy="906" rx="26" ry="14" fill="${P.leafPale}"/>
        <ellipse cx="820" cy="908" rx="24" ry="13" fill="${P.leafPale}"/>
        ` : `
        <ellipse cx="680" cy="906" rx="26" ry="14" fill="${P.leafPale}"/>
        <ellipse cx="760" cy="902" rx="28" ry="15" fill="#8fce6a"/>
        <ellipse cx="840" cy="908" rx="24" ry="13" fill="${P.leafPale}"/>
        `}
      </g>

      <!-- Petronella -->
      <g>
        <path d="M 200 830 Q 184 700 214 655 L 274 655 Q 302 700 288 830 Z" fill="#7a4a68" stroke="#54324a" stroke-width="3"/>
        <rect x="222" y="628" width="46" height="46" rx="8" fill="#7a4a68"/>
        <circle cx="245" cy="606" r="27" fill="#e8c39e"/>
        <path d="M 218 600 Q 245 574 272 600 L 272 616 Q 245 596 218 616 Z" fill="#8a5a30"/>
        <circle cx="236" cy="606" r="6" fill="none" stroke="#3a2f22" stroke-width="2"/>
        <circle cx="254" cy="606" r="6" fill="none" stroke="#3a2f22" stroke-width="2"/>
        <line x1="242" y1="606" x2="248" y2="606" stroke="#3a2f22" stroke-width="2"/>
        <path d="M 236 622 q 9 6 18 0" fill="none" stroke="#8a5a3e" stroke-width="2.5"/>
        <line x1="210" y1="690" x2="188" y2="790" stroke="#7a4a68" stroke-width="12" stroke-linecap="round"/>
        <line x1="278" y1="690" x2="300" y2="770" stroke="#7a4a68" stroke-width="12" stroke-linecap="round"/>
        <rect x="292" y="756" width="60" height="44" rx="4" fill="#3f6b4f" stroke="#1e4634" stroke-width="3"/>
      </g>

      ${mossTrail}
      ${night ? nightLife(1000, 520) : butterflies(560, 540)}

      <rect width="1600" height="1000" fill="url(#owvig)"/>
    </svg>`;
  }

  // ---------- scene: the hedge maze ----------

  function maze(S) {
    const P = pal(S);
    const night = !!S.flags.night;
    const hedge = night ? '#22371f' : '#3f6b34';
    const hedgeLight = night ? '#2c4527' : '#548a45';
    let hedges = '';
    for (const [x, w] of [[0, 420], [520, 260], [880, 300], [1280, 320]]) {
      hedges += `
        <rect x="${x}" y="360" width="${w}" height="380" fill="${hedge}" stroke="#1e2f1a" stroke-width="5"/>
        <path d="M ${x} 360 ${Array.from({ length: Math.floor(w / 60) }, (_, i) => `q 30 -34 60 0`).join(' ')}" fill="${hedge}" stroke="#1e2f1a" stroke-width="4"/>
        <g fill="${hedgeLight}" opacity="0.7">
          <ellipse cx="${x + w * 0.25}" cy="430" rx="26" ry="14"/>
          <ellipse cx="${x + w * 0.6}" cy="520" rx="30" ry="16"/>
          <ellipse cx="${x + w * 0.4}" cy="640" rx="24" ry="12"/>
        </g>`;
    }
    const centre = S.flags.mazeSolved ? `
      <g>
        <ellipse cx="700" cy="880" rx="240" ry="44" fill="${night ? '#2c3a26' : '#6a9a52'}" opacity="0.8"/>
        <text x="700" y="826" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${night ? '#a8c49a' : '#3d5c30'}" font-style="italic">the way to the heart stands open</text>
      </g>` : `
      <text x="700" y="850" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="${night ? '#7a8f70' : '#3d5c30'}" font-style="italic">the hedges keep their counsel</text>`;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mzvig" cx="50%" cy="45%" r="82%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="${night ? '0.55' : '0.3'}"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="360" fill="${P.sky}"/>
      ${night
        ? `${stars([[200, 90, 2], [520, 60, 1.6], [900, 110, 2], [1240, 70, 1.8], [1460, 140, 1.5]])}<circle cx="1300" cy="120" r="48" fill="#e9e2c8"/><circle cx="1282" cy="112" r="42" fill="${P.sky}" opacity="0.86"/>`
        : `<circle cx="1280" cy="120" r="58" fill="#fff6d8" opacity="0.95"/><ellipse cx="500" cy="110" rx="140" ry="30" fill="#fff" opacity="0.7"/>`}
      <rect x="0" y="740" width="1600" height="260" fill="${night ? '#26301f' : '#5c8a48'}"/>

      ${hedges}

      <!-- the gap in: entrance arch -->
      <g>
        <path d="M 420 740 L 420 430 Q 470 360 520 430 L 520 740" fill="none" stroke="#1e2f1a" stroke-width="6"/>
        <rect x="426" y="436" width="88" height="304" fill="${night ? '#141c14' : '#2c4527'}"/>
        <ellipse cx="470" cy="500" rx="18" ry="10" fill="${hedgeLight}" opacity="0.5"/>
      </g>
      <!-- laurel marker at the entrance -->
      ${leafSpray(560, 760, 70, hedgeLight, 5)}
      ${potGlyph(560, 782, 44, '#8a6a52')}

      ${night ? nightLife(760, 480) : butterflies(820, 460)}
      ${centre}

      <rect width="1600" height="1000" fill="url(#mzvig)"/>
    </svg>`;
  }

  // ---------- zoom: the maze heart ----------

  function mazeHeartZoom(S) {
    const night = !!S.flags.night;
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mhvig" cx="50%" cy="45%" r="75%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="${night ? '#1a2418' : '#4a7a3c'}"/>
      <rect x="0" y="0" width="1200" height="140" fill="${night ? '#22371f' : '#3f6b34'}"/>
      <rect x="0" y="660" width="1200" height="140" fill="${night ? '#22371f' : '#3f6b34'}"/>
      <ellipse cx="600" cy="430" rx="420" ry="230" fill="${night ? '#26301f' : '#5c8a48'}"/>

      <!-- the sundial -->
      <g>
        <rect x="540" y="380" width="120" height="180" rx="10" fill="${night ? '#3a4560' : '#b9c4c9'}" stroke="#55606e" stroke-width="4"/>
        <ellipse cx="600" cy="380" rx="96" ry="30" fill="${night ? '#4a5578' : '#d5dde0'}" stroke="#55606e" stroke-width="4"/>
        <path d="M 600 380 L 600 322 L 648 372 Z" fill="#8a8f9c" stroke="#55606e" stroke-width="3"/>
        <text x="600" y="620" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="${night ? '#a8b4d0' : '#2e4426'}" font-style="italic">HER MAJESTY FACES THE MORNING &mdash; D.C.</text>
      </g>

      <!-- the dig spot -->
      ${S.flags.dugTin ? `
      <ellipse cx="880" cy="560" rx="70" ry="26" fill="#4a3626"/>
      <rect x="840" y="520" width="80" height="34" rx="6" fill="#8a8f9c" stroke="#55606e" stroke-width="3" transform="rotate(-8 880 537)"/>
      ` : `
      <ellipse cx="880" cy="560" rx="60" ry="22" fill="${night ? '#31281e' : '#6e5a41'}" opacity="0.9"/>
      <path d="M 850 552 q 30 -14 60 0" fill="none" stroke="${night ? '#4a3d2c' : '#4f3f2c'}" stroke-width="4"/>
      `}

      <!-- Gladstone was here -->
      <g opacity="0.75" fill="${night ? '#4a5540' : '#3d5c30'}">
        <ellipse cx="320" cy="600" rx="9" ry="5"/><ellipse cx="360" cy="616" rx="9" ry="5"/>
        <ellipse cx="400" cy="606" rx="9" ry="5"/><ellipse cx="440" cy="622" rx="9" ry="5"/>
      </g>

      <rect width="1200" height="800" fill="url(#mhvig)"/>
    </svg>`;
  }

  // ---------- scene: the garden office ----------

  function gardenOffice(S) {
    const night = !!S.flags.night;
    const win = night
      ? `<rect x="1210" y="200" width="260" height="300" fill="#1c2440"/>${stars([[1270, 260, 1.8], [1390, 240, 1.5], [1330, 330, 1.6]])}<circle cx="1420" cy="280" r="30" fill="#e9e2c8"/><circle cx="1408" cy="272" r="26" fill="#1c2440" opacity="0.85"/>`
      : `<rect x="1210" y="200" width="260" height="300" fill="#cfe4f0"/><ellipse cx="1300" cy="270" rx="60" ry="16" fill="#fff" opacity="0.75"/><circle cx="1408" cy="300" r="34" fill="#fff6d8"/>`;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="govig" cx="46%" cy="45%" r="80%">
          <stop offset="48%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="${night ? '0.55' : '0.38'}"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="720" fill="${night ? '#33402e' : '#5c7050'}"/>
      <rect x="0" y="560" width="1600" height="160" fill="${night ? '#26301f' : '#48583c'}"/>
      <rect x="0" y="556" width="1600" height="8" fill="#1e2a18"/>
      <rect x="0" y="720" width="1600" height="280" fill="${night ? '#2c241c' : '#4f3f2c'}"/>
      <rect x="0" y="714" width="1600" height="10" fill="#2a2118"/>

      <!-- door back -->
      <g>
        <rect x="60" y="200" width="180" height="520" fill="#1e2a18"/>
        <rect x="74" y="214" width="152" height="492" fill="${night ? '#3a4736' : '#4e6244'}"/>
        <circle cx="212" cy="470" r="8" fill="#c9a544"/>
      </g>

      ${win}

      <!-- the master planting map, one corner missing -->
      <g>
        <rect x="330" y="170" width="520" height="340" fill="#3c2c1f" stroke="#241608" stroke-width="5"/>
        <rect x="350" y="190" width="480" height="300" fill="#e8dfc4"/>
        <g stroke="#8a7a5e" stroke-width="2.5">
          <line x1="380" y1="240" x2="800" y2="240"/><line x1="380" y1="300" x2="800" y2="300"/>
          <line x1="380" y1="360" x2="800" y2="360"/><line x1="380" y1="420" x2="800" y2="420"/>
          <line x1="450" y1="210" x2="450" y2="460"/><line x1="520" y1="210" x2="520" y2="460"/>
          <line x1="590" y1="210" x2="590" y2="460"/><line x1="660" y1="210" x2="660" y2="460"/>
          <line x1="730" y1="210" x2="730" y2="460"/>
        </g>
        ${S.flags.fragmentUsed ? `
        <rect x="660" y="360" width="170" height="130" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
        <line x1="690" y1="420" x2="800" y2="420" stroke="#8a7a5e" stroke-width="2.5"/>
        <line x1="730" y1="380" x2="730" y2="460" stroke="#8a7a5e" stroke-width="2.5"/>
        ` : `
        <path d="M 660 360 L 830 360 L 830 490 L 660 490 Z" fill="#c9b89a"/>
        <path d="M 660 360 L 830 360 L 830 490" fill="none" stroke="#a08d6e" stroke-width="3" stroke-dasharray="9 7"/>
        <text x="745" y="432" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#8a7a5e" font-style="italic">torn away</text>
        `}
        <text x="590" y="540" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="${night ? '#a8b49a' : '#d8cfae'}" letter-spacing="1">THE BEDS OF CROFT HALL</text>
      </g>

      <!-- herbarium press -->
      <g>
        <rect x="950" y="560" width="200" height="34" rx="6" fill="${night ? '#3a2e20' : '#6b4a2c'}" stroke="#2a2118" stroke-width="4"/>
        <rect x="970" y="470" width="160" height="90" fill="#7a5a3d" stroke="#2a2118" stroke-width="4"/>
        <rect x="986" y="440" width="128" height="30" fill="#553a27" stroke="#2a2118" stroke-width="3"/>
        <circle cx="1050" cy="430" r="14" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        ${S.flags.herbariumTaken ? '' : paperSheet(994, 486, 112, 60, -2)}
      </g>

      <!-- desk with Digby's chair, hat still on it -->
      <g>
        <rect x="330" y="640" width="420" height="50" rx="6" fill="${night ? '#3a2e20' : '#5a4028'}" stroke="#2a2118" stroke-width="4"/>
        <rect x="360" y="690" width="26" height="120" fill="#4a3122" stroke="#2a2118" stroke-width="3"/>
        <rect x="690" y="690" width="26" height="120" fill="#4a3122" stroke="#2a2118" stroke-width="3"/>
        ${paperSheet(400, 596, 100, 44, -5)}
        ${paperSheet(560, 600, 90, 40, 8)}
        <g>
          <rect x="790" y="640" width="130" height="18" rx="8" fill="#4a3122" stroke="#2a2118" stroke-width="3"/>
          <ellipse cx="855" cy="620" rx="56" ry="18" fill="#6e5a3f" stroke="#4a3b28" stroke-width="3"/>
          <ellipse cx="855" cy="608" rx="34" ry="16" fill="#6e5a3f" stroke="#4a3b28" stroke-width="3"/>
        </g>
      </g>

      <!-- Bertram, draped on a chair -->
      <g>
        <rect x="1130" y="640" width="150" height="20" rx="8" fill="#4a3122" stroke="#2a2118" stroke-width="3"/>
        <rect x="1140" y="660" width="18" height="140" fill="#3a2a1a"/>
        <rect x="1252" y="660" width="18" height="140" fill="#3a2a1a"/>
        <path d="M 1160 656 Q 1150 540 1180 505 L 1236 505 Q 1264 540 1256 656 Z" fill="#7a6a3a" stroke="#54481f" stroke-width="3"/>
        <rect x="1184" y="478" width="46" height="46" rx="8" fill="#7a6a3a"/>
        <circle cx="1207" cy="458" r="26" fill="#e8c39e"/>
        <path d="M 1182 452 Q 1207 428 1232 452 L 1232 444 Q 1207 420 1182 444 Z" fill="#c9a35a"/>
        <path d="M 1194 448 q 6 -6 12 0 M 1210 448 q 6 -6 12 0" fill="none" stroke="#3a2f22" stroke-width="2.5"/>
        <ellipse cx="1207" cy="472" rx="5" ry="3.5" fill="#8a5a3e"/>
        <line x1="1165" y1="560" x2="1128" y2="618" stroke="#7a6a3a" stroke-width="12" stroke-linecap="round"/>
        <line x1="1251" y1="560" x2="1290" y2="600" stroke="#7a6a3a" stroke-width="12" stroke-linecap="round"/>
        <path d="M 1284 606 a 12 12 0 1 0 20 -6 l -8 -20" fill="none" stroke="#8a8f9c" stroke-width="4"/>
      </g>

      ${night ? nightLife(600, 300) : butterflies(900, 300)}

      <rect width="1600" height="1000" fill="url(#govig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const icons = {
    secateurs: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 14 q -12 12 0 24 q 12 -12 0 -24" fill="#b8c0cc" stroke="#55524a" stroke-width="3"/>
      <line x1="28" y1="38" x2="18" y2="54" stroke="#7c3b3b" stroke-width="6" stroke-linecap="round"/>
      <line x1="36" y1="38" x2="46" y2="54" stroke="#7c3b3b" stroke-width="6" stroke-linecap="round"/>
    </svg>`,
    winder: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="11" fill="none" stroke="#c9a544" stroke-width="6"/>
      <line x1="32" y1="31" x2="32" y2="48" stroke="#c9a544" stroke-width="7" stroke-linecap="round"/>
      <rect x="24" y="46" width="16" height="10" rx="3" fill="#8a6a30"/>
    </svg>`,
    trowel: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 8 L38 8 L35 34 L29 34 Z" fill="#b8c0cc" stroke="#55524a" stroke-width="3"/>
      <rect x="28" y="34" width="8" height="22" rx="4" fill="#6e4a34"/>
    </svg>`,
    journal: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="36" height="44" rx="4" fill="#3f6b4f" stroke="#1e4634" stroke-width="3"/>
      <line x1="22" y1="10" x2="22" y2="54" stroke="#1e4634" stroke-width="3"/>
      <path d="M30 28 q 6 -10 14 -6 q -2 10 -14 6 Z" fill="#b8e6c8"/>
    </svg>`,
    herbarium: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <path d="M32 44 q -2 -12 0 -20 M32 30 q -8 -4 -10 -12 M32 34 q 8 -4 10 -12" fill="none" stroke="#4e7a3a" stroke-width="3"/>
      <ellipse cx="22" cy="18" rx="5" ry="3" fill="#d88ab0"/>
      <ellipse cx="42" cy="22" rx="5" ry="3" fill="#d88ab0"/>
    </svg>`,
    fragment: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18 L50 14 L52 50 L20 52 Q 12 40 14 18 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <line x1="24" y1="28" x2="44" y2="26" stroke="#8a7a5e" stroke-width="2.5"/>
      <line x1="34" y1="20" x2="36" y2="46" stroke="#8a7a5e" stroke-width="2.5"/>
    </svg>`,
    wateringCan: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 L20 28 L44 28 L44 50 A 12 6 0 0 1 20 50 Z" fill="#6e7a80" stroke="#3f4a50" stroke-width="3"/>
      <path d="M44 34 L56 26 L58 31 L46 39 Z" fill="#6e7a80" stroke="#3f4a50" stroke-width="2.5"/>
      <path d="M20 34 Q 10 40 20 48" fill="none" stroke="#3f4a50" stroke-width="4"/>
      <ellipse cx="32" cy="28" rx="12" ry="4" fill="#556066"/>
    </svg>`,
    lettuce: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="20" ry="14" fill="#8fce6a" stroke="#4e7a3a" stroke-width="3"/>
      <path d="M18 34 q 6 -14 14 -16 q 10 0 14 14" fill="none" stroke="#4e7a3a" stroke-width="3"/>
      <path d="M26 30 q 6 8 12 0" fill="none" stroke="#4e7a3a" stroke-width="2.5"/>
    </svg>`,
  };

  return {
    glasshouse, bloomClockZoom, pottingShed, seedDrawersZoom,
    orchidWing, maze, mazeHeartZoom, gardenOffice, icons,
  };
})();
