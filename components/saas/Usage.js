'use client';
import { useState } from 'react';
import { Panel, Button, Icon, Notice, Tabs } from './UI';

const limits = { Starter: [1000, 5, 3], Pro: [10000, 100, 20] };
export default function Usage() {
  const [plan, setPlan] = useState('Starter');
  const [used, setUsed] = useState([640, 2.4, 2]);
  const [message, setMessage] = useState('');
  const labels = ['API requests', 'Storage (GB)', 'Active projects'];
  function changePlan(nextPlan) {
    setPlan(nextPlan);
    setUsed(values => values.map((value, index) => Math.min(value, limits[nextPlan][index])));
    setMessage(`${nextPlan} plan preview active. No billing change was made.`);
  }
  return <Panel title="A little room to dream bigger." description="Keep an eye on your workspace’s monthly usage." icon="chart"><div className="s-row"><span className="s-badge">Current cycle · September</span><Tabs options={['Starter', 'Pro']} value={plan} onChange={changePlan} label="Plan preview" /></div><div className="s-usage-list">{used.map((value, i) => { const max = limits[plan][i]; const percent = Math.min(value / max * 100, 100); return <div className="s-usage" key={labels[i]}><div className="s-row"><b>{labels[i]}</b><span>{value.toLocaleString()} <small>/ {max.toLocaleString()}</small></span></div><div className={`s-meter ${percent >= 90 ? 'warning' : ''}`} role="progressbar" aria-label={labels[i]} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}><i style={{ width: `${percent}%` }} /></div><small>{Math.round(percent)}% used · {Math.max(0, max - value).toLocaleString()} remaining</small></div>; })}</div><div className="s-inset s-row"><Icon /><p>More space for your next big idea.<br /><small>Switch plans to explore your limits.</small></p></div><div className="s-row s-step-actions"><Button onClick={() => { setUsed(v => v.map((n, i) => Math.min(limits[plan][i], Math.round((n + [180, .8, 1][i]) * 10) / 10))); setMessage('Sample usage added to this demo.'); }}>Simulate usage +</Button><Button secondary onClick={() => { setUsed([0, 0, 0]); setMessage('Demo counters reset.'); }}>Reset</Button></div><Notice>{message}</Notice></Panel>;
}
