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
      secretOrKey: appConfig.jwt.accessSecret,
    });
  }

  validate(payload: JwtPayload): IReqUserData {
    return { user: { id: payload.sub, role: payload.role } };
  }
}
