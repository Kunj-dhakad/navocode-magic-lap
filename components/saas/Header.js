'use client';
import Link from 'next/link';
import { useState } from 'react';
import { saasItems } from '../../lib/saas';
import { Avatar, Brand, Icon } from './UI';

export default function Header() {
  const [menu, setMenu] = useState('');
  const [query, setQuery] = useState('');
  const results = saasItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 4);
  return <section className="s-panel s-wide s-header-demo" onKeyDown={e => { if (e.key === 'Escape') setMenu(''); }}>
    <header className="s-app-header"><Brand /><div className="s-header-search"><Icon name="search" size={17} /><input aria-label="Search components" placeholder="Search your workspace…" value={query} onFocus={() => setMenu('search')} onChange={e => { setQuery(e.target.value); setMenu('search'); }} /></div><div className="s-row"><button className="s-icon-button s-bell" aria-label="Open notifications" aria-expanded={menu === 'notifications'} onClick={() => setMenu(menu === 'notifications' ? '' : 'notifications')}><Icon name="bell" /><i /></button><button className="s-icon-button" aria-label="Open account menu" aria-expanded={menu === 'account'} onClick={() => setMenu(menu === 'account' ? '' : 'account')}><Avatar name="Alex Morgan" /></button></div></header>
    {menu && <div className="s-dropdown"><div className="s-row"><b>{menu === 'search' ? 'Quick results' : menu === 'account' ? 'Alex Morgan' : 'You’re in the loop'}</b><button className="s-icon-button" aria-label="Close menu" onClick={() => setMenu('')}><Icon name="close" size={16} /></button></div>{menu === 'search' ? results.length ? results.map(item => <Link key={item.slug} href={`/saas/${item.slug}`}>{item.title}<Icon name="arrow" size={16} /></Link>) : <p>No matching components.</p> : menu === 'account' ? <><Link href="/saas/settings">Account settings →</Link><Link href="/saas/billing">Billing & invoices →</Link></> : <><p>Your latest deployment is ready.</p><Link href="/saas/notifications">View all notifications →</Link></>}</div>}
    <div className="s-header-body"><span className="s-overline">YOUR WORK, BEAUTIFULLY CONNECTED</span><h2>Good things<br />start up here.</h2><p>Search, catch up, or make this space your own.</p><div className="s-skeleton"><i /><i /><i /></div></div>
  </section>;
}
