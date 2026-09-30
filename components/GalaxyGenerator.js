'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const STAR_COUNT = 2400;
const BIRTH_TIME = 3200;

function createStars(seed) {
  let value = seed;
  const random = () => { value = (Math.imul(value, 1664525) + 1013904223) >>> 0; return value / 4294967296; };
  const arms = 3 + seed % 3;
  return Array.from({ length: STAR_COUNT }, (_, i) => {
    const radius = Math.pow(random(), .72);
    const scatter = (random() - .5) * (.16 + radius * .55);
    return {
      radius,
      angle: (i % arms) / arms * Math.PI * 2 + radius * (5 + seed % 3 * .35) + scatter,
      drift: (random() - .5) * .12,
      size: .35 + random() * 1.05,
      light: .35 + random() * .65,
      phase: random() * Math.PI * 2,
      hue: radius < .2 ? 35 + random() * 20 : 205 + random() * 85,
    };
  });
}

export default function GalaxyGenerator({ motion = true, externalControls = false, controlsTarget = null }) {
  const canvas = useRef(null);
  const root = useRef(null);
  const elapsed = useRef(0);
  const [generation, setGeneration] = useState(0);
  const [complete, setComplete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    const visibility = () => setPageVisible(!document.hidden);
    update();
    visibility();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(root.current);
    return () => {
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    const stars = createStars(53 + generation * 7919);
    const still = reduced || !motion;
    let width = 0;
    let height = 0;
    let frame;
    let previous;
    let announced = false;

    function paint() {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      // Sparse stars remain visible before the first galaxy is created.
      for (let i = 0; i < 90; i++) {
        context.fillStyle = `rgba(205,218,255,${.15 + (i % 5) * .09})`;
        context.beginPath();
        context.arc(((i * 137 + 41) % 997) / 997 * width, ((i * 223 + 71) % 991) / 991 * height, i % 9 === 0 ? 1 : .5, 0, Math.PI * 2);
        context.fill();
      }
      const progress = generation ? (still ? 1 : Math.min(1, elapsed.current / BIRTH_TIME)) : 0;
      const radius = Math.min(width * .43, height * .57);
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(-.32);
      const halo = context.createRadialGradient(0, 0, 0, 0, 0, radius * 1.1);
      halo.addColorStop(0, `rgba(237,199,255,${.1 + progress * .13})`);
      halo.addColorStop(.3, `rgba(123,81,241,${progress * .16})`);
      halo.addColorStop(1, 'rgba(73,100,230,0)');
      context.scale(1, .7);
      context.fillStyle = halo;
      context.fillRect(-radius * 1.1, -radius * 1.1, radius * 2.2, radius * 2.2);
      context.globalCompositeOperation = 'lighter';
      if (generation) {
        const rotation = still ? 0 : elapsed.current / 26000;
        for (const star of stars) {
          const birth = Math.max(0, Math.min(1, (progress - star.radius * .48) / .52));
          if (!birth) continue;
          const ease = 1 - Math.pow(1 - birth, 3);
          const angle = star.angle + rotation - (1 - ease) * 2.8;
          const distance = star.radius * radius * ease;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance + star.drift * radius * star.radius;
          const twinkle = still ? 1 : .8 + .2 * Math.sin(elapsed.current / 1100 + star.phase);
          context.fillStyle = `hsla(${star.hue},85%,${75 + star.light * 20}%,${star.light * birth * twinkle})`;
          context.beginPath();
          context.arc(x, y, star.size * Math.max(.65, width / 560), 0, Math.PI * 2);
          context.fill();
          if (star.size > 1.25) {
            context.fillStyle = `hsla(${star.hue},90%,75%,${.07 * birth})`;
            context.beginPath();
            context.arc(x, y, star.size * 3, 0, Math.PI * 2);
            context.fill();
          }
        }
      }
      const coreSize = generation ? 8 + radius * .2 * progress : 18;
      const core = context.createRadialGradient(0, 0, 0, 0, 0, coreSize);
      core.addColorStop(0, '#fff9e9');
      core.addColorStop(.12, '#ffe4c9e0');
      core.addColorStop(.4, '#cba2fa60');
      core.addColorStop(1, '#aa7bff00');
      context.fillStyle = core;
      context.fillRect(-coreSize, -coreSize, coreSize * 2, coreSize * 2);
      context.restore();
      if (progress === 1 && !announced) { announced = true; setComplete(true); }
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

    function tick(now) {
      if (previous !== undefined) elapsed.current += Math.min(now - previous, 64);
      previous = now;
      paint();
      frame = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    if (generation && !still && visible && pageVisible) frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [generation, motion, reduced, visible, pageVisible]);

  function generate() {
    elapsed.current = 0;
    setComplete(false);
    setGeneration(value => value + 1);
  }

  const controls = <div className="sb-actions"><button className="sb-primary" onClick={generate}><span aria-hidden="true">✦</span>{generation ? 'New galaxy' : 'Generate galaxy'}<span aria-hidden="true">↗</span></button></div>;

  return <section ref={root} className="galaxyGenerator" aria-label="Galaxy generator">
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <header className="gg-heading"><span>A UNIVERSE AT YOUR FINGERTIPS</span><h2>Let there be <em>galaxies.</em></h2></header>
    <button className="gg-stage" onClick={generate} aria-label={generation ? 'Create another spiral galaxy' : 'Create a spiral galaxy'}>
      <canvas ref={canvas} aria-hidden="true" />
      {!generation && <span className="gg-invitation">Touch a spark. Create a universe.<span>CLICK ANYWHERE TO BEGIN</span></span>}
    </button>
    <footer className="gg-footer"><span role="status" aria-live="polite">{!generation ? 'One click. Infinite possibilities.' : complete ? 'Your own little corner of the cosmos.' : 'A thousand lights finding their orbit…'}</span>{generation > 0 && <span className="gg-counter">GALAXY {String(generation).padStart(2, '0')}</span>}</footer>
    {!externalControls && <div className="gg-controls">{controls}</div>}
  </section>;
}
