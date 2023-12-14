import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IRequest } from '../types';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<IRequest>().req;
  }
}
