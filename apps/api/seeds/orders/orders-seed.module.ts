import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../src/core/persistence/persistence.module';
import { OrdersSeedService } from './orders-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [OrdersSeedService],
  exports: [OrdersSeedService],
})
export class OrdersSeedModule {}
