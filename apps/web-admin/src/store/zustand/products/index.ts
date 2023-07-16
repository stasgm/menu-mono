// import { gql } from '@apollo/client';
// import { } from '@packages/domains';
import { StateCreator } from 'zustand';

import { ILoadingState } from '../types';

// import client from '@/utils/apollo-client';

interface IProduct {
  id: string;
  name: string;
  disabled: boolean;
}

export type ProductsSlice = State & ILoadingState & { productsActions: Actions };

interface State {
  products: IProduct[];
}

interface Actions {
  fetchProducts: () => void;
}

export const createProductsSlice: StateCreator<ProductsSlice> = (set) => ({
  products: [],
  error: null,
  isLoading: false,
  // query: { page: 1, per_page: 20 },
  productsActions: {
    fetchProducts: () => {
      set({ isLoading: true });
    },
  },
});
