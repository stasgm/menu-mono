'use client';
import { menuItems } from '@constants';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkStyle = 'flex items-center px-8 ';
const activeStyle = linkStyle + ' text-gray-100 bg-gray-500 font-semibold';
const nonActiveStyle = linkStyle + '';

export const NavBar = () => {
  const currentRoute = usePathname();

  return (
    <header className="w-full bg-gray-600">
      <nav className="mx-auto flex h-12 max-w-[1024px] justify-center bg-transparent">
        <Link href="/" className={`absolute left-0 h-12 ${linkStyle}`}>
          {/* <ShoppingBagIcon /> */}
          Logo
        </Link>

        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={currentRoute === item.link ? activeStyle : nonActiveStyle}
          >
            {item.caption}
          </Link>
        ))}
      </nav>
    </header>
  );
};
