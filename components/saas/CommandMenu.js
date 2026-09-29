'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { saasItems } from '../../lib/saas';
import { Panel, Icon } from './UI';

export default function CommandMenu() {
  const [query, setQuery] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const results = saasItems.filter(item => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  function navigate(e) {
    const links = [...listRef.current.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); links[(index + 1) % links.length]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); links[(index - 1 + links.length) % links.length]?.focus(); }
    if (e.key === 'Escape') { e.preventDefault(); setQuery(''); inputRef.current.focus(); }
  }
  return <Panel title="Where would you like to go?" description="Your entire workspace, a few keystrokes away." icon="search"><div className="s-command" onKeyDown={navigate}><label className="s-command-search"><Icon name="search" /><input ref={inputRef} aria-label="Search commands" placeholder="Search pages, components, anything…" value={query} onChange={e => setQuery(e.target.value)} /><kbd>ESC</kbd></label><div className="s-command-results" ref={listRef}><span className="s-overline">{results.length} DESTINATIONS</span>{results.map(item => <Link key={item.slug} href={`/saas/${item.slug}`}><span className="s-icon-tile"><Icon name={item.category === 'Authentication' ? 'lock' : item.category === 'Billing' ? 'card' : 'grid'} size={16} /></span><span>{item.title}<small>{item.category}</small></span><Icon name="arrow" size={16} /></Link>)}{!results.length && <p className="s-empty">No results. Try “team” or “password”.</p>}</div><div className="s-command-hint"><span>↑ ↓ to navigate</span><span>Enter to open</span><span>Esc to reset</span></div></div></Panel>;
}
