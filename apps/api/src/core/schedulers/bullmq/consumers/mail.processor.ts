import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

import { AppConfig } from '@/core/config/app-config';

import { MAIL_QUEUE, MailJob } from '../producer/bullmq-producer.types';

@Processor(MAIL_QUEUE)
export class MailJobProcessor extends WorkerHost {
  private readonly logger: Logger = new Logger(MailJobProcessor.name);

  constructor(private readonly mailerService: MailerService, private readonly appConfig: AppConfig) {
    super();
  }

  async process(job: Job<MailJob, any, string>): Promise<void> {
    this.logger.log(`Sending email on ${MAIL_QUEUE}, Job with id: ${job.id} and args: ${JSON.stringify(job.data)}`);

    if (this.appConfig.mail.mockMailing) {
      return;
    }

    await this.setTransport();

    try {
      await this.mailerService.sendMail(job.data);
    } catch (error) {
      this.logger.error(`Failed event on ${MAIL_QUEUE}, Job with id: ${job.id}. ${JSON.stringify(error)}`);
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }
      throw new TypeError('Unknow error');
    }
  }

  @OnWorkerEvent('completed')
  onCompleted({ id, data }: { id: string; data: object }) {
    // set 'emailsend' flag for the corresponding entry in the reports table

    this.logger.log(`Completed event on ${MAIL_QUEUE}, Job with id: ${id} and args: ${JSON.stringify(data)}`);
  }

  @OnWorkerEvent('failed')
  onFailed({ id, data }: { id: string; data: number | object }) {
    this.logger.error(`Failed event on ${MAIL_QUEUE}, Job with id: ${id} and args: ${JSON.stringify(data)}`);
  }

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2({
      clientId: this.appConfig.mail.googleApi.clientId,
      clientSecret: this.appConfig.mail.googleApi.clientSecret,
      redirectUri: 'https://developers.google.com/oauthplayground',
    });

    oauth2Client.setCredentials({
      refresh_token: this.appConfig.mail.googleApi.refreshToken,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(new Error('Failed to create access token'));
        }
        resolve(token as string);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.appConfig.mail.googleApi.apiEmail,
        clientId: this.appConfig.mail.googleApi.clientId,
        clientSecret: this.appConfig.mail.googleApi.clientSecret,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }
}
