import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IJwtRequest, JwtStrategies } from '../types';

@Injectable()
export class JwtActivateAuthGuard extends AuthGuard(JwtStrategies.jwtActivate) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<IJwtRequest>().req;
  }
}
