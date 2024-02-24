import { HttpStatus } from '@nestjs/common';
import { Roles } from '@packages/domains';

import { AppErrors } from '../../../src/core/constants/errors';
import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { userData, userPassword } from '../helpers/mock-data';
import { createUser, requestFunction } from '../helpers/utils';
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
    name: userData.name,
    password: userPassword,
  };

  const getGqlReq = (data: typeof loginUserInput = loginUserInput) => {
    return {
      query: loginUserQuery,
      variables: {
        loginUserInput: data,
      },
    };
  };

  it('should successfully login (activated user)', async () => {
    // 1. Create a new user
    await createUser(e2e, { active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user.name).toBe(userData.name);
    expect(data.user.role).toBe(Roles.USER);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it('should return activationToken (user is not activated)', async () => {
    // 1. Create a new user
    await createUser(e2e);
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data.user).toBeUndefined();
    expect(data.activationToken).toBeDefined();
    expect(data.accessToken).toBeUndefined();
    expect(data.refreshToken).toBeUndefined();
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new user
    await createUser(e2e, { active: true, disabled: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
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
    // 1. Create a new user
    await createUser(e2e, { active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq({ ...loginUserInput, name: 'wrong-user-name' }));
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
    // 1. Create a new user
    await createUser(e2e, { active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq({ ...loginUserInput, password: 'wrong-password' }));
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
