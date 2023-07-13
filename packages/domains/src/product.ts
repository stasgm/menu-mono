import { getCategory, ICategory } from './category';

export interface IProductData {
  id: string;
  name: string;
  categories: string[];
}

export interface IProduct {
  id: string;
  name: string;
  categories: ICategory[];
}

export const getProduct = (
  products: IProductData[],
  categories: ICategory[],
  productId: string,
): IProduct => {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const productCategories: ICategory[] = product.categories.map((categoryId) =>
    getCategory(categories, categoryId),
  );

  return { ...product, categories: productCategories };
};
