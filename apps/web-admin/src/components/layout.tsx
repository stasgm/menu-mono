import React, { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="font-body flex min-h-screen flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 bg-gray-600 text-gray-200">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
