import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../../persistence.module';
import { CategoriesSeedService } from './categories-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [CategoriesSeedService],
  exports: [CategoriesSeedService],
})
export class CategoriesSeedModule {}
