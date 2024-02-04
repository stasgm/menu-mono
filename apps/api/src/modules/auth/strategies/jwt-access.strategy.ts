import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '@/core/config/app-config';
import { UsersService } from '@/modules/users/users.service';

import { IReqUserData, JwtPayload } from '../types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(readonly appConfig: AppConfig, readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.accessSecret,
    });
  }

  validate(payload: JwtPayload): IReqUserData {
    return { user: { id: payload.sub, role: payload.role } };
    // const user = await this.usersService.findOne(payload.sub)

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // return user;
  }
}
