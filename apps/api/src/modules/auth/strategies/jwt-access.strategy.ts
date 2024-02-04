import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '../../../core/config/app-config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(readonly appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.accessSecret,
    });
  }

  validate(payload: { sub: string }) {
    // const user = await this.authService.validateUser(payload);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    return { id: payload.sub };
  }
}
