import { gql } from '@apollo/client';
import { IProduct } from '@packages/domains';
import { StateCreator } from 'zustand';

import client from '@/utils/apollo-client';

import { ILoadingState } from '../types';

export type ProductsSlice = State & { productsState: ILoadingState } & { productsActions: Actions };

interface State {
  products: IProduct[];
}

interface Actions {
  fetchProducts: () => void;
}

export const createProductsSlice: StateCreator<ProductsSlice> = (set) => ({
  products: [],
  productsState: {
    error: null,
    isLoading: false,
  },
  // query: { page: 1, per_page: 20 },
  productsActions: {
    fetchProducts: async () => {
      set({
        productsState: {
          isLoading: true,
          error: '',
        },
      });

      const { data } = await client.query<{ products: IProduct[] }>({
        query: gql`
          query GetProducts {
            products {
              id
              name
              disabled
              categories {
                id
                name
              }
            }
          }
        `,
      });

      set({
        productsState: {
          isLoading: false,
          error: '',
        },
        products: data.products,
      });
    },
  },
});
