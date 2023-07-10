import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from '../../graphql.schema';

@Injectable()
export class ProductsService {
  private readonly products: Array<Product> = [
    { id: 1, name: 'Tea' },
    { id: 2, name: 'Coffee' },
  ];

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
