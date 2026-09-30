'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function MagicCursorTrail({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const particles = useRef([]);
  const position = useRef({ x: .5, y: .55 });
  const [mode, setMode] = useState('Stars');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = null, previous = null, last = null, visible = false;
    const still = () => !motion || preference.matches;

    function paint() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = mode === 'Smoke' ? 'source-over' : 'lighter';
      particles.current.forEach((p, index) => {
        const life = Math.max(0, 1 - p.age / p.life);
        const x = p.x * width + (still() ? 0 : p.vx * p.age);
        const y = p.y * height + (still() ? 0 : p.vy * p.age);
        if (mode === 'Smoke') {
          const radius = p.size * (1 + p.age * 1.6);
          const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
          glow.addColorStop(0, `hsla(${p.hue},85%,77%,${life * .16})`);
          glow.addColorStop(.4, `hsla(${p.hue},85%,60%,${life * .09})`);
          glow.addColorStop(1, `hsla(${p.hue},85%,50%,0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        } else if (mode === 'Neon') {
          const before = particles.current[index - 1];
          if (!before || p.start) return;
          ctx.beginPath();
          ctx.moveTo(before.x * width, before.y * height);
          ctx.lineTo(x, y);
          ctx.lineCap = 'round';
          for (const [size, alpha] of [[14, .06], [7, .2], [2, .95]]) {
            ctx.lineWidth = size;
            ctx.strokeStyle = `hsla(${p.hue},100%,75%,${life * alpha})`;
            ctx.stroke();
          }
        } else {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.angle + p.age * .6);
          const radius = p.size * (.3 + life * .7);
          ctx.fillStyle = `hsla(${p.hue},100%,85%,${life})`;
          ctx.shadowColor = `hsl(${p.hue},100%,70%)`;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = i * Math.PI / 4;
            const r = i % 2 ? radius * .24 : radius;
            if (i) ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            else ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.globalCompositeOperation = 'source-over';
    }

    function stop() { if (frame !== null) cancelAnimationFrame(frame); frame = null; previous = null; }
    function tick(now) {
      frame = null;
      const delta = previous === null ? 0 : (now - previous) / 1000;
      previous = now;
      particles.current.forEach(p => { p.age += delta; });
      particles.current = particles.current.filter(p => p.age < p.life);
      paint();
      if (particles.current.length) frame = requestAnimationFrame(tick);
      else previous = null;
    }
    function start() {
      if (!still() && visible && !document.hidden && particles.current.length && frame === null) frame = requestAnimationFrame(tick);
    }
    function sync() { stop(); paint(); start(); }
    function move(x, y) {
      if (!width || !height) return;
      const next = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
      const distance = last ? Math.hypot((next.x - last.x) * width, (next.y - last.y) * height) : 0;
      const steps = Math.min(64, Math.max(1, Math.ceil(distance / (mode === 'Stars' ? 10 : 5))));
      for (let i = 1; i <= steps; i++) {
        particles.current.push({
          x: last ? last.x + (next.x - last.x) * i / steps : next.x,
          y: last ? last.y + (next.y - last.y) * i / steps : next.y,
          start: !last, age: 0, life: mode === 'Smoke' ? 2.2 : mode === 'Neon' ? 1.1 : 1.6,
          vx: mode === 'Neon' ? 0 : (Math.random() - .5) * 24,
          vy: mode === 'Smoke' ? -20 - Math.random() * 15 : mode === 'Neon' ? 0 : 10 + Math.random() * 20,
          hue: 180 + next.x * 130 + Math.random() * 25,
          size: mode === 'Smoke' ? 22 + Math.random() * 16 : 3 + Math.random() * 7,
          angle: Math.random() * Math.PI,
        });
      }
      particles.current = particles.current.slice(-(mode === 'Neon' ? 500 : mode === 'Smoke' ? 160 : 180));
      last = next;
      position.current = next;
      setStarted(true);
      paint();
      start();
    }
    function clear() { stop(); particles.current = []; last = null; setStarted(false); paint(); }
    function resize() {
      const rect = element.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    }
    engine.current = { move, clear, release: () => { last = null; } };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(element); observer.observe(element);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();
    return () => { stop(); engine.current = null; resizeObserver.disconnect(); observer.disconnect(); preference.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [mode, motion]);

  function pointer(event) {
    if (!event.isPrimary) return;
    const rect = event.currentTarget.getBoundingClientRect();
    engine.current?.move((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  }
  function keyboard(event) {
    const steps = { ArrowLeft: [-.035, 0], ArrowRight: [.035, 0], ArrowUp: [0, -.035], ArrowDown: [0, .035] };
    if (!steps[event.key]) return;
    event.preventDefault();
    engine.current?.move(position.current.x + steps[event.key][0], position.current.y + steps[event.key][1]);
  }
  const controls = <div className="sb-actions"><button className="sb-primary" onClick={() => engine.current?.clear()}><span aria-hidden="true">↻</span>Clear trail<span aria-hidden="true">↗</span></button></div>;
  return <section className="magicCursorTrail" aria-label="Magic cursor trail">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <button className="mct-field" aria-label="Draw a glowing trail. Move your pointer, drag, or use the arrow keys." onPointerMove={pointer}
      onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); pointer(event); }}
      onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); if (event.pointerType !== 'mouse') engine.current?.release(); }}
      onPointerLeave={() => engine.current?.release()} onPointerCancel={() => engine.current?.release()} onBlur={() => engine.current?.release()} onKeyDown={keyboard}
      onClick={event => { if (event.detail === 0) engine.current?.move(.5, .55); }}><canvas ref={canvas} aria-hidden="true" /></button>
    <div className="mct-heading"><span>LEAVE A LITTLE WONDER BEHIND.</span><h2>Every move, <em>a little magic.</em></h2><p>Draw with light. Let it linger.</p></div>
    {!started && <div className="mct-invitation" aria-hidden="true"><span>✧</span><small>MOVE YOUR CURSOR OR DRAG TO BEGIN</small></div>}
    <div className="mct-bottom"><div className="mct-modes" role="group" aria-label="Trail style">{['Stars', 'Smoke', 'Neon'].map(name => <button key={name} aria-pressed={mode === name} onClick={() => { engine.current?.clear(); setMode(name); }}>{name}</button>)}</div><span role="status" aria-live="polite">{mode} trail selected</span>{!externalControls && controls}</div>
  </section>;
}
