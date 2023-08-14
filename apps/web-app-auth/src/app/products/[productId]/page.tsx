'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { query } from '@/lib/getProductById';

type Params = {
  params: {
    productId: string;
  };
};

const ProductPage = ({ params }: Params) => {
  const { data } = useSuspenseQuery(query, { variables: { productId: params.productId } });

  if (!data.product) {
    return <article>no product</article>;
  }

  return (
    <article>
      <header className="justify-between font-bold sm:flex md:flex-row">
        <div className="text-xl font-bold md:text-3xl">
          <div className="flex items-center">
            <h4 className="rounded-md drop-shadow-sm">{data.product.name}</h4>
            <div className="ml-4 rounded-md px-2 py-1 text-xs text-gray-500">
              <p>product.state</p>
            </div>
          </div>
          <hr className="my-1 border-4 border-celestucho"></hr>
          {/* <div className="flex items-end justify-end">
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">
              {product.createdAt}
            </h4>
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">
              {product.updatedAt}
            </h4>
          </div> */}
        </div>
      </header>
      <section>
        <p>{data.product.name}</p>
      </section>
      <footer>product.stack</footer>
    </article>
  );
};

export default ProductPage;
