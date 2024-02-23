import { Injectable } from '@nestjs/common';

import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { MailJob } from '@/core/schedulers/bullmq/producer/bullmq-producer.types';
import { BaseService } from '@/modules/common/base.service';
import { IUserRegistrationData } from '@/modules/mail/mail.types';

import { ActivationCodesRepository } from './activation-codes.repository';
import { ActivationCode, ActivationCodeWithKeys } from './models/activation-code.model';

const MAX_NUMBER_OF_ATTEMPTS = 3;

@Injectable()
export class ActivationCodesService extends BaseService(ActivationCode, ActivationCodeWithKeys) {
  constructor(
    protected readonly activationCodesRepository: ActivationCodesRepository,
    protected readonly bullmqProducerService: BullmqProducerService
  ) {
    super(activationCodesRepository);
  }

  // override create(data: CreateInput<ActivationCodeWithKeys>): Promise<ActivationCode | null> {
  //   return this.activationCodesRepository.create(data);
  // }

  async createOrRefreshCodeAndSendEmail(params: {
    userId: string;
    info: {
      location: string;
      originIp: string;
      device: string;
    };
    create?: boolean;
  }): Promise<void> {
    const { userId, info, create = false } = params;

    const { code, user } = await (() => {
      return create
        ? this.activationCodesRepository.createActivationCode({ data: { userId } })
        : this.activationCodesRepository.refreshCodeByUserId(userId);
    })();

    await this.bullmqProducerService.insertNewJob<MailJob<IUserRegistrationData>>({
      name: 'mailJob',
      data: {
        to: {
          name: user.name,
          address: user.customer.email,
        },
        type: 'userRegistration',
        context: {
          userName: user.name,
          code,
          location: info.location,
          originIp: info.originIp,
          device: info.device,
        },
      },
    });
  }

  // async createAndSendEmail(params: {
  //   user: {
  //     id: string;
  //     name: string;
  //     email: string;
  //   };
  //   info: {
  //     location: string;
  //     originIp: string;
  //     device: string;
  //   };
  // }): Promise<void> {
  //   const { user, info } = params;
  //   const activationCode = await this.activationCodesRepository.createActivationCode({ data: { userId: user.id } });

  //   await this.bullmqProducerService.insertNewJob<MailJob<IUserRegistrationData>>({
  //     name: 'mailJob',
  //     data: {
  //       to: {
  //         name: user.name,
  //         address: user.email,
  //       },
  //       type: 'userRegistration',
  //       context: {
  //         userName: user.name,
  //         code: activationCode.code,
  //         location: info.location,
  //         originIp: info.originIp,
  //         device: info.device,
  //       },
  //     },
  //   });
  // }

  async verifyByUserId(userId: string, code: string): Promise<boolean> {
    const result = await this.activationCodesRepository.getActivationCode({
      where: {
        userId,
      },
    });

    // 1. Activation not code found
    if (!result) {
      return false;
    }

    // 2. Activation code found
    // if attempts is greater than MAX_NUMBER_OF_ATTEMPTS then remove the activation code
    if (result.attempts >= MAX_NUMBER_OF_ATTEMPTS) {
      // Delete the activation code when attempts exceeds MAX_NUMBER_OF_ATTEMPTS
      // TODO: Maybe just mark it as used
      await this.activationCodesRepository.remove(result.id);

      return false;
    }
    // if code is not correct then increment attempts
    if (result.code !== code) {
      await this.activationCodesRepository.increaseAttempt(result.id);

      return false;
    }
    // Delete the activation code after verification
    // TODO: Maybe just mark it as used
    await this.activationCodesRepository.remove(result.id);

    return true;
  }
}
