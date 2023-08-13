import Link from 'next/link';
import React from 'react';

import NavLink from './NavLink';

// TODO: Responsiveness and onClick in menu.

export default function NavBar() {
  return (
    <>
      <nav className="bg-gris text-blancucho sticky p-5 shadow md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer text-2xl font-bold">
            BLOG SYSTEM
          </Link>
          <span className="mx-2 block cursor-pointer text-3xl md:hidden">
            <a>=</a>
          </span>
        </div>
        <ul className="absolute left-0 z-[-1] w-full py-4 pl-7 opacity-0 md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:pl-0 md:opacity-100">
          <NavLink href={'/'} link={'Home'} />
          <NavLink href={'/about'} link={'About'} />
          <NavLink href={'/contact'} link={'Contact'} />
          <NavLink href={'/login'} link={'Login'} />
          <NavLink href={'/register'} link={'Register'} />
          <NavLink href={'/posts'} link={'posts'} />
        </ul>
      </nav>
    </>
  );
}
