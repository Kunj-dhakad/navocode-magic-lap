'use client';
import { useState } from 'react';
import { Panel, Button, Icon, Tabs, Notice } from './UI';

const invoices = [{ id: 'NC-2026-009', date: 'Sep 01, 2026', amount: 24, year: '2026' }, { id: 'NC-2026-008', date: 'Aug 01, 2026', amount: 24, year: '2026' }, { id: 'NC-2025-012', date: 'Dec 01, 2025', amount: 19, year: '2025' }];
export default function Billing() {
  const [year, setYear] = useState('2026');
  const [message, setMessage] = useState('');
  function download(invoice) {
    const url = URL.createObjectURL(new Blob([`NAVOCODE — DEMO INVOICE\n${invoice.id}\nDate: ${invoice.date}\nPro plan: $${invoice.amount}.00 USD\nStatus: Paid (sample data)\nNot a tax invoice. No charge was made.`], { type: 'text/plain' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${invoice.id}.txt`; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setMessage(`${invoice.id} download started.`);
  }
  return <Panel title="Billing, beautifully simple." description="Your plan, payment details and invoices in one place." icon="card" className="s-wide"><div className="s-billing-card"><Icon name="card" size={34} /><div><span className="s-overline">YOUR CURRENT PLAN</span><h3>NavoCode Pro <span className="s-badge">Active</span></h3><p>$24 / month · Sample Visa ending in 4242</p></div><a className="s-secondary" href="/saas/pricing">Manage plan →</a></div><div className="s-row"><h3>Invoice history</h3><Tabs options={['2026', '2025']} value={year} onChange={setYear} label="Invoice year" /></div><div className="s-table-scroll"><table className="s-table"><thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th><span className="s-sr-only">Download</span></th></tr></thead><tbody>{invoices.filter(invoice => invoice.year === year).map(invoice => <tr key={invoice.id}><td>{invoice.id}</td><td>{invoice.date}</td><td>${invoice.amount}.00</td><td><span className="s-badge">Paid</span></td><td><Button secondary onClick={() => download(invoice)} aria-label={`Download invoice ${invoice.id}`}>↓ .txt</Button></td></tr>)}</tbody></table></div><Notice>{message}</Notice></Panel>;
}
