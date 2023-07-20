import { create, StoreApi, UseBoundStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createMenusSlice, MenusSlice } from './menus';
import { createOrdersSlice, OrdersSlice } from './orders';
import { createProductsSlice, ProductsSlice } from './products';

type StoreState = MenusSlice & OrdersSlice;

export const useProductsStore = create<ProductsSlice>()(
  devtools(
    immer((...args) => ({
      ...createProductsSlice(...args),
    })),
    { serialize: true }
  )
);

// export const useStore = create<StoreState>()(
//   // immer(
//   devtools(
//     (...args) => ({
//       ...createMenusSlice(...args),
//       ...createOrdersSlice(...args),
//     }),
//     { serialize: true }
//   )
//   // )
// );

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useAppProductsStore = createSelectors(useProductsStore);
