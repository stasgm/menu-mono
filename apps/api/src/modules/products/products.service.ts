import { Injectable } from '@nestjs/common';

import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from '../../graphql.schema';

import { products, categories } from '@packages/mocks';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = products.map((pr) => ({
    id: +pr.id,
    name: pr.name,
    categories: pr.categories.map((cat) => {
      const category = categories.find((c) => c.id === cat)!;
      return {
        id: +category.id,
        name: category.name,
      };
    }),
  }));

  async create(createProductInput: CreateProductInput) {
    return this.products.push(createProductInput);
  }

  findAll() {
    return this.products;
  }

  async findOne(id: number) {
    return this.products.find((p) => p.id === id);
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const idx = this.products.findIndex((p) => p.id !== id);
    this.products[idx] = updateProductInput;
    return this.products[idx];
  }

  async remove(id: number) {
    return this.products.slice(this.products.findIndex((p) => p.id !== id));
  }
}
