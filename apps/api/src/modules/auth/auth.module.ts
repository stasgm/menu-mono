import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppConfig } from '../../core/config/app-config';
import { CustomersModule } from '../customers/customers.module';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { GqlAuthGuard } from './guards/gql-auth.guard';
import { PasswordService } from './password.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   extraProviders: [AppConfig],
    //   useFactory: (appCinfig: AppConfig) => {
    //     return {
    //       global: true,
    //       secret: appCinfig.jwt.accessSecret,
    //       signOptions: { expiresIn: appCinfig.jwt.expiresIn },
    //     };
    //   },
    //   inject: [AppConfig],
    // }),
    PassportModule,
    // HttpModule,
    UsersModule,
    CustomersModule,
  ],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy, PasswordService, AppConfig],
  exports: [PasswordService],
})
export class AuthModule {}
