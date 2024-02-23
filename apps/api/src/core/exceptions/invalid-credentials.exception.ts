import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class InvalidCredentialsException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.INVALID_CREDENTIALS, message ?? 'Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
