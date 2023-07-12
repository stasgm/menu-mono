import { Injectable } from '@nestjs/common';
import { IProductData } from '@packages/domains';
import { categoriesMock, productsMock } from '@packages/mocks';

import {
  Category,
  CreateProductInput,
  Product,
  UpdateProductInput,
} from '../../types/graphql.schema';

export const tranformCategories = (productCategories: Array<string | null>) => {
  return productCategories.reduce((acc, cur) => {
    const category = categoriesMock.find((c) => c.id === cur)!;

    if (!category) {
      return acc;
    }

    return [
      ...acc,
      {
        id: +category.id,
        name: category.name,
      },
    ];
  }, [] as Category[]);
};

export const tranformProduct = (
  productId: number | null,
): Product | undefined => {
  const product = productsMock.find((p) => +p.id === productId);

  if (!product) {
    return undefined;
  }

  return {
    id: +product.id,
    name: product.name,
    categories: tranformCategories(product.categories),
  };
};

const tranformProducts = (products: IProductData[]): Product[] => {
  return products.map((pr) => {
    const categories = tranformCategories(pr.categories);

    return {
      id: +pr.id,
      name: pr.name,
      categories,
    };
  });
};

@Injectable()
export class ProductsService {
  private readonly products: Product[] = tranformProducts(productsMock);

  async create(createProductInput: CreateProductInput) {
    const categories = tranformCategories(createProductInput.categories);

    const product = {
      ...createProductInput,
      categories,
    };

    this.products.push(product);

    return product;
  }

  findAll() {
    return this.products;
  }

  async findOne(id: number) {
    return this.products.find((p) => p.id === id);
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const index = this.products.findIndex((p) => p.id !== id);

    const categories = tranformCategories(updateProductInput.categories);

    const product = {
      ...updateProductInput,
      categories,
    };

    this.products[index] = product;

    return product;
  }

  async remove(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    const oldProduct = this.products[index];
    this.products.splice(index);

    return oldProduct;
  }
}
