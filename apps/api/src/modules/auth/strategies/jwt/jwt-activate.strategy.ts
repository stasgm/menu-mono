import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfig } from '@/core/config/app-config';
import { UserNotFoundException } from '@/core/exceptions';
import { UsersService } from '@/modules/users/users.service';

import { IReqUserData, JwtPayload, JwtStrategies } from '../../types';

@Injectable()
export class JwtActivateStrategy extends PassportStrategy(Strategy, JwtStrategies.jwtActivate) {
  constructor(
    readonly appConfig: AppConfig,
    readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.activate.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<IReqUserData> {
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new UserNotFoundException();
    }

    return { user: { id: payload.sub, role: payload.role } };
  }
}
