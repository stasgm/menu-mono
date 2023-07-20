import { useEffect } from 'react';

import Container from '@/components/container';
import { useAppProductsStore } from '@/store/zustand';

import ProductTable from './product-table';

const Header = () => {
  return (
    <div className="mb-2 flex justify-between">
      <h1 className="self-center text-xl font-bold text-gray-100">Products</h1>
      <button className="rounded-md bg-gray-800 p-2 px-4 hover:bg-gray-900 focus:outline-none">
        Add new
      </button>
    </div>
  );
};

const Products = () => {
  const products = useAppProductsStore.use.products();
  const { fetchProducts } = useAppProductsStore.use.productsActions();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <Header />
      <ProductTable data={products} />
    </Container>
  );
};

export default Products;
