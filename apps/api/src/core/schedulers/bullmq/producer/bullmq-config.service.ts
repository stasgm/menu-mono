import { SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { QueueOptions } from 'bullmq';

import { AppConfig } from '@/core/config/app-config';

import { getBullmqPrefix } from './bullmq-producer.types';

@Injectable()
export class BullmqConfigService implements SharedBullConfigurationFactory {
  // TODO: inject AppConfig
  private readonly appConfig = new AppConfig();

  // constructor(@Inject(AppConfig) private readonly appConfig: AppConfig) {}

  createSharedConfiguration(): QueueOptions {
    return {
      prefix: getBullmqPrefix(this.appConfig.envPrefix),
      connection: {
        host: this.appConfig.redis.host,
        port: this.appConfig.redis.port,
      },
      defaultJobOptions: this.appConfig.bullmq.defaultJobOptions,
    };
  }
}
