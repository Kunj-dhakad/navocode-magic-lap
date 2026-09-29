'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AuthCard, Button, Field, Icon, Notice, Strength, useDemoSubmit, useMagicDemo } from './UI';

export default function Signup() {
  const [password, setPassword] = useState('');
  const { busy, message, submit } = useDemoSubmit();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  useMagicDemo([{ set: setName, text: 'Alex Morgan' }, { set: setEmail, text: 'alex@navocode.dev' }, { set: setPassword, text: 'NavoMagic@2026' }], () => { setAgreed(true); submit('Your demo account is ready. Let’s create something great!'); });
  return <AuthCard title="Create your account" description="Build something extraordinary. Start for free.">
    <form onSubmit={e => { e.preventDefault(); submit('Your demo account is ready. Let’s build something great!'); }}>
      <Field label="Full name" placeholder="Alex Morgan" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required />
      <Field label="Work email" icon="mail" type="email" placeholder="alex@company.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Field label="Password" icon="lock" type="password" placeholder="At least 8 characters" autoComplete="new-password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} required />
      <Strength value={password} />
      <label className="s-check"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required /> I agree to try this demo with sample information.</label>
      <Button type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}<Icon name="arrow" /></Button>
    </form><Notice>{message}</Notice><p className="s-auth-bottom">Already a member? <Link href="/saas/login">Sign in →</Link></p>
  </AuthCard>;
}
