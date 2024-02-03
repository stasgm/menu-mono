import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../core/persistence/persistence.module';
import { CategoriesRepository } from './categories.repository';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [PersistenceModule],
  providers: [CategoriesResolver, CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
