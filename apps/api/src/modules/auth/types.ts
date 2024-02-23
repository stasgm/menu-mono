export const Roles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export interface IReqUserData {
  user: {
    id: string;
    role: string;
  };
}

export const JwtStrategies = {
  jwtAccess: 'jwt-access',
  jwtRefresh: 'jwt-refresh',
  jwtActivate: 'jwt-activate',
} as const;

export interface IJwtRequest {
  req: IReqUserData;
}

export type JwtPayload = {
  sub: string;
  role: string;
};

export enum AuthProvidersEnum {
  email = 'email',
  facebook = 'facebook',
  google = 'google',
  twitter = 'twitter',
  apple = 'apple',
}

// export interface GoogleSuccessResponse {
//   azp: string;
//   aud: string;
//   sub: string;
//   scope: string;
//   exp: string;
//   expires_in: string;
//   email: string;
//   email_verified: string;
//   access_type: string;
// }
