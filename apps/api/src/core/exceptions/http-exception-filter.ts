import { ArgumentsHost, Catch, ContextType, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { BaseException } from '@/core/exceptions/base.exception';

@Catch(BaseException)
export class GlobalExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  // catch both GQL and REST errors
  catch(exception: BaseException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    return gqlHost.getType<'graphql' | ContextType>() === 'graphql'
      ? new GraphQLError(exception.message, {
          extensions: { code: exception.code },
        })
      : new HttpException(
          {
            status: 400,
            // error: exception.getErrorCode(),
            message: exception.message,
          },
          400
        );
  }
}
