import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class InvalidActivationCodeAttemptsExceededException extends BaseException {
  constructor(message?: string) {
    super(
      AppErrors.INVALID_ACTIVATION_CODE_ATTEMPTS_EXCEEDED,
      message ?? 'Invalid activation code. Attempts limit exceeded',
      HttpStatus.BAD_REQUEST
    );
  }
}
