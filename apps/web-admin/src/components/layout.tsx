import React, { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="font-body flex min-h-screen flex-col bg-slate-600">
      <Header />
      <Navbar />
      <main className="flex-1 bg-gray-900 text-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
