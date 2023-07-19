import { Bars4Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IMenuItemProp {
  caption: string;
  link: string;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const MenuItem = (prop: IMenuItemProp) => {
  const { pathname } = useRouter();

  return (
    <li
      className={classNames(
        pathname === `/${prop.link}`
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white',
        'block cursor-pointer rounded-b-none rounded-t-none px-2 py-1 font-semibold lg:px-6 lg:py-2 lg:text-center lg:first:rounded-l-md lg:last:rounded-r-md'
      )}
    >
      <Link href={`${prop.link}`}>{prop.caption}</Link>
    </li>
  );
};

const menuItems: IMenuItemProp[] = [
  {
    caption: 'Home',
    link: '',
  },
  {
    caption: 'Orders',
    link: 'orders',
  },
  {
    caption: 'Menu',
    link: 'menu',
  },
  {
    caption: 'Products',
    link: 'products',
  },
  {
    caption: 'Categories',
    link: 'categories',
  },
  {
    caption: 'Users',
    link: 'users',
  },
];

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="py-2">
      <div className="mx-auto flex w-full flex-wrap items-center justify-end px-[2%] lg:justify-center lg:px-0 xl:mx-auto xl:max-w-7xl">
        <Bars4Icon
          className="h-6 w-6 cursor-pointer text-gray-300 lg:hidden"
          onClick={() => setOpen(!open)}
        />
        <nav
          className={classNames(
            open ? 'block' : 'hidden',
            'w-full lg:flex lg:w-auto lg:items-center'
          )}
        >
          <ul
            className="mt-2 rounded-md bg-gray-700 text-base font-bold text-gray-800 lg:mt-0 lg:flex lg:justify-between"
            role="list"
          >
            {menuItems.map((el) => (
              <MenuItem caption={el.caption} link={el.link} key={el.caption} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
