import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MenuSlice, createMenuSlice } from './menu';
import { OrderSlice, createOrderSlice } from './order';

type StoreState = MenuSlice & OrderSlice;

export const useStore = create<StoreState>()(
  // persist(
  devtools(
    (...args) => ({
      ...createMenuSlice(...args),
      ...createOrderSlice(...args),
    }),
    { serialize: true },
    // ),
  ),
  // {
  //   name: 'app-store',
  // },
  // ),
);
