import './globals.css';
import './starborn.css';
import './star-magic-gallery.css';
import './saas.css';
import './saas-motion.css';
import './star-ascension.css';

export const metadata = {
  title: 'NavoCode Magic Lab — 32 Experiments + 20 SaaS Components',
  description: '32 interactive UI experiments and 20 animated SaaS components with live previews and React source code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
