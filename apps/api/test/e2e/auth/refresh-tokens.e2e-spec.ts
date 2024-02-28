import { HttpStatus } from '@nestjs/common';

import { AppErrors } from '@/core/constants/errors';

import { E2EApp, initializeApp } from '../helpers/initialize-app';
import { userData, userPassword } from '../helpers/mock-data';
import { loginUserQuery, refreshTokensQuery, requestFunction } from '../helpers/queries';

describe('Refrsh tokens', () => {
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

  const gqlReqLogin = {
    query: loginUserQuery,
    variables: {
      loginUserInput,
    },
  };

  const gqlReq = {
    query: refreshTokensQuery,
  };

  it('should successfully refresh tokens', async () => {
    // 1. Create a new user
    await e2e.prismaUtilsService.createUser({ active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Refresh tokens
    const result = await requestFunction(e2e, gqlReq, dataLogin.refreshToken as string);
    const data = result.body.data?.refreshTokens;
    const errors = result.body.errors;

    expect(errors).toBeUndefined();
    expect(data).toBeDefined();
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it('should throw an error (user is disabled)', async () => {
    // 1. Create a new user
    const user = await e2e.prismaUtilsService.createUser({ active: true });
    // 2. Login user
    const resultLogin = await requestFunction(e2e, gqlReqLogin);
    const dataLogin = resultLogin.body.data?.loginUser;
    const errorsLogin = resultLogin.body.errors;

    expect(errorsLogin).toBeUndefined();
    expect(dataLogin).toBeDefined();
    expect(dataLogin.refreshToken).toBeDefined();
    // 3. Disable the user manually
    await e2e.prismaUtilsService.updateUser(user.id, { disabled: true });
    // 4. Try to get refresh activation code
    const result = await requestFunction(e2e, gqlReq, dataLogin.refreshToken as string);
    const data = result.body.data?.refreshActivationCode;
    const errors = result.body.errors;

    expect(data).toBeUndefined();
    expect(errors).toBeDefined();
    expect(errors).toBeInstanceOf(Array);
    expect(errors.length).toBe(1);
    expect(errors[0].code).toBe(AppErrors.USER_NOT_FOUND);
    expect(errors[0].statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
