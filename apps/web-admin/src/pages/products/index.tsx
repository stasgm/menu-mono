import { IProduct } from '@packages/domains';
import { useEffect } from 'react';

import Container from '@/components/container';
import { useAppStore } from '@/store/zustand';

interface IProps {
  data: IProduct[];
}

const ProductList = (props: IProps) => {
  return (
    <ul>
      {props.data.map((el) => (
        <li key={el.id}>{el.name}</li>
      ))}
    </ul>
  );
};

const Products = () => {
  // const { products, productsActions } = useStore();
  const products = useAppStore.use.products();
  const { fetchProducts } = useAppStore.use.productsActions();
  // const { fetchProducts } = productsActions;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <h1 className="text-xl font-bold text-gray-200">Products</h1>
      <ProductList data={products} />
    </Container>
  );
};

export default Products;
