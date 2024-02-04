import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '@/modules/common/base.resolver';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductWithKeys } from './models/product.model';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver extends BaseResolver(Product, ProductWithKeys, CreateProductInput, UpdateProductInput) {
  constructor(readonly productsService: ProductsService) {
    super(productsService);
  }
}
