import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfigModule } from '@/core/config/app-config.module';
import { SchedulersModule } from '@/core/schedulers/shcedulers.module';
import { ActivationCodesModule } from '@/modules/auth/activation-codes/activation-codes.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { UsersModule } from '@/modules/users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtAccessStrategy, JwtActivateStrategy, JwtRefreshStrategy, JwtResetPassStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({}),
    ActivationCodesModule,
    SchedulersModule,
    PassportModule,
    UsersModule,
    CustomersModule,
    AppConfigModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    PasswordService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtActivateStrategy,
    JwtResetPassStrategy,
  ],
  exports: [PasswordService],
})
export class AuthModule {}
