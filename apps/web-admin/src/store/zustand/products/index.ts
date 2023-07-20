import { IProduct } from '@packages/domains';
import { getProductsMock } from '@packages/mocks';
import { StateCreator } from 'zustand';

import { getProducts } from '@/graphql/products';
import client from '@/utils/apollo-client';

import { ILoadingState } from '../types';

export type ProductsSlice = State & { loadingState: ILoadingState } & { productsActions: Actions };

interface State {
  products: IProduct[];
}

interface Actions {
  fetchProducts: () => void;
}

export const createProductsSlice: StateCreator<ProductsSlice> = (set) => ({
  products: [],
  loadingState: {
    error: null,
    isLoading: false,
    query: { page: 1, per_page: 20 },
  },
  productsActions: {
    fetchProducts: async () => {
      set(() => ({
        products: [],
        loadingState: {
          isLoading: true,
          error: '',
        },
      }));

      const products: IProduct[] = await (async () => {
        if (process.env.NEXT_PUBLIC_MOCKED_API === 'true') {
          return getProductsMock();
        }

        const { data } = await client.query<{ products: IProduct[] }>({
          query: getProducts,
        });

        return data.products;
      })();

      set(() => ({
        products,
        loadingState: {
          isLoading: true,
          error: '',
        },
      }));
    },
  },
});
