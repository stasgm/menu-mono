import { NavBar } from '@components';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Menu admin',
  description: 'Админка для нашего приложения',
  icons: 'logo.svg',
};

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main className="dark p-4 pt-14">{children}</main>
    </>
  );
}
