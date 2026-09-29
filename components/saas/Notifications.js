'use client';
import { useState } from 'react';
import { Panel, Button, Icon, Tabs } from './UI';

export default function Notifications() {
  const [tab, setTab] = useState('All');
  const [items, setItems] = useState([{ id: 1, title: 'Your next chapter is live', text: 'Website v2 deployed successfully.', time: '2 min ago', icon: 'code', read: false }, { id: 2, title: 'A new face in your workspace', text: 'Jamie accepted your team invitation.', time: '18 min ago', icon: 'users', read: false }, { id: 3, title: 'A little milestone worth celebrating', text: 'You reached 1,000 customers.', time: '1 hour ago', icon: 'spark', read: true }]);
  const unread = items.filter(item => !item.read).length;
  const filtered = items.filter(item => tab === 'All' || !item.read);
  return <Panel title="Your little corner of updates." description={`${unread} unread notifications. You’re right on track.`} icon="bell"><div className="s-row"><Tabs options={['All', 'Unread']} value={tab} onChange={setTab} /><Button secondary disabled={!unread} onClick={() => setItems(v => v.map(item => ({ ...item, read: true })))}>Mark all read</Button></div><div className="s-notification-list">{filtered.map(item => <button className={`s-notification ${!item.read ? 'unread' : ''}`} key={item.id} onClick={() => setItems(v => v.map(n => n.id === item.id ? { ...n, read: true } : n))} aria-label={`${item.title}${item.read ? ', read' : ', mark as read'}`}><span className="s-icon-tile"><Icon name={item.icon} /></span><span><b>{item.title}</b><small>{item.text}</small><em>{item.time}</em></span>{!item.read && <i />}</button>)}{!filtered.length && <div className="s-empty"><Icon name="check" size={38} /><h3>You’re all caught up.</h3><p>A little calm. Enjoy it.</p></div>}</div><Button secondary disabled={!items.length} onClick={() => setItems([])}>Clear inbox</Button></Panel>;
}
