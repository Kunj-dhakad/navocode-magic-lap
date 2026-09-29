'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AuthCard, Button, Field, Icon, Notice, useDemoSubmit, useMagicDemo } from './UI';

export default function Login() {
  const { busy, message, submit } = useDemoSubmit();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useMagicDemo([{ set: setEmail, text: 'alex@navocode.dev' }, { set: setPassword, text: 'NavoMagic@2026' }], () => submit('Access granted. Welcome to your demo workspace!'));
  return <AuthCard title="Welcome back" description="Your next great idea is waiting for you.">
    <form onSubmit={e => { e.preventDefault(); submit('Demo sign-in complete. Welcome to your workspace!'); }}>
      <Field label="Email address" icon="mail" type="email" placeholder="you@company.com" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Field label="Password" icon="lock" type="password" placeholder="Enter your password" autoComplete="current-password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} required />
      <div className="s-row s-form-options"><label className="s-check"><input type="checkbox" defaultChecked /> Remember me</label><Link href="/saas/forgot-password">Forgot password?</Link></div>
      <Button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in to workspace'}<Icon name="arrow" /></Button>
    </form><Notice>{message}</Notice><p className="s-auth-bottom">New here? <Link href="/saas/signup">Create an account →</Link></p>
  </AuthCard>;
}
