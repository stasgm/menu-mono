import { IProduct } from '@packages/domains';
import { getProductsMock } from '@packages/mocks';
import { create } from 'zustand';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ProductState {
  products: IProduct[];
  isFetching: boolean;
  getProducts: () => void;
  addProduct: (product: IProduct) => void;
  updateProduct: (product: IProduct) => void;
  removeProduct: (product: IProduct) => void;
  refreshProduct: () => void;
}

const productsStore = create<ProductState>((set, get) => ({
  products: [],
  isFetching: false,
  getProducts: async () => {
    const { products: prevProducts, isFetching } = get();
    if (prevProducts.length > 0 || isFetching) return;

    set({
      isFetching: true,
    });

    const products: IProduct[] = await (async () => {
      if ((process.env.NEXT_PUBLIC_MOCKED_API ?? 'false') === 'true') {
        return getProductsMock();
      }
      return [];
    })();

    set({
      products,
      isFetching: false,
    });
  },
  addProduct: (newProduct: IProduct) => {
    set((state) => ({
      products: [{ ...newProduct, id: 'id' + state.products.length + 1 }, ...state.products],
    }));
  },
  updateProduct: (updatedProduct: IProduct) => {
    const { products } = get();
    const findIndex = products.findIndex((p) => p.id === updatedProduct.id);
    if (findIndex < 0) return;

    products[findIndex] = updatedProduct;
    set({ products });
  },
  removeProduct: (deletedProduct: IProduct) => {
    const state = get().products;
    const findIndex = state.findIndex((p) => p.id === deletedProduct.id);
    if (findIndex < 0) return;

    state.splice(findIndex, 1);
    set({ products: state });
  },
  refreshProduct: async () => {
    set({
      isFetching: true,
    });

    await delay(5000);

    const products: IProduct[] = await (async () => {
      if ((process.env.NEXT_PUBLIC_MOCKED_API ?? 'false') === 'true') {
        return getProductsMock();
      }
      return [];
    })();

    set({
      products,
      isFetching: false,
    });
  },
}));

export const initProductState = (defaultState = {}) => productsStore;

export default productsStore;
