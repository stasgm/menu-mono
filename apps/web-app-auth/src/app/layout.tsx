import './globals.css';

import type { Metadata } from 'next';

import NavBar from './components/NavBar';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog for testing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
