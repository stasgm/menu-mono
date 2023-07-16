import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createMenusSlice, MenusSlice } from './menus';
import { createOrdersSlice, OrdersSlice } from './orders';
import { createProductsSlice, ProductsSlice } from './products';

type StoreState = MenusSlice & OrdersSlice & ProductsSlice;

export const useStore = create<StoreState>()(
  // immer(
  // persist(
  devtools(
    (...args) => ({
      ...createMenusSlice(...args),
      ...createOrdersSlice(...args),
      ...createProductsSlice(...args),
    }),
    { serialize: true }
    // ),
  )
  // {
  //   name: 'app-store',
  // },
  // ),
);
