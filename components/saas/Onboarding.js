'use client';
import { useState } from 'react';
import { AuthCard, Button, Field, Icon } from './UI';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [workspace, setWorkspace] = useState('');
  const [purpose, setPurpose] = useState('Build a product');
  const [complete, setComplete] = useState(false);
  return <AuthCard title={complete ? 'You’re ready to make magic.' : ['Every big idea starts somewhere.', 'What brings you here?', 'A little check before we go.'][step]} description={complete ? 'Your demo workspace is ready for its first chapter.' : 'Let’s make this workspace feel like yours.'}>
    <div className="s-steps" aria-label={`Step ${Math.min(step + 1, 3)} of 3`}>{['Workspace', 'Your goal', 'Ready'].map((label, i) => <span className={step >= i ? 'active' : ''} key={label}><b>{step > i || complete ? '✓' : i + 1}</b><small>{label}</small></span>)}</div>
    {complete ? <div className="s-onboarding-done"><span className="s-auth-symbol"><Icon name="check" size={34} /></span><h3>{workspace}</h3><p>Your next great idea belongs here.</p><a className="s-button" href="/saas/dashboard">Explore dashboard →</a><Button secondary onClick={() => { setStep(0); setComplete(false); }}>Start again</Button></div> : <form key={step} className="s-step-content" onSubmit={e => { e.preventDefault(); if (step < 2) setStep(v => v + 1); else setComplete(true); }}>
      {step === 0 ? <Field label="Workspace name" placeholder="Your next big thing" maxLength={45} value={workspace} onChange={e => setWorkspace(e.target.value)} required pattern=".*\S.*" /> : step === 1 ? <fieldset className="s-choices"><legend>Choose your main goal</legend>{['Build a product', 'Grow my business', 'Create with my team'].map(goal => <label className={purpose === goal ? 'selected' : ''} key={goal}><input type="radio" name="purpose" value={goal} checked={purpose === goal} onChange={() => setPurpose(goal)} /><Icon />{goal}</label>)}</fieldset> : <div className="s-inset s-review"><small>YOUR WORKSPACE</small><h3>{workspace}</h3><p>{purpose}</p><span className="s-badge">Starter plan · Free</span></div>}
      <div className="s-row s-step-actions">{step > 0 && <Button secondary onClick={() => setStep(v => v - 1)}>← Back</Button>}<Button type="submit">{step === 2 ? 'Create workspace' : 'Continue'}<Icon name="arrow" /></Button></div>
    </form>}
  </AuthCard>;
}
