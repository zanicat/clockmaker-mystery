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
  };

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
