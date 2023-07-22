import { Bars4Icon } from '@heroicons/react/24/outline';
import { useRouter as useNavigation } from 'next/navigation';
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
  const nav = useNavigation();
  const router = useRouter();

  return (
    <li
      className={classNames(
        (router.pathname === '/' && prop.link === '') ||
          (router.pathname.includes(`/${prop.link}`) && prop.link !== '')
          ? 'bg-gray-500 text-gray-100'
          : 'text-gray-400',
        'block cursor-pointer rounded-b-none rounded-t-none px-2 py-1 font-semibold hover:bg-gray-600 hover:text-white lg:px-6 lg:py-2 lg:text-center lg:first:rounded-l-md lg:last:rounded-r-md'
      )}
      onClick={() => nav.push(`/${prop.link}`)}
    >
      <span>{prop.caption}</span>
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

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 py-2">
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

export default Navbar;
