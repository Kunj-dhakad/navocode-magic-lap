'use client';
import { useRef, useState } from 'react';
import { Panel, Avatar, Button, Tabs } from './UI';

export default function Activity() {
  const [filter, setFilter] = useState('Everything');
  const nextId = useRef(4);
  const [events, setEvents] = useState([{ id: 1, person: 'Alex Morgan', action: 'shipped a fresh new landing page', category: 'Deployments', time: 'Just now', detail: 'NavoCode / Website v2.0' }, { id: 2, person: 'Jamie Chen', action: 'joined the design workspace', category: 'Team', time: '12 minutes ago', detail: 'Invited by Alex Morgan' }, { id: 3, person: 'Sam Rivera', action: 'deployed the analytics dashboard', category: 'Deployments', time: '1 hour ago', detail: 'NavoCode / Dashboard v1.4' }]);
  return <Panel title="Little moments. Real momentum." description="A living story of what your team is building." icon="chart"><div className="s-row"><Tabs options={['Everything', 'Deployments', 'Team']} value={filter} onChange={setFilter} /><Button secondary onClick={() => { setEvents(v => [{ id: nextId.current++, person: 'You', action: 'published a new workspace preview', category: 'Deployments', time: 'Just now', detail: 'Demo event / Preview build' }, ...v]); setFilter('Everything'); }}>+ Add event</Button></div><div className="s-timeline">{events.filter(event => filter === 'Everything' || event.category === filter).map((event, i) => <article key={event.id}><Avatar name={event.person} index={i} /><div><p><b>{event.person}</b> {event.action}</p><small>{event.time}</small><div className="s-inset">{event.detail}<span className="s-badge">{event.category === 'Team' ? 'Joined' : 'Successful'}</span></div></div></article>)}</div></Panel>;
}
