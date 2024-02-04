import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { CategoriesSeedService } from './categories-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [CategoriesSeedService],
  exports: [CategoriesSeedService],
})
export class CategoriesSeedModule {}
