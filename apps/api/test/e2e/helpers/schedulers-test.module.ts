import { Module } from '@nestjs/common';

import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';

@Module({
  providers: [BullmqProducerService],
  exports: [BullmqProducerService],
})
export class SchedulersTestModule {}
