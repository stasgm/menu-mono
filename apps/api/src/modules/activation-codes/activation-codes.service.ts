import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { AppConfig } from '@/core/config/app-config';
import { InvalidActivationCodeException } from '@/core/exceptions';
import { BullmqProducerService } from '@/core/schedulers/bullmq/producer/bullmq-producer.service';
import { MailJob } from '@/core/schedulers/bullmq/producer/bullmq-producer.types';
import { BaseService } from '@/modules/common/base.service';
import { IUserRegistrationData } from '@/modules/mail/mail.types';

import { ActivationCodesRepository } from './activation-codes.repository';
import { ActivationCode, ActivationCodeWithKeys } from './models/activation-code.model';

@Injectable()
export class ActivationCodesService extends BaseService(ActivationCode, ActivationCodeWithKeys) {
  constructor(
    protected readonly appConfig: AppConfig,
    protected readonly activationCodesRepository: ActivationCodesRepository,
    protected readonly bullmqProducerService: BullmqProducerService
  ) {
    super(activationCodesRepository);
  }

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
    // 1. Create or refresh the activation code
    const { code, user } = await (() => {
      return create
        ? this.activationCodesRepository.createActivationCode({ data: { userId } })
        : this.activationCodesRepository.refreshCodeByUserId(userId);
    })();

    // 2. Send the email with the activation code
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

    // 3. Update sentAt in activation code
    await this.activationCodesRepository.updateSentAtByUserId(user.id);
  }

  async verifyByUserId(userId: string, code: string): Promise<boolean> {
    const result = await this.activationCodesRepository.getActivationCode({
      where: {
        userId,
      },
    });

    // 1. Activation not code found
    if (!result) {
      // This can only happen if the activation code is manually removed
      throw new InternalServerErrorException('Activation code not found');
    }

    // 2. Activation code found
    if (result.code !== code) {
      // if code is not correct then check the number of attempts
      if (result.attempts >= this.appConfig.account.codeAcivationMaxNumberOfAttempts) {
        // generate the new code when attempts exceed MAX_NUMBER_OF_ATTEMPTS
        return false;
      }

      // Increase the number of attempts for this code and throw an error
      await this.activationCodesRepository.increaseAttempt(result.id);

      throw new InvalidActivationCodeException();
    }

    // The code is correct
    // TODO: Maybe just mark it as used
    // Delete the activation code after verification
    await this.activationCodesRepository.remove(result.id);

    return true;
  }
}
