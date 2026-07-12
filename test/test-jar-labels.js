/* Jar labels must never overflow their band: the font shrinks with
   label length, and textLength clamps glyphs as a backstop. */

var cases = [
  [38, 'HOREHOUND'],   // tiny jar, long word -> floor font + clamp
  [58, 'DIGITALIS'],   // dispensary open-cabinet jar
  [96, 'VITRIOL'],     // workbench jar
  [110, 'LAUDANUM'],
  [128, 'SPEARMINT'],  // remedy shelf jars
  [128, 'CAMPHOR'],
  [128, 'OXYMEL'],
  [130, 'DIGITALIS'],
  [200, 'AB'],         // short label: no clamp, capped font
];

for (var i = 0; i < cases.length; i++) {
  var w = cases[i][0];
  var label = cases[i][1];
  var svg = Art.jarGlyph(200, 300, w, 140, '#3f5044', label);
  var fsMatch = /font-size="([\d.]+)"/.exec(svg);
  assert(fsMatch, 'label rendered for ' + label);
  var fs = parseFloat(fsMatch[1]);
  var clampMatch = /textLength="([\d.]+)"/.exec(svg);
  var maxW = w * 0.8 - w * 0.1;
  var estWidth = clampMatch ? parseFloat(clampMatch[1]) : label.length * fs * 0.66;
  assert(estWidth <= maxW + 0.5,
    'label "' + label + '" fits band at w=' + w + ' (est ' + estWidth.toFixed(1) + ' vs max ' + maxW.toFixed(1) + ')');
  assert(fs >= 9, 'font never below readable floor for ' + label);
}

// unlabeled jars render no text at all
assert(Art.jarGlyph(200, 300, 60, 80, '#3f5044').indexOf('<text') === -1, 'no label, no text');

'OK: jar labels fit their bands (' + cases.length + ' cases)';
