'use client';
import { useState } from 'react';
import { Panel, Button, Icon, Notice, Tabs } from './UI';

export default function Pricing() {
  const [cycle, setCycle] = useState('Monthly');
  const [selected, setSelected] = useState('');
  return <Panel title="Big ideas deserve room to grow." description="Simple plans. A little extra possibility." className="s-wide" icon="card"><div className="s-row"><Tabs options={['Monthly', 'Yearly']} value={cycle} onChange={v => { setCycle(v); setSelected(''); }} label="Billing cycle" /><span className="s-badge">Save 20% yearly</span></div><div className="s-plans">{[{ name: 'Starter', price: 0, features: ['3 projects', '1 team member', 'Community support'] }, { name: 'Pro', price: 24, features: ['Unlimited projects', '10 team members', 'Priority support'] }, { name: 'Studio', price: 64, features: ['Everything in Pro', 'Unlimited members', 'Advanced analytics'] }].map(plan => { const price = cycle === 'Yearly' ? plan.price * .8 : plan.price; return <article className={`s-plan ${plan.name === 'Pro' ? 'featured' : ''}`} key={plan.name}><span className="s-overline">{plan.name}{plan.name === 'Pro' && ' / POPULAR'}</span><div className="s-price">${Number.isInteger(price) ? price : price.toFixed(2)}<small>/mo</small></div><p className="s-help">{plan.price === 0 ? 'Free, for your first chapter' : cycle === 'Yearly' ? `$${(price * 12).toFixed(2)} billed yearly` : 'Billed monthly'}</p><ul>{plan.features.map(feature => <li key={feature}><Icon name="check" size={16} />{feature}</li>)}</ul><Button secondary={plan.name !== 'Pro'} onClick={() => setSelected(`${plan.name} selected · ${cycle.toLowerCase()} billing. Demo only; no payment collected.`)}>Choose {plan.name} →</Button></article>; })}</div><Notice>{selected}</Notice></Panel>;
}
