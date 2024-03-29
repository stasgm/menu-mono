import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export declare type GqlContextType = 'graphql';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

export type ExtendedErrorCodesStatusMapping = {
  [key: string]:
    | number
    | {
        statusCode?: number;
        errorMessage?: string;
      };
};

/**
 * {@link PrismaExceptionFilter} catches {@link Prisma.PrismaClientKnownRequestError} exceptions.
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  /**
   * default error codes mapping
   *
   * Error codes definition for Prisma Client (Query Engine)
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
   */
  private readonly defaultMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  private readonly userDefinedMapping?: ExtendedErrorCodesStatusMapping;

  private readonly logger = new Logger(PrismaExceptionFilter.name);

  /**
   * @param applicationRef
   * @param errorCodesStatusMapping
   */
  constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping) {
    super(applicationRef);

    this.userDefinedMapping = errorCodesStatusMapping;
  }

  /**
   * @param exception
   * @param host
   * @returns
   */
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    return this.catchClientKnownRequestError(exception, host);
  }

  private catchClientKnownRequestError(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = this.userDefinedStatusCode(exception) ?? this.defaultStatusCode(exception);

    const message = this.userDefinedExceptionMessage(exception) ?? this.defaultExceptionMessage(exception);

    this.logger.error({
      code: statusCode,
      message,
      exception,
    });

    if (host.getType() === 'http') {
      if (statusCode === undefined) {
        return super.catch(exception, host);
      }

      return super.catch(new HttpException({ statusCode, message }, statusCode), host);
    } else if (host.getType<GqlContextType>() === 'graphql') {
      // for graphql requests
      if (statusCode === undefined) {
        return exception;
      }

      return new HttpException({ statusCode, message }, statusCode);
    }
  }

  private userDefinedStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];
    return typeof userDefinedValue === 'number' ? userDefinedValue : userDefinedValue?.statusCode;
  }

  private defaultStatusCode(exception: Prisma.PrismaClientKnownRequestError): number | undefined {
    return this.defaultMapping[exception.code];
  }

  private userDefinedExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string | undefined {
    const userDefinedValue = this.userDefinedMapping?.[exception.code];
    return typeof userDefinedValue === 'number' ? undefined : userDefinedValue?.errorMessage;
  }

  private defaultExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string {
    const shortMessage = exception.message.slice(Math.max(0, exception.message.indexOf('→')));
    return (
      `[${exception.code}]: ` +
      shortMessage
        .slice(Math.max(0, shortMessage.indexOf('\n')))
        .replaceAll('\n', '')
        .trim()
    );
  }
}
