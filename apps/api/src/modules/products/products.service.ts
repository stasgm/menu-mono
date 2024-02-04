import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { Product, ProductWithKeys } from './models/product.model';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService extends BaseService(Product, ProductWithKeys) {
  constructor(readonly productsRepository: ProductsRepository) {
    super(productsRepository);
  }
}
