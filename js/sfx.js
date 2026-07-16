/* Sfx: tiny synthesized sound effects via Web Audio — no audio files.
   The AudioContext is created lazily on the first pointer gesture
   (browser autoplay policy); Sfx.play() silently no-ops before that,
   when muted, or when Web Audio is unavailable. */

const Sfx = (() => {
  const SETTINGS_KEY = 'clockmakers-secret-settings';

  let ctx = null;
  let muted = false;

  try {
    muted = !!(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}).muted;
  } catch (e) { /* default: sound on */ }

  function persist() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ muted })); }
    catch (e) { /* ignore */ }
  }

  function ensureContext() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { ctx = new AC(); } catch (e) { /* stay silent */ }
  }

  // Any pointer gesture is a chance to create/resume the context.
  window.addEventListener('pointerdown', ensureContext);

  function tone(freq, dur, type, gain, when, glide) {
    const t0 = ctx.currentTime + (when || 0);
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + glide), t0 + dur);
    g.gain.setValueAtTime(gain || 0.06, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function swish(dur, gain, centerFreq) {
    const t0 = ctx.currentTime;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = centerFreq;
    const g = ctx.createGain();
    g.gain.value = gain;
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start(t0);
  }

  const voices = {
    click:   () => tone(1400, 0.035, 'square', 0.025),
    pickup:  () => { tone(520, 0.09, 'sine', 0.06); tone(780, 0.12, 'sine', 0.05, 0.07); },
    stow:    () => { tone(660, 0.07, 'sine', 0.04); tone(440, 0.1, 'sine', 0.035, 0.06); },
    unlock:  () => { tone(150, 0.16, 'triangle', 0.11, 0, -70); tone(95, 0.22, 'sine', 0.09, 0.09); },
    success: () => [523, 659, 784].forEach((f, i) => tone(f, 0.16, 'sine', 0.055, i * 0.09)),
    chime:   () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.7, 'sine', 0.05, i * 0.2)),
    page:    () => swish(0.18, 0.06, 1600),
    error:   () => tone(115, 0.13, 'square', 0.035),
    beam:    () => { tone(880, 0.5, 'sine', 0.05, 0, 300); tone(1320, 0.4, 'sine', 0.03, 0.08); },
    shutter: () => { tone(180, 0.08, 'square', 0.05); swish(0.12, 0.05, 900); },
    prism:   () => [660, 830, 990].forEach((f, i) => tone(f, 0.22, 'sine', 0.03, i * 0.06)),
    knock:   () => { tone(190, 0.09, 'triangle', 0.09); tone(120, 0.12, 'sine', 0.05, 0.02); },
    hollow:  () => { tone(140, 0.24, 'triangle', 0.1, 0, -40); swish(0.12, 0.04, 300); },
    creak:   () => tone(240, 0.3, 'sawtooth', 0.02, 0, 90),
    breath:  () => swish(0.5, 0.05, 240),
    wind:    () => { swish(0.6, 0.05, 200); tone(90, 0.5, 'sine', 0.03, 0.1, 20); },
    wail:    () => { tone(392, 1.1, 'sine', 0.055, 0, -18); tone(388, 1.1, 'sine', 0.04, 0.05, -18); },
    hum:     () => { tone(392, 0.9, 'sine', 0.05, 0.45); tone(390, 0.9, 'sine', 0.02, 0.45); },
  };

  // The monochord's peg-scale: pitch1..pitch10, a semitone ladder with
  // the ghost's G (392 Hz) sitting at peg 7.
  for (let i = 1; i <= 10; i++) {
    voices['pitch' + i] = () => tone(392 * Math.pow(2, (i - 7) / 12), 0.45, 'triangle', 0.05);
  }

  return {
    play(name) {
      if (muted || !ctx || !voices[name]) return;
      try { voices[name](); } catch (e) { /* never let audio break the game */ }
    },
    isMuted: () => muted,
    toggleMute() {
      muted = !muted;
      persist();
      return muted;
    },
  };
})();
