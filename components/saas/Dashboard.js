'use client';
import { useState } from 'react';
import { Panel, Tabs, Icon } from './UI';

const reports = {
  '7 days': { revenue: '8,420', customers: '128', rate: '4.8', bars: [28, 45, 38, 65, 50, 78, 92], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  '30 days': { revenue: '32,680', customers: '482', rate: '5.2', bars: [35, 58, 48, 82, 65, 90, 76], labels: ['01', '05', '10', '15', '20', '25', '30'] },
  '90 days': { revenue: '96,240', customers: '1,406', rate: '6.1', bars: [25, 42, 58, 50, 72, 88, 98], labels: ['W1', 'W3', 'W5', 'W7', 'W9', 'W11', 'W13'] },
};
export default function Dashboard() {
  const [period, setPeriod] = useState('30 days');
  const report = reports[period];
  return <Panel title="A little momentum. A lot of possibility." description="Welcome back, Alex. Here’s your workspace today." icon="chart" className="s-wide">
    <div className="s-row"><span className="s-badge"><i /> All systems operational</span><Tabs options={Object.keys(reports)} value={period} onChange={setPeriod} label="Reporting period" /></div>
    <div className="s-metrics" key={period}>{[['Revenue', `$${report.revenue}`, '+18.6%'], ['Customers', report.customers, '+12.8%'], ['Conversion', `${report.rate}%`, '+2.4%']].map(([label, value, change]) => <div className="s-metric" key={label}><span>{label}<Icon name="chart" size={16} /></span><strong>{value}</strong><small>{change} <em>vs. previous period</em></small></div>)}</div>
    <div className="s-inset"><div className="s-row"><h3>Revenue overview</h3><span className="s-help">● Revenue · {period}</span></div><div className="s-chart" role="img" aria-label={`Revenue trend over ${period}: $${report.revenue} total`}>{report.bars.map((height, i) => <div key={i}><div className="s-bar-track"><i style={{ height: `${height}%`, '--delay': `${i * 60}ms` }} title={`${report.labels[i]}: relative revenue ${height}`} /></div><small>{report.labels[i]}</small></div>)}</div></div>
    <div className="s-row s-help"><span>Sample workspace analytics</span><span>Updated just now</span></div>
  </Panel>;
}
