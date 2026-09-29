'use client';
import { useState } from 'react';
import { Panel, Avatar, Button, Field, Notice } from './UI';

export default function Team() {
  const [members, setMembers] = useState([{ name: 'Alex Morgan', email: 'alex@example.com', role: 'Owner' }, { name: 'Jamie Chen', email: 'jamie@example.com', role: 'Editor' }, { name: 'Sam Rivera', email: 'sam@example.com', role: 'Viewer' }]);
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const filtered = members.filter(member => `${member.name} ${member.email}`.toLowerCase().includes(query.toLowerCase()));
  function invite(e) { e.preventDefault(); const next = email.trim().toLowerCase(); if (members.some(member => member.email === next)) { setMessage('That teammate is already in your workspace.'); return; } setMembers(v => [...v, { name: next.split('@')[0], email: next, role: 'Viewer', pending: true }]); setEmail(''); setMessage('Demo invitation added. No email was sent.'); }
  return <Panel title="Great work starts with great people." description={`${members.length} people in your NavoCode workspace.`} icon="users" className="s-wide"><form className="s-inline-form" onSubmit={invite}><Field label="Invite a teammate" type="email" icon="mail" placeholder="teammate@company.com" value={email} onChange={e => setEmail(e.target.value)} required /><Button type="submit">Invite member +</Button></form><Notice>{message}</Notice><Field label="Find a member" icon="search" placeholder="Search by name or email" value={query} onChange={e => setQuery(e.target.value)} /><div className="s-member-list">{filtered.map((member, i) => <div className="s-member" key={member.email}><Avatar name={member.name} index={i} /><div><b>{member.name} {member.pending && <span className="s-badge">Invited</span>}</b><small>{member.email}</small></div>{member.role === 'Owner' ? <span className="s-role">Owner</span> : <select aria-label={`Role for ${member.name}`} value={member.role} onChange={e => setMembers(v => v.map(m => m.email === member.email ? { ...m, role: e.target.value } : m))}><option>Viewer</option><option>Editor</option><option>Admin</option></select>}</div>)}{!filtered.length && <p className="s-empty">No teammates match your search.</p>}</div></Panel>;
}
