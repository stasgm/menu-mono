import { Injectable } from '@nestjs/common';

import { BaseService } from '@/modules/common/base.service';

// import { CreateInput } from '../common/base.types';
import { ActivationCodesRepository } from './activation-codes.repository';
import { ActivationCode, ActivationCodeWithKeys } from './models/activation-code.model';

@Injectable()
export class ActivationCodesService extends BaseService(ActivationCode, ActivationCodeWithKeys) {
  constructor(protected readonly activationCodesRepository: ActivationCodesRepository) {
    super(activationCodesRepository);
  }

  // override create(data: CreateInput<ActivationCodeWithKeys>): Promise<ActivationCode | null> {
  //   return this.activationCodesRepository.create(data);
  // }

  refreshCode(id: string): Promise<ActivationCode | null> {
    return this.activationCodesRepository.refreshCode(id);
  }
}
