import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IContextData } from '../types';

export const ContextData = createParamDecorator((_data: unknown, context: ExecutionContext): IContextData => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext<any>().req;

  return {
    originIp: req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
  };
});
