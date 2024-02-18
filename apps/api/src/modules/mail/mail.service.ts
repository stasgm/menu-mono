import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options, SentMessageInfo } from 'nodemailer/lib/smtp-transport';

import { AppConfig } from '@/core/config/app-config';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { MailJob } from '@/core/schedulers/bullmq/producer/bullmq-producer.types';

import { utils } from './helpers';
import { DEFAULT_TRANSPORT_NAME, FAKE_EMAILS, SendEmailParams, Templates } from './mail.types';

@Injectable()
export class MailService {
  private readonly logger: Logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfig: AppConfig,
    private readonly bullmqProducerService: BullmqProducerService
  ) {}

  async sendEmail({ to, type, subject, context, dryRun = false }: SendEmailParams): Promise<SentMessageInfo | boolean> {
    const _to = (Array.isArray(to) ? to : [to]).filter((emailData) => {
      // Remove all empty emails and emails inside FAKE_EMAILS array
      return emailData.address.trim().length > 0 && !FAKE_EMAILS.includes(emailData.address);
    });

    if (_to.length === 0) {
      this.logger.log('EMAILSENDING: No email addresses provided');
      return false;
    }

    const logData = `Type: ${type}. Data: ${JSON.stringify({ to: utils.maskEmails(_to), subject })}`;

    if (dryRun || this.appConfig.mail.mockMailing) {
      this.logger.log(`EMAILSENDING: Sending email disabled. ${logData}`);
      return true;
    }

    // TODO: register all transports in module
    await this.setGoogleTransport();

    try {
      this.logger.log(`EMAILSENDING: Sending email... ${logData}`);

      const extraSubject = subject ? `.${subject}` : '';

      const result: Promise<SentMessageInfo> = await this.mailerService.sendMail({
        transporterName: DEFAULT_TRANSPORT_NAME,
        to: _to,
        // from: this.getNoReplyEmail(from),
        // bcc: bcc,
        subject: `${Templates[type].subject}${extraSubject}`,
        template: Templates[type].templateName,
        context,
      });

      this.logger.log(`EMAILSENDING: Email successfully sent ${logData}`);

      return result;
    } catch (error) {
      this.logger.log(`EMAILSENDING: Failed to send email. ${logData}`);
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }
      throw new TypeError('Unknow error');
    }
  }

  public async insertEmailInQueue<T>(data: MailJob<T>) {
    await this.bullmqProducerService.insertNewJob<MailJob<T>>({
      name: 'mailQueue',
      data: {
        to: data.to,
        subject: data.subject,
        type: data.type,
        context: data.context,
        dryRun: data.dryRun,
      },
    });
  }

  //   const { job } = await this.redisScheduledJobsService.insertNewJob<SendEmailJobData>({
  //     name: SEND_EMAIL_JOB,
  //     data,
  //   });

  //   return !!job;
  // }
  // async insertNewMail<T extends IUserAdditionalData = never>(mailData: IMailData<T>) {
  //   await this.bullmqProducerService.insertNewJob<MailJob<T>>({
  //     name: 'mailQueue',
  //     data: {
  //       transporterName: 'gmail',
  //       to: mailData.to,
  //       subject: Templates[mailData.type].subject,
  //       template: Templates[mailData.type].fileName,
  //       context: mailData.data,
  //     },
  //   });
  // }

  // async userRegister(mailData: IMailData<IUserRegistrationData>) {
  //   await this.bullmqProducerService.insertNewJob<MailJob<IUserRegistrationData>>({
  //     name: 'mailQueue',
  //     data: {
  //       transporterName: 'gmail',
  //       to: mailData.to,
  //       subject: 'User registration',
  //       template: Templates.userRegistration,
  //       context: mailData.data,
  //     },
  //   });
  // }

  // async forgotPassword(mailData: IMailData<IUserPasswordResetData>) {
  //   await this.bullmqProducerService.insertNewJob<MailJob<IUserPasswordResetData>>({
  //     name: 'mailQueue',
  //     data: {
  //       transporterName: 'gmail',
  //       to: mailData.to,
  //       subject: 'Reset password',
  //       template: Templates.resetPassword,
  //       context: mailData.data,
  //     },
  //   });
  // }

  private async setGoogleTransport() {
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

  // TODO: Add using
  // private getNoReplyEmail(email: string) {
  //   // Add a prefix to recognise test emails
  //   return this.appConfig.isProduction ? email : `${this.appConfig.envPrefix}-${email}`;
  // }
}
