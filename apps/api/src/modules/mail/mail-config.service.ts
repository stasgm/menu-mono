import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  private readonly appConfig = new AppConfig();
  // constructor() {}

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        transport: this.appConfig.mail.transport,
        requireTLS: true,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: `"No reply" <${this.appConfig.mail.googleApi.apiEmail}>`,
      },
      template: {
        // eslint-disable-next-line unicorn/prefer-module
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
