import './globals.css';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import { NavBar } from '../components';

export const metadata: Metadata = {
  title: 'Menu admin',
  description: 'Админка для нашего приложения',
  icons: 'logo.svg',
};

interface Props {
  children?: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark">
      <body>
        <NavBar />
        <main className="p-4 pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
