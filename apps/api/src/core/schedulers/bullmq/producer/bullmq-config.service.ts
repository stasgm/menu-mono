import { SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { QueueOptions } from 'bullmq';
import IORedis from 'ioredis';

import { AppConfig } from '@/core/config/app-config';

import { getBullmqPrefix } from './bullmq-producer.types';

@Injectable()
export class BullmqConfigService implements SharedBullConfigurationFactory {
  private readonly redisConnection;
  constructor(private readonly appConfig: AppConfig) {
    this.redisConnection = new IORedis(this.appConfig.redisUrl, {
      maxRetriesPerRequest: null,
    });
  }

  createSharedConfiguration(): QueueOptions {
    return {
      prefix: getBullmqPrefix(this.appConfig.envPrefix),
      connection: this.redisConnection,
      // connection: {
      //   redisUrl: this.appConfig.redisUrl,
      //   host: this.appConfig.redis.host,
      //   port: this.appConfig.redis.port,
      // },
      defaultJobOptions: this.appConfig.bullmq.defaultJobOptions,
    };
  }
}
