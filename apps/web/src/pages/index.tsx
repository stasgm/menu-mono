// import { useHelloQuery } from '@/store/services/api';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import OrderInfo from '../components/order-info';
import MenuLine from '../components/menu-line';
import Nav from '../components/nav';
import Container from '../components/container';
import { IMenu, IMenuline, IOrder, IProductSelection, calculateTotalPrice } from '@packages/shared';

import { initialMenu } from '../mockData';

const delay = (ms: number) => {
  return new Promise((res, _) => setTimeout(res, ms));
};

const getInitialOrder = (): IOrder => {
  return {
    id: crypto.randomUUID(),
    number: 1,
    date: new Date(),
    customerDetails: {
      name: '',
      phoneNumber: '',
    },
    productSelections: [],
    orderLines: [],
    status: 'new',
    totalAmount: 0,
  };
};

export default function Menu() {
  // const { data } = useHelloQuery();
  const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
  const [menu, setMenu] = useState<IMenu | null>(null);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [filter, setFilter] = useState<'all' | 'selected' | 'unselected'>('all');

  useEffect(() => {
    if (status !== 'loading') return;
    // sleep 2000 ms

    (async () => {
      await delay(1000);
      setMenu(initialMenu);
      setStatus('loaded');
    })();
  }, [status]);

  useEffect(() => {
    setOrder(getInitialOrder());
  }, []);

  const handleIncreaseQuantity = (productId: number) => {
    if (!order) {
      return;
    }

    const productSelection = order.productSelections.find((el) => el.productId === productId);

    const productSelections: IProductSelection[] = (() => {
      if (productSelection) {
        return [
          ...order.productSelections.filter((el) => el.id !== productSelection.id),
          {
            ...productSelection,
            quantity: productSelection.quantity + 1,
          },
        ];
      }

      return [
        ...order.productSelections,
        {
          id: crypto.randomUUID(),
          productId,
          quantity: 1,
        },
      ];
    })();

    setOrder((prev) => (prev ? { ...prev, productSelections } : { ...getInitialOrder(), productSelections }));
  };

  const handleDecreaseQuantity = (productId: number) => {
    if (!order) {
      return;
    }

    const productSelection = order.productSelections.find((el) => el.productId === productId);

    const productSelections: IProductSelection[] = (() => {
      if (productSelection) {
        if (productSelection.quantity === 1) {
          return order.productSelections.filter((el) => el.id !== productSelection.id);
        }

        return [
          ...order.productSelections.filter((el) => el.id !== productSelection.id),
          {
            ...productSelection,
            quantity: productSelection.quantity - 1,
          },
        ];
      }

      return order.productSelections;
    })();

    setOrder((prev) => (prev ? { ...prev, productSelections } : { ...getInitialOrder(), productSelections }));
  };

  const handleResetOrder = () => {
    setOrder((prev) => (prev ? { ...prev, productSelections: [] } : null));
  };

  const handlePlaceOrder = () => {
    console.log('placing an order');
    setOrder(getInitialOrder());
  };

  const getProductQuantity = (productId: number) => {
    const productSelection = order?.productSelections.find((el) => el.productId === productId);

    if (!productSelection) {
      return 0;
    }

    return productSelection.quantity;
  };

  const productSelectionAmount =
    order?.productSelections.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0) ?? 0;

  const orderPriceAmount = menu && order ? calculateTotalPrice(order.productSelections, menu) : 0;

  const filterLines = (menu: IMenu): IMenuline[] => {
    if (!order) {
      return menu.lines;
    }

    if (filter === 'selected') {
      return menu.lines.filter((line) => order.productSelections.find((el) => el.productId === line.product.id));
    }

    if (filter === 'unselected') {
      return menu.lines.filter((line) => !order.productSelections.find((el) => el.productId === line.product.id));
    }

    return menu.lines;
  };

  return (
    <>
      <Head>
        <title>Menu App</title>
        <link rel="icon" href="/favicon-32.png" />
      </Head>

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-slate-600 min-h-[200px] sm:min-h-[100px]">
          <Container>
            <div className="flex justify-start">
              <h1 className="text-2xl sm:text-4xl text-white font-bold">Menu</h1>
            </div>
            <OrderInfo />
          </Container>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Container>
            {menu?.lines.length ? (
              <ul className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden">
                {filterLines(menu).map((line) => (
                  <li key={line.id}>
                    <MenuLine
                      item={line}
                      quantity={getProductQuantity(line.product.id)}
                      key={line.id}
                      increaseQuantity={handleIncreaseQuantity}
                      decreaseQuantity={handleDecreaseQuantity}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden">
                <li>
                  <div className="flex justify-around items-center bg-gray-800 py-4 px-6 border-b border-gray-600">
                    Loading...
                  </div>
                </li>
              </ul>
            )}
            <Nav
              setFilter={setFilter}
              filter={filter}
              orderPriceAmount={orderPriceAmount}
              productAmount={productSelectionAmount}
              placeOrder={handlePlaceOrder}
              resetOrder={handleResetOrder}
            />
          </Container>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
          <small>Simple cafe-like menu</small>
        </footer>
      </div>
    </>
  );
}
