'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const COUNT = 30;
const GAP = 220;
const DRAW_TIME = 850;
const DURATION = 450 + (COUNT - 1) * GAP + DRAW_TIME;
const starPath = Array.from({ length: 10 }, (_, i) => {
  const angle = (-90 + i * 36) * Math.PI / 180;
  const radius = i % 2 ? 64 : 160;
  return `${i ? 'L' : 'M'}${Math.cos(angle) * radius} ${Math.sin(angle) * radius}`;
}).join(' ') + 'Z';

export default function StarAscension({ motion = true, externalControls = false, controlsTarget = null }) {
  const root = useRef(null);
  const layers = useRef([]);
  const paths = useRef([]);
  const elapsed = useRef(0);
  const lastCount = useRef(0);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [run, setRun] = useState(0);
  const id = useId().replace(/:/g, '');
  const complete = count === COUNT;

  function draw(time) {
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const progress = Math.max(0, Math.min(1, (time - 450 - i * GAP) / DRAW_TIME));
      const ease = 1 - Math.pow(1 - progress, 3);
      const y = 225 - i * 1.65 + (1 - ease) * 150;
      const scale = (.17 + i * .028) * (.35 + .65 * ease);
      layer.setAttribute('transform', `translate(210 ${y}) rotate(${i * 1.3 - (1 - ease) * 32}) scale(${scale})`);
      layer.style.opacity = progress === 0 ? 0 : Math.min(1, progress * 5) * (.38 + i / COUNT * .55);
      paths.current[i].style.strokeDashoffset = 1 - progress;
      paths.current[i].style.strokeDasharray = progress === 1 ? 'none' : '1';
    });
    const next = Math.min(COUNT, Math.max(0, Math.floor((time - 450 - DRAW_TIME) / GAP) + 1));
    if (next !== lastCount.current) { lastCount.current = next; setCount(next); }
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    observer.observe(root.current);
    return () => { preference.removeEventListener('change', update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduced || !motion) { elapsed.current = DURATION; draw(DURATION); return; }
    if (!playing || !visible) return;
    let frame;
    let previous;
    function tick(now) {
      if (previous !== undefined) elapsed.current = Math.min(DURATION, elapsed.current + Math.min(64, now - previous));
      previous = now;
      draw(elapsed.current);
      if (elapsed.current < DURATION) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, reduced, motion, run]);

  function replay() {
    elapsed.current = reduced || !motion ? DURATION : 0;
    draw(elapsed.current);
    setPlaying(true);
    setRun(value => value + 1);
  }

  const controls = <div className="sb-actions">
    <button className="sb-primary" onClick={replay}><span aria-hidden="true">↻</span>{complete ? 'Replay 30 stars' : 'Restart ascent'}<span aria-hidden="true">↗</span></button>
    {!complete && <button className="sb-pause" aria-label={playing ? 'Pause animation' : 'Resume animation'} onClick={() => setPlaying(value => !value)}>{playing ? 'Ⅱ' : '▶'}</button>}
  </div>;

  return <section ref={root} aria-label="Thirty-star ascension animation" className={`s-panel starAscension ${complete ? 'asc-complete' : ''} ${!playing || !visible ? 'asc-paused' : ''} ${!motion || reduced ? 'asc-still' : ''}`}>
    {externalControls && controlsTarget && createPortal(controls, controlsTarget)}
    <div className="asc-dust" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 43 + 9) % 100}%`, animationDelay: `${i * -.37}s` }} />)}</div>
    <div className="asc-heading"><h2>Rise. Layer. <em>Radiate.</em></h2></div>
    <div className="asc-stage" aria-hidden="true">
      <svg viewBox="20 4 380 390" fill="none">
        <defs>
          <radialGradient id={`${id}-aura`}><stop stopColor="#ac7cff" stopOpacity=".22" /><stop offset="1" stopColor="#7752f3" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}-star`} x1="-160" y1="-160" x2="160" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#fff0ff" /><stop offset=".45" stopColor="#ba9dff" /><stop offset="1" stopColor="#66e7ff" /></linearGradient>
        </defs>
        <ellipse cx="210" cy="192" rx="195" ry="185" fill={`url(#${id}-aura)`} />
        <g className="asc-halo"><circle cx="210" cy="192" r="173" stroke="#ba8fff" strokeOpacity=".1" /><circle cx="210" cy="192" r="184" stroke="#ba8fff" strokeOpacity=".1" strokeDasharray="2 9" /></g>
        <path className="asc-axis" d="M210 24V358" stroke="#bb9aff" strokeOpacity=".12" strokeDasharray="2 8" />
        <ellipse cx="210" cy="363" rx="80" ry="11" stroke="#bb9aff" strokeOpacity=".25" />
        <ellipse cx="210" cy="363" rx="54" ry="6" fill="#bfa3ff" fillOpacity=".08" />
        <g className="asc-star-stack">{Array.from({ length: COUNT }, (_, i) => <g className="asc-star-layer" key={i} ref={el => { layers.current[i] = el; }} opacity="0"><path ref={el => { paths.current[i] = el; }} d={starPath} stroke={`url(#${id}-star)`} strokeWidth={i === COUNT - 1 ? 1.6 : .85} vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1" strokeDashoffset="1" fill={i === COUNT - 1 ? '#bca0ff' : 'none'} fillOpacity=".025" /></g>)}</g>
        <g className="asc-source"><circle cx="210" cy="363" r="3" fill="#faf1ff" /><path d="M200 363H220M210 353V373" stroke="#e2ceff" strokeWidth=".7" /></g>
        <g className="asc-crown"><path d="M210 153Q213 178 238 181Q213 184 210 209Q207 184 182 181Q207 178 210 153Z" fill="#f7edff" /></g>
      </svg>
      <div className="asc-wave" />
    </div>
    <span className="s-sr-only" role="status" aria-live="polite">{complete ? 'All 30 stars are complete.' : 'Stars are rising one by one.'}</span>
    {!externalControls && <div className="asc-local-controls">{controls}</div>}
  </section>;
}
