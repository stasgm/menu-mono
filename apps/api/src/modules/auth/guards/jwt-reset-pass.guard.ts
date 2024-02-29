import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IJwtRequest, JwtStrategies } from '../types';

@Injectable()
export class JwtResetPassAuthGuard extends AuthGuard(JwtStrategies.jwtResetPass) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<IJwtRequest>().req;
  }
}
