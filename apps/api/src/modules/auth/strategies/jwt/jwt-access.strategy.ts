import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '@/core/config/app-config';

import { IReqUserData, JwtPayload, JwtStrategies } from '../../types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JwtStrategies.jwtAccess) {
  constructor(readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.access.secret,
    });
  }

  validate(payload: JwtPayload): IReqUserData {
    // TODO check if user is exists and not disabled
    return { user: { id: payload.sub, role: payload.role } };
  }
}
