import { Module } from '@nestjs/common';

import { MailService } from '@/modules/mail/mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailTestModule {}
