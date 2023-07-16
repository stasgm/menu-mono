import React, { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Nav from '@/components/nav';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="font-body flex min-h-screen flex-col bg-slate-600">
      <Header />
      <Nav />
      <main className="flex-1 bg-gray-900 text-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
