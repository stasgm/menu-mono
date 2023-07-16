import Link from 'next/link';

interface IMenuItemProp {
  caption: string;
  link: string;
}

const MenuItem = (prop: IMenuItemProp) => {
  return (
    <li className="inline-flex h-8 w-24 items-center justify-center rounded-md bg-slate-900 text-center hover:bg-slate-700 focus:outline-none active:bg-gray-600 active:text-gray-400">
      <Link href={`/${prop.link}`}>{prop.caption}</Link>
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
  return (
    <nav className="mx-auto flex max-w-xl flex-col justify-between px-2 py-4 sm:px-6 sm:py-10">
      <ul className="flex items-center justify-between gap-2 rounded-md bg-gray-800 p-2 px-2 text-sm font-bold text-gray-200 ">
        {menuItems.map((el) => (
          <MenuItem caption={el.caption} link={el.link} key={el.caption} />
        ))}
      </ul>
    </nav>

    // <nav className="mx-auto mt-4 flex">
    //   <ul className="mt-0 flex items-center justify-between gap-2 rounded-md bg-gray-800 p-2 px-2 text-sm font-bold text-gray-200 ">
    //     {menuItems.map((el) => (
    //       <MenuItem caption={el.caption} link={el.link} key={el.caption} />
    //     ))}
    //   </ul>
    // </nav>
  );
};

export default Nav;
