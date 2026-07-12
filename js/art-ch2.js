/* Art for Chapter Two — "The Apothecary's Ledger".
   Namespaced under Art.ch2 so painter and icon names stay clear of
   Chapter One's. Scenes 1600x1000, zooms 1200x800, same flat-fill,
   dark-stroke, vignetted style as art.js. */

Art.ch2 = (() => {
  const { clockFace, gearGlyph, jarGlyph, bottleGlyph, paperSheet, stars } = Art;

  // The five remedy jars whose third letters spell the study code.
  const REMEDIES = ['CAMPHOR', 'SPEARMINT', 'HOREHOUND', 'ORCHIS', 'OXYMEL'];
  const JAR_COLORS = ['#3f5044', '#4f3a2a', '#6b5a2e', '#46584c', '#553a27'];

  // ---------- scene: the shop floor ----------

  function shopFloor(S) {
    let panels = '';
    for (let x = 20; x < 1600; x += 130) {
      panels += `<rect x="${x}" y="580" width="104" height="110" fill="#243c33" stroke="#16281f" stroke-width="3"/>`;
    }
    let planks = '';
    for (let y = 740; y < 1000; y += 54) {
      planks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#4a3122" stroke-width="3"/>`;
    }
    let smallJars = '';
    for (let i = 0; i < 6; i++) {
      smallJars += jarGlyph(880 + i * 56, 300, 38, 56, JAR_COLORS[i % 5]);
    }

    // Mercy waits by the counter until the case is closed.
    const mercy = `
      <g>
        <path d="M 520 700 Q 500 560 545 508 L 615 508 Q 660 560 640 700 Z" fill="#3a3d52" stroke="#262838" stroke-width="3"/>
        <rect x="545" y="470" width="70" height="70" rx="14" fill="#3a3d52"/>
        <rect x="558" y="472" width="44" height="52" rx="8" fill="#e8dfc4"/>
        <circle cx="580" cy="440" r="30" fill="#e8c39e"/>
        <path d="M 550 436 Q 548 404 580 402 Q 612 404 610 436 Q 596 420 580 420 Q 564 420 550 436 Z" fill="#4a3122"/>
        <path d="M 552 430 Q 542 448 552 462 M 608 430 Q 618 448 608 462" fill="none" stroke="#4a3122" stroke-width="7"/>
        <circle cx="570" cy="442" r="3" fill="#3a2f22"/>
        <circle cx="590" cy="442" r="3" fill="#3a2f22"/>
        <path d="M 572 458 Q 580 462 588 458" fill="none" stroke="#8a5a3e" stroke-width="2.5"/>
        <line x1="527" y1="530" x2="512" y2="620" stroke="#3a3d52" stroke-width="14" stroke-linecap="round"/>
        <line x1="633" y1="530" x2="648" y2="620" stroke="#3a3d52" stroke-width="14" stroke-linecap="round"/>
      </g>`;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="apvig" cx="50%" cy="42%" r="78%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.52"/>
        </radialGradient>
        <radialGradient id="aplamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d6ecd2" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#d6ecd2" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="1600" height="700" fill="#2f4a3f"/>
      <rect x="0" y="560" width="1600" height="140" fill="#1f3b30"/>
      ${panels}
      <rect x="0" y="556" width="1600" height="8" fill="#16281f"/>
      <rect x="0" y="700" width="1600" height="300" fill="#5a4028"/>
      <rect x="0" y="694" width="1600" height="12" fill="#33261c"/>
      ${planks}

      <ellipse cx="760" cy="400" rx="560" ry="320" fill="url(#aplamp)"/>
      <g>
        <line x1="760" y1="0" x2="760" y2="80" stroke="#241608" stroke-width="6"/>
        <circle cx="760" cy="128" r="46" fill="#e4f0dc" opacity="0.85">
          <animate attributeName="opacity" values="0.78;0.9;0.78" dur="4.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="760" cy="128" r="46" fill="none" stroke="#8a6a30" stroke-width="4"/>
      </g>

      <!-- front door with sign -->
      <g>
        <rect x="60" y="150" width="230" height="558" fill="#16281f"/>
        <rect x="76" y="166" width="198" height="526" fill="#2c4438" stroke="#16281f" stroke-width="3"/>
        <rect x="94" y="188" width="162" height="190" fill="#141d33" stroke="#8a6a30" stroke-width="3"/>
        ${stars([[130, 230, 1.6], [210, 214, 1.8], [176, 300, 1.4]])}
        <g transform="rotate(3 175 300)">
          <rect x="120" y="272" width="110" height="58" rx="4" fill="#efe6cf" stroke="#7a5a3d" stroke-width="3"/>
          <text x="175" y="298" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#553a27">BLACKWOOD</text>
          <text x="175" y="318" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#553a27">&amp; DAUGHTER</text>
        </g>
        <rect x="104" y="404" width="146" height="120" fill="#1f3329" stroke="#16281f" stroke-width="2"/>
        <rect x="104" y="548" width="146" height="118" fill="#1f3329" stroke="#16281f" stroke-width="2"/>
        <circle cx="258" cy="452" r="9" fill="#c9a544"/>
        <path d="M 140 128 L 210 128 L 226 150 L 124 150 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      </g>

      <!-- window: mortar-and-pestle show globe -->
      <g>
        <rect x="330" y="190" width="250" height="380" fill="#16281f"/>
        <rect x="348" y="208" width="214" height="344" fill="#141d33"/>
        ${stars([[400, 250, 1.6], [520, 236, 1.5], [470, 320, 1.4]])}
        <circle cx="455" cy="330" r="52" fill="#8fae5c" opacity="0.5">
          <animate attributeName="opacity" values="0.42;0.58;0.42" dur="5.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="455" cy="330" r="52" fill="none" stroke="#c9a544" stroke-width="4"/>
        <line x1="455" y1="208" x2="455" y2="278" stroke="#c9a544" stroke-width="3"/>
        <path d="M 402 460 A 54 30 0 0 0 508 460 L 496 430 L 414 430 Z" fill="#d8cfae" stroke="#a89a78" stroke-width="3"/>
        <line x1="490" y1="404" x2="516" y2="378" stroke="#a89a78" stroke-width="9" stroke-linecap="round"/>
        <rect x="320" y="564" width="270" height="16" rx="4" fill="#33261c"/>
      </g>

      <!-- shelf wall of remedy jars -->
      <g>
        <rect x="840" y="196" width="360" height="410" fill="#243c33" stroke="#16281f" stroke-width="4"/>
        <rect x="852" y="208" width="336" height="386" fill="#1c3028"/>
        <line x1="852" y1="318" x2="1188" y2="318" stroke="#553a27" stroke-width="10"/>
        <line x1="852" y1="452" x2="1188" y2="452" stroke="#553a27" stroke-width="10"/>
        <line x1="852" y1="586" x2="1188" y2="586" stroke="#553a27" stroke-width="10"/>
        ${smallJars}
        ${jarGlyph(902, 444, 52, 78, '#4f3a2a')}
        ${jarGlyph(972, 444, 46, 68, '#3f5044')}
        ${bottleGlyph(1036, 444, 34, 84, '#385a63')}
        ${bottleGlyph(1090, 444, 28, 70, '#6b2f36')}
        ${jarGlyph(1150, 444, 50, 74, '#6b5a2e')}
        ${bottleGlyph(890, 578, 30, 76, '#46584c')}
        ${jarGlyph(950, 578, 48, 70, '#553a27')}
        ${jarGlyph(1020, 578, 54, 80, '#3f5044')}
        ${bottleGlyph(1084, 578, 32, 66, '#6b5a2e')}
        ${jarGlyph(1148, 578, 44, 64, '#4f3a2a')}
      </g>

      <!-- counter with ledger stand -->
      <g>
        <rect x="820" y="662" width="500" height="248" fill="#4a3122" stroke="#241608" stroke-width="4"/>
        <rect x="846" y="692" width="200" height="180" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="1090" y="692" width="200" height="180" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="806" y="622" width="528" height="44" rx="6" fill="#6b4a2c" stroke="#241608" stroke-width="4"/>
        <g>
          <path d="M 1000 622 L 1120 622 L 1100 560 L 1020 560 Z" fill="#553a27" stroke="#241608" stroke-width="4"/>
          <path d="M 1006 566 Q 1058 544 1114 566 L 1108 528 Q 1058 510 1012 528 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
          <line x1="1060" y1="521" x2="1060" y2="562" stroke="#b9a97e" stroke-width="3"/>
        </g>
        <path d="M 880 600 A 26 26 0 0 1 932 600 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        ${S.flags.windlassTaken ? '' : `<g stroke="#8a8578" stroke-width="8" stroke-linecap="round" fill="none">
          <path d="M 1220 596 L 1220 566 L 1258 566"/>
        </g>
        <circle cx="1220" cy="600" r="7" fill="#55524a"/>`}
      </g>

      ${mercy}

      <!-- dispensary door -->
      <g>
        <rect x="1330" y="150" width="230" height="560" fill="#16281f"/>
        <rect x="1346" y="166" width="198" height="528" fill="#2c4438" stroke="#16281f" stroke-width="3"/>
        <rect x="1372" y="212" width="146" height="52" rx="5" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <text x="1445" y="235" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#5f4718" letter-spacing="1">DISPENSARY</text>
        <text x="1445" y="255" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#5f4718" letter-spacing="2">STAFF ONLY</text>
        <rect x="1366" y="300" width="76" height="160" fill="#1f3329" stroke="#16281f" stroke-width="2"/>
        <rect x="1450" y="300" width="76" height="160" fill="#1f3329" stroke="#16281f" stroke-width="2"/>
        <rect x="1366" y="492" width="160" height="170" fill="#1f3329" stroke="#16281f" stroke-width="2"/>
        <circle cx="1370" cy="452" r="10" fill="#c9a544"/>
      </g>

      <rect width="1600" height="1000" fill="url(#apvig)"/>
    </svg>`;
  }

  // ---------- zoom: the ledger stand ----------

  function ledgerZoom(S) {
    let rules = '';
    for (let i = 0; i < 6; i++) {
      rules += `<path d="M 250 ${210 + i * 56} Q 590 ${190 + i * 56} 930 ${210 + i * 56}" fill="none" stroke="#b9a97e" stroke-width="2" opacity="0.7"/>`;
    }
    const freshInk = `
      <g stroke="#1c1a2e" stroke-width="3.5" fill="none">
        <path d="M 300 262 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0"/>
        <path d="M 640 262 q 12 -8 24 0 q 12 8 24 0 M 760 262 q 12 -8 24 0"/>
        <path d="M 300 374 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0 q 14 10 28 0"/>
        <path d="M 640 374 q 12 -8 24 0 q 12 8 24 0 M 760 374 q 12 -8 24 0"/>
        <path d="M 300 486 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0"/>
        <path d="M 640 486 q 12 -8 24 0 q 12 8 24 0 M 760 486 q 12 -8 24 0"/>
      </g>`;
    const oldInk = `
      <g stroke="#4a3d2a" stroke-width="3" fill="none" opacity="0.75">
        <path d="M 300 318 q 14 -10 28 0 q 14 10 28 0 M 560 318 q 12 -8 24 0"/>
        <path d="M 300 430 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0 M 560 430 q 12 -8 24 0"/>
      </g>`;
    const scraped = !S.flags.alteredSeen ? '' : `
      <g opacity="0.9">
        <ellipse cx="690" cy="262" rx="86" ry="17" fill="#e0d0a4"/>
        <ellipse cx="690" cy="374" rx="86" ry="17" fill="#e0d0a4"/>
        <ellipse cx="690" cy="486" rx="86" ry="17" fill="#e0d0a4"/>
        <g stroke="#1c1a2e" stroke-width="3.5" fill="none">
          <path d="M 640 262 q 12 -8 24 0 q 12 8 24 0 M 760 262 q 12 -8 24 0"/>
          <path d="M 640 374 q 12 -8 24 0 q 12 8 24 0 M 760 374 q 12 -8 24 0"/>
          <path d="M 640 486 q 12 -8 24 0 q 12 8 24 0 M 760 486 q 12 -8 24 0"/>
        </g>
      </g>`;
    const magnifier = S.flags.magnifierTaken ? '' : `
      <g transform="rotate(-18 330 690)">
        <circle cx="300" cy="676" r="34" fill="#b8e6c8" fill-opacity="0.25" stroke="#c9a544" stroke-width="8"/>
        <line x1="326" y1="700" x2="384" y2="740" stroke="#553a27" stroke-width="12" stroke-linecap="round"/>
      </g>`;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lzvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#1f3b30"/>
      <rect x="0" y="620" width="1200" height="180" fill="#4a3122"/>
      <rect x="0" y="614" width="1200" height="10" fill="#241608"/>

      <!-- the prescription ledger -->
      <g>
        <path d="M 190 580 Q 420 544 590 560 L 590 150 Q 420 130 190 166 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="4"/>
        <path d="M 590 560 Q 760 544 990 580 L 990 166 Q 760 130 590 150 Z" fill="#e5dabb" stroke="#b9a97e" stroke-width="4"/>
        <line x1="590" y1="150" x2="590" y2="560" stroke="#b9a97e" stroke-width="5"/>
        <line x1="640" y1="160" x2="640" y2="556" stroke="#c96b5b" stroke-width="2" opacity="0.6"/>
        ${rules}
        ${oldInk}
        ${freshInk}
        ${scraped}
        <text x="380" y="196" text-anchor="middle" font-size="20" font-family="Georgia, serif" fill="#6b5a3e" letter-spacing="2">PRESCRIPTION BOOK</text>
      </g>

      ${magnifier}
      <rect width="1200" height="800" fill="url(#lzvig)"/>
    </svg>`;
  }

  // ---------- zoom: the shelf wall ----------

  function shelfWallZoom(S) {
    let jars = '';
    for (let i = 0; i < 5; i++) {
      jars += jarGlyph(190 + i * 205, 420, 128, 190, JAR_COLORS[i], REMEDIES[i]);
    }
    const vial = S.flags.vialTaken ? '' : `
      <g transform="rotate(12 980 610)">
        ${bottleGlyph(980, 620, 30, 66, '#9db4c9')}
      </g>`;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="swvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#1c3028"/>
      <rect x="40" y="428" width="1120" height="26" fill="#553a27" stroke="#241608" stroke-width="4"/>
      <rect x="40" y="640" width="1120" height="26" fill="#553a27" stroke="#241608" stroke-width="4"/>
      <text x="600" y="110" text-anchor="middle" font-size="24" font-family="Georgia, serif" fill="#8a9a83" letter-spacing="4">HOUSEHOLD REMEDIES</text>
      <text x="600" y="146" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#5f7a67" letter-spacing="2" font-style="italic">as I taught her, oldest first &mdash; J.B.</text>
      ${jars}
      ${bottleGlyph(160, 632, 40, 90, '#46584c')}
      ${jarGlyph(280, 632, 66, 84, '#4f3a2a')}
      ${bottleGlyph(420, 632, 34, 76, '#6b2f36')}
      ${jarGlyph(560, 632, 72, 92, '#3f5044')}
      ${bottleGlyph(700, 632, 38, 84, '#385a63')}
      ${jarGlyph(840, 632, 60, 78, '#6b5a2e')}
      ${vial}
      <rect width="1200" height="800" fill="url(#swvig)"/>
    </svg>`;
  }

  // ---------- scene: the dispensary ----------

  function dispensary(S) {
    let drawers = '';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        drawers += `<g>
          <rect x="${330 + c * 96}" y="${300 + r * 68}" width="86" height="58" rx="4" fill="#4f3a2a" stroke="#241608" stroke-width="3"/>
          <circle cx="${373 + c * 96}" cy="${329 + r * 68}" r="5" fill="#c9a544"/>
        </g>`;
      }
    }
    const gate = S.flags.gateOpen ? `
      <rect x="1360" y="430" width="200" height="290" fill="#0d0906"/>
      <path d="M 1360 430 L 1420 460 L 1420 720 L 1360 720 Z" fill="#33302c" stroke="#1c1a17" stroke-width="4"/>
      <g stroke="#5a4a35" stroke-width="6">
        <line x1="1440" y1="500" x2="1560" y2="520"/>
        <line x1="1440" y1="570" x2="1560" y2="590"/>
        <line x1="1440" y1="640" x2="1560" y2="660"/>
      </g>
    ` : `
      <rect x="1360" y="430" width="200" height="290" fill="#1c1a17"/>
      <g stroke="#55524a" stroke-width="8">
        <line x1="1385" y1="436" x2="1385" y2="714"/>
        <line x1="1425" y1="436" x2="1425" y2="714"/>
        <line x1="1465" y1="436" x2="1465" y2="714"/>
        <line x1="1505" y1="436" x2="1505" y2="714"/>
        <line x1="1545" y1="436" x2="1545" y2="714"/>
        <line x1="1364" y1="470" x2="1556" y2="470"/>
        <line x1="1364" y1="680" x2="1556" y2="680"/>
      </g>
      <circle cx="1330" cy="560" r="26" fill="#33302c" stroke="#1c1a17" stroke-width="4"/>
      <rect x="1320" y="550" width="20" height="20" fill="#0d0906"/>
    `;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dpvig" cx="46%" cy="42%" r="80%">
          <stop offset="48%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.56"/>
        </radialGradient>
        <radialGradient id="dplamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d6ecd2" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#d6ecd2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#3d4a42"/>
      <rect x="0" y="700" width="1600" height="300" fill="#4a3626"/>
      <rect x="0" y="694" width="1600" height="12" fill="#2a1e14"/>

      <ellipse cx="700" cy="440" rx="520" ry="310" fill="url(#dplamp)"/>
      <line x1="700" y1="0" x2="700" y2="180" stroke="#241608" stroke-width="5"/>
      <path d="M 664 180 L 736 180 L 756 228 L 644 228 Z" fill="#3f3d36" stroke="#241608" stroke-width="4"/>
      <ellipse cx="700" cy="236" rx="54" ry="16" fill="#dff0da" opacity="0.5">
        <animate attributeName="opacity" values="0.42;0.55;0.42" dur="3.8s" repeatCount="indefinite"/>
      </ellipse>

      <!-- door back to shop -->
      <g>
        <rect x="60" y="180" width="210" height="530" fill="#16281f"/>
        <rect x="76" y="196" width="178" height="498" fill="#2c4438"/>
        <rect x="76" y="196" width="58" height="498" fill="#d8b56a" opacity="0.2"/>
        <path d="M 254 196 L 336 232 L 336 660 L 254 694 Z" fill="#243c33" stroke="#16281f" stroke-width="4"/>
        <circle cx="268" cy="446" r="8" fill="#c9a544"/>
      </g>

      <!-- drawer bank -->
      <g>
        <rect x="310" y="270" width="510" height="310" rx="8" fill="#553a27" stroke="#241608" stroke-width="5"/>
        ${drawers}
      </g>

      <!-- poison cabinet -->
      <g>
        <rect x="880" y="240" width="330" height="420" rx="10" fill="#1c1a17" stroke="#0d0906" stroke-width="6"/>
        <rect x="898" y="258" width="294" height="384" rx="6" fill="#26231e" stroke="#0d0906" stroke-width="3"/>
        ${S.flags.cabinetOpen ? `
          <rect x="898" y="258" width="294" height="384" rx="6" fill="#0d0906"/>
          <line x1="898" y1="386" x2="1192" y2="386" stroke="#3a2d1a" stroke-width="6"/>
          <line x1="898" y1="514" x2="1192" y2="514" stroke="#3a2d1a" stroke-width="6"/>
          ${jarGlyph(985, 378, 58, 84, '#385a63', 'DIGITALIS')}
          ${bottleGlyph(1100, 378, 34, 76, '#6b2f36')}
          ${S.flags.gallsTaken ? '' : `<g>
            <ellipse cx="980" cy="500" rx="44" ry="16" fill="#3c2817" stroke="#241608" stroke-width="3"/>
            <circle cx="962" cy="490" r="10" fill="#6b5a2e" stroke="#241608" stroke-width="2"/>
            <circle cx="986" cy="486" r="9" fill="#6b5a2e" stroke="#241608" stroke-width="2"/>
            <circle cx="1002" cy="494" r="10" fill="#6b5a2e" stroke="#241608" stroke-width="2"/>
          </g>`}
          ${S.flags.pageTaken ? '' : paperSheet(1060, 460, 96, 56, -6)}
          ${bottleGlyph(960, 630, 36, 80, '#4f5a3f')}
          ${jarGlyph(1080, 630, 62, 72, '#553a27')}
        ` : `
          <line x1="1045" y1="258" x2="1045" y2="642" stroke="#0d0906" stroke-width="6"/>
          <g fill="none" stroke="#8a8f9c" stroke-width="4">
            <path d="M 940 320 l 24 40 l -48 0 Z"/>
            <circle cx="940" cy="306" r="7"/>
            <line x1="928" y1="382" x2="952" y2="382"/>
          </g>
          <text x="1118" y="330" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="#8a8f9c" letter-spacing="2">POISONS</text>
          <!-- the balance lock -->
          <g>
            <circle cx="1045" cy="470" r="64" fill="#b08d3e" stroke="#8a6a30" stroke-width="5"/>
            <line x1="1005" y1="452" x2="1085" y2="452" stroke="#241608" stroke-width="5"/>
            <line x1="1045" y1="452" x2="1045" y2="430" stroke="#241608" stroke-width="5"/>
            <path d="M 1000 452 l -14 26 l 28 0 Z M 1076 452 l -14 26 l 28 0 Z" fill="#241608"/>
          </g>
          <rect x="952" y="560" width="186" height="54" rx="6" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
          <text x="1045" y="583" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#5f4718" font-style="italic">weigh my measure</text>
          <text x="1045" y="601" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#5f4718" font-style="italic">and be trusted</text>
        `}
      </g>

      <!-- workbench -->
      <g>
        <rect x="330" y="620" width="480" height="40" rx="6" fill="#6b4a2c" stroke="#241608" stroke-width="4"/>
        <rect x="352" y="660" width="28" height="130" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="760" y="660" width="28" height="130" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <path d="M 420 618 A 40 22 0 0 0 500 618 L 490 596 L 430 596 Z" fill="#d8cfae" stroke="#a89a78" stroke-width="3"/>
        ${bottleGlyph(580, 618, 36, 70, '#3f6b4f')}
        ${S.flags.brushTaken ? '' : `<g transform="rotate(-8 690 606)">
          <line x1="650" y1="610" x2="710" y2="600" stroke="#553a27" stroke-width="7" stroke-linecap="round"/>
          <path d="M 710 600 q 22 -4 30 4 q -10 8 -28 6 Z" fill="#26231e"/>
        </g>`}
      </g>

      <!-- cellar gate -->
      <g>${gate}</g>
      <text x="1460" y="410" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#8a7f66" letter-spacing="2">CELLAR</text>

      <rect width="1600" height="1000" fill="url(#dpvig)"/>
    </svg>`;
  }

  // ---------- zoom: the poison cabinet ----------

  function cabinetZoom(S) {
    const open = S.flags.cabinetOpen;
    const interior = open ? `
      <rect x="230" y="130" width="740" height="540" rx="10" fill="#0d0906" stroke="#3a2d1a" stroke-width="5"/>
      <line x1="230" y1="330" x2="970" y2="330" stroke="#3a2d1a" stroke-width="8"/>
      <line x1="230" y1="520" x2="970" y2="520" stroke="#3a2d1a" stroke-width="8"/>
      ${jarGlyph(390, 316, 130, 168, '#385a63', 'DIGITALIS')}
      ${S.flags.scrapingsTaken ? '' : `<ellipse cx="390" cy="252" rx="30" ry="8" fill="#8fae5c" opacity="0.5"/>`}
      ${bottleGlyph(600, 316, 62, 150, '#6b2f36')}
      ${jarGlyph(800, 316, 110, 140, '#553a27', 'LAUDANUM')}
      ${S.flags.gallsTaken ? '' : `<g>
        <ellipse cx="420" cy="492" rx="86" ry="28" fill="#3c2817" stroke="#241608" stroke-width="4"/>
        <circle cx="384" cy="474" r="19" fill="#6b5a2e" stroke="#241608" stroke-width="3"/>
        <circle cx="428" cy="466" r="17" fill="#6b5a2e" stroke="#241608" stroke-width="3"/>
        <circle cx="458" cy="480" r="18" fill="#6b5a2e" stroke="#241608" stroke-width="3"/>
        <text x="420" y="540" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#8a7f66" font-style="italic">oak galls</text>
      </g>`}
      ${S.flags.pageTaken ? '' : paperSheet(640, 430, 190, 108, -5)}
      ${bottleGlyph(320, 660, 56, 120, '#4f5a3f')}
      ${jarGlyph(560, 660, 96, 110, '#46584c')}
      ${bottleGlyph(780, 660, 48, 104, '#385a63')}
    ` : `
      <rect x="230" y="130" width="740" height="540" rx="10" fill="#26231e" stroke="#0d0906" stroke-width="5"/>
      <line x1="600" y1="130" x2="600" y2="670" stroke="#0d0906" stroke-width="8"/>
      <g fill="none" stroke="#8a8f9c" stroke-width="5">
        <path d="M 330 240 l 34 56 l -68 0 Z"/>
        <circle cx="330" cy="220" r="10"/>
        <line x1="312" y1="330" x2="348" y2="330"/>
      </g>
      <text x="800" y="250" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#8a8f9c" letter-spacing="4">POISONS</text>
      <!-- balance-lock escutcheon -->
      <g>
        <circle cx="600" cy="440" r="110" fill="#b08d3e" stroke="#8a6a30" stroke-width="6"/>
        <line x1="600" y1="440" x2="600" y2="392" stroke="#241608" stroke-width="7"/>
        <line x1="520" y1="440" x2="680" y2="440" stroke="#241608" stroke-width="7"/>
        <path d="M 505 440 l -22 40 l 44 0 Z M 651 440 l -22 40 l 44 0 Z" fill="#241608" opacity="0.85"/>
        <circle cx="600" cy="440" r="10" fill="#241608"/>
      </g>
    `;
    const plate = `
      <g>
        <rect x="330" y="694" width="540" height="86" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="4"/>
        <text x="600" y="726" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#5f4718" font-style="italic">Seven years an apprentice; one daughter raised;</text>
        <text x="600" y="748" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#5f4718" font-style="italic">five shops refused me. Weigh my measure, and be trusted.</text>
        <text x="600" y="770" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#5f4718">&mdash; J.B. &mdash; a proper chemist doubles his drachms</text>
      </g>`;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cbvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#33302c"/>
      <rect x="190" y="90" width="820" height="620" rx="14" fill="#1c1a17" stroke="#0d0906" stroke-width="6"/>
      ${interior}
      ${plate}
      <rect width="1200" height="800" fill="url(#cbvig)"/>
    </svg>`;
  }

  // ---------- zoom: the dispensary workbench ----------

  function workbenchZoom(S) {
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wbvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="170" fill="#3d4a42"/>
      <rect x="0" y="170" width="1200" height="630" fill="#6b4a2c"/>
      <line x1="0" y1="176" x2="1200" y2="176" stroke="#241608" stroke-width="8"/>
      <line x1="0" y1="410" x2="1200" y2="410" stroke="#5a3f28" stroke-width="3" opacity="0.5"/>

      <!-- mortar and pestle -->
      <g>
        <path d="M 220 380 A 90 48 0 0 0 400 380 L 382 320 L 238 320 Z" fill="#d8cfae" stroke="#a89a78" stroke-width="4"/>
        <ellipse cx="310" cy="322" rx="72" ry="16" fill="#c4b894"/>
        <line x1="368" y1="290" x2="420" y2="238" stroke="#a89a78" stroke-width="14" stroke-linecap="round"/>
      </g>

      <!-- balance scales, beam snapped -->
      <g>
        <rect x="540" y="356" width="150" height="18" rx="6" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <line x1="615" y1="356" x2="615" y2="250" stroke="#8a6a30" stroke-width="8"/>
        <line x1="615" y1="250" x2="700" y2="262" stroke="#8a6a30" stroke-width="7"/>
        <line x1="615" y1="250" x2="560" y2="234" stroke="#8a6a30" stroke-width="7"/>
        <path d="M 690 300 a 26 12 0 0 0 52 0 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <line x1="700" y1="262" x2="716" y2="298" stroke="#8a6a30" stroke-width="3"/>
        <text x="615" y="416" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#8a7f66" font-style="italic">beam snapped &mdash; weights gone</text>
      </g>

      <!-- green vitriol jar -->
      ${S.flags.vitriolTaken ? '' : `<g>
        ${jarGlyph(880, 380, 96, 130, '#3f6b4f', 'VITRIOL')}
        <ellipse cx="880" cy="330" rx="26" ry="8" fill="#8fae5c" opacity="0.7"/>
      </g>`}

      <!-- camel-hair brush -->
      ${S.flags.brushTaken ? '' : `<g transform="rotate(6 350 600)">
        <line x1="260" y1="606" x2="400" y2="590" stroke="#553a27" stroke-width="12" stroke-linecap="round"/>
        <path d="M 400 590 q 44 -8 62 8 q -20 16 -58 12 Z" fill="#26231e"/>
        <rect x="386" y="586" width="18" height="16" rx="3" fill="#c9a544"/>
      </g>`}

      <!-- spirit burner -->
      <g>
        <ellipse cx="700" cy="640" rx="54" ry="16" fill="#8a8f9c" stroke="#55524a" stroke-width="3"/>
        <rect x="682" y="576" width="36" height="52" rx="8" fill="#8a8f9c" stroke="#55524a" stroke-width="3"/>
        <path d="M 700 556 q -14 -26 0 -44 q 14 18 0 44" fill="#cfe4f0" opacity="0.8">
          <animate attributeName="opacity" values="0.65;0.9;0.72;0.88;0.65" dur="1.1s" repeatCount="indefinite"/>
        </path>
      </g>

      <!-- pill roller and bottles -->
      <g>
        <rect x="900" y="600" width="180" height="26" rx="8" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <g stroke="#241608" stroke-width="2">
          <line x1="920" y1="600" x2="920" y2="626"/><line x1="950" y1="600" x2="950" y2="626"/>
          <line x1="980" y1="600" x2="980" y2="626"/><line x1="1010" y1="600" x2="1010" y2="626"/>
          <line x1="1040" y1="600" x2="1040" y2="626"/>
        </g>
        ${bottleGlyph(1120, 400, 44, 100, '#46584c')}
        ${bottleGlyph(160, 640, 40, 92, '#385a63')}
      </g>

      <rect width="1200" height="800" fill="url(#wbvig)"/>
    </svg>`;
  }

  // ---------- scene: the cellar laboratory ----------

  function cellarLab(S) {
    let bricks = '';
    for (let y = 0; y < 730; y += 66) {
      bricks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#2b2622" stroke-width="4"/>`;
      const off = (y / 66) % 2 ? 72 : 0;
      for (let x = off; x < 1600; x += 144) {
        bricks += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 66}" stroke="#2b2622" stroke-width="3"/>`;
      }
    }
    let shelfBottles = '';
    const cols = ['#3f5044', '#6b5a2e', '#385a63', '#6b2f36', '#46584c', '#4f3a2a'];
    for (let i = 0; i < 6; i++) {
      shelfBottles += bottleGlyph(1000 + i * 78, 320, 34, 66 + (i % 3) * 14, cols[i]);
    }
    const studyDoor = S.flags.studyUnlocked ? `
      <rect x="1310" y="430" width="230" height="290" fill="#0d0906"/>
      <path d="M 1310 430 L 1380 462 L 1380 720 L 1310 720 Z" fill="#3a2a1a" stroke="#241608" stroke-width="4"/>
      <ellipse cx="1450" cy="580" rx="80" ry="90" fill="#ffdf9e" opacity="0.08"/>
    ` : `
      <rect x="1310" y="430" width="230" height="290" fill="#241608"/>
      <rect x="1324" y="444" width="202" height="276" fill="#3a2a1a" stroke="#241608" stroke-width="3"/>
      <rect x="1350" y="470" width="150" height="40" rx="4" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <text x="1425" y="496" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#5f4718" letter-spacing="1">J. BLACKWOOD</text>
      <g fill="#0d0906" stroke="#8a6a30" stroke-width="3">
        <rect x="1355" y="560" width="140" height="52" rx="8"/>
      </g>
      <text x="1425" y="594" text-anchor="middle" font-size="24" font-family="Georgia, serif" fill="#c9a544" letter-spacing="6">?????</text>
    `;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="clbvig" cx="42%" cy="42%" r="84%">
          <stop offset="38%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="730" fill="#3d3833"/>
      ${bricks}
      <rect x="0" y="730" width="1600" height="270" fill="#2c2620"/>
      <rect x="0" y="724" width="1600" height="10" fill="#1e1a15"/>

      <!-- stairs up -->
      <g>
        <polygon points="140,0 330,0 390,740 80,740" fill="#ffdf9e" opacity="0.07"/>
        <g fill="#4a3b2a" stroke="#2b2116" stroke-width="3">
          <rect x="140" y="620" width="220" height="34"/>
          <rect x="152" y="548" width="196" height="34"/>
          <rect x="164" y="476" width="172" height="34"/>
          <rect x="176" y="404" width="148" height="34"/>
          <rect x="188" y="332" width="124" height="34"/>
          <rect x="200" y="260" width="100" height="34"/>
        </g>
      </g>

      <!-- the alembic on its furnace -->
      <g>
        <rect x="500" y="560" width="240" height="160" rx="10" fill="#4a3b33" stroke="#241d18" stroke-width="5"/>
        <rect x="540" y="600" width="160" height="80" rx="8" fill="#1c1208"/>
        <path d="M 560 660 q 18 -34 40 0 q 20 -30 40 0 q 18 -26 36 0" fill="none" stroke="#e8843c" stroke-width="6" opacity="0.85">
          <animate attributeName="opacity" values="0.7;0.95;0.78;0.92;0.7" dur="1.6s" repeatCount="indefinite"/>
        </path>
        <ellipse cx="620" cy="470" rx="96" ry="86" fill="#b08d3e" stroke="#8a6a30" stroke-width="5"/>
        <path d="M 596 396 L 596 340 Q 620 316 644 340 L 644 396" fill="#b08d3e" stroke="#8a6a30" stroke-width="5"/>
        <path d="M 644 356 Q 760 350 812 430 L 812 500" fill="none" stroke="#b08d3e" stroke-width="12"/>
        ${bottleGlyph(812, 560, 44, 62, '#385a63')}
        <ellipse cx="620" cy="470" rx="60" ry="50" fill="#8fae5c" opacity="${S.flags.developerMade ? '0.55' : '0.18'}"/>
        <!-- the brew bubbles, gently -->
        <g fill="#cfe8c8">
          <circle cx="604" cy="495" r="5">
            <animate attributeName="cy" values="495;438" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.7;0" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="624" cy="498" r="4">
            <animate attributeName="cy" values="498;442" dur="3.3s" begin="1.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.6;0" dur="3.3s" begin="1.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="640" cy="492" r="3.5">
            <animate attributeName="cy" values="492;440" dur="2.9s" begin="1.9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.65;0" dur="2.9s" begin="1.9s" repeatCount="indefinite"/>
          </circle>
        </g>
        <!-- vapor wisp at the condenser -->
        <ellipse cx="812" cy="486" rx="11" ry="7" fill="#cfe8c8" opacity="0">
          <animate attributeName="cy" values="486;448" dur="4.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.3;0" dur="4.4s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      <!-- reagent shelf with recipe card -->
      <g>
        <rect x="950" y="328" width="520" height="18" fill="#553a27" stroke="#241608" stroke-width="4"/>
        ${shelfBottles}
        <g transform="rotate(-4 1090 400)">
          ${paperSheet(1030, 368, 120, 66)}
        </g>
      </g>

      <!-- study door -->
      <g>${studyDoor}</g>
      <text x="1425" y="410" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#8a7f66" letter-spacing="2">PRIVATE STUDY</text>

      <rect width="1600" height="1000" fill="url(#clbvig)"/>
    </svg>`;
  }

  // ---------- scene: the locked study ----------

  function study(S) {
    let spines = '';
    const spineCols = ['#6b2f36', '#3f5044', '#6b5a2e', '#4f3a2a', '#385a63', '#553a27'];
    for (let s = 0; s < 3; s++) {
      for (let i = 0; i < 9; i++) {
        const h = 66 + ((i * 7 + s * 3) % 4) * 8;
        spines += `<rect x="${1130 + i * 40}" y="${296 + s * 128 - h}" width="32" height="${h}" rx="3" fill="${spineCols[(i + s) % 6]}" stroke="#241608" stroke-width="2"/>`;
      }
      spines += `<rect x="1116" y="${300 + s * 128}" width="392" height="14" fill="#3c2817" stroke="#241608" stroke-width="3"/>`;
    }
    const bookcase = S.flags.bookcaseOpen ? `
      <rect x="1100" y="150" width="424" height="560" fill="#241608"/>
      <g transform="rotate(-24 1100 430)">
        <rect x="1100" y="150" width="220" height="560" fill="#3c2817" stroke="#241608" stroke-width="5"/>
      </g>
      <rect x="1320" y="170" width="200" height="520" fill="#0d0906"/>
      <ellipse cx="1430" cy="440" rx="90" ry="160" fill="#ffdf9e" opacity="0.1"/>
    ` : `
      <rect x="1100" y="150" width="424" height="560" fill="#3c2817" stroke="#241608" stroke-width="5"/>
      ${spines}
      <circle cx="1312" cy="672" r="26" fill="#c9a544" stroke="#8a6a30" stroke-width="4"/>
      <rect x="1300" y="660" width="24" height="24" rx="5" fill="#241608" transform="rotate(45 1312 672)"/>
    `;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="styvig" cx="45%" cy="45%" r="80%">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.58"/>
        </radialGradient>
        <radialGradient id="stylamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d6ecd2" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#d6ecd2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#43323a"/>
      <rect x="0" y="700" width="1600" height="300" fill="#4a3626"/>
      <rect x="0" y="694" width="1600" height="12" fill="#2a1e14"/>

      <!-- door back down -->
      <g>
        <rect x="60" y="180" width="200" height="530" fill="#241608"/>
        <rect x="76" y="196" width="168" height="498" fill="#4a3b22"/>
        <rect x="76" y="196" width="54" height="498" fill="#d8b56a" opacity="0.2"/>
        <circle cx="230" cy="446" r="8" fill="#c9a544"/>
      </g>

      <!-- desk with lamp, duplicate book, papers -->
      <g>
        <ellipse cx="600" cy="470" rx="300" ry="170" fill="url(#stylamp)"/>
        <rect x="330" y="600" width="30" height="180" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <rect x="820" y="600" width="30" height="180" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <rect x="310" y="540" width="570" height="64" rx="6" fill="#5a4028" stroke="#241608" stroke-width="4"/>
        <rect x="360" y="604" width="180" height="56" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <circle cx="450" cy="632" r="7" fill="#c9a544"/>
        <g>
          <rect x="500" y="430" width="14" height="80" fill="#2e2013"/>
          <path d="M 450 430 L 566 430 L 546 396 L 470 396 Z" fill="#2f6b4f" stroke="#1e4634" stroke-width="3"/>
          <ellipse cx="508" cy="438" rx="56" ry="14" fill="#b8e6c8" opacity="0.35">
            <animate attributeName="opacity" values="0.28;0.4;0.28" dur="4.6s" repeatCount="indefinite"/>
          </ellipse>
        </g>
        <!-- duplicate prescription book -->
        <g>
          <path d="M 596 536 Q 668 518 736 530 L 736 440 Q 668 426 596 440 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
          <path d="M 736 530 Q 804 518 876 536 L 876 446 Q 804 426 736 440 Z" fill="#e5dabb" stroke="#b9a97e" stroke-width="3"/>
          <line x1="736" y1="440" x2="736" y2="530" stroke="#b9a97e" stroke-width="4"/>
        </g>
        ${paperSheet(380, 500, 96, 44, -7)}
        ${paperSheet(760, 556, 90, 40, 9)}
      </g>

      <!-- coroner's reports pinned on the wall -->
      <g>
        ${paperSheet(340, 220, 130, 160, -2, '#5a6a7e')}
        ${paperSheet(490, 232, 130, 160, 3, '#5a6a7e')}
        <circle cx="405" cy="228" r="5" fill="#a33327"/>
        <circle cx="555" cy="240" r="5" fill="#a33327"/>
        <text x="480" y="206" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#b9ab8a" letter-spacing="1">CORONER'S FINDINGS</text>
      </g>

      <!-- tonic bottle on the side table -->
      <g>
        <rect x="900" y="560" width="150" height="20" rx="6" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <rect x="918" y="580" width="16" height="140" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="1016" y="580" width="16" height="140" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        ${S.flags.tonicTaken ? '' : `<g>
          ${bottleGlyph(975, 556, 44, 96, '#6b2f36')}
          <rect x="955" y="500" width="40" height="26" rx="3" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
        </g>`}
      </g>

      <!-- bookcase / hidden door -->
      <g>${bookcase}</g>

      <rect width="1600" height="1000" fill="url(#styvig)"/>
    </svg>`;
  }

  // ---------- scene: the compounding room (finale) ----------

  function compoundingRoom(S) {
    let bricks = '';
    for (let y = 0; y < 700; y += 72) {
      bricks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#3a2d24" stroke-width="3" opacity="0.7"/>`;
    }
    const draught = S.flags.proofDone ? `
      <ellipse cx="800" cy="472" rx="26" ry="10" fill="#4fae5c" opacity="0.9"/>
      <ellipse cx="800" cy="440" rx="40" ry="60" fill="#4fae5c" opacity="0.35">
        <animate attributeName="opacity" values="0.25;0.45;0.25" dur="3s" repeatCount="indefinite"/>
      </ellipse>
    ` : '';

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cprvig" cx="48%" cy="46%" r="80%">
          <stop offset="42%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
        <radialGradient id="cprlamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d6ecd2" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#d6ecd2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#4a3a30"/>
      ${bricks}
      <rect x="0" y="700" width="1600" height="300" fill="#52402f"/>
      <rect x="0" y="694" width="1600" height="10" fill="#33261c"/>

      <ellipse cx="800" cy="460" rx="600" ry="380" fill="url(#cprlamp)"/>

      <!-- lamp -->
      <g>
        <line x1="420" y1="0" x2="420" y2="150" stroke="#241608" stroke-width="5"/>
        <rect x="390" y="150" width="60" height="70" rx="10" fill="#2a2416" stroke="#8a6a30" stroke-width="3"/>
        <rect x="402" y="164" width="36" height="44" fill="#e0f0d8" opacity="0.7">
          <animate attributeName="opacity" values="0.6;0.78;0.6" dur="3.4s" repeatCount="indefinite"/>
        </rect>
      </g>

      <!-- the proof bench -->
      <g>
        <rect x="470" y="520" width="680" height="36" rx="6" fill="#5a4028" stroke="#241608" stroke-width="4"/>
        <rect x="500" y="556" width="26" height="180" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="1094" y="556" width="26" height="180" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <!-- retort stand and flask -->
        <line x1="700" y1="520" x2="700" y2="330" stroke="#55524a" stroke-width="8"/>
        <line x1="700" y1="350" x2="800" y2="370" stroke="#55524a" stroke-width="6"/>
        <path d="M 780 380 L 820 380 L 836 470 A 36 20 0 0 1 764 470 Z" fill="#c8d6e0" fill-opacity="0.35" stroke="#8a9ab0" stroke-width="4"/>
        ${draught}
        <!-- burner -->
        <ellipse cx="800" cy="512" rx="34" ry="10" fill="#8a8f9c" stroke="#55524a" stroke-width="3"/>
        <path d="M 800 500 q -10 -20 0 -34 q 10 14 0 34" fill="#8fb4e8" opacity="0.8">
          <animate attributeName="opacity" values="0.62;0.92;0.7;0.88;0.62" dur="0.9s" repeatCount="indefinite"/>
        </path>
        ${bottleGlyph(920, 516, 40, 88, '#8fae5c')}
        ${bottleGlyph(990, 516, 34, 72, '#6b2f36')}
        ${jarGlyph(1070, 516, 54, 66, '#46584c')}
        <text x="810" y="600" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#b9ab8a" font-style="italic">everything laid out, waiting for a steadier hand</text>
      </g>

      <!-- Josiah's last letter, propped against the lamp -->
      <g transform="rotate(-5 600 470)">
        ${paperSheet(560, 440, 110, 70)}
      </g>

      <!-- portrait of Mercy as a girl -->
      <g>
        <rect x="1240" y="240" width="150" height="180" fill="#3c2c1f" stroke="#241608" stroke-width="4"/>
        <rect x="1254" y="254" width="122" height="130" fill="#c9b89a"/>
        <circle cx="1315" cy="298" r="16" fill="#5a4a35"/>
        <path d="M 1298 314 L 1332 314 L 1340 352 L 1290 352 Z" fill="#5a4a35"/>
        <rect x="1254" y="390" width="122" height="18" fill="#e8dfc4"/>
      </g>

      <rect width="1600" height="1000" fill="url(#cprvig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const icons = {
    magnifier: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="14" fill="#b8e6c8" fill-opacity="0.25" stroke="#c9a544" stroke-width="5"/>
      <line x1="37" y1="37" x2="54" y2="54" stroke="#553a27" stroke-width="7" stroke-linecap="round"/>
    </svg>`,
    vial: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 14 L26 24 L18 46 A 8 8 0 0 0 26 54 L38 54 A 8 8 0 0 0 46 46 L38 24 L38 14 Z" fill="#9db4c9" fill-opacity="0.6" stroke="#55606e" stroke-width="3"/>
      <rect x="24" y="8" width="16" height="8" rx="2" fill="#8a6a30"/>
    </svg>`,
    winch: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 52 L14 30 L34 30 L34 18 L50 18" fill="none" stroke="#8a8578" stroke-width="7" stroke-linecap="round"/>
      <circle cx="14" cy="52" r="7" fill="#55524a"/>
    </svg>`,
    galls: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="34" r="11" fill="#6b5a2e" stroke="#41371c" stroke-width="3"/>
      <circle cx="42" cy="28" r="9" fill="#7a6836" stroke="#41371c" stroke-width="3"/>
      <circle cx="38" cy="46" r="10" fill="#6b5a2e" stroke="#41371c" stroke-width="3"/>
      <line x1="42" y1="19" x2="46" y2="12" stroke="#41371c" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    vitriol: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 54 L20 26 Q20 20 26 20 L38 20 Q44 20 44 26 L44 54 Z" fill="#3f6b4f" stroke="#1e4634" stroke-width="3"/>
      <rect x="24" y="10" width="16" height="10" rx="3" fill="#8a6a30"/>
      <path d="M26 40 l5 -8 l5 8 Z M36 46 l4 -6 l4 6 Z" fill="#8fae5c"/>
    </svg>`,
    brush: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="50" x2="40" y2="22" stroke="#553a27" stroke-width="6" stroke-linecap="round"/>
      <rect x="36" y="14" width="10" height="12" rx="2" fill="#c9a544" transform="rotate(45 41 20)"/>
      <path d="M44 18 q10 -8 14 -2 q-4 8 -12 8 Z" fill="#26231e"/>
    </svg>`,
    developer: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 14 L24 22 L16 44 A 8 8 0 0 0 24 52 L40 52 A 8 8 0 0 0 48 44 L40 22 L40 14 Z" fill="#2c3540" stroke="#55606e" stroke-width="3"/>
      <ellipse cx="32" cy="42" rx="10" ry="5" fill="#4a5e75"/>
      <rect x="22" y="8" width="20" height="8" rx="2" fill="#8a6a30"/>
    </svg>`,
    inkedBrush: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="50" x2="40" y2="22" stroke="#553a27" stroke-width="6" stroke-linecap="round"/>
      <path d="M44 18 q10 -8 14 -2 q-4 8 -12 8 Z" fill="#1c2733"/>
      <circle cx="52" cy="30" r="3" fill="#1c2733"/>
      <circle cx="47" cy="36" r="2" fill="#1c2733"/>
    </svg>`,
    blankPage: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="36" height="44" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <line x1="22" y1="44" x2="42" y2="44" stroke="#d8cbaa" stroke-width="2"/>
    </svg>`,
    scrapings: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 14 L26 24 L18 46 A 8 8 0 0 0 26 54 L38 54 A 8 8 0 0 0 46 46 L38 24 L38 14 Z" fill="#9db4c9" fill-opacity="0.4" stroke="#55606e" stroke-width="3"/>
      <ellipse cx="32" cy="47" rx="9" ry="4" fill="#8fae5c"/>
      <rect x="24" y="8" width="16" height="8" rx="2" fill="#8a6a30"/>
    </svg>`,
    sealRing: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="38" r="14" fill="none" stroke="#c9a544" stroke-width="6"/>
      <rect x="22" y="10" width="20" height="18" rx="4" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <path d="M28 15 L36 23 M36 15 L28 23" stroke="#5f4718" stroke-width="2.5"/>
    </svg>`,
    tonic: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 54 L22 30 L26 22 L26 12 L38 12 L38 22 L42 30 L42 54 Z" fill="#6b2f36" stroke="#4a2026" stroke-width="3"/>
      <rect x="26" y="6" width="12" height="8" rx="2" fill="#8a6a30"/>
      <rect x="25" y="34" width="14" height="12" rx="2" fill="#efe6cf"/>
    </svg>`,
    blackmail: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#8a7f66" stroke-width="2"/>
      <line x1="20" y1="34" x2="40" y2="34" stroke="#8a7f66" stroke-width="2"/>
      <circle cx="42" cy="42" r="7" fill="#1c1a1e"/>
    </svg>`,
  };

  return {
    shopFloor, ledgerZoom, shelfWallZoom, dispensary, cabinetZoom,
    workbenchZoom, cellarLab, study, compoundingRoom, icons,
  };
})();
