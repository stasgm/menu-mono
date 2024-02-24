import { createUnionType } from '@nestjs/graphql';

import { ActivationToken, Auth } from '.';

export const LoginResultUnion = createUnionType({
  name: 'LoginResultUnion',
  types: () => [Auth, ActivationToken] as const,
  resolveType(value) {
    if (value.accessToken) {
      return Auth;
    }
    if (value.activationToken) {
      return ActivationToken;
    }
    return null;
  },
});
