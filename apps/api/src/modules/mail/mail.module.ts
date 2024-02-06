import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppConfig } from '@/core/config/app-config';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';

import { MailService } from './mail.service';
import { MailConfigService } from './mail-config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    SchedulersModule,
  ],
  providers: [MailService, AppConfig],
  exports: [MailService],
})
export class MailModule {}
