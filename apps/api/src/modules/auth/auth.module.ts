import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from '@/core/config/app-config';
import { CustomersModule } from '@/modules/customers/customers.module';
import { UsersModule } from '@/modules/users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    PassportModule,
    UsersModule,
    CustomersModule,
  ],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy, PasswordService, AppConfig],
  exports: [PasswordService],
})
export class AuthModule {}
