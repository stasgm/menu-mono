import { Injectable } from '@nestjs/common';

import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { MailJob } from '@/core/schedulers/bullmq/producer/bullmq-producer.types';

export interface IMailData<T = never> {
  to: string;
  data: T;
}

export interface IUserAdditionalData {
  userName: string;
  location: string;
  originIp: string;
  device: string;
}

export interface IUserRegistrationData extends IUserAdditionalData {
  code: string;
}

export interface IUserPasswordResetData extends IUserAdditionalData {
  code: string;
}

@Injectable()
export class MailService {
  constructor(private readonly bullmqProducerService: BullmqProducerService) {}

  async userRegister(mailData: IMailData<IUserRegistrationData>) {
    await this.bullmqProducerService.insertNewJob<MailJob<IUserRegistrationData>>({
      name: 'mailQueue',
      data: {
        transporterName: 'gmail',
        to: mailData.to,
        subject: 'User registration',
        template: 'user-registration',
        context: mailData.data,
      },
    });
  }

  async forgotPassword(mailData: IMailData<IUserPasswordResetData>) {
    await this.bullmqProducerService.insertNewJob<MailJob<IUserPasswordResetData>>({
      name: 'mailQueue',
      data: {
        transporterName: 'gmail',
        to: mailData.to,
        subject: 'Reset password',
        template: 'reset-password',
        context: mailData.data,
      },
    });
  }
}
