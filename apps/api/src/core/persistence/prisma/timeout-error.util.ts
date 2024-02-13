import { HttpException, HttpStatus } from '@nestjs/common';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

// TODO: check use case
export function handleTimeoutAndErrors<T = unknown>() {
  return (source$: Observable<T>) =>
    source$.pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new HttpException(err.message, HttpStatus.REQUEST_TIMEOUT);
        }

        if (err instanceof Error) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('Unknown error', HttpStatus.BAD_REQUEST);
      })
    );
}
