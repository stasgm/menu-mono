import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { AppConfigModule } from '@/core/config/app-config.module';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';

@Injectable()
export class BullmqTestProducerService {
  insertNewJob() {
    //
    return true;
  }
}

@Module({
  imports: [AppConfigModule],
  providers: [BullmqProducerService],
  exports: [BullmqProducerService],
})
export class SchedulersTestModule {}
