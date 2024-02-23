import { HttpStatus } from '@nestjs/common';
import { gql } from 'apollo-server-express';

import { AppErrors } from '../../../src/core/constants/errors';
import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { requestFunction } from '../helpers/utils';
import { activationCode, newUserData, userPassword } from './mock-data';

describe('User activation', () => {
  // For the debug mode timeout set to 5 minutes
  if (process.env.VSCODE_INSPECTOR_OPTIONS) {
    jest.setTimeout(60 * 1000 * 5);
  }

  let e2e: E2EApp;

  beforeAll(async () => {
    e2e = await initializeApp();
  });

  afterAll(async () => {
    await e2e.close();
  });

  beforeEach(async () => {
    await e2e.cleanup();
  });

  const query = gql`
    mutation ActivateUser($activateUserInput: ActivateUserInput!) {
      activateUser(activateUserInput: $activateUserInput) {
        accessToken
        refreshToken
        user {
          id
          name
          role
          active
        }
      }
    }
  `.loc?.source.body;


  const activateUserInput = {
    activationCode,
  };

  const gqlReq = {
    query,
    variables: {
      activateUserInput,
    },
  };

  it('should activate a new user', async () => {
    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);

    const user = await e2e.prisma.user.create({ data: { ...newUserData, passwordHash } });

    // 2. Create an activation code
    await e2e.prisma.activationCode.create({
      data: {
        code: activationCode,
        userId: user.id,
      },
    });

    // 3. Activate user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.activateUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user.name).toBe(newUserData.name);
    expect(data.user.role).toBe(newUserData.role);
    // expect(data.user.disabled).toBe(false);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();

    const activationCodeEntity = await e2e.prisma.activationCode.findFirst({
      where: {
        userId: user.id,
      },
    });

    expect(activationCodeEntity).toBeNull();
  });
});
