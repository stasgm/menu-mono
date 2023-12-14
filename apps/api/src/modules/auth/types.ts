import { User } from '../../types/graphql.schema';

export const Roles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export interface GoogleSuccessResponse {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: string;
  expires_in: string;
  email: string;
  email_verified: string;
  access_type: string;
}

// export interface IRequest {
//   user: {
//     roles: Role[];
//   };
// }

export interface IRequest {
  req: {
    user: User;
  };
}

export interface IJwtRequest {
  user: JwtPayload;
}
