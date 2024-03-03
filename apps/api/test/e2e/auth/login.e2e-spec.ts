import { HttpStatus } from '@nestjs/common';
import { Roles } from '@packages/domains';

import { AppErrors } from '@/core/constants/errors';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { userData, userPassword } from '../helpers/mock-data';
import { loginUserQuery, requestFunction } from '../helpers/queries';

describe('User login', () => {
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

  const getGqlReq = (data: typeof loginUserInput = loginUserInput) => ({
    query: loginUserQuery,
    variables: {
      loginUserInput: data,
    },
  });

  it('should successfully login (activated user)', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.user.name).toBe(userData.name);
    expect(data.user.role).toBe(Roles.USER);
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it('should return activationToken (user is not activated)', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser();
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.user).toBeUndefined();
    expect(data.activationToken).toBeDefined();
    expect(data.accessToken).toBeUndefined();
    expect(data.refreshToken).toBeUndefined();
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({ active: true, disabled: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_DISABLED);
    expect(errors[0].statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  it('should throw an error (user is deleted)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser({ active: true, disabled: true });
    // 2. Delete the user (set deletedAt = now)
    await e2e.prismaUtilsService.updateUser(user.id, { deletedAt: new Date() });
    // 3. Login user
    const result = await requestFunction(e2e, getGqlReq());
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.INVALID_CREDENTIALS);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('should throw an error (invalid user name)', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq({ ...loginUserInput, name: 'wrong-user-name' }));
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.INVALID_CREDENTIALS);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('should throw an error (invalid password)', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. Login user
    const result = await requestFunction(e2e, getGqlReq({ ...loginUserInput, password: 'wrong-password' }));
    const data = result.body.data?.loginUser;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.INVALID_CREDENTIALS);
    expect(errors[0].statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });
});
