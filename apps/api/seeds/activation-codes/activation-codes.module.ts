import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { ActivationCodesSeedService } from './activation-codes.service';

@Module({
  imports: [PersistenceModule],
  providers: [ActivationCodesSeedService],
  exports: [ActivationCodesSeedService],
})
export class ActivationCodesSeedModule {}
