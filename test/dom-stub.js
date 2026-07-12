/* Minimal DOM + localStorage stub, enough for engine.js to run headless.
   Also exposes test helpers: hotspot(), adv(), invClick(), invExamine(),
   puzzleAct(), btnByText(), state checks. */

var window = globalThis;
window.addEventListener = function () {};

/* Timers never fire in the stub — flash messages just stay put. */
var __timerId = 0;
function setTimeout() { return ++__timerId; }
function clearTimeout() {}

var __els = {};

function makeEl(tag) {
  var el = {
    tagName: tag,
    children: [],
    listeners: {},
    _class: {},
    style: {},
    attrs: {},
    dataset: {},
    textContent: '',
    title: '',
    _innerHTML: '',
    parentNode: null,
  };
  el.classList = {
    add: function (c) { el._class[c] = true; },
    remove: function (c) { delete el._class[c]; },
    toggle: function (c, force) {
      if (force === undefined) { if (el._class[c]) delete el._class[c]; else el._class[c] = true; }
      else if (force) el._class[c] = true;
      else delete el._class[c];
    },
    contains: function (c) { return !!el._class[c]; },
  };
  el.setAttribute = function (k, v) { el.attrs[k] = v; };
  el.getAttribute = function (k) { return el.attrs[k]; };
  el.addEventListener = function (type, fn) {
    (el.listeners[type] = el.listeners[type] || []).push(fn);
  };
  el.appendChild = function (c) { el.children.push(c); c.parentNode = el; return c; };
  el.querySelectorAll = function (sel) {
    // supports '[data-act]' and '[data-x]' style attribute selectors on parsed children
    var attr = sel.replace(/^\[|\]$/g, '');
    var out = [];
    (function walk(n) {
      for (var i = 0; i < n.children.length; i++) {
        var c = n.children[i];
        if (c.dataset[camel(attr.replace(/^data-/, ''))] !== undefined) out.push(c);
        walk(c);
      }
    })(el);
    return out;
  };
  el.click = function (evt) {
    var fns = el.listeners.click || [];
    for (var i = 0; i < fns.length; i++) fns[i](evt || { target: el, preventDefault: function () {} });
  };
  el.contextmenu = function () {
    var fns = el.listeners.contextmenu || [];
    for (var i = 0; i < fns.length; i++) fns[i]({ target: el, preventDefault: function () {} });
  };
  Object.defineProperty(el, 'className', {
    get: function () { return Object.keys(el._class).join(' '); },
    set: function (v) {
      el._class = {};
      String(v).split(/\s+/).forEach(function (c) { if (c) el._class[c] = true; });
    },
  });
  Object.defineProperty(el, 'innerHTML', {
    get: function () { return el._innerHTML; },
    set: function (v) {
      el._innerHTML = v == null ? '' : String(v);
      el.children = [];
      // Parse elements carrying data-* attributes into stub children so
      // puzzle wire() can find them via querySelectorAll('[data-act]').
      var re = /<(button|div|span)\b([^>]*\bdata-[^>]*)>([^<]*)/g;
      var m;
      while ((m = re.exec(el._innerHTML))) {
        var child = makeEl(m[1]);
        var attrRe = /data-([a-z0-9-]+)="([^"]*)"/g;
        var am;
        while ((am = attrRe.exec(m[2]))) child.dataset[camel(am[1])] = am[2];
        child.textContent = m[3];
        el.appendChild(child);
      }
    },
  });
  return el;
}

function camel(s) { return s.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

var document = {
  querySelector: function (sel) {
    var id = sel.charAt(0) === '#' ? sel.slice(1) : sel;
    if (!__els[id]) __els[id] = makeEl('div');
    return __els[id];
  },
  createElement: function (tag) { return makeEl(tag); },
  addEventListener: function () {},
};
window.document = document;

var localStorage = {
  _s: {},
  getItem: function (k) { return Object.prototype.hasOwnProperty.call(this._s, k) ? this._s[k] : null; },
  setItem: function (k, v) { this._s[k] = String(v); },
  removeItem: function (k) { delete this._s[k]; },
};
window.localStorage = localStorage;

// Elements that start with class="hidden" in index.html
['screen-end', 'screen-game', 'zoom', 'dialogue-catcher', 'dialogue', 'puzzle', 'modal', 'btn-end-next', 'journal']
  .forEach(function (id) { document.querySelector('#' + id).classList.add('hidden'); });

// ---------- test helpers ----------

function isHidden(id) { return __els[id]._class['hidden'] === true; }

function labelsIn(id) {
  return __els[id].children.map(function (c) { return c.attrs['aria-label']; });
}

function hotspot(label) {
  var inZoom = !isHidden('zoom');
  var cont = __els[inZoom ? 'zoom-hotspots' : 'scene-hotspots'];
  for (var i = 0; i < cont.children.length; i++) {
    if (cont.children[i].attrs['aria-label'] === label) { cont.children[i].click(); return; }
  }
  throw new Error('hotspot "' + label + '" not found in ' + (inZoom ? 'zoom' : 'scene') +
    '; available: ' + labelsIn(inZoom ? 'zoom-hotspots' : 'scene-hotspots').join(', '));
}

function adv() {
  var n = 0;
  while (!isHidden('dialogue-catcher') && n++ < 200) __els['dialogue-catcher'].click();
  if (n >= 200) throw new Error('dialogue never ended');
}

function invSlot(name) {
  var cont = __els['inv-slots'];
  for (var i = 0; i < cont.children.length; i++) {
    if (cont.children[i].attrs['aria-label'] === name) return cont.children[i];
  }
  throw new Error('inventory item "' + name + '" not found; have: ' + labelsIn('inv-slots').join(', '));
}

function invClick(name) { invSlot(name).click(); }
function invExamine(name) { invSlot(name).contextmenu(); }
function invNames() { return labelsIn('inv-slots'); }

function puzzleAct(act) {
  var kids = __els['puzzle-body'].querySelectorAll('[data-act]');
  for (var i = 0; i < kids.length; i++) {
    if (kids[i].dataset.act === act) { kids[i].click(); return; }
  }
  throw new Error('puzzle action "' + act + '" not found; have: ' +
    kids.map(function (k) { return k.dataset.act; }).join(', '));
}

function chapterBtn(chapterTitle, btnLabel) {
  var list = __els['chapter-list'];
  for (var i = 0; i < list.children.length; i++) {
    var card = list.children[i];
    var titleText = '';
    (function walk(n) {
      for (var j = 0; j < n.children.length; j++) {
        var c = n.children[j];
        if (c._class['chapter-title']) titleText = c.textContent;
        walk(c);
      }
    })(card);
    if (titleText === chapterTitle) {
      var found = null;
      (function walk(n) {
        for (var j = 0; j < n.children.length; j++) {
          var c = n.children[j];
          if (c.tagName === 'button' && c.textContent === btnLabel && !found) found = c;
          walk(c);
        }
      })(card);
      if (!found) throw new Error('button "' + btnLabel + '" not on card "' + chapterTitle + '"');
      found.click();
      return;
    }
  }
  throw new Error('chapter card "' + chapterTitle + '" not found');
}

function btnByText(containerId, text) {
  var found = null;
  (function walk(n) {
    for (var i = 0; i < n.children.length; i++) {
      var c = n.children[i];
      if (c.tagName === 'button' && c.textContent === text && !found) found = c;
      walk(c);
    }
  })(__els[containerId]);
  if (!found) throw new Error('button "' + text + '" not found in #' + containerId);
  found.click();
}

function assert(cond, msg) { if (!cond) throw new Error('ASSERT: ' + msg); }
