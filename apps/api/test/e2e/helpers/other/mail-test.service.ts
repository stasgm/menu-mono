import { Injectable } from '@nestjs/common';

// import { SendEmailParams } from '@/modules/mail/mail.types';

@Injectable()
export class MailTestService {
  sendEmail() {
    return true;
  }

  insertEmailInQueue() {
    return true;
  }
}
