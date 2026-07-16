#!/usr/bin/env python3
"""Headless walkthrough tests for the game, run on mini-racer (embedded V8).

    pip install mini-racer
    python3 test/run_test.py                 # all tests
    python3 test/run_test.py walkthrough-ch2.js   # one test

Each test script loads against a minimal DOM stub (dom-stub.js) and plays
the game by clicking hotspots, inventory slots and puzzle buttons, asserting
on state as it goes.
"""
import os
import sys
from py_mini_racer import MiniRacer

HERE = os.path.dirname(os.path.abspath(__file__))
GAME = os.path.dirname(HERE)

ALL_TESTS = ['walkthrough-ch1.js', 'walkthrough-ch2.js', 'walkthrough-ch3.js', 'walkthrough-ch4.js', 'test-migration.js', 'test-cross-chapter.js', 'test-jar-labels.js']


def run_one(name):
    ctx = MiniRacer()
    ctx.eval(open(os.path.join(HERE, 'dom-stub.js')).read())
    for js in ['art.js', 'art-ch2.js', 'art-ch3.js', 'art-ch4.js', 'sfx.js', 'data-ch1.js', 'data-ch2.js', 'data-ch3.js', 'data-ch4.js', 'engine.js']:
        path = os.path.join(GAME, 'js', js)
        if os.path.exists(path):
            ctx.eval(open(path).read())
    return ctx.eval(open(os.path.join(HERE, name)).read())


def main():
    tests = sys.argv[1:] or ALL_TESTS
    failed = 0
    for t in tests:
        try:
            print(run_one(t))
        except Exception as e:
            print(f'FAILED {t}:\n{e}')
            failed += 1
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
