import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { UsersSeedService } from './users-seed.service';

@Module({
  imports: [PersistenceModule],
  providers: [UsersSeedService],
  exports: [UsersSeedService],
})
export class UsersSeedModule {}
