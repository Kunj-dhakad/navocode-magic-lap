'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PARTICLE_COUNT = 650;

export default function BlackHoleEffect({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const simulation = useRef({ particles: [], target: { x: .5, y: .57 }, hole: { x: .5, y: .57 }, active: false, captured: 0 });
  const [active, setActive] = useState(false);
  const [captured, setCaptured] = useState(0);

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    const state = simulation.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let visible = false;
    let frame = null;
    let previous = null;
    let announcementTime = 0;
    const still = () => !motion || preference.matches;

    function particle() {
      return { x: Math.random(), y: Math.random(), size: .4 + Math.random() * 1.3, hue: Math.random() > .25 ? 195 + Math.random() * 45 : 25 + Math.random() * 20, light: .3 + Math.random() * .65, trail: [] };
    }

    function paint() {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const cx = state.hole.x * width;
      const cy = state.hole.y * height;
      const scale = Math.min(1, Math.max(.65, Math.min(width, height) / 480));
      context.globalCompositeOperation = 'lighter';
      for (const p of state.particles) {
        const x = p.x * width;
        const y = p.y * height;
        if (p.trail.length > 1) {
          context.beginPath();
          p.trail.forEach(([tx, ty], index) => { if (!index) context.moveTo(tx * width, ty * height); else context.lineTo(tx * width, ty * height); });
          context.lineTo(x, y);
          context.strokeStyle = `hsla(${p.hue},90%,72%,${p.light * .5})`;
          context.lineWidth = p.size * .7;
          context.stroke();
        }
        context.fillStyle = `hsla(${p.hue},90%,80%,${p.light})`;
        context.beginPath();
        context.arc(x, y, p.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalCompositeOperation = 'source-over';
      context.save();
      context.translate(cx, cy);
      context.scale(scale, scale);
      const halo = context.createRadialGradient(0, 0, 25, 0, 0, 140);
      halo.addColorStop(0, '#ffb65f50');
      halo.addColorStop(.35, '#d7632822');
      halo.addColorStop(1, '#d7632800');
      context.fillStyle = halo;
      context.fillRect(-140, -140, 280, 280);
      context.rotate(-.28);
      context.shadowColor = '#ffb564';
      context.shadowBlur = 18;
      context.strokeStyle = '#ffca8790';
      context.lineWidth = 4;
      context.beginPath();
      context.ellipse(0, 0, 80, 20, 0, 0, Math.PI * 2);
      context.stroke();
      context.shadowBlur = 10;
      context.lineWidth = 1.2;
      context.strokeStyle = '#fff0bd';
      context.beginPath();
      context.ellipse(0, 0, 83, 22, 0, 0, Math.PI * 2);
      context.stroke();
      context.shadowBlur = 25;
      context.fillStyle = '#02030a';
      context.beginPath();
      context.arc(0, 0, 31, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = '#ffe4ab';
      context.lineWidth = 2;
      context.stroke();
      context.shadowBlur = 8;
      context.strokeStyle = '#fff2cc';
      context.lineWidth = 2.2;
      context.beginPath();
      context.ellipse(0, 0, 80, 20, 0, 0, Math.PI);
      context.stroke();
      context.restore();
    }

    function tick(now) {
      frame = null;
      const delta = previous === null ? 0 : Math.min((now - previous) / 1000, .04);
      previous = now;
      const ease = 1 - Math.exp(-12 * delta);
      state.hole.x += (state.target.x - state.hole.x) * ease;
      state.hole.y += (state.target.y - state.hole.y) * ease;
      const influence = Math.min(330, Math.min(width, height) * .7);
      for (const p of state.particles) {
        const dx = (state.hole.x - p.x) * width;
        const dy = (state.hole.y - p.y) * height;
        const distance = Math.hypot(dx, dy);
        const pull = state.active ? Math.max(0, 1 - distance / influence) : 0;
        if (pull > 0 && distance < 22) {
          Object.assign(p, particle());
          state.captured++;
          continue;
        }
        p.trail.push([p.x, p.y]);
        if (p.trail.length > 7) p.trail.shift();
        if (pull > 0) {
          const radial = 35 + pull * pull * 320;
          const tangent = 35 + pull * 140;
          p.x += (dx / distance * radial - dy / distance * tangent) * delta / width;
          p.y += (dy / distance * radial + dx / distance * tangent) * delta / height;
        } else {
          p.x += Math.sin(p.hue) * delta * .002;
          p.y += Math.cos(p.hue) * delta * .002;
        }
        if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) Object.assign(p, particle());
      }
      if (now - announcementTime > 700) { setCaptured(state.captured); announcementTime = now; }
      paint();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = null;
    }

    function sync() {
      stop();
      paint();
      if (!still() && visible && !document.hidden && width && height) frame = requestAnimationFrame(tick);
    }

    function move(x, y) {
      state.target = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
      state.active = true;
      setActive(true);
      if (still()) { state.hole = { ...state.target }; paint(); }
    }

    function release() { state.active = false; setActive(false); }

    function reset() {
      state.particles = Array.from({ length: PARTICLE_COUNT }, particle);
      state.captured = 0;
      state.target = { x: .5, y: .57 };
      state.hole = { ...state.target };
      release();
      setCaptured(0);
      paint();
    }

    function resize() {
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!state.particles.length) state.particles = Array.from({ length: PARTICLE_COUNT }, particle);
      sync();
    }

    engine.current = { move, release, reset };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(element);
    observer.observe(element);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();
    return () => {
      stop();
      engine.current = null;
      resizeObserver.disconnect();
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [motion]);

  function movePointer(event) {
    if (!event.isPrimary) return;
    const rect = event.currentTarget.getBoundingClientRect();
    engine.current?.move((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  }

  function keyMove(event) {
    const steps = { ArrowLeft: [-.05, 0], ArrowRight: [.05, 0], ArrowUp: [0, -.05], ArrowDown: [0, .05] };
    if (event.key === 'Escape') { event.preventDefault(); engine.current?.release(); return; }
    if (!steps[event.key]) return;
    event.preventDefault();
    const [x, y] = steps[event.key];
    engine.current?.move(simulation.current.target.x + x, simulation.current.target.y + y);
  }

  const controls = <div className="sb-actions"><button className="sb-primary" onClick={() => engine.current?.reset()}><span aria-hidden="true">↻</span>Reset particles<span aria-hidden="true">↗</span></button></div>;

  return <section className="blackHoleEffect" aria-label="Interactive black hole">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <button className="bh-space" aria-label="Black hole field. Move your pointer or drag to attract particles. Use arrow keys to move, Enter to activate, and Escape to release."
      onPointerMove={movePointer} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); movePointer(event); }}
      onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); if (event.pointerType !== 'mouse') engine.current?.release(); }}
      onPointerCancel={() => engine.current?.release()} onPointerLeave={() => engine.current?.release()} onBlur={() => engine.current?.release()}
      onKeyDown={keyMove} onClick={event => { if (event.detail === 0) engine.current?.move(.5, .57); }}>
      <canvas ref={canvas} aria-hidden="true" />
    </button>
    <div className="bh-heading"><span>EVEN LIGHT LEANS CLOSER.</span><h2>A little pull. <em>Infinite gravity.</em></h2><p>Move your cursor. Watch the stars fall in.</p></div>
    <div className="bh-footer"><span className={active ? 'bh-active' : ''}><i />{active ? 'GRAVITY ACTIVE' : 'MOVE OR DRAG TO ATTRACT'}</span><span><b>{String(captured).padStart(3, '0')}</b> ABSORBED</span></div>
    <span className="s-sr-only" role="status" aria-live="polite">{active ? 'Gravity active. Nearby particles spiral into the black hole.' : 'Move your pointer or drag across the field to attract particles.'}</span>
    {!externalControls && <div className="bh-controls">{controls}</div>}
  </section>;
}
