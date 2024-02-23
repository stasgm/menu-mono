import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';

import { AppConfigModule } from '@/core/config/app-config.module';
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
    MailModule,
    AppConfigModule,
    BullModule.forRootAsync('generalConfig', {
      useClass: BullmqConfigService,
      imports: [AppConfigModule],
      inject: [AppConfigModule],
    }),
    BullModule.registerQueue(...REGISTERED_QUEUES),
  ],
  providers: [...processors, BullmqProducerService],
  exports: [BullmqProducerService],
})
export class SchedulersModule {}
