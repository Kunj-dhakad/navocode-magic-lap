'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SIZE = 384;
const LIMIT = 2400;

function sample(ink, uploaded = false) {
  const { data } = ink.getImageData(0, 0, SIZE, SIZE);
  let transparent = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 40) transparent++;
  const alphaMask = transparent > SIZE * SIZE * .01;
  const corners = [0, SIZE - 1, SIZE * (SIZE - 1), SIZE * SIZE - 1].map(i => Array.from(data.slice(i * 4, i * 4 + 3)));
  const background = [0, 1, 2].map(c => corners.reduce((sum, pixel) => sum + pixel[c], 0) / 4);
  const uniform = corners.every(pixel => pixel.every((channel, c) => Math.abs(channel - background[c]) < 25));
  const points = [];
  for (let y = 2; y < SIZE; y += 3) {
    for (let x = 2; x < SIZE; x += 3) {
      const i = (y * SIZE + x) * 4;
      if (data[i + 3] < 80) continue;
      const difference = Math.hypot(data[i] - background[0], data[i + 1] - background[1], data[i + 2] - background[2]);
      if (uploaded && !alphaMask && uniform && difference < 55) continue;
      const light = (data[i] * .2126 + data[i + 1] * .7152 + data[i + 2] * .0722) / 255;
      if (uploaded && !alphaMask && !uniform && light < .08) continue;
      points.push({ x, y, light: uploaded && !uniform ? .25 + light * .75 : .8 });
    }
  }
  if (!points.length) throw new Error('No visible shape found. Try a logo with a clear outline or a transparent background.');
  const minX = Math.min(...points.map(p => p.x)), maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y)), maxY = Math.max(...points.map(p => p.y));
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const stride = Math.max(1, Math.ceil(points.length / LIMIT));
  return points.filter((_, i) => i % stride === 0).map(p => ({ x: (p.x - (minX + maxX) / 2) / span, y: (p.y - (minY + maxY) / 2) / span, light: p.light }));
}

function preset(name) {
  const mask = document.createElement('canvas'); mask.width = SIZE; mask.height = SIZE;
  const ink = mask.getContext('2d', { willReadFrequently: true });
  ink.strokeStyle = '#fff'; ink.fillStyle = '#fff'; ink.lineCap = 'round'; ink.lineJoin = 'round';
  if (name === 'Logo') {
    ink.lineWidth = 10;
    ink.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 3 * i - Math.PI / 2;
      const x = 192 + Math.cos(angle) * 159, y = 192 + Math.sin(angle) * 159;
      if (!i) ink.moveTo(x, y); else ink.lineTo(x, y);
    }
    ink.closePath(); ink.stroke();
    ink.lineWidth = 29;
    ink.beginPath(); ink.moveTo(140, 255); ink.lineTo(140, 131); ink.lineTo(244, 255); ink.lineTo(244, 131); ink.stroke();
  } else {
    ink.lineWidth = 7;
    ink.beginPath(); ink.moveTo(113, 131); ink.bezierCurveTo(107, 38, 275, 38, 271, 131); ink.bezierCurveTo(280, 218, 239, 276, 192, 282); ink.bezierCurveTo(145, 276, 104, 218, 113, 131); ink.stroke();
    ink.beginPath(); ink.moveTo(115, 128); ink.bezierCurveTo(152, 125, 177, 108, 194, 81); ink.bezierCurveTo(208, 109, 244, 125, 271, 128); ink.stroke();
    ink.lineWidth = 5;
    for (const x of [153, 231]) {
      ink.beginPath(); ink.ellipse(x, 163, 18, 8, 0, 0, Math.PI * 2); ink.stroke();
      ink.beginPath(); ink.arc(x, 163, 5, 0, Math.PI * 2); ink.fill();
      ink.beginPath(); ink.moveTo(x - 20, 143); ink.quadraticCurveTo(x, 135, x + 18, 142); ink.stroke();
    }
    ink.beginPath(); ink.moveTo(194, 174); ink.lineTo(187, 207); ink.quadraticCurveTo(194, 214, 203, 206); ink.stroke();
    ink.beginPath(); ink.moveTo(164, 231); ink.quadraticCurveTo(192, 251, 220, 231); ink.quadraticCurveTo(192, 239, 164, 231); ink.stroke();
    ink.beginPath(); ink.moveTo(159, 273); ink.lineTo(153, 299); ink.quadraticCurveTo(85, 307, 68, 346); ink.moveTo(225, 273); ink.lineTo(231, 299); ink.quadraticCurveTo(299, 307, 316, 346); ink.moveTo(153, 299); ink.quadraticCurveTo(192, 329, 231, 299); ink.stroke();
  }
  return sample(ink);
}

export default function ParticleReveal({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null), fileInput = useRef(null), engine = useRef(null);
  const moving = useRef(motion), request = useRef(0), urls = useRef(new Set());
  const [shape, setShape] = useState('Logo');
  const [custom, setCustom] = useState(null);
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { moving.current = motion; engine.current?.sync(); }, [motion]);
  useEffect(() => () => { request.current++; urls.current.forEach(url => URL.revokeObjectURL(url)); urls.current.clear(); }, []);

  useEffect(() => {
    const element = canvas.current, ctx = element.getContext('2d');
    if (!ctx) return;
    const targets = shape === 'Your image' && custom ? custom.points : preset(shape);
    const dots = targets.map(target => ({ ...target, sx: Math.random(), sy: Math.random(), delay: Math.random() * .65, bend: (Math.random() - .5) * .25 }));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, elapsed = 0, frame = null, previous = null, visible = false;
    const still = () => !moving.current || preference.matches;
    setReady(false);
    function paint() {
      ctx.clearRect(0, 0, width, height);
      const size = Math.min(width * .7, height * .8, 370);
      const radius = Math.max(.65, size / 230);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of dots) {
        const t = still() ? 1 : Math.max(0, Math.min(1, (elapsed - p.delay) / 2));
        const ease = t * t * (3 - 2 * t);
        const tx = width / 2 + p.x * size, ty = height / 2 + p.y * size;
        const x = p.sx * width * (1 - ease) + tx * ease + Math.sin(t * Math.PI) * p.bend * size;
        const y = p.sy * height * (1 - ease) + ty * ease;
        const hue = 185 + (p.x + .5) * 100;
        ctx.fillStyle = `hsla(${hue},100%,75%,${p.light * .065})`;
        ctx.beginPath(); ctx.arc(x, y, radius * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${hue},100%,${65 + p.light * 25}%,${.35 + p.light * .65})`;
        ctx.beginPath(); ctx.arc(x, y, radius * (.5 + p.light * .5), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
    function stop() { if (frame !== null) cancelAnimationFrame(frame); frame = null; previous = null; }
    function tick(now) {
      frame = null;
      if (previous !== null) elapsed += (now - previous) / 1000;
      previous = now; paint();
      if (elapsed < 2.7) frame = requestAnimationFrame(tick);
      else { setReady(true); previous = null; }
    }
    function sync() {
      stop();
      if (still()) { elapsed = 2.7; setReady(true); }
      paint();
      if (!still() && visible && !document.hidden && elapsed < 2.7 && width && height) frame = requestAnimationFrame(tick);
    }
    function resize() {
      const rect = element.getBoundingClientRect(); width = rect.width; height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); sync();
    }
    engine.current = { sync };
    const resizeObserver = new ResizeObserver(resize), observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(element); observer.observe(element);
    preference.addEventListener('change', sync); document.addEventListener('visibilitychange', sync); resize();
    return () => { stop(); engine.current = null; resizeObserver.disconnect(); observer.disconnect(); preference.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [shape, custom, run]);

  function choose(name) { request.current++; setBusy(false); setError(''); setShape(name); setRun(value => value + 1); }
  async function upload(event) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    const current = ++request.current;
    setBusy(false); setError('');
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setError('Choose a PNG, JPG or WebP image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Choose an image smaller than 5 MB.'); return; }
    setBusy(true);
    const url = URL.createObjectURL(file); urls.current.add(url);
    try {
      const image = await new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(new Error('This image could not be opened. Try another file.')); img.src = url; });
      if (current !== request.current) return;
      const mask = document.createElement('canvas'); mask.width = SIZE; mask.height = SIZE;
      const ink = mask.getContext('2d', { willReadFrequently: true });
      // Fill the sample area so opaque image borders can be detected and removed.
      ink.drawImage(image, 0, 0, SIZE, SIZE);
      const points = sample(ink, true);
      // Restore the original image proportions after sampling.
      const aspect = image.naturalWidth / image.naturalHeight;
      points.forEach(p => { if (aspect > 1) p.y /= aspect; else p.x *= aspect; });
      setCustom({ points, name: file.name }); setShape('Your image'); setRun(value => value + 1);
    } catch (failure) { if (current === request.current) setError(failure.message); }
    finally { URL.revokeObjectURL(url); urls.current.delete(url); if (current === request.current) setBusy(false); }
  }

  const controls = <div className="sb-actions"><button className="sb-primary" onClick={() => setRun(value => value + 1)}><span aria-hidden="true">✦</span>Replay reveal<span aria-hidden="true">↗</span></button></div>;
  return <section className="particleReveal" aria-label="Particle face and logo reveal">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <header className="pr-heading"><span>SCATTERED LIGHT. A FAMILIAR SHAPE.</span><h2>From a little chaos, <em>you appear.</em></h2></header>
    <div className="pr-art"><canvas ref={canvas} role="img" aria-label={`Particles revealing ${shape === 'Your image' ? custom?.name : shape.toLowerCase()}`} /></div>
    <div className="pr-editor">
      <div className="pr-options" role="group" aria-label="Reveal shape">{['Logo', 'Face', ...(custom ? ['Your image'] : [])].map(name => <button key={name} aria-pressed={shape === name} onClick={() => choose(name)}>{name}</button>)}<button className="pr-upload" onClick={() => fileInput.current?.click()}>{busy ? 'Opening…' : 'Upload image'}<span aria-hidden="true">↗</span></button></div>
      <input ref={fileInput} className="s-sr-only" type="file" accept="image/png,image/jpeg,image/webp" aria-label="Upload a face or logo image" onChange={upload} tabIndex={-1} />
      <p className="pr-help">Your logo or portrait · PNG, JPG, WebP · up to 5 MB</p>
      {error && <p className="pr-error" role="alert">{error}</p>}
      <span className="pr-status" role="status" aria-live="polite">{busy ? 'Opening your image…' : ready ? 'Every dot found its place.' : 'Gathering the pieces…'}</span>
      {!externalControls && controls}
    </div>
  </section>;
}
