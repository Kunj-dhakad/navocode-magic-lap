import './globals.css';

export const metadata = {
  title: 'NavoCode Magic Lab',
  description: '10 tiny interactive frontend experiments built for NavoCode reels.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
