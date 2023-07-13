import { Module } from '@nestjs/common';

import { PersistenceModule } from '../_core/persistence/persistence.module';
import { ProductsRepository } from './products.repository';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService, ProductsRepository],
  imports: [PersistenceModule],
})
export class ProductsModule {}
