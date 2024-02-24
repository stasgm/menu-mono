import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfigModule } from '@/core/config/app-config.module';
import { ActivationCodesModule } from '@/modules/activation-codes/activation-codes.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { UsersModule } from '@/modules/users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtAccessStrategy, JwtActivateStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({}),
    ActivationCodesModule,
    PassportModule,
    UsersModule,
    CustomersModule,
    AppConfigModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtActivateStrategy,
    PasswordService,
  ],
  exports: [PasswordService],
})
export class AuthModule {}
