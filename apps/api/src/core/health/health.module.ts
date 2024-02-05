import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { PersistenceModule } from '../persistence/persistence.module';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, PersistenceModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
