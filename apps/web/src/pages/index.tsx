// import { useHelloQuery } from '@/store/services/api';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

import OrderInfo from '../components/order-info';
import MenuLine from '../components/menu-line';
import Nav from '../components/nav';
import Container from '../components/container';

import {
  IOrder,
  IMenu,
  IProductSelection,
  calculateProductsQuantity,
  calculateTotalPrice,
  getOrder,
} from '@packages/domains';

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
  const [order, setOrder] = useState<IOrder>(getInitialOrder());

  useEffect(() => {
    if (status !== 'loading') return;
    // sleep 2000 ms

    (async () => {
      await delay(300);
      setMenu(initialMenu);
      setStatus('loaded');
    })();
  }, [status]);

  useEffect(() => {
    setOrder(getInitialOrder());
  }, []);

  const handleSetName = (name: string) => {
    setOrder((prev) => ({ ...prev, customerDetails: { ...prev.customerDetails, name } }));
  };

  const handleSetPhoneNumber = (phoneNumber: string) => {
    setOrder((prev) => ({ ...prev, customerDetails: { ...prev.customerDetails, phoneNumber } }));
  };

  const handleIncreaseQuantity = (productId: number) => {
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

    const orderPriceAmount = menu ? calculateTotalPrice(productSelections, menu) : 0;

    setOrder((prev) => getOrder({ ...prev, productSelections, totalAmount: orderPriceAmount }, menu));
  };

  const handleDecreaseQuantity = (productId: number, quantity = 1) => {
    const productSelection = order.productSelections.find((el) => el.productId === productId);

    if (!productSelection) {
      return;
    }

    const productSelections: IProductSelection[] = (() => {
      if (productSelection.quantity === quantity) {
        return order.productSelections.filter((el) => el.id !== productSelection.id);
      }

      return [
        ...order.productSelections.filter((el) => el.id !== productSelection.id),
        {
          ...productSelection,
          quantity: productSelection.quantity - 1,
        },
      ];
    })();

    const orderPriceAmount = menu ? calculateTotalPrice(productSelections, menu) : 0;

    setOrder((prev) => getOrder({ ...prev, productSelections, totalAmount: orderPriceAmount }, menu));
  };

  const handleResetOrder = () => {
    setOrder(getInitialOrder());
  };

  const handlePlaceOrder = async () => {
    console.log('placing an order');
    await axios.post<IOrder>(process.env.NEXT_PUBLIC_API_SERVER ?? 'localhost:3000', order);
    setOrder(getInitialOrder());
  };

  const getProductQuantity = (productId: number) => {
    const productSelection = order.productSelections.find((el) => el.productId === productId);

    if (!productSelection) {
      return 0;
    }

    return productSelection.quantity;
  };

  const productSelectionAmount = calculateProductsQuantity(order.productSelections);

  return (
    <>
      <Head>
        <title>Menu App</title>
        <link rel="icon" href="/favicon-32.png" sizes="32" />
        <link rel="icon" href="/favicon-24.png" sizes="24" />
      </Head>

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-slate-600 min-h-[200px] sm:min-h-[100px]">
          <Container>
            <div className="flex justify-start gap-2 self-center">
              <h1 className="text-2xl sm:text-4xl text-gray-200 font-bold">Café-like menu</h1>
              <ShoppingCartIcon className="flex-none self-center text-sm h-8 w-8 text-gray-400" />
            </div>
            <OrderInfo
              name={order.customerDetails.name || ''}
              phoneNumber={order.customerDetails.phoneNumber || ''}
              setName={handleSetName}
              setPhoneNumber={handleSetPhoneNumber}
            />
          </Container>
        </header>
        <main className="flex-1 bg-gray-900 text-gray-100">
          <Container>
            {menu?.lines.length ? (
              <ul className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden">
                {menu.lines.map((line) => (
                  <li key={line.id}>
                    <MenuLine
                      item={line}
                      quantity={getProductQuantity(line.product.id)}
                      key={line.id}
                      onIncreaseQuantityClicked={() => handleIncreaseQuantity(line.product.id)}
                      onDecreaseQuantityClicked={() => handleDecreaseQuantity(line.product.id)}
                      onResetQuantityClicked={() =>
                        handleDecreaseQuantity(line.product.id, getProductQuantity(line.product.id))
                      }
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
              orderPriceAmount={order.totalAmount}
              productAmount={productSelectionAmount}
              placeOrder={handlePlaceOrder}
              resetOrder={handleResetOrder}
            />
          </Container>
        </main>
        <footer className="bg-gray-900 text-gray-500 text-center">
          <small>Simple cafe-like menu</small>
        </footer>
      </div>
    </>
  );
}
