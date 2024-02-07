import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from '@/core/config/app-config';
import { ActivationCodesModule } from '@/modules/activation-codes/activation-codes.module';
import { CustomersModule } from '@/modules/customers/customers.module';
import { MailModule } from '@/modules/mail/mail.module';
import { UsersModule } from '@/modules/users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    // TODO check initial setup. Do we need jwt here?
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ActivationCodesModule,
    MailModule,
    PassportModule,
    UsersModule,
    CustomersModule,
  ],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy, PasswordService, AppConfig],
  exports: [PasswordService],
})
export class AuthModule {}
