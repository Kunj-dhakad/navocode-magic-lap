'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { saasItems } from '../lib/saas';
import { Brand, Icon, MagicAtmosphere, MagicContext, Tabs } from './saas/UI';
import Login from './saas/Login';
import Signup from './saas/Signup';
import ForgotPassword from './saas/ForgotPassword';
import ResetPassword from './saas/ResetPassword';
import Verification from './saas/Verification';
import Dashboard from './saas/Dashboard';
import Sidebar from './saas/Sidebar';
import Header from './saas/Header';
import Footer from './saas/Footer';
import Pricing from './saas/Pricing';
import Billing from './saas/Billing';
import Team from './saas/Team';
import Notifications from './saas/Notifications';
import Settings from './saas/Settings';
import CommandMenu from './saas/CommandMenu';
import FileUpload from './saas/FileUpload';
import Integrations from './saas/Integrations';
import Activity from './saas/Activity';
import Onboarding from './saas/Onboarding';
import Usage from './saas/Usage';

const components = { Login, Signup, ForgotPassword, ResetPassword, Verification, Dashboard, Sidebar, Header, Footer, Pricing, Billing, Team, Notifications, Settings, CommandMenu, FileUpload, Integrations, Activity, Onboarding, Usage };

function CodeLine({ line }) {
  const parts = line.split(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b(?:import|from|export|default|function|return|const|let|if|else|true|false|null)\b)/g);
  return parts.map((part, i) => <span key={i} className={/^["']/.test(part) ? 's-code-string' : /^(import|from|export|default|function|return|const|let|if|else|true|false|null)$/.test(part) ? 's-code-keyword' : ''}>{part}</span>);
}

export default function SaasExperience({ item, source, sharedSource }) {
  const [view, setView] = useState('Preview only');
  const [file, setFile] = useState('Component');
  const [copyStatus, setCopyStatus] = useState('Copy code');
  const [version, setVersion] = useState(0);
  const [motion, setMotion] = useState(true);
  const [run, setRun] = useState(0);
  const [cinema, setCinema] = useState(false);
  const Component = components[item.component];
  const index = saasItems.findIndex(entry => entry.slug === item.slug);
  const previous = saasItems[(index + saasItems.length - 1) % saasItems.length];
  const next = saasItems[(index + 1) % saasItems.length];
  const currentSource = file === 'Component' ? source : sharedSource;
  async function copy() { try { await navigator.clipboard.writeText(currentSource); setCopyStatus('Copied ✓'); } catch { setCopyStatus('Select code to copy'); } }
  function replay() {
    setRun(value => value + 1);
    setVersion(value => value + 1);
  }

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        setCinema(false);
        setView(current => current === 'Preview only' ? 'Preview + code' : current);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <MagicContext.Provider value={{ run, motion }}>
    <main className={`saas-ui s-experience ${motion ? '' : 's-motion-off'} ${cinema ? 's-cinema' : ''} ${view === 'Preview only' ? 's-preview-fullscreen' : ''}`}>
      <div className="s-ambient" aria-hidden="true" />
      <header className="s-lab-header">
        <Link href="/#saas-components" className="s-back">← All components</Link>
        <Brand /><span className="s-badge"><i /> INTERACTIVE DEMO</span>
      </header>
      <div className="s-experience-heading">
        <div><span className="s-overline">COMPONENT {item.no} / {item.category.toUpperCase()}</span><h1>{item.title}<span className="s-gradient-text">.</span></h1><p>{item.kicker}</p></div>
        <div className="s-experience-controls">
          <Tabs options={['Preview + code', 'Preview only', 'Code only']} value={view} onChange={setView} label="Preview layout" />
          <div className="s-row">
            <button className="s-play-magic" onClick={replay}><Icon name="spark" size={13} /> Play magic</button>
            <button className="s-quiet" onClick={() => { setRun(0); setVersion(v => v + 1); }}>↻ Reset</button>
            <button className="s-quiet" aria-pressed={motion} onClick={() => setMotion(v => !v)}>Motion {motion ? 'on' : 'off'}</button>
            <button className="s-quiet" aria-pressed={cinema} onClick={() => setCinema(v => !v)}>{cinema ? 'Exit cinema' : 'Cinema mode'}</button>
          </div>
        </div>
      </div>
      <div className={`s-playground ${view === 'Preview only' ? 'preview-only' : view === 'Code only' ? 'code-only' : ''}`}>
        {view !== 'Preview only' && <section className="s-code-panel" aria-label="Component source code">
          <div className="s-code-header">
            <span className="s-window-dots"><i /><i /><i /></span>
            <span><Icon name="code" size={16} />{file === 'Component' ? `${item.component}.js` : 'UI.js'}</span>
            <button onClick={copy} aria-live="polite">{copyStatus}</button>
          </div>
          <div className="s-code-tabs"><Tabs options={['Component', 'Shared UI']} value={file} onChange={v => { setFile(v); setCopyStatus('Copy code'); }} label="Source file" /><span>REACT</span></div>
          <pre tabIndex={0} aria-label={`${file} source`} key={`${file}-${version}`}><code>{currentSource.split('\n').map((line, i) => <span className="s-code-line" key={i} style={{ '--line-delay': `${Math.min(i, 20) * 30}ms` }}><span className="s-line-number" aria-hidden="true">{i + 1}</span><span><CodeLine line={line || ' '} /></span></span>)}</code></pre>
          <div className="s-code-terminal"><span><i /> navocode / compile</span><b><Icon name="check" size={12} /> UI ready. Make it magic.</b><span className="s-terminal-bars" aria-hidden="true">{[1, 2, 3, 4, 5, 6, 7].map(n => <i key={n} style={{ '--delay': `${n * -.16}s` }} />)}</span></div>
          <div className="s-code-footer">components/saas/{file === 'Component' ? `${item.component}.js` : 'UI.js'}<span>UTF-8</span></div>
        </section>}
        {view !== 'Code only' && <section className="s-preview-area" aria-label="Interactive component preview">
          <MagicAtmosphere key={`atmosphere-${version}`} />
          <div className="s-preview-label"><span><i /> LIVE PREVIEW</span><span>MOVE · TYPE · MAKE MAGIC</span></div>
          <div className="s-fit-viewport"><div className="s-fit-content"><Component key={version} /></div></div>
          <p className="s-demo-note">Frontend demo · Sample data · No real accounts or payments</p>
        </section>}
      </div>
      <nav className="s-component-pagination" aria-label="More SaaS components">
        <Link href={`/saas/${previous.slug}`}><small>← PREVIOUS</small><b>{previous.title}</b></Link>
        <Link href="/#saas-components" className="s-pagination-grid" aria-label="All SaaS components"><Icon name="grid" size={16} /></Link>
        <Link href={`/saas/${next.slug}`}><small>NEXT →</small><b>{next.title}</b></Link>
      </nav>
      <div className="s-experience-footer">PLAN <i /> BUILD <i /> DEPLOY <i /> GROW</div>
    </main>
  </MagicContext.Provider>;
}
