'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AuthCard, Button, Field, Icon, Notice, useDemoSubmit, useMagicDemo } from './UI';

export default function ForgotPassword() {
  const { busy, message, submit } = useDemoSubmit();
  const [email, setEmail] = useState('');
  useMagicDemo([{ set: setEmail, text: 'alex@navocode.dev' }], () => submit('Recovery preview ready. Your next chapter starts here. No email was sent.'));
  return <AuthCard title="Forgot your password?" description="It happens. Let’s get you back to creating.">
    <div className="s-auth-symbol"><Icon name="mail" size={34} /></div>
    <form onSubmit={e => { e.preventDefault(); submit('Recovery preview complete. In a connected app, an email would be sent if this account exists.'); }}>
      <Field label="Email address" type="email" icon="mail" autoComplete="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
      <Button type="submit" disabled={busy}>{busy ? 'Preparing recovery…' : 'Send recovery link'}<Icon name="arrow" /></Button>
    </form><Notice>{message}</Notice>{message && <Link className="s-text-link" href="/saas/reset-password">Preview reset screen →</Link>}<p className="s-auth-bottom"><Link href="/saas/login">← Back to login</Link></p>
  </AuthCard>;
}
