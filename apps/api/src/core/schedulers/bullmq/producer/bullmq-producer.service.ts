import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

import { JobTypes, MAIL_QUEUE, MailJob } from './bullmq-producer.types';

const getDelayByDate = (runAt: Date): number => {
  const targetTime = new Date(runAt);
  const delayTime = Number(targetTime) - Date.now();
  return delayTime > 0 ? delayTime : 0;
};

@Injectable()
export class BullmqProducerService {
  readonly queueMapper: { [jobType in JobTypes]: Queue } = {
    [MAIL_QUEUE]: this.mailJobQueue,
  } as const;

  readonly logger = new Logger(BullmqProducerService.name);

  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly mailJobQueue: Queue<MailJob> // private readonly logger: LoggerService
  ) {}

  async insertNewJob<T = never>({
    name,
    createdBy = 'system',
    data,
    runAt = new Date(),
    delay,
    maxRetries = 3,
    priority,
  }: {
    name: JobTypes;
    createdBy?: string;
    data: T;
    runAt?: Date;
    delay?: number;
    maxRetries?: number;
    priority?: number;
  }) {
    const queue = this.queueMapper[name];

    const job = await queue.add(
      name,
      {
        ...data,
        createdBy,
      },
      {
        attempts: maxRetries,
        priority,
        delay: runAt ? getDelayByDate(runAt) : delay ?? 0,
      }
    );

    // eslint-disable-next-line unicorn/prefer-module
    this.logger.log(__dirname, `Job '${job.name}' added to ${job.queueName}`, {
      data: job.data,
      options: job.opts,
    });

    return { queue, job };
  }
}
