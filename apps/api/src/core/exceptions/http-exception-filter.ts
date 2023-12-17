// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';
// import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
// import { Request, Response } from 'express';
// import { GraphQLResolveInfo } from 'graphql';

// @Catch()
// export class HttpErrorFilter implements ExceptionFilter, GqlExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     const gqlHost = GqlArgumentsHost.create(host);
//     const info = gqlHost.getInfo<GraphQLResolveInfo>();

//     const status = exception.getStatus
//       ? exception.getStatus()
//       : HttpStatus.INTERNAL_SERVER_ERROR;

//     if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
//       // tslint:disable-next-line: no-console
//       console.error(exception);
//     }

//     const errorResponse = {
//       statusCode: status,
//       timestamp: new Date().toLocaleDateString(),
//       error:
//         status === HttpStatus.INTERNAL_SERVER_ERROR
//           ? 'Internal server error'
//           : exception.message.error || exception.message || null,
//     };

//     // This is for REST petitions
//     if (request) {
//       const error = {
//         ...errorResponse,
//         path: request.url,
//         method: request.method,
//       };

//       Logger.error(
//         `${request.method} ${request.url}`,
//         JSON.stringify(error),
//         'ExceptionFilter',
//       );

//       response.status(status).json(errorResponse);
//     } else {
//       // This is for GRAPHQL petitions
//       const error = {
//         ...errorResponse,
//         type: info.parentType,
//         field: info.fieldName,
//       };

//       Logger.error(
//         `${info.parentType} ${info.fieldName}`,
//         JSON.stringify(error),
//         'ExceptionFilter',
//       );

//       return exception;
//     }
//   }
// }

export const exceptionFilter = {};
