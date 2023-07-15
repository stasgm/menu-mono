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
  const {
    placeOrder,
    removeProduct,
    resetCart,
    updateUserData,
    updateQuantity,
  } = cartActions;

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

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-slate-600 min-h-[150px] sm:min-h-[100px]">
          <Container>
            <div className="flex justify-start gap-2 self-center">
              <h1 className="text-2xl sm:text-4xl text-gray-200 font-bold">
                Café-like menu
              </h1>
              <ShoppingCartIcon className="flex-none self-center text-sm h-8 w-8 text-gray-400" />
            </div>
            <UserInfoForm
              name={cart.userData.name}
              phoneNumber={cart.userData.phoneNumber}
              setName={(name) => updateUserData({ ...cart.userData, name })}
              setPhoneNumber={(phoneNumber) =>
                updateUserData({ ...cart.userData, phoneNumber })
              }
            />
          </Container>
        </header>
        <main className="flex-1 bg-gray-900 text-gray-100">
          <Container>
            {menu?.lines.length ? (
              <>
                <ul className="-mt-14 sm:-mt-28 rounded-t-md overflow-hidden">
                  {menu.lines.map((line) => (
                    <li key={line.id}>
                      <MenuLine
                        item={line}
                        quantity={
                          cart.productSelections[line.product.id]?.quantity ?? 0
                        }
                        key={line.id}
                        onIncreaseQuantityClicked={() =>
                          updateQuantity(line, 'increase')
                        }
                        onDecreaseQuantityClicked={() =>
                          updateQuantity(line, 'decrease')
                        }
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
              <div className="flex justify-around items-center py-4 px-6 text-gray-100">
                Loading menu ...
              </div>
            )}
          </Container>
        </main>
        <footer className="bg-gray-900 text-gray-500 text-center">
          <small>Simple cafe-like menu</small>
        </footer>
      </div>
    </>
  );
}
