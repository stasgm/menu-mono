import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

import { Product } from './models/product.model';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService extends BaseService(Product) {
  constructor(readonly productsRepository: ProductsRepository) {
    super(productsRepository);
  }
}
