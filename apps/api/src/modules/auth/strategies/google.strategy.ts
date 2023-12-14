// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Provider } from '@prisma/client';
// import type { Profile, VerifyCallback } from 'passport-google-oauth20';
// import { Strategy } from 'passport-google-oauth20';

// import { AppConfiguration } from '@/shared/config/configuration';

// import { AuthService } from '../auth.service';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly authService: AuthService
//   ) {
//     super({
//       clientID: configService.get<AppConfiguration>('app').auth.google.clientId,
//       clientSecret: configService.get<AppConfiguration>('app').auth.google.clientSecret,
//       callbackURL: configService.get<AppConfiguration>('app').auth.google.callbackUrl,
//       scope: ['email', 'profile'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: VerifyCallback
//   ): Promise<void> {
//     console.log('profile', profile);
//     const { id, displayName, emails } = profile;
//     const email = emails[0]?.value;

//     await this.authService.providerAuth({
//       provider: Provider.Google,
//       originalProviderId: id,
//       fullName: displayName,
//       email,
//     });

//     done(null, {
//       email,
//       fullName: displayName,
//       accessToken,
//     });
//   }
// }
export const provider = 'google';
