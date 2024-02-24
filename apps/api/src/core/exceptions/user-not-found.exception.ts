import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class UserNotFoundException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.USER_NOT_FOUND, message ?? 'User not found', HttpStatus.NOT_FOUND);
  }
}
