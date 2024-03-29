import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { ProductsSeedService } from './products-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [ProductsSeedService],
  exports: [ProductsSeedService],
})
export class ProductsSeedModule {}
