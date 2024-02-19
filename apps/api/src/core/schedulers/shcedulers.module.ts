import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Global, Module } from '@nestjs/common';

import { AppConfig } from '@/core/config/app-config';
import { MailModule } from '@/modules/mail/mail.module';

import { MailJobProcessor } from './bullmq/consumers/mail.processor';
import { BullmqConfigService } from './bullmq/producer/bullmq-config.service';
import { BullmqProducerService } from './bullmq/producer/bullmq-producer.service';
import { MAIL_QUEUE } from './bullmq/producer/bullmq-producer.types';

const REGISTERED_QUEUES = [{ name: MAIL_QUEUE, configKey: 'generalConfig', connection: {} }];
const processors = [MailJobProcessor];

@Global()
@Module({
  imports: [
    forwardRef(() => MailModule),
    BullModule.forRootAsync('generalConfig', {
      useClass: BullmqConfigService,
    }),
    BullModule.registerQueue(...REGISTERED_QUEUES),
  ],
  providers: [...processors, BullmqProducerService, AppConfig],
  exports: [BullmqProducerService],
})
export class SchedulersModule {}
