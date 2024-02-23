import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class UserDisabledException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.USER_DISABLED, message ?? 'User is disabled', HttpStatus.FORBIDDEN);
  }
}
