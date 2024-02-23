import { HttpStatus } from '@nestjs/common';
import { gql } from 'apollo-server-express';

import { AppErrors } from '@/core/constants/errors';
import { RegisterUserInput } from '@/modules/auth/dto/inputs/register-user.input';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { requestFunction } from '../helpers/utils';
import { customerData, newUserData, userPassword } from './mock-data';

describe('User registration', () => {
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
    mutation RegisterUser($registerUserInput: RegisterUserInput!) {
      registerUser(registerUserInput: $registerUserInput) {
        activationToken
      }
    }
  `.loc?.source.body;

  const { id: _id, ...customer } = customerData;

  const registerUserInput: RegisterUserInput = {
    name: newUserData.name,
    password: userPassword,
    customer,
  };

  const gqlReq = {
    query,
    variables: {
      registerUserInput,
    },
  };

  it('should register a new user', async () => {
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.registerUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.activationToken).toBeDefined();
  });

  it('should fail when registering a new user - user with that name already exists', async () => {
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash, active: true } });

    const result = await requestFunction(e2e, gqlReq);
    const errors = result.body.errors;

    expect(errors).not.toBeUndefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_ALREADY_EXISTS);
    expect(errors[0].statusCode).toBe(HttpStatus.CONFLICT);
  });
});
