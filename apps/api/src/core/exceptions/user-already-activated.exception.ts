import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class UserAlreadyActivatedException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.USER_ALREADY_ACTIVATED, message ?? 'User already activated', HttpStatus.BAD_REQUEST);
  }
}
