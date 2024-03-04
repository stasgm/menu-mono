import path from 'node:path';

import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private readonly appConfig: AppConfig) {}

  createMailerOptions(): MailerOptions {
    const { transport, googleApi } = this.appConfig.mail;

    return {
      transport,
      // {
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // },
      defaults: {
        from: `"No reply" <${googleApi.apiEmail}>`,
      },
      template: {
        dir: path.join(process.cwd(), 'src', 'modules', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
