import { createContext, useLayoutEffect } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import productsStore, { ProductState, initProductState } from './products-store';

export const StoreContext = createContext<UseBoundStore<StoreApi<ProductState>> | null>(null);
export const Provider = StoreContext.Provider;

let store: any;
export const useCreateStore = (serverState?: ProductState) => {
  if (typeof window === 'undefined') {
    return () => initProductState(serverState);
    // return productsStore;
  }

  const isReusingStore = Boolean(store);
  store = store ?? initProductState();
  // store = store ?? productsStore();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (serverState && isReusingStore) {
      store.setState({ ...store.getState(), ...serverState }, true);
    }
  });

  return store;
};
