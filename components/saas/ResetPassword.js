'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AuthCard, Button, Field, Icon, Notice, Strength, useDemoSubmit, useMagicDemo } from './UI';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { busy, message, submit, setMessage } = useDemoSubmit();
  useMagicDemo([{ set: setPassword, text: 'NavoMagic@2026' }, { set: setConfirm, text: 'NavoMagic@2026' }], () => submit('Your demo password has been reset. A fresh start, all yours!'));
  function reset(e) {
    e.preventDefault();
    if (password !== confirm) { setError('The passwords don’t match. Please try again.'); return; }
    setError(''); submit('Your demo password has been reset! You can now preview the login screen.');
  }
  function change(setter, value) { setter(value); setError(''); setMessage(''); }
  return <AuthCard title="Reset your password" description="Create a new secure password for your account.">
    <form onSubmit={reset}>
      <Field label="New password" icon="lock" type="password" autoComplete="new-password" placeholder="New password" minLength={8} required value={password} onChange={e => change(setPassword, e.target.value)} />
      <Field label="Confirm new password" icon="lock" type="password" autoComplete="new-password" placeholder="Confirm new password" minLength={8} required value={confirm} onChange={e => change(setConfirm, e.target.value)} />
      <Strength value={password} /><Notice error>{error}</Notice>
      <Button type="submit" disabled={busy}>{busy ? 'Resetting password…' : 'Reset password'}<Icon name="arrow" /></Button>
    </form><Notice>{message}</Notice><p className="s-auth-bottom"><Link href="/saas/login">← Back to login</Link></p>
  </AuthCard>;
}
