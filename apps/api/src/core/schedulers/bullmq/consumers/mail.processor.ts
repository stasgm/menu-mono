import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

import { MailService } from '@/modules/mail/mail.service';

import { MAIL_QUEUE, MailJob } from '../producer/bullmq-producer.types';

@Processor(MAIL_QUEUE)
export class MailJobProcessor extends WorkerHost {
  private readonly logger: Logger = new Logger(MailJobProcessor.name);

  constructor(readonly mailService: MailService) {
    super();
  }

  async process(job: Job<MailJob, any, string>): Promise<void> {
    this.logger.log(`Processing event on ${MAIL_QUEUE}, Job with id: ${job.id} and args: ${JSON.stringify(job.data)}`);

    await this.mailService.sendEmail({
      type: job.data.type,
      dryRun: job.data.dryRun,
      context: job.data.context,
      subject: job.data.subject,
      to: job.data.to,
    });
  }

  @OnWorkerEvent('completed')
  onCompleted({ id, data }: { id: string; data: object }) {
    this.logger.log(`Completed event on ${MAIL_QUEUE}, Job with id: ${id} and args: ${JSON.stringify(data)}`);
  }

  @OnWorkerEvent('failed')
  onFailed({ id, data }: { id: string; data: number | object }) {
    this.logger.error(`Failed event on ${MAIL_QUEUE}, Job with id: ${id} and args: ${JSON.stringify(data)}`);
  }
}
