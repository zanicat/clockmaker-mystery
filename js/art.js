/* Art: SVG scene painters. Each painter takes the game state and returns an
   SVG string. Scenes use a 1600x1000 viewBox; zoom views use 1200x800. */
const Art = (() => {

  // ---------- helpers ----------

  function hand(cx, cy, len, deg, w, color) {
    const a = (deg - 90) * Math.PI / 180;
    const x2 = (cx + len * Math.cos(a)).toFixed(1);
    const y2 = (cy + len * Math.sin(a)).toFixed(1);
    return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  }

  // A clock face stopped at h:m.
  function clockFace(cx, cy, r, h, m, opts = {}) {
    const face = opts.face || '#f0e6cc';
    const rim = opts.rim || '#b08d3e';
    const ink = opts.ink || '#3a2f22';
    let ticks = '';
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180;
      const r1 = r * 0.8, r2 = r * 0.9;
      ticks += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + r2 * Math.sin(a)).toFixed(1)}" y2="${(cy - r2 * Math.cos(a)).toFixed(1)}" stroke="${ink}" stroke-width="${Math.max(1.5, r * 0.045).toFixed(1)}"/>`;
    }
    const hourDeg = (h % 12) * 30 + m * 0.5;
    const minDeg = m * 6;
    return `<g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${face}" stroke="${rim}" stroke-width="${Math.max(2, r * 0.09).toFixed(1)}"/>
      ${ticks}
      ${hand(cx, cy, r * 0.48, hourDeg, Math.max(2.5, r * 0.07), ink)}
      ${hand(cx, cy, r * 0.7, minDeg, Math.max(2, r * 0.05), ink)}
      <circle cx="${cx}" cy="${cy}" r="${Math.max(2, r * 0.06).toFixed(1)}" fill="${ink}"/>
    </g>`;
  }

  // Arch-topped mantel clock whose base sits at y + h.
  function mantelClock(x, y, w, h, hr, min, body = '#5b3d26') {
    const cx = x + w / 2;
    return `<g>
      <path d="M ${x} ${y + h} L ${x} ${y + w * 0.45} Q ${cx} ${y - w * 0.15} ${x + w} ${y + w * 0.45} L ${x + w} ${y + h} Z" fill="${body}" stroke="#2e2013" stroke-width="3"/>
      <rect x="${x - w * 0.08}" y="${y + h - 6}" width="${w * 1.16}" height="10" rx="3" fill="#2e2013"/>
      ${clockFace(cx, y + w * 0.45, w * 0.3, hr, min)}
    </g>`;
  }

  // A toothed gear with a dark hub, centered on cx,cy.
  function gearGlyph(cx, cy, r, fill = '#c9a544', stroke = '#8a6a30') {
    let teeth = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * 45 + 22) * Math.PI / 180;
      teeth += `<line x1="${(cx + r * Math.cos(a)).toFixed(1)}" y1="${(cy + r * Math.sin(a)).toFixed(1)}" x2="${(cx + r * 1.28 * Math.cos(a)).toFixed(1)}" y2="${(cy + r * 1.28 * Math.sin(a)).toFixed(1)}" stroke="${fill}" stroke-width="${Math.max(3, r * 0.28).toFixed(1)}"/>`;
    }
    return `<g>${teeth}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.32).toFixed(1)}" fill="#241608"/></g>`;
  }

  function stars(list, color = '#e9e2c8') {
    return list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="0.8"/>`).join('');
  }

  // ---------- title screen ----------

  function title() {
    let ticks = '';
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180;
      ticks += `<line x1="${(800 + 290 * Math.sin(a)).toFixed(1)}" y1="${(470 - 290 * Math.cos(a)).toFixed(1)}" x2="${(800 + 325 * Math.sin(a)).toFixed(1)}" y2="${(470 - 325 * Math.cos(a)).toFixed(1)}" stroke="#e6c568" stroke-width="4" opacity="0.2"/>`;
    }
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tbg" cx="50%" cy="38%" r="80%">
          <stop offset="0%" stop-color="#232c40"/>
          <stop offset="100%" stop-color="#0b0e15"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#tbg)"/>
      ${stars([[150, 120, 2], [340, 200, 1.6], [520, 90, 2.2], [700, 160, 1.4], [980, 110, 2], [1120, 220, 1.5], [1420, 140, 2], [1530, 260, 1.6], [240, 320, 1.4], [1330, 330, 1.8], [80, 450, 1.5], [1560, 480, 1.4]])}
      <circle cx="1250" cy="180" r="62" fill="#e9e2c8"/>
      <circle cx="1226" cy="168" r="56" fill="#141d33" opacity="0.92"/>
      <circle cx="800" cy="470" r="330" fill="none" stroke="#e6c568" stroke-width="3" opacity="0.18"/>
      ${ticks}
      <g opacity="0.3">
        ${hand(800, 470, 170, 7.25 * 30, 9, '#e6c568')}
        ${hand(800, 470, 245, 90, 7, '#e6c568')}
        <circle cx="800" cy="470" r="12" fill="#e6c568"/>
      </g>
      <path d="M0 860 L120 860 L120 775 L175 775 L175 860 L300 860 L365 760 L430 860 L560 860 L560 800 L600 800 L600 758 L640 758 L640 860 L820 860 L885 775 L950 860 L1080 860 L1080 790 L1140 790 L1140 860 L1255 860 L1320 765 L1385 860 L1600 860 L1600 1000 L0 1000 Z" fill="#07080c"/>
      <ellipse cx="800" cy="880" rx="700" ry="60" fill="#9aa4b8" opacity="0.05"/>
    </svg>`;
  }

  // ---------- scene: the shop floor ----------

  function shopfront(S) {
    let stripes = '';
    for (let x = 40; x < 1600; x += 90) {
      stripes += `<rect x="${x}" y="0" width="26" height="560" fill="#3f5044" opacity="0.6"/>`;
    }
    let planks = '';
    for (let y = 740; y < 1000; y += 52) {
      planks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#5a3f28" stroke-width="3"/>`;
    }
    for (let x = 100; x < 1600; x += 210) {
      planks += `<line x1="${x}" y1="700" x2="${x - 30}" y2="1000" stroke="#5a3f28" stroke-width="2" opacity="0.6"/>`;
    }

    // Rug slides aside once moved, revealing drag marks in the floor.
    const rugBody = `
      <ellipse cx="0" cy="0" rx="290" ry="82" fill="#7c3b3b" stroke="#5b2a2a" stroke-width="6"/>
      <ellipse cx="0" cy="0" rx="228" ry="60" fill="none" stroke="#c9a544" stroke-width="3" stroke-dasharray="16 12"/>
      <ellipse cx="0" cy="0" rx="150" ry="38" fill="#8d4646"/>`;
    const scratches = `
      <g stroke="#241608" stroke-width="5" fill="none" opacity="0.65" stroke-linecap="round">
        <path d="M 520 838 Q 800 812 1150 850"/>
        <path d="M 540 866 Q 820 842 1180 880"/>
        <path d="M 505 852 Q 760 830 1080 862"/>
      </g>`;
    const rug = S.flags.rugMoved
      ? `${scratches}<g transform="translate(360 892) rotate(-10)">${rugBody}</g>`
      : `<g transform="translate(430 855)">${rugBody}</g>`;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sfvig" cx="50%" cy="42%" r="78%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
        <radialGradient id="sflamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffdf9e" stop-opacity="0.16"/>
          <stop offset="100%" stop-color="#ffdf9e" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="1600" height="700" fill="#46584c"/>
      ${stripes}
      <rect x="0" y="560" width="1600" height="140" fill="#55402e"/>
      <rect x="0" y="556" width="1600" height="10" fill="#3c2c1f"/>
      <rect x="0" y="700" width="1600" height="300" fill="#6e4f33"/>
      <rect x="0" y="694" width="1600" height="12" fill="#3c2c1f"/>
      ${planks}

      <ellipse cx="800" cy="420" rx="560" ry="330" fill="url(#sflamp)"/>
      <g>
        <line x1="800" y1="0" x2="800" y2="88" stroke="#241608" stroke-width="6"/>
        <path d="M 758 88 L 842 88 L 866 140 L 734 140 Z" fill="#6d5133" stroke="#241608" stroke-width="4"/>
        <ellipse cx="800" cy="148" rx="66" ry="22" fill="#ffdf9e" opacity="0.5"/>
      </g>

      <!-- front door -->
      <g>
        <rect x="66" y="160" width="222" height="548" fill="#241608"/>
        <rect x="82" y="176" width="190" height="516" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="100" y="196" width="154" height="180" fill="#141d33" stroke="#8a6a30" stroke-width="3"/>
        <g transform="rotate(-4 177 296)">
          <rect x="127" y="268" width="100" height="56" rx="4" fill="#efe6cf" stroke="#7a5a3d" stroke-width="3"/>
          <text x="177" y="304" text-anchor="middle" font-size="22" font-family="Georgia, serif" fill="#553a27" letter-spacing="2">CLOSED</text>
        </g>
        <rect x="133" y="336" width="88" height="22" rx="3" fill="#c9a544" stroke="#8a6a30" stroke-width="2"/>
        <text x="177" y="352" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#5f4718">OPEN 9 &ndash; 6</text>
        <rect x="104" y="410" width="146" height="105" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <rect x="104" y="540" width="146" height="125" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <circle cx="256" cy="452" r="9" fill="#c9a544"/>
        <rect x="252" y="378" width="52" height="14" rx="6" fill="#c9a544" stroke="#8a6a30" stroke-width="2"/>
      </g>

      <!-- window onto the lane -->
      <g>
        <rect x="330" y="200" width="240" height="370" fill="#241608"/>
        <rect x="348" y="218" width="204" height="334" fill="#141d33"/>
        ${stars([[395, 260, 1.8], [520, 245, 1.5], [480, 330, 1.6], [420, 400, 1.3]])}
        <circle cx="478" cy="292" r="32" fill="#e9e2c8"/>
        <circle cx="464" cy="284" r="28" fill="#141d33" opacity="0.9"/>
        <line x1="450" y1="218" x2="450" y2="552" stroke="#241608" stroke-width="10"/>
        <line x1="348" y1="386" x2="552" y2="386" stroke="#241608" stroke-width="10"/>
        <path d="M 380 218 Q 358 300 382 400 Q 360 480 380 552 L 330 552 L 330 218 Z" fill="#6b2f36"/>
        <path d="M 520 218 Q 542 300 518 400 Q 540 480 520 552 L 570 552 L 570 218 Z" fill="#6b2f36"/>
        <rect x="320" y="564" width="260" height="16" rx="4" fill="#3c2c1f"/>
      </g>

      <!-- grandfather clock -->
      <g>
        <rect x="628" y="240" width="144" height="440" fill="#4a3122" stroke="#241608" stroke-width="4"/>
        <path d="M 612 252 L 612 200 Q 700 148 788 200 L 788 252 Z" fill="#553a27" stroke="#241608" stroke-width="4"/>
        <circle cx="700" cy="166" r="9" fill="#c9a544"/>
        ${clockFace(700, 315, 56, 7, 15)}
        <rect x="660" y="420" width="80" height="210" rx="10" fill="#1a1410" stroke="#8a6a30" stroke-width="3"/>
        <line x1="700" y1="440" x2="700" y2="565" stroke="#c9a544" stroke-width="4"/>
        <circle cx="700" cy="585" r="24" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <rect x="616" y="660" width="168" height="44" fill="#3c2817" stroke="#241608" stroke-width="4"/>
      </g>

      <!-- display shelves -->
      <g>
        <rect x="840" y="392" width="360" height="14" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <rect x="840" y="548" width="360" height="14" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <path d="M 856 406 l 0 26 l 22 -26 Z" fill="#3c2817"/>
        <path d="M 1178 406 l 0 26 l -22 -26 Z" fill="#3c2817"/>
        <path d="M 856 562 l 0 26 l 22 -26 Z" fill="#3c2817"/>
        <path d="M 1178 562 l 0 26 l -22 -26 Z" fill="#3c2817"/>
        ${mantelClock(858, 300, 84, 92, 7, 15)}
        <g>
          <rect x="972" y="318" width="70" height="74" rx="6" fill="#6d5133" stroke="#2e2013" stroke-width="3"/>
          <path d="M 992 318 Q 1007 296 1022 318" fill="none" stroke="#c9a544" stroke-width="5"/>
          ${clockFace(1007, 355, 24, 7, 15)}
        </g>
        <g>
          <circle cx="1104" cy="316" r="9" fill="#c9a544"/>
          <circle cx="1140" cy="316" r="9" fill="#c9a544"/>
          ${clockFace(1122, 356, 33, 7, 15)}
          <line x1="1104" y1="386" x2="1096" y2="392" stroke="#2e2013" stroke-width="4"/>
          <line x1="1140" y1="386" x2="1148" y2="392" stroke="#2e2013" stroke-width="4"/>
        </g>
        ${mantelClock(862, 472, 76, 76, 7, 15, '#4f3a2a')}
        <g>
          <rect x="986" y="474" width="54" height="74" rx="4" fill="#8a6a30" stroke="#2e2013" stroke-width="3"/>
          ${clockFace(1013, 505, 19, 7, 15)}
        </g>
        <rect x="1086" y="502" width="94" height="46" rx="3" fill="#4f3a2a" stroke="#2e2013" stroke-width="3"/>
        <rect x="1098" y="474" width="70" height="28" rx="3" fill="#553a27" stroke="#2e2013" stroke-width="3"/>
      </g>

      <!-- station clock on the wall -->
      <g transform="translate(-24 0)">
        <polygon points="1278,258 1322,276 1340,320 1322,364 1278,382 1234,364 1216,320 1234,276" fill="#3c2817" stroke="#241608" stroke-width="4"/>
        ${clockFace(1278, 320, 42, 7, 15)}
      </g>

      <!-- workshop door -->
      <g>
        <rect x="1324" y="150" width="232" height="560" fill="#241608"/>
        <rect x="1340" y="166" width="200" height="528" fill="#503823" stroke="#241608" stroke-width="3"/>
        <rect x="1368" y="210" width="144" height="54" rx="5" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <text x="1440" y="233" text-anchor="middle" font-size="17" font-family="Georgia, serif" fill="#5f4718" letter-spacing="1">WORKSHOP</text>
        <text x="1440" y="254" text-anchor="middle" font-size="13" font-family="Georgia, serif" fill="#5f4718" letter-spacing="2">PRIVATE</text>
        <rect x="1360" y="300" width="76" height="150" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <rect x="1446" y="300" width="76" height="150" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <rect x="1360" y="486" width="76" height="170" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <rect x="1446" y="486" width="76" height="170" fill="#3c2817" stroke="#241608" stroke-width="2"/>
        <circle cx="1364" cy="452" r="10" fill="#c9a544"/>
        <rect x="1352" y="466" width="22" height="36" rx="9" fill="#c9a544" stroke="#8a6a30" stroke-width="2"/>
        <circle cx="1363" cy="478" r="4.5" fill="#241608"/>
        <path d="M 1363 480 l -4 12 l 8 0 Z" fill="#241608"/>
      </g>

      ${rug}

      <!-- counter -->
      <g>
        <rect x="850" y="662" width="450" height="248" fill="#5a4028" stroke="#241608" stroke-width="4"/>
        <rect x="876" y="692" width="180" height="180" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="1094" y="692" width="180" height="180" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <g>
          <rect x="900" y="500" width="150" height="126" rx="10" fill="#6d5133" stroke="#241608" stroke-width="4"/>
          <rect x="908" y="470" width="134" height="36" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
          <circle cx="925" cy="545" r="5" fill="#241608"/><circle cx="950" cy="545" r="5" fill="#241608"/><circle cx="975" cy="545" r="5" fill="#241608"/><circle cx="1000" cy="545" r="5" fill="#241608"/><circle cx="1025" cy="545" r="5" fill="#241608"/>
          <circle cx="925" cy="568" r="5" fill="#241608"/><circle cx="950" cy="568" r="5" fill="#241608"/><circle cx="975" cy="568" r="5" fill="#241608"/><circle cx="1000" cy="568" r="5" fill="#241608"/><circle cx="1025" cy="568" r="5" fill="#241608"/>
          <circle cx="925" cy="591" r="5" fill="#241608"/><circle cx="950" cy="591" r="5" fill="#241608"/><circle cx="975" cy="591" r="5" fill="#241608"/><circle cx="1000" cy="591" r="5" fill="#241608"/><circle cx="1025" cy="591" r="5" fill="#241608"/>
          <line x1="1050" y1="540" x2="1078" y2="528" stroke="#241608" stroke-width="6"/>
          <circle cx="1082" cy="526" r="8" fill="#c9a544"/>
        </g>
        <g>
          <path d="M 1088 622 Q 1126 602 1160 620 L 1157 588 Q 1124 572 1091 590 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
          <path d="M 1160 620 Q 1194 602 1232 622 L 1229 590 Q 1196 572 1157 588 Z" fill="#e5dabb" stroke="#b9a97e" stroke-width="2"/>
        </g>
        <path d="M 1240 622 A 24 24 0 0 1 1288 622 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <circle cx="1264" cy="596" r="5" fill="#8a6a30"/>
        <rect x="836" y="622" width="478" height="44" rx="6" fill="#7a5a3d" stroke="#241608" stroke-width="4"/>
      </g>

      <rect width="1600" height="1000" fill="url(#sfvig)"/>
    </svg>`;
  }

  // ---------- zoom: the counter ----------

  function counterZoom(S) {
    let keys = '';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        keys += `<circle cx="${215 + c * 55}" cy="${300 + r * 55}" r="16" fill="#241608" stroke="#8a6a30" stroke-width="2"/>`;
      }
    }
    let rules = '';
    for (let i = 0; i < 5; i++) {
      rules += `<path d="M 620 ${230 + i * 40} Q 780 ${212 + i * 40} 940 ${230 + i * 40}" fill="none" stroke="#b9a97e" stroke-width="2" opacity="0.7"/>`;
    }
    const writing = `
      <g stroke="#4a3d2a" stroke-width="3" fill="none" opacity="0.85">
        <path d="M 640 250 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0"/>
        <path d="M 650 330 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0"/>
        <path d="M 640 410 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0 q 12 -10 24 0 q 12 10 24 0"/>
      </g>`;
    const key = S.flags.counterKeyTaken ? '' : `
      <g transform="rotate(7 620 700)">
        <rect x="560" y="668" width="26" height="60" fill="#d8cfae" opacity="0.75"/>
        <rect x="662" y="672" width="26" height="56" fill="#d8cfae" opacity="0.75"/>
        <circle cx="588" cy="700" r="17" fill="none" stroke="#c9a544" stroke-width="8"/>
        <line x1="604" y1="700" x2="668" y2="700" stroke="#c9a544" stroke-width="9" stroke-linecap="round"/>
        <rect x="644" y="700" width="9" height="16" fill="#c9a544"/>
        <rect x="660" y="700" width="9" height="13" fill="#c9a544"/>
      </g>`;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="czvig" cx="50%" cy="45%" r="75%">
          <stop offset="60%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="260" fill="#3d4c42"/>
      <rect x="0" y="260" width="1200" height="380" fill="#7a5a3d"/>
      <line x1="0" y1="392" x2="1200" y2="392" stroke="#5a3f28" stroke-width="3" opacity="0.6"/>
      <line x1="0" y1="520" x2="1200" y2="520" stroke="#5a3f28" stroke-width="3" opacity="0.6"/>
      <rect x="0" y="640" width="1200" height="160" fill="#4a3122"/>
      <rect x="0" y="636" width="1200" height="10" fill="#241608"/>

      <!-- register -->
      <g>
        <rect x="150" y="110" width="350" height="450" rx="14" fill="#6d5133" stroke="#241608" stroke-width="5"/>
        <rect x="176" y="60" width="298" height="70" rx="10" fill="#c9a544" stroke="#8a6a30" stroke-width="4"/>
        <text x="325" y="105" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#5f4718" letter-spacing="3">THORNFIELD'S</text>
        <rect x="190" y="160" width="270" height="90" rx="6" fill="#241608"/>
        <text x="325" y="222" text-anchor="middle" font-size="44" font-family="Georgia, serif" fill="#e6c568">0 . 0 0</text>
        ${keys}
        <line x1="500" y1="330" x2="556" y2="300" stroke="#241608" stroke-width="9"/>
        <circle cx="562" cy="296" r="13" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        ${S.flags.drawerOpened ? `
        <rect x="170" y="470" width="310" height="90" rx="8" fill="#1a1008" stroke="#241608" stroke-width="4"/>
        <rect x="150" y="552" width="350" height="104" rx="8" fill="#503823" stroke="#241608" stroke-width="4"/>
        <rect x="166" y="564" width="318" height="66" rx="4" fill="#2a1c10"/>
        <g fill="#c9a544" stroke="#8a6a30" stroke-width="2">
          <circle cx="222" cy="606" r="10"/><circle cx="248" cy="596" r="9"/><circle cx="272" cy="610" r="10"/>
          <circle cx="296" cy="600" r="9"/><circle cx="242" cy="618" r="9"/><circle cx="318" cy="612" r="10"/>
        </g>
        ${S.flags.drawerGearTaken ? '' : gearGlyph(408, 598, 24)}
        ` : `
        <rect x="170" y="470" width="310" height="90" rx="8" fill="#503823" stroke="#241608" stroke-width="4"/>
        <circle cx="325" cy="515" r="13" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <circle cx="325" cy="512" r="5" fill="#241608"/>
        <path d="M 325 514 l -4 12 l 8 0 Z" fill="#241608"/>
        `}
      </g>

      <!-- ledger -->
      <g>
        <path d="M 580 440 Q 690 408 795 424 L 795 180 Q 690 160 580 190 Z" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
        <path d="M 795 424 Q 900 408 1010 440 L 1010 190 Q 900 160 795 180 Z" fill="#e5dabb" stroke="#b9a97e" stroke-width="3"/>
        <line x1="795" y1="180" x2="795" y2="424" stroke="#b9a97e" stroke-width="4"/>
        <line x1="620" y1="200" x2="620" y2="420" stroke="#c96b5b" stroke-width="2" opacity="0.7"/>
        ${rules}
        ${writing}
      </g>

      <!-- counter bell -->
      <g>
        <ellipse cx="1090" cy="560" rx="58" ry="12" fill="#241608"/>
        <path d="M 1032 558 A 58 58 0 0 1 1148 558 Z" fill="#c9a544" stroke="#8a6a30" stroke-width="4"/>
        <circle cx="1090" cy="496" r="9" fill="#8a6a30"/>
      </g>

      ${key}
      <rect width="1200" height="800" fill="url(#czvig)"/>
    </svg>`;
  }

  // ---------- zoom: the grandfather clock ----------

  function grandfatherZoom(S) {
    let boards = '';
    for (let x = 0; x < 1200; x += 150) {
      boards += `<line x1="${x}" y1="0" x2="${x}" y2="800" stroke="#2e2013" stroke-width="4" opacity="0.6"/>`;
    }
    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gzvig" cx="50%" cy="42%" r="75%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#3c2817"/>
      ${boards}
      ${clockFace(600, 300, 218, 7, 15)}
      <text x="600" y="240" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#3a2f22">XII</text>
      <text x="600" y="392" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#3a2f22">VI</text>
      <text x="452" y="310" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#3a2f22">IX</text>
      <text x="748" y="310" text-anchor="middle" font-size="26" font-family="Georgia, serif" fill="#3a2f22">III</text>
      <text x="600" y="358" text-anchor="middle" font-size="15" font-family="Georgia, serif" fill="#6b5a3e" letter-spacing="2">THORNFIELD &amp; SONS</text>

      <rect x="410" y="558" width="380" height="66" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="4"/>
      <text x="600" y="586" text-anchor="middle" font-size="18" font-family="Georgia, serif" fill="#5f4718" font-style="italic">To E.T. &mdash; time keeps what we hide.</text>
      <text x="600" y="610" text-anchor="middle" font-size="16" font-family="Georgia, serif" fill="#5f4718" font-style="italic">&mdash; M.</text>

      ${S.flags.pendOpened ? `
      <rect x="470" y="648" width="260" height="132" rx="10" fill="#0d0906" stroke="#8a6a30" stroke-width="4"/>
      <rect x="494" y="666" width="34" height="100" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <rect x="542" y="666" width="34" height="100" rx="8" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      ${S.flags.gfGearTaken ? '' : gearGlyph(648, 732, 22)}
      ${S.flags.noteTaken ? '' : `<g transform="rotate(-8 660 676)">
        <rect x="614" y="656" width="84" height="44" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
        <line x1="624" y1="670" x2="690" y2="670" stroke="#8a7f66" stroke-width="2"/>
        <line x1="624" y1="682" x2="676" y2="682" stroke="#8a7f66" stroke-width="2"/>
      </g>`}
      <rect x="728" y="640" width="24" height="148" rx="4" fill="#1c1208" stroke="#8a6a30" stroke-width="3"/>
      ` : `
      <rect x="470" y="648" width="260" height="132" rx="10" fill="#2a1c10" stroke="#8a6a30" stroke-width="4"/>
      <circle cx="600" cy="708" r="9" fill="#0d0906" stroke="#c9a544" stroke-width="3"/>
      <path d="M 600 712 l -5 16 l 10 0 Z" fill="#0d0906" stroke="#c9a544" stroke-width="2"/>
      `}
      <rect width="1200" height="800" fill="url(#gzvig)"/>
    </svg>`;
  }

  // ---------- scene: the workshop ----------

  function workshop(S) {
    let gears = '';
    const gearSpots = [[520, 528, 26], [575, 540, 17], [660, 534, 21]];
    for (const [cx, cy, r] of gearSpots) {
      let teeth = '';
      for (let i = 0; i < 8; i++) {
        const a = i * 45 * Math.PI / 180;
        teeth += `<line x1="${(cx + r * Math.cos(a)).toFixed(1)}" y1="${(cy + r * Math.sin(a)).toFixed(1)}" x2="${(cx + (r + 7) * Math.cos(a)).toFixed(1)}" y2="${(cy + (r + 7) * Math.sin(a)).toFixed(1)}" stroke="#8a8578" stroke-width="5"/>`;
      }
      gears += `<g>${teeth}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#8a8578" stroke="#55524a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.35).toFixed(1)}" fill="#3f3d36"/></g>`;
    }

    const screwdriver = S.flags.screwdriverTaken ? '' : `
        <line x1="760" y1="546" x2="850" y2="530" stroke="#b8c0cc" stroke-width="7" stroke-linecap="round"/>
        <rect x="742" y="540" width="26" height="12" rx="4" fill="#7c3b3b"/>`;

    const oilCan = `
        <g ${S.flags.oilTipped ? 'transform="rotate(95 908 546)"' : ''}>
          <rect x="880" y="490" width="56" height="66" rx="6" fill="#4f5a3f" stroke="#26231e" stroke-width="3"/>
          <path d="M 936 500 Q 986 486 1000 520" fill="none" stroke="#4f5a3f" stroke-width="9"/>
          <circle cx="908" cy="484" r="9" fill="#26231e"/>
        </g>
        ${S.flags.oilTipped ? '<ellipse cx="866" cy="552" rx="62" ry="9" fill="#1c1208" opacity="0.8"/>' : ''}`;

    const crates = S.flags.cratePried ? `
        <rect x="1130" y="600" width="190" height="100" fill="#4a3b22" stroke="#241608" stroke-width="4"/>
        <line x1="1130" y1="650" x2="1320" y2="650" stroke="#241608" stroke-width="3"/>
        <rect x="1150" y="525" width="145" height="75" fill="#3a2d1a" stroke="#241608" stroke-width="4"/>
        <rect x="1160" y="533" width="125" height="59" fill="#1c1208"/>
        ${S.flags.crateCrankTaken ? '' : '<path d="M 1180 585 L 1180 552 L 1226 552 L 1226 540 L 1258 540" fill="none" stroke="#8a8578" stroke-width="9" stroke-linecap="round"/>'}
        ${S.flags.crateGearTaken ? '' : gearGlyph(1268, 570, 14)}
        <g transform="rotate(76 1330 640)"><rect x="1250" y="600" width="145" height="18" fill="#554430" stroke="#241608" stroke-width="3"/></g>
    ` : `
        <rect x="1130" y="600" width="190" height="100" fill="#4a3b22" stroke="#241608" stroke-width="4"/>
        <line x1="1130" y1="650" x2="1320" y2="650" stroke="#241608" stroke-width="3"/>
        <rect x="1150" y="525" width="145" height="75" fill="#554430" stroke="#241608" stroke-width="4"/>
        <g fill="#26231e">
          <circle cx="1160" cy="533" r="3"/><circle cx="1222" cy="531" r="3"/><circle cx="1285" cy="533" r="3"/>
          <circle cx="1160" cy="592" r="3"/><circle cx="1222" cy="594" r="3"/><circle cx="1285" cy="592" r="3"/>
        </g>
    `;

    const officeDoor = S.flags.officeUnlocked ? `
        <rect x="1380" y="170" width="200" height="530" fill="#241608"/>
        <rect x="1392" y="182" width="176" height="506" fill="#0d0906"/>
        <path d="M 1392 182 L 1470 214 L 1470 656 L 1392 688 Z" fill="#2e2013" stroke="#241608" stroke-width="3"/>
    ` : `
        <rect x="1380" y="170" width="200" height="530" fill="#241608"/>
        <rect x="1394" y="184" width="172" height="502" fill="#3a2a1a" stroke="#241608" stroke-width="3"/>
        <rect x="1406" y="226" width="148" height="40" rx="4" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <text x="1480" y="252" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="#5f4718" letter-spacing="1">E.T. &mdash; OFFICE</text>
        <rect x="1445" y="400" width="70" height="92" rx="8" fill="#b08d3e" stroke="#8a6a30" stroke-width="3"/>
        <circle cx="1480" cy="430" r="14" fill="#241608"/>
        <rect x="1472" y="456" width="16" height="16" fill="#241608" transform="rotate(45 1480 464)"/>
    `;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wsvig" cx="50%" cy="42%" r="78%">
          <stop offset="50%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
        <radialGradient id="wslamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffdf9e" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#ffdf9e" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#45443c"/>
      <rect x="0" y="700" width="1600" height="300" fill="#574230"/>
      <rect x="0" y="694" width="1600" height="12" fill="#332417"/>

      <ellipse cx="660" cy="480" rx="480" ry="300" fill="url(#wslamp)"/>
      <line x1="660" y1="0" x2="660" y2="200" stroke="#241608" stroke-width="5"/>
      <path d="M 622 200 L 698 200 L 720 250 L 600 250 Z" fill="#3f3d36" stroke="#241608" stroke-width="4"/>
      <ellipse cx="660" cy="258" rx="58" ry="18" fill="#ffdf9e" opacity="0.5"/>

      <!-- door back to the shop floor -->
      <g>
        <rect x="60" y="180" width="210" height="530" fill="#241608"/>
        <rect x="76" y="196" width="178" height="498" fill="#4a3b22"/>
        <rect x="76" y="196" width="60" height="498" fill="#d8b56a" opacity="0.25"/>
        <path d="M 254 196 L 336 232 L 336 660 L 254 694 Z" fill="#503823" stroke="#241608" stroke-width="4"/>
        <circle cx="268" cy="446" r="8" fill="#c9a544"/>
      </g>

      <!-- tool board -->
      <g>
        <rect x="300" y="250" width="520" height="220" rx="8" fill="#3d3730" stroke="#241608" stroke-width="5"/>
        <g fill="#26231e" stroke="#26231e">
          <rect x="340" y="290" width="16" height="110" rx="4"/>
          <rect x="316" y="290" width="64" height="26" rx="6"/>
          <path d="M 440 300 L 560 300 L 560 322 L 470 350 L 440 330 Z"/>
        </g>
        <g fill="none" stroke="#d8cfae" stroke-width="3" stroke-dasharray="7 6" opacity="0.8">
          <circle cx="640" cy="310" r="20"/>
          <path d="M 640 330 L 640 380 L 700 380 L 700 430"/>
          <circle cx="700" cy="446" r="14"/>
        </g>
      </g>

      <!-- workbench -->
      <g>
        <rect x="270" y="600" width="34" height="190" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="1000" y="600" width="34" height="190" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="250" y="556" width="810" height="48" rx="6" fill="#6b4a2c" stroke="#241608" stroke-width="4"/>
        <rect x="290" y="660" width="724" height="20" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        ${gears}
        ${screwdriver}
        ${oilCan}
        <g>
          <rect x="390" y="520" width="70" height="36" rx="5" fill="#3f3d36" stroke="#26231e" stroke-width="3"/>
          <rect x="404" y="498" width="42" height="26" rx="4" fill="#3f3d36" stroke="#26231e" stroke-width="3"/>
          <circle cx="425" cy="537" r="10" fill="#26231e"/>
        </g>
      </g>

      <!-- barred window -->
      <g>
        <rect x="1180" y="240" width="180" height="280" fill="#241608"/>
        <rect x="1194" y="254" width="152" height="252" fill="#141d33"/>
        <circle cx="1300" cy="310" r="22" fill="#e9e2c8"/>
        <circle cx="1290" cy="304" r="19" fill="#141d33" opacity="0.9"/>
        <line x1="1270" y1="254" x2="1270" y2="506" stroke="#241608" stroke-width="8"/>
        <line x1="1194" y1="380" x2="1346" y2="380" stroke="#241608" stroke-width="8"/>
        <g stroke="#26231e" stroke-width="7">
          <line x1="1224" y1="254" x2="1224" y2="506"/>
          <line x1="1310" y1="254" x2="1310" y2="506"/>
        </g>
      </g>

      <!-- crates -->
      <g>${crates}</g>

      <!-- office door -->
      <g>${officeDoor}</g>

      <rect width="1600" height="1000" fill="url(#wsvig)"/>
    </svg>`;
  }

  // ---------- zoom: the workbench ----------

  function benchZoom(S) {
    const screwdriver = S.flags.screwdriverTaken ? '' : `
      <g transform="rotate(14 370 585)">
        <rect x="255" y="566" width="95" height="30" rx="12" fill="#7c3b3b" stroke="#241608" stroke-width="3"/>
        <rect x="350" y="574" width="122" height="13" fill="#b8c0cc" stroke="#55524a" stroke-width="2"/>
        <path d="M 472 572 L 504 568 L 504 592 L 472 588 Z" fill="#b8c0cc" stroke="#55524a" stroke-width="2"/>
      </g>`;
    const rag = S.flags.ragTaken ? '' : `
      <path d="M 858 648 q 26 -44 66 -22 q 48 -16 64 18 q 34 24 -8 42 q -28 22 -62 8 q -48 10 -60 -20 q -18 -14 0 -26 Z" fill="#d8cfae" stroke="#a89a78" stroke-width="3"/>
      <path d="M 890 650 q 22 -12 46 0 M 880 672 q 30 12 62 -2" fill="none" stroke="#a89a78" stroke-width="2"/>`;
    const canBody = `
      <path d="M 990 330 L 1012 226 L 1068 226 L 1090 330 Z" fill="#4f5a3f" stroke="#26231e" stroke-width="4"/>
      <rect x="1024" y="200" width="32" height="28" rx="6" fill="#3f4a33" stroke="#26231e" stroke-width="3"/>
      <line x1="1014" y1="248" x2="942" y2="186" stroke="#4f5a3f" stroke-width="8" stroke-linecap="round"/>
      <path d="M 1086 262 Q 1122 274 1112 310" fill="none" stroke="#4f5a3f" stroke-width="7"/>`;
    const oil = S.flags.oilTipped ? `
      <ellipse cx="940" cy="392" rx="150" ry="26" fill="#1c1208" opacity="0.85"/>
      ${S.flags.greasyGearTaken ? '' : gearGlyph(878, 388, 26, '#8a7328', '#55462a')}
      <g transform="rotate(100 1040 330)">${canBody}</g>
    ` : canBody;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bzvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="170" fill="#3a362e"/>
      <rect x="0" y="170" width="1200" height="630" fill="#6b4a2c"/>
      <line x1="0" y1="340" x2="1200" y2="340" stroke="#5a3f28" stroke-width="3" opacity="0.5"/>
      <line x1="0" y1="530" x2="1200" y2="530" stroke="#5a3f28" stroke-width="3" opacity="0.5"/>
      <line x1="0" y1="176" x2="1200" y2="176" stroke="#241608" stroke-width="8"/>

      <!-- parts tray -->
      <g>
        <rect x="225" y="185" width="175" height="82" rx="8" fill="#4a3122" stroke="#241608" stroke-width="4"/>
        <g fill="#b8c0cc">
          <circle cx="258" cy="215" r="4"/><circle cx="284" cy="232" r="3"/><circle cx="312" cy="212" r="4"/>
          <circle cx="340" cy="236" r="3"/><circle cx="364" cy="218" r="4"/><circle cx="300" cy="250" r="3"/>
        </g>
      </g>

      <!-- half-dismantled movement -->
      <g>
        <circle cx="600" cy="400" r="135" fill="#b08d3e" stroke="#8a6a30" stroke-width="5"/>
        <circle cx="600" cy="400" r="120" fill="none" stroke="#8a6a30" stroke-width="2" opacity="0.6"/>
        ${gearGlyph(560, 366, 26, '#b8c0cc', '#8a8f9c')}
        ${gearGlyph(662, 432, 19, '#b8c0cc', '#8a8f9c')}
        <g fill="#241608">
          <circle cx="540" cy="452" r="7"/><circle cx="622" cy="330" r="7"/><circle cx="678" cy="368" r="7"/>
        </g>
        <g fill="#8a6a30">
          <circle cx="600" cy="278" r="5"/><circle cx="600" cy="522" r="5"/>
          <circle cx="478" cy="400" r="5"/><circle cx="722" cy="400" r="5"/>
        </g>
      </g>

      <!-- tweezers -->
      <g stroke="#b8c0cc" stroke-width="6" stroke-linecap="round">
        <line x1="352" y1="268" x2="418" y2="338"/>
        <line x1="368" y1="256" x2="424" y2="330"/>
      </g>

      <!-- mainspring -->
      <g fill="none" stroke="#8a8f9c">
        <circle cx="800" cy="272" r="42" stroke-width="6"/>
        <circle cx="800" cy="272" r="28" stroke-width="5"/>
        <circle cx="800" cy="272" r="15" stroke-width="4"/>
        <line x1="840" y1="284" x2="878" y2="308" stroke-width="6" stroke-linecap="round"/>
      </g>

      ${screwdriver}
      ${rag}
      ${oil}
      <rect width="1200" height="800" fill="url(#bzvig)"/>
    </svg>`;
  }

  // ---------- zoom: the display shelves ----------

  function shelfZoom(S) {
    let stripes = '';
    for (let x = 30; x < 1200; x += 90) {
      stripes += `<rect x="${x}" y="0" width="26" height="800" fill="#3f5044" opacity="0.6"/>`;
    }
    const alarmBack = !S.flags.alarmOpened ? '' : `
      <rect x="985" y="415" width="22" height="110" rx="5" fill="#1c1208" stroke="#8a6a30" stroke-width="3"/>`;
    const tinyKey = (S.flags.alarmOpened && !S.flags.tinyKeyTaken) ? `
      <g stroke="#b8c0cc" stroke-width="5" stroke-linecap="round" fill="none">
        <circle cx="1034" cy="546" r="8"/>
        <line x1="1042" y1="546" x2="1072" y2="546"/>
        <line x1="1062" y1="546" x2="1062" y2="554"/>
        <line x1="1070" y1="546" x2="1070" y2="553"/>
      </g>
      <path d="M 1026 542 q -14 -10 -8 -22" fill="none" stroke="#6b2f36" stroke-width="4"/>` : '';

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="szvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#46584c"/>
      ${stripes}
      <rect x="40" y="560" width="1120" height="28" fill="#553a27" stroke="#241608" stroke-width="4"/>
      <path d="M 80 588 l 0 40 l 34 -40 Z" fill="#3c2817"/>
      <path d="M 1120 588 l 0 40 l -34 -40 Z" fill="#3c2817"/>

      ${mantelClock(170, 320, 210, 240, 7, 15)}

      <!-- carriage clock -->
      <g>
        <rect x="480" y="388" width="170" height="172" rx="8" fill="#6d5133" stroke="#2e2013" stroke-width="4"/>
        <path d="M 525 388 Q 565 340 605 388" fill="none" stroke="#c9a544" stroke-width="9"/>
        ${clockFace(565, 472, 56, 7, 15)}
      </g>

      <!-- alarm clock -->
      <g>
        <circle cx="858" cy="380" r="22" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <circle cx="942" cy="380" r="22" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <line x1="900" y1="368" x2="900" y2="388" stroke="#241608" stroke-width="5"/>
        ${clockFace(900, 468, 80, 7, 15)}
        <line x1="846" y1="536" x2="828" y2="560" stroke="#2e2013" stroke-width="7"/>
        <line x1="954" y1="536" x2="972" y2="560" stroke="#2e2013" stroke-width="7"/>
        ${alarmBack}
      </g>
      ${tinyKey}
      <rect width="1200" height="800" fill="url(#szvig)"/>
    </svg>`;
  }

  // ---------- zoom: the clock lock (office door plate) ----------

  function clockLockZoom(S) {
    let boards = '';
    for (let x = 60; x < 1200; x += 190) {
      boards += `<line x1="${x}" y1="0" x2="${x}" y2="800" stroke="#241608" stroke-width="5" opacity="0.6"/>`;
    }
    const seats = [[330, 540], [480, 430], [630, 320], [780, 210]];
    const seated = S.flags.gearsSeated || 0;
    let sockets = '';
    for (let i = 0; i < 4; i++) {
      const [x, y] = seats[i];
      sockets += `<circle cx="${x}" cy="${y}" r="58" fill="#3a2c14" stroke="#241608" stroke-width="4"/>
        <rect x="${x - 8}" y="${y - 8}" width="16" height="16" fill="#241608" transform="rotate(45 ${x} ${y})"/>`;
      if (i < seated) sockets += gearGlyph(x, y, 46);
    }
    const crank = !S.flags.crankSeated ? '' : `
      <g stroke="#55524a" stroke-width="14" stroke-linecap="round" fill="none">
        <path d="M 600 618 L 600 540 L 690 540"/>
      </g>
      <circle cx="690" cy="540" r="15" fill="#3f3d36" stroke="#26231e" stroke-width="3"/>`;

    return `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="clvig" cx="50%" cy="45%" r="75%">
          <stop offset="58%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#3a2a1a"/>
      ${boards}
      <rect x="170" y="100" width="860" height="600" rx="24" fill="#b08d3e" stroke="#8a6a30" stroke-width="6"/>
      <rect x="200" y="130" width="800" height="540" rx="14" fill="#9c7c36" stroke="#8a6a30" stroke-width="3"/>
      <text x="435" y="178" text-anchor="middle" font-size="19" font-family="Georgia, serif" fill="#5f4718" letter-spacing="2">THORNFIELD PATENT LOCK &mdash; No. 7</text>

      ${sockets}

      <rect x="570" y="590" width="60" height="60" rx="6" fill="#6b5a2e" stroke="#241608" stroke-width="4"/>
      <rect x="588" y="608" width="24" height="24" fill="#241608"/>
      ${crank}

      <circle cx="905" cy="480" r="102" fill="#6b5a2e" stroke="#241608" stroke-width="4"/>
      ${clockFace(905, 480, 84, S.flags.dialH || 12, S.flags.dialM || 0)}

      <rect width="1200" height="800" fill="url(#clvig)"/>
    </svg>`;
  }

  // ---------- scene: the back office ----------

  function office(S) {
    let dialTicks = '';
    for (let i = 0; i < 12; i++) {
      const a = i * 30 * Math.PI / 180;
      dialTicks += `<line x1="${(1300 + 30 * Math.sin(a)).toFixed(1)}" y1="${(588 - 30 * Math.cos(a)).toFixed(1)}" x2="${(1300 + 38 * Math.sin(a)).toFixed(1)}" y2="${(588 - 38 * Math.cos(a)).toFixed(1)}" stroke="#d8cfae" stroke-width="3"/>`;
    }

    const safeFront = S.flags.safeOpened ? `
        <rect x="1176" y="456" width="248" height="298" fill="#17191c" stroke="#1e2023" stroke-width="4"/>
        <line x1="1176" y1="606" x2="1424" y2="606" stroke="#000" stroke-width="5"/>
        <rect x="1200" y="478" width="130" height="44" rx="4" fill="none" stroke="#2f6b4f" stroke-width="3" stroke-dasharray="8 6"/>
        ${S.flags.grimsbyTaken ? '' : `<g transform="rotate(-4 1272 568)">
          <rect x="1228" y="544" width="88" height="48" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
          <circle cx="1258" cy="568" r="9" fill="#a33327"/>
        </g>`}
        ${S.flags.padlockKeyTaken ? '' : `<g stroke="#8a8f9c" stroke-width="6" stroke-linecap="round" fill="none">
          <circle cx="1332" cy="668" r="11"/>
          <line x1="1343" y1="668" x2="1388" y2="668"/>
          <line x1="1376" y1="668" x2="1376" y2="680"/>
          <line x1="1387" y1="668" x2="1387" y2="678"/>
        </g>`}
        <rect x="1436" y="440" width="38" height="336" fill="#2b2d31" stroke="#1e2023" stroke-width="4"/>
    ` : `
        <rect x="1176" y="456" width="248" height="298" fill="none" stroke="#1e2023" stroke-width="4"/>
        <circle cx="1300" cy="588" r="52" fill="#2b2d31" stroke="#1e2023" stroke-width="4"/>
        <circle cx="1300" cy="588" r="40" fill="#3a3d42" stroke="#d8cfae" stroke-width="2"/>
        ${dialTicks}
        <circle cx="1300" cy="588" r="7" fill="#d8cfae"/>
        <rect x="1370" y="566" width="46" height="16" rx="7" fill="#8a8f9c"/>
        <text x="1300" y="500" text-anchor="middle" font-size="19" font-family="Georgia, serif" fill="#8a8f9c" letter-spacing="2">MILLER &amp; SONS</text>
    `;

    const trapdoor = S.flags.trapdoorOpened ? `
        <rect x="852" y="690" width="36" height="116" fill="#3f2f20" stroke="#241608" stroke-width="4"/>
        <rect x="888" y="800" width="204" height="86" fill="#0d0906" stroke="#241608" stroke-width="4"/>
        <line x1="920" y1="828" x2="1060" y2="828" stroke="#5a4a35" stroke-width="5"/>
        <line x1="928" y1="858" x2="1052" y2="858" stroke="#5a4a35" stroke-width="5"/>
    ` : `
        <rect x="870" y="800" width="220" height="86" fill="#3f2f20" stroke="#241608" stroke-width="4"/>
        <line x1="925" y1="800" x2="925" y2="886" stroke="#241608" stroke-width="3"/>
        <line x1="1035" y1="800" x2="1035" y2="886" stroke="#241608" stroke-width="3"/>
        <circle cx="985" cy="842" r="15" fill="none" stroke="#8a8f9c" stroke-width="6"/>
        <rect x="930" y="824" width="20" height="12" fill="#8a8f9c"/>
        ${S.flags.trapdoorUnlocked ? '' : `<g>
          <path d="M 918 826 a 10 10 0 0 1 20 0" fill="none" stroke="#8a6a30" stroke-width="5"/>
          <rect x="912" y="826" width="32" height="26" rx="5" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        </g>`}
    `;
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ofvig" cx="45%" cy="45%" r="80%">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
        </radialGradient>
        <radialGradient id="oflamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#b8e6c8" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#b8e6c8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#3f3a45"/>
      <rect x="0" y="700" width="1600" height="300" fill="#4a3626"/>
      <rect x="0" y="694" width="1600" height="12" fill="#2a1e14"/>
      <rect x="0" y="560" width="1600" height="140" fill="#463225"/>
      <rect x="0" y="556" width="1600" height="8" fill="#2a1e14"/>

      <!-- door back to workshop -->
      <g>
        <rect x="60" y="180" width="200" height="530" fill="#241608"/>
        <rect x="76" y="196" width="168" height="498" fill="#4a3b22"/>
        <rect x="76" y="196" width="54" height="498" fill="#d8b56a" opacity="0.22"/>
        <circle cx="230" cy="446" r="8" fill="#c9a544"/>
      </g>

      <!-- shuttered window -->
      <g>
        <rect x="850" y="200" width="200" height="240" fill="#241608"/>
        <rect x="862" y="212" width="86" height="216" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <rect x="952" y="212" width="86" height="216" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <g stroke="#241608" stroke-width="3">
          <line x1="866" y1="240" x2="944" y2="240"/><line x1="866" y1="268" x2="944" y2="268"/>
          <line x1="866" y1="296" x2="944" y2="296"/><line x1="866" y1="324" x2="944" y2="324"/>
          <line x1="866" y1="352" x2="944" y2="352"/><line x1="866" y1="380" x2="944" y2="380"/>
          <line x1="956" y1="240" x2="1034" y2="240"/><line x1="956" y1="268" x2="1034" y2="268"/>
          <line x1="956" y1="296" x2="1034" y2="296"/><line x1="956" y1="324" x2="1034" y2="324"/>
          <line x1="956" y1="352" x2="1034" y2="352"/><line x1="956" y1="380" x2="1034" y2="380"/>
        </g>
        <rect x="936" y="300" width="28" height="12" rx="4" fill="#c9a544"/>
      </g>

      <!-- desk -->
      <g>
        <ellipse cx="520" cy="470" rx="260" ry="150" fill="url(#oflamp)"/>
        <rect x="320" y="600" width="30" height="180" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <rect x="750" y="600" width="30" height="180" fill="#3c2c1f" stroke="#241608" stroke-width="3"/>
        <rect x="300" y="540" width="500" height="64" rx="6" fill="#5a4028" stroke="#241608" stroke-width="4"/>
        <rect x="340" y="620" width="140" height="60" fill="#4a3122" stroke="#241608" stroke-width="3" transform="rotate(-8 410 650)"/>
        <rect x="620" y="616" width="140" height="70" fill="#4a3122" stroke="#241608" stroke-width="3" transform="rotate(5 690 650)"/>
        <g fill="#efe6cf" stroke="#b9a97e" stroke-width="2">
          <rect x="380" y="502" width="90" height="40" transform="rotate(-6 425 522)"/>
          <rect x="600" y="506" width="96" height="38" transform="rotate(9 648 525)"/>
          <rect x="250" y="750" width="100" height="44" transform="rotate(-14 300 772)"/>
          <rect x="700" y="760" width="90" height="40" transform="rotate(18 745 780)"/>
        </g>
        <g>
          <rect x="490" y="430" width="14" height="80" fill="#2e2013"/>
          <path d="M 440 430 L 556 430 L 536 396 L 460 396 Z" fill="#2f6b4f" stroke="#1e4634" stroke-width="3"/>
          <ellipse cx="498" cy="438" rx="56" ry="14" fill="#b8e6c8" opacity="0.35"/>
          <rect x="470" y="504" width="60" height="12" rx="5" fill="#8a6a30"/>
        </g>
      </g>

      <!-- framed photograph -->
      <g>
        <rect x="620" y="240" width="140" height="140" fill="#3c2c1f" stroke="#241608" stroke-width="4"/>
        <rect x="634" y="254" width="112" height="94" fill="#c9b89a"/>
        <line x1="640" y1="330" x2="740" y2="330" stroke="#8a7a5e" stroke-width="4"/>
        <circle cx="688" cy="292" r="12" fill="#5a4a35"/>
        <path d="M 676 304 L 700 304 L 706 330 L 670 330 Z" fill="#5a4a35"/>
        <rect x="634" y="354" width="112" height="16" fill="#e8dfc4"/>
      </g>

      <!-- framed certificate -->
      <g>
        <rect x="1085" y="225" width="140" height="150" fill="#3c2c1f" stroke="#241608" stroke-width="4"/>
        <rect x="1099" y="239" width="112" height="122" fill="#e8dfc4"/>
        <g stroke="#8a7a5e" stroke-width="3">
          <line x1="1112" y1="262" x2="1198" y2="262"/>
          <line x1="1112" y1="282" x2="1198" y2="282"/>
          <line x1="1112" y1="302" x2="1180" y2="302"/>
          <line x1="1112" y1="322" x2="1190" y2="322"/>
        </g>
        <circle cx="1188" cy="344" r="9" fill="#a33327"/>
      </g>

      <!-- iron safe -->
      <g>
        <rect x="1150" y="430" width="300" height="350" fill="#3a3d42" stroke="#1e2023" stroke-width="6"/>
        <rect x="1150" y="422" width="300" height="14" fill="#1e2023"/>
        ${safeFront}
      </g>

      <!-- trade card on the desk -->
      <g transform="rotate(-6 590 532)">
        <rect x="555" y="515" width="70" height="34" fill="#efe6cf" stroke="#b9a97e" stroke-width="2"/>
        <line x1="563" y1="526" x2="617" y2="526" stroke="#8a7f66" stroke-width="2"/>
        <line x1="567" y1="536" x2="613" y2="536" stroke="#8a7f66" stroke-width="2"/>
      </g>

      <!-- mabel's letter among the floor papers -->
      ${S.flags.mabelLetterFound ? '' : `<g transform="rotate(-5 342 765)">
        <rect x="300" y="745" width="84" height="40" fill="#dfe6ef" stroke="#8a9ab0" stroke-width="2"/>
        <line x1="308" y1="758" x2="374" y2="758" stroke="#8a9ab0" stroke-width="2"/>
        <line x1="308" y1="770" x2="362" y2="770" stroke="#8a9ab0" stroke-width="2"/>
      </g>`}

      <!-- trapdoor -->
      <g>${trapdoor}</g>

      <rect width="1600" height="1000" fill="url(#ofvig)"/>
    </svg>`;
  }

  // ---------- scene: the cellar ----------

  function cellar(S) {
    let bricks = '';
    for (let y = 0; y < 730; y += 68) {
      bricks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#332e2a" stroke-width="4"/>`;
      const off = (y / 68) % 2 ? 75 : 0;
      for (let x = off; x < 1600; x += 150) {
        bricks += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 68}" stroke="#332e2a" stroke-width="3"/>`;
      }
    }
    let rungs = '';
    for (let y = 180; y < 720; y += 78) {
      rungs += `<line x1="218" y1="${y}" x2="298" y2="${y}" stroke="#5a4a35" stroke-width="9"/>`;
    }

    const seam = S.flags.wallListened && !S.flags.hiddenOpen ? `
      <g stroke="#ffdf9e" stroke-width="3" opacity="0.2">
        <line x1="1168" y1="190" x2="1168" y2="716"/>
        <line x1="1540" y1="190" x2="1540" y2="716"/>
      </g>` : '';

    const wall = S.flags.hiddenOpen ? `
      <rect x="1170" y="180" width="370" height="540" fill="#1c1208"/>
      <rect x="1170" y="180" width="370" height="540" fill="#ffdf9e" opacity="0.14"/>
      <rect x="1330" y="240" width="130" height="470" fill="#16131a"/>
      <circle cx="1395" cy="300" r="42" fill="#2a2416" stroke="#c9a544" stroke-width="4"/>
      <path d="M 1120 180 L 1170 200 L 1170 716 L 1120 736 Z" fill="#504841" stroke="#332e2a" stroke-width="4"/>
    ` : `
      <rect x="1160" y="182" width="388" height="536" fill="#504841"/>
      ${seam}
      <rect x="1310" y="488" width="34" height="34" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
      <rect x="1319" y="497" width="16" height="16" fill="#241608"/>
    `;

    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cevig" cx="40%" cy="40%" r="85%">
          <stop offset="35%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="730" fill="#453f39"/>
      ${bricks}
      <rect x="0" y="730" width="1600" height="270" fill="#332d26"/>
      <rect x="0" y="724" width="1600" height="10" fill="#241f1a"/>

      <polygon points="175,0 345,0 405,760 115,760" fill="#ffdf9e" opacity="0.08"/>
      <g>
        <line x1="218" y1="120" x2="218" y2="740" stroke="#6b4a2c" stroke-width="12"/>
        <line x1="298" y1="120" x2="298" y2="740" stroke="#6b4a2c" stroke-width="12"/>
        ${rungs}
      </g>

      <!-- storage shelves -->
      <g>
        <rect x="400" y="270" width="390" height="16" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <rect x="400" y="440" width="390" height="16" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <rect x="400" y="610" width="390" height="16" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <rect x="408" y="270" width="12" height="356" fill="#3c2817"/>
        <rect x="770" y="270" width="12" height="356" fill="#3c2817"/>
        <g>
          <rect x="440" y="210" width="44" height="60" rx="6" fill="#3f5044" stroke="#26231e" stroke-width="3"/>
          <rect x="500" y="222" width="36" height="48" rx="5" fill="#6b5a2e" stroke="#26231e" stroke-width="3"/>
          <rect x="560" y="204" width="48" height="66" rx="6" fill="#4f3a2a" stroke="#26231e" stroke-width="3"/>
          <rect x="640" y="220" width="38" height="50" rx="5" fill="#3f5044" stroke="#26231e" stroke-width="3"/>
          <rect x="700" y="212" width="44" height="58" rx="6" fill="#6b5a2e" stroke="#26231e" stroke-width="3"/>
          <rect x="450" y="384" width="40" height="56" rx="5" fill="#6b5a2e" stroke="#26231e" stroke-width="3"/>
          <rect x="520" y="392" width="52" height="48" rx="5" fill="#4a3122" stroke="#26231e" stroke-width="3"/>
          <rect x="610" y="380" width="36" height="60" rx="5" fill="#3f5044" stroke="#26231e" stroke-width="3"/>
          <rect x="680" y="390" width="46" height="50" rx="5" fill="#4f3a2a" stroke="#26231e" stroke-width="3"/>
          <rect x="440" y="554" width="120" height="56" fill="#4a3b22" stroke="#26231e" stroke-width="3"/>
          <rect x="600" y="560" width="100" height="50" fill="#554430" stroke="#26231e" stroke-width="3"/>
        </g>
      </g>

      <!-- lantern on a hook -->
      <g>
        <line x1="960" y1="230" x2="960" y2="264" stroke="#26231e" stroke-width="5"/>
        <rect x="938" y="264" width="44" height="58" rx="8" fill="#2a2416" stroke="#8a6a30" stroke-width="3"/>
        <rect x="948" y="276" width="24" height="34" fill="#ffdf9e" opacity="0.55"/>
        <ellipse cx="960" cy="300" rx="90" ry="60" fill="#ffdf9e" opacity="0.07"/>
      </g>

      <!-- drag marks in the dust -->
      <g stroke="#6b6157" stroke-width="5" fill="none" opacity="0.5" stroke-linecap="round">
        <path d="M 420 880 Q 800 840 1240 842"/>
        <path d="M 440 912 Q 820 872 1268 882"/>
      </g>

      <!-- the far wall -->
      ${wall}

      <rect width="1600" height="1000" fill="url(#cevig)"/>
    </svg>`;
  }

  // ---------- scene: the hidden room ----------

  function hiddenRoom() {
    let bricks = '';
    for (let y = 0; y < 700; y += 76) {
      bricks += `<line x1="0" y1="${y}" x2="1600" y2="${y}" stroke="#3a2d24" stroke-width="3" opacity="0.7"/>`;
    }
    return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hrvig" cx="46%" cy="48%" r="80%">
          <stop offset="40%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
        </radialGradient>
        <radialGradient id="hrlamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffdf9e" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#ffdf9e" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="700" fill="#4a3a30"/>
      ${bricks}
      <rect x="0" y="700" width="1600" height="300" fill="#52402f"/>
      <rect x="0" y="694" width="1600" height="10" fill="#33261c"/>

      <ellipse cx="740" cy="480" rx="560" ry="360" fill="url(#hrlamp)"/>

      <!-- cot -->
      <g>
        <rect x="190" y="560" width="20" height="150" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="530" y="560" width="20" height="150" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="180" y="600" width="380" height="26" fill="#3c2817" stroke="#241608" stroke-width="3"/>
        <rect x="196" y="566" width="348" height="40" rx="10" fill="#d8cfae" stroke="#a89a78" stroke-width="3"/>
        <rect x="290" y="560" width="254" height="36" rx="10" fill="#6b2f36" stroke="#4a2026" stroke-width="3"/>
        <rect x="206" y="552" width="80" height="26" rx="10" fill="#efe6cf" stroke="#a89a78" stroke-width="3"/>
      </g>

      <!-- table with lamp and supper -->
      <g>
        <rect x="650" y="520" width="200" height="22" fill="#5a4028" stroke="#241608" stroke-width="3"/>
        <rect x="668" y="542" width="18" height="150" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="814" y="542" width="18" height="150" fill="#4a3122" stroke="#241608" stroke-width="3"/>
        <rect x="690" y="430" width="44" height="90" rx="6" fill="#2a2416" stroke="#8a6a30" stroke-width="3"/>
        <rect x="700" y="446" width="24" height="46" fill="#ffdf9e" opacity="0.7"/>
        <ellipse cx="712" cy="470" rx="120" ry="80" fill="#ffdf9e" opacity="0.12"/>
        <ellipse cx="790" cy="512" rx="34" ry="12" fill="#c9b89a" stroke="#a89a78" stroke-width="2"/>
        <rect x="760" y="488" width="28" height="20" rx="6" fill="#8a8f9c"/>
      </g>

      <!-- shelf of provisions -->
      <g>
        <rect x="920" y="330" width="230" height="14" fill="#553a27" stroke="#241608" stroke-width="3"/>
        <ellipse cx="965" cy="316" rx="34" ry="16" fill="#c9a06a" stroke="#8a6a30" stroke-width="2"/>
        <rect x="1020" y="292" width="30" height="38" rx="4" fill="#8a8f9c" stroke="#55524a" stroke-width="2"/>
        <rect x="1070" y="300" width="42" height="30" rx="6" fill="#6b5a2e" stroke="#26231e" stroke-width="2"/>
      </g>

      <!-- edmund -->
      <g>
        <rect x="1040" y="608" width="22" height="94" rx="6" fill="#2e2a33"/>
        <rect x="1076" y="608" width="22" height="94" rx="6" fill="#2e2a33"/>
        <rect x="1032" y="694" width="38" height="14" rx="5" fill="#1c1a1e"/>
        <rect x="1070" y="694" width="38" height="14" rx="5" fill="#1c1a1e"/>
        <rect x="1024" y="486" width="90" height="132" rx="18" fill="#553a27" stroke="#3c2817" stroke-width="3"/>
        <rect x="1042" y="486" width="54" height="88" rx="10" fill="#e8dfc4"/>
        <line x1="1024" y1="520" x2="988" y2="586" stroke="#553a27" stroke-width="16" stroke-linecap="round"/>
        <line x1="988" y1="586" x2="988" y2="678" stroke="#26231e" stroke-width="8" stroke-linecap="round"/>
        <line x1="1114" y1="520" x2="1142" y2="590" stroke="#553a27" stroke-width="16" stroke-linecap="round"/>
        <circle cx="1069" cy="446" r="36" fill="#e8c39e"/>
        <path d="M 1033 446 A 36 36 0 0 1 1046 418 L 1046 446 Z" fill="#e9e2c8"/>
        <path d="M 1105 446 A 36 36 0 0 0 1092 418 L 1092 446 Z" fill="#e9e2c8"/>
        <path d="M 1042 420 Q 1069 404 1096 420" fill="none" stroke="#e9e2c8" stroke-width="9" stroke-linecap="round"/>
        <circle cx="1056" cy="448" r="9" fill="none" stroke="#3a2f22" stroke-width="2.5"/>
        <circle cx="1082" cy="448" r="9" fill="none" stroke="#3a2f22" stroke-width="2.5"/>
        <line x1="1065" y1="448" x2="1073" y2="448" stroke="#3a2f22" stroke-width="2.5"/>
        <path d="M 1058 470 Q 1069 476 1080 470" fill="none" stroke="#8a5a3e" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- the meridian -->
      <g>
        <rect x="1220" y="220" width="200" height="560" rx="10" fill="#1c1a1e" stroke="#0d0c0f" stroke-width="5"/>
        <path d="M 1204 232 L 1204 180 Q 1320 128 1436 180 L 1436 232 Z" fill="#221e26" stroke="#0d0c0f" stroke-width="5"/>
        <circle cx="1320" cy="148" r="10" fill="#c9a544"/>
        <rect x="1220" y="220" width="200" height="560" rx="10" fill="none" stroke="#c9a544" stroke-width="2" opacity="0.6"/>
        ${clockFace(1320, 310, 66, 9, 6, { face: '#f5ecd4', rim: '#c9a544' })}
        <rect x="1268" y="420" width="104" height="240" rx="12" fill="#0d0c0f" stroke="#c9a544" stroke-width="3"/>
        <line x1="1320" y1="432" x2="1352" y2="600" stroke="#c9a544" stroke-width="4"/>
        <circle cx="1352" cy="618" r="20" fill="#c9a544" stroke="#8a6a30" stroke-width="3"/>
        <rect x="1210" y="780" width="220" height="30" fill="#16141a" stroke="#0d0c0f" stroke-width="4"/>
      </g>

      <rect width="1600" height="1000" fill="url(#hrvig)"/>
    </svg>`;
  }

  // ---------- inventory icons ----------

  const gearIcon = (fill, stroke) => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${gearGlyph(32, 32, 14, fill, stroke)}</svg>`;

  const icons = {
    brassKey: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#c9a544" stroke-width="5" stroke-linecap="round">
        <circle cx="19" cy="32" r="10"/>
        <line x1="29" y1="32" x2="54" y2="32"/>
        <line x1="45" y1="32" x2="45" y2="42"/>
        <line x1="53" y1="32" x2="53" y2="40"/>
      </g>
    </svg>`,
    screwdriver: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="26" width="20" height="12" rx="6" fill="#7c3b3b"/>
      <line x1="24" y1="32" x2="48" y2="32" stroke="#b8c0cc" stroke-width="5"/>
      <path d="M48 27 L58 29 L58 35 L48 37 Z" fill="#b8c0cc"/>
    </svg>`,
    rag: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 34 q6 -14 20 -8 q16 -6 20 8 q8 10 -6 14 q-12 8 -22 2 q-14 2 -12 -16 Z" fill="#d8cfae" stroke="#a89a78" stroke-width="3"/>
      <path d="M22 36 q10 -6 22 0" fill="none" stroke="#a89a78" stroke-width="2"/>
    </svg>`,
    tinyKey: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#b8c0cc" stroke-width="4" stroke-linecap="round">
        <circle cx="24" cy="32" r="7"/>
        <line x1="31" y1="32" x2="48" y2="32"/>
        <line x1="42" y1="32" x2="42" y2="39"/>
        <line x1="48" y1="32" x2="48" y2="38"/>
      </g>
      <path d="M18 26 q-8 -6 -4 -14" fill="none" stroke="#6b2f36" stroke-width="3"/>
    </svg>`,
    gear: gearIcon('#c9a544', '#8a6a30'),
    greasyGear: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${gearGlyph(32, 30, 14, '#8a7328', '#55462a')}<path d="M44 44 q4 6 0 10" fill="none" stroke="#55462a" stroke-width="3" stroke-linecap="round"/></svg>`,
    crank: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 50 L16 26 L38 26 L38 14 L52 14" fill="none" stroke="#8a8578" stroke-width="7" stroke-linecap="round"/>
      <rect x="10" y="44" width="12" height="12" fill="#55524a"/>
    </svg>`,
    note: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <path d="M12 16 L32 32 L52 16" fill="none" stroke="#b9a97e" stroke-width="2"/>
      <line x1="20" y1="38" x2="44" y2="38" stroke="#8a7f66" stroke-width="2"/>
    </svg>`,
    mabelLetter: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" fill="#dfe6ef" stroke="#8a9ab0" stroke-width="3"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#8a9ab0" stroke-width="2"/>
      <line x1="20" y1="34" x2="44" y2="34" stroke="#8a9ab0" stroke-width="2"/>
      <line x1="20" y1="42" x2="36" y2="42" stroke="#8a9ab0" stroke-width="2"/>
    </svg>`,
    grimsbyLetter: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" fill="#efe6cf" stroke="#b9a97e" stroke-width="3"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#8a7f66" stroke-width="2"/>
      <line x1="20" y1="34" x2="40" y2="34" stroke="#8a7f66" stroke-width="2"/>
      <circle cx="42" cy="42" r="7" fill="#a33327"/>
    </svg>`,
    ironKey: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#8a8f9c" stroke-width="5" stroke-linecap="round">
        <circle cx="19" cy="32" r="10"/>
        <line x1="29" y1="32" x2="54" y2="32"/>
        <line x1="45" y1="32" x2="45" y2="42"/>
        <line x1="53" y1="32" x2="53" y2="40"/>
      </g>
    </svg>`,
  };

  return {
    title, shopfront, counterZoom, grandfatherZoom, workshop,
    benchZoom, shelfZoom, clockLockZoom, office, cellar, hiddenRoom,
    icons, clockFace, hand, gearGlyph,
  };
})();
