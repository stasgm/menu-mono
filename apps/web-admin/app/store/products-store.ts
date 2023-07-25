import { IProduct } from '@packages/domains';
import { getProductsMock } from '@packages/mocks';
import { create } from 'zustand';

interface ProductState {
  products: IProduct[];
  isFetching: boolean;
  getProducts: () => void;
  addProduct: (product: IProduct) => void;
  updateProduct: (product: IProduct) => void;
  removeProduct: (product: IProduct) => void;
}

const useProductsStore = create<ProductState>((set, get) => ({
  products: [],
  isFetching: false,
  getProducts: async () => {
    const { products, isFetching } = get();
    if (products.length > 0 || isFetching) return;

    set({
      isFetching: true,
    });

    // const res = getProductsMock();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=b`);

    const result: { meals: any[] } = await response.json();
    const convertedResult: IProduct[] = result.meals.map((r) => ({
      id: r.idMeal,
      name: r.strMeal,
      description: r.strInstructions ?? '',
      image: r.strMealThumb ?? '',
      categories: [],
      disabled: Math.floor(Math.random() * 2) === 1,
    }));

    set({
      products: convertedResult,
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
}));

export default useProductsStore;
