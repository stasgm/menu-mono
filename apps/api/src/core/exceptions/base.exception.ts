import { HttpStatus } from '@nestjs/common';

// base exception that can be used for both GQL and REST errors
export class BaseException extends Error {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly status: number = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message);
  }
}
