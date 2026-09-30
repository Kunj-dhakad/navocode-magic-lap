'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function TextToParticles({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const moving = useRef(motion);
  const particles = useRef([]);
  const [draft, setDraft] = useState('CODE');
  const [phrase, setPhrase] = useState('CODE');
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const inputId = useId();

  useEffect(() => { moving.current = motion; engine.current?.sync(); }, [motion]);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, elapsed = 0, frame = null, previous = null, visible = false;
    const still = () => !moving.current || preference.matches;
    setReady(false);

    function paint() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles.current) {
        const progress = still() ? 1 : Math.max(0, Math.min(1, (elapsed - p.delay) / 1.8));
        const ease = 1 - Math.pow(1 - progress, 4);
        p.x = p.sx + (p.tx - p.sx) * ease;
        p.y = p.sy + (p.ty - p.sy) * ease;
        const x = p.x * width;
        const y = p.y * height;
        ctx.fillStyle = `hsla(${p.hue},100%,72%,.07)`;
        ctx.beginPath(); ctx.arc(x, y, p.size * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${p.hue},100%,${75 + p.light * 20}%,${.6 + p.light * .4})`;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    function stop() { if (frame !== null) cancelAnimationFrame(frame); frame = null; previous = null; }
    function tick(now) {
      frame = null;
      if (previous !== null) elapsed += (now - previous) / 1000;
      previous = now;
      paint();
      if (elapsed < 2.3) frame = requestAnimationFrame(tick);
      else { setReady(true); previous = null; }
    }
    function sync() {
      stop();
      if (still()) { elapsed = 2.3; setReady(true); }
      paint();
      if (!still() && visible && !document.hidden && elapsed < 2.3 && width && height) frame = requestAnimationFrame(tick);
    }
    function form() {
      if (!width || !height) return;
      // Sample the rendered letters so custom text uses the same particle treatment.
      const mask = document.createElement('canvas');
      mask.width = Math.round(width); mask.height = Math.round(height);
      const ink = mask.getContext('2d', { willReadFrequently: true });
      let size = Math.min(height * .66, width * .34, 220);
      ink.font = `900 ${size}px Arial, sans-serif`;
      size *= Math.min(1, width * .84 / Math.max(1, ink.measureText(phrase).width));
      ink.font = `900 ${size}px Arial, sans-serif`;
      ink.textAlign = 'center'; ink.textBaseline = 'middle'; ink.fillStyle = '#fff';
      ink.fillText(phrase, width / 2, height / 2);
      const data = ink.getImageData(0, 0, mask.width, mask.height).data;
      const gap = Math.max(3, Math.round(size / 30));
      const previousParticles = particles.current;
      const points = [];
      for (let y = gap; y < mask.height; y += gap) {
        for (let x = gap; x < mask.width; x += gap) {
          if (data[(y * mask.width + x) * 4 + 3] < 140) continue;
          const old = previousParticles[points.length % Math.max(1, previousParticles.length)];
          points.push({ tx: x / width, ty: y / height, sx: old ? old.x : Math.random(), sy: old ? old.y : Math.random(), x: 0, y: 0, delay: Math.random() * .45, size: gap * (.22 + Math.random() * .09), hue: 180 + x / width * 130, light: Math.random() });
        }
      }
      particles.current = points;
      elapsed = 0;
      setReady(false);
      sync();
    }
    function resize() {
      const rect = element.getBoundingClientRect();
      if (rect.width === width && rect.height === height) return;
      width = rect.width; height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      form();
    }
    engine.current = { sync };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(element); observer.observe(element);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();
    return () => { stop(); engine.current = null; resizeObserver.disconnect(); observer.disconnect(); preference.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [phrase, run]);

  function formText(value) {
    const text = value.trim();
    if (!text) { setError('Add a word or number first.'); return; }
    setError(''); setDraft(text); setPhrase(text); setRun(value => value + 1);
  }
  function replay() { particles.current = []; setRun(value => value + 1); }
  const controls = <div className="sb-actions"><button className="sb-primary" onClick={replay}><span aria-hidden="true">✦</span>Replay formation<span aria-hidden="true">↗</span></button></div>;

  return <section className="textToParticles" aria-label="Text to particles">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <header className="ttp-heading"><span>A THOUSAND LIGHTS. YOUR WORDS.</span><h2>Give your words <em>a little wonder.</em></h2></header>
    <div className="ttp-art"><canvas ref={canvas} role="img" aria-label={`Particles forming ${phrase}`} /></div>
    <div className="ttp-editor">
      <div className="ttp-presets" role="group" aria-label="Text presets">{['LOVE', 'CODE', '2027'].map(text => <button key={text} aria-pressed={phrase === text} onClick={() => formText(text)}>{text}</button>)}</div>
      <form onSubmit={event => { event.preventDefault(); formText(draft); }}>
        <label className="s-sr-only" htmlFor={inputId}>Your text</label>
        <input id={inputId} value={draft} onChange={event => { setDraft(event.target.value); setError(''); }} maxLength={12} placeholder="Your word…" autoComplete="off" spellCheck={false} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : undefined} />
        <button type="submit">Make magic <span aria-hidden="true">↗</span></button>
      </form>
      {error ? <p id={`${inputId}-error`} className="ttp-error" role="alert">{error}</p> : <p role="status" aria-live="polite">{ready ? `“${phrase}” — written in light.` : `Gathering particles into “${phrase}”…`}</p>}
      {!externalControls && controls}
    </div>
  </section>;
}
