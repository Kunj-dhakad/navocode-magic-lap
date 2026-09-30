import './globals.css';
import './starborn.css';
import './star-magic-gallery.css';
import './saas.css';
import './saas-motion.css';
import './star-ascension.css';
import './galaxy-generator.css';
import './fireworks-on-click.css';
import './black-hole-effect.css';
import './magic-cursor-trail.css';
import './text-to-particles.css';
import './particle-reveal.css';

export const metadata = {
  title: 'NavoCode Magic Lab — 38 Experiments + 20 SaaS Components',
  description: '38 interactive UI experiments and 20 animated SaaS components with live previews and React source code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
