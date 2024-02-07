import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/core/persistence/persistence.module';

import { ActivationCodesRepository } from './activation-codes.repository';
import { ActivationCodesResolver } from './activation-codes.resolver';
import { ActivationCodesService } from './activation-codes.service';

@Module({
  imports: [PersistenceModule],
  providers: [ActivationCodesResolver, ActivationCodesService, ActivationCodesRepository],
  exports: [ActivationCodesService],
})
export class ActivationCodesModule {}
