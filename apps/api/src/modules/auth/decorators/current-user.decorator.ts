import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '@/modules/users/models/user.model';

import { IRequest } from '../types';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext<IRequest>().req.user;
});
