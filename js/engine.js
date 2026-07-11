/* Engine: game state, rendering, dialogue, inventory, zoom views,
   hints, and localStorage save. Scene content lives in data.js. */

const Game = (() => {
  const SAVE_KEY = 'clockmakers-secret-save-v1';
  const $ = s => document.querySelector(s);

  let S = null;           // current game state
  let zoomId = null;      // open zoom view id, or null
  let puzzleId = null;    // open puzzle overlay id, or null
  let queue = [];         // pending dialogue lines
  let afterQueue = null;  // callback once the dialogue queue empties

  function defaultState() {
    return { scene: CHAPTER.startScene, inventory: [], flags: {}, selected: null };
  }

  // ---------- persistence ----------

  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        scene: S.scene, inventory: S.inventory, flags: S.flags,
      }));
    } catch (e) { /* storage unavailable — play on without saves */ }
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!SCENES[d.scene]) return null;
      return { scene: d.scene, inventory: d.inventory || [], flags: d.flags || {}, selected: null };
    } catch (e) {
      return null;
    }
  }

  function hasSave() { return loadSave() !== null; }

  function clearSave() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
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
      const sc = SCENES[id];
      if (sc.onEnter) sc.onEnter(g);
    },
    openZoom(id) { zoomId = id; renderZoom(); },
    closeZoom() { zoomId = null; renderZoom(); },
    openPuzzle(id) { puzzleId = id; renderPuzzle(); },
    closePuzzle() { puzzleId = null; renderPuzzle(); },
    endChapter() {
      clearSave();
      showScreen('end');
    },
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
      else say([{ text: `The ${ITEMS[id].name.toLowerCase()} doesn't do anything there.` }]);
      return;
    }
    if (h.onClick) h.onClick(g);
  }

  // ---------- rendering ----------

  function renderScene() {
    const sc = SCENES[S.scene];
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
    const z = SCENES[S.scene].zooms[zoomId];
    wrap.classList.remove('hidden');
    $('#zoom-title').textContent = z.title;
    $('#zoom-bg').innerHTML = z.art(S);
    buildHotspots($('#zoom-hotspots'), z.hotspots, 1200, 800);
  }

  function renderInventory() {
    const bar = $('#inv-slots');
    bar.innerHTML = '';
    for (const id of S.inventory) {
      const it = ITEMS[id];
      const el = document.createElement('button');
      el.className = 'inv-slot' + (S.selected === id ? ' selected' : '');
      el.innerHTML = it.icon;
      el.title = it.name + ' (right-click to examine)';
      el.setAttribute('aria-label', it.name);
      el.addEventListener('click', () => {
        if (S.selected && S.selected !== id) {
          const key = [S.selected, id].sort().join('+');
          const fn = COMBOS[key];
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
      ? `Using ${ITEMS[S.selected].name} — click a target, or another item to combine (click again to cancel)`
      : '';
  }

  function renderPuzzle() {
    const wrap = $('#puzzle');
    if (!puzzleId) {
      wrap.classList.add('hidden');
      return;
    }
    const p = PUZZLES[puzzleId];
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
    const h = CHAPTER.hints.find(x => x.when(g));
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
          { label: 'Restart', action: newGame },
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

  function newGame() {
    S = defaultState();
    zoomId = null;
    puzzleId = null;
    queue = [];
    afterQueue = null;
    save();
    showScreen('game');
    renderAll();
    say(CHAPTER.intro);
  }

  function continueGame() {
    S = loadSave() || defaultState();
    zoomId = null;
    puzzleId = null;
    queue = [];
    afterQueue = null;
    showScreen('game');
    renderAll();
  }

  function quitToTitle() {
    showScreen('title');
    $('#btn-continue').classList.toggle('hidden', !hasSave());
  }

  function init() {
    $('#title-art').innerHTML = Art.title();
    $('#end-art').innerHTML = Art.title();
    $('#btn-continue').classList.toggle('hidden', !hasSave());

    $('#btn-new').addEventListener('click', newGame);
    $('#btn-continue').addEventListener('click', continueGame);
    $('#btn-end-title').addEventListener('click', quitToTitle);
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
