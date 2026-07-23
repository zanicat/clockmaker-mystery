#!/usr/bin/env python3
"""Audit painted <text> for overflow past its band or the viewBox, and
(optionally) shapes cropped badly at viewBox edges.

Width is estimated (chars x font-size x per-case factor), calibrated so the
ch2 jar labels — hand-verified in test-jar-labels.js — report clean. A
textLength attribute, where present, is authoritative (the glyphs are
clamped to it by the renderer).

    python3 test/audit_text.py                 # audit ch4-ch8, text checks
    python3 test/audit_text.py --chapters ch2  # calibration set: expect 0
    python3 test/audit_text.py --geometry      # also flag edge-cropped shapes
    python3 test/audit_text.py --strict        # exit 1 on any TEXT finding
"""
import argparse
import re
import sys
import xml.etree.ElementTree as ET

from check_svg import dump_renders, substitute_entities

# estimated glyph width as a fraction of font-size (Georgia-ish serif).
# Georgia averages ~0.68em for caps, ~0.48em for lowercase; both factors
# carry ~10% safety margin. Calibrated so ch2's hand-verified jar labels
# and the hand-checked ch8 sign boards report clean.
FACTOR_UPPER = 0.70
FACTOR_MIXED = 0.55
BAND_SLACK = 6      # px a text may escape its enclosing band unflagged
EDGE_SLACK = 2      # px a text may escape the viewBox unflagged
CROP_SLACK = 12     # px a shape may cross a viewBox edge unflagged
ROTATE_SKIP = 8     # degrees beyond which a group's text is exempt

# (name-prefix, id-or-marker substring) pairs of intentional edge bleeds
ALLOW_CROP = [
    ('ch7.', 'world'),   # the streaming scenery strip rushes past the window
    ('ch8.', 'fog'),     # fog banks drift through every quay scene
    ('ch4.', 'rib'),     # dome ribs arc beyond the lantern's crown
]


def parse_transform(t):
    """Return (tx, ty, rot_deg) from a transform attribute (best effort)."""
    tx = ty = rot = 0.0
    for m in re.finditer(r'(translate|rotate)\(([^)]*)\)', t or ''):
        kind, args = m.group(1), [float(a) for a in re.split(r'[ ,]+', m.group(2).strip()) if a]
        if kind == 'translate' and args:
            tx += args[0]
            ty += args[1] if len(args) > 1 else 0.0
        elif kind == 'rotate' and args:
            rot += args[0]
    return tx, ty, rot


def text_lines(el):
    """Text segments of a <text> element: direct text plus each tspan."""
    tag = el.tag.split('}')[-1]
    lines = [(el.text or '').strip()] if (el.text or '').strip() else []
    for child in el:
        if child.tag.split('}')[-1] == 'tspan' and (child.text or '').strip():
            lines.append(child.text.strip())
    if not lines and tag == 'text':
        whole = ''.join(el.itertext()).strip()
        if whole:
            lines = [whole]
    return lines


def est_width(el, fs):
    """Estimated rendered width of a <text>; textLength wins outright."""
    tl = el.get('textLength')
    if tl:
        return float(tl)
    lines = text_lines(el)
    if not lines:
        return 0.0
    ls = float(el.get('letter-spacing', 0) or 0)
    widths = []
    for line in lines:
        factor = FACTOR_UPPER if line.isupper() else FACTOR_MIXED
        widths.append(len(line) * fs * factor + max(len(line) - 1, 0) * ls)
    return max(widths)


def extent(x, w, anchor):
    if anchor == 'middle':
        return x - w / 2, x + w / 2
    if anchor == 'end':
        return x - w, x
    return x, x + w


def shape_bbox(el):
    """(x0, y0, x1, y1) for simple shapes, local coords; None if unknown."""
    tag = el.tag.split('}')[-1]
    try:
        if tag == 'rect':
            x, y = float(el.get('x', 0)), float(el.get('y', 0))
            w, h = float(el.get('width', 0)), float(el.get('height', 0))
            return x, y, x + w, y + h
        if tag == 'circle':
            cx, cy, r = float(el.get('cx', 0)), float(el.get('cy', 0)), float(el.get('r', 0))
            return cx - r, cy - r, cx + r, cy + r
        if tag == 'ellipse':
            cx, cy = float(el.get('cx', 0)), float(el.get('cy', 0))
            rx, ry = float(el.get('rx', 0)), float(el.get('ry', 0))
            return cx - rx, cy - ry, cx + rx, cy + ry
        if tag == 'polygon':
            pts = [float(v) for v in re.split(r'[ ,]+', (el.get('points') or '').strip()) if v]
            xs, ys = pts[0::2], pts[1::2]
            if xs and ys:
                return min(xs), min(ys), max(xs), max(ys)
    except ValueError:
        pass
    return None


def audit_item(name, svg, geometry, findings):
    try:
        root = ET.fromstring(substitute_entities(svg))
    except ET.ParseError:
        return  # check_svg.py owns malformed XML
    if not root.tag.endswith('svg') or not root.get('viewBox'):
        return
    vb = [float(v) for v in root.get('viewBox').split()]
    W, H = vb[2], vb[3]

    # walk with cumulative translate/rotate, carrying inherited text attrs
    def walk(el, tx, ty, rot, fs, anchor, in_defs, rects, group):
        tag = el.tag.split('}')[-1]
        dtx, dty, drot = parse_transform(el.get('transform'))
        tx, ty, rot = tx + dtx, ty + dty, rot + drot
        fs = float(el.get('font-size', fs) or fs)
        anchor = el.get('text-anchor', anchor)
        in_defs = in_defs or tag == 'defs'

        if tag == 'text' and not in_defs:
            if abs(rot) > ROTATE_SKIP:
                return
            x, y = float(el.get('x', 0) or 0) + tx, float(el.get('y', 0) or 0) + ty
            w = est_width(el, fs)
            if w <= 0:
                return
            x0, x1 = extent(x, w, anchor)
            label = ' '.join(text_lines(el))[:40]
            if x0 < -EDGE_SLACK or x1 > W + EDGE_SLACK or y < 0 or y - fs > H:
                findings.append((name, 'TEXT-VIEWBOX',
                                 f'"{label}" est [{x0:.0f},{x1:.0f}] vs {W:.0f}x{H:.0f}'))
                return
            # enclosing band: smallest sibling rect whose y-range holds the
            # baseline and whose x-range holds the anchor point. Bands are
            # landscape (signs, papers, jar strips) — a portrait rect behind
            # a free caption (a chimney, a door) is scenery, not a band.
            bands = [r for r in group
                     if r[1] <= y <= r[3] and r[0] <= x <= r[2]
                     and (r[2] - r[0]) >= (r[3] - r[1])]
            if bands:
                b = min(bands, key=lambda r: r[2] - r[0])
                if x0 < b[0] - BAND_SLACK or x1 > b[2] + BAND_SLACK:
                    findings.append((name, 'TEXT-BAND',
                                     f'"{label}" est [{x0:.0f},{x1:.0f}] vs band [{b[0]:.0f},{b[2]:.0f}]'))
            return

        if geometry and not in_defs and tag in ('rect', 'circle', 'ellipse', 'polygon'):
            bb = shape_bbox(el)
            if bb:
                x0, y0, x1, y1 = bb[0] + tx, bb[1] + ty, bb[2] + tx, bb[3] + ty
                full_bleed = (x1 - x0) >= 0.95 * W and (y1 - y0) >= 0.95 * H
                allowed = any(name.startswith(p) and s in (el.get('id', '') + el.get('fill', ''))
                              for p, s in ALLOW_CROP)
                over = max(-x0, -y0, x1 - W, y1 - H)
                if over > CROP_SLACK and not full_bleed and not allowed:
                    findings.append((name, 'CROP',
                                     f'<{tag}> [{x0:.0f},{y0:.0f},{x1:.0f},{y1:.0f}] exceeds {W:.0f}x{H:.0f} by {over:.0f}'))

        # collect this element's child rects (abs coords) as candidate bands
        child_rects = []
        for c in el:
            if c.tag.split('}')[-1] == 'rect':
                bb = shape_bbox(c)
                if bb:
                    ctx_, cty_, _ = parse_transform(c.get('transform'))
                    child_rects.append((bb[0] + tx + ctx_, bb[1] + ty + cty_,
                                        bb[2] + tx + ctx_, bb[3] + ty + cty_))
        for c in el:
            walk(c, tx, ty, rot, fs, anchor, in_defs,
                 rects + child_rects, child_rects)

    walk(root, 0, 0, 0, 16.0, 'start', False, [], [])


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--chapters', default='ch4,ch5,ch6,ch7,ch8',
                    help='comma-separated chapter prefixes (default ch4-ch8)')
    ap.add_argument('--geometry', action='store_true',
                    help='also run the edge-crop shape check (noisy; dev tool)')
    ap.add_argument('--strict', action='store_true',
                    help='exit 1 if any TEXT finding remains')
    args = ap.parse_args()
    chapters = set(args.chapters.split(','))

    findings = []
    checked = 0
    for it in dump_renders():
        prefix = it['name'].split('.')[0]
        if prefix not in chapters or '.puzzle.' in it['name']:
            continue
        checked += 1
        audit_item(it['name'], it['svg'], args.geometry, findings)

    for name, kind, detail in findings:
        print(f'{name:34s} {kind:12s} {detail}')
    text_findings = [f for f in findings if f[1].startswith('TEXT')]
    print(f'{checked} renders audited, {len(text_findings)} text finding(s), '
          f'{len(findings) - len(text_findings)} geometry finding(s)')
    sys.exit(1 if (args.strict and text_findings) else 0)


if __name__ == '__main__':
    main()
