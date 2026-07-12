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

  const chapterList = () =>
    Object.values(CHAPTERS).sort((a, b) => a.order - b.order);

  function defaultState() {
    return { scene: C.startScene, inventory: [], flags: {}, selected: null };
  }

  // ---------- persistence ----------

  const saveKey = id => SAVE_PREFIX + id;

  function save() {
    try {
      localStorage.setItem(saveKey(C.id), JSON.stringify({
        scene: S.scene, inventory: S.inventory, flags: S.flags,
      }));
    } catch (e) { /* storage unavailable — play on without saves */ }
  }

  function loadSave(chId) {
    try {
      const raw = localStorage.getItem(saveKey(chId));
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!CHAPTERS[chId].scenes[d.scene]) return null;
      return { scene: d.scene, inventory: d.inventory || [], flags: d.flags || {}, selected: null };
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
        save();
        renderInventory();
      }
    },
    removeItem(id) {
      const i = S.inventory.indexOf(id);
      if (i >= 0) S.inventory.splice(i, 1);
      if (S.selected === id) S.selected = null;
      save();
      renderInventory();
    },
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
    if (S.selected) {
      const id = S.selected;
      const fn = h.use && h.use[id];
      S.selected = null;
      renderInventory();
      if (fn) fn(g, id);
      else say([{ text: `The ${C.items[id].name.toLowerCase()} doesn't do anything there.` }]);
      return;
    }
    if (h.onClick) h.onClick(g);
  }

  // ---------- rendering ----------

  function renderScene() {
    const sc = C.scenes[S.scene];
    $('#scene-name').textContent = sc.name;
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

  function renderInventory() {
    const bar = $('#inv-slots');
    bar.innerHTML = '';
    for (const id of S.inventory) {
      const it = C.items[id];
      const el = document.createElement('button');
      el.className = 'inv-slot' + (S.selected === id ? ' selected' : '');
      el.innerHTML = it.icon;
      el.title = it.name + ' (right-click to examine)';
      el.setAttribute('aria-label', it.name);
      el.addEventListener('click', () => {
        if (S.selected && S.selected !== id) {
          const key = [S.selected, id].sort().join('+');
          const fn = C.combos[key];
          S.selected = null;
          renderInventory();
          if (fn) fn(g);
          else g.narrate('Those don\'t go together.');
          return;
        }
        S.selected = (S.selected === id) ? null : id;
        renderInventory();
      });
      el.addEventListener('contextmenu', e => {
        e.preventDefault();
        g.narrate(it.desc);
      });
      bar.appendChild(el);
    }
    $('#inv-status').textContent = S.selected
      ? `Using ${C.items[S.selected].name} — click a target, or another item to combine (click again to cancel)`
      : '';
  }

  function renderPuzzle() {
    const wrap = $('#puzzle');
    if (!puzzleId) {
      wrap.classList.add('hidden');
      return;
    }
    const p = C.puzzles[puzzleId];
    wrap.classList.remove('hidden');
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
    S = state;
    zoomId = null;
    puzzleId = null;
    queue = [];
    afterQueue = null;
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
  }

  return { init };
})();
