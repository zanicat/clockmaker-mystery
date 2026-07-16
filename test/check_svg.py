#!/usr/bin/env python3
"""Validate every scene/zoom/icon/puzzle render as well-formed XML.

Catches malformed attributes and stray entities that a headless DOM stub
would never notice but a browser would render wrongly or drop.

    python3 test/check_svg.py
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from py_mini_racer import MiniRacer

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)

# HTML entities the art uses that bare XML doesn't know
ENTITIES = {
    '&mdash;': '—', '&ndash;': '–', '&rsquo;': '’',
    '&lsquo;': '‘', '&hellip;': '…', '&#9650;': '▲',
    '&#9660;': '▼', '&#9664;': '◀', '&#9654;': '▶',
}

ctx = MiniRacer()
ctx.eval(open(os.path.join(HERE, 'dom-stub.js')).read())
for js in ['art.js', 'art-ch2.js', 'art-ch3.js', 'art-ch4.js', 'art-ch5.js', 'sfx.js', 'data-ch1.js', 'data-ch2.js', 'data-ch3.js', 'data-ch4.js', 'data-ch5.js']:
    ctx.eval(open(os.path.join(GAME, 'js', js)).read())
items = json.loads(ctx.eval(open(os.path.join(HERE, 'dump-svg.js')).read()))

bad = 0
for it in items:
    svg = it['svg']
    for ent, ch in ENTITIES.items():
        svg = svg.replace(ent, ch)
    leftover = re.findall(r'&(?!amp;|lt;|gt;|quot;|apos;|#)\w+;', svg)
    if leftover:
        print(f"ENTITY  {it['name']}: unknown entities {set(leftover)}")
        bad += 1
        continue
    try:
        ET.fromstring(svg)
    except ET.ParseError as e:
        print(f"MALFORMED  {it['name']}: {e}")
        bad += 1

print(f'{len(items)} renders checked, {bad} problems')
sys.exit(1 if bad else 0)
