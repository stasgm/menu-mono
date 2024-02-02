import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../core/persistence/persistence.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsRepository } from './products.repository';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService, ProductsRepository],
  imports: [PersistenceModule, CategoriesModule],
})
export class ProductsModule {}
