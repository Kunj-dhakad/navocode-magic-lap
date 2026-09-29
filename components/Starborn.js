'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const vertices = Array.from({ length: 5 }, (_, i) => {
  const angle = (-90 + i * 144) * Math.PI / 180;
  return [300 + Math.cos(angle) * 204, 300 + Math.sin(angle) * 204];
});
const outline = Array.from({ length: 10 }, (_, i) => {
  const angle = (-90 + i * 36) * Math.PI / 180;
  const radius = i % 2 ? 78 : 204;
  return [300 + Math.cos(angle) * radius, 300 + Math.sin(angle) * radius];
});
const DURATION = 6500;
const START = 1000;
const LINE_TIME = 1100;
const phases = ['A little spark of possibility.', 'One line. The beginning of something.', 'Follow the light.', 'A little more wonder.', 'Almost written in the stars.', 'One last connection.', 'And just like that, a star is born.'];
const colors = ['Violet', 'Gold', 'Ice'];

export default function Starborn({ featured = false, motion = true, externalControls = false, controlsTarget = null }) {
  const root = useRef(null);
  const lines = useRef([]);
  const pen = useRef(null);
  const clock = useRef(0);
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [color, setColor] = useState('Violet');
  const [run, setRun] = useState(0);
  const id = useId().replace(/:/g, '');

  function draw(elapsed) {
    const progress = Math.max(0, Math.min(5, (elapsed - START) / LINE_TIME));
    lines.current.forEach((line, i) => {
      if (line) line.style.strokeDashoffset = 1 - Math.min(1, Math.max(0, progress - i));
    });
    const index = Math.min(4, Math.floor(progress));
    const fraction = Math.min(1, progress - index);
    const from = vertices[index];
    const to = vertices[(index + 1) % 5];
    pen.current?.setAttribute('transform', `translate(${from[0] + (to[0] - from[0]) * fraction} ${from[1] + (to[1] - from[1]) * fraction})`);
    root.current?.style.setProperty('--sb-progress', `${elapsed / DURATION * 100}%`);
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function update() {
      setReduced(preference.matches);
      if (preference.matches) {
        clock.current = DURATION;
        phaseRef.current = 6;
        setPhase(6);
        draw(DURATION);
      }
    }
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(root.current);
    return () => { preference.removeEventListener('change', update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!motion) {
      clock.current = DURATION;
      phaseRef.current = 6;
      setPhase(6);
      draw(DURATION);
    }
  }, [motion]);

  useEffect(() => {
    if (!playing || !visible || reduced || !motion) return;
    let frame;
    let previous;
    function tick(now) {
      if (previous !== undefined) clock.current = Math.min(DURATION, clock.current + Math.min(now - previous, 64));
      previous = now;
      draw(clock.current);
      const next = clock.current >= DURATION ? 6 : clock.current < START ? 0 : Math.min(5, Math.floor((clock.current - START) / LINE_TIME) + 1);
      if (next !== phaseRef.current) { phaseRef.current = next; setPhase(next); }
      if (clock.current < DURATION) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, reduced, run, motion]);

  function replay() {
    clock.current = reduced || !motion ? DURATION : 0;
    phaseRef.current = reduced || !motion ? 6 : 0;
    setPhase(phaseRef.current);
    draw(clock.current);
    setPlaying(true);
    setRun(value => value + 1);
  }

  const complete = phase === 6;
  const playbackControls = <div className="sb-actions">
    <button className="sb-primary" onClick={complete || (playing && clock.current > 0) ? replay : () => setPlaying(true)}><span aria-hidden="true">{complete ? '↻' : '✦'}</span>{complete ? 'Replay the magic' : !playing ? 'Let it shine' : 'Start again'}<span aria-hidden="true">↗</span></button>
    {!complete && playing && <button className="sb-pause" aria-label="Pause animation" onClick={() => setPlaying(false)}>Ⅱ</button>}
    {!complete && !playing && clock.current > 0 && <button className="sb-pause" aria-label="Resume animation" onClick={() => setPlaying(true)}>▶</button>}
  </div>;

  return <div ref={root} className={`starborn sb-${color.toLowerCase()} ${featured ? 'sb-featured' : 'sb-full'} ${complete ? 'sb-complete' : ''} ${!playing || !visible || !motion ? 'sb-paused' : ''} ${!motion ? 'sb-motion-off' : ''}`}>
    {externalControls && controlsTarget && createPortal(playbackControls, controlsTarget)}
    <div className="sb-nebula" aria-hidden="true" />
    <div className="sb-dust" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 9) % 100}%`, '--sb-delay': `${-(i % 7)}s`, '--sb-size': `${i % 3 === 0 ? 2 : 1}px` }} />)}</div>
    <div className="sb-topline"><span><b /> NEW EXPERIMENT / 051</span><span>SMALL BEGINNINGS. INFINITE POSSIBILITIES.</span></div>

    <div className="sb-copy">
      <p className="sb-eyebrow">A LITTLE DOT. A LITTLE MAGIC.</p>
      <h2>Every star <br />starts with<br /><em>a spark.</em></h2>
      <p className="sb-description">Watch a single point of light become something extraordinary. One line at a time.</p>
      {!externalControls && playbackControls}
      <div className="sb-palette" role="group" aria-label="Star color">{colors.map(name => <button key={name} className={`sb-swatch sb-swatch-${name.toLowerCase()}`} aria-label={`${name} star`} aria-pressed={color === name} onClick={() => setColor(name)}><span /></button>)}<span>YOUR UNIVERSE. YOUR COLOR.</span></div>
    </div>

    <div className="sb-universe" aria-hidden="true">
      <div className="sb-orbit sb-orbit-one" /><div className="sb-orbit sb-orbit-two" /><div className="sb-orbit sb-orbit-three" />
      <span className="sb-coordinate sb-coordinate-top">RA 23h 08m</span><span className="sb-coordinate sb-coordinate-bottom">+01 LITTLE MIRACLE</span>
      <svg className="sb-art" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id={`${id}-light`} x1="100" y1="100" x2="500" y2="500" gradientUnits="userSpaceOnUse"><stop stopColor="var(--sb-white)" /><stop offset=".45" stopColor="var(--sb-light)" /><stop offset="1" stopColor="var(--sb-color)" /></linearGradient>
          <radialGradient id={`${id}-fill`}><stop stopColor="var(--sb-white)" stopOpacity=".5" /><stop offset="1" stopColor="var(--sb-color)" stopOpacity=".06" /></radialGradient>
          <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        <g className="sb-star-body">
          <polygon className="sb-filled-star" points={outline.map(p => p.join(',')).join(' ')} fill={`url(#${id}-fill)`} stroke={`url(#${id}-light)`} strokeWidth="1.5" />
          <g className="sb-facets">{outline.map((p, i) => <path key={i} d={`M300 300 L${p.join(' ')}`} stroke="var(--sb-light)" strokeWidth=".7" />)}</g>
          <g stroke={`url(#${id}-light)`} strokeLinecap="round" strokeWidth="2.3">{vertices.map((p, i) => <path ref={el => { lines.current[i] = el; }} key={i} d={`M${p.join(' ')} L${vertices[(i + 1) % 5].join(' ')}`} pathLength="1" strokeDasharray="1" strokeDashoffset="1" className="sb-drawn-line" />)}</g>
          {vertices.map((p, i) => <g key={i} className={`sb-node ${phase > i || complete ? 'sb-node-lit' : ''}`}><circle cx={p[0]} cy={p[1]} r="9" fill="var(--sb-color)" filter={`url(#${id}-glow)`} /><circle cx={p[0]} cy={p[1]} r="3" fill="var(--sb-white)" /></g>)}
          <g ref={pen} className="sb-pen" transform={`translate(${vertices[0].join(' ')})`}><circle r="19" fill="var(--sb-color)" filter={`url(#${id}-glow)`} opacity=".6" /><circle r="4" fill="#fff" /><path d="M-13 0H13M0-13V13" stroke="var(--sb-white)" strokeWidth="1" /></g>
          <g className="sb-core"><circle cx="300" cy="300" r="18" fill="var(--sb-light)" filter={`url(#${id}-glow)`} /><path d="M300 272Q303 297 328 300Q303 303 300 328Q297 303 272 300Q297 297 300 272Z" fill="var(--sb-white)" /></g>
        </g>
      </svg>
      <div className="sb-shockwave" />
      <div className="sb-burst">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--sb-angle': `${i * 15}deg`, '--sb-distance': `${180 + i % 4 * 30}px`, '--sb-delay': `${i % 3 * .07}s` }} />)}</div>
      <div className="sb-star-caption"><span>{complete ? '✦ STARBORN' : phase === 0 ? '• THE FIRST SPARK' : `0${Math.min(phase, 5)} / 05 — CONNECTING THE LIGHT`}</span><p role="presentation">{phases[phase]}</p></div>
    </div>

    <div className="sb-bottomline"><div className="sb-status" role="status" aria-live="polite"><i />{complete ? 'A STAR IS BORN' : !playing ? 'READY WHEN YOU ARE' : 'A LITTLE WONDER IN THE MAKING'}</div><div className="sb-progress" aria-hidden="true"><i /></div>{featured ? <Link href="/magic/starborn">ENTER THE EXPERIENCE <span>↗</span></Link> : <span className="sb-bottom-note">MADE OF LIGHT & A LITTLE PATIENCE</span>}</div>
  </div>;
}
