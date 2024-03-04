import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

import { AppConfig } from '@/core/config/app-config';

import { utils } from './helpers';
import { DEFAULT_TRANSPORT_NAME, SendEmailParams, Templates } from './mail.types';

@Injectable()
export class MailService {
  private readonly logger: Logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfig: AppConfig
  ) {}

  async sendEmail({ to, type, subject, context, dryRun = false }: SendEmailParams): Promise<SentMessageInfo | boolean> {
    // Remove all empty emails and emails inside FAKE_EMAILS array
    const _to = utils.removeEmpty(to);

    if (_to.length === 0) {
      this.logger.log('EMAILSENDING: No email addresses provided');
      return false;
    }

    // const logData = `Type: ${type}. Data: ${JSON.stringify({ to: utils.maskEmails(_to), subject })}`;

    if (dryRun || this.appConfig.mail.mockMailing) {
      this.logger.log('EMAILSENDING: Sending email disabled.');
      return true;
    }

    try {
      this.logger.log('EMAILSENDING: Sending email...');

      const extraSubject = subject ? `.${subject}` : '';

      const result: Promise<SentMessageInfo> = await this.mailerService.sendMail({
        // transporterName: DEFAULT_TRANSPORT_NAME,
        to: _to,
        // from: this.getNoReplyEmail(from),
        // bcc: bcc,
        subject: `${Templates[type].subject}${extraSubject}`,
        template: Templates[type].templateName,
        context,
      });

      this.logger.log('EMAILSENDING: Email successfully sent.');

      return result;
    } catch (error) {
      this.logger.log('EMAILSENDING: Failed to send email.');
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }
      throw new TypeError('Unknown error');
    }
  }

  // TODO: Add using
  // private getNoReplyEmail(email: string) {
  //   // Add a prefix to recognise test emails
  //   return this.appConfig.isProduction ? email : `${this.appConfig.envPrefix}-${email}`;
  // }
}
