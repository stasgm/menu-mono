import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { useEffect } from 'react';

import Container from '@/components/container';
import MenuLine from '@/components/menu-line';
import Nav from '@/components/nav';
import { useStore } from '@/store/zustand';

import UserInfoForm from '../components/user-info-form';

export default function Menu() {
  const { cart, menu, menuActions, cartActions } = useStore();
  const { fetchMenu } = menuActions;
  const { placeOrder, removeProduct, resetCart, updateUserData, updateQuantity } = cartActions;

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <>
      <Head>
        <title>Menu App</title>
        <link rel="icon" href="/favicon-32.png" sizes="32" />
        <link rel="icon" href="/favicon-24.png" sizes="24" />
      </Head>

      <div className="flex min-h-screen flex-col font-body">
        <header className="min-h-[150px] bg-slate-600 sm:min-h-[100px]">
          <Container>
            <div className="flex justify-start gap-2 self-center">
              <h1 className="text-2xl font-bold text-gray-200 sm:text-4xl">Café-like menu</h1>
              <ShoppingCartIcon className="h-8 w-8 flex-none self-center text-sm text-gray-400" />
            </div>
            <UserInfoForm
              name={cart.userData.name}
              phoneNumber={cart.userData.phoneNumber}
              setName={(name) => updateUserData({ ...cart.userData, name })}
              setPhoneNumber={(phoneNumber) => updateUserData({ ...cart.userData, phoneNumber })}
            />
          </Container>
        </header>
        <main className="flex-1 bg-gray-900 text-gray-100">
          <Container>
            {menu?.lines.length ? (
              <>
                <ul className="-mt-14 overflow-hidden rounded-t-md sm:-mt-28">
                  {menu.lines.map((line) => (
                    <li key={line.id}>
                      <MenuLine
                        item={line}
                        quantity={cart.productSelection[line.product.id]?.quantity ?? 0}
                        key={line.id}
                        onIncreaseQuantityClicked={() => updateQuantity(line, 'increase')}
                        onDecreaseQuantityClicked={() => updateQuantity(line, 'decrease')}
                        onResetQuantityClicked={() => removeProduct(line)}
                      />
                    </li>
                  ))}
                </ul>
                <Nav
                  totalAmount={cart.totalAmount}
                  totalProductQuantity={cart.totalProductQuantity}
                  placeOrder={placeOrder}
                  resetCart={resetCart}
                />
              </>
            ) : (
              <div className="flex items-center justify-around px-6 py-4 text-gray-100">
                Loading menu ...
              </div>
            )}
          </Container>
        </main>
        <footer className="bg-gray-900 text-center text-gray-500">
          <small>Simple cafe-like menu</small>
        </footer>
      </div>
    </>
  );
}
