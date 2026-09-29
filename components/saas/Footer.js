'use client';
import Link from 'next/link';
import { Brand, Button, Field, Icon, Notice, useDemoSubmit } from './UI';

export default function Footer() {
  const { busy, message, submit } = useDemoSubmit();
  return <section className="s-panel s-wide s-footer-demo"><div className="s-footer-top"><div><span className="s-overline">A LITTLE INSPIRATION, DELIVERED.</span><h2>Stay curious.<br /><span className="s-gradient-text">Keep creating.</span></h2><p>Ideas, updates, and a little NavoCode magic.</p></div><form onSubmit={e => { e.preventDefault(); submit('You’re on the demo list! No subscription or email was created.'); }}><Field label="Your email address" type="email" icon="mail" placeholder="you@company.com" required /><Button type="submit" disabled={busy}>{busy ? 'Subscribing…' : 'Keep me inspired'}<Icon name="arrow" /></Button><Notice>{message}</Notice></form></div>
    <footer className="s-product-footer"><div><Brand /><p>Ideas into reality.<br />One thoughtful detail at a time.</p></div><div><h3>Product</h3><Link href="/saas/dashboard">Dashboard</Link><Link href="/saas/pricing">Pricing</Link><Link href="/saas/integrations">Integrations</Link></div><div><h3>Workspace</h3><Link href="/saas/team">Your team</Link><Link href="/saas/settings">Settings</Link><Link href="/saas/onboarding">Get started</Link></div></footer><div className="s-row s-footer-bottom"><span>© {new Date().getFullYear()} NavoCode</span><span className="s-badge"><i /> All systems operational</span></div>
  </section>;
}
