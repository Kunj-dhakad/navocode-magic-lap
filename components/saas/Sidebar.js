'use client';
import { useState } from 'react';
import { Avatar, Brand, Button, Icon } from './UI';

const pages = [['Overview', 'grid', 'Your workspace at a glance.', '12 active projects'], ['Analytics', 'chart', 'Small insights. Bigger decisions.', '32,680 in revenue'], ['Projects', 'code', 'A home for your next big idea.', '4 projects ready to ship'], ['Team', 'users', 'Great things are built together.', '8 people, one shared vision'], ['Settings', 'settings', 'Make this space your own.', 'Your preferences are up to date']];
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Overview');
  const page = pages.find(([name]) => name === active);
  return <section className={`s-panel s-sidebar-demo s-wide ${collapsed ? 'is-collapsed' : ''}`}>
    <aside className="s-sidebar"><div className="s-row">{!collapsed && <Brand />}<button className="s-icon-button" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed} onClick={() => setCollapsed(v => !v)}><Icon name="menu" /></button></div>
      {!collapsed && <p className="s-overline">WORKSPACE</p>}<nav aria-label="Workspace navigation">{pages.map(([name, icon]) => <button key={name} className={active === name ? 'active' : ''} onClick={() => setActive(name)} aria-label={name} aria-current={active === name ? 'page' : undefined}><Icon name={icon} />{!collapsed && <span>{name}</span>}{!collapsed && name === 'Projects' && <small>12</small>}</button>)}</nav>
      <div className="s-sidebar-bottom">{!collapsed && <div className="s-upgrade"><Icon /><h3>A little more power.</h3><p>Make room for what’s next.</p><a className="s-button" href="/saas/pricing">Explore Pro →</a></div>}<div className="s-person"><Avatar />{!collapsed && <span><b>Kunj Patel</b><small>Personal workspace</small></span>}</div></div>
    </aside><div className="s-sidebar-content" key={active}><span className="s-overline">NAVOCODE / {active.toUpperCase()}</span><span className="s-auth-symbol"><Icon name={page[1]} size={32} /></span><h2>{active}</h2><p>{page[2]}</p><div className="s-inset">{page[3]}</div><Button secondary onClick={() => setCollapsed(v => !v)}>{collapsed ? 'Expand' : 'Collapse'} navigation</Button></div>
  </section>;
}
