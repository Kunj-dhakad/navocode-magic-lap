'use client';
import { useState } from 'react';
import { Panel, Button, Field, Notice } from './UI';

const apps = [{ name: 'Figma', letter: 'F', description: 'Give your designs a home.', color: '#fb82b0' }, { name: 'GitHub', letter: 'G', description: 'Keep every commit connected.', color: '#bda7ff' }, { name: 'Slack', letter: 'S', description: 'Bring your team into the loop.', color: '#64e7c0' }, { name: 'Notion', letter: 'N', description: 'A little space for every idea.', color: '#e4e6f4' }];
export default function Integrations() {
  const [query, setQuery] = useState('');
  const [connected, setConnected] = useState(['GitHub']);
  const [message, setMessage] = useState('');
  const filtered = apps.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));
  return <Panel title="Your tools, in good company." description="Make your workspace feel a little more connected." className="s-wide"><Field label="Find an integration" icon="search" placeholder="Search your favorite tools" value={query} onChange={e => setQuery(e.target.value)} /><div className="s-integration-grid">{filtered.map(app => { const isConnected = connected.includes(app.name); return <article className="s-integration" key={app.name}><span className="s-app-icon" style={{ '--app-color': app.color }}>{app.letter}</span><h3>{app.name}</h3><p>{app.description}</p><Button secondary={isConnected} aria-pressed={isConnected} onClick={() => { setConnected(v => isConnected ? v.filter(name => name !== app.name) : [...v, app.name]); setMessage(`${app.name} ${isConnected ? 'disconnected' : 'connected'} in this demo. No external account was accessed.`); }}>{isConnected ? 'Connected · Disconnect' : 'Connect →'}</Button></article>; })}</div>{!filtered.length && <p className="s-empty">No integrations match your search.</p>}<Notice>{message}</Notice></Panel>;
}
