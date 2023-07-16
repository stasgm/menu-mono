import { IProduct } from '@packages/domains';
import { getProductsMock } from '@packages/mocks';
import { StateCreator } from 'zustand';

// import { getProducts } from '@/graphql/products';
// import client from '@/utils/apollo-client';
import { ILoadingState } from '../types';

export type ProductsSlice = State & ILoadingState & { productsActions: Actions };

interface State {
  products: IProduct[];
}

interface Actions {
  fetchProducts: () => void;
}

export const createProductsSlice: StateCreator<ProductsSlice> = (set) => ({
  products: [],
  orders: [],
  error: null,
  isLoading: false,
  // query: { page: 1, per_page: 20 },
  productsActions: {
    fetchProducts: () => {
      set(() => ({
        isLoading: true,
        error: '',
      }));

      const products: IProduct[] = getProductsMock();
      // const { data } = await client.query<{ products: IProduct[] }>({
      //   query: getProducts,
      // });
      // const products = data.products;

      set(() => ({
        isLoading: false,
        error: '',
        products,
      }));
    },
  },
});
