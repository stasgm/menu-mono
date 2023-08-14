'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Link from 'next/link';
import { Suspense } from 'react';

import { query } from '@/lib/getAllProducts';

import Loading from '../components/Loading';

const Products = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
};

const ProductList = () => {
  const { data } = useSuspenseQuery(query, {
    fetchPolicy: 'no-cache',
  });

  return (
    <ul>
      {data.products.map((product) => (
        <>
          <Link href={`/products/${product.id}`} key={product.id}>
            <article className="border border-blancucho">
              <h1 className="font-xl font-bold">{product.name}</h1>
              {/* {product.categories === null ? (
                <p className="ml-8">{product.categories.slice(0, 100)}...</p>
              ) : (
                <p className="ml-8">{product.abstract}</p>
              )}*/}
            </article>
          </Link>
          <br />
        </>
      ))}
    </ul>
  );
};

export default Products;
