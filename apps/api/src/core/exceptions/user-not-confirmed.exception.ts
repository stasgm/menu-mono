import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class UserNotConfirmedException extends BaseException {
  constructor() {
    super('USER_NOT_CONFIRMED', 'User not confirmed', HttpStatus.BAD_REQUEST);
  }
}
