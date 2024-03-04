import path from 'node:path';

import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { google } from 'googleapis';

import { AppConfig } from '@/core/config/app-config';

import { DEFAULT_TRANSPORT_NAME } from './mail.types';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private readonly appConfig: AppConfig) {}

  async createMailerOptions(): Promise<MailerOptions> {
    const googleApi = this.appConfig.mail.googleApi;

    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2({
      clientId: googleApi.clientId,
      clientSecret: googleApi.clientSecret,
      redirectUri: 'https://developers.google.com/oauthplayground',
    });

    oauth2Client.setCredentials({
      refresh_token: googleApi.refreshToken,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(new Error('Failed to create access token'));
        }
        resolve(token as string);
      });
    });

    const transport: TransportType = {
      name: DEFAULT_TRANSPORT_NAME,
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: googleApi.apiEmail,
        clientId: googleApi.clientId,
        clientSecret: googleApi.clientSecret,
        accessToken,
      },
    };

    return {
      transport,
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
