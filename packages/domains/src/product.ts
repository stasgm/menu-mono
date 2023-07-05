import { getCategory, ICategory } from './category';

export interface IProductData {
  id: number;
  name: string;
  categories: number[];
}

export interface IProduct {
  id: number;
  name: string;
  categories: ICategory[];
}

export const getProduct = (products: IProductData[], categories: ICategory[], productId: number): IProduct => {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const productCategories: ICategory[] = product.categories.map((categoryId) => getCategory(categories, categoryId));

  return { ...product, categories: productCategories };
};
