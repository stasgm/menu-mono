import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/core/config/app-config.module';
import { PersistenceModule } from '@/core/persistence/persistence.module';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';

import { ActivationCodesRepository } from './activation-codes.repository';
import { ActivationCodesResolver } from './activation-codes.resolver';
import { ActivationCodesService } from './activation-codes.service';

@Module({
  imports: [PersistenceModule, SchedulersModule, AppConfigModule],
  providers: [ActivationCodesResolver, ActivationCodesService, ActivationCodesRepository],
  exports: [ActivationCodesService],
})
export class ActivationCodesModule {}
