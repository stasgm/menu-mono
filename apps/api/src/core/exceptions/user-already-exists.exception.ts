import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '../constants/errors';
import { BaseException } from './base.exception';

export class UserAlreadyExistsException extends BaseException {
  constructor(message?: string) {
    super(AppErrors.USER_ALREADY_EXISTS, message ?? 'The user with this name already exists', HttpStatus.CONFLICT);
  }
}
