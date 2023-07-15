import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// import { immer } from 'zustand/middleware/immer';
import { createMenuSlice, MenuSlice } from './menu';
import { CartSlice, createCartSlice } from './order';

type StoreState = MenuSlice & CartSlice;

export const useStore = create<StoreState>()(
  // immer(
  // persist(
  devtools(
    (...args) => ({
      ...createMenuSlice(...args),
      ...createCartSlice(...args),
    }),
    { serialize: true },
    // ),
  ),
  // {
  //   name: 'app-store',
  // },
  // ),
);
