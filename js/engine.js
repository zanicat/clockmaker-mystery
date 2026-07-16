/* Engine: game state, rendering, dialogue, inventory, zoom views,
   hints, and localStorage save. Chapter content lives in data-ch*.js,
   registered on the global CHAPTERS registry; the engine only ever
   talks to the active chapter `C`. */

const Game = (() => {
  const SAVE_PREFIX = 'clockmakers-secret-save-';
  const LEGACY_SAVE_KEY = 'clockmakers-secret-save-v1';
  const META_KEY = 'clockmakers-secret-meta';
  const $ = s => document.querySelector(s);

  let C = null;           // active chapter (entry in CHAPTERS)
  let S = null;           // current game state
  let zoomId = null;      // open zoom view id, or null
  let puzzleId = null;    // open puzzle overlay id, or null
  let queue = [];         // pending dialogue lines
  let afterQueue = null;  // callback once the dialogue queue empties
  let dialogueLog = [];   // this session's spoken lines (journal backlog)
  let journalTab = null;  // 'clues' | 'log' when journal open, else null
  let statusTimer = null; // pending flash-status reset
  let lastAdded = null;   // item id to pulse in the inventory bar

  const chapterList = () =>
    Object.values(CHAPTERS).sort((a, b) => a.order - b.order);

  function defaultState() {
    return { scene: C.startScene, inventory: [], flags: {}, clues: [], selected: null };
  }

  // ---------- persistence ----------

  const saveKey = id => SAVE_PREFIX + id;

  function save() {
    try {
      localStorage.setItem(saveKey(C.id), JSON.stringify({
        scene: S.scene, inventory: S.inventory, flags: S.flags, clues: S.clues,
      }));
    } catch (e) { /* storage unavailable — play on without saves */ }
  }

  function loadSave(chId) {
    try {
      const raw = localStorage.getItem(saveKey(chId));
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!CHAPTERS[chId].scenes[d.scene]) return null;
      return { scene: d.scene, inventory: d.inventory || [], flags: d.flags || {}, clues: d.clues || [], selected: null };
    } catch (e) {
      return null;
    }
  }

  function hasSave(chId) { return loadSave(chId) !== null; }

  function clearSave(chId) {
    try { localStorage.removeItem(saveKey(chId)); } catch (e) { /* ignore */ }
  }

  /* Saves written before the chapter registry lived under one
     unscoped key; adopt one as Chapter One's slot. */
  function migrateLegacySave() {
    try {
      const old = localStorage.getItem(LEGACY_SAVE_KEY);
      if (old && !localStorage.getItem(saveKey('ch1'))) {
        localStorage.setItem(saveKey('ch1'), old);
      }
      if (old) localStorage.removeItem(LEGACY_SAVE_KEY);
    } catch (e) { /* ignore */ }
  }

  function loadMeta() {
    try { return JSON.parse(localStorage.getItem(META_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function markCompleted(chId) {
    try {
      const m = loadMeta();
      m.completed = m.completed || {};
      m.completed[chId] = true;
      localStorage.setItem(META_KEY, JSON.stringify(m));
    } catch (e) { /* ignore */ }
  }

  // ---------- API handed to scene scripts ----------

  const g = {
    flag: k => !!S.flags[k],
    getFlag: k => S.flags[k],
    setFlag(k, v = true) {
      S.flags[k] = v;
      save();
      renderScene();
      renderZoom();
    },
    hasItem: id => S.inventory.includes(id),
    addItem(id) {
      if (!S.inventory.includes(id)) {
        S.inventory.push(id);
        lastAdded = id;
        save();
        renderInventory();
        Sfx.play('pickup');
        flashStatus('Picked up — ' + C.items[id].name);
      }
    },
    removeItem(id) {
      const i = S.inventory.indexOf(id);
      if (i >= 0) S.inventory.splice(i, 1);
      if (S.selected === id) S.selected = null;
      save();
      renderInventory();
    },
    /* Retire a tool that has served its purpose: it leaves the
       inventory with a small acknowledgement, so the bar only ever
       holds things that still matter. */
    retireItem(id) {
      if (!S.inventory.includes(id)) return;
      const name = C.items[id].name;
      g.removeItem(id);
      Sfx.play('stow');
      flashStatus(name + ' put away — it has done its work.');
    },
    addClue(id) {
      if (S.clues.includes(id)) return;
      S.clues.push(id);
      save();
      Sfx.play('page');
      flashStatus('Casebook updated — ' + ((C.clues || {})[id] || {}).title);
    },
    hasClue: id => S.clues.includes(id),
    sfx: name => Sfx.play(name),
    say,
    narrate: (text, after) => say([{ text }], after),
    goTo(id) {
      zoomId = null;
      S.scene = id;
      S.selected = null;
      save();
      renderScene();
      renderZoom();
      renderInventory();
      const st = $('#stage');
      st.classList.remove('scene-enter');
      void st.offsetWidth; // restart the one-shot fade
      st.classList.add('scene-enter');
      const sc = C.scenes[id];
      if (sc.onEnter) sc.onEnter(g);
    },
    openZoom(id) { zoomId = id; renderZoom(); },
    closeZoom() { zoomId = null; renderZoom(); },
    openPuzzle(id) { puzzleId = id; renderPuzzle(); },
    closePuzzle() { puzzleId = null; renderPuzzle(); },
    endChapter() { showEnd(); },
  };

  // ---------- dialogue ----------

  function say(lines, after) {
    queue = lines.map(l => (typeof l === 'string' ? { text: l } : l));
    afterQueue = after || null;
    showNext();
  }

  function showNext() {
    if (queue.length === 0) {
      $('#dialogue').classList.add('hidden');
      $('#dialogue-catcher').classList.add('hidden');
      if (afterQueue) {
        const f = afterQueue;
        afterQueue = null;
        f(g);
      }
      return;
    }
    const line = queue.shift();
    dialogueLog.push(line);
    if (dialogueLog.length > 200) dialogueLog.shift();
    $('#dialogue-who').textContent = line.who || '';
    $('#dialogue-who').classList.toggle('hidden', !line.who);
    $('#dialogue-text').textContent = line.text;
    $('#dialogue').classList.remove('hidden');
    $('#dialogue-catcher').classList.remove('hidden');
  }

  // ---------- hotspots ----------

  function buildHotspots(container, hotspots, vw, vh) {
    container.innerHTML = '';
    for (const h of hotspots) {
      if (h.visible && !h.visible(g)) continue;
      const el = document.createElement('button');
      el.className = 'hotspot';
      el.style.left = (h.rect[0] / vw * 100) + '%';
      el.style.top = (h.rect[1] / vh * 100) + '%';
      el.style.width = (h.rect[2] / vw * 100) + '%';
      el.style.height = (h.rect[3] / vh * 100) + '%';
      el.title = h.label;
      el.setAttribute('aria-label', h.label);
      el.addEventListener('click', () => onHotspot(h));
      container.appendChild(el);
    }
  }

  function onHotspot(h) {
    Sfx.play('click');
    if (S.selected) {
      const id = S.selected;
      const fn = h.use && h.use[id];
      S.selected = null;
      renderInventory();
      if (fn) fn(g, id);
      else {
        Sfx.play('error');
        say([{ text: `The ${C.items[id].name.toLowerCase()} doesn't do anything there.` }]);
      }
      return;
    }
    if (h.onClick) h.onClick(g);
  }

  // ---------- rendering ----------

  /* A chapter may expose `status(g)` — one short line of state the
     player should always be able to see (a clock, a tide, a countdown).
     Chapters without one simply leave the slot empty. */
  function renderStatus() {
    const el = $('#scene-status');
    const text = C.status ? (C.status(g) || '') : '';
    el.textContent = text;
    el.classList.toggle('hidden', !text);
  }

  function renderScene() {
    const sc = C.scenes[S.scene];
    $('#scene-name').textContent = sc.name;
    renderStatus();
    $('#scene-bg').innerHTML = sc.art(S);
    buildHotspots($('#scene-hotspots'), sc.hotspots, 1600, 1000);
  }

  function renderZoom() {
    const wrap = $('#zoom');
    if (!zoomId) {
      wrap.classList.add('hidden');
      return;
    }
    const z = C.scenes[S.scene].zooms[zoomId];
    wrap.classList.remove('hidden');
    $('#zoom-title').textContent = z.title;
    $('#zoom-bg').innerHTML = z.art(S);
    buildHotspots($('#zoom-hotspots'), z.hotspots, 1200, 800);
  }

  function baseStatus() {
    return S.selected
      ? `Using ${C.items[S.selected].name} — click a target, or another item to combine (click again to cancel)`
      : '';
  }

  /* Show a transient acknowledgement in the inventory status line
     (picked up / put away / casebook updated), then fall back to the
     usual usage hint. */
  function flashStatus(text) {
    const el = $('#inv-status');
    el.textContent = text;
    el.classList.add('flash');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      el.classList.remove('flash');
      el.textContent = baseStatus();
    }, 2400);
  }

  function examineItem(it) {
    Sfx.play('page');
    g.narrate(it.desc);
  }

  function renderInventory() {
    const bar = $('#inv-slots');
    bar.innerHTML = '';
    for (const id of S.inventory) {
      const it = C.items[id];
      const el = document.createElement('button');
      el.className = 'inv-slot' + (S.selected === id ? ' selected' : '');
      if (id === lastAdded) el.className += ' inv-new';
      el.innerHTML = it.icon;
      el.title = it.name + ' (right-click or press-and-hold to examine)';
      el.setAttribute('aria-label', it.name);

      // Press-and-hold examine — the touch counterpart of right-click.
      let pressTimer = null;
      let pressFired = false;
      let pressX = 0, pressY = 0;
      el.addEventListener('pointerdown', e => {
        pressFired = false;
        pressX = e.clientX;
        pressY = e.clientY;
        clearTimeout(pressTimer);
        pressTimer = setTimeout(() => {
          pressFired = true;
          examineItem(it);
        }, 500);
      });
      el.addEventListener('pointermove', e => {
        if (Math.abs(e.clientX - pressX) > 8 || Math.abs(e.clientY - pressY) > 8) {
          clearTimeout(pressTimer);
        }
      });
      const cancelPress = () => clearTimeout(pressTimer);
      el.addEventListener('pointerup', cancelPress);
      el.addEventListener('pointercancel', cancelPress);
      el.addEventListener('pointerleave', cancelPress);

      el.addEventListener('click', () => {
        if (pressFired) { pressFired = false; return; }
        if (S.selected && S.selected !== id) {
          const key = [S.selected, id].sort().join('+');
          const fn = C.combos[key];
          S.selected = null;
          renderInventory();
          if (fn) fn(g);
          else {
            Sfx.play('error');
            g.narrate('Those don\'t go together.');
          }
          return;
        }
        S.selected = (S.selected === id) ? null : id;
        renderInventory();
      });
      el.addEventListener('contextmenu', e => {
        e.preventDefault();
        examineItem(it);
      });
      bar.appendChild(el);
    }
    lastAdded = null;
    $('#inv-status').textContent = baseStatus();
  }

  function renderPuzzle() {
    const wrap = $('#puzzle');
    if (!puzzleId) {
      wrap.classList.add('hidden');
      return;
    }
    const p = C.puzzles[puzzleId];
    wrap.classList.remove('hidden');
    $('#puzzle-panel').classList.toggle('wide', !!p.wide);
    $('#puzzle-title').textContent = p.title;
    const body = $('#puzzle-body');
    body.innerHTML = p.render(g);
    p.wire(g, body, renderPuzzle);
  }

  function renderAll() {
    renderScene();
    renderZoom();
    renderPuzzle();
    renderInventory();
    renderJournal();
  }

  // ---------- casebook / dialogue backlog ----------

  function openJournal(tab) {
    journalTab = tab || 'clues';
    renderJournal();
  }

  function closeJournal() {
    journalTab = null;
    renderJournal();
  }

  function renderJournal() {
    const wrap = $('#journal');
    if (!journalTab) {
      wrap.classList.add('hidden');
      return;
    }
    wrap.classList.remove('hidden');
    $('#tab-clues').classList.toggle('active', journalTab === 'clues');
    $('#tab-log').classList.toggle('active', journalTab === 'log');
    const body = $('#journal-body');
    body.innerHTML = '';

    if (journalTab === 'clues') {
      const clues = C.clues || {};
      if (S.clues.length === 0) {
        const p = document.createElement('p');
        p.className = 'journal-empty';
        p.textContent = 'Nothing in the casebook yet. Look closer at everything.';
        body.appendChild(p);
      }
      for (const id of S.clues) {
        const c = clues[id];
        if (!c) continue;
        const entry = document.createElement('div');
        entry.className = 'clue-entry';
        const h = document.createElement('h3');
        h.textContent = c.title;
        entry.appendChild(h);
        for (const para of c.text) {
          const p = document.createElement('p');
          p.textContent = para;
          entry.appendChild(p);
        }
        body.appendChild(entry);
      }
    } else {
      if (dialogueLog.length === 0) {
        const p = document.createElement('p');
        p.className = 'journal-empty';
        p.textContent = 'Nothing said yet this session.';
        body.appendChild(p);
      }
      for (const line of dialogueLog) {
        const row = document.createElement('div');
        row.className = 'log-line';
        if (line.who) {
          const who = document.createElement('span');
          who.className = 'log-who';
          who.textContent = line.who;
          row.appendChild(who);
        }
        const txt = document.createElement('span');
        txt.textContent = line.text;
        row.appendChild(txt);
        body.appendChild(row);
      }
      body.scrollTop = body.scrollHeight;
    }
  }

  // ---------- hotspot reveal ----------

  let spotsTimer = null;
  function revealHotspots() {
    const stage = $('#stage');
    stage.classList.add('show-hotspots');
    clearTimeout(spotsTimer);
    spotsTimer = setTimeout(() => stage.classList.remove('show-hotspots'), 2500);
  }

  // ---------- modal (menu / hints) ----------

  function openModal(title, text, buttons) {
    $('#modal-title').textContent = title;
    $('#modal-text').textContent = text;
    const bar = $('#modal-buttons');
    bar.innerHTML = '';
    for (const b of (buttons || [{ label: 'Close' }])) {
      const el = document.createElement('button');
      el.className = 'btn';
      el.textContent = b.label;
      el.addEventListener('click', () => {
        closeModal();
        if (b.action) b.action();
      });
      bar.appendChild(el);
    }
    $('#modal').classList.remove('hidden');
  }

  function closeModal() { $('#modal').classList.add('hidden'); }

  function showHint() {
    const h = C.hints.find(x => x.when(g));
    if (!h) {
      openModal('A Detective’s Instinct', 'Trust your eyes, detective.');
      return;
    }
    const nudge = typeof h.nudge === 'function' ? h.nudge(g) : h.nudge;
    const buttons = [];
    if (h.more) {
      buttons.push({
        label: 'Another nudge',
        action: () => {
          const more = typeof h.more === 'function' ? h.more(g) : h.more;
          openModal('A Detective’s Instinct', more);
        },
      });
    }
    buttons.push({ label: 'Close' });
    openModal('A Detective’s Instinct', nudge, buttons);
  }

  function showMenu() {
    openModal('Menu', '', [
      { label: 'Resume' },
      { label: 'Sound: ' + (Sfx.isMuted() ? 'Off' : 'On'), action: () => { Sfx.toggleMute(); showMenu(); } },
      {
        label: 'Restart chapter',
        action: () => openModal('Restart the chapter?', 'Your progress so far will be lost.', [
          { label: 'Restart', action: () => newGame(C.id) },
          { label: 'Cancel' },
        ]),
      },
      { label: 'Quit to title', action: quitToTitle },
    ]);
  }

  // ---------- screens / flow ----------

  function showScreen(id) {
    $('#screen-title').classList.toggle('hidden', id !== 'title');
    $('#screen-game').classList.toggle('hidden', id !== 'game');
    $('#screen-end').classList.toggle('hidden', id !== 'end');
  }

  function renderTitle() {
    const wrap = $('#chapter-list');
    wrap.innerHTML = '';
    const done = loadMeta().completed || {};
    for (const ch of chapterList()) {
      const card = document.createElement('div');
      card.className = 'chapter-card';

      const head = document.createElement('div');
      head.className = 'chapter-head';
      const title = document.createElement('div');
      title.className = 'chapter-title';
      title.textContent = ch.title;
      head.appendChild(title);
      if (done[ch.id]) {
        const badge = document.createElement('span');
        badge.className = 'chapter-badge';
        badge.textContent = '✓ Solved';
        head.appendChild(badge);
      }
      card.appendChild(head);

      const sub = document.createElement('div');
      sub.className = 'chapter-subtitle';
      sub.textContent = ch.subtitle;
      card.appendChild(sub);

      const buttons = document.createElement('div');
      buttons.className = 'chapter-buttons';
      const btnNew = document.createElement('button');
      btnNew.className = 'btn';
      btnNew.textContent = 'New Game';
      btnNew.addEventListener('click', () => newGame(ch.id));
      buttons.appendChild(btnNew);
      if (hasSave(ch.id)) {
        const btnCont = document.createElement('button');
        btnCont.className = 'btn';
        btnCont.textContent = 'Continue';
        btnCont.addEventListener('click', () => continueGame(ch.id));
        buttons.appendChild(btnCont);
      }
      card.appendChild(buttons);

      wrap.appendChild(card);
    }
  }

  function showEnd() {
    Sfx.play('chime');
    markCompleted(C.id);
    clearSave(C.id);
    $('#end-kicker').textContent = C.end.kicker;
    $('#end-title').textContent = C.end.title;
    $('#end-body').textContent = C.end.body;
    const next = C.end.next && CHAPTERS[C.end.next];
    const btnNext = $('#btn-end-next');
    btnNext.classList.toggle('hidden', !next);
    if (next) btnNext.textContent = 'Begin ' + next.subtitle.split('—')[0].trim();
    showScreen('end');
  }

  function startChapter(chId, state) {
    C = CHAPTERS[chId];
    document.body.dataset.chapter = chId;   // chapter-tinted UI chrome
    S = state;
    zoomId = null;
    puzzleId = null;
    queue = [];
    afterQueue = null;
    dialogueLog = [];
    journalTab = null;
    showScreen('game');
    renderAll();
  }

  function newGame(chId) {
    C = CHAPTERS[chId];
    startChapter(chId, defaultState());
    save();
    say(C.intro);
  }

  function continueGame(chId) {
    C = CHAPTERS[chId];
    startChapter(chId, loadSave(chId) || defaultState());
  }

  function quitToTitle() {
    delete document.body.dataset.chapter;   // back to neutral brass
    renderTitle();
    showScreen('title');
  }

  function init() {
    migrateLegacySave();
    $('#title-art').innerHTML = Art.title();
    $('#end-art').innerHTML = Art.title();
    renderTitle();

    $('#btn-end-title').addEventListener('click', quitToTitle);
    $('#btn-end-next').addEventListener('click', () => {
      if (C.end.next && CHAPTERS[C.end.next]) newGame(C.end.next);
    });
    $('#btn-menu').addEventListener('click', showMenu);
    $('#btn-hint').addEventListener('click', showHint);
    $('#btn-journal').addEventListener('click', () => openJournal('clues'));
    $('#btn-spots').addEventListener('click', revealHotspots);
    $('#tab-clues').addEventListener('click', () => openJournal('clues'));
    $('#tab-log').addEventListener('click', () => openJournal('log'));
    $('#journal-close').addEventListener('click', closeJournal);
    $('#journal').addEventListener('click', e => {
      if (e.target === $('#journal')) closeJournal();
    });
    $('#dialogue-catcher').addEventListener('click', showNext);
    $('#zoom-close').addEventListener('click', () => g.closeZoom());
    $('#zoom').addEventListener('click', e => {
      if (e.target === $('#zoom')) g.closeZoom();
    });
    $('#puzzle-close').addEventListener('click', () => g.closePuzzle());
    $('#puzzle').addEventListener('click', e => {
      if (e.target === $('#puzzle')) g.closePuzzle();
    });
    $('#modal').addEventListener('click', e => {
      if (e.target === $('#modal')) closeModal();
    });

    // Keyboard: Space/Enter advances dialogue, Escape closes the
    // topmost overlay (modal, then puzzle, then casebook, then zoom).
    document.addEventListener('keydown', e => {
      if (!S) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (!$('#dialogue-catcher').classList.contains('hidden')) {
          e.preventDefault();
          showNext();
        }
        return;
      }
      if (e.key === 'Escape') {
        if (!$('#modal').classList.contains('hidden')) closeModal();
        else if (puzzleId) g.closePuzzle();
        else if (journalTab) closeJournal();
        else if (zoomId) g.closeZoom();
      }
    });
  }

  return { init };
})();
