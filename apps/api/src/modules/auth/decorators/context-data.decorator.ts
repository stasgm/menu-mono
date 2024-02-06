import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type IContextData = {
  originIp?: string;
  userAgent?: string;
};

export const ContextData = createParamDecorator((_data: unknown, context: ExecutionContext): IContextData => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext<any>().req;

  return {
    originIp: req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
  };
});
