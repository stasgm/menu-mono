import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from '../../core/config/app-config';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { GqlAuthGuard } from './guards/gql-auth.guard';
import { PasswordService } from './password.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

const { jwt } = new AppConfig();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwt.accessSecret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
    PassportModule,
    HttpModule,
  ],
  providers: [AuthResolver, AuthService, UsersService, JwtAccessStrategy, PasswordService],
  exports: [],
})
export class AuthModule {}
