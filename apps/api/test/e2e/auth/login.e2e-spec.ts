import { HttpStatus } from '@nestjs/common';
import { gql } from 'apollo-server-express';

import { AppErrors } from '../../../src/core/constants/errors';
import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { requestFunction } from '../helpers/utils';
import { newUserData, userPassword } from './mock-data';
import { loginUserQuery } from './queries';

describe('User login', () => {
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

  const loginUserInput = {
    name: newUserData.name,
    password: userPassword,
  };

  const gqlReq = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  it('should successfully login (activated user)', async () => {
    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash, active: true } });
    // 2. Login user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user.name).toBe(newUserData.name);
    expect(data.user.role).toBe(newUserData.role);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it('should return activationToken (not activated user)', async () => {
    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash } });

    // 2. Login user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user).toBeUndefined();
    expect(data.activationToken).toBeDefined();
    expect(data.accessToken).toBeUndefined();
    expect(data.refreshToken).toBeUndefined();
  });

  it('should throw an error - user disabled', async () => {
    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash, active: true, disabled: true } });
    // 2. Login user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).not.toBeUndefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_DISABLED);
    expect(errors[0].statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  it('should throw an error - invalid credentials (invalid user name)', async () => {
    const gqlReq = {
      query: loginUserQuery,
      variables: {
        loginUserInput: { ...loginUserInput, name: 'wrong-user-name' },
      },
    };

    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash, active: true } });
    // 2. Login user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).not.toBeUndefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.INVALID_CREDENTIALS);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('should throw an error - invalid credentials (invalid password)', async () => {
    const gqlReq = {
      query: loginUserQuery,
      variables: {
        loginUserInput: { ...loginUserInput, password: 'wrong-password' },
      },
    };

    // 1. Create a new user
    const passwordHash = await e2e.passwordService.hashPassword(userPassword);
    await e2e.prisma.user.create({ data: { ...newUserData, passwordHash, active: true } });
    // 2. Login user
    const result = await requestFunction(e2e, gqlReq);
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).not.toBeUndefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.INVALID_CREDENTIALS);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
});
