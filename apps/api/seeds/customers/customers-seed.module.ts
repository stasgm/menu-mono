import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../src/core/persistence/persistence.module';
import { CustomersSeedService } from './customers-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [CustomersSeedService],
  exports: [CustomersSeedService],
})
export class CustomersSeedModule {}
