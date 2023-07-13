import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput, UpdateProductInput } from '../../types/graphql.schema';
import { ProductsService } from './products.service';

@Resolver('Product')
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation('createProduct')
  create(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query('products')
  findAll() {
    console.log('dd');
    return this.productsService.findAll();
  }

  @Query('product')
  findOne(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation('updateProduct')
  update(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation('removeProduct')
  remove(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
