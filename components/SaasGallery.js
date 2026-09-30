
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { saasItems } from '../lib/saas';
import { Icon } from './saas/UI';

const icons = { Authentication: 'lock', Navigation: 'grid', Workspace: 'chart', Billing: 'card' };
export default function SaasGallery() {
  const [category, setCategory] = useState('All components');
  const [query, setQuery] = useState('');
  const items = saasItems.filter(item => (category === 'All components' || category === item.category) && `${item.title} ${item.blurb}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="saas-ui s-collection" id="saas-components"><div className="s-collection-heading"><div><span className="s-overline"><span className="s-new">NEW COLLECTION</span> 31 — 50</span><h2>Every piece.<br /><span className="s-gradient-text">A little magic.</span></h2><p>20 essential SaaS components. One luminous design language.<br />From your first hello to your everyday workflow.</p></div><Link className="s-collection-feature" href="/saas/reset-password"><span className="s-mini-window"><i /><i /><i /><small>ResetPassword.jsx</small></span><div className="s-mini-auth"><span className="s-logo">N</span><b>A fresh start.</b><span className="s-mini-input"><Icon name="lock" size={13} />New password <span>••••••••</span></span><span className="s-mini-input"><Icon name="lock" size={13} />Confirm password <span>••••••••</span></span><span className="s-mini-strength"><i /><i /><i /><i /></span><span className="s-button">Reset password <Icon name="arrow" size={14} /></span></div><span className="s-feature-caption">INSPIRED BY YOUR REFERENCE <Icon name="arrow" size={14} /></span></Link></div>
    <div className="s-collection-toolbar"><div className="s-tabs" role="group" aria-label="Component category">{['All components', 'Authentication', 'Navigation', 'Workspace', 'Billing'].map(name => <button key={name} aria-pressed={category === name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}</button>)}</div><label className="s-gallery-search"><Icon name="search" size={17} /><input aria-label="Search SaaS components" placeholder="Find a component…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <div className="s-collection-count" aria-live="polite">{items.length} components <span>REACT · CSS MOTION · INTERACTIVE</span></div><div className="s-gallery-grid">{items.map((item, i) => <Link href={`/saas/${item.slug}`} className="s-gallery-card" key={item.slug} style={{ '--delay': `${Math.min(i, 7) * 35}ms` }}><div className="s-row"><span className="s-icon-tile"><Icon name={icons[item.category]} /></span><span className="s-card-no">{item.no}</span></div><span className="s-overline">{item.category}</span><h3>{item.title}</h3><p>{item.blurb}</p><div className="s-gallery-card-bottom"><span><i /> LIVE PREVIEW</span><Icon name="arrow" size={18} /></div></Link>)}</div>{!items.length && <div className="s-empty"><Icon name="search" size={30} /><h3>No components found.</h3><p>Try another search or category.</p><button className="s-secondary" onClick={() => { setQuery(''); setCategory('All components'); }}>Reset filters</button></div>}
  </section>;
}
