import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '@/core/config/app-config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.refreshSecret,
    });
  }

  validate(payload: { sub: string }) {
    return { id: payload.sub };
  }
}
