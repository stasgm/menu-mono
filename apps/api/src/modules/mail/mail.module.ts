import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppConfigModule } from '@/core/config/app-config.module';

import { MailService } from './mail.service';
import { MailConfigService } from './mail-config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigModule],
      useClass: MailConfigService,
    }),
    AppConfigModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
