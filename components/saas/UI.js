'use client';

import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';

export const MagicContext = createContext({ run: 0, motion: true });

// A cancellable typing sequence for recording the auth components in action.
export function useMagicDemo(fields, onComplete) {
  const { run, motion } = useContext(MagicContext);
  const latest = useRef({ fields, onComplete });
  latest.current = { fields, onComplete };
  useEffect(() => {
    if (!run) return;
    const timers = [];
    let delay = 400;
    const animate = motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sequence = latest.current;
    sequence.fields.forEach(({ set, text }) => {
      set('');
      if (!animate) {
        set(text);
      } else {
        for (let i = 1; i <= text.length; i++) {
          timers.push(setTimeout(() => set(text.slice(0, i)), delay));
          delay += 34;
        }
        delay += 130;
      }
    });
    timers.push(setTimeout(() => sequence.onComplete?.(), animate ? delay + 250 : 0));
    return () => timers.forEach(clearTimeout);
  }, [run, motion]);
}

function illuminate(event) {
  if (event.pointerType === 'touch') return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
  const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
  element.style.setProperty('--glow-x', `${x * 100}%`);
  element.style.setProperty('--glow-y', `${y * 100}%`);
}

export function MagicAtmosphere() {
  return <div className="s-magic-atmosphere" aria-hidden="true">
    <div className="s-aurora s-aurora-one" /><div className="s-aurora s-aurora-two" />
    <div className="s-orbit-system"><i /><i /><i /></div>
    <div className="s-perspective-grid" />
    {Array.from({ length: 22 }, (_, i) => <i className="s-dust" key={`star-${i}`} style={{ '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 23 + 7) % 100}%`, '--duration': `${4 + i % 5}s`, '--delay': `${-i * .7}s` }} />)}
    {Array.from({ length: 5 }, (_, i) => <i className="s-meteor" key={`meteor-${i}`} style={{ '--x': `${20 + i * 22}%`, '--delay': `${-i * 1.7}s`, '--duration': `${6 + i}s` }} />)}
    <span className="s-floating-tag s-floating-tag-one"><Icon name="lock" size={11} /> SECURE BY DESIGN</span>
    <span className="s-floating-tag s-floating-tag-two"><Icon name="spark" size={11} /> A LITTLE MAGIC</span>
  </div>;
}

function SurfaceEffects() {
  return <><div className="s-card-spotlight" aria-hidden="true" /><div className="s-card-scan" aria-hidden="true" /></>;
}

export function Icon({ name = 'spark', size = 20, ...props }) {
  const paths = {
    spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z',
    lock: 'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5ZM12 14v3',
    mail: 'M3 5h18v14H3ZM3 5l9 8 9-8',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    check: 'm5 12 4 4L19 6',
    eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    grid: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',
    chart: 'M4 3v17h17M8 15V9m5 6V5m5 10v-4',
    users: 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M2 21v-3a7 7 0 0 1 14 0v3m0-17a4 4 0 0 1 0 8m3 3a6 6 0 0 1 3 6',
    search: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14m5 12 6 6',
    bell: 'M5 16h14l-2-3V8A5 5 0 0 0 7 8v5ZM10 20h4',
    settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',
    upload: 'M12 16V3m-5 5 5-5 5 5M3 15v6h18v-6',
    card: 'M3 5h18v14H3ZM3 10h18M6 15h4',
    close: 'm6 6 12 12M6 18 18 6',
    menu: 'M4 6h16M4 12h16M4 18h16',
    code: 'm8 5-7 7 7 7m8-14 7 7-7 7m-3-17-2 20',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.spark} /></svg>;
}

export function Brand() {
  return <div className="s-brand"><span className="s-logo">N</span><span>Navo<span className="s-gradient-text">Code</span><small>WE BUILD. YOU GROW.</small></span></div>;
}

export function Panel({ children, title, description, icon = 'spark', className = '' }) {
  return <section className={`s-panel ${className}`} onPointerMove={illuminate}><SurfaceEffects /><div className="s-panel-heading"><span className="s-icon-tile"><Icon name={icon} /></span><div><h2>{title}</h2>{description && <p>{description}</p>}</div></div>{children}</section>;
}

export function AuthCard({ children, title, description }) {
  return <section className="s-panel s-auth" onPointerMove={illuminate}><SurfaceEffects /><div className="s-auth-brand"><span className="s-logo-orbit" aria-hidden="true"><i /><i /></span><Brand /></div><h2>{title}</h2><p className="s-subtitle">{description}</p>{children}</section>;
}

export function Button({ children, secondary = false, className = '', ...props }) {
  return <button type="button" className={`${secondary ? 's-secondary' : 's-button'} ${className}`} {...props} onPointerDown={event => { const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`); event.currentTarget.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`); props.onPointerDown?.(event); }}>{children}<span className="s-button-ripple" aria-hidden="true" /></button>;
}

export function Field({ label, icon, type = 'text', ...props }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return <label className="s-field" htmlFor={id}><span>{label}</span><span className="s-input-wrap">{icon && <Icon name={icon} size={18} />}<input id={id} type={type === 'password' && visible ? 'text' : type} {...props} />{type === 'password' && <button type="button" className="s-icon-button" onClick={() => setVisible(v => !v)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible}><Icon name="eye" size={18} /></button>}</span></label>;
}

export function Notice({ children, error = false }) {
  return children ? <div className={`s-notice ${error ? 's-error' : ''}`} role={error ? 'alert' : 'status'}><span className="s-success-icon"><Icon name={error ? 'close' : 'check'} /></span><span>{children}</span>{!error && <span className="s-success-particles" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--angle': `${i * 30}deg`, '--distance': `${48 + (i % 3) * 20}px`, '--delay': `${i % 3 * .06}s` }} />)}</span>}</div> : null;
}

export function passwordScore(value) {
  return [value.length >= 8, /[A-Z]/.test(value) && /[a-z]/.test(value), /[0-9]/.test(value), /[^a-zA-Z0-9]/.test(value)].filter(Boolean).length;
}

export function Strength({ value }) {
  const score = passwordScore(value);
  return <div className="s-strength"><div>{[1, 2, 3, 4].map(n => <i key={n} className={score >= n ? 'filled' : ''} />)}</div><small>Password strength: <b>{['Enter a password', 'Weak', 'Fair', 'Good', 'Strong'][score]}</b></small></div>;
}

export function useDemoSubmit() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  function submit(text) {
    if (timer.current) clearTimeout(timer.current);
    setMessage(''); setBusy(true);
    timer.current = setTimeout(() => { setBusy(false); setMessage(text); }, 850);
  }
  return { busy, message, submit, setMessage };
}

export function Tabs({ options, value, onChange, label = 'Filter' }) {
  return <div className="s-tabs" role="group" aria-label={label}>{options.map(option => <button type="button" key={option} onClick={() => onChange(option)} aria-pressed={value === option} className={value === option ? 'active' : ''}>{option}</button>)}</div>;
}

export function Avatar({ name = 'Kunj', index = 0 }) {
  return <span className={`s-avatar s-avatar-${index % 3}`} aria-hidden="true">{name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span>;
}
