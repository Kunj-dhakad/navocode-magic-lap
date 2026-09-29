'use client';
import { useEffect, useState } from 'react';
import { AuthCard, Button, Notice, useMagicDemo } from './UI';

export default function Verification() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  useMagicDemo([{ set: setCode, text: '204816' }], () => { setError(false); setMessage('Verified. Your demo workspace is ready for you!'); });
  useEffect(() => { if (!seconds) return; const timer = setTimeout(() => setSeconds(n => n - 1), 1000); return () => clearTimeout(timer); }, [seconds]);
  return <AuthCard title="Check your inbox" description="Enter the six-digit code to verify your workspace.">
    <form onSubmit={e => { e.preventDefault(); setError(code !== '204816'); setMessage(code === '204816' ? 'Email verified. Your demo workspace is ready!' : 'That code isn’t right. Try the demo code 204816.'); }}>
      <label className="s-field"><span>Verification code</span><input className="s-otp" aria-label="Six-digit verification code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="000000" value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setMessage(''); }} required /></label>
      <p className="s-help">Demo code: <code>204816</code> · Paste all six digits at once.</p>
      <Button type="submit">Verify email →</Button>
    </form><Notice error={error}>{message}</Notice><Button secondary disabled={seconds > 0} onClick={() => { setSeconds(30); setError(false); setMessage('A new demo code is ready: 204816. No email was sent.'); }}>{seconds ? `Resend in ${seconds}s` : 'Resend code'}</Button>
  </AuthCard>;
}
