import './globals.css';
import './saas.css';
import './saas-motion.css';

export const metadata = {
  title: 'NavoCode Magic Lab — 30 Experiments + 20 SaaS Components',
  description: '30 interactive UI experiments and 20 animated SaaS components with live previews and React source code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
