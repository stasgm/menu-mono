// import { useHelloQuery } from '@/store/services/api';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import OrderInfo from '../components/order-info';
import MenuLine from '../components/menu-line';
import Nav from '../components/nav';
import Container from '../components/container';

interface IProduct {
  id: number;
  name: string;
}

export interface IMenuline {
  id: number;
  product: IProduct;
  price: number;
  quantity: number;
}

const initialMenu: IMenuline[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Tea',
    },
    price: 100,
    quantity: 0,
  },
  {
    id: 2,
    product: {
      id: 2,
      name: 'Coffee',
    },
    price: 150,
    quantity: 0,
  },
  {
    id: 3,
    product: {
      id: 3,
      name: 'Cheesecake',
    },
    price: 250,
    quantity: 0,
  },
  {
    id: 4,
    product: {
      id: 4,
      name: 'Sandwich',
    },
    price: 200,
    quantity: 0,
  },
];

const delay = (ms: number) => {
  return new Promise((res, _) => setTimeout(res, ms));
};

export default function Menu() {
  // const { data } = useHelloQuery();
  const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
  const [menu, setMenu] = useState<IMenuline[]>([]);
  const [filter, setFilter] = useState<'all' | 'selected' | 'unselected'>('all');

  useEffect(() => {
    if (status !== 'loading') return;
    // sleep 2000 ms

    (async () => {
      // await delay(1000);
      setMenu(initialMenu);
      setStatus('loaded');
    })();
  }, [status]);

  return (
    <>
      <Head>
        <title>Menu App</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-slate-600 min-h-[200px] sm:min-h-[100px]">
          <Container>
            <div className="flex justify-between">
              <h1 className="text-xl sm:text-3xl text-white font-bold tracking-[0.625rem]">Menu</h1>
            </div>
            <OrderInfo />
          </Container>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Container>
            {menu ? (
              <div>
                <div>
                  <ul className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden">
                    {menu.map((line) => (
                      <li key={line.id}>
                        <MenuLine item={line} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
            <Nav setFilter={setFilter} filter={filter} menuLines={menu} />
          </Container>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
          <small>Simple cafe-like menu</small>
        </footer>
      </div>
    </>
  );
}
