'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MAX_BURSTS = 12;
const PARTICLES = 120;

export default function FireworksOnClick({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const bursts = useRef([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = null;
    let previous = null;
    let visible = false;
    const still = () => !motion || preference.matches;

    function paint() {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      for (const burst of bursts.current) {
        const age = burst.age;
        const cx = burst.x * width;
        const cy = burst.y * height;
        const scale = Math.min(1, Math.max(.5, Math.min(width, height) / 460));
        if (age < .65) {
          const radius = (12 + age * 120) * scale;
          const glow = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
          glow.addColorStop(0, `hsla(${burst.hue},100%,80%,${.25 * (1 - age / .65)})`);
          glow.addColorStop(1, `hsla(${burst.hue},100%,60%,0)`);
          context.fillStyle = glow;
          context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
        }
        for (const particle of burst.particles) {
          const life = 1 - age / particle.life;
          if (life <= 0) continue;
          const distance = (1 - Math.exp(-1.25 * age)) / 1.25;
          const tailAge = Math.max(0, age - .055 - life * .045);
          const tailDistance = (1 - Math.exp(-1.25 * tailAge)) / 1.25;
          const x = cx + particle.vx * distance * scale;
          const y = cy + (particle.vy * distance + 48 * age * age) * scale;
          const tx = cx + particle.vx * tailDistance * scale;
          const ty = cy + (particle.vy * tailDistance + 48 * tailAge * tailAge) * scale;
          const alpha = Math.min(1, life * 1.6);
          context.strokeStyle = `hsla(${particle.hue},100%,65%,${alpha * .15})`;
          context.lineWidth = particle.size * 4 * scale;
          context.lineCap = 'round';
          context.beginPath();
          context.moveTo(tx, ty);
          context.lineTo(x, y);
          context.stroke();
          context.strokeStyle = `hsla(${particle.hue},100%,78%,${alpha})`;
          context.lineWidth = particle.size * scale;
          context.stroke();
          context.fillStyle = `rgba(255,249,234,${alpha * .9})`;
          context.beginPath();
          context.arc(x, y, Math.max(.45, particle.size * scale * .5), 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalCompositeOperation = 'source-over';
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = null;
    }

    function tick(now) {
      frame = null;
      const delta = previous === null ? 0 : Math.min((now - previous) / 1000, .05);
      previous = now;
      bursts.current.forEach(burst => { burst.age += delta; });
      bursts.current = bursts.current.filter(burst => burst.age < 2.5);
      paint();
      if (bursts.current.length) frame = requestAnimationFrame(tick);
      else previous = null;
    }

    function sync() {
      stop();
      if (still()) bursts.current.forEach(burst => { burst.age = Math.max(.45, burst.age); });
      paint();
      if (!still() && visible && !document.hidden && bursts.current.length) frame = requestAnimationFrame(tick);
    }

    function launch(x = .3 + Math.random() * .4, y = .25 + Math.random() * .35) {
      const hue = (bursts.current.length * 67 + Math.random() * 360) % 360;
      const particles = Array.from({ length: PARTICLES }, (_, i) => {
        const angle = i / PARTICLES * Math.PI * 2 + (Math.random() - .5) * .08;
        const speed = 90 + Math.pow(Math.random(), .45) * 250;
        return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, hue: hue + (i % 3) * 45 + Math.random() * 20, life: 1.3 + Math.random() * 1.2, size: .8 + Math.random() * 1.4 };
      });
      bursts.current = [...bursts.current.slice(-(MAX_BURSTS - 1)), { x, y, hue, age: .025, particles }];
      setCount(value => value + 1);
      sync();
    }

    function resize() {
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    }

    engine.current = { launch };
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

  function fire(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    engine.current?.launch(event.detail === 0 ? .5 : (event.clientX - rect.left) / rect.width, event.detail === 0 ? .5 : (event.clientY - rect.top) / rect.height);
  }

  const controls = <div className="sb-actions"><button className="sb-primary" onClick={() => engine.current?.launch()}><span aria-hidden="true">✺</span>Launch fireworks<span aria-hidden="true">↗</span></button></div>;

  return <section className="fireworksOnClick" aria-label="Fireworks on click">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <button className="fw-sky" onClick={fire} aria-label="Launch fireworks here. Click anywhere, or press Enter or Space.">
      <canvas ref={canvas} aria-hidden="true" />
    </button>
    <div className="fw-heading"><span>YOUR SKY. YOUR CELEBRATION.</span><h2>Make the night <em>yours.</em></h2><p>Click anywhere. Let the colors fly.</p></div>
    {!count && <div className="fw-invitation" aria-hidden="true"><span>✧</span><i /><small>TAP A LITTLE MAGIC INTO THE SKY</small></div>}
    <div className="fw-footer"><span><i /> {count ? 'KEEP CLICKING. KEEP CELEBRATING.' : 'THE NIGHT IS WAITING FOR YOU.'}</span><span className="fw-count" aria-hidden="true">{String(count).padStart(2, '0')} <b>BURSTS</b></span></div>
    <span className="s-sr-only" role="status" aria-live="polite">{count ? `${count} ${count === 1 ? 'firework' : 'fireworks'} launched.` : 'Click the sky to launch a firework.'}</span>
    {!externalControls && <div className="fw-controls">{controls}</div>}
  </section>;
}
