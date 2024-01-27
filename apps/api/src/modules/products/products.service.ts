import { Injectable } from '@nestjs/common';

import { CreateProductInput, UpdateProductInput } from '../../types/graphql.schema';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  create(createProductInput: CreateProductInput) {
    return this.productsRepository.createProduct({ data: createProductInput });
  }

  findAll() {
    return this.productsRepository.getProducts({});
  }

  findOne(id: string) {
    return this.productsRepository.getProductById(id);
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return this.productsRepository.updateProduct({
      where: {
        id,
      },
      data: updateProductInput,
    });
  }

  remove(id: string) {
    return this.productsRepository.deleteProduct({ where: { id } });
  }
}
