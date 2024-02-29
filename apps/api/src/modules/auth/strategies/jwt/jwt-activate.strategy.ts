import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '@/core/config/app-config';

import { IReqUserData, JwtPayload, JwtStrategies } from '../../types';

@Injectable()
export class JwtActivateStrategy extends PassportStrategy(Strategy, JwtStrategies.jwtActivate) {
  constructor(readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.activate.secret,
    });
  }

  validate(payload: JwtPayload): IReqUserData {
    // TODO check if user is exists and not disabled
    return { user: { id: payload.sub, role: payload.role } };
  }
}
