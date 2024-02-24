import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class InvalidActivationCodeException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.INVALID_ACTIVATION_CODE, message ?? 'Invalid activation code', HttpStatus.BAD_REQUEST);
  }
}
